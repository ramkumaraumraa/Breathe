# Breathe — Aumraa Design System

Single source of truth for all visual decisions across every Aumraa Technologies product.

## Products

| Product | Prefix | Web | RN | iOS | Android | Watch | Widgets | Status |
|---|---|---|---|---|---|---|---|---|
| Aumraa | `amra` | ✓ | — | — | — | — | — | Active |
| Technocracy | `thcy` | ✓ | — | — | — | — | — | Active |
| Lemniscate | `lmns` | ✓ | — | — | — | — | — | Active |
| Maligai Manager | `mlgm` | ✓ | ✓ | ✓ | ✓ | — | — | Pending kickoff |
| Ulagellam | `ulge` | — | ✓ | ✓ | ✓ | — | — | Pending kickoff |
| Ilakh | `ilkh` | ✓ | ✓ | ✓ | ✓ | — | — | Pending kickoff |
| Yakaizen | `ykai` | — | ✓ | ✓ | ✓ | ✓ | ✓ | Pending kickoff (Oct 2026) |

## Component layer

`src/app/components/ui/` is dependency-free — no Radix UI, no shadcn, no MUI,
no cmdk, no vaul. Every component owns its own markup, styling, and (where
needed) ARIA + keyboard behavior, so the same interaction model can be
mirrored 1:1 in native React Native equivalents later.

Components fall into two groups:

- **Native-element components** (dialog, sheet, drawer, popover, tooltip,
  hover-card, accordion, collapsible, select, checkbox, radio-group, switch,
  slider, progress, table, separator, avatar, label, scroll-area,
  aspect-ratio) — the browser owns the semantics and keyboard behavior via a
  real `<dialog>`, `<details>`, `<select>`, `<input>`, `<progress>`, etc. No
  ARIA is hand-authored here.
- **Custom widgets** (dropdown-menu, context-menu, menubar, navigation-menu,
  tabs, toggle-group, command, toast) — no native element exists, so ARIA
  roles/states and keyboard handling are hand-authored, backed by a small
  shared utilities layer: `slot.tsx` (asChild composition), `use-dialog.ts`
  (native `<dialog>` open-state), `use-floating.ts` (positioning, hover/click-
  outside/escape), `use-roving-tabindex.ts` (WAI-ARIA roving tabindex for
  menus/tabs/toggle-groups).

Some sub-widgets (menu submenus, checkbox/radio menu items) aren't
implemented — nothing in this repo uses them yet. Follow the pattern in
`dropdown-menu.tsx`/`radio-group.tsx` to add one when a real consumer needs
it, rather than building it speculatively.

## Installable packages

`packages/` turns the component layer into installable, per-product
packages, published to GitHub Packages under the `@aumraa` scope:

- **`@aumraa/breathe-ui`** — the full `src/app/components/ui/` set,
  unthemed. You almost never depend on this directly.
- **`@aumraa/lemniscate-ui`** / **`@aumraa/kaayo-ui`** / **`@aumraa/technocracy-ui`**
  — `breathe-ui` re-exported with that product's *entire* foundation layer
  applied automatically: colors, typography scale, spacing, radius, shadows,
  dark mode, base element styles — not just the color theme. Each package
  ships a single pre-compiled `style.css` (built by running the real
  Tailwind CLI against that product's semantic mapping, `@source`-scanning
  `breathe-ui` for every class actually used). Install, import, done — no
  Tailwind setup required on the consumer side, no `ProductThemeContext`
  wrapper. This is what a Lemniscate, Kaayo, or Technocracy web surface
  actually installs.

These are **web** packages — real DOM components (`<div>`, `<dialog>`,
`<button>`, …). They are not importable into a React Native app; the
Bucket A/Bucket B split above is what a native mobile implementation should
mirror, not these packages directly.

Each package's `src/` is generated (gitignored), not hand-edited — see
`packages/breathe-ui/README.md` and `packages/{lemniscate,kaayo}/README.md`
for how to regenerate and publish.

## Token pipeline

All tokens are defined once in JSON and built by Style Dictionary
into platform-specific outputs automatically.

```bash
pnpm tokens        # build all token outputs for all 7 products
pnpm tokens:watch  # rebuild on change
pnpm dev           # run documentation site
pnpm build         # production build of docs site
pnpm test          # run test suite (vitest)
```

## Source structure

```
tokens/
├── src/                  ← edit here — JSON is the source of truth
│   ├── global.json       ← raw palette (colors, spacing, type, radius)
│   ├── aumraa.json
│   ├── technocracy.json
│   ├── lemniscate.json
│   ├── maligai.json
│   ├── ulagellam.json
│   ├── ilakh.json
│   └── yakaizen.json
└── dist/                 ← generated outputs — commit these, never edit
    ├── web/              ← CSS custom properties
    ├── react-native/     ← JS/TS objects
    ├── ios/              ← Swift classes
    ├── android/          ← XML resources
    ├── watchos/          ← Swift (watchOS)
    └── widgets/          ← WidgetKit Swift + Glance Kotlin
```

## Adding or updating a token

1. Edit `tokens/src/{product}.json`
2. Run `pnpm tokens`
3. Commit both the JSON change and the updated `dist/` file
4. Each product repo copies the relevant dist file (see TOKENS_README in each repo)

## Starting a new product

1. Add `tokens/src/{product}.json` using an existing file as template
2. Add the product entry to `sd.config.js` products array
3. Run `pnpm tokens` to generate outputs
4. Add the product to `DesignTokensPage.tsx`
5. Confirm token values with the product designer before launch
6. Push to GitHub
