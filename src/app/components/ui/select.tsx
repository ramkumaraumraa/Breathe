import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/app/components/ui/utils";

// Native <select> is a single flat control — Radix's Trigger/Content/Value
// compound structure doesn't map onto it, so the API is flatter here: pass
// `placeholder` directly and use SelectItem as the only child type.
interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "value" | "defaultValue" | "onChange"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, value, defaultValue, onValueChange, placeholder, children, ...props }, ref) => (
    <span className="relative inline-flex w-full items-center">
      <select
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        onChange={(e) => onValueChange?.(e.target.value)}
        className={cn(
          "flex h-10 w-full appearance-none items-center rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled hidden={value !== undefined || defaultValue !== undefined}>
            {placeholder}
          </option>
        )}
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 opacity-50" />
    </span>
  ),
);
Select.displayName = "Select";

const SelectItem = React.forwardRef<HTMLOptionElement, React.OptionHTMLAttributes<HTMLOptionElement>>(
  ({ className, ...props }, ref) => <option ref={ref} className={className} {...props} />,
);
SelectItem.displayName = "SelectItem";

export { Select, SelectItem };
