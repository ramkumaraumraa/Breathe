# @aumraa/breathe-ui

Breathe's web component layer, packaged. No Radix UI, no shadcn, no MUI, no
cmdk, no vaul — every component owns its markup, styling, ARIA, and keyboard
handling directly (see the root repo's `README.md` for the native-element vs.
hand-authored-ARIA split).

This package is unthemed — every component reads Tailwind's semantic CSS
variables (`--primary`, `--background`, etc.) but doesn't define them. You
almost never want to depend on this directly; use `@aumraa/lemniscate-ui` or
`@aumraa/kaayo-ui` instead, which depend on this package and supply the
product's theme.

## Development

`src/` is generated, not hand-edited — it's a copy of `src/app/components/ui/`
from the root repo, produced by `scripts/copy-source.mjs`. The root repo is
the single source of truth; this package is what makes it installable
elsewhere.

```bash
pnpm --filter @aumraa/breathe-ui build   # regenerate src/ from the root app
```

`build` also runs automatically before `pnpm publish` (`prepack`), so the
published tarball is self-contained even though `src/` isn't committed.

## Styling

Components are styled with Tailwind utility classes. Consuming apps need
Tailwind configured to scan this package's source for class names (add
`node_modules/@aumraa/breathe-ui/src/**/*.{ts,tsx}` to your Tailwind
`content`/`source` config) — there's no pre-built CSS bundle yet.
