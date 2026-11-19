---
default: patch
---

# Touch targets are at least 24 px, and focus shows on every button

`Checkbox` and `Radio` have a 24 by 24 px hit area, the dock tab close button, the dock resize
handle and the sidebar copy button grow to 24 px, and the chart tooltip and legend rows key by
data key instead of position.

Buttons and triggers no longer carry a dead `outline-none` class, so the focus ring of
`base.css` is the one cue. Fields, menus, listboxes and popups keep theirs.
