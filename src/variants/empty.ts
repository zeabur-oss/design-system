import { cva } from "class-variance-authority"

export const emptyVariants = cva(
  "group/empty flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-xl px-6 py-12 text-center text-balance",
  {
    variants: {
      variant: {
        default: "",
        outline: "border border-dashed border-v2-border",
      },
      size: {
        default: "",
        sm: "gap-3 p-6",
        // One line in a section's place: what would be here and how to get it, its action at the end.
        inline:
          "flex-none flex-row flex-wrap justify-start gap-x-3 gap-y-2 px-4 py-3 text-left text-pretty",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export const emptyMediaVariants = cva(
  "mb-2 flex shrink-0 items-center justify-center group-data-[size=inline]/empty:mb-0 group-data-[size=inline]/empty:self-start [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "size-12 rounded-xl bg-linear-to-b from-tile-violet-from to-tile-violet-to text-on-primary shadow-tile [&_svg:not([class*='size-'])]:size-6",
        // A plain glyph beside an inline empty state's first line.
        glyph: "h-5 text-tertiary [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)
