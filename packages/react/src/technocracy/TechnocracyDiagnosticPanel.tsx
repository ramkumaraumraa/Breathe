import { ReactNode } from 'react'

export interface DiagnosticItem {
  key: string
  label: string
  value: ReactNode
}

export interface TechnocracyDiagnosticPanelProps {
  items: DiagnosticItem[]
}

export function TechnocracyDiagnosticPanel({ items }: TechnocracyDiagnosticPanelProps) {
  return (
    <div
      style={{
        position: 'relative',
        border: '1px solid rgba(255, 68, 68, 0.35)',
        borderRadius: '16px',
        overflow: 'hidden',
        background: '#0b0e18',
        fontFamily: "'Source Code Pro', ui-monospace, monospace",
      }}
    >
      <dl style={{ display: 'grid', gap: '1px', margin: 0, background: 'rgba(255, 255, 255, 0.11)' }}>
        {items.map((item) => (
          <div
            key={item.key}
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(100px, 0.35fr) 1fr',
              gap: '14px',
              padding: '9px 12px',
              background: '#0b0e18',
              fontSize: '12px',
            }}
          >
            <dt style={{ color: '#8b94a7', textTransform: 'uppercase', fontSize: '11px' }}>{item.label}</dt>
            <dd style={{ margin: 0, color: '#f2f5fa', overflowWrap: 'anywhere' }}>{item.value}</dd>
          </div>
        ))}
      </dl>
      <span style={{ position: 'absolute', right: '12px', bottom: '8px', color: '#e0575a', fontSize: '12px' }}>
        ✚
      </span>
    </div>
  )
}
