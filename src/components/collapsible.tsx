"use client"

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"
import type { VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { collapsibleTriggerVariants } from "../variants/collapsible"

function Collapsible({ ...props }: CollapsiblePrimitive.Root.Props) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

function CollapsibleTrigger({
  className,
  variant = "default",
  ...props
}: CollapsiblePrimitive.Trigger.Props & VariantProps<typeof collapsibleTriggerVariants>) {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-trigger"
      className={cn(collapsibleTriggerVariants({ variant, className }))}
      {...props}
    />
  )
}

function CollapsibleContent({ className, ...props }: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel
      data-slot="collapsible-content"
      className={cn("collapse-motion", className)}
      {...props}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent, collapsibleTriggerVariants }
