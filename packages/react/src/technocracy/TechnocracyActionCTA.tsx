import { ReactNode, CSSProperties } from 'react'

export type TechnocracyActionVariant = 'primary' | 'secondary' | 'danger'

export interface TechnocracyActionCTAProps {
  label: string
  onClick?: () => void
  variant?: TechnocracyActionVariant
  disabled?: boolean
  iconLeft?: ReactNode
  style?: CSSProperties
}

const variantStyles: Record<TechnocracyActionVariant, CSSProperties> = {
  primary: {
    color: '#02130d',
    backgroundColor: '#00dc82',
    borderColor: 'transparent',
  },
  secondary: {
    color: '#f2f5fa',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderColor: 'rgba(255, 255, 255, 0.22)',
  },
  danger: {
    color: '#190303',
    backgroundColor: '#ff4444',
    borderColor: 'transparent',
  },
}

export function TechnocracyActionCTA({
  label,
  onClick,
  variant = 'primary',
  disabled = false,
  iconLeft,
  style,
}: TechnocracyActionCTAProps) {
  const vStyle = variantStyles[variant]

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        minHeight: '36px',
        padding: '8px 14px',
        border: `1px solid ${vStyle.borderColor}`,
        borderRadius: 0,
        backgroundColor: vStyle.backgroundColor,
        color: vStyle.color,
        fontSize: '12px',
        fontWeight: 700,
        fontFamily: "'Source Code Pro', ui-monospace, monospace",
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.42 : 1,
        transition: 'transform 0.15s, filter 0.15s',
        userSelect: 'none',
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translateY(-1px)'
          e.currentTarget.style.filter = 'brightness(1.08)'
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'none'
          e.currentTarget.style.filter = 'none'
        }
      }}
    >
      {iconLeft}
      <span>{label}</span>
    </button>
  )
}
