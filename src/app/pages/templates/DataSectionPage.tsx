import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { DataSection } from '@/app/components/custom/template/DataSection'

export function DataSectionPage() {
  return (
    <ComponentPageLayout
      title="Data Section"
      description="Bordered card container for tables, lists, and data-dense content. Padding is tighter on mobile and relaxed on desktop."
      level="Template"
      status="Stable"
      sections={[
        {
          title: 'Default',
          preview: (
            <DataSection className="w-full">
              <p className="text-sm font-medium mb-3">Recent Transactions</p>
              <div className="space-y-2">
                {['Member dues — ₹500', 'Loan repayment — ₹1,200', 'Interest credit — ₹85'].map(t => (
                  <div key={t} className="flex justify-between text-sm py-1.5 border-b border-border last:border-0">
                    <span>{t.split('—')[0]}</span>
                    <span className="font-medium">{t.split('—')[1]}</span>
                  </div>
                ))}
              </div>
            </DataSection>
          ),
          code: {
            react: `import { DataSection } from '@breathe/templates'

<DataSection>
  <Table>...</Table>
</DataSection>`,
          },
        },
      ]}
    />
  )
}
