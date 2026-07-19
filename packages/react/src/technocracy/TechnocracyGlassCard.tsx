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
        border: active ? '1px solid #00dc82' : '1px solid rgba(255, 255, 255, 0.11)',
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.035)',
        boxShadow: active
          ? 'inset 3px 0 #00dc82, inset 0 1px rgba(255,255,255,0.04)'
          : 'inset 0 1px rgba(255,255,255,0.04)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        color: '#f2f5fa',
        fontFamily: "'Source Code Pro', ui-monospace, monospace",
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
            color: '#e0575a',
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
