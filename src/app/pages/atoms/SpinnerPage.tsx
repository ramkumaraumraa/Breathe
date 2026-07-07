import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistSpinner } from '@/app/components/custom/kaayo/KayoBrutalistSpinner'
import { Loader2 } from 'lucide-react'
import { cn } from '@/app/components/shared/utils'

function Spinner({ size = 'md', className }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizeClass = { sm: 'h-4 w-4', md: 'h-6 w-6', lg: 'h-9 w-9' }[size]
  return <Loader2 className={cn('animate-spin text-primary', sizeClass, className)} />
}

export function SpinnerPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  return (
    <ComponentPageLayout
      title="Spinner"
      description="Animated loading indicator used to communicate an in-progress operation. Appears inline, within buttons, or as a full-section overlay."
      level="Atom"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Default',
          description: 'The standard spinner at medium size.',
          preview: isKaayo ? (
            <KayoBrutalistSpinner size="md" />
          ) : (
            <Spinner size="md" />
          ),
          code: {
            react: `import { Loader2 } from 'lucide-react'

<Loader2 className="h-6 w-6 animate-spin text-primary" />`,
            reactNative: `import { ActivityIndicator } from 'react-native'

<ActivityIndicator
  size="small"
  color={theme.brand.primary}   // #970103
/>

// Token reference:
// Kaayo uses a custom circular spinner:
//   borderWidth: 3
//   borderColor: '#e5e7eb'
//   borderTopColor: theme.brand.primary  (#970103)
//   animation: rotate 0.7s linear infinite`,
          },
        },
        {
          title: 'Sizes',
          description: 'Three sizes: sm (16px), md (24px), lg (36px).',
          preview: isKaayo ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <KayoBrutalistSpinner size="sm" />
              <KayoBrutalistSpinner size="md" />
              <KayoBrutalistSpinner size="lg" />
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
            </div>
          ),
          code: {
            react: `<Loader2 className="h-4 w-4 animate-spin text-primary" />
<Loader2 className="h-6 w-6 animate-spin text-primary" />
<Loader2 className="h-9 w-9 animate-spin text-primary" />`,
            reactNative: `<ActivityIndicator size="small" color={theme.brand.primary} />
<ActivityIndicator size="large" color={theme.brand.primary} />

// Custom sm/lg via style:
<ActivityIndicator style={{ transform: [{ scale: 0.7 }] }} color={theme.brand.primary} />
<ActivityIndicator style={{ transform: [{ scale: 1.5 }] }} color={theme.brand.primary} />`,
          },
        },
        {
          title: 'With label',
          description: 'Spinner paired with a short descriptive label.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
              <KayoBrutalistSpinner size="md" label="Loading…" />
              <KayoBrutalistSpinner size="md" label="Saving…" />
              <KayoBrutalistSpinner size="md" label="Uploading…" />
            </div>
          ) : (
            <div className="flex items-center gap-8">
              {['Loading…', 'Saving…', 'Uploading…'].map((text) => (
                <span key={text} className="flex flex-col items-center gap-2">
                  <Spinner size="md" />
                  <span className="text-xs font-semibold text-muted-foreground">{text}</span>
                </span>
              ))}
            </div>
          ),
          code: {
            react: `<span className="flex flex-col items-center gap-2">
  <Loader2 className="h-6 w-6 animate-spin text-primary" />
  <span className="text-xs font-semibold text-muted-foreground">Loading…</span>
</span>`,
            reactNative: `import { ActivityIndicator, View, Text } from 'react-native'

<View style={{ alignItems: 'center', gap: 8 }}>
  <ActivityIndicator size="small" color={theme.brand.primary} />
  <Text style={{ fontSize: 12, fontWeight: '600', color: theme.text.secondary }}>
    Loading…
  </Text>
</View>`,
          },
        },
        {
          title: 'In context',
          description: 'Spinner used inside a button to show a pending action.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button
                disabled
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 20px',
                  fontSize: 14,
                  fontWeight: 700,
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  backgroundColor: 'var(--kayo-color-primary, #970103)',
                  color: '#ffffff',
                  border: '2px solid var(--kayo-color-border, #3b3d3f)',
                  borderRadius: 6,
                  boxShadow: '2px 2px 0 #191b1f',
                  cursor: 'not-allowed',
                  opacity: 0.85,
                }}
              >
                <KayoBrutalistSpinner size="sm" />
                Saving…
              </button>
              <button
                disabled
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 20px',
                  fontSize: 14,
                  fontWeight: 700,
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  backgroundColor: '#ffffff',
                  color: '#3b3d3f',
                  border: '2px solid var(--kayo-color-border, #3b3d3f)',
                  borderRadius: 6,
                  boxShadow: '2px 2px 0 #191b1f',
                  cursor: 'not-allowed',
                  opacity: 0.85,
                }}
              >
                <KayoBrutalistSpinner size="sm" />
                Loading
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                disabled
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg bg-primary text-primary-foreground cursor-not-allowed opacity-80"
              >
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving…
              </button>
              <button
                disabled
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg border border-border bg-background cursor-not-allowed opacity-80"
              >
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                Loading
              </button>
            </div>
          ),
          code: {
            react: `import { Loader2 } from 'lucide-react'
import { Button } from '@aumraa/breathe/components/ui/button'

<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Saving…
</Button>`,
            reactNative: `import { ActivityIndicator, TouchableOpacity, Text, View } from 'react-native'

<TouchableOpacity
  disabled
  style={{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: theme.brand.primary,
    borderWidth: 2,
    borderColor: theme.border.strong,
    borderRadius: 6,
    opacity: 0.85,
  }}
>
  <ActivityIndicator size="small" color="#ffffff" />
  <Text style={{ color: '#ffffff', fontWeight: '700', fontSize: 14 }}>Saving…</Text>
</TouchableOpacity>`,
          },
        },
      ]}
    />
  )
}
