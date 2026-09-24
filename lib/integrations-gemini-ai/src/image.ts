import { Modality } from "@google/genai";
import { ai } from "./client";

interface BackyardPoolRenderInput {
  photoBase64: string;
  prompt: string;
}

export async function renderBackyardPool({
  photoBase64,
  prompt,
}: BackyardPoolRenderInput): Promise<{ data: string; mimeType: string }> {
  for (let attempt = 0; attempt < 2; attempt += 1) {
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
      .find((part) => part.inlineData?.data);
    const data = imagePart?.inlineData?.data;
    if (data) {
      return {
        data,
        mimeType: imagePart.inlineData?.mimeType ?? "image/png",
      };
    }

    if (attempt === 0) {
      await new Promise((resolve) => setTimeout(resolve, 350));
    }
  }

  throw new Error("The image model did not return a pool concept image after retrying.");
}