import { useState, ReactNode, CSSProperties } from 'react'

export type KayoCardVariant = 'default' | 'elevated' | 'flat' | 'outlinedClay'

export interface KayoBrutalistCardProps {
  variant?: KayoCardVariant
  onClick?: () => void
  fullWidth?: boolean
  style?: CSSProperties
  children: ReactNode
}

const shadowMap: Record<KayoCardVariant, string> = {
  default:      'var(--kayo-shadow-sm, 2px 2px 0 var(--kayo-color-neutral-950, #17191D))',
  elevated:     'var(--kayo-shadow-md, 4px 4px 0 var(--kayo-color-neutral-950, #17191D))',
  flat:         'none',
  outlinedClay: '2px 2px 0px 0px var(--kayo-color-secondary-700, #B47962), -2px -2px 0px 0px var(--kayo-color-secondary-200, #FED0BD), 8px 10px 22px 0px var(--kayo-color-secondary-200, #FED0BD)',
}

export function KayoBrutalistCard({
  variant = 'default',
  onClick,
  fullWidth = false,
  style,
  children,
}: KayoBrutalistCardProps) {
  const [pressed, setPressed] = useState(false)
  const isInteractive = !!onClick
  const isPressed = pressed && isInteractive
  const isOutlinedClay = variant === 'outlinedClay'

  return (
    <div
      onClick={onClick}
      onMouseDown={() => isInteractive && setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        border: isOutlinedClay
          ? '2px solid var(--kayo-color-secondary-975, #342C2B)'
          : '2px solid var(--kayo-color-border-strong, var(--kayo-color-neutral-950, #17191D))',
        borderRadius: isOutlinedClay ? '24px' : 'var(--kayo-radius-md, 8px)',
        background: 'var(--kayo-color-background, #ffffff)',
        boxShadow: isPressed ? 'none' : shadowMap[variant],
        transform: isPressed ? 'translate(2px, 2px)' : 'none',
        transition: 'transform 80ms, box-shadow 80ms',
        fontFamily: "'DM Sans', system-ui, sans-serif",
        cursor: isInteractive ? 'pointer' : 'default',
        width: fullWidth ? '100%' : undefined,
        overflow: 'hidden',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export interface KayoBrutalistCardHeaderProps {
  title: string
  description?: string
  badge?: ReactNode
  action?: ReactNode
}

export function KayoBrutalistCardHeader({
  title,
  description,
  badge,
  action,
}: KayoBrutalistCardHeaderProps) {
  return (
    <div style={{
      padding: '16px',
      borderBottom: '2px solid var(--kayo-color-border, #3b3d3f)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: '8px',
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{
            fontSize: '15px',
            fontWeight: 600,
            color: 'var(--kayo-color-foreground, #3b3d3f)',
          }}>
            {title}
          </span>
          {badge}
        </div>
        {description && (
          <p style={{ fontSize: '13px', color: 'var(--kayo-color-foreground-secondary, #6b7280)', margin: '4px 0 0' }}>
            {description}
          </p>
        )}
      </div>
      {action && <div style={{ flexShrink: 0 }}>{action}</div>}
    </div>
  )
}

export interface KayoBrutalistCardBodyProps {
  children: ReactNode
}

export function KayoBrutalistCardBody({ children }: KayoBrutalistCardBodyProps) {
  return (
    <div style={{
      padding: '16px',
      fontSize: '14px',
      color: 'var(--kayo-color-foreground, #3b3d3f)',
      lineHeight: '1.6',
    }}>
      {children}
    </div>
  )
}

export interface KayoBrutalistCardFooterProps {
  justify?: 'start' | 'end' | 'between'
  children: ReactNode
}

export function KayoBrutalistCardFooter({
  justify = 'end',
  children,
}: KayoBrutalistCardFooterProps) {
  const justifyMap = {
    start:   'flex-start',
    end:     'flex-end',
    between: 'space-between',
  }
  return (
    <div style={{
      padding: '16px',
      borderTop: '2px solid var(--kayo-color-border, #3b3d3f)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: justifyMap[justify],
      gap: '8px',
    }}>
      {children}
    </div>
  )
}
