export interface TechnocracyProgressBarProps {
  value: number // 0-100
  label?: string
  color?: string
}

export function TechnocracyProgressBar({
  value,
  label,
  color = '#00dc82',
}: TechnocracyProgressBarProps) {
  const percent = Math.min(100, Math.max(0, value))

  return (
    <div style={{ fontFamily: "'Source Code Pro', ui-monospace, monospace" }}>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#8b94a7', textTransform: 'uppercase', marginBottom: '4px' }}>
          <span>{label}</span>
          <span>{percent}%</span>
        </div>
      )}
      <div
        style={{
          height: '8px',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.11)',
          background: 'rgba(0, 0, 0, 0.28)',
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
