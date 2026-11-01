# Changelog

All notable changes to this project are documented here. Versions follow [Semantic Versioning](https://semver.org/); each section comes from the change files in `.changeset/` (CONTRIBUTING.md, "Changelog and releases").

## 0.1.2 (2026-11-01)

### Features

- The package is published to npm as `@zeabur-oss/design-system`, from each version tag
- `Skeleton` takes `delay="none"` for a skeleton that shows at once. Such as one that replaces a page after the router has already waited.

### Fixes

- A popup whose trigger is swapped while it opens keeps focus inside it, past Base UI's focus guards

## 0.1.0 (2026-10-26)

First release: React components on Base UI and Tailwind CSS, with Zeabur's tokens and fonts.
