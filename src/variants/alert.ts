import { cva } from "class-variance-authority"

export const alertVariants = cva(
  "group/alert relative grid w-full gap-0.5 rounded-lg border px-4 py-3 text-left type-body has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-icon has-[>svg]:gap-x-2.5 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "border-v2-border bg-v2-surface-hover text-main",
        info: "border-primary/20 bg-primary/6 text-info-strong *:data-[slot=alert-description]:text-current *:[svg]:text-brand",
        destructive:
          "border-danger/30 bg-danger/6 text-fail-strong *:data-[slot=alert-description]:text-current *:[svg]:text-danger",
        warn: "border-amber/40 bg-amber/8 text-warn-strong *:data-[slot=alert-description]:text-current *:[svg]:text-warn",
        problem:
          "gap-y-1.5 rounded-xl border-danger/30 bg-card px-4 py-3 text-card-foreground *:data-[slot=alert-description]:text-main *:[svg]:text-danger",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export const alertTitleVariants = cva(
  "text-sm leading-5 font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3",
)

export const alertDescriptionVariants = cva(
  "leading-relaxed text-pretty text-secondary group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-main [&_p:not(:last-child)]:mb-3",
)

export const alertActionVariants = cva("absolute top-2.5 right-2.5")
