import * as ToggleGroupPrimitive from '@rn-primitives/toggle-group';
import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../lib/utils';
import { TextClassContext, wrapTextChildren } from '../text';
import { toggleTextClass, toggleVariants } from './toggle';

type ToggleVariantProps = VariantProps<typeof toggleVariants>;

const ToggleGroupContext = React.createContext<ToggleVariantProps>({ size: 'default', variant: 'default' });

// Root's props are a `type: 'single' | 'multiple'` discriminated union; plain `Omit` collapses it
// (Omit isn't distributive), which breaks the `value`/`onValueChange` pairing. Distribute over it instead.
type DistributiveOmit<T, K extends keyof any> = T extends unknown ? Omit<T, K> : never;

// Root is View-based: no function-form style, no web-only key handlers to strip.
type ToggleGroupProps = DistributiveOmit<React.ComponentProps<typeof ToggleGroupPrimitive.Root>, 'asChild'> & ToggleVariantProps;
// Item is Pressable-based; function-form style is dropped by react-native-css when className is set (fact 12); web-only keys stripped like Toggle does.
type ToggleGroupItemProps = Omit<React.ComponentProps<typeof ToggleGroupPrimitive.Item>, 'style' | 'children' | 'asChild' | 'onKeyDown' | 'onKeyUp'> &
  ToggleVariantProps & { style?: StyleProp<ViewStyle>; children?: React.ReactNode };

function ToggleGroup({ className, variant, size, children, ...props }: ToggleGroupProps) {
  return (
    <ToggleGroupPrimitive.Root className={cn('flex-row items-center justify-center gap-1', className)} {...props}>
      <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

function ToggleGroupItem({ className, children, variant, size, ...props }: ToggleGroupItemProps) {
  const context = React.useContext(ToggleGroupContext);
  // @rn-primitives/toggle-group's useRootContext() (unlike radio-group's) exposes the group's `disabled`,
  // so items can dim themselves without a private context duplicate.
  const { value, disabled: groupDisabled } = ToggleGroupPrimitive.useRootContext();
  const selected = ToggleGroupPrimitive.utils.getIsSelected(value, props.value);
  const disabled = groupDisabled || props.disabled;
  const content = wrapTextChildren(children);

  return (
    <TextClassContext.Provider value={toggleTextClass(selected)}>
      <ToggleGroupPrimitive.Item
        className={cn(
          toggleVariants({ variant: context.variant || variant, size: context.size || size }),
          selected && 'bg-accent',
          disabled && 'opacity-50',
          className,
        )}
        {...props}>
        {content}
      </ToggleGroupPrimitive.Item>
    </TextClassContext.Provider>
  );
}

export { ToggleGroup, ToggleGroupItem };
export type { ToggleGroupItemProps, ToggleGroupProps };
