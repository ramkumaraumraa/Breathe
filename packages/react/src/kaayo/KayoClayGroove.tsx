import React from 'react'
import { Check, X } from 'lucide-react'
import { KayoClayKnob } from './KayoClayKnob'

const BAR_TONE = {
  primary: 'var(--kayo-color-primary-500, #970103)',
  positive: 'var(--kayo-palette-positive-500, #01971A)',
} as const

export interface ClayGrooveBar {
  tone: keyof typeof BAR_TONE
  /** 0-1 of the groove width from the left edge (default 1 = full) */
  progress?: number
  style?: React.CSSProperties
}

/** 8px-high groove; 4px-high bars from the left edge */
export function KayoClayGrooveTrack({
  bars = [],
  className,
  style,
  'aria-label': ariaLabel,
}: {
  bars?: ClayGrooveBar[]
  className?: string
  style?: React.CSSProperties
  'aria-label'?: string
}) {
  return (
    <div
      className={className}
      role="progressbar"
      aria-label={ariaLabel}
      style={{
        position: 'relative',
        height: '8px',
        width: '100%',
        borderRadius: 'var(--kayo-radius-pill, 9999px)',
        backgroundColor: 'var(--kayo-color-secondary-50, #FFF1EA)',
        boxShadow: 'var(--kayo-clay-inset-sm, inset 2px 2px 4px 0px #fed0bd, inset -2px -2px 4px 0px #ffffff)',
        overflow: 'hidden',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {bars.map((b, i) => {
        const pct = Math.min(1, Math.max(0, b.progress ?? 1)) * 100
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 0,
              top: '2px',
              height: '4px',
              width: `${pct}%`,
              borderRadius: 'var(--kayo-radius-pill, 9999px)',
              backgroundColor: BAR_TONE[b.tone],
              transition: 'width 200ms ease-out',
              ...b.style,
            }}
          />
        )
      })}
    </div>
  )
}

/** Present (green) then absent (red), the rest unmarked */
export function KayoClayGrooveSplit({
  present,
  absent,
  unmarked,
  thin = false,
  className,
  style,
  'aria-label': ariaLabel,
}: {
  present: number
  absent: number
  unmarked: number
  thin?: boolean
  className?: string
  style?: React.CSSProperties
  'aria-label'?: string
}) {
  const h = thin ? 4 : 8
  const pad = thin ? 2 : 3

  return (
    <div
      className={className}
      role="meter"
      aria-label={ariaLabel ?? `Present: ${present}, Absent: ${absent}, Unmarked: ${unmarked}`}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: `${pad}px`,
        borderRadius: 'var(--kayo-radius-pill, 9999px)',
        backgroundColor: 'var(--kayo-color-secondary-50, #FFF1EA)',
        boxShadow: 'var(--kayo-clay-inset-sm, inset 2px 2px 4px 0px #fed0bd, inset -2px -2px 4px 0px #ffffff)',
        overflow: 'hidden',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {present > 0 && (
        <div
          style={{
            flex: present,
            height: `${h}px`,
            backgroundColor: 'var(--kayo-palette-positive-500, #01971A)',
            borderRadius: 'var(--kayo-radius-pill, 9999px)',
          }}
        />
      )}
      {absent > 0 && (
        <div
          style={{
            flex: absent,
            height: `${h}px`,
            backgroundColor: 'var(--kayo-palette-negative-500, #DC2626)',
            borderRadius: 'var(--kayo-radius-pill, 9999px)',
          }}
        />
      )}
      {unmarked > 0 && (
        <div
          style={{
            flex: unmarked,
            height: `${h}px`,
          }}
        />
      )}
    </div>
  )
}

type Mark = 'present' | 'absent'

/**
 * Two 40x32 slots: unlit = bare icon, lit = KayoClayKnob Positive / Negative lit.
 */
export function KayoClayGrooveToggle({
  mark,
  onToggle,
  name,
  locked = false,
  disabled = false,
  className,
  style,
  testIDSuffix,
}: {
  mark: Mark | undefined
  onToggle: (mark: Mark) => void
  name: string
  locked?: boolean
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
  testIDSuffix?: string
}) {
  const isDisabled = locked || disabled

  return (
    <div
      role="radiogroup"
      aria-label={`Attendance for ${name}`}
      className={className}
      style={{
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '4px',
        padding: '4px',
        borderRadius: 'var(--kayo-radius-pill, 9999px)',
        backgroundColor: locked
          ? 'var(--kayo-color-neutral-75, #F0F1F1)'
          : 'var(--kayo-color-secondary-50, #FFF1EA)',
        boxShadow: 'var(--kayo-clay-inset-sm, inset 2px 2px 4px 0px #fed0bd, inset -2px -2px 4px 0px #ffffff)',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {(['present', 'absent'] as const).map((m) => {
        const lit = mark === m
        const Icon = m === 'present' ? Check : X
        const iconColor = locked
          ? 'var(--kayo-color-neutral-400, #9FA0A2)'
          : m === 'present'
            ? 'var(--kayo-palette-positive-600, #05831B)'
            : 'var(--kayo-palette-negative-600, #BD2425)'

        return (
          <button
            key={m}
            type="button"
            role="radio"
            aria-checked={lit}
            aria-label={`${name} ${m}`}
            disabled={isDisabled}
            onClick={() => onToggle(m)}
            data-testid={testIDSuffix ? `${m}-${testIDSuffix}` : undefined}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '32px',
              padding: 0,
              border: 'none',
              background: 'transparent',
              cursor: isDisabled ? 'not-allowed' : 'pointer',
              userSelect: 'none',
              borderRadius: 'var(--kayo-radius-pill, 9999px)',
            }}
          >
            {lit ? (
              <KayoClayKnob state={m === 'present' ? 'positiveLit' : 'negativeLit'} />
            ) : (
              <Icon size={18} color={iconColor} strokeWidth={m === 'present' ? 2 : 2.5} />
            )}
          </button>
        )
      })}
    </div>
  )
}

// Aliases matching React Native naming
export const ClayGrooveTrack = KayoClayGrooveTrack
export const ClayGrooveSplit = KayoClayGrooveSplit
export const ClayGrooveToggle = KayoClayGrooveToggle

export const KayoClayGroove = {
  Track: KayoClayGrooveTrack,
  Split: KayoClayGrooveSplit,
  Toggle: KayoClayGrooveToggle,
}

