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
        borderRight: '1px solid var(--thcy-color-border)',
        background: 'var(--thcy-color-sidebar)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        fontFamily: "var(--thcy-font-family)",
        color: 'var(--thcy-color-foreground-secondary)',
      }}
    >
      <div style={{ display: 'grid', padding: '4px 10px 20px' }}>
        <strong style={{ color: 'var(--thcy-color-brand)', fontSize: '18px', fontWeight: 700, letterSpacing: '0.04em' }}>
          {brandName}
        </strong>
        <span style={{ color: 'var(--thcy-color-foreground-secondary)', fontSize: '9px', letterSpacing: '0.18em', marginTop: '2px' }}>
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
                  color: item.active ? 'var(--thcy-color-foreground)' : 'var(--thcy-color-foreground-secondary)',
                  background: item.active ? 'var(--thcy-color-primary-subtle)' : 'transparent',
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
                      backgroundColor: 'var(--thcy-color-signal-green)',
                    }}
                  />
                )}
                <span style={{ color: 'var(--thcy-color-signal-green)', textAlign: 'center' }}>{item.glyph}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {footer && (
        <footer style={{ padding: '12px 10px 0', borderTop: '1px solid var(--thcy-color-border)', fontSize: '9px', lineHeight: 1.5 }}>
          {footer}
        </footer>
      )}
    </aside>
  )
}
