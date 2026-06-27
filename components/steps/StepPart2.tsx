"use client"
import { useEffect, useState } from "react"
import type { ScheduleItem } from "@/lib/config"

type Props = {
  label: string; title: string; emoji: string
  items: ScheduleItem[]; onNext: () => void
}

export default function StepPart2({ label, title, emoji, items, onNext }: Props) {
  const [headerVis, setHeaderVis] = useState(false)
  const [shown, setShown] = useState<boolean[]>(new Array(items.length).fill(false))
  const [btnVis, setBtnVis] = useState(false)

  useEffect(() => {
    const t0 = setTimeout(() => setHeaderVis(true), 150)
    const ts = items.map((_, i) =>
      setTimeout(() => setShown(prev => { const n=[...prev]; n[i]=true; return n }), 400 + i * 340)
    )
    const tb = setTimeout(() => setBtnVis(true), 400 + items.length * 340 + 280)
    return () => { clearTimeout(t0); ts.forEach(clearTimeout); clearTimeout(tb) }
  }, [items.length])

  return (
    <div className="min-h-screen w-full bg-[#130608] flex flex-col px-5 py-12 overflow-x-hidden relative">
      {/* Glows */}
      <div className="absolute top-0 right-0 w-56 h-56 rounded-full bg-rose-600/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-pink-800/8 blur-3xl pointer-events-none" />

      {/* Header */}
      <div
        className="mb-8 relative z-10 transition-all duration-700"
        style={{ opacity: headerVis ? 1 : 0, transform: headerVis ? "translateY(0)" : "translateY(18px)" }}
      >
        <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-rose-400 bg-rose-400/10 px-3 py-1 rounded-full mb-3">
          {label}
        </span>
        <h2 className="font-playfair text-[30px] leading-snug font-bold text-white">
          {title} {emoji}
        </h2>
        <div className="w-10 h-[2px] bg-rose-500/40 rounded-full mt-3" />
      </div>

      {/* Timeline */}
      <div className="flex-1 relative z-10">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex gap-4 transition-all duration-500"
            style={{ opacity: shown[i] ? 1 : 0, transform: shown[i] ? "translateX(0)" : "translateX(-16px)" }}
          >
            <div className="flex flex-col items-center flex-shrink-0 pt-1" style={{ width: 44 }}>
              <div className="w-11 h-11 rounded-full bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-[20px] flex-shrink-0">
                {item.emoji}
              </div>
              {i < items.length - 1 && (
                <div className="w-px bg-rose-500/18 flex-1 mt-2" style={{ minHeight: 24 }} />
              )}
            </div>
            <div className="pb-6 pt-1 min-w-0 flex-1">
              <p className="text-rose-400/55 text-[11px] font-semibold tabular-nums mb-1">{item.time}</p>
              <p className="font-semibold text-white text-[15px] leading-snug">{item.title}</p>
              <p className="text-rose-100/45 text-[13px] mt-1 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <div
        className="pt-2 relative z-10 transition-all duration-700"
        style={{ opacity: btnVis ? 1 : 0, transform: btnVis ? "translateY(0)" : "translateY(14px)" }}
      >
        <button
          onClick={onNext}
          className="w-full py-4 rounded-2xl bg-rose-500 text-white font-semibold text-[14px] tracking-wide hover:bg-rose-400 active:scale-[0.98] transition-all duration-150 shadow-[0_8px_28px_rgba(244,63,94,0.25)]"
        >
          Ada pesan untukmu 💌
        </button>
      </div>
    </div>
  )
}