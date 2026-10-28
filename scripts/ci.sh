#!/usr/bin/env bash
# One CI job, as .github/workflows/ci.yml runs it (through the shared workflow of zeabur-oss/.github)
# and as anyone runs it locally: the workflow only checks out and installs Nix, then calls this
# script. A job behaves the same on GitHub and on any Linux machine with Nix.
#
#   scripts/ci.sh <job>      # run one job; it enters the Nix dev shell itself
#   scripts/ci.sh --list     # the job names
#
# `check` runs `fallow audit --base HEAD^`, so it needs the parent commit (fetch-depth: 2).
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"

jobs=(check test storybook)

if [[ "${1:-}" == --list ]]; then
  printf '%s\n' "${jobs[@]}"
  exit 0
fi
job="${1:?usage: scripts/ci.sh <job> | --list}"
printf '%s\n' "${jobs[@]}" | grep -qx -- "$job" ||
  { echo "error: no job named $job (scripts/ci.sh --list)" >&2; exit 1; }

# The marker tells a re-run inside the dev shell apart from a call outside it.
if [[ -z "${ZEABUR_CI_SHELL:-}" ]]; then
  export ZEABUR_CI_SHELL=1
  exec nix develop "$root" --command "$0" "$@"
fi

# Bun comes from the nixpkgs that flake.lock pins; packageManager in package.json must name it.
check_bun_version() {
  local want have
  want=$(sed -n 's/^ *"packageManager": *"bun@\([^"]*\)".*/\1/p' package.json)
  have=$(bun --version)
  if [[ "$want" != "$have" ]]; then
    echo "error: package.json wants bun@$want, the dev shell (flake.lock) has bun $have" >&2
    return 1
  fi
}

case "$job" in
  check)
    check_bun_version
    nixfmt --check flake.nix
    shellcheck scripts/*.sh
    actionlint
    bun ci
    ./scripts/check-fonts.sh
    bun run fmt:check
    bun run lint
    bun run typecheck
    bun run fallow dead-code
    bun run fallow audit --base HEAD^
    bun run fallow health --report-only --css
    ;;
  test)
    bun ci
    bun run test
    ;;
  storybook)
    bun ci
    bun run build-storybook
    ;;
esac
