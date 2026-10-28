// frontend/design-system/components/molecules/ChipMultiSelect.tsx
import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { X } from 'lucide-react-native';

import { Input } from '../atoms/Input';
import { theme } from '../../foundations/theme';
import { typography } from '../../foundations/typography';
import { kayoSpace, kayoRadius, kayoBorder } from '../../foundations/tokens';

export interface ChipMultiSelectProps {
  /** Suggested chip labels shown alongside the always-present "Other" chip. */
  suggestions: string[];
  /** Currently selected chip labels (suggestions and/or custom "Other" entries). */
  value: string[];
  onChange: (next: string[]) => void;
  maxSelections: number;
  otherPlaceholder?: string;
  testID?: string;
}

export function ChipMultiSelect({
  suggestions,
  value,
  onChange,
  maxSelections,
  otherPlaceholder = 'Type a custom name',
  testID,
}: ChipMultiSelectProps) {
  const [otherText, setOtherText] = useState('');
  const [otherOpen, setOtherOpen] = useState(false);
  const atCap = value.length >= maxSelections;

  function toggleSuggestion(label: string) {
    if (value.includes(label)) {
      onChange(value.filter((v) => v !== label));
      return;
    }
    if (atCap) return;
    onChange([...value, label]);
  }

  function removeChip(label: string) {
    onChange(value.filter((v) => v !== label));
  }

  // Wired to both the Input's onSubmitEditing and onBlur below — both are needed
  // because Android does not fire a blur event on return-key submit, while iOS
  // commonly fires both submit and blur for the same return-key press. Calling
  // this twice in a row is safe: the first call resets `otherText` to '' via
  // setOtherText(''), so the `trimmed &&` guard short-circuits on the second
  // call and no duplicate is added. Do not remove either handler.
  function commitOther() {
    const trimmed = otherText.trim();
    if (trimmed && !value.includes(trimmed) && value.length < maxSelections) {
      onChange([...value, trimmed]);
    }
    setOtherText('');
    setOtherOpen(false);
  }

  // Chips present in `value` but absent from the current `suggestions` list.
  // Today this only happens for manually-typed "Other" entries, but if a future
  // caller changes `suggestions` dynamically (e.g. Task 6 swapping suggestions
  // when center type changes), a previously-suggested label could end up here
  // too if it's no longer in the new suggestion list. Treat this as "extra
  // chips not currently in the suggestion set," not strictly "user-typed."
  const customChips = value.filter((v) => !suggestions.includes(v));

  return (
    <View testID={testID} style={styles.container}>
      <View style={styles.row}>
        {suggestions.map((label) => {
          const selected = value.includes(label);
          return (
            <Pressable
              key={label}
              onPress={() => toggleSuggestion(label)}
              disabled={!selected && atCap}
              style={[
                styles.chip,
                selected && styles.chipSelected,
                !selected && atCap && styles.chipDisabled,
              ]}
              testID={testID ? `${testID}-chip-${label}` : undefined}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: selected }}
            >
              <Text style={[typography.label_sm, { color: selected ? theme.text.onPrimary : theme.text.primary }]}>
                {label}
              </Text>
            </Pressable>
          );
        })}
        {customChips.map((label) => (
          <Pressable
            key={label}
            onPress={() => removeChip(label)}
            style={[styles.chip, styles.chipSelected]}
            testID={testID ? `${testID}-custom-${label}` : undefined}
            accessibilityRole="button"
            accessibilityLabel={`Remove ${label}`}
          >
            <Text style={[typography.label_sm, { color: theme.text.onPrimary }]}>{label}</Text>
            <X size={12} color={theme.text.onPrimary} strokeWidth={2.5} />
          </Pressable>
        ))}
        <Pressable
          onPress={() => !atCap && setOtherOpen((o) => !o)}
          disabled={atCap}
          style={[styles.chip, otherOpen && styles.chipSelected, atCap && styles.chipDisabled]}
          testID={testID ? `${testID}-chip-other` : undefined}
          accessibilityRole="button"
          accessibilityState={{ expanded: otherOpen }}
        >
          <Text style={[typography.label_sm, { color: otherOpen ? theme.text.onPrimary : theme.text.primary }]}>
            + Other
          </Text>
        </Pressable>
      </View>

      {otherOpen && (
        <Input
          value={otherText}
          onChangeText={setOtherText}
          placeholder={otherPlaceholder}
          onSubmitEditing={commitOther}
          onBlur={commitOther}
          autoFocus
          testID={testID ? `${testID}-other-input` : undefined}
        />
      )}

      <Text style={[typography.body_sm, { color: theme.text.tertiary }]}>
        {value.length} / {maxSelections} selected
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: kayoSpace[2] },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: kayoSpace[2] },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: kayoSpace[1],
    paddingHorizontal: kayoSpace[3],
    paddingVertical: kayoSpace[2],
    borderRadius: kayoRadius.pill,
    borderWidth: kayoBorder.width,
    borderColor: theme.border.strong,
    backgroundColor: theme.surface.card,
  },
  chipSelected: {
    backgroundColor: theme.brand.primary,
    borderColor: theme.brand.primaryDeep,
  },
  chipDisabled: { opacity: 0.4 },
});
