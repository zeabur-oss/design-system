import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"
import type { VariantProps } from "class-variance-authority"
import { cn } from "cn"
import type { ReactNode } from "react"
import { avatarVariants } from "../variants/avatar"

function Avatar({
  src,
  name,
  fallbackIcon,
  contain = false,
  size,
  shape,
  className,
}: VariantProps<typeof avatarVariants> & {
  src?: string
  /** The image's alt text, and the initials while there is no image. */
  name?: string
  /** Shown instead of initials when there is no name. */
  fallbackIcon?: ReactNode
  contain?: boolean
  className?: string
}) {
  const initials = (name || "?").slice(0, 2).toUpperCase()
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(avatarVariants({ size, shape }), className)}
    >
      {src ? (
        <AvatarPrimitive.Image
          src={src}
          alt={name ?? ""}
          loading="lazy"
          className={cn("size-full", contain ? "object-contain" : "object-cover")}
        />
      ) : null}
      <AvatarPrimitive.Fallback className="flex size-full items-center justify-center [&_svg]:size-1/2">
        {fallbackIcon && !name ? fallbackIcon : initials}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
}

export { Avatar, avatarVariants }
