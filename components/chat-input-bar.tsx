"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUp, Loader2, Image } from "lucide-react"
import { cn } from '@/lib/utils'

interface ChatInputBarProps {
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  isImageMode: boolean;
  onImageModeToggle: () => void;
}

export function ChatInputBar({ 
  inputValue, 
  onInputChange, 
  onSubmit, 
  isLoading,
  isImageMode,
  onImageModeToggle
}: ChatInputBarProps) {

  return (
    <footer className="w-full p-4 border-t bg-background">
      <form 
        onSubmit={onSubmit} 
        className="relative flex w-full max-w-4xl mx-auto items-center"
      >
        <div className="relative flex-1">
          <Button
            type="button"
            variant={isImageMode ? "default" : "ghost"}
            size="icon"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full"
            onClick={onImageModeToggle}
            disabled={isLoading}
          >
            <Image className="w-5 h-5" />
          </Button>
          <Input 
            value={inputValue}
            onChange={onInputChange}
            placeholder={isImageMode ? "Jelaskan gambar yang ingin Anda buat..." : "Ketik pesan..."}
            className="w-full h-12 pl-14 pr-16 rounded-full shadow-input-light focus-visible:ring-1"
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
