import React, { useId, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { KayoChip } from './KayoChip'

export type NotifierCategory = 'positive' | 'negative' | 'alert' | 'supportive' | 'neutral'

interface NotifierRamp {
  tint: string
  50: string
  75: string
  100: string
  500: string
  900: string
  975: string
}

const NOTIFIER_RAMPS: Record<NotifierCategory, NotifierRamp> = {
  positive: {
    tint: 'var(--kayo-notifier-positive-tint, #e1f3e4)',
    50: 'var(--kayo-palette-positive-50, #ccead1)',
    75: 'var(--kayo-palette-positive-75, #b8e2bf)',
    100: 'var(--kayo-palette-positive-100, #a4daad)',
    500: 'var(--kayo-palette-positive-500, #01971a)',
    900: 'var(--kayo-palette-positive-900, #10481d)',
    975: 'var(--kayo-palette-positive-975, #162a1e)',
  },
  negative: {
    tint: 'var(--kayo-notifier-negative-tint, #fbe5e5)',
    50: 'var(--kayo-palette-negative-50, #f8d4d4)',
    75: 'var(--kayo-palette-negative-75, #f5c2c2)',
    100: 'var(--kayo-palette-negative-100, #f2b1b1)',
    500: 'var(--kayo-palette-negative-500, #dc2626)',
    900: 'var(--kayo-palette-negative-900, #5f1f22)',
    975: 'var(--kayo-palette-negative-975, #301c20)',
  },
  alert: {
    tint: 'var(--kayo-notifier-alert-tint, #feebe2)',
    50: 'var(--kayo-palette-alert-50, #fddece)',
    75: 'var(--kayo-palette-alert-75, #fcd1bb)',
    100: 'var(--kayo-palette-alert-100, #fbc3a7)',
    500: 'var(--kayo-palette-alert-500, #f5590b)',
    900: 'var(--kayo-palette-alert-900, #683118)',
    975: 'var(--kayo-palette-alert-975, #33221d)',
  },
  supportive: {
    tint: 'var(--kayo-notifier-supportive-tint, #d4e2f8)',
    50: 'var(--kayo-palette-supportive-50, #d4e2f8)',
    75: 'var(--kayo-palette-supportive-75, #bfcfed)',
    100: 'var(--kayo-palette-supportive-100, #adc6e9)',
    500: 'var(--kayo-palette-supportive-500, #266fdc)',
    900: 'var(--kayo-palette-supportive-900, #1a3459)',
    975: 'var(--kayo-palette-supportive-975, #081018)',
  },
  neutral: {
    tint: 'var(--kayo-notifier-neutral-tint, #f8f8f8)',
    50: 'var(--kayo-color-neutral-50, #f3f4f4)',
    75: 'var(--kayo-color-neutral-75, #f0f1f1)',
    100: 'var(--kayo-color-neutral-100, #e4e5e6)',
    500: 'var(--kayo-color-neutral-500, #757678)',
    900: 'var(--kayo-color-neutral-900, #2a2c30)',
    975: 'var(--kayo-color-neutral-975, #0d1014)',
  },
}

const WAVES = [
  {
    key: 'back',
    fillStop: '50' as const,
    d: 'M315 0H206C248 21 212 60.2 236 86.8C252 106.4 288 117.6 315 133V0Z',
    shadow: { dx: -6, dy: 6, blur: 8 },
  },
  {
    key: 'front',
    fillStop: '75' as const,
    d: 'M315 0H252C280 19.6 244 54.6 268 81.2C282 98 300 105 315 112V0Z',
    shadow: { dx: -5, dy: 5, blur: 6 },
  },
] as const

export interface KayoNotificationBannerProps {
  category: NotifierCategory
  title: string
  message: string
  /** Inset date pill ("SAT 12 OCT 5:30 PM") */
  dateLabel?: string
  actionLabel?: string
  /** 52 × 42 sticker art floated on waves */
  sticker?: React.ReactNode
  onClick?: () => void
  onPress?: () => void
  className?: string
  style?: React.CSSProperties
  testID?: string
}

function renderStickerNode(sticker: React.ReactNode) {
  if (!sticker) return null
  if (React.isValidElement(sticker)) return sticker
  if (typeof sticker === 'function' || (typeof sticker === 'object' && sticker !== null && 'render' in sticker)) {
    const Comp = sticker as unknown as React.ComponentType<{ size?: number; strokeWidth?: number }>
    return <Comp size={32} strokeWidth={2} />
  }
  return sticker
}

export function KayoNotificationBanner({
  category,
  title,
  message,
  dateLabel,
  actionLabel,
  sticker,
  onClick,
  onPress,
  className,
  style,
  testID,
}: KayoNotificationBannerProps) {
  const [pressed, setPressed] = useState(false)
  const rawId = useId()
  const idPrefix = `nb-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`
  const ramp = NOTIFIER_RAMPS[category]

  const handleClick = () => {
    onClick?.()
    onPress?.()
  }

  return (
    <div
      className={className}
      data-testid={testID}
      style={{
        borderRadius: 'var(--kayo-radius-lg, 12px)',
        boxShadow: 'var(--kayo-clay-raised-lg, -6px -6px 14px 0px #ffffff, 8px 10px 22px 0px #fed0bd)',
        boxSizing: 'border-box',
        transition: 'transform 120ms ease',
        transform: pressed ? 'scale(0.98)' : 'none',
        ...style,
      }}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleClick()
          }
        }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
        aria-label={[title, message, actionLabel].filter(Boolean).join('. ')}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '8px',
          minHeight: '133px',
          padding: '9px 8px',
          borderRadius: 'var(--kayo-radius-lg, 12px)',
          backgroundColor: '#ffffff',
          overflow: 'hidden',
          cursor: 'pointer',
          userSelect: 'none',
          boxSizing: 'border-box',
        }}
      >
        {/* Category surface tint */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: ramp.tint,
            opacity: 0.6,
            pointerEvents: 'none',
          }}
        />

        {/* Waves SVG */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 315 133"
            preserveAspectRatio="none"
            style={{ display: 'block', width: '100%', height: '100%' }}
          >
            <defs>
              {WAVES.map((w) => (
                <filter
                  key={w.key}
                  id={`${idPrefix}-${w.key}`}
                  filterUnits="userSpaceOnUse"
                  x="120"
                  y="-60"
                  width="300"
                  height="260"
                >
                  <feOffset in="SourceAlpha" dx={w.shadow.dx} dy={w.shadow.dy} result="shadowOffset" />
                  <feGaussianBlur in="shadowOffset" stdDeviation={w.shadow.blur} result="shadowBlur" />
                  <feFlood floodColor={ramp[100]} floodOpacity="1" result="shadowColor" />
                  <feComposite in="shadowColor" in2="shadowBlur" operator="in" result="dropShadow" />
                  <feOffset in="SourceAlpha" dx="2" dy="2" result="lightOffset" />
                  <feGaussianBlur in="lightOffset" stdDeviation="1" result="lightBlur" />
                  <feComposite in="SourceAlpha" in2="lightBlur" operator="out" result="lightEdge" />
                  <feFlood floodColor="#ffffff" floodOpacity="1" result="lightColor" />
                  <feComposite in="lightColor" in2="lightEdge" operator="in" result="innerLight" />
                  <feMerge>
                    <feMergeNode in="dropShadow" />
                    <feMergeNode in="SourceGraphic" />
                    <feMergeNode in="innerLight" />
                  </feMerge>
                </filter>
              ))}
            </defs>
            {WAVES.map((w) => (
              <path
                key={w.key}
                d={w.d}
                fill={ramp[w.fillStop]}
                filter={`url(#${idPrefix}-${w.key})`}
              />
            ))}
          </svg>
        </div>

        {/* Content Body */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <h4
              style={{
                fontFamily: "var(--kayo-font-family, 'DM Sans', system-ui, sans-serif)",
                fontSize: '16px',
                lineHeight: '24px',
                fontWeight: 600,
                color: 'var(--kayo-color-neutral-950, #17191D)',
                margin: '0 0 4px 0',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {title}
            </h4>
            <p
              style={{
                fontFamily: "var(--kayo-font-family, 'DM Sans', system-ui, sans-serif)",
                fontSize: '14px',
                lineHeight: '20px',
                fontWeight: 400,
                color: 'var(--kayo-color-neutral-800, #3A3B3F)',
                margin: 0,
                maxWidth: '68%',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {message}
            </p>
          </div>
          {sticker && (
            <div
              style={{
                width: '64px',
                height: '64px',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {renderStickerNode(sticker)}
            </div>
          )}
        </div>

        {/* Bottom Action Row */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '8px',
            padding: '3px 0',
          }}
        >
          {dateLabel ? (
            <KayoChip label={dateLabel.toUpperCase()} tone={category} size="md" />
          ) : null}
          <div style={{ flex: 1 }} />
          {actionLabel ? (
            <div style={{ position: 'relative', paddingRight: '2px', paddingBottom: '2px' }}>
              {/* Hard shadow layer */}
              <div
                style={{
                  position: 'absolute',
                  top: '2px',
                  left: '2px',
                  right: 0,
                  bottom: 0,
                  borderRadius: 'var(--kayo-radius-pill, 9999px)',
                  backgroundColor: ramp[975],
                }}
              />
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '3px 4px 3px 10px',
                  border: `1.5px solid ${ramp[900]}`,
                  borderRadius: 'var(--kayo-radius-pill, 9999px)',
                  backgroundColor: '#ffffff',
                  transform: pressed ? 'translate(2px, 2px)' : 'none',
                  transition: 'transform 120ms ease',
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--kayo-font-family, 'DM Sans', system-ui, sans-serif)",
                    fontSize: '12px',
                    lineHeight: '16px',
                    fontWeight: 600,
                    letterSpacing: 0,
                    textTransform: 'none',
                    color: ramp[975],
                    whiteSpace: 'nowrap',
                  }}
                >
                  {actionLabel}
                </span>
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: 'var(--kayo-radius-pill, 9999px)',
                    backgroundColor: ramp[500],
                    boxShadow: `1px 2px 4px 0px ${ramp[100]}, inset 1px 1px 2px 0px #ffffff`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <ArrowRight size={12} color="#ffffff" strokeWidth={2.5} />
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* 1px White top rim catch */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'var(--kayo-radius-lg, 12px)',
            boxShadow: 'inset 0px 1px 0px 0px #ffffff',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  )
}

// Alias matching React Native naming
export const NotificationBanner = KayoNotificationBanner

