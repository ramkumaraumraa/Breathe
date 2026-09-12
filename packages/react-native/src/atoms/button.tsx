import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../lib/utils';
import { BRAND_GRADIENT } from './gradient';
import { IconSizeContext } from './icon';
import { Spinner } from './spinner';
import { TextClassContext, wrapTextChildren } from './text';

// Container: bg, border, radius, height, press state. Web hover:* dropped (touch).
const containerVariants = cva('shrink-0 flex-row items-center justify-center active:translate-y-px', {
  variants: {
    variant: {
      default: 'border border-transparent bg-primary-500 shadow-sm active:bg-primary-700',
      gradient: 'border border-transparent shadow-sm overflow-hidden',
      destructive: 'border border-transparent bg-negative-500 shadow-sm active:bg-negative-700',
      outline: 'border border-primary-500 bg-neutral-white-25 active:bg-primary-50',
      brandOutline: 'border-[0.7px] border-neutral-white-300 bg-transparent active:bg-neutral-white-75',
      secondary: 'border border-transparent bg-neutral-white-50 active:bg-neutral-white-100',
      ghost: 'border border-transparent bg-transparent active:bg-primary-50',
      link: 'border border-transparent bg-transparent px-0', // web keeps the size's px-4 after twMerge too; parity
      success: 'border border-transparent bg-positive-500 shadow-sm active:bg-positive-700',
      warning: 'border border-transparent bg-alert-500 shadow-sm active:bg-alert-700',
      danger: 'border border-transparent bg-negative-500 shadow-sm active:bg-negative-700',
      info: 'border border-transparent bg-secondary-500 shadow-sm active:bg-secondary-700',
      neutral: 'border border-neutral-black-25 bg-neutral-white-25 active:bg-neutral-white-75',
    },
    size: {
      default: 'h-11 gap-2 rounded-lg px-4',
      xs: 'h-7 gap-1.5 rounded-md px-2.5',
      sm: 'h-9 gap-1.5 rounded-md px-3.5',
      lg: 'h-12 gap-2 rounded-lg px-5',
      xl: 'h-14 gap-2.5 rounded-xl px-6',
      xxl: 'h-16 gap-3 rounded-xl px-7',
      icon: 'h-11 w-11 rounded-lg p-0',
      'icon-sm': 'h-9 w-9 rounded-md p-0',
      'icon-xs': 'h-7 w-7 rounded-md p-0',
    },
    disabled: { true: 'shadow-none', false: '' },
  },
  compoundVariants: [
    { variant: ['default', 'gradient', 'destructive', 'success', 'warning', 'danger', 'info'], disabled: true, className: 'bg-neutral-white-100' },
    { variant: ['outline', 'brandOutline', 'neutral'], disabled: true, className: 'border-neutral-white-200' },
    { variant: 'secondary', disabled: true, className: 'bg-neutral-white-50' },
  ],
  defaultVariants: { variant: 'default', size: 'default', disabled: false },
});

// Merged, so the disabled fill/shadow win over the variant's (web merges inside Button via cn; native
// consumers may apply buttonVariants() to e.g. a Link, so the exported function must already be merged).
const buttonVariants = (props?: Parameters<typeof containerVariants>[0]) => cn(containerVariants(props));

// Label: web puts these on <button>; RN needs them on Text (R10).
const buttonTextVariants = cva('font-medium', {
  variants: {
    variant: {
      default: 'text-white',
      gradient: 'text-white',
      destructive: 'text-white',
      outline: 'text-primary-500',
      brandOutline: 'text-neutral-black-975',
      secondary: 'text-neutral-black-975',
      ghost: 'text-primary-500',
      link: 'text-primary-500',
      success: 'text-white',
      warning: 'text-white',
      danger: 'text-white',
      info: 'text-white',
      neutral: 'text-neutral-black-975',
    },
    size: {
      default: 'text-sm',
      xs: 'text-[11px]',
      sm: 'text-xs',
      lg: 'text-sm',
      xl: 'text-base',
      xxl: 'text-base',
      icon: 'text-sm',
      'icon-sm': 'text-sm',
      'icon-xs': 'text-[11px]',
    },
    pressed: { true: '', false: '' },
    disabled: { true: 'text-neutral-black-500', false: '' },
  },
  compoundVariants: [{ variant: 'link', pressed: true, disabled: false, className: 'text-primary-700 underline' }],
  defaultVariants: { variant: 'default', size: 'default', pressed: false, disabled: false },
});

const GRADIENT_STYLE = { experimental_backgroundImage: BRAND_GRADIENT };

// Web [&_svg]:size-* per size
const ICON_SIZE: Record<NonNullable<ButtonSize>, number> = {
  default: 16, xs: 14, sm: 16, lg: 16, xl: 20, xxl: 20, icon: 16, 'icon-sm': 16, 'icon-xs': 14,
};

// Bigger touch target than the visual box for the small/icon-only sizes (web has no equivalent; touch-only).
const HIT_SLOP: Partial<Record<NonNullable<ButtonSize>, number>> = { xs: 8, 'icon-xs': 8, sm: 4, 'icon-sm': 4 };

type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
type ButtonSize = VariantProps<typeof buttonVariants>['size'];

type ButtonProps = Omit<React.ComponentProps<typeof Pressable>, 'children' | 'disabled' | 'style'> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  children?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
  style?: StyleProp<ViewStyle>;
};

function Button({
  className,
  variant = 'default',
  size,
  disabled = false,
  children,
  leftIcon,
  rightIcon,
  loading = false,
  loadingText,
  accessibilityState,
  accessibilityLabel,
  style,
  ...props
}: ButtonProps) {
  // Not destructured above so it still lands in `...props` and reaches the Pressable.
  const ariaLabel = (props as { 'aria-label'?: string })['aria-label'];
  const isDisabled = disabled || loading;
  const isIconOnly = !children && !!(leftIcon || rightIcon || loading);
  const resolvedSize: NonNullable<ButtonSize> = isIconOnly && (size == null || size === 'default') ? 'icon' : size ?? 'default';
  const label = loading && loadingText ? loadingText : children;
  const content = wrapTextChildren(label, { numberOfLines: 1 });
  const isGradient = variant === 'gradient' && !isDisabled;

  if (__DEV__ && isIconOnly && !accessibilityLabel && !ariaLabel) {
    console.warn('Button: icon-only buttons need an accessibilityLabel');
  }

  return (
    <Pressable
      role="button"
      disabled={isDisabled}
      accessibilityState={{ ...accessibilityState, disabled: isDisabled, busy: loading }}
      accessibilityLabel={accessibilityLabel}
      className={cn(
        buttonVariants({ variant, size: resolvedSize, disabled: isDisabled }),
        variant === 'link' && !isIconOnly && 'h-auto',
        className,
      )}
      // Gradient painted on the Pressable itself so it renders under the transparent border like CSS
      // (a child layer would sit inside the border and Android clips it to the padding box). Never give
      // this Pressable transition-*/animate-* classes: Reanimated can't animate the gradient (reanimated#8297).
      style={isGradient ? [GRADIENT_STYLE, style] : style}
      hitSlop={HIT_SLOP[resolvedSize]}
      {...props}>
      {({ pressed }) => (
        <IconSizeContext.Provider value={ICON_SIZE[resolvedSize]}>
          <TextClassContext.Provider value={buttonTextVariants({ variant, size: resolvedSize, pressed, disabled: isDisabled })}>
            {isGradient && pressed && (
              <View
                testID="button-pressed-overlay"
                pointerEvents="none"
                className="absolute inset-0"
                style={{ backgroundColor: 'rgba(0,0,0,0.06)' }}
              />
            )}
            {/* accessible={false}: the Pressable already reports busy via its own accessibilityState */}
            {loading ? <Spinner accessible={false} /> : leftIcon}
            {content}
            {!loading && rightIcon}
          </TextClassContext.Provider>
        </IconSizeContext.Provider>
      )}
    </Pressable>
  );
}

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
