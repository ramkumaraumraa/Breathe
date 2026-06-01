# Step 3 — Style Dictionary + Design Tokens Page + GitHub + Lemniscate Rewire

> **Agent instructions:** Read this entire file before running any command.
> This step has six sub-tasks (3A → 3F). Complete them in strict order.
> Do not proceed to the next sub-task until the current one is verified.
> This is the most significant step — take checkpoints seriously.

---

## ⚠️ Path Reference — Same as Step 2

| Reference | Full path |
|---|---|
| **Breathe repo** (you are working here) | `~/Breathe Design system/` |
| **Lemniscate app repo** | `~/Lemniscate/Dev/lemniscate/` |
| **breathe-extract folder** | `~/Lemniscate/Dev/breathe-extract/` |

Wherever this file says `breathe/` it means `~/Breathe Design system/`.
Wherever this file says `lemniscate/` it means `~/Lemniscate/Dev/lemniscate/`.

---

## Context

Steps 1 and 2 are complete:
- Lemniscate components and tokens extracted into breathe-extract/
- Breathe running locally with two-layer token architecture (global.css → product alias CSS)
- shadcn bridge in theme.css consuming lmns-- tokens
- Build verified passing, HTTP 200 confirmed

Step 3 does the following in order:
1. **3A** — Install Style Dictionary and convert hand-written CSS token files → JSON source
2. **3B** — Wire Style Dictionary build to auto-generate `dist/web/` CSS files
3. **3C** — Verify generated CSS output is identical to what we hand-wrote
4. **3D** — Build the Design Tokens documentation page inside Breathe
5. **3E** — Push Breathe to GitHub as `aumraa/breathe`
6. **3F** — Rewire Lemniscate to import tokens from Breathe

---

## Sub-task 3A — Install Style Dictionary + Create JSON Token Source

### Install

```bash
cd ~/Breathe\ Design\ system
pnpm add -D style-dictionary
```

### Create the token source folder

```bash
mkdir -p ~/Breathe\ Design\ system/tokens/src
```

### Create `tokens/src/global.json`

This is the raw palette — no product meaning, just named values.

```json
{
  "color": {
    "blue": {
      "300": { "value": "#6EC6E6", "type": "color", "comment": "Light blue — hover states" },
      "400": { "value": "#40AAD4", "type": "color", "comment": "Sky blue — Lemniscate primary" },
      "500": { "value": "#2B7BC5", "type": "color", "comment": "Mid blue — dark primary" },
      "700": { "value": "#1C60C1", "type": "color", "comment": "Dark blue — secondary, gradients" },
      "900": { "value": "#0F3A7A", "type": "color", "comment": "Deep navy" }
    },
    "orange": {
      "300": { "value": "#F0A05A", "type": "color", "comment": "Light orange" },
      "500": { "value": "#E07722", "type": "color", "comment": "Brand orange — roof tip accent" },
      "700": { "value": "#B55A10", "type": "color", "comment": "Dark orange" }
    },
    "neutral": {
      "white":  { "value": "#ffffff", "type": "color" },
      "50":     { "value": "#F9FAFB", "type": "color" },
      "100":    { "value": "#F3F4F6", "type": "color" },
      "200":    { "value": "#E5E7EB", "type": "color" },
      "300":    { "value": "#D1D5DB", "type": "color" },
      "400":    { "value": "#9CA3AF", "type": "color" },
      "500":    { "value": "#6B7280", "type": "color" },
      "600":    { "value": "#4B5563", "type": "color" },
      "700":    { "value": "#374151", "type": "color" },
      "800":    { "value": "#1F2937", "type": "color" },
      "900":    { "value": "#111827", "type": "color" },
      "black":  { "value": "#000000", "type": "color" }
    },
    "status": {
      "success":       { "value": "#16A34A", "type": "color" },
      "successLight":  { "value": "#DCFCE7", "type": "color" },
      "successDark":   { "value": "#14532D", "type": "color" },
      "warning":       { "value": "#D97706", "type": "color" },
      "warningLight":  { "value": "#FEF3C7", "type": "color" },
      "warningDark":   { "value": "#92400E", "type": "color" },
      "danger":        { "value": "#DC2626", "type": "color" },
      "dangerLight":   { "value": "#FEE2E2", "type": "color" },
      "dangerDark":    { "value": "#7F1D1D", "type": "color" },
      "info":          { "value": "#0284C7", "type": "color" },
      "infoLight":     { "value": "#E0F2FE", "type": "color" },
      "infoDark":      { "value": "#0C4A6E", "type": "color" }
    }
  },
  "font": {
    "family": {
      "sans": { "value": "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", "type": "fontFamily" },
      "mono": { "value": "JetBrains Mono, Fira Code, Courier New, monospace", "type": "fontFamily" }
    },
    "size": {
      "2xs":  { "value": "10", "type": "dimension", "comment": "0.625rem" },
      "xs":   { "value": "12", "type": "dimension" },
      "sm":   { "value": "14", "type": "dimension" },
      "base": { "value": "16", "type": "dimension" },
      "lg":   { "value": "18", "type": "dimension" },
      "xl":   { "value": "20", "type": "dimension" },
      "2xl":  { "value": "24", "type": "dimension" },
      "3xl":  { "value": "30", "type": "dimension" },
      "4xl":  { "value": "36", "type": "dimension" }
    },
    "weight": {
      "normal":   { "value": "400", "type": "fontWeight" },
      "medium":   { "value": "500", "type": "fontWeight" },
      "semibold": { "value": "600", "type": "fontWeight" },
      "bold":     { "value": "700", "type": "fontWeight" }
    }
  },
  "spacing": {
    "0":  { "value": "0",    "type": "dimension" },
    "1":  { "value": "4",    "type": "dimension" },
    "2":  { "value": "8",    "type": "dimension" },
    "3":  { "value": "12",   "type": "dimension" },
    "4":  { "value": "16",   "type": "dimension" },
    "5":  { "value": "20",   "type": "dimension" },
    "6":  { "value": "24",   "type": "dimension" },
    "8":  { "value": "32",   "type": "dimension" },
    "10": { "value": "40",   "type": "dimension" },
    "12": { "value": "48",   "type": "dimension" },
    "16": { "value": "64",   "type": "dimension" }
  },
  "radius": {
    "none": { "value": "0",    "type": "dimension" },
    "sm":   { "value": "4",    "type": "dimension" },
    "md":   { "value": "8",    "type": "dimension" },
    "lg":   { "value": "10",   "type": "dimension", "comment": "Lemniscate default" },
    "xl":   { "value": "16",   "type": "dimension" },
    "full": { "value": "9999", "type": "dimension" }
  },
  "shadow": {
    "xs": { "value": "0 1px 2px rgba(0,0,0,0.05)",                                         "type": "shadow" },
    "sm": { "value": "0 1px 3px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.06)",            "type": "shadow" },
    "md": { "value": "0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)",            "type": "shadow" },
    "lg": { "value": "0 10px 15px rgba(0,0,0,0.10), 0 4px 6px rgba(0,0,0,0.05)",          "type": "shadow" },
    "xl": { "value": "0 20px 25px rgba(0,0,0,0.10), 0 10px 10px rgba(0,0,0,0.04)",        "type": "shadow" }
  },
  "icon": {
    "xs": { "value": "12", "type": "dimension" },
    "sm": { "value": "16", "type": "dimension" },
    "md": { "value": "20", "type": "dimension" },
    "lg": { "value": "24", "type": "dimension" },
    "xl": { "value": "32", "type": "dimension" }
  },
  "duration": {
    "fast":   { "value": "100", "type": "duration" },
    "normal": { "value": "200", "type": "duration" },
    "slow":   { "value": "300", "type": "duration" }
  }
}
```

---

### Create `tokens/src/lemniscate.json`

```json
{
  "lmns": {
    "color": {
      "primary":              { "value": "{color.blue.400}",     "type": "color" },
      "primaryDark":          { "value": "{color.blue.700}",     "type": "color" },
      "primaryForeground":    { "value": "{color.neutral.white}", "type": "color" },
      "secondary":            { "value": "{color.blue.700}",     "type": "color" },
      "secondaryForeground":  { "value": "{color.neutral.white}", "type": "color" },
      "accent":               { "value": "{color.orange.500}",   "type": "color" },
      "accentForeground":     { "value": "{color.neutral.white}", "type": "color" },
      "background":           { "value": "{color.neutral.white}", "type": "color" },
      "backgroundSecondary":  { "value": "{color.neutral.50}",   "type": "color" },
      "backgroundTertiary":   { "value": "{color.neutral.100}",  "type": "color" },
      "foreground":           { "value": "{color.neutral.800}",  "type": "color" },
      "foregroundSecondary":  { "value": "{color.neutral.500}",  "type": "color" },
      "foregroundTertiary":   { "value": "{color.neutral.400}",  "type": "color" },
      "border":               { "value": "{color.neutral.200}",  "type": "color" },
      "borderHover":          { "value": "{color.neutral.300}",  "type": "color" },
      "success":              { "value": "{color.status.success}", "type": "color" },
      "warning":              { "value": "{color.status.warning}", "type": "color" },
      "danger":               { "value": "{color.status.danger}",  "type": "color" },
      "info":                 { "value": "{color.status.info}",    "type": "color" },
      "gradientStart":        { "value": "{color.blue.400}",     "type": "color" },
      "gradientEnd":          { "value": "{color.blue.700}",     "type": "color" }
    },
    "font": {
      "sizeBase":       { "value": "{font.size.base}",    "type": "dimension" },
      "weightBody":     { "value": "{font.weight.normal}", "type": "fontWeight" },
      "weightHeading":  { "value": "{font.weight.medium}", "type": "fontWeight" }
    },
    "spacing": {
      "pagePadding":  { "value": "{spacing.6}", "type": "dimension" },
      "cardPadding":  { "value": "{spacing.6}", "type": "dimension" },
      "sectionGap":   { "value": "{spacing.8}", "type": "dimension" }
    },
    "radius": {
      "default": { "value": "{radius.lg}", "type": "dimension" },
      "sm":      { "value": "{radius.md}", "type": "dimension" },
      "lg":      { "value": "{radius.xl}", "type": "dimension" },
      "pill":    { "value": "{radius.full}", "type": "dimension" }
    },
    "shadow": {
      "card":     { "value": "{shadow.sm}", "type": "shadow" },
      "modal":    { "value": "{shadow.lg}", "type": "shadow" },
      "dropdown": { "value": "{shadow.md}", "type": "shadow" }
    },
    "icon": {
      "xs": { "value": "{icon.xs}", "type": "dimension" },
      "sm": { "value": "{icon.sm}", "type": "dimension" },
      "md": { "value": "{icon.md}", "type": "dimension" },
      "lg": { "value": "{icon.lg}", "type": "dimension" }
    }
  }
}
```

---

### Create `tokens/src/technocracy.json`

```json
{
  "tech": {
    "color": {
      "primary":              { "value": "{color.blue.400}",     "type": "color" },
      "primaryForeground":    { "value": "{color.neutral.white}", "type": "color" },
      "accent":               { "value": "{color.orange.500}",   "type": "color" },
      "accentForeground":     { "value": "{color.neutral.white}", "type": "color" },
      "background":           { "value": "{color.neutral.900}",  "type": "color" },
      "backgroundSecondary":  { "value": "{color.neutral.800}",  "type": "color" },
      "backgroundTertiary":   { "value": "{color.neutral.700}",  "type": "color" },
      "sidebar":              { "value": "#111827",               "type": "color" },
      "sidebarForeground":    { "value": "{color.neutral.100}",  "type": "color" },
      "foreground":           { "value": "{color.neutral.50}",   "type": "color" },
      "foregroundSecondary":  { "value": "{color.neutral.400}",  "type": "color" },
      "foregroundTertiary":   { "value": "{color.neutral.500}",  "type": "color" },
      "border":               { "value": "{color.neutral.700}",  "type": "color" },
      "borderHover":          { "value": "{color.neutral.600}",  "type": "color" },
      "success":              { "value": "{color.status.success}", "type": "color" },
      "warning":              { "value": "{color.status.warning}", "type": "color" },
      "danger":               { "value": "{color.status.danger}",  "type": "color" },
      "info":                 { "value": "{color.status.info}",    "type": "color" }
    },
    "font": {
      "sizeBase":      { "value": "{font.size.sm}",    "type": "dimension",  "comment": "14px — denser admin UI" },
      "weightBody":    { "value": "{font.weight.normal}", "type": "fontWeight" },
      "weightHeading": { "value": "{font.weight.medium}", "type": "fontWeight" }
    },
    "spacing": {
      "pagePadding": { "value": "{spacing.6}", "type": "dimension" },
      "cardPadding": { "value": "{spacing.4}", "type": "dimension", "comment": "Tighter than Lemniscate" },
      "sectionGap":  { "value": "{spacing.6}", "type": "dimension" }
    },
    "radius": {
      "default": { "value": "{radius.md}", "type": "dimension" },
      "sm":      { "value": "{radius.sm}", "type": "dimension" },
      "lg":      { "value": "{radius.lg}", "type": "dimension" }
    },
    "shadow": {
      "card":     { "value": "{shadow.xs}", "type": "shadow" },
      "modal":    { "value": "{shadow.xl}", "type": "shadow" },
      "dropdown": { "value": "{shadow.lg}", "type": "shadow" }
    },
    "icon": {
      "sm": { "value": "{icon.sm}", "type": "dimension", "comment": "16px default for dense UI" },
      "md": { "value": "{icon.md}", "type": "dimension" },
      "lg": { "value": "{icon.lg}", "type": "dimension" }
    }
  }
}
```

---

### Create `tokens/src/aumraa.json`

```json
{
  "amra": {
    "color": {
      "primary":           { "value": "{color.blue.700}",     "type": "color" },
      "primaryForeground": { "value": "{color.neutral.white}", "type": "color" },
      "accent":            { "value": "{color.orange.500}",   "type": "color" },
      "accentForeground":  { "value": "{color.neutral.white}", "type": "color" },
      "background":        { "value": "{color.neutral.white}", "type": "color" },
      "foreground":        { "value": "{color.neutral.900}",  "type": "color" },
      "gradientStart":     { "value": "{color.blue.400}",     "type": "color" },
      "gradientEnd":       { "value": "{color.blue.700}",     "type": "color" }
    },
    "font": {
      "sizeBase":      { "value": "{font.size.base}",       "type": "dimension" },
      "weightHeading": { "value": "{font.weight.semibold}",  "type": "fontWeight" }
    },
    "icon": {
      "md": { "value": "{icon.md}", "type": "dimension" }
    }
  }
}
```

---

### Create `tokens/src/yakaizen.json`

> Placeholder for October. Tokens are minimal stubs — populated when Yakaizen design starts.

```json
{
  "ykai": {
    "color": {
      "primary":    { "value": "{color.blue.400}", "type": "color", "comment": "Placeholder — confirm at Yakaizen design kickoff" },
      "accent":     { "value": "{color.orange.500}", "type": "color" },
      "background": { "value": "{color.neutral.white}", "type": "color" },
      "foreground": { "value": "{color.neutral.900}", "type": "color" }
    },
    "font": {
      "sizeBase": { "value": "{font.size.sm}", "type": "dimension", "comment": "Smaller for watch — confirm at kickoff" }
    },
    "icon": {
      "sm": { "value": "{icon.sm}", "type": "dimension" },
      "md": { "value": "{icon.md}", "type": "dimension" }
    }
  }
}
```

---

## Sub-task 3B — Wire Style Dictionary Build

### Create `tokens/sd.config.js`

```js
// tokens/sd.config.js
// Style Dictionary configuration
// Reads from tokens/src/*.json → generates tokens/dist/ outputs

import StyleDictionary from 'style-dictionary';

const products = [
  { name: 'lemniscate', prefix: 'lmns', platforms: ['web'] },
  { name: 'technocracy', prefix: 'tech', platforms: ['web'] },
  { name: 'aumraa',      prefix: 'amra', platforms: ['web'] },
  { name: 'yakaizen',    prefix: 'ykai', platforms: ['web', 'reactNative', 'ios', 'android'] },
];

for (const product of products) {

  const config = {
    source: [
      'tokens/src/global.json',
      `tokens/src/${product.name}.json`,
    ],

    platforms: {},
  };

  // ── Web (CSS custom properties) ───────────────────────────────────────────
  if (product.platforms.includes('web')) {
    config.platforms.web = {
      transformGroup: 'css',
      prefix: product.prefix,
      buildPath: `tokens/dist/web/`,
      files: [
        {
          destination: `${product.name}.css`,
          format: 'css/variables',
          selector: ':root',
          filter: (token) => token.path[0] === product.prefix
            || token.path[0] === 'color'
            || token.path[0] === 'font'
            || token.path[0] === 'spacing'
            || token.path[0] === 'radius'
            || token.path[0] === 'shadow'
            || token.path[0] === 'icon'
            || token.path[0] === 'duration',
        },
      ],
    };
  }

  // ── React Native (JS/TS object) ───────────────────────────────────────────
  if (product.platforms.includes('reactNative')) {
    config.platforms.reactNative = {
      transformGroup: 'js',
      buildPath: `tokens/dist/react-native/`,
      files: [
        {
          destination: `${product.name}.ts`,
          format: 'javascript/es6',
          filter: (token) => token.path[0] === product.prefix,
        },
      ],
    };
  }

  // ── iOS (Swift) ───────────────────────────────────────────────────────────
  if (product.platforms.includes('ios')) {
    config.platforms.ios = {
      transformGroup: 'ios-swift',
      buildPath: `tokens/dist/ios/`,
      files: [
        {
          destination: `${product.name.charAt(0).toUpperCase() + product.name.slice(1)}Tokens.swift`,
          format: 'ios-swift/class.swift',
          filter: (token) => token.path[0] === product.prefix,
          options: { className: `${product.name.charAt(0).toUpperCase() + product.name.slice(1)}Tokens` },
        },
      ],
    };
  }

  // ── Android (XML) ─────────────────────────────────────────────────────────
  if (product.platforms.includes('android')) {
    config.platforms.android = {
      transformGroup: 'android',
      buildPath: `tokens/dist/android/${product.name}/`,
      files: [
        {
          destination: 'colors.xml',
          format: 'android/colors',
          filter: (token) => token.path[0] === product.prefix
            && token.attributes?.category === 'color',
        },
      ],
    };
  }

  const sd = new StyleDictionary(config);
  await sd.buildAllPlatforms();
}

console.log('\n✅ Style Dictionary build complete — all token outputs generated.\n');
```

### Create the dist folder structure

```bash
mkdir -p ~/Breathe\ Design\ system/tokens/dist/web
mkdir -p ~/Breathe\ Design\ system/tokens/dist/react-native
mkdir -p ~/Breathe\ Design\ system/tokens/dist/ios
mkdir -p ~/Breathe\ Design\ system/tokens/dist/android
```

### Add build script to `package.json`

Open `~/Breathe Design system/package.json` and add to the `scripts` block:

```json
"tokens": "node tokens/sd.config.js",
"tokens:watch": "node --watch tokens/sd.config.js"
```

### Run the first build

```bash
cd ~/Breathe\ Design\ system
pnpm tokens
```

Expected output:

```
✅ Style Dictionary build complete — all token outputs generated.
```

Confirm `tokens/dist/web/` now contains:
`lemniscate.css`, `technocracy.css`, `aumraa.css`, `yakaizen.css`

---

## Sub-task 3C — Verify Web Output + Switch Breathe to Generated CSS

### Verify the generated CSS

Open `tokens/dist/web/lemniscate.css` and confirm it contains:

```css
:root {
  --lmns-color-primary: #40AAD4;
  --lmns-color-accent: #E07722;
  /* ... all lmns-- tokens resolved to hex values ... */
}
```

> Note: Style Dictionary will use camelCase → kebab-case conversion.
> `lmns.color.primary` → `--lmns-color-primary`
> This is the standard CSS output format.

### Update `tailwind.css` to import generated file

Open `~/Breathe Design system/src/styles/tailwind.css` and replace the token import line:

```css
/* Before */
@import './tokens/index.css';

/* After */
@import '../../tokens/dist/web/lemniscate.css';
```

> The hand-written token CSS files in `src/styles/tokens/` are now superseded by the
> generated output. Keep them as reference — do not delete yet. They will be archived
> in Step 3E before the GitHub push.

### Update `theme.css` variable names to match generated output

Style Dictionary generates `--lmns-color-primary` (with `color` in the path).
Our bridge currently uses `--lmns-primary` (without `color`).

Open `~/Breathe Design system/src/styles/theme.css` and update the bridge:

```css
:root {
  --background:           var(--lmns-color-background);
  --foreground:           var(--lmns-color-foreground);
  --card:                 var(--lmns-color-background);
  --card-foreground:      var(--lmns-color-foreground);
  --popover:              var(--lmns-color-background);
  --popover-foreground:   var(--lmns-color-foreground);
  --primary:              var(--lmns-color-primary);
  --primary-foreground:   var(--lmns-color-primary-foreground);
  --secondary:            var(--lmns-color-background-secondary);
  --secondary-foreground: var(--lmns-color-foreground);
  --muted:                var(--lmns-color-background-tertiary);
  --muted-foreground:     var(--lmns-color-foreground-secondary);
  --accent:               var(--lmns-color-accent);
  --accent-foreground:    var(--lmns-color-accent-foreground);
  --destructive:          var(--lmns-color-danger);
  --destructive-foreground: var(--color-neutral-white);
  --border:               var(--lmns-color-border);
  --input:                var(--lmns-color-background-secondary);
  --ring:                 var(--lmns-color-primary);
  --radius:               var(--lmns-radius-default);
  --sidebar:              var(--lmns-color-background-secondary);
  --sidebar-foreground:   var(--lmns-color-foreground);
  --sidebar-primary:      var(--lmns-color-primary);
  --sidebar-primary-foreground: var(--lmns-color-primary-foreground);
  --sidebar-accent:       var(--lmns-color-background-tertiary);
  --sidebar-accent-foreground: var(--lmns-color-foreground);
  --sidebar-border:       var(--lmns-color-border);
  --sidebar-ring:         var(--lmns-color-primary);
}
```

### Run dev and confirm

```bash
cd ~/Breathe\ Design\ system
pnpm dev
```

Open `http://127.0.0.1:5173` (or 5174) in browser.
Confirm buttons still render in Aumraa blue `#40AAD4`.
If they do, the Style Dictionary pipeline is end-to-end working.

---

## Sub-task 3D — Build the Design Tokens Page

### Create the route file

Create `~/Breathe Design system/src/app/pages/foundations/DesignTokensPage.tsx`:

```tsx
import { useState } from 'react'
import { PageHeader } from '@/app/components/shared/PageHeader'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/app/components/ui/tabs'
import { Badge } from '@/app/components/ui/badge'

// ─── Token data — sourced from JSON, displayed here ──────────────────────────

const products = [
  {
    id: 'lemniscate',
    label: 'Lemniscate',
    prefix: 'lmns',
    description: 'Community finance SaaS — light surfaces, blue primary',
    platforms: ['Web CSS'],
    surface: 'light',
    colors: [
      { name: 'Primary',             token: '--lmns-color-primary',             value: '#40AAD4', role: 'Buttons, links, interactive elements' },
      { name: 'Primary Dark',        token: '--lmns-color-primary-dark',        value: '#1C60C1', role: 'Hover states, gradients' },
      { name: 'Accent',              token: '--lmns-color-accent',              value: '#E07722', role: 'Highlights, logo roof tip, CTAs' },
      { name: 'Background',          token: '--lmns-color-background',          value: '#ffffff', role: 'Page surface' },
      { name: 'Background Secondary',token: '--lmns-color-background-secondary',value: '#F9FAFB', role: 'Cards, sidebars' },
      { name: 'Foreground',          token: '--lmns-color-foreground',          value: '#1F2937', role: 'Body text' },
      { name: 'Foreground Secondary',token: '--lmns-color-foreground-secondary',value: '#6B7280', role: 'Captions, metadata' },
      { name: 'Border',              token: '--lmns-color-border',              value: '#E5E7EB', role: 'Dividers, input borders' },
      { name: 'Success',             token: '--lmns-color-success',             value: '#16A34A', role: 'Positive states' },
      { name: 'Warning',             token: '--lmns-color-warning',             value: '#D97706', role: 'Caution states' },
      { name: 'Danger',              token: '--lmns-color-danger',              value: '#DC2626', role: 'Error, destructive actions' },
    ],
    typography: [
      { name: 'Base size',     token: '--lmns-font-size-base',     value: '16px' },
      { name: 'Body weight',   token: '--lmns-font-weight-body',   value: '400' },
      { name: 'Heading weight',token: '--lmns-font-weight-heading', value: '500' },
    ],
    radius: [
      { name: 'Default', token: '--lmns-radius-default', value: '10px' },
      { name: 'Small',   token: '--lmns-radius-sm',      value: '8px' },
      { name: 'Large',   token: '--lmns-radius-lg',      value: '16px' },
      { name: 'Pill',    token: '--lmns-radius-pill',    value: '9999px' },
    ],
    icons: [
      { name: 'XS', token: '--lmns-icon-xs', value: '12px' },
      { name: 'SM', token: '--lmns-icon-sm', value: '16px' },
      { name: 'MD', token: '--lmns-icon-md', value: '20px (default)' },
      { name: 'LG', token: '--lmns-icon-lg', value: '24px' },
    ],
  },
  {
    id: 'technocracy',
    label: 'Technocracy',
    prefix: 'tech',
    description: 'Aumraa admin dashboard — dark surfaces, dense UI',
    platforms: ['Web CSS'],
    surface: 'dark',
    colors: [
      { name: 'Primary',              token: '--tech-color-primary',              value: '#40AAD4', role: 'Interactive elements' },
      { name: 'Accent',               token: '--tech-color-accent',               value: '#E07722', role: 'Highlights, alerts' },
      { name: 'Background',           token: '--tech-color-background',           value: '#111827', role: 'Page surface (dark)' },
      { name: 'Background Secondary', token: '--tech-color-background-secondary', value: '#1F2937', role: 'Cards, panels' },
      { name: 'Sidebar',              token: '--tech-color-sidebar',              value: '#111827', role: 'Navigation sidebar' },
      { name: 'Foreground',           token: '--tech-color-foreground',           value: '#F9FAFB', role: 'Body text (on dark)' },
      { name: 'Foreground Secondary', token: '--tech-color-foreground-secondary', value: '#9CA3AF', role: 'Metadata, captions' },
      { name: 'Border',               token: '--tech-color-border',               value: '#374151', role: 'Dividers' },
      { name: 'Success',              token: '--tech-color-success',              value: '#16A34A', role: 'Positive states' },
      { name: 'Danger',               token: '--tech-color-danger',               value: '#DC2626', role: 'Errors, alerts' },
    ],
    typography: [
      { name: 'Base size',      token: '--tech-font-size-base',      value: '14px (denser)' },
      { name: 'Body weight',    token: '--tech-font-weight-body',    value: '400' },
      { name: 'Heading weight', token: '--tech-font-weight-heading', value: '500' },
    ],
    radius: [
      { name: 'Default', token: '--tech-radius-default', value: '8px' },
      { name: 'Small',   token: '--tech-radius-sm',      value: '4px' },
      { name: 'Large',   token: '--tech-radius-lg',      value: '10px' },
    ],
    icons: [
      { name: 'SM', token: '--tech-icon-sm', value: '16px (default)' },
      { name: 'MD', token: '--tech-icon-md', value: '20px' },
      { name: 'LG', token: '--tech-icon-lg', value: '24px' },
    ],
  },
  {
    id: 'aumraa',
    label: 'Aumraa',
    prefix: 'amra',
    description: 'Studio brand — marketing site and communications',
    platforms: ['Web CSS'],
    surface: 'light',
    colors: [
      { name: 'Primary',    token: '--amra-color-primary',    value: '#1C60C1', role: 'Studio brand primary' },
      { name: 'Accent',     token: '--amra-color-accent',     value: '#E07722', role: 'Brand accent' },
      { name: 'Background', token: '--amra-color-background', value: '#ffffff', role: 'Page surface' },
      { name: 'Foreground', token: '--amra-color-foreground', value: '#111827', role: 'Body text' },
      { name: 'Gradient Start', token: '--amra-color-gradient-start', value: '#40AAD4', role: 'Brand gradient' },
      { name: 'Gradient End',   token: '--amra-color-gradient-end',   value: '#1C60C1', role: 'Brand gradient' },
    ],
    typography: [
      { name: 'Base size',      token: '--amra-font-size-base',      value: '16px' },
      { name: 'Heading weight', token: '--amra-font-weight-heading', value: '600' },
    ],
    radius: [],
    icons: [
      { name: 'MD', token: '--amra-icon-md', value: '20px' },
    ],
  },
  {
    id: 'yakaizen',
    label: 'Yakaizen',
    prefix: 'ykai',
    description: 'Coming October 2026 — web, mobile, iOS, Android, watchOS',
    platforms: ['Web CSS', 'React Native', 'iOS Swift', 'Android XML'],
    surface: 'light',
    colors: [
      { name: 'Primary',    token: '--ykai-color-primary',    value: '#40AAD4', role: 'Placeholder — confirm at design kickoff' },
      { name: 'Accent',     token: '--ykai-color-accent',     value: '#E07722', role: 'Placeholder' },
      { name: 'Background', token: '--ykai-color-background', value: '#ffffff', role: 'Placeholder' },
      { name: 'Foreground', token: '--ykai-color-foreground', value: '#111827', role: 'Placeholder' },
    ],
    typography: [
      { name: 'Base size', token: '--ykai-font-size-base', value: '14px (watch — TBC)' },
    ],
    radius: [],
    icons: [
      { name: 'SM', token: '--ykai-icon-sm', value: '16px' },
      { name: 'MD', token: '--ykai-icon-md', value: '20px' },
    ],
  },
]

// ─── Platform availability matrix ─────────────────────────────────────────────

const platformMatrix = [
  { product: 'Lemniscate', web: true,  rn: false, ios: false, android: false, watch: false },
  { product: 'Technocracy',web: true,  rn: false, ios: false, android: false, watch: false },
  { product: 'Aumraa',     web: true,  rn: false, ios: false, android: false, watch: false },
  { product: 'Yakaizen',   web: true,  rn: true,  ios: true,  android: true,  watch: true  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function ColorSwatch({ value, name }: { value: string; name: string }) {
  const isDark = ['#111827', '#1F2937', '#374151'].includes(value)
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-8 h-8 rounded-md border border-border flex-shrink-0"
        style={{ backgroundColor: value }}
        title={value}
      />
    </div>
  )
}

function StatusDot({ active, label }: { active: boolean; label: string }) {
  return (
    <span className={`inline-flex items-center gap-1 text-xs ${active ? 'text-green-600' : 'text-muted-foreground'}`}>
      <span className={`w-2 h-2 rounded-full ${active ? 'bg-green-500' : 'bg-muted'}`} />
      {active ? '✓' : '—'}
    </span>
  )
}

function TokenBadge({ token }: { token: string }) {
  return (
    <code className="text-xs bg-muted px-2 py-0.5 rounded font-mono text-foreground-secondary">
      {token}
    </code>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DesignTokensPage() {
  const [activeProduct, setActiveProduct] = useState('lemniscate')
  const product = products.find(p => p.id === activeProduct)!

  return (
    <div className="space-y-12">
      <PageHeader
        title="Design Tokens"
        description="The single source of truth for every visual decision across all Aumraa products and platforms. Tokens are named, versioned, and distributed automatically to web, mobile, iOS, and Android."
      />

      {/* ── Section 1: Architecture ── */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-medium mb-1">How tokens are structured</h2>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Breathe uses a two-layer architecture. Raw values live in the global palette —
            named by what they <em>are</em>. Product aliases give them meaning —
            named by what they <em>do</em>. Components only ever reference the semantic layer.
            Change a product token once and every component across every platform updates.
          </p>
        </div>

        {/* Architecture diagram */}
        <div className="rounded-xl border border-border bg-muted/30 p-6 overflow-x-auto">
          <div className="flex items-start gap-4 min-w-[640px]">

            {/* Layer 1 */}
            <div className="flex-1 space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Layer 1 — Global palette</p>
              <div className="rounded-lg border border-border bg-background p-4 space-y-2">
                <p className="text-xs text-muted-foreground">Raw values. Named by what they <em>are</em>.</p>
                <div className="space-y-1">
                  {[
                    { label: '--color-blue-400', value: '#40AAD4' },
                    { label: '--color-orange-500', value: '#E07722' },
                    { label: '--radius-lg', value: '10px' },
                    { label: '--font-size-base', value: '16px' },
                  ].map(t => (
                    <div key={t.label} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm border border-border flex-shrink-0"
                        style={{ backgroundColor: t.value.startsWith('#') ? t.value : 'transparent' }} />
                      <code className="text-xs font-mono text-foreground-secondary">{t.label}</code>
                      <span className="text-xs text-muted-foreground ml-auto">{t.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex flex-col items-center pt-10 flex-shrink-0">
              <div className="text-muted-foreground text-xl">→</div>
              <p className="text-xs text-muted-foreground text-center mt-1 w-16">references</p>
            </div>

            {/* Layer 2 */}
            <div className="flex-1 space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Layer 2 — Product aliases</p>
              <div className="rounded-lg border border-border bg-background p-4 space-y-2">
                <p className="text-xs text-muted-foreground">Named by what they <em>do</em>. Prefixed per product.</p>
                <div className="space-y-1">
                  {[
                    { label: '--lmns-color-primary', ref: '--color-blue-400' },
                    { label: '--lmns-color-accent',  ref: '--color-orange-500' },
                    { label: '--lmns-radius-default',ref: '--radius-lg' },
                    { label: '--lmns-font-size-base',ref: '--font-size-base' },
                  ].map(t => (
                    <div key={t.label} className="flex flex-col">
                      <code className="text-xs font-mono text-primary">{t.label}</code>
                      <code className="text-xs font-mono text-muted-foreground pl-2">↳ {t.ref}</code>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex flex-col items-center pt-10 flex-shrink-0">
              <div className="text-muted-foreground text-xl">→</div>
              <p className="text-xs text-muted-foreground text-center mt-1 w-16">bridges to</p>
            </div>

            {/* shadcn bridge */}
            <div className="flex-1 space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">shadcn bridge</p>
              <div className="rounded-lg border border-border bg-background p-4 space-y-2">
                <p className="text-xs text-muted-foreground">Generic vars components read. Never change these.</p>
                <div className="space-y-1">
                  {[
                    { label: '--primary', ref: '--lmns-color-primary' },
                    { label: '--accent',  ref: '--lmns-color-accent' },
                    { label: '--radius',  ref: '--lmns-radius-default' },
                  ].map(t => (
                    <div key={t.label} className="flex flex-col">
                      <code className="text-xs font-mono text-foreground">{t.label}</code>
                      <code className="text-xs font-mono text-muted-foreground pl-2">↳ {t.ref}</code>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex flex-col items-center pt-10 flex-shrink-0">
              <div className="text-muted-foreground text-xl">→</div>
              <p className="text-xs text-muted-foreground text-center mt-1 w-16">consumed by</p>
            </div>

            {/* Component */}
            <div className="flex-1 space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Component</p>
              <div className="rounded-lg border border-border bg-background p-4 space-y-3">
                <p className="text-xs text-muted-foreground">Reads only generic vars. Never product prefixes.</p>
                <button className="w-full text-xs px-3 py-2 rounded-md font-medium text-white"
                  style={{ backgroundColor: '#40AAD4' }}>
                  Button
                </button>
                <code className="text-xs font-mono text-muted-foreground block">bg-primary → #40AAD4</code>
              </div>
            </div>
          </div>
        </div>

        {/* The cardinal rule */}
        <div className="rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30 p-4">
          <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
            Cardinal rule for developers
          </p>
          <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
            Never use raw hex values in product code. Always reference a token.
            If a token doesn't exist for what you need, add it to the JSON source and rebuild.
          </p>
        </div>
      </section>

      {/* ── Section 2: Token reference per product ── */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-medium mb-1">Token reference</h2>
          <p className="text-sm text-muted-foreground">
            Select a product to see its full token set. All values are resolved at build time
            by Style Dictionary from the JSON source in <code className="text-xs bg-muted px-1 rounded">tokens/src/</code>.
          </p>
        </div>

        <Tabs value={activeProduct} onValueChange={setActiveProduct}>
          <TabsList className="mb-6">
            {products.map(p => (
              <TabsTrigger key={p.id} value={p.id} className="flex items-center gap-2">
                {p.label}
                {p.id === 'yakaizen' && (
                  <Badge variant="outline" className="text-[10px] py-0 h-4">Oct 2026</Badge>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {products.map(p => (
            <TabsContent key={p.id} value={p.id} className="space-y-8">

              {/* Product header */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{p.description}</p>
                  <div className="flex gap-2 mt-2">
                    {p.platforms.map(pl => (
                      <Badge key={pl} variant="secondary" className="text-xs">{pl}</Badge>
                    ))}
                  </div>
                </div>
                <code className="text-sm font-mono bg-muted px-3 py-1.5 rounded-lg text-muted-foreground">
                  prefix: {p.prefix}--
                </code>
              </div>

              {/* Colors */}
              <div className="space-y-3">
                <h3 className="text-base font-medium">Colors</h3>
                <div className="rounded-lg border border-border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground w-8"></th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Name</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Token</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Value</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {p.colors.map((color, i) => (
                        <tr key={color.token} className={`border-b border-border last:border-0 ${i % 2 === 0 ? '' : 'bg-muted/20'}`}>
                          <td className="px-4 py-3">
                            <div className="w-6 h-6 rounded border border-border"
                              style={{ backgroundColor: color.value }} />
                          </td>
                          <td className="px-4 py-3 font-medium">{color.name}</td>
                          <td className="px-4 py-3"><TokenBadge token={color.token} /></td>
                          <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{color.value}</td>
                          <td className="px-4 py-3 text-xs text-muted-foreground">{color.role}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Typography */}
              {p.typography.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-base font-medium">Typography</h3>
                  <div className="rounded-lg border border-border overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-muted/50">
                          <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Name</th>
                          <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Token</th>
                          <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {p.typography.map((t, i) => (
                          <tr key={t.token} className={`border-b border-border last:border-0 ${i % 2 === 0 ? '' : 'bg-muted/20'}`}>
                            <td className="px-4 py-3 font-medium">{t.name}</td>
                            <td className="px-4 py-3"><TokenBadge token={t.token} /></td>
                            <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{t.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Radius + Icons side by side */}
              <div className="grid grid-cols-2 gap-6">
                {p.radius.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-base font-medium">Border Radius</h3>
                    <div className="rounded-lg border border-border overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border bg-muted/50">
                            <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Preview</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Token</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {p.radius.map((r, i) => (
                            <tr key={r.token} className={`border-b border-border last:border-0 ${i % 2 === 0 ? '' : 'bg-muted/20'}`}>
                              <td className="px-4 py-3">
                                <div className="w-8 h-8 bg-primary/20 border border-primary/40"
                                  style={{ borderRadius: r.value.includes('9999') ? '9999px' : r.value }} />
                              </td>
                              <td className="px-4 py-3"><TokenBadge token={r.token} /></td>
                              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{r.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {p.icons.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-base font-medium">Icon Sizes</h3>
                    <div className="rounded-lg border border-border overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border bg-muted/50">
                            <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Preview</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Token</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {p.icons.map((ic, i) => (
                            <tr key={ic.token} className={`border-b border-border last:border-0 ${i % 2 === 0 ? '' : 'bg-muted/20'}`}>
                              <td className="px-4 py-3">
                                <div className="bg-primary/20 rounded"
                                  style={{ width: ic.value.split('px')[0] + 'px', height: ic.value.split('px')[0] + 'px' }} />
                              </td>
                              <td className="px-4 py-3"><TokenBadge token={ic.token} /></td>
                              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{ic.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* ── Section 3: Platform availability ── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-medium mb-1">Platform availability</h2>
          <p className="text-sm text-muted-foreground">
            Style Dictionary builds token outputs for each platform automatically
            from the same JSON source. No manual sync required.
          </p>
        </div>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Product</th>
                <th className="text-center px-4 py-3 text-xs font-medium text-muted-foreground">Web CSS</th>
                <th className="text-center px-4 py-3 text-xs font-medium text-muted-foreground">React Native</th>
                <th className="text-center px-4 py-3 text-xs font-medium text-muted-foreground">iOS Swift</th>
                <th className="text-center px-4 py-3 text-xs font-medium text-muted-foreground">Android XML</th>
                <th className="text-center px-4 py-3 text-xs font-medium text-muted-foreground">watchOS</th>
              </tr>
            </thead>
            <tbody>
              {platformMatrix.map((row, i) => (
                <tr key={row.product} className={`border-b border-border last:border-0 ${i % 2 === 0 ? '' : 'bg-muted/20'}`}>
                  <td className="px-4 py-3 font-medium">{row.product}</td>
                  <td className="px-4 py-3 text-center"><StatusDot active={row.web} label="web" /></td>
                  <td className="px-4 py-3 text-center"><StatusDot active={row.rn} label="rn" /></td>
                  <td className="px-4 py-3 text-center"><StatusDot active={row.ios} label="ios" /></td>
                  <td className="px-4 py-3 text-center"><StatusDot active={row.android} label="android" /></td>
                  <td className="px-4 py-3 text-center"><StatusDot active={row.watch} label="watch" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Section 4: Developer usage ── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-medium mb-1">Using tokens in your app</h2>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Import the generated CSS file for your product. Then bridge product tokens
            to shadcn's generic variables in your app's <code className="text-xs bg-muted px-1 rounded">globals.css</code>.
            Components never reference product prefixes directly.
          </p>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-border overflow-hidden">
            <div className="px-4 py-2 border-b border-border bg-muted/50 flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Step 1 — Import your product token file</span>
              <Badge variant="outline" className="text-xs">globals.css</Badge>
            </div>
            <pre className="p-4 text-xs font-mono text-foreground overflow-x-auto bg-background">
{`/* For Lemniscate */
@import '@aumraa/breathe/tokens/dist/web/lemniscate.css';

/* For Technocracy */
@import '@aumraa/breathe/tokens/dist/web/technocracy.css';`}
            </pre>
          </div>

          <div className="rounded-lg border border-border overflow-hidden">
            <div className="px-4 py-2 border-b border-border bg-muted/50 flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Step 2 — Bridge to shadcn vars</span>
              <Badge variant="outline" className="text-xs">globals.css</Badge>
            </div>
            <pre className="p-4 text-xs font-mono text-foreground overflow-x-auto bg-background">
{`:root {
  /* Map your product tokens to shadcn's expected vars */
  --primary:    var(--lmns-color-primary);
  --accent:     var(--lmns-color-accent);
  --background: var(--lmns-color-background);
  --foreground: var(--lmns-color-foreground);
  --border:     var(--lmns-color-border);
  --radius:     var(--lmns-radius-default);
  /* ...and so on for all shadcn vars */
}`}
            </pre>
          </div>

          <div className="rounded-lg border border-border overflow-hidden">
            <div className="px-4 py-2 border-b border-border bg-muted/50 flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Step 3 — Use in components (never raw hex)</span>
              <Badge variant="outline" className="text-xs">component.tsx</Badge>
            </div>
            <pre className="p-4 text-xs font-mono text-foreground overflow-x-auto bg-background">
{`// ✅ Correct — references a token
<div className="bg-primary text-primary-foreground rounded-lg">

// ✅ Also correct — Tailwind reads the CSS var
<div style={{ color: 'var(--lmns-color-accent)' }}>

// ❌ Never do this — bypasses the token system
<div style={{ color: '#E07722' }}>`}
            </pre>
          </div>

          <div className="rounded-lg border border-border overflow-hidden">
            <div className="px-4 py-2 border-b border-border bg-muted/50">
              <span className="text-xs font-medium text-muted-foreground">Adding or changing a token</span>
            </div>
            <pre className="p-4 text-xs font-mono text-foreground overflow-x-auto bg-background">
{`# 1. Edit the JSON source in Breathe
tokens/src/lemniscate.json  ← add or update token here

# 2. Rebuild
cd ~/Breathe Design system
pnpm tokens

# 3. Commit and push the updated dist file
git add tokens/dist/web/lemniscate.css
git commit -m "tokens: update lemniscate primary"

# 4. Pull in your product repo
# (once Breathe is installed as a package — Step 3F)`}
            </pre>
          </div>
        </div>
      </section>

    </div>
  )
}
```

### Register the route

Open `~/Breathe Design system/src/routes.ts` and add the Design Tokens route
inside the Foundations section, between Colors and Typography:

```ts
import DesignTokensPage from './app/pages/foundations/DesignTokensPage'

// Inside the foundations routes array, after ColorsPage:
{
  path: '/foundations/design-tokens',
  component: DesignTokensPage,
  label: 'Design Tokens',
}
```

### Add to sidebar navigation

Open `~/Breathe Design system/src/app/components/layout/navData.ts`.
Find the Foundations section and add the Design Tokens entry between Colors and Typography:

```ts
{
  label: 'Design Tokens',
  path: '/foundations/design-tokens',
  icon: 'Layers',   // Lucide icon — Layers or Coins
}
```

### Verify the page

```bash
cd ~/Breathe\ Design\ system
pnpm dev
```

Navigate to Foundations → Design Tokens in the sidebar.
Confirm all four product tabs render, colour swatches display, and the architecture
diagram is visible without horizontal overflow on a 1440px screen.

---

## Sub-task 3E — Push to GitHub

### Archive the hand-written token CSS files

```bash
mkdir -p ~/Breathe\ Design\ system/src/styles/tokens/_archive
mv ~/Breathe\ Design\ system/src/styles/tokens/global.css \
   ~/Breathe\ Design\ system/src/styles/tokens/_archive/
mv ~/Breathe\ Design\ system/src/styles/tokens/lemniscate.css \
   ~/Breathe\ Design\ system/src/styles/tokens/_archive/
mv ~/Breathe\ Design\ system/src/styles/tokens/technocracy.css \
   ~/Breathe\ Design\ system/src/styles/tokens/_archive/
mv ~/Breathe\ Design\ system/src/styles/tokens/aumraa.css \
   ~/Breathe\ Design\ system/src/styles/tokens/_archive/
mv ~/Breathe\ Design\ system/src/styles/tokens/index.css \
   ~/Breathe\ Design\ system/src/styles/tokens/_archive/
```

### Create `.gitignore`

Create `~/Breathe Design system/.gitignore`:

```
node_modules/
dist/
.DS_Store
*.local
.env
.env.*
```

> Note: Do NOT add `tokens/dist/` to .gitignore.
> The generated token dist files must be committed — apps import from them.

### Create `README.md`

Create `~/Breathe Design system/README.md`:

```md
# Breathe — Aumraa Design System

Single source of truth for all Aumraa Technologies products.

## Products
| Product | Prefix | Platforms |
|---|---|---|
| Lemniscate | `lmns` | Web |
| Technocracy | `tech` | Web |
| Aumraa | `amra` | Web |
| Yakaizen | `ykai` | Web, RN, iOS, Android, watchOS (Oct 2026) |

## Token pipeline
Tokens are defined in `tokens/src/*.json` and built by Style Dictionary.

```bash
pnpm tokens        # build all token outputs
pnpm tokens:watch  # rebuild on change
pnpm dev           # run documentation site
```

## Structure
- `tokens/src/`     — JSON token source (edit here)
- `tokens/dist/`    — generated outputs per platform (never edit manually)
- `src/styles/`     — Breathe documentation site styles
- `src/app/`        — documentation site components and pages
```

### Init git and push

```bash
cd ~/Breathe\ Design\ system

git init
git add .
git commit -m "feat: initial Breathe design system

- Two-layer token architecture (global palette + product aliases)
- Style Dictionary pipeline generating web CSS from JSON source
- Products: Lemniscate, Technocracy, Aumraa, Yakaizen (stub)
- Design Tokens documentation page with architecture diagram
- shadcn/ui components from Lemniscate merged and path-corrected
- Custom Lemniscate layout components (StatGrid, PageToolbar etc.)
- Aumraa + Lemniscate logo assets"
```

Then create the repo on GitHub (github.com → New repository):
- Name: `breathe`
- Org/owner: `aumraa` (or your personal account for now)
- Private: yes
- Do not initialise with README (we already have one)

```bash
git remote add origin git@github.com:aumraa/breathe.git
git branch -M main
git push -u origin main
```

Confirm the push succeeds and the repo is visible on GitHub.

---

## Sub-task 3F — Rewire Lemniscate to Import from Breathe

> For the 60-day MVP sprint, we use a direct file import (no npm package install).
> npm package wiring is a post-launch step. This gets Lemniscate reading from
> Breathe's generated CSS immediately with zero install overhead.

### Copy the generated token file into Lemniscate

```bash
cp ~/Breathe\ Design\ system/tokens/dist/web/lemniscate.css \
   ~/Lemniscate/Dev/lemniscate/src/styles/breathe-tokens.css
```

### Update Lemniscate's CSS entry point

Open `~/Lemniscate/Dev/lemniscate/src/styles/globals.css` (or `index.css`).
Add this as the very first line, before any existing imports:

```css
/* Breathe Design System — Lemniscate tokens */
/* Source of truth: github.com/aumraa/breathe — tokens/src/lemniscate.json */
/* To update: copy tokens/dist/web/lemniscate.css from Breathe repo */
@import './breathe-tokens.css';
```

### Verify nothing broke in Lemniscate

```bash
cd ~/Lemniscate/Dev/lemniscate
npm run dev   # or pnpm dev
```

Open the Lemniscate app in browser. Confirm:
- All colours render correctly (blue primary, orange accents)
- No console errors about missing CSS variables
- No visual regressions on any screen

### Update workflow note for Santhoshi

Create `~/Lemniscate/Dev/lemniscate/src/styles/TOKENS_README.md`:

```md
# Token Update Workflow

Lemniscate's design tokens come from the Breathe design system.

Source of truth: `github.com/aumraa/breathe`
File used: `tokens/dist/web/lemniscate.css` → copied here as `breathe-tokens.css`

## To update tokens after a Breathe change:

1. Pull latest Breathe: `cd ~/Breathe Design system && git pull`
2. Rebuild tokens: `pnpm tokens`
3. Copy updated file: `cp tokens/dist/web/lemniscate.css ~/Lemniscate/Dev/lemniscate/src/styles/breathe-tokens.css`
4. Test locally in Lemniscate
5. Commit `breathe-tokens.css` in Lemniscate repo

## Never edit `breathe-tokens.css` directly.
## All token changes go through Breathe → tokens/src/lemniscate.json
```

---

## Final verification checklist

Run all of these before marking Step 3 complete:

```bash
# 1. Token build passes cleanly
cd ~/Breathe\ Design\ system && pnpm tokens
# Expected: no errors, 4 CSS files in tokens/dist/web/

# 2. Breathe builds
pnpm build
# Expected: no TypeScript or import errors

# 3. Breathe runs
pnpm dev
# Expected: Design Tokens page visible in sidebar under Foundations

# 4. GitHub push confirmed
git log --oneline -1
git remote -v
# Expected: remote origin pointing to github.com/aumraa/breathe

# 5. Lemniscate runs with imported tokens
cd ~/Lemniscate/Dev/lemniscate && npm run dev
# Expected: no visual regressions, blue primary renders correctly
```

---

## What this step does NOT do

- Does not publish Breathe as an npm package (post-launch step)
- Does not set up automated CI/CD token sync between Breathe and Lemniscate (post-launch)
- Does not build component documentation pages for custom components (next step)
- Does not configure Technocracy to import from Breathe yet (done when Technocracy scaffolding starts)

---

## Output of this step

```
~/Breathe Design system/
├── tokens/
│   ├── src/                         ← JSON source of truth
│   │   ├── global.json
│   │   ├── lemniscate.json
│   │   ├── technocracy.json
│   │   ├── aumraa.json
│   │   └── yakaizen.json            ← stub for October
│   ├── dist/
│   │   └── web/                     ← Style Dictionary output
│   │       ├── lemniscate.css
│   │       ├── technocracy.css
│   │       ├── aumraa.css
│   │       └── yakaizen.css
│   └── sd.config.js                 ← Style Dictionary config
├── src/app/pages/foundations/
│   └── DesignTokensPage.tsx         ← new documentation page
└── README.md

~/Lemniscate/Dev/lemniscate/src/styles/
├── breathe-tokens.css               ← copied from Breathe dist
├── globals.css                      ← imports breathe-tokens.css
└── TOKENS_README.md                 ← handoff note for Santhoshi
```

Breathe is now a fully functional standalone design system on GitHub.
Lemniscate reads from it. Technocracy will import `technocracy.css` when scaffolded.
Yakaizen will add RN/iOS/Android outputs in October with zero architecture changes.

---

*Step 3 of 3 — Extract ✅ → Merge + Tokens ✅ → Style Dictionary + GitHub + Rewire ← you are here*
