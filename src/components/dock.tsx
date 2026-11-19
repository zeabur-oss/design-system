import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cn } from "cn"
import type { ReactNode } from "react"
import { useRef } from "react"
import XIcon from "~icons/ph/x"

/** A panel docked under the page, `--dock-height` tall; on a phone it covers the screen. Keep it
 * mounted while it is hidden, so what runs in it lives on. */
function Dock({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="dock"
      className={cn(
        "relative flex h-(--dock-height) shrink-0 flex-col border-t border-main bg-card text-main sheet-motion-bottom max-sm:fixed max-sm:inset-0 max-sm:z-popup max-sm:h-auto max-sm:border-t-0",
        className,
      )}
      {...props}
    />
  )
}

/** The dock's top edge, dragged or moved with the arrow keys to change its height. */
type ResizerRange = { value: number; min: number; max: number; step: number }

function keyTarget(key: string, { value, min, max, step }: ResizerRange): number | undefined {
  switch (key) {
    case "ArrowUp":
      return value + step
    case "ArrowDown":
      return value - step
    case "PageUp":
      return value + step * 4
    case "PageDown":
      return value - step * 4
    case "Home":
      return max
    case "End":
      return min
    default:
      return undefined
  }
}

function DockResizer({
  value,
  min,
  max,
  step = 16,
  onValueChange,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "onChange"> & {
  value: number
  min: number
  max: number
  step?: number
  onValueChange: (value: number) => void
}) {
  const start = useRef<{ y: number; value: number } | null>(null)
  const clamp = (next: number) => Math.round(Math.min(max, Math.max(min, next)))
  return (
    <div
      data-slot="dock-resizer"
      role="separator"
      aria-orientation="horizontal"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      tabIndex={0}
      onPointerDown={(event) => {
        if (event.button !== 0) return
        event.preventDefault()
        event.currentTarget.setPointerCapture(event.pointerId)
        start.current = { y: event.clientY, value }
      }}
      onPointerMove={(event) => {
        if (!start.current) return
        onValueChange(clamp(start.current.value + start.current.y - event.clientY))
      }}
      onPointerUp={() => {
        start.current = null
      }}
      onPointerCancel={() => {
        start.current = null
      }}
      onKeyDown={(event) => {
        const next = keyTarget(event.key, { value, min, max, step })
        if (next === undefined) return
        event.preventDefault()
        onValueChange(clamp(next))
      }}
      className={cn(
        "absolute inset-x-0 -top-1 z-raised h-2 cursor-row-resize before:absolute before:inset-x-0 before:-inset-y-2 touch-none select-none after:absolute after:inset-x-0 after:top-0.75 after:h-0.5 after:transition-colors after:duration-150 hover:after:bg-primary focus-visible:after:bg-primary max-sm:hidden",
        className,
      )}
      {...props}
    />
  )
}

function DockTabs({ className, ...props }: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="dock-tabs"
      className={cn("flex min-h-0 flex-1 flex-col", className)}
      {...props}
    />
  )
}

/** The row over the panels: the tabs, then the dock's own actions. */
function DockHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dock-header"
      className={cn(
        "flex h-control-lg shrink-0 items-center gap-1 border-b border-v2-border pr-2 pl-1.5",
        className,
      )}
      {...props}
    />
  )
}

function DockTabList({ className, ...props }: TabsPrimitive.List.Props) {
  return (
    <TabsPrimitive.List
      data-slot="dock-tab-list"
      className={cn(
        "flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto overflow-y-hidden scrollbar-none scroll-fade-x",
        className,
      )}
      {...props}
    />
  )
}

/** One tab; with `onClose`, a close button beside it, also reached with Delete on the tab. */
function DockTab({
  onClose,
  closeLabel,
  className,
  children,
  onKeyDown,
  ...props
}: TabsPrimitive.Tab.Props & {
  onClose?: () => void
  closeLabel?: string
  children?: ReactNode
}) {
  return (
    <div
      data-slot="dock-tab"
      className="group/dock-tab flex h-control-sm shrink-0 items-center rounded-md text-secondary transition-colors duration-150 hover:bg-v2-surface-hover hover:text-main has-data-active:bg-v2-surface-active has-data-active:text-main"
    >
      <TabsPrimitive.Tab
        className={cn(
          "flex h-full max-w-60 min-w-0 items-center gap-1.5 pr-1.5 pl-2.5 type-body [&_svg]:size-3.5 [&_svg]:shrink-0",
          !onClose && "pr-2.5",
          className,
        )}
        aria-keyshortcuts={onClose ? "Delete" : undefined}
        onKeyDown={(event) => {
          onKeyDown?.(event)
          if (onClose && event.key === "Delete") {
            event.preventDefault()
            onClose()
          }
        }}
        {...props}
      >
        {children}
      </TabsPrimitive.Tab>
      {onClose ? (
        <button
          type="button"
          tabIndex={-1}
          aria-label={closeLabel}
          onClick={onClose}
          className="mr-1 flex size-6 shrink-0 items-center justify-center rounded text-tertiary transition-colors duration-150 hover:bg-v2-surface-active hover:text-main"
        >
          <XIcon aria-hidden="true" className="size-3" />
        </button>
      ) : null}
    </div>
  )
}

/** A tab's panel, kept mounted while another is shown. */
function DockPanel({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="dock-panel"
      keepMounted
      className={cn("flex min-h-0 flex-1 flex-col outline-none", className)}
      {...props}
    />
  )
}

/** The folded dock: one line along the bottom of the page that opens it. */
function DockBar({ className, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="dock-bar"
      className={cn(
        "flex h-8 w-full shrink-0 items-center gap-2 border-t border-main bg-chrome px-3 text-left type-meta text-secondary transition-colors duration-150 hover:text-main focus-visible:text-main [&_svg]:size-3.5 [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  )
}

export { Dock, DockBar, DockHeader, DockPanel, DockResizer, DockTab, DockTabList, DockTabs }
