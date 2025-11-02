"use client"

import React from 'react'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'
import { cn } from "@/lib/utils"

export function ChatLoadingIndicator() {
  return (
    <div className={cn(
      "flex items-start space-x-3 w-full max-w-2xl mx-auto",
      "justify-start"
    )}>
      
      <Image
        src="/profile/nephyy.gif"
        alt="Nephyy Profile"
        width={32}
        height={32}
        className="flex-shrink-0 rounded-full object-cover"
      />

      <div className={cn(
        "p-4 rounded-xl max-w-[85%] text-sm text-foreground/90 whitespace-pre-wrap break-words",
        "bg-gradient-to-br from-white to-primary/10 rounded-bl-none shadow-bubble-ai border border-border/50"
      )}>
        <div className="flex items-center space-x-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Nephyy sedang berpikir...</span>
        </div>
      </div>
    </div>
  )
}
