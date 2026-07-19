import { X } from 'lucide-react'

export interface KayoBrutalistPhotoViewerProps {
  isOpen: boolean
  src: string
  alt?: string
  onClose: () => void
}

export function KayoBrutalistPhotoViewer({
  isOpen,
  src,
  alt = 'Photo view',
  onClose,
}: KayoBrutalistPhotoViewerProps) {
  if (!isOpen) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 110,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        cursor: 'zoom-out',
      }}
    >
      <button
        type="button"
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          background: '#ffffff',
          border: '2px solid #191b1f',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '2px 2px 0 #191b1f',
        }}
      >
        <X size={20} color="#191b1f" />
      </button>

      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '90vw',
          maxHeight: '85vh',
          objectFit: 'contain',
          borderRadius: '8px',
          border: '3px solid #ffffff',
          boxShadow: '8px 8px 0 rgba(0,0,0,0.5)',
          cursor: 'default',
        }}
      />
    </div>
  )
}
