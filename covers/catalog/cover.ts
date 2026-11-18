import type { Cover } from "../render.ts"
import { grid, logo } from "../template/slab.ts"

// Templates in templates/ whose owners allow their logo here: vendor/simple-icons/NOTICE.
const apps = [
  "wordpress",
  "n8n",
  "ghost",
  "uptimekuma",
  "vaultwarden",
  "umami",
  "gitea",
  "ollama",
  "searxng",
  "ntfy",
]

export default {
  product: "Catalog",
  headline: {
    en: "Every template is installed and tested first. It just runs.",
    "zh-TW": "每個範本都先|自動裝過、測過，|裝好就能跑。",
    "zh-CN": "每个模板都先|自动装过、测过，|装好就能跑。",
  },
  alt: {
    en: "Zeabur Catalog: every template is installed and tested first. It just runs. Logos of WordPress, n8n, Ghost, Uptime Kuma, Vaultwarden, Umami, Gitea, Ollama, SearXNG and ntfy.",
    "zh-TW":
      "Zeabur Catalog：每個範本都先自動裝過、測過，裝好就能跑。WordPress、n8n、Ghost、Uptime Kuma、Vaultwarden、Umami、Gitea、Ollama、SearXNG、ntfy 的 logo。",
    "zh-CN":
      "Zeabur Catalog：每个模板都先自动装过、测过，装好就能跑。WordPress、n8n、Ghost、Uptime Kuma、Vaultwarden、Umami、Gitea、Ollama、SearXNG、ntfy 的 logo。",
  },
  slab: () => grid(5, ...apps.map((app) => logo(app))),
  sources: [],
} satisfies Cover
