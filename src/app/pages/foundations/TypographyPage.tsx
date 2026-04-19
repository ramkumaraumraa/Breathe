import { useState } from 'react';
import { PageHeader } from '../../components/shared/PageHeader';
import { CodeBlock } from '../../components/shared/CodeBlock';
import { PageNavigation } from '../../components/shared/PageNavigation';

interface TypeScaleEntry {
  name: string;
  size: string;
  lineHeight: string;
  weight: string;
  tag: string;
  sample: string;
  isMono?: boolean;
}

interface FontFamily {
  name: string;
  token: string;
  use: string;
  cssValue: string;
  googleFont?: string;
}

interface BrandTypography {
  id: string;
  label: string;
  tagline: string;
  displayFont: FontFamily;
  bodyFont: FontFamily;
  monoFont: FontFamily;
  scale: TypeScaleEntry[];
  cssSnippet: string;
  characterSample: string;
  accentColor: string;
  bgColor: string;
  isDark?: boolean;
}

const monoFont: FontFamily = {
  name: 'JetBrains Mono',
  token: '--font-mono',
  use: 'Code & Monospace',
  cssValue: "JetBrains Mono, Fira Code, monospace",
};

function makeScale(displayFont: FontFamily, bodyFont: FontFamily, isTechnocracy = false): TypeScaleEntry[] {
  const displaySample = isTechnocracy
    ? 'Data. Control. Clarity.'
    : 'Design with intention.';
  const bodySample = isTechnocracy
    ? 'Monitor real-time metrics, track system performance, and act fast.'
    : 'A comprehensive design system for building beautiful, accessible interfaces.';
  return [
    { name: 'Display XL', size: '3.5rem', lineHeight: '1.1', weight: '800', tag: 'h1', sample: displaySample },
    { name: 'Display L', size: '2.5rem', lineHeight: '1.15', weight: '700', tag: 'h1', sample: displaySample },
    { name: 'Heading 1', size: '2rem', lineHeight: '1.2', weight: '700', tag: 'h1', sample: displaySample },
    { name: 'Heading 2', size: '1.5rem', lineHeight: '1.3', weight: '600', tag: 'h2', sample: 'The foundation of great UI' },
    { name: 'Heading 3', size: '1.25rem', lineHeight: '1.4', weight: '600', tag: 'h3', sample: 'Building block components' },
    { name: 'Heading 4', size: '1.0625rem', lineHeight: '1.5', weight: '600', tag: 'h4', sample: 'Consistent spacing system' },
    { name: 'Body L', size: '1.0625rem', lineHeight: '1.7', weight: '400', tag: 'p', sample: bodySample },
    { name: 'Body M', size: '0.9375rem', lineHeight: '1.7', weight: '400', tag: 'p', sample: bodySample },
    { name: 'Body S', size: '0.875rem', lineHeight: '1.6', weight: '400', tag: 'p', sample: bodySample },
    { name: 'Caption', size: '0.75rem', lineHeight: '1.5', weight: '400', tag: 'span', sample: 'Supporting label text, metadata, and timestamps.' },
    { name: 'Code', size: '0.875rem', lineHeight: '1.6', weight: '400', tag: 'code', sample: 'const breathe = "design";', isMono: true },
  ];
}

const brands: BrandTypography[] = [
  {
    id: 'lemniscate',
    label: 'Lemniscate',
    tagline: 'Community finance SaaS — clean, trustworthy, modern',
    displayFont: { name: 'Plus Jakarta Sans', token: '--font-display', use: 'Display & Headings', cssValue: "'Plus Jakarta Sans', sans-serif", googleFont: 'Plus+Jakarta+Sans:wght@600;700;800' },
    bodyFont: { name: 'Inter', token: '--font-sans', use: 'Body & UI labels', cssValue: "Inter, -apple-system, sans-serif", googleFont: 'Inter:wght@400;500;600' },
    monoFont,
    scale: makeScale({ name: 'Plus Jakarta Sans', token: '', use: '', cssValue: '' }, { name: 'Inter', token: '', use: '', cssValue: '' }),
    characterSample: 'Aa Bb Cc 0123',
    accentColor: '#1C60C1',
    bgColor: '#EFF6FF',
    cssSnippet: `/* Lemniscate — font tokens */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');

:root {
  --font-display: 'Plus Jakarta Sans', sans-serif;
  --font-sans:    Inter, -apple-system, sans-serif;
  --font-mono:    'JetBrains Mono', monospace;
}

.heading { font-family: var(--font-display); font-weight: 700; }
.body    { font-family: var(--font-sans);    font-size: 0.9375rem; }`,
  },
  {
    id: 'aumraa',
    label: 'Aumraa',
    tagline: 'Design studio — editorial, warm, refined',
    displayFont: { name: 'Source Sans 3', token: '--font-display', use: 'Display, Headings & Body', cssValue: "'Source Sans 3', sans-serif", googleFont: 'Source+Sans+3:wght@400;600;700;800' },
    bodyFont: { name: 'Source Sans 3', token: '--font-sans', use: 'Body & UI (same family, lighter weight)', cssValue: "'Source Sans 3', sans-serif" },
    monoFont,
    scale: makeScale({ name: 'Source Sans 3', token: '', use: '', cssValue: '' }, { name: 'Source Sans 3', token: '', use: '', cssValue: '' }),
    characterSample: 'Aa Bb Cc 0123',
    accentColor: '#2F9E44',
    bgColor: '#F0FDF4',
    cssSnippet: `/* Aumraa — font tokens */
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700;800&display=swap');

:root {
  --font-display: 'Source Sans 3', sans-serif;
  --font-sans:    'Source Sans 3', sans-serif;
  --font-mono:    'JetBrains Mono', monospace;
}

/* Single-family system — differentiate by weight only */
.heading { font-family: var(--font-display); font-weight: 700; }
.body    { font-family: var(--font-sans);    font-weight: 400; }`,
  },
  {
    id: 'technocracy',
    label: 'Technocracy',
    tagline: 'Admin dashboard — dense, technical, data-forward',
    displayFont: { name: 'Fira Sans', token: '--font-display', use: 'Headings & UI Labels', cssValue: "'Fira Sans', sans-serif", googleFont: 'Fira+Sans:wght@400;500;600;700' },
    bodyFont: { name: 'Fira Sans', token: '--font-sans', use: 'Body, Data Tables & Dense UI', cssValue: "'Fira Sans', sans-serif" },
    monoFont: { name: 'Fira Code', token: '--font-mono', use: 'Code, Terminals & Log Views', cssValue: "'Fira Code', 'JetBrains Mono', monospace", googleFont: 'Fira+Code:wght@400;500' },
    scale: makeScale({ name: 'Fira Sans', token: '', use: '', cssValue: '' }, { name: 'Fira Sans', token: '', use: '', cssValue: '' }, true),
    characterSample: 'Aa Bb Cc 0123',
    accentColor: '#8B5CF6',
    bgColor: '#0D1117',
    isDark: true,
    cssSnippet: `/* Technocracy — font tokens */
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;600;700&family=Fira+Code:wght@400;500&display=swap');

:root {
  --font-display: 'Fira Sans', sans-serif;
  --font-sans:    'Fira Sans', sans-serif;
  --font-mono:    'Fira Code', 'JetBrains Mono', monospace;

  /* Dense admin sizing — base 14px */
  --font-size-base: 0.875rem;
}

.heading { font-family: var(--font-display); font-weight: 600; letter-spacing: -0.01em; }
.body    { font-family: var(--font-sans);    font-size: 0.875rem; }`,
  },
  {
    id: 'maligai',
    label: 'Maligai',
    tagline: 'Grocery & retail — clear, accessible, everyday',
    displayFont: { name: 'Plus Jakarta Sans', token: '--font-display', use: 'Display & Headings', cssValue: "'Plus Jakarta Sans', sans-serif", googleFont: 'Plus+Jakarta+Sans:wght@600;700;800' },
    bodyFont: { name: 'Inter', token: '--font-sans', use: 'Body, Labels & UI', cssValue: "Inter, -apple-system, sans-serif" },
    monoFont,
    scale: makeScale({ name: 'Plus Jakarta Sans', token: '', use: '', cssValue: '' }, { name: 'Inter', token: '', use: '', cssValue: '' }),
    characterSample: 'Aa Bb Cc 0123',
    accentColor: '#D97706',
    bgColor: '#FFFBEB',
    cssSnippet: `/* Maligai — font tokens */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');

:root {
  --font-display: 'Plus Jakarta Sans', sans-serif;
  --font-sans:    Inter, -apple-system, sans-serif;
  --font-mono:    'JetBrains Mono', monospace;
}`,
  },
  {
    id: 'ulagellam',
    label: 'Ulagellam',
    tagline: 'Discovery app — playful, spatial, inviting',
    displayFont: { name: 'DM Sans', token: '--font-display', use: 'Display & Headings', cssValue: "'DM Sans', sans-serif", googleFont: 'DM+Sans:wght@600;700;800' },
    bodyFont: { name: 'Inter', token: '--font-sans', use: 'Body & UI Labels', cssValue: "Inter, -apple-system, sans-serif" },
    monoFont,
    scale: makeScale({ name: 'DM Sans', token: '', use: '', cssValue: '' }, { name: 'Inter', token: '', use: '', cssValue: '' }),
    characterSample: 'Aa Bb Cc 0123',
    accentColor: '#7C3AED',
    bgColor: '#F5F3FF',
    cssSnippet: `/* Ulagellam — font tokens */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');

:root {
  --font-display: 'DM Sans', sans-serif;
  --font-sans:    Inter, -apple-system, sans-serif;
  --font-mono:    'JetBrains Mono', monospace;
}`,
  },
  {
    id: 'ilakh',
    label: 'Ilakh',
    tagline: 'Goal tracking & finance — precise, trustworthy, focused',
    displayFont: { name: 'Manrope', token: '--font-display', use: 'Display & Headings', cssValue: "'Manrope', sans-serif", googleFont: 'Manrope:wght@600;700;800' },
    bodyFont: { name: 'Inter', token: '--font-sans', use: 'Body, Tables & UI', cssValue: "Inter, -apple-system, sans-serif" },
    monoFont,
    scale: makeScale({ name: 'Manrope', token: '', use: '', cssValue: '' }, { name: 'Inter', token: '', use: '', cssValue: '' }),
    characterSample: 'Aa Bb Cc 0123',
    accentColor: '#0369A1',
    bgColor: '#EFF8FF',
    cssSnippet: `/* Ilakh — font tokens */
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');

:root {
  --font-display: 'Manrope', sans-serif;
  --font-sans:    Inter, -apple-system, sans-serif;
  --font-mono:    'JetBrains Mono', monospace;
}`,
  },
  {
    id: 'yakaizen',
    label: 'Yakaizen',
    tagline: 'Habit & fitness — bold, minimal, high-contrast',
    displayFont: { name: 'Barlow', token: '--font-display', use: 'Display & Headings', cssValue: "'Barlow', sans-serif", googleFont: 'Barlow:wght@600;700;800' },
    bodyFont: { name: 'Inter', token: '--font-sans', use: 'Body & Metrics Labels', cssValue: "Inter, -apple-system, sans-serif" },
    monoFont,
    scale: makeScale({ name: 'Barlow', token: '', use: '', cssValue: '' }, { name: 'Inter', token: '', use: '', cssValue: '' }),
    characterSample: 'Aa Bb Cc 0123',
    accentColor: '#06B6D4',
    bgColor: '#0F172A',
    isDark: true,
    cssSnippet: `/* Yakaizen — font tokens */
@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');

:root {
  --font-display: 'Barlow', sans-serif;
  --font-sans:    Inter, -apple-system, sans-serif;
  --font-mono:    'JetBrains Mono', monospace;

  /* Condensed headings for watch/widget contexts */
  --font-display-condensed: 'Barlow Condensed', sans-serif;
}`,
  },
];

const fontWeights = [
  { name: 'Regular', value: '400', usage: 'Body text, descriptions' },
  { name: 'Medium', value: '500', usage: 'UI labels, button text' },
  { name: 'SemiBold', value: '600', usage: 'Headings H3–H4, emphasis' },
  { name: 'Bold', value: '700', usage: 'Headings H1–H2, display' },
  { name: 'ExtraBold', value: '800', usage: 'Display text, hero headings' },
];

function FontCard({ font, isDark }: { font: FontFamily; isDark?: boolean }) {
  const textPrimary = isDark ? '#F1F5F9' : '#0F172A';
  const textSecondary = isDark ? '#94A3B8' : '#64748B';
  const bg = isDark ? '#1E293B' : '#FFFFFF';
  const border = isDark ? '#334155' : '#E2E8F0';

  return (
    <div className="p-5 rounded-xl border" style={{ backgroundColor: bg, borderColor: border }}>
      <p className="mb-2 m-0" style={{ fontFamily: font.cssValue, fontSize: '2.25rem', fontWeight: 700, color: textPrimary, letterSpacing: '-0.01em' }}>
        Aa Bb Cc 01
      </p>
      <p className="mb-0.5 m-0" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.875rem', color: textPrimary }}>
        {font.name}
      </p>
      <p className="mb-1 m-0" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: textSecondary }}>
        {font.use}
      </p>
      <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#14B8A6' }}>
        {font.token}
      </code>
    </div>
  );
}

function ScaleRow({ entry, displayFont, bodyFont, isDark }: {
  entry: TypeScaleEntry;
  displayFont: FontFamily;
  bodyFont: FontFamily;
  isDark?: boolean;
}) {
  const isHeading = ['h1', 'h2', 'h3', 'h4'].includes(entry.tag);
  const fontFamily = entry.isMono
    ? 'var(--font-mono)'
    : isHeading
    ? displayFont.cssValue
    : bodyFont.cssValue;

  const textPrimary = isDark ? '#E2E8F0' : '#0F172A';
  const textMeta = isDark ? '#64748B' : '#9CA3AF';
  const evenBg = isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF';
  const oddBg = isDark ? 'rgba(255,255,255,0.01)' : 'rgba(248,250,252,0.6)';
  const border = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(226,232,240,0.6)';

  return (
    <div className="flex items-center gap-4 py-4 px-4 rounded-xl" style={{ background: evenBg, border: `1px solid ${border}` }}>
      <div className="w-28 shrink-0">
        <p className="m-0" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.75rem', color: textPrimary }}>
          {entry.name}
        </p>
        <p className="m-0" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: textMeta }}>
          {entry.size} / {entry.weight}
        </p>
      </div>
      <div className="flex-1 min-w-0 overflow-hidden">
        <p className="truncate m-0" style={{ fontFamily, fontSize: entry.size, fontWeight: parseInt(entry.weight), lineHeight: entry.lineHeight, color: textPrimary }}>
          {entry.sample}
        </p>
      </div>
    </div>
  );
}

const TYPO_BRAND_ORDER = ['aumraa', 'technocracy', 'lemniscate', 'maligai', 'ulagellam', 'ilakh', 'yakaizen'];
const sortedTypoBrands = [...brands].sort((a, b) => {
  const ai = TYPO_BRAND_ORDER.indexOf(a.id);
  const bi = TYPO_BRAND_ORDER.indexOf(b.id);
  return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
});

export function TypographyPage() {
  const [activeTab, setActiveTab] = useState('aumraa');
  const brand = sortedTypoBrands.find(b => b.id === activeTab) || sortedTypoBrands[0];

  const textClass = brand.isDark ? 'text-slate-100' : 'text-slate-900 dark:text-white';
  const textSecondary = brand.isDark ? 'text-slate-400' : 'text-slate-500 dark:text-slate-400';

  return (
    <div className="max-w-5xl px-6 lg:px-10 py-10">
      <PageHeader
        title="Typography"
        description="Each product in the Breathe family has its own font pairing — chosen to match its audience, density, and brand character. Shared mono font across all products."
        section="Foundations"
        badge="Multi-Brand"
        badgeColor="teal"
      />

      {/* Brand Tabs — sticky below TopBar (h-16 = 64px) */}
      <div className="sticky top-16 z-20 bg-slate-50 dark:bg-slate-950 -mx-6 lg:-mx-10 px-6 lg:px-10 mb-8 border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
        <div className="flex gap-0 min-w-max" role="tablist">
          {sortedTypoBrands.map(b => {
            const isActive = b.id === activeTab;
            return (
              <button
                key={b.id}
                onClick={() => setActiveTab(b.id)}
                role="tab"
                aria-selected={isActive}
                className={`relative px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-slate-900 dark:text-white'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
                style={{
                  borderBottomColor: isActive ? b.accentColor : undefined,
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                }}
              >
                {b.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Brand tagline */}
      <p className={`${textSecondary} mb-10 italic`} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
        {brand.tagline}
      </p>

      {/* Font Families */}
      <section className="mb-12" style={brand.isDark ? { background: brand.bgColor, borderRadius: '1rem', padding: '1.5rem' } : {}}>
        <h2 className={`${textClass} mb-1 m-0`} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
          Font Families
        </h2>
        <p className={`${textSecondary} mb-6 mt-1`} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
          {brand.id === 'aumraa' || brand.id === 'technocracy'
            ? `${brand.displayFont.name} — single-family system, differentiated by weight and size.`
            : `${brand.displayFont.name} for display and headings, ${brand.bodyFont.name} for body and UI labels.`}
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          <FontCard font={brand.displayFont} isDark={brand.isDark} />
          {brand.displayFont.name !== brand.bodyFont.name ? (
            <FontCard font={brand.bodyFont} isDark={brand.isDark} />
          ) : (
            <div className="p-5 rounded-xl border flex items-center justify-center"
              style={{ borderColor: brand.isDark ? '#334155' : '#E2E8F0', backgroundColor: brand.isDark ? '#1E293B' : '#FAFAFA' }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: brand.isDark ? '#64748B' : '#94A3B8', textAlign: 'center' }}>
                Same family as display.<br />Weight 400 for body.
              </p>
            </div>
          )}
          <FontCard font={brand.monoFont} isDark={brand.isDark} />
        </div>
      </section>

      {/* Type Scale */}
      <section className="mb-12" style={brand.isDark ? { background: brand.bgColor, borderRadius: '1rem', padding: '1.5rem' } : {}}>
        <h2 className={`${textClass} mb-1 m-0`} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
          Type Scale
        </h2>
        <p className={`${textSecondary} mb-6 mt-1`} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
          Rendered in {brand.displayFont.name} (headings) and {brand.bodyFont.name} (body). Scale is shared across all brands.
        </p>
        <div className="space-y-1">
          {brand.scale.map(entry => (
            <ScaleRow
              key={entry.name}
              entry={entry}
              displayFont={brand.displayFont}
              bodyFont={brand.bodyFont}
              isDark={brand.isDark}
            />
          ))}
        </div>
      </section>

      {/* Font Weights */}
      <section className="mb-12" style={brand.isDark ? { background: brand.bgColor, borderRadius: '1rem', padding: '1.5rem' } : {}}>
        <h2 className={`${textClass} mb-6 m-0`} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
          Font Weights
        </h2>
        <div className="space-y-3">
          {fontWeights.map(w => {
            const bg = brand.isDark ? '#1E293B' : '#FFFFFF';
            const border = brand.isDark ? '#334155' : '#E2E8F0';
            const text = brand.isDark ? '#E2E8F0' : '#0F172A';
            const meta = brand.isDark ? '#64748B' : '#9CA3AF';
            return (
              <div key={w.name} className="flex items-center gap-6 p-4 rounded-xl border" style={{ backgroundColor: bg, borderColor: border }}>
                <div className="w-24 shrink-0">
                  <p className="m-0" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: meta }}>{w.name}</p>
                  <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#14B8A6' }}>{w.value}</code>
                </div>
                <p className="flex-1 m-0" style={{ fontFamily: brand.displayFont.cssValue, fontWeight: parseInt(w.value), fontSize: '1.1rem', color: text }}>
                  The quick brown fox jumps over the lazy dog
                </p>
                <p className="shrink-0 hidden sm:block m-0" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: meta }}>
                  {w.usage}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CSS snippet */}
      <section className="mb-12">
        <h2 className={`${textClass} mb-4 m-0`} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
          Usage in CSS
        </h2>
        <CodeBlock code={brand.cssSnippet} language="css" />
      </section>

      {/* Shared standards */}
      <section className="mb-12">
        <h2 className="text-slate-900 dark:text-white mb-4 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
          Shared Standards
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
          These rules apply to all brands. Font pairing changes; scale, spacing, and contrast requirements do not.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              title: 'Do',
              color: 'border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20',
              titleColor: 'text-emerald-700 dark:text-emerald-400',
              items: [
                'Use the type scale — never ad-hoc font sizes',
                'Reference --font-display/sans/mono tokens, not raw families',
                'Maintain 4.5:1 contrast (WCAG AA) for all body text',
                'Load Google Fonts via the brand-specific @import in tokens',
              ],
            },
            {
              title: "Don't",
              color: 'border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20',
              titleColor: 'text-rose-700 dark:text-rose-400',
              items: [
                'Hardcode font-family strings in components',
                "Mix one brand's fonts into another product",
                'Use ExtraBold (800) for body text or captions',
                'Swap fonts without updating the token and dist files',
              ],
            },
          ].map(guide => (
            <div key={guide.title} className={`p-5 rounded-xl border ${guide.color}`}>
              <h4 className={`mb-3 m-0 ${guide.titleColor}`} style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9rem' }}>
                {guide.title}
              </h4>
              <ul className="space-y-1.5">
                {guide.items.map(item => (
                  <li key={item} className="text-slate-600 dark:text-slate-400 flex items-start gap-2" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem' }}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current opacity-60 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <PageNavigation />
    </div>
  );
}
