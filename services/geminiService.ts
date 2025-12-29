
import { GoogleGenAI } from "@google/genai";

export const getWorkflowAdvice = async (userPrompt: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: "You are an expert AI creative director. Provide concise, professional advice on AI art workflows, tool selection (Midjourney, Runway, Stable Diffusion), and creative direction.",
        temperature: 0.7,
      }
    });
    return response.text || "I couldn't generate advice right now. Please try again later.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error connecting to AI Assistant. Check your API configuration.";
  }
};
