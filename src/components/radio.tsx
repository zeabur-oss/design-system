"use client"

import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { cn } from "cn"
import type { ReactNode } from "react"

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

const ring =
  "inline-flex size-4.5 shrink-0 items-center justify-center rounded-full border border-input transition-colors"
const dot =
  "size-2 rounded-full bg-primary opacity-0 transition-opacity group-data-checked/radio:opacity-100"

function Radio({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio"
      className={cn(
        ring,
        "group/radio relative cursor-pointer after:absolute after:-inset-1 hover:border-primary/60 data-checked:border-primary data-disabled:cursor-not-allowed data-disabled:opacity-50 data-disabled:hover:border-input",
        className,
      )}
      {...props}
    >
      <span aria-hidden="true" className={dot} />
    </RadioPrimitive.Root>
  )
}

function RadioOption({
  label,
  description,
  className,
  ...props
}: Omit<RadioPrimitive.Root.Props, "children"> & {
  label: ReactNode
  description?: ReactNode
}) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-option"
      className={cn(
        "group/radio flex w-full cursor-pointer items-start gap-3 rounded-md border border-v2-border px-3 py-2.5 text-left transition-colors hover:bg-v2-surface-hover data-checked:border-primary data-checked:bg-primary/5 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          ring,
          "mt-0.5 group-hover/radio:border-primary/60 group-data-checked/radio:border-primary",
        )}
      >
        <span className={dot} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm text-main">{label}</span>
        {description === undefined ? null : (
          <span className="mt-0.5 block type-body text-secondary">{description}</span>
        )}
      </span>
    </RadioPrimitive.Root>
  )
}

export { Radio, RadioGroup, RadioOption }
