#!/usr/bin/env bash
# Format, lint, types, fallow, shellcheck, actionlint and nixfmt. `fallow audit --base HEAD^` needs
# the parent commit (fetch-depth: 2).
set -euo pipefail
cd "$(dirname "$0")/../.."

# Bun comes from the nixpkgs that flake.lock pins; packageManager in package.json must name it.
want=$(sed -n 's/^ *"packageManager": *"bun@\([^"]*\)".*/\1/p' package.json)
have=$(bun --version)
if [[ "$want" != "$have" ]]; then
  echo "error: package.json wants bun@$want, the dev shell (flake.lock) has bun $have" >&2
  exit 1
fi

nixfmt --check flake.nix
shellcheck scripts/ci/*.sh
actionlint
bun ci
bun run fmt:check
bun run lint
bun run typecheck
bun run fallow dead-code
bun run fallow audit --base HEAD^
bun run fallow health --report-only --css
