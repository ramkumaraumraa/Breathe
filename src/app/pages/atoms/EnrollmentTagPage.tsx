import { useState } from 'react'
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { KayoEnrollmentTag } from '@aumraa/breathe-react/kaayo'

export function EnrollmentTagPage() {
  const [tone, setTone] = useState<'tertiary' | 'neutral'>('tertiary')

  return (
    <ComponentPageLayout
      title="EnrollmentTag"
      description="Rectangular outlined tag with MapPin icon and hairline border for branch and class identification. Tertiary on student cards; Neutral on summary sheets."
      level="Atom"
      status="Stable"
      implemented={['kaayo']}
      sections={[
        {
          title: 'Interactive Preview',
          products: ['kaayo'],
          description: 'Toggle between Tertiary and Neutral tones.',
          preview: (
            <div className="flex flex-col gap-6">
              <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col items-center justify-center gap-4 min-h-[120px]">
                <KayoEnrollmentTag
                  label="MAIN BRANCH · MMA ADVANCED"
                  tone={tone}
                />
              </div>

              {/* Controls */}
              <div className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setTone('tertiary')}
                  className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
                    tone === 'tertiary'
                      ? 'bg-[#37415C] text-white border-[#37415C]'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300'
                  }`}
                >
                  Tertiary (Student Card)
                </button>
                <button
                  type="button"
                  onClick={() => setTone('neutral')}
                  className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
                    tone === 'neutral'
                      ? 'bg-slate-800 text-white border-slate-900'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300'
                  }`}
                >
                  Neutral (Summary Dialog)
                </button>
              </div>
            </div>
          ),
          code: {
            react: `import { KayoEnrollmentTag } from '@aumraa/breathe-react/kaayo'

<KayoEnrollmentTag
  label="MAIN BRANCH · MMA ADVANCED"
  tone="${tone}"
/>`,
            reactNative: `import { EnrollmentTag } from '@aumraa/breathe-native/kaayo'

<EnrollmentTag
  label="MAIN BRANCH · MMA ADVANCED"
  tone="${tone}"
/>`,
          },
        },
        {
          title: 'Card Context Example',
          products: ['kaayo'],
          description: 'How EnrollmentTags sit in a 2-column student roster card.',
          preview: (
            <div className="max-w-sm p-4 bg-white rounded-xl border-2 border-[#17191D] shadow-[2px_2px_0_#17191D] flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-sm text-[#17191D] m-0">Aarav Sharma</h4>
                  <span className="text-xs text-slate-500">Roll #24 · Enrolled Aug 2026</span>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-100 text-emerald-800">
                  PAID
                </span>
              </div>
              <KayoEnrollmentTag label="SOUTH CLUB · BOXING BEGINNERS" tone="tertiary" />
            </div>
          ),
        },
      ]}
    />
  )
}
export default EnrollmentTagPage

