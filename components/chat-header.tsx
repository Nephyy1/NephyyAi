import React from 'react'
import { MobileSidebar } from "@/components/mobile-sidebar"
import { Settings, BadgeCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ChatHeader() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-background/95 backdrop-blur-sm">
      <div className="flex items-center">
        <MobileSidebar />
        
        <div className="ml-2 flex items-center space-x-1.5">
          <h2 className="text-lg font-semibold">
            NephyyAI
          </h2>
          <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-500" />
        </div>

      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </header>
  )
}
