import * as LabelPrimitive from '@rn-primitives/label';
import * as React from 'react';
import { cn } from '../lib/utils';
import { Text } from './text';

type LabelProps = Omit<React.ComponentProps<typeof LabelPrimitive.Text>, 'htmlFor'>;

function Label({ className, onPress, onLongPress, onPressIn, onPressOut, disabled, accessible, accessibilityHint, ...props }: LabelProps) {
  const text = <Text className={cn('text-sm font-medium leading-none', disabled && 'opacity-70', className)} {...props} />;
  // Plain caption: no focus stop and no responder, so a parent row still gets the tap.
  if (!onPress && !onLongPress) return text;
  return (
    <LabelPrimitive.Root
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled}
      accessible={accessible}
      accessibilityHint={accessibilityHint}>
      {text}
    </LabelPrimitive.Root>
  );
}

export { Label };
export type { LabelProps };
