import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Checkbox } from '@/app/components/ui/checkbox'
import { Label } from '@/app/components/ui/label'

export function CheckboxPage() {
  return (
    <ComponentPageLayout
      title="Checkbox"
      description="Boolean selection control. Use for independent options that don't affect each other."
      level="Atom"
      status="Stable"
      sections={[
        {
          title: 'Default',
          preview: (
            <div className="flex items-center gap-2">
              <Checkbox id="cb1" defaultChecked />
              <Label htmlFor="cb1">Accept terms and conditions</Label>
            </div>
          ),
          code: {
            react: `import { Checkbox } from '@breathe/ui'
import { Label } from '@breathe/ui'

<Checkbox id="terms" defaultChecked />
<Label htmlFor="terms">Accept terms and conditions</Label>`,
          },
        },
        {
          title: 'States',
          preview: (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Checkbox id="cb-checked" defaultChecked />
                <Label htmlFor="cb-checked">Checked</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="cb-unchecked" />
                <Label htmlFor="cb-unchecked">Unchecked</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="cb-disabled" disabled />
                <Label htmlFor="cb-disabled" className="text-muted-foreground">Disabled</Label>
              </div>
            </div>
          ),
          code: {
            react: `<Checkbox defaultChecked />   {/* checked */}
<Checkbox />               {/* unchecked */}
<Checkbox disabled />       {/* disabled */}`,
          },
        },
      ]}
    />
  )
}
