import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group'
import { Label } from '@/app/components/ui/label'

export function RadioGroupPage() {
  return (
    <ComponentPageLayout
      title="Radio Group"
      description="Allows a single selection from a set of mutually exclusive options."
      level="Atom"
      status="Stable"
      implemented={['lemniscate', 'aumraa']}
      sections={[
        {
          title: 'Default',
          description: 'Vertical radio group with labels.',
          preview: (
            <RadioGroup defaultValue="option-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-1" id="r1" />
                <Label htmlFor="r1">Monthly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-2" id="r2" />
                <Label htmlFor="r2">Quarterly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-3" id="r3" />
                <Label htmlFor="r3">Annual</Label>
              </div>
            </RadioGroup>
          ),
          code: {
            react: `import { RadioGroup, RadioGroupItem } from '@aumraa/breathe/components/ui/radio-group'
import { Label } from '@aumraa/breathe/components/ui/label'

<RadioGroup defaultValue="monthly">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="monthly" id="monthly" />
    <Label htmlFor="monthly">Monthly</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="annual" id="annual" />
    <Label htmlFor="annual">Annual</Label>
  </div>
</RadioGroup>`,
          },
        },
        {
          title: 'Horizontal',
          description: 'Inline layout for compact option sets.',
          preview: (
            <RadioGroup defaultValue="card" className="flex gap-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="h1" />
                <Label htmlFor="h1">Card</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="upi" id="h2" />
                <Label htmlFor="h2">UPI</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cash" id="h3" />
                <Label htmlFor="h3">Cash</Label>
              </div>
            </RadioGroup>
          ),
          code: {
            react: `<RadioGroup defaultValue="card" className="flex gap-6">
  ...options
</RadioGroup>`,
          },
        },
      ]}
    />
  )
}
