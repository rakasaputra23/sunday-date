"use client"
import { useCallback, useEffect, useRef, useState } from "react"

type Props = { name1: string; name2: string; onAccept: () => void }

const FLEE = [
  "Kemana kamu?? 😭","Jangan kabur dong!","Ayo dong... 🥺",
  "Masa iya nggak mau?","Tenang, aku baik kok!","Oke oke aku minta maaf 😢",
  "Plisss... 🙏","Aduh capek ngejar kamu 😤",
]

export default function StepQuestion({ name1, name2, onAccept }: Props) {
  const [pos, setPos]   = useState({ x: 0, y: 0 })
  const [count, setCount] = useState(0)
  const [msg, setMsg]   = useState("")
  const [visible, setVisible] = useState(false)
  const areaRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setTimeout(() => setVisible(true), 100) }, [])

  const flee = useCallback(() => {
    const area = areaRef.current
    if (!area) return
    const { width, height } = area.getBoundingClientRect()
    // Batasi agar tidak keluar layar — safe zone 70px tiap sisi
    const safeW = Math.max(width  - 160, 60)
    const safeH = Math.max(height - 160, 60)
    const nx = (Math.random() - 0.5) * safeW
    const ny = (Math.random() - 0.5) * safeH
    setPos({ x: nx, y: ny })
    setCount(c => {
      const next = c + 1
      setMsg(FLEE[Math.min(next - 1, FLEE.length - 1)])
      return next
    })
  }, [])

  return (
    <div
      className="relative min-h-screen w-full bg-[#fff8f5] overflow-hidden flex flex-col items-center justify-center px-6 py-14"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.5s ease" }}
    >
      {/* Decoration */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-4xl pointer-events-none select-none">🌸</div>
      <div className="absolute bottom-8 right-6 text-3xl pointer-events-none select-none opacity-40">💐</div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-[320px] mx-auto text-center">
        <p className="text-rose-400/55 text-[10px] tracking-[0.25em] uppercase font-semibold mb-3">
          dari {name1}
        </p>
        <h2 className="font-playfair text-[38px] leading-[1.2] font-bold text-[#130608] mb-4">
          Mau nggak<br />jalan bareng aku?
        </h2>
        <p className="text-gray-400 text-[14px] mb-10">
          {name2}, kamu mau kan? 🥺
        </p>

        {/* Flee msg */}
        <div className="h-6 mb-6 transition-opacity duration-300" style={{ opacity: count > 0 ? 1 : 0 }}>
          <p className="text-rose-500 text-[13px] font-semibold">{msg}</p>
        </div>

        {/* Tombol MAU */}
        <div className="flex justify-center mb-0">
          <button
            onClick={onAccept}
            className="w-full max-w-[220px] py-4 rounded-full bg-rose-500 text-white font-bold text-[15px] tracking-wide shadow-[0_8px_24px_rgba(244,63,94,0.3)] hover:bg-rose-400 active:scale-[0.97] transition-all duration-150"
          >
            Mau banget! 💕
          </button>
        </div>
      </div>

      {/* Flee area — full screen, pointer-events none except the button */}
      <div ref={areaRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 20 }}>
        <button
          onMouseEnter={flee}
          onTouchStart={(e) => { e.preventDefault(); flee() }}
          onClick={flee}
          className="pointer-events-auto absolute top-1/2 left-1/2 px-5 py-3 rounded-full border-2 border-rose-200 text-rose-300/80 text-[13px] font-medium bg-white/90 backdrop-blur-sm cursor-default select-none whitespace-nowrap"
          style={{
            transform: `translate(calc(-50% + ${pos.x}px), calc(80px + ${pos.y}px))`,
            transition: "transform 0.22s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          Nggak mau 🙅‍♀️
        </button>
      </div>

      {count === 0 && (
        <p className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-300 text-[11px] whitespace-nowrap pointer-events-none">
          pilih dengan hati-hati ya 😏
        </p>
      )}
    </div>
  )
}