# Kaayo Molecules Phase 3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement four Phase 3 Kaayo Neo-Brutalist molecule components (Breadcrumb, Pagination, ScrollArea, Sonner) and update their corresponding Design System pages with full `isKaayo` branching and all permutation sections.

**Architecture:** Breadcrumb and Pagination are purely presentational with minimal state. ScrollArea injects a custom webkit scrollbar via CSS STYLE_ID. Sonner wraps the `sonner` library's `<Toaster>` with CSS overrides injected at mount — no third-party visual rendering dependency. All components are pure inline-style React with no Tailwind.

**Tech Stack:** React 18, TypeScript, inline styles only, `sonner` library (already installed), lucide-react icons.

---

## Design Language Invariants

| Token | Value |
|---|---|
| Primary | `var(--kayo-color-primary, #970103)` |
| Foreground | `var(--kayo-color-foreground, #3b3d3f)` |
| Border | `var(--kayo-color-border, #3b3d3f)` |
| Background | `#ffffff` |
| Muted | `var(--kayo-color-muted, #f4f4f4)` |
| Negative | `var(--kayo-color-negative, #dc2626)` |
| Shadow sm | `2px 2px 0 #191b1f` |
| Shadow md | `4px 4px 0 #191b1f` |
| Font | `'DM Sans', system-ui, sans-serif` |
| Border width | `2px solid` |
| Border radius | `6px` containers |
| Press animation | `translate(2px, 2px)` + shadow → none |
| Forbidden | blur, gradients |

---

## File Map

| File | Action |
|---|---|
| `src/app/components/custom/kaayo/KayoBrutalistBreadcrumb.tsx` | **Create** |
| `src/app/pages/molecules/BreadcrumbPage.tsx` | **Modify** |
| `src/app/components/custom/kaayo/KayoBrutalistPagination.tsx` | **Create** |
| `src/app/pages/molecules/PaginationPage.tsx` | **Modify** |
| `src/app/components/custom/kaayo/KayoBrutalistScrollArea.tsx` | **Create** |
| `src/app/pages/molecules/ScrollAreaPage.tsx` | **Modify** |
| `src/app/components/custom/kaayo/KayoBrutalistSonner.tsx` | **Create** |
| `src/app/pages/molecules/SonnerPage.tsx` | **Modify** |

---

## Task 1: KayoBrutalistBreadcrumb component

**Files:**
- Create: `src/app/components/custom/kaayo/KayoBrutalistBreadcrumb.tsx`

- [ ] **Step 1: Create the file**

```tsx
import { useState, useEffect, ReactNode, CSSProperties } from 'react'

const STYLE_ID = 'kayo-breadcrumb-styles'

export interface KayoBreadcrumbItem {
  label: string
  href?: string
  icon?: ReactNode
}

export interface KayoBrutalistBreadcrumbProps {
  items: KayoBreadcrumbItem[]
  maxVisible?: number
  separator?: string
}

export function KayoBrutalistBreadcrumb({
  items,
  maxVisible,
  separator = '/',
}: KayoBrutalistBreadcrumbProps) {
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return
    const s = document.createElement('style')
    s.id = STYLE_ID
    s.textContent = `
      .kayo-bc-link { text-decoration: none; color: var(--kayo-color-foreground, #3b3d3f); transition: color 80ms; }
      .kayo-bc-link:hover { color: var(--kayo-color-primary, #970103); text-decoration: underline; }
      .kayo-bc-ellipsis { cursor: pointer; color: #a8a8aa; transition: color 80ms; }
      .kayo-bc-ellipsis:hover { color: var(--kayo-color-primary, #970103); }
    `
    document.head.appendChild(s)
  }, [])

  const shouldCollapse = !expanded && maxVisible !== undefined && items.length > maxVisible

  let visibleItems: KayoBreadcrumbItem[]
  let showEllipsis = false

  if (shouldCollapse && maxVisible !== undefined) {
    const lastCount = maxVisible - 1
    visibleItems = [items[0], ...items.slice(items.length - lastCount)]
    showEllipsis = true
  } else {
    visibleItems = items
  }

  const separatorEl = (
    <span style={{ fontSize: 13, color: '#a8a8aa', margin: '0 6px', userSelect: 'none' } as CSSProperties}>
      {separator}
    </span>
  )

  const renderedItems: ReactNode[] = []

  if (showEllipsis) {
    // First item
    const first = items[0]
    renderedItems.push(
      <a
        key="first"
        href={first.href ?? '#'}
        className="kayo-bc-link"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, fontFamily: "'DM Sans', system-ui, sans-serif" } as CSSProperties}
        onClick={first.href ? undefined : (e) => e.preventDefault()}
      >
        {first.icon}
        {first.label}
      </a>
    )
    renderedItems.push(<span key="sep-ellipsis-before">{separatorEl}</span>)
    renderedItems.push(
      <span
        key="ellipsis"
        className="kayo-bc-ellipsis"
        style={{ fontSize: 13, fontFamily: "'DM Sans', system-ui, sans-serif" } as CSSProperties}
        onClick={() => setExpanded(true)}
        title="Show full path"
      >
        …
      </span>
    )
    // Last items
    const lastItems = items.slice(items.length - (maxVisible! - 1))
    lastItems.forEach((item, idx) => {
      const isLast = idx === lastItems.length - 1
      renderedItems.push(<span key={`sep-${idx}`}>{separatorEl}</span>)
      if (isLast) {
        renderedItems.push(
          <span
            key={`item-last-${idx}`}
            style={{ fontSize: 13, fontWeight: 600, color: 'var(--kayo-color-foreground, #3b3d3f)', fontFamily: "'DM Sans', system-ui, sans-serif" } as CSSProperties}
          >
            {item.label}
          </span>
        )
      } else {
        renderedItems.push(
          <a
            key={`item-${idx}`}
            href={item.href ?? '#'}
            className="kayo-bc-link"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, fontFamily: "'DM Sans', system-ui, sans-serif" } as CSSProperties}
            onClick={item.href ? undefined : (e) => e.preventDefault()}
          >
            {item.icon}
            {item.label}
          </a>
        )
      }
    })
  } else {
    visibleItems.forEach((item, idx) => {
      const isLast = idx === visibleItems.length - 1
      if (idx > 0) {
        renderedItems.push(<span key={`sep-${idx}`}>{separatorEl}</span>)
      }
      if (isLast) {
        renderedItems.push(
          <span
            key={`item-${idx}`}
            style={{ fontSize: 13, fontWeight: 600, color: 'var(--kayo-color-foreground, #3b3d3f)', fontFamily: "'DM Sans', system-ui, sans-serif" } as CSSProperties}
          >
            {item.icon && <span style={{ marginRight: 4, display: 'inline-flex', alignItems: 'center' }}>{item.icon}</span>}
            {item.label}
          </span>
        )
      } else {
        renderedItems.push(
          <a
            key={`item-${idx}`}
            href={item.href ?? '#'}
            className="kayo-bc-link"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, fontFamily: "'DM Sans', system-ui, sans-serif" } as CSSProperties}
            onClick={item.href ? undefined : (e) => e.preventDefault()}
          >
            {item.icon}
            {item.label}
          </a>
        )
      }
    })
  }

  return (
    <nav aria-label="breadcrumb">
      <ol
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          gap: 0,
        }}
      >
        {renderedItems.map((node, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center' }}>
            {node}
          </li>
        ))}
      </ol>
    </nav>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git -C "D:\Aumraa\APOS pitch\1_Product Factory\02_Breathe Design system" add src/app/components/custom/kaayo/KayoBrutalistBreadcrumb.tsx
git -C "D:\Aumraa\APOS pitch\1_Product Factory\02_Breathe Design system" commit -m "feat(molecules): KayoBrutalistBreadcrumb — hover CSS, overflow ellipsis, custom separator"
```

---

## Task 2: BreadcrumbPage update

**Files:**
- Modify: `src/app/pages/molecules/BreadcrumbPage.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage as BreadcrumbCurrentPage,
  BreadcrumbSeparator,
} from '@/app/components/ui/breadcrumb'
import { Home } from 'lucide-react'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistBreadcrumb } from '@/app/components/custom/kaayo/KayoBrutalistBreadcrumb'

export function BreadcrumbPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  return (
    <ComponentPageLayout
      title="Breadcrumb"
      description="Shows the user's current location within a navigational hierarchy. Use for deep page structures."
      level="Molecule"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Default (3 levels)',
          description: 'Three-level path — the most common breadcrumb pattern.',
          preview: isKaayo ? (
            <KayoBrutalistBreadcrumb
              items={[
                { label: 'Home', href: '#' },
                { label: 'Projects', href: '#' },
                { label: 'Active Project' },
              ]}
            />
          ) : (
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink href="#">Projects</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbCurrentPage>Active Project</BreadcrumbCurrentPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          ),
          code: {
            react: `import { KayoBrutalistBreadcrumb } from '@breathe/kaayo'

<KayoBrutalistBreadcrumb
  items={[
    { label: 'Home', href: '#' },
    { label: 'Projects', href: '#' },
    { label: 'Active Project' },
  ]}
/>`,
          },
        },
        {
          title: 'Two Levels',
          description: 'Minimal two-level path — home + current page.',
          preview: isKaayo ? (
            <KayoBrutalistBreadcrumb
              items={[
                { label: 'Home', href: '#' },
                { label: 'Settings' },
              ]}
            />
          ) : (
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbCurrentPage>Settings</BreadcrumbCurrentPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          ),
          code: {
            react: `<KayoBrutalistBreadcrumb
  items={[
    { label: 'Home', href: '#' },
    { label: 'Settings' },
  ]}
/>`,
          },
        },
        {
          title: 'With Home Icon',
          description: 'First item uses a Home icon instead of text — common in app shells.',
          preview: isKaayo ? (
            <KayoBrutalistBreadcrumb
              items={[
                { label: 'Home', href: '#', icon: <Home size={14} /> },
                { label: 'Reports', href: '#' },
                { label: 'Q1 Summary' },
              ]}
            />
          ) : (
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" className="flex items-center gap-1">
                    <Home className="h-3.5 w-3.5" />Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink href="#">Reports</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbCurrentPage>Q1 Summary</BreadcrumbCurrentPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          ),
          code: {
            react: `import { Home } from 'lucide-react'

<KayoBrutalistBreadcrumb
  items={[
    { label: 'Home', href: '#', icon: <Home size={14} /> },
    { label: 'Reports', href: '#' },
    { label: 'Q1 Summary' },
  ]}
/>`,
          },
        },
        {
          title: 'Four Levels',
          description: 'Deep path showing 4 levels — all visible, no ellipsis.',
          preview: isKaayo ? (
            <KayoBrutalistBreadcrumb
              items={[
                { label: 'Home', href: '#' },
                { label: 'Products', href: '#' },
                { label: 'Kaayo', href: '#' },
                { label: 'Atoms' },
              ]}
            />
          ) : (
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink href="#">Products</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink href="#">Kaayo</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbCurrentPage>Atoms</BreadcrumbCurrentPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          ),
          code: {
            react: `<KayoBrutalistBreadcrumb
  items={[
    { label: 'Home', href: '#' },
    { label: 'Products', href: '#' },
    { label: 'Kaayo', href: '#' },
    { label: 'Atoms' },
  ]}
/>`,
          },
        },
        {
          title: 'With Overflow',
          description: '`maxVisible={3}` on a 5-level path — shows first item, …, and last 2. Click … to expand.',
          preview: isKaayo ? (
            <KayoBrutalistBreadcrumb
              maxVisible={3}
              items={[
                { label: 'Home', href: '#' },
                { label: 'Society', href: '#' },
                { label: 'Sunrise Residences', href: '#' },
                { label: 'Block A', href: '#' },
                { label: 'Flat A-101' },
              ]}
            />
          ) : (
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><span className="text-muted-foreground">…</span></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink href="#">Block A</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbCurrentPage>Flat A-101</BreadcrumbCurrentPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          ),
          code: {
            react: `<KayoBrutalistBreadcrumb
  maxVisible={3}
  items={[
    { label: 'Home', href: '#' },
    { label: 'Society', href: '#' },
    { label: 'Sunrise Residences', href: '#' },
    { label: 'Block A', href: '#' },
    { label: 'Flat A-101' },
  ]}
/>`,
          },
        },
        {
          title: 'Custom Separator',
          description: '`separator="›"` — chevron-style divider instead of the default slash.',
          preview: isKaayo ? (
            <KayoBrutalistBreadcrumb
              separator="›"
              items={[
                { label: 'Dashboard', href: '#' },
                { label: 'Residents', href: '#' },
                { label: 'Ramkumar G' },
              ]}
            />
          ) : (
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href="#">Dashboard</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator>›</BreadcrumbSeparator>
                <BreadcrumbItem><BreadcrumbLink href="#">Residents</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator>›</BreadcrumbSeparator>
                <BreadcrumbItem><BreadcrumbCurrentPage>Ramkumar G</BreadcrumbCurrentPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          ),
          code: {
            react: `<KayoBrutalistBreadcrumb
  separator="›"
  items={[
    { label: 'Dashboard', href: '#' },
    { label: 'Residents', href: '#' },
    { label: 'Ramkumar G' },
  ]}
/>`,
          },
        },
      ]}
    />
  )
}
```

- [ ] **Step 2: Commit**

```bash
git -C "D:\Aumraa\APOS pitch\1_Product Factory\02_Breathe Design system" add src/app/pages/molecules/BreadcrumbPage.tsx
git -C "D:\Aumraa\APOS pitch\1_Product Factory\02_Breathe Design system" commit -m "feat(molecules): BreadcrumbPage — 6 sections with isKaayo branching"
```

---

## Task 3: KayoBrutalistPagination component

**Files:**
- Create: `src/app/components/custom/kaayo/KayoBrutalistPagination.tsx`

- [ ] **Step 1: Create the file**

```tsx
import { useState, useEffect, CSSProperties } from 'react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

const STYLE_ID = 'kayo-pagination-styles'

export interface KayoBrutalistPaginationProps {
  total: number
  current: number
  onChange: (page: number) => void
  siblings?: number
  showPrevNext?: boolean
  showFirstLast?: boolean
}

function getPageRange(
  total: number,
  current: number,
  siblings: number
): (number | 'ellipsis-left' | 'ellipsis-right')[] {
  if (total <= siblings * 2 + 5) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const leftSibling = Math.max(current - siblings, 1)
  const rightSibling = Math.min(current + siblings, total)
  const showLeftEllipsis = leftSibling > 2
  const showRightEllipsis = rightSibling < total - 1

  if (!showLeftEllipsis && showRightEllipsis) {
    const left = Array.from({ length: 3 + 2 * siblings }, (_, i) => i + 1)
    return [...left, 'ellipsis-right', total]
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const right = Array.from({ length: 3 + 2 * siblings }, (_, i) => total - (2 + 2 * siblings) + i)
    return [1, 'ellipsis-left', ...right]
  }

  const middle = Array.from(
    { length: rightSibling - leftSibling + 1 },
    (_, i) => leftSibling + i
  )
  return [1, 'ellipsis-left', ...middle, 'ellipsis-right', total]
}

export function KayoBrutalistPagination({
  total,
  current,
  onChange,
  siblings = 1,
  showPrevNext = true,
  showFirstLast = false,
}: KayoBrutalistPaginationProps) {
  const [pressedPage, setPressedPage] = useState<number | string | null>(null)

  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return
    const s = document.createElement('style')
    s.id = STYLE_ID
    s.textContent = `
      .kayo-page-btn { transition: transform 80ms, box-shadow 80ms; }
    `
    document.head.appendChild(s)
  }, [])

  const pages = getPageRange(total, current, siblings)

  function pageButtonStyle(page: number): CSSProperties {
    const isActive = page === current
    const isPressed = pressedPage === page
    return {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 36,
      height: 36,
      fontSize: 13,
      fontWeight: isActive ? 700 : 400,
      fontFamily: "'DM Sans', system-ui, sans-serif",
      border: '2px solid var(--kayo-color-border, #3b3d3f)',
      borderRadius: 6,
      cursor: 'pointer',
      background: isActive ? 'var(--kayo-color-primary, #970103)' : '#ffffff',
      color: isActive ? '#ffffff' : 'var(--kayo-color-foreground, #3b3d3f)',
      boxShadow: isActive && !isPressed ? '2px 2px 0 #191b1f' : !isActive && !isPressed ? '2px 2px 0 #191b1f' : 'none',
      transform: isPressed ? 'translate(2px, 2px)' : 'none',
      userSelect: 'none',
      outline: 'none',
    }
  }

  function navButtonStyle(disabled: boolean, isPressed: boolean): CSSProperties {
    return {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
      height: 36,
      paddingLeft: 10,
      paddingRight: 10,
      fontSize: 13,
      fontFamily: "'DM Sans', system-ui, sans-serif",
      border: `2px solid ${disabled ? '#d1d5db' : 'var(--kayo-color-border, #3b3d3f)'}`,
      borderRadius: 6,
      cursor: disabled ? 'not-allowed' : 'pointer',
      background: '#ffffff',
      color: disabled ? '#a8a8aa' : 'var(--kayo-color-foreground, #3b3d3f)',
      boxShadow: disabled || isPressed ? 'none' : '2px 2px 0 #191b1f',
      transform: isPressed ? 'translate(2px, 2px)' : 'none',
      opacity: disabled ? 0.5 : 1,
      userSelect: 'none',
      outline: 'none',
    }
  }

  return (
    <nav aria-label="pagination" style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
      {showFirstLast && (
        <button
          type="button"
          className="kayo-page-btn"
          disabled={current === 1}
          style={navButtonStyle(current === 1, pressedPage === 'first')}
          onMouseDown={() => current !== 1 && setPressedPage('first')}
          onMouseUp={() => setPressedPage(null)}
          onMouseLeave={() => setPressedPage(null)}
          onClick={() => current !== 1 && onChange(1)}
          aria-label="First page"
        >
          <ChevronsLeft size={14} />
        </button>
      )}

      {showPrevNext && (
        <button
          type="button"
          className="kayo-page-btn"
          disabled={current === 1}
          style={navButtonStyle(current === 1, pressedPage === 'prev')}
          onMouseDown={() => current !== 1 && setPressedPage('prev')}
          onMouseUp={() => setPressedPage(null)}
          onMouseLeave={() => setPressedPage(null)}
          onClick={() => current !== 1 && onChange(current - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft size={14} />
          <span>Prev</span>
        </button>
      )}

      {pages.map((page, i) => {
        if (page === 'ellipsis-left' || page === 'ellipsis-right') {
          return (
            <span
              key={`${page}-${i}`}
              style={{
                width: 36,
                height: 36,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                color: '#a8a8aa',
                fontFamily: "'DM Sans', system-ui, sans-serif",
              }}
            >
              …
            </span>
          )
        }
        return (
          <button
            key={page}
            type="button"
            className="kayo-page-btn"
            style={pageButtonStyle(page as number)}
            onMouseDown={() => setPressedPage(page)}
            onMouseUp={() => setPressedPage(null)}
            onMouseLeave={() => setPressedPage(null)}
            onClick={() => onChange(page as number)}
            aria-label={`Page ${page}`}
            aria-current={page === current ? 'page' : undefined}
          >
            {page}
          </button>
        )
      })}

      {showPrevNext && (
        <button
          type="button"
          className="kayo-page-btn"
          disabled={current === total}
          style={navButtonStyle(current === total, pressedPage === 'next')}
          onMouseDown={() => current !== total && setPressedPage('next')}
          onMouseUp={() => setPressedPage(null)}
          onMouseLeave={() => setPressedPage(null)}
          onClick={() => current !== total && onChange(current + 1)}
          aria-label="Next page"
        >
          <span>Next</span>
          <ChevronRight size={14} />
        </button>
      )}

      {showFirstLast && (
        <button
          type="button"
          className="kayo-page-btn"
          disabled={current === total}
          style={navButtonStyle(current === total, pressedPage === 'last')}
          onMouseDown={() => current !== total && setPressedPage('last')}
          onMouseUp={() => setPressedPage(null)}
          onMouseLeave={() => setPressedPage(null)}
          onClick={() => current !== total && onChange(total)}
          aria-label="Last page"
        >
          <ChevronsRight size={14} />
        </button>
      )}
    </nav>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git -C "D:\Aumraa\APOS pitch\1_Product Factory\02_Breathe Design system" add src/app/components/custom/kaayo/KayoBrutalistPagination.tsx
git -C "D:\Aumraa\APOS pitch\1_Product Factory\02_Breathe Design system" commit -m "feat(molecules): KayoBrutalistPagination — page range algorithm, press animation, first/last buttons"
```

---

## Task 4: PaginationPage update

**Files:**
- Modify: `src/app/pages/molecules/PaginationPage.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
import { useState } from 'react'
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/app/components/ui/pagination'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistPagination } from '@/app/components/custom/kaayo/KayoBrutalistPagination'

function InteractiveDemo() {
  const [current, setCurrent] = useState(1)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <span style={{ fontSize: 12, color: '#6b7280' }}>
        Page <strong style={{ color: '#3b3d3f' }}>{current}</strong> of 15
      </span>
      <KayoBrutalistPagination total={15} current={current} onChange={setCurrent} />
    </div>
  )
}

export function PaginationPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  return (
    <ComponentPageLayout
      title="Pagination"
      description="Navigates through paged content. Use for lists, tables, and search results exceeding a single view."
      level="Molecule"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Default (5 pages)',
          description: 'Pages 1–5, current=3 — no ellipsis needed.',
          preview: isKaayo ? (
            <KayoBrutalistPagination
              total={5}
              current={3}
              onChange={() => {}}
            />
          ) : (
            <Pagination>
              <PaginationContent>
                <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#" isActive>3</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#">4</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#">5</PaginationLink></PaginationItem>
                <PaginationItem><PaginationNext href="#" /></PaginationItem>
              </PaginationContent>
            </Pagination>
          ),
          code: {
            react: `import { KayoBrutalistPagination } from '@breathe/kaayo'

<KayoBrutalistPagination total={5} current={3} onChange={page => setPage(page)} />`,
          },
        },
        {
          title: 'Many Pages (with ellipsis)',
          description: 'total=20, current=10 — shows `1 … 9 10 11 … 20`.',
          preview: isKaayo ? (
            <KayoBrutalistPagination
              total={20}
              current={10}
              onChange={() => {}}
            />
          ) : (
            <Pagination>
              <PaginationContent>
                <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                <PaginationItem><PaginationEllipsis /></PaginationItem>
                <PaginationItem><PaginationLink href="#">9</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#" isActive>10</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#">11</PaginationLink></PaginationItem>
                <PaginationItem><PaginationEllipsis /></PaginationItem>
                <PaginationItem><PaginationLink href="#">20</PaginationLink></PaginationItem>
                <PaginationItem><PaginationNext href="#" /></PaginationItem>
              </PaginationContent>
            </Pagination>
          ),
          code: {
            react: `<KayoBrutalistPagination total={20} current={10} onChange={setPage} />`,
          },
        },
        {
          title: 'First Page',
          description: 'current=1 — Previous button is disabled.',
          preview: isKaayo ? (
            <KayoBrutalistPagination
              total={8}
              current={1}
              onChange={() => {}}
            />
          ) : (
            <Pagination>
              <PaginationContent>
                <PaginationItem><PaginationPrevious href="#" aria-disabled className="pointer-events-none opacity-50" /></PaginationItem>
                <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                <PaginationItem><PaginationEllipsis /></PaginationItem>
                <PaginationItem><PaginationLink href="#">8</PaginationLink></PaginationItem>
                <PaginationItem><PaginationNext href="#" /></PaginationItem>
              </PaginationContent>
            </Pagination>
          ),
          code: {
            react: `<KayoBrutalistPagination total={8} current={1} onChange={setPage} />`,
          },
        },
        {
          title: 'Last Page',
          description: 'current=total — Next button is disabled.',
          preview: isKaayo ? (
            <KayoBrutalistPagination
              total={8}
              current={8}
              onChange={() => {}}
            />
          ) : (
            <Pagination>
              <PaginationContent>
                <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                <PaginationItem><PaginationEllipsis /></PaginationItem>
                <PaginationItem><PaginationLink href="#">6</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#">7</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#" isActive>8</PaginationLink></PaginationItem>
                <PaginationItem><PaginationNext href="#" aria-disabled className="pointer-events-none opacity-50" /></PaginationItem>
              </PaginationContent>
            </Pagination>
          ),
          code: {
            react: `<KayoBrutalistPagination total={8} current={8} onChange={setPage} />`,
          },
        },
        {
          title: 'With First/Last Buttons',
          description: '`showFirstLast=true` — adds « (first) and » (last) jump buttons.',
          preview: isKaayo ? (
            <KayoBrutalistPagination
              total={12}
              current={6}
              onChange={() => {}}
              showFirstLast
            />
          ) : (
            <Pagination>
              <PaginationContent>
                <PaginationItem><PaginationLink href="#">«</PaginationLink></PaginationItem>
                <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                <PaginationItem><PaginationEllipsis /></PaginationItem>
                <PaginationItem><PaginationLink href="#">5</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#" isActive>6</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#">7</PaginationLink></PaginationItem>
                <PaginationItem><PaginationEllipsis /></PaginationItem>
                <PaginationItem><PaginationLink href="#">12</PaginationLink></PaginationItem>
                <PaginationItem><PaginationNext href="#" /></PaginationItem>
                <PaginationItem><PaginationLink href="#">»</PaginationLink></PaginationItem>
              </PaginationContent>
            </Pagination>
          ),
          code: {
            react: `<KayoBrutalistPagination total={12} current={6} onChange={setPage} showFirstLast />`,
          },
        },
        {
          title: 'Interactive Demo',
          description: 'Click the page buttons — the current page updates live.',
          preview: isKaayo ? (
            <InteractiveDemo />
          ) : (
            <Pagination>
              <PaginationContent>
                <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                <PaginationItem><PaginationNext href="#" /></PaginationItem>
              </PaginationContent>
            </Pagination>
          ),
          code: {
            react: `function Demo() {
  const [page, setPage] = useState(1)
  return (
    <KayoBrutalistPagination
      total={15}
      current={page}
      onChange={setPage}
    />
  )
}`,
          },
        },
      ]}
    />
  )
}
```

- [ ] **Step 2: Commit**

```bash
git -C "D:\Aumraa\APOS pitch\1_Product Factory\02_Breathe Design system" add src/app/pages/molecules/PaginationPage.tsx
git -C "D:\Aumraa\APOS pitch\1_Product Factory\02_Breathe Design system" commit -m "feat(molecules): PaginationPage — 6 sections with isKaayo branching"
```

---

## Task 5: KayoBrutalistScrollArea component

**Files:**
- Create: `src/app/components/custom/kaayo/KayoBrutalistScrollArea.tsx`

- [ ] **Step 1: Create the file**

```tsx
import { useEffect, ReactNode, CSSProperties } from 'react'

const STYLE_ID = 'kayo-scrollarea-styles'

export type KayoScrollOrientation = 'vertical' | 'horizontal' | 'both'

export interface KayoBrutalistScrollAreaProps {
  height?: number | string
  width?: number | string
  orientation?: KayoScrollOrientation
  children: ReactNode
  style?: CSSProperties
}

export function KayoBrutalistScrollArea({
  height = 300,
  width = '100%',
  orientation = 'vertical',
  children,
  style,
}: KayoBrutalistScrollAreaProps) {
  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return
    const s = document.createElement('style')
    s.id = STYLE_ID
    s.textContent = `
      .kayo-scroll-inner::-webkit-scrollbar { width: 8px; height: 8px; }
      .kayo-scroll-inner::-webkit-scrollbar-track { background: var(--kayo-color-muted, #f4f4f4); }
      .kayo-scroll-inner::-webkit-scrollbar-thumb { background: var(--kayo-color-border, #3b3d3f); border-radius: 0; }
      .kayo-scroll-inner::-webkit-scrollbar-thumb:hover { background: #191b1f; }
      .kayo-scroll-inner { scrollbar-width: thin; scrollbar-color: var(--kayo-color-border, #3b3d3f) var(--kayo-color-muted, #f4f4f4); }
    `
    document.head.appendChild(s)
  }, [])

  const overflowStyle: CSSProperties =
    orientation === 'vertical'
      ? { overflowY: 'auto', overflowX: 'hidden' }
      : orientation === 'horizontal'
      ? { overflowX: 'auto', overflowY: 'hidden' }
      : { overflow: 'auto' }

  return (
    <div
      style={{
        border: '2px solid var(--kayo-color-border, #3b3d3f)',
        borderRadius: 6,
        overflow: 'hidden',
        width,
        height,
        fontFamily: "'DM Sans', system-ui, sans-serif",
        ...style,
      }}
    >
      <div
        className="kayo-scroll-inner"
        style={{
          width: '100%',
          height: '100%',
          ...overflowStyle,
        }}
      >
        {children}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git -C "D:\Aumraa\APOS pitch\1_Product Factory\02_Breathe Design system" add src/app/components/custom/kaayo/KayoBrutalistScrollArea.tsx
git -C "D:\Aumraa\APOS pitch\1_Product Factory\02_Breathe Design system" commit -m "feat(molecules): KayoBrutalistScrollArea — webkit custom scrollbar, vertical/horizontal/both orientation"
```

---

## Task 6: ScrollAreaPage update

**Files:**
- Modify: `src/app/pages/molecules/ScrollAreaPage.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { ScrollArea } from '@/app/components/ui/scroll-area'
import { Separator } from '@/app/components/ui/separator'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistScrollArea } from '@/app/components/custom/kaayo/KayoBrutalistScrollArea'

const residents = [
  { flat: 'A-101', name: 'Ramkumar G',      status: 'Paid' },
  { flat: 'A-102', name: 'Priya Shankar',    status: 'Paid' },
  { flat: 'B-201', name: 'Karthik Raja',     status: 'Pending' },
  { flat: 'B-202', name: 'Meena Devi',       status: 'Paid' },
  { flat: 'C-301', name: 'Santhosh Kumar',   status: 'Overdue' },
  { flat: 'C-302', name: 'Anitha Raj',       status: 'Paid' },
  { flat: 'D-401', name: 'Murugan P',        status: 'Pending' },
  { flat: 'D-402', name: 'Lakshmi S',        status: 'Paid' },
  { flat: 'E-501', name: 'Vijay Kumar',      status: 'Paid' },
  { flat: 'E-502', name: 'Sangeetha B',      status: 'Pending' },
  { flat: 'F-601', name: 'Arjun Reddy',      status: 'Overdue' },
  { flat: 'F-602', name: 'Deepika Nair',     status: 'Paid' },
]

const statusColor = (status: string) => {
  if (status === 'Paid') return '#166534'
  if (status === 'Overdue') return '#970103'
  return '#92400e'
}

export function ScrollAreaPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  return (
    <ComponentPageLayout
      title="Scroll Area"
      description="A custom-styled scrollable container with consistent cross-browser appearance."
      level="Molecule"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Vertical List',
          description: 'Fixed 300px height, 12-item resident list — shows vertical custom scrollbar.',
          preview: isKaayo ? (
            <KayoBrutalistScrollArea height={300} width="100%" style={{ maxWidth: 400 }}>
              <div style={{ padding: '12px 16px' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#a8a8aa', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
                  All Residents
                </div>
                {residents.map((r, i) => (
                  <div key={r.flat}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#3b3d3f' }}>{r.name}</div>
                        <div style={{ fontSize: 12, color: '#6b7280' }}>{r.flat}</div>
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: statusColor(r.status) }}>{r.status}</span>
                    </div>
                    {i < residents.length - 1 && (
                      <div style={{ height: 1, backgroundColor: 'var(--kayo-color-muted, #f4f4f4)' }} />
                    )}
                  </div>
                ))}
              </div>
            </KayoBrutalistScrollArea>
          ) : (
            <ScrollArea className="h-64 w-full max-w-sm rounded-lg border border-border">
              <div className="p-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">All Residents</p>
                {residents.map((r, i) => (
                  <div key={r.flat}>
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-sm font-medium">{r.name}</p>
                        <p className="text-xs text-muted-foreground">{r.flat}</p>
                      </div>
                      <span className={`text-xs font-medium ${r.status === 'Paid' ? 'text-green-600' : r.status === 'Overdue' ? 'text-destructive' : 'text-amber-600'}`}>
                        {r.status}
                      </span>
                    </div>
                    {i < residents.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </ScrollArea>
          ),
          code: {
            react: `import { KayoBrutalistScrollArea } from '@breathe/kaayo'

<KayoBrutalistScrollArea height={300} width="100%">
  {residents.map(r => (
    <div key={r.flat}>{/* row */}</div>
  ))}
</KayoBrutalistScrollArea>`,
          },
        },
        {
          title: 'Horizontal Content',
          description: 'Fixed width container, wide content — scrolls horizontally.',
          preview: isKaayo ? (
            <KayoBrutalistScrollArea height={80} width="100%" orientation="horizontal" style={{ maxWidth: 480 }}>
              <div style={{ display: 'flex', gap: 12, padding: '12px 16px', width: 'max-content' }}>
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
                  <div key={month} style={{
                    flexShrink: 0,
                    width: 80,
                    padding: '8px 12px',
                    border: '2px solid var(--kayo-color-border, #3b3d3f)',
                    borderRadius: 6,
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 2 }}>{month}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#3b3d3f' }}>₹{(Math.random() * 50 + 20).toFixed(0)}k</div>
                  </div>
                ))}
              </div>
            </KayoBrutalistScrollArea>
          ) : (
            <ScrollArea className="w-full max-w-lg whitespace-nowrap rounded-lg border border-border">
              <div className="flex gap-3 p-4">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                  <div key={m} className="flex-shrink-0 rounded-md border px-3 py-2 text-center">
                    <p className="text-xs text-muted-foreground">{m}</p>
                    <p className="text-sm font-semibold">₹42k</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ),
          code: {
            react: `<KayoBrutalistScrollArea height={80} orientation="horizontal">
  <div style={{ display: 'flex', gap: 12, width: 'max-content', padding: 16 }}>
    {months.map(m => <MonthCard key={m} />)}
  </div>
</KayoBrutalistScrollArea>`,
          },
        },
        {
          title: 'Both Axes',
          description: 'Fixed 300×300px box, large grid content — scrolls in both directions.',
          preview: isKaayo ? (
            <KayoBrutalistScrollArea height={300} width={400} orientation="both">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 100px)', gap: 8, padding: 16, width: 'max-content' }}>
                {Array.from({ length: 48 }, (_, i) => (
                  <div key={i} style={{
                    width: 100,
                    height: 60,
                    border: '2px solid var(--kayo-color-border, #3b3d3f)',
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    color: '#6b7280',
                    fontWeight: 600,
                  }}>
                    Cell {i + 1}
                  </div>
                ))}
              </div>
            </KayoBrutalistScrollArea>
          ) : (
            <ScrollArea className="h-64 w-96 rounded-lg border">
              <div className="grid gap-2 p-4" style={{ gridTemplateColumns: 'repeat(8, 100px)', width: 'max-content' }}>
                {Array.from({ length: 48 }, (_, i) => (
                  <div key={i} className="flex h-14 w-24 items-center justify-center rounded border text-xs text-muted-foreground">
                    Cell {i + 1}
                  </div>
                ))}
              </div>
            </ScrollArea>
          ),
          code: {
            react: `<KayoBrutalistScrollArea height={300} width={400} orientation="both">
  <div style={{ width: 'max-content', padding: 16 }}>
    {/* wide grid content */}
  </div>
</KayoBrutalistScrollArea>`,
          },
        },
        {
          title: 'Custom Height',
          description: '`height="200px"` narrow box — demonstrates scrollbar style at a smaller viewport.',
          preview: isKaayo ? (
            <KayoBrutalistScrollArea height={200} width="100%" style={{ maxWidth: 300 }}>
              <div style={{ padding: '12px 16px' }}>
                {Array.from({ length: 20 }, (_, i) => (
                  <div key={i} style={{
                    padding: '8px 0',
                    borderBottom: '1px solid #f4f4f4',
                    fontSize: 13,
                    color: '#3b3d3f',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}>
                    <span>Item {i + 1}</span>
                    <span style={{ color: '#6b7280' }}>₹{(i + 1) * 100}</span>
                  </div>
                ))}
              </div>
            </KayoBrutalistScrollArea>
          ) : (
            <ScrollArea className="h-48 w-full max-w-xs rounded-lg border">
              <div className="p-4 space-y-2">
                {Array.from({ length: 20 }, (_, i) => (
                  <div key={i} className="flex justify-between text-sm border-b border-border/50 pb-2">
                    <span>Item {i + 1}</span>
                    <span className="text-muted-foreground">₹{(i + 1) * 100}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ),
          code: {
            react: `<KayoBrutalistScrollArea height={200} width="100%">
  {items.map(item => <div key={item.id}>{item.label}</div>)}
</KayoBrutalistScrollArea>`,
          },
        },
      ]}
    />
  )
}
```

- [ ] **Step 2: Commit**

```bash
git -C "D:\Aumraa\APOS pitch\1_Product Factory\02_Breathe Design system" add src/app/pages/molecules/ScrollAreaPage.tsx
git -C "D:\Aumraa\APOS pitch\1_Product Factory\02_Breathe Design system" commit -m "feat(molecules): ScrollAreaPage — 4 sections with isKaayo branching"
```

---

## Task 7: KayoBrutalistSonner component

**Files:**
- Create: `src/app/components/custom/kaayo/KayoBrutalistSonner.tsx`

Note: Imports `Toaster` from `sonner` directly (not the shadcn wrapper) to control all styling. Injects CSS targeting `[data-sonner-toast]` attributes to apply Neo-Brutalist borders, shadows, and left accent bars.

- [ ] **Step 1: Create the file**

```tsx
import { useEffect } from 'react'
import { Toaster } from 'sonner'

const STYLE_ID = 'kayo-sonner-styles'

export type KayoToastPosition =
  | 'top-left' | 'top-center' | 'top-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right'

export interface KayoBrutalistSonnerProps {
  position?: KayoToastPosition
  richColors?: boolean
  closeButton?: boolean
}

export function KayoBrutalistSonner({
  position = 'bottom-right',
  richColors = false,
  closeButton = true,
}: KayoBrutalistSonnerProps) {
  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return
    const s = document.createElement('style')
    s.id = STYLE_ID
    s.textContent = `
      [data-sonner-toaster] [data-sonner-toast] {
        font-family: 'DM Sans', system-ui, sans-serif !important;
        border: 2px solid #3b3d3f !important;
        border-radius: 6px !important;
        box-shadow: 4px 4px 0 #191b1f !important;
        background: #ffffff !important;
        padding: 12px 16px 12px 20px !important;
        position: relative !important;
        overflow: hidden !important;
      }
      [data-sonner-toaster] [data-sonner-toast]::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 4px;
        background: #3b3d3f;
      }
      [data-sonner-toaster] [data-sonner-toast][data-type="success"]::before { background: #166534; }
      [data-sonner-toaster] [data-sonner-toast][data-type="error"]::before { background: #970103; }
      [data-sonner-toaster] [data-sonner-toast][data-type="warning"]::before { background: #d97706; }
      [data-sonner-toaster] [data-sonner-toast][data-type="info"]::before { background: #1d4ed8; }
      [data-sonner-toaster] [data-sonner-toast][data-type="loading"]::before { background: #3b3d3f; }
      [data-sonner-toaster] [data-sonner-toast] [data-title] {
        font-size: 14px !important;
        font-weight: 600 !important;
        color: #3b3d3f !important;
        font-family: 'DM Sans', system-ui, sans-serif !important;
      }
      [data-sonner-toaster] [data-sonner-toast] [data-description] {
        font-size: 13px !important;
        color: #6b7280 !important;
        font-family: 'DM Sans', system-ui, sans-serif !important;
      }
      [data-sonner-toaster] [data-sonner-toast] [data-close-button] {
        border: 2px solid #3b3d3f !important;
        border-radius: 4px !important;
        background: #ffffff !important;
      }
      [data-sonner-toaster] [data-sonner-toast] [data-button] {
        background: #ffffff !important;
        border: 2px solid #3b3d3f !important;
        border-radius: 6px !important;
        box-shadow: 2px 2px 0 #191b1f !important;
        font-family: 'DM Sans', system-ui, sans-serif !important;
        font-size: 12px !important;
        font-weight: 600 !important;
        color: #3b3d3f !important;
        padding: 4px 10px !important;
      }
    `
    document.head.appendChild(s)
  }, [])

  return (
    <Toaster
      position={position}
      richColors={richColors}
      closeButton={closeButton}
    />
  )
}
```

- [ ] **Step 2: Commit**

```bash
git -C "D:\Aumraa\APOS pitch\1_Product Factory\02_Breathe Design system" add src/app/components/custom/kaayo/KayoBrutalistSonner.tsx
git -C "D:\Aumraa\APOS pitch\1_Product Factory\02_Breathe Design system" commit -m "feat(molecules): KayoBrutalistSonner — CSS-overridden Toaster, left accent bars, neo-brutalist shadows"
```

---

## Task 8: SonnerPage update

**Files:**
- Modify: `src/app/pages/molecules/SonnerPage.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Button } from '@/app/components/ui/button'
import { Toaster } from '@/app/components/ui/sonner'
import { toast } from 'sonner'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistSonner } from '@/app/components/custom/kaayo/KayoBrutalistSonner'
import { KayoBrutalistButton } from '@/app/components/custom/kaayo/KayoBrutalistButton'

export function SonnerPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  return (
    <ComponentPageLayout
      title="Sonner"
      description="Non-blocking notification toasts for feedback, confirmations, and system messages. Breathe uses Sonner over Radix Toast for its simpler API."
      level="Molecule"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Types',
          description: 'Click each button to trigger its toast type — default, success, error, warning, info, loading.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <KayoBrutalistSonner />
              <KayoBrutalistButton label="Default"  variant="secondary" size="sm" onClick={() => toast('Payment recorded successfully')} />
              <KayoBrutalistButton label="Success"  variant="secondary" size="sm" onClick={() => toast.success('Dues cleared for Flat A-101')} />
              <KayoBrutalistButton label="Error"    variant="secondary" size="sm" onClick={() => toast.error('Failed to send reminder')} />
              <KayoBrutalistButton label="Warning"  variant="secondary" size="sm" onClick={() => toast.warning('3 overdue payments pending')} />
              <KayoBrutalistButton label="Info"     variant="secondary" size="sm" onClick={() => toast.info('Maintenance window: 2–4 AM')} />
              <KayoBrutalistButton label="Loading"  variant="secondary" size="sm" onClick={() => toast.loading('Syncing residents…')} />
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              <Toaster />
              <Button variant="outline" onClick={() => toast('Payment recorded successfully')}>Default</Button>
              <Button variant="outline" onClick={() => toast.success('Dues cleared for A-101')}>Success</Button>
              <Button variant="outline" onClick={() => toast.error('Failed to send reminder')}>Error</Button>
              <Button variant="outline" onClick={() => toast.warning('3 overdue payments pending')}>Warning</Button>
              <Button variant="outline" onClick={() => toast.info('Maintenance window: 2–4 AM')}>Info</Button>
              <Button variant="outline" onClick={() => toast.loading('Syncing residents…')}>Loading</Button>
            </div>
          ),
          code: {
            react: `import { KayoBrutalistSonner } from '@breathe/kaayo'
import { toast } from 'sonner'

// Mount once at page/app root:
<KayoBrutalistSonner />

// Trigger from anywhere:
toast('Default message')
toast.success('Dues cleared')
toast.error('Failed to send')
toast.warning('3 overdue payments')
toast.info('Maintenance window')
toast.loading('Syncing…')`,
          },
        },
        {
          title: 'With Description',
          description: 'Toast with a supporting description line — use for actions with context.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', gap: 10 }}>
              <KayoBrutalistSonner />
              <KayoBrutalistButton
                label="Show toast"
                variant="secondary"
                size="sm"
                onClick={() => toast.success('Reminder sent', { description: 'WhatsApp message delivered to 12 residents in Block A' })}
              />
            </div>
          ) : (
            <div className="flex gap-3">
              <Toaster />
              <Button variant="outline" onClick={() => toast.success('Reminder sent', { description: 'WhatsApp message delivered to 12 residents' })}>
                Show toast
              </Button>
            </div>
          ),
          code: {
            react: `toast.success('Reminder sent', {
  description: 'WhatsApp message delivered to 12 residents in Block A',
})`,
          },
        },
        {
          title: 'With Action',
          description: 'Error toast with a "Retry" action button — for recoverable failures.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', gap: 10 }}>
              <KayoBrutalistSonner />
              <KayoBrutalistButton
                label="Trigger error"
                variant="secondary"
                size="sm"
                onClick={() => toast.error('Payment failed', {
                  description: 'Unable to process ₹2,500 for Flat B-202',
                  action: { label: 'Retry', onClick: () => {} },
                })}
              />
            </div>
          ) : (
            <div className="flex gap-3">
              <Toaster />
              <Button variant="outline" onClick={() => toast.error('Payment failed', {
                description: 'Unable to process ₹2,500 for Flat B-202',
                action: { label: 'Retry', onClick: () => {} },
              })}>
                Trigger error
              </Button>
            </div>
          ),
          code: {
            react: `toast.error('Payment failed', {
  description: 'Unable to process ₹2,500',
  action: { label: 'Retry', onClick: () => retryPayment() },
})`,
          },
        },
        {
          title: 'Positions',
          description: 'Each button fires a toast at a different position — individual toasts can override the Toaster position.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <KayoBrutalistSonner />
              {(['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] as const).map(pos => (
                <KayoBrutalistButton
                  key={pos}
                  label={pos}
                  variant="secondary"
                  size="sm"
                  onClick={() => toast(`Position: ${pos}`, { position: pos })}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              <Toaster />
              {(['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] as const).map(pos => (
                <Button key={pos} variant="outline" size="sm" onClick={() => toast(`Position: ${pos}`, { position: pos })}>
                  {pos}
                </Button>
              ))}
            </div>
          ),
          code: {
            react: `// Per-toast position overrides the Toaster default:
toast('Top center', { position: 'top-center' })
toast('Bottom left', { position: 'bottom-left' })`,
          },
        },
        {
          title: 'Loading → Success',
          description: '`toast.promise()` — shows a loading state that transitions to success automatically.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', gap: 10 }}>
              <KayoBrutalistSonner />
              <KayoBrutalistButton
                label="Send reminders"
                variant="secondary"
                size="sm"
                onClick={() => {
                  const promise = new Promise<string>(resolve =>
                    setTimeout(() => resolve('done'), 2500)
                  )
                  toast.promise(promise, {
                    loading: 'Sending reminders to 24 residents…',
                    success: 'Reminders sent successfully',
                    error: 'Failed to send reminders',
                  })
                }}
              />
            </div>
          ) : (
            <div className="flex gap-3">
              <Toaster />
              <Button variant="outline" onClick={() => {
                const p = new Promise(res => setTimeout(res, 2500))
                toast.promise(p, { loading: 'Sending reminders…', success: 'Reminders sent!', error: 'Failed' })
              }}>
                Send reminders
              </Button>
            </div>
          ),
          code: {
            react: `const promise = sendReminders() // returns a Promise

toast.promise(promise, {
  loading: 'Sending reminders to 24 residents…',
  success: 'Reminders sent successfully',
  error: 'Failed to send reminders',
})`,
          },
        },
        {
          title: 'Multiple Stacked',
          description: '"Spam" button fires 3 toasts rapidly — shows stacking behaviour (max 3 visible).',
          preview: isKaayo ? (
            <div style={{ display: 'flex', gap: 10 }}>
              <KayoBrutalistSonner />
              <KayoBrutalistButton
                label="Spam toasts"
                variant="secondary"
                size="sm"
                onClick={() => {
                  toast.success('Fee collected — Flat A-101')
                  toast.success('Fee collected — Flat B-202')
                  toast.warning('Overdue — Flat C-301')
                }}
              />
            </div>
          ) : (
            <div className="flex gap-3">
              <Toaster />
              <Button variant="outline" onClick={() => {
                toast.success('Fee collected — A-101')
                toast.success('Fee collected — B-202')
                toast.warning('Overdue — C-301')
              }}>
                Spam toasts
              </Button>
            </div>
          ),
          code: {
            react: `// Fire multiple toasts — they stack, oldest slides out when limit reached:
toast.success('Fee collected — Flat A-101')
toast.success('Fee collected — Flat B-202')
toast.warning('Overdue — Flat C-301')`,
          },
        },
      ]}
    />
  )
}
```

- [ ] **Step 2: Commit**

```bash
git -C "D:\Aumraa\APOS pitch\1_Product Factory\02_Breathe Design system" add src/app/pages/molecules/SonnerPage.tsx
git -C "D:\Aumraa\APOS pitch\1_Product Factory\02_Breathe Design system" commit -m "feat(molecules): SonnerPage — 6 sections with isKaayo branching"
```

---

## Self-Review Checklist

**Spec coverage:**
- KayoBrutalistBreadcrumb: ✅ separator prop, maxVisible ellipsis with expand-on-click, home icon slot, hover CSS via STYLE_ID, 6 sections
- KayoBrutalistPagination: ✅ getPageRange algorithm with siblings, press animation, showPrevNext, showFirstLast, 6 sections
- KayoBrutalistScrollArea: ✅ webkit scrollbar CSS injection, vertical/horizontal/both, 4 sections
- KayoBrutalistSonner: ✅ CSS-overridden Toaster, left accent bars by type, title/description/action/close styles, 6 sections

**Type consistency:**
- `KayoBrutalistButton` used in SonnerPage with `onClick` — **KayoBrutalistButton does not have an `onClick` prop**. Fix: replace with inline `<button>` elements styled to Kaayo spec, or accept that this is an existing gap and use a wrapper `<div onClick>` around `<KayoBrutalistButton>`.

**Fix for SonnerPage KayoBrutalistButton onClick issue:**
`KayoBrutalistButton` has no `onClick` prop in its current API. Replace all `KayoBrutalistButton` usages in the SonnerPage Kaayo previews with styled `<button>` elements:

```tsx
// Pattern to use instead of KayoBrutalistButton with onClick:
<button
  type="button"
  onClick={() => toast('...')}
  style={{
    padding: '8px 14px',
    fontSize: 13,
    fontWeight: 600,
    fontFamily: "'DM Sans', system-ui, sans-serif",
    border: '2px solid var(--kayo-color-border, #3b3d3f)',
    borderRadius: 6,
    background: '#ffffff',
    cursor: 'pointer',
    boxShadow: '2px 2px 0 #191b1f',
    color: 'var(--kayo-color-foreground, #3b3d3f)',
  }}
>
  Default
</button>
```

The `KayoBrutalistButton` import in SonnerPage should be removed. The `onClick` self-review catch also applies to `InteractiveDemo` in PaginationPage — but `KayoBrutalistPagination` accepts `onChange: (page: number) => void` which is correctly used there, not `onClick`.

**`implemented` prop:** All 4 pages must have `implemented={['lemniscate', 'aumraa', 'kaayo']}` ✅

**No blur in shadows:** All shadows are `2px 2px 0 #191b1f` or `4px 4px 0 #191b1f` — no blur radius ✅

**SonnerPage implementer note:** Use the corrected button pattern above (plain `<button>` with Neo-Brutalist inline styles) instead of `KayoBrutalistButton` in the Kaayo preview sections. Remove the `KayoBrutalistButton` import from SonnerPage entirely.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-06-06-kaayo-molecules-phase3.md`.

**Two execution options:**

**1. Subagent-Driven (recommended)** — Fresh subagent per task, spec compliance + code quality review between tasks

**2. Inline Execution** — Execute tasks in this session, batch execution with checkpoints

Which approach?
