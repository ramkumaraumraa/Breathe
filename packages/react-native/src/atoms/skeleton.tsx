import * as React from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { cn } from '../lib/utils';

const PULSE = { duration: 1000, easing: Easing.bezier(0.4, 0, 0.6, 1) };

type SkeletonProps = React.ComponentProps<typeof View>;

/** Web: animate-pulse, opacity 1 → 0.5 → 1 every 2s. */
function Skeleton({ className, style, ...props }: SkeletonProps) {
  const opacity = useSharedValue(1);

  React.useEffect(() => {
    opacity.value = withRepeat(
      withSequence(withTiming(0.5, PULSE), withTiming(1, PULSE)),
      -1,
      false,
      undefined,
      ReduceMotion.System, // decorative motion: honour Reduce Motion; the sequence ends at 1 so it freezes as a solid block
    );
  }, [opacity]);

  const pulse = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      className={cn('rounded-md bg-muted', className)}
      {...props}
      style={[pulse, style]}
    />
  );
}

export { Skeleton };
export type { SkeletonProps };
