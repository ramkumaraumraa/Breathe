import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Input } from '@/app/components/ui/input'
import { Search, X, Star } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

const SUGGESTIONS = [
  'Kaayo Tutor Ops',
  'Ilakh Personal Finance',
  'Ulagellam Explorer',
  'Breathe Design System',
  'Aumraa Studio Brand',
  'Technocracy Dashboard',
  'Lemniscate Finance SaaS',
  'Maligai Manager',
  'Yakaizen Widgets'
]

export function SearchbarPage() {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const filtered = query
    ? SUGGESTIONS.filter(item => item.toLowerCase().includes(query.toLowerCase()))
    : SUGGESTIONS // Show all or recent when focused but query is empty

  // Close dropdown on click outside
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
      implemented={['lemniscate', 'aumraa']}
      sections={[
        {
          title: 'Search with Suggestions',
          description: 'Type below to see recommendations and autocomplete suggestions in real-time.',
          preview: (
            <div className="w-full max-w-sm space-y-2 relative" ref={dropdownRef}>
              <div className="relative">
                <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                <Input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    setIsFocused(true)
                  }}
                  onFocus={() => setIsFocused(true)}
                  placeholder="Search products or brands..."
                  className="pl-9 pr-8 py-5 h-11 border-slate-200 focus-visible:ring-teal-500 rounded-xl"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {isFocused && (
                <div className="absolute top-full left-0 right-0 z-30 mt-1 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="p-2 border-b border-slate-100 dark:border-slate-800 text-[10px] font-semibold text-slate-400 dark:text-slate-500 tracking-wider uppercase">
                    {query ? 'Matches Found' : 'Suggested Searches'}
                  </div>
                  <ul className="max-h-56 overflow-y-auto py-1">
                    {filtered.length > 0 ? (
                      filtered.map((item) => (
                        <li key={item}>
                          <button
                            onClick={() => {
                              setQuery(item)
                              setIsFocused(false)
                            }}
                            className="w-full px-4 py-2.5 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-between"
                          >
                            <span>{item}</span>
                            <Star className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600 hover:text-amber-400 transition-colors" />
                          </button>
                        </li>
                      ))
                    ) : (
                      <div className="p-4 text-center text-xs text-muted-foreground">
                        No matches found for "{query}"
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
import { useState } from 'react'

const SUGGESTIONS = ['Kaayo Tutor Ops', 'Ilakh Personal Finance', 'Ulagellam Explorer']

function Searchbar() {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const filtered = query
    ? SUGGESTIONS.filter(item => item.toLowerCase().includes(query.toLowerCase()))
    : SUGGESTIONS

  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        placeholder="Search..."
        className="pl-9 pr-8"
      />
      {query && <X className="absolute right-3 top-3 cursor-pointer" onClick={() => setQuery('')} />}
      
      {isFocused && (
        <ul className="absolute top-full left-0 right-0 z-30 mt-1 bg-popover border rounded-md shadow-md max-h-56 overflow-y-auto">
          {filtered.map(item => (
            <li key={item}>
              <button className="w-full px-4 py-2 text-left hover:bg-accent" onClick={() => { setQuery(item); setIsFocused(false); }}>
                {item}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}`,
          },
        },
      ]}
    />
  )
}
