import * as React from "react";

interface UseDialogStateOptions {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/** Controlled/uncontrolled open-state, shared by Dialog/Sheet/Drawer/AlertDialog. */
export function useDialogState({ open, defaultOpen = false, onOpenChange }: UseDialogStateOptions) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : uncontrolled;
  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolled(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );
  return [isOpen, setOpen] as const;
}

/** Drives a real <dialog> element's showModal()/close() from React state and
 * syncs state back when the browser closes it natively (Escape key). */
export function useNativeDialogElement(open: boolean, setOpen: (open: boolean) => void) {
  const ref = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  React.useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const handleClose = () => setOpen(false);
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [setOpen]);

  return ref;
}

/** True when a click landed outside the dialog's own content box — the
 * standard way to detect a backdrop click on a native <dialog>. */
export function isOutsideDialogClick(e: React.MouseEvent<HTMLDialogElement>, dialog: HTMLDialogElement) {
  if (e.target !== dialog) return false;
  const rect = dialog.getBoundingClientRect();
  return e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom;
}
