import type { VariantProps } from "class-variance-authority"
import { cn } from "cn"
import type { ReactNode } from "react"
import { timelineDotVariants } from "../variants/timeline"

/** Things that happened, newest first. */
function Timeline({ className, ...props }: React.ComponentProps<"ol">) {
  return <ol data-slot="timeline" className={cn("flex min-w-0 flex-col", className)} {...props} />
}

function TimelineItem({
  tone,
  time,
  title,
  meta,
  actions,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"li">, "title"> &
  VariantProps<typeof timelineDotVariants> & {
    time?: ReactNode
    title: ReactNode
    /** A muted line under the title: who, from where. */
    meta?: ReactNode
    actions?: ReactNode
  }) {
  return (
    <li
      data-slot="timeline-item"
      className={cn(
        "group/timeline relative flex min-w-0 gap-3 pb-4 last:pb-0 before:absolute before:top-3 before:bottom-0 before:left-0.75 before:border-l before:border-main last:before:hidden",
        className,
      )}
      {...props}
    >
      <span aria-hidden="true" className={timelineDotVariants({ tone })} />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="min-w-0 type-body font-medium text-main">{title}</span>
          {time === undefined ? null : (
            <span className="text-xs text-tertiary tabular-nums">{time}</span>
          )}
          {actions === undefined ? null : (
            <span className="ml-auto flex shrink-0 items-center gap-1.5">{actions}</span>
          )}
        </div>
        {meta === undefined ? null : <span className="text-xs text-secondary">{meta}</span>}
        {children === undefined ? null : (
          <div className="min-w-0 type-body text-secondary">{children}</div>
        )}
      </div>
    </li>
  )
}

export { Timeline, TimelineItem, timelineDotVariants }
