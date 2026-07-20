import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/app/components/ui/utils";
import { Slot } from "@/app/components/ui/slot";
import { useDialogState, useNativeDialogElement, isOutsideDialogClick } from "@/app/components/ui/use-dialog";

interface DialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  dialogId: string;
}
const DialogContext = React.createContext<DialogContextValue | null>(null);

interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

const Dialog = ({ open, defaultOpen, onOpenChange, children }: DialogProps) => {
  const [isOpen, setOpen] = useDialogState({ open, defaultOpen, onOpenChange });
  const dialogId = React.useId();
  return <DialogContext.Provider value={{ open: isOpen, setOpen, dialogId }}>{children}</DialogContext.Provider>;
};

interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ asChild = false, onClick, children, ...props }, ref) => {
    const ctx = React.useContext(DialogContext);
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
DialogTrigger.displayName = "DialogTrigger";

const DialogClose = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ onClick, ...props }, ref) => {
    const ctx = React.useContext(DialogContext);
    return (
      <button
        ref={ref}
        type="button"
        onClick={(e) => {
          onClick?.(e);
          ctx?.setOpen(false);
        }}
        {...props}
      />
    );
  },
);
DialogClose.displayName = "DialogClose";

interface DialogContentProps extends React.HTMLAttributes<HTMLDialogElement> {
  hideCloseButton?: boolean;
  onInteractOutside?: (event: { preventDefault: () => void }) => void;
}

const DialogContent = React.forwardRef<HTMLDialogElement, DialogContentProps>(
  ({ className, children, hideCloseButton, onInteractOutside, onClick, ...props }, forwardedRef) => {
    const ctx = React.useContext(DialogContext);
    const dialogRef = useNativeDialogElement(!!ctx?.open, ctx?.setOpen ?? (() => {}));
    React.useImperativeHandle(forwardedRef, () => dialogRef.current as HTMLDialogElement);

    return (
      <dialog
        ref={dialogRef}
        aria-labelledby={`${ctx?.dialogId}-title`}
        aria-describedby={`${ctx?.dialogId}-description`}
        className={cn(
          "m-auto w-full max-w-lg gap-4 rounded-lg border bg-background p-6 shadow-lg backdrop:bg-black/80",
          className,
        )}
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
        {!hideCloseButton && (
          <button
            type="button"
            onClick={() => ctx?.setOpen(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        )}
      </dialog>
    );
  },
);
DialogContent.displayName = "DialogContent";

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    const ctx = React.useContext(DialogContext);
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
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const ctx = React.useContext(DialogContext);
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
DialogDescription.displayName = "DialogDescription";

export { Dialog, DialogClose, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription };
