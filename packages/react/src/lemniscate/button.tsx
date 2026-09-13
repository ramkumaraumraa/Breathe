import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "../lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-[background-color,color,border-color,box-shadow,transform,opacity] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:translate-y-px disabled:pointer-events-none disabled:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border border-transparent bg-[var(--color-primary-500)] text-white shadow-sm hover:bg-[var(--color-primary-600)] hover:shadow-brand active:bg-[var(--color-primary-700)] disabled:bg-[var(--color-neutral-white-100)] disabled:text-[var(--color-neutral-black-500)]",
        gradient:
          "border border-transparent bg-gradient-brand text-white shadow-sm hover:brightness-[1.03] hover:shadow-brand active:brightness-[0.94] disabled:bg-none disabled:bg-[var(--color-neutral-white-100)] disabled:text-[var(--color-neutral-black-500)]",
        destructive:
          "border border-transparent bg-[var(--color-negative-500)] text-white shadow-sm hover:bg-[var(--color-negative-600)] active:bg-[var(--color-negative-700)] disabled:bg-[var(--color-neutral-white-100)] disabled:text-[var(--color-neutral-black-500)]",
        outline:
          "border border-[color:var(--color-primary-500)] bg-[var(--color-neutral-white-25)] text-[var(--color-primary-500)] hover:bg-[var(--color-primary-25)] active:bg-[var(--color-primary-50)] disabled:border-[var(--color-neutral-white-200)] disabled:text-[var(--color-neutral-black-500)]",
        brandOutline:
          "border-[0.7px] border-[color:var(--color-neutral-white-300)] bg-transparent text-[var(--color-neutral-black-975)] hover:border-[var(--color-neutral-black-500)] hover:bg-[var(--color-neutral-white-50)] active:bg-[var(--color-neutral-white-75)] disabled:border-[var(--color-neutral-white-200)] disabled:text-[var(--color-neutral-black-500)]",
        secondary:
          "border border-transparent bg-[var(--color-neutral-white-50)] text-[var(--color-neutral-black-975)] hover:bg-[var(--color-neutral-white-75)] active:bg-[var(--color-neutral-white-100)] disabled:bg-[var(--color-neutral-white-50)] disabled:text-[var(--color-neutral-black-500)]",
        ghost:
          "border border-transparent bg-transparent text-[var(--color-primary-500)] hover:bg-[var(--color-primary-25)] active:bg-[var(--color-primary-50)] disabled:text-[var(--color-neutral-black-500)]",
        link:
          "border border-transparent bg-transparent px-0 text-[var(--color-primary-500)] underline-offset-4 hover:text-[var(--color-primary-600)] hover:underline active:text-[var(--color-primary-700)] disabled:text-[var(--color-neutral-black-500)]",
        success:
          "border border-transparent bg-[var(--color-positive-500)] text-white shadow-sm hover:bg-[var(--color-positive-600)] active:bg-[var(--color-positive-700)] disabled:bg-[var(--color-neutral-white-100)] disabled:text-[var(--color-neutral-black-500)]",
        warning:
          "border border-transparent bg-[var(--color-alert-500)] text-white shadow-sm hover:bg-[var(--color-alert-600)] active:bg-[var(--color-alert-700)] disabled:bg-[var(--color-neutral-white-100)] disabled:text-[var(--color-neutral-black-500)]",
        danger:
          "border border-transparent bg-[var(--color-negative-500)] text-white shadow-sm hover:bg-[var(--color-negative-600)] active:bg-[var(--color-negative-700)] disabled:bg-[var(--color-neutral-white-100)] disabled:text-[var(--color-neutral-black-500)]",
        info:
          "border border-transparent bg-[var(--color-secondary-500)] text-white shadow-sm hover:bg-[var(--color-secondary-600)] active:bg-[var(--color-secondary-700)] disabled:bg-[var(--color-neutral-white-100)] disabled:text-[var(--color-neutral-black-500)]",
        neutral:
          "border border-[color:var(--color-neutral-black-25)] bg-[var(--color-neutral-white-25)] text-[var(--color-neutral-black-975)] hover:border-[var(--color-neutral-black-500)] hover:bg-[var(--color-neutral-white-50)] active:bg-[var(--color-neutral-white-75)] disabled:border-[var(--color-neutral-white-200)] disabled:text-[var(--color-neutral-black-500)]",
      },
      size: {
        default: "h-11 gap-2 rounded-lg px-4 text-sm [&_svg]:size-4",
        xs: "h-7 gap-1.5 rounded-md px-2.5 text-[11px] [&_svg]:size-3.5",
        sm: "h-9 gap-1.5 rounded-md px-3.5 text-xs [&_svg]:size-4",
        lg: "h-12 gap-2 rounded-lg px-5 text-sm [&_svg]:size-4",
        xl: "h-14 gap-2.5 rounded-xl px-6 text-base [&_svg]:size-5",
        xxl: "h-16 gap-3 rounded-xl px-7 text-base [&_svg]:size-5",
        icon: "h-11 w-11 rounded-lg p-0 [&_svg]:size-4",
        "icon-sm": "h-9 w-9 rounded-md p-0 [&_svg]:size-4",
        "icon-xs": "h-7 w-7 rounded-md p-0 [&_svg]:size-3.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      leftIcon,
      rightIcon,
      loading = false,
      loadingText,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;
    const isIconOnly = !children && !!(leftIcon || rightIcon || loading);
    const resolvedSize = isIconOnly && (size == null || size === "default") ? "icon" : size;
    const usesButtonVisualSlots = loading || !!leftIcon || !!rightIcon;
    const iconClassName = cn("inline-flex items-center justify-center", loading && "animate-spin");
    const leftVisual = loading ? <Loader2 aria-hidden="true" /> : leftIcon;
    const label = loading && loadingText ? loadingText : children;

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size: resolvedSize, className }),
          variant === "link" && !isIconOnly && "h-auto",
          loading && "cursor-progress",
        )}
        ref={ref}
        disabled={isDisabled}
        data-loading={loading ? "true" : undefined}
        {...props}
      >
        {usesButtonVisualSlots ? (
          <>
            {leftVisual ? <span className={iconClassName}>{leftVisual}</span> : null}
            {label ? <span>{label}</span> : null}
            {!loading && rightIcon ? <span className="inline-flex items-center justify-center">{rightIcon}</span> : null}
          </>
        ) : (
          children
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
