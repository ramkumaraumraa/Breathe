import * as React from 'react';
import { View } from 'react-native';
import { cn } from '../lib/utils';

/** Web: --gradient-brand in packages/react/styles/lemniscate.css; --gradient-start/--gradient-end from styles/lemniscate.css (tokens). */
const BRAND_GRADIENT = 'linear-gradient(135deg, #1c60c1 0%, #40aad4 100%)';

type GradientProps = React.ComponentProps<typeof View> & { gradient?: string };

/**
 * Static gradient layer, by default absolutely filling its parent (give the parent `overflow-hidden`
 * and a radius). Never make this an Animated view (reanimated#8297), and don't give it `animate-*` or
 * `transition-*` classes (react-native-css would wrap it in a Reanimated view). Animate a parent instead.
 */
function Gradient({ gradient = BRAND_GRADIENT, className, style, ...props }: GradientProps) {
  return (
    <View
      pointerEvents="none"
      className={cn('absolute inset-0', className)}
      style={[{ experimental_backgroundImage: gradient }, style]}
      {...props}
    />
  );
}

export { BRAND_GRADIENT, Gradient };
export type { GradientProps };
