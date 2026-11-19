import { cva } from "class-variance-authority"

export const buttonVariantStyles = {
  default: "button-primary",
  secondary: "button-secondary",
  outline:
    "border border-v2-border bg-transparent text-main hover:bg-v2-surface-hover aria-expanded:bg-v2-surface-hover",
  ghost:
    "text-secondary hover:bg-v2-surface-hover hover:text-main aria-expanded:bg-v2-surface-hover aria-expanded:text-main",
  muted:
    "text-tertiary hover:bg-v2-surface-hover hover:text-main aria-expanded:bg-v2-surface-hover aria-expanded:text-main",
  destructive: "button-destructive",
  "secondary-destructive": "button-secondary-destructive",
  link: "h-auto! rounded-none px-0! font-normal text-brand underline-offset-4 hover:underline",
}

export const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md font-medium whitespace-nowrap transition-colors duration-150 select-none disabled:pointer-events-none disabled:opacity-50 aria-invalid:ring-1 aria-invalid:ring-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: buttonVariantStyles,
      size: {
        xs: "h-control-xs gap-1.5 px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3.5",
        sm: "h-control-sm gap-1.5 px-3 text-xs",
        default: "h-control-md gap-2 px-4 text-sm",
        lg: "h-control-lg gap-2 px-5 text-sm",
        icon: "size-control-md",
        "icon-xs": "size-control-xs [&_svg:not([class*='size-'])]:size-3.5",
        "icon-sm": "size-control-sm",
        "icon-lg": "size-control-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)
