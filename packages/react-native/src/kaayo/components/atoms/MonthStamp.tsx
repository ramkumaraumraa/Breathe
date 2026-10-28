/**
 * Month stamp (Figma "Payments v2 / Month stamp", 74473:1938): double ring, month + caption.
 * Closed = Positive, open = Primary. Callers tilt it ±4° (sticker rule).
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { kayoColors } from '../../foundations/tokens';
import { typography } from '../../foundations/typography';

export function MonthStamp({ label, caption, state, size = 64, tilt = 0 }: {
  /** e.g. "OCT" */
  label: string;
  caption: string;
  state: 'closed' | 'open';
  size?: number;
  tilt?: number;
}) {
  const ink = state === 'closed' ? kayoColors.positive[700] : kayoColors.primary[500];
  return (
    <View
      style={[
        styles.stamp,
        { width: size, height: size, borderRadius: size / 2, borderColor: ink, transform: [{ rotate: `${tilt}deg` }] },
        { backgroundColor: state === 'closed' ? kayoColors.positive[25] : kayoColors.neutral[25] },
      ]}
      accessibilityLabel={`${label} ${caption}`}
    >
      <View style={[styles.inner, { borderRadius: size / 2, borderColor: ink }]} />
      <Text style={[typography.label_sm, { color: ink }]}>{label}</Text>
      <Text style={[typography.utility_badge_tiny, { color: ink }]}>{caption}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  stamp: { alignItems: 'center', justifyContent: 'center', borderWidth: 2 },
  inner: { position: 'absolute', top: 3, left: 3, right: 3, bottom: 3, borderWidth: 1, borderStyle: 'dashed' },
});
