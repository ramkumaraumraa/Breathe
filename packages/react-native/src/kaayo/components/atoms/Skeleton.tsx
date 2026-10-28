import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { ViewStyle } from 'react-native';
import { kayoRadius } from '../../foundations/tokens';
import { theme } from '../../foundations/theme';

export interface SkeletonProps {
  width: number | `${number}%`;
  height: number;
  borderRadius?: number;
  style?: ViewStyle;
  testID?: string;
}

export function Skeleton({ width, height, borderRadius = kayoRadius.md, style, testID }: SkeletonProps) {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1.0, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 800, useNativeDriver: true }),
      ])
    );
    anim.start();
    return () => anim.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View
      style={[styles.base, { width, height, borderRadius, opacity }, style]}
      testID={testID}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: theme.surface.sunken,
  },
});
