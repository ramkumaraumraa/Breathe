import * as React from "react";

import { Slot } from "@/app/components/ui/slot";

interface CollapsibleContextValue {
  open: boolean;
  toggle: () => void;
}
const CollapsibleContext = React.createContext<CollapsibleContextValue | null>(null);

interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ open, defaultOpen = false, onOpenChange, children, ...props }, ref) => {
    const [uncontrolled, setUncontrolled] = React.useState(defaultOpen);
    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : uncontrolled;

    const toggle = () => {
      if (!isControlled) setUncontrolled((prev) => !prev);
      onOpenChange?.(!isOpen);
    };

    return (
      <CollapsibleContext.Provider value={{ open: isOpen, toggle }}>
        <div ref={ref} {...props}>
          {children}
        </div>
      </CollapsibleContext.Provider>
    );
  },
);
Collapsible.displayName = "Collapsible";

interface CollapsibleTriggerProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  asChild?: boolean;
  children: React.ReactElement<any>;
}

const CollapsibleTrigger = React.forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  ({ asChild = false, onClick, children, ...props }, ref) => {
    const ctx = React.useContext(CollapsibleContext);
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : "button"}
        aria-expanded={ctx?.open}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          onClick?.(e);
          ctx?.toggle();
        }}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);
CollapsibleTrigger.displayName = "CollapsibleTrigger";

const CollapsibleContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, ...props }, ref) => {
    const ctx = React.useContext(CollapsibleContext);
    if (!ctx?.open) return null;
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    );
  },
);
CollapsibleContent.displayName = "CollapsibleContent";

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
