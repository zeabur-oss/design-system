import { useSyncExternalStore } from "react"

export type ThemeChoice = "system" | "light" | "dark"

export function themeStore(key: string) {
  const query = window.matchMedia("(prefers-color-scheme: dark)")
  const listeners = new Set<() => void>()

  function read(): ThemeChoice {
    try {
      const value = window.localStorage.getItem(key)
      return value === "light" || value === "dark" ? value : "system"
    } catch {
      return "system"
    }
  }

  let choice: ThemeChoice = read()

  function apply() {
    const dark = choice === "dark" || (choice === "system" && query.matches)
    document.documentElement.classList.toggle("dark", dark)
    document.documentElement.classList.toggle("light", !dark)
  }

  function followSystemTheme() {
    apply()
    query.addEventListener("change", apply)
  }

  function setTheme(next: ThemeChoice) {
    choice = next
    try {
      if (next === "system") window.localStorage.removeItem(key)
      else window.localStorage.setItem(key, next)
    } catch {
      // Storage unavailable: the choice lasts this visit.
    }
    apply()
    for (const listener of listeners) listener()
  }

  function cycleTheme() {
    setTheme(choice === "system" ? "light" : choice === "light" ? "dark" : "system")
  }

  function subscribe(listener: () => void) {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  }

  function useTheme(): ThemeChoice {
    return useSyncExternalStore(subscribe, () => choice)
  }

  return { followSystemTheme, setTheme, cycleTheme, useTheme }
}
