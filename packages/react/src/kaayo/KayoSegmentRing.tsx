import React from 'react'

export interface KayoSegmentRingProps {
  size: number
  stroke: number
  maxGapDeg: number
  colors: string[]
  emptyColor: string
  className?: string
  style?: React.CSSProperties
}

/**
 * A ring of one coloured segment per item, laid clockwise from 12 o'clock with a gap between segments.
 */
export function KayoSegmentRing({
  size,
  stroke,
  maxGapDeg,
  colors,
  emptyColor,
  className,
  style,
}: KayoSegmentRingProps) {
  const r = (size - stroke) / 2
  const c = size / 2
  const n = colors.length
  const slice = n > 0 ? 360 / n : 360
  // Many items would leave hairline segments with a fixed gap - keep segments the larger part.
  const gap = n > 1 ? Math.min(maxGapDeg, slice * 0.4) : 0
  const point = (deg: number) => {
    const rad = (deg * Math.PI) / 180
    return `${c + r * Math.sin(rad)} ${c - r * Math.cos(rad)}`
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      style={{ display: 'block', overflow: 'visible', ...style }}
    >
      {n <= 1 ? (
        <circle
          cx={c}
          cy={c}
          r={r}
          stroke={colors[0] ?? emptyColor}
          strokeWidth={stroke}
          fill="none"
        />
      ) : (
        colors.map((color, i) => {
          const from = gap / 2 + i * slice
          const to = from + slice - gap
          return (
            <path
              key={i}
              d={`M ${point(from)} A ${r} ${r} 0 ${to - from > 180 ? 1 : 0} 1 ${point(to)}`}
              stroke={color}
              strokeWidth={stroke}
              strokeLinecap="round"
              fill="none"
            />
          )
        })
      )}
    </svg>
  )
}

// Alias matching React Native naming
export const SegmentRing = KayoSegmentRing

