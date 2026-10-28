import { useState } from 'react'
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { KayoClayDial, KayoSegmentRing } from '@aumraa/breathe-react/kaayo'

export function ClayDialPage() {
  const [variant, setVariant] = useState<'inset' | 'raised'>('raised')
  const [batchCount, setBatchCount] = useState(4)

  const colors = ['#01971A', '#F5590B', '#DC2626', '#266FDC', '#970103', '#FDA581'].slice(0, batchCount)

  return (
    <ComponentPageLayout
      title="ClayDial & SegmentRing"
      description="Circular clay dials around a multi-segment SVG ring, centered numeric value, and uppercase caption. Inset 76px for Attendance day-progress; Raised 92px for Home batches."
      level="Molecule"
      status="Stable"
      implemented={['kaayo']}
      sections={[
        {
          title: 'Interactive Dial Preview',
          products: ['kaayo'],
          description: 'Switch between Raised 92px and Inset 76px variants, and adjust segment items.',
          preview: (
            <div className="flex flex-col gap-6">
              <div className="p-8 bg-[#FFF7F3] rounded-3xl border border-[#FEC2A9] flex items-center justify-center min-h-[160px]">
                <KayoClayDial
                  variant={variant}
                  colors={colors}
                  value={batchCount}
                  caption={variant === 'raised' ? 'BATCHES' : 'DONE'}
                />
              </div>

              {/* Controls */}
              <div className="grid sm:grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Variant</label>
                  <div className="flex gap-2">
                    {(['raised', 'inset'] as const).map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setVariant(v)}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-lg border capitalize transition-all ${
                          variant === v
                            ? 'bg-[#970103] text-white border-[#970103]'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300'
                        }`}
                      >
                        {v} ({v === 'raised' ? '92px' : '76px'})
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Segments ({batchCount})
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="6"
                    value={batchCount}
                    onChange={(e) => setBatchCount(parseInt(e.target.value, 10))}
                    className="w-full cursor-pointer mt-2"
                  />
                </div>
              </div>
            </div>
          ),
          code: {
            react: `import { KayoClayDial } from '@aumraa/breathe-react/kaayo'

<KayoClayDial
  variant="${variant}"
  colors={${JSON.stringify(colors)}}
  value={${batchCount}}
  caption="${variant === 'raised' ? 'BATCHES' : 'DONE'}"
/>`,
            reactNative: `import { ClayDial } from '@aumraa/breathe-native/kaayo'

<ClayDial
  variant="${variant}"
  colors={${JSON.stringify(colors)}}
  value={${batchCount}}
  caption="${variant === 'raised' ? 'BATCHES' : 'DONE'}"
/>`,
          },
        },
        {
          title: 'Both Canonical Dial Variants',
          products: ['kaayo'],
          description: 'Side-by-side comparison of Attendance day-progress dial and Dashboard batches dial.',
          preview: (
            <div className="flex flex-wrap items-center justify-around gap-8 p-6 bg-[#FFF7F3] rounded-2xl border border-[#FEC2A9]">
              <div className="flex flex-col items-center gap-2">
                <KayoClayDial
                  variant="inset"
                  colors={['#01971A', '#01971A', '#F5590B']}
                  value="2/3"
                  caption="DONE"
                />
                <span className="text-xs font-semibold text-slate-600">Inset 76 (Attendance Progress)</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <KayoClayDial
                  variant="raised"
                  colors={['#01971A', '#01971A', '#DC2626', '#266FDC']}
                  value={4}
                  caption="BATCHES"
                />
                <span className="text-xs font-semibold text-slate-600">Raised 92 (Dashboard Overview)</span>
              </div>
            </div>
          ),
        },
      ]}
    />
  )
}
export default ClayDialPage

