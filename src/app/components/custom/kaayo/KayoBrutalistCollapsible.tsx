import { useState, useEffect, ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

const STYLE_ID = 'kayo-collapsible-styles'

export interface KayoBrutalistCollapsibleProps {
  trigger: string | ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: ReactNode
  triggerSide?: 'left' | 'right'
}

export function KayoBrutalistCollapsible({
  trigger,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  children,
  triggerSide = 'right',
}: KayoBrutalistCollapsibleProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? controlledOpen! : internalOpen

  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return
    const s = document.createElement('style')
    s.id = STYLE_ID
    s.textContent = `
      .kayo-coll-chevron { display: flex; align-items: center; transition: transform 200ms; flex-shrink: 0; }
      .kayo-coll-chevron.open { transform: rotate(180deg); }
    `
    document.head.appendChild(s)
  }, [])

  function toggle() {
    const next = !isOpen
    if (!isControlled) setInternalOpen(next)
    onOpenChange?.(next)
  }

  const chevron = (
    <span className={`kayo-coll-chevron${isOpen ? ' open' : ''}`}>
      <ChevronDown size={18} strokeWidth={2} />
    </span>
  )

  return (
    <div
      style={{
        border: '2px solid var(--kayo-color-border, #3b3d3f)',
        borderRadius: 6,
        boxShadow: isOpen ? '4px 4px 0 #191b1f' : '2px 2px 0 #191b1f',
        backgroundColor: '#ffffff',
        fontFamily: "'DM Sans', system-ui, sans-serif",
        transition: 'box-shadow 200ms',
      }}
    >
      <button
        type="button"
        onClick={toggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: triggerSide === 'left' ? 'flex-start' : 'space-between',
          gap: 10,
          padding: '12px 16px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: 14,
          fontWeight: 600,
          fontFamily: 'inherit',
          color: 'var(--kayo-color-foreground, #3b3d3f)',
          textAlign: 'left',
          outline: 'none',
        }}
      >
        {triggerSide === 'left' && chevron}
        <span style={{ flex: 1 }}>{trigger}</span>
        {triggerSide === 'right' && chevron}
      </button>

      {isOpen && (
        <div
          style={{
            borderTop: '2px solid var(--kayo-color-border, #3b3d3f)',
            padding: '12px 16px',
            fontSize: 13,
            color: 'var(--kayo-color-foreground, #3b3d3f)',
            lineHeight: '1.6',
          }}
        >
          {children}
        </div>
      )}
    </div>
  )
}
