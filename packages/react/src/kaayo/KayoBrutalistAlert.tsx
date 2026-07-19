import { ReactNode } from 'react'

export type KayoAlertVariant = 'info' | 'success' | 'warning' | 'error'

export interface KayoBrutalistAlertProps {
  variant?: KayoAlertVariant
  title?: string
  description?: string | ReactNode
  icon?: ReactNode
  dismissible?: boolean
  onDismiss?: () => void
}

const variantConfig: Record<KayoAlertVariant, {
  border: string; accent: string; bg: string; iconColor: string
}> = {
  info:    { border: 'var(--kayo-color-border, #3b3d3f)', accent: 'var(--kayo-color-border, #3b3d3f)', bg: '#f9f9f9', iconColor: 'var(--kayo-color-border, #3b3d3f)' },
  success: { border: '#166534', accent: '#166534', bg: '#f0fdf4', iconColor: '#166534' },
  warning: { border: '#92400e', accent: '#d97706', bg: '#fffbeb', iconColor: '#d97706' },
  error:   { border: 'var(--kayo-color-primary, #970103)', accent: 'var(--kayo-color-primary, #970103)', bg: '#fff5f5', iconColor: 'var(--kayo-color-primary, #970103)' },
}

export function KayoBrutalistAlert({
  variant = 'info',
  title,
  description,
  icon,
  dismissible = false,
  onDismiss,
}: KayoBrutalistAlertProps) {
  const cfg = variantConfig[variant]

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      padding: '12px 16px 12px 20px',
      border: `2px solid ${cfg.border}`,
      borderRadius: '6px',
      background: cfg.bg,
      boxShadow: '2px 2px 0 #191b1f',
      fontFamily: "'DM Sans', system-ui, sans-serif",
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
    }}>
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '4px',
        background: cfg.accent,
      }} />
      {icon && (
        <span style={{ color: cfg.iconColor, flexShrink: 0, marginTop: '1px', display: 'flex' }}>
          {icon}
        </span>
      )}
      <div style={{ flex: 1 }}>
        {title && (
          <div style={{
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--kayo-color-foreground, #191b1f)',
            marginBottom: description ? '4px' : 0,
          }}>
            {title}
          </div>
        )}
        {description && (
          <div style={{ fontSize: '13px', color: '#3b3d3f', lineHeight: '1.5' }}>
            {description}
          </div>
        )}
      </div>
      {dismissible && (
        <button
          onClick={onDismiss}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#3b3d3f',
            padding: '0',
            flexShrink: 0,
            fontSize: '18px',
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
          }}
          aria-label="Dismiss"
        >
          ×
        </button>
      )}
    </div>
  )
}
