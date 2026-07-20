import * as React from "react";

import { cn } from "@/app/components/ui/utils";
import { Slot, composeRefs } from "@/app/components/ui/slot";
import { useDialogState } from "@/app/components/ui/use-dialog";
import { useFloatingPosition, useClickOutside, useEscapeKey } from "@/app/components/ui/use-floating";

interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLElement | null>;
}
const PopoverContext = React.createContext<PopoverContextValue | null>(null);

interface PopoverProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

const Popover = ({ open, defaultOpen, onOpenChange, children }: PopoverProps) => {
  const [isOpen, setOpen] = useDialogState({ open, defaultOpen, onOpenChange });
  const triggerRef = React.useRef<HTMLElement>(null);
  const contentRef = React.useRef<HTMLElement>(null);
  return (
    <PopoverContext.Provider value={{ open: isOpen, setOpen, triggerRef, contentRef }}>{children}</PopoverContext.Provider>
  );
};

interface PopoverTriggerProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

const PopoverTrigger = React.forwardRef<HTMLElement, PopoverTriggerProps>(
  ({ asChild = false, onClick, children, ...props }, ref) => {
    const ctx = React.useContext(PopoverContext);
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={composeRefs(ref, ctx?.triggerRef)}
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          onClick?.(e);
          ctx?.setOpen(!ctx.open);
        }}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);
PopoverTrigger.displayName = "PopoverTrigger";

interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ className, align = "center", sideOffset = 4, ...props }, forwardedRef) => {
    const ctx = React.useContext(PopoverContext);
    const localRef = React.useRef<HTMLDivElement>(null);
    const style = useFloatingPosition(ctx?.triggerRef ?? { current: null }, localRef, !!ctx?.open, {
      side: "bottom",
      align,
      sideOffset,
    });

    useClickOutside([ctx?.triggerRef ?? { current: null }, localRef], () => ctx?.setOpen(false), !!ctx?.open);
    useEscapeKey(() => ctx?.setOpen(false), !!ctx?.open);

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
        className={cn(
          "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
          className,
        )}
        {...props}
      />
    );
  },
);
PopoverContent.displayName = "PopoverContent";

export { Popover, PopoverTrigger, PopoverContent };
