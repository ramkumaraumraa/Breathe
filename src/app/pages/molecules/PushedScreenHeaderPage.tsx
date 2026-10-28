import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { KayoPushedScreenHeader, KayoBrutalistAmountVisibilityToggle } from '@aumraa/breathe-react/kaayo'
import { useState } from 'react'

export function PushedScreenHeaderPage() {
  const [visible, setVisible] = useState(true)

  return (
    <ComponentPageLayout
      title="PushedScreenHeader"
      description="The standard chromeless back bar for pushed (non-tab) screens in Kaayo. Combines a 44px back trigger with optional right action slot and H2 title + subtitle hierarchy."
      level="Molecule"
      status="Stable"
      implemented={['kaayo']}
      sections={[
        {
          title: 'Interactive Header Example',
          products: ['kaayo'],
          description: 'Used on sub-screens like Fee History, Record Payment, and Student Detail.',
          preview: (
            <div className="max-w-lg w-full p-6 bg-white rounded-2xl border-2 border-[#17191D] shadow-[4px_4px_0_#17191D]">
              <KayoPushedScreenHeader
                backLabel="Payments"
                onBack={() => alert('Navigating back to Payments')}
                title="Fee Collection History"
                subtitle="All recorded cash and UPI transactions for October 2026."
                right={
                  <KayoBrutalistAmountVisibilityToggle
                    visible={visible}
                    onToggle={() => setVisible(!visible)}
                  />
                }
              />
            </div>
          ),
          code: {
            react: `import { KayoPushedScreenHeader, KayoBrutalistAmountVisibilityToggle } from '@aumraa/breathe-react/kaayo'

<KayoPushedScreenHeader
  backLabel="Payments"
  onBack={() => {}}
  title="Fee Collection History"
  subtitle="All recorded cash and UPI transactions for October 2026."
  right={<KayoBrutalistAmountVisibilityToggle visible={visible} onToggle={toggle} />}
/>`,
            reactNative: `import { PushedScreenHeader } from '@aumraa/breathe-native/kaayo'

<PushedScreenHeader
  backLabel="Payments"
  onBack={() => router.back()}
  title="Fee Collection History"
  subtitle="All recorded cash and UPI transactions for October 2026."
  right={<AmountVisibilityToggle visible={visible} onToggle={toggle} />}
/>`,
          },
        },
      ]}
    />
  )
}
export default PushedScreenHeaderPage

