import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { KayoBrutalistEmptyState, KayoBrutalistButton } from '@aumraa/breathe-react/kaayo'
import { Users, FolderPlus } from 'lucide-react'

export function EmptyStatePage() {
  return (
    <ComponentPageLayout
      title="Empty State"
      description="Dashed container graphic with title, description, and action CTA when no data or list items exist."
      level="Molecule"
      status="Stable"
      implemented={['kaayo']}
      sections={[
        {
          title: 'No Students Found',
          description: 'Standard empty state displayed when a search or filter yields no results.',
          preview: (
            <div className="w-full max-w-md">
              <KayoBrutalistEmptyState
                icon={<Users size={36} />}
                title="No Students Registered"
                description="Get started by adding your first student to Batch A or importing a CSV class list."
                action={
                  <KayoBrutalistButton
                    variant="primary"
                    label="Add Student"
                    iconLeft={<FolderPlus size={16} />}
                    onClick={() => alert('Add student clicked')}
                  />
                }
              />
            </div>
          ),
          code: {
            react: `import { KayoBrutalistEmptyState, KayoBrutalistButton } from '@aumraa/breathe-react/kaayo'
import { Users, FolderPlus } from 'lucide-react'

<KayoBrutalistEmptyState
  icon={<Users size={36} />}
  title="No Students Registered"
  description="Get started by adding your first student."
  action={<KayoBrutalistButton label="Add Student" iconLeft={<FolderPlus size={16} />} />}
/>`,
            reactNative: `import { EmptyState } from '@kaayo/components/atoms/EmptyState'

<EmptyState
  title="No Students Registered"
  description="Get started by adding your first student."
  actionLabel="Add Student"
  onAction={handleAdd}
/>`,
          },
        },
      ]}
    />
  )
}
