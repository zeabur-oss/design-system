import { cn } from "cn"

import CheckIcon from "~icons/ph/check"
import CopyIcon from "~icons/ph/copy"

import { Input } from "./input"
import { useCopy } from "./use-copy"

function CopyInput({
  value,
  onCopy,
  onCopyError,
  copyLabel = "Copy",
  className,
  inputClassName,
}: {
  value: string
  onCopy?: () => void
  onCopyError?: (error: unknown) => void
  copyLabel?: string
  className?: string
  inputClassName?: string
}) {
  const { copied, copy } = useCopy(value, onCopy, onCopyError)
  return (
    <div data-slot="copy-input" className={cn("relative", className)}>
      <Input readOnly value={value} mono endSlot className={inputClassName} />
      <button
        type="button"
        onClick={() => void copy()}
        aria-label={copyLabel}
        className="absolute top-1/2 right-1 inline-flex size-control-xs -translate-y-1/2 items-center justify-center rounded text-secondary transition-colors hover:bg-v2-surface-hover hover:text-main"
      >
        {copied ? (
          <CheckIcon className="size-4 text-ok" aria-hidden="true" />
        ) : (
          <CopyIcon className="size-4" aria-hidden="true" />
        )}
      </button>
    </div>
  )
}

export { CopyInput }
