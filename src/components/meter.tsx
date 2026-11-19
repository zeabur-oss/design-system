import { cn } from "cn"
import { toneFill } from "../variants/tone"

const at = (share: number) => `${Math.min(Math.max(share, 0), 1) * 100}%`

/** `value` and `mark` are shares of the whole, 0 to 1. */
function Meter({
  value,
  mark,
  tone = "ok",
  size = "md",
  unbounded,
  label,
  className,
}: {
  value?: number
  mark?: number
  tone?: keyof typeof toneFill
  size?: "sm" | "md"
  unbounded?: boolean
  /** Without it the bar is hidden from assistive technology. */
  label?: string
  className?: string
}) {
  return (
    <div
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      data-slot="meter"
      style={{ "--value": at(value ?? 0), "--mark": at(mark ?? 0) } as React.CSSProperties}
      className={cn(
        "relative w-full overflow-hidden rounded-full bg-track",
        size === "md" ? "h-1.5" : "h-1",
        // The hatching replaces the track's fill on light; on dark it is drawn over the track.
        unbounded && "bg-hatch text-hatch-line dark:bg-track",
        className,
      )}
    >
      {value === undefined ? null : (
        <div className={cn("absolute inset-y-0 left-0 w-(--value) rounded-full", toneFill[tone])} />
      )}
      {mark === undefined || mark <= 0 ? null : (
        <div className="absolute -inset-y-px left-(--mark) w-0.5 bg-foreground" />
      )}
    </div>
  )
}

function MeterStack({
  parts,
  label,
  size = "md",
  className,
}: {
  /** In any unit; only their proportions count. */
  parts: readonly number[]
  /** Without it the bar is hidden from assistive technology. */
  label?: string
  size?: "sm" | "md"
  className?: string
}) {
  return (
    <div
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      data-slot="meter"
      className={cn(
        "flex w-full gap-0.5 overflow-hidden rounded-full bg-track",
        size === "md" ? "h-1.5" : "h-1",
        className,
      )}
    >
      {parts.map((part, i) =>
        part > 0 ? (
          <span
            key={i}
            style={{ "--grow": part } as React.CSSProperties}
            className={cn("basis-0 grow-(--grow)", meterPartTone(i))}
          />
        ) : null,
      )}
    </div>
  )
}

const partTones = [
  "bg-usage-normal",
  "bg-usage-normal/70",
  "bg-usage-normal/45",
  "bg-usage-normal/25",
] as const

function meterPartTone(i: number) {
  return partTones[i % partTones.length]
}

export { Meter, MeterStack, meterPartTone }
