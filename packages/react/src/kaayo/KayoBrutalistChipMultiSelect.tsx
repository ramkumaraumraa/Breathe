import { useState } from 'react'
import { Check, X } from 'lucide-react'

export interface KayoChipOption {
  id: string
  label: string
}

export interface KayoBrutalistChipMultiSelectProps {
  options: KayoChipOption[]
  selectedIds: string[]
  onChange: (selectedIds: string[]) => void
  label?: string
}

export function KayoBrutalistChipMultiSelect({
  options,
  selectedIds,
  onChange,
  label,
}: KayoBrutalistChipMultiSelectProps) {
  const toggleOption = (id: string) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((item) => item !== id))
    } else {
      onChange([...selectedIds, id])
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {label && (
        <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--kayo-color-foreground, #14161a)' }}>
          {label}
        </label>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {options.map((opt) => {
          const isSelected = selectedIds.includes(opt.id)
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => toggleOption(opt.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: 'var(--kayo-radius-pill, 999px)',
                border: '2px solid var(--kayo-color-border, #191b1f)',
                background: isSelected ? 'var(--kayo-color-primary, #970103)' : '#ffffff',
                color: isSelected ? '#ffffff' : '#14161a',
                fontSize: '12px',
                fontWeight: 600,
                boxShadow: isSelected ? 'none' : 'var(--kayo-shadow-sm, 2px 2px 0 #191b1f)',
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'all 100ms ease',
              }}
            >
              {isSelected ? <Check size={14} strokeWidth={2.5} /> : null}
              <span>{opt.label}</span>
              {isSelected && <X size={12} strokeWidth={2.5} style={{ marginLeft: '2px' }} />}
            </button>
          )
        })}
      </div>
    </div>
  )
}
