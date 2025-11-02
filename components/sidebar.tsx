import React from 'react'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus, Bot, Code, Sparkles } from "lucide-react"

export function Sidebar() {
  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-72 bg-white border-r border-border h-screen sticky top-0">
      <div className="flex flex-col h-full p-4 space-y-4">
        
        <div className="flex items-center justify-between pb-2">
          <h2 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-soft-teal-foreground to-soft-lavender-foreground">
            NephyyAI
          </h2>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full justify-start text-base font-medium
                     shadow-input-light hover:shadow-soft-light-3d 
                     transition-all duration-300 ease-in-out
                     border-border/60"
        >
          <Plus className="w-4 h-4 mr-3" />
          New Chat
        </Button>

        <Separator className="my-4" />

        <div className="flex-1 overflow-y-auto">
          <h3 className="px-2 mb-2 text-sm font-semibold text-muted-foreground tracking-wide">
            Asisten Kustom
          </h3>
          <nav className="flex flex-col space-y-1">
            <Button variant="ghost" className="w-full justify-start font-normal">
              <Bot className="w-4 h-4 mr-3 text-muted-foreground" />
              General Assistant
            </Button>
            <Button variant="ghost" className="w-full justify-start font-normal">
              <Code className="w-4 h-4 mr-3 text-muted-foreground" />
              Code Helper
            </Button>
            <Button variant="ghost" className="w-full justify-start font-normal">
              <Sparkles className="w-4 h-4 mr-3 text-muted-foreground" />
              Creative Writer
            </Button>
          </nav>
        </div>
        
      </div>
    </aside>
  )
}
