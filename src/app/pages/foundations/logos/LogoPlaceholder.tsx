interface LogoPlaceholderProps {
  brandName: string;
  platform: string;
}

export function LogoPlaceholder({ brandName, platform }: LogoPlaceholderProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-20">
      {/* Abstract placeholder illustration - 8 logo variant outlines in a grid */}
      <svg
        width="240"
        height="180"
        viewBox="0 0 240 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-6 sm:mb-8 max-w-full h-auto"
      >
        {/* Grid of 8 empty rectangles representing logo variants */}
        {/* Row 1 */}
        <rect x="10" y="10" width="50" height="40" rx="4" stroke="currentColor" strokeWidth="1.5" className="text-slate-200 dark:text-slate-700" strokeDasharray="4 4" />
        <rect x="70" y="10" width="50" height="40" rx="4" stroke="currentColor" strokeWidth="1.5" className="text-slate-200 dark:text-slate-700" strokeDasharray="4 4" />
        <rect x="130" y="10" width="50" height="40" rx="4" stroke="currentColor" strokeWidth="1.5" className="text-slate-200 dark:text-slate-700" strokeDasharray="4 4" />
        <rect x="190" y="10" width="40" height="40" rx="4" stroke="currentColor" strokeWidth="1.5" className="text-slate-200 dark:text-slate-700" strokeDasharray="4 4" />
        {/* Row 2 */}
        <rect x="10" y="60" width="50" height="40" rx="4" stroke="currentColor" strokeWidth="1.5" className="text-slate-200 dark:text-slate-700" strokeDasharray="4 4" />
        <rect x="70" y="60" width="40" height="50" rx="4" stroke="currentColor" strokeWidth="1.5" className="text-slate-200 dark:text-slate-700" strokeDasharray="4 4" />
        <rect x="120" y="60" width="40" height="40" rx="20" stroke="currentColor" strokeWidth="1.5" className="text-slate-200 dark:text-slate-700" strokeDasharray="4 4" />
        <rect x="170" y="60" width="60" height="40" rx="4" stroke="currentColor" strokeWidth="1.5" className="text-slate-200 dark:text-slate-700" strokeDasharray="4 4" />

        {/* Subtle center indicator */}
        <circle cx="120" cy="90" r="3" className="fill-slate-300 dark:fill-slate-600" />
      </svg>

      {/* Text content */}
      <div className="text-center space-y-2">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <h3 className="text-slate-900 dark:text-white m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem' }}>
            {brandName}
          </h3>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-400" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
            {platform}
          </span>
        </div>
        <p className="text-slate-400 dark:text-slate-500 m-0" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
          Logos coming soon
        </p>
      </div>
    </div>
  );
}
