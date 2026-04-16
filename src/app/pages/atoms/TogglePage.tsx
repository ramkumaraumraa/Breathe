import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Toggle } from '@/app/components/ui/toggle'
import { ToggleGroup, ToggleGroupItem } from '@/app/components/ui/toggle-group'

export function TogglePage() {
  return (
    <ComponentPageLayout
      title="Toggle"
      description="A two-state button that can be toggled on or off. Use for view options, filters, and tool selections."
      level="Atom"
      status="Stable"
      implemented={['lemniscate', 'aumraa']}
      sections={[
        {
          title: 'Single Toggle',
          preview: (
            <div className="flex gap-3">
              <Toggle>Bold</Toggle>
              <Toggle variant="outline">Outline</Toggle>
              <Toggle disabled>Disabled</Toggle>
            </div>
          ),
          code: {
            react: `import { Toggle } from '@aumraa/breathe/components/ui/toggle'

<Toggle>Bold</Toggle>
<Toggle variant="outline">Outline</Toggle>`,
          },
        },
        {
          title: 'Toggle Group',
          description: 'Grouped toggles for exclusive or multi-selection.',
          preview: (
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-2">Single select</p>
                <ToggleGroup type="single" defaultValue="month">
                  <ToggleGroupItem value="week">Week</ToggleGroupItem>
                  <ToggleGroupItem value="month">Month</ToggleGroupItem>
                  <ToggleGroupItem value="year">Year</ToggleGroupItem>
                </ToggleGroup>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Multi select</p>
                <ToggleGroup type="multiple">
                  <ToggleGroupItem value="paid">Paid</ToggleGroupItem>
                  <ToggleGroupItem value="pending">Pending</ToggleGroupItem>
                  <ToggleGroupItem value="overdue">Overdue</ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
          ),
          code: {
            react: `import { ToggleGroup, ToggleGroupItem } from '@aumraa/breathe/components/ui/toggle-group'

<ToggleGroup type="single" defaultValue="month">
  <ToggleGroupItem value="week">Week</ToggleGroupItem>
  <ToggleGroupItem value="month">Month</ToggleGroupItem>
  <ToggleGroupItem value="year">Year</ToggleGroupItem>
</ToggleGroup>`,
          },
        },
      ]}
    />
  )
}
