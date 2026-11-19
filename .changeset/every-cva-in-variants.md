---
default: minor
---

# Every `cva` is in `variants/`

`@zeabur-oss/design-system/variants/<name>` now has the classes of `Avatar`, `Collapsible`,
`Empty`, `PageColumn`, `Popover`, `SectionHeader`, `Select`, `Sidebar`, `Skeleton`, `Table`, `Tabs`,
`Textarea`, `Timeline` and `Toggle` as well, so a server-rendered page can call them without React.
The components still export the same names.
