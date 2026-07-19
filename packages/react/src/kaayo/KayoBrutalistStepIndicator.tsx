import { Check } from 'lucide-react'

export interface KayoStepItem {
  id: number
  title: string
}

export interface KayoBrutalistStepIndicatorProps {
  steps: KayoStepItem[]
  currentStep: number
}

export function KayoBrutalistStepIndicator({
  steps,
  currentStep,
}: KayoBrutalistStepIndicatorProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      {steps.map((step, idx) => {
        const isDone = step.id < currentStep
        const isCurrent = step.id === currentStep

        return (
          <div key={step.id} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  border: '2px solid var(--kayo-color-border, #191b1f)',
                  background: isDone
                    ? '#126932'
                    : isCurrent
                      ? 'var(--kayo-color-primary, #970103)'
                      : '#ffffff',
                  color: isDone || isCurrent ? '#ffffff' : '#747476',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 700,
                  boxShadow: isCurrent ? 'var(--kayo-shadow-sm, 2px 2px 0 #191b1f)' : 'none',
                }}
              >
                {isDone ? <Check size={14} strokeWidth={3} /> : step.id}
              </div>
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: isCurrent ? 700 : 500,
                  color: isCurrent ? '#14161a' : '#747476',
                  whiteSpace: 'nowrap',
                }}
              >
                {step.title}
              </span>
            </div>

            {idx < steps.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: '2px',
                  backgroundColor: isDone ? '#126932' : '#e5e5e7',
                  margin: '0 12px',
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
