import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Skeleton } from '@/app/components/ui/skeleton'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistSkeleton } from '@/app/components/custom/kaayo/KayoBrutalistSkeleton'

export function SkeletonPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  return (
    <ComponentPageLayout
      title="Skeleton"
      description="Placeholder loading state that previews the shape of content before it loads."
      level="Atom"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Card skeleton',
          description: 'Typical card loading pattern.',
          preview: isKaayo ? (
            <div style={{ width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <KayoBrutalistSkeleton width={48} height={48} round />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <KayoBrutalistSkeleton height={14} style={{ width: '75%' }} />
                  <KayoBrutalistSkeleton height={11} style={{ width: '50%' }} />
                </div>
              </div>
              <KayoBrutalistSkeleton height={120} style={{ width: '100%' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <KayoBrutalistSkeleton height={11} style={{ width: '100%' }} />
                <KayoBrutalistSkeleton height={11} style={{ width: '85%' }} />
                <KayoBrutalistSkeleton height={11} style={{ width: '65%' }} />
              </div>
            </div>
          ) : (
            <div className="w-full max-w-sm space-y-4">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
              <Skeleton className="h-32 w-full rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
                <Skeleton className="h-3 w-4/6" />
              </div>
            </div>
          ),
          code: {
            react: `import { Skeleton } from '@aumraa/breathe/components/ui/skeleton'

<div className="flex items-center space-x-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2 flex-1">
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-3 w-1/2" />
  </div>
</div>
<Skeleton className="h-32 w-full rounded-lg" />`,
            reactNative: {
              kaayo: `import { Skeleton } from '@kaayo/components/atoms/Skeleton'

<View style={{ gap: 16 }}>
  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
    <Skeleton width={48} height={48} borderRadius={24} />
    <View style={{ flex: 1, gap: 8 }}>
      <Skeleton width="75%" height={14} />
      <Skeleton width="50%" height={11} />
    </View>
  </View>
  <Skeleton width="100%" height={120} />
</View>

// Token reference:
// bg: #e5e7eb (gray-200), border: 1px solid #d1d5db
// borderRadius: 2 (rectangular, not rounded)
// animation: opacity pulse 1.6s ease-in-out infinite (0.4 → 1.0)`,
              lemniscate: `import { Skeleton } from '@lemniscate/components/atoms/Skeleton'

<View style={{ gap: 16 }}>
  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
    <Skeleton width={48} height={48} borderRadius={24} />
    <View style={{ flex: 1, gap: 8 }}>
      <Skeleton width="75%" height={14} />
      <Skeleton width="50%" height={11} />
    </View>
  </View>
  <Skeleton width="100%" height={120} />
</View>`,
            },
          },
        },
        {
          title: 'List skeleton',
          description: 'Row-based list loading pattern.',
          preview: isKaayo ? (
            <div style={{ width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[1, 2, 3].map((i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <KayoBrutalistSkeleton width={32} height={32} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <KayoBrutalistSkeleton width={110} height={11} />
                      <KayoBrutalistSkeleton width={80} height={9} />
                    </div>
                  </div>
                  <KayoBrutalistSkeleton width={64} height={20} />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full max-w-sm space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <div className="space-y-1">
                      <Skeleton className="h-3 w-28" />
                      <Skeleton className="h-2 w-20" />
                    </div>
                  </div>
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
              ))}
            </div>
          ),
          code: {
            react: `{items.map((i) => (
  <div key={i} className="flex items-center justify-between">
    <Skeleton className="h-8 w-8 rounded-md" />
    <Skeleton className="h-3 w-28" />
    <Skeleton className="h-5 w-16 rounded-full" />
  </div>
))}`,
            reactNative: {
              kaayo: `import { Skeleton } from '@kaayo/components/atoms/Skeleton'

{[1, 2, 3].map(i => (
  <View key={i} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      <Skeleton width={32} height={32} />
      <View style={{ gap: 6 }}>
        <Skeleton width={110} height={11} />
        <Skeleton width={80} height={9} />
      </View>
    </View>
    <Skeleton width={64} height={20} />
  </View>
))}`,
              lemniscate: `import { Skeleton } from '@lemniscate/components/atoms/Skeleton'

{[1, 2, 3].map(i => (
  <View key={i} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
    <Skeleton width={32} height={32} />
    <Skeleton width={110} height={11} />
    <Skeleton width={64} height={20} />
  </View>
))}`,
            },
          },
        },
      ]}
    />
  )
}
