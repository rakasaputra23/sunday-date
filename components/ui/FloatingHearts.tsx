"use client"
import { useEffect, useState } from "react"

type Heart = { id: number; left: number; duration: number; delay: number; emoji: string; size: number }
const EMOJIS = ["💕","❤️","🌸","✨","💗","🌷"]

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([])
  useEffect(() => {
    setHearts(Array.from({ length: 7 }, (_, i) => ({
      id: i,
      left: 5 + Math.random() * 88,
      duration: 9 + Math.random() * 9,
      delay: Math.random() * 7,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      size: 0.85 + Math.random() * 0.7,
    })))
  }, [])
  return (
    <>
      {hearts.map(h => (
        <span
          key={h.id}
          className="heart-float"
          style={{
            left: `${h.left}%`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            fontSize: `${h.size}rem`,
            opacity: 0.3,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </>
  )
}