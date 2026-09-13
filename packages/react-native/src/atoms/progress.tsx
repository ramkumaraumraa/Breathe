import * as ProgressPrimitive from '@rn-primitives/progress';
import * as React from 'react';
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { cn } from '../lib/utils';
import { Gradient } from './gradient';

// Tailwind ease-out = cubic-bezier(0, 0, 0.2, 1); web duration-500
const TIMING = {
  duration: 500,
  easing: Easing.bezier(0, 0, 0.2, 1),
  reduceMotion: ReduceMotion.System, // jumps to target under Reduce Motion (state still conveyed)
};

function clampProgress(value: number | null | undefined): number {
  const n = Number.isFinite(value) ? (value as number) : 0;
  return Math.min(100, Math.max(0, n));
}

type ProgressProps = Omit<React.ComponentProps<typeof ProgressPrimitive.Root>, 'max'> & {
  indicatorClassName?: string;
};

function Progress({ className, value, indicatorClassName, onLayout, ...props }: ProgressProps) {
  const trackWidth = useSharedValue(0);
  const progress = useSharedValue(clampProgress(value));

  React.useEffect(() => {
    progress.value = withTiming(clampProgress(value), TIMING);
  }, [progress, value]);

  // Web: transform: translateX(-(100 - value)%) on a full-width indicator.
  // Hidden until the track is measured so mount doesn't flash a full bar at width 0.
  const slide = useAnimatedStyle(() => ({
    opacity: trackWidth.value ? 1 : 0,
    transform: [{ translateX: -((100 - progress.value) / 100) * trackWidth.value }],
  }));

  return (
    <ProgressPrimitive.Root
      value={clampProgress(value)}
      className={cn('relative h-2 w-full overflow-hidden rounded-full bg-secondary', className)}
      onLayout={(e) => {
        trackWidth.value = e.nativeEvent.layout.width;
        onLayout?.(e);
      }}
      {...props}>
      <ProgressPrimitive.Indicator asChild>
        <Animated.View
          testID="progress-indicator"
          className={cn('h-full w-full', indicatorClassName)}
          style={slide}>
          {/* static inner layer: gradients must not sit on an animated view (reanimated#8297) */}
          <Gradient testID="progress-gradient" />
        </Animated.View>
      </ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
  );
}

export { clampProgress, Progress };
export type { ProgressProps };
