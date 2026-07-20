import * as React from "react";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";

import { cn } from "@/app/components/ui/utils";
import { composeRefs } from "@/app/components/ui/slot";
import { useFloatingPosition, useHoverOpen, useClickOutside } from "@/app/components/ui/use-floating";

// ponytail: Radix's NavigationMenu shares one Viewport that slides/resizes
// between items' content. Zero consumers here, so each item gets its own
// simple popover instead of that shared-viewport choreography — add it back
// if a real mega-menu needs the shared-morph effect.

const NavigationMenu = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => (
    <nav ref={ref} className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)} {...props}>
      {children}
    </nav>
  ),
);
NavigationMenu.displayName = "NavigationMenu";

const NavigationMenuList = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("group flex flex-1 list-none items-center justify-center space-x-1", className)} {...props} />
  ),
);
NavigationMenuList.displayName = "NavigationMenuList";

interface NavigationMenuItemContextValue {
  open: boolean;
  show: () => void;
  hide: () => void;
  triggerRef: React.RefObject<HTMLElement | null>;
}
const NavigationMenuItemContext = React.createContext<NavigationMenuItemContextValue | null>(null);

const NavigationMenuItem = React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
  ({ className, children, ...props }, ref) => {
    const [open, show, hide] = useHoverOpen(150);
    const triggerRef = React.useRef<HTMLElement>(null);
    return (
      <NavigationMenuItemContext.Provider value={{ open, show, hide, triggerRef }}>
        <li ref={ref} className={cn("relative", className)} onMouseEnter={show} onMouseLeave={hide} {...props}>
          {children}
        </li>
      </NavigationMenuItemContext.Provider>
    );
  },
);
NavigationMenuItem.displayName = "NavigationMenuItem";

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent/50",
);

const NavigationMenuTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, onClick, ...props }, ref) => {
    const ctx = React.useContext(NavigationMenuItemContext);
    return (
      <button
        ref={composeRefs(ref, ctx?.triggerRef)}
        type="button"
        aria-expanded={ctx?.open}
        data-state={ctx?.open ? "open" : "closed"}
        onClick={(e) => {
          onClick?.(e);
          ctx?.open ? ctx.hide() : ctx?.show();
        }}
        className={cn(navigationMenuTriggerStyle(), "group", className)}
        {...props}
      >
        {children}{" "}
        <ChevronDown className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" aria-hidden="true" />
      </button>
    );
  },
);
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

const NavigationMenuContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, forwardedRef) => {
    const ctx = React.useContext(NavigationMenuItemContext);
    const localRef = React.useRef<HTMLDivElement>(null);
    const style = useFloatingPosition(ctx?.triggerRef ?? { current: null }, localRef, !!ctx?.open, {
      side: "bottom",
      align: "start",
      sideOffset: 6,
    });
    useClickOutside([ctx?.triggerRef ?? { current: null }, localRef], () => ctx?.hide(), !!ctx?.open);

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
        onMouseEnter={ctx.show}
        onMouseLeave={ctx.hide}
        className={cn(
          "w-full rounded-md border bg-popover text-popover-foreground shadow-lg md:w-auto",
          className,
        )}
        {...props}
      />
    );
  },
);
NavigationMenuContent.displayName = "NavigationMenuContent";

const NavigationMenuLink = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  (props, ref) => <a ref={ref} {...props} />,
);
NavigationMenuLink.displayName = "NavigationMenuLink";

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
};
