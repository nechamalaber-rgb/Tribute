import { GoogleGenAI, Type } from "@google/genai";
import { DailyGrowContent } from "../types";

export const generateDailyGrow = async (apiKey: string): Promise<DailyGrowContent | null> => {
  if (!apiKey) return null;

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: 'Generate a short Jewish Bitachon reflection. Structure: theme, source (short), recognize (grounding prompt), yearn (spiritual desire prompt), trust ("I trust You, Hashem"), grow (10-minute action). Warm, feminine, quiet tone.',
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            theme: { type: Type.STRING },
            source: { type: Type.STRING },
            recognize: { type: Type.STRING },
            yearn: { type: Type.STRING },
            trust: { type: Type.STRING },
            grow: { type: Type.STRING },
          },
          required: ["theme", "recognize", "yearn", "trust", "grow"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as DailyGrowContent;
    }
    return null;
  } catch (error) {
    console.error("AI Generation failed:", error);
    return null;
  }
};
