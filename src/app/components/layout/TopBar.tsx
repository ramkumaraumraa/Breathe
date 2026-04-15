import { Sun, Moon, Search, Github, Menu, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useSearch } from '../../context/SearchContext';

interface TopBarProps {
  onMenuToggle: () => void;
  menuOpen: boolean;
}

export function TopBar({ onMenuToggle, menuOpen }: TopBarProps) {
  const { isDark, toggleTheme } = useTheme();
  const { openSearch } = useSearch();

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center h-16 px-4 lg:px-6 gap-4">
        {/* Mobile menu toggle */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile logo */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0D9488, #6366F1)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
            </svg>
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--color-foreground)' }}>
            Breathe
          </span>
        </div>

        {/* Search bar */}
        <button
          onClick={openSearch}
          className="flex items-center gap-3 flex-1 max-w-md px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-left border border-slate-200 dark:border-slate-700"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          <Search size={15} className="text-slate-400 shrink-0" />
          <span className="text-slate-400 dark:text-slate-500 flex-1" style={{ fontSize: '0.875rem' }}>
            Search docs...
          </span>
          <kbd className="hidden sm:flex items-center gap-0.5 text-slate-400 dark:text-slate-600 px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
               style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)' }}>
            ⌘K
          </kbd>
        </button>

        <div className="flex items-center gap-1 ml-auto">
          {/* GitHub */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Github size={18} />
          </a>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
