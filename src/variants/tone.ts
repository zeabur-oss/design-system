const tones = ["ok", "progress", "warn", "fail", "idle"] as const
export type Tone = (typeof tones)[number]

/** A status dot. */
export const toneDot = {
  ok: "bg-ok",
  progress: "bg-progress",
  warn: "bg-warn",
  fail: "bg-fail",
  idle: "bg-idle",
} as const satisfies Record<Tone, string>

/** A status chip: soft fill, strong text. */
export const toneChip = {
  ok: "bg-ok-soft text-ok-strong",
  progress: "bg-progress-soft text-progress-strong",
  warn: "bg-warn-soft text-warn-strong",
  fail: "bg-fail-soft text-fail-strong",
  idle: "bg-idle-soft text-idle-strong",
} as const satisfies Record<Tone, string>

/** A notice's border, fill, text and icon. */
export const toneNotice = {
  neutral: "border-v2-border bg-v2-surface-hover text-main",
  info: "border-primary/20 bg-primary/6 text-info-strong *:data-[slot=alert-description]:text-current *:[svg]:text-brand",
  warn: "border-amber/40 bg-amber/8 text-warn-strong *:data-[slot=alert-description]:text-current *:[svg]:text-warn",
  fail: "border-danger/30 bg-danger/6 text-fail-strong *:data-[slot=alert-description]:text-current *:[svg]:text-danger",
} as const

/** A meter's fill. */
export const toneFill = {
  ok: "bg-usage-normal",
  over: "bg-usage-severe",
  warn: "bg-usage-warning",
  muted: "bg-usage-reserved",
} as const
