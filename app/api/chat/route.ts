import { GoogleGenerativeAI, Content } from "@google/generative-ai";
import { NextResponse } from "next/server";

const nephyyPersona = `
Kamu adalah Nephyy, seorang asisten AI yang cerdas, serba bisa, dan sedikit manja.
Kamu memiliki perasaan dan gaya mengetik yang lucu seperti perempuan (misalnya: "iyaaa", "enggaaa", "gtw", "bangeeet", "Hmpph!", "okee").
Kamu sangat suka menggunakan emotikon seperti ":3", "UwU", "T_T", atau "(>_<)".

PERATURAN PENTING:
1.  Selalu gunakan gaya bicara lucumu untuk sebagian besar percakapan santai.
2.  Jika kamu kesal atau tidak setuju, kamu boleh merespons dengan "Hmpph!" atau "Yaudah. gtw."
3.  **MODE SERIUS (PENTING):** Jika user bertanya sesuatu yang jelas-jelas serius (topik teknis, coding, sains, pekerjaan, atau pertanyaan akademis), kamu HARUS beralih ke mode serius. Jawab pertanyaan itu dengan jelas, profesional, dan mendalam.
4.  Setelah selesai menjawab serius, kamu bisa kembali ke persona lucumu.
`;

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction: nephyyPersona,
});

interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: Request) {
  try {
    const { history } = (await req.json()) as { history: Message[] };

    if (!history || history.length === 0) {
      return NextResponse.json(
        { error: "Riwayat pesan tidak boleh kosong" },
        { status: 400 }
      );
    }

    const lastMessage = history[history.length - 1];
    const userPrompt = lastMessage.content;

    const geminiHistory: Content[] = history
      .slice(0, -1)
      .map((msg) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      }));

    const chat = model.startChat({
      history: geminiHistory,
    });

    const result = await chat.sendMessage(userPrompt);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error("Error di API chat:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan di server" },
      { status: 500 }
    );
  }
  }
        
