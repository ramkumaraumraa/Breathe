/**
 * ScreenFooterButton — full-width primary CTA pinned to the bottom of a list screen.
 * Replaces the floating Fab pattern for single-action screens (Add Branch, Add Session, etc.)
 * where there's a full-width footer available instead of a corner-anchored circle.
 */

import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Plus } from 'lucide-react-native';

import { Button } from '../atoms/Button';
import { kayoSpace } from '../../foundations/tokens';
import { theme } from '../../foundations/theme';

export interface ScreenFooterButtonProps {
  label: string;
  onPress: () => void;
  icon?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  testID?: string;
}

export function ScreenFooterButton({
  label,
  onPress,
  icon,
  disabled,
  loading,
  testID,
}: ScreenFooterButtonProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, kayoSpace[4]) }]}>
      <Button
        label={label}
        onPress={onPress}
        variant="primary"
        fullWidth
        disabled={disabled}
        loading={loading}
        iconLeft={icon ?? <Plus size={18} color={theme.action.primary.fg} strokeWidth={2.5} />}
        testID={testID}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: kayoSpace[5],
    paddingTop: kayoSpace[3],
    backgroundColor: theme.surface.canvas,
  },
});
