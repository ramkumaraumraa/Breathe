import NativeSlider from '@react-native-community/slider';
import { styled } from 'nativewind';
import * as React from 'react';
import { Platform } from 'react-native';
import { useThemeColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

// className on the third-party slider is a no-op on device unless wrapped: react-native-css
// only patches core RN components, not arbitrary third-party ones (icon.tsx does the same).
const StyledSlider = styled(NativeSlider);

type SliderProps = {
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  onValueCommit?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
  accessibilityLabel?: string;
};

/** Web Radix API (arrays), one thumb, backed by the native OS slider. */
function Slider({
  value,
  defaultValue,
  onValueChange,
  onValueCommit,
  min = 0,
  max = 100,
  step = 1,
  disabled,
  className,
  accessibilityLabel,
}: SliderProps) {
  const colors = useThemeColors();
  return (
    <StyledSlider
      className={cn('h-5 w-full', disabled && 'opacity-50', className)}
      value={(value ?? defaultValue)?.[0] ?? min}
      minimumValue={min}
      maximumValue={max}
      step={step}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel}
      minimumTrackTintColor={colors.primary}
      maximumTrackTintColor={colors.secondary}
      thumbTintColor={Platform.OS === 'android' ? colors.primary : undefined}
      onValueChange={(v: number) => onValueChange?.([v])}
      onSlidingComplete={(v: number) => onValueCommit?.([v])}
    />
  );
}

export { Slider };
export type { SliderProps };
