import { useState } from 'react'
import { MessageSquare, Send, X } from 'lucide-react'
import { KayoBrutalistButton } from './KayoBrutalistButton'

export interface KayoBrutalistWhatsAppControlsProps {
  recipientName: string
  phoneNumber: string
  defaultMessage?: string
  onSend?: (message: string) => void
}

export function KayoBrutalistWhatsAppControls({
  recipientName,
  phoneNumber,
  defaultMessage = '',
  onSend,
}: KayoBrutalistWhatsAppControlsProps) {
  const [message, setMessage] = useState(defaultMessage)
  const [isOpen, setIsOpen] = useState(false)

  const handleSend = () => {
    if (onSend) onSend(message)
    setIsOpen(false)
  }

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <KayoBrutalistButton
        variant="primary"
        label={`Send WhatsApp to ${recipientName}`}
        iconLeft={<MessageSquare size={16} />}
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '440px',
              backgroundColor: '#ffffff',
              borderRadius: 'var(--kayo-radius-default, 8px)',
              border: '2px solid var(--kayo-color-border, #191b1f)',
              boxShadow: 'var(--kayo-shadow-xl, 8px 8px 0 #191b1f)',
              padding: '24px',
              position: 'relative',
            }}
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#747476',
              }}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#126932', marginBottom: '16px' }}>
              <MessageSquare size={22} strokeWidth={2.5} />
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#14161a' }}>
                WhatsApp Notification
              </h3>
            </div>

            <p style={{ fontSize: '13px', color: '#747476', margin: '0 0 12px 0' }}>
              To: <strong>{recipientName}</strong> ({phoneNumber})
            </p>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your WhatsApp message..."
              rows={4}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '6px',
                border: '2px solid var(--kayo-color-border, #191b1f)',
                fontSize: '14px',
                fontFamily: 'inherit',
                marginBottom: '20px',
                outline: 'none',
                resize: 'vertical',
                boxSizing: 'border-box',
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <KayoBrutalistButton variant="secondary" label="Cancel" onClick={() => setIsOpen(false)} />
              <KayoBrutalistButton
                variant="primary"
                label="Send Now"
                iconRight={<Send size={16} />}
                onClick={handleSend}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
