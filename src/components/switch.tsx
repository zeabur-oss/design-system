"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { cn } from "cn"

function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-lg border border-switch-track-border bg-switch-track shadow-switch-track transition-colors duration-150 after:absolute after:-inset-x-2 after:-inset-y-1.5 data-[size=default]:h-7 data-[size=default]:w-11 data-[size=sm]:h-5 data-[size=sm]:w-8 data-[size=sm]:rounded-md data-checked:border-switch-on-border data-checked:bg-linear-to-b data-checked:from-switch-on-from data-checked:to-switch-on-to aria-invalid:border-destructive data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none absolute top-0.5 left-0.5 block rounded-md border border-switch-thumb-border bg-linear-to-b from-switch-thumb-from to-switch-thumb-to shadow-switch-thumb motion-safe:transition-transform motion-safe:duration-quick motion-safe:ease-emphasized group-data-[size=default]/switch:size-5.5 group-data-[size=sm]/switch:top-px group-data-[size=sm]/switch:size-4 group-data-[size=sm]/switch:rounded group-data-[size=default]/switch:data-checked:translate-x-4 group-data-[size=sm]/switch:data-checked:translate-x-3"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
