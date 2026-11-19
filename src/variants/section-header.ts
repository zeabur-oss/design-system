import { cva } from "class-variance-authority"

export const sectionTitleVariants = cva("min-w-0 text-main", {
  variants: {
    size: {
      default: "type-heading",
      sm: "type-body font-medium",
    },
  },
  defaultVariants: {
    size: "default",
  },
})
