import { useState } from 'react'
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Alert, AlertDescription, AlertTitle } from '@/app/components/ui/alert'
import { Terminal, AlertTriangle, Info, CheckCircle2, XCircle } from 'lucide-react'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistAlert } from '@/app/components/custom/kaayo/KayoBrutalistAlert'

export function AlertPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'
  const [dismissed, setDismissed] = useState(false)

  return (
    <ComponentPageLayout
      title="Alert"
      description="Communicates a status, warning, error, or informational message inline within the page. Does not require user action to dismiss."
      level="Molecule"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Variants',
          description: 'Four semantic variants — info, success, warning, and error — each with a left accent bar.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '480px' }}>
              <KayoBrutalistAlert variant="info"    title="Information"  description="Your account settings have been updated." icon={<Info size={18} />} />
              <KayoBrutalistAlert variant="success" title="Success"      description="Payment of ₹4,200 processed successfully." icon={<CheckCircle2 size={18} />} />
              <KayoBrutalistAlert variant="warning" title="Warning"      description="Your subscription expires in 3 days." icon={<AlertTriangle size={18} />} />
              <KayoBrutalistAlert variant="error"   title="Error"        description="Failed to connect. Please try again." icon={<XCircle size={18} />} />
            </div>
          ) : (
            <div className="space-y-3 w-full max-w-lg">
              <Alert>
                <Terminal className="h-4 w-4" />
                <AlertTitle>Default</AlertTitle>
                <AlertDescription>A neutral informational message.</AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Something went wrong. Please try again.</AlertDescription>
              </Alert>
            </div>
          ),
          code: {
            react: `import { KayoBrutalistAlert } from '@breathe/kaayo'
import { Info, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'

<KayoBrutalistAlert variant="info"    title="Information"  description="..." icon={<Info size={18} />} />
<KayoBrutalistAlert variant="success" title="Success"      description="..." icon={<CheckCircle2 size={18} />} />
<KayoBrutalistAlert variant="warning" title="Warning"      description="..." icon={<AlertTriangle size={18} />} />
<KayoBrutalistAlert variant="error"   title="Error"        description="..." icon={<XCircle size={18} />} />`,
            reactNative: `import { View, Text } from 'react-native'

function KayoAlert({ variant = 'info', title, description }) {
  const colors = {
    info:    { border: '#3b3d3f', accent: '#3b3d3f', bg: '#f9f9f9' },
    success: { border: '#166534', accent: '#166534', bg: '#f0fdf4' },
    warning: { border: '#92400e', accent: '#d97706', bg: '#fffbeb' },
    error:   { border: '#970103', accent: '#970103', bg: '#fff5f5' },
  }[variant]
  return (
    <View style={{ borderWidth: 2, borderColor: colors.border, borderRadius: 6,
      backgroundColor: colors.bg, flexDirection: 'row', overflow: 'hidden' }}>
      <View style={{ width: 4, backgroundColor: colors.accent }} />
      <View style={{ padding: 12, flex: 1 }}>
        {title && <Text style={{ fontSize: 14, fontWeight: '600', color: '#191b1f', fontFamily: 'DMSans-SemiBold' }}>{title}</Text>}
        {description && <Text style={{ fontSize: 13, color: '#3b3d3f', marginTop: 4, fontFamily: 'DMSans-Regular' }}>{description}</Text>}
      </View>
    </View>
  )
}`,
          },
        },
        {
          title: 'With Dismiss',
          description: 'Controlled dismiss — parent manages visibility via onDismiss callback.',
          preview: isKaayo ? (
            <div style={{ width: '100%', maxWidth: '480px' }}>
              {!dismissed ? (
                <KayoBrutalistAlert
                  variant="error"
                  title="Session expired"
                  description="Please log in again to continue."
                  icon={<XCircle size={18} />}
                  dismissible
                  onDismiss={() => setDismissed(true)}
                />
              ) : (
                <button
                  onClick={() => setDismissed(false)}
                  style={{
                    padding: '8px 16px', border: '2px solid #3b3d3f', borderRadius: '6px',
                    background: '#f4f4f4', cursor: 'pointer', fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: '13px', fontWeight: 500,
                  }}
                >
                  Reset demo
                </button>
              )}
            </div>
          ) : (
            <Alert variant="destructive" className="max-w-lg">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Something went wrong.</AlertDescription>
            </Alert>
          ),
          code: {
            react: `const [visible, setVisible] = useState(true)

{visible && (
  <KayoBrutalistAlert
    variant="error"
    title="Session expired"
    description="Please log in again to continue."
    icon={<XCircle size={18} />}
    dismissible
    onDismiss={() => setVisible(false)}
  />
)}`,
          },
        },
        {
          title: 'Title Only',
          description: 'Alert with no description — for short confirmations or status nudges.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '480px' }}>
              <KayoBrutalistAlert variant="info"    title="2 pending approvals" />
              <KayoBrutalistAlert variant="success" title="Changes saved successfully." />
            </div>
          ) : (
            <div className="space-y-3 w-full max-w-lg">
              <Alert><AlertTitle>2 pending approvals</AlertTitle></Alert>
            </div>
          ),
          code: {
            react: `<KayoBrutalistAlert variant="info" title="2 pending approvals" />
<KayoBrutalistAlert variant="success" title="Changes saved successfully." />`,
          },
        },
        {
          title: 'No Icon',
          description: 'Omit the icon prop when the text alone communicates the status.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '480px' }}>
              <KayoBrutalistAlert variant="warning" title="Maintenance window" description="The system will be unavailable on Sunday 2–4 AM." />
              <KayoBrutalistAlert variant="error"   title="Upload failed"      description="File size exceeds the 10 MB limit." />
            </div>
          ) : (
            <Alert className="max-w-lg">
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>No icon provided — text carries the message.</AlertDescription>
            </Alert>
          ),
          code: {
            react: `<KayoBrutalistAlert
  variant="warning"
  title="Maintenance window"
  description="The system will be unavailable on Sunday 2–4 AM."
/>`,
          },
        },
        {
          title: 'With Inline Action',
          description: 'Append a call-to-action link inside the description for contextual guidance.',
          preview: isKaayo ? (
            <div style={{ width: '100%', maxWidth: '480px' }}>
              <KayoBrutalistAlert
                variant="warning"
                title="Trial ending soon"
                icon={<AlertTriangle size={18} />}
                description={
                  <span>
                    Your trial expires in 3 days.{' '}
                    <a href="#" style={{ color: '#970103', fontWeight: 600, textDecoration: 'underline' }}>
                      Upgrade now →
                    </a>
                  </span>
                }
              />
            </div>
          ) : (
            <Alert className="max-w-lg">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Trial ending soon</AlertTitle>
              <AlertDescription>
                Your trial expires in 3 days.{' '}
                <a href="#" className="underline font-medium">Upgrade now →</a>
              </AlertDescription>
            </Alert>
          ),
          code: {
            react: `<KayoBrutalistAlert
  variant="warning"
  title="Trial ending soon"
  icon={<AlertTriangle size={18} />}
  description={
    <span>
      Your trial expires in 3 days.{' '}
      <a href="/upgrade" style={{ color: '#970103', fontWeight: 600, textDecoration: 'underline' }}>
        Upgrade now →
      </a>
    </span>
  }
/>`,
          },
        },
      ]}
    />
  )
}
