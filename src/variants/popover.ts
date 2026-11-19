import { cva } from "class-variance-authority"

export const popoverTriggerVariants = cva("", {
  variants: {
    variant: {
      default: "",
      ghost:
        "rounded-md text-secondary hover:bg-v2-surface-hover hover:text-main aria-expanded:bg-v2-surface-hover aria-expanded:text-main",
      plain: "rounded-md text-secondary hover:text-main",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})
