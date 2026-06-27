"use client"
import { useEffect, useState } from "react"

type Props = { message: string; from: string; onNext: () => void }

export default function StepLoveNote({ message, from, onNext }: Props) {
  const [headerVis, setHeaderVis] = useState(false)
  const [displayed, setDisplayed] = useState("")
  const [done, setDone] = useState(false)
  const [sigVis, setSigVis] = useState(false)
  const [btnVis, setBtnVis] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setHeaderVis(true), 200)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!headerVis) return
    let i = 0
    const start = setTimeout(() => {
      const iv = setInterval(() => {
        i++
        setDisplayed(message.slice(0, i))
        if (i >= message.length) {
          clearInterval(iv)
          setDone(true)
          setTimeout(() => setSigVis(true), 350)
          setTimeout(() => setBtnVis(true), 800)
        }
      }, 26)
      return () => clearInterval(iv)
    }, 700)
    return () => clearTimeout(start)
  }, [headerVis, message])

  return (
    <div className="min-h-screen w-full bg-[#fff8f5] flex flex-col items-center justify-center px-5 py-14 overflow-x-hidden relative">
      {/* Deco circles */}
      <div className="absolute top-12 right-5 w-28 h-28 rounded-full border border-rose-200/40 pointer-events-none" />
      <div className="absolute bottom-16 left-4 w-18 h-18 rounded-full border border-rose-100/60 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[340px] mx-auto">
        {/* Header */}
        <div
          className="text-center mb-8 transition-all duration-700"
          style={{ opacity: headerVis ? 1 : 0, transform: headerVis ? "translateY(0)" : "translateY(16px)" }}
        >
          <div className="text-[48px] mb-3 leading-none">💌</div>
          <p className="text-rose-400/55 text-[10px] tracking-[0.28em] uppercase font-semibold">pesan spesial</p>
          <div className="w-10 h-px bg-rose-200 mx-auto mt-3" />
        </div>

        {/* Card */}
        <div
          className="bg-white rounded-3xl p-6 shadow-[0_2px_20px_rgba(244,63,94,0.06)] border border-rose-100/70 transition-opacity duration-700"
          style={{ opacity: headerVis ? 1 : 0 }}
        >
          {/* Deco corner */}
          <div className="absolute top-3 right-4 text-[28px] opacity-[0.07] select-none pointer-events-none">❤️</div>

          <p className="font-playfair text-[#130608] text-[16px] leading-[1.85] italic min-h-[72px]">
            &ldquo;{displayed}
            {!done && <span className="tw-cursor not-italic" />}
            {done && "\u201D"}
          </p>

          <div
            className="mt-5 pt-4 border-t border-rose-100 flex justify-end transition-all duration-600"
            style={{ opacity: sigVis ? 1 : 0, transform: sigVis ? "translateY(0)" : "translateY(8px)" }}
          >
            <p className="text-rose-400 text-[13px] font-semibold">— with love, {from} ❤️</p>
          </div>
        </div>

        {/* Button */}
        <div
          className="mt-7 transition-all duration-700"
          style={{ opacity: btnVis ? 1 : 0, transform: btnVis ? "translateY(0)" : "translateY(12px)" }}
        >
          <button
            onClick={onNext}
            className="w-full py-4 rounded-2xl bg-rose-500 text-white font-semibold text-[14px] tracking-wide hover:bg-rose-400 active:scale-[0.98] transition-all duration-150 shadow-[0_8px_28px_rgba(244,63,94,0.25)]"
          >
            Lihat penutupnya 🌹
          </button>
        </div>
      </div>
    </div>
  )
}