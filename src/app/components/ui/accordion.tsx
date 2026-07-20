import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/app/components/ui/utils";

interface AccordionContextValue {
  groupName?: string;
}
const AccordionContext = React.createContext<AccordionContextValue>({});

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  collapsible?: boolean;
}

// type="single" uses <details name> so the browser closes other items when one
// opens — no JS needed. type="multiple" omits the shared name.
const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, type = "single", collapsible: _collapsible, children, ...props }, ref) => {
    const generatedName = React.useId();
    return (
      <AccordionContext.Provider value={{ groupName: type === "single" ? generatedName : undefined }}>
        <div ref={ref} className={className} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  },
);
Accordion.displayName = "Accordion";

interface AccordionItemContextValue {
  disabled?: boolean;
}
const AccordionItemContext = React.createContext<AccordionItemContextValue>({});

interface AccordionItemProps extends React.HTMLAttributes<HTMLDetailsElement> {
  value: string;
  disabled?: boolean;
}

const AccordionItem = React.forwardRef<HTMLDetailsElement, AccordionItemProps>(
  ({ className, value, disabled, ...props }, ref) => {
    const { groupName } = React.useContext(AccordionContext);
    return (
      <AccordionItemContext.Provider value={{ disabled }}>
        <details ref={ref} name={groupName} data-value={value} className={cn("group border-b", className)} {...props} />
      </AccordionItemContext.Provider>
    );
  },
);
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, onClick, ...props }, ref) => {
    const { disabled } = React.useContext(AccordionItemContext);
    return (
      <summary
        ref={ref}
        className={cn(
          "flex flex-1 cursor-pointer list-none items-center justify-between py-4 font-medium transition-all [&::-webkit-details-marker]:hidden hover:underline",
          disabled && "pointer-events-none cursor-not-allowed opacity-50",
          className,
        )}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
            return;
          }
          onClick?.(e);
        }}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180" />
      </summary>
    );
  },
);
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("pb-4 pt-0 text-sm", className)} {...props}>
      {children}
    </div>
  ),
);
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
