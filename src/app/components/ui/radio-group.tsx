import * as React from "react";
import { Circle } from "lucide-react";

import { cn } from "@/app/components/ui/utils";

interface RadioGroupContextValue {
  name: string;
  value?: string;
  onValueChange?: (value: string) => void;
}
const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value, defaultValue, onValueChange, name, children, ...props }, ref) => {
    const generatedName = React.useId();
    const [uncontrolled, setUncontrolled] = React.useState(defaultValue);
    const isControlled = value !== undefined;
    const current = isControlled ? value : uncontrolled;

    const handleChange = (next: string) => {
      if (!isControlled) setUncontrolled(next);
      onValueChange?.(next);
    };

    return (
      <RadioGroupContext.Provider value={{ name: name ?? generatedName, value: current, onValueChange: handleChange }}>
        <div ref={ref} role="radiogroup" className={cn("grid gap-2", className)} {...props}>
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  },
);
RadioGroup.displayName = "RadioGroup";

interface RadioGroupItemProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value: string;
}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, value, ...props }, ref) => {
    const ctx = React.useContext(RadioGroupContext);
    return (
      <span className="relative inline-flex h-4 w-4 shrink-0">
        <input
          ref={ref}
          type="radio"
          name={ctx?.name}
          value={value}
          checked={ctx?.value !== undefined ? ctx.value === value : undefined}
          onChange={() => ctx?.onValueChange?.(value)}
          className={cn(
            "peer aspect-square h-4 w-4 shrink-0 appearance-none rounded-full border border-primary bg-background text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          {...props}
        />
        <Circle className="pointer-events-none absolute inset-0 m-auto h-2.5 w-2.5 fill-current text-current opacity-0 peer-checked:opacity-100" />
      </span>
    );
  },
);
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
