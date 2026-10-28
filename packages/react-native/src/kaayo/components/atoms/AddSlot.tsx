/** AddSlot - dashed "add another" row: primary plus knob + label. */
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Plus } from 'lucide-react-native';

import { kayoColors } from '../../foundations/tokens';
import { typography } from '../../foundations/typography';

export interface AddSlotProps {
  label: string;
  onPress: () => void;
  testID?: string;
}

export function AddSlot({ label, onPress, testID }: AddSlotProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
      testID={testID}
    >
      <View style={styles.knob}>
        <Plus size={16} color={kayoColors.neutral[25]} strokeWidth={2.5} />
      </View>
      <Text style={[typography.label_lg, { color: kayoColors.primary[700] }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16,
    backgroundColor: kayoColors.primary[25],
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: kayoColors.primary[500],
    borderRadius: 12,
  },
  pressed: { transform: [{ scale: 0.98 }] },
  knob: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: kayoColors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
});
