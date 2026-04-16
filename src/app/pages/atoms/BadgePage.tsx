import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Badge } from '@/app/components/ui/badge'

export function BadgePage() {
  return (
    <ComponentPageLayout
      title="Badge"
      description="Small status descriptor for UI elements. Use sparingly — too many badges reduce their signal value."
      level="Atom"
      status="Stable"
      sections={[
        {
          title: 'Variants',
          preview: (
            <div className="flex flex-wrap gap-3">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          ),
          code: {
            react: `import { Badge } from '@breathe/ui'

<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>`,
          },
        },
      ]}
    />
  )
}
