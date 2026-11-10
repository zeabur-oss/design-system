import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const bannerVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 type-body leading-relaxed [&>svg]:absolute [&>svg]:top-3.5 [&>svg]:left-4 [&>svg]:size-4 [&>svg~*]:pl-6.5",
  {
    variants: {
      variant: {
        default: "border-primary/20 bg-primary/6 text-info-strong [&>svg]:text-brand",
        tips: "border-v2-border bg-v2-surface-hover text-main [&>svg]:text-secondary",
        warn: "border-amber/40 bg-amber/8 text-warn-strong [&>svg]:text-warn",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

function Banner({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof bannerVariants>) {
  return (
    <div
      data-slot="banner"
      role="note"
      className={cn(bannerVariants({ variant }), className)}
      {...props}
    />
  )
}

function BannerTitle({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="banner-title"
      className={cn("mb-0.5 text-sm leading-tight font-medium", className)}
      {...props}
    />
  )
}

function BannerDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="banner-description"
      className={cn("type-body leading-relaxed", className)}
      {...props}
    />
  )
}

export { Banner, BannerTitle, BannerDescription, bannerVariants }
