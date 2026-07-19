import { Calendar } from 'lucide-react'

export interface KayoBrutalistDateFieldProps {
  value?: string
  placeholder?: string
  label?: string
  onClick?: () => void
  disabled?: boolean
}

export function KayoBrutalistDateField({
  value,
  placeholder = 'Select date',
  label,
  onClick,
  disabled = false,
}: KayoBrutalistDateFieldProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {label && (
        <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--kayo-color-foreground, #14161a)' }}>
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 14px',
          borderRadius: 'var(--kayo-radius-default, 8px)',
          border: '2px solid var(--kayo-color-border, #191b1f)',
          background: disabled ? '#e5e5e7' : '#ffffff',
          color: value ? 'var(--kayo-color-foreground, #14161a)' : '#747476',
          boxShadow: disabled ? 'none' : 'var(--kayo-shadow-sm, 2px 2px 0 #191b1f)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          fontSize: '14px',
          fontWeight: 500,
          userSelect: 'none',
          transition: 'transform 80ms, box-shadow 80ms',
        }}
      >
        <span>{value || placeholder}</span>
        <Calendar size={16} strokeWidth={2.25} color="var(--kayo-color-primary, #970103)" />
      </button>
    </div>
  )
}
