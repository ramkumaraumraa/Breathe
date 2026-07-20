import * as React from "react";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/app/components/ui/utils";
import { toggleVariants } from "@/app/components/ui/toggle";
import { useRovingTabIndex } from "@/app/components/ui/use-roving-tabindex";

interface ToggleGroupContextValue extends VariantProps<typeof toggleVariants> {
  type: "single" | "multiple";
  value: string[];
  toggleValue: (value: string) => void;
}
const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  type: "single",
  value: [],
  toggleValue: () => {},
  size: "default",
  variant: "default",
});

function toArray(value: string | string[] | undefined): string[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

interface ToggleGroupProps extends VariantProps<typeof toggleVariants>, React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
}

const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ className, variant, size, type = "single", value, defaultValue, onValueChange, children, ...props }, forwardedRef) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    useRovingTabIndex(containerRef);
    React.useImperativeHandle(forwardedRef, () => containerRef.current as HTMLDivElement);

    const [uncontrolled, setUncontrolled] = React.useState(() => toArray(defaultValue));
    const isControlled = value !== undefined;
    const current = isControlled ? toArray(value) : uncontrolled;

    const toggleValue = (v: string) => {
      const next = type === "single" ? (current.includes(v) ? [] : [v]) : current.includes(v) ? current.filter((x) => x !== v) : [...current, v];
      if (!isControlled) setUncontrolled(next);
      onValueChange?.(type === "single" ? (next[0] ?? "") : next);
    };

    return (
      <ToggleGroupContext.Provider value={{ type, value: current, toggleValue, variant, size }}>
        <div ref={containerRef} role="group" className={cn("flex items-center justify-center gap-1", className)} {...props}>
          {children}
        </div>
      </ToggleGroupContext.Provider>
    );
  },
);
ToggleGroup.displayName = "ToggleGroup";

interface ToggleGroupItemProps extends VariantProps<typeof toggleVariants>, React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const ToggleGroupItem = React.forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  ({ className, children, value, variant, size, onClick, ...props }, ref) => {
    const ctx = React.useContext(ToggleGroupContext);
    const pressed = ctx.value.includes(value);

    return (
      <button
        ref={ref}
        type="button"
        data-roving-item
        tabIndex={-1}
        aria-pressed={pressed}
        data-state={pressed ? "on" : "off"}
        onClick={(e) => {
          onClick?.(e);
          ctx.toggleValue(value);
        }}
        className={cn(toggleVariants({ variant: ctx.variant || variant, size: ctx.size || size }), className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);
ToggleGroupItem.displayName = "ToggleGroupItem";

export { ToggleGroup, ToggleGroupItem };
