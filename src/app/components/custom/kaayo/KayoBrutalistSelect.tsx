import { useState, useRef, useEffect } from 'react'
import { ChevronDown, ChevronUp, Check } from 'lucide-react'

export interface KayoSelectOption {
  value: string
  label: string
  hint?: string
}

export interface KayoBrutalistSelectProps {
  label?: string
  placeholder?: string
  options: KayoSelectOption[]
  mode?: 'single' | 'multi'
  disabled?: boolean
  errorText?: string
}

export function KayoBrutalistSelect({
  label,
  placeholder = 'Select…',
  options,
  mode = 'single',
  disabled = false,
  errorText,
}: KayoBrutalistSelectProps) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const wrapperRef = useRef<HTMLDivElement>(null)

  const hasError = Boolean(errorText)
  const displayLabel = selected.length === 0
    ? null
    : selected.map(v => options.find(o => o.value === v)?.label ?? v).join(', ')

  const triggerBorderColor = hasError
    ? 'var(--kayo-color-negative, #dc2626)'
    : open
      ? 'var(--kayo-color-primary, #970103)'
      : 'var(--kayo-color-border, #3b3d3f)'

  useEffect(() => {
    if (!open) return
    const onOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [open])

  const handleSingle = (val: string) => {
    setSelected([val])
    setOpen(false)
  }

  const handleMultiToggle = (val: string) => {
    setSelected(prev =>
      prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {label && (
        <label style={{ fontSize: 14, fontWeight: 500, color: 'var(--kayo-color-foreground, #3b3d3f)' }}>
          {label}
        </label>
      )}

      <div ref={wrapperRef} style={{ position: 'relative' }}>
        {/* Trigger */}
        <div
          onClick={() => !disabled && setOpen(o => !o)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            border: `2px solid ${triggerBorderColor}`,
            borderRadius: 'var(--kayo-radius-default, 8px)',
            backgroundColor: disabled ? '#f9fafb' : '#ffffff',
            paddingLeft: 12,
            paddingRight: 12,
            minHeight: 48,
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.6 : 1,
            userSelect: 'none',
            transition: 'border-color 80ms',
            boxSizing: 'border-box',
          } as React.CSSProperties}
        >
          <span style={{
            flex: 1,
            fontSize: 16,
            color: displayLabel
              ? 'var(--kayo-color-foreground, #3b3d3f)'
              : 'var(--kayo-color-foreground-secondary, #6c6d70)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {displayLabel ?? placeholder}
          </span>
          <div style={{ flexShrink: 0, color: 'var(--kayo-color-foreground-secondary, #6c6d70)', display: 'flex', alignItems: 'center' }}>
            {open ? <ChevronUp size={20} strokeWidth={2} /> : <ChevronDown size={20} strokeWidth={2} />}
          </div>
        </div>

        {/* Dropdown panel */}
        {open && (
          <div style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            backgroundColor: '#ffffff',
            border: '2px solid var(--kayo-color-border, #3b3d3f)',
            borderRadius: 'var(--kayo-radius-default, 8px)',
            boxShadow: 'var(--kayo-shadow-md, 4px 4px 0 #191b1f)',
            overflow: 'hidden',
            zIndex: 50,
            display: 'flex',
            flexDirection: 'column',
            maxHeight: 280,
          }}>
            <div style={{ overflowY: 'auto', flex: 1 }}>
              {options.map((opt, i) => {
                const isSelected = selected.includes(opt.value)
                return (
                  <div
                    key={opt.value}
                    onClick={() => mode === 'single' ? handleSingle(opt.value) : handleMultiToggle(opt.value)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      paddingLeft: 16,
                      paddingRight: 16,
                      paddingTop: 12,
                      paddingBottom: 12,
                      cursor: 'pointer',
                      borderBottom: i < options.length - 1
                        ? '1px solid var(--kayo-color-background-secondary, #f9fafb)'
                        : 'none',
                      backgroundColor: 'transparent',
                      transition: 'background-color 80ms',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = '#f9fafb' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent' }}
                  >
                    {mode === 'single' ? (
                      <div style={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        border: `2px solid ${isSelected ? 'var(--kayo-color-primary, #970103)' : 'var(--kayo-color-border, #3b3d3f)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        {isSelected && (
                          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--kayo-color-primary, #970103)' }} />
                        )}
                      </div>
                    ) : (
                      <div style={{
                        width: 20,
                        height: 20,
                        borderRadius: 4,
                        border: `2px solid ${isSelected ? 'var(--kayo-color-primary, #970103)' : 'var(--kayo-color-border, #3b3d3f)'}`,
                        backgroundColor: isSelected ? 'var(--kayo-color-primary, #970103)' : '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'background-color 80ms, border-color 80ms',
                      }}>
                        {isSelected && <Check size={12} color="#ffffff" strokeWidth={3} />}
                      </div>
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 16, color: 'var(--kayo-color-foreground, #3b3d3f)', lineHeight: '1.4' }}>
                        {opt.label}
                      </div>
                      {opt.hint && (
                        <div style={{ fontSize: 12, color: 'var(--kayo-color-foreground-secondary, #6c6d70)', marginTop: 2 }}>
                          {opt.hint}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
              {options.length === 0 && (
                <div style={{ padding: 20, fontSize: 14, color: 'var(--kayo-color-foreground-secondary, #6c6d70)', textAlign: 'center' }}>
                  No options yet.
                </div>
              )}
            </div>
            {mode === 'multi' && (
              <div
                onClick={() => setOpen(false)}
                style={{
                  backgroundColor: 'var(--kayo-color-primary, #970103)',
                  padding: '12px 16px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  borderTop: '1px solid rgba(25,27,31,0.15)',
                  fontSize: 16,
                  fontWeight: 500,
                  color: '#ffffff',
                  flexShrink: 0,
                }}
              >
                Done
              </div>
            )}
          </div>
        )}
      </div>

      {hasError && (
        <span style={{ fontSize: 12, color: 'var(--kayo-color-negative, #dc2626)', fontFamily: 'inherit' }}>
          {errorText}
        </span>
      )}
    </div>
  )
}
