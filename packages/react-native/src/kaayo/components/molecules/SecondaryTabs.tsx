/**
 * SecondaryTabs - Figma "Tabs / Secondary (clay)" (04 · Students v2, 2026-10-04), the soft-clay
 * companion to the brutalist Tabs. One clay track; items sit flat on it and the selected ones are
 * pressed in (inset + check), so they need no dividers. Overflow scrolls sideways - items keep
 * their natural width, so the one cut at the edge is the cue to swipe.
 *
 * Same contract as TabFilter: `value` is the selection, `onChange` reports the tapped option and
 * the caller owns the toggle logic (multi-select, "All" clearing the rest).
 */
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CheckCircle2 } from 'lucide-react-native';

import { kayoClay, kayoColors, kayoRadius, kayoShadowDrop } from '../../foundations/tokens';
import { typography } from '../../foundations/typography';

export interface SecondaryTabOption<T extends string = string> {
  value: T;
  label: string;
  count?: number;
}

export interface SecondaryTabsProps<T extends string = string> {
  options: SecondaryTabOption<T>[];
  value: T[];
  onChange: (value: T) => void;
  testID?: string;
}

export function SecondaryTabs<T extends string>({ options, value, onChange, testID }: SecondaryTabsProps<T>) {
  return (
    <View style={styles.track} testID={testID}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {options.map((opt) => {
          const selected = value.includes(opt.value);
          return (
            <Pressable
              key={opt.value}
              onPress={() => onChange(opt.value)}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: selected }}
              hitSlop={{ top: 4, bottom: 4 }}
              style={({ pressed }) => [styles.item, selected && styles.itemSelected, pressed && styles.itemPressed]}
              testID={testID ? `${testID}-${opt.value}` : undefined}
            >
              {selected ? (
                <CheckCircle2 size={16} color={kayoColors.neutral[25]} fill={kayoColors.primary[500]} strokeWidth={2.5} />
              ) : null}
              <Text style={[styles.label, selected && styles.labelSelected]} numberOfLines={1}>
                {opt.label}
              </Text>
              {opt.count != null ? (
                <Text style={[styles.count, selected && styles.countSelected]}>{opt.count}</Text>
              ) : null}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Brutalist edge in the Secondary ramp: 1px 700 outline + 2px hard 500 shadow, no blur.
  track: {
    backgroundColor: kayoColors.secondary[25],
    borderWidth: 1,
    borderColor: kayoColors.secondary[700],
    borderRadius: kayoRadius.lg,
    ...kayoShadowDrop(kayoColors.secondary[500]),
    overflow: 'hidden',
  },
  row: { padding: 6, gap: 4 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  // Pressed-in clay: white light top-left, Primary/100 shade bottom-right.
  itemSelected: {
    backgroundColor: kayoColors.primary[25],
    ...kayoClay.inset('md', kayoColors.primary[100]),
  },
  itemPressed: { transform: [{ scale: 0.98 }] },
  label: { ...typography.label_sm, color: kayoColors.neutral[950] },
  labelSelected: { color: kayoColors.primary[900] },
  // Utility/Badge without the chip uppercase/tracking - it's a number.
  count: { ...typography.utility_badge, textTransform: 'none', letterSpacing: 0, color: kayoColors.neutral[800] },
  countSelected: { color: kayoColors.primary[700] },
});
