import { cva } from "class-variance-authority"

export const skeletonVariants = cva("bg-track", {
  variants: {
    variant: {
      default: "rounded",
      card: "rounded-xl",
    },
    delay: {
      default: "animate-skeleton",
      none: "animate-skeleton-now",
    },
  },
  defaultVariants: {
    variant: "default",
    delay: "default",
  },
})
