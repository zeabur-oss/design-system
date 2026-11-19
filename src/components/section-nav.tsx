import { cn } from "cn"
import type { ReactNode } from "react"

type SectionNavItem = {
  id: string
  label: ReactNode
  /** A small mark after the label: a count, or a dot for a pending edit. */
  trailing?: ReactNode
}

/** Anchors to the sections of one long page. A row that scrolls on narrow screens, a column
 * from `lg` up. */
function SectionNav({
  items,
  current,
  onSelect,
  className,
  ...props
}: Omit<React.ComponentProps<"nav">, "onSelect"> & {
  items: SectionNavItem[]
  current?: string
  onSelect?: (id: string, event: React.MouseEvent<HTMLAnchorElement>) => void
}) {
  return (
    <nav data-slot="section-nav" className={cn("min-w-0", className)} {...props}>
      <ul className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
        {items.map((item) => {
          const active = item.id === current
          return (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                aria-current={active ? "location" : undefined}
                onClick={onSelect ? (event) => onSelect(item.id, event) : undefined}
                className={cn(
                  "flex h-control-sm items-center gap-2 rounded-md px-2.5 type-body whitespace-nowrap transition-colors hover:bg-v2-surface-hover hover:text-main focus-visible:ring-2 focus-visible:ring-ring",
                  active ? "bg-v2-surface-hover font-medium text-main" : "text-secondary",
                )}
              >
                <span className="min-w-0 flex-1 truncate">{item.label}</span>
                {item.trailing === undefined ? null : (
                  <span className="shrink-0 text-xs text-tertiary tabular-nums">
                    {item.trailing}
                  </span>
                )}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export { SectionNav, type SectionNavItem }
