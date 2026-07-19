import { useEffect } from 'react'

const STYLE_ID = 'kayo-skeleton-styles'
const CSS = `
@keyframes kayo-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
.kayo-skeleton {
  background-color: #e5e7eb;
  border: 1px solid #d1d5db;
  border-radius: 2px;
  animation: kayo-pulse 1.6s ease-in-out infinite;
  display: block;
}
.kayo-skeleton-round {
  border-radius: 50%;
}
`

export interface KayoBrutalistSkeletonProps {
  width?: number | string
  height?: number | string
  round?: boolean
  className?: string
  style?: React.CSSProperties
}

export function KayoBrutalistSkeleton({
  width,
  height,
  round = false,
  className = '',
  style,
}: KayoBrutalistSkeletonProps) {
  useEffect(() => {
    if (!document.getElementById(STYLE_ID)) {
      const el = document.createElement('style')
      el.id = STYLE_ID
      el.textContent = CSS
      document.head.appendChild(el)
    }
  }, [])

  return (
    <span
      className={`kayo-skeleton${round ? ' kayo-skeleton-round' : ''} ${className}`.trim()}
      style={{ width, height, ...style }}
    />
  )
}
