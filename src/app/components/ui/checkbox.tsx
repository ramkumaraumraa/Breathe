import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/app/components/ui/utils";

const Checkbox = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <span className="relative inline-flex h-4 w-4 shrink-0">
      <input
        ref={ref}
        type="checkbox"
        className={cn(
          "peer h-4 w-4 shrink-0 appearance-none rounded-[3px] border border-primary bg-background ring-offset-background checked:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
      <Check className="pointer-events-none absolute inset-0 h-4 w-4 text-primary-foreground opacity-0 peer-checked:opacity-100" />
    </span>
  ),
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
