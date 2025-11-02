"use client"

import React from 'react'
import Image from 'next/image'
import { cn } from "@/lib/utils"
import { User } from "lucide-react"
import ReactMarkdown from "react-markdown"

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
        "p-4 rounded-xl max-w-[85%] text-sm break-words",
        isUser
          ? "bg-muted text-foreground rounded-br-none"
          : "bg-primary text-primary-foreground rounded-bl-none"
      )}>
        <ReactMarkdown 
          components={{
            h1: (props) => <h1 className="text-lg font-semibold mb-2" {...props} />,
            h2: (props) => <h2 className="text-base font-semibold mb-2" {...props} />,
            h3: (props) => <h3 className="text-sm font-semibold mb-1" {...props} />,
            strong: (props) => <strong className="font-semibold" {...props} />,
            p: (props) => <p className="mb-2 last:mb-0" {...props} />,
            pre: (props) => <pre className="p-3 my-2 bg-black/10 rounded-md whitespace-pre-wrap break-words" {...props} />,
            code: (props) => <code className="font-mono text-sm bg-black/10 px-1 py-0.5 rounded" {...props} />
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <User className="w-5 h-5 text-muted-foreground" />
        </div>
      )}

    </div>
  )
}
                             
