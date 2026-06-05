import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Slider } from '@/app/components/ui/slider'
import { useState } from 'react'

export function DragSliderPage() {
  const [units, setUnits] = useState<number[]>([18])
  const [range, setRange] = useState<number[]>([10, 35])

  return (
    <ComponentPageLayout
      title="Drag Slider"
      description="Allows users to select a specific numeric value or range by clicking or touch-dragging along a track."
      level="Atom"
      status="Stable"
      implemented={['lemniscate', 'aumraa']}
      sections={[
        {
          title: '0 to 50 Unit Selector',
          description: 'Custom slider demonstrating a discrete unit picker (range 0 to 50) with live value feedback.',
          preview: (
            <div className="w-full max-w-sm space-y-4 bg-white dark:bg-slate-900 p-6 rounded-xl border border-border shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Quantity Select</span>
                <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-900/40 text-teal-700 dark:text-teal-400 font-bold text-sm border border-teal-200 dark:border-teal-800">
                  {units[0]} Units
                </span>
              </div>
              <Slider
                value={units}
                onValueChange={setUnits}
                max={50}
                min={0}
                step={1}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>10</span>
                <span>20</span>
                <span>30</span>
                <span>40</span>
                <span>50</span>
              </div>
            </div>
          ),
          code: {
            react: `import { Slider } from '@aumraa/breathe/components/ui/slider'
import { useState } from 'react'

const [units, setUnits] = useState<number[]>([18])

<div className="space-y-4">
  <div className="flex justify-between">
    <span>Quantity Select</span>
    <span>{units[0]} Units</span>
  </div>
  <Slider
    value={units}
    onValueChange={setUnits}
    max={50}
    min={0}
    step={1}
  />
</div>`,
          },
        },
        {
          title: 'Range Slider',
          description: 'Two-handle range selection for filtering values.',
          preview: (
            <div className="w-full max-w-sm space-y-4 bg-white dark:bg-slate-900 p-6 rounded-xl border border-border shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Target Range</span>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 font-bold text-sm border border-indigo-200 dark:border-indigo-800">
                  {range[0]} - {range[1]} Units
                </span>
              </div>
              <Slider
                value={range}
                onValueChange={setRange}
                max={50}
                min={0}
                step={1}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>50</span>
              </div>
            </div>
          ),
          code: {
            react: `const [range, setRange] = useState<number[]>([10, 35])

<Slider
  value={range}
  onValueChange={setRange}
  max={50}
  min={0}
  step={1}
/>`,
          },
        },
        {
          title: 'Disabled State',
          description: 'Prevent interaction for values that are locked or auto-calculated.',
          preview: (
            <div className="w-full max-w-sm bg-white dark:bg-slate-900 p-6 rounded-xl border border-border shadow-sm">
              <Slider defaultValue={[25]} max={50} disabled />
            </div>
          ),
          code: {
            react: `<Slider defaultValue={[25]} max={50} disabled />`,
          },
        },
      ]}
    />
  )
}
