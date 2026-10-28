/**
 * The one back bar for pushed (non-tab) screens: "‹ Back label" (router.back() unless `onBack`), an
 * optional right slot (e.g. the amounts veil toggle), then an optional H2 title + body subtitle.
 * Derived from the Payments Collect / Fee history / Record payment bars and the Settings sub-screens.
 */
import React from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';

import { kayoColors as c, kayoSpace } from '../../foundations/tokens';
import { typography } from '../../foundations/typography';

export interface PushedScreenHeaderProps {
  /** Where back goes, e.g. "Payments", "Settings". */
  backLabel: string;
  onBack?: () => void;
  title?: string;
  subtitle?: string;
  right?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /** On the back button. */
  testID?: string;
}

export function PushedScreenHeader({ backLabel, onBack, title, subtitle, right, style, testID }: PushedScreenHeaderProps) {
  return (
    <View style={[styles.header, style]}>
      <View style={styles.topRow}>
        <Pressable
          onPress={onBack ?? (() => router.back())}
          style={styles.back}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={backLabel === 'Back' ? 'Back' : `Back to ${backLabel}`}
          testID={testID}
        >
          <ChevronLeft size={20} color={c.neutral[950]} strokeWidth={2.25} />
          <Text style={[typography.label_lg, { color: c.neutral[950] }]}>{backLabel}</Text>
        </Pressable>
        {right}
      </View>
      {title ? (
        <View>
          <Text style={[typography.heading_h2, { color: c.neutral[950] }]} accessibilityRole="header">{title}</Text>
          {subtitle ? <Text style={[typography.body_sm, { color: c.neutral[800] }]}>{subtitle}</Text> : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { gap: kayoSpace[2] },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  back: { flexDirection: 'row', alignItems: 'center', gap: 2, minHeight: 44, paddingRight: kayoSpace[2] },
});
