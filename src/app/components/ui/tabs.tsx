import * as React from "react";

import { cn } from "@/app/components/ui/utils";
import { useRovingTabIndex } from "@/app/components/ui/use-roving-tabindex";

interface TabsContextValue {
  value: string;
  setValue: (value: string) => void;
}
const TabsContext = React.createContext<TabsContextValue | null>(null);

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ value, defaultValue = "", onValueChange, children, ...props }, ref) => {
    const [uncontrolled, setUncontrolled] = React.useState(defaultValue);
    const isControlled = value !== undefined;
    const current = isControlled ? value : uncontrolled;
    const setValue = (v: string) => {
      if (!isControlled) setUncontrolled(v);
      onValueChange?.(v);
    };
    return (
      <TabsContext.Provider value={{ value: current, setValue }}>
        <div ref={ref} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);
Tabs.displayName = "Tabs";

const TabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, forwardedRef) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    useRovingTabIndex(containerRef);
    React.useImperativeHandle(forwardedRef, () => containerRef.current as HTMLDivElement);
    return (
      <div
        ref={containerRef}
        role="tablist"
        className={cn("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground", className)}
        {...props}
      />
    );
  },
);
TabsList.displayName = "TabsList";

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

// WAI-ARIA "automatic activation" tablist: moving focus with arrow keys
// (handled by useRovingTabIndex) also selects the tab, via onFocus.
const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, onClick, onFocus, disabled, ...props }, ref) => {
    const ctx = React.useContext(TabsContext);
    const active = ctx?.value === value;
    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        data-roving-item
        tabIndex={-1}
        disabled={disabled}
        aria-selected={active}
        data-state={active ? "active" : "inactive"}
        onClick={(e) => {
          onClick?.(e);
          ctx?.setValue(value);
        }}
        onFocus={(e) => {
          onFocus?.(e);
          if (!disabled) ctx?.setValue(value);
        }}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        {...props}
      />
    );
  },
);
TabsTrigger.displayName = "TabsTrigger";

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(({ className, value, ...props }, ref) => {
  const ctx = React.useContext(TabsContext);
  if (ctx?.value !== value) return null;
  return (
    <div
      ref={ref}
      role="tabpanel"
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    />
  );
});
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
