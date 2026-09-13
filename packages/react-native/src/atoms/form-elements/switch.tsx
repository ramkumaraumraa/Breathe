import * as SwitchPrimitives from '@rn-primitives/switch';
import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { cn } from '../../lib/utils';

// Tailwind default transition: 150ms cubic-bezier(0.4, 0, 0.2, 1); web translate-x-5 = 20px
const SLIDE = {
  duration: 150,
  easing: Easing.bezier(0.4, 0, 0.2, 1),
  reduceMotion: ReduceMotion.System, // jumps to target under Reduce Motion (track colour still conveys state)
};
const THUMB_TRAVEL = 20;

// Function-form style is dropped by react-native-css when className is set (fact 12); web-only keys stripped like Checkbox does.
type SwitchProps = Omit<React.ComponentProps<typeof SwitchPrimitives.Root>, 'style' | 'asChild' | 'onKeyDown' | 'onKeyUp'> & { style?: StyleProp<ViewStyle> };

function Switch({ className, ...props }: SwitchProps) {
  const offset = useSharedValue(props.checked ? THUMB_TRAVEL : 0);

  React.useEffect(() => {
    offset.value = withTiming(props.checked ? THUMB_TRAVEL : 0, SLIDE);
  }, [offset, props.checked]);

  const thumb = useAnimatedStyle(() => ({ transform: [{ translateX: offset.value }] }));

  return (
    <SwitchPrimitives.Root
      hitSlop={12}
      className={cn(
        'h-6 w-11 shrink-0 flex-row items-center rounded-full border-2 border-transparent',
        props.checked ? 'bg-primary' : 'bg-input',
        props.disabled && 'opacity-50',
        className,
      )}
      {...props}>
      <Animated.View testID="switch-thumb" className="h-5 w-5 rounded-full bg-background shadow-lg" style={thumb} />
    </SwitchPrimitives.Root>
  );
}

export { Switch };
export type { SwitchProps };
