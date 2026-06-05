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
import { useProductTheme } from '@/app/context/ProductThemeContext'
import {
  KayoBrutalistForm,
  KayoBrutalistFormField,
  KayoBrutalistFormDivider,
} from '@/app/components/custom/kaayo/KayoBrutalistForm'
import { KayoBrutalistInput } from '@/app/components/custom/kaayo/KayoBrutalistInput'
import { KayoBrutalistTextarea } from '@/app/components/custom/kaayo/KayoBrutalistTextarea'
import { KayoBrutalistSelect } from '@/app/components/custom/kaayo/KayoBrutalistSelect'
import { KayoBrutalistCheckbox } from '@/app/components/custom/kaayo/KayoBrutalistCheckbox'
import { KayoBrutalistRadioGroup } from '@/app/components/custom/kaayo/KayoBrutalistRadioGroup'
import { KayoBrutalistButton } from '@/app/components/custom/kaayo/KayoBrutalistButton'

export function FormPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  return (
    <ComponentPageLayout
      title="Form"
      description="Structured layout pattern for collecting user input. Combines Label, Input, Select, and validation states."
      level="Molecule"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Login Form',
          description: 'Email + password + remember me checkbox + submit — the minimal auth pattern.',
          preview: isKaayo ? (
            <KayoBrutalistForm style={{ width: '100%', maxWidth: 360 }}>
              <KayoBrutalistFormField label="Email" required>
                <KayoBrutalistInput placeholder="name@example.com" type="email" />
              </KayoBrutalistFormField>
              <KayoBrutalistFormField label="Password" required>
                <KayoBrutalistInput placeholder="Enter password" isPassword />
              </KayoBrutalistFormField>
              <KayoBrutalistCheckbox label="Remember me on this device" />
              <KayoBrutalistButton label="Sign In" fullWidth />
            </KayoBrutalistForm>
          ) : (
            <div className="w-full max-w-sm space-y-5">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email <span className="text-destructive">*</span></Label>
                <Input id="login-email" type="email" placeholder="name@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-pw">Password <span className="text-destructive">*</span></Label>
                <Input id="login-pw" type="password" placeholder="Enter password" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="login-remember" className="h-4 w-4" />
                <label htmlFor="login-remember" className="text-sm">Remember me on this device</label>
              </div>
              <Button className="w-full">Sign In</Button>
            </div>
          ),
          code: {
            react: `import { KayoBrutalistForm, KayoBrutalistFormField } from '@breathe/kaayo'
import { KayoBrutalistInput } from '@breathe/kaayo'
import { KayoBrutalistCheckbox } from '@breathe/kaayo'
import { KayoBrutalistButton } from '@breathe/kaayo'

<KayoBrutalistForm>
  <KayoBrutalistFormField label="Email" required>
    <KayoBrutalistInput placeholder="name@example.com" type="email" />
  </KayoBrutalistFormField>
  <KayoBrutalistFormField label="Password" required>
    <KayoBrutalistInput placeholder="Enter password" isPassword />
  </KayoBrutalistFormField>
  <KayoBrutalistCheckbox label="Remember me" />
  <KayoBrutalistButton label="Sign In" fullWidth />
</KayoBrutalistForm>`,
          },
        },
        {
          title: 'Registration Form',
          description: 'Four fields with grouping — shows how fields stack in a vertical layout.',
          preview: isKaayo ? (
            <KayoBrutalistForm style={{ width: '100%', maxWidth: 360 }}>
              <KayoBrutalistFormField label="Full Name" required>
                <KayoBrutalistInput placeholder="Ramkumar G" />
              </KayoBrutalistFormField>
              <KayoBrutalistFormField label="Email" required>
                <KayoBrutalistInput placeholder="name@example.com" type="email" />
              </KayoBrutalistFormField>
              <KayoBrutalistFormField label="Password" required>
                <KayoBrutalistInput placeholder="Min 8 characters" isPassword />
              </KayoBrutalistFormField>
              <KayoBrutalistFormField label="Confirm Password" required>
                <KayoBrutalistInput placeholder="Repeat password" isPassword />
              </KayoBrutalistFormField>
              <KayoBrutalistButton label="Create Account" fullWidth />
            </KayoBrutalistForm>
          ) : (
            <div className="w-full max-w-sm space-y-5">
              <div className="space-y-2">
                <Label htmlFor="reg-name">Full Name <span className="text-destructive">*</span></Label>
                <Input id="reg-name" placeholder="Ramkumar G" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-email">Email <span className="text-destructive">*</span></Label>
                <Input id="reg-email" type="email" placeholder="name@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-pw">Password <span className="text-destructive">*</span></Label>
                <Input id="reg-pw" type="password" placeholder="Min 8 characters" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-pw2">Confirm Password <span className="text-destructive">*</span></Label>
                <Input id="reg-pw2" type="password" placeholder="Repeat password" />
              </div>
              <Button className="w-full">Create Account</Button>
            </div>
          ),
          code: {
            react: `<KayoBrutalistForm>
  <KayoBrutalistFormField label="Full Name" required>
    <KayoBrutalistInput placeholder="Ramkumar G" />
  </KayoBrutalistFormField>
  <KayoBrutalistFormField label="Email" required>
    <KayoBrutalistInput placeholder="name@example.com" type="email" />
  </KayoBrutalistFormField>
  <KayoBrutalistFormField label="Password" required>
    <KayoBrutalistInput isPassword placeholder="Min 8 characters" />
  </KayoBrutalistFormField>
  <KayoBrutalistButton label="Create Account" fullWidth />
</KayoBrutalistForm>`,
          },
        },
        {
          title: 'With Validation',
          description: 'Error state (red border + message) on email; success hint (green) on name.',
          preview: isKaayo ? (
            <KayoBrutalistForm style={{ width: '100%', maxWidth: 360 }}>
              <KayoBrutalistFormField label="Full Name" required hint="✓ Name looks good">
                <KayoBrutalistInput placeholder="Full name" defaultValue="Ramkumar G" />
              </KayoBrutalistFormField>
              <KayoBrutalistFormField label="Email" required>
                <KayoBrutalistInput
                  placeholder="name@example.com"
                  defaultValue="not-an-email"
                  errorText="Please enter a valid email address"
                />
              </KayoBrutalistFormField>
              <KayoBrutalistButton label="Continue" fullWidth />
            </KayoBrutalistForm>
          ) : (
            <div className="w-full max-w-sm space-y-5">
              <div className="space-y-2">
                <Label htmlFor="v-name">Full Name</Label>
                <Input id="v-name" defaultValue="Ramkumar G" />
                <p className="text-xs text-green-600">✓ Name looks good</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="v-email">Email</Label>
                <Input id="v-email" defaultValue="not-an-email" className="border-destructive focus-visible:ring-destructive" />
                <p className="text-xs text-destructive">Please enter a valid email address</p>
              </div>
              <Button className="w-full">Continue</Button>
            </div>
          ),
          code: {
            react: `<KayoBrutalistFormField label="Email" required>
  <KayoBrutalistInput
    defaultValue="not-an-email"
    errorText="Please enter a valid email address"
  />
</KayoBrutalistFormField>

<KayoBrutalistFormField label="Name" required hint="✓ Name looks good">
  <KayoBrutalistInput defaultValue="Ramkumar G" />
</KayoBrutalistFormField>`,
          },
        },
        {
          title: 'Horizontal Layout',
          description: 'Label fixed at 140px left, input fills the right — for settings and data-dense forms.',
          preview: isKaayo ? (
            <KayoBrutalistForm style={{ width: '100%', maxWidth: 480 }}>
              <KayoBrutalistFormField label="Flat Number" required layout="horizontal">
                <KayoBrutalistInput placeholder="A-101" />
              </KayoBrutalistFormField>
              <KayoBrutalistFormField label="Resident Type" layout="horizontal">
                <KayoBrutalistSelect
                  placeholder="Select type"
                  options={[
                    { value: 'owner', label: 'Owner' },
                    { value: 'tenant', label: 'Tenant' },
                    { value: 'caretaker', label: 'Caretaker' },
                  ]}
                />
              </KayoBrutalistFormField>
              <KayoBrutalistFormField label="Notes" layout="horizontal">
                <KayoBrutalistTextarea placeholder="Optional notes..." rows={3} />
              </KayoBrutalistFormField>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <KayoBrutalistButton label="Cancel" variant="secondary" />
                <KayoBrutalistButton label="Save" />
              </div>
            </KayoBrutalistForm>
          ) : (
            <div className="w-full max-w-md space-y-4">
              <div className="flex items-center gap-4">
                <Label className="w-36 shrink-0 text-xs uppercase tracking-widest" htmlFor="h-flat">Flat Number</Label>
                <Input id="h-flat" placeholder="A-101" className="flex-1" />
              </div>
              <div className="flex items-center gap-4">
                <Label className="w-36 shrink-0 text-xs uppercase tracking-widest" htmlFor="h-type">Resident Type</Label>
                <Select>
                  <SelectTrigger className="flex-1"><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="owner">Owner</SelectItem>
                    <SelectItem value="tenant">Tenant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-start gap-4">
                <Label className="w-36 shrink-0 pt-2 text-xs uppercase tracking-widest" htmlFor="h-notes">Notes</Label>
                <Textarea id="h-notes" placeholder="Optional notes..." rows={3} className="flex-1" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save</Button>
              </div>
            </div>
          ),
          code: {
            react: `<KayoBrutalistForm>
  <KayoBrutalistFormField label="Flat Number" required layout="horizontal">
    <KayoBrutalistInput placeholder="A-101" />
  </KayoBrutalistFormField>
  <KayoBrutalistFormField label="Notes" layout="horizontal">
    <KayoBrutalistTextarea placeholder="Optional notes..." rows={3} />
  </KayoBrutalistFormField>
</KayoBrutalistForm>`,
          },
        },
        {
          title: 'Inline / Search Form',
          description: 'Single input + button in a row — use for subscribe, search, or quick-add patterns.',
          preview: isKaayo ? (
            <KayoBrutalistForm layout="inline" style={{ width: '100%', maxWidth: 440 }}>
              <div style={{ flex: 1 }}>
                <KayoBrutalistInput placeholder="Enter your email to subscribe" type="email" />
              </div>
              <KayoBrutalistButton label="Subscribe" />
            </KayoBrutalistForm>
          ) : (
            <div className="flex w-full max-w-md gap-2">
              <Input placeholder="Enter your email to subscribe" type="email" className="flex-1" />
              <Button>Subscribe</Button>
            </div>
          ),
          code: {
            react: `<KayoBrutalistForm layout="inline">
  <div style={{ flex: 1 }}>
    <KayoBrutalistInput placeholder="Enter your email to subscribe" type="email" />
  </div>
  <KayoBrutalistButton label="Subscribe" />
</KayoBrutalistForm>`,
          },
        },
        {
          title: 'Full Field Set',
          description: 'Every atom composed in one form — Text, Email, Password, Select, Textarea, Checkbox, Radio, Submit.',
          preview: isKaayo ? (
            <KayoBrutalistForm style={{ width: '100%', maxWidth: 400 }}>
              <KayoBrutalistFormField label="Full Name" required>
                <KayoBrutalistInput placeholder="Ramkumar G" />
              </KayoBrutalistFormField>
              <KayoBrutalistFormField label="Email" required>
                <KayoBrutalistInput placeholder="name@example.com" type="email" />
              </KayoBrutalistFormField>
              <KayoBrutalistFormField label="Password" required>
                <KayoBrutalistInput placeholder="Min 8 characters" isPassword />
              </KayoBrutalistFormField>
              <KayoBrutalistFormField label="Resident Type" required>
                <KayoBrutalistSelect
                  placeholder="Select type"
                  options={[
                    { value: 'owner', label: 'Owner' },
                    { value: 'tenant', label: 'Tenant' },
                  ]}
                />
              </KayoBrutalistFormField>
              <KayoBrutalistFormField label="Preferred Contact">
                <KayoBrutalistRadioGroup
                  options={[
                    { value: 'email', label: 'Email' },
                    { value: 'sms', label: 'SMS' },
                    { value: 'whatsapp', label: 'WhatsApp' },
                  ]}
                  defaultValue="email"
                  horizontal
                />
              </KayoBrutalistFormField>
              <KayoBrutalistFormField label="Notes">
                <KayoBrutalistTextarea placeholder="Any additional notes..." rows={3} />
              </KayoBrutalistFormField>
              <KayoBrutalistCheckbox label="I agree to the terms and conditions" />
              <KayoBrutalistButton label="Submit Application" fullWidth />
            </KayoBrutalistForm>
          ) : (
            <div className="w-full max-w-sm space-y-4">
              <div className="space-y-2"><Label>Full Name</Label><Input placeholder="Ramkumar G" /></div>
              <div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="name@example.com" /></div>
              <div className="space-y-2"><Label>Password</Label><Input type="password" placeholder="Min 8 characters" /></div>
              <div className="space-y-2">
                <Label>Resident Type</Label>
                <Select><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent><SelectItem value="owner">Owner</SelectItem><SelectItem value="tenant">Tenant</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Notes</Label><Textarea placeholder="Any additional notes..." rows={3} /></div>
              <div className="flex items-center gap-2"><input type="checkbox" id="terms" /><label htmlFor="terms" className="text-sm">I agree to the terms</label></div>
              <Button className="w-full">Submit Application</Button>
            </div>
          ),
          code: {
            react: `<KayoBrutalistForm>
  <KayoBrutalistFormField label="Full Name" required>
    <KayoBrutalistInput placeholder="Ramkumar G" />
  </KayoBrutalistFormField>
  <KayoBrutalistFormField label="Preferred Contact">
    <KayoBrutalistRadioGroup
      options={[{ value: 'email', label: 'Email' }, { value: 'sms', label: 'SMS' }]}
      defaultValue="email"
      horizontal
    />
  </KayoBrutalistFormField>
  <KayoBrutalistCheckbox label="I agree to the terms and conditions" />
  <KayoBrutalistButton label="Submit Application" fullWidth />
</KayoBrutalistForm>`,
          },
        },
        {
          title: 'Sectioned Form',
          description: 'Two sections separated by a divider — "Account Details" and "Preferences".',
          preview: isKaayo ? (
            <KayoBrutalistForm style={{ width: '100%', maxWidth: 400 }}>
              <KayoBrutalistFormDivider label="Account Details" />
              <KayoBrutalistFormField label="Full Name" required>
                <KayoBrutalistInput placeholder="Ramkumar G" />
              </KayoBrutalistFormField>
              <KayoBrutalistFormField label="Email" required>
                <KayoBrutalistInput placeholder="name@example.com" type="email" />
              </KayoBrutalistFormField>
              <KayoBrutalistFormDivider label="Preferences" />
              <KayoBrutalistFormField label="Notifications">
                <KayoBrutalistSelect
                  placeholder="Select preference"
                  options={[
                    { value: 'all', label: 'All notifications' },
                    { value: 'important', label: 'Important only' },
                    { value: 'none', label: 'None' },
                  ]}
                />
              </KayoBrutalistFormField>
              <KayoBrutalistCheckbox label="Send monthly summary report" defaultChecked />
              <div style={{ display: 'flex', gap: 10 }}>
                <KayoBrutalistButton label="Save Changes" />
                <KayoBrutalistButton label="Cancel" variant="secondary" />
              </div>
            </KayoBrutalistForm>
          ) : (
            <div className="w-full max-w-sm space-y-4">
              <div className="flex items-center gap-3"><span className="text-xs font-semibold uppercase tracking-wider">Account Details</span><div className="h-px flex-1 bg-border" /></div>
              <div className="space-y-2"><Label>Full Name</Label><Input placeholder="Ramkumar G" /></div>
              <div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="name@example.com" /></div>
              <div className="flex items-center gap-3"><span className="text-xs font-semibold uppercase tracking-wider">Preferences</span><div className="h-px flex-1 bg-border" /></div>
              <div className="space-y-2">
                <Label>Notifications</Label>
                <Select><SelectTrigger><SelectValue placeholder="Select preference" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All notifications</SelectItem>
                    <SelectItem value="important">Important only</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2"><Button>Save Changes</Button><Button variant="outline">Cancel</Button></div>
            </div>
          ),
          code: {
            react: `<KayoBrutalistForm>
  <KayoBrutalistFormDivider label="Account Details" />
  <KayoBrutalistFormField label="Full Name" required>
    <KayoBrutalistInput placeholder="Ramkumar G" />
  </KayoBrutalistFormField>
  <KayoBrutalistFormDivider label="Preferences" />
  <KayoBrutalistCheckbox label="Send monthly summary report" defaultChecked />
  <KayoBrutalistButton label="Save Changes" />
</KayoBrutalistForm>`,
          },
        },
      ]}
    />
  )
}
