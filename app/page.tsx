"use client"

import React, { useState, FormEvent, ChangeEvent, useRef, useEffect } from "react";
import { ChatHeader } from "@/components/chat-header";
import { ChatInputBar } from "@/components/chat-input-bar";
import { ChatEmptyState } from "@/components/chat-empty-state";
import { ChatMessage } from "@/components/chat-message";
import { ChatLoadingIndicator } from "@/components/chat-loading-indicator";

interface Message {
  role: "user" | "assistant";
  content: string;
  imageBase64?: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isImageMode, setIsImageMode] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = { role: "user", content: inputValue };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          history: newMessages, 
          isImageMode: isImageMode 
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal mendapat respons dari server :(");
      }

      const data = await response.json();
      
      let aiMessage: Message;
      if (data.imageBase64) {
        aiMessage = { 
          role: "assistant", 
          content: `Gambar yang Anda minta: "${userMessage.content}"`,
          imageBase64: data.imageBase64 
        };
      } else {
        aiMessage = { 
          role: "assistant", 
          content: data.reply || "Maaf, terjadi kesalahan saat memproses permintaan." 
        };
      }
      
      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        role: "assistant",
        content: "Aduh, maaf T_T Kayaknya ada yang error... coba lagi yaa?",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsImageMode(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <main className="flex h-screen w-full bg-background">
      <div className="flex flex-1 flex-col h-screen">
        <ChatHeader />

        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {messages.length === 0 ? (
            <ChatEmptyState />
          ) : (
            messages.map((msg, index) => (
              <ChatMessage 
                key={index} 
                role={msg.role} 
                content={msg.content} 
                imageBase64={msg.imageBase64}
              />
            ))
          )}
          
          {isLoading && (
            <ChatLoadingIndicator />
          )}
        </div>

        <ChatInputBar 
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          isImageMode={isImageMode}
          onImageModeToggle={() => setIsImageMode(!isImageMode)}
        />
      </div>
    </main>
  );
}
