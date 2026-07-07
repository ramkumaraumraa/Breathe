import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Switch } from '@/app/components/atoms/form-elements/switch'
import { Label } from '@/app/components/atoms/label'
import { Toggle } from '@/app/components/atoms/form-elements/toggle'
import { ToggleGroup, ToggleGroupItem } from '@/app/components/atoms/form-elements/toggle-group'

export function TogglePage() {
  return (
    <ComponentPageLayout
      title="Toggle (Switch)"
      description="Binary switches and togglable buttons. Use switches for settings that take immediate effect, and toggles for filters or formatted inputs."
      level="Atom"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Switch Toggle',
          description: 'Standard binary switch control with associated label.',
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
            reactNative: `import { Switch } from '@kaayo/components/atoms/Switch'

// Switch with label (renders label + switch in a space-between row)
<Switch value={enabled} onChange={setEnabled} label="Enable notifications" />

// Token reference:
// trackColor.true  = theme.brand.primary (#970103) — crimson when on
// trackColor.false = theme.border.default
// thumbColor       = theme.surface.card (#ffffff)`,
          },
        },
        {
          title: 'Switch States',
          description: 'On, off, and disabled switch variations.',
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
            reactNative: `import { Switch } from '@kaayo/components/atoms/Switch'

<Switch value={true}  onChange={() => {}} />          // on — crimson track
<Switch value={false} onChange={() => {}} />          // off — grey track
<Switch value={false} onChange={() => {}} disabled /> // disabled`,
          },
        },
        {
          title: 'Single Button Toggle',
          description: 'Two-state button that can be active or inactive.',
          preview: (
            <div className="flex gap-3">
              <Toggle>Bold</Toggle>
              <Toggle variant="outline">Outline</Toggle>
              <Toggle disabled>Disabled</Toggle>
            </div>
          ),
          code: {
            react: `import { Toggle } from '@breathe/ui'

<Toggle>Bold</Toggle>
<Toggle variant="outline">Outline</Toggle>`,
          },
        },
        {
          title: 'Toggle Group',
          description: 'Grouped toggles for exclusive (single) or multi-selection.',
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
            react: `import { ToggleGroup, ToggleGroupItem } from '@breathe/ui'

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
