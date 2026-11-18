import type { Cover, Lang } from "../render.ts"
import { arrow, column, logo, quote, row, status, thing, word } from "../template/slab.ts"

// zeabur web/src/i18n: phase.Running.
const running: Record<Lang, string> = { en: "Running", "zh-TW": "執行中", "zh-CN": "运行中" }

export default {
  product: "Builder",
  headline: {
    en: "Push your code to GitHub. It’s packaged, ready to go live.",
    "zh-TW": "程式碼推上 GitHub，|自動打包成|可以上線的版本。",
    "zh-CN": "代码推到 GitHub，|自动打包成|可以上线的版本。",
  },
  alt: {
    en: "Zeabur Builder: push your code to GitHub. It’s packaged, ready to go live. A Dockerfile or Python, PHP, Ruby, Node.js or Go code becomes the image main-1761058800-3e1a9c2, and it is running.",
    "zh-TW":
      "Zeabur Builder：程式碼推上 GitHub，自動打包成可以上線的版本。Dockerfile 或 Python、PHP、Ruby、Node.js、Go 程式碼變成映像 main-1761058800-3e1a9c2，然後執行中。",
    "zh-CN":
      "Zeabur Builder：代码推到 GitHub，自动打包成可以上线的版本。Dockerfile 或 Python、PHP、Ruby、Node.js、Go 代码变成镜像 main-1761058800-3e1a9c2，然后运行中。",
  },
  slab: (lang) =>
    column(
      // Node.js and Go allow their names but not their logos here: vendor/simple-icons/NOTICE.
      row(
        thing("Dockerfile", true),
        logo("python", true),
        logo("php"),
        logo("ruby"),
        word("Node.js"),
        word("Go"),
      ),
      arrow("down"),
      thing(quote("main-1761058800-3e1a9c2"), true),
      arrow("down"),
      status(quote(running[lang])),
    ),
  sources: [
    "builder/README.md",
    "zeabur/web/src/i18n/en.ts",
    "zeabur/web/src/i18n/zh-TW.ts",
    "zeabur/web/src/i18n/zh-CN.ts",
  ],
} satisfies Cover
