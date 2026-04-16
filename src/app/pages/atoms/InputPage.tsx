import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'

export function InputPage() {
  return (
    <ComponentPageLayout
      title="Input"
      description="Text entry field for forms and search. Always pair with a Label for accessibility."
      level="Atom"
      status="Stable"
      sections={[
        {
          title: 'Default',
          preview: (
            <div className="space-y-2 max-w-xs">
              <Label htmlFor="demo-input">Email address</Label>
              <Input id="demo-input" type="email" placeholder="you@example.com" />
            </div>
          ),
          code: {
            react: `import { Input } from '@breathe/ui'
import { Label } from '@breathe/ui'

<Label htmlFor="email">Email address</Label>
<Input id="email" type="email" placeholder="you@example.com" />`,
          },
        },
        {
          title: 'States',
          description: 'Disabled and read-only variants.',
          preview: (
            <div className="space-y-3 max-w-xs">
              <Input placeholder="Disabled" disabled />
              <Input placeholder="Read only" readOnly value="Read-only value" />
            </div>
          ),
          code: {
            react: `<Input placeholder="Disabled" disabled />
<Input readOnly value="Read-only value" />`,
          },
        },
      ]}
    />
  )
}
