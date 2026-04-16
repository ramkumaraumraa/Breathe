import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Separator } from '@/app/components/ui/separator'

export function SeparatorPage() {
  return (
    <ComponentPageLayout
      title="Separator"
      description="Visually or semantically separates content. Use to create clear section boundaries."
      level="Atom"
      status="Stable"
      implemented={['lemniscate', 'aumraa']}
      sections={[
        {
          title: 'Horizontal',
          preview: (
            <div className="w-full max-w-sm space-y-4">
              <div>
                <p className="text-sm font-medium">Maintenance Collection</p>
                <p className="text-xs text-muted-foreground">Due: 1st every month</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium">Expense Tracking</p>
                <p className="text-xs text-muted-foreground">Monthly budget overview</p>
              </div>
            </div>
          ),
          code: {
            react: `import { Separator } from '@aumraa/breathe/components/ui/separator'

<div>Section A content</div>
<Separator />
<div>Section B content</div>`,
          },
        },
        {
          title: 'Vertical',
          description: 'Used inside flex rows to separate inline items.',
          preview: (
            <div className="flex items-center gap-4 h-8">
              <span className="text-sm">Dashboard</span>
              <Separator orientation="vertical" />
              <span className="text-sm">Reports</span>
              <Separator orientation="vertical" />
              <span className="text-sm">Settings</span>
            </div>
          ),
          code: {
            react: `<div className="flex items-center gap-4 h-8">
  <span>Dashboard</span>
  <Separator orientation="vertical" />
  <span>Reports</span>
</div>`,
          },
        },
      ]}
    />
  )
}
