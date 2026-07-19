import { ReactNode } from 'react'

export type TechnocracySignalColor = 'green' | 'amber' | 'red' | 'blue' | 'muted'

export interface TechnocracySignalBadgeProps {
  label: string
  color?: TechnocracySignalColor
  icon?: ReactNode
}

const colorMap: Record<TechnocracySignalColor, string> = {
  green: '#00dc82',
  amber: '#f0a30a',
  red: '#ff4444',
  blue: '#4da6ff',
  muted: '#8b94a7',
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
        fontFamily: "'Source Code Pro', ui-monospace, monospace",
      }}
    >
      {icon || <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: colorMap[color] }} />}
      <span>{label}</span>
    </span>
  )
}
