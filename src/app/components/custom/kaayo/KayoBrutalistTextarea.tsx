import { useState } from 'react'

export interface KayoBrutalistTextareaProps {
  label?: string
  placeholder?: string
  helperText?: string
  errorText?: string
  disabled?: boolean
  rows?: number
}

export function KayoBrutalistTextarea({
  label,
  placeholder,
  helperText,
  errorText,
  disabled = false,
  rows = 4,
}: KayoBrutalistTextareaProps) {
  const [focused, setFocused] = useState(false)

  const hasError = Boolean(errorText)
  const borderColor = hasError
    ? 'var(--kayo-color-negative, #dc2626)'
    : focused
      ? 'var(--kayo-color-primary, #970103)'
      : 'var(--kayo-color-border, #3b3d3f)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontFamily: "'DM Sans', system-ui, sans-serif", width: '100%' }}>
      {label && (
        <label style={{ fontSize: 14, fontWeight: 500, color: 'var(--kayo-color-foreground, #3b3d3f)', lineHeight: '1.4' }}>
          {label}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        style={{
          border: `2px solid ${borderColor}`,
          borderRadius: 'var(--kayo-radius-default, 8px)',
          backgroundColor: disabled ? '#f9fafb' : '#ffffff',
          paddingLeft: 12,
          paddingRight: 12,
          paddingTop: 10,
          paddingBottom: 10,
          fontFamily: 'inherit',
          fontSize: 16,
          color: 'var(--kayo-color-foreground, #3b3d3f)',
          opacity: disabled ? 0.6 : 1,
          transition: 'border-color 80ms',
          cursor: disabled ? 'not-allowed' : 'text',
          outline: 'none',
          resize: 'vertical',
          width: '100%',
          boxSizing: 'border-box',
        } as React.CSSProperties}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {hasError ? (
        <span style={{ fontSize: 12, color: 'var(--kayo-color-negative, #dc2626)', fontFamily: 'inherit' }}>
          {errorText}
        </span>
      ) : helperText ? (
        <span style={{ fontSize: 12, color: 'var(--kayo-color-foreground-secondary, #6c6d70)', fontFamily: 'inherit' }}>
          {helperText}
        </span>
      ) : null}
    </div>
  )
}
