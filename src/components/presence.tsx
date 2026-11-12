import { useEffect, useRef, useState } from "react"

type Phase = "starting" | "open" | "ending" | "closed"

/** Keeps the element mounted through its exit, marked like Base UI's popups for the motion utilities. */
function usePresence<T extends HTMLElement = HTMLElement>(open: boolean) {
  const ref = useRef<T>(null)
  const [phase, setPhase] = useState<Phase>(open ? "open" : "closed")
  if (open && (phase === "closed" || phase === "ending"))
    setPhase(phase === "closed" ? "starting" : "open")
  if (!open && (phase === "starting" || phase === "open")) setPhase("ending")

  useEffect(() => {
    if (phase !== "starting" && phase !== "ending") return
    const run = { cancelled: false, frame: 0 }
    run.frame = requestAnimationFrame(() => {
      run.frame = requestAnimationFrame(() => {
        if (run.cancelled) return
        if (phase === "starting") return setPhase("open")
        // Only the exit is waited for: not a blinking cursor inside, which repeats for ever, nor a
        // scroll-driven fade, which follows the scroll rather than the clock.
        const animations = (ref.current?.getAnimations({ subtree: true }) ?? []).filter(
          (animation) =>
            animation.timeline === document.timeline &&
            animation.effect?.getComputedTiming().iterations !== Infinity,
        )
        void Promise.allSettled(animations.map((animation) => animation.finished)).then(() => {
          if (!run.cancelled) setPhase("closed")
        })
      })
    })
    return () => {
      run.cancelled = true
      cancelAnimationFrame(run.frame)
    }
  }, [phase])

  return {
    mounted: phase !== "closed",
    props: {
      ref,
      "data-starting-style": phase === "starting" ? "" : undefined,
      "data-ending-style": phase === "ending" ? "" : undefined,
    },
  }
}

export { usePresence }
