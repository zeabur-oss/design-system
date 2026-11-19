import { cva } from "class-variance-authority"

export const timelineDotVariants = cva("relative z-1 mt-1.5 size-2 shrink-0 rounded-full", {
  variants: {
    tone: {
      neutral: "bg-idle",
      ok: "bg-ok",
      progress: "bg-progress",
      warn: "bg-warn",
      fail: "bg-fail",
      brand: "bg-brand",
    },
  },
  defaultVariants: { tone: "neutral" },
})
