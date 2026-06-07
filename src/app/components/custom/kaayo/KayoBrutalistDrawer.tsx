import { ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'

export interface KayoBrutalistDrawerProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  children?: ReactNode
  footer?: ReactNode
  snapHeight?: 'sm' | 'md' | 'lg' | 'full'
  showHandle?: boolean
  closeOnBackdrop?: boolean
}

const STYLE_ID = 'kayo-drawer-styles'

const SNAP: Record<NonNullable<KayoBrutalistDrawerProps['snapHeight']>, string> = {
  sm: '40vh',
  md: '60vh',
  lg: '80vh',
  full: '100vh',
}

export function KayoBrutalistDrawer({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  snapHeight = 'md',
  showHandle = true,
  closeOnBackdrop = true,
}: KayoBrutalistDrawerProps) {
  // Inject keyframes once
  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return
    const s = document.createElement('style')
    s.id = STYLE_ID
    s.textContent = `
      @keyframes kayo-drawer-in {
        from { transform: translateY(100%); }
        to   { transform: translateY(0); }
      }
    `
    document.head.appendChild(s)
  }, [])

  // Escape key handler
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  const height = SNAP[snapHeight]
  const isFullscreen = snapHeight === 'full'

  const panelStyle: React.CSSProperties = {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    height,
    backgroundColor: '#ffffff',
    borderTop: '2px solid #3b3d3f',
    borderRadius: isFullscreen ? 0 : '6px 6px 0 0',
    boxShadow: '-4px -4px 0 #191b1f',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'DM Sans', system-ui, sans-serif",
    animation: 'kayo-drawer-in 200ms ease-out',
  }

  return createPortal(
    <div
      onClick={closeOnBackdrop ? onClose : undefined}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(25,27,31,0.6)',
        zIndex: 200,
      }}
    >
      <div
        style={panelStyle}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar */}
        {showHandle && (
          <div
            style={{
              width: '40px',
              height: '3px',
              backgroundColor: '#3b3d3f',
              borderRadius: '2px',
              margin: '12px auto 0',
              flexShrink: 0,
            }}
          />
        )}

        {/* Header — only rendered when title is provided */}
        {title && (
          <div
            style={{
              padding: '16px 24px 12px',
              borderBottom: '2px solid #3b3d3f',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: '18px',
                color: '#3b3d3f',
                lineHeight: 1.3,
              }}
            >
              {title}
            </div>
            {description && (
              <div
                style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  marginTop: '6px',
                  lineHeight: 1.5,
                }}
              >
                {description}
              </div>
            )}
          </div>
        )}

        {/* Body */}
        <div
          style={{
            padding: '16px 24px',
            flex: 1,
            overflowY: 'auto',
          }}
        >
          {children}
        </div>

        {/* Footer — only rendered when footer ReactNode is truthy */}
        {footer && (
          <div
            style={{
              padding: '12px 24px 20px',
              borderTop: '2px solid #3b3d3f',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '8px',
              flexShrink: 0,
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}
