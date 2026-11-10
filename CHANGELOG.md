# Changelog

All notable changes to this project are documented here. Versions follow [Semantic Versioning](https://semver.org/); each section comes from the change files in `.changeset/` (CONTRIBUTING.md, "Changelog and releases").

## 0.1.4 (2026-11-10)

### Features

#### `Banner` and `Alert` use one amber for `warn`, and `Alert` has no default role

`Banner` `warn` is now amber, the same as `Alert` `warn`. Red stays for failure. The `notice`
variant is removed from `Banner` and `Alert`; use `warn`.

`Alert` no longer sets `role="alert"`. Pass `role="status"` or `role="alert"` when the content
appears after the page loaded and must be announced.

## 0.1.3 (2026-11-04)

### Features

#### `themeStore(key)` keeps the light, dark or system choice

Import it from `@zeabur-oss/design-system/theme`. It returns `followSystemTheme`, `setTheme`,
`cycleTheme` and the `useTheme` hook, and stores the choice in `localStorage` under the key you
pass. The `ThemeChoice` type is exported too.

## 0.1.2 (2026-11-01)

### Features

- The package is published to npm as `@zeabur-oss/design-system`, from each version tag
- `Skeleton` takes `delay="none"` for a skeleton that shows at once. Such as one that replaces a page after the router has already waited.

### Fixes

- A popup whose trigger is swapped while it opens keeps focus inside it, past Base UI's focus guards

## 0.1.0 (2026-10-26)

First release: React components on Base UI and Tailwind CSS, with Zeabur's tokens and fonts.
