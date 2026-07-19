import { useState, useRef, useEffect, ReactNode, CSSProperties } from 'react'
import { createPortal } from 'react-dom'

export type KayoHoverCardSide = 'top' | 'bottom'

export interface KayoBrutalistHoverCardProps {
  trigger: ReactNode
  children: ReactNode
  side?: KayoHoverCardSide
}

const OFFSET = 8

export function KayoBrutalistHoverCard({
  trigger,
  children,
  side = 'bottom',
}: KayoBrutalistHoverCardProps) {
  const [visible, setVisible] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function computePos(): { top: number; left: number } | null {
    if (!triggerRef.current) return null
    const r = triggerRef.current.getBoundingClientRect()
    return side === 'bottom'
      ? { top: r.bottom + OFFSET, left: r.left }
      : { top: r.top - OFFSET, left: r.left }
  }

  function openCard() {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    openTimerRef.current = setTimeout(() => {
      const p = computePos()
      if (p) { setPos(p); setVisible(true) }
    }, 300)
  }

  function closeCard() {
    if (openTimerRef.current) clearTimeout(openTimerRef.current)
    closeTimerRef.current = setTimeout(() => setVisible(false), 150)
  }

  function keepOpen() {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
  }

  useEffect(() => () => {
    if (openTimerRef.current) clearTimeout(openTimerRef.current)
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
  }, [])

  const cardStyle: CSSProperties = {
    position: 'fixed',
    top: pos.top,
    left: pos.left,
    transform: side === 'top' ? 'translateY(-100%)' : 'none',
    minWidth: 280,
    maxWidth: 360,
    backgroundColor: '#ffffff',
    border: '2px solid var(--kayo-color-border, #3b3d3f)',
    borderRadius: 6,
    boxShadow: '4px 4px 0 #191b1f',
    padding: 16,
    zIndex: 9999,
    fontFamily: "'DM Sans', system-ui, sans-serif",
  }

  return (
    <>
      <div
        ref={triggerRef}
        style={{ display: 'inline-block' }}
        onMouseEnter={openCard}
        onMouseLeave={closeCard}
      >
        {trigger}
      </div>
      {visible && createPortal(
        <div style={cardStyle} onMouseEnter={keepOpen} onMouseLeave={closeCard}>
          {children}
        </div>,
        document.body
      )}
    </>
  )
}
