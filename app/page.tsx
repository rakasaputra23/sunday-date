"use client"
import { useEffect, useState } from "react"
import { siteConfig } from "@/lib/config"
import StepOpening  from "@/components/steps/StepOpening"
import StepQuestion from "@/components/steps/StepQuestion"
import StepPart1    from "@/components/steps/StepPart1"
import StepPart2    from "@/components/steps/StepPart2"
import StepLoveNote from "@/components/steps/StepLoveNote"
import StepClosing  from "@/components/steps/StepClosing"

type Step = "opening" | "question" | "part1" | "part2" | "lovenote" | "closing"
const ORDER: Step[] = ["opening","question","part1","part2","lovenote","closing"]

/* dot colors per step */
const DOT_COLORS: Record<Step, string> = {
  opening:  "#f43f5e",
  question: "#f43f5e",
  part1:    "#f59e0b",
  part2:    "#f43f5e",
  lovenote: "#f43f5e",
  closing:  "#f43f5e",
}

export default function Home() {
  const [step, setStep]       = useState<Step>("opening")
  const [exiting, setExiting] = useState(false)
  const [next, setNext]       = useState<Step | null>(null)
  const [cls, setCls]         = useState("step-enter")

  const goTo = (target: Step) => {
    setExiting(true)
    setCls("step-exit")
    setNext(target)
  }

  useEffect(() => {
    if (!exiting || !next) return
    const t = setTimeout(() => {
      setStep(next)
      setCls("step-enter")
      setExiting(false)
      setNext(null)
      window.scrollTo({ top: 0, behavior: "instant" })
    }, 330)
    return () => clearTimeout(t)
  }, [exiting, next])

  const advance = () => {
    const i = ORDER.indexOf(step)
    if (i < ORDER.length - 1) goTo(ORDER[i + 1])
  }

  /* progress dots — hide on opening */
  const showDots = step !== "opening"
  const curIdx   = ORDER.indexOf(step)

  /* bg color for progress bar context */
  const darkBg = ["opening","part2","closing"].includes(step)

  return (
    <div className="relative">
      {/* Progress dots */}
      {showDots && (
        <div className="fixed top-4 left-0 right-0 flex justify-center gap-1.5 z-50 pointer-events-none">
          {ORDER.filter(s => s !== "opening").map((s, i) => {
            const sIdx    = ORDER.indexOf(s)
            const reached = sIdx <= curIdx
            return (
              <div
                key={s}
                className="rounded-full transition-all duration-400"
                style={{
                  width:  s === step ? 18 : 6,
                  height: 6,
                  background: reached
                    ? DOT_COLORS[step]
                    : darkBg ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)",
                  opacity: reached ? 1 : 0.5,
                }}
              />
            )
          })}
        </div>
      )}

      {/* Step */}
      <div key={step} className={cls}>
        {step === "opening" && (
          <StepOpening name2={siteConfig.couple.name2} onNext={advance} />
        )}
        {step === "question" && (
          <StepQuestion
            name1={siteConfig.couple.name1}
            name2={siteConfig.couple.name2}
            onAccept={advance}
          />
        )}
        {step === "part1" && (
          <StepPart1
            label={siteConfig.schedule.part1.label}
            title={siteConfig.schedule.part1.title}
            emoji={siteConfig.schedule.part1.emoji}
            items={siteConfig.schedule.part1.items}
            onNext={advance}
          />
        )}
        {step === "part2" && (
          <StepPart2
            label={siteConfig.schedule.part2.label}
            title={siteConfig.schedule.part2.title}
            emoji={siteConfig.schedule.part2.emoji}
            items={siteConfig.schedule.part2.items}
            onNext={advance}
          />
        )}
        {step === "lovenote" && (
          <StepLoveNote
            message={siteConfig.loveNote.message}
            from={siteConfig.loveNote.from}
            onNext={advance}
          />
        )}
        {step === "closing" && (
          <StepClosing
            name1={siteConfig.couple.name1}
            name2={siteConfig.couple.name2}
            dateTarget={siteConfig.dateTarget}
            dateLabel={siteConfig.dateLabel}
            footerNote={siteConfig.footerNote}
          />
        )}
      </div>
    </div>
  )
}