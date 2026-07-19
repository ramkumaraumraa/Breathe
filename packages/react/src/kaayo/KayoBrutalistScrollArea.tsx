import { useEffect, ReactNode, CSSProperties } from 'react'

const STYLE_ID = 'kayo-scrollarea-styles'

export type KayoScrollOrientation = 'vertical' | 'horizontal' | 'both'

export interface KayoBrutalistScrollAreaProps {
  height?: number | string
  width?: number | string
  orientation?: KayoScrollOrientation
  children: ReactNode
  style?: CSSProperties
}

export function KayoBrutalistScrollArea({
  height = 300,
  width = '100%',
  orientation = 'vertical',
  children,
  style,
}: KayoBrutalistScrollAreaProps) {
  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return
    const s = document.createElement('style')
    s.id = STYLE_ID
    s.textContent = `
      .kayo-scroll-inner::-webkit-scrollbar { width: 8px; height: 8px; }
      .kayo-scroll-inner::-webkit-scrollbar-track { background: var(--kayo-color-muted, #f4f4f4); }
      .kayo-scroll-inner::-webkit-scrollbar-thumb { background: var(--kayo-color-border, #3b3d3f); border-radius: 0; }
      .kayo-scroll-inner::-webkit-scrollbar-thumb:hover { background: #191b1f; }
      .kayo-scroll-inner { scrollbar-width: thin; scrollbar-color: var(--kayo-color-border, #3b3d3f) var(--kayo-color-muted, #f4f4f4); }
    `
    document.head.appendChild(s)
  }, [])

  const overflowStyle: CSSProperties =
    orientation === 'vertical'
      ? { overflowY: 'auto', overflowX: 'hidden' }
      : orientation === 'horizontal'
      ? { overflowX: 'auto', overflowY: 'hidden' }
      : { overflow: 'auto' }

  return (
    <div
      style={{
        border: '2px solid var(--kayo-color-border, #3b3d3f)',
        borderRadius: 6,
        overflow: 'hidden',
        width,
        height,
        fontFamily: "'DM Sans', system-ui, sans-serif",
        ...style,
      }}
    >
      <div
        className="kayo-scroll-inner"
        style={{
          width: '100%',
          height: '100%',
          ...overflowStyle,
        }}
      >
        {children}
      </div>
    </div>
  )
}
