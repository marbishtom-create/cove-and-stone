import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const service = await readFile(
  new URL("../src/services/pool-concept-video.ts", import.meta.url),
  "utf8",
);
const routes = await readFile(
  new URL("../src/routes/design-concepts.ts", import.meta.url),
  "utf8",
);

test("walkthrough jobs retain the digest of their exact source image", () => {
  assert.match(service, /createHash\("sha256"\)\.update\(dataUrl\)\.digest\("hex"\)/);
  assert.match(service, /conceptImageSha256: string/);
  assert.match(service, /conceptImageSha256,?\s*\}/);
});

test("internal MP4 attachments require a matching render image", () => {
  assert.match(
    service,
    /getReadyPoolConceptVideoId\(jobId: string, conceptImageDataUrl: string\)/,
  );
  assert.match(service, /job\.conceptImageSha256 === conceptImageSha256/);
  assert.match(
    routes,
    /getReadyPoolConceptVideoId\(\s*concept\.videoJobId,\s*concept\.aiRenderDataUrl \?\? "",?\s*\)/,
  );
});

test("MiniMax authorization failures point to the required Global connection key", () => {
  assert.match(service, /VIDEO_AUTH_FAILURE_MESSAGE/);
  assert.ok(service.includes("status (?:1004|2049)\\b"));
  assert.match(service, /failed with HTTP 401/);
  assert.match(service, /Global\/International API key/);
  assert.equal((service.match(/message: getVideoFailureMessage\(error\)/g) ?? []).length, 2);
});