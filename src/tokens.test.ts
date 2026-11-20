import { describe, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"

import { group } from "./test-support"

function lightDarkCalls(css: string) {
  const code = css.replace(/\/\*[\s\S]*?\*\//g, "")
  const calls: string[] = []
  for (let at = code.indexOf("light-dark("); at !== -1; at = code.indexOf("light-dark(", at + 1)) {
    let depth = 0
    let end = at + "light-dark".length
    for (; end < code.length; end++) {
      if (code[end] === "(") depth++
      else if (code[end] === ")" && --depth === 0) break
    }
    calls.push(code.slice(at + "light-dark(".length, end))
  }
  return calls
}

// Lightning CSS (Vite's minifier) drops a color-mix() argument when it rewrites light-dark() for
// older browsers.
test("light-dark() takes plain colours", () => {
  let count = 0
  for (const file of ["src/tokens.css", "src/utilities.css", "src/base.css"]) {
    const css = readFileSync(resolve(import.meta.dirname, "..", file), "utf8")
    for (const args of lightDarkCalls(css)) {
      count++
      expect(args).not.toContain("color-mix")
      expect(args).not.toContain("gradient")
    }
  }
  expect(count).toBeGreaterThan(0)
})

const read = (file: string) => readFileSync(resolve(import.meta.dirname, "..", file), "utf8")
const uncommented = (css: string) => css.replace(/\/\*[\s\S]*?\*\//g, "")

// `--text-main` and the like on :root are colours, not roles.
function textRoles(css: string) {
  const roles = new Set<string>()
  for (const block of uncommented(css).matchAll(/@theme[^{]*\{([^}]*)\}/g))
    for (const match of group(block).matchAll(/--text-([a-z]+):/g)) roles.add(group(match))
  return [...roles]
}

describe("the type scale", () => {
  const tokens = read("src/tokens.css")
  const utilities = read("src/utilities.css")
  const roles = textRoles(tokens)

  test("covers every role", () => {
    for (const role of [
      "title",
      "name",
      "heading",
      "body",
      "meta",
      "label",
      "micro",
      "nano",
      "kbd",
      "figure",
      "mono",
    ])
      expect(roles).toContain(role)
  })

  test("each size has its line height", () => {
    for (const role of roles) expect(tokens).toContain(`--text-${role}--line-height:`)
  })

  test("each role's utility reads its size, and its line height but for mono", () => {
    for (const role of roles) {
      const body = new RegExp(`@utility type-${role} \\{([^}]*)\\}`).exec(utilities)?.[1]
      expect(body).toBeDefined()
      expect(body).toContain(`font-size: var(--text-${role});`)
      if (role !== "mono") expect(body).toContain(`line-height: var(--text-${role}--line-height);`)
      for (const key of ["font-weight", "letter-spacing"])
        if (tokens.includes(`--text-${role}--${key}:`))
          expect(body).toContain(`${key}: var(--text-${role}--${key});`)
    }
  })

  test("the older --type-* names stay as aliases", () => {
    for (const role of roles.filter((role) => role !== "kbd" && role !== "mono"))
      expect(tokens).toContain(`--type-${role}: var(--text-${role});`)
  })
})

describe("raw values live in src/tokens.css only", () => {
  test("the utilities and base styles name no hex colour and no palette step", () => {
    for (const file of ["src/utilities.css", "src/base.css"]) {
      const css = uncommented(read(file)).replace(/url\("data:[^"]*"\)/g, "")
      expect(css).not.toMatch(/#[0-9a-f]{3,8}\b/i)
      expect(css).not.toMatch(/--z(Gray|Violet|Orangered)-/)
      expect(css).not.toMatch(/\brgba?\(\s*\d/)
    }
  })

  test("every colour a component class names is a theme colour", () => {
    const tokens = read("src/tokens.css")
    for (const name of [
      "surface-raised",
      "segmented-track",
      "segmented-border",
      "track",
      "rail",
      "nav-current",
      "on-primary",
      "primary-hover",
      "danger",
      "overlay",
    ])
      expect(tokens).toContain(`--color-${name}: var(--${name});`)
  })
})
