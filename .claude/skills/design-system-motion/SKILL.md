---
name: design-system-motion
description: Decide whether something in a Zeabur UI should animate, and how — popups, dialogs, sheets, tooltips, toasts, collapsibles, a changing status or number, loading — with the design system's tokens and motion utilities, reduced motion, and how to verify it. Use when adding or changing a transition or animation here or in an app that pins @zeabur/design-system.
---

# Motion in the design system

The README's "Motion" section has the table and the full rules; this is the short form.

## Animate, or not

Animate only to show where something came from or went: a popup from its trigger, a dialog over
the page, a sheet from its edge, a section opening, a value that changed after someone acted.

Do not animate: a route or sidebar change, a tab's panel, logs, terminals, editors, polled data,
charts, a page's first render, anything that changes while someone types, focus. No layout
animation except `collapse-motion`, `slide` and the sidebar's width. No delay before a close, no
overshoot, no new curve.

## Tokens

- Curve: `ease-emphasized` (`--ease-site`; `ease-popup` is the same curve).
- Durations: `duration-micro` 80, `duration-quick` 150, `duration-fast` 250, `duration-medium` 350. `--blur-swap` 2px.

## Per pattern (open, close in ms)

| Pattern                         | Use                                               | Timing        |
| ------------------------------- | ------------------------------------------------- | ------------- |
| Menu, popover, select, combobox | `popup-motion`                                    | 250, 150      |
| Tooltip                         | `tooltip-motion`, `TooltipProvider` delay 300     | 150, 80       |
| Dialog                          | `dialog-motion`, backdrop `overlay-motion`        | 250, 150      |
| Sheet, drawer, dock             | `sheet-motion-start` / `-end` / `-bottom`         | 350, 250      |
| Toast                           | `Toaster` as it is                                | 350, 150      |
| Collapsible, tabs indicator     | `CollapsibleContent` (`collapse-motion`), `slide` | 250, 250      |
| Disclosure chevron              | `CollapsibleTrigger variant="disclosure"`         | 250           |
| Status or label that changes    | `SwapText`                                        | 150, enter    |
| Number that changes             | `SwapText variant="number"`                       | 150, enter    |
| Loading                         | `Skeleton` (after 300ms; `delay="none"` at once)  | 150 fade      |
| Element Base UI does not mount  | `usePresence(open)` and spread its `props`        | its utility's |

Base UI components already carry these. Use the utility rather than writing `transition-*` and
`data-starting-style:` classes by hand.

## Reduced motion

Transitions keep opacity and colour (≤150ms); translate, scale, rotation, blur and size go.
Each motion utility has its reduced form built in; anything else that moves is `motion-safe:`.
`src/base.css` ends every animation after one frame, so loops stop. `zeabur/no-unguarded-motion`
fails on `transition-transform`, `transition-all`, `animate-spin` and the like without
`motion-safe:`.

## Verify

1. `nix develop -c bash -c 'bun run fmt:check && bun run lint && bun run typecheck && bun run test && bun run build-storybook'`
   (`src/components/motion.test.ts` checks each utility's reduced form and the base rule).
2. In Storybook (Foundations / Motion and the Overlays stories), read
   `el.getAnimations().map(a => [a.transitionProperty, a.effect.getTiming().duration])` right
   after opening and closing: the durations above, `cubic-bezier(0.22, 1, 0.36, 1)`.
3. Repeat with reduced motion (DevTools rendering, or Playwright's `reducedMotion: "reduce"`):
   only `opacity` at 150, collapsibles instant, the skeleton still.
4. Check the first render does not animate and the element is gone after its exit.
