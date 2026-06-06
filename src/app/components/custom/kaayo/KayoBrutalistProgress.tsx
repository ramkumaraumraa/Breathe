export interface KayoBrutalistProgressProps {
  value?: number
  label?: string
  showValue?: boolean
}

export function KayoBrutalistProgress({
  value = 0,
  label,
  showValue = false,
}: KayoBrutalistProgressProps) {
  const pct = Math.min(100, Math.max(0, value))

  return (
    <div style={{ width: '100%', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {(label || showValue) && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 6,
          fontSize: 12,
          color: 'var(--kayo-color-foreground-secondary, #6c6d70)',
        }}>
          {label && <span>{label}</span>}
          {showValue && <span style={{ fontWeight: 700, color: 'var(--kayo-color-foreground, #3b3d3f)' }}>{pct}%</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{
          width: '100%',
          height: 12,
          border: '2px solid var(--kayo-color-border, #3b3d3f)',
          borderRadius: 2,
          backgroundColor: '#ffffff',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            backgroundColor: 'var(--kayo-color-primary, #970103)',
            borderRadius: 0,
            transition: 'width 300ms ease',
          }}
        />
      </div>
    </div>
  )
}
