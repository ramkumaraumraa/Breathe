import React from 'react'
import { Check, X } from 'lucide-react'

export type ClayKnobState = 'open' | 'complete' | 'active' | 'positiveLit' | 'negativeLit' | 'nav' | 'success'

interface KnobConfig {
  size: number
  ink: string
  bg: string
  borderWidth?: number
  borderColor?: string
  boxShadow?: string
}

const KNOB_CONFIGS: Record<ClayKnobState, KnobConfig> = {
  open: {
    size: 32,
    ink: 'var(--kayo-color-neutral-700, #4C4E51)',
    bg: 'var(--kayo-color-neutral-25, #F8F8F8)',
    borderWidth: 1.5,
    borderColor: 'var(--kayo-color-secondary-300, #FEC2A9)',
    boxShadow: 'var(--kayo-clay-raised-sm, -2px -2px 4px 0px #ffffff, 2px 3px 6px 0px #FED0BD)',
  },
  complete: {
    size: 32,
    ink: 'var(--kayo-palette-positive-700, #096F1C)',
    bg: 'var(--kayo-palette-positive-50, #CCEAD1)',
    borderWidth: 1.5,
    borderColor: 'var(--kayo-palette-positive-300, #52B863)',
    boxShadow: '-2px -2px 4px 0px #ffffff, 2px 3px 6px 0px var(--kayo-palette-positive-200, #7BC988)',
  },
  active: {
    size: 32,
    ink: 'var(--kayo-color-neutral-25, #FFFFFF)',
    bg: 'var(--kayo-color-primary-500, #970103)',
    borderWidth: 2,
    borderColor: 'var(--kayo-palette-primary-700, #6F090C)',
    boxShadow: '2px 2px 0 var(--kayo-palette-primary-900, #461215)',
  },
  positiveLit: {
    size: 32,
    ink: 'var(--kayo-color-neutral-25, #FFFFFF)',
    bg: 'var(--kayo-palette-positive-500, #01971A)',
    borderWidth: 1.5,
    borderColor: 'var(--kayo-palette-positive-700, #096F1C)',
    boxShadow: '2px 2px 0 var(--kayo-palette-positive-900, #10481D)',
  },
  negativeLit: {
    size: 32,
    ink: 'var(--kayo-color-neutral-25, #FFFFFF)',
    bg: 'var(--kayo-palette-negative-500, #DC2626)',
    borderWidth: 1.5,
    borderColor: 'var(--kayo-palette-negative-700, #9E2224)',
    boxShadow: '2px 2px 0 var(--kayo-palette-negative-900, #5F1F22)',
  },
  nav: {
    size: 40,
    ink: 'var(--kayo-color-neutral-950, #17191D)',
    bg: 'var(--kayo-color-neutral-25, #F8F8F8)',
    borderWidth: 1,
    borderColor: 'var(--kayo-color-secondary-300, #FEC2A9)',
    boxShadow: '-2px -2px 4px 0px #ffffff, 2px 3px 6px 0px var(--kayo-color-secondary-300, #FEC2A9)',
  },
  success: {
    size: 96,
    ink: 'var(--kayo-color-neutral-25, #FFFFFF)',
    bg: 'var(--kayo-palette-positive-500, #01971A)',
  },
}

export interface KayoClayKnobProps {
  state: ClayKnobState
  /** Custom knob diameter override */
  size?: number
  /** Stepper digit */
  number?: number | string
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  'aria-label'?: string
}

export function KayoClayKnob({
  state,
  size,
  number,
  children,
  className,
  style,
  'aria-label': ariaLabel,
}: KayoClayKnobProps) {
  const cfg = KNOB_CONFIGS[state]
  const d = size ?? cfg.size

  const content =
    children ??
    (number !== undefined ? (
      <span
        style={{
          fontFamily: "var(--kayo-font-family, 'DM Sans', system-ui, sans-serif)",
          fontSize: '14px',
          lineHeight: '20px',
          fontWeight: 600,
          color: cfg.ink,
        }}
      >
        {number}
      </span>
    ) : state === 'positiveLit' ? (
      <Check size={20} color={cfg.ink} strokeWidth={3} />
    ) : state === 'negativeLit' ? (
      <X size={18} color={cfg.ink} strokeWidth={3} />
    ) : null)

  const knobElement = (
    <span
      className={state === 'success' ? undefined : className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: `${d}px`,
        height: `${d}px`,
        borderRadius: 'var(--kayo-radius-pill, 9999px)',
        backgroundColor: cfg.bg,
        border: cfg.borderWidth ? `${cfg.borderWidth}px solid ${cfg.borderColor}` : undefined,
        boxShadow: cfg.boxShadow,
        boxSizing: 'border-box',
        userSelect: 'none',
        flexShrink: 0,
        ...(state === 'success' ? undefined : style),
      }}
      aria-label={ariaLabel}
    >
      {content}
    </span>
  )

  if (state === 'success') {
    return (
      <span
        className={className}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '6px',
          borderRadius: 'var(--kayo-radius-pill, 9999px)',
          backgroundColor: 'var(--kayo-palette-positive-100, #A4DAAD)',
          boxShadow: '-4px -4px 10px 0px #ffffff, 5px 6px 14px 0px var(--kayo-palette-positive-200, #7BC988)',
          boxSizing: 'border-box',
          ...style,
        }}
        aria-label={ariaLabel ?? 'Success'}
      >
        {knobElement}
      </span>
    )
  }

  return knobElement
}

