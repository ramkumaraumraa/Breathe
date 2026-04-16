import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Switch } from '@/app/components/ui/switch'
import { Label } from '@/app/components/ui/label'

export function SwitchPage() {
  return (
    <ComponentPageLayout
      title="Switch"
      description="Toggle control for binary settings that take immediate effect. Prefer Switch over Checkbox for settings that apply without a submit action."
      level="Atom"
      status="Stable"
      sections={[
        {
          title: 'Default',
          preview: (
            <div className="flex items-center gap-3">
              <Switch id="sw1" defaultChecked />
              <Label htmlFor="sw1">Enable notifications</Label>
            </div>
          ),
          code: {
            react: `import { Switch } from '@breathe/ui'
import { Label } from '@breathe/ui'

<Switch id="notifications" defaultChecked />
<Label htmlFor="notifications">Enable notifications</Label>`,
          },
        },
        {
          title: 'States',
          preview: (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Switch defaultChecked />
                <span className="text-sm">On</span>
              </div>
              <div className="flex items-center gap-3">
                <Switch />
                <span className="text-sm">Off</span>
              </div>
              <div className="flex items-center gap-3">
                <Switch disabled />
                <span className="text-sm text-muted-foreground">Disabled</span>
              </div>
            </div>
          ),
          code: {
            react: `<Switch defaultChecked />  {/* on */}
<Switch />               {/* off */}
<Switch disabled />       {/* disabled */}`,
          },
        },
      ]}
    />
  )
}
