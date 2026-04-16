import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/app/components/ui/collapsible'
import { Button } from '@/app/components/ui/button'

export function CollapsiblePage() {
  return (
    <ComponentPageLayout
      title="Collapsible"
      description="A single expandable section. Use when you need one toggle without the Accordion's list structure."
      level="Molecule"
      status="Stable"
      implemented={['lemniscate', 'aumraa']}
      sections={[
        {
          title: 'Default',
          preview: (
            <Collapsible className="w-full max-w-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Advanced filters</span>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">Toggle ▾</Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="space-y-2">
                <div className="rounded-md border border-border px-4 py-3 text-sm text-muted-foreground">
                  Date range filter
                </div>
                <div className="rounded-md border border-border px-4 py-3 text-sm text-muted-foreground">
                  Category filter
                </div>
              </CollapsibleContent>
            </Collapsible>
          ),
          code: {
            react: `import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@aumraa/breathe/components/ui/collapsible'

<Collapsible>
  <CollapsibleTrigger asChild>
    <Button variant="ghost" size="sm">Toggle</Button>
  </CollapsibleTrigger>
  <CollapsibleContent>
    {/* Hidden content */}
  </CollapsibleContent>
</Collapsible>`,
          },
        },
      ]}
    />
  )
}
