// Deep import: Expo's Metro has no tree shaking, so `{ Loader2 } from 'lucide-react-native'` bundles every icon.
import Loader2 from 'lucide-react-native/icons/loader-circle';
import * as React from 'react';
import { type ViewProps } from 'react-native';
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Icon } from './icon';

type SpinnerProps = ViewProps & { className?: string; size?: number };

/**
 * Web: <Loader2 className="animate-spin" />, one full turn per second, linear, forever.
 * `className` goes to the inner Icon — don't pass `animate-*` or `transition-*` classes here
 * (react-native-css would wrap the SVG in its own Animated component).
 */
function Spinner({ className, size, style, ...props }: SpinnerProps) {
  const rotation = useSharedValue(0);

  React.useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 1000, easing: Easing.linear }),
      -1,
      false,
      undefined,
      ReduceMotion.Never, // spinners are essential motion (web animate-spin ignores reduce-motion too)
    );
  }, [rotation]);

  const spin = useAnimatedStyle(() => ({ transform: [{ rotate: `${rotation.value}deg` }] }));

  return (
    <Animated.View role="progressbar" accessible accessibilityState={{ busy: true }} {...props} style={[spin, style]}>
      <Icon as={Loader2} className={className} size={size} />
    </Animated.View>
  );
}

export { Spinner };
export type { SpinnerProps };
