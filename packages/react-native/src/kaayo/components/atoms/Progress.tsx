import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { kayoRadius } from '../../foundations/tokens';
import { theme } from '../../foundations/theme';

export type ProgressVariant = 'default' | 'success' | 'warning' | 'error';

export interface ProgressProps {
  value: number;               // 0–100
  variant?: ProgressVariant;   // default: 'default'
  height?: number;             // default: 8
  testID?: string;
}

const FILL_COLOR: Record<ProgressVariant, string> = {
  default: theme.brand.primary,
  success: theme.status.paid.border,
  warning: theme.status.partial.border,
  error: theme.status.overdue.border,
};

export function Progress({ value, variant = 'default', height = 8, testID }: ProgressProps) {
  const fillWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fillWidth, {
      toValue: value,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [value, fillWidth]);

  const fillBg = FILL_COLOR[variant];
  const widthInterpolated = fillWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <View
      style={[styles.track, { height }]}
      testID={testID}
    >
      <Animated.View
        style={[
          styles.fill,
          { width: widthInterpolated, height, backgroundColor: fillBg },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    backgroundColor: theme.surface.sunken,
    borderRadius: kayoRadius.pill,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: kayoRadius.pill,
  },
});
