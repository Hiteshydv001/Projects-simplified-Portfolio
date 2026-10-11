'use server'

import { headers } from 'next/headers';
import { guardWrite } from '@/lib/security/request';
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function guessDrawing(base64Image: string) {
  try {
    const requestHeaders = await headers();
    const host = requestHeaders.get('host') || 'localhost:3000';
    const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || ((process.env.VERCEL ? 'https://' : 'http://') + host);
    guardWrite(new Request(siteOrigin, { headers: requestHeaders }), 'drawing');
    if (typeof base64Image !== 'string' || base64Image.length > 750000 || !/^data:image\/png;base64,[A-Za-z0-9+/=]+$/.test(base64Image)) throw new Error('Invalid drawing');
    if (!apiKey) {
      throw new Error("Missing GEMINI_API_KEY");
    }
    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_VISION_MODEL?.trim() || "gemini-3.5-flash-lite",
      generationConfig: { responseMimeType: 'application/json' },
    });

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
      const parsed = JSON.parse(cleanedText);
      return { description: typeof parsed.description === 'string' ? parsed.description.slice(0, 1000) : 'Drawing analyzed.', guesses: Array.isArray(parsed.guesses) ? parsed.guesses.filter((guess: unknown) => typeof guess === 'string').slice(0, 3).map((guess: string) => guess.slice(0, 100)) : [] };
    } catch {
      return {
        description: text,
        guesses: []
      };
    }
  } catch (error) {
    console.error("Gemini Vision Error:", error);
    throw new Error("Unable to analyze this drawing right now. Please try again shortly.");
  }
}
