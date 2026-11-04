---
default: minor
---

# `themeStore(key)` keeps the light, dark or system choice

Import it from `@zeabur-oss/design-system/theme`. It returns `followSystemTheme`, `setTheme`,
`cycleTheme` and the `useTheme` hook, and stores the choice in `localStorage` under the key you
pass. The `ThemeChoice` type is exported too.
