import * as TogglePrimitive from '@rn-primitives/toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../lib/utils';
import { Text, TextClassContext } from '../text';

const toggleVariants = cva('flex-row items-center justify-center gap-2 rounded-md active:bg-muted', {
  variants: {
    variant: {
      default: 'bg-transparent',
      outline: 'border border-input bg-transparent active:bg-accent',
    },
    size: {
      default: 'h-10 px-3',
      sm: 'h-9 px-2.5',
      lg: 'h-11 px-5',
    },
  },
  defaultVariants: { variant: 'default', size: 'default' },
});

function toggleTextClass(on: boolean) {
  return cn('text-sm font-medium text-foreground', on && 'text-accent-foreground');
}

// Function-form style is dropped by react-native-css when className is set (fact 12); web-only keys stripped like Checkbox/Switch do.
type ToggleProps = Omit<React.ComponentProps<typeof TogglePrimitive.Root>, 'style' | 'asChild' | 'onKeyDown' | 'onKeyUp'> &
  VariantProps<typeof toggleVariants> & { style?: StyleProp<ViewStyle> };

function Toggle({ className, variant, size, children, ...props }: ToggleProps) {
  const content = typeof children === 'string' ? <Text>{children}</Text> : children;
  return (
    <TextClassContext.Provider value={toggleTextClass(!!props.pressed)}>
      <TogglePrimitive.Root
        className={cn(
          toggleVariants({ variant, size }),
          props.pressed && 'bg-accent',
          props.disabled && 'opacity-50',
          className,
        )}
        {...props}>
        {content}
      </TogglePrimitive.Root>
    </TextClassContext.Provider>
  );
}

export { Toggle, toggleTextClass, toggleVariants };
export type { ToggleProps };
