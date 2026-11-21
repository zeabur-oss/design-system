**English** · [繁體中文](README.zh-TW.md) · [简体中文](README.zh-CN.md)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/images/cover-dark.avif">
  <img alt="Zeabur Design System: build screens that look like Zeabur, right in light and dark. Four tokens with their light and dark colours." src="docs/images/cover-light.avif">
</picture>

# Zeabur Design System

Components and styles of Zeabur OSS for React, [Base UI](https://base-ui.com) and
[Tailwind CSS v4](https://tailwindcss.com). Build screens that look like Zeabur OSS, in light and dark.
Zeabur OSS, Zeabur Identity's sign-in pages and [oss.zeabur.com](https://oss.zeabur.com) use it.

- **Tokens**: the colours, type roles, status colours, shadows and motion of Zeabur OSS, each with a light
  and a dark value, and [shadcn/ui](https://ui.shadcn.com)'s theme variables mapped onto them.
- **Components**: buttons, fields, menus, dialogs, tables, tabs, navigation, charts and more, one
  module each, on Base UI. Browse them in Storybook.
- **Utilities**: the button surfaces, navigation rows, frosted surface and loading dots of Zeabur OSS.
- **Fonts**: Geist and Geist Mono, self-hosted (SIL Open Font License).

Preview everything in Storybook (light and dark in its toolbar):

```sh
nix develop          # bun and Node.js, from flake.nix
bun ci
bun run storybook    # http://localhost:6006
```

## Use in a React app

Add it from npm, pinned to a version:

```sh
bun add --exact @zeabur-oss/design-system
```

The package ships its sources (TSX and CSS) and has no build step, so the app compiles it. The app
needs React 19, Base UI, Tailwind CSS v4, `class-variance-authority` and `cn` (peer dependencies;
`recharts` for the chart and `sonner` for the toaster, only if it uses them), and in its Vite
config:

```ts
plugins: [
  react({
    // The React Compiler skips node_modules unless `sources` names the files.
    compiler: { sources: [resolve(import.meta.dirname, "src") + "/", "/node_modules/@zeabur-oss/design-system/"] },
    exclude: /\/node_modules\/(?!@zeabur-oss\/design-system\/)/,
  }),
  tailwindcss(),
  // `~icons/ph/<name>`: Phosphor icons, as the components import them.
  Icons(icons),
],
// The pre-bundler runs no plugins, so it could not resolve `~icons/…`. What the design system
// imports is not pre-bundled either then, and Base UI reaches CommonJS: list it in `include`.
optimizeDeps: {
  exclude: ["@zeabur-oss/design-system"],
  include: ["@base-ui/react/select", "@base-ui/react/menu", "cn", "class-variance-authority" /* … */],
},
```

with `"types": ["unplugin-icons/types/react"]` in its `tsconfig`, and `unplugin-icons`,
`@iconify-json/ph`, `@svgr/core` and `@svgr/plugin-jsx` among its dev dependencies. `icons` is
the options in [`scripts/icons.ts`](scripts/icons.ts): copy the file into the app. It calls svgr
itself, because unplugin-icons' own `"jsx"` compiler loads `@svgr/core` by name from its own
location, where Bun's isolated linker does not let it see the app's packages.

Import the styles right after Tailwind in the app's stylesheet (they also tell Tailwind to read the
components' classes):

```css
@import "tailwindcss";
@import "@zeabur-oss/design-system";
```

and the components one by one:

```tsx
import { Badge } from "@zeabur-oss/design-system/components/badge"
import { Button } from "@zeabur-oss/design-system/components/button"
```

Wrap the app in `TooltipProvider` (`components/tooltip`). The theme is light by default and dark
under a `.dark` class on `<html>` (set it before the first paint); pass the app's theme to `Toaster`
(`components/sonner`). `Toaster` needs a Content Security Policy that allows inline styles (Sonner
adds a `<style>` element).

## Server-rendered pages

A page that is not a React app (such as the sign-in pages of Zeabur Identity, askama templates
compiled with the Tailwind CSS v4 CLI) uses `tokens.css`: the tokens, type roles, utilities and
base styles, without the components or `@font-face`, and with no `url()` to resolve (the logo masks
are inlined).

```css
@import "tailwindcss" source(none);
@source "../templates";
@import "@zeabur-oss/design-system/tokens.css";

/* Follow the operating system: `dark:` by media query, the tokens by color-scheme. */
@custom-variant dark (@media (prefers-color-scheme: dark));
:root {
  color-scheme: light dark;
}

/* Geist, served from the app's own assets (copy vendor/geist/*.woff2 there). */
@font-face {
  font-family: "Geist";
  font-weight: 100 900;
  font-display: swap;
  src: url(/assets/Geist-Variable.woff2) format("woff2");
}
```

To switch by a class instead, as the React app does, leave out the two rules after the import,
write `@custom-variant dark (&:is(.dark *));` and put `class="dark"` on `<html>`.

The templates use the components' classes from `@zeabur-oss/design-system/variants/<name>`. These
modules hold the `cva` functions of the components and import no React, so a build script can
call them and write the classes into the templates:

```ts
import { buttonVariants } from "@zeabur-oss/design-system/variants/button"

buttonVariants({ variant: "default", size: "lg" })
```

Write `brand-logo h-5` for the logo and `type-label` for a section label.

## Contributing

The token families, the lint rules and the motion rules are in
[docs/tokens-and-rules.md](docs/tokens-and-rules.md). See also [CONTRIBUTING.md](CONTRIBUTING.md).

## Trademarks

The Zeabur name, logo and mark are trademarks of Zeabur Inc. They are **not** licensed under the
Apache License 2.0 that covers the rest of this repository: the files in `vendor/zeabur/`, the
`Logo` and `Mark` components and the `brand-logo` and `brand-mark` utilities are here so Zeabur's
own products can show them. Do not use them to name, brand or represent another product or
service, or in a way that suggests Zeabur endorses it. A fork for another product replaces them.

## Licence and credits

Apache-2.0 (see [LICENSE](LICENSE)), except the trademarks above. Contributions are accepted under
the [Developer Certificate of Origin](DCO); see [CONTRIBUTING.md](CONTRIBUTING.md).

Third-party content in this repository:

- [shadcn/ui](https://ui.shadcn.com) components (`src/components`) and base styles
  (`vendor/shadcn/shadcn.css`), MIT License.
- Geist and Geist Mono by Vercel with basement.studio (SIL Open Font License 1.1,
  `vendor/geist/LICENSE.txt`).
- Phosphor icons (MIT License), compiled into the app by unplugin-icons from `@iconify-json/ph`.
