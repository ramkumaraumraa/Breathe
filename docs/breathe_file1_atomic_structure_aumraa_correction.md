# Breathe — File 1: Token Correction + Atomic Design Structure + Component System

> **Claude Code instructions:** Read this entire file before making any changes.
> Complete the four parts in order. Verify after each part before continuing.
> This file sets up the foundation — File 2 builds all component pages on top of it.

---

## ⚠️ Path Reference

| Reference | Full path |
|---|---|
| **Breathe repo** (work here) | `~/Breathe Design system/` |

All paths that say `breathe/` mean `~/Breathe Design system/`.

---

## Context

Breathe currently has:
- 7 products in Style Dictionary token pipeline ✅
- Atomic design system nav structure NOT yet implemented
- Aumraa token colours WRONG — currently blue, must be green per branding doc
- No shared ProductThemeContext for component previews
- No reusable ComponentPageLayout template
- Components section undifferentiated (not split into Atoms/Molecules/Organisms)

This file corrects all of that. File 2 then builds all component pages using the system
established here.

---

## Part 1 — Correct Aumraa Brand Tokens

### 1A — Add Aumraa green palette to `tokens/src/global.json`

Open `~/Breathe Design system/tokens/src/global.json`.
In the `color` block, add a new `green` family and `yellowGreen` family
AFTER the existing `orange` block:

```json
"green": {
  "50":  { "value": "#F0FDF4", "type": "color" },
  "100": { "value": "#DCFCE7", "type": "color" },
  "200": { "value": "#BBF7D0", "type": "color" },
  "300": { "value": "#86EFAC", "type": "color" },
  "400": { "value": "#4ADE80", "type": "color" },
  "500": { "value": "#2F9E44", "type": "color", "comment": "Aumraa primary — forest green" },
  "600": { "value": "#16A34A", "type": "color" },
  "700": { "value": "#15803D", "type": "color" },
  "800": { "value": "#166534", "type": "color" },
  "900": { "value": "#14532D", "type": "color" },
  "950": { "value": "#052E16", "type": "color" },
  "forest": { "value": "#002100", "type": "color", "comment": "Aumraa neutral black — deep forest" }
},
"yellowGreen": {
  "400": { "value": "#CFCF2A", "type": "color", "comment": "Aumraa secondary — energised yellow-green" },
  "500": { "value": "#B5B520", "type": "color" },
  "600": { "value": "#9A9A18", "type": "color" }
},
"emerald": {
  "400": { "value": "#00D06D", "type": "color", "comment": "Aumraa positive / success" },
  "500": { "value": "#00B85F", "type": "color" }
}
```

Also update the `status` block — Aumraa uses different success/danger values:

```json
"status": {
  "success":       { "value": "#00D06D", "type": "color", "comment": "Updated — Aumraa positive" },
  "successLight":  { "value": "#DCFCE7", "type": "color" },
  "successDark":   { "value": "#14532D", "type": "color" },
  "warning":       { "value": "#F59E0B", "type": "color" },
  "warningLight":  { "value": "#FEF3C7", "type": "color" },
  "warningDark":   { "value": "#92400E", "type": "color" },
  "danger":        { "value": "#E11D2A", "type": "color", "comment": "Updated — Aumraa negative" },
  "dangerLight":   { "value": "#FEE2E2", "type": "color" },
  "dangerDark":    { "value": "#7F1D1D", "type": "color" },
  "info":          { "value": "#2F6FED", "type": "color", "comment": "Aumraa tertiary blue" },
  "infoLight":     { "value": "#E0F2FE", "type": "color" },
  "infoDark":      { "value": "#0C4A6E", "type": "color" }
}
```

Also add Source Sans 3 to the font family block:

```json
"font": {
  "family": {
    "sans":        { "value": "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", "type": "fontFamily" },
    "sourceSans":  { "value": "'Source Sans 3', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif", "type": "fontFamily", "comment": "Aumraa brand typeface" },
    "mono":        { "value": "JetBrains Mono, Fira Code, Courier New, monospace", "type": "fontFamily" }
  }
}
```

---

### 1B — Rewrite `tokens/src/aumraa.json` with correct brand values

Replace the entire file content:

```json
{
  "amra": {
    "color": {
      "primary":              { "value": "{color.green.500}",      "type": "color",
                                "comment": "Forest green — stability, ingenuity, long-term thinking" },
      "primaryLight":         { "value": "{color.green.400}",      "type": "color" },
      "primaryDark":          { "value": "{color.green.700}",      "type": "color" },
      "primaryForeground":    { "value": "{color.neutral.white}",   "type": "color" },

      "secondary":            { "value": "{color.yellowGreen.400}", "type": "color",
                                "comment": "Yellow-green — energy, momentum, optimism" },
      "secondaryForeground":  { "value": "{color.green.forest}",   "type": "color" },

      "tertiary":             { "value": "{color.status.info}",    "type": "color",
                                "comment": "Blue — supporting accent, digital clarity" },
      "tertiaryForeground":   { "value": "{color.neutral.white}",   "type": "color" },

      "accent":               { "value": "{color.status.warning}", "type": "color",
                                "comment": "Amber — alert, call to action" },
      "accentForeground":     { "value": "{color.neutral.white}",   "type": "color" },

      "positive":             { "value": "{color.emerald.400}",    "type": "color",
                                "comment": "Bright green — success, positive states" },
      "positiveForeground":   { "value": "{color.neutral.white}",   "type": "color" },

      "negative":             { "value": "{color.status.danger}",  "type": "color" },
      "negativeForeground":   { "value": "{color.neutral.white}",   "type": "color" },

      "background":           { "value": "{color.neutral.white}",   "type": "color" },
      "backgroundSecondary":  { "value": "{color.neutral.50}",     "type": "color" },
      "foreground":           { "value": "{color.green.forest}",   "type": "color",
                                "comment": "Deep forest black — primary text" },
      "foregroundSecondary":  { "value": "{color.neutral.500}",    "type": "color" },

      "border":               { "value": "{color.neutral.200}",    "type": "color" },

      "gradientStart":        { "value": "{color.green.400}",      "type": "color" },
      "gradientEnd":          { "value": "{color.green.700}",      "type": "color" }
    },
    "font": {
      "family":        { "value": "{font.family.sourceSans}",  "type": "fontFamily",
                         "comment": "Source Sans 3 — Aumraa brand typeface" },
      "sizeBase":      { "value": "{font.size.base}",          "type": "dimension" },
      "weightBody":    { "value": "{font.weight.normal}",      "type": "fontWeight" },
      "weightHeading": { "value": "{font.weight.bold}",        "type": "fontWeight",
                         "comment": "Bold for H1-H2 hero/vision statements" },
      "weightSubhead": { "value": "{font.weight.semibold}",    "type": "fontWeight",
                         "comment": "Semibold for H3-H6 sub-headings" }
    },
    "spacing": {
      "pagePadding":  { "value": "{spacing.8}",  "type": "dimension",
                        "comment": "Generous — white space is active design" },
      "cardPadding":  { "value": "{spacing.6}",  "type": "dimension" },
      "sectionGap":   { "value": "{spacing.12}", "type": "dimension" }
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

### 1C — Rebuild Style Dictionary

```bash
cd ~/Breathe\ Design\ system
pnpm tokens
```

Verify Aumraa web output has green as primary:

```bash
grep "amra-color-primary" ~/Breathe\ Design\ system/tokens/dist/web/aumraa.css | head -3
# Should show: --amra-color-primary: #2F9E44
# NOT blue
```

---

### 1D — Add Source Sans 3 font import to Breathe

Open `~/Breathe Design system/src/styles/fonts.css`.
Add at the top:

```css
/* Source Sans 3 — Aumraa brand typeface */
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600&display=swap');
```

---

### 1E — Update DesignTokensPage.tsx Aumraa tab with correct values

Open `~/Breathe Design system/src/app/pages/foundations/DesignTokensPage.tsx`.
Find the Aumraa product entry in the `products` array and replace
the `colors` array:

```ts
colors: [
  { name: 'Primary',    token: '--amra-color-primary',    value: '#2F9E44', role: 'Forest green — buttons, headings, primary actions' },
  { name: 'Secondary',  token: '--amra-color-secondary',  value: '#CFCF2A', role: 'Yellow-green — energy, accent highlights' },
  { name: 'Tertiary',   token: '--amra-color-tertiary',   value: '#2F6FED', role: 'Blue — digital accent, links' },
  { name: 'Positive',   token: '--amra-color-positive',   value: '#00D06D', role: 'Bright green — success, positive states' },
  { name: 'Negative',   token: '--amra-color-negative',   value: '#E11D2A', role: 'Red — errors, destructive' },
  { name: 'Alert',      token: '--amra-color-accent',     value: '#F59E0B', role: 'Amber — warnings, calls to action' },
  { name: 'Background', token: '--amra-color-background', value: '#ffffff', role: 'Page surface' },
  { name: 'Foreground', token: '--amra-color-foreground', value: '#002100', role: 'Deep forest black — primary text' },
  { name: 'Gradient Start', token: '--amra-color-gradient-start', value: '#4ADE80', role: 'Brand gradient light end' },
  { name: 'Gradient End',   token: '--amra-color-gradient-end',   value: '#15803D', role: 'Brand gradient dark end' },
],
typography: [
  { name: 'Typeface',       token: '--amra-font-family',         value: 'Source Sans 3' },
  { name: 'Base size',      token: '--amra-font-size-base',      value: '16px' },
  { name: 'Body weight',    token: '--amra-font-weight-body',    value: '400' },
  { name: 'Heading weight', token: '--amra-font-weight-heading', value: '700 (H1-H2)' },
  { name: 'Subhead weight', token: '--amra-font-weight-subhead', value: '600 (H3-H6)' },
],
```

---

## Part 2 — Restructure Navigation to Atomic Design

### 2A — Update `navData.ts`

Open `~/Breathe Design system/src/app/components/layout/navData.ts`.
Replace the entire nav structure with:

```ts
export const navData = [
  {
    label: 'Getting Started',
    path: '/getting-started',
  },
  {
    section: 'FOUNDATIONS',
    items: [
      { label: 'Logos',          path: '/foundations/logos' },
      { label: 'Colors',         path: '/foundations/colors' },
      { label: 'Design Tokens',  path: '/foundations/design-tokens' },
      { label: 'Typography',     path: '/foundations/typography' },
      { label: 'Spacing',        path: '/foundations/spacing' },
      { label: 'Grid',           path: '/foundations/grid' },
      { label: 'Elevation',      path: '/foundations/elevation' },
      { label: 'Iconography',    path: '/foundations/iconography' },
      { label: 'Motion',         path: '/foundations/motion' },
    ],
  },
  {
    section: 'ATOMS',
    items: [
      { label: 'Button',         path: '/atoms/button' },
      { label: 'Input',          path: '/atoms/input' },
      { label: 'Textarea',       path: '/atoms/textarea' },
      { label: 'Checkbox',       path: '/atoms/checkbox' },
      { label: 'Radio Group',    path: '/atoms/radio-group' },
      { label: 'Switch',         path: '/atoms/switch' },
      { label: 'Toggle',         path: '/atoms/toggle' },
      { label: 'Slider',         path: '/atoms/slider' },
      { label: 'Badge',          path: '/atoms/badge' },
      { label: 'Avatar',         path: '/atoms/avatar' },
      { label: 'Label',          path: '/atoms/label' },
      { label: 'Separator',      path: '/atoms/separator' },
      { label: 'Skeleton',       path: '/atoms/skeleton' },
      { label: 'Progress',       path: '/atoms/progress' },
    ],
  },
  {
    section: 'MOLECULES',
    items: [
      { label: 'Alert',          path: '/molecules/alert' },
      { label: 'Card',           path: '/molecules/card' },
      { label: 'Form',           path: '/molecules/form' },
      { label: 'Select',         path: '/molecules/select' },
      { label: 'Dropdown Menu',  path: '/molecules/dropdown-menu' },
      { label: 'Popover',        path: '/molecules/popover' },
      { label: 'Tooltip',        path: '/molecules/tooltip' },
      { label: 'Hover Card',     path: '/molecules/hover-card' },
      { label: 'Breadcrumb',     path: '/molecules/breadcrumb' },
      { label: 'Pagination',     path: '/molecules/pagination' },
      { label: 'Tabs',           path: '/molecules/tabs' },
      { label: 'Accordion',      path: '/molecules/accordion' },
      { label: 'Collapsible',    path: '/molecules/collapsible' },
      { label: 'Scroll Area',    path: '/molecules/scroll-area' },
      { label: 'Sonner',         path: '/molecules/sonner' },
    ],
  },
  {
    section: 'ORGANISMS',
    items: [
      { label: 'Dialog',         path: '/organisms/dialog' },
      { label: 'Sheet',          path: '/organisms/sheet' },
      { label: 'Drawer',         path: '/organisms/drawer' },
      { label: 'Command',        path: '/organisms/command' },
      { label: 'Table',          path: '/organisms/table' },
      { label: 'Calendar',       path: '/organisms/calendar' },
      { label: 'Carousel',       path: '/organisms/carousel' },
      { label: 'Sidebar',        path: '/organisms/sidebar' },
      { label: 'Navigation Menu',path: '/organisms/navigation-menu' },
    ],
  },
  {
    section: 'TEMPLATES',
    items: [
      { label: 'Stat Grid',      path: '/templates/stat-grid' },
      { label: 'Page Toolbar',   path: '/templates/page-toolbar' },
      { label: 'Data Section',   path: '/templates/data-section' },
      { label: 'Page Body',      path: '/templates/page-body' },
      { label: 'Mobile FAB',     path: '/templates/mobile-fab' },
      { label: 'Tab Bar',        path: '/templates/tab-bar' },
    ],
  },
]
```

### 2B — Update `routes.ts`

Open `~/Breathe Design system/src/routes.ts`.
This file maps paths to page components. Update the route structure
to match the new atomic design nav. 

For every new path added in navData, add a corresponding route entry.
Use lazy imports where possible for performance.

The pattern for atoms routes:
```ts
{ path: '/atoms/button',      component: ButtonPage },
{ path: '/atoms/input',       component: InputPage },
{ path: '/atoms/textarea',    component: TextareaPage },
{ path: '/atoms/checkbox',    component: CheckboxPage },
{ path: '/atoms/radio-group', component: RadioGroupPage },
{ path: '/atoms/switch',      component: SwitchPage },
{ path: '/atoms/toggle',      component: TogglePage },
{ path: '/atoms/slider',      component: SliderPage },
{ path: '/atoms/badge',       component: BadgePage },
{ path: '/atoms/avatar',      component: AvatarPage },
{ path: '/atoms/label',       component: LabelPage },
{ path: '/atoms/separator',   component: SeparatorPage },
{ path: '/atoms/skeleton',    component: SkeletonPage },
{ path: '/atoms/progress',    component: ProgressPage },
```

The pattern for molecules routes:
```ts
{ path: '/molecules/alert',         component: AlertPage },
{ path: '/molecules/card',          component: CardPage },
{ path: '/molecules/form',          component: FormPage },
{ path: '/molecules/select',        component: SelectPage },
{ path: '/molecules/dropdown-menu', component: DropdownMenuPage },
{ path: '/molecules/popover',       component: PopoverPage },
{ path: '/molecules/tooltip',       component: TooltipPage },
{ path: '/molecules/hover-card',    component: HoverCardPage },
{ path: '/molecules/breadcrumb',    component: BreadcrumbPage },
{ path: '/molecules/pagination',    component: PaginationPage },
{ path: '/molecules/tabs',          component: TabsPage },
{ path: '/molecules/accordion',     component: AccordionPage },
{ path: '/molecules/collapsible',   component: CollapsiblePage },
{ path: '/molecules/scroll-area',   component: ScrollAreaPage },
{ path: '/molecules/sonner',        component: SonnerPage },
```

The pattern for organisms routes:
```ts
{ path: '/organisms/dialog',           component: DialogPage },
{ path: '/organisms/sheet',            component: SheetPage },
{ path: '/organisms/drawer',           component: DrawerPage },
{ path: '/organisms/command',          component: CommandPage },
{ path: '/organisms/table',            component: TablePage },
{ path: '/organisms/calendar',         component: CalendarPage },
{ path: '/organisms/carousel',         component: CarouselPage },
{ path: '/organisms/sidebar',          component: SidebarPage },
{ path: '/organisms/navigation-menu',  component: NavigationMenuPage },
```

The pattern for templates routes:
```ts
{ path: '/templates/stat-grid',    component: StatGridPage },
{ path: '/templates/page-toolbar', component: PageToolbarPage },
{ path: '/templates/data-section', component: DataSectionPage },
{ path: '/templates/page-body',    component: PageBodyPage },
{ path: '/templates/mobile-fab',   component: MobileFabPage },
{ path: '/templates/tab-bar',      component: TabBarPage },
```

Keep all existing foundation routes unchanged (e.g. `/foundations/colors`).
Remove any old `/components/*` routes that are now replaced.

---

## Part 3 — ProductThemeContext + ComponentPageLayout

### 3A — Create `src/app/context/ProductThemeContext.tsx`

Create `~/Breathe Design system/src/app/context/ProductThemeContext.tsx`:

```tsx
import { createContext, useContext, useState, ReactNode } from 'react'

// ─── Product token maps ───────────────────────────────────────────────────────
// These inline CSS vars override shadcn's generic vars inside preview wrappers.
// Components read --primary etc. — we override those per product.

export type ProductId = 'lemniscate' | 'aumraa' | 'technocracy' |
                        'maligai' | 'ulagellam' | 'ilakh' | 'yakaizen'

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
      '--primary':              '#40AAD4',
      '--primary-foreground':   '#ffffff',
      '--secondary':            '#1C60C1',
      '--secondary-foreground': '#ffffff',
      '--accent':               '#E07722',
      '--accent-foreground':    '#ffffff',
      '--background':           '#ffffff',
      '--foreground':           '#1F2937',
      '--muted':                '#F3F4F6',
      '--muted-foreground':     '#6B7280',
      '--border':               '#E5E7EB',
      '--ring':                 '#40AAD4',
      '--radius':               '0.625rem',
      '--destructive':          '#DC2626',
      '--destructive-foreground': '#ffffff',
    },
  },
  aumraa: {
    label: 'Aumraa',
    prefix: 'amra',
    description: 'Studio brand — green primary, Source Sans 3',
    vars: {
      '--primary':              '#2F9E44',
      '--primary-foreground':   '#ffffff',
      '--secondary':            '#CFCF2A',
      '--secondary-foreground': '#002100',
      '--accent':               '#F59E0B',
      '--accent-foreground':    '#ffffff',
      '--background':           '#ffffff',
      '--foreground':           '#002100',
      '--muted':                '#F0FDF4',
      '--muted-foreground':     '#6B7280',
      '--border':               '#E5E7EB',
      '--ring':                 '#2F9E44',
      '--radius':               '0.5rem',
      '--destructive':          '#E11D2A',
      '--destructive-foreground': '#ffffff',
    },
  },
  technocracy: {
    label: 'Technocracy',
    prefix: 'thcy',
    description: 'Admin dashboard — dark surfaces',
    vars: {
      '--primary':              '#40AAD4',
      '--primary-foreground':   '#ffffff',
      '--secondary':            '#1F2937',
      '--secondary-foreground': '#F9FAFB',
      '--accent':               '#E07722',
      '--accent-foreground':    '#ffffff',
      '--background':           '#111827',
      '--foreground':           '#F9FAFB',
      '--muted':                '#1F2937',
      '--muted-foreground':     '#9CA3AF',
      '--border':               '#374151',
      '--ring':                 '#40AAD4',
      '--radius':               '0.5rem',
      '--destructive':          '#DC2626',
      '--destructive-foreground': '#ffffff',
    },
  },
  maligai: {
    label: 'Maligai Manager',
    prefix: 'mlgm',
    description: 'Grocery & retail — mobile primary',
    vars: {
      '--primary':              '#40AAD4',
      '--primary-foreground':   '#ffffff',
      '--accent':               '#E07722',
      '--accent-foreground':    '#ffffff',
      '--background':           '#ffffff',
      '--foreground':           '#1F2937',
      '--muted':                '#F3F4F6',
      '--muted-foreground':     '#6B7280',
      '--border':               '#E5E7EB',
      '--ring':                 '#40AAD4',
      '--radius':               '1rem',
      '--destructive':          '#DC2626',
      '--destructive-foreground': '#ffffff',
    },
  },
  ulagellam: {
    label: 'Ulagellam',
    prefix: 'ulge',
    description: 'Mobile-only app',
    vars: {
      '--primary':              '#40AAD4',
      '--primary-foreground':   '#ffffff',
      '--accent':               '#E07722',
      '--accent-foreground':    '#ffffff',
      '--background':           '#ffffff',
      '--foreground':           '#1F2937',
      '--muted':                '#F3F4F6',
      '--muted-foreground':     '#6B7280',
      '--border':               '#E5E7EB',
      '--ring':                 '#40AAD4',
      '--radius':               '1rem',
      '--destructive':          '#DC2626',
      '--destructive-foreground': '#ffffff',
    },
  },
  ilakh: {
    label: 'Ilakh',
    prefix: 'ilkh',
    description: 'Web + mobile — mobile-first',
    vars: {
      '--primary':              '#40AAD4',
      '--primary-foreground':   '#ffffff',
      '--accent':               '#E07722',
      '--accent-foreground':    '#ffffff',
      '--background':           '#ffffff',
      '--foreground':           '#1F2937',
      '--muted':                '#F3F4F6',
      '--muted-foreground':     '#6B7280',
      '--border':               '#E5E7EB',
      '--ring':                 '#40AAD4',
      '--radius':               '0.625rem',
      '--destructive':          '#DC2626',
      '--destructive-foreground': '#ffffff',
    },
  },
  yakaizen: {
    label: 'Yakaizen',
    prefix: 'ykai',
    description: 'Mobile, watch, widgets — Oct 2026',
    vars: {
      '--primary':              '#40AAD4',
      '--primary-foreground':   '#ffffff',
      '--accent':               '#E07722',
      '--accent-foreground':    '#ffffff',
      '--background':           '#ffffff',
      '--foreground':           '#1F2937',
      '--muted':                '#F3F4F6',
      '--muted-foreground':     '#6B7280',
      '--border':               '#E5E7EB',
      '--ring':                 '#40AAD4',
      '--radius':               '1rem',
      '--destructive':          '#DC2626',
      '--destructive-foreground': '#ffffff',
    },
  },
}

// ─── Context ──────────────────────────────────────────────────────────────────

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

### 3B — Wrap App with ProductThemeProvider

Open `~/Breathe Design system/src/app/App.tsx` (or the root app entry).
Import and wrap the router/children with `ProductThemeProvider`:

```tsx
import { ProductThemeProvider } from './context/ProductThemeContext'

// Wrap the root content:
<ProductThemeProvider>
  {/* existing router / layout */}
</ProductThemeProvider>
```

---

### 3C — Create `ComponentPageLayout.tsx`

Create `~/Breathe Design system/src/app/components/shared/ComponentPageLayout.tsx`:

```tsx
import { ReactNode } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/app/components/ui/tabs'
import { Badge } from '@/app/components/ui/badge'
import { PageHeader } from './PageHeader'
import {
  useProductTheme,
  productMeta,
  ProductId,
  ProductPreviewWrapper,
} from '../context/ProductThemeContext'

// ─── Types ────────────────────────────────────────────────────────────────────

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
  /** Products that have this component implemented vs. placeholder */
  implemented?: ProductId[]
}

// ─── Status badge colour ──────────────────────────────────────────────────────

const statusVariant = (s: ComponentStatus) => {
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

// ─── Product switcher ─────────────────────────────────────────────────────────

const ALL_PRODUCTS = Object.keys(productMeta) as ProductId[]

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
            className={`
              px-3 py-1 rounded-full text-xs font-medium border transition-all
              ${isActive
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-background text-muted-foreground hover:border-primary/50'
              }
              ${!isImpl ? 'opacity-60' : ''}
            `}
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

// ─── Code tab ────────────────────────────────────────────────────────────────

function CodeTabs({ code }: { code: NonNullable<ComponentSection['code']> }) {
  const tabs = [
    { id: 'react',        label: 'React',        content: code.react },
    { id: 'reactNative',  label: 'React Native',  content: code.reactNative },
    { id: 'ios',          label: 'iOS',           content: code.ios },
    { id: 'android',      label: 'Android',       content: code.android },
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
          <pre className="rounded-lg bg-muted p-4 text-xs font-mono overflow-x-auto text-foreground">
            <code>{t.content}</code>
          </pre>
        </TabsContent>
      ))}
    </Tabs>
  )
}

// ─── Main layout ─────────────────────────────────────────────────────────────

export function ComponentPageLayout({
  title,
  description,
  level,
  status = 'Stable',
  sections,
  implemented = ['lemniscate'],
}: ComponentPageLayoutProps) {
  return (
    <div className="space-y-10">
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

        {/* Product switcher */}
        <div className="pt-2 pb-4 border-b border-border">
          <ProductSwitcher implemented={implemented} />
          <p className="text-xs text-muted-foreground mt-2">
            Previews render with the selected product's token set.
            Dots (·) indicate placeholder implementations — tokens will be finalised at each product's design kickoff.
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

          {/* Preview / Code tabs */}
          <Tabs defaultValue="preview">
            <TabsList className="h-8 mb-0">
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

### 3D — Create page folders

```bash
mkdir -p ~/Breathe\ Design\ system/src/app/pages/atoms
mkdir -p ~/Breathe\ Design\ system/src/app/pages/molecules
mkdir -p ~/Breathe\ Design\ system/src/app/pages/organisms
mkdir -p ~/Breathe\ Design\ system/src/app/pages/templates
```

---

### 3E — Verify Part 3 compiles

```bash
cd ~/Breathe\ Design\ system
pnpm build
```

Expected: No TypeScript errors on the new context and layout files.
If errors exist, fix them before proceeding to Part 4.

---

## Part 4 — Migrate Existing Component Pages to New System

The existing component pages (Button, Card, Badge, Alert, Avatar, Checkbox,
Input, Modal, Select, Switch, Tabs, Tooltip) live at old paths like
`/components/button`. They need to:
1. Be moved to the new atomic paths (`/atoms/button`, `/molecules/card` etc.)
2. Be rewritten to use `ComponentPageLayout` + `ProductPreviewWrapper`

### Atomic vs Molecule classification for existing pages:

| Existing page | New path | Level |
|---|---|---|
| Button | `/atoms/button` | Atom |
| Input | `/atoms/input` | Atom |
| Checkbox | `/atoms/checkbox` | Atom |
| Switch | `/atoms/switch` | Atom |
| Avatar | `/atoms/avatar` | Atom |
| Badge | `/atoms/badge` | Atom |
| Alert | `/molecules/alert` | Molecule |
| Card | `/molecules/card` | Molecule |
| Select | `/molecules/select` | Molecule |
| Tabs | `/molecules/tabs` | Molecule |
| Tooltip | `/molecules/tooltip` | Molecule |
| Modal | `/organisms/dialog` | Organism |

### Migration pattern for each page:

For each existing page, apply this transformation:

**Before (existing pattern):**
```tsx
export default function ButtonPage() {
  return (
    <div>
      <PageHeader title="Button" description="..." />
      <ComponentPreview>
        <Button>Click me</Button>
      </ComponentPreview>
    </div>
  )
}
```

**After (new pattern using ComponentPageLayout):**
```tsx
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Button } from '@/app/components/ui/button'

export default function ButtonPage() {
  return (
    <ComponentPageLayout
      title="Button"
      description="Triggers actions or navigates users. Choose the right variant to communicate importance and nature of each action."
      level="Atom"
      status="Stable"
      implemented={['lemniscate', 'aumraa']}
      sections={[
        {
          title: 'Variants',
          description: 'Seven variants for different levels of emphasis.',
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
            react: `import { Button } from '@aumraa/breathe/components/ui/button'

<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Danger</Button>
<Button variant="link">Link</Button>`,
            reactNative: `// React Native implementation
// Tokens from: @aumraa/breathe/tokens/dist/react-native/lemniscate.ts
import { TouchableOpacity, Text } from 'react-native'
import { tokens } from '@aumraa/breathe/tokens/dist/react-native/lemniscate'

<TouchableOpacity style={{ backgroundColor: tokens.lmnsColorPrimary }}>
  <Text style={{ color: tokens.lmnsColorPrimaryForeground }}>Primary</Text>
</TouchableOpacity>`,
          },
        },
        {
          title: 'Sizes',
          description: 'Five sizes from XS to XL.',
          preview: (
            <div className="flex flex-wrap items-center gap-3">
              <Button size="xs">XS</Button>
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">XL</Button>
            </div>
          ),
          code: {
            react: `<Button size="xs">XS</Button>
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="xl">XL</Button>`,
          },
        },
        {
          title: 'States',
          description: 'Loading, disabled, and icon button states.',
          preview: (
            <div className="flex flex-wrap items-center gap-3">
              <Button disabled>Disabled</Button>
              <Button variant="outline" disabled>Disabled Outline</Button>
              <Button size="icon">→</Button>
            </div>
          ),
          code: {
            react: `<Button disabled>Disabled</Button>
<Button size="icon"><ArrowRight /></Button>`,
          },
        },
      ]}
    />
  )
}
```

Apply this migration pattern to all 12 existing component pages.
Keep all preview content the same — just wrap it with the new system.

For each page:
- Add `implemented={['lemniscate', 'aumraa']}` since both brands are defined
- Keep the existing preview JSX inside section `preview` fields
- Add React code snippets to each section's `code.react` field
- Add React Native placeholder to at least the first section's `code.reactNative`

---

## Part 5 — Final verification

```bash
cd ~/Breathe\ Design\ system

# Build passes
pnpm build

# Dev runs
pnpm dev
```

**Verify in browser:**

1. Left nav shows four sections: FOUNDATIONS / ATOMS / MOLECULES / ORGANISMS / TEMPLATES
2. Navigate to Atoms → Button
3. Product switcher row visible with all 7 product pills
4. Click Lemniscate → button preview shows blue `#40AAD4`
5. Click Aumraa → button preview switches to green `#2F9E44`
6. Click Technocracy → button preview switches to dark background
7. Foundations → Design Tokens → Aumraa tab shows green primary, not blue
8. `pnpm tokens` still builds cleanly

---

## Commit

```bash
cd ~/Breathe\ Design\ system

git add .
git commit -m "feat: atomic design structure + Aumraa brand correction + component system

- Correct Aumraa tokens: primary green #2F9E44, Source Sans 3 typeface
- Add green/yellowGreen/emerald palette to global.json
- Restructure nav: Foundations / Atoms / Molecules / Organisms / Templates
- ProductThemeContext: 7-product token switching for component previews
- ComponentPageLayout: reusable template for all component pages
- Migrate 12 existing component pages to new layout + atomic paths
- Update DesignTokensPage Aumraa tab with correct brand values"

git push origin main
```

---

## What File 2 will build

File 2 uses the system established here to build:
- 14 new Atom pages (Textarea, Radio Group, Slider, Progress, Skeleton, etc.)
- 9 new Molecule pages (Form, Dropdown, Popover, Breadcrumb, etc.)
- 9 new Organism pages (Dialog, Sheet, Command, Table, Calendar, etc.)
- 6 Template pages (StatGrid, PageToolbar, DataSection, PageBody, MobileFab, TabBar)

Every page uses `ComponentPageLayout` — no custom layout code per page.

---

*File 1 of 2 — Foundation + system. File 2 builds all remaining component pages.*
