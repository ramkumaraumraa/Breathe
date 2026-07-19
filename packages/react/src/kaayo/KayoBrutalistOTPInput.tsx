import { useRef, useState, useEffect, KeyboardEvent, ClipboardEvent } from 'react'

export interface KayoBrutalistOTPInputProps {
  length?: number
  value?: string
  onChange?: (value: string) => void
  error?: boolean
  disabled?: boolean
  autoFocus?: boolean
}

export function KayoBrutalistOTPInput({
  length = 6,
  value = '',
  onChange,
  error = false,
  disabled = false,
  autoFocus = false,
}: KayoBrutalistOTPInputProps) {
  const [slots, setSlots] = useState<string[]>(() => {
    const arr = Array(length).fill('')
    value.split('').slice(0, length).forEach((c, i) => { arr[i] = c })
    return arr
  })
  const [focused, setFocused] = useState<number | null>(autoFocus ? 0 : null)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (autoFocus) inputRefs.current[0]?.focus()
  }, [autoFocus])

  useEffect(() => {
    const arr = Array(length).fill('')
    value.split('').slice(0, length).forEach((c, i) => { arr[i] = c })
    setSlots(arr)
  }, [value, length])

  function emit(next: string[]) {
    onChange?.(next.join(''))
    setSlots([...next])
  }

  function focusAt(idx: number) {
    const target = Math.max(0, Math.min(length - 1, idx))
    inputRefs.current[target]?.focus()
  }

  function handleChange(idx: number, raw: string) {
    const digit = raw.replace(/\D/g, '').slice(-1)
    if (!digit) return
    const next = [...slots]
    next[idx] = digit
    emit(next)
    if (idx < length - 1) focusAt(idx + 1)
  }

  function handleKeyDown(idx: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace') {
      e.preventDefault()
      const next = [...slots]
      if (next[idx]) {
        next[idx] = ''
        emit(next)
      } else if (idx > 0) {
        next[idx - 1] = ''
        emit(next)
        focusAt(idx - 1)
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      focusAt(idx - 1)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      focusAt(idx + 1)
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault()
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    if (!text) return
    const next = Array(length).fill('')
    text.split('').forEach((c, i) => { next[i] = c })
    emit(next)
    const nextFocus = Math.min(text.length, length - 1)
    focusAt(nextFocus)
  }

  const primaryColor = 'var(--kayo-color-primary, #970103)'
  const borderColor = error
    ? '#dc2626'
    : 'var(--kayo-color-border, #3b3d3f)'

  return (
    <div
      style={{
        display: 'inline-flex',
        gap: 8,
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
      aria-label="OTP input"
    >
      {slots.map((slot, idx) => {
        const isFocused = focused === idx
        return (
          <input
            key={idx}
            ref={(el) => { inputRefs.current[idx] = el }}
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={1}
            value={slot}
            disabled={disabled}
            aria-label={`OTP digit ${idx + 1}`}
            style={{
              width: 44,
              height: 52,
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 700,
              fontFamily: 'inherit',
              color: '#191b1f',
              backgroundColor: disabled ? '#f3f4f6' : '#ffffff',
              border: `2px solid ${isFocused ? primaryColor : borderColor}`,
              borderRadius: 6,
              outline: 'none',
              boxShadow: isFocused
                ? `2px 2px 0 ${error ? '#dc2626' : '#191b1f'}`
                : '2px 2px 0 #191b1f',
              cursor: disabled ? 'not-allowed' : 'text',
              caretColor: 'transparent',
              transition: 'border-color 100ms',
            }}
            onChange={(e) => handleChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            onFocus={() => setFocused(idx)}
            onBlur={() => setFocused(null)}
            onPaste={handlePaste}
          />
        )
      })}
    </div>
  )
}
