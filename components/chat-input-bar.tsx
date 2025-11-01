"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Paperclip, ArrowUp, Loader2 } from "lucide-react"

interface ChatInputBarProps {
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export function ChatInputBar({ 
  inputValue, 
  onInputChange, 
  onSubmit, 
  isLoading 
}: ChatInputBarProps) {

  return (
    <footer className="sticky bottom-0 z-10 w-full p-4 border-t bg-background/95 backdrop-blur-sm">
      <form 
        onSubmit={onSubmit} 
        className="relative flex w-full max-w-4xl mx-auto items-center"
      >
        <div className="relative flex-1">
          <Paperclip className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            value={inputValue}
            onChange={onInputChange}
            placeholder="Ketik pesan atau unggah file..."
            className="w-full h-12 pl-12 pr-16 rounded-full shadow-input-light focus-visible:ring-1"
            autoComplete="off"
            disabled={isLoading}
          />
        </div>
        
        <Button 
          type="submit" 
          size="icon" 
          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full"
          disabled={!inputValue.trim() || isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <ArrowUp className="w-5 h-5" />
          )}
          <span className="sr-only">Kirim pesan</span>
        </Button>
      </form>
    </footer>
  )
}
