import { ReactNode, useEffect, useRef, useState, useMemo } from 'react'
import { createPortal } from 'react-dom'

export interface KayoCommandItem {
  key: string
  label: string
  icon?: ReactNode
  shortcut?: string
  action?: () => void
  disabled?: boolean
}

export interface KayoCommandGroup {
  label: string
  items: KayoCommandItem[]
}

export interface KayoBrutalistCommandProps {
  open: boolean
  onClose: () => void
  placeholder?: string
  groups: KayoCommandGroup[]
  onSelect?: (key: string) => void
  loading?: boolean
  emptyMessage?: string
}

const STYLE_ID = 'kayo-command-styles'

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#9ca3af"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

export function KayoBrutalistCommand({
  open,
  onClose,
  placeholder = 'Search commands…',
  groups,
  onSelect,
  loading = false,
  emptyMessage = 'No results found.',
}: KayoBrutalistCommandProps) {
  const [query, setQuery] = useState('')
  const [focusedIndex, setFocusedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // CSS injection
  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return
    const s = document.createElement('style')
    s.id = STYLE_ID
    s.textContent = `
      @keyframes kayo-command-in {
        from { opacity:0; transform:translateX(-50%) scale(0.96); }
        to   { opacity:1; transform:translateX(-50%) scale(1); }
      }
      .kayo-cmd-panel { animation: kayo-command-in 150ms ease-out; }
      .kayo-cmd-item:hover:not([data-disabled="true"]) { background: #f4f4f4; }
    `
    document.head.appendChild(s)
  }, [])

  // Auto-focus input on open
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 10)
      setQuery('')
      setFocusedIndex(0)
    }
  }, [open])

  // Filtered groups
  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return groups
    return groups
      .map(group => ({
        ...group,
        items: group.items.filter(item =>
          item.label.toLowerCase().includes(q)
        ),
      }))
      .filter(group => group.items.length > 0)
  }, [groups, query])

  // Flat list of navigable (non-disabled) items
  const flatItems = useMemo(() => {
    const result: KayoCommandItem[] = []
    for (const group of filteredGroups) {
      for (const item of group.items) {
        if (!item.disabled) result.push(item)
      }
    }
    return result
  }, [filteredGroups])

  const totalNavigable = flatItems.length

  // Keyboard navigation
  useEffect(() => {
    if (!open) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setFocusedIndex(prev => (prev + 1) % Math.max(totalNavigable, 1))
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setFocusedIndex(prev =>
          prev <= 0 ? Math.max(totalNavigable - 1, 0) : prev - 1
        )
        return
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        const item = flatItems[focusedIndex]
        if (item) {
          item.action?.()
          onSelect?.(item.key)
          onClose()
        }
        return
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, focusedIndex, flatItems, totalNavigable, onClose, onSelect])

  // Reset focused index when filtered list changes
  useEffect(() => {
    setFocusedIndex(0)
  }, [query])

  // Scroll focused item into view
  useEffect(() => {
    if (!resultsRef.current) return
    const focused = resultsRef.current.querySelector('[data-focused="true"]') as HTMLElement | null
    focused?.scrollIntoView({ block: 'nearest' })
  }, [focusedIndex])

  if (!open) return null

  // Build a map from item key → navigable index for focus tracking
  let navCounter = 0

  const content = (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(25,27,31,0.6)',
          zIndex: 400,
        }}
      />

      {/* Panel */}
      <div
        className="kayo-cmd-panel"
        style={{
          position: 'fixed',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(560px, 90vw)',
          border: '2px solid #3b3d3f',
          borderRadius: '6px',
          backgroundColor: '#fff',
          boxShadow: '4px 4px 0 #191b1f',
          zIndex: 401,
          fontFamily: "'DM Sans', system-ui, sans-serif",
          overflow: 'hidden',
        }}
      >
        {/* Search input row */}
        <div style={{ position: 'relative', borderBottom: '2px solid #3b3d3f' }}>
          <span
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none',
            }}
          >
            <SearchIcon />
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={placeholder}
            style={{
              width: '100%',
              padding: '14px 16px',
              paddingLeft: '42px',
              fontSize: '15px',
              border: 'none',
              outline: 'none',
              fontFamily: "'DM Sans', system-ui, sans-serif",
              boxSizing: 'border-box',
              color: '#3b3d3f',
              backgroundColor: '#fff',
            }}
          />
        </div>

        {/* Loading indicator */}
        {loading && (
          <div
            style={{
              padding: '8px 16px',
              fontSize: '13px',
              color: '#9ca3af',
            }}
          >
            Searching…
          </div>
        )}

        {/* Results */}
        <div
          ref={resultsRef}
          style={{
            maxHeight: '400px',
            overflowY: 'auto',
          }}
        >
          {filteredGroups.length === 0 ? (
            <div
              style={{
                padding: '24px 16px',
                textAlign: 'center',
                fontSize: '14px',
                color: '#9ca3af',
              }}
            >
              {emptyMessage}
            </div>
          ) : (
            filteredGroups.map(group => (
              <div key={group.label}>
                {/* Group label */}
                <div
                  style={{
                    padding: '8px 16px 4px',
                    fontSize: '10px',
                    fontWeight: 700,
                    color: '#9ca3af',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  {group.label}
                </div>

                {/* Group items */}
                {group.items.map(item => {
                  const isDisabled = !!item.disabled
                  let isFocused = false
                  if (!isDisabled) {
                    isFocused = navCounter === focusedIndex
                    navCounter++
                  }

                  return (
                    <div
                      key={item.key}
                      className="kayo-cmd-item"
                      data-disabled={isDisabled ? 'true' : 'false'}
                      data-focused={isFocused ? 'true' : 'false'}
                      onClick={() => {
                        if (isDisabled) return
                        item.action?.()
                        onSelect?.(item.key)
                        onClose()
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 16px',
                        cursor: isDisabled ? 'not-allowed' : 'pointer',
                        fontSize: '14px',
                        color: isFocused ? '#fff' : '#3b3d3f',
                        backgroundColor: isFocused ? '#970103' : undefined,
                        opacity: isDisabled ? 0.4 : 1,
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                      }}
                    >
                      {/* Icon */}
                      {item.icon && (
                        <span
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            color: isFocused ? '#fff' : 'inherit',
                            flexShrink: 0,
                          }}
                        >
                          {item.icon}
                        </span>
                      )}

                      {/* Label */}
                      <span style={{ flex: 1 }}>{item.label}</span>

                      {/* Shortcut pill */}
                      {item.shortcut && (
                        <span
                          style={{
                            marginLeft: 'auto',
                            fontSize: '11px',
                            color: isFocused ? '#fff' : '#6b7280',
                            backgroundColor: isFocused ? '#7f0002' : '#f4f4f4',
                            border: isFocused
                              ? '1px solid #970103'
                              : '1px solid #e5e7eb',
                            borderRadius: '4px',
                            padding: '2px 6px',
                            flexShrink: 0,
                          }}
                        >
                          {item.shortcut}
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )

  return createPortal(content, document.body)
}
