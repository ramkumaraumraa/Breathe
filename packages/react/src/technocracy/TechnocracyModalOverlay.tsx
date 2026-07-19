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
        background: 'rgba(4, 6, 15, 0.78)',
        backdropFilter: 'blur(8px)',
        fontFamily: "'Source Code Pro', ui-monospace, monospace",
      }}
    >
      <div
        style={{
          width: 'min(560px, 100%)',
          maxHeight: 'min(720px, 90vh)',
          padding: '20px',
          overflow: 'auto',
          border: '1px solid rgba(255, 255, 255, 0.22)',
          borderRadius: '16px',
          background: '#0b0e18',
          boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
          color: '#f2f5fa',
        }}
      >
        <header style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#f2f5fa' }}>{title}</h3>
          <button
            type="button"
            onClick={onClose}
            style={{ border: 0, color: '#8b94a7', background: 'transparent', cursor: 'pointer', fontSize: '20px', lineHeight: 1 }}
          >
            ×
          </button>
        </header>
        <div>{children}</div>
      </div>
    </div>
  )
}
