import { PageHeader } from '../../components/shared/PageHeader';
import { CodeBlock } from '../../components/shared/CodeBlock';
import { PageNavigation } from '../../components/shared/PageNavigation';

const typeScale = [
  { name: 'Display XL', size: '3.5rem', lineHeight: '1.1', weight: '800', tag: 'h1', sample: 'Design with intention.' },
  { name: 'Display L', size: '2.5rem', lineHeight: '1.15', weight: '700', tag: 'h1', sample: 'Design with intention.' },
  { name: 'Heading 1', size: '2rem', lineHeight: '1.2', weight: '700', tag: 'h1', sample: 'Design with intention.' },
  { name: 'Heading 2', size: '1.5rem', lineHeight: '1.3', weight: '600', tag: 'h2', sample: 'The foundation of great UI' },
  { name: 'Heading 3', size: '1.25rem', lineHeight: '1.4', weight: '600', tag: 'h3', sample: 'Building block components' },
  { name: 'Heading 4', size: '1.0625rem', lineHeight: '1.5', weight: '600', tag: 'h4', sample: 'Consistent spacing system' },
  { name: 'Body L', size: '1.0625rem', lineHeight: '1.7', weight: '400', tag: 'p', sample: 'A comprehensive design system for building beautiful, accessible interfaces.' },
  { name: 'Body M', size: '0.9375rem', lineHeight: '1.7', weight: '400', tag: 'p', sample: 'A comprehensive design system for building beautiful, accessible interfaces.' },
  { name: 'Body S', size: '0.875rem', lineHeight: '1.6', weight: '400', tag: 'p', sample: 'A comprehensive design system for building beautiful, accessible interfaces.' },
  { name: 'Caption', size: '0.75rem', lineHeight: '1.5', weight: '400', tag: 'span', sample: 'Supporting label text, metadata, and timestamps.' },
  { name: 'Code', size: '0.875rem', lineHeight: '1.6', weight: '400', tag: 'code', sample: 'const breathe = "design";', isMono: true },
];

const fontWeights = [
  { name: 'Regular', value: '400', usage: 'Body text, descriptions' },
  { name: 'Medium', value: '500', usage: 'UI labels, button text' },
  { name: 'SemiBold', value: '600', usage: 'Headings H3–H4, emphasis' },
  { name: 'Bold', value: '700', usage: 'Headings H1–H2, display' },
  { name: 'ExtraBold', value: '800', usage: 'Display text, hero headings' },
];

export function TypographyPage() {
  return (
    <div className="max-w-4xl px-6 lg:px-10 py-10">
      <PageHeader
        title="Typography"
        description="Breathe uses Plus Jakarta Sans for display and headings, Inter for body text, and JetBrains Mono for code. Together they create a hierarchy that's both warm and precise."
        section="Foundations"
        badge="Tokens"
      />

      {/* Font Families */}
      <section className="mb-12">
        <h2 className="text-slate-900 dark:text-white mb-6 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
          Font Families
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { name: 'Plus Jakarta Sans', token: '--font-display', sample: 'AaBbCc 01', use: 'Display & Headings', font: 'var(--font-display)' },
            { name: 'Inter', token: '--font-sans', sample: 'AaBbCc 01', use: 'Body & UI', font: 'var(--font-sans)' },
            { name: 'JetBrains Mono', token: '--font-mono', sample: 'AaBbCc 01', use: 'Code & Monospace', font: 'var(--font-mono)' },
          ].map(f => (
            <div key={f.name} className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <p className="text-slate-900 dark:text-white mb-1" style={{ fontFamily: f.font, fontSize: '2rem', fontWeight: 700 }}>
                {f.sample}
              </p>
              <p className="text-slate-900 dark:text-slate-100 mb-0.5 m-0" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.875rem' }}>
                {f.name}
              </p>
              <p className="text-slate-400 dark:text-slate-500 mb-1 m-0" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem' }}>
                {f.use}
              </p>
              <code className="text-teal-600 dark:text-teal-400" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>
                {f.token}
              </code>
            </div>
          ))}
        </div>
      </section>

      {/* Type scale */}
      <section className="mb-12">
        <h2 className="text-slate-900 dark:text-white mb-6 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
          Type Scale
        </h2>
        <div className="space-y-1">
          {typeScale.map((item, i) => (
            <div key={item.name} className={`flex items-center gap-4 py-4 px-4 rounded-xl ${i % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/60 dark:bg-slate-800/20'} border border-slate-100 dark:border-slate-800/60`}>
              <div className="w-28 shrink-0">
                <p className="text-slate-900 dark:text-slate-200 m-0" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.75rem' }}>
                  {item.name}
                </p>
                <p className="text-slate-400 dark:text-slate-600 m-0" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem' }}>
                  {item.size} / {item.weight}
                </p>
              </div>
              <div className="flex-1 min-w-0 overflow-hidden">
                <p className="text-slate-900 dark:text-slate-100 truncate m-0"
                   style={{
                     fontFamily: item.isMono ? 'var(--font-mono)' : (item.tag === 'p' || item.tag === 'span' || item.tag === 'code') ? 'var(--font-sans)' : 'var(--font-display)',
                     fontSize: item.size,
                     fontWeight: parseInt(item.weight),
                     lineHeight: item.lineHeight,
                   }}>
                  {item.sample}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Font weights */}
      <section className="mb-12">
        <h2 className="text-slate-900 dark:text-white mb-6 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
          Font Weights
        </h2>
        <div className="space-y-3">
          {fontWeights.map(w => (
            <div key={w.name} className="flex items-center gap-6 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="w-24 shrink-0">
                <p className="text-slate-600 dark:text-slate-400 m-0" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem' }}>{w.name}</p>
                <code className="text-teal-600 dark:text-teal-400" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>{w.value}</code>
              </div>
              <p className="text-slate-900 dark:text-slate-100 flex-1 m-0"
                 style={{ fontFamily: 'var(--font-display)', fontWeight: parseInt(w.value), fontSize: '1.1rem' }}>
                The quick brown fox jumps over the lazy dog
              </p>
              <p className="text-slate-400 dark:text-slate-600 shrink-0 hidden sm:block m-0"
                 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem' }}>
                {w.usage}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Usage tokens */}
      <section>
        <h2 className="text-slate-900 dark:text-white mb-4 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
          Usage in CSS
        </h2>
        <CodeBlock
          code={`/* Apply typography tokens */
.heading {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
}

.body {
  font-family: var(--font-sans);
  font-size: 0.9375rem;
  line-height: 1.7;
}

.code {
  font-family: var(--font-mono);
  font-size: 0.875rem;
}`}
          language="css"
        />
      </section>

      <PageNavigation />
    </div>
  );
}