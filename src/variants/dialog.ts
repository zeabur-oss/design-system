import { cva } from "class-variance-authority"

export const dialogBackdropVariants = cva("fixed inset-0 z-popup bg-overlay overlay-motion")

export const dialogContentVariants = cva(
  "fixed top-1/2 left-1/2 z-popup max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg border border-v2-border bg-popover text-popover-foreground shadow-xl outline-none",
  {
    variants: {
      variant: {
        default: "w-dialog dialog-motion",
        sheet:
          "top-0 left-0 h-svh w-sheet max-w-none translate-x-0 translate-y-0 rounded-none border-y-0 border-l-0 border-main bg-chrome sheet-motion-start",
        panel:
          "top-0 right-0 left-auto flex h-svh w-full max-w-none translate-x-0 translate-y-0 flex-col rounded-none border-y-0 border-r-0 sheet-motion-end sm:max-w-2xl",
        wide: "flex max-h-dialog w-dialog max-w-3xl flex-col dialog-motion",
        compact: "flex max-h-dialog w-dialog flex-col dialog-motion",
      },
      position: {
        center: "",
        top: "top-24 origin-top translate-y-0",
      },
    },
    defaultVariants: {
      variant: "default",
      position: "center",
    },
  },
)

export const dialogHeaderVariants = cva("flex shrink-0 items-start justify-between gap-4 px-6", {
  variants: {
    variant: {
      default: "pt-5",
      panel: "border-b border-v2-border py-4",
    },
  },
  defaultVariants: { variant: "default" },
})

export const dialogTitleVariants = cva("type-heading text-main")

export const dialogDescriptionVariants = cva("text-sm text-secondary")

export const dialogBodyVariants = cva("min-h-0 min-w-0 flex-1 overflow-y-auto px-6", {
  variants: {
    variant: {
      default: "pt-4 pb-6",
      panel: "py-5",
    },
  },
  defaultVariants: { variant: "default" },
})

export const dialogFooterVariants = cva(
  "flex shrink-0 items-center justify-end gap-2 border-t border-v2-border bg-v2-surface-hover px-6 py-3",
)

export const dialogCloseButtonVariants = cva(
  "flex size-6 shrink-0 items-center justify-center rounded text-secondary transition-colors hover:bg-v2-surface-hover hover:text-main",
)
