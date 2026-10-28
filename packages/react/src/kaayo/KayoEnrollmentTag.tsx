import React from 'react'
import { MapPin } from 'lucide-react'

const TONES = {
  tertiary: {
    bg: 'var(--kayo-palette-tertiary-50, #EBF0F5)',
    border: 'var(--kayo-palette-tertiary-300, #9DAFBE)',
    pin: 'var(--kayo-palette-tertiary-600, #3B4E63)',
    ink: 'var(--kayo-palette-tertiary-700, #2C3C4E)',
    pinSize: 11,
    px: 8,
    py: 2,
  },
  neutral: {
    bg: 'var(--kayo-color-neutral-75, #F0F1F1)',
    border: 'var(--kayo-color-neutral-500, #757678)',
    pin: 'var(--kayo-color-neutral-800, #3A3B3F)',
    ink: 'var(--kayo-color-neutral-800, #3A3B3F)',
    pinSize: 10,
    px: 6,
    py: 3,
  },
} as const

export interface KayoEnrollmentTagProps {
  label: string
  tone?: keyof typeof TONES
  className?: string
  style?: React.CSSProperties
  testID?: string
  'aria-label'?: string
}

export function KayoEnrollmentTag({
  label,
  tone = 'tertiary',
  className,
  style,
  testID,
  'aria-label': ariaLabel,
}: KayoEnrollmentTagProps) {
  const t = TONES[tone]

  return (
    <span
      className={className}
      data-testid={testID}
      aria-label={ariaLabel}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        maxWidth: '100%',
        padding: `${t.py}px ${t.px}px`,
        backgroundColor: t.bg,
        border: `1px solid ${t.border}`,
        borderRadius: 'var(--kayo-radius-sm, 4px)',
        boxSizing: 'border-box',
        userSelect: 'none',
        flexShrink: 1,
        ...style,
      }}
    >
      <MapPin size={t.pinSize} color={t.pin} strokeWidth={2.25} style={{ flexShrink: 0 }} />
      <span
        style={{
          fontFamily: "var(--kayo-font-family, 'DM Sans', system-ui, sans-serif)",
          fontSize: '10px',
          lineHeight: '14px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          color: t.ink,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          flexShrink: 1,
        }}
      >
        {label}
      </span>
    </span>
  )
}

// Alias matching React Native naming
export const EnrollmentTag = KayoEnrollmentTag

