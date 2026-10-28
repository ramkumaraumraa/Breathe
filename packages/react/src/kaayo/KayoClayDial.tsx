import React from 'react'
import { KayoSegmentRing } from './KayoSegmentRing'

const DIALS = {
  inset: {
    dial: 76,
    ring: 64,
    stroke: 64 * 0.12, // ~7.68px
    maxGapDeg: 7,
    empty: 'var(--kayo-color-secondary-200, #FED0BD)',
    clay: 'var(--kayo-clay-inset-sm, inset 2px 2px 4px 0px #fed0bd, inset -2px -2px 4px 0px #ffffff)',
    valueFontSize: '18px',
    valueLineHeight: '26px',
    valueColor: 'var(--kayo-color-neutral-950, #17191D)',
    captionColor: 'var(--kayo-color-neutral-600, #757678)',
    captionLetterSpacing: '0.5px',
  },
  raised: {
    dial: 92,
    ring: 80,
    stroke: 5.6,
    maxGapDeg: 16,
    empty: 'var(--kayo-color-secondary-100, #FEE7D5)',
    clay: 'var(--kayo-clay-raised-md, -4px -4px 10px 0px #ffffff, 5px 6px 14px 0px #fed0bd)',
    valueFontSize: '24px',
    valueLineHeight: '32px',
    valueColor: 'var(--kayo-color-primary-500, #970103)',
    captionColor: 'var(--kayo-color-neutral-800, #3A3B3F)',
    captionLetterSpacing: '0',
  },
} as const

export interface KayoClayDialProps {
  variant: 'inset' | 'raised'
  /** One ring segment per item, in order clockwise from 12 o'clock */
  colors: string[]
  /** Ring colour with no items; defaults to variant's empty color */
  emptyColor?: string
  value: string | number
  /** Uppercase caption under the value ("DONE", "BATCHES") */
  caption: string
  className?: string
  style?: React.CSSProperties
  'aria-label'?: string
}

export function KayoClayDial({
  variant,
  colors,
  emptyColor,
  value,
  caption,
  className,
  style,
  'aria-label': ariaLabel,
}: KayoClayDialProps) {
  const d = DIALS[variant]
  const inset = (d.dial - d.ring) / 2

  return (
    <div
      role="meter"
      aria-label={ariaLabel ?? `${caption}: ${value}`}
      className={className}
      style={{
        position: 'relative',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: `${d.dial}px`,
        height: `${d.dial}px`,
        borderRadius: '50%',
        backgroundColor: 'var(--kayo-color-secondary-25, #FFF7F3)',
        boxShadow: d.clay,
        boxSizing: 'border-box',
        userSelect: 'none',
        flexShrink: 0,
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: `${inset}px`,
          left: `${inset}px`,
          pointerEvents: 'none',
        }}
      >
        <KayoSegmentRing
          size={d.ring}
          stroke={d.stroke}
          maxGapDeg={d.maxGapDeg}
          colors={colors}
          emptyColor={emptyColor ?? d.empty}
        />
      </div>
      <span
        style={{
          fontFamily: "var(--kayo-font-family, 'DM Sans', system-ui, sans-serif)",
          fontSize: d.valueFontSize,
          lineHeight: d.valueLineHeight,
          fontWeight: 700,
          color: d.valueColor,
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: "var(--kayo-font-family, 'DM Sans', system-ui, sans-serif)",
          fontSize: '10px',
          lineHeight: '14px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: d.captionLetterSpacing,
          color: d.captionColor,
        }}
      >
        {caption}
      </span>
    </div>
  )
}

// Alias matching React Native naming
export const ClayDial = KayoClayDial

