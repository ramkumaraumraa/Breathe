import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/app/components/ui/utils";
import { Slot } from "@/app/components/ui/slot";
import { useDialogState, useNativeDialogElement, isOutsideDialogClick } from "@/app/components/ui/use-dialog";

interface SheetContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  dialogId: string;
}
const SheetContext = React.createContext<SheetContextValue | null>(null);

interface SheetProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

const Sheet = ({ open, defaultOpen, onOpenChange, children }: SheetProps) => {
  const [isOpen, setOpen] = useDialogState({ open, defaultOpen, onOpenChange });
  const dialogId = React.useId();
  return <SheetContext.Provider value={{ open: isOpen, setOpen, dialogId }}>{children}</SheetContext.Provider>;
};

interface SheetTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const SheetTrigger = React.forwardRef<HTMLButtonElement, SheetTriggerProps>(
  ({ asChild = false, onClick, children, ...props }, ref) => {
    const ctx = React.useContext(SheetContext);
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
SheetTrigger.displayName = "SheetTrigger";

interface SheetCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const SheetClose = React.forwardRef<HTMLButtonElement, SheetCloseProps>(
  ({ asChild = false, onClick, children, ...props }, ref) => {
    const ctx = React.useContext(SheetContext);
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
SheetClose.displayName = "SheetClose";

const sheetVariants = cva("fixed z-50 m-0 max-w-none gap-4 bg-background p-6 shadow-lg backdrop:bg-black/80", {
  variants: {
    side: {
      top: "inset-x-0 top-0 w-full border-b",
      bottom: "inset-x-0 bottom-0 w-full border-t",
      left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
      right: "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
    },
  },
  defaultVariants: { side: "right" },
});

interface SheetContentProps extends React.HTMLAttributes<HTMLDialogElement>, VariantProps<typeof sheetVariants> {
  onInteractOutside?: (event: { preventDefault: () => void }) => void;
}

const SheetContent = React.forwardRef<HTMLDialogElement, SheetContentProps>(
  ({ side = "right", className, children, onClick, onInteractOutside, ...props }, forwardedRef) => {
    const ctx = React.useContext(SheetContext);
    const dialogRef = useNativeDialogElement(!!ctx?.open, ctx?.setOpen ?? (() => {}));
    React.useImperativeHandle(forwardedRef, () => dialogRef.current as HTMLDialogElement);

    return (
      <dialog
        ref={dialogRef}
        aria-labelledby={`${ctx?.dialogId}-title`}
        aria-describedby={`${ctx?.dialogId}-description`}
        className={cn(sheetVariants({ side }), className)}
        onClick={(e) => {
          onClick?.(e);
          if (!dialogRef.current || !isOutsideDialogClick(e, dialogRef.current)) return;
          let prevented = false;
          onInteractOutside?.({ preventDefault: () => (prevented = true) });
          if (!prevented) ctx?.setOpen(false);
        }}
        {...props}
      >
        {children}
        <button
          type="button"
          onClick={() => ctx?.setOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </dialog>
    );
  },
);
SheetContent.displayName = "SheetContent";

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    const ctx = React.useContext(SheetContext);
    return (
      <h2
        ref={ref}
        id={`${ctx?.dialogId}-title`}
        className={cn("text-lg font-semibold text-foreground", className)}
        {...props}
      />
    );
  },
);
SheetTitle.displayName = "SheetTitle";

const SheetDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const ctx = React.useContext(SheetContext);
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
SheetDescription.displayName = "SheetDescription";

export { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger };
