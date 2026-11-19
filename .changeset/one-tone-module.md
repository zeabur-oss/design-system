---
default: minor
---

# One tone module; `Banner` is gone, and synonym variants are removed

The status tones are one module, `variants/tone.ts`, shared by `Alert`, `Badge`, `Stat`,
`SummaryCard`, `TimelineItem` and `Meter`. Every look has one name now.

Rename these in your app:

| Before                                                                 | After                                                      |
| ---------------------------------------------------------------------- | ---------------------------------------------------------- |
| `Banner`, `BannerTitle`, `BannerDescription`, `bannerVariants`         | `Alert`, `AlertTitle`, `AlertDescription`, `alertVariants` |
| `<Banner>` (default)                                                   | `<Alert variant="info">`                                   |
| `<Banner variant="tips">`                                              | `<Alert>`                                                  |
| `<Banner variant="warn">`                                              | `<Alert variant="warn">`                                   |
| `<Button variant="primary">`, `buttonVariants({ variant: "primary" })` | `variant="default"`                                        |
| `<Badge variant="destructive">`                                        | `<Badge variant="fail">`                                   |
| `<TimelineItem tone="neutral">`                                        | `<TimelineItem tone="idle">` (the default)                 |

`Banner` drew its icon at the left edge; `Alert` puts it in a grid column, a few pixels
different. `Alert` gives its icon the text colour in the neutral variant, where `Banner` `tips`
used the secondary colour.
