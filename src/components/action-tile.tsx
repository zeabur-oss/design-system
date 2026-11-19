import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cn } from "cn"

/** A square shortcut: an icon above its label. Render it as a link with `render`. */
function ActionTile({ className, render, ...props }: useRender.ComponentProps<"button">) {
  return useRender({
    defaultTagName: "button",
    render,
    props: mergeProps<"button">(
      {
        ...(render ? {} : { type: "button" as const }),
        className: cn(
          "flex min-h-22 w-full flex-col items-start justify-between gap-y-3 rounded-lg border border-main bg-card p-4 text-left text-sm font-medium text-main transition-colors hover:bg-v2-surface-hover disabled:cursor-not-allowed disabled:opacity-50 [&>svg]:size-5 [&>svg]:text-secondary",
          className,
        ),
      },
      props,
    ),
    state: { slot: "action-tile" },
  })
}

export { ActionTile }
