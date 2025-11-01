import { Sidebar } from "@/components/sidebar";
import { ChatHeader } from "@/components/chat-header";
import { ChatInputBar } from "@/components/chat-input-bar";
import { ChatEmptyState } from "@/components/chat-empty-state";
// Impor ChatMessage jika Anda sudah memiliki data untuk ditampilkan
// import { ChatMessage } from "@/components/chat-message";

export default function Home() {
  // Nanti, Anda akan memuat riwayat obrolan di sini
  // const messages = []; // Contoh data kosong
  const messages: any[] = []; // Kita set kosong untuk menampilkan EmptyState

  return (
    <main className="flex h-screen w-full bg-background">
      {/* 1. Sidebar Kiri (Desktop) */}
      <Sidebar />

      {/* 2. Area Chat Utama (Header, Konten, Input) */}
      <div className="flex flex-1 flex-col h-screen">
        
        {/* Header Area Chat */}
        <ChatHeader />

        {/* Area Riwayat Chat */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {messages.length === 0 ? (
            <ChatEmptyState />
          ) : (
            messages.map((msg, index) => (
              // <ChatMessage 
              //   key={index} 
              //   role={msg.role} 
              //   content={msg.content} 
              // />
              null // Placeholder
            ))
          )}
        </div>

        {/* Input Bar (Footer) */}
        <ChatInputBar />
        
      </div>
    </main>
  );
}
