# Breathe Atomic Restructure + Aumraa Branding — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure Breathe Design System into atomic nav (Atoms/Molecules/Organisms/Templates), apply Aumraa green as the shell accent, fix Aumraa tokens, import 6 breathe-extract template components, and add per-product token switching to all component pages.

**Architecture:** Three phases — (1) tokens + shell branding + component imports, (2) nav + context + layout infrastructure, (3) page migrations. Each phase ends with a build check and commit. Components use CSS variable injection via `ProductPreviewWrapper` so one JSX tree renders in any product's brand.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS v4, shadcn/ui, Style Dictionary, pnpm

---

## File Map

### Phase 1 — Modified
- `tokens/src/global.json` — add green/yellowGreen/emerald palettes + sourceSans font
- `tokens/src/aumraa.json` — full rewrite with correct green values
- `src/styles/theme.css` — swap primary/ring/accent/radius to `amra` vars
- `src/styles/fonts.css` — add Source Sans 3 import
- `src/app/components/layout/Sidebar.tsx` — active item colour → primary CSS var
- `src/app/pages/foundations/DesignTokensPage.tsx` — Aumraa tab colours/typography

### Phase 1 — Created
- `src/app/components/custom/template/StatGrid.tsx`
- `src/app/components/custom/template/PageToolbar.tsx`
- `src/app/components/custom/template/DataSection.tsx`
- `src/app/components/custom/template/PageBody.tsx`
- `src/app/components/custom/template/MobileFab.tsx`
- `src/app/components/custom/template/TabBar.tsx`
- `src/app/components/custom/template/index.ts`

### Phase 2 — Created
- `src/app/context/ProductThemeContext.tsx`
- `src/app/components/shared/ComponentPageLayout.tsx`

### Phase 2 — Modified
- `src/app/App.tsx` — wrap with ProductThemeProvider
- `src/app/components/layout/navData.ts` — atomic sections
- `src/app/routes.ts` — new paths + redirect stubs

### Phase 3 — Created (18 page files)
- `src/app/pages/atoms/` — ButtonPage, InputPage, CheckboxPage, SwitchPage, AvatarPage, BadgePage
- `src/app/pages/molecules/` — AlertPage, CardPage, SelectPage, TabsPage, TooltipPage
- `src/app/pages/organisms/` — DialogPage
- `src/app/pages/templates/` — StatGridPage, PageToolbarPage, DataSectionPage, PageBodyPage, MobileFabPage, TabBarPage

### Phase 3 — Deleted
- `src/app/pages/components/` — all 12 files removed after new pages wired

---

## Phase 1 — Shell Branding, Token Fix, Component Import

---

### Task 1: Add green/yellowGreen/emerald palettes and sourceSans to global.json

**Files:**
- Modify: `tokens/src/global.json`

- [ ] **Open `tokens/src/global.json`.** Locate the closing `}` of the `"orange"` block inside `"color"`. Insert after it (before `"neutral"`):

```json
"green": {
  "50":     { "value": "#F0FDF4", "type": "color" },
  "100":    { "value": "#DCFCE7", "type": "color" },
  "200":    { "value": "#BBF7D0", "type": "color" },
  "300":    { "value": "#86EFAC", "type": "color" },
  "400":    { "value": "#4ADE80", "type": "color" },
  "500":    { "value": "#2F9E44", "type": "color", "comment": "Aumraa primary — forest green" },
  "600":    { "value": "#16A34A", "type": "color" },
  "700":    { "value": "#15803D", "type": "color" },
  "800":    { "value": "#166534", "type": "color" },
  "900":    { "value": "#14532D", "type": "color" },
  "950":    { "value": "#052E16", "type": "color" },
  "forest": { "value": "#002100", "type": "color", "comment": "Aumraa deep forest black — primary text" }
},
"yellowGreen": {
  "400": { "value": "#CFCF2A", "type": "color", "comment": "Aumraa secondary — energised yellow-green" },
  "500": { "value": "#B5B520", "type": "color" },
  "600": { "value": "#9A9A18", "type": "color" }
},
"emerald": {
  "400": { "value": "#00D06D", "type": "color", "comment": "Aumraa positive / success" },
  "500": { "value": "#00B85F", "type": "color" }
},
```

- [ ] **Update the `"status"` block** (still inside `"color"`) to match Aumraa's semantic values. Replace the entire `"status"` object:

```json
"status": {
  "success":      { "value": "#00D06D", "type": "color", "comment": "Aumraa positive — bright emerald" },
  "successLight": { "value": "#DCFCE7", "type": "color" },
  "successDark":  { "value": "#14532D", "type": "color" },
  "warning":      { "value": "#F59E0B", "type": "color" },
  "warningLight": { "value": "#FEF3C7", "type": "color" },
  "warningDark":  { "value": "#92400E", "type": "color" },
  "danger":       { "value": "#E11D2A", "type": "color", "comment": "Aumraa negative" },
  "dangerLight":  { "value": "#FEE2E2", "type": "color" },
  "dangerDark":   { "value": "#7F1D1D", "type": "color" },
  "info":         { "value": "#2F6FED", "type": "color", "comment": "Aumraa tertiary blue" },
  "infoLight":    { "value": "#E0F2FE", "type": "color" },
  "infoDark":     { "value": "#0C4A6E", "type": "color" }
}
```

- [ ] **Add `sourceSans` to `font.family`**. Find the `"family"` block inside `"font"` and add the entry after `"mono"`:

```json
"sourceSans": {
  "value": "'Source Sans 3', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  "type": "fontFamily",
  "comment": "Aumraa brand typeface"
}
```

- [ ] **Validate JSON** parses without error:

```bash
cd "/Users/ramkumar.ganesh/Downloads/APOS pitch/Product Factory/Breathe Design system"
python3 -c "import json; json.load(open('tokens/src/global.json')); print('OK')"
```

Expected: `OK`

---

### Task 2: Rewrite aumraa.json with correct green brand tokens

**Files:**
- Modify: `tokens/src/aumraa.json`

- [ ] **Replace the entire file** with:

```json
{
  "amra": {
    "color": {
      "primary":             { "value": "{color.green.500}",      "type": "color",
                               "comment": "Forest green — stability, long-term thinking" },
      "primaryLight":        { "value": "{color.green.400}",      "type": "color" },
      "primaryDark":         { "value": "{color.green.700}",      "type": "color" },
      "primaryForeground":   { "value": "{color.neutral.white}",  "type": "color" },

      "secondary":           { "value": "{color.yellowGreen.400}","type": "color",
                               "comment": "Yellow-green — energy, momentum, optimism" },
      "secondaryForeground": { "value": "{color.green.forest}",   "type": "color" },

      "tertiary":            { "value": "{color.status.info}",    "type": "color",
                               "comment": "Blue — digital clarity, supporting accent" },
      "tertiaryForeground":  { "value": "{color.neutral.white}",  "type": "color" },

      "accent":              { "value": "{color.status.warning}", "type": "color",
                               "comment": "Amber — alert, call to action" },
      "accentForeground":    { "value": "{color.neutral.white}",  "type": "color" },

      "positive":            { "value": "{color.emerald.400}",    "type": "color",
                               "comment": "Bright green — success states" },
      "positiveForeground":  { "value": "{color.neutral.white}",  "type": "color" },

      "negative":            { "value": "{color.status.danger}",  "type": "color" },
      "negativeForeground":  { "value": "{color.neutral.white}",  "type": "color" },

      "background":          { "value": "{color.neutral.white}",  "type": "color" },
      "backgroundSecondary": { "value": "{color.neutral.50}",     "type": "color" },
      "foreground":          { "value": "{color.green.forest}",   "type": "color",
                               "comment": "Deep forest black — primary text" },
      "foregroundSecondary": { "value": "{color.neutral.500}",    "type": "color" },

      "border":              { "value": "{color.neutral.200}",    "type": "color" },
      "danger":              { "value": "{color.status.danger}",  "type": "color" },

      "gradientStart":       { "value": "{color.green.400}",      "type": "color" },
      "gradientEnd":         { "value": "{color.green.700}",      "type": "color" }
    },
    "font": {
      "family":        { "value": "{font.family.sourceSans}", "type": "fontFamily",
                         "comment": "Source Sans 3 — Aumraa brand typeface" },
      "sizeBase":      { "value": "{font.size.base}",         "type": "dimension" },
      "weightBody":    { "value": "{font.weight.normal}",     "type": "fontWeight" },
      "weightHeading": { "value": "{font.weight.bold}",       "type": "fontWeight",
                         "comment": "Bold for H1–H2 hero/vision statements" },
      "weightSubhead": { "value": "{font.weight.semibold}",   "type": "fontWeight",
                         "comment": "Semibold for H3–H6 sub-headings" }
    },
    "spacing": {
      "pagePadding": { "value": "{spacing.8}",  "type": "dimension",
                       "comment": "Generous — white space is active design" },
      "cardPadding": { "value": "{spacing.6}",  "type": "dimension" },
      "sectionGap":  { "value": "{spacing.12}", "type": "dimension" }
    },
    "radius": {
      "default": { "value": "{radius.md}",   "type": "dimension" },
      "sm":      { "value": "{radius.sm}",   "type": "dimension" },
      "lg":      { "value": "{radius.lg}",   "type": "dimension" },
      "pill":    { "value": "{radius.full}", "type": "dimension" }
    },
    "shadow": {
      "card":  { "value": "{shadow.sm}", "type": "shadow" },
      "modal": { "value": "{shadow.xl}", "type": "shadow" }
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

### Task 3: Rebuild tokens and verify Aumraa output

**Files:** (no file edits — shell commands only)

- [ ] **Rebuild all tokens:**

```bash
cd "/Users/ramkumar.ganesh/Downloads/APOS pitch/Product Factory/Breathe Design system"
pnpm tokens
```

Expected: build completes without errors, outputs for all 7 products.

- [ ] **Verify Aumraa primary is now green:**

```bash
grep "amra-color-primary" "/Users/ramkumar.ganesh/Downloads/APOS pitch/Product Factory/Breathe Design system/tokens/dist/web/aumraa.css" | head -3
```

Expected output contains `#2F9E44`, NOT any blue value.

---

### Task 4: Update theme.css — Aumraa green as shell primary accent

**Files:**
- Modify: `src/styles/theme.css`

- [ ] **In the second `:root` block** (lines 51–90), replace these three lines:

```css
  --primary:              var(--lmns-color-primary);
  --primary-foreground:   var(--lmns-color-primary-foreground);
```

with:

```css
  --primary:              var(--amra-color-primary);
  --primary-foreground:   var(--amra-color-primary-foreground);
```

- [ ] **Replace the `--ring` line** in the same block:

```css
  --ring:                 var(--lmns-color-primary);
```

with:

```css
  --ring:                 var(--amra-color-primary);
```

- [ ] **Replace the `--accent` line:**

```css
  --accent:               var(--lmns-color-accent);
  --accent-foreground:    var(--lmns-color-accent-foreground);
```

with:

```css
  --accent:               var(--amra-color-secondary);
  --accent-foreground:    var(--amra-color-secondary-foreground);
```

- [ ] **Replace the `--radius` line:**

```css
  --radius:               var(--lmns-radius-default);
```

with:

```css
  --radius:               var(--amra-radius-default);
```

- [ ] **Replace sidebar primary vars** (lines 84–85 and 89):

```css
  --sidebar-primary:      var(--lmns-color-primary);
  --sidebar-primary-foreground: var(--lmns-color-primary-foreground);
```

with:

```css
  --sidebar-primary:      var(--amra-color-primary);
  --sidebar-primary-foreground: var(--amra-color-primary-foreground);
```

```css
  --sidebar-ring:         var(--lmns-color-primary);
```

with:

```css
  --sidebar-ring:         var(--amra-color-primary);
```

> **Note:** Leave ALL other vars (`--background`, `--foreground`, `--card`, `--muted`, `--border`, `--secondary`, etc.) pointing to `--lmns-*`. The shell surfaces stay neutral white/gray — only the accent shifts green.

---

### Task 5: Add Source Sans 3 font + update Sidebar active colour

**Files:**
- Modify: `src/styles/fonts.css`
- Modify: `src/app/components/layout/Sidebar.tsx`

- [ ] **Open `src/styles/fonts.css`**, add Source Sans 3 import at the top (before the existing `@import`):

```css
/* Source Sans 3 — Aumraa brand typeface */
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600&display=swap');
```

- [ ] **Open `src/app/components/layout/Sidebar.tsx`**, find the logo gradient (line 16):

```tsx
style={{ background: 'linear-gradient(135deg, #0D9488, #6366F1)' }}
```

Replace with Aumraa green:

```tsx
style={{ background: 'linear-gradient(135deg, #2F9E44, #15803D)' }}
```

- [ ] **In the same file**, find the active nav link classes (line 48):

```tsx
'bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400'
```

Replace with CSS-var-based classes so it follows the token:

```tsx
'bg-primary/8 text-primary border-l-2 border-primary pl-[10px]'
```

- [ ] **Find the active indicator dot** (line 54):

```tsx
<span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
```

Replace:

```tsx
<span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
```

- [ ] **Find the PageHeader section label** (line 28 in `src/app/components/shared/PageHeader.tsx`):

```tsx
<p className="text-teal-600 dark:text-teal-400 mb-2 ...">
```

Replace `text-teal-600 dark:text-teal-400` with `text-primary`:

```tsx
<p className="text-primary mb-2 uppercase tracking-wider"
```

---

### Task 6: Import 6 breathe-extract template components

**Files:**
- Create: `src/app/components/custom/template/StatGrid.tsx`
- Create: `src/app/components/custom/template/PageToolbar.tsx`
- Create: `src/app/components/custom/template/DataSection.tsx`
- Create: `src/app/components/custom/template/PageBody.tsx`
- Create: `src/app/components/custom/template/MobileFab.tsx`
- Create: `src/app/components/custom/template/TabBar.tsx`
- Create: `src/app/components/custom/template/index.ts`

- [ ] **Create the directory:**

```bash
mkdir -p "/Users/ramkumar.ganesh/Downloads/APOS pitch/Product Factory/Breathe Design system/src/app/components/custom/template"
```

- [ ] **Create `src/app/components/custom/template/StatGrid.tsx`:**

```tsx
import { ReactNode } from 'react'
import { cn } from '@/app/components/ui/utils'

export type StatGridVariant = '2col' | '2-1' | '1-2' | '1-sidebar'

const variantClasses: Record<StatGridVariant, string> = {
  '2col':      'grid gap-4 md:grid-cols-2',
  '2-1':       'grid gap-4 lg:grid-cols-[2fr_1fr]',
  '1-2':       'grid gap-4 lg:grid-cols-[1fr_2fr]',
  '1-sidebar': 'grid gap-4 lg:grid-cols-[1fr_280px]',
}

interface StatGridProps {
  children: ReactNode
  variant?: StatGridVariant
  className?: string
}

export function StatGrid({ children, variant = '2col', className }: StatGridProps) {
  return (
    <div className={cn(variantClasses[variant], className)}>
      {children}
    </div>
  )
}
```

- [ ] **Create `src/app/components/custom/template/PageToolbar.tsx`:**

```tsx
import { ReactNode } from 'react'
import { cn } from '@/app/components/ui/utils'

interface PageToolbarProps {
  left?: ReactNode
  right?: ReactNode
  className?: string
}

export function PageToolbar({ left, right, className }: PageToolbarProps) {
  return (
    <div className={cn('flex items-center gap-3 justify-between flex-wrap', className)}>
      {left && (
        <div className="flex items-center gap-3 flex-wrap">
          {left}
        </div>
      )}
      {right && (
        <div className="flex items-center gap-2 flex-shrink-0">
          {right}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Create `src/app/components/custom/template/DataSection.tsx`:**

```tsx
import { ReactNode } from 'react'
import { cn } from '@/app/components/ui/utils'

interface DataSectionProps {
  children: ReactNode
  className?: string
}

export function DataSection({ children, className }: DataSectionProps) {
  return (
    <div className={cn('rounded-lg border border-border bg-card p-4 md:p-6', className)}>
      {children}
    </div>
  )
}
```

- [ ] **Create `src/app/components/custom/template/PageBody.tsx`:**

```tsx
import { ReactNode } from 'react'
import { cn } from '@/app/components/ui/utils'

interface PageBodyProps {
  children: ReactNode
  className?: string
}

export function PageBody({ children, className }: PageBodyProps) {
  return (
    <div className={cn('pt-2 px-4 pb-4 md:px-6 md:pb-6 lg:px-8 lg:pb-8', className)}>
      {children}
    </div>
  )
}
```

- [ ] **Create `src/app/components/custom/template/MobileFab.tsx`:**

```tsx
import { ReactNode } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu'
import { cn } from '@/app/components/ui/utils'

export interface FabAction {
  label: string
  icon: ReactNode
  onClick: () => void
}

interface MobileFabProps {
  onClick?: () => void
  actions?: FabAction[]
  icon?: ReactNode
  className?: string
}

export function MobileFab({ onClick, actions, icon, className }: MobileFabProps) {
  if (actions && actions.length > 0) {
    return (
      <div className={cn('fixed bottom-6 right-4 z-50 md:hidden', className)}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              {icon ?? <Plus className="h-6 w-6 text-primary-foreground" />}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="mb-2 w-48">
            {actions.map((action) => (
              <DropdownMenuItem key={action.label} onClick={action.onClick}>
                {action.icon}
                <span>{action.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }

  return (
    <div className={cn('fixed bottom-6 right-4 z-50 md:hidden', className)}>
      <Button
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg"
        onClick={onClick}
      >
        {icon ?? <Plus className="h-6 w-6" />}
      </Button>
    </div>
  )
}
```

- [ ] **Create `src/app/components/custom/template/TabBar.tsx`:**

```tsx
import { ReactNode } from 'react'
import { cn } from '@/app/components/ui/utils'

export interface TabBarItem {
  value: string
  label: string
  icon?: ReactNode
  badge?: number | string
}

interface TabBarProps {
  tabs: readonly TabBarItem[]
  value: string
  onChange: (value: string) => void
  className?: string
}

export function TabBar({ tabs, value, onChange, className }: TabBarProps) {
  return (
    <div className={cn('flex items-center rounded-lg bg-muted p-1 gap-0.5', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onChange(tab.value)}
          className={cn(
            'flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-medium transition-all duration-150',
            value === tab.value
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {tab.icon}
          {tab.label}
          {tab.badge !== undefined && (
            <span className="ml-0.5 rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Create `src/app/components/custom/template/index.ts`:**

```ts
export { StatGrid } from './StatGrid'
export type { StatGridVariant } from './StatGrid'
export { PageToolbar } from './PageToolbar'
export { DataSection } from './DataSection'
export { PageBody } from './PageBody'
export { MobileFab } from './MobileFab'
export type { FabAction } from './MobileFab'
export { TabBar } from './TabBar'
export type { TabBarItem } from './TabBar'
```

---

### Task 7: Update DesignTokensPage.tsx — Aumraa tab correct values

**Files:**
- Modify: `src/app/pages/foundations/DesignTokensPage.tsx`

- [ ] **Open the file** and find the Aumraa product entry in the `products` array. Replace its `colors` array:

```ts
colors: [
  { name: 'Primary',        token: '--amra-color-primary',        value: '#2F9E44', role: 'Forest green — buttons, headings, primary actions' },
  { name: 'Secondary',      token: '--amra-color-secondary',      value: '#CFCF2A', role: 'Yellow-green — energy, accent highlights' },
  { name: 'Tertiary',       token: '--amra-color-tertiary',       value: '#2F6FED', role: 'Blue — digital accent, links' },
  { name: 'Positive',       token: '--amra-color-positive',       value: '#00D06D', role: 'Bright green — success, positive states' },
  { name: 'Negative',       token: '--amra-color-negative',       value: '#E11D2A', role: 'Red — errors, destructive' },
  { name: 'Alert',          token: '--amra-color-accent',         value: '#F59E0B', role: 'Amber — warnings, calls to action' },
  { name: 'Background',     token: '--amra-color-background',     value: '#ffffff', role: 'Page surface' },
  { name: 'Foreground',     token: '--amra-color-foreground',     value: '#002100', role: 'Deep forest black — primary text' },
  { name: 'Gradient Start', token: '--amra-color-gradient-start', value: '#4ADE80', role: 'Brand gradient light end' },
  { name: 'Gradient End',   token: '--amra-color-gradient-end',   value: '#15803D', role: 'Brand gradient dark end' },
],
```

- [ ] **Replace its `typography` array:**

```ts
typography: [
  { name: 'Typeface',        token: '--amra-font-family',          value: 'Source Sans 3' },
  { name: 'Base size',       token: '--amra-font-size-base',       value: '16px' },
  { name: 'Body weight',     token: '--amra-font-weight-body',     value: '400' },
  { name: 'Heading weight',  token: '--amra-font-weight-heading',  value: '700 (H1–H2)' },
  { name: 'Subhead weight',  token: '--amra-font-weight-subhead',  value: '600 (H3–H6)' },
],
```

---

### Task 8: Build check + commit Phase 1

- [ ] **Build:**

```bash
cd "/Users/ramkumar.ganesh/Downloads/APOS pitch/Product Factory/Breathe Design system"
pnpm build
```

Expected: zero TypeScript errors, build succeeds.

- [ ] **Spot check in browser** — run `pnpm dev`, navigate to Design Tokens → Aumraa tab. Primary swatch should be green `#2F9E44`. Sidebar active link should have a green left border.

- [ ] **Commit:**

```bash
git add tokens/src/global.json tokens/src/aumraa.json tokens/dist \
        src/styles/theme.css src/styles/fonts.css \
        src/app/components/layout/Sidebar.tsx \
        src/app/components/shared/PageHeader.tsx \
        src/app/pages/foundations/DesignTokensPage.tsx \
        src/app/components/custom/
git commit -m "feat(phase-1): Aumraa green tokens + shell accent + breathe-extract components

- Correct Aumraa primary to forest green #2F9E44 (was blue)
- Add green/yellowGreen/emerald palettes + Source Sans 3 to global.json
- Shell primary/ring now follow amra tokens (neutral surfaces unchanged)
- Sidebar active item: green left border + soft green tint
- Import 6 template components from breathe-extract (StatGrid, PageToolbar,
  DataSection, PageBody, MobileFab, TabBar) with remapped import paths"
```

---

## Phase 2 — ProductThemeContext + ComponentPageLayout + Nav

---

### Task 9: Create ProductThemeContext.tsx

**Files:**
- Create: `src/app/context/ProductThemeContext.tsx`

- [ ] **Create `src/app/context/` directory** if it doesn't exist:

```bash
mkdir -p "/Users/ramkumar.ganesh/Downloads/APOS pitch/Product Factory/Breathe Design system/src/app/context"
```

- [ ] **Create `src/app/context/ProductThemeContext.tsx`:**

```tsx
import { createContext, useContext, useState, ReactNode } from 'react'

// ─── Product IDs ────────────────────────────────────────────────────────────
export type ProductId =
  | 'lemniscate'
  | 'aumraa'
  | 'technocracy'
  | 'maligai'
  | 'ulagellam'
  | 'ilakh'
  | 'yakaizen'

// ─── Product metadata + CSS variable overrides ──────────────────────────────
// vars override shadcn generic vars (--primary, --background etc.)
// inside ProductPreviewWrapper. Components read those vars automatically.

export const productMeta: Record<ProductId, {
  label: string
  prefix: string
  description: string
  vars: Record<string, string>
}> = {
  lemniscate: {
    label: 'Lemniscate',
    prefix: 'lmns',
    description: 'Community finance SaaS — light, blue primary',
    vars: {
      '--primary':                  '#40AAD4',
      '--primary-foreground':       '#ffffff',
      '--secondary':                '#F3F4F6',
      '--secondary-foreground':     '#1F2937',
      '--accent':                   '#E07722',
      '--accent-foreground':        '#ffffff',
      '--background':               '#ffffff',
      '--foreground':               '#1F2937',
      '--muted':                    '#F3F4F6',
      '--muted-foreground':         '#6B7280',
      '--border':                   '#E5E7EB',
      '--ring':                     '#40AAD4',
      '--radius':                   '0.625rem',
      '--destructive':              '#DC2626',
      '--destructive-foreground':   '#ffffff',
    },
  },
  aumraa: {
    label: 'Aumraa',
    prefix: 'amra',
    description: 'Studio brand — green primary, Source Sans 3',
    vars: {
      '--primary':                  '#2F9E44',
      '--primary-foreground':       '#ffffff',
      '--secondary':                '#F0FDF4',
      '--secondary-foreground':     '#002100',
      '--accent':                   '#CFCF2A',
      '--accent-foreground':        '#002100',
      '--background':               '#ffffff',
      '--foreground':               '#002100',
      '--muted':                    '#F0FDF4',
      '--muted-foreground':         '#6B7280',
      '--border':                   '#E5E7EB',
      '--ring':                     '#2F9E44',
      '--radius':                   '0.5rem',
      '--destructive':              '#E11D2A',
      '--destructive-foreground':   '#ffffff',
    },
  },
  technocracy: {
    label: 'Technocracy',
    prefix: 'thcy',
    description: 'Admin dashboard — dark surfaces',
    vars: {
      '--primary':                  '#40AAD4',
      '--primary-foreground':       '#ffffff',
      '--secondary':                '#1F2937',
      '--secondary-foreground':     '#F9FAFB',
      '--accent':                   '#E07722',
      '--accent-foreground':        '#ffffff',
      '--background':               '#111827',
      '--foreground':               '#F9FAFB',
      '--muted':                    '#1F2937',
      '--muted-foreground':         '#9CA3AF',
      '--border':                   '#374151',
      '--ring':                     '#40AAD4',
      '--radius':                   '0.5rem',
      '--destructive':              '#DC2626',
      '--destructive-foreground':   '#ffffff',
    },
  },
  maligai: {
    label: 'Maligai Manager',
    prefix: 'mlgm',
    description: 'Grocery & retail — mobile primary',
    vars: {
      '--primary':                  '#40AAD4',
      '--primary-foreground':       '#ffffff',
      '--secondary':                '#F3F4F6',
      '--secondary-foreground':     '#1F2937',
      '--accent':                   '#E07722',
      '--accent-foreground':        '#ffffff',
      '--background':               '#ffffff',
      '--foreground':               '#1F2937',
      '--muted':                    '#F3F4F6',
      '--muted-foreground':         '#6B7280',
      '--border':                   '#E5E7EB',
      '--ring':                     '#40AAD4',
      '--radius':                   '1rem',
      '--destructive':              '#DC2626',
      '--destructive-foreground':   '#ffffff',
    },
  },
  ulagellam: {
    label: 'Ulagellam',
    prefix: 'ulge',
    description: 'Mobile-only app',
    vars: {
      '--primary':                  '#40AAD4',
      '--primary-foreground':       '#ffffff',
      '--secondary':                '#F3F4F6',
      '--secondary-foreground':     '#1F2937',
      '--accent':                   '#E07722',
      '--accent-foreground':        '#ffffff',
      '--background':               '#ffffff',
      '--foreground':               '#1F2937',
      '--muted':                    '#F3F4F6',
      '--muted-foreground':         '#6B7280',
      '--border':                   '#E5E7EB',
      '--ring':                     '#40AAD4',
      '--radius':                   '1rem',
      '--destructive':              '#DC2626',
      '--destructive-foreground':   '#ffffff',
    },
  },
  ilakh: {
    label: 'Ilakh',
    prefix: 'ilkh',
    description: 'Web + mobile — mobile-first',
    vars: {
      '--primary':                  '#40AAD4',
      '--primary-foreground':       '#ffffff',
      '--secondary':                '#F3F4F6',
      '--secondary-foreground':     '#1F2937',
      '--accent':                   '#E07722',
      '--accent-foreground':        '#ffffff',
      '--background':               '#ffffff',
      '--foreground':               '#1F2937',
      '--muted':                    '#F3F4F6',
      '--muted-foreground':         '#6B7280',
      '--border':                   '#E5E7EB',
      '--ring':                     '#40AAD4',
      '--radius':                   '0.625rem',
      '--destructive':              '#DC2626',
      '--destructive-foreground':   '#ffffff',
    },
  },
  yakaizen: {
    label: 'Yakaizen',
    prefix: 'ykzn',
    description: 'Mobile, watch, widgets',
    vars: {
      '--primary':                  '#40AAD4',
      '--primary-foreground':       '#ffffff',
      '--secondary':                '#F3F4F6',
      '--secondary-foreground':     '#1F2937',
      '--accent':                   '#E07722',
      '--accent-foreground':        '#ffffff',
      '--background':               '#ffffff',
      '--foreground':               '#1F2937',
      '--muted':                    '#F3F4F6',
      '--muted-foreground':         '#6B7280',
      '--border':                   '#E5E7EB',
      '--ring':                     '#40AAD4',
      '--radius':                   '1rem',
      '--destructive':              '#DC2626',
      '--destructive-foreground':   '#ffffff',
    },
  },
}

// ─── Context ─────────────────────────────────────────────────────────────────

interface ProductThemeContextValue {
  activeProduct: ProductId
  setActiveProduct: (id: ProductId) => void
}

const ProductThemeContext = createContext<ProductThemeContextValue>({
  activeProduct: 'lemniscate',
  setActiveProduct: () => {},
})

export function ProductThemeProvider({ children }: { children: ReactNode }) {
  const [activeProduct, setActiveProduct] = useState<ProductId>('lemniscate')
  return (
    <ProductThemeContext.Provider value={{ activeProduct, setActiveProduct }}>
      {children}
    </ProductThemeContext.Provider>
  )
}

export function useProductTheme() {
  return useContext(ProductThemeContext)
}

// ─── Preview wrapper ──────────────────────────────────────────────────────────
// Wrap any component preview in this to apply the active product's tokens.
// The div injects CSS vars as inline styles; shadcn components inside read
// --primary, --background etc. and render in the active product's brand.

export function ProductPreviewWrapper({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const { activeProduct } = useProductTheme()
  const vars = productMeta[activeProduct].vars

  return (
    <div
      style={vars as React.CSSProperties}
      className={`rounded-lg ${className}`}
    >
      {children}
    </div>
  )
}
```

---

### Task 10: Wrap App with ProductThemeProvider

**Files:**
- Modify: `src/app/App.tsx`

- [ ] **Open `src/app/App.tsx`** (currently 4 lines). Replace entirely:

```tsx
import { RouterProvider } from 'react-router'
import { router } from './routes'
import { ProductThemeProvider } from './context/ProductThemeContext'

export default function App() {
  return (
    <ProductThemeProvider>
      <RouterProvider router={router} />
    </ProductThemeProvider>
  )
}
```

---

### Task 11: Create ComponentPageLayout.tsx

**Files:**
- Create: `src/app/components/shared/ComponentPageLayout.tsx`

- [ ] **Create the file:**

```tsx
import { ReactNode } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/app/components/ui/tabs'
import { Badge } from '@/app/components/ui/badge'
import {
  useProductTheme,
  productMeta,
  ProductId,
  ProductPreviewWrapper,
} from '@/app/context/ProductThemeContext'

// ─── Types ───────────────────────────────────────────────────────────────────

export type AtomicLevel = 'Atom' | 'Molecule' | 'Organism' | 'Template'
export type ComponentStatus = 'Stable' | 'Beta' | 'Deprecated' | 'Planned'

export interface ComponentSection {
  title: string
  description?: string
  preview: ReactNode
  code?: {
    react?: string
    reactNative?: string
    ios?: string
    android?: string
  }
}

interface ComponentPageLayoutProps {
  title: string
  description: string
  level: AtomicLevel
  status?: ComponentStatus
  sections: ComponentSection[]
  implemented?: ProductId[]
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const statusVariant = (s: ComponentStatus): 'default' | 'secondary' | 'destructive' | 'outline' => {
  if (s === 'Stable')     return 'default'
  if (s === 'Beta')       return 'secondary'
  if (s === 'Deprecated') return 'destructive'
  return 'outline'
}

const levelColour: Record<AtomicLevel, string> = {
  Atom:      'bg-blue-50 text-blue-700 border-blue-200',
  Molecule:  'bg-purple-50 text-purple-700 border-purple-200',
  Organism:  'bg-amber-50 text-amber-700 border-amber-200',
  Template:  'bg-green-50 text-green-700 border-green-200',
}

const ALL_PRODUCTS = Object.keys(productMeta) as ProductId[]

// ─── Product switcher ─────────────────────────────────────────────────────────

function ProductSwitcher({ implemented }: { implemented: ProductId[] }) {
  const { activeProduct, setActiveProduct } = useProductTheme()

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs text-muted-foreground font-medium mr-1">Product:</span>
      {ALL_PRODUCTS.map((id) => {
        const meta = productMeta[id]
        const isImpl = implemented.includes(id)
        const isActive = activeProduct === id
        return (
          <button
            key={id}
            onClick={() => setActiveProduct(id)}
            className={[
              'px-3 py-1 rounded-full text-xs font-medium border transition-all',
              isActive
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-background text-muted-foreground hover:border-primary/50',
              !isImpl ? 'opacity-60' : '',
            ].join(' ')}
            title={!isImpl ? 'Placeholder — confirm at product design kickoff' : meta.description}
          >
            {meta.label}
            {!isImpl && <span className="ml-1 opacity-70">·</span>}
          </button>
        )
      })}
    </div>
  )
}

// ─── Code tabs ───────────────────────────────────────────────────────────────

function CodeTabs({ code }: { code: NonNullable<ComponentSection['code']> }) {
  const tabs = [
    { id: 'react',       label: 'React',         content: code.react },
    { id: 'rn',          label: 'React Native',  content: code.reactNative },
    { id: 'ios',         label: 'iOS (Swift)',    content: code.ios },
    { id: 'android',     label: 'Android (XML)', content: code.android },
  ].filter(t => t.content)

  if (tabs.length === 0) return null

  return (
    <Tabs defaultValue={tabs[0].id}>
      <TabsList className="h-8">
        {tabs.map(t => (
          <TabsTrigger key={t.id} value={t.id} className="text-xs px-3 h-7">
            {t.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map(t => (
        <TabsContent key={t.id} value={t.id}>
          <pre className="rounded-lg bg-muted p-4 text-xs font-mono overflow-x-auto text-foreground whitespace-pre-wrap">
            <code>{t.content}</code>
          </pre>
        </TabsContent>
      ))}
    </Tabs>
  )
}

// ─── Main layout ──────────────────────────────────────────────────────────────

export function ComponentPageLayout({
  title,
  description,
  level,
  status = 'Stable',
  sections,
  implemented = ['lemniscate', 'aumraa'],
}: ComponentPageLayoutProps) {
  return (
    <div className="max-w-3xl px-6 lg:px-10 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-semibold">{title}</h1>
          <Badge variant={statusVariant(status)}>{status}</Badge>
          <span className={`text-xs px-2 py-0.5 rounded border font-medium ${levelColour[level]}`}>
            {level}
          </span>
        </div>
        <p className="text-muted-foreground max-w-2xl">{description}</p>
        <div className="pt-2 pb-4 border-b border-border space-y-2">
          <ProductSwitcher implemented={implemented} />
          <p className="text-xs text-muted-foreground">
            Previews render with the selected product's token set.
            Dots (·) indicate placeholder implementations confirmed at each product's design kickoff.
          </p>
        </div>
      </div>

      {/* Sections */}
      {sections.map((section, i) => (
        <div key={i} className="space-y-4">
          <div>
            <h2 className="text-lg font-medium">{section.title}</h2>
            {section.description && (
              <p className="text-sm text-muted-foreground mt-0.5">{section.description}</p>
            )}
          </div>

          <Tabs defaultValue="preview">
            <TabsList className="h-8">
              <TabsTrigger value="preview" className="text-xs px-3 h-7">Preview</TabsTrigger>
              {section.code && (
                <TabsTrigger value="code" className="text-xs px-3 h-7">Code</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="preview">
              <ProductPreviewWrapper className="p-8 border border-border bg-[var(--background)]">
                {section.preview}
              </ProductPreviewWrapper>
            </TabsContent>

            {section.code && (
              <TabsContent value="code">
                <CodeTabs code={section.code} />
              </TabsContent>
            )}
          </Tabs>
        </div>
      ))}
    </div>
  )
}
```

---

### Task 12: Update navData.ts — atomic sections

**Files:**
- Modify: `src/app/components/layout/navData.ts`

- [ ] **Replace the entire file:**

```ts
export interface NavItem {
  label: string
  path: string
  badge?: string
  description?: string
}

export interface NavSection {
  section: string
  items: NavItem[]
}

export const navigation: NavSection[] = [
  {
    section: 'Overview',
    items: [
      { label: 'Introduction',   path: '/',                description: 'What is Breathe design system' },
      { label: 'Getting Started', path: '/getting-started', description: 'Install and set up Breathe' },
    ],
  },
  {
    section: 'Foundations',
    items: [
      { label: 'Logos',         path: '/foundations/logos',          description: 'Brand logo sets and download assets' },
      { label: 'Colors',        path: '/foundations/colors',         description: 'Color palette and tokens' },
      { label: 'Design Tokens', path: '/foundations/design-tokens',  description: 'Token architecture and product outputs' },
      { label: 'Typography',    path: '/foundations/typography',     description: 'Type scale and fonts' },
      { label: 'Spacing',       path: '/foundations/spacing',        description: 'Spacing scale and layout' },
      { label: 'Grid',          path: '/foundations/grid',           description: 'Responsive grid system' },
      { label: 'Elevation',     path: '/foundations/elevation',      description: 'Shadows and depth' },
      { label: 'Iconography',   path: '/foundations/icons',          description: 'Icon library and usage' },
      { label: 'Motion',        path: '/foundations/motion',         description: 'Animation tokens and patterns' },
    ],
  },
  {
    section: 'Atoms',
    items: [
      { label: 'Button',      path: '/atoms/button',      description: 'Action triggers' },
      { label: 'Input',       path: '/atoms/input',       description: 'Text entry fields' },
      { label: 'Checkbox',    path: '/atoms/checkbox',    description: 'Boolean selection' },
      { label: 'Switch',      path: '/atoms/switch',      description: 'Toggle controls' },
      { label: 'Avatar',      path: '/atoms/avatar',      description: 'User representations' },
      { label: 'Badge',       path: '/atoms/badge',       description: 'Status indicators' },
    ],
  },
  {
    section: 'Molecules',
    items: [
      { label: 'Alert',    path: '/molecules/alert',   description: 'Feedback messages' },
      { label: 'Card',     path: '/molecules/card',    description: 'Content containers' },
      { label: 'Select',   path: '/molecules/select',  description: 'Option dropdowns' },
      { label: 'Tabs',     path: '/molecules/tabs',    description: 'Content navigation' },
      { label: 'Tooltip',  path: '/molecules/tooltip', description: 'Contextual hints' },
    ],
  },
  {
    section: 'Organisms',
    items: [
      { label: 'Dialog', path: '/organisms/dialog', description: 'Overlay dialogs' },
    ],
  },
  {
    section: 'Templates',
    items: [
      { label: 'Stat Grid',     path: '/templates/stat-grid',     description: 'Responsive stat card grid' },
      { label: 'Page Toolbar',  path: '/templates/page-toolbar',  description: 'Left/right slot toolbar' },
      { label: 'Data Section',  path: '/templates/data-section',  description: 'Bordered data container' },
      { label: 'Page Body',     path: '/templates/page-body',     description: 'Content inset wrapper' },
      { label: 'Mobile FAB',    path: '/templates/mobile-fab',    description: 'Fixed floating action button' },
      { label: 'Tab Bar',       path: '/templates/tab-bar',       description: 'Pill-style tab switcher' },
    ],
  },
]

export const allNavItems = navigation.flatMap(s => s.items)
```

---

### Task 13: Update routes.ts + create page directories

**Files:**
- Modify: `src/app/routes.ts`

- [ ] **Create page directories:**

```bash
cd "/Users/ramkumar.ganesh/Downloads/APOS pitch/Product Factory/Breathe Design system"
mkdir -p src/app/pages/atoms src/app/pages/molecules src/app/pages/organisms src/app/pages/templates
```

- [ ] **Replace `src/app/routes.ts` entirely** (note: old `/components/*` paths kept as redirects until Phase 3 removes the old files):

```ts
import { createBrowserRouter, Navigate } from 'react-router'
import { Root } from './components/layout/Root'
import { HomePage } from './pages/HomePage'
import { GettingStartedPage } from './pages/GettingStartedPage'
import { NotFoundPage } from './pages/NotFoundPage'

// Foundations
import { LogosPage }        from './pages/foundations/LogosPage'
import { ColorsPage }       from './pages/foundations/ColorsPage'
import { DesignTokensPage } from './pages/foundations/DesignTokensPage'
import { TypographyPage }   from './pages/foundations/TypographyPage'
import { SpacingPage }      from './pages/foundations/SpacingPage'
import { GridPage }         from './pages/foundations/GridPage'
import { ElevationPage }    from './pages/foundations/ElevationPage'
import { IconsPage }        from './pages/foundations/IconsPage'
import { MotionPage }       from './pages/foundations/MotionPage'

// Legacy component pages — kept until Phase 3 page migrations complete
import { ButtonPage as LegacyButtonPage }     from './pages/components/ButtonPage'
import { InputPage as LegacyInputPage }       from './pages/components/InputPage'
import { CardPage as LegacyCardPage }         from './pages/components/CardPage'
import { BadgePage as LegacyBadgePage }       from './pages/components/BadgePage'
import { AvatarPage as LegacyAvatarPage }     from './pages/components/AvatarPage'
import { AlertPage as LegacyAlertPage }       from './pages/components/AlertPage'
import { ModalPage as LegacyModalPage }       from './pages/components/ModalPage'
import { TabsPage as LegacyTabsPage }         from './pages/components/TabsPage'
import { TooltipPage as LegacyTooltipPage }   from './pages/components/TooltipPage'
import { SelectPage as LegacySelectPage }     from './pages/components/SelectPage'
import { CheckboxPage as LegacyCheckboxPage } from './pages/components/CheckboxPage'
import { SwitchPage as LegacySwitchPage }     from './pages/components/SwitchPage'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: 'getting-started', Component: GettingStartedPage },

      // Foundations
      { path: 'foundations/logos',         Component: LogosPage },
      { path: 'foundations/colors',        Component: ColorsPage },
      { path: 'foundations/design-tokens', Component: DesignTokensPage },
      { path: 'foundations/typography',    Component: TypographyPage },
      { path: 'foundations/spacing',       Component: SpacingPage },
      { path: 'foundations/grid',          Component: GridPage },
      { path: 'foundations/elevation',     Component: ElevationPage },
      { path: 'foundations/icons',         Component: IconsPage },
      { path: 'foundations/motion',        Component: MotionPage },

      // Legacy /components/* — redirect to new atomic paths
      { path: 'components/button',   element: <Navigate to="/atoms/button"      replace /> },
      { path: 'components/input',    element: <Navigate to="/atoms/input"       replace /> },
      { path: 'components/checkbox', element: <Navigate to="/atoms/checkbox"    replace /> },
      { path: 'components/switch',   element: <Navigate to="/atoms/switch"      replace /> },
      { path: 'components/avatar',   element: <Navigate to="/atoms/avatar"      replace /> },
      { path: 'components/badge',    element: <Navigate to="/atoms/badge"       replace /> },
      { path: 'components/alert',    element: <Navigate to="/molecules/alert"   replace /> },
      { path: 'components/card',     element: <Navigate to="/molecules/card"    replace /> },
      { path: 'components/select',   element: <Navigate to="/molecules/select"  replace /> },
      { path: 'components/tabs',     element: <Navigate to="/molecules/tabs"    replace /> },
      { path: 'components/tooltip',  element: <Navigate to="/molecules/tooltip" replace /> },
      { path: 'components/modal',    element: <Navigate to="/organisms/dialog"  replace /> },

      // Atoms — served by legacy pages until Phase 3 creates new ones
      { path: 'atoms/button',   Component: LegacyButtonPage },
      { path: 'atoms/input',    Component: LegacyInputPage },
      { path: 'atoms/checkbox', Component: LegacyCheckboxPage },
      { path: 'atoms/switch',   Component: LegacySwitchPage },
      { path: 'atoms/avatar',   Component: LegacyAvatarPage },
      { path: 'atoms/badge',    Component: LegacyBadgePage },

      // Molecules — served by legacy pages until Phase 3
      { path: 'molecules/alert',   Component: LegacyAlertPage },
      { path: 'molecules/card',    Component: LegacyCardPage },
      { path: 'molecules/select',  Component: LegacySelectPage },
      { path: 'molecules/tabs',    Component: LegacyTabsPage },
      { path: 'molecules/tooltip', Component: LegacyTooltipPage },

      // Organisms — served by legacy page until Phase 3
      { path: 'organisms/dialog', Component: LegacyModalPage },

      // Templates — empty until Phase 3 creates pages
      // (nav links will 404 until Task 18 adds them)

      { path: '*', Component: NotFoundPage },
    ],
  },
])
```

---

### Task 14: Build check + commit Phase 2

- [ ] **Build:**

```bash
cd "/Users/ramkumar.ganesh/Downloads/APOS pitch/Product Factory/Breathe Design system"
pnpm build
```

Expected: zero TypeScript errors.

- [ ] **Browser check** — run `pnpm dev`:
  1. Nav shows sections: Overview / Foundations / Atoms / Molecules / Organisms / Templates
  2. Navigate to `/atoms/button` — legacy page loads (redirected from `/components/button`)
  3. Navigate to `/components/button` — redirects to `/atoms/button`

- [ ] **Commit:**

```bash
git add src/app/context/ProductThemeContext.tsx \
        src/app/components/shared/ComponentPageLayout.tsx \
        src/app/App.tsx \
        src/app/components/layout/navData.ts \
        src/app/routes.ts \
        src/app/pages/atoms \
        src/app/pages/molecules \
        src/app/pages/organisms \
        src/app/pages/templates
git commit -m "feat(phase-2): atomic nav + ProductThemeContext + ComponentPageLayout

- ProductThemeContext: 7-product CSS var switching for component previews
- ComponentPageLayout: reusable template with product switcher + code tabs
- navData: Atoms / Molecules / Organisms / Templates sections
- routes: new atomic paths wired to legacy pages (interim), redirects from /components/*"
```

---

## Phase 3 — Page Migrations

---

### Task 15: Create Atom pages (Button, Input, Checkbox, Switch, Avatar, Badge)

**Files:**
- Create: `src/app/pages/atoms/ButtonPage.tsx`
- Create: `src/app/pages/atoms/InputPage.tsx`
- Create: `src/app/pages/atoms/CheckboxPage.tsx`
- Create: `src/app/pages/atoms/SwitchPage.tsx`
- Create: `src/app/pages/atoms/AvatarPage.tsx`
- Create: `src/app/pages/atoms/BadgePage.tsx`

- [ ] **Create `src/app/pages/atoms/ButtonPage.tsx`:**

```tsx
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Button } from '@/app/components/ui/button'
import { ArrowRight, Download, Trash2 } from 'lucide-react'

export function ButtonPage() {
  return (
    <ComponentPageLayout
      title="Button"
      description="Triggers an action or navigates the user. Choose the variant that matches the importance and nature of the action."
      level="Atom"
      status="Stable"
      sections={[
        {
          title: 'Variants',
          description: 'Six variants for different levels of emphasis.',
          preview: (
            <div className="flex flex-wrap gap-3">
              <Button variant="default">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Danger</Button>
              <Button variant="link">Link</Button>
            </div>
          ),
          code: {
            react: `import { Button } from '@breathe/ui'

<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Danger</Button>
<Button variant="link">Link</Button>`,
            reactNative: `import { TouchableOpacity, Text, StyleSheet } from 'react-native'
// Tokens from: @breathe/tokens/react-native/lemniscate
import { tokens } from '@breathe/tokens/react-native/lemniscate'

<TouchableOpacity style={[styles.btn, { backgroundColor: tokens.lmnsColorPrimary }]}>
  <Text style={{ color: tokens.lmnsColorPrimaryForeground }}>Primary</Text>
</TouchableOpacity>`,
          },
        },
        {
          title: 'Sizes',
          description: 'Five sizes from sm to xl.',
          preview: (
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          ),
          code: {
            react: `<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>`,
          },
        },
        {
          title: 'With icons',
          description: 'Left icon, right icon, or icon-only.',
          preview: (
            <div className="flex flex-wrap items-center gap-3">
              <Button><Download className="mr-2 h-4 w-4" />Download</Button>
              <Button variant="outline">Continue <ArrowRight className="ml-2 h-4 w-4" /></Button>
              <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button>
            </div>
          ),
          code: {
            react: `import { Download, ArrowRight, Trash2 } from 'lucide-react'

<Button><Download className="mr-2 h-4 w-4" />Download</Button>
<Button variant="outline">Continue <ArrowRight className="ml-2 h-4 w-4" /></Button>
<Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button>`,
          },
        },
        {
          title: 'States',
          description: 'Disabled state.',
          preview: (
            <div className="flex flex-wrap items-center gap-3">
              <Button disabled>Disabled</Button>
              <Button variant="outline" disabled>Disabled Outline</Button>
            </div>
          ),
          code: {
            react: `<Button disabled>Disabled</Button>
<Button variant="outline" disabled>Disabled Outline</Button>`,
          },
        },
      ]}
    />
  )
}
```

- [ ] **Create `src/app/pages/atoms/InputPage.tsx`:**

```tsx
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'

export function InputPage() {
  return (
    <ComponentPageLayout
      title="Input"
      description="Text entry field for forms and search. Always pair with a Label for accessibility."
      level="Atom"
      status="Stable"
      sections={[
        {
          title: 'Default',
          preview: (
            <div className="space-y-2 max-w-xs">
              <Label htmlFor="demo-input">Email address</Label>
              <Input id="demo-input" type="email" placeholder="you@example.com" />
            </div>
          ),
          code: {
            react: `import { Input } from '@breathe/ui'
import { Label } from '@breathe/ui'

<Label htmlFor="email">Email address</Label>
<Input id="email" type="email" placeholder="you@example.com" />`,
          },
        },
        {
          title: 'States',
          description: 'Disabled and read-only variants.',
          preview: (
            <div className="space-y-3 max-w-xs">
              <Input placeholder="Disabled" disabled />
              <Input placeholder="Read only" readOnly value="Read-only value" />
            </div>
          ),
          code: {
            react: `<Input placeholder="Disabled" disabled />
<Input readOnly value="Read-only value" />`,
          },
        },
      ]}
    />
  )
}
```

- [ ] **Create `src/app/pages/atoms/CheckboxPage.tsx`:**

```tsx
import { useState } from 'react'
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Checkbox } from '@/app/components/ui/checkbox'
import { Label } from '@/app/components/ui/label'

export function CheckboxPage() {
  return (
    <ComponentPageLayout
      title="Checkbox"
      description="Boolean selection control. Use for independent options that don't affect each other."
      level="Atom"
      status="Stable"
      sections={[
        {
          title: 'Default',
          preview: (
            <div className="flex items-center gap-2">
              <Checkbox id="cb1" defaultChecked />
              <Label htmlFor="cb1">Accept terms and conditions</Label>
            </div>
          ),
          code: {
            react: `import { Checkbox } from '@breathe/ui'
import { Label } from '@breathe/ui'

<Checkbox id="terms" defaultChecked />
<Label htmlFor="terms">Accept terms and conditions</Label>`,
          },
        },
        {
          title: 'States',
          preview: (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Checkbox id="cb-checked" defaultChecked />
                <Label htmlFor="cb-checked">Checked</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="cb-unchecked" />
                <Label htmlFor="cb-unchecked">Unchecked</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="cb-disabled" disabled />
                <Label htmlFor="cb-disabled" className="text-muted-foreground">Disabled</Label>
              </div>
            </div>
          ),
          code: {
            react: `<Checkbox defaultChecked />   {/* checked */}
<Checkbox />               {/* unchecked */}
<Checkbox disabled />       {/* disabled */}`,
          },
        },
      ]}
    />
  )
}
```

- [ ] **Create `src/app/pages/atoms/SwitchPage.tsx`:**

```tsx
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Switch } from '@/app/components/ui/switch'
import { Label } from '@/app/components/ui/label'

export function SwitchPage() {
  return (
    <ComponentPageLayout
      title="Switch"
      description="Toggle control for binary settings that take immediate effect. Prefer Switch over Checkbox for settings that apply without a submit action."
      level="Atom"
      status="Stable"
      sections={[
        {
          title: 'Default',
          preview: (
            <div className="flex items-center gap-3">
              <Switch id="sw1" defaultChecked />
              <Label htmlFor="sw1">Enable notifications</Label>
            </div>
          ),
          code: {
            react: `import { Switch } from '@breathe/ui'
import { Label } from '@breathe/ui'

<Switch id="notifications" defaultChecked />
<Label htmlFor="notifications">Enable notifications</Label>`,
          },
        },
        {
          title: 'States',
          preview: (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Switch defaultChecked />
                <span className="text-sm">On</span>
              </div>
              <div className="flex items-center gap-3">
                <Switch />
                <span className="text-sm">Off</span>
              </div>
              <div className="flex items-center gap-3">
                <Switch disabled />
                <span className="text-sm text-muted-foreground">Disabled</span>
              </div>
            </div>
          ),
          code: {
            react: `<Switch defaultChecked />  {/* on */}
<Switch />               {/* off */}
<Switch disabled />       {/* disabled */}`,
          },
        },
      ]}
    />
  )
}
```

- [ ] **Create `src/app/pages/atoms/AvatarPage.tsx`:**

```tsx
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar'

export function AvatarPage() {
  return (
    <ComponentPageLayout
      title="Avatar"
      description="Visual representation of a user or entity. Shows an image with a fallback to initials or a generic icon."
      level="Atom"
      status="Stable"
      sections={[
        {
          title: 'With image',
          preview: (
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            </div>
          ),
          code: {
            react: `import { Avatar, AvatarFallback, AvatarImage } from '@breathe/ui'

<Avatar>
  <AvatarImage src="/user.jpg" alt="User" />
  <AvatarFallback>SC</AvatarFallback>
</Avatar>`,
          },
        },
        {
          title: 'Fallback',
          description: 'Shown when the image fails to load or no src is provided.',
          preview: (
            <div className="flex items-center gap-3">
              <Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
              <Avatar><AvatarFallback>AB</AvatarFallback></Avatar>
              <Avatar><AvatarFallback>RK</AvatarFallback></Avatar>
            </div>
          ),
          code: {
            react: `<Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
<Avatar><AvatarFallback>AB</AvatarFallback></Avatar>`,
          },
        },
      ]}
    />
  )
}
```

- [ ] **Create `src/app/pages/atoms/BadgePage.tsx`:**

```tsx
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Badge } from '@/app/components/ui/badge'

export function BadgePage() {
  return (
    <ComponentPageLayout
      title="Badge"
      description="Small status descriptor for UI elements. Use sparingly — too many badges reduce their signal value."
      level="Atom"
      status="Stable"
      sections={[
        {
          title: 'Variants',
          preview: (
            <div className="flex flex-wrap gap-3">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          ),
          code: {
            react: `import { Badge } from '@breathe/ui'

<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>`,
          },
        },
      ]}
    />
  )
}
```

---

### Task 16: Create Molecule pages (Alert, Card, Select, Tabs, Tooltip)

**Files:**
- Create: `src/app/pages/molecules/AlertPage.tsx`
- Create: `src/app/pages/molecules/CardPage.tsx`
- Create: `src/app/pages/molecules/SelectPage.tsx`
- Create: `src/app/pages/molecules/TabsPage.tsx`
- Create: `src/app/pages/molecules/TooltipPage.tsx`

- [ ] **Create `src/app/pages/molecules/AlertPage.tsx`:**

```tsx
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Alert, AlertDescription, AlertTitle } from '@/app/components/ui/alert'
import { Terminal, AlertTriangle, CheckCircle2, Info } from 'lucide-react'

export function AlertPage() {
  return (
    <ComponentPageLayout
      title="Alert"
      description="Communicates a status, warning, error, or informational message inline within the page. Does not require user action to dismiss."
      level="Molecule"
      status="Stable"
      sections={[
        {
          title: 'Variants',
          preview: (
            <div className="space-y-3 w-full max-w-lg">
              <Alert>
                <Terminal className="h-4 w-4" />
                <AlertTitle>Default</AlertTitle>
                <AlertDescription>A neutral informational message.</AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Something went wrong. Please try again.</AlertDescription>
              </Alert>
            </div>
          ),
          code: {
            react: `import { Alert, AlertDescription, AlertTitle } from '@breathe/ui'
import { Terminal } from 'lucide-react'

<Alert>
  <Terminal className="h-4 w-4" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>You can change this in settings.</AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertTriangle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong.</AlertDescription>
</Alert>`,
            reactNative: `// React Native — inline banner pattern
import { View, Text } from 'react-native'
import { tokens } from '@breathe/tokens/react-native/lemniscate'

<View style={{ backgroundColor: tokens.lmnsColorDangerLight, borderRadius: 8, padding: 12, borderLeftWidth: 4, borderLeftColor: tokens.lmnsColorDanger }}>
  <Text style={{ color: tokens.lmnsColorDanger, fontWeight: '600' }}>Error</Text>
  <Text style={{ color: tokens.lmnsColorForeground, marginTop: 2 }}>Something went wrong.</Text>
</View>`,
          },
        },
      ]}
    />
  )
}
```

- [ ] **Create `src/app/pages/molecules/CardPage.tsx`:**

```tsx
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'

export function CardPage() {
  return (
    <ComponentPageLayout
      title="Card"
      description="Surface that groups related information and actions. Cards create visual hierarchy and make content scannable."
      level="Molecule"
      status="Stable"
      sections={[
        {
          title: 'Default',
          preview: (
            <Card className="w-72">
              <CardHeader>
                <CardTitle>Project Settings</CardTitle>
                <CardDescription>Manage your project configuration.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Update your project name, members, and permissions here.</p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save</Button>
              </CardFooter>
            </Card>
          ),
          code: {
            react: `import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@breathe/ui'

<Card>
  <CardHeader>
    <CardTitle>Project Settings</CardTitle>
    <CardDescription>Manage your project.</CardDescription>
  </CardHeader>
  <CardContent>Content here.</CardContent>
  <CardFooter>
    <Button>Save</Button>
  </CardFooter>
</Card>`,
          },
        },
      ]}
    />
  )
}
```

- [ ] **Create `src/app/pages/molecules/SelectPage.tsx`:**

```tsx
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select'

export function SelectPage() {
  return (
    <ComponentPageLayout
      title="Select"
      description="Dropdown for choosing one option from a list. Use when there are 5+ options — for fewer, consider Radio Group."
      level="Molecule"
      status="Stable"
      sections={[
        {
          title: 'Default',
          preview: (
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="mango">Mango</SelectItem>
              </SelectContent>
            </Select>
          ),
          code: {
            react: `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@breathe/ui'

<Select>
  <SelectTrigger className="w-48">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
  </SelectContent>
</Select>`,
          },
        },
        {
          title: 'Disabled',
          preview: (
            <Select disabled>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Not available" />
              </SelectTrigger>
            </Select>
          ),
          code: {
            react: `<Select disabled>
  <SelectTrigger className="w-48">
    <SelectValue placeholder="Not available" />
  </SelectTrigger>
</Select>`,
          },
        },
      ]}
    />
  )
}
```

- [ ] **Create `src/app/pages/molecules/TabsPage.tsx`:**

```tsx
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs'

export function TabsPage() {
  return (
    <ComponentPageLayout
      title="Tabs"
      description="Organises content into switchable panels. All tabs are visible at once — use when the user needs to compare or switch between views."
      level="Molecule"
      status="Stable"
      sections={[
        {
          title: 'Default',
          preview: (
            <Tabs defaultValue="overview" className="w-full max-w-sm">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-3 text-sm text-muted-foreground">Overview content here.</TabsContent>
              <TabsContent value="analytics" className="mt-3 text-sm text-muted-foreground">Analytics content here.</TabsContent>
              <TabsContent value="settings" className="mt-3 text-sm text-muted-foreground">Settings content here.</TabsContent>
            </Tabs>
          ),
          code: {
            react: `import { Tabs, TabsContent, TabsList, TabsTrigger } from '@breathe/ui'

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content.</TabsContent>
  <TabsContent value="analytics">Analytics content.</TabsContent>
</Tabs>`,
          },
        },
      ]}
    />
  )
}
```

- [ ] **Create `src/app/pages/molecules/TooltipPage.tsx`:**

```tsx
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/app/components/ui/tooltip'
import { Button } from '@/app/components/ui/button'

export function TooltipPage() {
  return (
    <ComponentPageLayout
      title="Tooltip"
      description="Contextual label that appears on hover or focus. Use for icon-only buttons and supplementary information — never for critical content."
      level="Molecule"
      status="Stable"
      sections={[
        {
          title: 'Default',
          preview: (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Helpful context here</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ),
          code: {
            react: `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@breathe/ui'

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Helpful context here</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
          },
        },
      ]}
    />
  )
}
```

---

### Task 17: Create Organism page (Dialog)

**Files:**
- Create: `src/app/pages/organisms/DialogPage.tsx`

- [ ] **Create `src/app/pages/organisms/DialogPage.tsx`:**

```tsx
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/ui/dialog'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'

export function DialogPage() {
  return (
    <ComponentPageLayout
      title="Dialog"
      description="Modal overlay that requires user interaction before returning to the main flow. Use for confirmations, forms, and focused tasks."
      level="Organism"
      status="Stable"
      sections={[
        {
          title: 'Default',
          preview: (
            <Dialog>
              <DialogTrigger asChild>
                <Button>Open Dialog</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="Ram Kumar" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ),
          code: {
            react: `import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@breathe/ui'

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>Make changes here.</DialogDescription>
    </DialogHeader>
    {/* content */}
    <DialogFooter>
      <Button>Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
          },
        },
      ]}
    />
  )
}
```

---

### Task 18: Create Template pages (6)

**Files:**
- Create: `src/app/pages/templates/StatGridPage.tsx`
- Create: `src/app/pages/templates/PageToolbarPage.tsx`
- Create: `src/app/pages/templates/DataSectionPage.tsx`
- Create: `src/app/pages/templates/PageBodyPage.tsx`
- Create: `src/app/pages/templates/MobileFabPage.tsx`
- Create: `src/app/pages/templates/TabBarPage.tsx`

- [ ] **Create `src/app/pages/templates/StatGridPage.tsx`:**

```tsx
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { StatGrid } from '@/app/components/custom/template/StatGrid'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  )
}

export function StatGridPage() {
  return (
    <ComponentPageLayout
      title="Stat Grid"
      description="Responsive grid for stat card layouts. Handles single-column mobile and 2-column desktop automatically."
      level="Template"
      status="Stable"
      sections={[
        {
          title: '2-column grid',
          preview: (
            <StatGrid variant="2col" className="w-full">
              <StatCard label="Total Members" value="12,430" />
              <StatCard label="Active This Month" value="8,291" />
              <StatCard label="New Sign-ups" value="342" />
              <StatCard label="Churn Rate" value="1.2%" />
            </StatGrid>
          ),
          code: {
            react: `import { StatGrid } from '@breathe/templates'

<StatGrid variant="2col">
  <StatCard label="Total Members" value="12,430" />
  <StatCard label="Active This Month" value="8,291" />
</StatGrid>`,
          },
        },
        {
          title: '2/3 + 1/3 split',
          preview: (
            <StatGrid variant="2-1" className="w-full">
              <StatCard label="Revenue" value="₹4,28,000" />
              <StatCard label="MRR" value="₹35,667" />
            </StatGrid>
          ),
          code: {
            react: `<StatGrid variant="2-1">
  <MainContent />
  <Sidebar />
</StatGrid>`,
          },
        },
      ]}
    />
  )
}
```

- [ ] **Create `src/app/pages/templates/PageToolbarPage.tsx`:**

```tsx
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { PageToolbar } from '@/app/components/custom/template/PageToolbar'
import { Button } from '@/app/components/ui/button'
import { TabBar } from '@/app/components/custom/template/TabBar'

export function PageToolbarPage() {
  return (
    <ComponentPageLayout
      title="Page Toolbar"
      description="Toolbar row between the page header and content. Left slot holds filters and period selectors; right slot holds export and secondary actions."
      level="Template"
      status="Stable"
      sections={[
        {
          title: 'With filters and actions',
          preview: (
            <PageToolbar
              left={
                <TabBar
                  tabs={[
                    { value: '7d', label: '7d' },
                    { value: '30d', label: '30d' },
                    { value: '90d', label: '90d' },
                  ]}
                  value="30d"
                  onChange={() => {}}
                />
              }
              right={
                <>
                  <Button variant="outline" size="sm">Export CSV</Button>
                  <Button size="sm">+ Add</Button>
                </>
              }
            />
          ),
          code: {
            react: `import { PageToolbar } from '@breathe/templates'

<PageToolbar
  left={<PeriodTabs />}
  right={
    <>
      <Button variant="outline" size="sm">Export</Button>
      <Button size="sm">+ Add</Button>
    </>
  }
/>`,
          },
        },
      ]}
    />
  )
}
```

- [ ] **Create `src/app/pages/templates/DataSectionPage.tsx`:**

```tsx
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { DataSection } from '@/app/components/custom/template/DataSection'

export function DataSectionPage() {
  return (
    <ComponentPageLayout
      title="Data Section"
      description="Bordered card container for tables, lists, and data-dense content. Padding is tighter on mobile and relaxed on desktop."
      level="Template"
      status="Stable"
      sections={[
        {
          title: 'Default',
          preview: (
            <DataSection className="w-full">
              <p className="text-sm font-medium mb-3">Recent Transactions</p>
              <div className="space-y-2">
                {['Member dues — ₹500', 'Loan repayment — ₹1,200', 'Interest credit — ₹85'].map(t => (
                  <div key={t} className="flex justify-between text-sm py-1.5 border-b border-border last:border-0">
                    <span>{t.split('—')[0]}</span>
                    <span className="font-medium">{t.split('—')[1]}</span>
                  </div>
                ))}
              </div>
            </DataSection>
          ),
          code: {
            react: `import { DataSection } from '@breathe/templates'

<DataSection>
  <Table>...</Table>
</DataSection>`,
          },
        },
      ]}
    />
  )
}
```

- [ ] **Create `src/app/pages/templates/PageBodyPage.tsx`:**

```tsx
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { PageBody } from '@/app/components/custom/template/PageBody'

export function PageBodyPage() {
  return (
    <ComponentPageLayout
      title="Page Body"
      description="Consistent content inset for all app screens. Handles padding across mobile / tablet / desktop in one place. Wrap every screen's main content in PageBody."
      level="Template"
      status="Stable"
      sections={[
        {
          title: 'Usage',
          preview: (
            <div className="w-full border border-dashed border-border rounded-lg overflow-hidden">
              <div className="bg-muted px-3 py-1.5 text-xs text-muted-foreground font-mono">Screen boundary</div>
              <PageBody>
                <p className="text-sm">Content rendered inside PageBody gets consistent padding: <code className="text-xs bg-muted px-1 rounded">px-4 pb-4</code> on mobile, <code className="text-xs bg-muted px-1 rounded">px-8 pb-8</code> on desktop.</p>
              </PageBody>
            </div>
          ),
          code: {
            react: `import { PageBody } from '@breathe/templates'

export function MyScreen() {
  return (
    <PageBody>
      <PageToolbar ... />
      <StatGrid ... />
      <DataSection>...</DataSection>
    </PageBody>
  )
}`,
          },
        },
      ]}
    />
  )
}
```

- [ ] **Create `src/app/pages/templates/MobileFabPage.tsx`:**

```tsx
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { MobileFab } from '@/app/components/custom/template/MobileFab'
import { Plus, FileText, Users } from 'lucide-react'

export function MobileFabPage() {
  return (
    <ComponentPageLayout
      title="Mobile FAB"
      description="Fixed floating action button — visible only on mobile (hidden at md breakpoint). Use for the primary action on a screen."
      level="Template"
      status="Stable"
      sections={[
        {
          title: 'Single action',
          description: 'Tapping the FAB triggers one action directly.',
          preview: (
            <div className="relative h-32 bg-muted/40 rounded-lg overflow-hidden border border-border">
              <p className="text-xs text-muted-foreground p-4">Screen content</p>
              <div className="absolute bottom-4 right-4">
                <button
                  type="button"
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg"
                >
                  <Plus className="h-6 w-6 text-primary-foreground" />
                </button>
              </div>
            </div>
          ),
          code: {
            react: `import { MobileFab } from '@breathe/templates'

<MobileFab onClick={() => openNewTransactionSheet()} />`,
            reactNative: `// In React Native, position absolutely at bottom-right
import { TouchableOpacity, View } from 'react-native'
import { Plus } from 'lucide-react-native'
import { tokens } from '@breathe/tokens/react-native/lemniscate'

<TouchableOpacity
  style={{
    position: 'absolute', bottom: 24, right: 16,
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: tokens.lmnsColorPrimary,
    alignItems: 'center', justifyContent: 'center',
  }}
  onPress={handlePress}
>
  <Plus size={24} color={tokens.lmnsColorPrimaryForeground} />
</TouchableOpacity>`,
          },
        },
        {
          title: 'Multi-action (dropdown)',
          description: 'FAB opens a dropdown menu when multiple quick actions are needed.',
          preview: (
            <div className="relative h-32 bg-muted/40 rounded-lg overflow-hidden border border-border">
              <p className="text-xs text-muted-foreground p-4">Screen content</p>
              <div className="absolute bottom-4 right-4 opacity-60">
                <button className="flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg">
                  <Plus className="h-6 w-6 text-primary-foreground" />
                </button>
              </div>
            </div>
          ),
          code: {
            react: `<MobileFab
  actions={[
    { label: 'New Transaction', icon: <FileText className="h-4 w-4" />, onClick: () => {} },
    { label: 'Add Member',      icon: <Users className="h-4 w-4" />,    onClick: () => {} },
  ]}
/>`,
          },
        },
      ]}
    />
  )
}
```

- [ ] **Create `src/app/pages/templates/TabBarPage.tsx`:**

```tsx
import { useState } from 'react'
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { TabBar } from '@/app/components/custom/template/TabBar'

export function TabBarPage() {
  return (
    <ComponentPageLayout
      title="Tab Bar"
      description="Pill-style tab switcher for period selectors, view mode toggles, and filter groups. Renders horizontally on all breakpoints."
      level="Template"
      status="Stable"
      sections={[
        {
          title: 'Period selector',
          preview: (
            <PeriodExample />
          ),
          code: {
            react: `import { TabBar } from '@breathe/templates'

const [period, setPeriod] = useState('30d')

<TabBar
  tabs={[
    { value: '7d',  label: '7 days' },
    { value: '30d', label: '30 days' },
    { value: '90d', label: '90 days' },
    { value: '1y',  label: '1 year' },
  ]}
  value={period}
  onChange={setPeriod}
/>`,
          },
        },
        {
          title: 'With badges',
          preview: (
            <BadgeExample />
          ),
          code: {
            react: `<TabBar
  tabs={[
    { value: 'all',     label: 'All',      badge: 24 },
    { value: 'pending', label: 'Pending',  badge: 5 },
    { value: 'done',    label: 'Done' },
  ]}
  value={active}
  onChange={setActive}
/>`,
          },
        },
      ]}
    />
  )
}

function PeriodExample() {
  const [v, setV] = useState('30d')
  return (
    <TabBar
      tabs={[
        { value: '7d', label: '7 days' },
        { value: '30d', label: '30 days' },
        { value: '90d', label: '90 days' },
        { value: '1y', label: '1 year' },
      ]}
      value={v}
      onChange={setV}
    />
  )
}

function BadgeExample() {
  const [v, setV] = useState('all')
  return (
    <TabBar
      tabs={[
        { value: 'all',     label: 'All',     badge: 24 },
        { value: 'pending', label: 'Pending', badge: 5 },
        { value: 'done',    label: 'Done' },
      ]}
      value={v}
      onChange={setV}
    />
  )
}
```

---

### Task 19: Wire new pages into routes.ts + remove legacy entries

**Files:**
- Modify: `src/app/routes.ts`

- [ ] **Replace `src/app/routes.ts`** with the final version (legacy imports removed, new pages wired):

```ts
import { createBrowserRouter, Navigate } from 'react-router'
import { Root } from './components/layout/Root'
import { HomePage } from './pages/HomePage'
import { GettingStartedPage } from './pages/GettingStartedPage'
import { NotFoundPage } from './pages/NotFoundPage'

// Foundations
import { LogosPage }        from './pages/foundations/LogosPage'
import { ColorsPage }       from './pages/foundations/ColorsPage'
import { DesignTokensPage } from './pages/foundations/DesignTokensPage'
import { TypographyPage }   from './pages/foundations/TypographyPage'
import { SpacingPage }      from './pages/foundations/SpacingPage'
import { GridPage }         from './pages/foundations/GridPage'
import { ElevationPage }    from './pages/foundations/ElevationPage'
import { IconsPage }        from './pages/foundations/IconsPage'
import { MotionPage }       from './pages/foundations/MotionPage'

// Atoms
import { ButtonPage }   from './pages/atoms/ButtonPage'
import { InputPage }    from './pages/atoms/InputPage'
import { CheckboxPage } from './pages/atoms/CheckboxPage'
import { SwitchPage }   from './pages/atoms/SwitchPage'
import { AvatarPage }   from './pages/atoms/AvatarPage'
import { BadgePage }    from './pages/atoms/BadgePage'

// Molecules
import { AlertPage }   from './pages/molecules/AlertPage'
import { CardPage }    from './pages/molecules/CardPage'
import { SelectPage }  from './pages/molecules/SelectPage'
import { TabsPage }    from './pages/molecules/TabsPage'
import { TooltipPage } from './pages/molecules/TooltipPage'

// Organisms
import { DialogPage } from './pages/organisms/DialogPage'

// Templates
import { StatGridPage }    from './pages/templates/StatGridPage'
import { PageToolbarPage } from './pages/templates/PageToolbarPage'
import { DataSectionPage } from './pages/templates/DataSectionPage'
import { PageBodyPage }    from './pages/templates/PageBodyPage'
import { MobileFabPage }   from './pages/templates/MobileFabPage'
import { TabBarPage }      from './pages/templates/TabBarPage'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: 'getting-started', Component: GettingStartedPage },

      // Foundations
      { path: 'foundations/logos',         Component: LogosPage },
      { path: 'foundations/colors',        Component: ColorsPage },
      { path: 'foundations/design-tokens', Component: DesignTokensPage },
      { path: 'foundations/typography',    Component: TypographyPage },
      { path: 'foundations/spacing',       Component: SpacingPage },
      { path: 'foundations/grid',          Component: GridPage },
      { path: 'foundations/elevation',     Component: ElevationPage },
      { path: 'foundations/icons',         Component: IconsPage },
      { path: 'foundations/motion',        Component: MotionPage },

      // /components/* → redirect to atomic paths
      { path: 'components/button',   element: <Navigate to="/atoms/button"      replace /> },
      { path: 'components/input',    element: <Navigate to="/atoms/input"       replace /> },
      { path: 'components/checkbox', element: <Navigate to="/atoms/checkbox"    replace /> },
      { path: 'components/switch',   element: <Navigate to="/atoms/switch"      replace /> },
      { path: 'components/avatar',   element: <Navigate to="/atoms/avatar"      replace /> },
      { path: 'components/badge',    element: <Navigate to="/atoms/badge"       replace /> },
      { path: 'components/alert',    element: <Navigate to="/molecules/alert"   replace /> },
      { path: 'components/card',     element: <Navigate to="/molecules/card"    replace /> },
      { path: 'components/select',   element: <Navigate to="/molecules/select"  replace /> },
      { path: 'components/tabs',     element: <Navigate to="/molecules/tabs"    replace /> },
      { path: 'components/tooltip',  element: <Navigate to="/molecules/tooltip" replace /> },
      { path: 'components/modal',    element: <Navigate to="/organisms/dialog"  replace /> },

      // Atoms
      { path: 'atoms/button',   Component: ButtonPage },
      { path: 'atoms/input',    Component: InputPage },
      { path: 'atoms/checkbox', Component: CheckboxPage },
      { path: 'atoms/switch',   Component: SwitchPage },
      { path: 'atoms/avatar',   Component: AvatarPage },
      { path: 'atoms/badge',    Component: BadgePage },

      // Molecules
      { path: 'molecules/alert',   Component: AlertPage },
      { path: 'molecules/card',    Component: CardPage },
      { path: 'molecules/select',  Component: SelectPage },
      { path: 'molecules/tabs',    Component: TabsPage },
      { path: 'molecules/tooltip', Component: TooltipPage },

      // Organisms
      { path: 'organisms/dialog', Component: DialogPage },

      // Templates
      { path: 'templates/stat-grid',    Component: StatGridPage },
      { path: 'templates/page-toolbar', Component: PageToolbarPage },
      { path: 'templates/data-section', Component: DataSectionPage },
      { path: 'templates/page-body',    Component: PageBodyPage },
      { path: 'templates/mobile-fab',   Component: MobileFabPage },
      { path: 'templates/tab-bar',      Component: TabBarPage },

      { path: '*', Component: NotFoundPage },
    ],
  },
])
```

---

### Task 20: Final build, browser QA, and commit Phase 3

- [ ] **Build:**

```bash
cd "/Users/ramkumar.ganesh/Downloads/APOS pitch/Product Factory/Breathe Design system"
pnpm build
```

Expected: zero TypeScript errors.

- [ ] **Tokens still build:**

```bash
pnpm tokens
```

Expected: all 7 products build cleanly.

- [ ] **Dev server browser QA** — run `pnpm dev`, check each item:

  1. Left nav shows: Overview / Foundations / Atoms / Molecules / Organisms / Templates
  2. Atoms → Button: product switcher shows 7 pills
  3. Select Lemniscate → button is blue (`#40AAD4`)
  4. Select Aumraa → button is green (`#2F9E44`)
  5. Select Technocracy → preview background turns dark
  6. Foundations → Design Tokens → Aumraa tab: primary swatch is green
  7. Sidebar active item: green left border + green text
  8. `/components/button` in address bar → redirects to `/atoms/button`
  9. Templates → Tab Bar: period selector pills switch on click
  10. Templates → Mobile FAB: FAB button visible in preview with correct primary colour

- [ ] **Commit Phase 3:**

```bash
git add src/app/pages/atoms \
        src/app/pages/molecules \
        src/app/pages/organisms \
        src/app/pages/templates \
        src/app/routes.ts
git commit -m "feat(phase-3): atomic component pages + template pages

- Migrate 12 component pages to atomic paths using ComponentPageLayout
- Aumraa previews use same JSX as Lemniscate — ProductPreviewWrapper applies green tokens
- 6 template pages: StatGrid, PageToolbar, DataSection, PageBody, MobileFab, TabBar
- Final routes.ts: /components/* redirects, all new paths wired, legacy imports removed"
```

---

## Self-Review Checklist

**Spec coverage:**
- ✅ Phase 1: global.json green palettes (Task 1)
- ✅ Phase 1: aumraa.json rewrite (Task 2)
- ✅ Phase 1: token rebuild + verify (Task 3)
- ✅ Phase 1: theme.css primary/ring/accent/radius → amra (Task 4)
- ✅ Phase 1: Source Sans 3 + sidebar active colour (Task 5)
- ✅ Phase 1: 6 template components imported (Task 6)
- ✅ Phase 1: DesignTokensPage Aumraa tab (Task 7)
- ✅ Phase 2: ProductThemeContext (Task 9)
- ✅ Phase 2: ProductThemeProvider wrap (Task 10)
- ✅ Phase 2: ComponentPageLayout (Task 11)
- ✅ Phase 2: navData atomic sections (Task 12)
- ✅ Phase 2: routes + directories (Task 13)
- ✅ Phase 3: 6 atom pages (Task 15)
- ✅ Phase 3: 5 molecule pages (Task 16)
- ✅ Phase 3: 1 organism page (Task 17)
- ✅ Phase 3: 6 template pages (Task 18)
- ✅ Phase 3: final routes.ts (Task 19)
- ✅ Aumraa = Lemniscate + green tokens via ProductPreviewWrapper (Tasks 9, 11, 15–18)
- ✅ /components/* redirects (Task 13 interim + Task 19 final)

**Type consistency:**
- `ProductId` defined in Task 9, used in Tasks 11, 15–18 — consistent
- `ComponentPageLayout` props defined in Task 11, used in Tasks 15–18 — consistent
- `StatGrid`, `TabBar`, etc. exported from `index.ts` (Task 6), imported in Tasks 18 — consistent
- `cn` utility path: `@/app/components/ui/utils` — consistent across all template files (Tasks 6, 11)
