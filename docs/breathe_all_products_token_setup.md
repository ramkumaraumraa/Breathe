# Breathe Design System — All Products Token Setup

> **Claude Code instructions:** Read this entire file before making any changes.
> Work through each section in order. Verify after each section before continuing.
> This is a Breathe repo task only — do not touch any product repos yet.

---

## Path reference

| Reference | Full path |
|---|---|
| **Breathe repo** (work here) | `~/Breathe Design system/` |
| **Lemniscate repo** | `~/Lemniscate/Dev/lemniscate/` |

All paths below that say `breathe/` mean `~/Breathe Design system/`.

---

## Context

Breathe currently has 4 products defined:
- `amra` — Aumraa ✅
- `tech` — Technocracy ✅ (prefix being renamed to `thcy` in this task)
- `lmns` — Lemniscate ✅ (complete — do not change token values)
- `ykai` — Yakaizen ✅ (stub only)

We are adding 3 new products and completing the full 7-product setup:
- `mlgm` — Maligai Manager (mobile primary, web secondary)
- `ulge` — Ulagellam (mobile only)
- `ilkh` — Ilakh (web + mobile, mobile first)

**Platform targets per product:**

| Product | Prefix | Web CSS | React Native | iOS Swift | Android XML | watchOS | Widgets |
|---|---|---|---|---|---|---|---|
| Aumraa | `amra` | ✅ | — | — | — | — | — |
| Technocracy | `thcy` | ✅ | — | — | — | — | — |
| Lemniscate | `lmns` | ✅ | — | — | — | — | — |
| Maligai Manager | `mlgm` | ✅ | ✅ | ✅ | ✅ | — | — |
| Ulagellam | `ulge` | — | ✅ | ✅ | ✅ | — | — |
| Ilakh | `ilkh` | ✅ | ✅ | ✅ | ✅ | — | — |
| Yakaizen | `ykai` | — | ✅ | ✅ | ✅ | ✅ | ✅ |

Widgets = iOS WidgetKit (Swift) + Android Glance (Kotlin) — separate output files.

---

## Section 1 — Rename `tech` prefix to `thcy`

This touches 4 files. Make all changes before running any build.

### 1A — Rename `tokens/src/technocracy.json`

Open `~/Breathe Design system/tokens/src/technocracy.json`.
Replace every occurrence of `"tech"` as a JSON key with `"thcy"`.

The top-level key changes from:
```json
{
  "tech": { ... }
}
```
to:
```json
{
  "thcy": { ... }
}
```

Every nested key that starts with `tech.` updates to `thcy.` — for example:
- `tech.color.primary` → `thcy.color.primary`
- `tech.font.sizeBase` → `thcy.font.sizeBase`

Do not change any values — only the key names.

### 1B — Update `tokens/sd.config.js`

Open `~/Breathe Design system/tokens/sd.config.js`.
Find the technocracy entry in the products array and update prefix:

```js
// Before
{ name: 'technocracy', prefix: 'tech', platforms: ['web'] },

// After
{ name: 'technocracy', prefix: 'thcy', platforms: ['web'] },
```

### 1C — Update `src/styles/theme.css` (shadcn bridge)

Open `~/Breathe Design system/src/styles/theme.css`.
Replace all occurrences of `--tech-` with `--thcy-` in the dark mode or
technocracy-specific sections if they exist. If the bridge currently defaults
to Lemniscate tokens only (`--lmns-`), no change needed here — just confirm.

### 1D — Update `DesignTokensPage.tsx`

Open `~/Breathe Design system/src/app/pages/foundations/DesignTokensPage.tsx`.

In the `products` array, find the Technocracy entry and:
- Change all token strings from `--tech-` to `--thcy-`

Example:
```ts
// Before
{ name: 'Primary', token: '--tech-color-primary', value: '#40AAD4', ... }

// After
{ name: 'Primary', token: '--thcy-color-primary', value: '#40AAD4', ... }
```

### 1E — Rebuild and verify rename

```bash
cd ~/Breathe\ Design\ system
pnpm tokens
```

Confirm `tokens/dist/web/technocracy.css` now contains `--thcy-color-primary`
and NOT `--tech-color-primary`.

```bash
grep "thcy" ~/Breathe\ Design\ system/tokens/dist/web/technocracy.css | head -5
grep "tech-" ~/Breathe\ Design\ system/tokens/dist/web/technocracy.css | wc -l
# Second command should return 0
```

---

## Section 2 — Add 3 new product JSON token files

### 2A — Create `tokens/src/maligai.json`

Maligai Manager is a grocery/retail mobile app. Mobile primary, web secondary.
Warmer palette — retain Aumraa blue but lean into approachable tones.

```json
{
  "mlgm": {
    "color": {
      "primary":              { "value": "{color.blue.400}",      "type": "color",
                                "comment": "Confirm at Maligai design kickoff — placeholder uses Aumraa blue" },
      "primaryForeground":    { "value": "{color.neutral.white}",  "type": "color" },
      "accent":               { "value": "{color.orange.500}",    "type": "color" },
      "accentForeground":     { "value": "{color.neutral.white}",  "type": "color" },
      "background":           { "value": "{color.neutral.white}",  "type": "color" },
      "backgroundSecondary":  { "value": "{color.neutral.50}",    "type": "color" },
      "backgroundTertiary":   { "value": "{color.neutral.100}",   "type": "color" },
      "foreground":           { "value": "{color.neutral.800}",   "type": "color" },
      "foregroundSecondary":  { "value": "{color.neutral.500}",   "type": "color" },
      "foregroundTertiary":   { "value": "{color.neutral.400}",   "type": "color" },
      "border":               { "value": "{color.neutral.200}",   "type": "color" },
      "borderHover":          { "value": "{color.neutral.300}",   "type": "color" },
      "success":              { "value": "{color.status.success}", "type": "color" },
      "warning":              { "value": "{color.status.warning}", "type": "color" },
      "danger":               { "value": "{color.status.danger}",  "type": "color" },
      "info":                 { "value": "{color.status.info}",    "type": "color" }
    },
    "font": {
      "sizeBase":      { "value": "{font.size.base}",    "type": "dimension",
                         "comment": "16px for web, RN uses sp units — Style Dictionary handles conversion" },
      "weightBody":    { "value": "{font.weight.normal}", "type": "fontWeight" },
      "weightHeading": { "value": "{font.weight.semibold}", "type": "fontWeight",
                         "comment": "Semibold for mobile readability" }
    },
    "spacing": {
      "pagePadding":  { "value": "{spacing.4}", "type": "dimension",
                        "comment": "16px — tighter on mobile" },
      "cardPadding":  { "value": "{spacing.4}", "type": "dimension" },
      "sectionGap":   { "value": "{spacing.6}", "type": "dimension" }
    },
    "radius": {
      "default": { "value": "{radius.xl}",   "type": "dimension",
                   "comment": "16px — rounder for mobile-native feel" },
      "sm":      { "value": "{radius.md}",   "type": "dimension" },
      "lg":      { "value": "{radius.full}", "type": "dimension" },
      "pill":    { "value": "{radius.full}", "type": "dimension" }
    },
    "shadow": {
      "card":     { "value": "{shadow.sm}", "type": "shadow" },
      "modal":    { "value": "{shadow.lg}", "type": "shadow" },
      "dropdown": { "value": "{shadow.md}", "type": "shadow" }
    },
    "icon": {
      "sm": { "value": "{icon.sm}", "type": "dimension" },
      "md": { "value": "{icon.md}", "type": "dimension",
              "comment": "20px — mobile default" },
      "lg": { "value": "{icon.lg}", "type": "dimension" }
    }
  }
}
```

### 2B — Create `tokens/src/ulagellam.json`

Ulagellam is a mobile-only app. No web output.

```json
{
  "ulge": {
    "color": {
      "primary":              { "value": "{color.blue.400}",      "type": "color",
                                "comment": "Placeholder — confirm at Ulagellam design kickoff" },
      "primaryForeground":    { "value": "{color.neutral.white}",  "type": "color" },
      "accent":               { "value": "{color.orange.500}",    "type": "color" },
      "accentForeground":     { "value": "{color.neutral.white}",  "type": "color" },
      "background":           { "value": "{color.neutral.white}",  "type": "color" },
      "backgroundSecondary":  { "value": "{color.neutral.50}",    "type": "color" },
      "foreground":           { "value": "{color.neutral.800}",   "type": "color" },
      "foregroundSecondary":  { "value": "{color.neutral.500}",   "type": "color" },
      "border":               { "value": "{color.neutral.200}",   "type": "color" },
      "success":              { "value": "{color.status.success}", "type": "color" },
      "warning":              { "value": "{color.status.warning}", "type": "color" },
      "danger":               { "value": "{color.status.danger}",  "type": "color" }
    },
    "font": {
      "sizeBase":      { "value": "{font.size.base}",      "type": "dimension" },
      "weightBody":    { "value": "{font.weight.normal}",  "type": "fontWeight" },
      "weightHeading": { "value": "{font.weight.semibold}", "type": "fontWeight" }
    },
    "spacing": {
      "pagePadding": { "value": "{spacing.4}", "type": "dimension" },
      "cardPadding": { "value": "{spacing.4}", "type": "dimension" },
      "sectionGap":  { "value": "{spacing.6}", "type": "dimension" }
    },
    "radius": {
      "default": { "value": "{radius.xl}",   "type": "dimension" },
      "sm":      { "value": "{radius.md}",   "type": "dimension" },
      "pill":    { "value": "{radius.full}", "type": "dimension" }
    },
    "shadow": {
      "card":  { "value": "{shadow.sm}", "type": "shadow" },
      "modal": { "value": "{shadow.lg}", "type": "shadow" }
    },
    "icon": {
      "sm": { "value": "{icon.sm}", "type": "dimension" },
      "md": { "value": "{icon.md}", "type": "dimension" },
      "lg": { "value": "{icon.lg}", "type": "dimension" }
    }
  }
}
```

### 2C — Create `tokens/src/ilakh.json`

Ilakh is web + mobile, mobile-first approach.

```json
{
  "ilkh": {
    "color": {
      "primary":              { "value": "{color.blue.400}",      "type": "color",
                                "comment": "Placeholder — confirm at Ilakh design kickoff" },
      "primaryForeground":    { "value": "{color.neutral.white}",  "type": "color" },
      "accent":               { "value": "{color.orange.500}",    "type": "color" },
      "accentForeground":     { "value": "{color.neutral.white}",  "type": "color" },
      "background":           { "value": "{color.neutral.white}",  "type": "color" },
      "backgroundSecondary":  { "value": "{color.neutral.50}",    "type": "color" },
      "backgroundTertiary":   { "value": "{color.neutral.100}",   "type": "color" },
      "foreground":           { "value": "{color.neutral.800}",   "type": "color" },
      "foregroundSecondary":  { "value": "{color.neutral.500}",   "type": "color" },
      "foregroundTertiary":   { "value": "{color.neutral.400}",   "type": "color" },
      "border":               { "value": "{color.neutral.200}",   "type": "color" },
      "borderHover":          { "value": "{color.neutral.300}",   "type": "color" },
      "success":              { "value": "{color.status.success}", "type": "color" },
      "warning":              { "value": "{color.status.warning}", "type": "color" },
      "danger":               { "value": "{color.status.danger}",  "type": "color" },
      "info":                 { "value": "{color.status.info}",    "type": "color" }
    },
    "font": {
      "sizeBase":      { "value": "{font.size.base}",    "type": "dimension",
                         "comment": "16px — mobile first, same base for web" },
      "weightBody":    { "value": "{font.weight.normal}", "type": "fontWeight" },
      "weightHeading": { "value": "{font.weight.medium}", "type": "fontWeight" }
    },
    "spacing": {
      "pagePadding":  { "value": "{spacing.4}", "type": "dimension",
                        "comment": "16px mobile-first — web wrapper adds more at breakpoint" },
      "cardPadding":  { "value": "{spacing.4}", "type": "dimension" },
      "sectionGap":   { "value": "{spacing.6}", "type": "dimension" }
    },
    "radius": {
      "default": { "value": "{radius.lg}",   "type": "dimension" },
      "sm":      { "value": "{radius.md}",   "type": "dimension" },
      "lg":      { "value": "{radius.xl}",   "type": "dimension" },
      "pill":    { "value": "{radius.full}", "type": "dimension" }
    },
    "shadow": {
      "card":     { "value": "{shadow.sm}", "type": "shadow" },
      "modal":    { "value": "{shadow.lg}", "type": "shadow" },
      "dropdown": { "value": "{shadow.md}", "type": "shadow" }
    },
    "icon": {
      "sm": { "value": "{icon.sm}", "type": "dimension" },
      "md": { "value": "{icon.md}", "type": "dimension" },
      "lg": { "value": "{icon.lg}", "type": "dimension" }
    }
  }
}
```

---

## Section 3 — Update `sd.config.js` for all 7 products

Open `~/Breathe Design system/tokens/sd.config.js`.
Replace the entire `products` array with:

```js
const products = [
  {
    name: 'aumraa',
    prefix: 'amra',
    platforms: ['web'],
  },
  {
    name: 'technocracy',
    prefix: 'thcy',
    platforms: ['web'],
  },
  {
    name: 'lemniscate',
    prefix: 'lmns',
    platforms: ['web'],
  },
  {
    name: 'maligai',
    prefix: 'mlgm',
    platforms: ['web', 'reactNative', 'ios', 'android'],
  },
  {
    name: 'ulagellam',
    prefix: 'ulge',
    platforms: ['reactNative', 'ios', 'android'],
  },
  {
    name: 'ilakh',
    prefix: 'ilkh',
    platforms: ['web', 'reactNative', 'ios', 'android'],
  },
  {
    name: 'yakaizen',
    prefix: 'ykai',
    platforms: ['reactNative', 'ios', 'android', 'watchos', 'widgets'],
  },
];
```

Then add the watchos and widgets platform blocks inside the platform configuration
section, after the existing `android` block:

```js
  // ── watchOS (Swift — separate from iOS main app) ───────────────────────
  if (product.platforms.includes('watchos')) {
    config.platforms.watchos = {
      transformGroup: 'ios-swift',
      buildPath: `tokens/dist/watchos/`,
      files: [
        {
          destination: `${product.name.charAt(0).toUpperCase() + product.name.slice(1)}WatchTokens.swift`,
          format: 'ios-swift/class.swift',
          filter: (token) => token.path[0] === product.prefix,
          options: {
            className: `${product.name.charAt(0).toUpperCase() + product.name.slice(1)}WatchTokens`,
          },
        },
      ],
    };
  }

  // ── Widgets (iOS WidgetKit Swift + Android Glance Kotlin) ──────────────
  if (product.platforms.includes('widgets')) {
    config.platforms.widgetsIos = {
      transformGroup: 'ios-swift',
      buildPath: `tokens/dist/widgets/ios/`,
      files: [
        {
          destination: `${product.name.charAt(0).toUpperCase() + product.name.slice(1)}WidgetTokens.swift`,
          format: 'ios-swift/class.swift',
          filter: (token) => token.path[0] === product.prefix,
          options: {
            className: `${product.name.charAt(0).toUpperCase() + product.name.slice(1)}WidgetTokens`,
          },
        },
      ],
    };
    config.platforms.widgetsAndroid = {
      transformGroup: 'android',
      buildPath: `tokens/dist/widgets/android/${product.name}/`,
      files: [
        {
          destination: 'widget_colors.xml',
          format: 'android/colors',
          filter: (token) =>
            token.path[0] === product.prefix &&
            token.attributes?.category === 'color',
        },
      ],
    };
  }
```

Also create the new dist folders:

```bash
mkdir -p ~/Breathe\ Design\ system/tokens/dist/watchos
mkdir -p ~/Breathe\ Design\ system/tokens/dist/widgets/ios
mkdir -p ~/Breathe\ Design\ system/tokens/dist/widgets/android/yakaizen
```

---

## Section 4 — Run the full token build

```bash
cd ~/Breathe\ Design\ system
pnpm tokens
```

**Expected output — confirm all these files exist:**

```bash
# Web outputs
ls ~/Breathe\ Design\ system/tokens/dist/web/
# Should list: aumraa.css, technocracy.css, lemniscate.css,
#              maligai.css, ilakh.css
# Note: ulagellam and yakaizen have NO web output — correct

# React Native outputs
ls ~/Breathe\ Design\ system/tokens/dist/react-native/
# Should list: maligai.ts, ulagellam.ts, ilakh.ts, yakaizen.ts

# iOS outputs
ls ~/Breathe\ Design\ system/tokens/dist/ios/
# Should list: MaligaiTokens.swift, UlageTokens.swift,
#              IlakhTokens.swift, YakaizenTokens.swift

# watchOS output
ls ~/Breathe\ Design\ system/tokens/dist/watchos/
# Should list: YakaizenWatchTokens.swift

# Widget outputs
ls ~/Breathe\ Design\ system/tokens/dist/widgets/ios/
# Should list: YakaizenWidgetTokens.swift

ls ~/Breathe\ Design\ system/tokens/dist/widgets/android/yakaizen/
# Should list: widget_colors.xml
```

Also verify the `thcy` rename is clean:

```bash
grep "thcy-color-primary" ~/Breathe\ Design\ system/tokens/dist/web/technocracy.css
# Should return one line

grep -- "--tech-" ~/Breathe\ Design\ system/tokens/dist/web/technocracy.css
# Should return nothing (0 lines)
```

---

## Section 5 — Update the Design Tokens documentation page

Open `~/Breathe Design system/src/app/pages/foundations/DesignTokensPage.tsx`.

### 5A — Add 3 new products to the `products` array

Add these three entries after the existing Yakaizen entry.
Keep Yakaizen as the last entry:

```ts
  {
    id: 'maligai',
    label: 'Maligai Manager',
    prefix: 'mlgm',
    description: 'Grocery and retail management — mobile primary, web secondary',
    platforms: ['Web CSS', 'React Native', 'iOS Swift', 'Android XML'],
    surface: 'light',
    colors: [
      { name: 'Primary',              token: '--mlgm-color-primary',              value: '#40AAD4', role: 'Placeholder — confirm at design kickoff' },
      { name: 'Accent',               token: '--mlgm-color-accent',               value: '#E07722', role: 'Highlights' },
      { name: 'Background',           token: '--mlgm-color-background',           value: '#ffffff', role: 'Page / screen surface' },
      { name: 'Background Secondary', token: '--mlgm-color-background-secondary', value: '#F9FAFB', role: 'Cards' },
      { name: 'Foreground',           token: '--mlgm-color-foreground',           value: '#1F2937', role: 'Body text' },
      { name: 'Foreground Secondary', token: '--mlgm-color-foreground-secondary', value: '#6B7280', role: 'Captions' },
      { name: 'Border',               token: '--mlgm-color-border',               value: '#E5E7EB', role: 'Dividers' },
      { name: 'Success',              token: '--mlgm-color-success',              value: '#16A34A', role: 'Positive states' },
      { name: 'Warning',              token: '--mlgm-color-warning',              value: '#D97706', role: 'Caution' },
      { name: 'Danger',               token: '--mlgm-color-danger',               value: '#DC2626', role: 'Errors' },
    ],
    typography: [
      { name: 'Base size',      token: '--mlgm-font-size-base',      value: '16px' },
      { name: 'Body weight',    token: '--mlgm-font-weight-body',    value: '400' },
      { name: 'Heading weight', token: '--mlgm-font-weight-heading', value: '600 (mobile readability)' },
    ],
    radius: [
      { name: 'Default', token: '--mlgm-radius-default', value: '16px (mobile-native)' },
      { name: 'Small',   token: '--mlgm-radius-sm',      value: '8px' },
      { name: 'Pill',    token: '--mlgm-radius-pill',    value: '9999px' },
    ],
    icons: [
      { name: 'SM', token: '--mlgm-icon-sm', value: '16px' },
      { name: 'MD', token: '--mlgm-icon-md', value: '20px (default)' },
      { name: 'LG', token: '--mlgm-icon-lg', value: '24px' },
    ],
  },
  {
    id: 'ulagellam',
    label: 'Ulagellam',
    prefix: 'ulge',
    description: 'Mobile-only app — React Native, iOS, Android',
    platforms: ['React Native', 'iOS Swift', 'Android XML'],
    surface: 'light',
    colors: [
      { name: 'Primary',              token: '--ulge-color-primary',              value: '#40AAD4', role: 'Placeholder — confirm at design kickoff' },
      { name: 'Accent',               token: '--ulge-color-accent',               value: '#E07722', role: 'Highlights' },
      { name: 'Background',           token: '--ulge-color-background',           value: '#ffffff', role: 'Screen surface' },
      { name: 'Background Secondary', token: '--ulge-color-background-secondary', value: '#F9FAFB', role: 'Cards' },
      { name: 'Foreground',           token: '--ulge-color-foreground',           value: '#1F2937', role: 'Body text' },
      { name: 'Foreground Secondary', token: '--ulge-color-foreground-secondary', value: '#6B7280', role: 'Captions' },
      { name: 'Border',               token: '--ulge-color-border',               value: '#E5E7EB', role: 'Dividers' },
      { name: 'Success',              token: '--ulge-color-success',              value: '#16A34A', role: 'Positive states' },
      { name: 'Danger',               token: '--ulge-color-danger',               value: '#DC2626', role: 'Errors' },
    ],
    typography: [
      { name: 'Base size',      token: '--ulge-font-size-base',      value: '16px' },
      { name: 'Body weight',    token: '--ulge-font-weight-body',    value: '400' },
      { name: 'Heading weight', token: '--ulge-font-weight-heading', value: '600' },
    ],
    radius: [
      { name: 'Default', token: '--ulge-radius-default', value: '16px' },
      { name: 'Small',   token: '--ulge-radius-sm',      value: '8px' },
      { name: 'Pill',    token: '--ulge-radius-pill',    value: '9999px' },
    ],
    icons: [
      { name: 'SM', token: '--ulge-icon-sm', value: '16px' },
      { name: 'MD', token: '--ulge-icon-md', value: '20px (default)' },
      { name: 'LG', token: '--ulge-icon-lg', value: '24px' },
    ],
  },
  {
    id: 'ilakh',
    label: 'Ilakh',
    prefix: 'ilkh',
    description: 'Web and mobile — mobile-first approach',
    platforms: ['Web CSS', 'React Native', 'iOS Swift', 'Android XML'],
    surface: 'light',
    colors: [
      { name: 'Primary',              token: '--ilkh-color-primary',              value: '#40AAD4', role: 'Placeholder — confirm at design kickoff' },
      { name: 'Accent',               token: '--ilkh-color-accent',               value: '#E07722', role: 'Highlights' },
      { name: 'Background',           token: '--ilkh-color-background',           value: '#ffffff', role: 'Page / screen surface' },
      { name: 'Background Secondary', token: '--ilkh-color-background-secondary', value: '#F9FAFB', role: 'Cards' },
      { name: 'Foreground',           token: '--ilkh-color-foreground',           value: '#1F2937', role: 'Body text' },
      { name: 'Foreground Secondary', token: '--ilkh-color-foreground-secondary', value: '#6B7280', role: 'Captions' },
      { name: 'Border',               token: '--ilkh-color-border',               value: '#E5E7EB', role: 'Dividers' },
      { name: 'Success',              token: '--ilkh-color-success',              value: '#16A34A', role: 'Positive states' },
      { name: 'Warning',              token: '--ilkh-color-warning',              value: '#D97706', role: 'Caution' },
      { name: 'Danger',               token: '--ilkh-color-danger',               value: '#DC2626', role: 'Errors' },
    ],
    typography: [
      { name: 'Base size',      token: '--ilkh-font-size-base',      value: '16px (mobile-first)' },
      { name: 'Body weight',    token: '--ilkh-font-weight-body',    value: '400' },
      { name: 'Heading weight', token: '--ilkh-font-weight-heading', value: '500' },
    ],
    radius: [
      { name: 'Default', token: '--ilkh-radius-default', value: '10px' },
      { name: 'Small',   token: '--ilkh-radius-sm',      value: '8px' },
      { name: 'Large',   token: '--ilkh-radius-lg',      value: '16px' },
      { name: 'Pill',    token: '--ilkh-radius-pill',    value: '9999px' },
    ],
    icons: [
      { name: 'SM', token: '--ilkh-icon-sm', value: '16px' },
      { name: 'MD', token: '--ilkh-icon-md', value: '20px (default)' },
      { name: 'LG', token: '--ilkh-icon-lg', value: '24px' },
    ],
  },
```

### 5B — Update Yakaizen entry to include widgets in platforms array

Find the Yakaizen product entry and update `platforms`:

```ts
// Before
platforms: ['Web CSS', 'React Native', 'iOS Swift', 'Android XML'],

// After
platforms: ['React Native', 'iOS Swift', 'Android XML', 'watchOS', 'iOS WidgetKit', 'Android Glance'],
```

Also update the description:
```ts
description: 'Health and wellness — mobile, watch, and app widgets',
```

### 5C — Update platform availability matrix

Replace the existing `platformMatrix` array with:

```ts
const platformMatrix = [
  { product: 'Aumraa',          web: true,  rn: false, ios: false, android: false, watch: false, widgets: false },
  { product: 'Technocracy',     web: true,  rn: false, ios: false, android: false, watch: false, widgets: false },
  { product: 'Lemniscate',      web: true,  rn: false, ios: false, android: false, watch: false, widgets: false },
  { product: 'Maligai Manager', web: true,  rn: true,  ios: true,  android: true,  watch: false, widgets: false },
  { product: 'Ulagellam',       web: false, rn: true,  ios: true,  android: true,  watch: false, widgets: false },
  { product: 'Ilakh',           web: true,  rn: true,  ios: true,  android: true,  watch: false, widgets: false },
  { product: 'Yakaizen',        web: false, rn: true,  ios: true,  android: true,  watch: true,  widgets: true  },
]
```

### 5D — Add widgets column to the platform table in the JSX

In the table `<thead>`, add after the watchOS column:
```tsx
<th className="text-center px-4 py-3 text-xs font-medium text-muted-foreground">Widgets</th>
```

In each table `<tbody>` row, add after the watch cell:
```tsx
<td className="px-4 py-3 text-center"><StatusDot active={row.widgets} label="widgets" /></td>
```

### 5E — Add placeholder badge for unstarted products

Add a helper just before the `products.map()` in the Tabs section:

```tsx
const isPlaceholder = (id: string) =>
  ['maligai', 'ulagellam', 'ilakh', 'yakaizen'].includes(id)
```

Then in the TabsTrigger for each product, show a badge for placeholder products:

```tsx
<TabsTrigger key={p.id} value={p.id} className="flex items-center gap-2">
  {p.label}
  {isPlaceholder(p.id) && (
    <Badge variant="outline" className="text-[10px] py-0 h-4 text-muted-foreground">
      Pending kickoff
    </Badge>
  )}
</TabsTrigger>
```

---

## Section 6 — Update README.md

Replace `~/Breathe Design system/README.md` with:

```md
# Breathe — Aumraa Design System

Single source of truth for all visual decisions across every Aumraa Technologies product.

## Products

| Product | Prefix | Web | RN | iOS | Android | Watch | Widgets | Status |
|---|---|---|---|---|---|---|---|---|
| Aumraa | `amra` | ✅ | — | — | — | — | — | Active |
| Technocracy | `thcy` | ✅ | — | — | — | — | — | Active |
| Lemniscate | `lmns` | ✅ | — | — | — | — | — | Active |
| Maligai Manager | `mlgm` | ✅ | ✅ | ✅ | ✅ | — | — | Pending kickoff |
| Ulagellam | `ulge` | — | ✅ | ✅ | ✅ | — | — | Pending kickoff |
| Ilakh | `ilkh` | ✅ | ✅ | ✅ | ✅ | — | — | Pending kickoff |
| Yakaizen | `ykai` | — | ✅ | ✅ | ✅ | ✅ | ✅ | Pending kickoff (Oct 2026) |

## Token pipeline

All tokens are defined once in JSON and built by Style Dictionary
into platform-specific outputs automatically.

```bash
pnpm tokens        # build all token outputs for all 7 products
pnpm tokens:watch  # rebuild on change
pnpm dev           # run documentation site
pnpm build         # production build of docs site
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
├── dist/                 ← generated outputs — commit these, never edit
│   ├── web/              ← CSS custom properties
│   ├── react-native/     ← JS/TS objects
│   ├── ios/              ← Swift classes
│   ├── android/          ← XML resources
│   ├── watchos/          ← Swift (watchOS)
│   └── widgets/          ← WidgetKit Swift + Glance Kotlin
└── sd.config.js          ← Style Dictionary config
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
```

---

## Section 7 — Final build and verify

```bash
cd ~/Breathe\ Design\ system

# Full token build
pnpm tokens

# Full docs build
pnpm build

# Run and visually verify
pnpm dev
```

**Verify in browser (localhost:5173 or 5174):**

- Foundations → Design Tokens page loads
- All 7 product tabs visible in the tab bar
- Maligai Manager, Ulagellam, Ilakh, Yakaizen show "Pending kickoff" badges
- Platform matrix table shows 7 rows with correct checkmarks
- Widgets column present in platform matrix
- Lemniscate tab still shows correct token values with colour swatches

**Final grep checks:**

```bash
# thcy rename confirmed
grep "thcy" ~/Breathe\ Design\ system/tokens/dist/web/technocracy.css | wc -l
# Should be > 0

grep -- "--tech-" ~/Breathe\ Design\ system/tokens/dist/web/technocracy.css | wc -l
# Should be 0

# All 5 web CSS files present
ls ~/Breathe\ Design\ system/tokens/dist/web/
# aumraa.css  technocracy.css  lemniscate.css  maligai.css  ilakh.css

# All 4 RN token files present
ls ~/Breathe\ Design\ system/tokens/dist/react-native/
# maligai.ts  ulagellam.ts  ilakh.ts  yakaizen.ts

# Yakaizen-specific outputs
ls ~/Breathe\ Design\ system/tokens/dist/watchos/
# YakaizenWatchTokens.swift

ls ~/Breathe\ Design\ system/tokens/dist/widgets/ios/
# YakaizenWidgetTokens.swift
```

---

## Section 8 — Commit and push

```bash
cd ~/Breathe\ Design\ system

git add .
git commit -m "feat: all 7 products added to token pipeline

- Rename Technocracy prefix: tech → thcy
- Add Maligai Manager (mlgm): web + RN + iOS + Android
- Add Ulagellam (ulge): RN + iOS + Android only
- Add Ilakh (ilkh): web + RN + iOS + Android, mobile-first
- Extend Yakaizen (ykai): add watchOS + widget outputs
- Update Design Tokens page: all 7 tabs, platform matrix with widgets column
- Update README with full product × platform matrix"

git push origin main
```

---

## What this does NOT do

- Does not update Lemniscate's `breathe-tokens.css` (unchanged — lemniscate tokens unchanged)
- Does not configure any new product repos (done when each product starts)
- Does not set final brand colours for pending products (done at each product's design kickoff)
- Does not build component libraries for new products (done per-product as they start)

---

## Output summary

After this task, Breathe has:

```
7 products defined in JSON source
7 sets of token outputs in dist/
5 web CSS files (aumraa, technocracy, lemniscate, maligai, ilakh)
4 RN token files (maligai, ulagellam, ilakh, yakaizen)
4 iOS Swift files
4 Android XML sets
1 watchOS Swift file (yakaizen)
1 widget iOS Swift + 1 widget Android XML (yakaizen)
Design Tokens page: 7 tabs, full platform matrix
```

When a new product kicks off:
1. Update its JSON in `tokens/src/`
2. Replace placeholder hex with confirmed brand values
3. Run `pnpm tokens`
4. Push
5. Product repo copies its dist file

---

*Breathe foundation complete — all 7 Aumraa products represented.*
