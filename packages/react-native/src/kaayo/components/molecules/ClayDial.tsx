/**
 * ClayDial (Figma 74712:92): a round Secondary/25 clay dial around a SegmentRing, value over a caption.
 * Inset = Attendance day progress (76, Kaayo/Clay/Inset SM, 64 ring, H4 value, "DONE");
 * Raised = Home batches (92, Kaayo/Clay/Raised MD, 80 ring, H2 Primary/500 count, "BATCHES").
 */
import React from 'react';
import { StyleSheet, Text, View, type ViewProps } from 'react-native';

import { kayoClay, kayoColors as c, kayoRadius } from '../../foundations/tokens';
import { typography } from '../../foundations/typography';
import { SegmentRing } from '../atoms/SegmentRing';

const DIALS = {
  inset: {
    dial: 76,
    ring: 64,
    stroke: 64 * 0.12, // inner radius 76% of outer
    maxGapDeg: 7,
    empty: c.secondary[200],
    clay: kayoClay.inset('sm'),
    value: { ...typography.heading_h4, color: c.neutral[950] },
    caption: { ...typography.utility_badge_tiny, color: c.neutral[600] },
  },
  raised: {
    dial: 92,
    ring: 80,
    stroke: 5.6,
    maxGapDeg: 16,
    empty: c.secondary[100],
    clay: kayoClay.raised('md'),
    value: { ...typography.heading_h2, color: c.primary[500] },
    caption: { ...typography.utility_badge_tiny, letterSpacing: 0, color: c.neutral[800] },
  },
} as const;

export interface ClayDialProps extends Omit<ViewProps, 'children'> {
  variant: 'inset' | 'raised';
  /** One ring segment per item, in order clockwise from 12 o'clock. */
  colors: string[];
  /** Ring colour with no items; defaults to the variant's (Secondary/200 inset, Secondary/100 raised). */
  emptyColor?: string;
  value: string | number;
  /** Uppercase caption under the value ("DONE", "BATCHES"). */
  caption: string;
}

export function ClayDial({ variant, colors, emptyColor, value, caption, style, ...rest }: ClayDialProps) {
  const d = DIALS[variant];
  const inset = (d.dial - d.ring) / 2;
  return (
    <View
      style={[styles.dial, { width: d.dial, height: d.dial }, d.clay, style]}
      accessible={rest.accessibilityLabel ? true : undefined}
      {...rest}
    >
      <SegmentRing
        size={d.ring}
        stroke={d.stroke}
        maxGapDeg={d.maxGapDeg}
        colors={colors}
        emptyColor={emptyColor ?? d.empty}
        style={{ position: 'absolute', top: inset, left: inset }}
      />
      <Text style={d.value}>{value}</Text>
      <Text style={d.caption}>{caption}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  dial: { borderRadius: kayoRadius.pill, alignItems: 'center', justifyContent: 'center', backgroundColor: c.secondary[25] },
});
