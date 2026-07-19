import { ReactNode } from 'react'

export interface KayoBrutalistScreenFooterButtonProps {
  children: ReactNode
  sticky?: boolean
}

export function KayoBrutalistScreenFooterButton({
  children,
  sticky = true,
}: KayoBrutalistScreenFooterButtonProps) {
  return (
    <div
      style={{
        position: sticky ? 'sticky' : 'relative',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        backgroundColor: '#ffffff',
        borderTop: '2px solid var(--kayo-color-border, #191b1f)',
        padding: '12px 16px',
        boxShadow: '0 -4px 12px rgba(0,0,0,0.05)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      {children}
    </div>
  )
}
