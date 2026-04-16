import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Button } from '@/app/components/ui/button'
import { ArrowRight, Download, Trash2 } from 'lucide-react'

export function ButtonPage() {
  return (
    <ComponentPageLayout
      title="Button"
      description="Triggers an action or navigates the user. Choose the variant that matches the importance and nature of the action."
      level="Atom"
      status="Stable"
      sections={[
        {
          title: 'Variants',
          description: 'Six variants for different levels of emphasis.',
          preview: (
            <div className="flex flex-wrap gap-3">
              <Button variant="default">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Danger</Button>
              <Button variant="link">Link</Button>
            </div>
          ),
          code: {
            react: `import { Button } from '@breathe/ui'

<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Danger</Button>
<Button variant="link">Link</Button>`,
            reactNative: `import { TouchableOpacity, Text, StyleSheet } from 'react-native'
// Tokens from: @breathe/tokens/react-native/lemniscate
import { tokens } from '@breathe/tokens/react-native/lemniscate'

<TouchableOpacity style={[styles.btn, { backgroundColor: tokens.lmnsColorPrimary }]}>
  <Text style={{ color: tokens.lmnsColorPrimaryForeground }}>Primary</Text>
</TouchableOpacity>`,
          },
        },
        {
          title: 'Sizes',
          description: 'Five sizes from sm to xl.',
          preview: (
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          ),
          code: {
            react: `<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>`,
          },
        },
        {
          title: 'With icons',
          description: 'Left icon, right icon, or icon-only.',
          preview: (
            <div className="flex flex-wrap items-center gap-3">
              <Button><Download className="mr-2 h-4 w-4" />Download</Button>
              <Button variant="outline">Continue <ArrowRight className="ml-2 h-4 w-4" /></Button>
              <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button>
            </div>
          ),
          code: {
            react: `import { Download, ArrowRight, Trash2 } from 'lucide-react'

<Button><Download className="mr-2 h-4 w-4" />Download</Button>
<Button variant="outline">Continue <ArrowRight className="ml-2 h-4 w-4" /></Button>
<Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button>`,
          },
        },
        {
          title: 'States',
          description: 'Disabled state.',
          preview: (
            <div className="flex flex-wrap items-center gap-3">
              <Button disabled>Disabled</Button>
              <Button variant="outline" disabled>Disabled Outline</Button>
            </div>
          ),
          code: {
            react: `<Button disabled>Disabled</Button>
<Button variant="outline" disabled>Disabled Outline</Button>`,
          },
        },
      ]}
    />
  )
}
