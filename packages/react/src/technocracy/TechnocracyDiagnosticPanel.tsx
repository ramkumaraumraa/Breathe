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
        border: '1px solid var(--thcy-color-diagnostic-border)',
        borderRadius: '16px',
        overflow: 'hidden',
        background: 'var(--thcy-color-background-secondary)',
        fontFamily: "var(--thcy-font-family)",
      }}
    >
      <dl style={{ display: 'grid', gap: '1px', margin: 0, background: 'var(--thcy-color-border)' }}>
        {items.map((item) => (
          <div
            key={item.key}
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(100px, 0.35fr) 1fr',
              gap: '14px',
              padding: '9px 12px',
              background: 'var(--thcy-color-background-secondary)',
              fontSize: '12px',
            }}
          >
            <dt style={{ color: 'var(--thcy-color-foreground-secondary)', textTransform: 'uppercase', fontSize: '11px' }}>{item.label}</dt>
            <dd style={{ margin: 0, color: 'var(--thcy-color-foreground)', overflowWrap: 'anywhere' }}>{item.value}</dd>
          </div>
        ))}
      </dl>
      <span style={{ position: 'absolute', right: '12px', bottom: '8px', color: 'var(--thcy-color-brand)', fontSize: '12px' }}>
        ✚
      </span>
    </div>
  )
}
