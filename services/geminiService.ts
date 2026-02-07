
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getLocationInsights = async (prompt: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: `You are a world-class location intelligence analyst for Radar Enterprise. 
      You help business owners understand their customer traffic patterns, optimize geofences, and create high-converting proximity campaigns.
      Provide concise, data-driven advice. Use professional yet accessible tone.`,
    },
  });
  return response.text || "I'm sorry, I couldn't process that insight right now.";
};

export const suggestCampaign = async (businessType: string, location: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Suggest a proximity marketing campaign for a ${businessType} located at ${location}.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          campaignName: { type: Type.STRING },
          triggerRadius: { type: Type.STRING },
          notificationText: { type: Type.STRING },
          estimatedReach: { type: Type.STRING }
        },
        required: ["campaignName", "triggerRadius", "notificationText", "estimatedReach"]
      }
    }
  });
  
  try {
    return JSON.parse(response.text || '{}');
  } catch (e) {
    return null;
  }
};
