/**
 * EnrollmentTag (Figma 74770:1790): rectangular outlined "BRANCH - CLASS" tag with a MapPin. Tertiary on
 * student cards (Students list / StudentCard), Neutral on summaries (Student added). Label truncates.
 */
import React from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { MapPin } from 'lucide-react-native';

import { kayoBorder, kayoColors, kayoRadius } from '../../foundations/tokens';
import { typography } from '../../foundations/typography';

const c = kayoColors;
const TONES = {
  tertiary: { bg: c.tertiary[50], border: c.tertiary[300], pin: c.tertiary[600], ink: c.tertiary[700], pinSize: 11, px: 8, py: 2 },
  neutral: { bg: c.neutral[75], border: c.neutral[500], pin: c.neutral[800], ink: c.neutral[800], pinSize: 10, px: 6, py: 3 },
} as const;

export interface EnrollmentTagProps {
  label: string;
  tone?: keyof typeof TONES;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export function EnrollmentTag({ label, tone = 'tertiary', style, testID }: EnrollmentTagProps) {
  const t = TONES[tone];
  return (
    <View
      style={[styles.tag, { backgroundColor: t.bg, borderColor: t.border, paddingHorizontal: t.px, paddingVertical: t.py }, style]}
      testID={testID}
    >
      <MapPin size={t.pinSize} color={t.pin} strokeWidth={2.25} />
      <Text style={[typography.utility_badge_tiny, styles.label, { color: t.ink }]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    maxWidth: '100%',
    borderWidth: kayoBorder.widthHairline,
    borderRadius: kayoRadius.sm,
  },
  label: { flexShrink: 1 },
});
