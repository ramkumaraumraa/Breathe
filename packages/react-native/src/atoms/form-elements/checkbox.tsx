import * as CheckboxPrimitive from '@rn-primitives/checkbox';
import Check from 'lucide-react-native/icons/check';
import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../lib/utils';
import { Icon } from '../icon';

// Function-form style is dropped by react-native-css when className is set (fact 12); web-only keys stripped like Label does.
type CheckboxProps = Omit<React.ComponentProps<typeof CheckboxPrimitive.Root>, 'style' | 'asChild' | 'onKeyDown' | 'onKeyUp'> & { style?: StyleProp<ViewStyle> };

function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      hitSlop={{ top: 4, bottom: 4, left: 12, right: 12 }}
      className={cn(
        'h-4 w-4 shrink-0 overflow-hidden rounded-[3px] border border-primary',
        props.checked && 'bg-primary',
        props.disabled && 'opacity-50',
        className,
      )}
      {...props}>
      <CheckboxPrimitive.Indicator className="h-full w-full items-center justify-center">
        <Icon as={Check} size={14} className="text-primary-foreground" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
export type { CheckboxProps };
