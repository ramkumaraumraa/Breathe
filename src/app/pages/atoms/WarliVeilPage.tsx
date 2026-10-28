import { useState } from 'react'
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { KayoWarliVeil, KayoBrutalistAmountVisibilityToggle } from '@aumraa/breathe-react/kaayo'

export function WarliVeilPage() {
  const [visible, setVisible] = useState(false)

  return (
    <ComponentPageLayout
      title="WarliVeil"
      description="The financial privacy masking component. Disguises monetary figures with ₹ + four Warli diamond-with-dot glyphs (or three for counts). Fixed width invariant prevents guessing amounts by character length."
      level="Atom"
      status="Stable"
      implemented={['kaayo']}
      sections={[
        {
          title: 'Interactive Privacy Masking',
          products: ['kaayo'],
          description: 'Toggle visibility to observe the entrance transition and glyph masking.',
          preview: (
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <KayoBrutalistAmountVisibilityToggle
                  visible={visible}
                  onToggle={() => setVisible(!visible)}
                  label={visible ? 'Hide Amounts' : 'Show Amounts'}
                />
                <span className="text-xs text-slate-500 font-mono">
                  Mode: <strong>{visible ? 'REVEALED' : 'VEILED'}</strong>
                </span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Large Amount */}
                <div className="p-6 bg-white rounded-2xl border-2 border-[#17191D] shadow-[4px_4px_0_#17191D] flex flex-col justify-between min-h-[130px]">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    Total Revenue
                  </span>
                  <div className="text-2xl font-bold text-slate-900 mt-2">
                    <KayoWarliVeil
                      value={145000}
                      visible={visible}
                      kind="amount"
                      textStyle={{ fontSize: '24px', fontWeight: 700 }}
                    />
                  </div>
                  <span className="text-xs text-emerald-600 font-semibold mt-2">
                    +14% vs last month
                  </span>
                </div>

                {/* Overdue Amount */}
                <div className="p-6 bg-white rounded-2xl border-2 border-[#17191D] shadow-[4px_4px_0_#17191D] flex flex-col justify-between min-h-[130px]">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    Pending Fees
                  </span>
                  <div className="text-2xl font-bold text-rose-700 mt-2">
                    <KayoWarliVeil
                      value={18500}
                      visible={visible}
                      kind="amount"
                      textStyle={{ fontSize: '24px', fontWeight: 700, color: '#DC2626' }}
                    />
                  </div>
                  <span className="text-xs text-rose-600 font-semibold mt-2">
                    4 students overdue
                  </span>
                </div>

                {/* Count */}
                <div className="p-6 bg-white rounded-2xl border-2 border-[#17191D] shadow-[4px_4px_0_#17191D] flex flex-col justify-between min-h-[130px]">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    Paid Students
                  </span>
                  <div className="text-2xl font-bold text-slate-900 mt-2">
                    <KayoWarliVeil
                      value={42}
                      visible={visible}
                      kind="count"
                      textStyle={{ fontSize: '24px', fontWeight: 700 }}
                    />
                  </div>
                  <span className="text-xs text-slate-500 mt-2">
                    Across 3 branches
                  </span>
                </div>
              </div>
            </div>
          ),
          code: {
            react: `import { KayoWarliVeil } from '@aumraa/breathe-react/kaayo'

<KayoWarliVeil
  value={145000}
  visible={visible}
  kind="amount"
  textStyle={{ fontSize: '24px', fontWeight: 700 }}
/>`,
            reactNative: `import { WarliVeil } from '@aumraa/breathe-native/kaayo'

<WarliVeil
  value={145000}
  visible={visible}
  kind="amount"
  textStyle={typography.heading_h2}
/>`,
          },
        },
      ]}
    />
  )
}
export default WarliVeilPage

