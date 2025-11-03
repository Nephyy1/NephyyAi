import React from 'react'
import { BadgeCheck } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function ChatHeader() {
  return (
    <header className="flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-background">
      <div className="flex items-center">
        <div className="flex items-center space-x-1.5">
          <h2 className="text-lg font-semibold">
            NephyyAI
          </h2>
          <BadgeCheck className="w-4 h-4" />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <ThemeToggle />
      </div>
    </header>
  )
}
