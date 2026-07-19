import { useState } from 'react'
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { KayoBrutalistChipMultiSelect } from '@aumraa/breathe-react/kaayo'

export function ChipMultiSelectPage() {
  const [selected, setSelected] = useState<string[]>(['batch-a', 'batch-c'])

  const options = [
    { id: 'batch-a', label: 'Batch A (Morning)' },
    { id: 'batch-b', label: 'Batch B (Afternoon)' },
    { id: 'batch-c', label: 'Batch C (Evening)' },
    { id: 'weekend', label: 'Weekend Special' },
  ]

  return (
    <ComponentPageLayout
      title="Chip Multi-Select"
      description="Multi-tag selection pill control for filtering student batches, payment statuses, and subject categories."
      level="Atom"
      status="Stable"
      implemented={['kaayo']}
      sections={[
        {
          title: 'Batch Filter Pills',
          description: 'Toggle tags to select multiple filters.',
          preview: (
            <div className="w-full max-w-lg">
              <KayoBrutalistChipMultiSelect
                label="Filter by Batches"
                options={options}
                selectedIds={selected}
                onChange={setSelected}
              />
              <div className="mt-4 text-xs text-slate-500">
                Active Selection IDs: {selected.join(', ') || 'None'}
              </div>
            </div>
          ),
          code: {
            react: `import { KayoBrutalistChipMultiSelect } from '@aumraa/breathe-react/kaayo'

<KayoBrutalistChipMultiSelect
  label="Filter by Batches"
  options={options}
  selectedIds={selected}
  onChange={setSelected}
/>`,
            reactNative: `import { ChipMultiSelect } from '@kaayo/components/molecules/ChipMultiSelect'

<ChipMultiSelect
  options={options}
  selected={selected}
  onSelectionChange={setSelected}
/>`,
          },
        },
      ]}
    />
  )
}
