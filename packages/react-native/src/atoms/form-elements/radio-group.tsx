import * as RadioGroupPrimitive from '@rn-primitives/radio-group';
import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../lib/utils';

// Function-form style is dropped by react-native-css when className is set (fact 12); web-only keys stripped like Checkbox does.
type RadioGroupProps = Omit<React.ComponentProps<typeof RadioGroupPrimitive.Root>, 'style' | 'asChild' | 'onKeyDown' | 'onKeyUp'> & { style?: StyleProp<ViewStyle> };
type RadioGroupItemProps = Omit<React.ComponentProps<typeof RadioGroupPrimitive.Item>, 'style' | 'asChild' | 'onKeyDown' | 'onKeyUp'> & { style?: StyleProp<ViewStyle> };

function RadioGroup({ className, ...props }: RadioGroupProps) {
  return <RadioGroupPrimitive.Root className={cn('gap-2', className)} {...props} />;
}

function RadioGroupItem({ className, ...props }: RadioGroupItemProps) {
  return (
    <RadioGroupPrimitive.Item
      hitSlop={24}
      className={cn(
        'aspect-square h-4 w-4 shrink-0 items-center justify-center rounded-full border border-primary',
        props.disabled && 'opacity-50',
        className,
      )}
      {...props}>
      <RadioGroupPrimitive.Indicator testID="radio-indicator" className="h-2.5 w-2.5 rounded-full bg-primary" />
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
export type { RadioGroupProps, RadioGroupItemProps };
