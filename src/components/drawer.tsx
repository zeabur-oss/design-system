import { cn } from "cn"
import type { ReactNode } from "react"

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog"

function Drawer({
  open,
  onOpenChange,
  title,
  description,
  size = "lg",
  showCloseButton = true,
  closeLabel,
  dismissible = true,
  footer,
  className,
  bodyClassName,
  children,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: ReactNode
  description?: ReactNode
  size?: "md" | "lg" | "xl"
  showCloseButton?: boolean
  closeLabel?: string
  /** Escape and the close button close it regardless. */
  dismissible?: boolean
  footer?: ReactNode
  className?: string
  bodyClassName?: string
  children?: ReactNode
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} disablePointerDismissal={!dismissible}>
      <DialogContent
        variant="panel"
        className={cn(size === "md" && "sm:max-w-md", size === "xl" && "sm:max-w-4xl", className)}
      >
        {title === undefined && !showCloseButton ? null : (
          <DialogHeader variant="panel" close={showCloseButton} closeLabel={closeLabel}>
            {title === undefined ? null : <DialogTitle>{title}</DialogTitle>}
            {description === undefined ? null : (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}
        <DialogBody variant="panel" className={bodyClassName}>
          {children}
        </DialogBody>
        {footer === undefined ? null : <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  )
}

export { Drawer }
