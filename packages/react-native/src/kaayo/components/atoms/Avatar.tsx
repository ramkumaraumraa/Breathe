// frontend/design-system/components/atoms/Avatar.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { kayoRadius, kayoBorder, kayoShadow } from '../../foundations/tokens';
import { theme } from '../../foundations/theme';
import { typography } from '../../foundations/typography';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  uri?: string | null;
  initials?: string;
  /** A named size, or a diameter in px (StudentAvatar's 48 / 96 / 200). */
  size?: AvatarSize | number;
  borderColor?: string;
  testID?: string;
}

const SIZE_PX: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 56,
  xl: 72,
};

const INITIALS_FONT_SIZE: Record<AvatarSize, number> = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 18,
  xl: 24,
};

export function Avatar({ uri, initials, size = 'md', borderColor, testID }: AvatarProps) {
  const px = typeof size === 'number' ? size : SIZE_PX[size];
  const resolvedBorderColor = borderColor ?? theme.border.strong;
  const dynamicCircle = { width: px, height: px, borderColor: resolvedBorderColor };

  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={[styles.base, dynamicCircle]}
        contentFit="cover"
        testID={testID}
      />
    );
  }

  const displayInitials = initials ? initials.slice(0, 2).toUpperCase() : '';
  // A px size scales the initials at the named sizes' ratio (~1/3 of the diameter).
  const fontSize = typeof size === 'number' ? Math.round(px / 3) : INITIALS_FONT_SIZE[size];

  return (
    <View style={[styles.base, styles.fallback, dynamicCircle]} testID={testID}>
      <Text style={[typography.label_lg, styles.initialsText, { fontSize, lineHeight: px }]}>
        {displayInitials}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: kayoRadius.pill,
    borderWidth: kayoBorder.width,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    ...kayoShadow.sm,
  },
  fallback: {
    backgroundColor: theme.surface.sunken,
  },
  initialsText: {
    color: theme.text.secondary,
    includeFontPadding: false,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
