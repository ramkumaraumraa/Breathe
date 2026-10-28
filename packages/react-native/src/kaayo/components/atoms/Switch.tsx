import React from 'react';
import { Switch as RNSwitch, View, Text, StyleSheet } from 'react-native';
import { theme } from '../../foundations/theme';
import { typography } from '../../foundations/typography';

export interface SwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  label?: string;
  testID?: string;
}

const TRACK_COLOR = {
  true: theme.brand.primary,
  false: theme.border.default,
};

export function Switch({ value, onChange, disabled, label, testID }: SwitchProps) {
  const control = (
    <RNSwitch
      value={value}
      onValueChange={onChange}
      disabled={disabled}
      trackColor={TRACK_COLOR}
      thumbColor={theme.surface.card}
      testID={testID}
    />
  );
  if (!label) return control;
  return (
    <View style={styles.row}>
      <Text style={[typography.label_lg, styles.label]}>{label}</Text>
      {control}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  label: { color: theme.text.primary },
});
