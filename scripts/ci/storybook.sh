#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../.."

bun ci
bun run build-storybook
