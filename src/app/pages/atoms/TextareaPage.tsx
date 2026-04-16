import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Textarea } from '@/app/components/ui/textarea'
import { Label } from '@/app/components/ui/label'

export function TextareaPage() {
  return (
    <ComponentPageLayout
      title="Textarea"
      description="Multi-line text input for longer content like descriptions, notes, and messages."
      level="Atom"
      status="Stable"
      implemented={['lemniscate', 'aumraa']}
      sections={[
        {
          title: 'Default',
          description: 'Standard textarea with placeholder.',
          preview: (
            <div className="w-full max-w-sm space-y-2">
              <Label htmlFor="desc">Description</Label>
              <Textarea id="desc" placeholder="Enter a description..." />
            </div>
          ),
          code: {
            react: `import { Textarea } from '@aumraa/breathe/components/ui/textarea'

<Textarea placeholder="Enter a description..." />`,
            reactNative: `import { TextInput } from 'react-native'
import { tokens } from '@aumraa/breathe/tokens/dist/react-native/lemniscate'

<TextInput
  multiline
  numberOfLines={4}
  placeholder="Enter a description..."
  style={{
    borderColor: tokens.lmnsColorBorder,
    borderWidth: 1,
    borderRadius: tokens.lmnsRadiusDefault,
    padding: tokens.lmnsSpacingCardPadding,
    color: tokens.lmnsColorForeground,
  }}
/>`,
          },
        },
        {
          title: 'States',
          description: 'Disabled and with character count.',
          preview: (
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
          },
        },
      ]}
    />
  )
}
