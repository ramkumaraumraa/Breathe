import * as React from "react";

import { cn } from "@/app/components/ui/utils";
import { Slot } from "@/app/components/ui/slot";
import { buttonVariants } from "@/app/components/ui/button";
import { useDialogState, useNativeDialogElement } from "@/app/components/ui/use-dialog";

interface AlertDialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  dialogId: string;
}
const AlertDialogContext = React.createContext<AlertDialogContextValue | null>(null);

interface AlertDialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

const AlertDialog = ({ open, defaultOpen, onOpenChange, children }: AlertDialogProps) => {
  const [isOpen, setOpen] = useDialogState({ open, defaultOpen, onOpenChange });
  const dialogId = React.useId();
  return <AlertDialogContext.Provider value={{ open: isOpen, setOpen, dialogId }}>{children}</AlertDialogContext.Provider>;
};

interface AlertDialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const AlertDialogTrigger = React.forwardRef<HTMLButtonElement, AlertDialogTriggerProps>(
  ({ asChild = false, onClick, children, ...props }, ref) => {
    const ctx = React.useContext(AlertDialogContext);
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
AlertDialogTrigger.displayName = "AlertDialogTrigger";

// An alert dialog demands an explicit choice — unlike Dialog/Sheet/Drawer it
// does not close on Escape or a backdrop click.
const AlertDialogContent = React.forwardRef<HTMLDialogElement, React.HTMLAttributes<HTMLDialogElement>>(
  ({ className, children, ...props }, forwardedRef) => {
    const ctx = React.useContext(AlertDialogContext);
    const dialogRef = useNativeDialogElement(!!ctx?.open, ctx?.setOpen ?? (() => {}));
    React.useImperativeHandle(forwardedRef, () => dialogRef.current as HTMLDialogElement);

    React.useEffect(() => {
      const dialog = dialogRef.current;
      if (!dialog) return;
      const blockCancel = (e: Event) => e.preventDefault();
      dialog.addEventListener("cancel", blockCancel);
      return () => dialog.removeEventListener("cancel", blockCancel);
    }, [dialogRef]);

    return (
      <dialog
        ref={dialogRef}
        aria-labelledby={`${ctx?.dialogId}-title`}
        aria-describedby={`${ctx?.dialogId}-description`}
        className={cn(
          "m-auto w-full max-w-lg gap-4 rounded-lg border bg-background p-6 shadow-lg backdrop:bg-black/80",
          className,
        )}
        {...props}
      >
        {children}
      </dialog>
    );
  },
);
AlertDialogContent.displayName = "AlertDialogContent";

const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    const ctx = React.useContext(AlertDialogContext);
    return <h2 ref={ref} id={`${ctx?.dialogId}-title`} className={cn("text-lg font-semibold", className)} {...props} />;
  },
);
AlertDialogTitle.displayName = "AlertDialogTitle";

const AlertDialogDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const ctx = React.useContext(AlertDialogContext);
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
AlertDialogDescription.displayName = "AlertDialogDescription";

const AlertDialogAction = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, onClick, ...props }, ref) => {
    const ctx = React.useContext(AlertDialogContext);
    return (
      <button
        ref={ref}
        type="button"
        className={cn(buttonVariants(), className)}
        onClick={(e) => {
          onClick?.(e);
          ctx?.setOpen(false);
        }}
        {...props}
      />
    );
  },
);
AlertDialogAction.displayName = "AlertDialogAction";

const AlertDialogCancel = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, onClick, ...props }, ref) => {
    const ctx = React.useContext(AlertDialogContext);
    return (
      <button
        ref={ref}
        type="button"
        className={cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)}
        onClick={(e) => {
          onClick?.(e);
          ctx?.setOpen(false);
        }}
        {...props}
      />
    );
  },
);
AlertDialogCancel.displayName = "AlertDialogCancel";

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
