import { useState, useRef } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export interface KayoBrutalistInputProps {
  label?: string
  placeholder?: string
  helperText?: string
  errorText?: string
  type?: string
  disabled?: boolean
  readOnly?: boolean
  isPassword?: boolean
  defaultValue?: string
  value?: string
}

export function KayoBrutalistInput({
  label,
  placeholder,
  helperText,
  errorText,
  type = 'text',
  disabled = false,
  readOnly = false,
  isPassword = false,
  defaultValue,
  value,
}: KayoBrutalistInputProps) {
  const [focused, setFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const hasError = Boolean(errorText)
  const borderColor = hasError
    ? 'var(--kayo-color-negative, #dc2626)'
    : focused
      ? 'var(--kayo-color-primary, #970103)'
      : 'var(--kayo-color-border, #3b3d3f)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {label && (
        <label style={{ fontSize: 14, fontWeight: 500, color: 'var(--kayo-color-foreground, #3b3d3f)', lineHeight: '1.4' }}>
          {label}
        </label>
      )}
      <div
        onClick={() => inputRef.current?.focus()}
        style={{
          display: 'flex',
          alignItems: 'center',
          border: `2px solid ${borderColor}`,
          borderRadius: 'var(--kayo-radius-default, 8px)',
          backgroundColor: disabled ? '#f9fafb' : '#ffffff',
          paddingLeft: 12,
          paddingRight: isPassword ? 8 : 12,
          minHeight: 48,
          opacity: disabled ? 0.6 : 1,
          transition: 'border-color 80ms',
          cursor: disabled ? 'not-allowed' : 'text',
          boxSizing: 'border-box',
        } as React.CSSProperties}
      >
        <input
          ref={inputRef}
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          defaultValue={defaultValue}
          value={value}
          style={{
            flex: 1,
            minWidth: 0,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontFamily: 'inherit',
            fontSize: 16,
            color: 'var(--kayo-color-foreground, #3b3d3f)',
            paddingTop: 10,
            paddingBottom: 10,
            cursor: disabled ? 'not-allowed' : 'text',
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={(e) => { e.stopPropagation(); setShowPassword(v => !v) }}
            style={{
              background: 'none',
              border: 'none',
              padding: '0 4px 0 8px',
              cursor: 'pointer',
              color: 'var(--kayo-color-foreground-secondary, #6c6d70)',
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
            }}
          >
            {showPassword ? <EyeOff size={20} strokeWidth={2} /> : <Eye size={20} strokeWidth={2} />}
          </button>
        )}
      </div>
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
