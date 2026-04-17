import { useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import { navigation } from './navData';
import { Wind, Github, ExternalLink, ChevronDown } from 'lucide-react';

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const location = useLocation();

  // Determine which section the active route belongs to so we can open it by default
  const activeSection = navigation.find(s =>
    s.items.some(item => item.path === location.pathname)
  )?.section ?? 'Overview';

  const [openSections, setOpenSections] = useState<Set<string>>(
    () => new Set(navigation.map(s => s.section))
  );

  function toggleSection(name: string) {
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  }

  return (
    <aside className="flex flex-col h-full bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-200 dark:border-slate-800">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #2F9E44, #15803D)' }}>
          <Wind size={16} className="text-white" />
        </div>
        <div>
          <span className="text-slate-900 dark:text-white" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem' }}>
            Breathe
          </span>
          <span className="ml-2 px-1.5 py-0.5 rounded bg-teal-50 dark:bg-teal-900/40 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem' }}>
            v1.0
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {navigation.map((section) => {
          const isOpen = openSections.has(section.section);
          const hasActiveItem = section.items.some(item => item.path === location.pathname);

          return (
            <div key={section.section} className="mb-1">
              {/* Section header — clickable to collapse */}
              <button
                onClick={() => toggleSection(section.section)}
                className="w-full flex items-center justify-between px-3 py-1.5 mb-0.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors group"
              >
                <span
                  className={hasActiveItem ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400 dark:text-slate-600'}
                  style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.08em', fontFamily: 'var(--font-sans)', textTransform: 'uppercase' }}
                >
                  {section.section}
                </span>
                <ChevronDown
                  size={12}
                  className={`text-slate-400 dark:text-slate-600 transition-transform duration-200 ${isOpen ? 'rotate-0' : '-rotate-90'}`}
                />
              </button>

              {/* Section items — collapsible */}
              {isOpen && (
                <ul className="space-y-0.5 mb-4">
                  {section.items.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <li key={item.path}>
                        <NavLink
                          to={item.path}
                          onClick={onClose}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-150 ${
                            isActive
                              ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400'
                              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                          }`}
                          style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: isActive ? 500 : 400 }}
                        >
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400 shrink-0" />
                          )}
                          <span className={isActive ? '' : 'ml-4'}>{item.label}</span>
                          {item.badge && (
                            <span className="ml-auto px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400"
                                  style={{ fontSize: '0.65rem' }}>
                              {item.badge}
                            </span>
                          )}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-500 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
          style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem' }}
        >
          <Github size={14} />
          <span>GitHub</span>
          <ExternalLink size={11} className="ml-auto opacity-50" />
        </a>
        <p className="text-slate-400 dark:text-slate-600 text-center" style={{ fontSize: '0.7rem', fontFamily: 'var(--font-sans)' }}>
          Built with ♥ by AUMRAANS
        </p>
      </div>
    </aside>
  );
}
