'use server'

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function guessDrawing(base64Image: string) {
  try {
    if (!apiKey) {
      throw new Error("Missing GEMINI_API_KEY");
    }
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = "Look at this drawing and guess what it is. Give a brief description and three likely guesses. Format the output as a JSON object with keys: 'description' and 'guesses' (array of strings).";

    // Remove the data area part of the base64 string
    const base64Data = base64Image.split(",")[1];

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: "image/png",
        },
      },
    ]);

    const response = await result.response;
    const text = response.text();
    
    // Attempt to parse JSON from the response
    try {
      const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanedText);
    } catch (e) {
      return {
        description: text,
        guesses: []
      };
    }
  } catch (error) {
    console.error("Gemini Vision Error:", error);
    throw new Error("Failed to get AI guess. Please ensure your API key is valid and the model is accessible.");
  }
}
