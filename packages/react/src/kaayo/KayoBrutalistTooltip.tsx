import { useState, useRef, useEffect, ReactNode, CSSProperties } from 'react'
import { createPortal } from 'react-dom'

export type KayoTooltipSide = 'top' | 'right' | 'bottom' | 'left'

export interface KayoBrutalistTooltipProps {
  content: string | ReactNode
  side?: KayoTooltipSide
  delay?: number
  children: ReactNode
}

const TRANSFORM: Record<KayoTooltipSide, string> = {
  top:    'translate(-50%, -100%)',
  bottom: 'translate(-50%, 0)',
  left:   'translate(-100%, -50%)',
  right:  'translate(0, -50%)',
}

const OFFSET = 6

export function KayoBrutalistTooltip({
  content,
  side = 'top',
  delay = 300,
  children,
}: KayoBrutalistTooltipProps) {
  const [visible, setVisible] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function computePos(): { top: number; left: number } | null {
    if (!triggerRef.current) return null
    const r = triggerRef.current.getBoundingClientRect()
    switch (side) {
      case 'top':    return { top: r.top - OFFSET,        left: r.left + r.width / 2 }
      case 'bottom': return { top: r.bottom + OFFSET,     left: r.left + r.width / 2 }
      case 'left':   return { top: r.top + r.height / 2,  left: r.left - OFFSET }
      case 'right':  return { top: r.top + r.height / 2,  left: r.right + OFFSET }
      default:       return { top: r.top - OFFSET,        left: r.left + r.width / 2 }
    }
  }

  function handleEnter() {
    timerRef.current = setTimeout(() => {
      const p = computePos()
      if (p) { setPos(p); setVisible(true) }
    }, delay)
  }

  function handleLeave() {
    if (timerRef.current) clearTimeout(timerRef.current)
    setVisible(false)
  }

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  const tooltipStyle: CSSProperties = {
    position: 'fixed',
    top: pos.top,
    left: pos.left,
    transform: TRANSFORM[side],
    backgroundColor: '#191b1f',
    color: '#ffffff',
    border: '2px solid var(--kayo-color-border, #3b3d3f)',
    borderRadius: 6,
    boxShadow: '2px 2px 0 #191b1f',
    padding: '4px 8px',
    fontSize: 12,
    fontFamily: "'DM Sans', system-ui, sans-serif",
    fontWeight: 400,
    lineHeight: '1.4',
    whiteSpace: 'pre-wrap',
    maxWidth: 240,
    zIndex: 9999,
    pointerEvents: 'none',
  }

  return (
    <>
      <div
        ref={triggerRef}
        style={{ display: 'inline-block' }}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onFocus={handleEnter}
        onBlur={handleLeave}
      >
        {children}
      </div>
      {visible && createPortal(<div style={tooltipStyle}>{content}</div>, document.body)}
    </>
  )
}
