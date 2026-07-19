import { ReactNode, useEffect, useState } from 'react'

const STYLE_ID = 'kayo-sidenav-styles'

export interface KayoSideNavItem {
  key: string
  label: string
  icon: ReactNode
  badge?: number
  href?: string
  disabled?: boolean
}

export interface KayoSideNavSection {
  label?: string
  items: KayoSideNavItem[]
  collapsible?: boolean
  defaultOpen?: boolean
}

export interface KayoBrutalistSideNavProps {
  sections: KayoSideNavSection[]
  activeKey?: string
  onPress?: (key: string) => void
  collapsed?: boolean
  onCollapsedChange?: (v: boolean) => void
  header?: ReactNode
  footer?: ReactNode
  width?: number
  collapsedWidth?: number
}

function SideNavSection({
  section,
  activeKey,
  onPress,
  collapsed,
}: {
  section: KayoSideNavSection
  activeKey?: string
  onPress?: (key: string) => void
  collapsed?: boolean
}) {
  const [open, setOpen] = useState(section.defaultOpen ?? true)

  const isCollapsible = section.collapsible ?? false
  const showItems = !isCollapsible || open

  return (
    <div style={{ marginBottom: 4 }}>
      {section.label && !collapsed && (
        <div
          onClick={() => isCollapsible && setOpen((v) => !v)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '4px 12px',
            marginTop: 12,
            fontSize: 10,
            fontWeight: 700,
            color: '#9ca3af',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            fontFamily: "'DM Sans', system-ui, sans-serif",
            cursor: isCollapsible ? 'pointer' : 'default',
            userSelect: 'none',
          }}
        >
          <span>{section.label}</span>
          {isCollapsible && (
            <span
              style={{
                display: 'inline-flex',
                transition: 'transform 200ms ease-out',
                transform: open ? 'rotate(0deg)' : 'rotate(180deg)',
                fontSize: 12,
                lineHeight: 1,
              }}
            >
              ▾
            </span>
          )}
        </div>
      )}

      <div
        className="kayo-snav-section-items"
        style={{
          maxHeight: showItems ? '1000px' : '0px',
          overflow: 'hidden',
          transition: 'max-height 200ms ease-out',
        }}
      >
        {section.items.map((item) => {
          const isActive = activeKey === item.key
          const isDisabled = item.disabled ?? false
          const showBadge = typeof item.badge === 'number' && item.badge > 0
          const badgeLabel = item.badge && item.badge > 9 ? '9+' : String(item.badge ?? '')

          const handleClick = () => {
            if (!isDisabled) {
              if (item.href) {
                window.location.href = item.href
              } else {
                onPress?.(item.key)
              }
            }
          }

          return (
            <div
              key={item.key}
              className="kayo-snav-item"
              data-active={isActive ? 'true' : 'false'}
              data-disabled={isDisabled ? 'true' : 'false'}
              onClick={handleClick}
              title={collapsed ? item.label : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: collapsed ? 0 : 10,
                padding: '10px 12px',
                borderRadius: 6,
                position: 'relative',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                fontSize: 14,
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#970103' : '#3b3d3f',
                opacity: isDisabled ? 0.4 : 1,
                fontFamily: "'DM Sans', system-ui, sans-serif",
                justifyContent: collapsed ? 'center' : 'flex-start',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                {item.icon}
              </span>

              {!collapsed && (
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.label}
                </span>
              )}

              {!collapsed && showBadge && (
                <span
                  style={{
                    marginLeft: 'auto',
                    minWidth: 20,
                    height: 20,
                    borderRadius: 999,
                    backgroundColor: '#970103',
                    color: '#fff',
                    fontSize: 10,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    padding: '0 4px',
                    boxSizing: 'border-box',
                    flexShrink: 0,
                  }}
                >
                  {badgeLabel}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function KayoBrutalistSideNav({
  sections,
  activeKey,
  onPress,
  collapsed = false,
  onCollapsedChange,
  header,
  footer,
  width = 240,
  collapsedWidth = 56,
}: KayoBrutalistSideNavProps) {
  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return
    const s = document.createElement('style')
    s.id = STYLE_ID
    s.textContent = `
      .kayo-snav-item { transition: background 120ms; }
      .kayo-snav-item:hover:not([data-disabled="true"]) { background: #f4f4f4; }
      .kayo-snav-item[data-active="true"]::before {
        content: '';
        position: absolute;
        left: 0;
        top: 6px;
        bottom: 6px;
        width: 4px;
        background: #970103;
        border-radius: 0 2px 2px 0;
      }
      .kayo-snav-section-items {
        overflow: hidden;
        transition: max-height 200ms ease-out;
      }
    `
    document.head.appendChild(s)
  }, [])

  const containerWidth = collapsed ? collapsedWidth : width

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '2px solid #3b3d3f',
        backgroundColor: '#ffffff',
        width: containerWidth,
        transition: 'width 200ms ease-out',
        overflow: 'hidden',
        position: 'relative',
        fontFamily: "'DM Sans', system-ui, sans-serif",
        flexShrink: 0,
      }}
    >
      {header && (
        <div
          style={{
            padding: '16px 12px',
            borderBottom: '2px solid #3b3d3f',
            flexShrink: 0,
          }}
        >
          {header}
        </div>
      )}

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: 8,
        }}
      >
        {sections.map((section, idx) => (
          <SideNavSection
            key={idx}
            section={section}
            activeKey={activeKey}
            onPress={onPress}
            collapsed={collapsed}
          />
        ))}
      </div>

      {footer && (
        <div
          style={{
            padding: 12,
            borderTop: '2px solid #3b3d3f',
            flexShrink: 0,
          }}
        >
          {footer}
        </div>
      )}

      {onCollapsedChange && (
        <button
          onClick={() => onCollapsedChange(!collapsed)}
          style={{
            position: 'absolute',
            bottom: 16,
            right: -16,
            width: 32,
            height: 32,
            border: '2px solid #3b3d3f',
            borderRadius: '50%',
            backgroundColor: '#fff',
            boxShadow: '2px 2px 0 #191b1f',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 16,
            lineHeight: 1,
            padding: 0,
            zIndex: 10,
          }}
        >
          {collapsed ? '›' : '‹'}
        </button>
      )}
    </div>
  )
}
