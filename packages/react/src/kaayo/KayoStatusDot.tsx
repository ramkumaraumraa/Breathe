import React, { useId } from 'react'

const STYLE_ID = 'kayo-status-dot-styles'

const CSS = `
@keyframes kayo-breathe {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
.kayo-breathe {
  animation: kayo-breathe 2.4s ease-in-out infinite;
}
@media (prefers-reduced-motion: reduce) {
  .kayo-breathe {
    animation: none !important;
    opacity: 1 !important;
  }
}
`

function injectStyles() {
  if (typeof document === 'undefined') return
  if (document.getElementById(STYLE_ID)) return
  const el = document.createElement('style')
  el.id = STYLE_ID
  el.textContent = CSS
  document.head.appendChild(el)
}

export type DotStatus = 'active' | 'live' | 'inactive' | 'pending' | 'upcoming' | 'info'

export interface KayoStatusDotProps {
  status: DotStatus
  size?: 8 | 6 | 5
  /** White dot / ring on a selected (Primary/500) background */
  inverse?: boolean
  /** Breathing opacity loop (1 <-> 0.5 every 2.4s) */
  breathing?: boolean
  className?: string
  style?: React.CSSProperties
  'aria-label'?: string
}

export function statusDotPaint(status: DotStatus, inverse = false) {
  if (status === 'upcoming') {
    return {
      fill: null,
      ring: inverse ? 'var(--kayo-color-neutral-25, #ffffff)' : 'var(--kayo-color-neutral-400, #9FA0A2)',
      glow: null,
    }
  }

  const DOT_FILL: Record<Exclude<DotStatus, 'upcoming'>, string> = {
    active: 'var(--kayo-color-positive-500, #01971A)',
    live: 'var(--kayo-color-positive-500, #01971A)',
    inactive: 'var(--kayo-color-negative-500, #DC2626)',
    pending: 'var(--kayo-color-alert-500, #F5590B)',
    info: 'var(--kayo-color-supportive-500, #266FDC)',
  }

  return {
    fill: inverse ? 'var(--kayo-color-neutral-25, #ffffff)' : DOT_FILL[status],
    ring: null,
    glow: status === 'live' ? 'var(--kayo-palette-positive-200, #7BC988)' : null,
  }
}

export function KayoStatusDot({
  status,
  size = 8,
  inverse = false,
  breathing = false,
  className,
  style,
  'aria-label': ariaLabel,
}: KayoStatusDotProps) {
  injectStyles()
  const rawId = useId()
  const filterId = `status-dot-glow-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`

  const { fill, ring, glow } = statusDotPaint(status, inverse)
  const r = size / 2
  const canvas = glow ? size * 2 : size
  const c = canvas / 2

  const dotSvg = (
    <span
      className={className}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        flexShrink: 0,
        ...style,
      }}
      aria-label={ariaLabel ?? `Status: ${status}`}
      role="status"
    >
      <svg
        width={canvas}
        height={canvas}
        viewBox={`0 0 ${canvas} ${canvas}`}
        style={
          glow
            ? {
                position: 'absolute',
                left: -r,
                top: -r,
                pointerEvents: 'none',
              }
            : undefined
        }
      >
        {glow ? (
          <>
            <defs>
              <radialGradient id={filterId} cx="50%" cy="50%" r="50%">
                <stop offset="50%" stopColor={glow} stopOpacity={1} />
                <stop offset="100%" stopColor={glow} stopOpacity={0} />
              </radialGradient>
            </defs>
            <circle cx={c} cy={c} r={c} fill={`url(#${filterId})`} />
          </>
        ) : null}
        {fill ? <circle cx={c} cy={c} r={r} fill={fill} /> : null}
        {ring ? <circle cx={c} cy={c} r={r - 0.5} stroke={ring} strokeWidth={1} fill="none" /> : null}
      </svg>
    </span>
  )

  if (breathing) {
    return <span className="kayo-breathe" style={{ display: 'inline-flex' }}>{dotSvg}</span>
  }

  return dotSvg
}

