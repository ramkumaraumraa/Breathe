import { ReactNode } from 'react'

export interface KayoBrutalistEmptyStateProps {
  title: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
}

export function KayoBrutalistEmptyState({
  title,
  description,
  icon,
  action,
}: KayoBrutalistEmptyStateProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '36px 24px',
        textAlign: 'center',
        borderRadius: 'var(--kayo-radius-default, 8px)',
        border: '2px dashed var(--kayo-color-border, #191b1f)',
        background: '#f8f8f9',
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      {icon && <div style={{ marginBottom: '12px', color: 'var(--kayo-color-primary, #970103)' }}>{icon}</div>}
      <h4 style={{ margin: '0 0 6px 0', fontSize: '16px', fontWeight: 700, color: '#14161a' }}>
        {title}
      </h4>
      {description && (
        <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#747476', maxWidth: '320px', lineHeight: 1.4 }}>
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  )
}
