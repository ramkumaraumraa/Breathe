import * as React from "react";

import { cn } from "@/app/components/ui/utils";
import { Slot, composeRefs } from "@/app/components/ui/slot";
import { useFloatingPosition, useHoverOpen } from "@/app/components/ui/use-floating";

interface HoverCardContextValue {
  open: boolean;
  show: () => void;
  hide: () => void;
  triggerRef: React.RefObject<HTMLElement | null>;
}
const HoverCardContext = React.createContext<HoverCardContextValue | null>(null);

const HoverCard = ({ children }: { children?: React.ReactNode }) => {
  const [open, show, hide] = useHoverOpen(300);
  const triggerRef = React.useRef<HTMLElement>(null);
  return <HoverCardContext.Provider value={{ open, show, hide, triggerRef }}>{children}</HoverCardContext.Provider>;
};

interface HoverCardTriggerProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

const HoverCardTrigger = React.forwardRef<HTMLElement, HoverCardTriggerProps>(
  ({ asChild = false, onMouseEnter, onMouseLeave, children, ...props }, ref) => {
    const ctx = React.useContext(HoverCardContext);
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
        {...props}
      >
        {children}
      </Comp>
    );
  },
);
HoverCardTrigger.displayName = "HoverCardTrigger";

interface HoverCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

// Stays open while the pointer is over the card itself, not just the trigger
// — lets users move their mouse into the card to interact with it.
const HoverCardContent = React.forwardRef<HTMLDivElement, HoverCardContentProps>(
  ({ className, align = "center", sideOffset = 4, onMouseEnter, onMouseLeave, ...props }, forwardedRef) => {
    const ctx = React.useContext(HoverCardContext);
    const localRef = React.useRef<HTMLDivElement>(null);
    const style = useFloatingPosition(ctx?.triggerRef ?? { current: null }, localRef, !!ctx?.open, {
      side: "bottom",
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
        style={style}
        onMouseEnter={(e) => {
          onMouseEnter?.(e);
          ctx?.show();
        }}
        onMouseLeave={(e) => {
          onMouseLeave?.(e);
          ctx?.hide();
        }}
        className={cn(
          "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
          className,
        )}
        {...props}
      />
    );
  },
);
HoverCardContent.displayName = "HoverCardContent";

export { HoverCard, HoverCardTrigger, HoverCardContent };
