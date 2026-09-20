import { ReactNode } from 'react'

export interface TechnocracyStatTileProps {
  label: string
  value: string | number
  detail?: string
  badge?: ReactNode
}

export function TechnocracyStatTile({
  label,
  value,
  detail,
  badge,
}: TechnocracyStatTileProps) {
  return (
    <div
      style={{
        padding: '20px',
        border: '1px solid var(--thcy-color-border)',
        borderRadius: '16px',
        background: 'var(--thcy-color-glass)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        fontFamily: "var(--thcy-font-family)",
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          color: 'var(--thcy-color-foreground-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          fontSize: '11px',
        }}
      >
        <span>{label}</span>
        {badge}
      </div>

      <span
        style={{
          display: 'block',
          marginTop: '18px',
          color: 'var(--thcy-color-foreground)',
          fontSize: '28px',
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        {value}
      </span>

      {detail && (
        <div style={{ marginTop: '10px', color: 'var(--thcy-color-foreground-secondary)', fontSize: '11px' }}>
          {detail}
        </div>
      )}
    </div>
  )
}
