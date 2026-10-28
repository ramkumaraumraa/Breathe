/**
 * A ring of one coloured segment per item, laid clockwise from 12 o'clock with a gap between
 * segments - the arc maths behind the Home batches dial and the Attendance day-progress dial.
 * One item (or none) draws a full circle; `emptyColor` is the ring when there are no items.
 */
import React from 'react';
import type { ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

export function SegmentRing({
  size,
  stroke,
  maxGapDeg,
  colors,
  emptyColor,
  style,
}: {
  size: number;
  stroke: number;
  maxGapDeg: number;
  colors: string[];
  emptyColor: string;
  style?: ViewStyle;
}) {
  const r = (size - stroke) / 2;
  const c = size / 2;
  const n = colors.length;
  const slice = n > 0 ? 360 / n : 360;
  // Many items would leave hairline segments with a fixed gap - keep segments the larger part.
  const gap = n > 1 ? Math.min(maxGapDeg, slice * 0.4) : 0;
  const point = (deg: number) => {
    const rad = (deg * Math.PI) / 180;
    return `${c + r * Math.sin(rad)} ${c - r * Math.cos(rad)}`;
  };

  return (
    <Svg width={size} height={size} style={style}>
      {n <= 1 ? (
        <Circle cx={c} cy={c} r={r} stroke={colors[0] ?? emptyColor} strokeWidth={stroke} fill="none" />
      ) : (
        colors.map((color, i) => {
          const from = gap / 2 + i * slice;
          const to = from + slice - gap;
          return (
            <Path
              key={i}
              d={`M ${point(from)} A ${r} ${r} 0 ${to - from > 180 ? 1 : 0} 1 ${point(to)}`}
              stroke={color}
              strokeWidth={stroke}
              fill="none"
            />
          );
        })
      )}
    </Svg>
  );
}
