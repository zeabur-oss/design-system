import { cva } from "class-variance-authority"

export const selectTriggerVariants = cva(
  "button-secondary inline-flex w-fit min-w-0 items-center justify-between gap-2 rounded-md text-left font-medium whitespace-nowrap transition-colors duration-150 select-none data-disabled:pointer-events-none data-disabled:opacity-50 aria-invalid:ring-1 aria-invalid:ring-destructive",
  {
    variants: {
      size: {
        default: "h-control-md min-w-30 px-3 text-sm",
        sm: "h-control-xs px-2 text-xs",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
)
