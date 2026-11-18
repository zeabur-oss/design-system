import type { Cover } from "../render.ts"
import { arrow, column, quote, status, thing } from "../template/slab.ts"

const words = {
  en: ["Linux server", "Kubernetes cluster"],
  "zh-TW": ["Linux 主機", "Kubernetes 叢集"],
  "zh-CN": ["Linux 服务器", "Kubernetes 集群"],
}

export default {
  product: "Zeatend",
  headline: {
    en: "Turn one Linux server into a cluster that’s ready to use.",
    "zh-TW": "一台 Linux 主機，|變成可以直接用的叢集。",
    "zh-CN": "一台 Linux 服务器，|变成可以直接用的集群。",
  },
  alt: {
    en: "Zeatend: turn one Linux server into a cluster that’s ready to use. zeatend apply turns a Linux server into a running Kubernetes cluster.",
    "zh-TW":
      "Zeatend：一台 Linux 主機，變成可以直接用的叢集。zeatend apply 把 Linux 主機變成執行中的 Kubernetes 叢集。",
    "zh-CN":
      "Zeatend：一台 Linux 服务器，变成可以直接用的集群。zeatend apply 把 Linux 服务器变成运行中的 Kubernetes 集群。",
  },
  slab: (lang) => {
    const [server, cluster] = words[lang]
    return column(thing(server), arrow("down", quote("zeatend apply")), status(cluster))
  },
  sources: ["zeatend/README.md"],
} satisfies Cover
