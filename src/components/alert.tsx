import * as React from "react"
import type { VariantProps } from "class-variance-authority"
import { cn } from "cn"

import {
  alertActionVariants,
  alertDescriptionVariants,
  alertTitleVariants,
  alertVariants,
} from "../variants/alert"

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return <div data-slot="alert" className={cn(alertVariants({ variant }), className)} {...props} />
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-title" className={cn(alertTitleVariants(), className)} {...props} />
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(alertDescriptionVariants(), className)}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="alert-action" className={cn(alertActionVariants(), className)} {...props} />
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction, alertVariants }
