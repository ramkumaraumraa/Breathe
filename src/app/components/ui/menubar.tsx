import * as React from "react";

import { cn } from "@/app/components/ui/utils";
import { composeRefs } from "@/app/components/ui/slot";
import { useFloatingPosition, useClickOutside, useEscapeKey } from "@/app/components/ui/use-floating";
import { useRovingTabIndex } from "@/app/components/ui/use-roving-tabindex";

// ponytail: Sub/SubTrigger/SubContent/CheckboxItem/RadioItem/Group aren't
// implemented — zero consumers of this component in the repo today.

interface MenubarContextValue {
  activeMenu: string | null;
  setActiveMenu: (id: string | null) => void;
}
const MenubarContext = React.createContext<MenubarContextValue | null>(null);

const Menubar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, forwardedRef) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    useRovingTabIndex(containerRef);
    React.useImperativeHandle(forwardedRef, () => containerRef.current as HTMLDivElement);
    const [activeMenu, setActiveMenu] = React.useState<string | null>(null);
    return (
      <MenubarContext.Provider value={{ activeMenu, setActiveMenu }}>
        <div
          ref={containerRef}
          role="menubar"
          className={cn("flex h-10 items-center space-x-1 rounded-md border bg-background p-1", className)}
          {...props}
        />
      </MenubarContext.Provider>
    );
  },
);
Menubar.displayName = "Menubar";

interface MenubarMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
}
const MenubarMenuContext = React.createContext<MenubarMenuContextValue | null>(null);

const MenubarMenu = ({ children }: { children?: React.ReactNode }) => {
  const id = React.useId();
  const menubarCtx = React.useContext(MenubarContext);
  const triggerRef = React.useRef<HTMLElement>(null);
  const open = menubarCtx?.activeMenu === id;
  const setOpen = (next: boolean) => menubarCtx?.setActiveMenu(next ? id : null);
  return <MenubarMenuContext.Provider value={{ open, setOpen, triggerRef }}>{children}</MenubarMenuContext.Provider>;
};

const MenubarTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, onClick, onMouseEnter, ...props }, ref) => {
    const menubarCtx = React.useContext(MenubarContext);
    const ctx = React.useContext(MenubarMenuContext);
    return (
      <button
        ref={composeRefs(ref, ctx?.triggerRef)}
        type="button"
        role="menuitem"
        data-roving-item
        tabIndex={-1}
        aria-haspopup="menu"
        aria-expanded={ctx?.open}
        onClick={(e) => {
          onClick?.(e);
          ctx?.setOpen(!ctx.open);
        }}
        onMouseEnter={(e) => {
          onMouseEnter?.(e);
          if (menubarCtx?.activeMenu && !ctx?.open) ctx?.setOpen(true);
        }}
        className={cn(
          "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className,
        )}
        data-state={ctx?.open ? "open" : "closed"}
        {...props}
      />
    );
  },
);
MenubarTrigger.displayName = "MenubarTrigger";

interface MenubarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

const MenubarContent = React.forwardRef<HTMLDivElement, MenubarContentProps>(
  ({ className, align = "start", sideOffset = 8, ...props }, forwardedRef) => {
    const ctx = React.useContext(MenubarMenuContext);
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
          "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
          className,
        )}
        {...props}
      />
    );
  },
);
MenubarContent.displayName = "MenubarContent";

interface MenubarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean;
  disabled?: boolean;
}

const MenubarItem = React.forwardRef<HTMLDivElement, MenubarItemProps>(
  ({ className, inset, disabled, onClick, ...props }, ref) => {
    const ctx = React.useContext(MenubarMenuContext);
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
MenubarItem.displayName = "MenubarItem";

const MenubarLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }>(
  ({ className, inset, ...props }, ref) => (
    <div ref={ref} className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)} {...props} />
  ),
);
MenubarLabel.displayName = "MenubarLabel";

const MenubarSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="separator" className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
  ),
);
MenubarSeparator.displayName = "MenubarSeparator";

const MenubarShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />
);
MenubarShortcut.displayName = "MenubarShortcut";

export { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarLabel, MenubarSeparator, MenubarShortcut };
