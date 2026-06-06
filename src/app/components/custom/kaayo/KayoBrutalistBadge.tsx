export type KayoBadgeVariant =
  | 'default'
  | 'secondary'
  | 'outline'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'destructive'

export interface KayoBrutalistBadgeProps {
  variant?: KayoBadgeVariant
  children: React.ReactNode
}

const VARIANTS: Record<KayoBadgeVariant, { bg: string; text: string; border: string }> = {
  default:     { bg: 'var(--kayo-color-primary, #970103)',   text: '#ffffff',  border: 'var(--kayo-color-primary, #970103)' },
  secondary:   { bg: '#f9fafb',                              text: '#3b3d3f',  border: 'var(--kayo-color-border, #3b3d3f)' },
  outline:     { bg: 'transparent',                          text: '#3b3d3f',  border: 'var(--kayo-color-border, #3b3d3f)' },
  success:     { bg: '#f0fdf4',                              text: '#166534',  border: '#4ade80' },
  warning:     { bg: '#fffbeb',                              text: '#92400e',  border: '#fbbf24' },
  danger:      { bg: '#fff1f2',                              text: '#9f1239',  border: '#fca5a5' },
  info:        { bg: '#f0f9ff',                              text: '#0369a1',  border: '#7dd3fc' },
  destructive: { bg: '#fef2f2',                              text: '#dc2626',  border: '#fca5a5' },
}

export function KayoBrutalistBadge({
  variant = 'default',
  children,
}: KayoBrutalistBadgeProps) {
  const c = VARIANTS[variant]
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px 10px',
        fontSize: 12,
        fontWeight: 700,
        lineHeight: '1.5',
        letterSpacing: '0.01em',
        fontFamily: "'DM Sans', system-ui, sans-serif",
        borderRadius: 999,
        border: `2px solid ${c.border}`,
        backgroundColor: c.bg,
        color: c.text,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  )
}
