import { describe, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"

import { createElement as h } from "react"
import { renderToStaticMarkup } from "react-dom/server"

import { usePresence } from "./presence"
import { Skeleton } from "./skeleton"
import { SwapText } from "./swap-text"

const read = (path: string) => readFileSync(resolve(import.meta.dirname, "../..", path), "utf8")

function utility(css: string, name: string) {
  const start = css.indexOf(`@utility ${name} {`)
  expect(start).toBeGreaterThan(-1)
  const end = css.indexOf("\n}\n", start)
  return css.slice(start, end)
}

function Presence({ open }: { open: boolean }) {
  const presence = usePresence(open)
  return presence.mounted ? h("div", presence.props, "content") : null
}

describe("motion", () => {
  test("SwapText renders its first value without motion", () => {
    const markup = renderToStaticMarkup(h(SwapText, null, "Running"))
    expect(markup).toContain(">Running</span>")
    expect(markup).not.toMatch(/swap-in|reveal-in/)
  })

  test("usePresence mounts an open element in place and nothing when closed", () => {
    expect(renderToStaticMarkup(h(Presence, { open: true }))).toBe("<div>content</div>")
    expect(renderToStaticMarkup(h(Presence, { open: false }))).toBe("")
  })

  test("under reduced motion, no utility moves", () => {
    const moves = /\b(translate|scale|rotate|filter|width|height|d)\b/
    const transitions = (css: string) =>
      [...css.matchAll(/transition(?:-property)?:([^;]+);/g)].map((match) => match[1]!)
    const css = read("src/utilities.css")
    let moving = 0
    for (const block of css.split("\n@utility ").slice(1)) {
      const name = block.slice(0, block.indexOf(" "))
      if (!transitions(block).some((t) => moves.test(t))) continue
      moving++
      const guarded = block.includes("@media (prefers-reduced-motion: no-preference)")
      const reduce = block.split("@media (prefers-reduced-motion: reduce)")[1]
      expect(guarded || reduce !== undefined, name).toBe(true)
      for (const t of transitions(reduce ?? "")) expect(moves.test(t), name).toBe(false)
    }
    expect(moving).toBeGreaterThan(0)
  })

  test("a sheet closes with a 150ms fade under reduced motion", () => {
    const css = read("src/utilities.css")
    for (const name of ["sheet-motion-start", "sheet-motion-end", "sheet-motion-bottom"]) {
      const reduce = utility(css, name).split("@media (prefers-reduced-motion: reduce)")[1]
      expect(reduce).toContain("&[data-ending-style] {\n      translate: none;")
      expect(reduce).toContain("transition-duration: var(--transition-duration-quick);\n    }")
    }
  })

  test("reduced motion keeps transitions and stops animations", () => {
    const base = read("src/base.css")
    const reduce = base.slice(base.indexOf("@media (prefers-reduced-motion: reduce)"))
    expect(reduce).toContain("animation-iteration-count: 1 !important")
    expect(reduce.slice(0, reduce.indexOf("\n}\n"))).not.toContain("transition-duration")
  })

  test("a skeleton without delay starts fading in at once and otherwise moves as the default", () => {
    const tokens = read("src/tokens.css")
    // Each animation of the skeleton as {name, duration, delay}, read from the token its class uses.
    const animations = (props: Parameters<typeof Skeleton>[0]) => {
      const name = /animate-([\w-]+)/.exec(renderToStaticMarkup(h(Skeleton, props)))![1]
      const value = new RegExp(`--animate-${name}:([^;]+);`).exec(tokens)![1]!
      return value.split(",").map((part) => {
        const [animation, ...rest] = part.trim().split(/\s+/)
        const [duration = 0, delay = 0] = rest.filter((w) => /^[\d.]+m?s$/.test(w)).map(ms)
        return { animation, duration, delay, rest: rest.filter((w) => !/^[\d.]+m?s$/.test(w)) }
      })
    }
    const ms = (time: string) =>
      time.endsWith("ms") ? Number.parseFloat(time) : Number.parseFloat(time) * 1000
    const [fadeIn, pulse] = animations({ delay: "none" })
    const [defaultIn, defaultPulse] = animations({})
    expect(fadeIn!.delay).toBe(0)
    expect(pulse!.delay).toBe(fadeIn!.duration)
    expect({ ...fadeIn, delay: 0 }).toEqual({ ...defaultIn, delay: 0 })
    expect({ ...pulse, delay: 0 }).toEqual({ ...defaultPulse, delay: 0 })
    expect(defaultPulse!.delay).toBe(defaultIn!.delay + defaultIn!.duration)
  })
})
