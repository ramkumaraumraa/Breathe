# Breathe DS — Kaayo Brand Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Register Kaayo (prefix `kayo`) as a full brand in the Breathe Design System — color families in global tokens, brand token file, Style Dictionary config, ProductThemeContext, and sub-tab pattern in TypographyPage and DesignTokensPage.

**Architecture:** Add `crimson`, `peach`, and `navy` color families to `global.json`. Create `kaayo.json` mapping semantic tokens to those families. Wire Kaayo into `sd.config.js` for all 4 platforms. In the two foundation pages that have brand tabs, filter `kaayo` and `ilakh` from the top-level tab list and surface them as sub-tabs under the Ulagellam umbrella — mirroring the pattern already live in ColorsPage.tsx.

**Tech Stack:** Style Dictionary 4, TypeScript, React, Tailwind CSS

**Repo root:** `D:/Aumraa/APOS pitch/1_Product Factory/02_Breathe Design system`

---

## File Map

| Action | File |
| --- | --- |
| Modify | `tokens/src/global.json` |
| Create | `tokens/src/kaayo.json` |
| Modify | `tokens/sd.config.js` |
| Modify | `src/app/context/ProductThemeContext.tsx` |
| Modify | `src/app/pages/foundations/TypographyPage.tsx` |
| Modify | `src/app/pages/foundations/DesignTokensPage.tsx` |

---

### Task 1: Add `crimson`, `peach`, `navy` color families to global.json

**Files:**

- Modify: `tokens/src/global.json`

These three families are Kaayo's core brand scales. They go inside the top-level `"color"` object alongside the existing families (`blue`, `green`, etc.). Each family has 15 stops matching the exact hex values defined in `ColorsPage.tsx`.

- [ ] **Step 1: Add the three color families**

Open `tokens/src/global.json`. Inside the `"color"` object (after the existing families, before `"neutral"`), add:

```json
"crimson": {
  "25":  { "value": "#FDF2F3", "type": "color", "comment": "Kaayo primary — Tutor Crimson" },
  "50":  { "value": "#FAD5D6", "type": "color" },
  "75":  { "value": "#F6B8BA", "type": "color" },
  "100": { "value": "#F29D9F", "type": "color" },
  "200": { "value": "#EA6B6E", "type": "color" },
  "300": { "value": "#E14144", "type": "color" },
  "400": { "value": "#C31E21", "type": "color" },
  "500": { "value": "#970103", "type": "color", "comment": "Kaayo primary root" },
  "600": { "value": "#740102", "type": "color" },
  "700": { "value": "#570001", "type": "color" },
  "800": { "value": "#3F0000", "type": "color" },
  "900": { "value": "#2B0000", "type": "color" },
  "925": { "value": "#200000", "type": "color" },
  "950": { "value": "#160000", "type": "color" },
  "975": { "value": "#0E0000", "type": "color" }
},
"peach": {
  "25":  { "value": "#FFFDFB", "type": "color", "comment": "Kaayo secondary — Warm Peach" },
  "50":  { "value": "#FFF3ED", "type": "color" },
  "75":  { "value": "#FFE4D8", "type": "color" },
  "100": { "value": "#FED3C1", "type": "color" },
  "200": { "value": "#FDBBA1", "type": "color" },
  "300": { "value": "#FCA78B", "type": "color" },
  "400": { "value": "#FD9271", "type": "color" },
  "500": { "value": "#FDA581", "type": "color", "comment": "Kaayo secondary root" },
  "600": { "value": "#E38865", "type": "color" },
  "700": { "value": "#C96D4B", "type": "color" },
  "800": { "value": "#AE5333", "type": "color" },
  "900": { "value": "#943C1D", "type": "color" },
  "925": { "value": "#7D2A0D", "type": "color" },
  "950": { "value": "#641D06", "type": "color" },
  "975": { "value": "#471101", "type": "color" }
},
"navy": {
  "25":  { "value": "#EFF1F5", "type": "color", "comment": "Kaayo tertiary — Deep Navy" },
  "50":  { "value": "#DDE1EC", "type": "color" },
  "75":  { "value": "#CBD1E2", "type": "color" },
  "100": { "value": "#B9C0D7", "type": "color" },
  "200": { "value": "#96A1C0", "type": "color" },
  "300": { "value": "#7583A8", "type": "color" },
  "400": { "value": "#55668F", "type": "color" },
  "500": { "value": "#37415C", "type": "color", "comment": "Kaayo tertiary root" },
  "600": { "value": "#2D354B", "type": "color" },
  "700": { "value": "#232A3B", "type": "color" },
  "800": { "value": "#1A202D", "type": "color" },
  "900": { "value": "#12161F", "type": "color" },
  "925": { "value": "#0D1016", "type": "color" },
  "950": { "value": "#080A0E", "type": "color" },
  "975": { "value": "#040507", "type": "color" }
},
```

- [ ] **Step 2: Commit**

```bash
git add tokens/src/global.json
git commit -m "feat(tokens): add crimson, peach, navy color families for Kaayo brand"
```

---

### Task 2: Create `tokens/src/kaayo.json`

**Files:**

- Create: `tokens/src/kaayo.json`

- [ ] **Step 1: Create the file**

```json
{
  "kayo": {
    "color": {
      "primary":             { "value": "{color.crimson.500}", "type": "color" },
      "primaryLight":        { "value": "{color.crimson.300}", "type": "color" },
      "primaryDark":         { "value": "{color.crimson.700}", "type": "color" },
      "primaryForeground":   { "value": "{color.neutral.white}", "type": "color" },
      "secondary":           { "value": "{color.peach.500}", "type": "color" },
      "secondaryForeground": { "value": "{color.neutral.white}", "type": "color" },
      "tertiary":            { "value": "{color.navy.500}", "type": "color" },
      "tertiaryForeground":  { "value": "{color.neutral.white}", "type": "color" },
      "background":          { "value": "{color.neutral.white}", "type": "color" },
      "backgroundSecondary": { "value": "{color.neutral.50}", "type": "color" },
      "foreground":          { "value": "{color.ink.400}", "type": "color" },
      "foregroundSecondary": { "value": "{color.ink.100}", "type": "color" },
      "border":              { "value": "{color.ink.400}", "type": "color" },
      "positive":            { "value": "{color.status.success}", "type": "color" },
      "positiveForeground":  { "value": "{color.neutral.white}", "type": "color" },
      "negative":            { "value": "{color.status.danger}", "type": "color" },
      "negativeForeground":  { "value": "{color.neutral.white}", "type": "color" },
      "warning":             { "value": "{color.status.warning}", "type": "color" },
      "gradientStart":       { "value": "{color.crimson.500}", "type": "color" },
      "gradientEnd":         { "value": "{color.peach.500}", "type": "color" }
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
      "card":  { "value": "{shadow.sm}", "type": "shadow" },
      "modal": { "value": "{shadow.md}", "type": "shadow" }
    },
    "icon": {
      "sm": { "value": "{icon.sm}", "type": "dimension" },
      "md": { "value": "{icon.md}", "type": "dimension" },
      "lg": { "value": "{icon.lg}", "type": "dimension" }
    }
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add tokens/src/kaayo.json
git commit -m "feat(tokens): add kaayo.json brand token file (prefix: kayo)"
```

---

### Task 3: Add Kaayo to Style Dictionary config

**Files:**

- Modify: `tokens/sd.config.js`

- [ ] **Step 1: Add the kaayo entry to the `products` array**

In `tokens/sd.config.js`, find the `products` array (currently ends with `yakaizen`). Add after `yakaizen`:

```js
  {
    name: 'kaayo',
    prefix: 'kayo',
    platforms: ['web', 'reactNative', 'ios', 'android'],
  },
```

- [ ] **Step 2: Run the token build and verify outputs**

```bash
pnpm build:tokens
```

Expected: no errors. Verify these files are created:

```
tokens/dist/web/kaayo.css
tokens/dist/react-native/kaayo.ts
tokens/dist/ios/KaayoTokens.swift
tokens/dist/android/kaayo/colors.xml
```

Check `tokens/dist/web/kaayo.css` starts with:

```css
:root {
  --kayo-color-primary: #970103;
```

- [ ] **Step 3: Commit**

```bash
git add tokens/sd.config.js tokens/dist/
git commit -m "feat(tokens): wire kaayo into Style Dictionary — web, RN, iOS, Android outputs"
```

---

### Task 4: Add `kaayo` to ProductThemeContext

**Files:**

- Modify: `src/app/context/ProductThemeContext.tsx`

- [ ] **Step 1: Add `'kaayo'` to the `ProductId` union**

Find the `export type ProductId =` block (lines 4–11). Add `| 'kaayo'`:

```ts
export type ProductId =
  | 'lemniscate'
  | 'aumraa'
  | 'technocracy'
  | 'maligai'
  | 'ulagellam'
  | 'ilakh'
  | 'kaayo'
  | 'yakaizen'
```

- [ ] **Step 2: Add `kaayo` entry to `productMeta`**

After the `ilakh` entry (around line 173), add:

```ts
  kaayo: {
    label: 'Kaayo',
    prefix: 'kayo',
    description: 'Tutor & class operations — Mobile · Neo-Brutalist',
    vars: {
      '--primary':                'var(--kayo-color-primary)',
      '--primary-foreground':     'var(--kayo-color-primary-foreground)',
      '--secondary':              'var(--kayo-color-background-secondary)',
      '--secondary-foreground':   'var(--kayo-color-foreground)',
      '--accent':                 'var(--kayo-color-secondary)',
      '--accent-foreground':      'var(--kayo-color-secondary-foreground)',
      '--background':             'var(--kayo-color-background)',
      '--foreground':             'var(--kayo-color-foreground)',
      '--muted':                  'var(--kayo-color-background-secondary)',
      '--muted-foreground':       'var(--kayo-color-foreground-secondary)',
      '--border':                 'var(--kayo-color-border)',
      '--ring':                   'var(--kayo-color-primary)',
      '--radius':                 'var(--kayo-radius-default)',
      '--destructive':            'var(--kayo-color-negative)',
      '--destructive-foreground': 'var(--kayo-color-negative-foreground)',
      '--gradient-brand-start':   'var(--kayo-color-gradient-start)',
      '--gradient-brand-end':     'var(--kayo-color-gradient-end)',
      '--gradient-brand':         'linear-gradient(135deg, var(--gradient-brand-start) 0%, var(--gradient-brand-end) 100%)',
    },
  },
```

- [ ] **Step 3: Commit**

```bash
git add src/app/context/ProductThemeContext.tsx
git commit -m "feat(context): add kaayo to ProductId and productMeta"
```

---

### Task 5: Apply Ulagellam sub-tab pattern to TypographyPage

**Files:**

- Modify: `src/app/pages/foundations/TypographyPage.tsx`

ColorsPage.tsx is the reference — replicate the exact same sub-tab pattern here.

- [ ] **Step 1: Add Kaayo brand entry to the `brands` array**

Find the `brands` array (it starts around line 1 of the data section). Add the Kaayo entry after the `ilakh` entry and before `yakaizen`:

```ts
  {
    id: 'kaayo',
    label: 'Kaayo',
    tagline: 'Tutor & class operations — structured, legible, disciplined',
    displayFont: { name: 'DM Sans', token: '--font-display', use: 'Display & Headings', cssValue: "'DM Sans', sans-serif", googleFont: 'DM+Sans:wght@600;700;800' },
    bodyFont: { name: 'DM Sans', token: '--font-sans', use: 'Body & UI Labels', cssValue: "'DM Sans', sans-serif" },
    monoFont,
    scale: makeScale(
      { name: 'DM Sans', token: '--font-display', use: 'Display', cssValue: "'DM Sans', sans-serif" },
      { name: 'DM Sans', token: '--font-sans',    use: 'Body',    cssValue: "'DM Sans', sans-serif" }
    ),
    characterSample: 'Aa Bb Cc 0123',
    accentColor: '#970103',
    bgColor: '#FDF2F3',
    cssSnippet: `/* Kaayo — font tokens */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

:root {
  --font-display: 'DM Sans', sans-serif;
  --font-sans:    'DM Sans', sans-serif;
  --font-mono:    'JetBrains Mono', monospace;
}`,
  },
```

- [ ] **Step 2: Update `TYPO_BRAND_ORDER` and add filter + sub-tab state**

Replace the three lines around `TYPO_BRAND_ORDER` and the `TypographyPage` function opening:

```ts
const TYPO_BRAND_ORDER = ['aumraa', 'technocracy', 'lemniscate', 'maligai', 'ulagellam', 'yakaizen'];
const sortedTypoBrands = [...brands].sort((a, b) => {
  const ai = TYPO_BRAND_ORDER.indexOf(a.id);
  const bi = TYPO_BRAND_ORDER.indexOf(b.id);
  return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
});
const topLevelTypoBrands = sortedTypoBrands.filter(b => b.id !== 'kaayo' && b.id !== 'ilakh');
```

Then inside `TypographyPage()`, replace:

```ts
const [activeTab, setActiveTab] = useState('aumraa');
const brand = sortedTypoBrands.find(b => b.id === activeTab) || sortedTypoBrands[0];
```

with:

```ts
const [activeTab, setActiveTab] = useState('aumraa');
const [ulagellamSubTab, setUlagellamSubTab] = useState('kaayo');

const brand = activeTab === 'ulagellam'
  ? (sortedTypoBrands.find(b => b.id === ulagellamSubTab) ?? sortedTypoBrands.find(b => b.id === 'ulagellam')!)
  : (sortedTypoBrands.find(b => b.id === activeTab) ?? sortedTypoBrands[0]);
```

- [ ] **Step 3: Update the tab list to use `topLevelTypoBrands` and add sub-tab row**

Find the `{sortedTypoBrands.map(b => {` inside the sticky tab bar (around line 326). Replace `sortedTypoBrands` with `topLevelTypoBrands`.

Then, directly after the closing `</div>` of the sticky brand-tabs bar and before the tagline `<p>`, insert the Ulagellam sub-tab segment:

```tsx
{activeTab === 'ulagellam' && (
  <div className="mb-6 flex gap-2 flex-wrap">
    {[
      { id: 'kaayo',     label: '🎓 Kaayo (Tutor Ops)',  accent: '#970103' },
      { id: 'ilakh',     label: '📈 Ilakh (Finance)',     accent: '#0369A1' },
      { id: 'ulagellam', label: '🗺️ Ulagellam (Explorer)', accent: '#7C3AED' },
    ].map((sub) => {
      const isSubActive = ulagellamSubTab === sub.id;
      return (
        <button
          key={sub.id}
          onClick={() => setUlagellamSubTab(sub.id)}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold border-2 transition-colors ${
            isSubActive ? 'text-white' : 'bg-transparent text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
          }`}
          style={{
            borderColor: isSubActive ? sub.accent : undefined,
            backgroundColor: isSubActive ? sub.accent : undefined,
            fontFamily: 'var(--font-sans)',
          }}
        >
          {sub.label}
        </button>
      );
    })}
  </div>
)}
```

- [ ] **Step 4: Update the tagline to reflect sub-tab when Ulagellam is active**

Find the tagline paragraph:

```tsx
<p className={`${textSecondary} mb-10 italic`} ...>
  {brand.tagline}
</p>
```

Replace with:

```tsx
<p className={`${textSecondary} mb-10 italic`} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
  {activeTab === 'ulagellam' && ulagellamSubTab !== 'ulagellam'
    ? 'Regional & mobile suite umbrella · Multi-product sub-brands below'
    : brand.tagline}
</p>
```

- [ ] **Step 5: Commit**

```bash
git add src/app/pages/foundations/TypographyPage.tsx
git commit -m "feat(typography): add Kaayo brand; Ulagellam sub-tab pattern for Kaayo/Ilakh/Ulagellam"
```

---

### Task 6: Apply Ulagellam sub-tab pattern to DesignTokensPage

**Files:**

- Modify: `src/app/pages/foundations/DesignTokensPage.tsx`

The DesignTokensPage currently uses shadcn `<Tabs>`. We add Kaayo data and apply the sub-tab pattern inside the ulagellam tab content — no page-level restructure needed.

- [ ] **Step 1: Add Kaayo entry to the `products` array**

Find the `products: Product[]` array. Add after the `ulagellam` entry:

```ts
  {
    id: 'kaayo',
    label: 'Kaayo',
    prefix: 'kayo',
    description: 'Tutor & class operations — mobile-first, Neo-Brutalist. Crimson primary, Warm Peach secondary, Deep Navy tertiary.',
    surface: 'light',
    platforms: ['Web CSS', 'React Native', 'iOS Swift', 'Android XML'],
    colors: [
      { name: 'Primary',             token: '--kayo-color-primary',             value: '#970103', role: 'Tutor Crimson — buttons, brand presence, primary actions' },
      { name: 'Primary Light',       token: '--kayo-color-primary-light',       value: '#E14144', role: 'Hover states, tinted highlights' },
      { name: 'Primary Dark',        token: '--kayo-color-primary-dark',        value: '#570001', role: 'Active states, pressed borders' },
      { name: 'Secondary',           token: '--kayo-color-secondary',           value: '#FDA581', role: 'Warm Peach — energy, community warmth' },
      { name: 'Tertiary',            token: '--kayo-color-tertiary',            value: '#37415C', role: 'Deep Navy — admin, tracking elements' },
      { name: 'Positive',            token: '--kayo-color-positive',            value: '#15803D', role: 'Success, paid states' },
      { name: 'Negative',            token: '--kayo-color-negative',            value: '#A81818', role: 'Errors, overdue, destructive' },
      { name: 'Warning',             token: '--kayo-color-warning',             value: '#B86508', role: 'Partial payment, pending' },
      { name: 'Background',          token: '--kayo-color-background',          value: '#FFFFFF', role: 'Screen surface' },
      { name: 'Background Secondary',token: '--kayo-color-background-secondary',value: '#F8F8F9', role: 'Cards, raised surfaces' },
      { name: 'Foreground',          token: '--kayo-color-foreground',          value: '#191B1F', role: 'Primary text' },
      { name: 'Foreground Secondary',token: '--kayo-color-foreground-secondary',value: '#2E3033', role: 'Secondary text, captions' },
      { name: 'Border',              token: '--kayo-color-border',              value: '#191B1F', role: 'Hard brutalist borders' },
      { name: 'Gradient Start',      token: '--kayo-color-gradient-start',      value: '#970103', role: 'Tutor Collection gradient start' },
      { name: 'Gradient End',        token: '--kayo-color-gradient-end',        value: '#FDA581', role: 'Tutor Collection gradient end' },
    ],
    typography: [
      { name: 'Typeface',       token: '--kayo-font-family',         value: 'DM Sans' },
      { name: 'Base size',      token: '--kayo-font-size-base',      value: '16px' },
      { name: 'Body weight',    token: '--kayo-font-weight-body',    value: '400' },
      { name: 'Heading weight', token: '--kayo-font-weight-heading', value: '700 (Neo-Brutalist bold)' },
    ],
    radius: [
      { name: 'Default', token: '--kayo-radius-default', value: '8px (Neo-Brutalist — no rounding >12)' },
      { name: 'Small',   token: '--kayo-radius-sm',      value: '4px' },
      { name: 'Pill',    token: '--kayo-radius-pill',    value: '9999px' },
    ],
    icons: [
      { name: 'SM', token: '--kayo-icon-sm', value: '16px' },
      { name: 'MD', token: '--kayo-icon-md', value: '20px (default)' },
      { name: 'LG', token: '--kayo-icon-lg', value: '24px' },
    ],
  },
```

- [ ] **Step 2: Add Kaayo to `platformMatrix`**

Find the `platformMatrix` array (around line 270). Add after the `Ulagellam` row:

```ts
  { product: 'Kaayo',          web: true,  rn: true,  ios: true,  android: true,  watch: false, widgets: false },
```

- [ ] **Step 3: Add a `UlagellamTokenTabs` sub-component above `DesignTokensPage`**

The existing Tabs section lives inside an IIFE in JSX — hooks can't be called there. Instead, add a focused sub-component that owns the sub-tab state and renders the ulagellam tab's content. Add this function directly above `export function DesignTokensPage()`:

```tsx
type UlagellamSubTab = 'kaayo' | 'ilakh' | 'ulagellam';

const ULAGELLAM_SUBS: { id: UlagellamSubTab; label: string; accent: string }[] = [
  { id: 'kaayo',     label: '🎓 Kaayo (Tutor Ops)',   accent: '#970103' },
  { id: 'ilakh',     label: '📈 Ilakh (Finance)',      accent: '#0369A1' },
  { id: 'ulagellam', label: '🗺️ Ulagellam (Explorer)', accent: '#7C3AED' },
];

function UlagellamTokenTabs({ products }: { products: Product[] }) {
  const [subTab, setSubTab] = useState<UlagellamSubTab>('kaayo');
  const product = products.find(p => p.id === subTab) ?? products.find(p => p.id === 'ulagellam')!;
  const isPlaceholder = (id: string) => ['maligai', 'ulagellam', 'ilakh', 'yakaizen', 'kaayo'].includes(id);

  return (
    <div className="mt-0 space-y-8">
      {/* Sub-tab segment control */}
      <div className="flex gap-2 flex-wrap">
        {ULAGELLAM_SUBS.map((sub) => {
          const isActive = subTab === sub.id;
          return (
            <button
              key={sub.id}
              onClick={() => setSubTab(sub.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border-2 transition-colors ${
                isActive ? 'text-white' : 'bg-transparent text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
              style={{
                borderColor: isActive ? sub.accent : undefined,
                backgroundColor: isActive ? sub.accent : undefined,
              }}
            >
              {sub.label}
            </button>
          );
        })}
      </div>

      {/* Token content for active sub-brand — same JSX as existing single-product TabsContent */}
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="m-0 text-slate-900 dark:text-slate-100" style={{ fontWeight: 700, fontSize: '1rem' }}>
            {product.label}
          </p>
          <p className="m-0 mt-2 max-w-2xl text-slate-500 dark:text-slate-400" style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>
            {product.description}
          </p>
          {isPlaceholder(product.id) && (
            <Badge variant="outline" className="mt-3 text-amber-600 border-amber-300">
              Pending design kickoff — token values are placeholders
            </Badge>
          )}
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          {product.platforms.map(p => (
            <Badge key={p} variant="secondary" className="text-xs">{p}</Badge>
          ))}
        </div>
      </div>

      {product.colors.length > 0 && (
        <div>
          <h3 className="m-0 mb-4 text-slate-900 dark:text-white" style={{ fontWeight: 700, fontSize: '1rem' }}>Colors</h3>
          <TokenTable rows={product.colors} showSwatch showRole />
        </div>
      )}
      {product.typography.length > 0 && (
        <div>
          <h3 className="m-0 mb-4 text-slate-900 dark:text-white" style={{ fontWeight: 700, fontSize: '1rem' }}>Typography</h3>
          <TokenTable rows={product.typography} />
        </div>
      )}
      {product.radius.length > 0 && (
        <div>
          <h3 className="m-0 mb-4 text-slate-900 dark:text-white" style={{ fontWeight: 700, fontSize: '1rem' }}>Radius</h3>
          <TokenTable rows={product.radius} />
        </div>
      )}
      {product.icons.length > 0 && (
        <div>
          <h3 className="m-0 mb-4 text-slate-900 dark:text-white" style={{ fontWeight: 700, fontSize: '1rem' }}>Icons</h3>
          <TokenTable rows={product.icons} />
        </div>
      )}
    </div>
  );
}
```

Also add `useState` to the React import at the top of the file if it isn't already imported.

- [ ] **Step 4: Filter `kaayo` and `ilakh` from the top-level TabsTrigger list**

Inside the existing IIFE, find:

```tsx
{products.map((p) => (
  <TabsTrigger key={p.id} value={p.id} className="flex items-center gap-2 rounded-lg px-4 py-2">
```

Replace with:

```tsx
{products.filter(p => p.id !== 'kaayo' && p.id !== 'ilakh').map((p) => (
  <TabsTrigger key={p.id} value={p.id} className="flex items-center gap-2 rounded-lg px-4 py-2">
```

- [ ] **Step 5: Replace `ulagellam` TabsContent body with `<UlagellamTokenTabs />`**

Find the `<TabsContent key="ulagellam" value="ulagellam" ...>` block inside the `{products.map(...)}`. Replace its inner content with:

```tsx
<TabsContent key="ulagellam" value="ulagellam" className="mt-0">
  <UlagellamTokenTabs products={products} />
</TabsContent>
```

Leave all other `TabsContent` blocks (lemniscate, technocracy, aumraa, etc.) unchanged.

- [ ] **Step 6: Commit**

```bash
git add src/app/pages/foundations/DesignTokensPage.tsx
git commit -m "feat(design-tokens): add Kaayo product data; Ulagellam sub-tab for Kaayo/Ilakh/Ulagellam"
```

---

### Task 7: Smoke-test in the dev server

- [ ] **Step 1: Start the dev server**

```bash
pnpm dev
```

Expected: server starts on `http://localhost:5173` (or configured port) with no TypeScript errors.

- [ ] **Step 2: Check Typography page**

Navigate to **Foundations → Typography**. Verify:

- Top-level tabs show: Aumraa, Technocracy, Lemniscate, Maligai, Ulagellam, Yakaizen (no Kaayo or Ilakh at top level).
- Click **Ulagellam** → sub-tab row appears with 🎓 Kaayo, 📈 Ilakh, 🗺️ Ulagellam.
- Click **🎓 Kaayo** → font cards show DM Sans, accent color is crimson `#970103`.

- [ ] **Step 3: Check Design Tokens page**

Navigate to **Foundations → Design Tokens**. Verify:

- Top-level tabs do not show Kaayo or Ilakh.
- Click **Ulagellam** → sub-tab row appears.
- Click **🎓 Kaayo** → color token table shows `--kayo-color-primary: #970103`.
- Platform matrix shows Kaayo row with Web, RN, iOS, Android all checked.

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "chore: Kaayo brand integration complete in Breathe DS"
```
