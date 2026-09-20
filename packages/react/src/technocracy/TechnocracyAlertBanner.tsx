import { ReactNode } from 'react'

export type TechnocracyAlertVariant = 'warning' | 'critical' | 'info'

export interface TechnocracyAlertBannerProps {
  message: ReactNode
  variant?: TechnocracyAlertVariant
  onDismiss?: () => void
}

const variantStyles: Record<TechnocracyAlertVariant, { borderLeft: string; bg: string }> = {
  warning: { borderLeft: 'var(--thcy-color-signal-amber)', bg: 'var(--thcy-color-alert-warning-bg)' },
  critical: { borderLeft: 'var(--thcy-color-signal-red)', bg: 'var(--thcy-color-alert-critical-bg)' },
  info: { borderLeft: 'var(--thcy-color-signal-blue)', bg: 'var(--thcy-color-alert-info-bg)' },
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
        border: '1px solid var(--thcy-color-border)',
        borderLeft: `3px solid ${st.borderLeft}`,
        background: st.bg,
        color: 'var(--thcy-color-foreground)',
        fontSize: '12px',
        fontFamily: "var(--thcy-font-family)",
      }}
    >
      <div>{message}</div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          style={{
            border: 0,
            color: 'var(--thcy-color-foreground)',
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
