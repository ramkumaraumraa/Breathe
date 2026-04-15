# Breathe Design System — Atomic Restructure + Aumraa Branding

**Date:** 2026-04-15  
**Status:** Approved  
**Phases:** 3

---

## Context

Breathe is AUMRAA's internal design system. It currently has:
- 7 products in the Style Dictionary token pipeline
- A flat "Components" nav (12 pages at `/components/*`)
- Aumraa tokens incorrectly using blue (should be forest green `#2F9E44`)
- Shell chrome mapping to Lemniscate (blue) tokens
- 6 template components extracted from Lemniscate (`breathe-extract`) not yet imported
- No per-product token switching in component previews

This spec covers the three-phase work to fix all of that.

---

## Phase 1 — Shell Branding + Aumraa Token Fix + breathe-extract Import

### 1.1 Shell branding (neutral + Aumraa green accent)

The Breathe site chrome stays neutral white/gray. Aumraa green signals ownership without dominating the UI.

**Changes to `src/styles/theme.css` `:root` block:**

| CSS var | Old value | New value |
|---|---|---|
| `--primary` | `var(--lmns-color-primary)` | `var(--amra-color-primary)` (`#2F9E44`) |
| `--ring` | `var(--lmns-color-primary)` | `var(--amra-color-primary)` |
| `--accent` | `var(--lmns-color-accent)` | `var(--amra-color-secondary)` (`#CFCF2A`) |
| `--radius` | `var(--lmns-radius-default)` | `var(--amra-radius-default)` (`0.5rem`) |

All other vars (background, foreground, card, muted, border, popover) remain mapped to their neutral Lemniscate values — the shell surfaces stay white/gray. Only the active accent colour shifts to green.

**Sidebar active item:** thin left border in `--primary` + `bg-primary/8` tint (soft green wash). No other sidebar colour changes.

### 1.2 Aumraa token correction

**`tokens/src/global.json`** — add after the existing `orange` block:

- `color.green` palette (50–950 + `forest: #002100`)
- `color.yellowGreen` palette (400/500/600)
- `color.emerald` palette (400/500)
- Update `color.status` block: success → `#00D06D`, danger → `#E11D2A`, info → `#2F6FED`
- Add `font.family.sourceSans` → `'Source Sans 3', system-ui fallbacks`

**`tokens/src/aumraa.json`** — full rewrite with correct `amra` prefix:

| Token | Value | Role |
|---|---|---|
| `amra.color.primary` | `{color.green.500}` → `#2F9E44` | Forest green — primary actions |
| `amra.color.secondary` | `{color.yellowGreen.400}` → `#CFCF2A` | Energy accent |
| `amra.color.tertiary` | `{color.status.info}` → `#2F6FED` | Blue digital accent |
| `amra.color.positive` | `{color.emerald.400}` → `#00D06D` | Success states |
| `amra.color.negative` | `{color.status.danger}` → `#E11D2A` | Errors |
| `amra.color.foreground` | `{color.green.forest}` → `#002100` | Deep forest black text |
| `amra.font.family` | `{font.family.sourceSans}` | Source Sans 3 |

Run `pnpm tokens` after changes. Verify: `grep "amra-color-primary" tokens/dist/web/aumraa.css` → must show `#2F9E44`, not blue.

**`src/styles/fonts.css`** — add Source Sans 3 Google Fonts import at top.

**`src/app/pages/foundations/DesignTokensPage.tsx`** — update Aumraa tab `colors` and `typography` arrays with correct values.

### 1.3 breathe-extract import

Source: `../Lemniscate/Dev/breathe-extract/components/custom/template/`  
Destination: `src/app/components/custom/template/`

Copy all 6 files:

| File | Purpose |
|---|---|
| `StatGrid.tsx` | Responsive grid: `2col`, `2-1`, `1-2`, `1-sidebar` variants |
| `PageToolbar.tsx` | Left/right slot toolbar row, wraps on mobile |
| `DataSection.tsx` | Bordered card container for data-dense content |
| `PageBody.tsx` | Max-width content wrapper with page padding |
| `MobileFab.tsx` | Fixed FAB, `md:hidden`, single-action or dropdown |
| `TabBar.tsx` | Bottom tab bar for mobile navigation |

**Import path remapping** (breathe-extract uses Next.js aliases, Breathe uses Vite):

| breathe-extract alias | Breathe alias |
|---|---|
| `@/shared/lib/utils` | `@/app/lib/utils` |
| `@/components/ui/*` | `@/app/components/ui/*` |

Create `src/app/components/custom/template/index.ts` re-exporting all 6.

**Verification:** `pnpm build` — no TypeScript errors on imported template components.

---

## Phase 2 — Atomic Nav + ProductThemeContext + ComponentPageLayout

### 2.1 Nav restructure

**`src/app/components/layout/navData.ts`** — replace the flat `Components` section with four sections:

| Section label | Path prefix | Item count |
|---|---|---|
| `ATOMS` | `/atoms/*` | 14 items |
| `MOLECULES` | `/molecules/*` | 15 items |
| `ORGANISMS` | `/organisms/*` | 9 items |
| `TEMPLATES` | `/templates/*` | 6 items |

Full item lists per section (as specified in File 1 of the implementation brief).

**`src/app/routes.ts`** — add routes for all new paths. Add redirect entries from old `/components/*` paths to new atomic paths so bookmarks don't hard-404.

### 2.2 ProductThemeContext

**Create `src/app/context/ProductThemeContext.tsx`:**

- `ProductId` union type: 7 products
- `productMeta` map: each product has `label`, `prefix`, `description`, `vars` (CSS variable overrides for shadcn's generic `--primary`, `--background`, etc.)
- `ProductThemeProvider` component wrapping the app
- `useProductTheme()` hook
- `ProductPreviewWrapper` — a `<div>` that applies the active product's `vars` as inline styles; any shadcn component inside reads those CSS vars automatically

**Aumraa vars** use the corrected green values from Phase 1.

**Default product:** `lemniscate`

**Wrap app:** `src/app/App.tsx` wraps `<RouterProvider>` with `<ProductThemeProvider>`.

### 2.3 ComponentPageLayout

**Create `src/app/components/shared/ComponentPageLayout.tsx`:**

Props:
- `title: string`
- `description: string`  
- `level: 'Atom' | 'Molecule' | 'Organism' | 'Template'`
- `status?: 'Stable' | 'Beta' | 'Deprecated' | 'Planned'` (default: `'Stable'`)
- `sections: ComponentSection[]`
- `implemented?: ProductId[]` (default: `['lemniscate', 'aumraa']`)

Structure rendered:
```
Page header: title + Status badge + level pill (colour-coded by level)
Product switcher: 7 pills — active = filled, placeholder = muted dot
  └─ Note: dots = placeholder, finalised at product design kickoffs
Sections (mapped):
  Section title + description
  Tabs: [Preview] [Code]
    Preview: ProductPreviewWrapper > section.preview JSX
    Code: inner tabs [React] [React Native] [iOS] [Android] (only rendered if content provided)
```

`implemented` defaults to `['lemniscate', 'aumraa']` for all pages — Aumraa components are Lemniscate components with Aumraa tokens applied via `ProductPreviewWrapper`. No duplicate JSX.

**Create `src/app/pages/atoms/`, `molecules/`, `organisms/`, `templates/` directories.**

**Verification:** `pnpm build` — zero TypeScript errors.

---

## Phase 3 — Page Migrations

### 3.1 Migrate 12 existing component pages

**Classification:**

| New path | Level | Old path |
|---|---|---|
| `/atoms/button` | Atom | `/components/button` |
| `/atoms/input` | Atom | `/components/input` |
| `/atoms/checkbox` | Atom | `/components/checkbox` |
| `/atoms/switch` | Atom | `/components/switch` |
| `/atoms/avatar` | Atom | `/components/avatar` |
| `/atoms/badge` | Atom | `/components/badge` |
| `/molecules/alert` | Molecule | `/components/alert` |
| `/molecules/card` | Molecule | `/components/card` |
| `/molecules/select` | Molecule | `/components/select` |
| `/molecules/tabs` | Molecule | `/components/tabs` |
| `/molecules/tooltip` | Molecule | `/components/tooltip` |
| `/organisms/dialog` | Organism | `/components/modal` |

**Migration pattern per page:**
1. Create new file at new path
2. Replace custom hand-rolled component implementations with shadcn components from `src/app/components/ui/*`
3. Wrap all preview JSX in `ComponentPageLayout` sections
4. Add `code.react` snippet to each section
5. Add `code.reactNative` placeholder to first section
6. Delete old file at `/components/*` path

### 3.2 Add 6 new Template pages

One page per breathe-extract template component. Each uses `ComponentPageLayout` with:
- Live preview of the component with representative children
- `level="Template"`
- `implemented={['lemniscate', 'aumraa']}`
- React code snippet showing real usage

### 3.3 Verification

```bash
pnpm tokens    # all 7 products build cleanly
pnpm build     # zero TypeScript errors
pnpm dev       # browser checks below
```

**Browser checks:**
1. Left nav shows: FOUNDATIONS / ATOMS / MOLECULES / ORGANISMS / TEMPLATES
2. Navigate to Atoms → Button: product switcher visible with 7 pills
3. Lemniscate selected → blue primary (`#40AAD4`)
4. Aumraa selected → green primary (`#2F9E44`), Source Sans 3 typeface
5. Technocracy selected → dark background
6. Foundations → Design Tokens → Aumraa tab → shows green, not blue
7. Old `/components/button` URL redirects to `/atoms/button`

---

## Commit

```
feat: atomic design structure + Aumraa brand correction + breathe-extract import

- Phase 1: Aumraa tokens corrected (primary green #2F9E44, Source Sans 3)
  Add green/yellowGreen/emerald to global.json; rewrite aumraa.json
  Breathe shell: neutral chrome with Aumraa green as primary accent
  Import 6 template components from breathe-extract (StatGrid, PageToolbar,
  DataSection, PageBody, MobileFab, TabBar)
- Phase 2: Atomic nav (Atoms/Molecules/Organisms/Templates)
  ProductThemeContext: 7-product token switching for component previews
  ComponentPageLayout: reusable template; Aumraa = Lemniscate + green tokens
- Phase 3: Migrate 12 existing component pages to new atomic paths
  6 new Template pages using breathe-extract components
  Redirects from /components/* to new paths
```

---

## What is NOT in scope

- New component pages beyond the 12 migrated + 6 templates
- Maligai, Ulagellam, Ilakh, Yakaizen product token customisation (placeholder until design kickoffs)
- Dark mode for Technocracy shell (separate concern)
- Any changes to the token pipeline build config
