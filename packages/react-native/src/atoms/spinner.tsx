import { Loader2 } from 'lucide-react-native';
import * as React from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Icon } from './icon';

type SpinnerProps = { className?: string; size?: number };

/** Web: <Loader2 className="animate-spin" />, one full turn per second, linear, forever. */
function Spinner({ className, size }: SpinnerProps) {
  const rotation = useSharedValue(0);

  React.useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 1000, easing: Easing.linear }), -1, false);
  }, [rotation]);

  const spin = useAnimatedStyle(() => ({ transform: [{ rotate: `${rotation.value}deg` }] }));

  return (
    <Animated.View role="progressbar" accessible accessibilityState={{ busy: true }} style={spin}>
      <Icon as={Loader2} className={className} size={size} />
    </Animated.View>
  );
}

export { Spinner };
export type { SpinnerProps };
