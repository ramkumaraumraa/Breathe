import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Label } from '@/app/components/ui/label'
import { Input } from '@/app/components/ui/input'
import { Checkbox } from '@/app/components/ui/checkbox'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistInput } from '@/app/components/custom/kaayo/KayoBrutalistInput'
import { KayoBrutalistCheckbox } from '@/app/components/custom/kaayo/KayoBrutalistCheckbox'

const KayoLabel = ({ children, required }: { children: React.ReactNode; required?: boolean }) => (
  <label style={{
    display: 'block',
    fontSize: 14,
    fontWeight: 500,
    color: 'var(--kayo-color-foreground, #3b3d3f)',
    fontFamily: "'DM Sans', system-ui, sans-serif",
    marginBottom: 4,
  }}>
    {children}
    {required && <span style={{ color: 'var(--kayo-color-negative, #dc2626)', marginLeft: 2 }}>*</span>}
  </label>
)

export function LabelPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  return (
    <ComponentPageLayout
      title="Label"
      description="Accessible text label associated with form controls. Always pair with an input."
      level="Atom"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'With Input',
          preview: isKaayo ? (
            <div style={{ width: '100%', maxWidth: 320 }}>
              <KayoLabel>Full Name</KayoLabel>
              <KayoBrutalistInput placeholder="Ramkumar G" />
            </div>
          ) : (
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
            reactNative: `import { Text, View } from 'react-native'
import { Input } from '@kaayo/components/atoms/Input'

<View style={{ gap: 4 }}>
  <Text style={{
    fontSize: 14,
    fontWeight: '500',
    color: theme.text.primary,   // #3b3d3f
  }}>
    Full Name
  </Text>
  <Input placeholder="Ramkumar G" />
</View>

// Labels are plain Text components — use fontWeight '500' and
// theme.text.primary for default, theme.brand.primary for active/focus.`,
          },
        },
        {
          title: 'With Checkbox',
          preview: isKaayo ? (
            <KayoBrutalistCheckbox label="I agree to the terms and conditions" />
          ) : (
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms">I agree to the terms and conditions</Label>
            </div>
          ),
          code: {
            react: `<Checkbox id="terms" />
<Label htmlFor="terms">I agree to the terms and conditions</Label>`,
            reactNative: `import { Checkbox } from '@kaayo/components/atoms/Checkbox'

<Checkbox
  checked={accepted}
  onChange={setAccepted}
  label="I agree to the terms and conditions"
/>`,
          },
        },
        {
          title: 'Required field',
          preview: isKaayo ? (
            <div style={{ width: '100%', maxWidth: 320 }}>
              <KayoLabel required>Flat Number</KayoLabel>
              <KayoBrutalistInput placeholder="A-101" />
            </div>
          ) : (
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
            reactNative: `<View style={{ gap: 4 }}>
  <Text style={{ fontSize: 14, fontWeight: '500', color: theme.text.primary }}>
    Flat Number{' '}
    <Text style={{ color: theme.status.negative }}>*</Text>
  </Text>
  <Input placeholder="A-101" />
</View>`,
          },
        },
      ]}
    />
  )
}
