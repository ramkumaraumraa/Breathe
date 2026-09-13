import { CSSProperties, Fragment, ReactNode } from 'react'
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

interface SonnerCopy {
  default: string
  success: string
  error: string
  warning: string
  info: string
  loading: string
  described: [title: string, description: string]
  failed: [title: string, description: string]
  promise: { button: string; loading: string; success: string; error: string }
  stacked: [string, string, string]
}

// Kaayo and Lemniscate get their own domain copy; every other product gets neutral copy.
const COPY: Record<'kaayo' | 'lemniscate' | 'generic', SonnerCopy> = {
  kaayo: {
    default: 'Payment recorded for Arjun K.',
    success: 'Tuition fee cleared for Batch A',
    error: 'Failed to send reminder',
    warning: '3 students have pending fees',
    info: 'Class rescheduled to 5:00 PM',
    loading: 'Syncing students…',
    described: ['Reminder sent', 'WhatsApp message delivered to 12 parents in Batch A'],
    failed: ['Payment failed', 'Unable to record ₹2,500 for Priya S.'],
    promise: { button: 'Send reminders', loading: 'Sending reminders to 24 parents…', success: 'Reminders sent successfully', error: 'Failed to send reminders' },
    stacked: ['Fee collected — Arjun K.', 'Fee collected — Priya S.', 'Overdue — Ramesh K.'],
  },
  lemniscate: {
    default: 'Payment recorded successfully',
    success: 'Dues cleared for A-101',
    error: 'Failed to send reminder',
    warning: '3 overdue payments pending',
    info: 'Maintenance window: 2–4 AM',
    loading: 'Syncing residents…',
    described: ['Reminder sent', 'WhatsApp message delivered to 12 residents'],
    failed: ['Payment failed', 'Unable to process ₹2,500 for Flat B-202'],
    promise: { button: 'Send reminders', loading: 'Sending reminders…', success: 'Reminders sent!', error: 'Failed' },
    stacked: ['Fee collected — A-101', 'Fee collected — B-202', 'Overdue — C-301'],
  },
  generic: {
    default: 'Changes saved',
    success: 'Export ready',
    error: 'Failed to save changes',
    warning: '3 items need attention',
    info: 'A new version is available',
    loading: 'Syncing…',
    described: ['Invite sent', 'Email delivered to 12 teammates'],
    failed: ['Upload failed', 'Unable to upload report.pdf'],
    promise: { button: 'Export', loading: 'Exporting 24 records…', success: 'Export complete', error: 'Export failed' },
    stacked: ['Item 1 saved', 'Item 2 saved', 'Item 3 needs review'],
  },
}

const POSITIONS = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] as const

export function SonnerPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'
  const c = COPY[activeProduct === 'kaayo' || activeProduct === 'lemniscate' ? activeProduct : 'generic']

  // Kaayo previews use the brutalist host + buttons; everyone else uses the shared Toaster + Button.
  const row = (children: ReactNode) =>
    isKaayo ? (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}><KayoBrutalistSonner />{children}</div>
    ) : (
      <div className="flex flex-wrap gap-3"><Toaster />{children}</div>
    )
  const trigger = (label: string, onClick: () => void, small = false) =>
    isKaayo ? (
      <button type="button" style={kayoBtn} onClick={onClick}>{label}</button>
    ) : (
      <Button variant="outline" size={small ? 'sm' : undefined} onClick={onClick}>{label}</Button>
    )
  const mount = isKaayo
    ? { imp: "import { KayoBrutalistSonner } from '@breathe/kaayo'", tag: '<KayoBrutalistSonner />' }
    : { imp: "import { Toaster } from '@breathe/ui'", tag: '<Toaster />' }

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
          preview: row(
            <>
              {trigger('Default', () => toast(c.default))}
              {trigger('Success', () => toast.success(c.success))}
              {trigger('Error', () => toast.error(c.error))}
              {trigger('Warning', () => toast.warning(c.warning))}
              {trigger('Info', () => toast.info(c.info))}
              {trigger('Loading', () => toast.loading(c.loading))}
            </>,
          ),
          code: {
            react: `${mount.imp}
import { toast } from 'sonner'

// Mount once at page/app root:
${mount.tag}

// Trigger from anywhere:
toast(${JSON.stringify(c.default)})
toast.success(${JSON.stringify(c.success)})
toast.error(${JSON.stringify(c.error)})
toast.warning(${JSON.stringify(c.warning)})
toast.info(${JSON.stringify(c.info)})
toast.loading(${JSON.stringify(c.loading)})`,
          },
        },
        {
          title: 'With Description',
          description: 'Toast with a supporting description line — use for actions with context.',
          preview: row(trigger('Show toast', () => toast.success(c.described[0], { description: c.described[1] }))),
          code: {
            react: `toast.success(${JSON.stringify(c.described[0])}, {
  description: ${JSON.stringify(c.described[1])},
})`,
          },
        },
        {
          title: 'With Action',
          description: 'Error toast with a "Retry" action button — for recoverable failures.',
          preview: row(
            trigger('Trigger error', () => toast.error(c.failed[0], {
              description: c.failed[1],
              action: { label: 'Retry', onClick: () => {} },
            })),
          ),
          code: {
            react: `toast.error(${JSON.stringify(c.failed[0])}, {
  description: ${JSON.stringify(c.failed[1])},
  action: { label: 'Retry', onClick: () => retry() },
})`,
          },
        },
        {
          title: 'Positions',
          description: 'Each button fires a toast at a different position — individual toasts can override the Toaster position.',
          preview: row(
            POSITIONS.map(pos => (
              <Fragment key={pos}>{trigger(pos, () => toast(`Position: ${pos}`, { position: pos }), true)}</Fragment>
            )),
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
          preview: row(
            trigger(c.promise.button, () => {
              const p = new Promise(res => setTimeout(res, 2500))
              toast.promise(p as Promise<unknown>, { loading: c.promise.loading, success: c.promise.success, error: c.promise.error })
            }),
          ),
          code: {
            react: `const promise = doWork() // returns a Promise

toast.promise(promise, {
  loading: ${JSON.stringify(c.promise.loading)},
  success: ${JSON.stringify(c.promise.success)},
  error: ${JSON.stringify(c.promise.error)},
})`,
          },
        },
        {
          title: 'Multiple Stacked',
          description: '"Spam" button fires 3 toasts rapidly — shows stacking behaviour.',
          preview: row(
            trigger('Spam toasts', () => {
              toast.success(c.stacked[0])
              toast.success(c.stacked[1])
              toast.warning(c.stacked[2])
            }),
          ),
          code: {
            react: `// Fire multiple toasts — they stack, oldest slides out when limit reached:
toast.success(${JSON.stringify(c.stacked[0])})
toast.success(${JSON.stringify(c.stacked[1])})
toast.warning(${JSON.stringify(c.stacked[2])})`,
          },
        },
      ]}
    />
  )
}
