import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Skeleton } from '@/app/components/ui/skeleton'

export function SkeletonPage() {
  return (
    <ComponentPageLayout
      title="Skeleton"
      description="Placeholder loading state that previews the shape of content before it loads."
      level="Atom"
      status="Stable"
      implemented={['lemniscate', 'aumraa']}
      sections={[
        {
          title: 'Card skeleton',
          description: 'Typical card loading pattern.',
          preview: (
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
          },
        },
        {
          title: 'List skeleton',
          description: 'Row-based list loading pattern.',
          preview: (
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
          },
        },
      ]}
    />
  )
}
