import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { KayoKhataFolder, KayoChip, KayoClayPill } from '@aumraa/breathe-react/kaayo'
import { MessageCircle } from 'lucide-react'

export function KhataFolderPage() {
  return (
    <ComponentPageLayout
      title="KhataFolder"
      description="The ledger folder card pattern from Kaayo Payments. Features a notched tab over a 2px ink ledger body with a 2px hard brutalist shadow. Designed for high-density payment and student roll views."
      level="Molecule"
      status="Stable"
      implemented={['kaayo']}
      sections={[
        {
          title: 'Ledger Folder Overview',
          products: ['kaayo'],
          description: 'KhataFolder with tab, aside summary chip, and nested payment rows.',
          preview: (
            <div className="max-w-md w-full">
              <KayoKhataFolder
                tab="OCTOBER 2026 KHATA"
                aside={<KayoChip label="6 not paid" tone="alert" size="sm" dot="pending" />}
                bodyStyle={{ padding: '16px' }}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-baseline border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-xs text-slate-500 font-semibold block uppercase tracking-wider">
                        Collected Total
                      </span>
                      <span className="text-2xl font-extrabold text-slate-900 mt-1 block">
                        ₹ 1,45,000
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-rose-600 font-semibold block">
                        ₹ 18,500 pending
                      </span>
                      <span className="text-xs text-slate-400">
                        88% recovery rate
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-1">
                    <span className="text-xs font-semibold text-slate-600">
                      6 overdue reminders ready
                    </span>
                    <KayoClayPill
                      label="Remind all"
                      icon={MessageCircle}
                      onClick={() => alert('Sending reminders')}
                    />
                  </div>
                </div>
              </KayoKhataFolder>
            </div>
          ),
          code: {
            react: `import { KayoKhataFolder, KayoChip, KayoClayPill } from '@aumraa/breathe-react/kaayo'
import { MessageCircle } from 'lucide-react'

<KayoKhataFolder
  tab="OCTOBER 2026 KHATA"
  aside={<KayoChip label="6 not paid" tone="alert" size="sm" dot="pending" />}
  bodyStyle={{ padding: '16px' }}
>
  {/* Ledger body content */}
  <KayoClayPill label="Remind all" icon={MessageCircle} onClick={() => {}} />
</KayoKhataFolder>`,
            reactNative: `import { KhataFolder, Chip, ClayPill } from '@aumraa/breathe-native/kaayo'

<KhataFolder
  tab="OCTOBER 2026 KHATA"
  aside={<Chip label="6 not paid" tone="alert" size="sm" dot="pending" />}
  bodyStyle={{ padding: 16 }}
>
  <ClayPill label="Remind all" icon={MessageCircle} onPress={() => {}} />
</KhataFolder>`,
          },
        },
      ]}
    />
  )
}
export default KhataFolderPage

