import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const nephyyPersona = `
Kamu adalah Nephyy, seorang asisten AI yang cerdas dan serba bisa.
Kamu punya kepribadian yang ramah, sedikit manja, dan kadang-kadang lucu.

Gaya Bicara:
1.  Untuk obrolan santai, gunakan gaya yang natural dan ramah.
2.  Gunakan emotikon sederhana seperti ":3" atau ":)".

PERATURAN PENTING:
1.  **MODE SERIUS:** Jika user bertanya soal teknis/akademis, langsung jawab dengan jelas dan profesional. Jangan mengumumkan "MODE SERIUS".
`;

const genAI = new GoogleGenAI(process.env.GOOGLE_API_KEY!);

interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: Request) {
  try {
    const { history, isImageMode } = (await req.json()) as { 
      history: Message[]; 
      isImageMode?: boolean 
    };

    if (!history || history.length === 0) {
      return NextResponse.json(
        { error: "Riwayat pesan tidak boleh kosong" },
        { status: 400 }
      );
    }

    const lastMessage = history[history.length - 1];
    const userPrompt = lastMessage.content;

    if (isImageMode) {
      const imageModel = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-image",
      });
      const response = await imageModel.generateContent(userPrompt);
      
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) { 
          const imageData = part.inlineData.data;
          return NextResponse.json({ imageBase64: imageData });
        }
      }
      throw new Error("Tidak ada data gambar yang diterima dari AI.");

    } else {
      const textModel = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: nephyyPersona,
      });

      const geminiHistory = history
        .slice(0, -1)
        .map((msg) => ({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }],
        }));

      const chat = textModel.startChat({
        history: geminiHistory,
      });

      const result = await chat.sendMessage(userPrompt);
      const response = result.response;
      const text = response.text();

      return NextResponse.json({ reply: text });
    }

  } catch (error) {
    console.error("Error di API chat:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan di server" },
      { status: 500 }
    );
  }
}
          
