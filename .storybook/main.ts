import type { StorybookConfig } from "@storybook/react-vite"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import Icons from "unplugin-icons/vite"

import { icons } from "../scripts/icons.ts"

// Keep in step with the Vite setup in the README.
const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: ["../stories/**/*.stories.tsx"],
  addons: ["@storybook/addon-themes"],
  core: { disableTelemetry: true },
  viteFinal(config) {
    config.plugins = [...(config.plugins ?? []), react(), tailwindcss(), Icons(icons)]
    return config
  },
}

export default config
