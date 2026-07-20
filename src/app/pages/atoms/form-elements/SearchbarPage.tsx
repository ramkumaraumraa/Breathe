import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Input } from '@/app/components/ui/input'
import { Search, X } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistSearchbar } from '@/app/components/custom/kaayo/KayoBrutalistSearchbar'

const SUGGESTIONS = [
  'Kaayo Tutor Ops',
  'Ilakh Personal Finance',
  'Ulagellam Explorer',
  'Breathe Design System',
  'Aumraa Studio Brand',
  'Technocracy Dashboard',
  'Lemniscate Finance SaaS',
  'Maligai Manager',
  'Yakaizen Widgets',
]

export function SearchbarPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const filtered = query
    ? SUGGESTIONS.filter((item) => item.toLowerCase().includes(query.toLowerCase()))
    : SUGGESTIONS

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <ComponentPageLayout
      title="Searchbar"
      description="Interactive search input fields that support live autocomplete and suggestion drop-downs as you type."
      level="Atom"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Search with Suggestions',
          description: 'Type to see autocomplete suggestions in real-time.',
          preview: isKaayo ? (
            <div style={{ width: '100%', maxWidth: 360 }}>
              <KayoBrutalistSearchbar
                suggestions={SUGGESTIONS}
                placeholder="Search products or brands…"
              />
            </div>
          ) : (
            <div className="w-full max-w-sm space-y-2 relative" ref={dropdownRef}>
              <div className="relative">
                <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                <Input
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setIsFocused(true) }}
                  onFocus={() => setIsFocused(true)}
                  placeholder="Search products or brands..."
                  className="pl-9 pr-8 py-5 h-11 border-slate-200 focus-visible:ring-teal-500 rounded-xl"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              {isFocused && (
                <div className="absolute top-full left-0 right-0 z-30 mt-1 border border-slate-200 bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="p-2 border-b border-slate-100 text-[10px] font-semibold text-slate-400 tracking-wider uppercase">
                    {query ? 'Matches Found' : 'Suggested Searches'}
                  </div>
                  <ul className="max-h-56 overflow-y-auto py-1">
                    {filtered.length > 0 ? filtered.map((item) => (
                      <li key={item}>
                        <button
                          onClick={() => { setQuery(item); setIsFocused(false) }}
                          className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                        >
                          {item}
                        </button>
                      </li>
                    )) : (
                      <div className="p-4 text-center text-xs text-muted-foreground">
                        No matches for "{query}"
                      </div>
                    )}
                  </ul>
                </div>
              )}
            </div>
          ),
          code: {
            react: `import { Input } from '@aumraa/breathe/components/ui/input'
import { Search, X } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

function Searchbar({ suggestions }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const filtered = query
    ? suggestions.filter(s => s.toLowerCase().includes(query.toLowerCase()))
    : suggestions

  return (
    <div ref={ref} className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        value={query}
        onChange={e => { setQuery(e.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)}
        placeholder="Search..."
        className="pl-9 pr-8"
      />
      {query && <X className="absolute right-3 top-3 cursor-pointer h-4 w-4" onClick={() => setQuery('')} />}
      {open && (
        <ul className="absolute top-full left-0 right-0 z-30 mt-1 bg-popover border rounded-md shadow-md max-h-56 overflow-y-auto">
          {filtered.map(item => (
            <li key={item}>
              <button className="w-full px-4 py-2 text-left text-sm hover:bg-accent"
                onClick={() => { setQuery(item); setOpen(false) }}>
                {item}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}`,
            reactNative: {
              kaayo: `import { Searchbar } from '@kaayo/components/atoms/Searchbar'
import { useState } from 'react'

const [query, setQuery] = useState('')

<Searchbar
  value={query}
  onChangeText={setQuery}
  placeholder="Search products or brands…"
  suggestions={SUGGESTIONS}
  onSuggestionSelect={setQuery}
/>

// Token reference:
// Input: same as Input atom — 48px height, 2px border, radius 8
// Focus border: theme.brand.primary (#970103)
// Search icon: theme.foreground.secondary (#6c6d70), size 16
// Dropdown: border 2px, shadow kayoShadow.md (4px 4px 0 #191b1f)
// Suggestion item hover: bg theme.surface.sunken (#f9fafb)`,
              lemniscate: `import { Searchbar } from '@lemniscate/components/atoms/Searchbar'
import { useState } from 'react'

const [query, setQuery] = useState('')

<Searchbar
  value={query}
  onChangeText={setQuery}
  placeholder="Search products or brands…"
  suggestions={SUGGESTIONS}
  onSuggestionSelect={setQuery}
/>`,
            },
          },
        },
      ]}
    />
  )
}
