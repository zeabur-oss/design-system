#!/usr/bin/env bash
# Format, lint, types, fallow, shellcheck, jactionlint and nixfmt. `fallow audit --base HEAD^` needs
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

# A double cast tells the compiler to stop checking; narrow the type or use `satisfies` instead.
if grep -rnE --include='*.ts' --include='*.tsx' '\bas (unknown as|any|never)\b' src; then
  echo "error: remove 'as unknown as', 'as any' and 'as never' from src/" >&2
  exit 1
fi

nixfmt --check flake.nix
shellcheck scripts/ci/*.sh
jactionlint
bun ci
bun run fmt:check
bun run lint
bun run typecheck
bun run fallow dead-code
bun run fallow audit --base HEAD^
bun run fallow health --report-only --css
