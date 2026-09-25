import { randomUUID } from "node:crypto";
import { mkdir, readdir, readFile, stat, unlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { ReplitConnectors } from "@replit/connectors-sdk";

const VIDEO_CACHE_DIRECTORY = join(tmpdir(), "cove-stone-pool-concept-videos");
const VIDEO_CACHE_TTL_MS = 8 * 60 * 60 * 1000;
const VIDEO_JOB_TTL_MS = 20 * 60 * 1000;
const MAX_VIDEO_BYTES = 12 * 1024 * 1024;
const VIDEO_POLL_INTERVAL_MS = 5_000;
const MAX_VIDEO_POLL_ATTEMPTS = 120;
const VIDEO_ID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const VIDEO_FAILURE_MESSAGE =
  "The AI pool video could not be created. Please try the rendering again.";

type VideoJob =
  | { status: "processing"; expiresAt: number }
  | { status: "ready"; videoId: string; expiresAt: number }
  | { status: "failed"; message: string; expiresAt: number };

const videoJobs = new Map<string, VideoJob>();

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object"
    ? (value as Record<string, unknown>)
    : null;
}

function delay(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function readMiniMaxJson(
  response: Response,
  operation: string,
): Promise<Record<string, unknown>> {
  if (!response.ok) {
    throw new Error(`MiniMax ${operation} failed with HTTP ${response.status}.`);
  }

  let payload: Record<string, unknown>;
  try {
    const parsed: unknown = await response.json();
    const record = asRecord(parsed);
    if (!record) throw new Error("Expected a JSON object.");
    payload = record;
  } catch {
    throw new Error(`MiniMax ${operation} returned an invalid response.`);
  }

  const baseResponse = asRecord(payload.base_resp);
  if (
    baseResponse &&
    Number(baseResponse.status_code ?? 0) !== 0
  ) {
    throw new Error(
      `MiniMax ${operation} failed with status ${String(baseResponse.status_code)}.`,
    );
  }

  return payload;
}

async function getVideoTaskStatus(
  connectors: ReplitConnectors,
  taskId: string,
) {
  let lastError: unknown;
  for (let retry = 0; retry < 3; retry += 1) {
    try {
      const response = await connectors.proxy(
        "minimax",
        `/v1/query/video_generation?task_id=${encodeURIComponent(taskId)}`,
        { method: "GET" },
      );
      return await readMiniMaxJson(response, "video status check");
    } catch (error) {
      lastError = error;
      if (retry < 2) await delay(1_000 * 2 ** retry);
    }
  }
  throw lastError instanceof Error
    ? lastError
    : new Error("MiniMax video status could not be read.");
}

async function downloadGeneratedVideo(
  connectors: ReplitConnectors,
  fileId: string,
) {
  const fileResponse = await connectors.proxy(
    "minimax",
    `/v1/files/retrieve?file_id=${encodeURIComponent(fileId)}`,
    { method: "GET" },
  );
  const filePayload = await readMiniMaxJson(fileResponse, "video retrieval");
  const file = asRecord(filePayload.file);
  const downloadUrl = file?.download_url;
  if (typeof downloadUrl !== "string") {
    throw new Error("MiniMax did not provide a video download URL.");
  }

  const parsedUrl = new URL(downloadUrl);
  if (parsedUrl.protocol !== "https:") {
    throw new Error("MiniMax returned an invalid video download URL.");
  }

  const response = await fetch(parsedUrl, {
    signal: AbortSignal.timeout(120_000),
  });
  if (!response.ok) {
    throw new Error(`The generated video download failed with HTTP ${response.status}.`);
  }
  const contentLength = Number(response.headers.get("content-length") ?? 0);
  if (contentLength > MAX_VIDEO_BYTES) {
    throw new Error("The generated video exceeds the supported attachment size.");
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error("The generated video had no response body.");

  const chunks: Uint8Array[] = [];
  let totalBytes = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    totalBytes += value.byteLength;
    if (totalBytes > MAX_VIDEO_BYTES) {
      await reader.cancel();
      throw new Error("The generated video exceeds the supported attachment size.");
    }
    chunks.push(value);
  }

  const video = Buffer.concat(chunks.map((chunk) => Buffer.from(chunk)));
  if (
    video.length < 12 ||
    video.subarray(4, 8).toString("ascii") !== "ftyp"
  ) {
    throw new Error("MiniMax returned a file that is not a playable MP4.");
  }
  return video;
}

async function removeExpiredVideoFiles() {
  await mkdir(VIDEO_CACHE_DIRECTORY, { recursive: true });
  const entries = await readdir(VIDEO_CACHE_DIRECTORY, { withFileTypes: true });
  const cutoff = Date.now() - VIDEO_CACHE_TTL_MS;

  await Promise.all(
    entries
      .filter(
        (entry) => entry.isFile() && VIDEO_ID_PATTERN.test(entry.name.replace(/\.mp4$/, "")),
      )
      .map(async (entry) => {
        const filePath = join(VIDEO_CACHE_DIRECTORY, entry.name);
        const details = await stat(filePath).catch(() => null);
        if (details && details.mtimeMs < cutoff) {
          await unlink(filePath).catch(() => undefined);
        }
      }),
  );
}

async function saveGeneratedVideo(video: Buffer) {
  await removeExpiredVideoFiles();
  const videoId = randomUUID();
  await writeFile(join(VIDEO_CACHE_DIRECTORY, `${videoId}.mp4`), video, {
    flag: "wx",
  });
  return videoId;
}

function pruneExpiredJobs() {
  const now = Date.now();
  for (const [jobId, job] of videoJobs) {
    if (job.expiresAt <= now) videoJobs.delete(jobId);
  }
}

async function finishVideoJob(
  connectors: ReplitConnectors,
  jobId: string,
  taskId: string,
  onFailure?: (error: unknown) => void,
) {
  try {
    for (let attempt = 0; attempt < MAX_VIDEO_POLL_ATTEMPTS; attempt += 1) {
      await delay(VIDEO_POLL_INTERVAL_MS);
      const payload = await getVideoTaskStatus(connectors, taskId);
      const status = payload.status;

      if (status === "Fail") {
        throw new Error("MiniMax reported that video generation failed.");
      }
      if (status === "Success") {
        const fileId = payload.file_id;
        if (typeof fileId !== "string" || !fileId) {
          throw new Error("MiniMax completed without returning a video file.");
        }
        const video = await downloadGeneratedVideo(connectors, fileId);
        const videoId = await saveGeneratedVideo(video);
        videoJobs.set(jobId, {
          status: "ready",
          videoId,
          expiresAt: Date.now() + VIDEO_JOB_TTL_MS,
        });
        return;
      }
      if (!["Preparing", "Queueing", "Processing"].includes(String(status))) {
        throw new Error("MiniMax returned an unknown video task status.");
      }
    }
    throw new Error("MiniMax video generation timed out.");
  } catch (error) {
    videoJobs.set(jobId, {
      status: "failed",
      message: VIDEO_FAILURE_MESSAGE,
      expiresAt: Date.now() + VIDEO_JOB_TTL_MS,
    });
    onFailure?.(error);
  }
}

export async function startPoolConceptVideoJob(
  connectors: ReplitConnectors,
  firstFrameDataUrl: string,
  onFailure?: (error: unknown) => void,
) {
  if (!/^data:image\/(?:png|jpeg);base64,[A-Za-z0-9+/]+={0,2}$/.test(firstFrameDataUrl)) {
    throw new Error("The AI rendering cannot be used as a video frame.");
  }

  const response = await connectors.proxy("minimax", "/v1/video_generation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "MiniMax-Hailuo-2.3",
      prompt:
        "Create a 10-second illustrative architectural pool-design walkthrough from this exact first frame. Preserve the backyard, pool outline and position, pool scale, water color, edge treatment, materials, deck, house, landscaping, and selected features. Use one continuous, stabilized, slow camera glide toward the pool with only subtle natural water ripples, reflections, and foliage movement. Do not change the layout, add structures or pool features, add people, add text, add logos, or use cuts. Keep the result realistic and consistent with the supplied design image.",
      first_frame_image: firstFrameDataUrl,
      duration: 10,
      resolution: "768P",
      prompt_optimizer: false,
    }),
  });
  const payload = await readMiniMaxJson(response, "video generation request");
  const taskId = payload.task_id;
  if (typeof taskId !== "string" || !taskId) {
    throw new Error("MiniMax did not return a video task ID.");
  }

  pruneExpiredJobs();
  const jobId = randomUUID();
  videoJobs.set(jobId, {
    status: "processing",
    expiresAt: Date.now() + VIDEO_JOB_TTL_MS,
  });
  void finishVideoJob(connectors, jobId, taskId, onFailure);
  return jobId;
}

export function getPoolConceptVideoJob(jobId: string) {
  pruneExpiredJobs();
  const job = videoJobs.get(jobId);
  if (!job) return null;
  if (job.status === "ready") {
    return {
      status: "ready" as const,
      videoId: job.videoId,
      videoUrl: `/api/design-concepts/videos/${job.videoId}`,
    };
  }
  if (job.status === "failed") {
    return { status: "failed" as const, message: job.message };
  }
  return { status: "processing" as const };
}

export async function readPoolConceptVideo(videoId: string) {
  if (!VIDEO_ID_PATTERN.test(videoId)) return null;
  const filePath = join(VIDEO_CACHE_DIRECTORY, `${videoId}.mp4`);
  const details = await stat(filePath).catch(() => null);
  if (!details || Date.now() - details.mtimeMs > VIDEO_CACHE_TTL_MS) {
    if (details) await unlink(filePath).catch(() => undefined);
    return null;
  }
  const video = await readFile(filePath);
  if (
    video.length < 12 ||
    video.length > MAX_VIDEO_BYTES ||
    video.subarray(4, 8).toString("ascii") !== "ftyp"
  ) {
    await unlink(filePath).catch(() => undefined);
    return null;
  }
  return video;
}