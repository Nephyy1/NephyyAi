import React from 'react'
import Image from 'next/image'

export function ChatEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
      <div className="mb-4 p-1 rounded-full bg-gradient-to-br from-soft-teal-foreground/10 to-soft-lavender-foreground/10">
        <Image
          src="/profile/nephyy.gif"
          alt="Nephyy Profile"
          width={80}
          height={80}
          className="rounded-full object-cover"
        />
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
