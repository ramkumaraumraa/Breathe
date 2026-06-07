import { useState, useRef, useEffect, ReactNode } from 'react'

export interface KayoBrutalistCarouselProps {
  items: ReactNode[]
  slidesVisible?: 1 | 2 | 3
  gap?: number
  showArrows?: boolean
  showDots?: boolean
  autoPlay?: boolean
  interval?: number
  loop?: boolean
}

const STYLE_ID = 'kayo-carousel-styles'

export function KayoBrutalistCarousel({
  items,
  slidesVisible = 1,
  gap = 16,
  showArrows = true,
  showDots = true,
  autoPlay = false,
  interval = 3000,
  loop = true,
}: KayoBrutalistCarouselProps) {
  const [current, setCurrent] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const count = items.length
  const n = slidesVisible
  const maxIndex = loop ? count - 1 : count - n

  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return
    const s = document.createElement('style')
    s.id = STYLE_ID
    s.textContent = `.kayo-carousel-dot { transition: background 150ms, border-color 150ms; }`
    document.head.appendChild(s)
  }, [])

  function goTo(idx: number) {
    if (loop) {
      setCurrent(((idx % count) + count) % count)
    } else {
      setCurrent(Math.max(0, Math.min(idx, maxIndex)))
    }
  }

  function prev() { goTo(current - 1) }
  function next() { goTo(current + 1) }

  useEffect(() => {
    if (!autoPlay) return
    intervalRef.current = setInterval(() => {
      setCurrent(c =>
        loop !== false ? (c + 1) % count : Math.min(c + 1, maxIndex)
      )
    }, interval)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [autoPlay, interval, current, loop, count, maxIndex])

  const slideWidthPercent = 100 / n
  const trackTranslate = `calc(-${current * slideWidthPercent}% - ${current * gap}px)`

  const atStart = !loop && current === 0
  const atEnd = !loop && current >= maxIndex

  function applyPressDown(e: React.MouseEvent<HTMLButtonElement>) {
    const btn = e.currentTarget
    btn.style.transform = "translateY(-50%) translate(2px, 2px)"
    btn.style.boxShadow = "none"
  }

  function applyPressUp(e: React.MouseEvent<HTMLButtonElement>, side: 'left' | 'right') {
    const btn = e.currentTarget
    btn.style.transform = "translateY(-50%)"
    btn.style.boxShadow = "2px 2px 0 #191b1f"
  }

  const baseArrowStyle: React.CSSProperties = {
    width: '40px',
    height: '40px',
    border: '2px solid #3b3d3f',
    borderRadius: '6px',
    backgroundColor: '#fff',
    boxShadow: '2px 2px 0 #191b1f',
    cursor: 'pointer',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'DM Sans', system-ui, sans-serif",
    fontSize: '18px',
    fontWeight: 700,
    color: '#3b3d3f',
    padding: 0,
    lineHeight: 1,
    transition: 'opacity 150ms',
    zIndex: 2,
  }

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {/* Outer container */}
      <div style={{ position: 'relative' }}>
        {/* Prev arrow */}
        {showArrows && (
          <button
            aria-label="Previous slide"
            disabled={atStart}
            onClick={prev}
            onMouseDown={applyPressDown}
            onMouseUp={e => applyPressUp(e, 'left')}
            onMouseLeave={e => applyPressUp(e, 'left')}
            style={{
              ...baseArrowStyle,
              left: '-20px',
              opacity: atStart ? 0.35 : 1,
            }}
          >
            ‹
          </button>
        )}

        {/* Viewport */}
        <div style={{ overflow: 'hidden' }}>
          {/* Track */}
          <div
            style={{
              display: 'flex',
              gap: `${gap}px`,
              transform: `translateX(${trackTranslate})`,
              transition: 'transform 250ms ease-out',
            }}
          >
            {items.map((item, i) => (
              <div
                key={i}
                style={{
                  flex: `0 0 calc((100% - ${gap}px * ${n - 1}) / ${n})`,
                  minWidth: 0,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Next arrow */}
        {showArrows && (
          <button
            aria-label="Next slide"
            disabled={atEnd}
            onClick={next}
            onMouseDown={applyPressDown}
            onMouseUp={e => applyPressUp(e, 'right')}
            onMouseLeave={e => applyPressUp(e, 'right')}
            style={{
              ...baseArrowStyle,
              right: '-20px',
              left: 'unset' as never,
              opacity: atEnd ? 0.35 : 1,
            }}
          >
            ›
          </button>
        )}
      </div>

      {/* Dots */}
      {showDots && count > 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '6px',
            marginTop: '16px',
          }}
        >
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              className="kayo-carousel-dot"
              onClick={() => goTo(i)}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                border: `2px solid ${i === current ? '#970103' : '#3b3d3f'}`,
                backgroundColor: i === current ? '#970103' : '#fff',
                cursor: 'pointer',
                padding: 0,
                display: 'block',
                flexShrink: 0,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
