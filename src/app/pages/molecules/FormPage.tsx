import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Label } from '@/app/components/ui/label'
import { Input } from '@/app/components/ui/input'
import { Textarea } from '@/app/components/ui/textarea'
import { Button } from '@/app/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select'

export function FormPage() {
  return (
    <ComponentPageLayout
      title="Form"
      description="Structured layout pattern for collecting user input. Combines Label, Input, Select, and validation states."
      level="Molecule"
      status="Stable"
      implemented={['lemniscate', 'aumraa']}
      sections={[
        {
          title: 'Basic form',
          description: 'Vertical stacked form — the standard pattern.',
          preview: (
            <div className="w-full max-w-sm space-y-5">
              <div className="space-y-2">
                <Label htmlFor="f-name">Resident Name <span className="text-destructive">*</span></Label>
                <Input id="f-name" placeholder="Full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="f-flat">Flat Number <span className="text-destructive">*</span></Label>
                <Input id="f-flat" placeholder="A-101" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="f-type">Resident Type</Label>
                <Select>
                  <SelectTrigger id="f-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="owner">Owner</SelectItem>
                    <SelectItem value="tenant">Tenant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="f-notes">Notes</Label>
                <Textarea id="f-notes" placeholder="Optional notes..." rows={3} />
              </div>
              <div className="flex gap-3 pt-2">
                <Button className="flex-1">Save Resident</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </div>
          ),
          code: {
            react: `<div className="space-y-5">
  <div className="space-y-2">
    <Label htmlFor="name">Name <span className="text-destructive">*</span></Label>
    <Input id="name" placeholder="Full name" />
  </div>
  <div className="space-y-2">
    <Label htmlFor="type">Type</Label>
    <Select>
      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
      <SelectContent>
        <SelectItem value="owner">Owner</SelectItem>
        <SelectItem value="tenant">Tenant</SelectItem>
      </SelectContent>
    </Select>
  </div>
  <Button>Submit</Button>
</div>`,
          },
        },
        {
          title: 'Validation states',
          description: 'Error and helper text patterns.',
          preview: (
            <div className="w-full max-w-sm space-y-5">
              <div className="space-y-2">
                <Label htmlFor="v-phone">Phone Number</Label>
                <Input
                  id="v-phone"
                  placeholder="9876543210"
                  className="border-destructive focus-visible:ring-destructive"
                />
                <p className="text-xs text-destructive">Please enter a valid 10-digit number</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="v-email">Email</Label>
                <Input id="v-email" placeholder="name@example.com" />
                <p className="text-xs text-muted-foreground">We'll use this for payment receipts</p>
              </div>
            </div>
          ),
          code: {
            react: `<Input className="border-destructive focus-visible:ring-destructive" />
<p className="text-xs text-destructive">Error message here</p>

<Input />
<p className="text-xs text-muted-foreground">Helper text here</p>`,
          },
        },
      ]}
    />
  )
}
