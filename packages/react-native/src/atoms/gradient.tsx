import * as React from 'react';
import { View } from 'react-native';
import { cn } from '../lib/utils';

/** Web: .bg-gradient-brand in Leminiscate src/index.css, hsl(193 66% 54%) to hsl(221 84% 53%) at 135deg. */
const BRAND_GRADIENT = 'linear-gradient(135deg, #3cb6d7 0%, #2262ec 100%)';

type GradientProps = React.ComponentProps<typeof View> & { gradient?: string };

/**
 * Static gradient layer, by default absolutely filling its parent (give the parent `overflow-hidden`
 * and a radius). Never make this an Animated view (reanimated#8297). Animate a parent instead.
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
