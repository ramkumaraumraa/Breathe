import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group'
import { Label } from '@/app/components/ui/label'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistRadioGroup } from '@/app/components/custom/kaayo/KayoBrutalistRadioGroup'

export function RadioPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  return (
    <ComponentPageLayout
      title="Radio"
      description="Allows a single selection from a set of mutually exclusive options."
      level="Atom"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Default',
          description: 'Vertical radio group with labels.',
          preview: isKaayo ? (
            <KayoBrutalistRadioGroup
              defaultValue="monthly"
              options={[
                { value: 'monthly', label: 'Monthly' },
                { value: 'quarterly', label: 'Quarterly' },
                { value: 'annual', label: 'Annual' },
              ]}
            />
          ) : (
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
            reactNative: {
              kaayo: `import { RadioGroup } from '@kaayo/components/atoms/RadioGroup'

<RadioGroup
  value={selected}
  onChange={setSelected}
  options={[
    { value: 'monthly',   label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'annual',    label: 'Annual' },
  ]}
/>

// Token reference:
// Unselected ring: 20×20, border = theme.border.strong (#3b3d3f)
// Selected ring:   border = theme.brand.primary (#970103)
// Inner dot:       8×8 circle, bg = theme.brand.primary
// Row gap:         kayoSpace[3] (12)`,
              lemniscate: `import { RadioGroup } from '@lemniscate/components/atoms/RadioGroup'

<RadioGroup
  value={selected}
  onChange={setSelected}
  options={[
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'annual', label: 'Annual' },
  ]}
/>`,
            },
          },
        },
        {
          title: 'Horizontal',
          description: 'Inline layout for compact option sets.',
          preview: isKaayo ? (
            <KayoBrutalistRadioGroup
              defaultValue="card"
              horizontal
              options={[
                { value: 'card', label: 'Card' },
                { value: 'upi', label: 'UPI' },
                { value: 'cash', label: 'Cash' },
              ]}
            />
          ) : (
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
            reactNative: {
              kaayo: `import { RadioGroup } from '@kaayo/components/atoms/RadioGroup'
import { View } from 'react-native'

// RadioGroup renders vertically by default.
// For horizontal layout, wrap individual items in a row View:
<View style={{ flexDirection: 'row', gap: 24 }}>
  {['Card', 'UPI', 'Cash'].map(opt => (
    <RadioGroup
      key={opt}
      value={selected}
      onChange={setSelected}
      options={[{ value: opt.toLowerCase(), label: opt }]}
    />
  ))}
</View>`,
              lemniscate: `import { RadioGroup } from '@lemniscate/components/atoms/RadioGroup'

<RadioGroup
  value={selected}
  onChange={setSelected}
  horizontal
  options={[
    { value: 'card', label: 'Card' },
    { value: 'upi', label: 'UPI' },
    { value: 'cash', label: 'Cash' },
  ]}
/>`,
            },
          },
        },
      ]}
    />
  )
}
