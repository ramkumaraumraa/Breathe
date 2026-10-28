// frontend/design-system/components/molecules/WhatsAppPrefPicker.tsx
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { theme } from '../../foundations/theme';
import { typography } from '../../foundations/typography';
import { kayoSpace, kayoBorder, kayoRadius } from '../../foundations/tokens';

export type WaTarget = 'father' | 'mother' | 'both';

export interface WhatsAppPref {
  fees: WaTarget;
  classUpdates: WaTarget;
  attendance: WaTarget;
}

export const WA_PREF_DEFAULT: WhatsAppPref = {
  fees: 'both',
  classUpdates: 'both',
  attendance: 'both',
};

interface WhatsAppPrefPickerProps {
  value: WhatsAppPref;
  onChange: (v: WhatsAppPref) => void;
  hasFather: boolean;
  hasMother: boolean;
  /** No container chrome or heading, for use inside a card that has its own title. */
  bare?: boolean;
}

const ROWS: { key: keyof WhatsAppPref; label: string }[] = [
  { key: 'fees', label: 'Fee reminders' },
  { key: 'classUpdates', label: 'Class updates' },
  { key: 'attendance', label: 'Attendance' },
];

const OPTS: { value: WaTarget; label: string }[] = [
  { value: 'father', label: 'Father' },
  { value: 'mother', label: 'Mother' },
  { value: 'both', label: 'Both' },
];

export function WhatsAppPrefPicker({
  value,
  onChange,
  hasFather,
  hasMother,
  bare,
}: WhatsAppPrefPickerProps) {
  const availableOpts = OPTS.filter((o) => {
    if (o.value === 'father') return hasFather;
    if (o.value === 'mother') return hasMother;
    return hasFather && hasMother; // 'both' only when both phones present
  });

  return (
    <View style={bare ? styles.bare : styles.container}>
      {bare ? null : (
        <Text style={[typography.utility_badge, { color: theme.text.tertiary, marginBottom: kayoSpace[2] }]}>
          WhatsApp defaults
        </Text>
      )}
      {ROWS.map((row) => (
        <View key={row.key} style={styles.row}>
          <Text style={[typography.body_sm, { color: theme.text.secondary, flex: 1 }]}>
            {row.label}
          </Text>
          <View style={styles.chips}>
            {availableOpts.map((opt) => {
              const active = value[row.key] === opt.value;
              return (
                <Pressable
                  key={opt.value}
                  onPress={() => onChange({ ...value, [row.key]: opt.value })}
                  style={[styles.chip, active && styles.chipActive]}
                  testID={`wa-pref-${row.key}-${opt.value}`}
                >
                  <Text
                    style={[
                      typography.utility_badge_tiny,
                      { color: active ? theme.text.onPrimary : theme.text.primary },
                    ]}
                  >
                    {opt.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: kayoBorder.widthHairline,
    borderColor: theme.border.default,
    borderRadius: kayoRadius.sm,
    padding: kayoSpace[3],
    gap: kayoSpace[2],
    backgroundColor: theme.surface.sunken,
  },
  bare: { gap: kayoSpace[2] },
  row: { flexDirection: 'row', alignItems: 'center', gap: kayoSpace[2] },
  chips: { flexDirection: 'row', gap: kayoSpace[1] },
  chip: {
    paddingHorizontal: kayoSpace[2],
    paddingVertical: 4,
    borderWidth: kayoBorder.widthHairline,
    borderColor: theme.border.strong,
    borderRadius: kayoRadius.pill,
    backgroundColor: theme.surface.card,
  },
  chipActive: { backgroundColor: theme.brand.primary, borderColor: theme.brand.primary },
});
