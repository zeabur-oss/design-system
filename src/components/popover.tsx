import type { Popover as PopoverPrimitive } from "@base-ui/react/popover"
import type { VariantProps } from "class-variance-authority"
import { cn } from "cn"

import {
  PendingRoot,
  PendingTrigger,
  useOpen,
  usePopups,
  type RootProps,
  type TriggerProps,
} from "./popup"
import { popoverTriggerVariants } from "../variants/popover"

function Popover({
  open,
  defaultOpen,
  onOpenChange,
  ...props
}: RootProps<PopoverPrimitive.Root.Props>) {
  const state = useOpen(open, defaultOpen, onOpenChange)
  if (!state.parts) return <PendingRoot setOpen={state.setOpen}>{props.children}</PendingRoot>
  return (
    <state.parts.Popover.Root
      data-slot="popover"
      {...props}
      open={state.open}
      onOpenChange={(next) => state.setOpen(next)}
    />
  )
}

function PopoverTrigger({
  className,
  variant = "default",
  ...props
}: TriggerProps<PopoverPrimitive.Trigger.Props> & VariantProps<typeof popoverTriggerVariants>) {
  const parts = usePopups()
  const classes = cn(popoverTriggerVariants({ variant, className }))
  if (!parts)
    return (
      <PendingTrigger
        haspopup="dialog"
        data-slot="popover-trigger"
        className={classes}
        {...props}
      />
    )
  return <parts.Popover.Trigger data-slot="popover-trigger" className={classes} {...props} />
}

function PopoverContent({
  className,
  align = "start",
  side = "bottom",
  sideOffset = 4,
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<PopoverPrimitive.Positioner.Props, "align" | "side" | "sideOffset">) {
  const parts = usePopups()
  if (!parts) return null
  const { Popover: P } = parts
  return (
    <P.Portal>
      <P.Positioner
        className="isolate z-popup"
        align={align}
        side={side}
        sideOffset={sideOffset}
        collisionPadding={8}
      >
        <P.Popup
          data-slot="popover-content"
          className={cn(
            "z-popup w-72 overflow-hidden rounded-md border border-v2-border bg-popover p-1 text-sm text-popover-foreground shadow-lg outline-none popup-motion",
            className,
          )}
          {...props}
        />
      </P.Positioner>
    </P.Portal>
  )
}

export { Popover, PopoverTrigger, PopoverContent, popoverTriggerVariants }
