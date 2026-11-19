import * as React from "react"
import type { VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { bannerVariants } from "../variants/banner"

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
