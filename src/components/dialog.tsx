import type { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import type { VariantProps } from "class-variance-authority"
import { cn } from "cn"
import XIcon from "~icons/ph/x"

import {
  dialogBackdropVariants,
  dialogBodyVariants,
  dialogCloseButtonVariants,
  dialogContentVariants,
  dialogDescriptionVariants,
  dialogFooterVariants,
  dialogHeaderVariants,
  dialogTitleVariants,
} from "../variants/dialog"
import { PendingRoot, useLoadedPopups, useOpen, usePopups, type RootProps } from "./popup"

function Dialog({
  open,
  defaultOpen,
  onOpenChange,
  ...props
}: RootProps<DialogPrimitive.Root.Props>) {
  const state = useOpen(open, defaultOpen, onOpenChange)
  if (!state.parts) return <PendingRoot setOpen={state.setOpen}>{props.children}</PendingRoot>
  return (
    <state.parts.Dialog.Root
      data-slot="dialog"
      {...props}
      open={state.open}
      onOpenChange={(next) => state.setOpen(next)}
    />
  )
}

function DialogContent({
  className,
  backdropClassName,
  variant = "default",
  position = "center",
  ...props
}: DialogPrimitive.Popup.Props &
  VariantProps<typeof dialogContentVariants> & { backdropClassName?: string }) {
  const parts = usePopups()
  if (!parts) return null
  const { Dialog: D } = parts
  return (
    <D.Portal>
      <D.Backdrop className={cn(dialogBackdropVariants(), backdropClassName)} />
      <D.Popup
        data-slot="dialog-content"
        className={cn(dialogContentVariants({ variant, position, className }))}
        {...props}
      />
    </D.Portal>
  )
}

function DialogHeader({
  className,
  variant,
  close = true,
  closeLabel = "Close",
  children,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof dialogHeaderVariants> & {
    close?: boolean
    closeLabel?: string
  }) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(dialogHeaderVariants({ variant }), className)}
      {...props}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1">{children}</div>
      {close ? <DialogCloseButton label={closeLabel} /> : null}
    </div>
  )
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  const { Dialog: D } = useLoadedPopups()
  return (
    <D.Title data-slot="dialog-title" className={cn(dialogTitleVariants(), className)} {...props} />
  )
}

function DialogDescription({ className, ...props }: DialogPrimitive.Description.Props) {
  const { Dialog: D } = useLoadedPopups()
  return (
    <D.Description
      data-slot="dialog-description"
      className={cn(dialogDescriptionVariants(), className)}
      {...props}
    />
  )
}

function DialogBody({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof dialogBodyVariants>) {
  return (
    <div
      data-slot="dialog-body"
      className={cn(dialogBodyVariants({ variant }), className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="dialog-footer" className={cn(dialogFooterVariants(), className)} {...props} />
  )
}

function DialogClose(props: DialogPrimitive.Close.Props) {
  const { Dialog: D } = useLoadedPopups()
  return <D.Close {...props} />
}

function DialogCloseButton({ label = "Close", className }: { label?: string; className?: string }) {
  const { Dialog: D } = useLoadedPopups()
  return (
    <D.Close aria-label={label} className={cn(dialogCloseButtonVariants(), className)}>
      <XIcon className="size-4" aria-hidden="true" />
    </D.Close>
  )
}

export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose,
  DialogCloseButton,
  dialogContentVariants,
}
