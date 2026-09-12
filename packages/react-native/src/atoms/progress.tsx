import * as ProgressPrimitive from '@rn-primitives/progress';
import * as React from 'react';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { cn } from '../lib/utils';
import { Gradient } from './gradient';

// Tailwind ease-out = cubic-bezier(0, 0, 0.2, 1); web duration-500
const TIMING = { duration: 500, easing: Easing.bezier(0, 0, 0.2, 1) };

function clampProgress(value: number | null | undefined): number {
  return Math.min(100, Math.max(0, value ?? 0));
}

type ProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root> & { indicatorClassName?: string };

function Progress({ className, value, indicatorClassName, onLayout, ...props }: ProgressProps) {
  const trackWidth = useSharedValue(0);
  const progress = useSharedValue(clampProgress(value));

  React.useEffect(() => {
    progress.value = withTiming(clampProgress(value), TIMING);
  }, [progress, value]);

  // Web: transform: translateX(-(100 - value)%) on a full-width indicator
  const slide = useAnimatedStyle(() => ({
    transform: [{ translateX: -((100 - progress.value) / 100) * trackWidth.value }],
  }));

  return (
    <ProgressPrimitive.Root
      value={value}
      className={cn('relative h-2 w-full overflow-hidden rounded-full bg-secondary', className)}
      onLayout={(e) => {
        trackWidth.value = e.nativeEvent.layout.width;
        onLayout?.(e);
      }}
      {...props}>
      <ProgressPrimitive.Indicator asChild>
        <Animated.View className={cn('h-full w-full', indicatorClassName)} style={slide}>
          {/* static inner layer: gradients must not sit on an animated view (reanimated#8297) */}
          <Gradient testID="progress-gradient" />
        </Animated.View>
      </ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
  );
}

export { clampProgress, Progress };
export type { ProgressProps };
