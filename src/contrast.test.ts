import { expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"

import { group } from "./test-support"

const tokens = readFileSync(resolve(import.meta.dirname, "tokens.css"), "utf8")

type Rgb = [number, number, number]

function value(name: string) {
  const match = new RegExp(`--${name}:\\s*([^;]+);`).exec(tokens)
  if (!match) throw new Error(`no --${name}`)
  return group(match).trim()
}

function colour(raw: string): Rgb {
  const hex = /^#([0-9a-f]{6})$/i.exec(raw)
  if (hex) {
    const n = parseInt(group(hex), 16)
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
  }
  const palette = /^rgb\(var\(--([\w-]+)\)\)$/.exec(raw)
  if (palette) {
    const [r, g, b, ...rest] = value(group(palette)).split(",").map(Number)
    if (r === undefined || g === undefined || b === undefined || rest.length)
      throw new Error(`not three channels: ${raw}`)
    return [r, g, b]
  }
  throw new Error(`cannot read ${raw}`)
}

// Returns the light and the dark colour of a token.
function rgb(name: string): [Rgb, Rgb] {
  const raw = value(name)
  const both = /^light-dark\((.*)\)$/.exec(raw)
  if (!both) return [colour(raw), colour(raw)]
  const [light, dark, ...rest] = group(both)
    .split(/,(?![^(]*\))/)
    .map((part) => colour(part.trim()))
  if (!light || !dark || rest.length) throw new Error(`not a light and a dark colour: ${raw}`)
  return [light, dark]
}

function luminance([r, g, b]: Rgb) {
  const linear = (channel: number) => {
    const c = channel / 255
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b)
}

function ratio(a: Rgb, b: Rgb) {
  const [x, y] = [luminance(a), luminance(b)]
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
}

const white: Rgb = [255, 255, 255]

test("white text on each destructive stop is 4.5:1 or more", () => {
  for (const stop of [
    "destructive-from",
    "destructive-to",
    "destructive-hover-from",
    "destructive-hover-to",
  ])
    for (const background of rgb(stop)) expect(ratio(white, background)).toBeGreaterThanOrEqual(4.5)
})

test("fail-strong text on each secondary-destructive stop is 4.5:1 or more", () => {
  const [light, dark] = rgb("fail-strong")
  for (const stop of [
    "secondary-from",
    "secondary-to",
    "secondary-danger-from",
    "secondary-danger-to",
  ]) {
    const [onLight, onDark] = rgb(stop)
    expect(ratio(light, onLight)).toBeGreaterThanOrEqual(4.5)
    expect(ratio(dark, onDark)).toBeGreaterThanOrEqual(4.5)
  }
})
