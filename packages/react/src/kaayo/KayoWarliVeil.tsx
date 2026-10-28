import React from 'react'

const STYLE_ID = 'kayo-warli-veil-styles'

const CSS = `
@keyframes kayo-veil-rise {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.kayo-veil-enter {
  animation: kayo-veil-rise 220ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@media (prefers-reduced-motion: reduce) {
  .kayo-veil-enter {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
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

export type WarliVeilKind = 'amount' | 'count'

export const VEIL_MOTIFS: Record<WarliVeilKind, number> = { amount: 4, count: 3 }

export function formatRupees(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function veilRevealText(value: number | string, kind: WarliVeilKind): string {
  if (typeof value === 'string') return value
  return kind === 'amount' ? formatRupees(value) : String(value)
}

export interface KayoWarliVeilProps {
  value: number | string
  visible: boolean
  kind?: WarliVeilKind
  className?: string
  style?: React.CSSProperties
  textStyle?: React.CSSProperties
  testID?: string
  'aria-label'?: string
}

/** Rounded diamond outline with a centre dot (Figma 74509:53190, 20×20 viewBox) */
const DIAMOND_PATH =
  'M8.5791 0.585693C9.36009 -0.19519 10.6262 -0.195112 11.4072 0.585693L19.4014 8.57983C20.1823 9.36086 20.1823 10.6269 19.4014 11.408L11.4072 19.4021C10.6752 20.134 9.51691 20.18 8.73145 19.5398L8.5791 19.4021L0.584961 11.408C-0.146995 10.6758 -0.192216 9.51764 0.448242 8.73218L0.584961 8.57983L8.5791 0.585693ZM10.7002 1.29272C10.3097 0.902444 9.67659 0.902365 9.28613 1.29272L1.29199 9.28687C0.901742 9.67733 0.901755 10.3105 1.29199 10.7009L9.28613 18.6951C9.6766 19.0854 10.3097 19.0854 10.7002 18.6951L18.6943 10.7009C19.0847 10.3104 19.0847 9.67737 18.6943 9.28687L10.7002 1.29272ZM9.99219 8.91187C10.5899 8.91187 11.0742 9.39619 11.0742 9.9939C11.0742 10.5916 10.5899 11.0759 9.99219 11.0759C9.39461 11.0758 8.9102 10.5915 8.91016 9.9939C8.91016 9.39626 9.39458 8.91198 9.99219 8.91187Z'

export function KayoWarliVeil({
  value,
  visible,
  kind = 'amount',
  className,
  style,
  textStyle,
  testID,
  'aria-label': ariaLabel,
}: KayoWarliVeilProps) {
  injectStyles()

  const defaultColor = 'var(--kayo-color-foreground, #17191D)'
  const color = textStyle?.color ?? defaultColor
  const fontSize = typeof textStyle?.fontSize === 'number'
    ? textStyle.fontSize
    : typeof textStyle?.fontSize === 'string'
      ? parseInt(textStyle.fontSize, 10) || 16
      : 16
  const glyph = Math.round(fontSize * 0.75)

  const accessibilityLabel =
    ariaLabel ??
    (visible
      ? veilRevealText(value, kind)
      : kind === 'amount'
        ? 'Amount hidden'
        : 'Count hidden')

  return (
    <span
      key={visible ? 'shown' : 'veiled'}
      className={`kayo-veil-enter ${className ?? ''}`}
      data-testid={testID}
      aria-label={accessibilityLabel}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        verticalAlign: 'middle',
        userSelect: 'none',
        ...style,
      }}
    >
      {visible ? (
        <span
          style={{
            fontFamily: "var(--kayo-font-family, 'DM Sans', system-ui, sans-serif)",
            fontWeight: 700,
            whiteSpace: 'nowrap',
            ...textStyle,
          }}
        >
          {veilRevealText(value, kind)}
        </span>
      ) : (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: `${Math.max(3, glyph * 0.3)}px`,
            whiteSpace: 'nowrap',
          }}
        >
          {kind === 'amount' && (
            <span
              style={{
                fontFamily: "var(--kayo-font-family, 'DM Sans', system-ui, sans-serif)",
                fontWeight: 700,
                ...textStyle,
              }}
            >
              ₹
            </span>
          )}
          {Array.from({ length: VEIL_MOTIFS[kind] }, (_, i) => (
            <svg
              key={i}
              width={glyph}
              height={glyph}
              viewBox="0 0 20 20"
              style={{ display: 'inline-block', flexShrink: 0 }}
            >
              <path d={DIAMOND_PATH} fill={String(color)} />
            </svg>
          ))}
        </span>
      )}
    </span>
  )
}

// Alias matching React Native naming
export const WarliVeil = KayoWarliVeil

