import { GoogleGenAI } from "@google/genai";

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;

      // remove base64 prefix
      const base64 = result.split(",")[1];

      resolve(base64);
    };

    reader.onerror = (error) => reject(error);
  });
};

export const convertOldTamilToModern = async (
  imageFile: File,
  apiKey?: string
): Promise<string> => {

  const finalKey = apiKey || import.meta.env.VITE_GEMINI_API_KEY;

  if (!finalKey) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey: finalKey });

  const base64Image = await fileToBase64(imageFile);

  const imagePart = {
    inlineData: {
      mimeType: imageFile.type,
      data: base64Image
    }
  };

  const textPart = {
    text: `
You are a world-class expert in Tamil linguistics and ancient scripts.

Task:
1. Identify the Old Tamil (Tamil-Brahmi) text from the image.
2. Convert it into Modern Tamil script.
3. Translate the Modern Tamil text into English.

Rules:
- Preserve line structure.
- Do not add explanations.
- If characters are unclear write [unclear].

Return output exactly in this format:

Modern Tamil:
<modern tamil text>

English Translation:
<english translation>
`
  };

  try {

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",

      contents: [
        {
          role: "user",
          parts: [imagePart, textPart]
        }
      ]
    });

    const result = response.text;

    if (!result) {
      throw new Error("Empty response from AI model.");
    }

    return result.trim();

  } catch (error) {

    console.error("Gemini API call failed:", error);

    if (error instanceof Error && error.message.includes("API_KEY_INVALID")) {
      throw new Error("The provided API Key is invalid. Please check your key and try again.");
    }

    throw new Error("Failed to get a response from the AI model.");
  }
};