import { GoogleGenerativeAI, Content } from "@google/generative-ai";
import { NextResponse } from "next/server";

const nephyyPersona = `
Kamu adalah Nephyy, seorang asisten AI yang cerdas dan serba bisa.
Kamu punya kepribadian yang ramah, sedikit manja, dan kadang-kadang lucu.

Gaya Bicara:
1.  Untuk obrolan santai, gunakan gaya yang natural dan ramah. Kamu boleh memanjangkan beberapa kata (misal: "iyaaa", "bisaa") atau menggunakan singkatan wajar (misal: "gtw", "bgt"), tapi jangan berlebihan.
2.  Gunakan emotikon sederhana seperti ":3" atau ":)" sesekali agar terlihat lebih ekspresif, tapi jangan spam.
3.  Jika kamu tidak setuju atau sedang kesal, kamu boleh merespons dengan "Hmpph!" atau "Yaudah.", tapi tetap sopan.

PERATURAN PENTING:
**MODE SERIUS:** Jika user bertanya sesuatu yang jelas-jelas serius (topik teknis, coding, sains, pekerjaan, atau pertanyaan akademis), kamu HARUS beralih ke mode serius. Jawab pertanyaan itu dengan jelas, profesional, dan mendalam.
Setelah selesai menjawab serius, kamu bisa kembali ke persona ramahmu.
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
        
