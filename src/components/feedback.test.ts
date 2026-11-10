import { describe, expect, test } from "bun:test"
import { createElement as h } from "react"
import { renderToStaticMarkup } from "react-dom/server"

import { Alert } from "./alert"

describe("Alert role", () => {
  test("has no role unless the caller passes one", () => {
    expect(renderToStaticMarkup(h(Alert, null))).not.toContain("role=")
  })

  test.each(["alert", "status", "note"])("keeps role=%s", (role) => {
    expect(renderToStaticMarkup(h(Alert, { role }))).toContain(`role="${role}"`)
  })
})
