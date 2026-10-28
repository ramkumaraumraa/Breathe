import { useState } from 'react'
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { KayoChip, type ChipTone } from '@aumraa/breathe-react/kaayo'
import { TrendingUp, Clock, Calendar } from 'lucide-react'

export function ChipPage() {
  const [tone, setTone] = useState<ChipTone>('secondary')
  const [size, setSize] = useState<'sm' | 'md' | 'count'>('sm')
  const [withDot, setWithDot] = useState(true)
  const [withIcon, setWithIcon] = useState(false)

  const tones: ChipTone[] = ['secondary', 'primary', 'positive', 'alert', 'supportive', 'negative', 'neutral']

  return (
    <ComponentPageLayout
      title="Chip"
      description="Soft inset information chip (never tappable). Shaded with soft clay inset SM, sentence-case typography (0 letter-spacing). Distinct from Badges (outlined status) and ClayPills (actions)."
      level="Atom"
      status="Stable"
      implemented={['kaayo']}
      sections={[
        {
          title: 'Interactive Playground',
          products: ['kaayo'],
          description: 'Configure tone, size, status dot, and leading icon.',
          preview: (
            <div className="flex flex-col gap-6">
              <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center min-h-[120px]">
                <KayoChip
                  label={size === 'count' ? '14 students' : 'Starts in 25m'}
                  tone={tone}
                  size={size}
                  dot={withDot ? 'live' : undefined}
                  icon={withIcon ? TrendingUp : undefined}
                />
              </div>

              {/* Controls */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Tone</label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value as ChipTone)}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                  >
                    {tones.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Size</label>
                  <div className="flex gap-2">
                    {(['sm', 'md', 'count'] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSize(s)}
                        className={`flex-1 py-1 text-xs font-bold rounded-lg border transition-all ${
                          size === s
                            ? 'bg-[#970103] text-white border-[#970103]'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Status Dot</label>
                  <button
                    type="button"
                    onClick={() => setWithDot(!withDot)}
                    className={`w-full py-1.5 text-xs font-bold rounded-lg border transition-all ${
                      withDot
                        ? 'bg-rose-100 text-rose-900 border-rose-400'
                        : 'bg-white dark:bg-slate-800 text-slate-600 border-slate-300'
                    }`}
                  >
                    {withDot ? 'Dot (Live)' : 'None'}
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Leading Icon</label>
                  <button
                    type="button"
                    onClick={() => setWithIcon(!withIcon)}
                    className={`w-full py-1.5 text-xs font-bold rounded-lg border transition-all ${
                      withIcon
                        ? 'bg-rose-100 text-rose-900 border-rose-400'
                        : 'bg-white dark:bg-slate-800 text-slate-600 border-slate-300'
                    }`}
                  >
                    {withIcon ? 'TrendingUp' : 'None'}
                  </button>
                </div>
              </div>
            </div>
          ),
          code: {
            react: `import { KayoChip } from '@aumraa/breathe-react/kaayo'

<KayoChip
  label="Starts in 25m"
  tone="${tone}"
  size="${size}"
  ${withDot ? 'dot="live"' : ''}
/>`,
            reactNative: `import { Chip } from '@aumraa/breathe-native/kaayo'

<Chip
  label="Starts in 25m"
  tone="${tone}"
  size="${size}"
  ${withDot ? 'dot="live"' : ''}
/>`,
          },
        },
        {
          title: 'Tones & Sizes Showcase',
          products: ['kaayo'],
          description: 'Each tone uses Tone/25 fill, Tone/100 inset clay shade, and Tone/900 ink.',
          preview: (
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <KayoChip label="Warm default" tone="secondary" size="sm" />
                <KayoChip label="Primary action" tone="primary" size="sm" />
                <KayoChip label="Paid active" tone="positive" size="sm" dot="active" />
                <KayoChip label="Attendance due" tone="alert" size="sm" dot="pending" />
                <KayoChip label="Info guide" tone="supportive" size="sm" dot="info" />
                <KayoChip label="Overdue alert" tone="negative" size="sm" dot="inactive" />
                <KayoChip label="Neutral date" tone="neutral" size="sm" />
              </div>
              <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <KayoChip label="Medium canopy pill" tone="secondary" size="md" icon={Calendar} />
                <KayoChip label="14 enrolled" tone="secondary" size="count" />
                <KayoChip label="+12% growth" tone="positive" size="sm" icon={TrendingUp} />
              </div>
            </div>
          ),
        },
      ]}
    />
  )
}
export default ChipPage

