import { cva } from "class-variance-authority"

export const collapsibleTriggerVariants = cva("", {
  variants: {
    variant: {
      default: "",
      plain: "gap-1 rounded-md text-secondary hover:text-main",
      section:
        "flex w-fit items-center gap-1.5 rounded-md type-body font-medium text-secondary hover:text-main [&>svg]:size-3 [&>svg]:text-tertiary motion-safe:[&>svg]:transition-transform motion-safe:[&>svg]:duration-fast motion-safe:[&>svg]:ease-emphasized [&:not([data-panel-open])>svg]:-rotate-90",
      row: "flex w-full items-center gap-4 px-5 py-4 text-left text-sm font-medium text-main transition-colors hover:bg-v2-surface-hover [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-secondary motion-safe:[&>svg]:transition-transform motion-safe:[&>svg]:duration-fast motion-safe:[&>svg]:ease-emphasized data-panel-open:[&>svg]:rotate-180",
      disclosure:
        "flex w-fit items-center gap-1 rounded-md text-secondary hover:text-main [&>svg]:size-3.5 [&>svg]:shrink-0 motion-safe:[&>svg]:transition-transform motion-safe:[&>svg]:duration-fast motion-safe:[&>svg]:ease-emphasized data-panel-open:[&>svg]:rotate-90",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})
