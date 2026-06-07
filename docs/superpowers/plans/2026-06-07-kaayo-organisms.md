# Kaayo Neo-Brutalist Organisms Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build 10 Kaayo Neo-Brutalist organism components for the Breathe Design System, each with a full demo page covering every permutation and combination, wired into the design system navigation.

**Architecture:** Every organism follows the established pattern — pure inline-style TSX (no Tailwind), CSS injection via `STYLE_ID` guards for pseudo-class / animation effects, `isKaayo` branching on the page to show Kaayo vs shadcn, `createPortal` for overlay organisms that must escape stacking contexts. Two organisms (Header, BottomNav) require new routes and navData entries; the remaining eight update existing organism pages.

**Tech Stack:** React 18 (JSX transform — no `import React`), TypeScript, inline styles only, lucide-react icons, `createPortal` from `react-dom` for overlays.

---

## Design Language Invariants

| Token | Value |
|---|---|
| Primary (crimson) | `#970103` |
| Border / foreground | `#3b3d3f` |
| Near-black (shadow) | `#191b1f` |
| Background | `#ffffff` |
| Muted | `#f4f4f4` |
| Negative | `#dc2626` |
| Shadow sm | `2px 2px 0 #191b1f` (no blur) |
| Shadow md | `4px 4px 0 #191b1f` (no blur) |
| Shadow up (drawers) | `-4px -4px 0 #191b1f` |
| Font | `'DM Sans', system-ui, sans-serif` |
| Border | `2px solid #3b3d3f` |
| Border radius | `6px` (containers) · `999px` (pills) |
| Press animation | `translate(2px, 2px)` + shadow collapses to `none` |
| Overlay backdrop | `rgba(25, 27, 31, 0.6)` — **no blur** |
| Slide speed | `200ms ease-out` |
| Forbidden | blur, gradients, Tailwind classes |

---

## File Map

| File | Action |
|---|---|
| `src/app/components/custom/kaayo/KayoBrutalistHeader.tsx` | **Create** |
| `src/app/pages/organisms/HeaderPage.tsx` | **Create** |
| `src/app/components/custom/kaayo/KayoBrutalistBottomNav.tsx` | **Create** |
| `src/app/pages/organisms/BottomNavPage.tsx` | **Create** |
| `src/app/components/layout/navData.ts` | **Modify** — add Header + BottomNav entries |
| `src/app/routes.tsx` | **Modify** — add 2 new routes |
| `src/app/components/custom/kaayo/KayoBrutalistDialog.tsx` | **Create** |
| `src/app/pages/organisms/DialogPage.tsx` | **Modify** |
| `src/app/components/custom/kaayo/KayoBrutalistSheet.tsx` | **Create** |
| `src/app/pages/organisms/SheetPage.tsx` | **Modify** |
| `src/app/components/custom/kaayo/KayoBrutalistDrawer.tsx` | **Create** |
| `src/app/pages/organisms/DrawerPage.tsx` | **Modify** |
| `src/app/components/custom/kaayo/KayoBrutalistDataTable.tsx` | **Create** |
| `src/app/pages/organisms/TablePage.tsx` | **Modify** |
| `src/app/components/custom/kaayo/KayoBrutalistCarousel.tsx` | **Create** |
| `src/app/pages/organisms/CarouselPage.tsx` | **Modify** |
| `src/app/components/custom/kaayo/KayoBrutalistCommand.tsx` | **Create** |
| `src/app/pages/organisms/CommandPage.tsx` | **Modify** |
| `src/app/components/custom/kaayo/KayoBrutalistSideNav.tsx` | **Create** |
| `src/app/pages/organisms/SidebarPage.tsx` | **Modify** |
| `src/app/components/custom/kaayo/KayoBrutalistNavigationMenu.tsx` | **Create** |
| `src/app/pages/organisms/NavigationMenuPage.tsx` | **Modify** |

---

## Shared Implementation Rules (apply to every task)

1. **No `import React`** — JSX transform active.
2. **No Tailwind** — all styling via `style={{}}` or injected CSS string.
3. **CSS injection pattern** for hover/animation:
```tsx
const STYLE_ID = 'kayo-[organism]-styles'
useEffect(() => {
  if (document.getElementById(STYLE_ID)) return
  const s = document.createElement('style')
  s.id = STYLE_ID
  s.textContent = `/* css here */`
  document.head.appendChild(s)
}, [])
```
4. **isKaayo branching** on every page:
```tsx
const { activeProduct } = useProductTheme()
const isKaayo = activeProduct === 'kaayo'
// preview: isKaayo ? <KayoComponent /> : <ShadcnComponent />
```
5. **implemented prop** on every page: `implemented={['lemniscate', 'aumraa', 'kaayo']}`
6. **Portal rendering** for all overlay organisms (Dialog, Sheet, Drawer, Command):
```tsx
import { createPortal } from 'react-dom'
// return createPortal(<overlay>, document.body)
```
7. **Press animation helper** — apply inline via `onMouseDown` / `onMouseUp`:
```tsx
onMouseDown={e => e.currentTarget.style.transform = 'translate(2px,2px)'}
onMouseUp={e => e.currentTarget.style.transform = ''}
```

---

## Phase 1 — Navigation Shell Organisms (2 new pages)

---

### Task 1: KayoBrutalistHeader component

**Files:**
- Create: `src/app/components/custom/kaayo/KayoBrutalistHeader.tsx`

**Props interface:**

```tsx
export interface KayoBrutalistHeaderProps {
  logo?: ReactNode                          // defaults to text "Kaayo"
  variant?: 'mobile' | 'tablet' | 'desktop' // layout mode; default 'desktop'
  navItems?: { label: string; href: string; active?: boolean }[]
  onBellPress?: () => void
  bellCount?: number                        // unread badge on bell icon (0 hides badge)
  user?: {
    name: string
    role: string
    initials: string
  }
  onUserPress?: () => void
  sticky?: boolean                          // adds position:sticky + drop shadow on scroll
  pageTitle?: string                        // optional centre slot (desktop only)
}
```

**Design specs per slot:**

| Slot | Spec |
|---|---|
| Container | `minHeight:60px`, `borderBottom: 2px solid #3b3d3f`, `backgroundColor:#fff`, `paddingInline:24px`, `display:flex`, `alignItems:center`, `justifyContent:space-between` |
| Sticky shadow | `boxShadow: 2px 2px 0 #191b1f` added via scroll listener when `sticky=true` |
| Logo slot | left-aligned, `height:36px` |
| Centre nav (desktop) | `display:flex`, `gap:8px`; each item: `padding:8px 12px`, `2px solid transparent` border, on active: `borderBottom:2px solid #970103` |
| Page title (desktop) | `fontFamily:DM Sans`, `fontWeight:600`, `fontSize:14px`, absolutely centred in header |
| Bell button | `width:36px height:36px`, `border:2px solid #3b3d3f`, `borderRadius:6px`, icon `Bell` 18px, `#3b3d3f` colour; badge pill: `position:absolute`, `top:-6px right:-6px`, `minWidth:18px`, `backgroundColor:#970103`, `color:#fff`, `fontSize:10px`, `borderRadius:999px`, `border:2px solid #fff` |
| User chip (tablet+) | `display:flex gap:8px alignItems:center`; Avatar circle `36px`, `backgroundColor:#970103`, `border:2px solid #3b3d3f`; Name `fontSize:13px fontWeight:600`; Role badge `backgroundColor:#fff0f0 border:1px solid #fca5a5 color:#970103 fontSize:10px borderRadius:4px paddingInline:6px`; `ChevronDown` 14px |
| User avatar only (mobile) | Same circle, `34px`, no name/role |

**CSS injection needed:** hover on nav items (underline slide), hover on bell + user chip (background tint), `transition: box-shadow 150ms` for sticky.

- [ ] **Step 1: Create `KayoBrutalistHeader.tsx` with full implementation**

The component must render three layout variants controlled by `variant` prop:

- `mobile`: `[logo] ··· [bell + badge] [avatar 34px]`
- `tablet`: `[logo] ··· [bell + badge] [avatar 36px · name · role badge · chevron]`
- `desktop`: `[logo] [nav items] [page title centred] [bell + badge] [user chip]`

Bell badge renders only when `bellCount > 0`. Sticky behaviour attaches a `scroll` listener on mount that toggles `boxShadow` on the container ref.

- [ ] **Step 2: Commit**

```bash
git add src/app/components/custom/kaayo/KayoBrutalistHeader.tsx
git commit -m "feat(organisms): KayoBrutalistHeader — mobile/tablet/desktop variants, bell badge, sticky shadow"
```

---

### Task 2: HeaderPage

**Files:**
- Create: `src/app/pages/organisms/HeaderPage.tsx`
- Modify: `src/app/components/layout/navData.ts`
- Modify: `src/app/routes.tsx`

**Page sections — full permutation matrix:**

| # | Section title | What it demos | Key props |
|---|---|---|---|
| 1 | Mobile layout | Logo + Bell + Avatar only | `variant="mobile"` |
| 2 | Tablet layout | Logo + Bell + Avatar + Name + Role badge | `variant="tablet"` |
| 3 | Desktop layout | Logo + Nav items + Bell + User chip | `variant="desktop"` with 4 `navItems` |
| 4 | Active nav item | Third nav item highlighted with crimson underline | `navItems[2].active=true` |
| 5 | With page title | Centred page title in desktop header | `pageTitle="Dashboard"` |
| 6 | Bell with unread count | Badge showing 3 unread on bell | `bellCount={3}` |
| 7 | High unread count | Badge clamped to "9+" display | `bellCount={12}` |
| 8 | Sticky header demo | Wrapped in scrollable container; shadow appears on scroll | `sticky={true}` |
| 9 | No user (guest) | Only logo + bell, no user chip | `user={undefined}` |
| 10 | Custom logo slot | ReactNode logo (SVG) in logo slot | custom `logo` prop |

- [ ] **Step 1: Create `HeaderPage.tsx`** using `ComponentPageLayout` with the 10 sections above. Each section preview shows `isKaayo ? <KayoBrutalistHeader ... /> : <shadcn TopBar placeholder>`.

- [ ] **Step 2: Add to `navData.ts`** — insert after `'Drawer'` in the Organisms section:

```ts
{ label: 'Header',     path: '/organisms/header',     description: 'App top bar with logo, bell and user chip' },
{ label: 'Bottom Nav', path: '/organisms/bottom-nav', description: 'Fixed 5-tab mobile and tablet navigation bar' },
```

- [ ] **Step 3: Add to `routes.tsx`** — add lazy imports and route entries:

```tsx
const HeaderPage    = lazy_page(() => import('./pages/organisms/HeaderPage'))
const BottomNavPage = lazy_page(() => import('./pages/organisms/BottomNavPage'))

// inside the route children array:
{ path: 'organisms/header',     Component: HeaderPage },
{ path: 'organisms/bottom-nav', Component: BottomNavPage },
```

- [ ] **Step 4: Commit**

```bash
git add src/app/pages/organisms/HeaderPage.tsx src/app/components/layout/navData.ts src/app/routes.tsx
git commit -m "feat(organisms): HeaderPage — 10 permutations; wire route + navData"
```

---

### Task 3: KayoBrutalistBottomNav component

**Files:**
- Create: `src/app/components/custom/kaayo/KayoBrutalistBottomNav.tsx`

**Props interface:**

```tsx
export interface KayoBottomNavItem {
  key: string
  label: string
  icon: ReactNode                 // pass rendered icon e.g. <LayoutDashboard size={22} />
  badge?: number                  // unread count; 0 or undefined hides badge
}

export interface KayoBrutalistBottomNavProps {
  items: KayoBottomNavItem[]      // 3–5 items; clamps beyond 5
  activeKey?: string
  onPress?: (key: string) => void
  variant?: 'mobile' | 'tablet'   // controls padding + icon/label size
}
```

**Design specs:**

| Part | Mobile | Tablet |
|---|---|---|
| Container height | `minHeight:56px` | `minHeight:68px` |
| Container border | `borderTop: 2px solid #3b3d3f` | same |
| Padding vertical | `8px` | `12px` |
| Icon size | `22px` | `24px` |
| Label size | `10px` (utility tiny) | `13px` (label sm) |
| Item flex | `flex:1` | `flex:1` |
| Active indicator | `borderTop: 2px solid #970103` on item | same |
| Active colour | icon + label `#970103` | same |
| Inactive colour | `#6b7280` | same |
| Badge | `position:absolute top:-4px right:calc(50%-18px)`, `minWidth:16px height:16px`, crimson bg, white text `9px`, `borderRadius:999px`, `border:2px solid #fff` | same |

**CSS injection:** hover on items `background:#f4f4f4` transition.

- [ ] **Step 1: Create `KayoBrutalistBottomNav.tsx`**

Item wrapper must be `position:relative` to allow badge absolute positioning. Active border-top sits on the item Pressable/div itself, not the container. Items beyond 5 are sliced silently.

- [ ] **Step 2: Commit**

```bash
git add src/app/components/custom/kaayo/KayoBrutalistBottomNav.tsx
git commit -m "feat(organisms): KayoBrutalistBottomNav — mobile/tablet variants, active state, badge support"
```

---

### Task 4: BottomNavPage

**Files:**
- Create: `src/app/pages/organisms/BottomNavPage.tsx`

**Page sections — full permutation matrix:**

| # | Section title | What it demos | Key props / state |
|---|---|---|---|
| 1 | Mobile — 5 items | Full mobile bottom nav, Dashboard active | `variant="mobile"` `activeKey="dashboard"` |
| 2 | Tablet — 5 items | Expanded tablet layout, Dashboard active | `variant="tablet"` |
| 3 | Active: Students | Students item highlighted | `activeKey="students"` |
| 4 | Active: Attendance | Attendance item highlighted | `activeKey="attendance"` |
| 5 | Active: Payments | Payments item highlighted | `activeKey="payments"` |
| 6 | Active: Settings | Settings item highlighted | `activeKey="settings"` |
| 7 | None active | All items in inactive state | `activeKey={undefined}` |
| 8 | With badge — single | Payments item has badge count 3 | `items[3].badge=3` |
| 9 | With badge — multiple | Payments=3, Attendance=1 | two badge items |
| 10 | With badge — overflow | Badge count 99 → displays "9+" | `badge=99` |
| 11 | 3-item minimal | Minimal 3-tab bar | 3 items only |
| 12 | Interactive demo | useState-driven; clicking updates active | full useState wiring |

- [ ] **Step 1: Create `BottomNavPage.tsx`** — sections 1–12 as above, with `useState` for interactive demo.

- [ ] **Step 2: Commit**

```bash
git add src/app/pages/organisms/BottomNavPage.tsx
git commit -m "feat(organisms): BottomNavPage — 12 permutations incl. badge overflow and interactive demo"
```

---

## Phase 2 — Overlay Organisms (3 existing pages)

---

### Task 5: KayoBrutalistDialog component

**Files:**
- Create: `src/app/components/custom/kaayo/KayoBrutalistDialog.tsx`

**Props interface:**

```tsx
export interface KayoBrutalistDialogProps {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  size?: 'sm' | 'md' | 'lg' | 'fullscreen'   // default 'md'
  variant?: 'default' | 'destructive'          // default 'default'
  showClose?: boolean                          // default true; renders × button
  children?: ReactNode                         // body content
  footer?: ReactNode                           // action buttons slot
  closeOnBackdrop?: boolean                    // default true
}
```

**Size map:**

| size | maxWidth | maxHeight |
|---|---|---|
| `sm` | `400px` | auto |
| `md` | `560px` | `80vh` |
| `lg` | `760px` | `90vh` |
| `fullscreen` | `100vw` | `100vh` (no border-radius) |

**Design specs:**

| Part | Value |
|---|---|
| Backdrop | `position:fixed inset:0 backgroundColor:rgba(25,27,31,0.6)` — no blur — `z-index:300` |
| Container | `position:fixed top:50% left:50% transform:translate(-50%,-50%)` `border:2px solid #3b3d3f` `borderRadius:6px` `backgroundColor:#fff` `boxShadow:4px 4px 0 #191b1f` `display:flex flexDirection:column` |
| Open animation | keyframe: `scale(0.95) opacity(0)` → `scale(1) opacity(1)` at `150ms ease-out` |
| Header | `padding:20px 24px 16px` `borderBottom:2px solid #3b3d3f` `display:flex justifyContent:space-between alignItems:flex-start` |
| Title default | `fontWeight:700 fontSize:18px color:#3b3d3f` |
| Title destructive | `color:#970103` |
| Description | `fontSize:14px color:#6b7280 marginTop:6px` |
| Close button `×` | `width:32px height:32px border:2px solid #3b3d3f borderRadius:6px` hover: `backgroundColor:#f4f4f4` |
| Body | `padding:20px 24px` `overflowY:auto flex:1` |
| Footer | `padding:16px 24px 20px` `borderTop:2px solid #3b3d3f` `display:flex justifyContent:flex-end gap:8px` |

**CSS injection:** backdrop entry animation, dialog entry animation, `pointer-events:none` on backdrop when closed.

Render via `createPortal(..., document.body)`. Do not render DOM at all when `open=false` (conditional return before portal).

- [ ] **Step 1: Create `KayoBrutalistDialog.tsx`** — all props, full layout, portal rendering, close-on-backdrop click, animation via injected keyframe.

- [ ] **Step 2: Commit**

```bash
git add src/app/components/custom/kaayo/KayoBrutalistDialog.tsx
git commit -m "feat(organisms): KayoBrutalistDialog — 4 sizes, destructive variant, portal, entry animation"
```

---

### Task 6: DialogPage update

**Files:**
- Modify: `src/app/pages/organisms/DialogPage.tsx`

**Page sections — full permutation matrix:**

| # | Section title | What it demos | Key props |
|---|---|---|---|
| 1 | Default confirmation | Title + description + Cancel + Confirm | `variant="default"` `size="md"` |
| 2 | Destructive action | Title in crimson, red confirm button, warning description | `variant="destructive"` |
| 3 | Form dialog | Title + 2 `KayoBrutalistInput` fields (Name, Email) + Save/Cancel | `size="md"` children=form |
| 4 | Info / read-only | Title + description + single Dismiss button | no children, footer=1 button |
| 5 | No description | Title only + actions | `description={undefined}` |
| 6 | Small size | Compact "Delete item?" confirm | `size="sm"` |
| 7 | Large size | Title + scrollable body with long Lorem text | `size="lg"` |
| 8 | Fullscreen | Takes entire viewport | `size="fullscreen"` |
| 9 | No close button | No × in header; dismiss only via footer | `showClose={false}` |
| 10 | Backdrop locked | Clicking outside does not close | `closeOnBackdrop={false}` |
| 11 | Long title | Wraps gracefully without layout break | 80-char title |
| 12 | Nested content | ScrollArea inside body | `size="lg"` children=`<KayoBrutalistScrollArea>` |

Each section preview wraps the dialog in a trigger button (`useState` for `open`), so the demo is interactive.

- [ ] **Step 1: Rewrite `DialogPage.tsx`** with `isKaayo` branching. shadcn sections keep existing content. Kaayo sections use `KayoBrutalistDialog` with trigger buttons + `useState`.

- [ ] **Step 2: Commit**

```bash
git add src/app/pages/organisms/DialogPage.tsx
git commit -m "feat(organisms): DialogPage — 12 Kaayo permutations with isKaayo branching"
```

---

### Task 7: KayoBrutalistSheet component

**Files:**
- Create: `src/app/components/custom/kaayo/KayoBrutalistSheet.tsx`

**Props interface:**

```tsx
export interface KayoBrutalistSheetProps {
  open: boolean
  onClose: () => void
  side?: 'right' | 'left'           // default 'right'
  title?: string
  description?: string
  children?: ReactNode
  footer?: ReactNode
  width?: number | string            // default 360
  closeOnBackdrop?: boolean          // default true
}
```

**Design specs:**

| Part | Value |
|---|---|
| Backdrop | Same as Dialog: `rgba(25,27,31,0.6)` fixed inset z-index:200 |
| Panel | `position:fixed top:0 bottom:0 width:{width}` `backgroundColor:#fff` `display:flex flexDirection:column` |
| Right panel | `right:0 borderLeft:2px solid #3b3d3f boxShadow:-4px 0 0 #191b1f` |
| Left panel | `left:0 borderRight:2px solid #3b3d3f boxShadow:4px 0 0 #191b1f` |
| Open animation | `translateX(100%)` → `translateX(0)` right panel; `translateX(-100%)` → `translateX(0)` left panel; `200ms ease-out` |
| Header | `padding:20px 24px 16px borderBottom:2px solid #3b3d3f display:flex justifyContent:space-between` |
| Body | `padding:20px 24px flex:1 overflowY:auto` |
| Footer | `padding:16px 24px 20px borderTop:2px solid #3b3d3f display:flex justifyContent:flex-end gap:8px` |
| Close `×` | Same 32px bordered button as Dialog |

- [ ] **Step 1: Create `KayoBrutalistSheet.tsx`** — portal-rendered, slide animation via injected CSS keyframe, `right`/`left` variants. No border-radius on panel edges flush with viewport.

- [ ] **Step 2: Commit**

```bash
git add src/app/components/custom/kaayo/KayoBrutalistSheet.tsx
git commit -m "feat(organisms): KayoBrutalistSheet — right/left variants, slide animation, portal"
```

---

### Task 8: SheetPage update

**Files:**
- Modify: `src/app/pages/organisms/SheetPage.tsx`

**Page sections — full permutation matrix:**

| # | Section title | What it demos |
|---|---|---|
| 1 | Right sheet — default | Slides in from right, title + description + close |
| 2 | Left sheet | Slides in from left |
| 3 | With form | Title + 3 form fields (Name, Email, Role) + Save/Cancel footer |
| 4 | With scrollable list | 20-item list in body; body scrolls, header/footer stay fixed |
| 5 | Narrow (280px) | Compact width for quick filters |
| 6 | Wide (520px) | Wide for detailed edit forms |
| 7 | No title | Body-only panel |
| 8 | No footer | Title + body, no actions bar |
| 9 | Backdrop locked | Only close button dismisses |
| 10 | Stacked content | `KayoBrutalistCard` sections inside body |

- [ ] **Step 1: Rewrite `SheetPage.tsx`** with 10 sections.

- [ ] **Step 2: Commit**

```bash
git add src/app/pages/organisms/SheetPage.tsx
git commit -m "feat(organisms): SheetPage — 10 Kaayo permutations"
```

---

### Task 9: KayoBrutalistDrawer component

**Files:**
- Create: `src/app/components/custom/kaayo/KayoBrutalistDrawer.tsx`

**Props interface:**

```tsx
export interface KayoBrutalistDrawerProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  children?: ReactNode
  footer?: ReactNode
  snapHeight?: 'sm' | 'md' | 'lg' | 'full'  // default 'md'
  showHandle?: boolean                         // default true
  closeOnBackdrop?: boolean                    // default true
}
```

**Snap height map:**

| snapHeight | panel height |
|---|---|
| `sm` | `40vh` |
| `md` | `60vh` |
| `lg` | `80vh` |
| `full` | `100vh` (no top radius) |

**Design specs:**

| Part | Value |
|---|---|
| Backdrop | `rgba(25,27,31,0.6)` fixed inset z-index:200 |
| Panel | `position:fixed left:0 right:0 bottom:0 height:{snapHeight}` `backgroundColor:#fff` `borderTop:2px solid #3b3d3f` `borderRadius:6px 6px 0 0` (except `full`) `boxShadow:-4px -4px 0 #191b1f` |
| Open animation | `translateY(100%)` → `translateY(0)` at `200ms ease-out` |
| Handle bar | `width:40px height:3px backgroundColor:#3b3d3f borderRadius:2px margin:12px auto 0` |
| Header | `padding:16px 24px 12px borderBottom:2px solid #3b3d3f` (only rendered when `title` provided) |
| Body | `padding:16px 24px flex:1 overflowY:auto` |
| Footer | `padding:12px 24px 20px borderTop:2px solid #3b3d3f display:flex justifyContent:flex-end gap:8px` |

- [ ] **Step 1: Create `KayoBrutalistDrawer.tsx`** — portal-rendered, slide-up animation.

- [ ] **Step 2: Commit**

```bash
git add src/app/components/custom/kaayo/KayoBrutalistDrawer.tsx
git commit -m "feat(organisms): KayoBrutalistDrawer — snap heights, handle bar, slide-up animation, portal"
```

---

### Task 10: DrawerPage update

**Files:**
- Modify: `src/app/pages/organisms/DrawerPage.tsx`

**Page sections — full permutation matrix:**

| # | Section title | What it demos |
|---|---|---|
| 1 | Default (md snap) | 60vh drawer, title + body + close |
| 2 | Small snap (40vh) | Compact action sheet height |
| 3 | Large snap (80vh) | Tall drawer for rich content |
| 4 | Full height | 100vh, no top radius |
| 5 | Action sheet | No title; vertical list of 5 action items (icon + label) |
| 6 | With form | 3 form fields in body, Save/Cancel footer |
| 7 | No handle bar | `showHandle={false}` |
| 8 | With scrollable body | Long list content inside body |
| 9 | No title, no footer | Bare content drawer |
| 10 | Backdrop locked | Only handle / button dismisses |

- [ ] **Step 1: Rewrite `DrawerPage.tsx`** with 10 sections.

- [ ] **Step 2: Commit**

```bash
git add src/app/pages/organisms/DrawerPage.tsx
git commit -m "feat(organisms): DrawerPage — 10 Kaayo permutations incl. action sheet and snap heights"
```

---

## Phase 3 — Data Display Organisms

---

### Task 11: KayoBrutalistDataTable component

**Files:**
- Create: `src/app/components/custom/kaayo/KayoBrutalistDataTable.tsx`

**Props interface:**

```tsx
export interface KayoTableColumn<T = Record<string, unknown>> {
  key: string
  header: string
  width?: string | number         // e.g. '120px' or 200
  align?: 'left' | 'center' | 'right'  // default 'left'
  sortable?: boolean
  render?: (value: unknown, row: T) => ReactNode
}

export interface KayoBrutalistDataTableProps<T = Record<string, unknown>> {
  columns: KayoTableColumn<T>[]
  rows: T[]
  rowKey?: string                  // field used as React key; default 'id'
  selectable?: boolean
  selectedKeys?: string[]
  onSelectChange?: (keys: string[]) => void
  sortKey?: string
  sortDir?: 'asc' | 'desc'
  onSort?: (key: string) => void
  emptyState?: ReactNode
  loading?: boolean                // shows skeleton rows
  skeletonRowCount?: number        // default 5
  footer?: ReactNode               // slot for pagination
  stickyHeader?: boolean
  rowHeight?: 'compact' | 'comfortable'  // default 'comfortable'
}
```

**Design specs:**

| Part | Value |
|---|---|
| Table container | `border:2px solid #3b3d3f borderRadius:6px overflow:hidden` |
| Header row | `backgroundColor:#f4f4f4 borderBottom:2px solid #3b3d3f` |
| Header cell | `padding:10px 16px fontWeight:700 fontSize:13px color:#3b3d3f userSelect:none` |
| Sortable header | cursor:pointer; on hover `color:#970103`; sort icon `ChevronUp`/`ChevronDown` 14px in `#970103` when active, `#9ca3af` when inactive |
| Body row | `borderBottom:1px solid #e5e7eb` (hairline); hover: `backgroundColor:#f9fafb` |
| Row compact | `padding:8px 16px` |
| Row comfortable | `padding:14px 16px` |
| Selected row | `backgroundColor:#fff0f0` (crimson[50]) |
| Checkbox column | `width:48px`; uses `KayoBrutalistCheckbox` atom |
| Select-all checkbox | in header; indeterminate state when partial |
| Footer slot | `borderTop:2px solid #3b3d3f padding:12px 16px` |
| Empty state | centred in body, min-height 200px |
| Skeleton row | alternating `#f4f4f4` / `#e5e7eb` bars animated with opacity pulse |

**CSS injection:** row hover `tr:hover`, sort icon transition, skeleton pulse `@keyframes`.

- [ ] **Step 1: Create `KayoBrutalistDataTable.tsx`**

Export sub-components: none needed — single component. The `render` prop on a column overrides default cell content. When `loading=true`, render `skeletonRowCount` rows of shimmer bars ignoring `rows` prop.

- [ ] **Step 2: Commit**

```bash
git add src/app/components/custom/kaayo/KayoBrutalistDataTable.tsx
git commit -m "feat(organisms): KayoBrutalistDataTable — sort, selection, skeleton, pagination slot, sticky header"
```

---

### Task 12: TablePage update

**Files:**
- Modify: `src/app/pages/organisms/TablePage.tsx`

**Page sections — full permutation matrix:**

| # | Section title | What it demos |
|---|---|---|
| 1 | Basic — 4 columns | Name, Role, Status, Joined; no sort, no selection; 6 rows |
| 2 | Sortable columns | Name + Joined are sortable; click toggles asc/desc |
| 3 | With row selection | Checkbox column; select-all in header; selected row tinted crimson |
| 4 | Partial selection | 2 of 6 rows selected; select-all shows indeterminate |
| 5 | With status badges | Status column renders `KayoBrutalistBadge` (active/inactive/pending/archived) |
| 6 | With action column | Final column has Edit + Delete icon buttons per row |
| 7 | Empty state | Zero rows; centred "No records found" message with icon |
| 8 | Loading skeleton | `loading={true}`; 5 shimmer rows |
| 9 | With pagination | Footer slot contains `KayoBrutalistPagination`; 3 pages simulated |
| 10 | Compact rows | `rowHeight="compact"` same data as section 1 |
| 11 | Sticky header | Wrapped in fixed-height container so header stays while body scrolls |
| 12 | Wide — 8 columns | 8 columns; horizontal scroll within table |

Use this sample dataset across all sections (extend as needed):

```tsx
const PEOPLE = [
  { id: '1', name: 'Arjun Mehta',   role: 'Admin',   status: 'active',   joined: '2024-01-15' },
  { id: '2', name: 'Priya Sharma',  role: 'Manager', status: 'active',   joined: '2024-03-22' },
  { id: '3', name: 'Kiran Rao',     role: 'Member',  status: 'inactive', joined: '2023-11-08' },
  { id: '4', name: 'Divya Nair',    role: 'Admin',   status: 'pending',  joined: '2024-05-01' },
  { id: '5', name: 'Suresh Kumar',  role: 'Member',  status: 'archived', joined: '2023-07-19' },
  { id: '6', name: 'Ananya Iyer',   role: 'Manager', status: 'active',   joined: '2024-02-28' },
]
```

- [ ] **Step 1: Rewrite `TablePage.tsx`** with 12 sections.

- [ ] **Step 2: Commit**

```bash
git add src/app/pages/organisms/TablePage.tsx
git commit -m "feat(organisms): TablePage — 12 Kaayo permutations incl. sort, selection, skeleton, pagination"
```

---

### Task 13: KayoBrutalistCarousel component

**Files:**
- Create: `src/app/components/custom/kaayo/KayoBrutalistCarousel.tsx`

**Props interface:**

```tsx
export interface KayoBrutalistCarouselProps {
  items: ReactNode[]
  slidesVisible?: 1 | 2 | 3       // default 1
  gap?: number                     // px gap between slides; default 16
  showArrows?: boolean             // default true
  showDots?: boolean               // default true
  autoPlay?: boolean               // default false
  interval?: number                // ms; default 3000
  loop?: boolean                   // default true
}
```

**Design specs:**

| Part | Value |
|---|---|
| Viewport | `overflow:hidden position:relative` |
| Track | `display:flex transition:transform 250ms ease-out` |
| Slide | `flex:0 0 calc((100% - gap*(n-1)) / n)` where n=`slidesVisible` |
| Prev/Next button | `width:40px height:40px border:2px solid #3b3d3f borderRadius:6px backgroundColor:#fff` `boxShadow:2px 2px 0 #191b1f`; press: `translate(2px,2px) shadow→none`; `position:absolute top:50% transform:translateY(-50%)` |
| Prev button | `left:-20px` |
| Next button | `right:-20px` |
| Dots container | `display:flex justifyContent:center gap:6px marginTop:16px` |
| Dot inactive | `width:8px height:8px borderRadius:50% border:2px solid #3b3d3f backgroundColor:#fff` |
| Dot active | `backgroundColor:#970103 borderColor:#970103` |
| Dot transition | `background 150ms` |

Loop behaviour: when at last slide and `loop=true`, wraps to first. autoPlay resets on manual navigation.

- [ ] **Step 1: Create `KayoBrutalistCarousel.tsx`** using `useRef` for the track and `useState` for current index. `useEffect` for autoPlay interval (clear on unmount / manual nav).

- [ ] **Step 2: Commit**

```bash
git add src/app/components/custom/kaayo/KayoBrutalistCarousel.tsx
git commit -m "feat(organisms): KayoBrutalistCarousel — multi-slide, arrows, dots, autoplay, loop"
```

---

### Task 14: CarouselPage update

**Files:**
- Modify: `src/app/pages/organisms/CarouselPage.tsx`

**Page sections — full permutation matrix:**

Use this reusable slide card helper inside the page:

```tsx
function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div style={{ border: '2px solid #3b3d3f', borderRadius: 6, padding: '20px 24px',
      boxShadow: '2px 2px 0 #191b1f', backgroundColor: '#fff', minHeight: 120 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase',
        letterSpacing: '0.06em', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: '#3b3d3f' }}>{value}</div>
      <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 4 }}>{sub}</div>
    </div>
  )
}
```

| # | Section title | What it demos |
|---|---|---|
| 1 | Single slide | 1 slide visible; 5 stat cards; arrows + dots |
| 2 | Two slides visible | 2 slides at once; 6 cards |
| 3 | Three slides visible | 3 slides at once; 6 cards |
| 4 | No arrows | Dots-only navigation |
| 5 | No dots | Arrows-only navigation |
| 6 | No controls | Arrow + dot hidden; swipe-only (touch) |
| 7 | Auto-play | 2s interval cycling through cards |
| 8 | No loop | Prev disabled on first slide, Next on last |
| 9 | Loop enabled | Wraps from last → first |
| 10 | Mixed card heights | Cards with different inner content heights |
| 11 | Image cards | Slides containing coloured placeholder image blocks |
| 12 | Narrow (mobile-width) | Carousel constrained to 375px max-width |

- [ ] **Step 1: Rewrite `CarouselPage.tsx`** with 12 sections.

- [ ] **Step 2: Commit**

```bash
git add src/app/pages/organisms/CarouselPage.tsx
git commit -m "feat(organisms): CarouselPage — 12 Kaayo permutations incl. multi-slide and autoplay"
```

---

## Phase 4 — Advanced Navigation Organisms

---

### Task 15: KayoBrutalistCommand component

**Files:**
- Create: `src/app/components/custom/kaayo/KayoBrutalistCommand.tsx`

**Props interface:**

```tsx
export interface KayoCommandItem {
  key: string
  label: string
  icon?: ReactNode
  shortcut?: string               // e.g. '⌘K'
  action?: () => void
  disabled?: boolean
}

export interface KayoCommandGroup {
  label: string
  items: KayoCommandItem[]
}

export interface KayoBrutalistCommandProps {
  open: boolean
  onClose: () => void
  placeholder?: string            // default 'Search commands…'
  groups: KayoCommandGroup[]
  onSelect?: (key: string) => void
  loading?: boolean               // shows "Searching…" under input
  emptyMessage?: string           // default 'No results found.'
}
```

**Design specs:**

| Part | Value |
|---|---|
| Backdrop | `rgba(25,27,31,0.6)` fixed inset z-index:400 |
| Panel | `position:fixed top:20% left:50% transform:translateX(-50%)` `width:min(560px,90vw)` `border:2px solid #3b3d3f borderRadius:6px backgroundColor:#fff boxShadow:4px 4px 0 #191b1f` |
| Open animation | `scale(0.96) opacity(0)` → `scale(1) opacity(1)` `150ms ease-out` |
| Search input | `width:100% padding:14px 16px fontSize:15px borderBottom:2px solid #3b3d3f outline:none border:none` |
| Search icon | `Search` 16px `#9ca3af` absolutely positioned left:16px, input `paddingLeft:42px` |
| Loading label | `padding:8px 16px fontSize:13px color:#9ca3af` |
| Group label | `padding:8px 16px 4px fontSize:10px fontWeight:700 color:#9ca3af textTransform:uppercase letterSpacing:0.08em` |
| Item default | `display:flex alignItems:center gap:10px padding:10px 16px cursor:pointer fontSize:14px color:#3b3d3f` |
| Item hover / focused | `backgroundColor:#f4f4f4` |
| Item selected (keyboard) | `backgroundColor:#970103 color:#fff` icon + shortcut also inverted |
| Shortcut pill | `marginLeft:auto fontSize:11px color:#6b7280 backgroundColor:#f4f4f4 border:1px solid #e5e7eb borderRadius:4px padding:2px 6px` |
| Empty message | `padding:24px 16px textAlign:center fontSize:14px color:#9ca3af` |
| Results container | `maxHeight:400px overflowY:auto` |

Keyboard navigation: `ArrowUp` / `ArrowDown` move focused index, `Enter` selects, `Escape` closes. Focus trapped inside panel when open.

**CSS injection:** item hover, selected state, scrollbar hiding on results list.

- [ ] **Step 1: Create `KayoBrutalistCommand.tsx`** — portal-rendered, keyboard navigation via `useEffect` / `keydown` listener, `useRef` for input auto-focus on open.

- [ ] **Step 2: Commit**

```bash
git add src/app/components/custom/kaayo/KayoBrutalistCommand.tsx
git commit -m "feat(organisms): KayoBrutalistCommand — keyboard nav, grouped results, shortcut pills, portal"
```

---

### Task 16: CommandPage update

**Files:**
- Modify: `src/app/pages/organisms/CommandPage.tsx`

**Page sections — full permutation matrix:**

| # | Section title | What it demos |
|---|---|---|
| 1 | Default palette | 2 groups (Navigation × 4, Actions × 3); trigger via button |
| 2 | With icons | Every item has a lucide icon |
| 3 | With shortcuts | Items show `⌘K`, `⌘N`, `⌘P` shortcut pills |
| 4 | Loading state | `loading={true}`; "Searching…" text under input |
| 5 | Empty search | Input has value "zzz"; no matching items → empty message |
| 6 | Custom empty message | `emptyMessage="Nothing matches your search."` |
| 7 | Single group | 1 group with 6 items; no group label for solo |
| 8 | Many groups | 4 groups with 3 items each; results list scrolls |
| 9 | Disabled items | 2 items disabled (greyed, not clickable) |
| 10 | Keyboard demo | Banner explaining arrow/enter/escape shortcuts |
| 11 | Cmd+K trigger | Button labelled "Press ⌘K" with `keydown` listener wires open |
| 12 | Select callback | onSelect fires and displays selected key in a readout below trigger |

- [ ] **Step 1: Rewrite `CommandPage.tsx`** with 12 sections.

- [ ] **Step 2: Commit**

```bash
git add src/app/pages/organisms/CommandPage.tsx
git commit -m "feat(organisms): CommandPage — 12 Kaayo permutations incl. keyboard, loading, Cmd+K trigger"
```

---

### Task 17: KayoBrutalistSideNav component

**Files:**
- Create: `src/app/components/custom/kaayo/KayoBrutalistSideNav.tsx`

**Props interface:**

```tsx
export interface KayoSideNavItem {
  key: string
  label: string
  icon: ReactNode
  badge?: number
  href?: string
  disabled?: boolean
}

export interface KayoSideNavSection {
  label?: string                   // undefined = no section header
  items: KayoSideNavItem[]
  collapsible?: boolean            // default false
  defaultOpen?: boolean            // default true
}

export interface KayoBrutalistSideNavProps {
  sections: KayoSideNavSection[]
  activeKey?: string
  onPress?: (key: string) => void
  collapsed?: boolean              // icon-only mode
  onCollapsedChange?: (v: boolean) => void
  header?: ReactNode               // logo slot
  footer?: ReactNode               // user chip slot
  width?: number                   // default 240
  collapsedWidth?: number          // default 56
}
```

**Design specs:**

| Part | Value |
|---|---|
| Container | `height:100% display:flex flexDirection:column` `borderRight:2px solid #3b3d3f backgroundColor:#fff` `width:{width}px` (or `{collapsedWidth}` when collapsed) `transition:width 200ms ease-out overflow:hidden` |
| Header slot | `padding:16px 12px borderBottom:2px solid #3b3d3f` |
| Nav body | `flex:1 overflowY:auto padding:8px` |
| Section label | `padding:4px 12px marginTop:12px fontSize:10px fontWeight:700 color:#9ca3af textTransform:uppercase letterSpacing:0.08em` (hidden when collapsed) |
| Item default | `display:flex alignItems:center gap:10px padding:10px 12px borderRadius:6px position:relative cursor:pointer fontSize:14px fontWeight:500 color:#3b3d3f` |
| Item hover | `backgroundColor:#f4f4f4` |
| Item active | 4px left accent bar: `::before { content:'' position:absolute left:0 top:6px bottom:6px width:4px backgroundColor:#970103 borderRadius:0 2px 2px 0 }` + label `color:#970103 fontWeight:700` |
| Item disabled | `opacity:0.4 cursor:not-allowed` |
| Badge | `marginLeft:auto minWidth:20px height:20px borderRadius:999px backgroundColor:#970103 color:#fff fontSize:10px fontWeight:700 display:flex alignItems:center justifyContent:center` |
| Collapsed icon | `width:56px padding:8px 4px`; items show icon only, no label; tooltip on hover (native `title` attr) |
| Section collapsible | `ChevronDown` rotates 180° when closed; items slide in/out with CSS `max-height` transition |
| Footer slot | `padding:12px borderTop:2px solid #3b3d3f` |
| Collapse toggle | Optional chevron button at bottom of header slot |

**CSS injection:** item `::before` active bar, hover states, section collapse animation.

- [ ] **Step 1: Create `KayoBrutalistSideNav.tsx`** — sections with optional collapsible toggle (internal `useState` per section), collapsed width mode hides labels, active bar via injected CSS `::before`.

- [ ] **Step 2: Commit**

```bash
git add src/app/components/custom/kaayo/KayoBrutalistSideNav.tsx
git commit -m "feat(organisms): KayoBrutalistSideNav — collapsible sections, icon-only mode, active accent bar"
```

---

### Task 18: SidebarPage update

**Files:**
- Modify: `src/app/pages/organisms/SidebarPage.tsx`

**Page sections — full permutation matrix:**

| # | Section title | What it demos |
|---|---|---|
| 1 | Default expanded | 2 sections, 4+3 items, first item active, with header + footer |
| 2 | Active: mid-section item | Active item in second section; accent bar visible |
| 3 | With badges | Two items have badge counts (3, 12) |
| 4 | Collapsed (icon-only) | `collapsed={true}`; 56px wide, icons only |
| 5 | Collapse toggle | Button in header toggles collapsed ↔ expanded; `useState` |
| 6 | Collapsible sections | Both sections have `collapsible=true`; click section header opens/closes |
| 7 | One section closed | Section 2 starts closed (`defaultOpen=false`) |
| 8 | No section labels | All items flat, no section headers |
| 9 | With disabled items | Two items disabled (greyed, not interactive) |
| 10 | No header/footer | Bare nav body only |
| 11 | Custom header (logo) | Header slot contains SVG logo + product name |
| 12 | Custom footer (user chip) | Footer slot contains avatar + name + role badge |

Wrap each preview in a `div` with `height:480px display:flex` so the sidebar shows with realistic proportions.

- [ ] **Step 1: Rewrite `SidebarPage.tsx`** with 12 sections.

- [ ] **Step 2: Commit**

```bash
git add src/app/pages/organisms/SidebarPage.tsx
git commit -m "feat(organisms): SidebarPage — 12 Kaayo permutations incl. collapse toggle and collapsible sections"
```

---

### Task 19: KayoBrutalistNavigationMenu component

**Files:**
- Create: `src/app/components/custom/kaayo/KayoBrutalistNavigationMenu.tsx`

**Props interface:**

```tsx
export interface KayoNavMenuChild {
  label: string
  href: string
  description?: string
  icon?: ReactNode
}

export interface KayoNavMenuItem {
  label: string
  href?: string                    // if provided = direct link; if omitted = has dropdown
  children?: KayoNavMenuChild[]    // dropdown items
  active?: boolean
}

export interface KayoBrutalistNavigationMenuProps {
  items: KayoNavMenuItem[]
  rightSlot?: ReactNode            // e.g. search button + CTA
  activeHref?: string
  onNavigate?: (href: string) => void
  sticky?: boolean
}
```

**Design specs:**

| Part | Value |
|---|---|
| Container | `borderBottom:2px solid #3b3d3f backgroundColor:#fff paddingInline:24px display:flex alignItems:center gap:4px minHeight:56px` |
| Root link | `padding:8px 12px fontSize:14px fontWeight:500 color:#3b3d3f cursor:pointer position:relative` |
| Root link hover | `color:#970103` |
| Root link active | `borderBottom:2px solid #970103` (inline style, `marginBottom:-2px` to overlap container border) |
| Root link with dropdown | shows `ChevronDown` 14px that rotates 180° when open |
| Dropdown panel | `position:absolute top:100% left:0 minWidth:240px border:2px solid #3b3d3f borderRadius:6px backgroundColor:#fff boxShadow:4px 4px 0 #191b1f zIndex:50 padding:8px` |
| Dropdown item | `display:flex alignItems:flex-start gap:10px padding:10px 12px borderRadius:4px cursor:pointer` |
| Dropdown item hover | `backgroundColor:#f4f4f4` |
| Item icon | `marginTop:2px flexShrink:0` |
| Item label | `fontSize:14px fontWeight:600 color:#3b3d3f` |
| Item description | `fontSize:12px color:#6b7280 marginTop:2px` |
| Right slot | `marginLeft:auto display:flex alignItems:center gap:8px` |

Dropdown opens on `mouseenter` / `focus`, closes on `mouseleave` / `blur`. `useRef` + `onMouseLeave` on both trigger and panel with a 100ms delay to prevent flicker when moving cursor between them.

**CSS injection:** root link hover colour, active underline, dropdown item hover, chevron rotation.

- [ ] **Step 1: Create `KayoBrutalistNavigationMenu.tsx`** — each item with dropdown uses `useState` per item for open state; delay-close via `setTimeout` cleared on `mouseenter`.

- [ ] **Step 2: Commit**

```bash
git add src/app/components/custom/kaayo/KayoBrutalistNavigationMenu.tsx
git commit -m "feat(organisms): KayoBrutalistNavigationMenu — dropdowns, active underline, right slot, hover delay"
```

---

### Task 20: NavigationMenuPage update

**Files:**
- Modify: `src/app/pages/organisms/NavigationMenuPage.tsx`

**Page sections — full permutation matrix:**

| # | Section title | What it demos |
|---|---|---|
| 1 | Simple links only | 5 direct links, no dropdowns; third link active |
| 2 | With dropdowns | 3 items with 3-child dropdown panels each |
| 3 | With descriptions | Dropdown children have icon + label + description |
| 4 | Active link | `activeHref` marks second item with crimson underline |
| 5 | With right slot | Search icon button + primary CTA button in right slot |
| 6 | Mixed | 2 direct links + 2 dropdown items + right slot |
| 7 | Single dropdown | One item; dropdown has 6 children |
| 8 | Many items | 7 root items; tests wrapping behaviour |
| 9 | With icons in dropdown | Each child has a different lucide icon |
| 10 | Sticky | `sticky={true}` in a tall scroll container |
| 11 | No active item | All links in inactive state |
| 12 | onNavigate callback | Clicking any link logs to a readout below the component |

- [ ] **Step 1: Rewrite `NavigationMenuPage.tsx`** with 12 sections.

- [ ] **Step 2: Commit**

```bash
git add src/app/pages/organisms/NavigationMenuPage.tsx
git commit -m "feat(organisms): NavigationMenuPage — 12 Kaayo permutations incl. dropdowns and right slot"
```

---

## Summary Checklist

| Task | Component | Page | Done |
|---|---|---|---|
| 1 | KayoBrutalistHeader | — | ☐ |
| 2 | — | HeaderPage + navData + routes | ☐ |
| 3 | KayoBrutalistBottomNav | — | ☐ |
| 4 | — | BottomNavPage | ☐ |
| 5 | KayoBrutalistDialog | — | ☐ |
| 6 | — | DialogPage | ☐ |
| 7 | KayoBrutalistSheet | — | ☐ |
| 8 | — | SheetPage | ☐ |
| 9 | KayoBrutalistDrawer | — | ☐ |
| 10 | — | DrawerPage | ☐ |
| 11 | KayoBrutalistDataTable | — | ☐ |
| 12 | — | TablePage | ☐ |
| 13 | KayoBrutalistCarousel | — | ☐ |
| 14 | — | CarouselPage | ☐ |
| 15 | KayoBrutalistCommand | — | ☐ |
| 16 | — | CommandPage | ☐ |
| 17 | KayoBrutalistSideNav | — | ☐ |
| 18 | — | SidebarPage | ☐ |
| 19 | KayoBrutalistNavigationMenu | — | ☐ |
| 20 | — | NavigationMenuPage | ☐ |

**Total:** 10 new component files · 10 page files (2 new, 8 updated) · 2 infrastructure files (navData + routes)
