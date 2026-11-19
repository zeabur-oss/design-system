import type { VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { skeletonVariants } from "../variants/skeleton"

function Skeleton({
  className,
  variant = "default",
  delay = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof skeletonVariants>) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn(skeletonVariants({ variant, delay, className }))}
      {...props}
    />
  )
}

export { Skeleton, skeletonVariants }
