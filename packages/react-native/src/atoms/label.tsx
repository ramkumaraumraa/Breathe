import * as LabelPrimitive from '@rn-primitives/label';
import * as React from 'react';
import { cn } from '../lib/utils';

type LabelProps = React.ComponentProps<typeof LabelPrimitive.Text>;

function Label({ className, onPress, onLongPress, onPressIn, onPressOut, disabled, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      className={cn('flex-row items-center', disabled && 'opacity-70')}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled}>
      <LabelPrimitive.Text
        className={cn('font-sans text-sm font-medium leading-none text-foreground', className)}
        {...props}
      />
    </LabelPrimitive.Root>
  );
}

export { Label };
export type { LabelProps };
