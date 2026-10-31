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

  test("a skeleton without delay fades in at once, then pulses as the default does", () => {
    const tokens = read("src/tokens.css")
    const animation = (name: string) =>
      tokens
        .match(new RegExp(`--animate-${name}:([^;]+);`))![1]!
        .split(",")
        .map((part) => part.trim().split(/\s+/))
    const [defaultIn, defaultPulse] = animation("skeleton")
    const [nowIn, nowPulse] = animation("skeleton-now")
    expect(nowIn).toEqual(defaultIn!.filter((word) => word !== "300ms"))
    expect(nowPulse).toEqual([...defaultPulse!.slice(0, 3), "150ms", "infinite"])
    expect(renderToStaticMarkup(h(Skeleton, { delay: "none" }))).toContain("animate-skeleton-now")
    expect(renderToStaticMarkup(h(Skeleton))).toMatch(/animate-skeleton(?!-)/)
  })
})
