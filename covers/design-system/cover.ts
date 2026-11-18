import type { Cover, Lang } from "../render.ts"
import { swatches } from "../template/slab.ts"

const heads: Record<Lang, [string, string]> = {
  en: ["Light", "Dark"],
  "zh-TW": ["亮色", "暗色"],
  "zh-CN": ["亮色", "暗色"],
}

export default {
  product: "Design System",
  headline: {
    en: "Build screens that look like Zeabur, right in light and dark.",
    "zh-TW": "做出和 Zeabur|一樣的畫面，|亮色暗色都對。",
    "zh-CN": "做出和 Zeabur|一样的界面，|亮色暗色都对。",
  },
  alt: {
    en: "Zeabur Design System: build screens that look like Zeabur, right in light and dark. Four tokens with their light and dark colours.",
    "zh-TW":
      "Zeabur Design System：做出和 Zeabur 一樣的畫面，亮色暗色都對。四個 token 的亮色與暗色。",
    "zh-CN":
      "Zeabur Design System：做出和 Zeabur 一样的界面，亮色暗色都对。四个 token 的亮色与暗色。",
  },
  slab: (lang) =>
    swatches(heads[lang], ["--surface-page", "--text-main", "--violet-accent", "--border-main"]),
  sources: ["design-system/src/tokens.css"],
} satisfies Cover
