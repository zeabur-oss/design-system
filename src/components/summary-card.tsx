import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cn } from "cn"
import type { ReactNode } from "react"
import { toneDot, type Tone } from "../variants/tone"

function SummaryCard({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="summary-card"
      className={cn(
        "grid min-w-0 grid-cols-1 gap-5 rounded-lg border border-main bg-card px-4 py-5 text-card-foreground md:gap-8 md:has-data-[slot=summary-card-aside]:grid-cols-2",
        className,
      )}
      {...props}
    />
  )
}

function SummaryCardMain({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="summary-card-main"
      className={cn("flex min-w-0 flex-col items-start", className)}
      {...props}
    />
  )
}

function SummaryCardStatus({
  tone,
  className,
  children,
}: {
  tone: Tone
  className?: string
  children: ReactNode
}) {
  return (
    <div
      data-slot="summary-card-status"
      className={cn("flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1", className)}
    >
      {children}
      <span aria-hidden="true" className={cn("size-2 shrink-0 rounded-full", toneDot[tone])} />
    </div>
  )
}

function SummaryCardWord({
  className,
  children,
  ...props
}: React.ComponentProps<"h2"> & { children: ReactNode }) {
  return (
    <h2
      data-slot="summary-card-word"
      className={cn("min-w-0 type-name font-semibold text-main", className)}
      {...props}
    >
      {children}
    </h2>
  )
}

/** The count beside the status word; render it as a popover's trigger to list what it counts. */
function SummaryCardCount({ className, render, ...props }: useRender.ComponentProps<"button">) {
  return useRender({
    defaultTagName: "button",
    render,
    props: mergeProps<"button">(
      {
        type: "button",
        className: cn(
          "-mx-1 flex items-center gap-1 rounded-md px-1 py-0.5 type-heading font-semibold text-main tabular-nums transition-colors hover:bg-v2-surface-hover aria-expanded:bg-v2-surface-hover [&>svg]:size-4 [&>svg]:text-secondary motion-safe:[&>svg]:transition-transform motion-safe:[&>svg]:duration-fast motion-safe:[&>svg]:ease-emphasized aria-expanded:[&>svg]:rotate-180",
          className,
        ),
      },
      props,
    ),
    state: { slot: "summary-card-count" },
  })
}

function SummaryCardSince({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="summary-card-since"
      className={cn("mt-1 text-sm text-secondary", className)}
      {...props}
    />
  )
}

function SummaryCardFacts({ className, ...props }: React.ComponentProps<"dl">) {
  return (
    <dl
      data-slot="summary-card-facts"
      className={cn("mt-4 flex w-full max-w-md flex-col gap-y-1.5 text-xs", className)}
      {...props}
    />
  )
}

/** A label and its value. The label takes `w-fact-label`, so key-value rows elsewhere line up with it. */
function SummaryCardFact({
  label,
  className,
  children,
}: {
  label: ReactNode
  className?: string
  children: ReactNode
}) {
  return (
    <div
      data-slot="summary-card-fact"
      className={cn("flex min-w-0 items-center gap-x-4", className)}
    >
      <dt className="w-fact-label shrink-0 font-medium text-tertiary">{label}</dt>
      <dd className="flex min-w-0 flex-1 items-center gap-1.5 text-main [&>svg]:size-3.5 [&>svg]:shrink-0 [&>svg]:text-secondary">
        {children}
      </dd>
    </div>
  )
}

function SummaryCardActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="summary-card-actions"
      className={cn("mt-auto flex flex-wrap gap-3 pt-5", className)}
      {...props}
    />
  )
}

/** The card's second column, shown from `md` up. */
function SummaryCardAside({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="summary-card-aside"
      className={cn(
        "hidden min-w-0 flex-col justify-center gap-5 border-l border-main pl-8 md:flex",
        className,
      )}
      {...props}
    />
  )
}

export {
  SummaryCard,
  SummaryCardActions,
  SummaryCardAside,
  SummaryCardCount,
  SummaryCardFact,
  SummaryCardFacts,
  SummaryCardMain,
  SummaryCardSince,
  SummaryCardStatus,
  SummaryCardWord,
}
