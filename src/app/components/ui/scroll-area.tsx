import * as React from "react";

import { cn } from "@/app/components/ui/utils";

const ScrollArea = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative overflow-auto [scrollbar-width:thin] [scrollbar-color:var(--border)_transparent]",
        "[&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar]:h-2.5",
        "[&::-webkit-scrollbar-track]:bg-transparent",
        "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);
ScrollArea.displayName = "ScrollArea";

export { ScrollArea };
