import { Eye, EyeOff } from 'lucide-react'

export interface KayoBrutalistAmountVisibilityToggleProps {
  visible: boolean
  onToggle: () => void
  label?: string
}

export function KayoBrutalistAmountVisibilityToggle({
  visible,
  onToggle,
  label,
}: KayoBrutalistAmountVisibilityToggleProps) {
  const Icon = visible ? Eye : EyeOff

  return (
    <button
      type="button"
      onClick={onToggle}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 12px',
        borderRadius: 'var(--kayo-radius-default, 8px)',
        border: '2px solid var(--kayo-color-border, #191b1f)',
        background: '#ffffff',
        color: 'var(--kayo-color-foreground, #14161a)',
        boxShadow: 'var(--kayo-shadow-sm, 2px 2px 0 #191b1f)',
        cursor: 'pointer',
        fontSize: '12px',
        fontWeight: 600,
        fontFamily: "'DM Sans', system-ui, sans-serif",
        userSelect: 'none',
        transition: 'transform 80ms, box-shadow 80ms',
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'translate(2px, 2px)'
        e.currentTarget.style.boxShadow = 'none'
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'none'
        e.currentTarget.style.boxShadow = 'var(--kayo-shadow-sm, 2px 2px 0 #191b1f)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none'
        e.currentTarget.style.boxShadow = 'var(--kayo-shadow-sm, 2px 2px 0 #191b1f)'
      }}
    >
      <Icon size={14} strokeWidth={2.25} />
      {label && <span>{label}</span>}
    </button>
  )
}
