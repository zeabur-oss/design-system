import { cn } from "cn"
import type { ReactNode } from "react"
import { toneDot, type Tone } from "../variants/tone"

function StatGroup({ className, ...props }: React.ComponentProps<"dl">) {
  return (
    <dl
      data-slot="stat-group"
      className={cn(
        "grid grid-cols-stats gap-px overflow-hidden rounded-xl border border-v2-border bg-v2-border",
        className,
      )}
      {...props}
    />
  )
}

function Stat({
  label,
  value,
  hint,
  tone,
  className,
}: {
  label: ReactNode
  value: ReactNode
  hint?: ReactNode
  tone?: Tone
  className?: string
}) {
  return (
    <div
      data-slot="stat"
      className={cn("flex min-w-0 flex-col gap-1 bg-card px-5 py-4", className)}
    >
      <dt className="truncate text-xs font-medium text-secondary">{label}</dt>
      <dd className="flex min-w-0 items-center gap-2 type-figure text-main">
        {tone ? (
          <span aria-hidden="true" className={cn("size-2 shrink-0 rounded-full", toneDot[tone])} />
        ) : null}
        <span className="min-w-0 truncate">{value}</span>
      </dd>
      {hint === undefined ? null : (
        <dd className="min-w-0 truncate text-xs text-tertiary">{hint}</dd>
      )}
    </div>
  )
}

export { Stat, StatGroup }
