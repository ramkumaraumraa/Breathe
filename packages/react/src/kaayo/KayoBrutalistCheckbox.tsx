import { useState } from 'react'
import { Check } from 'lucide-react'

export interface KayoBrutalistCheckboxProps {
  label?: string
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  errorText?: string
}

export function KayoBrutalistCheckbox({
  label,
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled = false,
  errorText,
}: KayoBrutalistCheckboxProps) {
  const [internal, setInternal] = useState(defaultChecked)
  const isControlled = controlledChecked !== undefined
  const checked = isControlled ? controlledChecked! : internal

  const toggle = () => {
    if (disabled) return
    const next = !checked
    if (!isControlled) setInternal(next)
    onChange?.(next)
  }

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 4, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div
        onClick={toggle}
        role="checkbox"
        aria-checked={checked}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          userSelect: 'none',
          WebkitUserSelect: 'none',
        } as React.CSSProperties}
      >
        <div style={{
          width: 20,
          height: 20,
          borderRadius: 4,
          border: `2px solid ${checked ? 'var(--kayo-color-primary, #970103)' : 'var(--kayo-color-border, #3b3d3f)'}`,
          backgroundColor: checked ? 'var(--kayo-color-primary, #970103)' : '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'background-color 80ms, border-color 80ms',
        }}>
          {checked && <Check size={12} color="#ffffff" strokeWidth={3} />}
        </div>
        {label && (
          <span style={{
            fontSize: 16,
            lineHeight: '1.4',
            color: disabled
              ? 'var(--kayo-color-foreground-secondary, #6c6d70)'
              : 'var(--kayo-color-foreground, #3b3d3f)',
          }}>
            {label}
          </span>
        )}
      </div>
      {errorText && (
        <span style={{ fontSize: 12, color: 'var(--kayo-color-negative, #dc2626)', fontFamily: 'inherit' }}>
          {errorText}
        </span>
      )}
    </div>
  )
}
