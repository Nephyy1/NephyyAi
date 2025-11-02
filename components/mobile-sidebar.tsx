"use client"

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Menu, Plus, Bot, Code, Sparkles } from "lucide-react"

function SidebarContent({ onClose }: { onClose?: () => void }) {
  
  return (
    <div className="flex flex-col h-full p-4 space-y-4 bg-white">
      <div className="flex items-center justify-between pb-2">
        <h2 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-soft-teal-foreground to-soft-lavender-foreground">
          NephyyAI
        </h2>
      </div>
      
      <Button 
        variant="outline" 
        className="w-full justify-start text-base font-medium shadow-input-light border-border/60"
        onClick={onClose}
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
          <Button variant="ghost" className="w-full justify-start font-normal" onClick={onClose}>
            <Bot className="w-4 h-4 mr-3 text-muted-foreground" />
            General Assistant
          </Button>
          <Button variant="ghost" className="w-full justify-start font-normal" onClick={onClose}>
            <Code className="w-4 h-4 mr-3 text-muted-foreground" />
            Code Helper
          </Button>
          <Button variant="ghost" className="w-full justify-start font-normal" onClick={onClose}>
            <Sparkles className="w-4 h-4 mr-3 text-muted-foreground" />
            Creative Writer
          </Button>
        </nav>
      </div>
    </div>
  )
}


export function MobileSidebar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="lg:hidden">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="w-5 h-5" />
          </Button>
        </DialogTrigger>
        <DialogContent 
          className="p-0 m-0 w-72 h-screen max-w-xs sm:max-w-xs
                     fixed left-0 top-0 
                     translate-x-0 translate-y-0
                     data-[state=open]:slide-in-from-left-full
                     data-[state=closed]:slide-out-to-left-full"
        >
          <SidebarContent onClose={() => setIsOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
          
