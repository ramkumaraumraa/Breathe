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
        border: '1px solid rgba(255, 255, 255, 0.11)',
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.035)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        fontFamily: "'Source Code Pro', ui-monospace, monospace",
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          color: '#8b94a7',
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
          color: '#f2f5fa',
          fontSize: '28px',
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        {value}
      </span>

      {detail && (
        <div style={{ marginTop: '10px', color: '#8b94a7', fontSize: '11px' }}>
          {detail}
        </div>
      )}
    </div>
  )
}
