# Changelog

All notable changes to this project are documented here. Versions follow
[Semantic Versioning](https://semver.org/).

## [0.1.1]

The first version under the release process shared by all zeabur-oss repositories, which restart
at 0.1.1. It supersedes 0.1.0, whose GitHub Release stays published but is not maintained.

### Changed

- CI runs on the shared workflows of [zeabur-oss/.github](https://github.com/zeabur-oss/.github):
  `scripts/ci.sh` holds the jobs (`check`, `test`, `storybook`) and runs each in the Nix
  development shell, which pins Bun.
- Renovate extends the shared preset `github>zeabur-oss/.github`.

### Removed

- `scripts/check-dco.sh`: the shared DCO workflow checks sign-offs.

## [0.1.0]

First release: React components on Base UI and Tailwind CSS, with Zeabur's tokens and fonts.

[0.1.1]: https://github.com/zeabur-oss/design-system/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/zeabur-oss/design-system/releases/tag/v0.1.0
