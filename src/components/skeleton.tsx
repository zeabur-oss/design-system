import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const skeletonVariants = cva("bg-track", {
  variants: {
    variant: {
      default: "rounded",
      card: "rounded-xl",
    },
    delay: {
      default: "animate-skeleton",
      none: "animate-skeleton-now",
    },
  },
  defaultVariants: {
    variant: "default",
    delay: "default",
  },
})

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
