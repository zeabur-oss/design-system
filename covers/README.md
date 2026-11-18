# Covers

The image at the top of each open-source repository's README, also used as its social preview.

## Making one

A cover is a directory with a `cover.ts`: `product`, `headline`, `alt`, `slab` and `sources`
(`Cover` in render.ts), each text in English, Traditional Chinese and Simplified Chinese. The slab
is built from the parts in `template/slab.ts`.

```sh
nix develop -c bash -c 'bun install && cd covers && bun render.ts identity --out ../../identity/docs/images'
```

`--out` gets `cover-light.avif` and `cover-dark.avif` in English, and `cover-zh-TW-<theme>.avif`
and `cover-zh-CN-<theme>.avif`. `--previews` (default `.build/<cover>/`) gets each of them at full
size and at 830 px wide (GitHub's README width), and `social-preview.png`. Look at all of them
before committing. `nix develop` supplies Chromium and the Chinese font.

`--repos` (default: the directory that holds this checkout) is where the files in `sources` are.
Keep those checkouts on `main`, or quotes of strings changed since will fail.

Covers: `zeabur`, `zeatend`, `catalog`, `builder`, `identity`, `design-system`.

## Rules

- **Canvas.** 1280 × 640 at 2×, AVIF, about 50 KiB each. Social preview: 1× PNG, English, dark.
- **Layout.** The wordmark top left, the headline under it, the violet slab top right, an 8 px
  rule across at 346 px, and the product's name under the rule, cut by the bottom edge. The name
  is what tells covers apart at thumbnail size.
- **Lockup.** The wordmark, `vendor/zeabur/logo-with-text.svg`, 24 px high, never redrawn.
- **Name.** Geist 900 at 340 px, tight. render.ts shrinks a name wider than the cover.
- **Headline.** What the product does for the reader, in everyday words: no CI, no YAML, no
  kubeconfig. Geist 800, 54/58; Chinese in Noto Sans CJK 900, 50/66, with `|` where a line may
  break. It must end above the rule; render.ts warns.
- **Words.** By `zeabur/docs/wording.md` and the `zeabur-writing` skill. Claim only what the
  repository does. No Enterprise, no SaaS.
- **Slab.** One flow from what the reader has to what they get, in the product's own controls
  and states: Zeabur's three ways to deploy end in "Running", Identity's sign-in page shows its
  sign-in buttons. No sentence on the slab.
- **Controls.** A control (`control()`) shows a label of the product's UI, quoted from its
  catalogue with `quote()`; render.ts refuses a control without one. Something that is not a
  control, such as "Linux server", is a `thing()`.
- **Logos.** Only of software the product runs or builds, from `vendor/simple-icons`, unchanged
  and in the owner's colour, on white. Read the owner's trademark policy first:
  `vendor/simple-icons/NOTICE`. Where only the name is allowed, show the name as text (`word()`).
- **Quotes.** `quote()` marks text as the product's and its file goes in `sources`. The render
  fails if the text is not in them. For a string with a placeholder, quote the template:
  `quote("Continue with GitHub", "Continue with %provider%")`.
- **Colour.** Tokens only, so both themes come from one page. Violet for the slab, green only for
  a running state.
- **Alt.** States the message, then what the slab shows: "Zeabur Identity: everyone signs in with
  their own account. No shared admin file. Sign in with a passkey, GitHub, Google or a password."

```html
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/images/cover-dark.avif" />
  <img alt="…" src="docs/images/cover-light.avif" />
</picture>
```

A README in Chinese uses `cover-zh-TW-<theme>.avif` or `cover-zh-CN-<theme>.avif` the same way.

## What we avoid, and why

Each of these makes an image read as generated. `render.ts` refuses the ones it can detect on the slab.

| Avoid                                                | Why                                                                     |
| ---------------------------------------------------- | ----------------------------------------------------------------------- |
| Window chrome: three dots, title bars                | Stands for "software" without showing any. Called out by our own users. |
| Floating cards with soft shadows, rounded everything | The SaaS card kit [1][2][3]                                             |
| Gradient washes, violet glow, blur                   | The default purple gradient and reflexive glass [1][2][3]               |
| Icons as decoration; logos of software we don't run  | Icon feature boxes [3]                                                  |
| Mono eyebrow above the headline, all-caps labels     | Template chrome [2][4]                                                  |
| Invented output, progress lines ending in "…"        | Shows a product that doesn't exist; quote the real one instead [4]      |
| Mock UI with made-up labels, badges, toasts          | Generic parts instead of the subject [1][4]                             |
| Tilted or rotated props                              | Depth for its own sake                                                  |

1. Anthropic, [Improving frontend design through Skills](https://claude.com/blog/improving-frontend-design-through-skills)
2. Capital & Compute, [How to Fix AI Slop in Web Design, Tell by Tell](https://capitalandcompute.net/blog/fix-ai-slop-design/)
3. prg.sh, [Why Your AI Keeps Building the Same Purple Gradient Website](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website)
4. Anthropic, [frontend-design skill](https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md)
