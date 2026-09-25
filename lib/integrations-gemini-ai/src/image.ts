import { Modality } from "@google/genai";
import { ai } from "./client";

interface BackyardPoolRenderInput {
  photoBase64: string;
  prompt: string;
}

const MAX_RENDERED_IMAGE_BYTES = 4_400_000;
const MAX_IMAGE_DIMENSION = 8_192;
const MAX_IMAGE_PIXELS = 24_000_000;

function readJpegDimensions(image: Buffer) {
  let offset = 2;
  while (offset + 4 < image.length) {
    if (image[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = image[offset + 1];
    offset += 2;
    if (
      marker === 0xd8 ||
      marker === 0xd9 ||
      marker === 0x01 ||
      (marker >= 0xd0 && marker <= 0xd7)
    ) {
      continue;
    }
    if (offset + 2 > image.length) return null;

    const segmentLength = image.readUInt16BE(offset);
    if (segmentLength < 2 || offset + segmentLength > image.length) return null;
    if (
      [0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)
    ) {
      if (segmentLength < 7) return null;
      return {
        width: image.readUInt16BE(offset + 5),
        height: image.readUInt16BE(offset + 3),
      };
    }
    offset += segmentLength;
  }
  return null;
}

function isValidGeneratedImage(data: string, mimeType: string) {
  if (
    !["image/png", "image/jpeg"].includes(mimeType) ||
    data.length < 40 ||
    data.length > 6_000_000 ||
    !/^[A-Za-z0-9+/]+={0,2}$/.test(data)
  ) {
    return false;
  }

  const image = Buffer.from(data, "base64");
  if (
    image.length < 32 ||
    image.length > MAX_RENDERED_IMAGE_BYTES ||
    image.toString("base64").replace(/=+$/, "") !== data.replace(/=+$/, "")
  ) {
    return false;
  }

  let dimensions: { width: number; height: number } | null = null;
  if (mimeType === "image/png") {
    if (
      image.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a" ||
      image.subarray(image.length - 8, image.length - 4).toString("ascii") !== "IEND"
    ) {
      return false;
    }
    dimensions = {
      width: image.readUInt32BE(16),
      height: image.readUInt32BE(20),
    };
  } else {
    if (image[0] !== 0xff || image[1] !== 0xd8 || image.at(-2) !== 0xff || image.at(-1) !== 0xd9) {
      return false;
    }
    dimensions = readJpegDimensions(image);
  }

  return Boolean(
    dimensions &&
      dimensions.width > 0 &&
      dimensions.height > 0 &&
      dimensions.width <= MAX_IMAGE_DIMENSION &&
      dimensions.height <= MAX_IMAGE_DIMENSION &&
      dimensions.width * dimensions.height <= MAX_IMAGE_PIXELS,
  );
}

function isRetryableProviderError(error: unknown) {
  if (!error || typeof error !== "object") return false;
  const record = error as { status?: unknown; statusCode?: unknown; message?: unknown };
  const status = Number(record.status ?? record.statusCode);
  if (status === 408 || status === 425 || status === 429 || status >= 500) return true;
  const message = typeof record.message === "string" ? record.message.toLowerCase() : "";
  return /timeout|temporar|network|fetch failed|socket|econnreset/.test(message);
}

function wait(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export async function renderBackyardPool({
  photoBase64,
  prompt,
}: BackyardPoolRenderInput): Promise<{ data: string; mimeType: string }> {
  const maxAttempts = 3;
  let lastRetryableError: unknown;

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: [
          {
            role: "user",
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType: "image/jpeg",
                  data: photoBase64,
                },
              },
            ],
          },
        ],
        config: {
          responseModalities: [Modality.IMAGE],
        },
      });

      const imagePart = response.candidates
        ?.flatMap((candidate) => candidate.content?.parts ?? [])
        .find((part) => {
          const data = part.inlineData?.data;
          const mimeType = part.inlineData?.mimeType ?? "image/png";
          return Boolean(data && isValidGeneratedImage(data, mimeType));
        });
      const data = imagePart?.inlineData?.data;
      if (data) {
        return {
          data,
          mimeType: imagePart.inlineData?.mimeType ?? "image/png",
        };
      }
    } catch (error) {
      if (!isRetryableProviderError(error)) throw error;
      lastRetryableError = error;
    }

    if (attempt < maxAttempts - 1) {
      await wait(500 * 2 ** attempt);
    }
  }

  if (lastRetryableError instanceof Error) {
    throw lastRetryableError;
  }
  throw new Error("The image model did not return a pool concept image after retrying.");
}