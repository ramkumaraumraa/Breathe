import { PageHeader } from '../../components/shared/PageHeader';
import { FoundationCodeCard } from '../../components/shared/FoundationCodeCard';
import { PageNavigation } from '../../components/shared/PageNavigation';

const spacingScale = [
  { token: 'space-0', value: '0px', rem: '0', pixels: 0 },
  { token: 'space-0.5', value: '2px', rem: '0.125rem', pixels: 2 },
  { token: 'space-1', value: '4px', rem: '0.25rem', pixels: 4 },
  { token: 'space-1.5', value: '6px', rem: '0.375rem', pixels: 6 },
  { token: 'space-2', value: '8px', rem: '0.5rem', pixels: 8 },
  { token: 'space-2.5', value: '10px', rem: '0.625rem', pixels: 10 },
  { token: 'space-3', value: '12px', rem: '0.75rem', pixels: 12 },
  { token: 'space-3.5', value: '14px', rem: '0.875rem', pixels: 14 },
  { token: 'space-4', value: '16px', rem: '1rem', pixels: 16 },
  { token: 'space-5', value: '20px', rem: '1.25rem', pixels: 20 },
  { token: 'space-6', value: '24px', rem: '1.5rem', pixels: 24 },
  { token: 'space-7', value: '28px', rem: '1.75rem', pixels: 28 },
  { token: 'space-8', value: '32px', rem: '2rem', pixels: 32 },
  { token: 'space-9', value: '36px', rem: '2.25rem', pixels: 36 },
  { token: 'space-10', value: '40px', rem: '2.5rem', pixels: 40 },
  { token: 'space-12', value: '48px', rem: '3rem', pixels: 48 },
  { token: 'space-14', value: '56px', rem: '3.5rem', pixels: 56 },
  { token: 'space-16', value: '64px', rem: '4rem', pixels: 64 },
  { token: 'space-20', value: '80px', rem: '5rem', pixels: 80 },
  { token: 'space-24', value: '96px', rem: '6rem', pixels: 96 },
];

const semanticSpacing = [
  { token: '--breathe-space-xs', value: '4px', usage: 'Icon gaps, tight inline spacing' },
  { token: '--breathe-space-sm', value: '8px', usage: 'Component internal padding' },
  { token: '--breathe-space-md', value: '16px', usage: 'Default padding, element gaps' },
  { token: '--breathe-space-lg', value: '24px', usage: 'Section padding, card padding' },
  { token: '--breathe-space-xl', value: '40px', usage: 'Page sections, large gaps' },
  { token: '--breathe-space-2xl', value: '64px', usage: 'Page margins, hero spacing' },
];

const MAX_PX = 96;

export function SpacingPage() {
  return (
    <div className="max-w-7xl px-6 lg:px-10 py-10">
      <PageHeader
        title="Spacing"
        description="Breathe uses a base-4 spacing scale (4px = 1 unit). Consistent spacing creates visual rhythm and breathing room that makes interfaces feel calm and organized."
        section="Foundations"
        badge="Tokens"
      />

      {/* Visual scale */}
      <section className="mb-12">
        <h2 className="text-slate-900 dark:text-white mb-2 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
          Spacing Scale
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6 mt-1" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
          1 unit = 4px. The scale grows geometrically for larger values.
        </p>

        <div className="space-y-2.5">
          {spacingScale.filter(s => s.pixels > 0).map((item) => (
            <div key={item.token} className="flex items-center gap-4 group">
              <div className="w-28 shrink-0 text-right">
                <code className="text-teal-600 dark:text-teal-400" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                  {item.token}
                </code>
              </div>
              <div className="flex-1 flex items-center gap-3">
                <div
                  className="rounded bg-teal-400 dark:bg-teal-500 transition-all group-hover:bg-teal-500 dark:group-hover:bg-teal-400 shrink-0 h-5"
                  style={{ width: `${Math.min((item.pixels / MAX_PX) * 100, 100)}%`, minWidth: '4px', maxWidth: '400px' }}
                />
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-slate-500 dark:text-slate-400 w-12 text-right" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                  {item.rem}
                </span>
                <span className="text-slate-400 dark:text-slate-600 w-10 text-right" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Semantic spacing */}
      <section className="mb-12">
        <h2 className="text-slate-900 dark:text-white mb-2 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
          Semantic Spacing
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6 mt-1" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
          Named tokens map to specific UI contexts for consistent usage.
        </p>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700/60">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60">
                {['Token', 'Value', 'Usage'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700/60"
                      style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.8rem' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {semanticSpacing.map((item, i) => (
                <tr key={item.token} className={i % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/50 dark:bg-slate-800/20'}>
                  <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                    <code className="text-teal-600 dark:text-teal-400" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                      {item.token}
                    </code>
                  </td>
                  <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="bg-teal-400 dark:bg-teal-500 rounded h-4 shrink-0"
                           style={{ width: `${Math.max(parseInt(item.value) / 2, 4)}px` }} />
                      <code className="text-slate-500" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                        {item.value}
                      </code>
                    </div>
                  </td>
                  <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400"
                      style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem' }}>
                    {item.usage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Usage examples */}
      <section className="mb-12">
        <h2 className="text-slate-900 dark:text-white mb-6 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
          Visual Examples
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { label: 'Component Padding', desc: 'Inner spacing inside components' },
            { label: 'Layout Gaps', desc: 'Space between sibling elements' },
          ].map(ex => (
            <div key={ex.label} className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
              <p className="text-slate-900 dark:text-slate-200 mb-1 m-0" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.875rem' }}>
                {ex.label}
              </p>
              <p className="text-slate-400 dark:text-slate-600 mb-4 m-0" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem' }}>
                {ex.desc}
              </p>
              <div className="flex gap-2 flex-wrap">
                {[4, 8, 12, 16, 24].map(size => (
                  <div key={size} className="flex items-center justify-center bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-800 rounded"
                       style={{ padding: `${size}px` }}>
                    <div className="bg-teal-400 dark:bg-teal-500 rounded" style={{ width: '8px', height: '8px' }} />
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {[4, 8, 12, 16, 24].map(size => (
                  <span key={size} className="text-slate-400 dark:text-slate-600" style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', minWidth: size + 16 + 'px', textAlign: 'center' }}>
                    {size}px
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <FoundationCodeCard
          title="Usage in CSS"
          description="Reference spacing tokens via CSS custom properties. Tailwind utilities map directly to these values."
          code={`/* Using spacing tokens */
.card {
  padding: var(--breathe-space-lg);   /* 24px */
  gap: var(--breathe-space-md);        /* 16px */
  margin-bottom: var(--breathe-space-xl); /* 40px */
}

.button {
  padding: var(--breathe-space-sm) var(--breathe-space-md);
}

/* Tailwind utility mapping */
/* space-4 = 16px, space-6 = 24px, space-10 = 40px */`}
          language="css"
        />
      </section>

      <PageNavigation />
    </div>
  );
}