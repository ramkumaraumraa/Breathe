import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, ArrowRight, X, CornerDownLeft, ArrowUp, ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSearch } from '../../context/SearchContext';
import { allNavItems, navigation } from './navData';

// Build a section lookup for each path
const pathToSection: Record<string, string> = {};
navigation.forEach(sec => {
  sec.items.forEach(item => {
    pathToSection[item.path] = sec.section;
  });
});

export function SearchModal() {
  const { isOpen, closeSearch, query, setQuery } = useSearch();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Reset selection index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const filtered = query.trim()
    ? allNavItems.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        (item.description?.toLowerCase().includes(query.toLowerCase()))
      )
    : allNavItems.slice(0, 8);

  const handleSelect = (path: string) => {
    navigate(path);
    closeSearch();
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(i => {
          const next = Math.min(i + 1, filtered.length - 1);
          scrollItemIntoView(next);
          return next;
        });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(i => {
          const next = Math.max(i - 1, 0);
          scrollItemIntoView(next);
          return next;
        });
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          handleSelect(filtered[selectedIndex].path);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex]);

  const scrollItemIntoView = (index: number) => {
    const list = listRef.current;
    if (!list) return;
    const items = list.querySelectorAll('[data-result-item]');
    items[index]?.scrollIntoView({ block: 'nearest' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm"
        onClick={closeSearch}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -8 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700/80 overflow-hidden"
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 dark:border-slate-800">
          <Search size={17} className="text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search components, foundations..."
            className="flex-1 bg-transparent outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem' }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-0.5 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              <X size={14} />
            </button>
          )}
          {!query && (
            <kbd className="px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hidden sm:block"
                 style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)' }}>
              Esc
            </kbd>
          )}
        </div>

        {/* Results */}
        <div ref={listRef} className="py-1.5 max-h-[340px] overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="px-4 py-10 text-center">
              <p className="text-slate-400 dark:text-slate-500" style={{ fontSize: '0.875rem', fontFamily: 'var(--font-sans)' }}>
                No results for <span className="text-slate-600 dark:text-slate-400 font-medium">"{query}"</span>
              </p>
            </div>
          ) : (
            <>
              {!query && (
                <p className="px-4 pt-1 pb-1.5 text-slate-400 dark:text-slate-600 uppercase tracking-wider"
                   style={{ fontSize: '0.65rem', fontWeight: 600, fontFamily: 'var(--font-sans)' }}>
                  Quick Navigation
                </p>
              )}
              {filtered.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                const section = pathToSection[item.path];
                return (
                  <button
                    key={item.path}
                    data-result-item
                    onClick={() => handleSelect(item.path)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center gap-3 w-full px-3 py-2.5 transition-colors mx-1.5 rounded-xl group ${
                      isSelected
                        ? 'bg-teal-50 dark:bg-teal-900/30'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                    style={{ width: 'calc(100% - 12px)' }}
                  >
                    {/* Icon */}
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-teal-100 dark:bg-teal-900/60'
                        : 'bg-slate-100 dark:bg-slate-800'
                    }`}>
                      <ArrowRight size={13} className={isSelected ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400'} />
                    </div>

                    {/* Text */}
                    <div className="flex-1 text-left min-w-0">
                      <p className={`m-0 truncate ${isSelected ? 'text-teal-700 dark:text-teal-300' : 'text-slate-900 dark:text-slate-100'}`}
                         style={{ fontSize: '0.875rem', fontWeight: 500, fontFamily: 'var(--font-sans)' }}>
                        {item.label}
                      </p>
                      {item.description && (
                        <p className="text-slate-400 dark:text-slate-500 m-0 truncate" style={{ fontSize: '0.72rem', fontFamily: 'var(--font-sans)' }}>
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* Section badge */}
                    {section && (
                      <span className={`shrink-0 px-2 py-0.5 rounded-full border transition-colors ${
                        isSelected
                          ? 'bg-teal-50 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-800'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-600 border-slate-100 dark:border-slate-700'
                      }`}
                           style={{ fontSize: '0.65rem', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
                        {section}
                      </span>
                    )}
                  </button>
                );
              })}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center gap-5 bg-slate-50/60 dark:bg-slate-800/40">
          <span className="flex items-center gap-1.5 text-slate-400 dark:text-slate-600" style={{ fontSize: '0.72rem', fontFamily: 'var(--font-sans)' }}>
            <span className="flex gap-0.5">
              <kbd className="inline-flex items-center justify-center w-5 h-5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem' }}>
                <ArrowUp size={9} />
              </kbd>
              <kbd className="inline-flex items-center justify-center w-5 h-5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem' }}>
                <ArrowDown size={9} />
              </kbd>
            </span>
            to navigate
          </span>
          <span className="flex items-center gap-1.5 text-slate-400 dark:text-slate-600" style={{ fontSize: '0.72rem', fontFamily: 'var(--font-sans)' }}>
            <kbd className="inline-flex items-center justify-center w-5 h-5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem' }}>
              <CornerDownLeft size={9} />
            </kbd>
            to select
          </span>
          <span className="flex items-center gap-1.5 text-slate-400 dark:text-slate-600" style={{ fontSize: '0.72rem', fontFamily: 'var(--font-sans)' }}>
            <kbd className="px-1 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem' }}>
              Esc
            </kbd>
            to close
          </span>
          <span className="ml-auto text-slate-300 dark:text-slate-700" style={{ fontSize: '0.72rem', fontFamily: 'var(--font-sans)' }}>
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
