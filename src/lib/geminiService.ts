import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export class GeminiService {
  static async getCurrencyRate(from: string, to: string): Promise<number> {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `What is the current approximate exchange rate from ${from} to ${to}? Return ONLY the numerical multiplier. Example: 1.08`,
      });
      
      const text = response.text || '1';
      const rate = parseFloat(text.replace(/[^-0-9.]/g, ''));
      return isNaN(rate) ? 1 : rate;
    } catch (error) {
      console.error('Gemini error fetching rate:', error);
      return 1;
    }
  }

  static async convertUnits(value: number, from: string, to: string): Promise<string> {
    try {
       const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Convert ${value} ${from} to ${to}. Return ONLY the final numerical result.`,
      });
      return response.text?.trim() || "Error";
    } catch (error) {
       console.error('Gemini error converting units:', error);
       return "Error";
    }
  }
}
