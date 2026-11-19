import type { VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { pageColumnVariants } from "../variants/page-column"

function PageColumn({
  className,
  width = "wide",
  gap = "none",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof pageColumnVariants>) {
  return (
    <div
      data-slot="page-column"
      data-width={width}
      className={cn(pageColumnVariants({ width, gap, className }))}
      {...props}
    />
  )
}

export { PageColumn, pageColumnVariants }
