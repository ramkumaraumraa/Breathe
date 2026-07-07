import { CSSProperties } from 'react'
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Button } from '@/app/components/atoms/button'
import { Toaster } from '@/app/components/molecules/sonner'
import { toast } from 'sonner'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistSonner } from '@/app/components/custom/kaayo/KayoBrutalistSonner'

const kayoBtn: CSSProperties = {
  padding: '8px 14px',
  fontSize: 13,
  fontWeight: 600,
  fontFamily: "'DM Sans', system-ui, sans-serif",
  border: '2px solid var(--kayo-color-border, #3b3d3f)',
  borderRadius: 6,
  background: '#ffffff',
  cursor: 'pointer',
  boxShadow: '2px 2px 0 #191b1f',
  color: 'var(--kayo-color-foreground, #3b3d3f)',
}

export function SonnerPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  return (
    <ComponentPageLayout
      title="Sonner"
      description="Non-blocking notification toasts for feedback, confirmations, and system messages. Breathe uses Sonner over Radix Toast for its simpler API."
      level="Molecule"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Types',
          description: 'Click each button to trigger its toast type — default, success, error, warning, info, loading.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <KayoBrutalistSonner />
              <button type="button" style={kayoBtn} onClick={() => toast('Payment recorded successfully')}>Default</button>
              <button type="button" style={kayoBtn} onClick={() => toast.success('Dues cleared for Flat A-101')}>Success</button>
              <button type="button" style={kayoBtn} onClick={() => toast.error('Failed to send reminder')}>Error</button>
              <button type="button" style={kayoBtn} onClick={() => toast.warning('3 overdue payments pending')}>Warning</button>
              <button type="button" style={kayoBtn} onClick={() => toast.info('Maintenance window: 2–4 AM')}>Info</button>
              <button type="button" style={kayoBtn} onClick={() => toast.loading('Syncing residents…')}>Loading</button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              <Toaster />
              <Button variant="outline" onClick={() => toast('Payment recorded successfully')}>Default</Button>
              <Button variant="outline" onClick={() => toast.success('Dues cleared for A-101')}>Success</Button>
              <Button variant="outline" onClick={() => toast.error('Failed to send reminder')}>Error</Button>
              <Button variant="outline" onClick={() => toast.warning('3 overdue payments pending')}>Warning</Button>
              <Button variant="outline" onClick={() => toast.info('Maintenance window: 2–4 AM')}>Info</Button>
              <Button variant="outline" onClick={() => toast.loading('Syncing residents…')}>Loading</Button>
            </div>
          ),
          code: {
            react: `import { KayoBrutalistSonner } from '@breathe/kaayo'
import { toast } from 'sonner'

// Mount once at page/app root:
<KayoBrutalistSonner />

// Trigger from anywhere:
toast('Default message')
toast.success('Dues cleared')
toast.error('Failed to send')
toast.warning('3 overdue payments')
toast.info('Maintenance window')
toast.loading('Syncing…')`,
          },
        },
        {
          title: 'With Description',
          description: 'Toast with a supporting description line — use for actions with context.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', gap: 10 }}>
              <KayoBrutalistSonner />
              <button
                type="button"
                style={kayoBtn}
                onClick={() => toast.success('Reminder sent', { description: 'WhatsApp message delivered to 12 residents in Block A' })}
              >
                Show toast
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Toaster />
              <Button variant="outline" onClick={() => toast.success('Reminder sent', { description: 'WhatsApp message delivered to 12 residents' })}>
                Show toast
              </Button>
            </div>
          ),
          code: {
            react: `toast.success('Reminder sent', {
  description: 'WhatsApp message delivered to 12 residents in Block A',
})`,
          },
        },
        {
          title: 'With Action',
          description: 'Error toast with a "Retry" action button — for recoverable failures.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', gap: 10 }}>
              <KayoBrutalistSonner />
              <button
                type="button"
                style={kayoBtn}
                onClick={() => toast.error('Payment failed', {
                  description: 'Unable to process ₹2,500 for Flat B-202',
                  action: { label: 'Retry', onClick: () => {} },
                })}
              >
                Trigger error
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Toaster />
              <Button variant="outline" onClick={() => toast.error('Payment failed', {
                description: 'Unable to process ₹2,500 for Flat B-202',
                action: { label: 'Retry', onClick: () => {} },
              })}>
                Trigger error
              </Button>
            </div>
          ),
          code: {
            react: `toast.error('Payment failed', {
  description: 'Unable to process ₹2,500',
  action: { label: 'Retry', onClick: () => retryPayment() },
})`,
          },
        },
        {
          title: 'Positions',
          description: 'Each button fires a toast at a different position — individual toasts can override the Toaster position.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <KayoBrutalistSonner />
              {(['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] as const).map(pos => (
                <button
                  key={pos}
                  type="button"
                  style={kayoBtn}
                  onClick={() => toast(`Position: ${pos}`, { position: pos })}
                >
                  {pos}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              <Toaster />
              {(['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] as const).map(pos => (
                <Button key={pos} variant="outline" size="sm" onClick={() => toast(`Position: ${pos}`, { position: pos })}>
                  {pos}
                </Button>
              ))}
            </div>
          ),
          code: {
            react: `// Per-toast position overrides the Toaster default:
toast('Top center', { position: 'top-center' })
toast('Bottom left', { position: 'bottom-left' })`,
          },
        },
        {
          title: 'Loading → Success',
          description: '`toast.promise()` — shows a loading state that transitions to success automatically.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', gap: 10 }}>
              <KayoBrutalistSonner />
              <button
                type="button"
                style={kayoBtn}
                onClick={() => {
                  const promise = new Promise<string>(resolve =>
                    setTimeout(() => resolve('done'), 2500)
                  )
                  toast.promise(promise as Promise<unknown>, {
                    loading: 'Sending reminders to 24 residents…',
                    success: 'Reminders sent successfully',
                    error: 'Failed to send reminders',
                  })
                }}
              >
                Send reminders
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Toaster />
              <Button variant="outline" onClick={() => {
                const p = new Promise(res => setTimeout(res, 2500))
                toast.promise(p as Promise<unknown>, { loading: 'Sending reminders…', success: 'Reminders sent!', error: 'Failed' })
              }}>
                Send reminders
              </Button>
            </div>
          ),
          code: {
            react: `const promise = sendReminders() // returns a Promise

toast.promise(promise, {
  loading: 'Sending reminders to 24 residents…',
  success: 'Reminders sent successfully',
  error: 'Failed to send reminders',
})`,
          },
        },
        {
          title: 'Multiple Stacked',
          description: '"Spam" button fires 3 toasts rapidly — shows stacking behaviour.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', gap: 10 }}>
              <KayoBrutalistSonner />
              <button
                type="button"
                style={kayoBtn}
                onClick={() => {
                  toast.success('Fee collected — Flat A-101')
                  toast.success('Fee collected — Flat B-202')
                  toast.warning('Overdue — Flat C-301')
                }}
              >
                Spam toasts
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Toaster />
              <Button variant="outline" onClick={() => {
                toast.success('Fee collected — A-101')
                toast.success('Fee collected — B-202')
                toast.warning('Overdue — C-301')
              }}>
                Spam toasts
              </Button>
            </div>
          ),
          code: {
            react: `// Fire multiple toasts — they stack, oldest slides out when limit reached:
toast.success('Fee collected — Flat A-101')
toast.success('Fee collected — Flat B-202')
toast.warning('Overdue — Flat C-301')`,
          },
        },
      ]}
    />
  )
}
