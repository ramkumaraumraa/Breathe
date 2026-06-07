import { useState, useEffect, useRef, ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

// ─── Interfaces ────────────────────────────────────────────────────────────────

export interface KayoNavMenuChild {
  label: string
  href: string
  description?: string
  icon?: ReactNode
}

export interface KayoNavMenuItem {
  label: string
  href?: string          // if provided = direct link; if omitted = has dropdown
  children?: KayoNavMenuChild[]
  active?: boolean
}

export interface KayoBrutalistNavigationMenuProps {
  items: KayoNavMenuItem[]
  rightSlot?: ReactNode  // e.g. search button + CTA
  activeHref?: string
  onNavigate?: (href: string) => void
  sticky?: boolean
}

// ─── CSS injection ─────────────────────────────────────────────────────────────

const STYLE_ID = 'kayo-navmenu-styles'

function injectStyles() {
  if (typeof document === 'undefined') return
  if (document.getElementById(STYLE_ID)) return
  const s = document.createElement('style')
  s.id = STYLE_ID
  s.textContent = `
    .kayo-navmenu-root { transition: color 120ms; }
    .kayo-navmenu-root:hover { color: #970103; }
    .kayo-navmenu-child:hover { background: #f4f4f4; }
  `
  document.head.appendChild(s)
}

// ─── Inner component: one nav item (with optional dropdown) ────────────────────

interface DropdownItemProps {
  item: KayoNavMenuItem
  activeHref?: string
  onNavigate?: (href: string) => void
}

function DropdownItem({ item, activeHref, onNavigate }: DropdownItemProps) {
  const [open, setOpen] = useState(false)
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  function openDropdown() {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
    setOpen(true)
  }

  function closeDropdown() {
    closeTimeout.current = setTimeout(() => setOpen(false), 100)
  }

  const isActive = item.active || (item.href != null && item.href === activeHref)

  return (
    <div
      style={{ position: 'relative' }}
      onMouseLeave={item.children ? closeDropdown : undefined}
    >
      {/* Root label / trigger */}
      <div
        className="kayo-navmenu-root"
        onMouseEnter={item.children ? openDropdown : undefined}
        onClick={() => item.href && onNavigate?.(item.href)}
        style={{
          padding: '8px 12px',
          fontSize: 14,
          fontWeight: 500,
          color: isActive ? '#970103' : '#3b3d3f',
          cursor: 'pointer',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          borderBottom: isActive ? '2px solid #970103' : undefined,
          marginBottom: isActive ? -2 : undefined,
          userSelect: 'none',
        }}
      >
        {item.label}
        {item.children && (
          <ChevronDown
            size={14}
            style={{
              transform: open ? 'rotate(180deg)' : 'none',
              transition: 'transform 150ms',
            }}
          />
        )}
      </div>

      {/* Dropdown panel */}
      {item.children && open && (
        <div
          onMouseEnter={openDropdown}
          onMouseLeave={closeDropdown}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            minWidth: 240,
            border: '2px solid #3b3d3f',
            borderRadius: 6,
            backgroundColor: '#fff',
            boxShadow: '4px 4px 0 #191b1f',
            zIndex: 50,
            padding: 8,
          }}
        >
          {item.children.map((child, idx) => (
            <div
              key={idx}
              className="kayo-navmenu-child"
              onClick={() => onNavigate?.(child.href)}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                padding: '10px 12px',
                borderRadius: 4,
                cursor: 'pointer',
              }}
            >
              {child.icon && (
                <span style={{ marginTop: 2, flexShrink: 0 }}>{child.icon}</span>
              )}
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#3b3d3f' }}>
                  {child.label}
                </div>
                {child.description && (
                  <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>
                    {child.description}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────

export function KayoBrutalistNavigationMenu({
  items,
  rightSlot,
  activeHref,
  onNavigate,
  sticky,
}: KayoBrutalistNavigationMenuProps) {
  useEffect(() => {
    injectStyles()
  }, [])

  return (
    <nav
      style={{
        borderBottom: '2px solid #3b3d3f',
        backgroundColor: '#fff',
        paddingInline: 24,
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        minHeight: 56,
        position: sticky ? 'sticky' : 'relative',
        top: sticky ? 0 : undefined,
        zIndex: sticky ? 100 : undefined,
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      {items.map((item, i) => (
        <DropdownItem
          key={i}
          item={item}
          activeHref={activeHref}
          onNavigate={onNavigate}
        />
      ))}

      {rightSlot && (
        <div
          style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          {rightSlot}
        </div>
      )}
    </nav>
  )
}
