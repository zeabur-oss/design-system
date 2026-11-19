---
name: design-system-change
description: Change @zeabur-oss/design-system — add or restyle a component, variant or token, adjust lint rules — and carry the change into the apps that pin it (Zeabur, Zeabur Identity). Use for any change in this repository or when an app needs a treatment the design system lacks.
---

# Changing the design system

Rules are in `CONTRIBUTING.md` ("Components") and `docs/tokens-and-rules.md`; read them first.

## Decide where the change belongs

- An app repeating a className, an arbitrary value or a palette colour is asking for a **variant,
  size, prop or token here**. Do not add an escape hatch in the app.
- A missing primitive (an autocomplete, a command list) is a new component here, built on Base UI
  in shadcn's style. Apps may not import Base UI, Radix, Headless UI or Motion themselves.
- A colour, size or duration without a fitting token gets a new token in `src/tokens.css`, light and
  dark. Pick the token by what the thing _is_, not by how it looks.

## Make it

1. Component in `src/components/`, story in `stories/` with every variant, light and dark.
2. Run the CI jobs (`CONTRIBUTING.md`): `scripts/ci/check.sh`, `test.sh`, `storybook.sh`. On a
   branch, `bun run fallow audit --base main` shows what the change adds. A fallow false positive
   gets an entry in `.fallowrc.json` with the reason; a lint disable comment needs `-- reason`
   and should be rare; prefer fixing the rule or adding the token.
3. Look at it in Storybook in both themes, focus rings included. Check contrast of new edges and
   text against their surface.
4. Names are an interface (`src/compat.test.ts`): add, do not rename. Removing one is a
   deprecation, not a cleanup.
5. Tests: keep a browser test only for what a function test cannot see (rendering, focus,
   keyboard use).

## Collections and data

- A component that renders a collection works with a page or a virtualized window of rows, not
  every row in the DOM. Short fixed lists (a menu, a set of tabs) are fine.
- A component never fetches or starts a polling timer; the app owns data and its refresh.

## Try it in the apps before opening a pull request

- **Zeabur** (`web/` in zeabur-oss/zeabur): pack this repository's committed state and install the tarball:
  ```sh
  git archive HEAD | tar -x -C "$tmp" && (cd "$tmp" && bun pm pack --destination "$out")
  # in web/: point @zeabur-oss/design-system at the tarball, then
  bun install
  ```
  Bun caches tarballs by name and version, so a repack with the same version is served stale:
  remove the cached `@zeabur-oss/design-system` entry under `~/.bun/install/cache/` and the `sha512-…`
  integrity of that line in `web/bun.lock`, then install. Never commit `web/package.json` or
  `web/bun.lock` pointing at a local path.
- **Identity** depends on the package in `ui/package.json`, as web does. Its build generates the
  askama class macros from `src/variants/` (`ui/scripts/gen-classes.ts`): point it at the tarball,
  run `./scripts/build-ui.sh` and its UI checks, and commit the regenerated files there.
- After a release, each app moves its pin to the new npm version.
