import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva } from "class-variance-authority"
import { cn } from "cn"
import { useLayoutEffect, useRef } from "react"

function Tabs({
  className,
  orientation = "horizontal",
  variant = "default",
  ...props
}: TabsPrimitive.Root.Props & { variant?: "default" | "page" }) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      data-variant={variant}
      className={cn(
        "group/tabs flex gap-3 data-horizontal:flex-col data-[variant=page]:gap-0",
        className,
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list relative inline-flex w-fit items-center gap-0.5 overflow-x-auto overflow-y-hidden rounded-md border border-segmented-border bg-segmented-track p-0.5 text-secondary scrollbar-none group-data-horizontal/tabs:h-control-md group-data-horizontal/tabs:scroll-fade-x tabs-vertical:h-fit tabs-vertical:flex-col tabs-vertical:items-stretch tabs-vertical:gap-1 tabs-vertical:overflow-visible tabs-vertical:rounded-none tabs-vertical:border-0 tabs-vertical:bg-transparent tabs-vertical:p-0",
)

// Base UI measures the active tab into `--active-tab-*` and hides the indicator until it has.
const tabsIndicator =
  "slide pointer-events-none absolute top-0 left-0 z-0 h-(--active-tab-height) w-(--active-tab-width) translate-x-(--active-tab-left) translate-y-(--active-tab-top) rounded border border-v2-border bg-surface-raised shadow-segmented tabs-vertical:hidden"

function TabsList({ className, children, ...props }: TabsPrimitive.List.Props) {
  const list = useRef<HTMLDivElement>(null)
  // A row that scrolls keeps its chosen tab in view, also when the page opens on a later one.
  useLayoutEffect(() => {
    const row = list.current
    const active = row?.querySelector<HTMLElement>("[data-slot=tabs-trigger][data-active]")
    if (!row || !active || row.scrollWidth <= row.clientWidth) return
    const start = active.offsetLeft - row.scrollLeft
    const end = start + active.offsetWidth
    if (start < 0) row.scrollLeft += start
    else if (end > row.clientWidth) row.scrollLeft += end - row.clientWidth
  })
  return (
    <TabsPrimitive.List
      ref={list}
      data-slot="tabs-list"
      className={cn(tabsListVariants(), className)}
      {...props}
    >
      <TabsPrimitive.Indicator data-slot="tabs-indicator" className={tabsIndicator} />
      {children}
    </TabsPrimitive.List>
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative z-raised inline-flex h-control-sm shrink-0 items-center justify-center gap-1.5 rounded px-3 text-sm max-sm:px-2 font-medium whitespace-nowrap text-secondary transition-colors duration-150 hover:text-main disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-active:text-main has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "tabs-vertical:box-border tabs-vertical:w-full tabs-vertical:justify-start tabs-vertical:gap-2 tabs-vertical:rounded-lg tabs-vertical:border tabs-vertical:border-transparent tabs-vertical:px-2 tabs-vertical:type-body tabs-vertical:[&_svg:not([class*='size-'])]:size-3.5 tabs-vertical:data-active:rounded-md tabs-vertical:data-active:nav-active",
        className,
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 outline-none reveal-in", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
