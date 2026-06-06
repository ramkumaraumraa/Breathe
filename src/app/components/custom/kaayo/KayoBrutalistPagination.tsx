import { useState, useEffect, CSSProperties } from 'react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

const STYLE_ID = 'kayo-pagination-styles'

export interface KayoBrutalistPaginationProps {
  total: number
  current: number
  onChange: (page: number) => void
  siblings?: number
  showPrevNext?: boolean
  showFirstLast?: boolean
}

function getPageRange(
  total: number,
  current: number,
  siblings: number
): (number | 'ellipsis-left' | 'ellipsis-right')[] {
  if (total <= siblings * 2 + 5) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const leftSibling = Math.max(current - siblings, 1)
  const rightSibling = Math.min(current + siblings, total)
  const showLeftEllipsis = leftSibling > 2
  const showRightEllipsis = rightSibling < total - 1

  if (!showLeftEllipsis && showRightEllipsis) {
    const left = Array.from({ length: 3 + 2 * siblings }, (_, i) => i + 1)
    return [...left, 'ellipsis-right', total]
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const right = Array.from({ length: 3 + 2 * siblings }, (_, i) => total - (2 + 2 * siblings) + i)
    return [1, 'ellipsis-left', ...right]
  }

  const middle = Array.from(
    { length: rightSibling - leftSibling + 1 },
    (_, i) => leftSibling + i
  )
  return [1, 'ellipsis-left', ...middle, 'ellipsis-right', total]
}

export function KayoBrutalistPagination({
  total,
  current,
  onChange,
  siblings = 1,
  showPrevNext = true,
  showFirstLast = false,
}: KayoBrutalistPaginationProps) {
  const [pressedPage, setPressedPage] = useState<number | string | null>(null)

  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return
    const s = document.createElement('style')
    s.id = STYLE_ID
    s.textContent = `.kayo-page-btn { transition: transform 80ms, box-shadow 80ms; }`
    document.head.appendChild(s)
  }, [])

  const pages = getPageRange(total, current, siblings)

  function pageButtonStyle(page: number): CSSProperties {
    const isActive = page === current
    const isPressed = pressedPage === page
    return {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 36,
      height: 36,
      fontSize: 13,
      fontWeight: isActive ? 700 : 400,
      fontFamily: "'DM Sans', system-ui, sans-serif",
      border: '2px solid var(--kayo-color-border, #3b3d3f)',
      borderRadius: 6,
      cursor: 'pointer',
      background: isActive ? 'var(--kayo-color-primary, #970103)' : '#ffffff',
      color: isActive ? '#ffffff' : 'var(--kayo-color-foreground, #3b3d3f)',
      boxShadow: isPressed ? 'none' : '2px 2px 0 #191b1f',
      transform: isPressed ? 'translate(2px, 2px)' : 'none',
      userSelect: 'none',
      outline: 'none',
    }
  }

  function navButtonStyle(disabled: boolean, isPressed: boolean): CSSProperties {
    return {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
      height: 36,
      paddingLeft: 10,
      paddingRight: 10,
      fontSize: 13,
      fontFamily: "'DM Sans', system-ui, sans-serif",
      border: `2px solid ${disabled ? '#d1d5db' : 'var(--kayo-color-border, #3b3d3f)'}`,
      borderRadius: 6,
      cursor: disabled ? 'not-allowed' : 'pointer',
      background: '#ffffff',
      color: disabled ? '#a8a8aa' : 'var(--kayo-color-foreground, #3b3d3f)',
      boxShadow: disabled || isPressed ? 'none' : '2px 2px 0 #191b1f',
      transform: isPressed ? 'translate(2px, 2px)' : 'none',
      opacity: disabled ? 0.5 : 1,
      userSelect: 'none',
      outline: 'none',
    }
  }

  return (
    <nav aria-label="pagination" style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
      {showFirstLast && (
        <button
          type="button"
          className="kayo-page-btn"
          disabled={current === 1}
          style={navButtonStyle(current === 1, pressedPage === 'first')}
          onMouseDown={() => current !== 1 && setPressedPage('first')}
          onMouseUp={() => setPressedPage(null)}
          onMouseLeave={() => setPressedPage(null)}
          onClick={() => current !== 1 && onChange(1)}
          aria-label="First page"
        >
          <ChevronsLeft size={14} />
        </button>
      )}

      {showPrevNext && (
        <button
          type="button"
          className="kayo-page-btn"
          disabled={current === 1}
          style={navButtonStyle(current === 1, pressedPage === 'prev')}
          onMouseDown={() => current !== 1 && setPressedPage('prev')}
          onMouseUp={() => setPressedPage(null)}
          onMouseLeave={() => setPressedPage(null)}
          onClick={() => current !== 1 && onChange(current - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft size={14} />
          <span>Prev</span>
        </button>
      )}

      {pages.map((page, i) => {
        if (page === 'ellipsis-left' || page === 'ellipsis-right') {
          return (
            <span
              key={`${page}-${i}`}
              style={{
                width: 36,
                height: 36,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                color: '#a8a8aa',
                fontFamily: "'DM Sans', system-ui, sans-serif",
              }}
            >
              …
            </span>
          )
        }
        return (
          <button
            key={page}
            type="button"
            className="kayo-page-btn"
            style={pageButtonStyle(page as number)}
            onMouseDown={() => setPressedPage(page)}
            onMouseUp={() => setPressedPage(null)}
            onMouseLeave={() => setPressedPage(null)}
            onClick={() => onChange(page as number)}
            aria-label={`Page ${page}`}
            aria-current={page === current ? 'page' : undefined}
          >
            {page}
          </button>
        )
      })}

      {showPrevNext && (
        <button
          type="button"
          className="kayo-page-btn"
          disabled={current === total}
          style={navButtonStyle(current === total, pressedPage === 'next')}
          onMouseDown={() => current !== total && setPressedPage('next')}
          onMouseUp={() => setPressedPage(null)}
          onMouseLeave={() => setPressedPage(null)}
          onClick={() => current !== total && onChange(current + 1)}
          aria-label="Next page"
        >
          <span>Next</span>
          <ChevronRight size={14} />
        </button>
      )}

      {showFirstLast && (
        <button
          type="button"
          className="kayo-page-btn"
          disabled={current === total}
          style={navButtonStyle(current === total, pressedPage === 'last')}
          onMouseDown={() => current !== total && setPressedPage('last')}
          onMouseUp={() => setPressedPage(null)}
          onMouseLeave={() => setPressedPage(null)}
          onClick={() => current !== total && onChange(total)}
          aria-label="Last page"
        >
          <ChevronsRight size={14} />
        </button>
      )}
    </nav>
  )
}
