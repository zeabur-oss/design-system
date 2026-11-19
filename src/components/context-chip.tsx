import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cn } from "cn"
import type { ReactNode } from "react"
import CaretUpDownIcon from "~icons/ph/caret-up-down"

/** Where the app is pointed and as whom: the cluster or context, the signed-in identity, and
 * whether elevated rights are on. Render it as a menu's trigger. */
function ContextChip({
  place,
  identity,
  avatar,
  elevated,
  className,
  render,
  ...props
}: useRender.ComponentProps<"button"> & {
  place: ReactNode
  identity: ReactNode
  avatar?: ReactNode
  /** A short line while elevated rights are on, such as "Admin until 14:20". */
  elevated?: ReactNode
}) {
  const on = elevated !== undefined && elevated !== null && elevated !== false
  return useRender({
    defaultTagName: "button",
    render,
    props: mergeProps<"button">(
      {
        type: render ? undefined : "button",
        className: cn(
          "group/context flex w-full min-w-0 items-center gap-2 rounded-lg border border-main bg-card px-2 py-1.5 text-left transition-colors hover:bg-v2-surface-hover focus-visible:ring-2 focus-visible:ring-ring data-popup-open:bg-v2-surface-hover",
          className,
        ),
        children: (
          <>
            {avatar === undefined ? null : (
              <span className="flex size-6 shrink-0 items-center justify-center">{avatar}</span>
            )}
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="truncate type-body font-medium text-main">{place}</span>
              <span className="truncate text-xs text-secondary">{identity}</span>
              {on ? (
                <span
                  data-slot="context-chip-elevated"
                  className="flex min-w-0 text-xs text-warn-strong"
                >
                  <span className="truncate">{elevated}</span>
                </span>
              ) : null}
            </span>
            <CaretUpDownIcon aria-hidden="true" className="size-3.5 shrink-0 text-tertiary" />
          </>
        ),
      },
      props,
    ),
    state: { slot: "context-chip" },
  })
}

export { ContextChip }
