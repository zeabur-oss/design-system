import { cva } from "class-variance-authority"

export const textareaVariants = cva(
  "flex field-sizing-content min-h-24 w-full resize-y rounded-md border border-input bg-transparent text-main transition-field duration-150 outline-none placeholder:text-tertiary focus:border-ring focus:ring-1 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:focus:ring-destructive/20",
  {
    variants: {
      size: {
        default: "px-3 py-2 text-base sm:text-sm",
        sm: "min-h-control-xs px-2 py-1 text-xs",
      },
      mono: { true: "type-mono", false: "" },
    },
    defaultVariants: { size: "default", mono: false },
  },
)
