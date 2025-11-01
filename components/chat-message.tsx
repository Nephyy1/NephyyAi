"use client"

import React from 'react'
import Image from 'next/image'
import { cn } from "@/lib/utils"
import { User } from "lucide-react"

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className={cn(
      "flex items-start space-x-3 w-full max-w-2xl mx-auto",
      isUser ? "justify-end" : "justify-start"
    )}>
      
      {!isUser && (
        <Image
          src="/profile/nephyy.gif"
          alt="Nephyy Profile"
          width={32}
          height={32}
          className="flex-shrink-0 rounded-full object-cover"
        />
      )}

      <div className={cn(
        "p-4 rounded-xl max-w-[75%]",
        isUser
          ? "bg-background rounded-br-none shadow-soft-light-3d border border-border/70"
          : "bg-gradient-to-br from-white to-primary/10 rounded-bl-none shadow-bubble-ai border border-border/50"
      )}>
        <p className="text-sm text-foreground/90 whitespace-pre-wrap">
          {content}
        </p>
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <User className="w-5 h-5 text-muted-foreground" />
        </div>
      )}

    </div>
  )
}
