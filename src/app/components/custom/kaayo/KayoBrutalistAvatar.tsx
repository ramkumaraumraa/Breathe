import { useState } from 'react'

export type KayoAvatarSize = 'sm' | 'md' | 'lg'

export interface KayoBrutalistAvatarProps {
  src?: string
  alt?: string
  fallback?: string
  size?: KayoAvatarSize
}

const SIZE_PX: Record<KayoAvatarSize, number> = { sm: 32, md: 40, lg: 48 }
const FONT_PX: Record<KayoAvatarSize, number> = { sm: 12, md: 14, lg: 16 }

export function KayoBrutalistAvatar({
  src,
  alt = '',
  fallback = '?',
  size = 'md',
}: KayoBrutalistAvatarProps) {
  const [imgError, setImgError] = useState(false)
  const px = SIZE_PX[size]
  const font = FONT_PX[size]
  const showImg = Boolean(src) && !imgError

  const base: React.CSSProperties = {
    width: px,
    height: px,
    borderRadius: '50%',
    border: '2px solid var(--kayo-color-border, #3b3d3f)',
    boxShadow: '2px 2px 0 #191b1f',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    overflow: 'hidden',
    fontFamily: "'DM Sans', system-ui, sans-serif",
  }

  if (showImg) {
    return (
      <div style={base}>
        <img
          src={src}
          alt={alt}
          onError={() => setImgError(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    )
  }

  return (
    <div
      style={{
        ...base,
        backgroundColor: 'var(--kayo-color-primary, #970103)',
        color: '#ffffff',
        fontSize: font,
        fontWeight: 700,
        letterSpacing: '0.02em',
      }}
    >
      {fallback.slice(0, 2).toUpperCase()}
    </div>
  )
}
