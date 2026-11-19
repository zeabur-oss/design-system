"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { cn } from "cn"
import CheckIcon from "~icons/ph/check-bold"
import MinusIcon from "~icons/ph/minus-bold"

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer group/checkbox relative inline-flex size-4.5 shrink-0 after:absolute after:-inset-1 cursor-pointer items-center justify-center rounded border border-input bg-transparent text-on-primary transition-colors hover:border-primary/60 data-checked:border-primary data-checked:bg-primary data-checked:hover:border-primary-hover data-checked:hover:bg-primary-hover data-indeterminate:border-primary data-indeterminate:bg-primary aria-invalid:border-destructive data-disabled:cursor-not-allowed data-disabled:opacity-50 data-disabled:hover:border-input",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center data-unchecked:hidden"
        render={(indicatorProps, state) => (
          <span {...indicatorProps}>
            {state.indeterminate ? (
              <MinusIcon className="size-3" aria-hidden="true" />
            ) : (
              <CheckIcon className="size-3" aria-hidden="true" />
            )}
          </span>
        )}
      />
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
