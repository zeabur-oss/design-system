// Bun's runtime plugins cannot resolve a bare specifier by pattern (unplugin's Bun adapter relies on
// that), so every icon is registered by name.
import { icons as set } from "@iconify-json/ph"
import Icons from "unplugin-icons"

import { icons } from "./icons.ts"

const plugin = Icons.raw(icons, { framework: "bun" })
const resolveId = plugin.resolveId as (id: string) => string
const load = plugin.load as (
  this: { addWatchFile(path: string): void },
  id: string,
) => Promise<{ code: string }>

Bun.plugin({
  name: "unplugin-icons (test)",
  setup(build) {
    for (const name of [...Object.keys(set.icons), ...Object.keys(set.aliases ?? {})]) {
      const id = `~icons/ph/${name}`
      build.module(id, async () => ({
        contents: (await load.call({ addWatchFile() {} }, resolveId(id))).code,
        loader: "jsx",
      }))
    }
  },
})
