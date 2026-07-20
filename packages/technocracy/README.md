# @aumraa/technocracy-ui

Breathe's component layer (`@aumraa/breathe-ui`), pre-themed for Technocracy —
the admin dashboard shared across products (dark surfaces). Every component
in `@aumraa/breathe-ui`, re-exported, with Technocracy's
colors/spacing/radius/typography applied automatically. No
`ProductThemeContext` wrapper needed — this package is fixed to one product.

```tsx
import "@aumraa/technocracy-ui/style.css"; // or rely on the auto side-effect import below
import { Button, Dialog, DialogContent } from "@aumraa/technocracy-ui";
```

Importing from the package already pulls in `style.css` as a side effect —
the explicit import above is only needed if your bundler doesn't handle
CSS-in-JS imports, or you want it in a `<link>` tag instead.

**No Tailwind setup required.** Unlike a typical internal component package,
this one ships a single pre-compiled `style.css` — real CSS, not Tailwind
utility class *names* waiting for your app's Tailwind build to resolve them.
Install, import, done.

**Web only.** These are DOM components (`<div>`, `<dialog>`, `<button>`, …) —
not importable into a React Native app.

## Development

```bash
pnpm --filter @aumraa/technocracy-ui build
```

Regenerates `src/tokens.css` (from `tokens/dist/web/technocracy.css` — run
`pnpm tokens` at the repo root first if `tokens/src/technocracy.json`
changed) and recompiles `src/style.css` via the Tailwind CLI against
`src/theme-source.css`, which `@source`-scans `@aumraa/breathe-ui` for every
class actually used.

`src/theme-source.css` is hand-written and mirrors `src/styles/theme.css` +
`productMeta.technocracy.vars` in the root repo — update it if either of
those change.
