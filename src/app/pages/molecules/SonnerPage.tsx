import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Button } from '@/app/components/ui/button'
import { Toaster } from '@/app/components/ui/sonner'
import { toast } from 'sonner'

export function SonnerPage() {
  return (
    <ComponentPageLayout
      title="Sonner"
      description="Non-blocking notification toasts for feedback, confirmations, and system messages. Breathe uses Sonner over Radix Toast for its simpler API."
      level="Molecule"
      status="Stable"
      implemented={['lemniscate', 'aumraa']}
      sections={[
        {
          title: 'Variants',
          description: 'Click each button to trigger the toast type.',
          preview: (
            <div className="flex flex-wrap gap-3">
              <Toaster />
              <Button
                variant="outline"
                onClick={() => toast('Payment recorded successfully')}
              >
                Default
              </Button>
              <Button
                variant="outline"
                onClick={() => toast.success('Dues cleared for A-101')}
              >
                Success
              </Button>
              <Button
                variant="outline"
                onClick={() => toast.error('Failed to send reminder')}
              >
                Error
              </Button>
              <Button
                variant="outline"
                onClick={() => toast.warning('3 overdue payments pending')}
              >
                Warning
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  toast('Reminder sent', {
                    description: 'WhatsApp message sent to 12 residents',
                    action: { label: 'Undo', onClick: () => {} },
                  })
                }
              >
                With action
              </Button>
            </div>
          ),
          code: {
            react: `import { Toaster } from '@aumraa/breathe/components/ui/sonner'
import { toast } from 'sonner'

// Add <Toaster /> once at app root

toast('Default message')
toast.success('Success message')
toast.error('Error message')
toast.warning('Warning message')
toast('With action', {
  description: 'Supporting detail',
  action: { label: 'Undo', onClick: () => handleUndo() },
})`,
          },
        },
      ]}
    />
  )
}
