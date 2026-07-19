import { useState } from 'react'
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { KayoBrutalistStepIndicator, KayoBrutalistButton } from '@aumraa/breathe-react/kaayo'

export function StepIndicatorPage() {
  const [currentStep, setCurrentStep] = useState(2)

  const steps = [
    { id: 1, title: 'Student Info' },
    { id: 2, title: 'Tuition Fees' },
    { id: 3, title: 'Confirmation' },
  ]

  return (
    <ComponentPageLayout
      title="Step Indicator"
      description="Multi-step wizard progress tracker bar with brutalist badge numbers and active state indicators."
      level="Molecule"
      status="Stable"
      implemented={['kaayo']}
      sections={[
        {
          title: '3-Step Onboarding Form',
          description: 'Tracks user progression through complex form flows.',
          preview: (
            <div className="w-full max-w-xl flex flex-col gap-6">
              <KayoBrutalistStepIndicator steps={steps} currentStep={currentStep} />
              <div className="flex gap-3 justify-end">
                <KayoBrutalistButton
                  variant="secondary"
                  label="Previous"
                  disabled={currentStep <= 1}
                  onClick={() => setCurrentStep(currentStep - 1)}
                />
                <KayoBrutalistButton
                  variant="primary"
                  label="Next Step"
                  disabled={currentStep >= 3}
                  onClick={() => setCurrentStep(currentStep + 1)}
                />
              </div>
            </div>
          ),
          code: {
            react: `import { KayoBrutalistStepIndicator } from '@aumraa/breathe-react/kaayo'

<KayoBrutalistStepIndicator steps={steps} currentStep={currentStep} />`,
            reactNative: `import { StepIndicator } from '@kaayo/components/molecules/StepIndicator'

<StepIndicator steps={steps} currentStep={currentStep} />`,
          },
        },
      ]}
    />
  )
}
