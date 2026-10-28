export type KayoBadgeVariant =
  | 'default'
  | 'secondary'
  | 'outline'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'destructive'
  | 'positive'
  | 'alert'
  | 'negative'
  | 'supportive'
  | 'neutral'
  | 'primary'

export interface KayoBrutalistBadgeProps {
  variant?: KayoBadgeVariant
  size?: 'sm' | 'md'
  children: React.ReactNode
}

const VARIANTS: Record<KayoBadgeVariant, { bg: string; text: string; border: string }> = {
  default:     { bg: 'var(--kayo-color-primary, #970103)',                  text: '#ffffff',                                       border: 'var(--kayo-color-primary, #970103)' },
  primary:     { bg: 'var(--kayo-color-primary-500, #970103)',              text: '#ffffff',                                       border: 'var(--kayo-color-primary-500, #970103)' },
  secondary:   { bg: 'var(--kayo-color-secondary-50, #FFEDE6)',             text: 'var(--kayo-color-secondary-800, #906352)',      border: 'var(--kayo-color-secondary-300, #FEC2A9)' },
  outline:     { bg: 'transparent',                                         text: 'var(--kayo-color-neutral-950, #17191D)',        border: 'var(--kayo-color-border-strong, #17191D)' },
  positive:    { bg: 'var(--kayo-color-positive-50, #CCEAD1)',              text: 'var(--kayo-color-positive-700, #096F1C)',       border: 'var(--kayo-color-positive-500, #01971A)' },
  success:     { bg: 'var(--kayo-color-positive-50, #CCEAD1)',              text: 'var(--kayo-color-positive-700, #096F1C)',       border: 'var(--kayo-color-positive-500, #01971A)' },
  alert:       { bg: 'var(--kayo-color-alert-50, #FDDECE)',                 text: 'var(--kayo-color-alert-700, #AF4511)',          border: 'var(--kayo-color-alert-500, #F5590B)' },
  warning:     { bg: 'var(--kayo-color-alert-50, #FDDECE)',                 text: 'var(--kayo-color-alert-700, #AF4511)',          border: 'var(--kayo-color-alert-500, #F5590B)' },
  negative:    { bg: 'var(--kayo-color-negative-50, #F8D4D4)',              text: 'var(--kayo-color-negative-700, #9E2224)',       border: 'var(--kayo-color-negative-500, #DC2626)' },
  danger:      { bg: 'var(--kayo-color-negative-50, #F8D4D4)',              text: 'var(--kayo-color-negative-700, #9E2224)',       border: 'var(--kayo-color-negative-500, #DC2626)' },
  destructive: { bg: 'var(--kayo-color-negative-50, #F8D4D4)',              text: 'var(--kayo-color-negative-700, #9E2224)',       border: 'var(--kayo-color-negative-500, #DC2626)' },
  supportive:  { bg: 'var(--kayo-color-supportive-50, #D4E2F8)',            text: 'var(--kayo-color-supportive-700, #2254A0)',     border: 'var(--kayo-color-supportive-500, #266FDC)' },
  info:        { bg: 'var(--kayo-color-supportive-50, #D4E2F8)',            text: 'var(--kayo-color-supportive-700, #2254A0)',     border: 'var(--kayo-color-supportive-500, #266FDC)' },
  neutral:     { bg: 'var(--kayo-color-neutral-75, #F0F1F1)',               text: 'var(--kayo-color-neutral-800, #3A3B3F)',        border: 'var(--kayo-color-neutral-200, #D9DADB)' },
}

export function KayoBrutalistBadge({
  variant = 'default',
  size = 'md',
  children,
}: KayoBrutalistBadgeProps) {
  const c = VARIANTS[variant]
  const isSm = size === 'sm'

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: isSm ? '2px 8px' : '4px 10px',
        fontSize: isSm ? 10 : 12,
        fontWeight: 600,
        lineHeight: isSm ? '14px' : '16px',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        fontFamily: "'DM Sans', system-ui, sans-serif",
        borderRadius: 999,
        border: `1px solid ${c.border}`,
        backgroundColor: c.bg,
        color: c.text,
        whiteSpace: 'nowrap',
        userSelect: 'none',
      }}
    >
      {children}
    </span>
  )
}
