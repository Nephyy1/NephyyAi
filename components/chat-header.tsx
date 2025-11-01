import React from 'react'
import { MobileSidebar } from "@/components/mobile-sidebar"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ChatHeader() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-background/95 backdrop-blur-sm">
      <div className="flex items-center">
        <MobileSidebar />
        <h2 className="ml-2 text-lg font-semibold">
          General Assistant
        </h2>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </header>
  )
}
