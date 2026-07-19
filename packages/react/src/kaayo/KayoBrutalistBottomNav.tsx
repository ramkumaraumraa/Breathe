import { ReactNode, useEffect } from 'react'

const STYLE_ID = 'kayo-bottom-nav-styles'

export interface KayoBottomNavItem {
  key: string
  label: string
  icon: ReactNode
  badge?: number
}

export interface KayoBrutalistBottomNavProps {
  items: KayoBottomNavItem[]
  activeKey?: string
  onPress?: (key: string) => void
  variant?: 'mobile' | 'tablet'
}

export function KayoBrutalistBottomNav({
  items,
  activeKey,
  onPress,
  variant = 'mobile',
}: KayoBrutalistBottomNavProps) {
  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return
    const s = document.createElement('style')
    s.id = STYLE_ID
    s.textContent = `
      .kayo-bnav-item { cursor: pointer; transition: background 120ms; }
      .kayo-bnav-item:hover { background: #f4f4f4; }
    `
    document.head.appendChild(s)
  }, [])

  const visibleItems = items.slice(0, 5)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        // borderTop removed to avoid competition with active crimson line
        backgroundColor: '#ffffff',
        minHeight: variant === 'tablet' ? 68 : 56,
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      {visibleItems.map((item) => {
        const isActive = activeKey === item.key
        const itemColor = isActive ? '#970103' : '#6b7280'
        const showBadge = typeof item.badge === 'number' && item.badge > 0
        const badgeLabel = item.badge && item.badge > 9 ? '9+' : String(item.badge ?? '')

        return (
          <div
            key={item.key}
            className="kayo-bnav-item"
            onClick={() => onPress?.(item.key)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: variant === 'tablet' ? 3 : 0,
              position: 'relative',
              paddingTop: variant === 'tablet' ? 12 : 8,
              paddingBottom: variant === 'tablet' ? 12 : 8,
              borderTop: isActive ? '2px solid #970103' : '2px solid transparent',
              color: itemColor,
            }}
          >
            {showBadge && (
              <span
                style={{
                  position: 'absolute',
                  top: -4,
                  right: 'calc(50% - 18px)',
                  minWidth: 16,
                  height: 16,
                  backgroundColor: '#970103',
                  color: '#ffffff',
                  fontSize: 9,
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontWeight: 700,
                  borderRadius: 999,
                  border: '2px solid #ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: 1,
                  padding: '0 3px',
                  boxSizing: 'border-box',
                }}
              >
                {badgeLabel}
              </span>
            )}
            <span style={{
              color: itemColor,
              display: 'flex',
              alignItems: 'center',
              transform: variant === 'mobile' ? 'scale(1.15)' : 'none',
            }}>
              {item.icon}
            </span>
            {variant === 'tablet' && (
              <span
                style={{
                  fontSize: 13,
                  color: itemColor,
                  lineHeight: 1,
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                }}
              >
                {item.label}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
