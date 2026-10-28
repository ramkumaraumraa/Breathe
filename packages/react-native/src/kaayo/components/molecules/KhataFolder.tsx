/**
 * Folder card (Figma "Payments v2 / Khata panel", 74495:3993): a notched tab over a 2px ink body
 * with a hard 2/2 shadow. The body clips its children; pass `bodyStyle` for its fill, gap, padding.
 */

import React, { type ReactNode } from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { kayoBorder, kayoColors, kayoShadow } from '../../foundations/tokens';
import { typography } from '../../foundations/typography';

export function KhataFolder({ tab, aside, children, bodyStyle, testID }: {
  tab: string;
  /** Sits beside the tab, above the body (the at-a-glance "6 not paid" chip). */
  aside?: ReactNode;
  children: ReactNode;
  bodyStyle?: StyleProp<ViewStyle>;
  testID?: string;
}) {
  return (
    <View testID={testID}>
      <View style={styles.tabRow}>
        <View style={styles.tab}>
          <Text style={[typography.utility_badge, { color: kayoColors.neutral[950] }]}>{tab}</Text>
        </View>
        {aside}
      </View>
      <View style={[styles.body, bodyStyle]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  // The row (not the tab) overlaps the body's top rule so the tab reads as notched into it.
  tabRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: -2, zIndex: 1 },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: kayoColors.neutral[25],
    borderWidth: kayoBorder.width,
    borderBottomWidth: 0,
    borderColor: kayoColors.neutral[950],
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  body: {
    backgroundColor: kayoColors.neutral[25],
    borderWidth: kayoBorder.width,
    borderColor: kayoColors.neutral[950],
    borderRadius: 10,
    borderTopLeftRadius: 0,
    overflow: 'hidden',
    ...kayoShadow.sm,
  },
});
