import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { Plus, FileText, Users, UserPlus } from 'lucide-react'
import {
  KayoBrutalistFab,
  DEFAULT_KAAYO_DASHBOARD_ACTIONS,
  KayoBrutalistScreenFooterButton,
  KayoBrutalistButton,
} from '@aumraa/breathe-react/kaayo'

export function MobileFabPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  const sections = isKaayo
    ? [
        {
          title: 'Single action (Kaayo Neo-Brutalist)',
          description:
            'Corner-anchored 52px floating button with heavy 2px border, 3px offset drop-shadow, and crimson #970103 fill. Used on single-intent screens like Students (Add Student).',
          preview: (
            <div className="relative h-44 bg-[#fdfcfb] rounded-lg overflow-hidden border-2 border-[#3b3d3f]">
              <p className="text-xs text-slate-500 p-4 font-sans font-medium">Students Roster View</p>
              <KayoBrutalistFab
                position="absolute"
                bottom={16}
                right={16}
                icon={<UserPlus size={22} strokeWidth={2.5} />}
                onClick={() => {}}
              />
            </div>
          ),
          code: {
            react: `import { KayoBrutalistFab } from '@aumraa/breathe-react/kaayo'
import { UserPlus } from 'lucide-react'

<KayoBrutalistFab
  icon={<UserPlus size={22} strokeWidth={2.5} />}
  onClick={() => navigate('/students/new')}
/>`,
            reactNative: `// In Kaayo React Native (StudentsListScreen)
import { Pressable, StyleSheet } from 'react-native'
import { Plus } from 'lucide-react-native'
import { theme } from '@/design-system/foundations/theme'
import { kayoBorder, kayoRadius, kayoShadow } from '@/design-system/foundations/tokens'

<Pressable
  style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
  onPress={() => router.push('/students/new')}
>
  <Plus size={24} color={theme.text.onPrimary} strokeWidth={2.5} />
</Pressable>

const styles = StyleSheet.create({
  fab: {
    position: 'absolute', bottom: 16, right: 16,
    width: 52, height: 52, borderRadius: kayoRadius.pill,
    backgroundColor: theme.brand.primary,
    borderWidth: kayoBorder.width, borderColor: theme.border.strong,
    alignItems: 'center', justifyContent: 'center',
    ...kayoShadow.sm,
  },
  fabPressed: {
    transform: [{ translateX: 2 }, { translateY: 2 }],
    ...kayoShadow.none,
  },
})`,
          },
        },
        {
          title: 'Quick Actions Popover Menu (Interactive)',
          description:
            'Tapping the FAB smoothly rotates the icon 90° from Plus to X, displays a background scrim, and opens the 4-item Quick Actions Popover (Add payment, Student, Extra class, Cancel class). Click the FAB below to try it interactively.',
          preview: (
            <div className="relative h-80 bg-[#fdfcfb] rounded-lg overflow-hidden border-2 border-[#3b3d3f]">
              <div className="p-4">
                <p className="text-xs text-slate-500 font-sans font-medium">Dashboard Viewport</p>
                <p className="text-xs text-slate-400 font-sans mt-1">Tap the circular red button below to trigger the quick actions overlay.</p>
              </div>
              <KayoBrutalistFab
                actions={DEFAULT_KAAYO_DASHBOARD_ACTIONS}
                position="absolute"
                bottom={16}
                right={16}
              />
            </div>
          ),
          code: {
            react: `import { KayoBrutalistFab, DEFAULT_KAAYO_DASHBOARD_ACTIONS } from '@aumraa/breathe-react/kaayo'

<KayoBrutalistFab
  actions={DEFAULT_KAAYO_DASHBOARD_ACTIONS}
  position="absolute"
  bottom={16}
  right={16}
/>`,
            reactNative: `// In Kaayo React Native (DashboardQuickActionsFab)
import { DashboardQuickActionsFab } from '@/features/home/components/DashboardQuickActionsFab'

// Renders inside Dashboard root view above bottom navigation
<DashboardQuickActionsFab />`,
          },
        },
        {
          title: 'ScreenFooterButton (Full-Width Alternative)',
          description:
            'Replaces the corner floating FAB on single-action list and form screens (e.g. Add Branch, Add Session) where a full-width footer is available instead of a corner circle.',
          preview: (
            <div className="relative h-44 bg-[#fdfcfb] rounded-lg overflow-hidden border-2 border-[#3b3d3f] flex flex-col justify-between">
              <p className="text-xs text-slate-500 p-4 font-sans font-medium">Branches List Screen</p>
              <KayoBrutalistScreenFooterButton sticky={false}>
                <KayoBrutalistButton
                  fullWidth
                  label="Add Branch"
                  iconLeft={<Plus size={18} strokeWidth={2.5} />}
                  onClick={() => {}}
                />
              </KayoBrutalistScreenFooterButton>
            </div>
          ),
          code: {
            react: `import { KayoBrutalistScreenFooterButton, KayoBrutalistButton } from '@aumraa/breathe-react/kaayo'
import { Plus } from 'lucide-react'

<KayoBrutalistScreenFooterButton>
  <KayoBrutalistButton
    fullWidth
    label="Add Branch"
    iconLeft={<Plus size={18} strokeWidth={2.5} />}
    onClick={() => openAddBranchModal()}
  />
</KayoBrutalistScreenFooterButton>`,
            reactNative: `// In Kaayo React Native (ScreenFooterButton)
import { ScreenFooterButton } from '@/design-system/components/molecules/ScreenFooterButton'

<ScreenFooterButton
  label="Add Branch"
  onPress={() => router.push('/settings/branches/new')}
/>`,
          },
        },
      ]
    : [
        {
          title: 'Single action (Lemniscate)',
          description: 'Tapping the FAB triggers one action directly with Lemniscate gradient styling.',
          preview: (
            <div className="relative h-32 bg-muted/40 rounded-lg overflow-hidden border border-border">
              <p className="text-xs text-muted-foreground p-4">Screen content</p>
              <div className="absolute bottom-4 right-4">
                <button
                  type="button"
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand shadow-brand-hover"
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
import { TouchableOpacity } from 'react-native'
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
                <button className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand shadow-brand-hover">
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
      ]

  return (
    <ComponentPageLayout
      title="Mobile FAB"
      description="Fixed floating action button — visible on mobile layouts for primary actions. Adapts to the active brand treatment, including Lemniscate's smooth gradient or Kaayo's neo-brutalist 52px quick-actions popover."
      level="Template"
      status="Stable"
      implemented={['lemniscate', 'kaayo']}
      sections={sections}
    />
  )
}
