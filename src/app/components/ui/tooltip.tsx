import * as React from "react";

import { cn } from "@/app/components/ui/utils";
import { Slot, composeRefs } from "@/app/components/ui/slot";
import { useFloatingPosition, useHoverOpen } from "@/app/components/ui/use-floating";

const TooltipDelayContext = React.createContext(700);

const TooltipProvider = ({ delayDuration = 700, children }: { delayDuration?: number; children?: React.ReactNode }) => (
  <TooltipDelayContext.Provider value={delayDuration}>{children}</TooltipDelayContext.Provider>
);

interface TooltipContextValue {
  open: boolean;
  show: () => void;
  hide: () => void;
  triggerRef: React.RefObject<HTMLElement | null>;
}
const TooltipContext = React.createContext<TooltipContextValue | null>(null);

const Tooltip = ({ children }: { children?: React.ReactNode }) => {
  const delayDuration = React.useContext(TooltipDelayContext);
  const [open, show, hide] = useHoverOpen(delayDuration);
  const triggerRef = React.useRef<HTMLElement>(null);
  return <TooltipContext.Provider value={{ open, show, hide, triggerRef }}>{children}</TooltipContext.Provider>;
};

interface TooltipTriggerProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

const TooltipTrigger = React.forwardRef<HTMLElement, TooltipTriggerProps>(
  ({ asChild = false, onMouseEnter, onMouseLeave, onFocus, onBlur, children, ...props }, ref) => {
    const ctx = React.useContext(TooltipContext);
    const Comp = asChild ? Slot : "span";
    return (
      <Comp
        ref={composeRefs(ref, ctx?.triggerRef)}
        onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
          onMouseEnter?.(e);
          ctx?.show();
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
          onMouseLeave?.(e);
          ctx?.hide();
        }}
        onFocus={(e: React.FocusEvent<HTMLElement>) => {
          onFocus?.(e);
          ctx?.show();
        }}
        onBlur={(e: React.FocusEvent<HTMLElement>) => {
          onBlur?.(e);
          ctx?.hide();
        }}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);
TooltipTrigger.displayName = "TooltipTrigger";

interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, side = "top", align = "center", sideOffset = 4, ...props }, forwardedRef) => {
    const ctx = React.useContext(TooltipContext);
    const localRef = React.useRef<HTMLDivElement>(null);
    const style = useFloatingPosition(ctx?.triggerRef ?? { current: null }, localRef, !!ctx?.open, {
      side,
      align,
      sideOffset,
    });

    React.useEffect(() => {
      const el = localRef.current;
      if (!el) return;
      if (ctx?.open && !el.matches(":popover-open")) el.showPopover();
      if (!ctx?.open && el.matches(":popover-open")) el.hidePopover();
    }, [ctx?.open]);

    if (!ctx) return null;

    return (
      <div
        ref={composeRefs(forwardedRef, localRef)}
        popover="manual"
        role="tooltip"
        style={style}
        className={cn(
          "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md",
          className,
        )}
        {...props}
      />
    );
  },
);
TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
