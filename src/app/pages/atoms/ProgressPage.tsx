import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Progress } from '@/app/components/ui/progress'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistProgress } from '@/app/components/custom/kaayo/KayoBrutalistProgress'

export function ProgressPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  return (
    <ComponentPageLayout
      title="Progress"
      description="Communicates task completion status with the active product's brand colour."
      level="Atom"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Values',
          description: 'Progress at different completion states.',
          preview: isKaayo ? (
            <div style={{ width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 20 }}>
              <KayoBrutalistProgress value={25} label="Uploading…" showValue />
              <KayoBrutalistProgress value={60} label="Processing" showValue />
              <KayoBrutalistProgress value={100} label="Complete" showValue />
            </div>
          ) : (
            <div className="w-full max-w-sm space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Uploading...</span><span>25%</span>
                </div>
                <Progress value={25} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Processing</span><span>60%</span>
                </div>
                <Progress value={60} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Complete</span><span>100%</span>
                </div>
                <Progress value={100} />
              </div>
            </div>
          ),
          code: {
            react: `import { Progress } from '@aumraa/breathe/components/ui/progress'

<Progress value={60} />`,
            reactNative: `import { Progress } from '@kaayo/components/atoms/Progress'

<Progress value={25} label="Uploading…" showValue />
<Progress value={60} label="Processing"  showValue />
<Progress value={100} label="Complete"   showValue />

// Token reference:
// Track:  height 12, border 2px, borderColor theme.border.strong (#3b3d3f)
//         borderRadius 2, bg #ffffff
// Fill:   bg = theme.brand.primary (#970103), no border-radius
// Label:  fontSize 12, color theme.text.secondary (#6c6d70)
// Value:  fontWeight 700, color theme.text.primary (#3b3d3f)`,
          },
        },
        {
          title: 'Indeterminate',
          description: 'Loading state when total progress is unknown.',
          preview: isKaayo ? (
            <div style={{ width: '100%', maxWidth: 360 }}>
              <KayoBrutalistProgress label="Loading data…" />
            </div>
          ) : (
            <div className="w-full max-w-sm space-y-2">
              <p className="text-xs text-muted-foreground">Loading data…</p>
              <Progress />
            </div>
          ),
          code: {
            react: `<Progress /> {/* value omitted = indeterminate */}`,
            reactNative: `import { Progress } from '@kaayo/components/atoms/Progress'

// Indeterminate: animates a shimmer across the track
<Progress indeterminate label="Loading data…" />`,
          },
        },
      ]}
    />
  )
}
