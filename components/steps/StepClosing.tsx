import { useEffect, useRef, useState } from "react"
import { siteConfig, type ScheduleItem } from "@/lib/config"

/* ── types ──────────────────────────────────────── */
type Burst   = { id: number; tx: string; ty: string; emoji: string; delay: string }
type CD      = { hours: number; minutes: number; seconds: number }
type Props   = { name1: string; name2: string; dateTarget: string; dateLabel: string; footerNote: string }

/* ── burst factory ──────────────────────────────── */
const BE = ["💕","❤️","🌸","✨","💗","🌷","🎉","💖","🥰","🫶"]
function makeBursts(n: number): Burst[] {
  return Array.from({ length: n }, (_, i) => {
    const angle = (i / n) * 2 * Math.PI
    const dist  = 80 + Math.random() * 130
    return {
      id: i,
      tx: `${Math.cos(angle) * dist}px`,
      ty: `${Math.sin(angle) * dist}px`,
      emoji: BE[Math.floor(Math.random() * BE.length)],
      delay: `${(Math.random() * 0.3).toFixed(2)}s`,
    }
  })
}

/* ── mini timeline item ─────────────────────────── */
function MiniItem({
  item, isLast, variant, delay,
}: {
  item: ScheduleItem; isLast: boolean; variant: "amber" | "rose"; delay: number
}) {
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVis(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  const isAmber = variant === "amber"
  return (
    <div
      className="flex gap-3 transition-all duration-500"
      style={{ opacity: vis ? 1 : 0, transform: vis ? "translateX(0)" : "translateX(-14px)" }}
    >
      {/* dot + line */}
      <div className="flex flex-col items-center flex-shrink-0 pt-0.5" style={{ width: 32 }}>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-[14px] flex-shrink-0"
          style={{
            background: isAmber ? "rgba(251,191,36,0.12)" : "rgba(244,63,94,0.10)",
            border: `1px solid ${isAmber ? "rgba(251,191,36,0.25)" : "rgba(244,63,94,0.20)"}`,
          }}
        >
          {item.emoji}
        </div>
        {!isLast && (
          <div
            className="w-px flex-1 mt-1.5"
            style={{
              minHeight: 14,
              background: isAmber ? "rgba(251,191,36,0.15)" : "rgba(244,63,94,0.12)",
            }}
          />
        )}
      </div>
      {/* text */}
      <div className="pb-4 pt-0.5 min-w-0 flex-1">
        <p
          className="text-[10px] font-semibold tabular-nums mb-0.5"
          style={{ color: isAmber ? "rgba(251,191,36,0.55)" : "rgba(244,63,94,0.50)" }}
        >
          {item.time}
        </p>
        <p className="font-semibold text-[13px] leading-snug"
           style={{ color: isAmber ? "rgba(255,248,240,0.88)" : "rgba(255,255,255,0.88)" }}>
          {item.title}
        </p>
        <p className="text-[12px] mt-0.5 leading-relaxed"
           style={{ color: isAmber ? "rgba(255,220,180,0.45)" : "rgba(255,180,180,0.38)" }}>
          {item.desc}
        </p>
      </div>
    </div>
  )
}

/* ── countdown digit ────────────────────────────── */
function Digit({ val, label }: { val: number; label: string }) {
  const [prev, setPrev] = useState(val)
  const [flip, setFlip] = useState(false)
  useEffect(() => {
    if (val !== prev) {
      setFlip(true)
      setTimeout(() => { setPrev(val); setFlip(false) }, 280)
    }
  }, [val, prev])
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative w-full rounded-2xl overflow-hidden flex items-center justify-center"
        style={{
          height: 72,
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* top shine */}
        <div className="absolute top-0 left-0 right-0 h-px"
             style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)" }} />
        <p
          className="font-playfair tabular-nums font-bold transition-all duration-[280ms]"
          style={{
            fontSize: 32,
            lineHeight: 1,
            color: "#fff",
            transform: flip ? "scale(0.75) translateY(-6px)" : "scale(1) translateY(0)",
            opacity: flip ? 0 : 1,
          }}
        >
          {String(val).padStart(2, "0")}
        </p>
      </div>
      <p className="text-[10px] font-semibold tracking-widest uppercase"
         style={{ color: "rgba(244,63,94,0.45)" }}>
        {label}
      </p>
    </div>
  )
}

/* ── main ───────────────────────────────────────── */
export default function StepClosing({ name1, name2, dateTarget, dateLabel, footerNote }: Props) {
  const [bursts,    setBursts]    = useState<Burst[]>([])
  const [cd,        setCd]        = useState<CD>({ hours: 0, minutes: 0, seconds: 0 })
  const [isPast,    setIsPast]    = useState(false)
  const [mounted,   setMounted]   = useState(false)

  /* stagger sections */
  const [s0, setS0] = useState(false) // hero
  const [s1, setS1] = useState(false) // countdown
  const [s2, setS2] = useState(false) // divider + rekap
  const [s3, setS3] = useState(false) // footer

  useEffect(() => {
    setBursts(makeBursts(20))
    const clears = [
      setTimeout(() => setBursts([]), 1800),
      setTimeout(() => setS0(true), 120),
      setTimeout(() => setS1(true), 520),
      setTimeout(() => setS2(true), 900),
      setTimeout(() => setS3(true), 1300),
    ]
    return () => clears.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    setMounted(true)
    const tick = () => {
      const diff = new Date(dateTarget).getTime() - Date.now()
      if (diff <= 0) { setIsPast(true); return }
      setCd({
        hours:   Math.floor(diff / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    tick(); const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [dateTarget])

  const reBurst = () => {
    setBursts(makeBursts(24))
    setTimeout(() => setBursts([]), 1800)
  }

  const p1 = siteConfig.schedule.part1
  const p2 = siteConfig.schedule.part2

  const secStyle = (show: boolean, delay = 0): React.CSSProperties => ({
    opacity:   show ? 1 : 0,
    transform: show ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.65s ease ${delay}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  })

  return (
    <div className="min-h-screen w-full bg-[#0e0408] overflow-x-hidden relative">

      {/* ── layered background glows ─────────────────── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div style={{
          position:"absolute", top:"-10%", left:"50%", transform:"translateX(-50%)",
          width:380, height:380, borderRadius:"50%",
          background:"radial-gradient(circle, rgba(244,63,94,0.10) 0%, transparent 70%)",
          filter:"blur(2px)",
        }}/>
        <div style={{
          position:"absolute", bottom:"-5%", left:"20%",
          width:260, height:260, borderRadius:"50%",
          background:"radial-gradient(circle, rgba(190,18,60,0.08) 0%, transparent 70%)",
        }}/>
        <div style={{
          position:"absolute", top:"40%", right:"-5%",
          width:200, height:200, borderRadius:"50%",
          background:"radial-gradient(circle, rgba(244,63,94,0.06) 0%, transparent 70%)",
        }}/>
      </div>

      {/* ── burst hearts ─────────────────────────────── */}
      {bursts.map(b => (
        <span key={b.id} className="heart-burst"
          style={{ "--tx": b.tx, "--ty": b.ty, animationDelay: b.delay } as React.CSSProperties}>
          {b.emoji}
        </span>
      ))}

      {/* ── scrollable body ──────────────────────────── */}
      <div className="relative z-10 w-full max-w-[360px] mx-auto px-5 pt-14 pb-12">

        {/* ══ HERO ══════════════════════════════════════ */}
        <div style={secStyle(s0)} className="text-center mb-10">

          {/* label */}
          <p style={{
            fontSize:10, letterSpacing:"0.28em", textTransform:"uppercase",
            fontWeight:600, color:"rgba(244,63,94,0.40)", marginBottom:20,
          }}>
            sampai jumpa
          </p>

          {/* "See you" — plain white, no shimmer */}
          <h1 className="font-playfair" style={{
            fontSize:54, lineHeight:1.05, fontWeight:700,
            color:"#fff", marginBottom:2,
          }}>
            See you
          </h1>

          {/* "tomorrow" — shimmer tanpa emoji */}
          <h2 className="shimmer-text font-playfair" style={{
            fontSize:54, lineHeight:1.05, fontWeight:700, marginBottom:10,
          }}>
            tomorrow
          </h2>

          {/* emoji sunrise di luar shimmer */}
          <div style={{ fontSize:36, lineHeight:1, marginBottom:18 }}>🌅</div>

          {/* subtext */}
          <p style={{ fontSize:14, color:"rgba(255,200,200,0.45)", lineHeight:1.7 }}>
              im actually counting down the hours<br />
            <span style={{ color:"rgba(255,200,200,0.70)", fontWeight:500 }}>
              we're locked in for tomorrow.
            </span>
            {" "}
            <span style={{ fontSize:16 }}>💕</span>
          </p>
        </div>

        {/* ══ COUNTDOWN ═════════════════════════════════ */}
        <div style={secStyle(s1)} className="mb-9">
          <div style={{
            background:"rgba(255,255,255,0.03)",
            border:"1px solid rgba(255,255,255,0.07)",
            borderRadius:24, padding:"20px 16px 24px",
          }}>
            <p style={{
              textAlign:"center", fontSize:10, letterSpacing:"0.22em",
              textTransform:"uppercase", color:"rgba(244,63,94,0.40)",
              fontWeight:600, marginBottom:16,
            }}>
              {dateLabel}
            </p>

            {!mounted ? (
              <div className="grid grid-cols-3 gap-3">
                {["Jam","Menit","Detik"].map(l => <Digit key={l} val={0} label={l} />)}
              </div>
            ) : isPast ? (
              <div className="text-center py-2">
                <p style={{ color:"#fff", fontSize:18, fontWeight:600, marginBottom:4 }}>
                  Hari ini hari kita! 🎉
                </p>
                <p style={{ color:"rgba(244,63,94,0.55)", fontSize:13 }}>
                  Have the best time together ❤️
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                <Digit val={cd.hours}   label="Jam" />
                <Digit val={cd.minutes} label="Menit" />
                <Digit val={cd.seconds} label="Detik" />
              </div>
            )}
          </div>
        </div>

        {/* ══ REKAP JADWAL ══════════════════════════════ */}
        <div style={secStyle(s2)}>

          {/* divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1" style={{ height:1, background:"rgba(255,255,255,0.07)" }} />
            <p style={{
              fontSize:9, letterSpacing:"0.24em", textTransform:"uppercase",
              fontWeight:700, color:"rgba(244,63,94,0.40)", whiteSpace:"nowrap",
            }}>
              Rekap Hari Minggu ini
            </p>
            <div className="flex-1" style={{ height:1, background:"rgba(255,255,255,0.07)" }} />
          </div>

          {/* Part 1 card */}
          <div style={{
            background:"rgba(251,191,36,0.04)",
            border:"1px solid rgba(251,191,36,0.10)",
            borderRadius:20, padding:"18px 16px", marginBottom:12,
          }}>
            <div className="flex items-center gap-2 mb-4">
              <span style={{
                fontSize:9, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase",
                color:"rgba(251,191,36,0.80)", background:"rgba(251,191,36,0.10)",
                padding:"4px 10px", borderRadius:99,
              }}>
                {p1.label}
              </span>
              <span style={{ fontWeight:600, fontSize:13, color:"rgba(255,240,200,0.78)" }}>
                {p1.title} {p1.emoji}
              </span>
            </div>
            {p1.items.map((item, i) => (
              <MiniItem
                key={i} item={item}
                isLast={i === p1.items.length - 1}
                variant="amber"
                delay={100 + i * 120}
              />
            ))}
          </div>

          {/* Part 2 card */}
          <div style={{
            background:"rgba(244,63,94,0.04)",
            border:"1px solid rgba(244,63,94,0.10)",
            borderRadius:20, padding:"18px 16px", marginBottom:28,
          }}>
            <div className="flex items-center gap-2 mb-4">
              <span style={{
                fontSize:9, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase",
                color:"rgba(244,63,94,0.80)", background:"rgba(244,63,94,0.10)",
                padding:"4px 10px", borderRadius:99,
              }}>
                {p2.label}
              </span>
              <span style={{ fontWeight:600, fontSize:13, color:"rgba(255,200,200,0.78)" }}>
                {p2.title} {p2.emoji}
              </span>
            </div>
            {p2.items.map((item, i) => (
              <MiniItem
                key={i} item={item}
                isLast={i === p2.items.length - 1}
                variant="rose"
                delay={100 + i * 120}
              />
            ))}
          </div>
        </div>

        {/* ══ FOOTER ════════════════════════════════════ */}
        <div style={secStyle(s3)} className="text-center">
          {/* decorative line */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1" style={{ height:1, background:"rgba(255,255,255,0.05)" }} />
            <span style={{ fontSize:16 }}>🌹</span>
            <div className="flex-1" style={{ height:1, background:"rgba(255,255,255,0.05)" }} />
          </div>

          <p className="font-playfair" style={{
            fontStyle:"italic", fontSize:13,
            color:"rgba(255,200,200,0.32)", lineHeight:1.75,
            marginBottom:24, padding:"0 8px",
          }}>
            &ldquo;{footerNote}&rdquo;
          </p>

          <button
            onClick={reBurst}
            style={{
              fontSize:12, color:"rgba(244,63,94,0.40)",
              transition:"color 0.2s",
              background:"none", border:"none", cursor:"pointer", padding:8,
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(244,63,94,0.75)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(244,63,94,0.40)")}
          >
            tap untuk confetti lagi 🎊
          </button>

          <div style={{ height: 24 }} />
        </div>
      </div>
    </div>
  )
}
