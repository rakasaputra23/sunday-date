"use client"
import { useEffect, useState } from "react"
import FloatingHearts from "@/components/ui/FloatingHearts"

type Props = { name2: string; onNext: () => void }

export default function StepOpening({ name2, onNext }: Props) {
  const [ph, setPh] = useState(0)

  useEffect(() => {
    const t = [
      setTimeout(() => setPh(1), 350),
      setTimeout(() => setPh(2), 1200),
      setTimeout(() => setPh(3), 2300),
    ]
    return () => t.forEach(clearTimeout)
  }, [])

  const vis = (n: number) => ({
    opacity: ph >= n ? 1 : 0,
    transform: ph >= n ? "translateY(0)" : "translateY(22px)",
    transition: "opacity 0.9s ease, transform 0.9s cubic-bezier(0.22,1,0.36,1)",
  })

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#130608] overflow-hidden px-6 py-12">
      <FloatingHearts />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[280px] h-[280px] rounded-full bg-rose-600/12 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-[200px] rounded-full bg-pink-700/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-[340px] mx-auto text-center flex flex-col items-center gap-0">
        {/* Label */}
        <div style={vis(1)}>
          <p className="text-rose-400/55 text-[10px] tracking-[0.28em] uppercase font-semibold mb-4">
            khusus untuk
          </p>
        </div>

        {/* Nama besar */}
        <div style={vis(1)}>
          <h1 className="font-playfair text-[64px] leading-none font-bold text-white mb-5">
            {name2}
          </h1>
          <div className="w-14 h-[1.5px] bg-rose-400/35 mx-auto" />
        </div>

        {/* Tagline */}
        <div style={vis(2)} className="mt-7">
          <p className="text-rose-100/60 text-[17px] leading-[1.7] font-light">
            ada sesuatu yang spesial<br />
            <span className="text-rose-300/90 font-medium">untukmu besok</span> 🌹
          </p>
        </div>

        {/* CTA */}
        <div style={vis(3)} className="mt-11 flex flex-col items-center gap-3">
          <button
            onClick={onNext}
            className="pulse-btn w-full max-w-[240px] py-4 rounded-full bg-rose-500 text-white font-semibold text-[15px] tracking-wide hover:bg-rose-400 active:scale-[0.97] transition-all duration-150"
          >
            Buka Suratnya 💌
          </button>
          <p className="text-rose-400/35 text-[11px]">tap untuk lanjut</p>
        </div>
      </div>
    </div>
  )
}