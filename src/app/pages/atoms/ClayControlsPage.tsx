import { useState } from 'react'
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import {
  KayoClayKnob,
  KayoClayGrooveTrack,
  KayoClayGrooveSplit,
  KayoClayGrooveToggle,
  KayoClayPill,
  type ClayKnobState,
} from '@aumraa/breathe-react/kaayo'
import { MessageCircle, Send } from 'lucide-react'

export function ClayControlsPage() {
  const [toggleMark, setToggleMark] = useState<'present' | 'absent' | undefined>('present')
  const [grooveProgress, setGrooveProgress] = useState(0.65)
  const [pillClicked, setPillClicked] = useState(0)

  const knobStates: { state: ClayKnobState; label: string; number?: number }[] = [
    { state: 'open', label: 'Open (Step 1)', number: 1 },
    { state: 'active', label: 'Active (Step 2)', number: 2 },
    { state: 'complete', label: 'Complete (Step 3)', number: 3 },
    { state: 'positiveLit', label: 'Positive Lit (✓)' },
    { state: 'negativeLit', label: 'Negative Lit (✕)' },
    { state: 'nav', label: 'Nav Dial (‹ ›)' },
    { state: 'success', label: 'Success Halo' },
  ]

  return (
    <ComponentPageLayout
      title="Clay Controls"
      description="Skeuomorphic soft clay inputs and tactical micro-controls: round ClayKnobs, inset ClayGrooves (Track, Split, Toggle), and tactile ClayPills."
      level="Atom"
      status="Stable"
      implemented={['kaayo']}
      sections={[
        {
          title: 'ClayKnob States',
          products: ['kaayo'],
          description: 'Round skeuomorphic knobs for steppers, roll-call checks, and navigation.',
          preview: (
            <div className="flex flex-wrap items-center gap-6 p-6 bg-[#FFF7F3] rounded-2xl border border-[#FEC2A9]">
              {knobStates.map((k) => (
                <div key={k.state} className="flex flex-col items-center gap-2">
                  <KayoClayKnob state={k.state} number={k.number} />
                  <span className="text-xs font-semibold text-slate-700 capitalize text-center">
                    {k.label}
                  </span>
                </div>
              ))}
            </div>
          ),
          code: {
            react: `import { KayoClayKnob } from '@aumraa/breathe-react/kaayo'

<KayoClayKnob state="open" number={1} />
<KayoClayKnob state="active" number={2} />
<KayoClayKnob state="positiveLit" />
<KayoClayKnob state="success" />`,
            reactNative: `import { ClayKnob } from '@aumraa/breathe-native/kaayo'

<ClayKnob state="open" number={1} />
<ClayKnob state="active" number={2} />
<ClayKnob state="positiveLit" />
<ClayKnob state="success" />`,
          },
        },
        {
          title: 'ClayGroove Variants',
          products: ['kaayo'],
          description: 'Inset soft-clay groove tracks (Secondary/50 fill + inset clay shadow).',
          preview: (
            <div className="flex flex-col gap-6 p-6 bg-white rounded-2xl border border-slate-200">
              {/* 1. Track */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    1. ClayGrooveTrack (Countdown / Stepper)
                  </span>
                  <span className="text-xs text-slate-500 font-mono">{Math.round(grooveProgress * 100)}%</span>
                </div>
                <KayoClayGrooveTrack
                  bars={[
                    { tone: 'primary', progress: grooveProgress },
                  ]}
                />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={grooveProgress}
                  onChange={(e) => setGrooveProgress(parseFloat(e.target.value))}
                  className="w-full mt-3 cursor-pointer"
                />
              </div>

              {/* 2. Split */}
              <div>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-2">
                  2. ClayGrooveSplit (Roll-call Breakdown)
                </span>
                <KayoClayGrooveSplit present={14} absent={3} unmarked={5} />
                <div className="flex gap-4 mt-2 text-xs text-slate-500">
                  <span className="text-emerald-700 font-semibold">14 Present</span>
                  <span className="text-rose-700 font-semibold">3 Absent</span>
                  <span className="text-slate-400">5 Unmarked</span>
                </div>
              </div>

              {/* 3. Toggle */}
              <div>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-2">
                  3. ClayGrooveToggle (Attendance Radio)
                </span>
                <div className="flex items-center gap-4">
                  <KayoClayGrooveToggle
                    name="Aarav Sharma"
                    mark={toggleMark}
                    onToggle={(m) => setToggleMark(m)}
                  />
                  <span className="text-xs text-slate-600">
                    Marked: <strong>{toggleMark ?? 'None'}</strong>
                  </span>
                </div>
              </div>
            </div>
          ),
          code: {
            react: `import {
  KayoClayGrooveTrack,
  KayoClayGrooveSplit,
  KayoClayGrooveToggle
} from '@aumraa/breathe-react/kaayo'

<KayoClayGrooveTrack bars={[{ tone: 'primary', progress: 0.65 }]} />
<KayoClayGrooveSplit present={14} absent={3} unmarked={5} />
<KayoClayGrooveToggle name="Student" mark={mark} onToggle={setMark} />`,
            reactNative: `import {
  ClayGrooveTrack,
  ClayGrooveSplit,
  ClayGrooveToggle
} from '@aumraa/breathe-native/kaayo'

<ClayGrooveTrack bars={[{ tone: 'primary', progress: 0.65 }]} />
<ClayGrooveSplit present={14} absent={3} unmarked={5} />
<ClayGrooveToggle name="Student" mark={mark} onToggle={setMark} />`,
          },
        },
        {
          title: 'ClayPill Action Button',
          products: ['kaayo'],
          description: 'Tactile inside-card pill action with 2px hard shadow and press translation.',
          preview: (
            <div className="flex flex-col gap-4 p-6 bg-[#FFF7F3] rounded-2xl border border-[#FEC2A9]">
              <div className="flex flex-wrap items-center gap-4">
                <KayoClayPill
                  label="Remind all 6"
                  icon={MessageCircle}
                  onClick={() => setPillClicked((c) => c + 1)}
                />
                <KayoClayPill
                  label="Review and send"
                  icon={Send}
                  onClick={() => setPillClicked((c) => c + 1)}
                />
                <KayoClayPill
                  label="Disabled action"
                  disabled
                />
              </div>
              <span className="text-xs text-slate-500 font-mono mt-2">
                Press count: {pillClicked}
              </span>
            </div>
          ),
          code: {
            react: `import { KayoClayPill } from '@aumraa/breathe-react/kaayo'
import { MessageCircle } from 'lucide-react'

<KayoClayPill
  label="Remind all 6"
  icon={MessageCircle}
  onClick={() => {}}
/>`,
            reactNative: `import { ClayPill } from '@aumraa/breathe-native/kaayo'
import { MessageCircle } from 'lucide-react-native'

<ClayPill
  label="Remind all 6"
  icon={MessageCircle}
  onPress={() => {}}
/>`,
          },
        },
      ]}
    />
  )
}
export default ClayControlsPage

