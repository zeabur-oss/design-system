// bun render.ts <cover> [--out <dir>] [--previews <dir>] [--repos <dir>]: covers/README.md.

import { mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"
import { parseArgs } from "node:util"
import { chromium } from "playwright-core"
import sharp from "sharp"

export const langs = ["en", "zh-TW", "zh-CN"] as const
export type Lang = (typeof langs)[number]

export interface Cover {
  /** The word set large at the bottom. "Zeabur" when absent. */
  product?: string
  /** "|" marks where a Chinese line may break. */
  headline: Record<Lang, string>
  alt: Record<Lang, string>
  /** The violet slab, built from template/slab.ts. */
  slab: (lang: Lang) => string
  /** Files under --repos that hold every `data-quote` on the slab. */
  sources: string[]
}

const root = dirname(fileURLToPath(import.meta.url))
const ds = resolve(root, "..")

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    out: { type: "string" },
    previews: { type: "string" },
    repos: { type: "string" },
  },
})
const name = positionals[0]
if (!name) {
  console.error("usage: bun render.ts <cover> [--out <dir>] [--previews <dir>] [--repos <dir>]")
  process.exit(2)
}
const cover: Cover = (await import(join(root, name, "cover.ts"))).default
const previews = resolve(values.previews ?? join(root, ".build", name))
const out = resolve(values.out ?? previews)
const repos = resolve(values.repos ?? join(ds, ".."))
const build = join(root, ".build", name)
await Promise.all([previews, out, build].map((path) => mkdir(path, { recursive: true })))

const wordmark = (await readFile(join(ds, "vendor/zeabur/logo-with-text.svg"), "utf8"))
  .replace(/ width="563" height="107"/, ' class="wordmark" role="img" aria-label="Zeabur"')
  .replaceAll('fill="white"', 'fill="currentColor"')
  .replace('fill="#6300FF"', 'fill="var(--logo-violet)"')
  .replace('fill="#FF4400"', 'fill="var(--logo-orangered)"')
if (!wordmark.includes('class="wordmark"')) throw new Error("logo-with-text.svg: size changed")

const icons = join(ds, "vendor/simple-icons")
const colors: Record<string, { title: string; hex: string }> = JSON.parse(
  await readFile(join(icons, "colors.json"), "utf8"),
)
async function inlineLogos(html: string): Promise<string> {
  for (const [tag, slug] of html.matchAll(/<simple-icon name="([\w-]+)"><\/simple-icon>/g)) {
    const color = colors[slug]
    if (!color) throw new Error(`${slug}: not in vendor/simple-icons`)
    const svg = (await readFile(join(icons, `${slug}.svg`), "utf8"))
      .replace(/<title>.*?<\/title>/, "")
      .replace('role="img"', `role="img" aria-label="${color.title}" fill="#${color.hex}"`)
    html = html.replace(tag, svg)
  }
  return html
}

// Phosphor, the icon set of the design system, in its bold weight.
const phosphor: Record<string, { body: string }> = JSON.parse(
  await readFile(join(ds, "node_modules/@iconify-json/ph/icons.json"), "utf8"),
).icons
function inlineIcons(html: string): string {
  return html.replace(/<phosphor-icon name="([\w-]+)"><\/phosphor-icon>/g, (_, name: string) => {
    const icon = phosphor[`${name}-bold`]
    if (!icon) throw new Error(`${name}: not a Phosphor icon`)
    return `<svg class="icon" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">${icon.body}</svg>`
  })
}

const avoid: [RegExp, string][] = [
  [
    /<(\w+)[^>]*>\s*<\/\1>\s*<\1[^>]*>\s*<\/\1>\s*<\1[^>]*>\s*<\/\1>/,
    "three empty dots: window chrome",
  ],
  [/class="[^"]*\b(window|titlebar|traffic|chrome|toolbar)/i, "window chrome"],
  [/class="[^"]*\b(card|button|btn|badge|pill|toast|modal)\b/i, "a mock UI kit"],
  [/…|\.\.\./, "a progress line no tool printed"],
  [/<ph-icon\b/, "decorative icons"],
]

// Noto Sans CJK sets Chinese on every machine alike. The collection holds one face per region;
// Chromium loads only the first (JP), so each face is copied out into a font of its own.
const cjkFaces: Record<Exclude<Lang, "en">, number> = { "zh-CN": 2, "zh-TW": 3 }
const cjkWeights = { Medium: 500, Bold: 700, Black: 900 }
function face(collection: Buffer, index: number): Buffer {
  const at = collection.readUInt32BE(12 + 4 * index)
  const count = collection.readUInt16BE(at + 4)
  const head = Buffer.alloc(12 + 16 * count)
  collection.copy(head, 0, at, at + 12)
  const parts = [head]
  let offset = head.length
  for (let i = 0; i < count; i++) {
    const record = at + 12 + 16 * i
    const tableOffset = collection.readUInt32BE(record + 8)
    const length = collection.readUInt32BE(record + 12)
    collection.copy(head, 12 + 16 * i, record, record + 8)
    head.writeUInt32BE(offset, 12 + 16 * i + 8)
    head.writeUInt32BE(length, 12 + 16 * i + 12)
    const padding = Buffer.alloc((4 - (length % 4)) % 4)
    parts.push(collection.subarray(tableOffset, tableOffset + length), padding)
    offset += length + padding.length
  }
  return Buffer.concat(parts)
}
async function cjkFontFaces(lang: Lang): Promise<string> {
  if (lang === "en") return ""
  // flake.nix sets COVERS_CJK_FONTS to nixpkgs' noto-fonts-cjk-sans-static.
  const fonts = process.env.COVERS_CJK_FONTS
  if (!fonts) throw new Error("COVERS_CJK_FONTS is not set: run inside nix develop")
  const rules = []
  for (const [style, weight] of Object.entries(cjkWeights)) {
    const file = join(build, `noto-sans-${lang}-${style}.otf`)
    const collection = await readFile(join(fonts, `NotoSansCJK-${style}.ttc`))
    await writeFile(file, face(collection, cjkFaces[lang]))
    rules.push(
      `@font-face { font-family: "Cover CJK"; font-weight: ${weight}; src: url(${pathToFileURL(file).href}); }`,
    )
  }
  return rules.join("\n")
}

const collapse = (text: string) => text.replace(/\s+/g, " ").trim()
const sources = await Promise.all(
  cover.sources.map(async (path) => collapse(await readFile(join(repos, path), "utf8"))),
)
const href = (path: string) => pathToFileURL(join(ds, path)).href

function headline(lang: Lang): string {
  const text = cover.headline[lang]
  return (lang === "en" ? text : text.replaceAll(" ", " ")).replaceAll("|", "<wbr>")
}

async function page(lang: Lang, theme: "light" | "dark"): Promise<string> {
  return `<!doctype html>
<html lang="${lang}" class="${theme}">
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="${href("src/fonts.css")}">
<link rel="stylesheet" href="${href("src/tokens.css")}">
<link rel="stylesheet" href="${href("covers/template/cover.css")}">
<style>${await cjkFontFaces(lang)}</style>
</head>
<body>
<div class="lockup">${wordmark}</div>
<h1 class="headline">${headline(lang)}</h1>
<div class="slab">${inlineIcons(await inlineLogos(cover.slab(lang)))}</div>
<div class="rule"></div>
<div class="name">${cover.product ?? "Zeabur"}</div>
</body>
</html>`
}

const file = (lang: Lang, rest: string) =>
  lang === "en" ? `cover-${rest}` : `cover-${lang}-${rest}`

for (const lang of langs) {
  const problems = avoid.filter(([re]) => re.test(cover.slab(lang))).map(([, why]) => why)
  if (problems.length) {
    console.error(`${name} ${lang}: refused, see covers/README.md "What we avoid, and why"`)
    for (const problem of problems) console.error(`  slab: ${problem}`)
    process.exit(1)
  }
}

// Chromium from nixpkgs: flake.nix sets PLAYWRIGHT_BROWSERS_PATH.
const browser = await chromium.launch({ channel: "chromium" })
try {
  for (const lang of langs) {
    for (const theme of ["light", "dark"] as const) {
      const html = join(build, `${lang}-${theme}.html`)
      await writeFile(html, await page(lang, theme))
      for (const scale of lang === "en" && theme === "dark" ? [2, 1] : [2]) {
        const tab = await browser.newPage({
          viewport: { width: 1280, height: 640 },
          deviceScaleFactor: scale,
          colorScheme: theme,
        })
        await tab.goto(pathToFileURL(html).href)
        await tab.evaluate(() => document.fonts.ready)
        const quotes: string[] = await tab.evaluate(() =>
          [...document.querySelectorAll("[data-quote]")].map(
            (el) => el.getAttribute("data-quote") || el.textContent || "",
          ),
        )
        const invented = quotes.filter((quote) => !sources.some((s) => s.includes(collapse(quote))))
        const unquoted: string[] = await tab.evaluate(() =>
          [...document.querySelectorAll(".ui")]
            .filter((el) => !el.querySelector("[data-quote]"))
            .map((el) => el.textContent ?? ""),
        )
        if (invented.length || unquoted.length) {
          const list = (texts: string[]) => texts.map((t) => JSON.stringify(t)).join(", ")
          if (invented.length)
            console.error(`${name} ${lang}: quoted but not in sources: ${list(invented)}`)
          if (unquoted.length)
            console.error(`${name} ${lang}: controls with no quoted label: ${list(unquoted)}`)
          process.exit(1)
        }
        // The name fills the width it is given and no more: shrink a long one to fit.
        await tab.evaluate(() => {
          const el = document.querySelector<HTMLElement>(".name")!
          const max = 1280 - 2 * 44
          const size = parseFloat(getComputedStyle(el).fontSize)
          if (el.offsetWidth <= max) return
          el.style.fontSize = `${(size * max) / el.offsetWidth}px`
          // Keep it on the bottom edge, cut as much as a name at full size.
          el.style.top = `${640 - (el.offsetHeight * 310) / 340}px`
        })
        const overflow: string[] = await tab.evaluate(() => {
          const rule = document.querySelector(".rule")!.getBoundingClientRect().top
          const headline = document.querySelector(".headline")!.getBoundingClientRect().bottom
          const box = document.querySelector(".slab")!
          const slab = box.getBoundingClientRect()
          const right = Math.max(
            ...[...document.querySelectorAll(".slab *")].map(
              (el) => el.getBoundingClientRect().right,
            ),
          )
          const checks: [boolean, string][] = [
            [headline > rule - 16, "the headline reaches the rule"],
            [right > slab.right - 48 + 0.5, "the slab runs into its right margin"],
            [box.scrollHeight > box.clientHeight, "the slab is too full"],
          ]
          return checks.filter(([hit]) => hit).map(([, why]) => why)
        })
        if (overflow.length) console.warn(`${name} ${lang} ${theme}: ${overflow.join(", ")}`)
        const png = await tab.screenshot({ type: "png" })
        await tab.close()
        if (scale === 1) {
          await writeFile(join(previews, "social-preview.png"), png)
          continue
        }
        await writeFile(join(previews, file(lang, `${theme}.png`)), png)
        await sharp(png)
          .resize({ width: 830 })
          .png()
          .toFile(join(previews, file(lang, `${theme}-github.png`)))
        const avif = await sharp(png).avif({ quality: 62, effort: 9 }).toBuffer()
        const target = join(out, file(lang, `${theme}.avif`))
        await writeFile(target, avif)
        console.log(`${target}  ${(avif.length / 1024).toFixed(1)} KiB`)
      }
    }
  }
} finally {
  await browser.close()
}
console.log(`previews: ${previews}`)
