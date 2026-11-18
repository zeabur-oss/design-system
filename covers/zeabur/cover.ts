import type { Cover, Lang } from "../render.ts"
import { arrow, column, control, quote, row, status } from "../template/slab.ts"

// web/src/i18n: add.git, add.compose, add.template, phase.Running.
const ui: Record<Lang, [string, string, string, string]> = {
  en: ["Deploy from Git", "Docker Compose", "App template", "Running"],
  "zh-TW": ["從 Git 部署", "Docker Compose", "應用程式範本", "執行中"],
  "zh-CN": ["从 Git 部署", "Docker Compose", "应用模板", "运行中"],
}

export default {
  headline: {
    en: "Deploy on your own server, the Zeabur way.",
    "zh-TW": "在自己的主機上，|照 Zeabur 的方式部署。",
    "zh-CN": "在自己的服务器上，|照 Zeabur 的方式部署。",
  },
  alt: {
    en: "Zeabur: deploy on your own server, the Zeabur way. Deploy from Git, Docker Compose or an app template, and it is running.",
    "zh-TW":
      "Zeabur：在自己的主機上，照 Zeabur 的方式部署。從 Git、Docker Compose 或應用程式範本部署，就執行起來。",
    "zh-CN":
      "Zeabur：在自己的服务器上，照 Zeabur 的方式部署。从 Git、Docker Compose 或应用模板部署，就运行起来。",
  },
  slab: (lang) => {
    const [git, compose, template, running] = ui[lang]
    return row(
      column(
        control("outline", quote(git)),
        control("outline", quote(compose)),
        control("outline", quote(template)),
      ),
      arrow("right"),
      status(quote(running)),
    )
  },
  sources: [
    "zeabur/web/src/i18n/en.ts",
    "zeabur/web/src/i18n/zh-TW.ts",
    "zeabur/web/src/i18n/zh-CN.ts",
  ],
} satisfies Cover
