import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserPreferences, AnalysisResult } from "../types";

// Helper to convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    skinTone: { type: Type.STRING, description: "Detected skin tone in Russian (e.g., Светлый, Смуглый)" },
    undertone: { type: Type.STRING, description: "Detected undertone in Russian (e.g., Холодный, Теплый, Нейтральный)" },
    detectedFeatures: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of detected skin features visible in the photo in Russian"
    },
    analysisText: { type: Type.STRING, description: "A friendly, professional analysis summary of the skin based on the photo and user data in Russian. Max 2 sentences." },
    recommendations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          brand: { type: Type.STRING },
          category: { type: Type.STRING, description: "Category in Russian (e.g. Увлажняющий крем)" },
          price: { type: Type.STRING, description: "Estimated price in Rubles (₽)" },
          reason: { type: Type.STRING, description: "Why this specific product matches the user's skin profile in Russian." },
          rating: { type: Type.NUMBER, description: "A simulated rating out of 5 (e.g., 4.5)" }
        },
        required: ["name", "brand", "category", "price", "reason", "rating"]
      }
    }
  },
  required: ["skinTone", "undertone", "detectedFeatures", "analysisText", "recommendations"]
};

export const analyzeSkinAndRecommend = async (
  imageFile: File,
  preferences: UserPreferences
): Promise<AnalysisResult> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key is missing. Please set process.env.API_KEY.");
    }

    const ai = new GoogleGenAI({ apiKey });
    const base64Image = await fileToBase64(imageFile);

    const prompt = `
      Act as a world-class dermatologist and celebrity makeup artist speaking Russian. 
      Analyze the attached photo of the user's face.
      
      User Profile Data (in Russian):
      - Self-reported Skin Type: ${preferences.skinType}
      - Primary Concerns: ${preferences.concerns.join(', ')}
      - Budget Preference: ${preferences.budget}

      Task:
      1. Analyze the photo to determine actual skin tone, undertone, and visible skin conditions.
      2. Compare visual findings with their self-reported data.
      3. Recommend 4-5 specific cosmetic or skincare products (cleanser, serum, moisturizer, foundation, etc.) that perfectly match their needs.
      4. Ensure all text output is in Russian language.
      5. Prices should be in Russian Rubles (₽).
      
      Output strictly in JSON format conforming to the schema.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", 
      contents: {
        parts: [
          { inlineData: { mimeType: imageFile.type, data: base64Image } },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.4,
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text) as AnalysisResult;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};