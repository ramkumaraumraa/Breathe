import * as React from "react";

import { cn } from "@/app/components/ui/utils";
import { Slot, composeRefs } from "@/app/components/ui/slot";
import { useDialogState } from "@/app/components/ui/use-dialog";
import { useFloatingPosition, useClickOutside, useEscapeKey } from "@/app/components/ui/use-floating";
import { useRovingTabIndex } from "@/app/components/ui/use-roving-tabindex";

// ponytail: Sub/SubTrigger/SubContent/CheckboxItem/RadioItem/Group aren't
// implemented — nothing in this repo uses nested submenus or check/radio
// menu items. Add them (same shape as radio-group.tsx's context pattern)
// when a real consumer needs one; not worth the ARIA + positioning
// complexity speculatively.

interface DropdownMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
}
const DropdownMenuContext = React.createContext<DropdownMenuContextValue | null>(null);

interface DropdownMenuProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

const DropdownMenu = ({ open, defaultOpen, onOpenChange, children }: DropdownMenuProps) => {
  const [isOpen, setOpen] = useDialogState({ open, defaultOpen, onOpenChange });
  const triggerRef = React.useRef<HTMLElement>(null);
  return (
    <DropdownMenuContext.Provider value={{ open: isOpen, setOpen, triggerRef }}>{children}</DropdownMenuContext.Provider>
  );
};

interface DropdownMenuTriggerProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

const DropdownMenuTrigger = React.forwardRef<HTMLElement, DropdownMenuTriggerProps>(
  ({ asChild = false, onClick, children, ...props }, ref) => {
    const ctx = React.useContext(DropdownMenuContext);
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={composeRefs(ref, ctx?.triggerRef)}
        aria-haspopup="menu"
        aria-expanded={ctx?.open}
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
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ className, align = "start", sideOffset = 4, ...props }, forwardedRef) => {
    const ctx = React.useContext(DropdownMenuContext);
    const localRef = React.useRef<HTMLDivElement>(null);
    useRovingTabIndex(localRef, { orientation: "vertical" });
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
      if (ctx?.open && !el.matches(":popover-open")) {
        el.showPopover();
        (el.querySelector<HTMLElement>("[data-roving-item]") ?? el).focus();
      }
      if (!ctx?.open && el.matches(":popover-open")) el.hidePopover();
    }, [ctx?.open]);

    if (!ctx) return null;

    return (
      <div
        ref={composeRefs(forwardedRef, localRef)}
        popover="manual"
        role="menu"
        style={style}
        className={cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
          className,
        )}
        {...props}
      />
    );
  },
);
DropdownMenuContent.displayName = "DropdownMenuContent";

interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean;
  disabled?: boolean;
}

const DropdownMenuItem = React.forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  ({ className, inset, disabled, onClick, onKeyDown, ...props }, ref) => {
    const ctx = React.useContext(DropdownMenuContext);
    return (
      <div
        ref={ref}
        role="menuitem"
        data-roving-item
        tabIndex={-1}
        aria-disabled={disabled}
        data-disabled={disabled || undefined}
        onClick={(e) => {
          if (disabled) return;
          onClick?.(e as React.MouseEvent<HTMLDivElement>);
          ctx?.setOpen(false);
        }}
        onKeyDown={(e) => {
          onKeyDown?.(e);
          if (!disabled && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            (e.currentTarget as HTMLElement).click();
          }
        }}
        className={cn(
          "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground",
          inset && "pl-8",
          disabled && "pointer-events-none opacity-50",
          className,
        )}
        {...props}
      />
    );
  },
);
DropdownMenuItem.displayName = "DropdownMenuItem";

const DropdownMenuLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }>(
  ({ className, inset, ...props }, ref) => (
    <div ref={ref} className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)} {...props} />
  ),
);
DropdownMenuLabel.displayName = "DropdownMenuLabel";

const DropdownMenuSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="separator" className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
  ),
);
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn("ml-auto text-xs tracking-widest opacity-60", className)} {...props} />
);
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
};
