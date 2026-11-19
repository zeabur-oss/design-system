import type { VariantProps } from "class-variance-authority"
import { cn } from "cn"
import type { ReactNode } from "react"
import { sectionTitleVariants } from "../variants/section-header"

/** A section's title, its count, one line on what it holds, and its action at the right. */
function SectionHeader({
  title,
  count,
  description,
  action,
  id,
  size = "default",
  className,
}: {
  title: ReactNode
  count?: ReactNode
  description?: ReactNode
  action?: ReactNode
  id?: string
  className?: string
} & VariantProps<typeof sectionTitleVariants>) {
  return (
    <header data-slot="section-header" className={cn("flex min-w-0 flex-col gap-0.5", className)}>
      <div className="flex min-h-7 flex-wrap items-center gap-x-2.5 gap-y-2">
        <h2 id={id} className={sectionTitleVariants({ size })}>
          {title}
        </h2>
        {count === undefined ? null : (
          <span className="type-meta text-tertiary tabular-nums">{count}</span>
        )}
        {action === undefined ? null : (
          <div className="ml-auto flex shrink-0 flex-wrap items-center gap-1.5">{action}</div>
        )}
      </div>
      {description === undefined ? null : (
        <p className="max-w-prose type-body text-secondary">{description}</p>
      )}
    </header>
  )
}

export { SectionHeader, sectionTitleVariants }
