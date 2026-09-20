import { ReactNode, CSSProperties } from 'react'

export interface TechnocracyGlassCardProps {
  children: ReactNode
  active?: boolean
  showCrosshair?: boolean
  className?: string
  style?: CSSProperties
  onClick?: () => void
}

export function TechnocracyGlassCard({
  children,
  active = false,
  showCrosshair = false,
  style,
  onClick,
}: TechnocracyGlassCardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        position: 'relative',
        minWidth: 0,
        padding: '20px',
        overflow: 'hidden',
        border: active ? '1px solid var(--thcy-color-signal-green)' : '1px solid var(--thcy-color-border)',
        borderRadius: '16px',
        background: 'var(--thcy-color-glass)',
        boxShadow: active
          ? 'inset 3px 0 var(--thcy-color-signal-green), inset 0 1px var(--thcy-color-secondary)'
          : 'inset 0 1px var(--thcy-color-secondary)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        color: 'var(--thcy-color-foreground)',
        fontFamily: "var(--thcy-font-family)",
        cursor: onClick ? 'pointer' : 'default',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        ...style,
      }}
    >
      {children}
      {showCrosshair && (
        <span
          style={{
            position: 'absolute',
            right: '12px',
            bottom: '8px',
            color: 'var(--thcy-color-brand)',
            fontSize: '12px',
            pointerEvents: 'none',
          }}
        >
          ✚
        </span>
      )}
    </div>
  )
}
