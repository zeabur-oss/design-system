import * as React from "react"
import { Field as FieldPrimitive } from "@base-ui/react/field"
import type { VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { textareaVariants } from "../variants/textarea"

function Textarea({
  className,
  size,
  mono,
  ...props
}: React.ComponentProps<"textarea"> & VariantProps<typeof textareaVariants>) {
  return (
    <FieldPrimitive.Control
      render={<textarea />}
      data-slot="textarea"
      spellCheck={mono ? false : undefined}
      translate={mono ? "no" : undefined}
      className={cn(textareaVariants({ size, mono }), className)}
      // The control renders the textarea, which takes these as they are.
      {...(props as FieldPrimitive.Control.Props)}
    />
  )
}

export { Textarea }
