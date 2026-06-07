import { ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'

export interface KayoBrutalistSheetProps {
  open: boolean
  onClose: () => void
  side?: 'right' | 'left'
  title?: string
  description?: string
  children?: ReactNode
  footer?: ReactNode
  width?: number | string
  closeOnBackdrop?: boolean
}

const STYLE_ID = 'kayo-sheet-styles'

export function KayoBrutalistSheet({
  open,
  onClose,
  side = 'right',
  title,
  description,
  children,
  footer,
  width = 360,
  closeOnBackdrop = true,
}: KayoBrutalistSheetProps) {
  // Inject CSS once
  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return
    const s = document.createElement('style')
    s.id = STYLE_ID
    s.textContent = `
      @keyframes kayo-sheet-right-in { from { transform: translateX(100%); } to { transform: translateX(0); } }
      @keyframes kayo-sheet-left-in  { from { transform: translateX(-100%); } to { transform: translateX(0); } }
      .kayo-sheet-close:hover { background: #f4f4f4; }
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

  const resolvedWidth = typeof width === 'number' ? `${width}px` : width

  const panelStyleBase: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    width: resolvedWidth,
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'DM Sans', system-ui, sans-serif",
    animation:
      side === 'left'
        ? 'kayo-sheet-left-in 200ms ease-out'
        : 'kayo-sheet-right-in 200ms ease-out',
  }

  const panelStyle: React.CSSProperties =
    side === 'left'
      ? {
          ...panelStyleBase,
          left: 0,
          borderRight: '2px solid #3b3d3f',
          boxShadow: '4px 0 0 #191b1f',
        }
      : {
          ...panelStyleBase,
          right: 0,
          borderLeft: '2px solid #3b3d3f',
          boxShadow: '-4px 0 0 #191b1f',
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
        {/* Header — only rendered when title is provided */}
        {title && (
          <div
            style={{
              padding: '20px 24px 16px',
              borderBottom: '2px solid #3b3d3f',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexShrink: 0,
            }}
          >
            <div style={{ flex: 1, marginRight: '12px' }}>
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
            <button
              className="kayo-sheet-close"
              onClick={onClose}
              aria-label="Close sheet"
              style={{
                width: '32px',
                height: '32px',
                border: '2px solid #3b3d3f',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: 300,
                background: 'transparent',
                color: '#3b3d3f',
                flexShrink: 0,
                lineHeight: 1,
                padding: 0,
                fontFamily: "'DM Sans', system-ui, sans-serif",
              }}
            >
              ×
            </button>
          </div>
        )}

        {/* Body */}
        <div
          style={{
            padding: '20px 24px',
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
              padding: '16px 24px 20px',
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
