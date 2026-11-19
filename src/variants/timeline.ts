import { cva } from "class-variance-authority"

import { toneDot } from "./tone"

export const timelineDotVariants = cva("relative z-1 mt-1.5 size-2 shrink-0 rounded-full", {
  variants: { tone: { ...toneDot, brand: "bg-brand" } },
  defaultVariants: { tone: "idle" },
})
