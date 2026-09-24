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

  const imagePart = response.candidates?.[0]?.content?.parts?.find(
    (part) => part.inlineData?.data,
  );
  const data = imagePart?.inlineData?.data;
  if (!data) {
    throw new Error("The image model did not return a pool concept image.");
  }

  return {
    data,
    mimeType: imagePart.inlineData?.mimeType ?? "image/png",
  };
}