import { useState } from 'react'
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { KayoBrutalistAmountVisibilityToggle } from '@aumraa/breathe-react/kaayo'

export function AmountVisibilityTogglePage() {
  const [visible, setVisible] = useState(true)

  return (
    <ComponentPageLayout
      title="Amount Visibility Toggle"
      description="Financial privacy toggle component for obscuring or revealing sensitive rupee figures and student counts."
      level="Atom"
      status="Stable"
      implemented={['kaayo']}
      sections={[
        {
          title: 'Interactive Toggle',
          description: 'Click the eye control to toggle figure masking state.',
          preview: (
            <div className="flex flex-col gap-4 items-start">
              <KayoBrutalistAmountVisibilityToggle
                visible={visible}
                onToggle={() => setVisible(!visible)}
                label={visible ? 'Hide Amounts' : 'Show Amounts'}
              />
              <div className="p-4 border-2 border-slate-900 rounded-lg bg-white shadow-[2px_2px_0_#191b1f]">
                <div className="text-xs text-slate-500 uppercase font-semibold">Total Revenue</div>
                <div className="text-2xl font-bold text-slate-900 mt-1">
                  {visible ? '₹ 1,45,000' : '₹ ••••'}
                </div>
              </div>
            </div>
          ),
          code: {
            react: `import { KayoBrutalistAmountVisibilityToggle } from '@aumraa/breathe-react/kaayo'
import { useState } from 'react'

const [visible, setVisible] = useState(true)

<KayoBrutalistAmountVisibilityToggle
  visible={visible}
  onToggle={() => setVisible(!visible)}
  label={visible ? 'Hide Amounts' : 'Show Amounts'}
/>`,
            reactNative: `import { AmountVisibilityToggle } from '@kaayo/components/atoms/AmountVisibilityToggle'

<AmountVisibilityToggle
  visible={visible}
  onToggle={() => setVisible(!visible)}
/>`,
          },
        },
      ]}
    />
  )
}
