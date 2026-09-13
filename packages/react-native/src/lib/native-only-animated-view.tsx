import * as React from 'react';
import { Platform, Pressable } from 'react-native';
import Animated from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/** From react-native-reusables: animates on native, renders children as-is on web. */
function NativeOnlyAnimatedView(
  props:
    | (React.ComponentProps<typeof Animated.View> & { as?: 'View' })
    | (React.ComponentProps<typeof AnimatedPressable> & { as: 'Pressable' }),
) {
  if (Platform.OS === 'web') {
    return <>{props.children as React.ReactNode}</>;
  }
  if (props.as === 'Pressable') {
    const { as: _as, ...rest } = props;
    return <AnimatedPressable {...(rest as any)} />;
  }
  const { as: _as, ...rest } = props;
  return <Animated.View {...(rest as any)} />;
}

export { NativeOnlyAnimatedView };
