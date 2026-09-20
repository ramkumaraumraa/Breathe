import { ReactNode } from 'react'

export interface TechnocracyModalOverlayProps {
  isOpen: boolean
  title: string
  onClose: () => void
  children: ReactNode
}

export function TechnocracyModalOverlay({
  isOpen,
  title,
  onClose,
  children,
}: TechnocracyModalOverlayProps) {
  if (!isOpen) return null

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 100,
        inset: 0,
        display: 'grid',
        placeItems: 'center',
        padding: '20px',
        background: 'var(--thcy-color-scrim)',
        backdropFilter: 'blur(8px)',
        fontFamily: "var(--thcy-font-family)",
      }}
    >
      <div
        style={{
          width: 'min(560px, 100%)',
          maxHeight: 'min(720px, 90vh)',
          padding: '20px',
          overflow: 'auto',
          border: '1px solid var(--thcy-color-border-strong)',
          borderRadius: '16px',
          background: 'var(--thcy-color-background-secondary)',
          boxShadow: 'var(--thcy-shadow-modal)',
          color: 'var(--thcy-color-foreground)',
        }}
      >
        <header style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--thcy-color-foreground)' }}>{title}</h3>
          <button
            type="button"
            onClick={onClose}
            style={{ border: 0, color: 'var(--thcy-color-foreground-secondary)', background: 'transparent', cursor: 'pointer', fontSize: '20px', lineHeight: 1 }}
          >
            ×
          </button>
        </header>
        <div>{children}</div>
      </div>
    </div>
  )
}
