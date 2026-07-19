import { useState } from 'react'
import { AlertTriangle, X } from 'lucide-react'
import { KayoBrutalistButton } from './KayoBrutalistButton'

export interface KayoBrutalistDeleteGuardSheetProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  targetName: string
  loading?: boolean
}

export function KayoBrutalistDeleteGuardSheet({
  isOpen,
  onClose,
  onConfirm,
  targetName,
  loading = false,
}: KayoBrutalistDeleteGuardSheetProps) {
  const [typedName, setTypedName] = useState('')

  if (!isOpen) return null

  const isConfirmed = typedName.trim().toLowerCase() === targetName.trim().toLowerCase()

  return (
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
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
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
          onClick={onClose}
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#dc2626', marginBottom: '12px' }}>
          <AlertTriangle size={24} strokeWidth={2.5} />
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#14161a' }}>
            Delete Confirmation
          </h3>
        </div>

        <p style={{ fontSize: '14px', color: '#454547', lineHeight: 1.5, margin: '0 0 16px 0' }}>
          This action cannot be undone. To permanently delete <strong>{targetName}</strong>, type its name below:
        </p>

        <input
          type="text"
          value={typedName}
          onChange={(e) => setTypedName(e.target.value)}
          placeholder={`Type "${targetName}" to confirm`}
          style={{
            width: '100%',
            padding: '10px 12px',
            borderRadius: '6px',
            border: '2px solid var(--kayo-color-border, #191b1f)',
            fontSize: '14px',
            marginBottom: '20px',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <KayoBrutalistButton variant="secondary" label="Cancel" onClick={onClose} />
          <KayoBrutalistButton
            variant="destructive"
            label="Delete Permanently"
            disabled={!isConfirmed}
            loading={loading}
            onClick={onConfirm}
          />
        </div>
      </div>
    </div>
  )
}
