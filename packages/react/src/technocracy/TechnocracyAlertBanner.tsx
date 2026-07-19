import { ReactNode } from 'react'

export type TechnocracyAlertVariant = 'warning' | 'critical' | 'info'

export interface TechnocracyAlertBannerProps {
  message: ReactNode
  variant?: TechnocracyAlertVariant
  onDismiss?: () => void
}

const variantStyles: Record<TechnocracyAlertVariant, { borderLeft: string; bg: string }> = {
  warning: { borderLeft: '#f0a30a', bg: 'rgba(240, 163, 10, 0.08)' },
  critical: { borderLeft: '#ff4444', bg: 'rgba(255, 68, 68, 0.08)' },
  info: { borderLeft: '#4da6ff', bg: 'rgba(77, 166, 255, 0.08)' },
}

export function TechnocracyAlertBanner({
  message,
  variant = 'warning',
  onDismiss,
}: TechnocracyAlertBannerProps) {
  const st = variantStyles[variant]

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        padding: '12px 14px',
        border: '1px solid rgba(255, 255, 255, 0.11)',
        borderLeft: `3px solid ${st.borderLeft}`,
        background: st.bg,
        color: '#f2f5fa',
        fontSize: '12px',
        fontFamily: "'Source Code Pro', ui-monospace, monospace",
      }}
    >
      <div>{message}</div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          style={{
            border: 0,
            color: '#f2f5fa',
            background: 'transparent',
            cursor: 'pointer',
            fontSize: '16px',
            lineHeight: 1,
          }}
        >
          ×
        </button>
      )}
    </div>
  )
}
