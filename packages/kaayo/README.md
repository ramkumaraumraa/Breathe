# @aumraa/kaayo-ui

Breathe's component layer (`@aumraa/breathe-ui`), pre-themed for Kaayo —
tutor & class operations, neo-brutalist. Every component in
`@aumraa/breathe-ui`, re-exported, with Kaayo's colors/spacing/radius applied
automatically. No `ProductThemeContext` wrapper needed — this package is
fixed to one product.

```tsx
import "@aumraa/kaayo-ui/style.css"; // or rely on the auto side-effect import below
import { Button, Dialog, DialogContent } from "@aumraa/kaayo-ui";
```

Importing from the package already pulls in `style.css` as a side effect —
the explicit import above is only needed if your bundler doesn't handle
CSS-in-JS imports, or you want it in a `<link>` tag instead.

**No Tailwind setup required.** Unlike a typical internal component package,
this one ships a single pre-compiled `style.css` — real CSS, not Tailwind
utility class *names* waiting for your app's Tailwind build to resolve them.
Install, import, done.

Note: this ships Breathe's *base* components (`Button`, `Dialog`, …), not the
`KayoBrutalist*` custom components that live in the docs site's
`src/app/components/custom/kaayo/`. Those are demo-page prototypes, not part
of this package — pull them in separately if you need the exact brutalist
variants (double border, hard shadow, press-down animation) rather than the
base themed components.

**Web only.** These are DOM components — not importable into a React Native
app. See `@aumraa/lemniscate-ui`'s README for what that means in practice.

## Development

```bash
pnpm --filter @aumraa/kaayo-ui build
```

Regenerates `src/tokens.css` (from `tokens/dist/web/kaayo.css` — run
`pnpm tokens` at the repo root first if `tokens/src/kaayo.json` changed) and
recompiles `src/style.css` via the Tailwind CLI against
`src/theme-source.css`, which `@source`-scans `@aumraa/breathe-ui` for every
class actually used.

`src/theme-source.css` is hand-written and mirrors `src/styles/theme.css` +
`productMeta.kaayo.vars` in the root repo — update it if either of those
change.
