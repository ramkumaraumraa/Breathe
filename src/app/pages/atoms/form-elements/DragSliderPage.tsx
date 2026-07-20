import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Slider } from '@/app/components/ui/slider'
import { useState } from 'react'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistSlider, KayoBrutalistRangeSlider } from '@/app/components/custom/kaayo/KayoBrutalistSlider'

const cardBase: React.CSSProperties = {
  width: '100%',
  maxWidth: 360,
  padding: 20,
  border: '2px solid var(--kayo-color-border, #3b3d3f)',
  borderRadius: 8,
  boxShadow: '4px 4px 0 #191b1f',
  backgroundColor: '#ffffff',
  fontFamily: "'DM Sans', system-ui, sans-serif",
}

const valueBadge: React.CSSProperties = {
  padding: '2px 10px',
  border: '2px solid var(--kayo-color-border, #3b3d3f)',
  borderRadius: 4,
  backgroundColor: 'var(--kayo-color-primary, #970103)',
  color: '#ffffff',
  fontWeight: 700,
  fontSize: 13,
}

const tickRow: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 8,
  fontSize: 11,
  color: '#6c6d70',
}

export function DragSliderPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  const [units, setUnits] = useState<number[]>([18])
  const [range, setRange] = useState<number[]>([10, 35])

  return (
    <ComponentPageLayout
      title="Drag Slider"
      description="Allows users to select a specific numeric value or range by clicking or touch-dragging along a track."
      level="Atom"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: '0 to 50 Unit Selector',
          description: 'Discrete unit picker (range 0 to 50) with live value feedback.',
          preview: isKaayo ? (
            <div style={cardBase}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: '#3b3d3f' }}>Quantity Select</span>
                <span style={valueBadge}>{units[0]} Units</span>
              </div>
              <KayoBrutalistSlider
                value={units[0]}
                onChange={(v) => setUnits([v])}
                min={0}
                max={50}
                step={1}
              />
              <div style={tickRow}>
                {[0, 10, 20, 30, 40, 50].map((n) => <span key={n}>{n}</span>)}
              </div>
            </div>
          ) : (
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
            reactNative: {
              kaayo: `import { Slider } from '@kaayo/components/atoms/Slider'
import { useState } from 'react'

const [units, setUnits] = useState(18)

<Slider
  value={units}
  onValueChange={setUnits}
  min={0}
  max={50}
  step={1}
/>

// Token reference:
// Track height: 8, borderWidth: 2, borderColor: theme.border.strong (#3b3d3f)
// Filled range:  bg = theme.brand.primary (#970103)
// Thumb:         size 20, bg #fff, borderWidth 2, borderColor theme.border.strong
// Thumb shadow:  kayoShadow.sm → '2px 2px 0 #191b1f'
// Active thumb:  translate(2,2) + shadow disappears (neo-brutalist press)`,
              lemniscate: `import { Slider } from '@lemniscate/components/atoms/Slider'
import { useState } from 'react'

const [units, setUnits] = useState(18)

<Slider value={units} onValueChange={setUnits} min={0} max={50} step={1} />`,
            },
          },
        },
        {
          title: 'Range Slider',
          description: 'Two-handle range selection for filtering values between a min and max.',
          preview: isKaayo ? (
            <div style={cardBase}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: '#3b3d3f' }}>Target Range</span>
                <span style={valueBadge}>{range[0]} – {range[1]} units</span>
              </div>
              <KayoBrutalistRangeSlider
                value={[range[0], range[1]] as [number, number]}
                onChange={([lo, hi]) => setRange([lo, hi])}
                min={0}
                max={50}
                step={1}
              />
              <div style={{ ...tickRow, justifyContent: 'space-between' }}>
                <span>0</span>
                <span>50</span>
              </div>
            </div>
          ) : (
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
            reactNative: {
              kaayo: `import { Slider } from '@kaayo/components/atoms/Slider'

const [range, setRange] = useState<[number, number]>([10, 35])

<Slider
  value={range}
  onValueChange={setRange}
  min={0}
  max={50}
  step={1}
  mode="range"
/>

// mode="range": renders two thumbs
// The filled track spans from range[0]% to range[1]%
// Both thumbs use the same token styling as single-thumb mode`,
              lemniscate: `import { Slider } from '@lemniscate/components/atoms/Slider'

const [range, setRange] = useState<[number, number]>([10, 35])

<Slider value={range} onValueChange={setRange} min={0} max={50} step={1} mode="range" />`,
            },
          },
        },
        {
          title: 'Disabled State',
          description: 'Prevent interaction for values that are locked or auto-calculated.',
          preview: isKaayo ? (
            <div style={{ ...cardBase, maxWidth: 360 }}>
              <KayoBrutalistSlider
                defaultValue={25}
                min={0}
                max={50}
                disabled
              />
            </div>
          ) : (
            <div className="w-full max-w-sm bg-white dark:bg-slate-900 p-6 rounded-xl border border-border shadow-sm">
              <Slider defaultValue={[25]} max={50} disabled />
            </div>
          ),
          code: {
            react: `<Slider defaultValue={[25]} max={50} disabled />`,
            reactNative: `<Slider
  value={25}
  onValueChange={() => {}}
  min={0}
  max={50}
  disabled
/>

// disabled: thumb opacity 0.45, onPress/drag blocked internally`,
          },
        },
      ]}
    />
  )
}
