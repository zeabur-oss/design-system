import { cva } from "class-variance-authority"

export const bannerVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 type-body leading-relaxed [&>svg]:absolute [&>svg]:top-3.5 [&>svg]:left-4 [&>svg]:size-4 [&>svg~*]:pl-6.5",
  {
    variants: {
      variant: {
        default: "border-primary/20 bg-primary/6 text-info-strong [&>svg]:text-brand",
        tips: "border-v2-border bg-v2-surface-hover text-main [&>svg]:text-secondary",
        warn: "border-amber/40 bg-amber/8 text-warn-strong [&>svg]:text-warn",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)
