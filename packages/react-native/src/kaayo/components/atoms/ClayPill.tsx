/**
 * ClayPill (Figma Buttons 74778:2356): pill action inside a card - "Remind all {n}" with MessageCircle,
 * "Review & send" without. Secondary/500 fill, 1.5px Secondary/900 edge, 2/2 hard Secondary/975 shadow,
 * Label/SM Secondary/975. Pressed: shadow off, translate +2/+2.
 */
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';

import { kayoColors as c, kayoRadius, kayoShadow, kayoShadowTinted } from '../../foundations/tokens';
import { typography } from '../../foundations/typography';

export interface ClayPillProps {
  label: string;
  onPress: () => void;
  /** Leading icon, drawn 14 in Secondary/975. */
  icon?: LucideIcon;
  testID?: string;
  accessibilityLabel?: string;
}

export function ClayPill({ label, onPress, icon: Icon, testID, accessibilityLabel }: ClayPillProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.pill, pressed && styles.pressed]}
      hitSlop={6}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      testID={testID}
    >
      {Icon ? <Icon size={14} color={c.secondary[975]} strokeWidth={2} /> : null}
      <Text style={[typography.label_sm, { color: c.secondary[975] }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: kayoRadius.pill,
    borderWidth: 1.5,
    borderColor: c.secondary[900],
    backgroundColor: c.secondary[500],
    ...kayoShadowTinted(c.secondary[975]),
  },
  pressed: { ...kayoShadow.none, transform: [{ translateX: 2 }, { translateY: 2 }] },
});
