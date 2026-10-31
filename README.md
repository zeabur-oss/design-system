<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/images/cover-dark.avif">
  <img alt="Zeabur Design System: build pages that look like Zeabur, light and dark; a status colour defined once for both themes and used by name in a component" src="docs/images/cover-light.avif">
</picture>

# Zeabur design system

Zeabur's components and styles for React, [Base UI](https://base-ui.com) and
[Tailwind CSS v4](https://tailwindcss.com).

- **Tokens**: Zeabur's palettes (`zGray`, `zViolet`, `zOrangered`, as RGB triplets and as Tailwind
  colours), its semantic tokens (`text-main`, `text-secondary`, `text-tertiary`, `border-main`,
  `bg-surface-page`, `bg-surface-frame`, `*-v2-border`, `*-v2-separator`, `*-v2-surface-hover`,
  `*-v2-surface-active`, `success`, `error` …), status colours (`ok`, `progress`, `warn`, `fail`,
  `idle`, each with `-soft` and `-strong`), usage and chart colours, and
  [shadcn/ui](https://ui.shadcn.com)'s theme variables mapped onto them (`bg-background`,
  `text-muted-foreground`, `bg-primary` …), light and dark.
- **Type roles**: `type-title` (24px, 600), `type-name` (20px, 500), `type-heading` (16px, 600),
  `type-body` (13px), `type-meta` (12px), `type-label` (11px uppercase section labels),
  `type-micro`, `type-nano`, `type-kbd`, `type-figure`, `type-mono`, on the `--text-<role>` scale.
- **Components**: one module each, on Base UI, styled with `cva` and `cn`: ActionTile, Alert, Avatar, Badge,
  Banner, Brand (`Logo`, `Mark`), Button, Card (with `CardRow`, `SectionLabel`), Chart, Checkbox,
  Collapsible, Combobox, Container, CopyInput, Dialog (`position="top"` keeps a command palette still while its list changes), Drawer, Empty (an `inline` size for one line in a section's place), Field, Frame (`AppFrame`,
  `FrameSidebar`, `FramePanel`, `PanelHeader`), IconBox, Illustration, Input, Kbd (`Kbd`, `KbdGroup`,
  `shortcutKeys`), Label, Menu, Meter,
  PageColumn (the column every block of a page sits in, so their edges line up; `width` content, wide or full, `gap` sm 12 to xl 40 between blocks; vertical space around it is margin), PageHeader (its actions wrap within the column on a narrow screen), PageTransition (`usePageTransition`, `pageViewTransition`), Popover, Presence (`usePresence`, an exit transition for an element Base UI does not own), Radio, SectionHeader (a section's title, count, one-line description and action), SegmentedBar, Select, Separator, Sidebar (with the drawer's
  `SidebarMenu` tree, `SidebarSearch`, the `SidebarPicker` trigger and `SidebarCopyPill`), Skeleton,
  Sonner (`Toaster`), Spinner (`LoadingDots`), Stat, SummaryCard (a status, its facts and actions),
  SwapText (a value that fades in when it changes), Switch, Table, Tabs, Term (a plain name with the technical name it stands for, `TermDetail`), Textarea, Toggle,
  ToggleGroup, Tooltip. Menus, popovers, tooltips and dialogs load their Base UI code after the
  first page (`src/components/popup.tsx`).
- **Utilities**: Zeabur's button surfaces (`button-primary`, `button-secondary`,
  `button-destructive` for the final confirm, `button-secondary-destructive` for a destructive
  action on each row of a list), the raised navigation row (`nav-active`,
  `nav-accent-bar`), the frosted surface (`surface-glass`), loading dots (`dot-wave`), motion
  (`popup-motion`, `dialog-motion`, `collapse-motion`, `swap-in` and the rest under
  [Motion](#motion)), `bg-dots`,
  `bg-hatch`, `hairline-ring`, `scrollbar-none`, `brand-logo` and `brand-mark`.
- **Fonts**: Geist and Geist Mono, self-hosted (SIL Open Font License).

Preview everything in Storybook (light and dark in its toolbar):

```sh
nix develop          # bun and Node.js, from flake.nix
bun ci
bun run storybook    # http://localhost:6006
```

## Tokens and rules

Every size, colour, shadow, motion and layer in a component is a token in `src/tokens.css` (light
and dark), and `bun run lint` enforces it. When a design needs something new, add a token (or a
variant) first.

### Token families

| Family              | Tokens and classes                                                                                                                                                                                                                                                                                                                                                         | Use for                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Type scale          | `--text-<role>` with `--text-<role>--line-height` (and `--font-weight`, `--letter-spacing`) for `title` 24/32 600, `name` 20/28 500, `heading` 16/24 600, `body` 13/20, `meta` 12/16, `label` 11/16 500 uppercase, `micro` 11/16, `nano` 10/14, `kbd` 10/15 500, `figure` 20/28 500, `mono` 12; written as `type-<role>`                                                   | Every text size that is not Tailwind's `text-xs`/`text-sm`/`text-base` (controls and table text). `body` is 13px body text and navigation rows; `nano` a badge or a count; `kbd` a key cap. Write `type-*`, not `text-<role>`: `cn` takes an unknown `text-<role>` for a colour and drops it beside `text-main`. `cn` does not merge a `type-*` with `text-xs` either, so a component sets each size's text in its size variant. The older `--type-<role>` variables remain as aliases |
| Text                | `text-main`, `text-secondary`, `text-tertiary`, `text-inverse`, `text-on-primary`, `text-nav-current`, `text-info-strong`, `text-brand`                                                                                                                                                                                                                                    | What is read first; descriptions and idle navigation; hints, placeholders, section labels; on an inverted surface; on the violet; the current navigation row's label; a violet note's words; violet marks and links                                                                                                                                                                                                                                                                    |
| Surfaces            | `bg-surface-page`, `bg-card`/`bg-surface`, `bg-surface-frame`, `bg-chrome`, `bg-surface-raised`, `bg-segmented-track`, `bg-v2-surface-hover`, `bg-v2-surface-active`, `bg-muted`, `bg-sidebar-search`, `bg-table-head`, `bg-table-row-hover`, `bg-glass-hover`, `bg-glass-selected`, `bg-toast-action`, `bg-overlay`, `surface-glass`                                      | The page; what sits on it; a Container's frame; the sidebar; the white pill raised over a track; the track; hover and selected rows; a quiet fill (the copy pill); the drawer's search row; a table's heading band and hovered row; rows of the frosted list; toast buttons; what dims the page under a dialog; tooltips and dropdowns                                                                                                                                                 |
| Borders             | `border-v2-border`, `border-main`, `border-input`, `border-segmented-border`, `border-border-strong`, `border-border-popover`, `border-rule`                                                                                                                                                                                                                               | Cards, menus, dividers; the firmer edge (sidebar, containers, tables); a control's edge (fields, checkboxes, radios: 3:1 against the page); a segmented track's edge; hover edges; what floats; lines between rows                                                                                                                                                                                                                                                                     |
| Brand and actions   | `primary`, `primary-hover`, `on-primary`, `--primary-from`/`--primary-to` (and `-hover-`), `--secondary-*`, `--destructive-*`, `--button-edge`, `--button-outline`; `button-primary`, `button-secondary`, `button-destructive`, `button-secondary-destructive`                                                                                                             | Violet for actions, checked controls, focus and the current place; the button surfaces (a page without React writes the utilities)                                                                                                                                                                                                                                                                                                                                                     |
| Danger and status   | `destructive`, `danger`, `danger-hover`, `error`, `success`; `ok`, `progress`, `warn`, `fail`, `idle`, each with `-soft` and `-strong`; `usage-normal`, `usage-warning`, `usage-severe`, `usage-reserved`; `chart-1` … `chart-5`                                                                                                                                           | Orange-red for errors (`danger` is full strength in both themes, `destructive` lifts on dark); a status as a dot, a pill fill and its text; usage bars; chart series                                                                                                                                                                                                                                                                                                                   |
| Navigation          | `rail`, `nav-current`, `--nav-pill-*`, `nav-active`, `nav-active-sub`, `nav-accent-bar`                                                                                                                                                                                                                                                                                    | A folding menu's tree rail; the current row's pill (with side shadows at the top level, without under a parent) and the 3px violet bar of the current child                                                                                                                                                                                                                                                                                                                            |
| Tracks and pictures | `track`, `hatch-line`, `avatar`, `--tile-<tone>-from`/`-to`, `logo-violet`, `logo-orangered`, `mark-orangered`                                                                                                                                                                                                                                                             | A bar's empty part, a skeleton, an unlit dot; an unbounded track's hatching; an avatar without a picture; IconBox and Empty's icon tile; the logo's own colours                                                                                                                                                                                                                                                                                                                        |
| Switch              | `switch-track`, `switch-track-border`, `switch-on-from`/`-to`/`-border`, `switch-thumb-from`/`-to`/`-border`, `shadow-switch-track`, `shadow-switch-thumb`                                                                                                                                                                                                                 | The tactile switch only                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Radius              | `rounded-xs` 2px, `rounded`/`rounded-sm` 4px, `rounded-md` 6px, `rounded-lg` 8px, `rounded-xl` 12px                                                                                                                                                                                                                                                                        | A chart swatch; checkboxes, chips, key caps; buttons, fields, menus; navigation rows, banners, containers; cards                                                                                                                                                                                                                                                                                                                                                                       |
| Shadows             | `shadow-xs`/`sm` (raised), `shadow-md`/`lg` (float), `shadow-xl`/`2xl` (dialog), `shadow-segmented`, `shadow-tile`, `shadow-icon-box`, `drop-shadow-tile-icon`, `--shadow-glass`                                                                                                                                                                                           | What sits on the page, floats, or is modal; the chosen segmented pill; the icon tile's glow; its icon's haze; the frosted surface                                                                                                                                                                                                                                                                                                                                                      |
| Motion              | `ease-emphasized` (cubic-bezier(0.22, 1, 0.36, 1), also `ease-popup`); `duration-micro` 80, `-quick` 150, `-fast` 250, `-medium` 350; `blur-swap`; `transition-field`, `-input`, `-visibility`; the motion utilities and `animate-skeleton`, `animate-skeleton-now`, `animate-dot-wave`                                                                                    | Everything that moves, at one of the four durations. The [Motion](#motion) section says which pattern takes which                                                                                                                                                                                                                                                                                                                                                                      |
| Layers              | `z-raised` 10, `z-popup` 50, `z-tooltip` 60                                                                                                                                                                                                                                                                                                                                | Raised inside a control (a tab's label, the tree's bar); menus, popovers, selects, dialogs; tooltips over them                                                                                                                                                                                                                                                                                                                                                                         |
| Sizes               | `h-control-xs` 28, `-sm` 32, `-md` 36, `-lg` 40 (`size-`, `min-w-` too); `w-sidebar` 224; `max-w-page-content` 64rem and `max-w-page-wide` 76rem (`PageColumn`, its padding included); `w-sheet`; `w-dialog`; `max-h-dialog`; `max-h-listbox`; `pl-tree-indent`; `p-illustration-inset`; `aspect-logo`; `grid-cols-icon`, `-action`, `-stats`, `-tree`, `grid-rows-header` | Control heights; the drawer; the phone's navigation sheet; a centred dialog; a combobox list; a tree child; layouts the spacing scale cannot express. `cn` does not know these names, so a component sets each in one variant only, never in a base that a variant or a className changes                                                                                                                                                                                              |
| Utilities           | `card-padding`, `toggle-gap`, `segmented-cells`, `mask-fade-down`, `scroll-fade-x`, `indicator-dashed`, `hairline-ring`, `bg-dots`, `bg-hatch`, `scrollbar-none`, `brand-logo`, `brand-mark`, `sidebar-icon-bar`, `dot-wave`; the `tabs-vertical:` variant                                                                                                                 | Treatments with more than one declaration or a value a component computes (`--cell`, `--gap`)                                                                                                                                                                                                                                                                                                                                                                                          |

The palettes (`zGray-*`, `zViolet-*`, `zOrangered-*`, as RGB triplets and Tailwind colours) and
Tailwind's `white` and `black` are what the tokens are made of. They stay available to apps, but
only `src/tokens.css` names them.

### What the lint forbids

`bun run lint` (Oxlint, `.oxlintrc.json`) fails on any of these:

- **`shadcn/no-restyle`** ([@shadcn/lint](https://github.com/shadcn-ui/lint)): a className on a
  component may change its layout only (margin, position, flex and grid placement); its colour,
  spacing, shape and type are its variants' and sizes'. Contracts allow `RadioGroup` a gap and
  `TableCell` a colour and `type-mono`. A treatment a page needs becomes a variant here.
- **`shadcn/no-raw-colors`**: no Tailwind palette colour (`bg-red-500`) and no colour the theme
  does not declare.
- **`zeabur/no-palette-classes`** (`lint/zeabur.js`): no palette colour of Zeabur's either
  (`bg-zGray-800`, `text-zViolet-700`, `text-white`): name what it is for with a semantic token.
- **`zeabur/no-unguarded-motion`**: no `transition-transform`, `transition-all`, `animate-spin` or
  another class that moves or resizes without `motion-safe:` (or `motion-reduce:`); the motion
  utilities carry their own reduced form.
- **`shadcn/no-arbitrary-values`**: no `text-[0.8125rem]`, `z-[60]`, `ease-[…]`, `w-[min(…)]`.
  Use a token, or add one.
- **`shadcn/no-inline-styles`**: no `style` but custom properties carrying a computed value
  (`--value`, `--cell`, `--dot-delay`) that a class reads; no `<style>` element (a strict Content
  Security Policy refuses it).
- **`shadcn/no-unknown-classes`**: no class Tailwind cannot generate (it reads the theme through
  `.storybook/preview.css`, set as `tailwind.css` in `components.json`).
- **`shadcn/require-static-classes`**: a component's className must be readable: string literals,
  conditions and `cn()` of them, or the `className` prop passed on.
- **`no-restricted-imports`**: `@base-ui/react/<part>`, never the root barrel (an app would bundle
  every part); no Radix, Headless UI or Motion (the components are on Base UI, motion is CSS); no
  `@/` imports (apps compile these sources with their own alias).
- **Oxlint's correctness rules**, with the React and jsx-a11y plugins, as errors (except
  `jsx-a11y/prefer-tag-over-role`, which asks for `<img>` on a span that draws an inline SVG, and
  `label-has-associated-control` on `Label`, which gets its control from its caller); a disable
  comment that disables nothing fails too.

Apps run the same rules on their code (the Zeabur app's `.oxlintrc.json` uses this setup with
`componentImports: ["^@zeabur-oss/design-system/components/"]`). The package exports the `zeabur/*`
rules as `@zeabur-oss/design-system/lint`, for an app's `jsPlugins`.

### Motion

Motion says where something came from or went. One curve, `ease-emphasized`, and four durations:

| Pattern                                           | Class                                                                                                                                                                                   | Open, close         |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| Menu, popover, select, combobox                   | `popup-motion` (fades, grows from 0.97 at its anchor)                                                                                                                                   | 250, 150            |
| Tooltip, after a 300ms delay; the next is instant | `tooltip-motion`                                                                                                                                                                        | 150, 80             |
| Dialog                                            | `dialog-motion` and the backdrop's `overlay-motion`                                                                                                                                     | 250, 150            |
| Sheet, drawer, the dock                           | `sheet-motion-start`, `sheet-motion-end`, `sheet-motion-bottom`                                                                                                                         | 350, 250            |
| Toast                                             | Sonner, retimed in `Toaster`                                                                                                                                                            | 350, 150            |
| Collapsible, the tabs indicator, the sidebar      | `collapse-motion`, `slide`                                                                                                                                                              | 250 both ways       |
| A status or label that changes                    | `SwapText` (`swap-in`: rises 4px out of a 2px blur)                                                                                                                                     | 150, on change only |
| A number that changes                             | `SwapText variant="number"` (`reveal-in`, fades)                                                                                                                                        | 150, on change only |
| A switch's thumb, a chevron                       | `motion-safe:transition-transform duration-quick` or `duration-fast`                                                                                                                    | 150, 250            |
| Loading                                           | `Skeleton`: shows after 300ms, so a quick load never flashes it; `delay="none"` when something has already waited                                                                       |                     |
| Another page (a service, a project)               | `page-transition` on the main panel, the router's `pageViewTransition` (`usePageTransition` where the browser has no typed view transitions): the old page fades, the new one rises 4px | 150, 250            |
| A tab's panel                                     | `TabsContent` (`reveal-in`, fades)                                                                                                                                                      | 150, on change only |

Only the main panel moves between pages: the sidebar, the header bar, a change of tab or filter in
the address, and the first page loaded stay still. Do not animate logs, terminals, editors, polled
data or charts, anything that changes while someone types, or focus. Animate
layout (height, width) only in `collapse-motion`, `slide` and the sidebar. No delay before a close
and no overshoot.

With `prefers-reduced-motion: reduce`, transitions keep opacity and colour (up to 150ms) and drop
translate, scale, rotation, blur and size; `src/base.css` ends every animation after one frame.
Each motion utility carries its reduced form; anything else that moves is written
`motion-safe:` (the lint checks). An element Base UI does not mount takes `usePresence`, which
sets the same `data-starting-style` / `data-ending-style` and keeps it mounted until its exit
ends.

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
  Icons({ scale: 1, compiler: "jsx", jsx: "react" }),
],
// The pre-bundler runs no plugins, so it could not resolve `~icons/…`. What the design system
// imports is not pre-bundled either then, and Base UI reaches CommonJS: list it in `include`.
optimizeDeps: {
  exclude: ["@zeabur-oss/design-system"],
  include: ["@base-ui/react/select", "@base-ui/react/menu", "cn", "class-variance-authority" /* … */],
},
```

with `"types": ["unplugin-icons/types/react"]` in its `tsconfig`, and `unplugin-icons`,
`@iconify-json/ph`, `@svgr/core` and `@svgr/plugin-jsx` among its dev dependencies.

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

### Coming from engawa's design system

The components, their props and variants, the tokens and the utilities of `@engawahq/design-system`
are all here under the same names, so an app moves by changing its import prefix
(`@engawahq/design-system` → `@zeabur-oss/design-system`) and its dependency. What it looks like
changes to Zeabur's. Not carried over: `Mosaic` and `Tile` (`Illustration` keeps its states and
ignores `seed`), and Tabs' `line` variant and `TabsMore`.

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

buttonVariants({ variant: "primary", size: "lg" })
```

Write `brand-logo h-5` for the logo and `type-label` for a section label.

## What it provides

| Path                       | Contents                                                                                                                                        |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `index.css`                | The whole stylesheet for a React app: shadcn/ui's base styles, fonts, then `tokens.css`; `dark:` by `.dark`                                     |
| `tokens.css`               | `src/tokens.css`, `src/utilities.css` and `src/base.css`, for any Tailwind CSS v4 build                                                         |
| `fonts.css`                | `@font-face` for Geist and Geist Mono (`vendor/geist`)                                                                                          |
| `src/tokens.css`           | Palettes, semantic and component tokens, status, the shadcn/ui mapping, type scale, motion, shadows, layers, named sizes and the Tailwind theme |
| `src/utilities.css`        | Type roles, button surfaces, navigation rows, motion, patterns, brand masks                                                                     |
| `src/base.css`             | The page's ground and text, focus rings, selection, scrollbars, reduced motion                                                                  |
| `src/components/`          | The components (`@zeabur-oss/design-system/components/<name>`)                                                                                  |
| `src/variants/`            | The components' classes as `cva` functions, without React (`@zeabur-oss/design-system/variants/<name>`)                                         |
| `vendor/shadcn/shadcn.css` | shadcn/ui's base styles (keyframes, `data-*` variants)                                                                                          |
| `vendor/geist/`            | Geist and Geist Mono, their licence                                                                                                             |
| `vendor/zeabur/`           | The Zeabur logo and mark (see "Trademarks")                                                                                                     |
| `stories/`                 | Storybook stories: each component, and the tokens (Foundations)                                                                                 |

## Vendored files

Files in `vendor/` are copied verbatim and change only as a whole:

- `vendor/geist`: from the `geist` npm package at the version in `vendor/geist/VENDORED` (also a dev
  dependency). Check with `./scripts/check-fonts.sh` after `bun ci`.
- `vendor/shadcn`: shadcn/ui's `shadcn/tailwind.css`, release in `vendor/shadcn/VENDORED`.
- `vendor/zeabur`: the logo and mark from Zeabur's dashboard and zeabur.com; `src/brand.test.ts`
  checks that the components and the masks draw them unchanged.

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
- The package's shape, the popup loader (`src/components/popup.tsx`) and several components'
  structure come from [engawa's design system](https://github.com/engawahq/design-system)
  (Apache-2.0).
- Geist and Geist Mono by Vercel with basement.studio (SIL Open Font License 1.1,
  `vendor/geist/LICENSE.txt`).
- Phosphor icons (MIT License), compiled into the app by unplugin-icons from `@iconify-json/ph`.
