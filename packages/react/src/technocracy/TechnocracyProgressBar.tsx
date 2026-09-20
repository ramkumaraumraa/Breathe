export interface TechnocracyProgressBarProps {
  value: number // 0-100
  label?: string
  color?: string
}

export function TechnocracyProgressBar({
  value,
  label,
  color = 'var(--thcy-color-signal-green)',
}: TechnocracyProgressBarProps) {
  const percent = Math.min(100, Math.max(0, value))

  return (
    <div style={{ fontFamily: "var(--thcy-font-family)" }}>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--thcy-color-foreground-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>
          <span>{label}</span>
          <span>{percent}%</span>
        </div>
      )}
      <div
        style={{
          height: '8px',
          overflow: 'hidden',
          border: '1px solid var(--thcy-color-border)',
          background: 'var(--thcy-color-well)',
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: '100%',
            backgroundColor: color,
            transition: 'width 0.3s ease',
          }}
        />
      </div>
    </div>
  )
}
