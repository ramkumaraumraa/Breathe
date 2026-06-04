# Kaayo Brand Integration — Design Spec

Date: 2026-06-04

## Goal

Add Kaayo as a named brand in the Breathe Design System and align Kaayo's React Native component library to Breathe DS naming conventions. The same component names work across all Breathe brands; swapping the token prefix (`kayo` vs `amra` vs `ulge`) changes the visual style — not the component API.

---

## 1. Token Architecture

### Global color family

Add a `crimson` color scale to `tokens/src/global.json` using Kaayo's existing 15-stop palette from `ColorsPage.tsx` (primary root `#970103`). Name the family `crimson`.

Add a `peach` scale (secondary root `#FDA581`) and reference the existing `ink` scale for tertiary (deep navy `#37415C` is already close to `ink`).

### Brand token file

Create `tokens/src/kaayo.json` with prefix `kayo`. Pattern mirrors `ulagellam.json`:

```json
{
  "kayo": {
    "color": {
      "primary":              { "value": "{color.crimson.500}", "type": "color" },
      "primaryLight":         { "value": "{color.crimson.300}", "type": "color" },
      "primaryDark":          { "value": "{color.crimson.700}", "type": "color" },
      "primaryForeground":    { "value": "{color.neutral.white}", "type": "color" },
      "secondary":            { "value": "{color.peach.500}", "type": "color" },
      "secondaryForeground":  { "value": "{color.neutral.white}", "type": "color" },
      "tertiary":             { "value": "{color.ink.500}", "type": "color" },
      "tertiaryForeground":   { "value": "{color.neutral.white}", "type": "color" },
      "background":           { "value": "{color.neutral.white}", "type": "color" },
      "backgroundSecondary":  { "value": "{color.neutral.50}", "type": "color" },
      "foreground":           { "value": "{color.ink.400}", "type": "color" },
      "foregroundSecondary":  { "value": "{color.ink.100}", "type": "color" },
      "border":               { "value": "{color.ink.400}", "type": "color" },
      "positive":             { "value": "{color.status.success}", "type": "color" },
      "negative":             { "value": "{color.status.danger}", "type": "color" },
      "warning":              { "value": "{color.status.warning}", "type": "color" }
    },
    "font": {
      "sizeBase":      { "value": "{font.size.base}", "type": "dimension" },
      "weightBody":    { "value": "{font.weight.normal}", "type": "fontWeight" },
      "weightHeading": { "value": "{font.weight.bold}", "type": "fontWeight" }
    },
    "spacing": {
      "pagePadding": { "value": "{spacing.4}", "type": "dimension" },
      "cardPadding": { "value": "{spacing.4}", "type": "dimension" },
      "sectionGap":  { "value": "{spacing.6}", "type": "dimension" }
    },
    "radius": {
      "default": { "value": "{radius.md}", "type": "dimension" },
      "sm":      { "value": "{radius.sm}", "type": "dimension" },
      "pill":    { "value": "{radius.full}", "type": "dimension" }
    },
    "shadow": {
      "card":  { "value": "2px 2px 0 {color.ink.400}", "type": "shadow" },
      "modal": { "value": "4px 4px 0 {color.ink.400}", "type": "shadow" }
    },
    "icon": {
      "sm": { "value": "{icon.sm}", "type": "dimension" },
      "md": { "value": "{icon.md}", "type": "dimension" },
      "lg": { "value": "{icon.lg}", "type": "dimension" }
    }
  }
}
```

**Platforms:** `web`, `reactNative`, `ios`, `android` — all four, same as every other Breathe brand. The web/CSS output is required for component previews in the Breathe DS docs site even though Kaayo's product is mobile-only.

### Style Dictionary config

Add `kaayo` to `tokens/sd.config.js` product list:

```js
{ name: 'kaayo', prefix: 'kayo', platforms: ['web', 'reactNative', 'ios', 'android'] }
```

---

## 2. Breathe DS — Kaayo Under Ulagellam

The same Ulagellam sub-tab pattern from the Colors page must be applied to every other foundation page that has brand tabs.

### Pattern (ColorsPage.tsx is the reference)

- Top-level brand tabs filter out `kaayo` and `ilakh` — they do NOT appear as standalone tabs.
- When the `ullagellam` top-level tab is active, a segment-control sub-tab row appears with 3 options: **Kaayo (Tutor Ops)**, **Ilakh (Finance)**, **Ulagellam (Explorer)**.
- Default active sub-tab: `kaayo`.

### Pages that need this pattern applied

| Page | Change needed |
| --- | --- |
| `TypographyPage.tsx` | Add Kaayo brand data; apply Ulagellam sub-tab pattern; remove Ilakh and Kaayo from `TYPO_BRAND_ORDER` top-level list |
| `DesignTokensPage.tsx` | Add Kaayo; apply Ulagellam sub-tab pattern; remove Ilakh and Kaayo from top-level list |

### ProductThemeContext.tsx

Add `'kaayo'` to `ProductId` union type and add a `kaayo` entry to `productMeta`:

```ts
kaayo: {
  label: 'Kaayo',
  prefix: 'kayo',
  description: 'Tutor & class operations — Mobile · Neo-Brutalist',
  vars: {
    '--primary':               'var(--kayo-color-primary)',
    '--primary-foreground':    'var(--kayo-color-primary-foreground)',
    '--secondary':             'var(--kayo-color-background-secondary)',
    '--secondary-foreground':  'var(--kayo-color-foreground)',
    '--background':            'var(--kayo-color-background)',
    '--foreground':            'var(--kayo-color-foreground)',
    '--border':                'var(--kayo-color-border)',
    '--ring':                  'var(--kayo-color-primary)',
    '--radius':                'var(--kayo-radius-default)',
    '--destructive':           'var(--kayo-color-negative)',
    '--destructive-foreground':'var(--kayo-color-negative-foreground)',
  },
},
```

---

## 3. Kaayo React Native — Component Alignment

### Atom registry

| File | Breathe DS name | Action |
| --- | --- | --- |
| `Button.tsx` | `Button` | Keep — name matches |
| `Input.tsx` | `Input` | Keep — name matches |
| `Select.tsx` | `Select` | **Update** — add `mode` prop |
| `Card.tsx` | `Card` | Keep — name matches |
| `Modal.tsx` | `Dialog` / `Sheet` | Keep for now |
| `Toast.tsx` | `Toast` | Keep — name matches |
| `EmptyState.tsx` | (custom) | Keep |
| `BloodGroupPicker.tsx` | — | **Delete** — callers use `Select` |
| `GenderPicker.tsx` | — | **Delete** — callers use `Select` |
| `Checkbox.tsx` | `Checkbox` | **Add new** |
| `RadioGroup.tsx` | `RadioGroup` | **Add new** |
| `BranchTabs.tsx`, `DataTable.tsx`, `StudentAvatar.tsx`, `PaymentSummaryCard.tsx`, `PhotoViewer.tsx` | domain-specific | Keep, out of scope |

### Select — updated API

```ts
interface SelectProps {
  label?: string
  placeholder?: string
  value: string | string[] | null      // string[] when mode="multi"
  onChange: (value: string | string[]) => void
  options: SelectOption[]
  mode?: 'single' | 'multi'           // default: 'single'
  disabled?: boolean
  errorText?: string
  testID?: string
}
```

**Behaviour:**

- `mode="single"` — each row shows a radio dot (unselected: hollow circle, selected: crimson-filled dot). Tapping a row selects it and closes the sheet.
- `mode="multi"` — each row shows a checkbox (unselected: hollow square, checked: crimson-filled with ✓). Tapping toggles without closing. Sheet closes via a "Done" button at the bottom or backdrop tap.
- `value` for multi is `string[]`. Trigger label shows comma-joined selected labels, truncated to `numberOfLines={1}`.

### Checkbox atom

```ts
interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  disabled?: boolean
  errorText?: string
  testID?: string
}
```

Standalone 20×20 checkbox. Unchecked: 2px border in `theme.border.strong`, `kayoRadius.sm`. Checked: `theme.brand.primary` fill + white ✓ icon from lucide (`Check` size 12). Used by `Select` internally and anywhere else in the app.

### RadioGroup atom

```ts
interface RadioGroupProps {
  value: string | null
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  disabled?: boolean
  testID?: string
}
```

Renders a vertical list of radio items. Each item: 20×20 circle (2px border). Selected: outer ring in `theme.brand.primary`, inner filled dot 8×8. Used by `Select` internally and for inline radio groups.

### Caller updates (2 files)

- `frontend/app/(app)/students/new.tsx` — replace `GenderPicker` → `Select` with gender options; replace `BloodGroupPicker` → `Select` with blood group options.
- `frontend/app/(app)/students/[id]/index.tsx` — same replacements.

---

## 4. Out of Scope

- Generating Style Dictionary dist files (run `pnpm build:tokens` after `kaayo.json` is created).
- Logos page — Kaayo brand logo asset not yet confirmed.
- Foundation pages beyond Typography, DesignTokens, and ProductThemeContext.

---

## Success Criteria

1. `tokens/src/kaayo.json` exists with `kayo` prefix, references global color scales.
2. `TypographyPage.tsx` and `DesignTokensPage.tsx` show Kaayo under the Ulagellam sub-tab — not as a standalone top-level tab.
3. `ProductThemeContext.tsx` includes `kaayo` in `ProductId`.
4. Kaayo RN has `Checkbox.tsx` and `RadioGroup.tsx` atoms.
5. `Select.tsx` supports `mode="single"` (radio dots) and `mode="multi"` (checkboxes).
6. `BloodGroupPicker.tsx` and `GenderPicker.tsx` are deleted; their 2 callers use `Select` directly.
