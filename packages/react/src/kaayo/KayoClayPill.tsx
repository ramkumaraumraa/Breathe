import React, { useState } from 'react'
import type { LucideIcon } from 'lucide-react'

export interface KayoClayPillProps {
  label: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onPress?: () => void
  /** Leading icon component or node, drawn 14px */
  icon?: LucideIcon | React.ReactNode
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
  testID?: string
  'aria-label'?: string
}

export function KayoClayPill({
  label,
  onClick,
  onPress,
  icon,
  disabled = false,
  className,
  style,
  testID,
  'aria-label': ariaLabel,
}: KayoClayPillProps) {
  const [pressed, setPressed] = useState(false)

  const ink = 'var(--kayo-color-secondary-975, #2C1A10)'
  const border = 'var(--kayo-color-secondary-900, #6C3E17)'
  const bg = 'var(--kayo-color-secondary-500, #FDA581)'
  const shadow = '2px 2px 0 var(--kayo-color-secondary-975, #2C1A10)'

  let iconNode: React.ReactNode = null
  if (icon) {
    if (React.isValidElement(icon)) {
      iconNode = icon
    } else {
      const IconComponent = icon as React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>
      iconNode = <IconComponent size={14} color={ink} strokeWidth={2} />
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return
    onClick?.(e)
    onPress?.()
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      onMouseDown={() => !disabled && setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      aria-label={ariaLabel}
      data-testid={testID}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 12px',
        borderRadius: 'var(--kayo-radius-pill, 9999px)',
        border: `1.5px solid ${border}`,
        backgroundColor: bg,
        boxShadow: pressed || disabled ? 'none' : shadow,
        transform: pressed ? 'translate(2px, 2px)' : 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
        transition: 'transform 80ms ease, box-shadow 80ms ease',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {iconNode}
      <span
        style={{
          fontFamily: "var(--kayo-font-family, 'DM Sans', system-ui, sans-serif)",
          fontSize: '14px',
          lineHeight: '20px',
          fontWeight: 600,
          color: ink,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    </button>
  )
}

// Alias matching React Native naming
export const ClayPill = KayoClayPill

