import * as CheckboxPrimitive from '@rn-primitives/checkbox';
import Check from 'lucide-react-native/icons/check';
import * as React from 'react';
import { cn } from '../../lib/utils';
import { Icon } from '../icon';

type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root>;

function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      hitSlop={24}
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
