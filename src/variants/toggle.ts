import { cva } from "class-variance-authority"

export const toggleVariants = cva(
  "group/toggle inline-flex items-center justify-center gap-1.5 rounded-md font-medium whitespace-nowrap transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-transparent text-secondary hover:bg-v2-surface-hover hover:text-main aria-pressed:bg-v2-surface-active aria-pressed:text-main",
        outline:
          "border border-v2-border bg-transparent text-main hover:bg-v2-surface-hover aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-on-primary aria-pressed:hover:bg-primary-hover",
        segmented:
          "rounded border border-transparent bg-transparent text-secondary hover:text-main aria-pressed:border-v2-border aria-pressed:bg-surface-raised aria-pressed:text-main aria-pressed:shadow-segmented",
      },
      size: {
        default:
          "px-3 text-sm has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
        sm: "px-2.5 text-xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "px-4 text-sm has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
      },
    },
    // Heights are set here only: `cn` cannot choose between two named heights.
    compoundVariants: [
      {
        variant: ["default", "outline"],
        size: "default",
        className: "h-control-md min-w-control-md",
      },
      { variant: ["default", "outline"], size: "sm", className: "h-control-xs min-w-control-xs" },
      { variant: ["default", "outline"], size: "lg", className: "h-control-lg min-w-control-lg" },
      { variant: "segmented", size: "default", className: "h-control-sm min-w-control-sm" },
      { variant: "segmented", size: "sm", className: "h-6 min-w-6" },
      { variant: "segmented", size: "lg", className: "h-control-md min-w-control-md" },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)
