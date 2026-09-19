# Breathe — Aumraa Design System

Single source of truth for all visual decisions across every Aumraa Technologies product.

## Products

Stage names match the product tabs on the docs site (`STAGE_MARKS` in `src/app/components/shared/ProductTabs.tsx`).

| Product | Prefix | Web | RN | iOS | Android | Watch | Widgets | Stage |
|---|---|---|---|---|---|---|---|---|
| Aumraa | `amra` | ✓ | — | — | — | — | — | Base brand |
| Technocracy | `thcy` | ✓ | — | — | — | — | — | Internal |
| Leminiscate | `lmns` | ✓ | ✓ | — | — | — | — | Live |
| Kaayo | `kayo` | ✓ | ✓ | ✓ | ✓ | — | — | Live |
| Maligai Manager | `mlgm` | ✓ | ✓ | ✓ | ✓ | — | — | Next |
| Ilakh | `ilkh` | ✓ | ✓ | ✓ | ✓ | — | — | Next |
| Yakaizen | `ykai` | — | ✓ | ✓ | ✓ | ✓ | ✓ | Yet to start |
| Smart Life-Style App | `slsa` | — | — | — | — | — | — | Yet to start (no tokens yet) |

## Token pipeline

All tokens are defined once in JSON and built by Style Dictionary
into platform-specific outputs automatically.

```bash
pnpm tokens        # build all token outputs for all 7 products with tokens
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
│   ├── kaayo.json
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
