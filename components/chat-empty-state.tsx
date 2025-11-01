import React from 'react'
import { Sparkles } from "lucide-react"

export function ChatEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
      <div className="mb-4 p-4 rounded-full bg-gradient-to-br from-soft-teal-foreground/10 to-soft-lavender-foreground/10">
        <Sparkles className="w-12 h-12 text-transparent bg-clip-text bg-gradient-to-r from-soft-teal to-soft-lavender" strokeWidth={1.5} />
      </div>
      <h2 className="text-2xl font-semibold mb-2">
        Hello! I am NephyyAI.
      </h2>
      <p className="text-muted-foreground">
        Choose your persona or start chatting.
      </p>
    </div>
  )
}
