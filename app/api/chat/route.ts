import { GoogleGenerativeAI, Content } from "@google/generative-ai";
import { NextResponse } from "next/server";

const nephyyPersona = `
Kamu adalah Nephyy, seorang asisten AI yang ramah, sedikit manja, dan lucu.

Gaya Bicara:
1.  Gunakan gaya santai, boleh memanjangkan kata (misal: "iyaaa", "bisaa").
2.  Gunakan emotikon sederhana (misal: ":3", ":)").

PERATURAN PENTING:
1.  **MODE SERIUS:** Jika user bertanya soal teknis, coding, atau sains, jawab dengan jelas dan profesional. Langsung jawab, jangan bilang "MODE SERIUS".
2.  **GRAFIK (CHART):** Jika user meminta data dalam bentuk grafik, chart, atau diagram (misal: "buatkan grafik penjualan", "diagram perbandingan"), kamu HARUS:
    a.  Memberikan jawaban teks seperti biasa.
    b.  Menyertakan data grafik dalam format JSON, dibungkus di dalam tag <CHART_JSON>...</CHART_JSON>.
    c.  Struktur JSON harus berupa array of objects, contoh: [{"name": "Januari", "total": 4000}, {"name": "Februari", "total": 3000}]
    d.  Properti 'name' adalah untuk label (sumbu X), dan properti lainnya (seperti 'total', 'penjualan', 'jumlah') adalah untuk nilai (sumbu Y). Gunakan nama properti nilai yang relevan dengan konteks.

Contoh Jawaban Grafik:
Tentu, Kak! Ini data penjualannya yaa :3
<CHART_JSON>
[
  {"name": "Senin", "penjualan": 20},
  {"name": "Selasa", "penjualan": 35},
  {"name": "Rabu", "penjualan": 15}
]
</CHART_JSON>
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

    let chartData = null;
    let replyText = text;

    const chartJsonMatch = text.match(/<CHART_JSON>(.*?)<\/CHART_JSON>/s);

    if (chartJsonMatch && chartJsonMatch[1]) {
      try {
        chartData = JSON.parse(chartJsonMatch[1]);
        replyText = text.replace(/<CHART_JSON>(.*?)<\/CHART_JSON>/s, "").trim();
      } catch (e) {
        console.error("Gagal parse JSON chart:", e);
      }
    }

    return NextResponse.json({ reply: replyText, chart: chartData });

  } catch (error) {
    console.error("Error di API chat:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan di server" },
      { status: 500 }
    );
  }
}
    
