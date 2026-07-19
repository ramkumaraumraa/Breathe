import { ReactNode } from 'react'

export interface TechnocracyNavItem {
  id: string
  label: string
  glyph: string
  active?: boolean
  onClick?: () => void
}

export interface TechnocracySidebarProps {
  brandName?: string
  brandSub?: string
  items: TechnocracyNavItem[]
  footer?: ReactNode
}

export function TechnocracySidebar({
  brandName = 'TECHNOCRACY',
  brandSub = 'KAAYO ADMIN OS',
  items,
  footer,
}: TechnocracySidebarProps) {
  return (
    <aside
      style={{
        position: 'sticky',
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        width: '200px',
        height: '100vh',
        padding: '18px 12px 12px',
        borderRight: '1px solid rgba(255, 255, 255, 0.11)',
        background: 'rgba(4, 6, 15, 0.72)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        fontFamily: "'Source Code Pro', ui-monospace, monospace",
        color: '#8b94a7',
      }}
    >
      <div style={{ display: 'grid', padding: '4px 10px 20px' }}>
        <strong style={{ color: '#e0575a', fontSize: '18px', fontWeight: 700, letterSpacing: '0.04em' }}>
          {brandName}
        </strong>
        <span style={{ color: '#8b94a7', fontSize: '9px', letterSpacing: '0.18em', marginTop: '2px' }}>
          {brandSub}
        </span>
      </div>

      <nav style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
        <ul style={{ display: 'grid', gap: '2px', margin: 0, padding: 0, listStyle: 'none' }}>
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={item.onClick}
                style={{
                  position: 'relative',
                  display: 'grid',
                  gridTemplateColumns: '22px 1fr',
                  gap: '8px',
                  width: '100%',
                  padding: '9px 10px',
                  color: item.active ? '#f2f5fa' : '#8b94a7',
                  background: item.active ? 'rgba(0, 220, 130, 0.08)' : 'transparent',
                  border: 0,
                  cursor: 'pointer',
                  textAlign: 'left',
                  textTransform: 'uppercase',
                  fontSize: '10px',
                  letterSpacing: '0.05em',
                  fontFamily: 'inherit',
                }}
              >
                {item.active && (
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '6px',
                      bottom: '6px',
                      width: '2px',
                      backgroundColor: '#00dc82',
                    }}
                  />
                )}
                <span style={{ color: '#00dc82', textAlign: 'center' }}>{item.glyph}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {footer && (
        <footer style={{ padding: '12px 10px 0', borderTop: '1px solid rgba(255, 255, 255, 0.11)', fontSize: '9px', lineHeight: 1.5 }}>
          {footer}
        </footer>
      )}
    </aside>
  )
}
