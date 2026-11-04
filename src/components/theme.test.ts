import { afterEach, beforeEach, describe, expect, test } from "bun:test"

import { themeStore } from "./theme"

const g = globalThis as Record<string, unknown>

let stored: Map<string, string>
let dark: boolean
let changed: (() => void) | undefined
let classes: Set<string>

beforeEach(() => {
  stored = new Map()
  dark = false
  changed = undefined
  classes = new Set()
  g.window = {
    localStorage: {
      getItem: (k: string) => stored.get(k) ?? null,
      setItem: (k: string, v: string) => void stored.set(k, v),
      removeItem: (k: string) => void stored.delete(k),
    },
    matchMedia: () => ({
      get matches() {
        return dark
      },
      addEventListener: (_: string, fn: () => void) => {
        changed = fn
      },
    }),
  }
  g.document = {
    documentElement: {
      classList: {
        toggle: (name: string, on: boolean) => void (on ? classes.add(name) : classes.delete(name)),
      },
    },
  }
})

afterEach(() => {
  delete g.window
  delete g.document
})

describe("themeStore", () => {
  test("a stored choice is applied under its own key", () => {
    stored.set("a.theme", "dark")
    const a = themeStore("a.theme")
    a.followSystemTheme()
    expect([...classes]).toEqual(["dark"])
    expect(themeStore("b.theme").setTheme).toBeDefined()
    stored.delete("a.theme")
    themeStore("b.theme").followSystemTheme()
    expect(classes.has("light")).toBe(true)
  })

  test("system follows the media query", () => {
    const store = themeStore("t")
    store.followSystemTheme()
    expect(classes.has("light")).toBe(true)
    dark = true
    changed?.()
    expect(classes.has("dark")).toBe(true)
    expect(classes.has("light")).toBe(false)
  })

  test("a choice is stored, and system clears it", () => {
    const store = themeStore("t")
    store.setTheme("dark")
    expect(stored.get("t")).toBe("dark")
    store.setTheme("system")
    expect(stored.has("t")).toBe(false)
  })

  test("cycle goes system, light, dark, system", () => {
    const store = themeStore("t")
    store.cycleTheme()
    expect(stored.get("t")).toBe("light")
    store.cycleTheme()
    expect(stored.get("t")).toBe("dark")
    store.cycleTheme()
    expect(stored.has("t")).toBe(false)
  })

  test("unreadable storage falls back to system", () => {
    ;(g.window as { localStorage: unknown }).localStorage = {
      getItem: () => {
        throw new Error("blocked")
      },
    }
    const store = themeStore("t")
    store.followSystemTheme()
    expect(classes.has("light")).toBe(true)
  })
})
