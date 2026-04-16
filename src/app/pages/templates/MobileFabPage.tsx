import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Plus, FileText, Users } from 'lucide-react'

export function MobileFabPage() {
  return (
    <ComponentPageLayout
      title="Mobile FAB"
      description="Fixed floating action button — visible only on mobile (hidden at md breakpoint). Use for the primary action on a screen."
      level="Template"
      status="Stable"
      sections={[
        {
          title: 'Single action',
          description: 'Tapping the FAB triggers one action directly.',
          preview: (
            <div className="relative h-32 bg-muted/40 rounded-lg overflow-hidden border border-border">
              <p className="text-xs text-muted-foreground p-4">Screen content</p>
              <div className="absolute bottom-4 right-4">
                <button
                  type="button"
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg"
                >
                  <Plus className="h-6 w-6 text-primary-foreground" />
                </button>
              </div>
            </div>
          ),
          code: {
            react: `import { MobileFab } from '@breathe/templates'

<MobileFab onClick={() => openNewTransactionSheet()} />`,
            reactNative: `// In React Native, position absolutely at bottom-right
import { TouchableOpacity, View } from 'react-native'
import { Plus } from 'lucide-react-native'
import { tokens } from '@breathe/tokens/react-native/lemniscate'

<TouchableOpacity
  style={{
    position: 'absolute', bottom: 24, right: 16,
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: tokens.lmnsColorPrimary,
    alignItems: 'center', justifyContent: 'center',
  }}
  onPress={handlePress}
>
  <Plus size={24} color={tokens.lmnsColorPrimaryForeground} />
</TouchableOpacity>`,
          },
        },
        {
          title: 'Multi-action (dropdown)',
          description: 'FAB opens a dropdown menu when multiple quick actions are needed.',
          preview: (
            <div className="relative h-32 bg-muted/40 rounded-lg overflow-hidden border border-border">
              <p className="text-xs text-muted-foreground p-4">Screen content</p>
              <div className="absolute bottom-4 right-4 opacity-60">
                <button className="flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg">
                  <Plus className="h-6 w-6 text-primary-foreground" />
                </button>
              </div>
            </div>
          ),
          code: {
            react: `<MobileFab
  actions={[
    { label: 'New Transaction', icon: <FileText className="h-4 w-4" />, onClick: () => {} },
    { label: 'Add Member',      icon: <Users className="h-4 w-4" />,    onClick: () => {} },
  ]}
/>`,
          },
        },
      ]}
    />
  )
}
