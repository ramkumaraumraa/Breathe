import { useState, useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'

export interface KayoBrutalistSearchbarProps {
  suggestions?: string[]
  placeholder?: string
  value?: string
  onChange?: (v: string) => void
}

export function KayoBrutalistSearchbar({
  suggestions = [],
  placeholder = 'Search…',
  value: controlledValue,
  onChange,
}: KayoBrutalistSearchbarProps) {
  const isControlled = controlledValue !== undefined
  const [internal, setInternal] = useState('')
  const query = isControlled ? controlledValue! : internal

  const [focused, setFocused] = useState(false)
  const [inputFocused, setInputFocused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = query
    ? suggestions.filter((s) => s.toLowerCase().includes(query.toLowerCase()))
    : suggestions

  const showDropdown = focused && suggestions.length > 0

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false)
      }
    }
    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [])

  const handleChange = (v: string) => {
    if (!isControlled) setInternal(v)
    onChange?.(v)
    setFocused(true)
  }

  const handleSelect = (item: string) => {
    if (!isControlled) setInternal(item)
    onChange?.(item)
    setFocused(false)
    inputRef.current?.blur()
  }

  const handleClear = () => {
    if (!isControlled) setInternal('')
    onChange?.('')
    inputRef.current?.focus()
  }

  const borderColor = inputFocused
    ? 'var(--kayo-color-primary, #970103)'
    : 'var(--kayo-color-border, #3b3d3f)'

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      {/* Input row */}
      <div
        onClick={() => inputRef.current?.focus()}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          border: `2px solid ${borderColor}`,
          borderRadius: 'var(--kayo-radius-default, 8px)',
          backgroundColor: '#ffffff',
          paddingLeft: 12,
          paddingRight: 8,
          minHeight: 48,
          transition: 'border-color 80ms',
          cursor: 'text',
          boxSizing: 'border-box',
        } as React.CSSProperties}
      >
        <Search size={16} color="var(--kayo-color-foreground-secondary, #6c6d70)" style={{ flexShrink: 0 }} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => { setInputFocused(true); setFocused(true) }}
          onBlur={() => setInputFocused(false)}
          placeholder={placeholder}
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
          }}
        />
        {query && (
          <button
            type="button"
            tabIndex={-1}
            onClick={(e) => { e.stopPropagation(); handleClear() }}
            style={{
              background: 'none',
              border: 'none',
              padding: '0 4px',
              cursor: 'pointer',
              color: 'var(--kayo-color-foreground-secondary, #6c6d70)',
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 4px)',
          left: 0,
          right: 0,
          zIndex: 50,
          border: '2px solid var(--kayo-color-border, #3b3d3f)',
          borderRadius: 'var(--kayo-radius-default, 8px)',
          backgroundColor: '#ffffff',
          boxShadow: 'var(--kayo-shadow-md, 4px 4px 0 #191b1f)',
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '6px 12px',
            borderBottom: '1px solid var(--kayo-color-border, #3b3d3f)',
            fontSize: 10,
            fontWeight: 700,
            color: 'var(--kayo-color-foreground-secondary, #6c6d70)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
            {query ? 'Matches' : 'Suggestions'}
          </div>
          <ul style={{ maxHeight: 224, overflowY: 'auto', padding: '4px 0', margin: 0, listStyle: 'none' }}>
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); handleSelect(item) }}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: 14,
                      color: 'var(--kayo-color-foreground, #3b3d3f)',
                      fontFamily: 'inherit',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#f9fafb'
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'
                    }}
                  >
                    <Search size={13} color="var(--kayo-color-foreground-secondary, #6c6d70)" style={{ flexShrink: 0 }} />
                    <span>{item}</span>
                  </button>
                </li>
              ))
            ) : (
              <li style={{ padding: '12px 14px', fontSize: 13, color: 'var(--kayo-color-foreground-secondary, #6c6d70)', textAlign: 'center' }}>
                No matches for "{query}"
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
