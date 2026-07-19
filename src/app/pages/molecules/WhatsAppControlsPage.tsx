import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { KayoBrutalistWhatsAppControls } from '@aumraa/breathe-react/kaayo'

export function WhatsAppControlsPage() {
  return (
    <ComponentPageLayout
      title="WhatsApp Controls"
      description="WhatsApp preference picker and message send modal for sending instant tuition fee reminders."
      level="Molecule"
      status="Stable"
      implemented={['kaayo']}
      sections={[
        {
          title: 'WhatsApp Reminder Trigger',
          description: 'Opens pre-populated messaging dialog for parents and students.',
          preview: (
            <KayoBrutalistWhatsAppControls
              recipientName="Rajesh Sundaram"
              phoneNumber="+91 98765 43210"
              defaultMessage="Dear Rajesh, this is a friendly reminder that the tuition fee for March 2026 is due tomorrow."
              onSend={(msg) => alert(`WhatsApp message sent:\n${msg}`)}
            />
          ),
          code: {
            react: `import { KayoBrutalistWhatsAppControls } from '@aumraa/breathe-react/kaayo'

<KayoBrutalistWhatsAppControls
  recipientName="Rajesh Sundaram"
  phoneNumber="+91 98765 43210"
  defaultMessage="Reminder text..."
  onSend={handleSend}
/>`,
            reactNative: `import { WhatsAppSendModal } from '@kaayo/components/molecules/WhatsAppSendModal'

<WhatsAppSendModal
  visible={visible}
  recipientName="Rajesh Sundaram"
  onSend={handleSend}
/>`,
          },
        },
      ]}
    />
  )
}
