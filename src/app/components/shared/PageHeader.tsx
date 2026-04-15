interface PageHeaderProps {
  title: string;
  description: string;
  badge?: string;
  badgeColor?: 'teal' | 'indigo' | 'amber' | 'rose';
  section?: string;
}

const badgeColors = {
  teal: 'bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 border-teal-200 dark:border-teal-800',
  indigo: 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800',
  amber: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800',
  rose: 'bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800',
};

export function PageHeader({ title, description, badge, badgeColor = 'teal', section }: PageHeaderProps) {
  return (
    <div className="mb-10">
      {section && (
        <p className="text-teal-600 dark:text-teal-400 mb-2 uppercase tracking-wider"
           style={{ fontSize: '0.72rem', fontWeight: 600, fontFamily: 'var(--font-sans)', letterSpacing: '0.1em' }}>
          {section}
        </p>
      )}
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        <h1 className="text-slate-900 dark:text-white m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '2rem', lineHeight: 1.2 }}>
          {title}
        </h1>
        {badge && (
          <span className={`px-2.5 py-1 rounded-full border text-xs ${badgeColors[badgeColor]}`}
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
            {badge}
          </span>
        )}
      </div>
      <p className="text-slate-500 dark:text-slate-400 max-w-2xl" style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', lineHeight: 1.7 }}>
        {description}
      </p>
      <div className="mt-6 h-px bg-slate-200 dark:bg-slate-800" />
    </div>
  );
}
