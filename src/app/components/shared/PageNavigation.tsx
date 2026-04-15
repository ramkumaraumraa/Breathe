import { Link, useLocation } from 'react-router';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { allNavItems, navigation } from '../layout/navData';

// Build section labels for display
const pathToSection: Record<string, string> = {};
navigation.forEach(sec => {
  sec.items.forEach(item => {
    pathToSection[item.path] = sec.section;
  });
});

export function PageNavigation() {
  const { pathname } = useLocation();

  const index = allNavItems.findIndex(item => item.path === pathname);
  if (index === -1) return null;

  const prev = index > 0 ? allNavItems[index - 1] : null;
  const next = index < allNavItems.length - 1 ? allNavItems[index + 1] : null;

  return (
    <div className="mt-14 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-3">
      {prev ? (
        <Link
          to={prev.path}
          className="flex-1 group flex flex-col gap-1 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-teal-300 dark:hover:border-teal-700 hover:shadow-sm transition-all"
        >
          <span className="flex items-center gap-1.5 text-slate-400 dark:text-slate-600 group-hover:text-teal-500 transition-colors"
                style={{ fontSize: '0.72rem', fontFamily: 'var(--font-sans)', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            <ArrowLeft size={12} />
            {pathToSection[prev.path] ?? 'Previous'}
          </span>
          <span className="text-slate-900 dark:text-slate-100 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9375rem' }}>
            {prev.label}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          to={next.path}
          className="flex-1 group flex flex-col gap-1 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-teal-300 dark:hover:border-teal-700 hover:shadow-sm transition-all sm:items-end text-left sm:text-right"
        >
          <span className="flex items-center gap-1.5 text-slate-400 dark:text-slate-600 group-hover:text-teal-500 transition-colors sm:flex-row-reverse"
                style={{ fontSize: '0.72rem', fontFamily: 'var(--font-sans)', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            <ArrowRight size={12} />
            {pathToSection[next.path] ?? 'Next'}
          </span>
          <span className="text-slate-900 dark:text-slate-100 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9375rem' }}>
            {next.label}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
