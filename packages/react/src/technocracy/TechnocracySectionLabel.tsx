import { ReactNode } from 'react'

export interface TechnocracySectionLabelProps {
  title: string
  marker?: string | number
  action?: ReactNode
}

export function TechnocracySectionLabel({
  title,
  marker = '1',
  action,
}: TechnocracySectionLabelProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto auto minmax(24px, 1fr) auto',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '14px',
        fontFamily: "'Source Code Pro', ui-monospace, monospace",
      }}
    >
      <span style={{ color: '#00dc82', fontSize: '10px', fontWeight: 700 }}>
        [{marker}]
      </span>

      <h2
        style={{
          margin: 0,
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: '#f2f5fa',
        }}
      >
        {title}
      </h2>

      <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.11)' }} />

      {action && <div>{action}</div>}
    </div>
  )
}
