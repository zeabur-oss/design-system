// Adapted from engawa's design system (github.com/engawahq/design-system, Apache-2.0).
//
// The popups' code loads when the browser is next idle, or sooner when a trigger is used. Until then
// a trigger renders the same element and ARIA state, and a press opens its popup on arrival.
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import {
  createContext,
  useContext,
  useState,
  useSyncExternalStore,
  type ComponentProps,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
} from "react"

export type Parts = typeof import("./popup-parts")

export interface Loader<T> {
  get(): T | undefined
  /** A failed load is tried again on the next call. */
  load(): Promise<T | undefined>
  subscribe(listener: () => void): () => void
}

export function loader<T>(
  load: () => Promise<T>,
  arrived: (notify: () => void) => void = (notify) => notify(),
): Loader<T> {
  let value: T | undefined
  let loading: Promise<T | undefined> | undefined
  const listeners = new Set<() => void>()
  return {
    get: () => value,
    load: () =>
      (loading ??= load().then(
        (module) => {
          value = module
          arrived(() => {
            for (const listener of listeners) listener()
          })
          return module
        },
        () => (loading = undefined),
      )),
    subscribe(listener) {
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    },
  }
}

// An open trigger gets Base UI's focus guards as siblings; focusing one closes its popup.
const childrenOf = (element: Element) =>
  Array.from(element.children).filter((child) => !child.hasAttribute("data-base-ui-focus-guard"))

const pathOf = (element: Element) => {
  const path: number[] = []
  for (let at = element; at.parentElement; at = at.parentElement)
    path.unshift(childrenOf(at.parentElement).indexOf(at))
  return path
}

// Swapping in Base UI's triggers replaces the focused element; refocus its replacement.
function keepFocus(notify: () => void) {
  const focused = document.activeElement
  const path = focused && focused !== document.body ? pathOf(focused) : undefined
  notify()
  if (!path) return
  // After React has rendered the change, which it does in a microtask.
  setTimeout(() => {
    if (focused!.isConnected || document.activeElement !== document.body) return
    const element = path.reduce<Element | undefined>(
      (at, index) => (at ? childrenOf(at)[index] : undefined),
      document.documentElement,
    )
    if (element instanceof HTMLElement) element.focus({ preventScroll: true })
  })
}

const inBrowser = typeof document !== "undefined"

export const popups = loader(() => import("./popup-parts"), inBrowser ? keepFocus : undefined)

if (inBrowser) {
  const load = () => void popups.load()
  if ("requestIdleCallback" in window) requestIdleCallback(load, { timeout: 2000 })
  else setTimeout(load, 1000)
}

export function usePopups(): Parts | undefined {
  return useSyncExternalStore(popups.subscribe, popups.get, popups.get)
}

export function useLoadedPopups(): Parts {
  const parts = usePopups()
  if (!parts) throw new Error("a popup rendered before its code loaded")
  return parts
}

// Base UI's root is controlled from here, so a press before the code arrives opens it on arrival.
export function useOpen(
  open: boolean | undefined,
  defaultOpen: boolean | undefined,
  onOpenChange: ((open: boolean) => void) | undefined,
) {
  const parts = usePopups()
  const [own, setOwn] = useState(defaultOpen ?? false)
  const current = open ?? own
  // Starting the one load is idempotent, so it may happen during render.
  if (current && !parts) void popups.load()
  const setOpen = (next: boolean) => {
    setOwn(next)
    onOpenChange?.(next)
  }
  return { parts, open: current, setOpen }
}

export type RootProps<Props> = Omit<Props, "onOpenChange" | "children"> & {
  onOpenChange?: (open: boolean) => void
  children?: ReactNode
}

export type TriggerProps<Props> = Omit<Props, "className" | "style" | "render"> & {
  className?: string
  render?: ReactElement
}

const RequestOpen = createContext<() => void>(() => {})

export function PendingRoot({
  setOpen,
  children,
}: {
  setOpen: (open: boolean) => void
  children?: ReactNode
}) {
  return <RequestOpen value={() => setOpen(true)}>{children}</RequestOpen>
}

// A native button turns Enter and Space into a click; another element needs them handled.
export function pendingTriggerProps(open: () => void) {
  const preload = () => void popups.load()
  return {
    onPointerEnter: preload,
    onPointerDown: preload,
    onFocus: preload,
    onClick: open,
    onKeyDown: (event: KeyboardEvent<Element>) => {
      if (event.currentTarget.tagName === "BUTTON") return
      if (event.key !== "Enter" && event.key !== " ") return
      event.preventDefault()
      open()
    },
  }
}

export function PendingTrigger({
  haspopup,
  render,
  ...props
}: TriggerProps<ComponentProps<"button">> & { haspopup: "menu" | "dialog" }) {
  const requestOpen = useContext(RequestOpen)
  return useRender({
    defaultTagName: "button",
    render,
    props: mergeProps<"button">(
      {
        type: "button",
        "aria-haspopup": haspopup,
        "aria-expanded": false,
        ...pendingTriggerProps(requestOpen),
      },
      props,
    ),
  })
}

export function PendingTooltipTrigger({
  children,
  onShow,
}: {
  children: ReactElement
  onShow: (show: boolean) => void
}) {
  const preload = () => void popups.load()
  return useRender({
    render: children,
    props: {
      onPointerEnter: () => {
        onShow(true)
        preload()
      },
      onPointerLeave: () => onShow(false),
      onFocus: () => {
        onShow(true)
        preload()
      },
      onBlur: () => onShow(false),
    },
  })
}
