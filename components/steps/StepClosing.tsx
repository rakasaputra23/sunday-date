"use client"
import { useEffect, useState } from "react"
import { siteConfig, type ScheduleItem } from "@/lib/config"

/* ── types ─────────────────────────────────────── */
type Burst = { id: number; tx: string; ty: string; emoji: string; delay: string }
type Countdown = { hours: number; minutes: number; seconds: number }
type Props = {
  name1: string; name2: string
  dateTarget: string; dateLabel: string; footerNote: string
}

/* ── helpers ────────────────────────────────────── */
const BURST_E = ["💕","❤️","🌸","✨","💗","🌷","🎉","💖"]
function makeBursts(n: number): Burst[] {
  return Array.from({ length: n }, (_, i) => {
    const angle = (i / n) * 2 * Math.PI
    const dist  = 70 + Math.random() * 110
    return {
      id: i,
      tx: `${Math.cos(angle) * dist}px`,
      ty: `${Math.sin(angle) * dist}px`,
      emoji: BURST_E[Math.floor(Math.random() * BURST_E.length)],
      delay: `${Math.random() * 0.25}s`,
    }
  })
}

/* ── mini timeline item ─────────────────────────── */
function MiniItem({ item, isLast, dark }: { item: ScheduleItem; isLast: boolean; dark?: boolean }) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center flex-shrink-0 pt-0.5" style={{ width: 34 }}>
        <div
          className={`w-[34px] h-[34px] rounded-full flex items-center justify-center text-[15px] flex-shrink-0 ${
            dark
              ? "bg-rose-500/10 border border-rose-500/20"
              : "bg-amber-100 border border-amber-200"
          }`}
        >
          {item.emoji}
        </div>
        {!isLast && (
          <div
            className={`w-px flex-1 mt-1.5 ${dark ? "bg-rose-500/15" : "bg-amber-200/60"}`}
            style={{ minHeight: 16 }}
          />
        )}
      </div>
      <div className="pb-4 pt-0.5 min-w-0 flex-1">
        <p className={`text-[10px] font-semibold tabular-nums mb-0.5 ${dark ? "text-rose-400/50" : "text-amber-600/65"}`}>
          {item.time}
        </p>
        <p className={`font-semibold text-[13px] leading-snug ${dark ? "text-white/90" : "text-[#130608]"}`}>
          {item.title}
        </p>
        <p className={`text-[12px] mt-0.5 leading-relaxed ${dark ? "text-rose-100/40" : "text-gray-500/80"}`}>
          {item.desc}
        </p>
      </div>
    </div>
  )
}

/* ── main component ─────────────────────────────── */
export default function StepClosing({ name1, name2, dateTarget, dateLabel, footerNote }: Props) {
  const [bursts, setBursts]     = useState<Burst[]>([])
  const [visible, setVisible]   = useState(false)
  const [countdown, setCountdown] = useState<Countdown>({ hours: 0, minutes: 0, seconds: 0 })
  const [isPast, setIsPast]     = useState(false)
  const [mounted, setMounted]   = useState(false)

  /* burst on mount */
  useEffect(() => {
    setBursts(makeBursts(18))
    const t1 = setTimeout(() => setVisible(true), 180)
    const t2 = setTimeout(() => setBursts([]), 1800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  /* countdown */
  useEffect(() => {
    setMounted(true)
    const tick = () => {
      const diff = new Date(dateTarget).getTime() - Date.now()
      if (diff <= 0) { setIsPast(true); return }
      setCountdown({
        hours:   Math.floor(diff / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [dateTarget])

  const reBurst = () => {
    setBursts(makeBursts(22))
    setTimeout(() => setBursts([]), 1800)
  }

  const part1 = siteConfig.schedule.part1
  const part2 = siteConfig.schedule.part2

  return (
    <div className="min-h-screen w-full bg-[#130608] overflow-x-hidden relative">
      {/* Ambient glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-rose-600/7 blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[220px] h-[220px] rounded-full bg-pink-800/8 blur-3xl pointer-events-none" />

      {/* Bursts */}
      {bursts.map(b => (
        <span
          key={b.id}
          className="heart-burst"
          style={{ "--tx": b.tx, "--ty": b.ty, animationDelay: b.delay } as React.CSSProperties}
        >
          {b.emoji}
        </span>
      ))}

      {/* Scrollable content */}
      <div
        className="relative z-10 w-full max-w-[360px] mx-auto px-5 py-12 transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(22px)" }}
      >
        {/* ── Hero closing text ────────────────────── */}
        <div className="text-center mb-10">
          <p className="text-rose-400/45 text-[10px] tracking-[0.3em] uppercase font-semibold mb-5">
            sampai jumpa
          </p>
          <h1 className="font-playfair text-[52px] leading-[1.05] font-bold text-white">
            See you
          </h1>
          <h2 className="shimmer-text font-playfair text-[52px] leading-[1.05] font-bold mb-6">
            tomorrow 🌅
          </h2>
          <p className="text-rose-100/45 text-[14px] leading-relaxed">
            {name1} sudah tidak sabar<br />
            <span className="text-rose-100/65 font-medium">menghabiskan hari bersama {name2} 💕</span>
          </p>
        </div>

        {/* ── Countdown ───────────────────────────── */}
        <div className="bg-white/5 border border-white/8 rounded-3xl p-5 mb-8">
          <p className="text-rose-300/50 text-[10px] uppercase tracking-widest text-center mb-4">
            {dateLabel}
          </p>
          {!mounted ? (
            <div className="grid grid-cols-3 gap-2.5">
              {["Jam","Menit","Detik"].map(l => (
                <div key={l} className="bg-white/5 rounded-2xl py-4 text-center">
                  <p className="text-white text-[28px] font-bold tabular-nums leading-none">00</p>
                  <p className="text-rose-300/45 text-[10px] mt-1.5">{l}</p>
                </div>
              ))}
            </div>
          ) : isPast ? (
            <div className="text-center py-3">
              <p className="text-white text-[18px] font-semibold mb-1">Hari ini hari kita! 🎉</p>
              <p className="text-rose-300/55 text-[13px]">Have the best time together ❤️</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { val: countdown.hours, lbl: "Jam" },
                { val: countdown.minutes, lbl: "Menit" },
                { val: countdown.seconds, lbl: "Detik" },
              ].map(({ val, lbl }) => (
                <div key={lbl} className="bg-white/5 rounded-2xl py-4 text-center">
                  <p className="text-white text-[28px] font-bold tabular-nums leading-none">
                    {String(val).padStart(2, "0")}
                  </p>
                  <p className="text-rose-300/45 text-[10px] mt-1.5">{lbl}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── DIVIDER: Rekap Jadwal ─────────────────── */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-white/8" />
          <p className="text-rose-400/50 text-[10px] tracking-[0.22em] uppercase font-semibold whitespace-nowrap">
            Rekap Hari Kita
          </p>
          <div className="flex-1 h-px bg-white/8" />
        </div>

        {/* ── Part 1: Pagi — light card ─────────────── */}
        <div className="bg-amber-50/6 border border-amber-300/10 rounded-2xl p-5 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full">
              {part1.label}
            </span>
            <span className="font-semibold text-amber-100/80 text-[13px]">
              {part1.title} {part1.emoji}
            </span>
          </div>
          {part1.items.map((item, i) => (
            <MiniItem key={i} item={item} isLast={i === part1.items.length - 1} dark={false} />
          ))}
        </div>

        {/* ── Part 2: Sore-malam — dark card ─────────── */}
        <div className="bg-rose-500/5 border border-rose-500/12 rounded-2xl p-5 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-rose-400 bg-rose-400/10 px-2.5 py-1 rounded-full">
              {part2.label}
            </span>
            <span className="font-semibold text-rose-100/80 text-[13px]">
              {part2.title} {part2.emoji}
            </span>
          </div>
          {part2.items.map((item, i) => (
            <MiniItem key={i} item={item} isLast={i === part2.items.length - 1} dark={true} />
          ))}
        </div>

        {/* ── Footer note ──────────────────────────── */}
        <p className="font-playfair italic text-rose-100/30 text-[13px] text-center leading-relaxed mb-7 px-2">
          &ldquo;{footerNote}&rdquo;
        </p>

        {/* ── Re-burst ─────────────────────────────── */}
        <div className="text-center">
          <button
            onClick={reBurst}
            className="text-rose-400/50 text-[12px] hover:text-rose-400 transition-colors duration-200"
          >
            tap untuk confetti lagi 🎊
          </button>
        </div>

        {/* Bottom safe space */}
        <div className="h-8" />
      </div>
    </div>
  )
}