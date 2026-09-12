import * as React from 'react';
import type { TextInput, TextStyle } from 'react-native';
import { useThemeColors } from './theme';

type InputProps = React.ComponentProps<typeof TextInput>;

/** Web focus-visible:ring-2 ring-ring ring-offset-2 as RN outline props (New Architecture). */
export function useFocusRing(onFocus?: InputProps['onFocus'], onBlur?: InputProps['onBlur']) {
  const [focused, setFocused] = React.useState(false);
  const { ring } = useThemeColors();

  const handleFocus: NonNullable<InputProps['onFocus']> = (e) => {
    setFocused(true);
    onFocus?.(e);
  };
  const handleBlur: NonNullable<InputProps['onBlur']> = (e) => {
    setFocused(false);
    onBlur?.(e);
  };

  const ringStyle: TextStyle | undefined = focused
    ? { outlineWidth: 2, outlineOffset: 2, outlineStyle: 'solid', outlineColor: ring }
    : undefined;

  return { onFocus: handleFocus, onBlur: handleBlur, ringStyle, focused };
}
