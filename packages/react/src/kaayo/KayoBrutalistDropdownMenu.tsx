import { useState, useRef, useEffect, ReactNode, CSSProperties } from 'react'

const STYLE_ID = 'kayo-dropdown-styles'

export type DropdownItem =
  | {
      type: 'item'
      label: string
      icon?: ReactNode
      shortcut?: string
      destructive?: boolean
      disabled?: boolean
      onClick?: () => void
    }
  | { type: 'separator' }
  | { type: 'label'; text: string }

export interface KayoBrutalistDropdownMenuProps {
  trigger: ReactNode
  items: DropdownItem[]
  align?: 'start' | 'end'
}

export function KayoBrutalistDropdownMenu({
  trigger,
  items,
  align = 'start',
}: KayoBrutalistDropdownMenuProps) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return
    const s = document.createElement('style')
    s.id = STYLE_ID
    s.textContent = `
      .kayo-dd-item { background: transparent; transition: background 80ms; }
      .kayo-dd-item:not(.kayo-dd-disabled):hover { background: var(--kayo-color-muted, #f4f4f4); }
      .kayo-dd-item.kayo-dd-destructive:not(.kayo-dd-disabled):hover { background: #fff5f5; }
    `
    document.head.appendChild(s)
  }, [])

  useEffect(() => {
    if (!open) return
    const handleOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleOutside)
    document.addEventListener('keydown', handleEsc)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('keydown', handleEsc)
    }
  }, [open])

  return (
    <div ref={wrapperRef} style={{ position: 'relative', display: 'inline-block' }}>
      <div onClick={() => setOpen(o => !o)} style={{ display: 'inline-block' }}>
        {trigger}
      </div>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            ...(align === 'end' ? { right: 0 } : { left: 0 }),
            minWidth: 200,
            backgroundColor: '#ffffff',
            border: '2px solid var(--kayo-color-border, #3b3d3f)',
            borderRadius: 6,
            boxShadow: '4px 4px 0 #191b1f',
            zIndex: 100,
            overflow: 'hidden',
            fontFamily: "'DM Sans', system-ui, sans-serif",
          } as CSSProperties}
        >
          {items.map((item, i) => {
            if (item.type === 'separator') {
              return (
                <div
                  key={i}
                  style={{ height: 2, backgroundColor: 'var(--kayo-color-border, #3b3d3f)', margin: '2px 0' }}
                />
              )
            }
            if (item.type === 'label') {
              return (
                <div
                  key={i}
                  style={{
                    padding: '6px 14px 3px',
                    fontSize: 11,
                    fontWeight: 600,
                    color: '#a8a8aa',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  } as CSSProperties}
                >
                  {item.text}
                </div>
              )
            }
            const classNames = [
              'kayo-dd-item',
              item.destructive ? 'kayo-dd-destructive' : '',
              item.disabled ? 'kayo-dd-disabled' : '',
            ].filter(Boolean).join(' ')

            return (
              <div
                key={i}
                className={classNames}
                onClick={() => {
                  if (!item.disabled) {
                    item.onClick?.()
                    setOpen(false)
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 14px',
                  fontSize: 14,
                  color: item.disabled
                    ? '#a8a8aa'
                    : item.destructive
                    ? '#dc2626'
                    : 'var(--kayo-color-foreground, #3b3d3f)',
                  cursor: item.disabled ? 'not-allowed' : 'pointer',
                  opacity: item.disabled ? 0.5 : 1,
                } as CSSProperties}
              >
                {item.icon && (
                  <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0, width: 16, height: 16 }}>
                    {item.icon}
                  </span>
                )}
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.shortcut && (
                  <span style={{ fontSize: 11, color: '#a8a8aa', fontFamily: 'monospace', letterSpacing: '0.03em', flexShrink: 0 }}>
                    {item.shortcut}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
