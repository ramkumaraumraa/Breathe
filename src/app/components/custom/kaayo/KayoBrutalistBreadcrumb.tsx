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
