# @aumraa/lemniscate-ui

Breathe's component layer (`@aumraa/breathe-ui`), pre-themed for Lemniscate —
Aumraa's community finance SaaS. Every component in `@aumraa/breathe-ui`,
re-exported, with Lemniscate's colors/spacing/radius/typography applied
automatically. No `ProductThemeContext` wrapper needed — this package is
fixed to one product.

```tsx
import { Button, Dialog, DialogContent } from "@aumraa/lemniscate-ui";
```

**Web only.** These are DOM components (`<div>`, `<dialog>`, `<button>`, …) —
they render in a browser, not inside a React Native app. If you're building
the Lemniscate mobile app, this package isn't importable there; instead
mirror the interaction model documented in the root repo's `README.md`
(native-element vs. hand-authored-ARIA split) with real RN primitives and
gestures.

## Setup

Requires Tailwind configured to scan `@aumraa/breathe-ui`'s source for class
names — see that package's README.

## Development

`src/tokens.css` is generated from `tokens/dist/web/lemniscate.css` (root
repo) — regenerate after editing `tokens/src/lemniscate.json` and running
`pnpm tokens` at the repo root:

```bash
pnpm --filter @aumraa/lemniscate-ui build
```

`src/theme.css` is hand-written and mirrors `productMeta.lemniscate.vars` in
the root repo's `ProductThemeContext.tsx` — update both if that mapping
changes.
