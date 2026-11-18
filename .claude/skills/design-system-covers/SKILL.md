---
name: design-system-covers
description: Make or revise a README cover / social preview for a Zeabur open-source repository with the covers/ system (render.ts). Use when a repository needs a cover, when its product wording changes the quoted lines on an existing cover, or when reviewing an illustration for generic "AI-made" look.
---

# Covers

`covers/README.md` has the canvas, layout, lockup and rules; read it first.

1. **Draw one flow on the slab**: what the reader has, to what they get, in the product's own
   controls and states (Zeabur's ways to deploy ending in "Running", Identity's sign-in buttons).
   Every control's label is a `quote()` of the product's catalogue, and every quote must exist
   in the files named in `sources`; render.ts checks both, so a wording change in the product can
   fail a cover.
2. **Copy** follows the `zeabur-writing` skill: a headline that says what the product does for
   the reader in everyday words, in English, zh-TW and zh-CN, and alt text that states it and
   what the slab shows.
3. **Logos** only of software the product runs or builds, and only after reading the owner's
   trademark policy; record it in `vendor/simple-icons/NOTICE`.
4. **Render** inside `nix develop` (`bun render.ts <name> --out <repo>/docs/images`) and look at
   every language and theme at full size and at 830 px, plus `social-preview.png`.
5. **Refuse the generic look.** render.ts rejects window chrome, three dots, mock UI kits, "…"
   and icons on the slab. Beyond the checks: no glow, no gradient, no invented terminal session,
   no stock dashboard. Zeabur's own character is the large name, the violet slab, Geist, and the
   product's real text.
6. Commit the AVIFs in the product repository; the social preview is uploaded in the
   repository's GitHub settings by a maintainer.
