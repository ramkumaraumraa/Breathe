import { useState } from 'react'

export interface KayoRadioOption {
  value: string
  label: string
}

export interface KayoBrutalistRadioGroupProps {
  options: KayoRadioOption[]
  value?: string | null
  defaultValue?: string
  onChange?: (value: string) => void
  disabled?: boolean
  horizontal?: boolean
}

export function KayoBrutalistRadioGroup({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  disabled = false,
  horizontal = false,
}: KayoBrutalistRadioGroupProps) {
  const [internal, setInternal] = useState<string | null>(defaultValue ?? null)
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internal

  const select = (val: string) => {
    if (disabled) return
    if (!isControlled) setInternal(val)
    onChange?.(val)
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: horizontal ? 'row' : 'column',
      gap: horizontal ? 24 : 12,
      fontFamily: "'DM Sans', system-ui, sans-serif",
      opacity: disabled ? 0.5 : 1,
      flexWrap: horizontal ? 'wrap' : undefined,
    } as React.CSSProperties}>
      {options.map(opt => {
        const selected = opt.value === value
        return (
          <div
            key={opt.value}
            onClick={() => select(opt.value)}
            role="radio"
            aria-checked={selected}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              cursor: disabled ? 'not-allowed' : 'pointer',
              userSelect: 'none',
              WebkitUserSelect: 'none',
            } as React.CSSProperties}
          >
            <div style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              border: `2px solid ${selected ? 'var(--kayo-color-primary, #970103)' : 'var(--kayo-color-border, #3b3d3f)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'border-color 80ms',
            }}>
              {selected && (
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: 'var(--kayo-color-primary, #970103)',
                }} />
              )}
            </div>
            <span style={{ fontSize: 16, lineHeight: '1.4', color: 'var(--kayo-color-foreground, #3b3d3f)' }}>
              {opt.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
