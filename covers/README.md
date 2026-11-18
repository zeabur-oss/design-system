# Covers

The image at the top of each open-source repository's README, also used as its social preview.

## Making one

A cover is a directory with:

| File                | Holds                                                                     |
| ------------------- | ------------------------------------------------------------------------- |
| `cover.ts`          | `product`, `headline`, `tagline`, `alt`, `sources` (`Cover` in render.ts) |
| `illustration.html` | The right-hand plate                                                      |
| `illustration.css`  | Optional; styles only this cover needs                                    |

```sh
nix develop -c bash -c 'bun install && cd covers && bun render.ts identity --out ../../identity/docs/images'
```

`--out` gets `cover-light.avif` and `cover-dark.avif`. `--previews` (default `.build/<cover>/`) gets
both themes at full size and at 830 px wide (GitHub's README width), and `social-preview.png`.
Look at all of them before committing. `nix develop` supplies Chromium.

Covers: `identity`, `zeabur`, `catalog`, `builder`, `design-system`.

## Rules

- **Canvas.** 1280 × 640 at 2×, AVIF, about 50 KiB each. Social preview: 1× PNG, dark.
- **Frame.** Hairlines 48 px in from each edge, crosses where they meet, hatched gutters. Text
  column on the left 640 px, plate on the right 544 px.
- **Lockup.** The wordmark, `vendor/zeabur/logo-with-text.svg`, 24 px high, never redrawn. A
  sub-product's word follows it in Geist 600, on the wordmark's baseline, its capitals as high as
  the wordmark's "b": "zeabur Identity".
- **Headline.** Geist 52/56, weight 500, at most three lines. A headline of two sentences may go down to 46/52 so that each sentence stays on one line. What the product replaces may stand
  above it in `<s>`. No eyebrow.
- **Tagline.** One sentence of facts, at most three lines. Commands and files in `<code>`.
- **Words.** By `zeabur/docs/wording.md`. Claim only what the repository does.
- **Plate.** Flat `--surface`. It shows real text from the product: a file, a config, the UI's own
  strings. Lines run off the right edge rather than wrap.
- **Screenshot.** A plate can be a screenshot of the product's demo at the plate's size, one for
  each theme. The product's screenshot manifest declares it: `zeabur/shot-<theme>.avif` comes from
  `docs/cover-shots.yaml` in a Zeabur checkout beside this one
  (`nix develop -c scripts/docs-shots.sh docs/cover-shots.yaml`). Never edit it.
- **Specimen.** Geist Mono 13/24, a file label above it, notes in the left margin. A violet bar
  (`.l.add`) marks what the product adds or relies on; a struck line with an orange-red bar
  (`.l.del`) marks what it replaces.
- **Quotes.** Put `data-quote` on quoted text and list its files in `sources`. The render fails
  if the text is not in them.
- **Colour.** Tokens only, so both themes come from one page. Orange-red only for the mark, an
  error or what is replaced.
- **Alt.** States the message: "Zeabur Identity: admin.conf crossed out; sign in to Kubernetes
  with a passkey". Not a description of the picture.

```html
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/images/cover-dark.avif" />
  <img alt="…" src="docs/images/cover-light.avif" />
</picture>
```

## What we avoid, and why

Each of these makes an image read as generated. `render.ts` refuses the ones it can detect.

| Avoid                                                | Why                                                                     |
| ---------------------------------------------------- | ----------------------------------------------------------------------- |
| Window chrome: three dots, title bars                | Stands for "software" without showing any. Called out by our own users. |
| Floating cards with soft shadows, rounded everything | The SaaS card kit [1][2][3]                                             |
| Gradient washes, violet glow, blur                   | The default purple gradient and reflexive glass [1][2][3]               |
| Icons as decoration                                  | Icon feature boxes [3]                                                  |
| Mono eyebrow above the headline, all-caps labels     | Template chrome [2][4]                                                  |
| Invented output, progress lines ending in "…"        | Shows a product that doesn't exist; quote the real one instead [4]      |
| Mock UI built from buttons, badges, toasts           | Generic parts instead of the subject [1][4]                             |
| Tilted or rotated props                              | Depth for its own sake                                                  |

1. Anthropic, [Improving frontend design through Skills](https://claude.com/blog/improving-frontend-design-through-skills)
2. Capital & Compute, [How to Fix AI Slop in Web Design, Tell by Tell](https://capitalandcompute.net/blog/fix-ai-slop-design/)
3. prg.sh, [Why Your AI Keeps Building the Same Purple Gradient Website](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website)
4. Anthropic, [frontend-design skill](https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md)
