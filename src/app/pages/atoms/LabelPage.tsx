import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Label } from '@/app/components/ui/label'
import { Input } from '@/app/components/ui/input'
import { Checkbox } from '@/app/components/ui/checkbox'

export function LabelPage() {
  return (
    <ComponentPageLayout
      title="Label"
      description="Accessible text label associated with form controls. Always pair with an input."
      level="Atom"
      status="Stable"
      implemented={['lemniscate', 'aumraa']}
      sections={[
        {
          title: 'With Input',
          preview: (
            <div className="w-full max-w-sm space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Ramkumar G" />
            </div>
          ),
          code: {
            react: `import { Label } from '@aumraa/breathe/components/ui/label'
import { Input } from '@aumraa/breathe/components/ui/input'

<Label htmlFor="name">Full Name</Label>
<Input id="name" placeholder="Ramkumar G" />`,
          },
        },
        {
          title: 'With Checkbox',
          preview: (
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms">I agree to the terms and conditions</Label>
            </div>
          ),
          code: {
            react: `<Checkbox id="terms" />
<Label htmlFor="terms">I agree to the terms and conditions</Label>`,
          },
        },
        {
          title: 'Required field',
          preview: (
            <div className="w-full max-w-sm space-y-2">
              <Label htmlFor="flat">
                Flat Number <span className="text-destructive">*</span>
              </Label>
              <Input id="flat" placeholder="A-101" />
            </div>
          ),
          code: {
            react: `<Label htmlFor="flat">
  Flat Number <span className="text-destructive">*</span>
</Label>`,
          },
        },
      ]}
    />
  )
}
