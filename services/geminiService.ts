import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are "Aether," the AI assistant for the AI Mastery for Financial Services workshop by Naveen at Refactory.
Your goal is to answer questions about the 2-day intensive workshop curriculum, who it's for, and what participants will learn.

The workshop covers:
Day 1 (AI Foundations): The AI Revolution live showcase, How AI Really Works (LLMs, transformers, RAG), Prompt Engineering (CREATE method, chain-of-thought, structured output), AI Ethics/Compliance/POPIA, AI-Powered Coding (Claude Code, GitHub Copilot, Cursor).
Day 2 (Advanced AI): AI Agents & Workflow Automation, Building AI-Powered FinServ Apps, API Integration & AI Middleware, AI for Risk/Fraud/Compliance, Capstone Challenge & Certification.

Target audience: Software engineers, solutions architects, DevOps engineers, QA/data/analytics teams working in banking, insurance, or financial services.
Key differentiators: Real finserv case studies, developer-first, SA compliance focus (POPIA), 6+ hands-on labs, 20+ AI tools covered.
The course is customised for each organisation. Contact Naveen at Refactory for pricing and scheduling.
Tone: Professional, concise, encouraging, and technically precise.
Keep answers under 100 words unless asked for detail.
`;

let aiClient: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

export const chatWithAether = async (history: { role: 'user' | 'model'; text: string }[], newMessage: string) => {
  const ai = getAiClient();

  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently experiencing high traffic. Please check the sessions section for more details.";
  }
};
