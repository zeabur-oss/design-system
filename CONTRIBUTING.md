# Contributing

## Developer Certificate of Origin

This project uses the [Developer Certificate of Origin 1.1](DCO), not a CLA. Sign off every
commit to certify that you wrote it or otherwise have the right to submit it under the
[Apache License 2.0](LICENSE):

```sh
git commit -s
```

CI rejects pull requests whose non-merge commits lack a `Signed-off-by` line matching the
author. Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/),
for example `feat: add a warn-strong token` or `fix: darken the fail colour in dark mode`.
Use your own name and email. When squashing, preserve other contributors' attribution;
do not add a sign-off on someone else's behalf. Check your branch against its base with:

```sh
git log --format='%h %an <%ae>%n%(trailers:key=Signed-off-by)' <base-rev>..HEAD
```

## Setup and checks

The development shell (`flake.nix`) has Bun and Node.js; run every command in it
(`nix develop`, or `nix develop -c <command>`). Packages are managed with Bun: exact versions, a
committed `bun.lock`, `minimumReleaseAge` of seven days and no install scripts (`bunfig.toml`). Bun
comes from the nixpkgs that `flake.lock` pins, and `packageManager` in `package.json` names the
same version. CI runs every job of `scripts/ci.sh`, which enters the development shell itself;
run one the same way locally:

```sh
./scripts/ci.sh --list     # check, test, storybook
./scripts/ci.sh check      # fonts, format, lint, types, fallow, shellcheck, actionlint, nixfmt
./scripts/ci.sh test
./scripts/ci.sh storybook  # bun run build-storybook
```

Work in Storybook (`bun run storybook`, http://localhost:6006); switch light and dark in its
toolbar.

## Components

Components are on Base UI, in shadcn/ui's style (`cva` variants, `cn`, `data-slot`). A treatment
an app repeats becomes a variant or size here, not a className in the app.

- **Classes**: a component's classes are `cva` functions in `src/variants/<name>.ts`, one for each
  part (`cardVariants`, `cardTitleVariants`). These modules import only `class-variance-authority`:
  server-rendered pages call them without React.

- **Imports**: siblings as `./<name>` (apps compile these sources with their own `@/` alias, so
  lint rejects `@/` imports); `cn` from `cn`; icons as `~icons/ph/<name>` (Phosphor, one import per
  icon), not `@phosphor-icons/react`.
- **Write a story** in `stories/` showing each variant and size, in light and dark. Stories follow
  the same lint as components.
- **Keep it app-free**: no app stores, routes, API calls, analytics or copy in a language. A
  component that needs app state or words takes them as props (the toaster's `theme`,
  `CopyInput`'s `copyLabel`).
- **Look**: Zeabur's dashboard. Text in `text-main`, `text-secondary` and `text-tertiary`; edges in
  `border-v2-border` (cards, menus), `border-input` (controls) or `border-main` (the sidebar,
  containers, tables); surfaces `bg-surface-page`, `bg-card`, `bg-surface-frame`,
  `bg-v2-surface-hover`. Controls are `h-control-xs` … `h-control-lg` (28 / 32 / 36 / 40px) and
  rounded 6 (`rounded-md`), navigation rows and banners rounded 8, cards rounded 12. Violet
  (`primary`, `brand`) is for actions, focus and the current place; orange-red (`danger`,
  `destructive`) for errors. Body text is `type-body`, section labels `type-label`. Motion uses
  the motion utilities, `ease-emphasized` and the four durations (README, "Motion").
- **Only tokens**: no arbitrary value, hex colour or palette class (`zGray-*`, `white`) in a
  component or story, and no inline style but custom properties. Use the token for what the thing
  is (README, "Tokens and rules"); when none fits, add one to `src/tokens.css` (light and dark, a
  Tailwind theme variable if it makes a class). The palettes appear only there. `bun run lint`
  checks all of this; a disable comment needs a reason after `--` and is rare.
- **Restyling**: a component does not take colour, spacing, shape or type from a className, its
  own included when it uses another (Drawer's DialogHeader): give it a variant or a prop
  (`variant="panel"`, `tone`, `endSlot`). Text sizes and named sizes go in the variant that owns
  them, since `cn` does not merge `type-*` or named sizes with Tailwind's.
- **Names are an interface**: apps written for engawa's design system use the same component,
  prop, variant, token and utility names (`src/compat.test.ts` lists them). Add; do not rename or
  remove without a major change that says so.
- Menus, popovers, tooltips and dialogs go through `src/components/popup.tsx`, which loads their
  Base UI code after the first page; do not import `@base-ui/react/{menu,popover,tooltip,dialog}`
  directly elsewhere.
- **Comments** say only what the code cannot: a non-obvious constraint, a browser or library quirk
  and its cause, a workaround. No design rationale, history, measurements or restated code; prefer
  a better name. A decision users need goes in the README, briefly.
- **Nothing private**: this repository is public. No internal URLs, keys, product data or code
  that is not design code.

## Changes reach apps by their pin

Every app pins this repository to a commit, so a change reaches an app only when that app moves
its pin. Before you open a pull request, try the change in the apps that use it (`bun pm pack`
here, then depend on the tarball, or `bun link`).

## Vendored files

`vendor/` holds files copied verbatim (see the README). After changing one, run
`./scripts/check-fonts.sh` and `bun run test`. When changing workflow or shell files, also run
`actionlint` and `shellcheck scripts/*.sh`.

## Trademarks

The Zeabur name and logo are not licensed under the Apache License (README, "Trademarks").
Contributions must not add other parties' trademarks or artwork.

## Review

Keep pull requests focused and describe the change, its reason, and the checks you actually
performed. Do not merge until CI passes.
