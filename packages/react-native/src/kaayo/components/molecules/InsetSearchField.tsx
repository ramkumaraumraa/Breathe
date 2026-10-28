/**
 * Inset clay search (Figma Students v2): a pill sunk into the page, with a clear button once there
 * is text. Students list (canopy + pinned bar) and the Payments collect queue.
 */

import React from 'react';
import { Pressable, StyleSheet, TextInput, View, type TextInputProps } from 'react-native';
import { Search, X } from 'lucide-react-native';

import { theme } from '../../foundations/theme';
import { kayoClay, kayoColors, kayoRadius, kayoSpace } from '../../foundations/tokens';
import { typography } from '../../foundations/typography';

export function InsetSearchField({
  value,
  onChangeText,
  placeholder = 'Search name, reg no. or phone',
  testID,
  ...inputProps
}: {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  testID: string;
} & Pick<TextInputProps, 'returnKeyType' | 'onSubmitEditing' | 'autoFocus' | 'keyboardType'>) {
  return (
    <View style={styles.searchBox}>
      <Search size={18} color={kayoColors.neutral[600]} strokeWidth={2.25} />
      <TextInput
        testID={testID}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        placeholderTextColor={kayoColors.neutral[600]}
        accessibilityLabel={placeholder}
        style={[typography.body_base, styles.searchInput]}
        {...inputProps}
      />
      {value ? (
        <Pressable onPress={() => onChangeText('')} hitSlop={12} accessibilityRole="button" accessibilityLabel="Clear search" testID={`${testID}-clear`}>
          <X size={17} color={theme.text.secondary} strokeWidth={2.25} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    minHeight: 48,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: kayoSpace[2],
    borderRadius: kayoRadius.pill,
    backgroundColor: kayoColors.neutral[25],
    ...kayoClay.inset('md'),
    paddingHorizontal: kayoSpace[4],
  },
  searchInput: {
    flex: 1,
    minWidth: 0,
    color: theme.text.primary,
    paddingVertical: kayoSpace[2],
  },
});
