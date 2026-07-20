# @aumraa/kaayo-ui

Breathe's component layer (`@aumraa/breathe-ui`), pre-themed for Kaayo —
tutor & class operations, neo-brutalist. Every component in
`@aumraa/breathe-ui`, re-exported, with Kaayo's colors/spacing/radius applied
automatically. No `ProductThemeContext` wrapper needed — this package is
fixed to one product.

```tsx
import { Button, Dialog, DialogContent } from "@aumraa/kaayo-ui";
```

Note: this ships Breathe's *base* components (`Button`, `Dialog`, …), not the
`KayoBrutalist*` custom components that live in the docs site's
`src/app/components/custom/kaayo/`. Those are demo-page prototypes, not part
of this package — pull them in separately if you need the exact brutalist
variants (double border, hard shadow, press-down animation) rather than the
base themed components.

**Web only.** These are DOM components — not importable into a React Native
app. See `@aumraa/lemniscate-ui`'s README for what that means in practice.

## Setup

Requires Tailwind configured to scan `@aumraa/breathe-ui`'s source for class
names — see that package's README.

## Development

`src/tokens.css` is generated from `tokens/dist/web/kaayo.css` (root repo) —
regenerate after editing `tokens/src/kaayo.json` and running `pnpm tokens` at
the repo root:

```bash
pnpm --filter @aumraa/kaayo-ui build
```

`src/theme.css` is hand-written and mirrors `productMeta.kaayo.vars` in the
root repo's `ProductThemeContext.tsx` — update both if that mapping changes.
