import React from 'react'
import type { LucideIcon } from 'lucide-react'
import { KayoStatusDot, type DotStatus } from './KayoStatusDot'

export type ChipTone = 'secondary' | 'primary' | 'positive' | 'alert' | 'supportive' | 'negative' | 'neutral'

export function chipTone(tone: ChipTone): { fill: string; shade: string; ink: string } {
  switch (tone) {
    case 'secondary':
      return {
        fill: 'var(--kayo-color-secondary-25, #FFF7F3)',
        shade: 'var(--kayo-color-secondary-200, #FED0BD)',
        ink: 'var(--kayo-color-neutral-800, #3A3B3F)',
      }
    case 'primary':
      return {
        fill: 'var(--kayo-palette-primary-25, #FFF0F1)',
        shade: 'var(--kayo-palette-primary-100, #FFCDD0)',
        ink: 'var(--kayo-palette-primary-900, #461215)',
      }
    case 'positive':
      return {
        fill: 'var(--kayo-palette-positive-25, #E1F3E4)',
        shade: 'var(--kayo-palette-positive-100, #A4DAAD)',
        ink: 'var(--kayo-palette-positive-900, #10481D)',
      }
    case 'alert':
      return {
        fill: 'var(--kayo-palette-alert-25, #FEEBE2)',
        shade: 'var(--kayo-palette-alert-100, #FBC3A7)',
        ink: 'var(--kayo-palette-alert-900, #683118)',
      }
    case 'supportive':
      return {
        fill: 'var(--kayo-palette-supportive-25, #EBF2FC)',
        shade: 'var(--kayo-palette-supportive-100, #BBD5F6)',
        ink: 'var(--kayo-palette-supportive-900, #16396E)',
      }
    case 'negative':
      return {
        fill: 'var(--kayo-palette-negative-25, #FBE5E5)',
        shade: 'var(--kayo-palette-negative-100, #F2B1B1)',
        ink: 'var(--kayo-palette-negative-900, #5F1F22)',
      }
    case 'neutral':
    default:
      return {
        fill: 'var(--kayo-color-neutral-25, #F8F8F8)',
        shade: 'var(--kayo-color-neutral-100, #E4E5E6)',
        ink: 'var(--kayo-color-neutral-900, #2A2C30)',
      }
  }
}

export interface KayoChipProps {
  label: string
  tone?: ChipTone
  size?: 'sm' | 'md' | 'count'
  /** A KayoStatusDot (size 8) before the label */
  dot?: DotStatus
  /** A Lucide icon component or ready React element */
  icon?: LucideIcon | React.ReactNode
  iconPosition?: 'leading' | 'trailing'
  iconColor?: string
  className?: string
  style?: React.CSSProperties
  'aria-label'?: string
}

const PAD: Record<'sm' | 'md' | 'count', { px: number; py: number }> = {
  sm: { px: 8, py: 3 },
  md: { px: 10, py: 5 },
  count: { px: 10, py: 4 },
}

export function KayoChip({
  label,
  tone = 'secondary',
  size = 'sm',
  dot,
  icon,
  iconPosition = 'leading',
  iconColor,
  className,
  style,
  'aria-label': ariaLabel,
}: KayoChipProps) {
  const t = chipTone(tone)
  const ink = size === 'count' ? 'var(--kayo-color-neutral-950, #17191D)' : t.ink
  const iconSize = iconPosition === 'trailing' && size === 'md' ? 14 : 12
  const { px, py } = PAD[size]

  // Render icon if provided as Lucide component or React element
  let iconNode: React.ReactNode = null
  if (icon) {
    if (React.isValidElement(icon)) {
      iconNode = icon
    } else {
      const IconComponent = icon as React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>
      iconNode = <IconComponent size={iconSize} color={iconColor ?? ink} strokeWidth={2.5} />
    }
  }

  const isCount = size === 'count'

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: `${py}px ${px}px`,
        backgroundColor: t.fill,
        borderRadius: 'var(--kayo-radius-pill, 9999px)',
        boxShadow: `inset 2px 2px 4px 0px ${t.shade}, inset -2px -2px 4px 0px #ffffff`,
        userSelect: 'none',
        flexShrink: 1,
        ...style,
      }}
      aria-label={ariaLabel}
    >
      {dot ? <KayoStatusDot status={dot} size={8} /> : null}
      {iconPosition === 'leading' ? iconNode : null}
      <span
        style={{
          fontFamily: "var(--kayo-font-family, 'DM Sans', system-ui, sans-serif)",
          fontSize: isCount ? '14px' : '10px',
          lineHeight: isCount ? '20px' : '14px',
          fontWeight: 600,
          letterSpacing: 0,
          textTransform: 'none', // Sentence case!
          color: ink,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {label}
      </span>
      {iconPosition === 'trailing' ? iconNode : null}
    </span>
  )
}

