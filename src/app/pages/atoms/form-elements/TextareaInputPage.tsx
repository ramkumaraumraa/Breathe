import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Textarea } from '@/app/components/atoms/form-elements/textarea'
import { Label } from '@/app/components/atoms/label'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistTextarea } from '@/app/components/custom/kaayo/KayoBrutalistTextarea'

export function TextareaInputPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  return (
    <ComponentPageLayout
      title="Textarea Input"
      description="Multi-line text input for longer content like descriptions, notes, and messages."
      level="Atom"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Default',
          description: 'Standard textarea with placeholder. Click to see the crimson focus border.',
          preview: isKaayo ? (
            <div className="w-full max-w-sm">
              <KayoBrutalistTextarea label="Session notes" placeholder="Add notes about this session..." />
            </div>
          ) : (
            <div className="w-full max-w-sm space-y-2">
              <Label htmlFor="desc">Description</Label>
              <Textarea id="desc" placeholder="Enter a description..." />
            </div>
          ),
          code: {
            react: `import { Textarea } from '@aumraa/breathe/components/ui/textarea'

<Textarea placeholder="Enter a description..." />`,
            reactNative: `import { Input } from '@kaayo/components/atoms/Input'

// Textarea: use the Input atom with multiline props (extends TextInputProps)
<Input
  label="Session notes"
  placeholder="Add notes about this session..."
  multiline
  numberOfLines={4}
  textAlignVertical="top"
  onChangeText={setNotes}
  value={notes}
/>

// Token reference:
// Same border, radius, and focus behaviour as single-line Input
// minHeight grows with numberOfLines; paddingVertical: kayoSpace[2] (8)`,
          },
        },
        {
          title: 'States',
          description: 'Disabled and with helper text.',
          preview: isKaayo ? (
            <div className="w-full max-w-sm space-y-4">
              <KayoBrutalistTextarea label="Notes" placeholder="Disabled — no input allowed" disabled />
              <KayoBrutalistTextarea
                label="Description"
                placeholder="Describe the session topic..."
                rows={3}
                helperText="Max 500 characters. Visible on student receipt."
              />
            </div>
          ) : (
            <div className="w-full max-w-sm space-y-4">
              <Textarea placeholder="Disabled textarea" disabled />
              <div className="space-y-1">
                <Textarea placeholder="With helper text..." rows={3} />
                <p className="text-xs text-muted-foreground">Max 500 characters</p>
              </div>
            </div>
          ),
          code: {
            react: `<Textarea disabled />
<Textarea rows={3} />
<p className="text-xs text-muted-foreground">Max 500 characters</p>`,
            reactNative: `import { Input } from '@kaayo/components/atoms/Input'

// Disabled
<Input
  label="Notes"
  placeholder="No notes added"
  multiline
  numberOfLines={3}
  editable={false}
/>

// With helper text
<Input
  label="Description"
  placeholder="Describe the session topic..."
  multiline
  numberOfLines={4}
  helperText="Max 500 characters. Visible on student receipt."
  onChangeText={setDesc}
/>`,
          },
        },
      ]}
    />
  )
}
