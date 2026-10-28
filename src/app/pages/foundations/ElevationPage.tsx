import { PageHeader } from '../../components/shared/PageHeader';
import { FoundationCodeCard } from '../../components/shared/FoundationCodeCard';
import { PageNavigation } from '../../components/shared/PageNavigation';

const elevations = [
  {
    level: 0,
    name: 'Flat',
    token: '--breathe-shadow-0',
    css: 'none',
    usage: 'No elevation. For inlined, flush, or disabled elements.',
  },
  {
    level: 1,
    name: 'Raised',
    token: '--breathe-shadow-1',
    css: '0 1px 2px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.08)',
    usage: 'Cards, panels. Subtle lift from the surface.',
  },
  {
    level: 2,
    name: 'Elevated',
    token: '--breathe-shadow-2',
    css: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
    usage: 'Dropdowns, hover states, selected cards.',
  },
  {
    level: 3,
    name: 'Floating',
    token: '--breathe-shadow-3',
    css: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
    usage: 'Tooltips, popovers, date pickers.',
  },
  {
    level: 4,
    name: 'Overlay',
    token: '--breathe-shadow-4',
    css: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
    usage: 'Modals, dialogs, command palettes.',
  },
  {
    level: 5,
    name: 'Maximum',
    token: '--breathe-shadow-5',
    css: '0 25px 50px -12px rgba(0,0,0,0.25)',
    usage: 'Full-screen overlays, highest priority UI.',
  },
];

const coloredShadows = [
  { name: 'Primary Glow', color: '#0D9488', shadow: '0 8px 16px -4px rgba(13, 148, 136, 0.35)' },
  { name: 'Secondary Glow', color: '#6366F1', shadow: '0 8px 16px -4px rgba(99, 102, 241, 0.35)' },
  { name: 'Success Glow', color: '#059669', shadow: '0 8px 16px -4px rgba(5, 150, 105, 0.35)' },
  { name: 'Danger Glow', color: '#E11D48', shadow: '0 8px 16px -4px rgba(225, 29, 72, 0.35)' },
];

export function ElevationPage() {
  return (
    <div className="max-w-7xl px-6 lg:px-10 py-10">
      <PageHeader
        title="Elevation"
        description="Elevation communicates hierarchy and depth through shadows. Breathe's shadow system has 6 levels, each serving a distinct purpose in the interface."
        section="Foundations"
        badge="Tokens"
      />

      {/* Shadow levels */}
      <section className="mb-12">
        <h2 className="text-slate-900 dark:text-white mb-2 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
          Shadow Scale
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8 mt-1" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
          Six elevation levels from flat to maximum overlay.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {elevations.map(elevation => (
            <div key={elevation.level} className="flex flex-col gap-4">
              <div
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[120px] border border-slate-100 dark:border-transparent"
                style={{ boxShadow: elevation.css }}
              >
                <span className="text-slate-900 dark:text-slate-100" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem' }}>
                  {elevation.level}
                </span>
                <span className="text-slate-400 dark:text-slate-500" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem' }}>
                  Level {elevation.level}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-slate-900 dark:text-slate-200" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.875rem' }}>
                    {elevation.name}
                  </span>
                </div>
                <code className="block text-teal-600 dark:text-teal-400 mb-1.5" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
                  {elevation.token}
                </code>
                <p className="text-slate-500 dark:text-slate-400 m-0" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.775rem', lineHeight: 1.5 }}>
                  {elevation.usage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Colored shadows */}
      <section className="mb-12">
        <h2 className="text-slate-900 dark:text-white mb-2 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
          Colored Shadows
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8 mt-1" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
          Tinted glow effects to reinforce interactive states.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coloredShadows.map(item => (
            <div key={item.name} className="flex flex-col items-center gap-4">
              <div
                className="w-full h-20 rounded-2xl"
                style={{ backgroundColor: item.color, boxShadow: item.shadow }}
              />
              <p className="text-slate-700 dark:text-slate-300 text-center m-0"
                 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 500 }}>
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Usage guide */}
      <section className="mb-12">
        <h2 className="text-slate-900 dark:text-white mb-4 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
          When to Use Each Level
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700/60">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60">
                {['Level', 'Name', 'Components', 'Interaction'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700/60"
                      style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.8rem' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { level: 0, name: 'Flat', components: 'Inline, table rows', interaction: 'Static' },
                { level: 1, name: 'Raised', components: 'Cards, list items', interaction: 'Default state' },
                { level: 2, name: 'Elevated', components: 'Dropdowns, hover', interaction: 'Hover state' },
                { level: 3, name: 'Floating', components: 'Tooltips, popovers', interaction: 'On demand' },
                { level: 4, name: 'Overlay', components: 'Modals, drawers', interaction: 'Blocking' },
                { level: 5, name: 'Maximum', components: 'Full overlays', interaction: 'Critical' },
              ].map((row, i) => (
                <tr key={row.level} className={i % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/50 dark:bg-slate-800/20'}>
                  <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                    <span className="w-6 h-6 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 flex items-center justify-center"
                          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 600, display: 'inline-flex' }}>
                      {row.level}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                      style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 500 }}>
                    {row.name}
                  </td>
                  <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400"
                      style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem' }}>
                    {row.components}
                  </td>
                  <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400"
                      style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem' }}>
                    {row.interaction}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Kaayo: Soft Clay & Brutalist Depth */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-slate-900 dark:text-white m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
            Kaayo: Soft Clay &amp; Brutalist Depth
          </h2>
          <span className="px-2 py-0.5 text-xs font-bold rounded bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
            Kaayo v1.8.0
          </span>
        </div>
        <p className="text-slate-500 dark:text-slate-400 mb-8 mt-1 max-w-3xl" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
          Kaayo fuses <strong>Neo-Brutalism</strong> (hard offset shadows, ink boundaries, sharp mechanical feedback) with <strong>Skeuomorphism 2.0</strong> (soft clay surfaces, directional light sources, tactile inset grooves).
        </p>

        {/* 1. Hard Shadows */}
        <div className="mb-8">
          <h3 className="text-slate-800 dark:text-slate-200 text-base font-semibold mb-3">
            Brutalist Hard Offset Shadows
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { name: 'Hard SM', token: '--kayo-shadow-sm', css: '2px 2px 0 #17191D', desc: 'Cards, pills, tabs' },
              { name: 'Hard MD', token: '--kayo-shadow-md', css: '4px 4px 0 #17191D', desc: 'Canopy cards, modals' },
              { name: 'Hard LG', token: '--kayo-shadow-lg', css: '6px 6px 0 #17191D', desc: 'Floating FAB, dialogs' },
              { name: 'Hard XL', token: '--kayo-shadow-xl', css: '8px 8px 0 #17191D', desc: 'Hero callouts' },
              { name: 'Hard Drop', token: '--kayo-shadow-drop', css: '0px 2px 0px 0px #17191D', desc: 'Canopy edge, bottom bar' },
            ].map(item => (
              <div key={item.name} className="flex flex-col gap-2">
                <div
                  className="bg-white rounded-lg p-4 flex flex-col items-center justify-center min-h-[90px] border-2 border-[#17191D]"
                  style={{ boxShadow: item.css }}
                >
                  <span className="text-[#17191D] font-bold text-sm">{item.name}</span>
                </div>
                <div>
                  <code className="block text-rose-700 dark:text-rose-400 text-xs font-mono">{item.token}</code>
                  <p className="text-slate-500 text-xs mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Soft Clay Raised */}
        <div className="mb-8">
          <h3 className="text-slate-800 dark:text-slate-200 text-base font-semibold mb-3">
            Soft Clay Raised (Dual Blurred Shadows, Top-Left Light)
          </h3>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { name: 'Raised SM', token: '--kayo-clay-raised-sm', css: '-2px -2px 4px 0px #ffffff, 2px 3px 6px 0px #fed0bd', desc: 'Knobs, navigation buttons, small icons' },
              { name: 'Raised MD', token: '--kayo-clay-raised-md', css: '-4px -4px 10px 0px #ffffff, 5px 6px 14px 0px #fed0bd', desc: 'Batches dial, summary cards' },
              { name: 'Raised LG', token: '--kayo-clay-raised-lg', css: '-6px -6px 14px 0px #ffffff, 8px 10px 22px 0px #fed0bd', desc: 'Notification banner carousel cards' },
            ].map(item => (
              <div key={item.name} className="flex flex-col gap-2">
                <div
                  className="bg-[#FFF7F3] rounded-2xl p-6 flex flex-col items-center justify-center min-h-[110px]"
                  style={{ boxShadow: item.css }}
                >
                  <span className="text-[#17191D] font-bold text-base">{item.name}</span>
                  <span className="text-slate-500 text-xs mt-1">Light source top-left</span>
                </div>
                <div>
                  <code className="block text-rose-700 dark:text-rose-400 text-xs font-mono">{item.token}</code>
                  <p className="text-slate-500 text-xs mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Soft Clay Inset */}
        <div className="mb-8">
          <h3 className="text-slate-800 dark:text-slate-200 text-base font-semibold mb-3">
            Soft Clay Inset (Inner Warm Shade + Inner White Rim)
          </h3>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { name: 'Inset SM', token: '--kayo-clay-inset-sm', css: 'inset 2px 2px 4px 0px #fed0bd, inset -2px -2px 4px 0px #ffffff', desc: 'Information chips, groove track, toggles' },
              { name: 'Inset MD', token: '--kayo-clay-inset-md', css: 'inset 3px 3px 6px 0px #fed0bd, inset -3px -3px 6px 0px #ffffff', desc: 'Deep recessed trays, search wells' },
              { name: 'Inset LG', token: '--kayo-clay-inset-lg', css: 'inset 4px 4px 10px 0px #fed0bd, inset -4px -4px 8px 0px #ffffff', desc: 'Sunken calendar matrix' },
            ].map(item => (
              <div key={item.name} className="flex flex-col gap-2">
                <div
                  className="bg-[#FFF7F3] rounded-2xl p-6 flex flex-col items-center justify-center min-h-[110px]"
                  style={{ boxShadow: item.css }}
                >
                  <span className="text-[#17191D] font-bold text-base">{item.name}</span>
                  <span className="text-slate-500 text-xs mt-1">Recessed into surface</span>
                </div>
                <div>
                  <code className="block text-rose-700 dark:text-rose-400 text-xs font-mono">{item.token}</code>
                  <p className="text-slate-500 text-xs mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Outlined Clay & Interactive Press Demo */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-3">
            <h3 className="text-slate-800 dark:text-slate-200 text-base font-semibold">
              Outlined Clay Card
            </h3>
            <div
              className="bg-[#FFF7F3] rounded-3xl p-6 flex flex-col justify-between min-h-[140px] border-2 border-[#6C3E17]"
              style={{ boxShadow: '2px 2px 0px 0px #b47962, -2px -2px 0px 0px #fed0bd, 8px 10px 22px 0px #fed0bd' }}
            >
              <div>
                <span className="text-[#17191D] font-bold text-base block">Outlined Clay Surface</span>
                <span className="text-slate-600 text-xs mt-1 block">
                  Hard dual rims (#b47962 bottom-right, #fed0bd top-left) combined with 22px warm peach lift.
                </span>
              </div>
              <code className="text-rose-700 dark:text-rose-400 text-xs font-mono">--kayo-clay-outlined</code>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-slate-800 dark:text-slate-200 text-base font-semibold">
              Interactive Mechanical Press Playground
            </h3>
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex items-center justify-around gap-4 min-h-[140px]">
              {/* Brutalist Button */}
              <div className="flex flex-col items-center gap-2">
                <button
                  type="button"
                  className="px-4 py-2 font-bold text-sm text-white bg-[#970103] border-2 border-[#17191D] rounded-lg shadow-[2px_2px_0_#17191D] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-75 cursor-pointer"
                >
                  Click Brutalist
                </button>
                <span className="text-xs text-slate-500 font-mono">translate(2px, 2px)</span>
              </div>

              {/* Soft Clay Knob */}
              <div className="flex flex-col items-center gap-2">
                <button
                  type="button"
                  className="w-12 h-12 rounded-full bg-[#FFF7F3] border border-[#FEC2A9] flex items-center justify-center font-bold text-[#17191D] shadow-[-2px_-2px_4px_#ffffff,2px_3px_6px_#fed0bd] active:scale-95 active:shadow-[inset_2px_2px_4px_#fed0bd,inset_-2px_-2px_4px_#ffffff] transition-all duration-100 cursor-pointer"
                >
                  1
                </button>
                <span className="text-xs text-slate-500 font-mono">scale(0.95) + inset</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <FoundationCodeCard
          title="Usage in CSS"
          description="Reference shadow tokens via CSS custom properties. Use colored shadows for brand-accented hover states."
          code={`/* Elevation tokens */
.card { box-shadow: var(--breathe-shadow-1); }
.card:hover { box-shadow: var(--breathe-shadow-2); }
.dropdown { box-shadow: var(--breathe-shadow-3); }
.modal { box-shadow: var(--breathe-shadow-4); }

/* Colored shadow */
.btn-primary:hover {
  box-shadow: 0 8px 16px -4px rgba(13, 148, 136, 0.35);
}`}
          language="css"
        />
      </section>

      <PageNavigation />
    </div>
  );
}