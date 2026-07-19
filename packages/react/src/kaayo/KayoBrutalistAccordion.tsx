import { useState, useEffect, ReactNode } from 'react'

const STYLE_ID = 'kayo-accordion-styles'

export interface KayoAccordionItem {
  value: string
  trigger: string
  content: ReactNode
  icon?: ReactNode
  badge?: string | number
  disabled?: boolean
}

export interface KayoBrutalistAccordionProps {
  items: KayoAccordionItem[]
  type?: 'single' | 'multiple'
  defaultOpen?: string | string[]
}

export function KayoBrutalistAccordion({
  items,
  type = 'single',
  defaultOpen,
}: KayoBrutalistAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(() => {
    if (!defaultOpen) return new Set()
    const arr = Array.isArray(defaultOpen) ? defaultOpen : [defaultOpen]
    return new Set(arr)
  })

  useEffect(() => {
    if (!document.getElementById(STYLE_ID)) {
      const s = document.createElement('style')
      s.id = STYLE_ID
      s.textContent = `
        .kayo-acc-chevron { transition: transform 200ms ease; display: flex; flex-shrink: 0; }
        .kayo-acc-chevron.open { transform: rotate(180deg); }
      `
      document.head.appendChild(s)
    }
  }, [])

  const toggle = (value: string) => {
    setOpenItems(prev => {
      const next = new Set(prev)
      if (next.has(value)) {
        next.delete(value)
      } else {
        if (type === 'single') next.clear()
        next.add(value)
      }
      return next
    })
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      fontFamily: "'DM Sans', system-ui, sans-serif",
      width: '100%',
    }}>
      {items.map(item => {
        const isOpen = openItems.has(item.value)
        const isDisabled = !!item.disabled

        return (
          <div
            key={item.value}
            style={{
              border: `2px solid ${isDisabled ? '#d1d5db' : 'var(--kayo-color-border, #3b3d3f)'}`,
              borderRadius: '6px',
              boxShadow: isOpen ? '4px 4px 0 #191b1f' : isDisabled ? 'none' : '2px 2px 0 #191b1f',
              overflow: 'hidden',
              transition: 'box-shadow 200ms',
              background: 'var(--kayo-color-background, #ffffff)',
            }}
          >
            <button
              disabled={isDisabled}
              onClick={() => toggle(item.value)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 16px',
                background: 'none',
                border: 'none',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: 600,
                color: isDisabled
                  ? '#a8a8aa'
                  : 'var(--kayo-color-foreground, #3b3d3f)',
                outline: 'none',
              }}
            >
              {item.icon && (
                <span style={{ flexShrink: 0, display: 'flex', color: 'inherit' }}>
                  {item.icon}
                </span>
              )}
              <span style={{ flex: 1 }}>{item.trigger}</span>
              {item.badge !== undefined && (
                <span style={{
                  fontSize: '11px',
                  background: 'var(--kayo-color-muted, #f4f4f4)',
                  border: '1px solid var(--kayo-color-border, #3b3d3f)',
                  borderRadius: '999px',
                  padding: '1px 7px',
                  fontWeight: 500,
                  color: 'var(--kayo-color-foreground, #3b3d3f)',
                  flexShrink: 0,
                }}>
                  {item.badge}
                </span>
              )}
              <span className={`kayo-acc-chevron${isOpen ? ' open' : ''}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </button>
            {isOpen && (
              <div style={{
                borderTop: '2px solid var(--kayo-color-border, #3b3d3f)',
                padding: '12px 16px 16px',
                fontSize: '13px',
                color: 'var(--kayo-color-foreground, #3b3d3f)',
                lineHeight: '1.6',
              }}>
                {item.content}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
