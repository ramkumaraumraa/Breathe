import { useState, useEffect, ReactNode } from 'react'

export type KayoButtonVariant = 'primary' | 'secondary' | 'destructive' | 'ghost'
export type KayoButtonSize = 'sm' | 'md' | 'lg'

export interface KayoBrutalistButtonProps {
  label: string
  variant?: KayoButtonVariant
  size?: KayoButtonSize
  iconLeft?: ReactNode
  iconRight?: ReactNode
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onPress?: () => void
}

const variantColors: Record<KayoButtonVariant, { background: string; color: string }> = {
  primary:     { background: 'var(--kayo-color-primary, #970103)',  color: 'var(--kayo-color-primary-foreground, #ffffff)' },
  secondary:   { background: '#ffffff',                              color: 'var(--kayo-color-foreground, #3b3d3f)' },
  destructive: { background: 'var(--kayo-color-negative, #dc2626)', color: '#ffffff' },
  ghost:       { background: 'transparent',                          color: 'var(--kayo-color-foreground, #3b3d3f)' },
}

const sizeTokens: Record<KayoButtonSize, { pH: number; pV: number; minH: number; fs: number }> = {
  sm: { pH: 12, pV: 8,  minH: 36, fs: 14 },
  md: { pH: 16, pV: 12, minH: 44, fs: 16 },
  lg: { pH: 20, pV: 16, minH: 52, fs: 16 },
}

export function KayoBrutalistButton({
  label,
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  onPress,
}: KayoBrutalistButtonProps) {
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    const id = 'kayo-btn-keyframes'
    if (!document.getElementById(id)) {
      const s = document.createElement('style')
      s.id = id
      s.textContent = '@keyframes kayo-spin { to { transform: rotate(360deg); } }'
      document.head.appendChild(s)
    }
  }, [])

  const isGhost = variant === 'ghost'
  const colors = variantColors[variant]
  const { pH, pV, minH, fs } = sizeTokens[size]
  const isInteractive = !disabled && !loading
  const isPressed = pressed && isInteractive && !isGhost

  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    fontFamily: "'DM Sans', system-ui, sans-serif",
    fontWeight: 500,
    fontSize: fs,
    paddingLeft: pH,
    paddingRight: pH,
    paddingTop: pV,
    paddingBottom: pV,
    minHeight: minH,
    borderRadius: 'var(--kayo-radius-default, 8px)',
    border: '2px solid var(--kayo-color-border, #3b3d3f)',
    background: disabled ? '#e5e7eb' : colors.background,
    color: disabled ? '#a8a8aa' : colors.color,
    boxShadow: disabled
      ? 'none'
      : isGhost || isPressed
        ? 'none'
        : 'var(--kayo-shadow-sm, 2px 2px 0 #191b1f)',
    transform: isPressed ? 'translate(2px, 2px)' : 'none',
    transition: 'transform 80ms, box-shadow 80ms',
    cursor: disabled ? 'not-allowed' : loading ? 'default' : 'pointer',
    pointerEvents: loading ? 'none' : undefined,
    width: fullWidth ? '100%' : undefined,
    userSelect: 'none',
    WebkitUserSelect: 'none' as never,
    outline: 'none',
    lineHeight: 1.2,
  }

  return (
    <button
      type="button"
      disabled={disabled}
      style={style}
      onClick={(e) => {
        if (isInteractive) {
          if (onClick) onClick(e)
          else if (onPress) onPress()
        }
      }}
      onMouseDown={() => isInteractive && setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
    >
      {loading ? (
        <span
          style={{
            display: 'inline-block',
            width: 16,
            height: 16,
            borderRadius: '50%',
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            animation: 'kayo-spin 0.7s linear infinite',
            flexShrink: 0,
          }}
        />
      ) : (
        <>
          {iconLeft}
          <span>{label}</span>
          {iconRight}
        </>
      )}
    </button>
  )
}
