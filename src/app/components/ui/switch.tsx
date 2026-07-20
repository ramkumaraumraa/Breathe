import * as React from "react";

import { cn } from "@/app/components/ui/utils";

const Switch = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <span className="relative inline-flex h-6 w-11 shrink-0">
      <input
        ref={ref}
        type="checkbox"
        role="switch"
        className={cn(
          "peer h-6 w-11 shrink-0 cursor-pointer appearance-none rounded-full border-2 border-transparent bg-input transition-colors checked:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
      <span className="pointer-events-none absolute left-0.5 top-0.5 block h-5 w-5 translate-x-0 rounded-full bg-background shadow-lg ring-0 transition-transform peer-checked:translate-x-5" />
    </span>
  ),
);
Switch.displayName = "Switch";

export { Switch };
