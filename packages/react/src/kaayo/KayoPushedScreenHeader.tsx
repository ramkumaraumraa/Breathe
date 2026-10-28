import React from 'react'
import { ChevronLeft } from 'lucide-react'

export interface KayoPushedScreenHeaderProps {
  /** Where back goes, e.g. "Payments", "Settings", "Back" */
  backLabel: string
  onBack?: () => void
  title?: string
  subtitle?: string
  right?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  testID?: string
}

export function KayoPushedScreenHeader({
  backLabel,
  onBack,
  title,
  subtitle,
  right,
  className,
  style,
  testID,
}: KayoPushedScreenHeaderProps) {
  const handleBack = () => {
    if (onBack) {
      onBack()
    } else if (typeof window !== 'undefined' && window.history) {
      window.history.back()
    }
  }

  const ink = 'var(--kayo-color-neutral-950, #17191D)'
  const subInk = 'var(--kayo-color-neutral-800, #3A3B3F)'

  return (
    <header
      className={className}
      data-testid={testID}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        width: '100%',
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: '44px',
        }}
      >
        <button
          type="button"
          onClick={handleBack}
          aria-label={backLabel === 'Back' ? 'Back' : `Back to ${backLabel}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '2px',
            minHeight: '44px',
            padding: '4px 8px 4px 0',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <ChevronLeft size={20} color={ink} strokeWidth={2.25} />
          <span
            style={{
              fontFamily: "var(--kayo-font-family, 'DM Sans', system-ui, sans-serif)",
              fontSize: '16px',
              lineHeight: '24px',
              fontWeight: 500,
              color: ink,
            }}
          >
            {backLabel}
          </span>
        </button>
        {right && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {right}
          </div>
        )}
      </div>

      {title ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <h2
            style={{
              fontFamily: "var(--kayo-font-family, 'DM Sans', system-ui, sans-serif)",
              fontSize: '24px',
              lineHeight: '32px',
              fontWeight: 600,
              color: ink,
              margin: 0,
            }}
          >
            {title}
          </h2>
          {subtitle ? (
            <p
              style={{
                fontFamily: "var(--kayo-font-family, 'DM Sans', system-ui, sans-serif)",
                fontSize: '14px',
                lineHeight: '20px',
                fontWeight: 400,
                color: subInk,
                margin: 0,
              }}
            >
              {subtitle}
            </p>
          ) : null}
        </div>
      ) : null}
    </header>
  )
}

// Alias matching React Native naming
export const PushedScreenHeader = KayoPushedScreenHeader

