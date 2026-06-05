# Kaayo Molecules — Design Spec
*Breathe Design System · Kaayo Brand · Neo-Brutalist*
**Date:** 2026-06-05

---

## Design Language Reference

All Kaayo molecule components inherit these invariants from the established atom system:

| Token | Value |
|---|---|
| Primary | `var(--kayo-color-primary, #970103)` |
| Foreground | `var(--kayo-color-foreground, #3b3d3f)` |
| Border | `var(--kayo-color-border, #3b3d3f)` (charcoal) |
| Background | `var(--kayo-color-background, #ffffff)` |
| Muted | `var(--kayo-color-muted, #f4f4f4)` |
| Negative | `var(--kayo-color-negative, #dc2626)` |
| Shadow sm | `2px 2px 0 #191b1f` |
| Shadow md | `4px 4px 0 #191b1f` |
| Font | `'DM Sans', system-ui, sans-serif` |
| Border width | `2px solid` |
| Border radius (containers) | `6px` |
| Border radius (pills/badges) | `999px` |
| On-press animation | `translate(2px, 2px)` + shadow collapses to none |
| Forbidden | blur, gradients, rounded-xl, box-shadow with blur radius |

**CSS injection pattern:** Each component injects its `<style>` tag on mount with a `STYLE_ID` guard — `if (!document.getElementById(STYLE_ID))`. Styles use `var(--kayo-color-*)` with hex fallbacks.

---

## Phase 1 — Container & Interaction Foundations

*Components: Alert, Card, Tabs, Accordion*
*Rationale: Alert + Card establish the content-container visual language. Tabs + Accordion establish stateful interaction with the press/expand animation system. These four set the bar for everything in Phase 2 and 3.*

---

### 1. KayoBrutalistAlert

**File:** `src/app/components/custom/kaayo/KayoBrutalistAlert.tsx`
**Page:** `src/app/pages/molecules/AlertPage.tsx`

#### Visual Anatomy
- Container: 2px solid border, 6px border-radius, shadow-sm, 12px padding
- **Left accent bar:** 4px wide, full height, colour matches variant — the primary Neo-Brutalist differentiator for alerts
- Icon slot: 20×20px, colour matches variant, placed flush with accent bar
- Title: 14px, fontWeight 600
- Description: 13px, fontWeight 400, muted foreground
- Dismiss button (optional): top-right X, ghost button, icon only

#### Variant Colours

| Variant | Border colour | Accent bar | Icon colour | Background tint |
|---|---|---|---|---|
| `info` | `#3b3d3f` (charcoal) | `#3b3d3f` | `#3b3d3f` | `#f9f9f9` |
| `success` | `#166534` | `#166534` | `#166534` | `#f0fdf4` |
| `warning` | `#92400e` | `#d97706` | `#d97706` | `#fffbeb` |
| `error` | `#970103` (primary) | `#970103` | `#970103` | `#fff5f5` |

#### Prop API
```ts
interface KayoBrutalistAlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error'   // default: 'info'
  title?: string
  description?: string
  icon?: ReactNode
  dismissible?: boolean
  onDismiss?: () => void
}
```

#### Permutation Matrix (sections on the page)

| Section title | Combination rendered |
|---|---|
| `Variants` | All 4 variants stacked — icon + title + description, no dismiss |
| `With Dismiss` | error variant + dismiss button — shows controlled dismiss with useState |
| `Title Only` | info variant, no description, no icon |
| `Icon + Title + Description` | success variant — full slots filled |
| `With Action` | warning variant — description + an inline CTA link text ("Review settings →") |
| `No Icon` | error variant — no icon prop, just title + description |

---

### 2. KayoBrutalistCard

**File:** `src/app/components/custom/kaayo/KayoBrutalistCard.tsx`
**Page:** `src/app/pages/molecules/CardPage.tsx`

#### Visual Anatomy
- Container: 2px solid charcoal border, 6px border-radius
- Shadow: shadow-sm by default, shadow-md for `elevated` variant, none for `flat`
- Internal dividers between header/body/footer: 2px solid `var(--kayo-color-border)` — same weight as the outer border
- Padding: 16px per section
- **Interactive card:** on press → translate(2px, 2px) + shadow collapses
- No background image, no gradient overlays

#### Sub-components (inline, not separate files)
- `KayoBrutalistCard` — container with `variant` + `onClick` + `fullWidth` props
- `KayoBrutalistCardHeader` — wraps title + description + optional badge slot (top-right)
- `KayoBrutalistCardBody` — main content area, accepts `children`
- `KayoBrutalistCardFooter` — flex row, `justify?: 'start' | 'end' | 'between'`

#### Prop API
```ts
interface KayoBrutalistCardProps {
  variant?: 'default' | 'elevated' | 'flat'   // default: 'default'
  onClick?: () => void                          // enables press animation
  fullWidth?: boolean
  children: ReactNode
}
interface KayoBrutalistCardHeaderProps {
  title: string
  description?: string
  badge?: ReactNode              // slot for KayoBrutalistBadge
  action?: ReactNode             // slot for icon button top-right
}
interface KayoBrutalistCardFooterProps {
  justify?: 'start' | 'end' | 'between'
  children: ReactNode
}
```

#### Permutation Matrix

| Section title | Combination rendered |
|---|---|
| `Default` | Header (title + description) + Body (body text) + Footer (Cancel + Save buttons) |
| `Elevated` | Same content, `variant="elevated"` — shadow-md |
| `Flat` | Header + Body only, `variant="flat"` — no shadow, just border |
| `Header Only` | Card with CardHeader only — title + badge slot used (KayoBrutalistBadge "New") |
| `With Status Badge` | Header has badge top-right (KayoBrutalistBadge variant "success"), body text, no footer |
| `Interactive` | Full card with `onClick`, shows press animation. Footer: "View details →" link |
| `Header + Action Icon` | Header has pencil icon in `action` slot (edit button), body, no footer |
| `Footer Justify Variants` | Three small cards side by side: `start`, `end`, `between` footer alignment |

---

### 3. KayoBrutalistTabs

**File:** `src/app/components/custom/kaayo/KayoBrutalistTabs.tsx`
**Page:** `src/app/pages/molecules/TabsPage.tsx`

#### Visual Anatomy
- Tab bar: 2px solid charcoal border, shadow-sm, 6px border-radius, `display: flex`, `background: #f4f4f4`
- **Active tab:** crimson background (`var(--kayo-color-primary)`), white text, 2px border, 4px border-radius (inset), shadow-sm offset within the bar
- **Inactive tab:** transparent background, charcoal text, no shadow — on hover: muted bg `#e8e8e8`
- **Disabled tab:** muted text `#a8a8aa`, cursor not-allowed, no hover effect
- Active tab switch: instant (no CSS transition on content — brutalist feel)
- Tab content area: no border, 16px top padding, 13px text

#### Prop API
```ts
interface KayoBrutalistTabsProps {
  tabs: Array<{
    value: string
    label: string
    icon?: ReactNode
    badge?: string | number     // renders as a small pill count
    disabled?: boolean
    content: ReactNode
  }>
  defaultValue?: string
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}
```

#### Size tokens
| Size | Font | Padding H | Padding V | Min-height |
|---|---|---|---|---|
| sm | 12px | 10px | 6px | 32px |
| md | 14px | 14px | 8px | 40px |
| lg | 15px | 18px | 10px | 48px |

#### Permutation Matrix

| Section title | Combination rendered |
|---|---|
| `Default` | 3 tabs (Overview / Analytics / Settings), md size, no icons |
| `With Icons` | 3 tabs each with a lucide icon + label |
| `With Badge Count` | 3 tabs — one has badge "4" (e.g. "Alerts (4)") |
| `Sizes` | Same 3 tabs rendered at sm / md / lg side by side |
| `Full Width` | 3 tabs, `fullWidth=true` — each tab expands equally |
| `With Disabled Tab` | 3 tabs, middle tab disabled |
| `Two Tabs` | Minimal: 2 tabs only |

---

### 4. KayoBrutalistAccordion

**File:** `src/app/components/custom/kaayo/KayoBrutalistAccordion.tsx`
**Page:** `src/app/pages/molecules/AccordionPage.tsx`

#### Visual Anatomy
- Each accordion item is a **separate block** (gap: 8px between items) — not a continuous connected border
- Item collapsed: 2px solid charcoal border, 6px border-radius, shadow-sm
- Item expanded: 2px solid charcoal border, 6px border-radius, shadow-md (deeper shadow = "open" state)
- Trigger row: 14px fontWeight 600, chevron icon right-aligned — rotates 180° via CSS transform on expand
- Chevron animation: `transform: rotate(180deg)`, `transition: transform 200ms`
- Disabled item: border `#d1d5db`, text `#a8a8aa`, no shadow, cursor not-allowed
- Content area: 13px, charcoal text, 12px top padding, 16px horizontal padding

#### Prop API
```ts
interface KayoBrutalistAccordionItem {
  value: string
  trigger: string
  content: ReactNode
  icon?: ReactNode              // optional prefix icon in trigger
  badge?: string | number       // optional count badge in trigger (right of label)
  disabled?: boolean
}
interface KayoBrutalistAccordionProps {
  items: KayoBrutalistAccordionItem[]
  type?: 'single' | 'multiple'  // default: 'single'
  defaultOpen?: string | string[]
}
```

#### Permutation Matrix

| Section title | Combination rendered |
|---|---|
| `Single Expand` | 3 items, type="single" — FAQ content (one open at a time) |
| `Multiple Expand` | 3 items, type="multiple" — two open by default |
| `With Icons` | 3 items each with a prefix lucide icon in trigger |
| `With Badge` | One item has badge "3" next to label (e.g. "Documents (3)") |
| `With Disabled Item` | 3 items, middle item disabled |
| `Rich Content` | One expanded item with a bulleted list inside content |
| `With Action in Content` | One item with a KayoBrutalistButton ("View all →") inside expanded content |

---

## Phase 2 — Overlay & Composition Molecules

*Components: Form, Dropdown Menu, Tooltip, Hover Card, Collapsible*
*Rationale: Form composes Kaayo atoms. Dropdown Menu, Tooltip, Hover Card share positioned-overlay mechanics. Collapsible is simpler but shares expand/collapse logic with Accordion.*

---

### 5. KayoBrutalistForm

**File:** `src/app/components/custom/kaayo/KayoBrutalistForm.tsx`
**Page:** `src/app/pages/molecules/FormPage.tsx`

#### Design Notes
- The Form molecule **composes existing Kaayo atoms**: KayoBrutalistInput, KayoBrutalistTextarea, KayoBrutalistSelect, KayoBrutalistButton, KayoBrutalistCheckbox
- The form container itself has no border — it's a layout wrapper (`display: flex; flex-direction: column; gap: 16px`)
- Each field group: label (12px, fontWeight 600, charcoal, uppercase letter-spacing) + input atom
- **Validation state row** below input: 12px text, `#dc2626` for error, `#166534` for success hint
- Form section dividers: 2px solid charcoal, full width, 8px vertical margin
- Layout variants: `vertical` (stacked, default), `horizontal` (label 140px fixed left, input fills right), `inline` (label hidden, single row)

#### Prop API
```ts
interface KayoBrutalistFormProps {
  layout?: 'vertical' | 'horizontal' | 'inline'
  onSubmit?: (e: FormEvent) => void
  children: ReactNode
}
interface KayoBrutalistFormFieldProps {
  label: string
  htmlFor?: string
  error?: string
  hint?: string
  required?: boolean
  children: ReactNode
}
```

#### Permutation Matrix

| Section title | Combination rendered |
|---|---|
| `Login Form` | Email input + Password input + "Remember me" checkbox + Submit button (primary) |
| `Registration Form` | Name / Email / Password / Confirm Password + Submit — shows field grouping |
| `With Validation` | Form with error state on email field (red border + error message below) and success on name (green hint) |
| `Horizontal Layout` | 3 fields in `layout="horizontal"` — label fixed left, input right |
| `Inline / Search Form` | Single input + button in a row (e.g. "Subscribe to newsletter") |
| `Full Field Set` | Text + Email + Password + Select + Textarea + Checkbox + Radio + Submit |
| `Sectioned Form` | Two sections separated by divider: "Account Details" and "Preferences" |

---

### 6. KayoBrutalistDropdownMenu

**File:** `src/app/components/custom/kaayo/KayoBrutalistDropdownMenu.tsx`
**Page:** `src/app/pages/molecules/DropdownMenuPage.tsx`

#### Visual Anatomy
- Trigger: any element (wraps it, no styling on trigger itself)
- Menu panel: 2px solid charcoal border, 6px border-radius, shadow-md, min-width 200px, `background: #fff`
- Item: 14px, charcoal, 10px vertical padding, 14px horizontal padding, cursor pointer
- Item hover: `background: var(--kayo-color-muted, #f4f4f4)`
- **Destructive item:** text `#dc2626`, hover background `#fff5f5`
- **Disabled item:** text `#a8a8aa`, cursor not-allowed, no hover
- Separator: 2px solid `var(--kayo-color-border)` — same weight as outer border
- Group label: 11px, uppercase, letter-spacing 0.06em, `#a8a8aa`, not clickable, 8px padding
- Icon in item: 16px, left of label, 8px gap
- Shortcut text: right-aligned, 11px, `#a8a8aa`, font-mono
- Opens on trigger click; closes on outside click or Escape
- Position: `absolute`, drops below trigger (bottom-start), 4px gap

#### Prop API
```ts
type DropdownItem =
  | { type: 'item'; label: string; icon?: ReactNode; shortcut?: string; destructive?: boolean; disabled?: boolean; onClick?: () => void }
  | { type: 'separator' }
  | { type: 'label'; text: string }

interface KayoBrutalistDropdownMenuProps {
  trigger: ReactNode
  items: DropdownItem[]
  align?: 'start' | 'end'      // default: 'start'
}
```

#### Permutation Matrix

| Section title | Combination rendered |
|---|---|
| `Default` | Button trigger + 5 menu items (no icons) |
| `With Icons` | 5 items each with a lucide icon |
| `With Shortcuts` | Items showing keyboard shortcuts right-aligned |
| `With Separator + Labels` | "Actions" label group / items / separator / "Danger Zone" label / destructive item |
| `With Disabled Items` | 5 items, one disabled in the middle |
| `With Destructive Item` | "Delete account" as last item, crimson red |
| `Icon Button Trigger` | Trigger is a `⋯` (MoreHorizontal) icon button instead of text button |

---

### 7. KayoBrutalistTooltip

**File:** `src/app/components/custom/kaayo/KayoBrutalistTooltip.tsx`
**Page:** `src/app/pages/molecules/TooltipPage.tsx`

#### Visual Anatomy
- Tooltip panel: 2px solid charcoal border, 6px border-radius, shadow-sm, `background: #191b1f`, `color: #fff`
- Font: 12px, DM Sans
- Padding: 6px horizontal, 4px vertical
- **No arrow/caret** — flat edge, Neo-Brutalist (no decorative triangles)
- Delay: 300ms show, 0ms hide
- Position: top (default), right, bottom, left — 6px offset from trigger
- Tooltip is rendered in a portal (appended to body) to avoid overflow clipping

#### Prop API
```ts
interface KayoBrutalistTooltipProps {
  content: string | ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'   // default: 'top'
  delay?: number                                  // ms, default: 300
  children: ReactNode                             // trigger element
}
```

#### Permutation Matrix

| Section title | Combination rendered |
|---|---|
| `Positions` | 4 icon buttons each with tooltip on top / right / bottom / left |
| `On Button` | Primary KayoBrutalistButton with tooltip "Save changes" on top |
| `On Icon` | Help circle icon with tooltip explaining the field |
| `Long Content` | Tooltip with a two-line description string |
| `On Disabled Element` | Wrapper div over disabled button with tooltip "Requires admin role" |
| `No Delay` | `delay={0}` — instant show on hover |

---

### 8. KayoBrutalistHoverCard

**File:** `src/app/components/custom/kaayo/KayoBrutalistHoverCard.tsx`
**Page:** `src/app/pages/molecules/HoverCardPage.tsx`

#### Visual Anatomy
- Card panel: 2px solid charcoal border, 6px border-radius, shadow-md, min-width 280px, `background: #fff`
- Opens on hover (300ms delay), stays open while hovering card itself
- Closes on mouse-leave (150ms delay)
- No arrow — flat panel drops below trigger
- Position: bottom-start by default, 8px offset
- Internal layout uses the KayoBrutalistCard visual language but without the interactive press effect

#### Content Templates (pre-built slots)
```ts
interface KayoBrutalistHoverCardProps {
  trigger: ReactNode
  // Content is free-form children — no rigid template
  children: ReactNode
  side?: 'top' | 'bottom'      // default: 'bottom'
}
```

#### Permutation Matrix

| Section title | Combination rendered |
|---|---|
| `User Profile` | Trigger: `@username` link text. Card: avatar (KayoBrutalistAvatar) + display name + bio (2 lines) + joined date |
| `Link Preview` | Trigger: URL text. Card: bold link title + 2-line description + domain tag (KayoBrutalistBadge) |
| `Stat Summary` | Trigger: metric value (e.g. "₹4,200"). Card: label + value + delta (+ KayoBrutalistBadge "↑ 12%") |
| `With Actions` | User profile card + two buttons at bottom (Follow / Message) |

---

### 9. KayoBrutalistCollapsible

**File:** `src/app/components/custom/kaayo/KayoBrutalistCollapsible.tsx`
**Page:** `src/app/pages/molecules/CollapsiblePage.tsx`

#### Visual Anatomy
- Entire component: 2px solid charcoal border, 6px border-radius, shadow-sm
- Header row: always visible — trigger text (fontWeight 600) + chevron right-aligned (rotates 180° on open)
- Content area: revealed below header, separated by a 2px solid border line (same charcoal)
- When open: shadow grows to shadow-md (same pattern as Accordion items)
- Different from Accordion: single panel, not a list — used for "show more / show less" patterns

#### Prop API
```ts
interface KayoBrutalistCollapsibleProps {
  trigger: string | ReactNode         // always-visible header text or element
  defaultOpen?: boolean
  children: ReactNode                  // revealed content
  triggerSide?: 'left' | 'right'     // chevron placement, default: 'right'
}
```

#### Permutation Matrix

| Section title | Combination rendered |
|---|---|
| `Default` | "Advanced filters" trigger, collapsed by default, text content inside |
| `Default Open` | "Notifications" trigger, open by default, shows a short list of items |
| `With Rich Content` | Trigger: "Team members (3)", content: mini-list of avatars + names |
| `Trigger Left Chevron` | `triggerSide="left"` — chevron precedes the label |
| `Programmatic Control` | Two collapsibles + external "Expand all / Collapse all" buttons — demonstrates controlled pattern |

---

## Phase 3 — Navigation & Utility Molecules

*Components: Breadcrumb, Pagination, Scroll Area, Sonner (Toast)*
*Rationale: Navigation patterns (Breadcrumb, Pagination) are mostly styling with minimal state. Scroll Area is containment-only. Sonner is the most isolated — toast API wrapping — cleanest to do last.*

---

### 10. KayoBrutalistBreadcrumb

**File:** `src/app/components/custom/kaayo/KayoBrutalistBreadcrumb.tsx`
**Page:** `src/app/pages/molecules/BreadcrumbPage.tsx`

#### Visual Anatomy
- Inline flex row, `align-items: center`, `gap: 4px`
- Crumb link: 13px, DM Sans, charcoal text, no underline — on hover: crimson text + underline
- **Separator:** `/` character, `#a8a8aa`, 13px — not an icon, a literal slash (Neo-Brutalist keeps it typographic)
- Current page (last item): charcoal, fontWeight 600, no link, no underline
- Home item: home icon (16px) — clicking navigates home
- Ellipsis for overflow (> 4 crumbs): shows `…` as a non-clickable separator replacement, expands on click

#### Prop API
```ts
interface BreadcrumbItem {
  label: string
  href?: string
  icon?: ReactNode               // for home icon
}
interface KayoBrutalistBreadcrumbProps {
  items: BreadcrumbItem[]
  maxVisible?: number            // truncates middle items when exceeded, default: undefined (show all)
  separator?: string             // default: '/'
}
```

#### Permutation Matrix

| Section title | Combination rendered |
|---|---|
| `Default (3 levels)` | Home / Projects / Active Project |
| `Two Levels` | Home / Settings |
| `With Home Icon` | Home icon item / Reports / Q1 Summary |
| `Four Levels` | Home / Products / Kaayo / Atoms — shows depth |
| `With Overflow (5+ levels)` | `maxVisible={3}` — renders Home / … / (last 2) with ellipsis in middle |
| `Custom Separator` | `separator="›"` (chevron-style) |

---

### 11. KayoBrutalistPagination

**File:** `src/app/components/custom/kaayo/KayoBrutalistPagination.tsx`
**Page:** `src/app/pages/molecules/PaginationPage.tsx`

#### Visual Anatomy
- Container: `display: flex; align-items: center; gap: 4px`
- Page button: 36×36px, 2px solid charcoal border, 6px border-radius, shadow-sm, 13px text
- **Active page:** crimson background, white text, shadow-sm — same as active Tabs treatment
- Previous / Next buttons: same size, use `←` / `→` chevron icons + label ("Previous" / "Next")
- Disabled Prev/Next: muted border + text, no shadow, cursor not-allowed
- Ellipsis: `…` rendered as a non-button plain text at same size
- On press: translate(2px, 2px) + shadow collapses (all interactive buttons)

#### Prop API
```ts
interface KayoBrutalistPaginationProps {
  total: number              // total pages
  current: number
  onChange: (page: number) => void
  siblings?: number          // pages shown around current, default: 1
  showPrevNext?: boolean     // default: true
  showFirstLast?: boolean    // default: false
}
```

#### Permutation Matrix

| Section title | Combination rendered |
|---|---|
| `Default (5 pages)` | Pages 1–5, current = 3 — no ellipsis needed |
| `Many Pages (with ellipsis)` | total=20, current=10 — shows `1 … 9 10 11 … 20` |
| `First Page` | current=1 — Previous disabled |
| `Last Page` | current=total — Next disabled |
| `With First/Last Buttons` | `showFirstLast=true` — adds `«` and `»` buttons |
| `Interactive Demo` | useState-driven — clicking pages updates current live |

---

### 12. KayoBrutalistScrollArea

**File:** `src/app/components/custom/kaayo/KayoBrutalistScrollArea.tsx`
**Page:** `src/app/pages/molecules/ScrollAreaPage.tsx`

#### Visual Anatomy
- Wrapper: 2px solid charcoal border, 6px border-radius, `overflow: hidden`, fixed height/width set by consumer
- Inner: `overflow: auto`, full size — native scroll, no custom scrollbar track (relies on browser scrollbar)
- **Custom scrollbar via CSS injection:**
  - `::-webkit-scrollbar` width: 8px
  - `::-webkit-scrollbar-track` background: `var(--kayo-color-muted, #f4f4f4)`
  - `::-webkit-scrollbar-thumb` background: `var(--kayo-color-border, #3b3d3f)`, border-radius: 0 (flat, brutalist)
  - `::-webkit-scrollbar-thumb:hover` background: `#191b1f`
- Scroll direction: vertical (default), horizontal, or both

#### Prop API
```ts
interface KayoBrutalistScrollAreaProps {
  height?: number | string     // default: 300px
  width?: number | string      // default: '100%'
  orientation?: 'vertical' | 'horizontal' | 'both'
  children: ReactNode
}
```

#### Permutation Matrix

| Section title | Combination rendered |
|---|---|
| `Vertical List` | Fixed 300px height, 30-item list (tags/names) — scrolls vertically |
| `Horizontal Content` | Fixed 300px width, wide table or image strip — scrolls horizontally |
| `Both Axes` | Fixed 300×300px, large grid content — scrolls in both |
| `Custom Height` | height="200px" narrow box, showing scrollbar style clearly |

---

### 13. KayoBrutalistSonner

**File:** `src/app/components/custom/kaayo/KayoBrutalistSonner.tsx`
**Page:** `src/app/pages/molecules/SonnerPage.tsx`

#### Visual Anatomy
- Toast panel: 2px solid charcoal border, 6px border-radius, shadow-md, min-width 300px, `background: #fff`
- **Left accent bar** (4px, same as Alert) — colour matches toast type
- Title: 14px, fontWeight 600
- Description: 13px, muted foreground
- Dismiss X button: top-right, ghost, always present
- Action button (optional): inline right of description, KayoBrutalistButton `size="sm" variant="outline"`
- Icon: 20px, type-coloured, left of text block
- Stack behaviour: toasts stack bottom-right, newest on top, max 3 visible

#### Toast Types and Colours

| Type | Accent bar | Icon | Background tint |
|---|---|---|---|
| `default` | charcoal `#3b3d3f` | — | `#fff` |
| `success` | `#166534` | CheckCircle | `#f0fdf4` |
| `error` | `#970103` | XCircle | `#fff5f5` |
| `warning` | `#d97706` | AlertTriangle | `#fffbeb` |
| `info` | `#1d4ed8` | Info | `#eff6ff` |
| `loading` | `#3b3d3f` | Spinner (animated) | `#f4f4f4` |

#### Integration Approach
- Uses the `sonner` library's `Toaster` + `toast()` API, but overrides visual rendering via `KayoBrutalistSonner` as a custom `toastOptions` wrapper passed to `<Toaster>`
- The page exposes trigger buttons that call `toast.success(...)`, `toast.error(...)` etc.
- The `KayoBrutalistSonner` component is simply the configured `<Toaster>` with Kaayo styles injected

#### Prop API (Toaster wrapper)
```ts
interface KayoBrutalistSonnerProps {
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
  // default: 'bottom-right'
  richColors?: boolean   // default: true — uses type-based colours
  closeButton?: boolean  // default: true
}
```

#### Permutation Matrix

| Section title | Combination rendered |
|---|---|
| `Types` | 6 buttons — each triggers its toast type (default/success/error/warning/info/loading) |
| `With Description` | success toast with title + description string |
| `With Action` | error toast + "Retry" action button |
| `Positions` | 6 buttons each changing position before firing a toast |
| `Loading → Success` | One button triggers `toast.promise()` — loading state transitions to success |
| `Multiple Stacked` | "Spam" button fires 3 toasts rapidly — shows stack behaviour |

---

## Implementation Checklist

### Phase 1
- [ ] `KayoBrutalistAlert` component + `AlertPage.tsx` update
- [ ] `KayoBrutalistCard` + sub-components + `CardPage.tsx` update
- [ ] `KayoBrutalistTabs` + `TabsPage.tsx` update
- [ ] `KayoBrutalistAccordion` + `AccordionPage.tsx` update
- [ ] All 4 pages: `implemented={['lemniscate', 'aumraa', 'kaayo']}`

### Phase 2
- [ ] `KayoBrutalistForm` + `FormPage.tsx` update
- [ ] `KayoBrutalistDropdownMenu` + `DropdownMenuPage.tsx` update
- [ ] `KayoBrutalistTooltip` + `TooltipPage.tsx` update
- [ ] `KayoBrutalistHoverCard` + `HoverCardPage.tsx` update
- [ ] `KayoBrutalistCollapsible` + `CollapsiblePage.tsx` update
- [ ] All 5 pages: `implemented={['lemniscate', 'aumraa', 'kaayo']}`

### Phase 3
- [ ] `KayoBrutalistBreadcrumb` + `BreadcrumbPage.tsx` update
- [ ] `KayoBrutalistPagination` + `PaginationPage.tsx` update
- [ ] `KayoBrutalistScrollArea` + `ScrollAreaPage.tsx` update
- [ ] `KayoBrutalistSonner` + `SonnerPage.tsx` update
- [ ] All 4 pages: `implemented={['lemniscate', 'aumraa', 'kaayo']}`

---

## Notes on Code Samples

Each page section's `code` block should include:
- `react` — the Kaayo JSX using the KayoBrutalist* component (from this spec)
- `reactNative` — equivalent inline styles using Kaayo token values (hex fallbacks, `fontFamily: 'DM Sans'`)
- `ios` — SwiftUI snippet following the same Neo-Brutalist rules
- `android` — Jetpack Compose snippet
- `tailwind` — Tailwind equivalent (for non-Kaayo reference)

All code samples in atom pages followed this pattern — molecules continue it.
