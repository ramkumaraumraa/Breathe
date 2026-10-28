/**
 * Choice chip - one pill of a single-select row (docs/payments-v2-implementation.md §6.1).
 * Default: white, 2px ink edge, 2/2 hard shadow. Selected: pressed (no shadow, shifted by its
 * offset), Primary/500 fill, check icon, white text. TabFilter (segmented track) and
 * ChipMultiSelect (multi + "Other") don't fit a free-standing single choice.
 */

import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Check } from 'lucide-react-native';

import { kayoBorder, kayoColors, kayoRadius, kayoShadow, kayoSpace } from '../../foundations/tokens';
import { typography } from '../../foundations/typography';

export function ChoiceChip({ label, selected, onPress, multiSelect, accessibilityLabel, testID }: {
  label: string;
  selected: boolean;
  onPress: () => void;
  /** One of several that can be on at once (checkbox semantics) rather than one-of-a-set (radio). */
  multiSelect?: boolean;
  accessibilityLabel?: string;
  testID?: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.chip, selected ? styles.selected : pressed ? styles.pressed : kayoShadow.sm]}
      accessibilityRole={multiSelect ? 'checkbox' : 'radio'}
      accessibilityState={{ checked: selected }}
      accessibilityLabel={accessibilityLabel ?? label}
      testID={testID}
    >
      {selected ? <Check size={14} color={kayoColors.neutral[25]} strokeWidth={2.75} /> : null}
      <Text style={[typography.label_sm, { color: selected ? kayoColors.neutral[25] : kayoColors.neutral[950] }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: kayoSpace[1],
    minHeight: 44,
    paddingHorizontal: kayoSpace[3],
    borderRadius: kayoRadius.pill,
    borderWidth: kayoBorder.width,
    borderColor: kayoColors.neutral[950],
    backgroundColor: kayoColors.neutral[25],
  },
  pressed: { transform: [{ translateX: 2 }, { translateY: 2 }] },
  selected: { backgroundColor: kayoColors.primary[500], transform: [{ translateX: 2 }, { translateY: 2 }] },
});
