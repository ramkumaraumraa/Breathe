/**
 * Button — Neo-Brutalist atom.
 * Hard 2px border, hard offset shadow, pressed = translateY 2px + shadow drop.
 */

import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  GestureResponderEvent,
} from 'react-native';

import { kayoSpace, kayoRadius, kayoBorder, kayoShadow, kayoShadowTinted, kayoColors } from '../../foundations/tokens';
import { theme } from '../../foundations/theme';
import { typography } from '../../foundations/typography';

export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  label: string;
  onPress?: (e: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  /** v3 tonal brutalism (.claude/design-direction.md): a 1.5px outline in the variant's own 900
   * stop and a hard shadow in its 975 stop instead of the ink border + ink shadow. Opt-in, so
   * existing screens keep their look until they are redesigned. */
  tonal?: boolean;
  testID?: string;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  iconLeft,
  iconRight,
  tonal = false,
  testID,
}: ButtonProps) {
  const palette = variantPalette(variant);
  const sizeStyle = sizeStyles[size];
  const textStyle = sizeTextStyles[size];
  const tone = tonal ? tonalEdge(variant) : null;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      testID={testID}
      style={({ pressed }) => [
        styles.base,
        sizeStyle,
        {
          backgroundColor: disabled ? kayoColors.neutral[75] : palette.bg,
          borderColor: disabled ? theme.border.default : theme.border.strong,
        },
        tone && !disabled && { borderWidth: 1.5, borderColor: tone.border },
        fullWidth && styles.fullWidth,
        // Brutalist press: drop the shadow + translate
        pressed && !disabled && styles.pressed,
        !pressed && !disabled && variant !== 'ghost' && (tone ? kayoShadowTinted(tone.shadow) : kayoShadow.sm),
      ]}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator
            color={disabled ? theme.text.disabled : palette.fg}
            size="small"
          />
        ) : (
          <>
            {iconLeft}
            <Text
              style={[
                textStyle,
                {
                  color: disabled ? theme.text.disabled : palette.fg,
                },
              ]}
            >
              {label}
            </Text>
            {iconRight}
          </>
        )}
      </View>
    </Pressable>
  );
}

/** Outline (900) and hard shadow (975) from the variant's own colour family. */
function tonalEdge(v: ButtonVariant): { border: string; shadow: string } {
  switch (v) {
    case 'primary':
      return { border: kayoColors.primary[900], shadow: kayoColors.primary[975] };
    case 'destructive':
      return { border: kayoColors.negative[900], shadow: kayoColors.negative[975] };
    default:
      return { border: kayoColors.neutral[900], shadow: kayoColors.neutral[975] };
  }
}

function variantPalette(v: ButtonVariant) {
  switch (v) {
    case 'primary':
      return theme.action.primary;
    case 'destructive':
      return theme.action.destructive;
    case 'ghost':
      return { bg: 'transparent', fg: theme.text.primary };
    case 'secondary':
    default:
      return theme.action.secondary;
  }
}

const styles = StyleSheet.create({
  base: {
    borderWidth: kayoBorder.width,
    borderRadius: kayoRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  fullWidth: { alignSelf: 'stretch' },
  pressed: {
    transform: [{ translateX: 2 }, { translateY: 2 }],
    ...kayoShadow.none,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: kayoSpace[2],
  },
});

const sizeStyles = StyleSheet.create({
  sm: {
    paddingHorizontal: kayoSpace[3],
    paddingVertical: kayoSpace[2],
    minHeight: 36,
  },
  md: {
    paddingHorizontal: kayoSpace[4],
    paddingVertical: kayoSpace[3],
  },
  lg: {
    paddingHorizontal: kayoSpace[5],
    paddingVertical: kayoSpace[4],
    minHeight: 52,
  },
});

const sizeTextStyles = StyleSheet.create({
  sm: typography.label_sm,
  md: typography.label_lg,
  lg: typography.label_lg,
});
