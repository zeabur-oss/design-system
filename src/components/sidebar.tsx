import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { createContext, use, type ReactNode } from "react"
import CaretDownIcon from "~icons/ph/caret-down"
import CaretUpDownIcon from "~icons/ph/caret-up-down"
import CheckIcon from "~icons/ph/check"
import CopyIcon from "~icons/ph/copy"
import MagnifyingGlassIcon from "~icons/ph/magnifying-glass"

import { Kbd } from "./kbd"
import { useCopy } from "./use-copy"

function Sidebar({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="sidebar"
      className={cn("flex h-full min-h-0 flex-col gap-y-3 p-4", className)}
      {...props}
    />
  )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      className={cn("flex h-10 shrink-0 items-center gap-1.5 pl-2", className)}
      {...props}
    />
  )
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn(
        "-mx-2 -my-2 flex min-h-0 flex-1 flex-col gap-y-1 overflow-x-hidden overflow-y-auto overscroll-contain px-2 py-2 scrollbar-none",
        className,
      )}
      {...props}
    />
  )
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn("flex shrink-0 flex-col gap-y-1 border-t border-main pt-3", className)}
      {...props}
    />
  )
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="sidebar-group" className={cn("flex flex-col gap-y-1", className)} {...props} />
  )
}

function SidebarSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-separator"
      role="separator"
      className={cn("mx-2 my-1 border-t border-v2-separator", className)}
      {...props}
    />
  )
}

function SidebarSection({
  title,
  action,
  defaultOpen = true,
  open,
  onOpenChange,
  className,
  children,
}: {
  title: ReactNode
  action?: ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
  children?: ReactNode
}) {
  return (
    <CollapsiblePrimitive.Root
      data-slot="sidebar-section"
      {...(open === undefined ? { defaultOpen } : { open })}
      onOpenChange={(next) => onOpenChange?.(next)}
      className={cn("group/section mt-3 flex flex-col first:mt-0", className)}
    >
      <div className="flex h-6 items-center gap-0.5 pr-1 pl-2">
        <CollapsiblePrimitive.Trigger className="flex h-6 min-w-0 flex-1 items-center gap-1 text-left type-label hover:text-secondary [&:not([data-panel-open])>svg]:-rotate-90 [&:not([data-panel-open])>svg]:opacity-100">
          <span className="truncate">{title}</span>
          <CaretDownIcon
            aria-hidden="true"
            className="size-2.5 shrink-0 opacity-0 group-hover/section:opacity-100 motion-safe:transition-caret motion-safe:duration-fast motion-safe:ease-emphasized"
          />
        </CollapsiblePrimitive.Trigger>
        {action}
      </div>
      <CollapsiblePrimitive.Panel className="flex flex-col gap-y-1 pt-1 collapse-motion">
        {children}
      </CollapsiblePrimitive.Panel>
    </CollapsiblePrimitive.Root>
  )
}

const sidebarItemVariants = cva(
  "group/item box-border flex h-8 w-full min-w-0 shrink-0 items-center gap-x-2 rounded-lg border border-transparent px-2 text-left type-body font-medium text-secondary transition-colors duration-150 select-none hover:text-main data-ancestor:text-main data-current:rounded-md data-current:text-nav-current data-popup-open:text-main [&_svg]:shrink-0",
  {
    variants: {
      tone: {
        default: "data-current:nav-active",
        // `relative` paints the row over the tree rail, so the current pill hides the rail around
        // the bar.
        child:
          "relative grid grid-cols-tree pr-2 pl-tree-indent data-current:nav-active-sub [&_[data-slot=sidebar-item-icon]]:size-3 [&_[data-slot=sidebar-item-icon]_svg]:size-3",
        quiet: "text-tertiary hover:text-secondary data-current:nav-active",
      },
    },
    defaultVariants: {
      tone: "default",
    },
  },
)

// Rows inside a SidebarMenu are its children unless they name another tone.
const InMenu = createContext(false)

function ChildRow({ current, children }: { current?: boolean; children: ReactNode }) {
  return (
    <>
      <span aria-hidden="true" className="relative z-raised flex h-4 items-center">
        {current ? <span className="nav-accent-bar" /> : null}
      </span>
      <span className="flex min-w-0 items-center gap-x-2">{children}</span>
    </>
  )
}

/** The state comes from `current` and `ancestor`, never `aria-current`, which a router may set on
 * every link whose path is a prefix of the page's. */
function SidebarItem({
  icon,
  trailing,
  current,
  ancestor,
  tone,
  className,
  render,
  children,
  ...props
}: useRender.ComponentProps<"button"> &
  VariantProps<typeof sidebarItemVariants> & {
    icon?: ReactNode
    trailing?: ReactNode
    /** The page shown is this row's: the one current row in the frame. */
    current?: boolean
    /** The page shown is under this row (a project while one of its services is open). */
    ancestor?: boolean
  }) {
  const inMenu = use(InMenu)
  const row = tone ?? (inMenu ? "child" : "default")
  // Data attributes, which the button's props type does not list.
  const state: Record<string, string | undefined> = {
    "data-current": current ? "" : undefined,
    "data-ancestor": ancestor && !current ? "" : undefined,
  }
  const iconNode =
    icon === undefined ? null : (
      <span
        data-slot="sidebar-item-icon"
        className="flex size-3.5 shrink-0 items-center justify-center text-secondary [&_svg]:size-3.5"
      >
        {icon}
      </span>
    )
  const body = (
    <>
      {iconNode}
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {trailing === undefined ? null : (
        <span className="flex shrink-0 items-center gap-1.5 text-xs font-normal text-tertiary">
          {trailing}
        </span>
      )}
    </>
  )
  return useRender({
    defaultTagName: "button",
    render,
    props: mergeProps<"button">(
      {
        type: render ? undefined : "button",
        className: cn(sidebarItemVariants({ tone: row }), className),
        "aria-current": current ? "page" : undefined,
        ...state,
        children: row === "child" ? <ChildRow current={current}>{body}</ChildRow> : body,
      },
      props,
    ),
  })
}

function SidebarMenu({
  icon,
  label,
  badge,
  active = false,
  defaultOpen = false,
  open,
  onOpenChange,
  className,
  children,
}: {
  icon?: ReactNode
  label: ReactNode
  badge?: ReactNode
  active?: boolean
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
  children?: ReactNode
}) {
  return (
    <CollapsiblePrimitive.Root
      data-slot="sidebar-menu"
      {...(open === undefined ? { defaultOpen } : { open })}
      onOpenChange={(next) => onOpenChange?.(next)}
      className={cn("flex flex-col", className)}
    >
      <CollapsiblePrimitive.Trigger
        data-ancestor={active ? "" : undefined}
        className={cn(
          sidebarItemVariants(),
          "justify-between [&:not([data-panel-open])>svg]:-rotate-90",
        )}
      >
        <span className="flex min-w-0 items-center gap-x-2">
          {icon === undefined ? null : (
            <span className="flex size-3.5 shrink-0 items-center justify-center text-secondary [&_svg]:size-3.5">
              {icon}
            </span>
          )}
          <span className="truncate">{label}</span>
          {badge}
        </span>
        <CaretDownIcon
          aria-hidden="true"
          className="size-3 shrink-0 text-secondary motion-safe:transition-rotate motion-safe:duration-fast motion-safe:ease-emphasized"
        />
      </CollapsiblePrimitive.Trigger>
      <CollapsiblePrimitive.Panel className="relative flex flex-col gap-y-1 py-0.5 collapse-motion">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-4 w-px bg-rail"
        />
        <InMenu value>{children}</InMenu>
      </CollapsiblePrimitive.Panel>
    </CollapsiblePrimitive.Root>
  )
}

function SidebarSearch({
  label,
  shortcut,
  className,
  ...props
}: Omit<React.ComponentProps<"button">, "children"> & {
  label: ReactNode
  shortcut?: ReactNode
}) {
  return (
    <button
      type="button"
      data-slot="sidebar-search"
      className={cn(
        sidebarItemVariants(),
        "group/search shrink-0 justify-between rounded-md border-main bg-sidebar-search",
        className,
      )}
      {...props}
    >
      <span className="flex min-w-0 items-center gap-x-2">
        <MagnifyingGlassIcon aria-hidden="true" className="size-3.5 shrink-0 text-tertiary" />
        <span className="truncate text-tertiary group-hover/search:text-secondary">{label}</span>
      </span>
      {shortcut === undefined ? null : typeof shortcut === "string" ? (
        <Kbd keys={shortcut} className="ml-2 hidden md:inline-flex" />
      ) : (
        <Kbd className="ml-2 hidden md:inline-flex">{shortcut}</Kbd>
      )}
    </button>
  )
}

function SidebarPicker({
  avatar,
  label,
  description,
  trailing,
  className,
  render,
  ...props
}: useRender.ComponentProps<"button"> & {
  avatar?: ReactNode
  label: ReactNode
  description?: ReactNode
  /** Replaces the up-down caret; `null` for none. */
  trailing?: ReactNode
}) {
  return useRender({
    defaultTagName: "button",
    render,
    props: mergeProps<"button">(
      {
        type: render ? undefined : "button",
        className: cn(
          "group/picker flex w-full min-w-0 shrink-0 items-center gap-2 rounded-md px-2 py-1.5 text-left type-body font-medium transition-colors hover:bg-v2-surface-hover data-popup-open:bg-v2-surface-hover",
          className,
        ),
        children: (
          <>
            {avatar === undefined ? null : (
              <span className="flex size-6 shrink-0 items-center justify-center">{avatar}</span>
            )}
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-secondary group-hover/picker:text-main">{label}</span>
              {description === undefined ? null : (
                <span className="truncate text-xs font-normal text-tertiary">{description}</span>
              )}
            </span>
            {trailing === undefined ? (
              <CaretUpDownIcon aria-hidden="true" className="size-3.5 shrink-0 text-tertiary" />
            ) : (
              trailing
            )}
          </>
        ),
      },
      props,
    ),
  })
}

function SidebarCopyPill({
  label,
  value,
  copyLabel = "Copy",
  onCopy,
  className,
}: {
  label: ReactNode
  value: string
  copyLabel?: string
  onCopy?: () => void
  className?: string
}) {
  const { copied, copy } = useCopy(value, onCopy)
  return (
    <div
      data-slot="sidebar-copy-pill"
      className={cn(
        "flex min-w-0 shrink-0 items-center gap-x-2 rounded-full bg-muted px-3 py-1",
        className,
      )}
    >
      <span className="shrink-0 text-xs text-secondary">{label}</span>
      <span className="min-w-0 flex-1 truncate font-mono text-xs text-main" title={value}>
        {value}
      </span>
      <button
        type="button"
        onClick={() => void copy()}
        aria-label={copyLabel}
        className="flex size-6 shrink-0 items-center justify-center text-secondary transition-colors hover:text-main"
      >
        {copied ? (
          <CheckIcon aria-hidden="true" className="size-4 text-ok" />
        ) : (
          <CopyIcon aria-hidden="true" className="size-4" />
        )}
      </button>
    </div>
  )
}

function SidebarToggleIcon({ collapsed, className }: { collapsed: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      data-collapsed={collapsed ? "" : undefined}
      aria-hidden="true"
      className={cn("size-4 shrink-0", className)}
    >
      <rect x="3" y="4" width="14" height="12" rx="3" />
      <path className="sidebar-icon-bar" fill="currentColor" />
    </svg>
  )
}

export {
  Sidebar,
  SidebarContent,
  SidebarCopyPill,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarItem,
  SidebarMenu,
  SidebarPicker,
  SidebarSearch,
  SidebarSection,
  SidebarSeparator,
  SidebarToggleIcon,
  sidebarItemVariants,
}
