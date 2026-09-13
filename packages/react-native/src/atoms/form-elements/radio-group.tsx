import * as RadioGroupPrimitive from '@rn-primitives/radio-group';
import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../lib/utils';

// Root is View-based: no function-form style, no web-only key handlers to strip.
type RadioGroupProps = Omit<React.ComponentProps<typeof RadioGroupPrimitive.Root>, 'asChild'>;
// Item is Pressable-based; function-form style is dropped by react-native-css when className is set (fact 12); web-only keys stripped like Checkbox does.
type RadioGroupItemProps = Omit<React.ComponentProps<typeof RadioGroupPrimitive.Item>, 'style' | 'asChild' | 'onKeyDown' | 'onKeyUp'> & { style?: StyleProp<ViewStyle> };

// rn-primitives keeps group `disabled` in a private context the Item primitive doesn't expose;
// mirror it here so RadioGroupItem can dim itself when the group (not just the item) is disabled.
const GroupDisabled = React.createContext(false);

function RadioGroup({ className, ...props }: RadioGroupProps) {
  return (
    <GroupDisabled.Provider value={!!props.disabled}>
      <RadioGroupPrimitive.Root className={cn('gap-2', className)} {...props} />
    </GroupDisabled.Provider>
  );
}

function RadioGroupItem({ className, ...props }: RadioGroupItemProps) {
  const disabled = React.useContext(GroupDisabled) || props.disabled;
  return (
    <RadioGroupPrimitive.Item
      hitSlop={4}
      className={cn(
        'aspect-square h-4 w-4 shrink-0 items-center justify-center rounded-full border border-primary',
        disabled && 'opacity-50',
        className,
      )}
      {...props}>
      <RadioGroupPrimitive.Indicator testID="radio-indicator" className="h-2.5 w-2.5 rounded-full bg-primary" />
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
export type { RadioGroupProps, RadioGroupItemProps };
