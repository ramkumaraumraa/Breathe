import * as React from "react";

import { cn } from "@/app/components/ui/utils";

interface ProgressProps extends Omit<React.ProgressHTMLAttributes<HTMLProgressElement>, "value" | "max"> {
  value?: number;
}

// ponytail: indeterminate (no value) styling is the browser's own animation and
// differs by browser — acceptable for now, revisit if design wants a unified look.
const Progress = React.forwardRef<HTMLProgressElement, ProgressProps>(({ className, value, ...props }, ref) => (
  <progress
    ref={ref}
    value={value}
    max={100}
    className={cn(
      "h-2 w-full appearance-none overflow-hidden rounded-full bg-secondary",
      "[&::-webkit-progress-bar]:bg-transparent [&::-webkit-progress-bar]:rounded-full",
      "[&::-webkit-progress-value]:bg-gradient-brand [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:transition-all [&::-webkit-progress-value]:duration-500",
      "[&::-moz-progress-bar]:bg-gradient-brand [&::-moz-progress-bar]:rounded-full",
      className,
    )}
    {...props}
  />
));
Progress.displayName = "Progress";

export { Progress };
