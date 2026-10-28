import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';

import { kayoSpace, kayoBorder, kayoRadius } from '../../foundations/tokens';
import { theme } from '../../foundations/theme';
import { typography } from '../../foundations/typography';

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  errorText?: string;
  testID?: string;
}

export function Checkbox({ checked, onChange, label, disabled, errorText, testID }: CheckboxProps) {
  return (
    <View style={styles.wrapper}>
      <Pressable
        testID={testID}
        onPress={() => !disabled && onChange(!checked)}
        style={[styles.box, checked && styles.boxChecked, disabled && styles.boxDisabled]}
        hitSlop={8}
      >
        {checked ? <Check size={12} color={theme.text.onPrimary} strokeWidth={3} /> : null}
      </Pressable>
      {label ? (
        <Text style={[typography.body_base, styles.labelText, disabled && styles.labelDisabled]}>
          {label}
        </Text>
      ) : null}
      {errorText ? (
        <Text style={[typography.body_sm, { color: theme.status.overdue.fg, marginTop: kayoSpace[1] }]}>
          {errorText}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flexDirection: 'row', alignItems: 'center', gap: kayoSpace[2] },
  box: {
    width: 20,
    height: 20,
    borderWidth: kayoBorder.width,
    borderColor: theme.border.strong,
    borderRadius: kayoRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.surface.card,
  },
  boxChecked: {
    backgroundColor: theme.brand.primary,
    borderColor: theme.brand.primary,
  },
  boxDisabled: { opacity: 0.5 },
  labelText: { color: theme.text.primary, flex: 1 },
  labelDisabled: { color: theme.text.disabled },
});
