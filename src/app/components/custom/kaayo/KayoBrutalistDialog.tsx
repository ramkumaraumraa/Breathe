import { ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'

export interface KayoBrutalistDialogProps {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  size?: 'sm' | 'md' | 'lg' | 'fullscreen'
  variant?: 'default' | 'destructive'
  showClose?: boolean
  children?: ReactNode
  footer?: ReactNode
  closeOnBackdrop?: boolean
}

const STYLE_ID = 'kayo-dialog-styles'

const sizeMap: Record<
  NonNullable<KayoBrutalistDialogProps['size']>,
  { maxWidth: string; maxHeight: string; borderRadius: string; border: string }
> = {
  sm:         { maxWidth: '400px',  maxHeight: 'auto',  borderRadius: '6px', border: '2px solid #3b3d3f' },
  md:         { maxWidth: '560px',  maxHeight: '80vh',  borderRadius: '6px', border: '2px solid #3b3d3f' },
  lg:         { maxWidth: '760px',  maxHeight: '90vh',  borderRadius: '6px', border: '2px solid #3b3d3f' },
  fullscreen: { maxWidth: '100vw',  maxHeight: '100vh', borderRadius: '0',   border: 'none' },
}

export function KayoBrutalistDialog({
  open,
  onClose,
  title,
  description,
  size = 'md',
  variant = 'default',
  showClose = true,
  children,
  footer,
  closeOnBackdrop = true,
}: KayoBrutalistDialogProps) {
  // Inject CSS once
  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return
    const s = document.createElement('style')
    s.id = STYLE_ID
    s.textContent = `
      @keyframes kayo-dialog-in {
        from { opacity: 0; transform: translate(-50%, -50%) scale(0.95); }
        to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
      }
      .kayo-dialog-panel { animation: kayo-dialog-in 150ms ease-out; }
      .kayo-dialog-close:hover { background: #f4f4f4; }
    `
    document.head.appendChild(s)
  }, [])

  // Escape key handler
  useEffect(() => {
    if (!open) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  const { maxWidth, maxHeight, borderRadius, border } = sizeMap[size]
  const isFullscreen = size === 'fullscreen'

  return createPortal(
    <div
      onClick={closeOnBackdrop !== false ? onClose : undefined}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(25,27,31,0.6)',
        zIndex: 300,
      }}
    >
      <div
        className="kayo-dialog-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isFullscreen ? '100vw' : '90vw',
          maxWidth,
          maxHeight,
          border,
          borderRadius,
          backgroundColor: '#ffffff',
          boxShadow: isFullscreen ? 'none' : '4px 4px 0 #191b1f',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: "'DM Sans', system-ui, sans-serif",
          overflow: 'hidden',
        }}
      >
        {/* Header */}
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
          <div style={{ flex: 1, marginRight: showClose ? '12px' : 0 }}>
            <div
              style={{
                fontWeight: 700,
                fontSize: '18px',
                color: variant === 'destructive' ? '#970103' : '#3b3d3f',
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
          {showClose && (
            <button
              className="kayo-dialog-close"
              onClick={onClose}
              aria-label="Close dialog"
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
          )}
        </div>

        {/* Body */}
        {children && (
          <div
            style={{
              padding: '20px 24px',
              overflowY: 'auto',
              flex: 1,
            }}
          >
            {children}
          </div>
        )}

        {/* Footer */}
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
