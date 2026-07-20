import * as React from "react";

import { cn } from "@/app/components/ui/utils";
import { composeRefs } from "@/app/components/ui/slot";
import { useFloatingPosition, useClickOutside, useEscapeKey } from "@/app/components/ui/use-floating";
import { useRovingTabIndex } from "@/app/components/ui/use-roving-tabindex";

// ponytail: Sub/SubTrigger/SubContent/CheckboxItem/RadioItem/Group aren't
// implemented — zero consumers of this component in the repo today. Add
// them when a real right-click menu needs one.

interface ContextMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  point: { x: number; y: number };
  setPoint: (point: { x: number; y: number }) => void;
}
const ContextMenuContext = React.createContext<ContextMenuContextValue | null>(null);

const ContextMenu = ({ children }: { children?: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);
  const [point, setPoint] = React.useState({ x: 0, y: 0 });
  return <ContextMenuContext.Provider value={{ open, setOpen, point, setPoint }}>{children}</ContextMenuContext.Provider>;
};

const ContextMenuTrigger = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ onContextMenu, children, ...props }, ref) => {
    const ctx = React.useContext(ContextMenuContext);
    return (
      <div
        ref={ref}
        onContextMenu={(e) => {
          onContextMenu?.(e);
          e.preventDefault();
          ctx?.setPoint({ x: e.clientX, y: e.clientY });
          ctx?.setOpen(true);
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
);
ContextMenuTrigger.displayName = "ContextMenuTrigger";

const ContextMenuContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, forwardedRef) => {
    const ctx = React.useContext(ContextMenuContext);
    const localRef = React.useRef<HTMLDivElement>(null);
    useRovingTabIndex(localRef, { orientation: "vertical" });
    useClickOutside([localRef], () => ctx?.setOpen(false), !!ctx?.open);
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
        style={{ position: "fixed", top: ctx.point.y, left: ctx.point.x, margin: 0 }}
        className={cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
          className,
        )}
        {...props}
      />
    );
  },
);
ContextMenuContent.displayName = "ContextMenuContent";

interface ContextMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean;
  disabled?: boolean;
}

const ContextMenuItem = React.forwardRef<HTMLDivElement, ContextMenuItemProps>(
  ({ className, inset, disabled, onClick, ...props }, ref) => {
    const ctx = React.useContext(ContextMenuContext);
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
        className={cn(
          "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground",
          inset && "pl-8",
          disabled && "pointer-events-none opacity-50",
          className,
        )}
        {...props}
      />
    );
  },
);
ContextMenuItem.displayName = "ContextMenuItem";

const ContextMenuLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }>(
  ({ className, inset, ...props }, ref) => (
    <div ref={ref} className={cn("px-2 py-1.5 text-sm font-semibold text-foreground", inset && "pl-8", className)} {...props} />
  ),
);
ContextMenuLabel.displayName = "ContextMenuLabel";

const ContextMenuSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="separator" className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />
  ),
);
ContextMenuSeparator.displayName = "ContextMenuSeparator";

const ContextMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />
);
ContextMenuShortcut.displayName = "ContextMenuShortcut";

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
};
