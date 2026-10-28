import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

import { kayoSpace, kayoBorder } from '../../foundations/tokens';
import { theme } from '../../foundations/theme';
import { typography } from '../../foundations/typography';

export interface RadioGroupOption {
  value: string;
  label: string;
}

export interface RadioGroupProps {
  value: string | null;
  onChange: (value: string) => void;
  options: RadioGroupOption[];
  disabled?: boolean;
  testID?: string;
}

export function RadioGroup({ value, onChange, options, disabled, testID }: RadioGroupProps) {
  return (
    <View testID={testID} style={styles.group}>
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => !disabled && onChange(opt.value)}
            style={styles.row}
            testID={testID ? `${testID}-${opt.value}` : undefined}
          >
            <View style={[styles.outer, selected && styles.outerSelected]}>
              {selected ? <View style={styles.inner} /> : null}
            </View>
            <Text style={[typography.body_base, { color: disabled ? theme.text.disabled : theme.text.primary }]}>
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  group: { gap: kayoSpace[3] },
  row: { flexDirection: 'row', alignItems: 'center', gap: kayoSpace[2] },
  outer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: kayoBorder.width,
    borderColor: theme.border.strong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerSelected: { borderColor: theme.brand.primary },
  inner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.brand.primary,
  },
});
