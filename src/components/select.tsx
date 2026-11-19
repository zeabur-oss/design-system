import { Select as SelectPrimitive } from "@base-ui/react/select"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import type { ReactNode } from "react"
import CaretDownIcon from "~icons/ph/caret-down"
import CheckIcon from "~icons/ph/check"

interface SelectItem<Value extends string = string> {
  value: Value
  label: ReactNode
  /** When the label is in another language than the page's (a language's own name). */
  lang?: string
}

const selectTriggerVariants = cva(
  "button-secondary inline-flex w-fit min-w-0 items-center justify-between gap-2 rounded-md text-left font-medium whitespace-nowrap transition-colors duration-150 select-none data-disabled:pointer-events-none data-disabled:opacity-50 aria-invalid:ring-1 aria-invalid:ring-destructive",
  {
    variants: {
      size: {
        default: "h-control-md min-w-30 px-3 text-sm",
        sm: "h-control-xs px-2 text-xs",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
)

function Select<Value extends string>({
  items,
  value,
  onValueChange,
  size,
  disabled,
  name,
  id,
  className,
  translate,
  "aria-label": ariaLabel,
}: VariantProps<typeof selectTriggerVariants> & {
  items: readonly SelectItem<Value>[]
  value: Value
  onValueChange?: (value: Value) => void
  disabled?: boolean
  name?: string
  id?: string
  className?: string
  translate?: "yes" | "no"
  "aria-label"?: string
}) {
  return (
    <SelectPrimitive.Root
      items={items}
      value={value}
      onValueChange={(next) => {
        if (next !== null) onValueChange?.(next)
      }}
      disabled={disabled}
      name={name}
    >
      <SelectPrimitive.Trigger
        data-slot="select-trigger"
        id={id}
        aria-label={ariaLabel}
        translate={translate}
        className={cn(selectTriggerVariants({ size }), className)}
      >
        <SelectPrimitive.Value className="min-w-0 truncate" />
        <SelectPrimitive.Icon className="flex shrink-0 text-secondary">
          <CaretDownIcon className="size-3.5" aria-hidden="true" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Positioner
          className="isolate z-popup outline-none"
          sideOffset={6}
          collisionPadding={8}
          alignItemWithTrigger={false}
        >
          <SelectPrimitive.Popup
            data-slot="select-content"
            translate={translate}
            className="max-h-(--available-height) min-w-(--anchor-width) overflow-y-auto rounded-lg border border-v2-border bg-popover p-1 text-sm text-popover-foreground shadow-md outline-none popup-motion"
          >
            <SelectPrimitive.List className="flex flex-col gap-0.5">
              {items.map((item) => (
                <SelectPrimitive.Item
                  key={item.value}
                  value={item.value}
                  lang={item.lang}
                  className="flex cursor-pointer items-center gap-2.5 rounded px-2 py-1.5 outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-glass-hover data-selected:bg-glass-selected"
                >
                  <SelectPrimitive.ItemText className="min-w-0 flex-1 truncate">
                    {item.label}
                  </SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator className="flex shrink-0 pl-3 text-main">
                    <CheckIcon className="size-4" aria-hidden="true" />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.List>
          </SelectPrimitive.Popup>
        </SelectPrimitive.Positioner>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}

export { Select, selectTriggerVariants, type SelectItem }
