# Changelog

All notable changes to this project are documented here. Versions follow
[Semantic Versioning](https://semver.org/).

## 0.1.1

The first version under the release process shared by all zeabur-oss repositories, which restart
at 0.1.1. It supersedes 0.1.0, whose GitHub Release stays published but is not maintained.

### Added

- The package is published to npm as `@zeabur-oss/design-system`, from each version tag.
- `Skeleton` takes `delay="none"` for a skeleton that shows at once, such as one that replaces a
  page after the router has already waited.

### Changed

- CI runs on the shared workflows of [zeabur-oss/.github](https://github.com/zeabur-oss/.github):
  `scripts/ci.sh` holds the jobs (`check`, `test`, `storybook`) and runs each in the Nix
  development shell, which pins Bun.
- Renovate extends the shared preset `github>zeabur-oss/.github`.

### Fixed

- A popup whose trigger is swapped while it opens keeps focus inside it, past Base UI's focus
  guards.

### Removed

- `scripts/check-dco.sh`: the shared DCO workflow checks sign-offs.

## 0.1.0

First release: React components on Base UI and Tailwind CSS, with Zeabur's tokens and fonts.
