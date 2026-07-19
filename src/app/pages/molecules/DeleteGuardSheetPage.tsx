import { useState } from 'react'
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { KayoBrutalistDeleteGuardSheet, KayoBrutalistButton } from '@aumraa/breathe-react/kaayo'

export function DeleteGuardSheetPage() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ComponentPageLayout
      title="Delete Guard Sheet"
      description="Destructive action safety confirmation modal requiring exact text typing before unlocking delete operations."
      level="Molecule"
      status="Stable"
      implemented={['kaayo']}
      sections={[
        {
          title: 'Protected Delete Flow',
          description: 'Prevents accidental deletion of student records or batch ledgers.',
          preview: (
            <div>
              <KayoBrutalistButton
                variant="destructive"
                label="Delete Batch A"
                onClick={() => setIsOpen(true)}
              />
              <KayoBrutalistDeleteGuardSheet
                isOpen={isOpen}
                targetName="Batch A"
                onClose={() => setIsOpen(false)}
                onConfirm={() => {
                  alert('Batch A deleted')
                  setIsOpen(false)
                }}
              />
            </div>
          ),
          code: {
            react: `import { KayoBrutalistDeleteGuardSheet } from '@aumraa/breathe-react/kaayo'

<KayoBrutalistDeleteGuardSheet
  isOpen={isOpen}
  targetName="Batch A"
  onClose={() => setIsOpen(false)}
  onConfirm={handleDelete}
/>`,
            reactNative: `import { DeleteGuardSheet } from '@kaayo/components/molecules/DeleteGuardSheet'

<DeleteGuardSheet
  visible={visible}
  targetName="Batch A"
  onClose={onClose}
  onConfirm={onConfirm}
/>`,
          },
        },
      ]}
    />
  )
}
