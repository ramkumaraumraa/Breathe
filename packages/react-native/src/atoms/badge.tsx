import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../lib/utils';
import { BRAND_GRADIENT } from './gradient';
import { TextClassContext, wrapTextChildren } from './text';

const badgeVariants = cva('flex-row items-center self-start rounded-full border px-2.5 py-0.5', {
  variants: {
    variant: {
      default: 'border-transparent bg-primary',
      secondary: 'border-transparent bg-secondary',
      destructive: 'border-transparent bg-destructive',
      outline: 'border-border',
      success: 'border-transparent bg-success-light',
      warning: 'border-transparent bg-warning-light',
      danger: 'border-transparent bg-danger-light',
      info: 'border-transparent bg-info-light',
      gradient: 'border-transparent',
      'super-admin': 'border-transparent bg-danger-light',
      admin: 'border-transparent bg-info-light',
      viewer: 'border-transparent bg-secondary',
    },
  },
  defaultVariants: { variant: 'default' },
});

const badgeTextVariants = cva('text-xs font-semibold', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      secondary: 'text-secondary-foreground',
      destructive: 'text-destructive-foreground',
      outline: 'text-foreground',
      success: 'text-success-dark',
      warning: 'text-warning-dark',
      danger: 'text-danger-dark',
      info: 'text-info-dark',
      gradient: 'text-primary-foreground',
      'super-admin': 'text-danger-dark',
      admin: 'text-info-dark',
      viewer: 'text-foreground-secondary',
    },
  },
  defaultVariants: { variant: 'default' },
});

type BadgeProps = Omit<React.ComponentProps<typeof View>, 'style'> &
  VariantProps<typeof badgeVariants> & { style?: StyleProp<ViewStyle>; textClassName?: string };

/**
 * self-start keeps the badge inline-sized in RN's stretching column layout (web `inline-flex`); in a
 * row next to taller content, add `self-center`.
 */
function Badge({ className, variant, children, style, textClassName, ...props }: BadgeProps) {
  const content = wrapTextChildren(children);
  // Gradient painted on the View (not a child layer) so it renders under the border; see Task 8 review.
  // Badge has `border` in its base classes; an absolutely positioned child sits inside the parent's
  // border and Android clips children to the padding box — painting the View's own background image
  // renders under its border, as in CSS (see button.tsx for the same pattern).
  const isGradient = variant === 'gradient';
  return (
    <TextClassContext.Provider value={cn(badgeTextVariants({ variant }), textClassName)}>
      <View
        className={cn(badgeVariants({ variant }), className)}
        style={isGradient ? [{ experimental_backgroundImage: BRAND_GRADIENT }, style] : style}
        {...props}>
        {content}
      </View>
    </TextClassContext.Provider>
  );
}

export { Badge, badgeTextVariants, badgeVariants };
export type { BadgeProps };
