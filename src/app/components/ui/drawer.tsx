import * as React from "react";

import { cn } from "@/app/components/ui/utils";
import { Slot } from "@/app/components/ui/slot";
import { useDialogState, useNativeDialogElement, isOutsideDialogClick } from "@/app/components/ui/use-dialog";

interface DrawerContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  dialogId: string;
}
const DrawerContext = React.createContext<DrawerContextValue | null>(null);

interface DrawerProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

// ponytail: vaul's drag-to-dismiss swipe gesture is dropped — this is a
// bottom sheet you close via the close button, backdrop click, or Escape.
// Add a touch/pointer drag handler here if swipe-to-dismiss is requested.
const Drawer = ({ open, defaultOpen, onOpenChange, children }: DrawerProps) => {
  const [isOpen, setOpen] = useDialogState({ open, defaultOpen, onOpenChange });
  const dialogId = React.useId();
  return <DrawerContext.Provider value={{ open: isOpen, setOpen, dialogId }}>{children}</DrawerContext.Provider>;
};

interface DrawerTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const DrawerTrigger = React.forwardRef<HTMLButtonElement, DrawerTriggerProps>(
  ({ asChild = false, onClick, children, ...props }, ref) => {
    const ctx = React.useContext(DrawerContext);
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : "button"}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          onClick?.(e);
          ctx?.setOpen(true);
        }}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);
DrawerTrigger.displayName = "DrawerTrigger";

interface DrawerCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const DrawerClose = React.forwardRef<HTMLButtonElement, DrawerCloseProps>(
  ({ asChild = false, onClick, children, ...props }, ref) => {
    const ctx = React.useContext(DrawerContext);
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : "button"}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          onClick?.(e);
          ctx?.setOpen(false);
        }}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);
DrawerClose.displayName = "DrawerClose";

const DrawerContent = React.forwardRef<HTMLDialogElement, React.HTMLAttributes<HTMLDialogElement>>(
  ({ className, children, onClick, ...props }, forwardedRef) => {
    const ctx = React.useContext(DrawerContext);
    const dialogRef = useNativeDialogElement(!!ctx?.open, ctx?.setOpen ?? (() => {}));
    React.useImperativeHandle(forwardedRef, () => dialogRef.current as HTMLDialogElement);

    return (
      <dialog
        ref={dialogRef}
        aria-labelledby={`${ctx?.dialogId}-title`}
        aria-describedby={`${ctx?.dialogId}-description`}
        className={cn(
          "fixed inset-x-0 bottom-0 top-auto z-50 m-0 flex h-auto max-h-[80vh] w-full max-w-none flex-col rounded-t-[10px] border bg-background backdrop:bg-black/80",
          className,
        )}
        onClick={(e) => {
          onClick?.(e);
          if (dialogRef.current && isOutsideDialogClick(e, dialogRef.current)) ctx?.setOpen(false);
        }}
        {...props}
      >
        <div className="mx-auto mt-4 h-2 w-[100px] shrink-0 rounded-full bg-muted" />
        {children}
      </dialog>
    );
  },
);
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)} {...props} />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    const ctx = React.useContext(DrawerContext);
    return (
      <h2
        ref={ref}
        id={`${ctx?.dialogId}-title`}
        className={cn("text-lg font-semibold leading-none tracking-tight", className)}
        {...props}
      />
    );
  },
);
DrawerTitle.displayName = "DrawerTitle";

const DrawerDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const ctx = React.useContext(DrawerContext);
    return (
      <p
        ref={ref}
        id={`${ctx?.dialogId}-description`}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
      />
    );
  },
);
DrawerDescription.displayName = "DrawerDescription";

export { Drawer, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription };
