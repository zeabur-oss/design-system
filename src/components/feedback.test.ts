import { describe, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { createElement as h } from "react"
import { renderToStaticMarkup } from "react-dom/server"

import { Alert } from "./alert"
import { Banner } from "./banner"

const tokens = readFileSync(resolve(import.meta.dirname, "../tokens.css"), "utf8")

const classes = (markup: string) => /class="([^"]*)"/.exec(markup)![1]!.split(" ")

describe("warn", () => {
  const banner = classes(renderToStaticMarkup(h(Banner, { variant: "warn" })))
  const alert = classes(renderToStaticMarkup(h(Alert, { variant: "warn" })))
  const amber = ["border-amber/40", "bg-amber/8", "text-warn-strong"]

  test.each([
    ["Banner", banner],
    ["Alert", alert],
  ])("%s paints with the amber tokens and none of the failure red", (_, list) => {
    for (const name of amber) expect(list).toContain(name)
    expect(list.filter((name) => /danger|fail/.test(name))).toEqual([])
  })

  test.each(["amber", "warn-strong"])("--%s is defined", (name) => {
    expect(new RegExp(`--${name}:\\s*[^;]+;`).test(tokens)).toBe(true)
  })
})

describe("notice", () => {
  test("no longer styles a Banner or an Alert", () => {
    const banner = renderToStaticMarkup(h(Banner, { variant: "notice" as never }))
    const alert = renderToStaticMarkup(h(Alert, { variant: "notice" as never }))
    expect(classes(banner)).not.toContain("text-warn-strong")
    expect(classes(alert)).not.toContain("text-warn-strong")
  })
})

describe("Alert role", () => {
  test("has no role unless the caller passes one", () => {
    expect(renderToStaticMarkup(h(Alert, null))).not.toContain("role=")
  })

  test.each(["alert", "status", "note"])("keeps role=%s", (role) => {
    expect(renderToStaticMarkup(h(Alert, { role }))).toContain(`role="${role}"`)
  })
})
