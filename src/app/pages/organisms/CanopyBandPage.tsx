import { useState } from 'react'
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'

type CanopyVariant = 'dashboard' | 'students' | 'attendance' | 'payments'

const INK = '#FDA581' // Secondary/500

const PATTERNS: Record<CanopyVariant, { title: string; subtitle: string; desc: string }> = {
  dashboard: {
    title: 'Dashboard Zigzags',
    subtitle: 'Daily operations & active momentum',
    desc: 'Angular zigzag tents with centered dots in secondary peach, representing discipline and daily forward steps.',
  },
  students: {
    title: 'Students Waves',
    subtitle: 'Dynamic community flow',
    desc: 'Continuous sinuous crests and troughs with rhythmic dots representing student progression and multi-batch movement.',
  },
  attendance: {
    title: 'Attendance Triangles',
    subtitle: 'Structured check-in & roll-call',
    desc: 'Hollow interlocking triangular flags with central anchor dots representing attendance milestones and mark points.',
  },
  payments: {
    title: 'Payments Sprouts',
    subtitle: 'Growth & fee harvest',
    desc: 'Bud, twin leaves, stem, and foundation mound symbolizing recurring cash recovery and studio financial health.',
  },
}

export function CanopyBandPage() {
  const [activeVariant, setActiveVariant] = useState<CanopyVariant>('dashboard')

  return (
    <ComponentPageLayout
      title="CanopyBand"
      description="The cultural soul of Kaayo: four Warli folk art motifs drawn across the red (#970103) canopy in Warm Peach (#FDA581). Plays an entrance draw animation upon opening."
      level="Organism"
      status="Stable"
      implemented={['kaayo']}
      sections={[
        {
          title: 'Interactive Canopy Preview',
          products: ['kaayo'],
          description: 'Explore the 4 tab canopy variants in full-bleed crimson.',
          preview: (
            <div className="flex flex-col gap-6 w-full">
              {/* Red Canopy Container */}
              <div className="relative overflow-hidden rounded-2xl bg-[#970103] border-2 border-[#17191D] p-6 shadow-[4px_4px_0_#17191D] flex flex-col justify-between min-h-[180px]">
                {/* SVG Canopy Band */}
                <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none opacity-80 overflow-hidden">
                  {activeVariant === 'dashboard' && (
                    <svg className="w-full h-full" viewBox="0 0 400 40" preserveAspectRatio="none">
                      <pattern id="pat-dash" width="50.7" height="40" patternUnits="userSpaceOnUse">
                        <path d="M-12.68 12L0 22.5L25.36 1.5L50.71 22.5L63.39 12" stroke={INK} strokeWidth="2.2" fill="none" />
                        <circle cx="25.36" cy="17.3" r="3.17" fill={INK} />
                        <circle cx="0" cy="7" r="3.17" fill={INK} />
                      </pattern>
                      <rect width="100%" height="100%" fill="url(#pat-dash)" />
                    </svg>
                  )}
                  {activeVariant === 'students' && (
                    <svg className="w-full h-full" viewBox="0 0 400 50" preserveAspectRatio="none">
                      <pattern id="pat-stu" width="261.8" height="50" patternUnits="userSpaceOnUse">
                        <path
                          d="M-130.91 38C-83.79 38 -47.12 3 0 3S83.79 38 130.91 38S214.7 3 261.82 3S345.61 38 392.73 38"
                          stroke={INK}
                          strokeWidth="4"
                          fill="none"
                        />
                        <circle cx="0" cy="24" r="5" fill={INK} />
                        <circle cx="130.91" cy="14" r="5" fill={INK} />
                      </pattern>
                      <rect width="100%" height="100%" fill="url(#pat-stu)" />
                    </svg>
                  )}
                  {activeVariant === 'attendance' && (
                    <svg className="w-full h-full" viewBox="0 0 400 30" preserveAspectRatio="none">
                      <pattern id="pat-att" width="36" height="30" patternUnits="userSpaceOnUse">
                        <path fillRule="evenodd" d="M30 24H0L15 0L30 24ZM4.3 21.6H25.7L15 4.48L4.3 21.6Z" fill={INK} />
                        <circle cx="15" cy="15" r="1.5" fill={INK} />
                      </pattern>
                      <rect width="100%" height="100%" fill="url(#pat-att)" />
                    </svg>
                  )}
                  {activeVariant === 'payments' && (
                    <svg className="w-full h-full" viewBox="0 0 400 35" preserveAspectRatio="none">
                      <pattern id="pat-pay" width="34" height="35" patternUnits="userSpaceOnUse">
                        <path d="M9 0.5C10.4 2 11 3.4 11 4.6C11 5.8 10.1 6.8 9 6.8C7.9 6.8 7 5.8 7 4.6C7 3.4 7.6 2 9 0.5Z" fill={INK} />
                        <path d="M2.4 7.4C5.9 7.6 8.4 10 8.6 13.4C5.1 13.2 2.6 10.9 2.4 7.4Z" fill={INK} />
                        <path d="M15.6 7.4C12.1 7.6 9.6 10 9.4 13.4C12.9 13.2 15.4 10.9 15.6 7.4Z" fill={INK} />
                        <path d="M9 6.8V15.6" stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
                        <path d="M9 15.6L16.8 23.2H1.2L9 15.6Z" stroke={INK} strokeWidth="1.4" strokeLinejoin="round" fill="none" />
                      </pattern>
                      <rect width="100%" height="100%" fill="url(#pat-pay)" />
                    </svg>
                  )}
                </div>

                <div className="relative z-10 flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-widest text-[#FDA581] font-bold">
                    KAAYO BRAND CANOPY
                  </span>
                  <h3 className="text-2xl font-bold text-white m-0">
                    {PATTERNS[activeVariant].title}
                  </h3>
                  <p className="text-sm text-rose-100 max-w-lg mt-1">
                    {PATTERNS[activeVariant].desc}
                  </p>
                </div>
              </div>

              {/* Selector Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(['dashboard', 'students', 'attendance', 'payments'] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setActiveVariant(v)}
                    className={`p-3 text-left rounded-xl border transition-all ${
                      activeVariant === v
                        ? 'bg-rose-50 border-[#970103] shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span className="font-bold text-xs uppercase tracking-wide block text-[#970103]">
                      {v}
                    </span>
                    <span className="text-xs text-slate-600 block mt-0.5">
                      {PATTERNS[v].subtitle}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ),
          code: {
            react: `import { KayoBrutalistBrandedScreenBackdrop } from '@aumraa/breathe-react/kaayo'

<KayoBrutalistBrandedScreenBackdrop
  variant="${activeVariant}"
  title="${PATTERNS[activeVariant].title}"
>
  {/* Screen content */}
</KayoBrutalistBrandedScreenBackdrop>`,
            reactNative: `import { CanopyBand } from '@aumraa/breathe-native/kaayo'

<CanopyBand
  variant="${activeVariant}"
  width={width}
  height={64}
/>`,
          },
        },
      ]}
    />
  )
}
export default CanopyBandPage

