import { cva } from "class-variance-authority"

export const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-avatar align-middle font-medium text-secondary select-none",
  {
    variants: {
      size: {
        xs: "size-5 type-nano",
        sm: "size-7 text-xs",
        md: "size-9 text-sm",
        lg: "size-11 text-base",
      },
      shape: {
        square: "rounded",
        circle: "rounded-full",
      },
    },
    defaultVariants: { size: "md", shape: "square" },
  },
)
