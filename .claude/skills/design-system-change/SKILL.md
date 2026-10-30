---
name: design-system-change
description: Change @zeabur/design-system — add or restyle a component, variant or token, adjust lint rules — and carry the change into the apps that pin it (zeabur/web, Zeabur Identity). Use for any change in this repository or when an app needs a treatment the design system lacks.
---

# Changing the design system

Rules are in `CONTRIBUTING.md` ("Components") and the README ("Tokens and rules"); read them first.
Comments, commit messages, tests, new props or variants, and components that render collections
follow `zeabur-oss-standards` with [`STANDARDS.md`](STANDARDS.md) here; commits and pull requests
follow `zeabur-oss-workflow`; packages follow `zeabur-oss-dependencies` (install:
`npx skills add zeabur-oss/skills --skill <name>`; `skills-lock.json` pins them).

## Decide where the change belongs

- An app repeating a className, an arbitrary value or a palette colour is asking for a **variant,
  size, prop or token here**. Do not add an escape hatch in the app.
- A missing primitive (an autocomplete, a command list) is a new component here, built on Base UI
  in shadcn's style. Apps may not import Base UI, Radix, Headless UI or Motion themselves.
- A colour, size or duration without a fitting token gets a new token in `src/tokens.css`, light and
  dark. Pick the token by what the thing _is_, not by how it looks.

## Make it

1. Component in `src/components/`, story in `stories/` with every variant, light and dark.
2. `nix develop -c bash -c 'bun run fmt:check && bun run lint && bun run typecheck && bun run test && bun run build-storybook'`,
   then `bun run fallow dead-code && bun run fallow audit --base main` (fallow at the version in
   `package.json`, config in `.fallowrc.json`). `dead-code` finds unused files, exports and
   dependencies, and a component that imports a story or a cover. `audit` is the CI gate: new
   dead code, complexity and duplication in the changed files. `bun run fallow health --css`
   reports the score, complex functions and CSS drift (hard-coded values beside tokens,
   duplicated blocks, complex selectors); it does not fail. A false positive gets an entry in
   `.fallowrc.json` with the reason.
   Lint (oxlint with `@shadcn/lint` and the local `zeabur/*` rules) rejects palette classes,
   arbitrary values, inline styles and restricted imports. A disable comment needs `-- reason`
   and should be rare; prefer fixing the rule or adding the token.
3. Look at it in Storybook in both themes, focus rings included. Check contrast of new edges and
   text against their surface.
4. Names are an interface (`src/compat.test.ts`): add, do not rename.

## Try it in the apps before opening a pull request

- **zeabur/web**: pack this repository's committed state and install the tarball:
  ```sh
  git archive HEAD | tar -x -C "$tmp" && (cd "$tmp" && bun pm pack --destination "$out")
  # in zeabur/web: point @zeabur/design-system at the tarball, then
  bun install
  ```
  Bun caches tarballs by name and version, so a repack with the same version is served stale:
  remove the cached `@zeabur/design-system` entry under `~/.bun/install/cache/` and the `sha512-…`
  integrity of that line in `web/bun.lock`, then install. Never commit `web/package.json` or
  `web/bun.lock` pointing at a local path.
- **Identity** depends on the package in `ui/package.json`, as web does. Its build generates the
  askama class macros from `src/variants/` (`ui/scripts/gen-classes.ts`): point it at the tarball,
  run `./scripts/build-ui.sh` and its UI checks, and commit the regenerated files there.
- After merging, each app moves its pin: `bun add 'github:zeabur-oss/design-system#<commit>'`.
