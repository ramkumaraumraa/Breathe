import { useState } from 'react'

export type KayoStudentAvatarSizePx = 32 | 48 | 96 | 240

export interface KayoBrutalistStudentAvatarProps {
  name: string
  photoUrl?: string | null
  size?: KayoStudentAvatarSizePx
  onPress?: () => void
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 0 || !parts[0]) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export function KayoBrutalistStudentAvatar({
  name,
  photoUrl,
  size = 48,
  onPress,
}: KayoBrutalistStudentAvatarProps) {
  const [imgError, setImgError] = useState(false)
  const initials = getInitials(name)
  const showImg = Boolean(photoUrl) && !imgError

  const fontSize = size === 32 ? 12 : size === 48 ? 18 : size === 96 ? 36 : 80

  const containerStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: '50%',
    border: '2px solid var(--kayo-color-border, #191b1f)',
    boxShadow: 'var(--kayo-shadow-sm, 2px 2px 0 #191b1f)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    overflow: 'hidden',
    cursor: onPress ? 'pointer' : 'default',
    fontFamily: "'DM Sans', system-ui, sans-serif",
    transition: 'opacity 0.15s, transform 0.15s',
    userSelect: 'none',
  }

  const content = showImg ? (
    <img
      src={photoUrl!}
      alt={name}
      onError={() => setImgError(true)}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  ) : (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'var(--kayo-color-primary, #970103)',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize,
        fontWeight: 700,
        letterSpacing: '0.02em',
      }}
    >
      {initials}
    </div>
  )

  if (!onPress) {
    return <div style={containerStyle}>{content}</div>
  }

  return (
    <button
      type="button"
      onClick={onPress}
      style={{
        ...containerStyle,
        padding: 0,
        background: 'none',
        outline: 'none',
      }}
    >
      {content}
    </button>
  )
}
