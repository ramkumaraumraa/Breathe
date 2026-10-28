import { useState } from 'react'
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { KayoStatusDot, type DotStatus } from '@aumraa/breathe-react/kaayo'

export function StatusDotPage() {
  const [status, setStatus] = useState<DotStatus>('live')
  const [size, setSize] = useState<8 | 6 | 5>(8)
  const [breathing, setBreathing] = useState(true)
  const [inverse, setInverse] = useState(false)

  const allStatuses: DotStatus[] = ['active', 'live', 'inactive', 'pending', 'upcoming', 'info']

  return (
    <ComponentPageLayout
      title="StatusDot"
      description="One dot for every status in Kaayo. SVG-rendered at 8px, 6px, or 5px to prevent square distortion on Android. Features radial glow for live state and continuous breathing opacity loop."
      level="Atom"
      status="Stable"
      implemented={['kaayo']}
      sections={[
        {
          title: 'Interactive Playground',
          products: ['kaayo'],
          description: 'Customize status, size, breathing animation, and inverse selection styling.',
          preview: (
            <div className="flex flex-col gap-6">
              <div
                className={`p-6 rounded-2xl border-2 flex items-center justify-center min-h-[120px] transition-colors ${
                  inverse ? 'bg-[#970103] border-[#17191D]' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3">
                  <KayoStatusDot
                    status={status}
                    size={size}
                    breathing={breathing}
                    inverse={inverse}
                  />
                  <span
                    className={`font-semibold text-sm capitalize ${
                      inverse ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {status} status
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as DotStatus)}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                  >
                    {allStatuses.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Size</label>
                  <div className="flex gap-2">
                    {([8, 6, 5] as const).map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSize(sz)}
                        className={`flex-1 py-1 text-xs font-bold rounded-lg border transition-all ${
                          size === sz
                            ? 'bg-[#970103] text-white border-[#970103]'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        {sz}px
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Breathing Loop</label>
                  <button
                    type="button"
                    onClick={() => setBreathing(!breathing)}
                    className={`w-full py-1.5 text-xs font-bold rounded-lg border transition-all ${
                      breathing
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-400'
                        : 'bg-white dark:bg-slate-800 text-slate-600 border-slate-300'
                    }`}
                  >
                    {breathing ? 'Enabled (2.4s)' : 'Disabled'}
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Background Surface</label>
                  <button
                    type="button"
                    onClick={() => setInverse(!inverse)}
                    className={`w-full py-1.5 text-xs font-bold rounded-lg border transition-all ${
                      inverse
                        ? 'bg-rose-900 text-white border-rose-950'
                        : 'bg-white dark:bg-slate-800 text-slate-600 border-slate-300'
                    }`}
                  >
                    {inverse ? 'Selected (Red)' : 'Canvas (Light)'}
                  </button>
                </div>
              </div>
            </div>
          ),
          code: {
            react: `import { KayoStatusDot } from '@aumraa/breathe-react/kaayo'

<KayoStatusDot
  status="${status}"
  size={${size}}
  breathing={${breathing}}
  inverse={${inverse}}
/>`,
            reactNative: `import { StatusDot } from '@aumraa/breathe-native/kaayo'

<StatusDot
  status="${status}"
  size={${size}}
  breathing={${breathing}}
  inverse={${inverse}}
/>`,
          },
        },
        {
          title: 'Status Matrix',
          products: ['kaayo'],
          description: 'Canonical states with their semantic meaning and color tokens.',
          preview: (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { status: 'active', label: 'Active', desc: 'Class done, fees paid (Positive/500)' },
                { status: 'live', label: 'Live', desc: 'Ongoing session with radial halo glow' },
                { status: 'inactive', label: 'Inactive', desc: 'Late, absent, unpaid (Negative/500)' },
                { status: 'pending', label: 'Pending', desc: 'Needs marking, fee due (Alert/500)' },
                { status: 'upcoming', label: 'Upcoming', desc: 'Hollow 1px ring (Neutral/400)' },
                { status: 'info', label: 'Info', desc: 'Informational accent (Supportive/500)' },
              ].map((item) => (
                <div
                  key={item.status}
                  className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-3"
                >
                  <KayoStatusDot status={item.status as DotStatus} size={8} breathing={item.status === 'live'} />
                  <div>
                    <span className="font-bold text-sm text-slate-900 dark:text-slate-100 block">{item.label}</span>
                    <span className="text-xs text-slate-500">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          ),
        },
      ]}
    />
  )
}
export default StatusDotPage

