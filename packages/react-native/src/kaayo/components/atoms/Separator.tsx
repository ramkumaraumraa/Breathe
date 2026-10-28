import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

import { kayoBorder } from '../../foundations/tokens';
import { theme } from '../../foundations/theme';

export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'subtle' | 'strong';
  style?: ViewStyle;
}

export function Separator({ orientation = 'horizontal', variant = 'subtle', style }: SeparatorProps) {
  const baseStyle = orientation === 'horizontal'
    ? (variant === 'subtle' ? styles.hSubtle : styles.hStrong)
    : (variant === 'subtle' ? styles.vSubtle : styles.vStrong);
  return <View style={[baseStyle, style]} />;
}

const styles = StyleSheet.create({
  hSubtle: {
    height: kayoBorder.widthHairline,
    backgroundColor: theme.border.subtle,
    width: '100%',
  },
  hStrong: {
    height: kayoBorder.width,
    backgroundColor: theme.border.strong,
    width: '100%',
  },
  vSubtle: {
    width: kayoBorder.widthHairline,
    backgroundColor: theme.border.subtle,
    alignSelf: 'stretch',
  },
  vStrong: {
    width: kayoBorder.width,
    backgroundColor: theme.border.strong,
    alignSelf: 'stretch',
  },
});
