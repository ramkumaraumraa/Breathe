import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Progress } from '@/app/components/ui/progress'

export function ProgressPage() {
  return (
    <ComponentPageLayout
      title="Progress"
      description="Communicates task completion status with the active product's brand gradient."
      level="Atom"
      status="Stable"
      implemented={['lemniscate', 'aumraa']}
      sections={[
        {
          title: 'Values',
          description: 'Progress at different completion states.',
          preview: (
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
          },
        },
      ]}
    />
  )
}
