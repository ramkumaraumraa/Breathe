import React, { useRef, useState } from 'react';
import { Pressable, View, Text, StyleSheet, Modal, ScrollView } from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';

import { kayoSpace, kayoRadius, kayoBorder, kayoShadow } from '../../foundations/tokens';
import { theme } from '../../foundations/theme';
import { typography } from '../../foundations/typography';
import { notifier } from '../../foundations/notifier';
import { Checkbox } from './Checkbox';

export interface SelectOption {
  value: string;
  label: string;
  hint?: string;
  /** Alert-tone count pill on the right of the option, e.g. how many students an issue covers. */
  badge?: string;
}

export interface SelectProps {
  label?: string;
  placeholder?: string;
  value: string | string[] | null;
  onChange: (value: string | string[]) => void;
  options: SelectOption[];
  mode?: 'single' | 'multi';
  disabled?: boolean;
  errorText?: string;
  /** Alert-tone pill inside the trigger, before the chevron ("20 to fix"). */
  triggerBadge?: string;
  /** Spoken name of the trigger (read with the current value), for selects whose label is drawn outside (inline rows). */
  accessibilityLabel?: string;
  testID?: string;
}

export function Select({
  label,
  placeholder = 'Select…',
  value,
  onChange,
  options,
  mode = 'single',
  disabled,
  errorText,
  triggerBadge,
  accessibilityLabel,
  testID,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<View>(null);

  const selectedValues: string[] =
    value == null ? [] : Array.isArray(value) ? value : [value];

  const triggerLabel =
    selectedValues.length === 0
      ? null
      : selectedValues
          .map((v) => options.find((o) => o.value === v)?.label ?? v)
          .join(', ');

  function openDropdown() {
    if (disabled) return;
    triggerRef.current?.measure((_fx, _fy, width, height, px, py) => {
      setDropdownPos({ top: py + height + 4, left: px, width });
      setOpen(true);
    });
  }

  function handleSingleSelect(optValue: string) {
    onChange(optValue);
    setOpen(false);
  }

  function handleMultiToggle(optValue: string) {
    const next = selectedValues.includes(optValue)
      ? selectedValues.filter((v) => v !== optValue)
      : [...selectedValues, optValue];
    onChange(next);
  }

  return (
    <View style={styles.field}>
      {label ? <Text style={[typography.label_lg, styles.labelText]}>{label}</Text> : null}

      <View ref={triggerRef} collapsable={false}>
        <Pressable
          testID={testID}
          accessibilityLabel={accessibilityLabel ? `${accessibilityLabel}, ${triggerLabel ?? placeholder}` : undefined}
          onPress={openDropdown}
          style={[
            styles.trigger,
            open && styles.triggerOpen,
            errorText ? styles.triggerError : null,
            disabled ? styles.triggerDisabled : null,
          ]}
        >
          <Text
            style={[
              typography.body_base,
              { color: triggerLabel ? theme.text.primary : theme.text.tertiary, flex: 1 },
            ]}
            numberOfLines={1}
          >
            {triggerLabel ?? placeholder}
          </Text>
          {triggerBadge ? <AttentionBadge label={triggerBadge} /> : null}
          {open
            ? <ChevronUp size={20} color={theme.text.secondary} strokeWidth={2} />
            : <ChevronDown size={20} color={theme.text.secondary} strokeWidth={2} />
          }
        </Pressable>
      </View>

      {errorText ? (
        <Text style={[typography.body_sm, { color: theme.status.overdue.fg }]}>{errorText}</Text>
      ) : null}

      <Modal
        transparent
        visible={open}
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        {/* Transparent full-screen pressable — tapping outside closes the dropdown */}
        <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpen(false)} />

        {/* Dropdown anchored below the trigger */}
        <View
          style={[
            styles.menu,
            { position: 'absolute', top: dropdownPos.top, left: dropdownPos.left, width: dropdownPos.width },
          ]}
        >
          <ScrollView bounces={false} keyboardShouldPersistTaps="handled">
            {options.map((opt) => {
              const isSelected = selectedValues.includes(opt.value);
              return (
                <Pressable
                  key={opt.value}
                  onPress={() =>
                    mode === 'single'
                      ? handleSingleSelect(opt.value)
                      : handleMultiToggle(opt.value)
                  }
                  style={({ pressed }) => [
                    styles.menuItem,
                    pressed && { backgroundColor: theme.surface.sunken },
                  ]}
                  testID={testID ? `${testID}-option-${opt.value}` : undefined}
                >
                  {mode === 'single' ? (
                    <View style={[styles.radio, isSelected && styles.radioSelected]}>
                      {isSelected ? <View style={styles.radioDot} /> : null}
                    </View>
                  ) : (
                    <Checkbox
                      checked={isSelected}
                      onChange={() => handleMultiToggle(opt.value)}
                      testID={testID ? `${testID}-cb-${opt.value}` : undefined}
                    />
                  )}
                  <View style={{ flex: 1 }}>
                    <Text style={[typography.body_base, { color: theme.text.primary }]}>
                      {opt.label}
                    </Text>
                    {opt.hint ? (
                      <Text style={[typography.body_sm, { color: theme.text.tertiary }]}>
                        {opt.hint}
                      </Text>
                    ) : null}
                  </View>
                  {opt.badge ? <AttentionBadge label={opt.badge} /> : null}
                </Pressable>
              );
            })}

            {options.length === 0 ? (
              <View style={styles.menuEmpty}>
                <Text style={[typography.body_sm, { color: theme.text.tertiary }]}>
                  No options yet.
                </Text>
              </View>
            ) : null}
          </ScrollView>

          {mode === 'multi' ? (
            <Pressable
              style={[styles.doneButton, selectedValues.length === 0 && styles.doneButtonDisabled]}
              disabled={selectedValues.length === 0}
              onPress={() => setOpen(false)}
              testID={testID ? `${testID}-done` : undefined}
            >
              <Text
                style={[
                  typography.label_lg,
                  { color: selectedValues.length === 0 ? theme.text.disabled : theme.text.onPrimary },
                ]}
              >
                Done
              </Text>
            </Pressable>
          ) : null}
        </View>
      </Modal>
    </View>
  );
}

/** Sentence case on purpose - it's a data chip ("20 to fix"), not an eyebrow. */
function AttentionBadge({ label }: { label: string }) {
  return (
    <View style={styles.badge}>
      <Text style={[typography.utility_badge, styles.badgeText]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: kayoSpace[2],
    paddingVertical: 2,
    marginLeft: kayoSpace[2],
    borderRadius: kayoRadius.pill,
    borderWidth: kayoBorder.widthHairline,
    borderColor: notifier.alert.border,
    backgroundColor: notifier.alert.bg,
  },
  badgeText: { color: notifier.alert.fg, textTransform: 'none', letterSpacing: 0 },
  field: { gap: kayoSpace[1] },
  labelText: { color: theme.text.primary },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: kayoSpace[3],
    minHeight: 48,
    borderWidth: kayoBorder.width,
    borderColor: theme.border.strong,
    borderRadius: kayoRadius.md,
    backgroundColor: theme.surface.card,
  },
  triggerOpen: {
    borderColor: theme.border.focus,
  },
  triggerError: { borderColor: theme.status.overdue.border },
  triggerDisabled: { backgroundColor: theme.surface.sunken, opacity: 0.6 },
  menu: {
    maxHeight: 280,
    backgroundColor: theme.surface.card,
    borderWidth: kayoBorder.width,
    borderColor: theme.border.strong,
    borderRadius: kayoRadius.md,
    ...kayoShadow.md,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: kayoSpace[3],
    paddingHorizontal: kayoSpace[4],
    paddingVertical: kayoSpace[3],
    borderBottomWidth: kayoBorder.widthHairline,
    borderBottomColor: theme.border.subtle,
  },
  menuEmpty: { padding: kayoSpace[5] },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: kayoBorder.width,
    borderColor: theme.border.strong,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  radioSelected: { borderColor: theme.brand.primary },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.brand.primary,
  },
  doneButton: {
    backgroundColor: theme.brand.primary,
    paddingVertical: kayoSpace[3],
    alignItems: 'center',
    borderTopWidth: kayoBorder.widthHairline,
    borderTopColor: theme.border.subtle,
  },
  doneButtonDisabled: {
    backgroundColor: theme.surface.sunken,
  },
});
