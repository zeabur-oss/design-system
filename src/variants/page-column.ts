import { cva } from "class-variance-authority"

/** The column every block of a page sits in, so their left and right edges line up; `gap` spaces the blocks. */
export const pageColumnVariants = cva("mx-auto flex w-full min-w-0 flex-col px-4 md:px-8", {
  variants: {
    width: {
      content: "max-w-page-content",
      wide: "max-w-page-wide",
      full: "",
    },
    gap: {
      none: "",
      sm: "gap-3",
      md: "gap-6",
      lg: "gap-8",
      xl: "gap-10",
    },
  },
  defaultVariants: {
    width: "wide",
    gap: "none",
  },
})
