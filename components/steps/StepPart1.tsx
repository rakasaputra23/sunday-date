"use client"
import { useEffect, useState } from "react"
import type { ScheduleItem } from "@/lib/config"

type Props = {
  label: string; title: string; emoji: string
  items: ScheduleItem[]; onNext: () => void
}

export default function StepPart1({ label, title, emoji, items, onNext }: Props) {
  const [headerVis, setHeaderVis] = useState(false)
  const [shown, setShown] = useState<boolean[]>(new Array(items.length).fill(false))
  const [btnVis, setBtnVis] = useState(false)

  useEffect(() => {
    const t0 = setTimeout(() => setHeaderVis(true), 150)
    const ts = items.map((_, i) =>
      setTimeout(() => setShown(prev => { const n=[...prev]; n[i]=true; return n }), 450 + i * 380)
    )
    const tb = setTimeout(() => setBtnVis(true), 450 + items.length * 380 + 280)
    return () => { clearTimeout(t0); ts.forEach(clearTimeout); clearTimeout(tb) }
  }, [items.length])

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-amber-50 via-[#fff8f5] to-orange-50 flex flex-col px-5 py-12 overflow-x-hidden">
      {/* Header */}
      <div
        className="mb-8 transition-all duration-700"
        style={{ opacity: headerVis ? 1 : 0, transform: headerVis ? "translateY(0)" : "translateY(18px)" }}
      >
        <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-amber-700 bg-amber-100 px-3 py-1 rounded-full mb-3">
          {label}
        </span>
        <h2 className="font-playfair text-[30px] leading-snug font-bold text-[#130608]">
          {title} {emoji}
        </h2>
        <div className="w-10 h-[2px] bg-amber-300 rounded-full mt-3" />
      </div>

      {/* Timeline */}
      <div className="flex-1">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex gap-4 transition-all duration-500"
            style={{ opacity: shown[i] ? 1 : 0, transform: shown[i] ? "translateX(0)" : "translateX(-16px)" }}
          >
            {/* Dot col */}
            <div className="flex flex-col items-center flex-shrink-0 pt-1" style={{ width: 44 }}>
              <div className="w-11 h-11 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-[20px] shadow-sm flex-shrink-0">
                {item.emoji}
              </div>
              {i < items.length - 1 && (
                <div className="w-px bg-amber-200 flex-1 mt-2" style={{ minHeight: 24 }} />
              )}
            </div>

            {/* Content */}
            <div className="pb-7 pt-1 min-w-0 flex-1">
              <p className="text-amber-600/70 text-[11px] font-semibold tabular-nums mb-1">{item.time}</p>
              <p className="font-semibold text-[#130608] text-[15px] leading-snug">{item.title}</p>
              <p className="text-gray-500 text-[13px] mt-1 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <div
        className="pt-2 transition-all duration-700"
        style={{ opacity: btnVis ? 1 : 0, transform: btnVis ? "translateY(0)" : "translateY(14px)" }}
      >
        <button
          onClick={onNext}
          className="w-full py-4 rounded-2xl bg-[#130608] text-white font-semibold text-[14px] tracking-wide hover:bg-rose-900 active:scale-[0.98] transition-all duration-150"
        >
          Lanjut ke sore hari ✨
        </button>
      </div>
    </div>
  )
}