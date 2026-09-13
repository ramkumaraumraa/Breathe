import * as SelectPrimitive from '@rn-primitives/select';
import Check from 'lucide-react-native/icons/check';
import ChevronDown from 'lucide-react-native/icons/chevron-down';
import * as React from 'react';
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { FadeIn, FadeOut, ReduceMotion } from 'react-native-reanimated';
import { FullWindowOverlay as RNFullWindowOverlay } from 'react-native-screens';
import { NativeOnlyAnimatedView } from '../../lib/native-only-animated-view';
import { cn } from '../../lib/utils';
import { Icon } from '../icon';
import { TextClassContext, wrapTextChildren } from '../text';

type Option = SelectPrimitive.Option;

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;

function SelectValue({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Value> & { className?: string }) {
  // Web renders the placeholder in foreground too (see task note).
  return <SelectPrimitive.Value className={cn('font-sans text-sm text-foreground', className)} numberOfLines={1} {...props} />;
}

// Trigger is Pressable-based; function-form style is dropped by react-native-css when className is set (fact 12); web-only keys stripped like Checkbox does.
type SelectTriggerProps = Omit<React.ComponentProps<typeof SelectPrimitive.Trigger>, 'style' | 'children' | 'asChild' | 'onKeyDown' | 'onKeyUp'> & {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

function SelectTrigger({ className, children, ...props }: SelectTriggerProps) {
  const { disabled: rootDisabled } = SelectPrimitive.useRootContext();
  const disabled = props.disabled ?? rootDisabled;
  return (
    <SelectPrimitive.Trigger
      className={cn(
        'h-10 w-full flex-row items-center justify-between rounded-md border border-input bg-background px-3 py-2',
        disabled && 'opacity-50',
        className,
      )}
      {...props}>
      {wrapTextChildren(children)}
      <Icon as={ChevronDown} size={16} className="opacity-50" />
    </SelectPrimitive.Trigger>
  );
}

const FullWindowOverlay = Platform.OS === 'ios' ? RNFullWindowOverlay : React.Fragment;

function SelectContent({
  className,
  children,
  position = 'popper',
  portalHost,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content> & { className?: string; portalHost?: string }) {
  return (
    <SelectPrimitive.Portal hostName={portalHost}>
      <FullWindowOverlay>
        <SelectPrimitive.Overlay style={StyleSheet.absoluteFill} asChild>
          <NativeOnlyAnimatedView
            className="z-50"
            entering={FadeIn.reduceMotion(ReduceMotion.System)}
            exiting={FadeOut.reduceMotion(ReduceMotion.System)}
            as="Pressable">
            <TextClassContext.Provider value="text-popover-foreground">
              <SelectPrimitive.Content
                className={cn(
                  'relative z-50 max-h-96 min-w-[128px] overflow-hidden rounded-md border border-border bg-popover shadow-md',
                  className,
                )}
                position={position}
                {...props}>
                <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
              </SelectPrimitive.Content>
            </TextClassContext.Provider>
          </NativeOnlyAnimatedView>
        </SelectPrimitive.Overlay>
      </FullWindowOverlay>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      className={cn('py-1.5 pl-8 pr-2 font-sans text-sm font-semibold text-popover-foreground', className)}
      {...props}
    />
  );
}

// Item is Pressable-based; function-form style is dropped by react-native-css when className is set (fact 12); web-only keys stripped like Checkbox does.
type SelectItemProps = Omit<React.ComponentProps<typeof SelectPrimitive.Item>, 'style' | 'asChild' | 'onKeyDown' | 'onKeyUp'> & { style?: StyleProp<ViewStyle> };

function SelectItem({ className, ...props }: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      className={cn(
        'group relative w-full flex-row items-center rounded-sm py-1.5 pl-8 pr-2 active:bg-accent',
        props.disabled && 'opacity-50',
        className,
      )}
      {...props}>
      <View className="absolute left-2 h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Icon as={Check} size={16} />
        </SelectPrimitive.ItemIndicator>
      </View>
      <SelectPrimitive.ItemText className="font-sans text-sm text-popover-foreground group-active:text-accent-foreground" />
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return <SelectPrimitive.Separator className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />;
}

export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue };
export type { Option, SelectItemProps, SelectTriggerProps };
