import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Slider } from '@/app/components/ui/slider'

export function SliderPage() {
  return (
    <ComponentPageLayout
      title="Slider"
      description="Allows users to select a value or range from a continuous or stepped scale."
      level="Atom"
      status="Stable"
      implemented={['lemniscate', 'aumraa']}
      sections={[
        {
          title: 'Default',
          description: 'Single value slider.',
          preview: (
            <div className="w-full max-w-sm space-y-6">
              <Slider defaultValue={[40]} max={100} step={1} />
            </div>
          ),
          code: {
            react: `import { Slider } from '@aumraa/breathe/components/ui/slider'

<Slider defaultValue={[40]} max={100} step={1} />`,
          },
        },
        {
          title: 'Range',
          description: 'Two-handle range selection.',
          preview: (
            <div className="w-full max-w-sm">
              <Slider defaultValue={[20, 70]} max={100} step={5} />
              <div className="flex justify-between mt-2">
                <span className="text-xs text-muted-foreground">₹0</span>
                <span className="text-xs text-muted-foreground">₹10,000</span>
              </div>
            </div>
          ),
          code: {
            react: `<Slider defaultValue={[20, 70]} max={100} step={5} />`,
          },
        },
        {
          title: 'Disabled',
          preview: (
            <div className="w-full max-w-sm">
              <Slider defaultValue={[60]} max={100} disabled />
            </div>
          ),
          code: {
            react: `<Slider defaultValue={[60]} max={100} disabled />`,
          },
        },
      ]}
    />
  )
}
