import { ReactNode } from 'react'

export type TechnocracySignalColor = 'green' | 'amber' | 'red' | 'blue' | 'muted'

export interface TechnocracySignalBadgeProps {
  label: string
  color?: TechnocracySignalColor
  icon?: ReactNode
}

const colorMap: Record<TechnocracySignalColor, string> = {
  green: 'var(--thcy-color-signal-green)',
  amber: 'var(--thcy-color-signal-amber)',
  red: 'var(--thcy-color-signal-red)',
  blue: 'var(--thcy-color-signal-blue)',
  muted: 'var(--thcy-color-signal-muted)',
}

export function TechnocracySignalBadge({
  label,
  color = 'green',
  icon,
}: TechnocracySignalBadgeProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: '10px',
        fontWeight: 700,
        letterSpacing: '0.05em',
        color: colorMap[color],
        whiteSpace: 'nowrap',
        textTransform: 'uppercase',
        fontFamily: "var(--thcy-font-family)",
      }}
    >
      {icon || <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: colorMap[color] }} />}
      <span>{label}</span>
    </span>
  )
}
