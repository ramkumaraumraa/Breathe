import * as React from "react";

export function composeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (node: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.MutableRefObject<T | null>).current = node;
    });
  };
}

interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

/**
 * Renders its single child in place of a wrapper element, merging props
 * (className/style are combined, handlers are called in sequence).
 * Drop-in replacement for @radix-ui/react-slot's `asChild` pattern.
 * `children` is typed loosely (ReactNode) so it unifies with the
 * `asChild ? Slot : "tag"` pattern's other branch — callers are expected to
 * always pass a single element when asChild is set.
 */
const Slot = React.forwardRef<HTMLElement, SlotProps>(({ children, ...slotProps }, ref) => {
  if (!React.isValidElement(children)) return <>{children}</>;
  const childProps = children.props as Record<string, unknown>;
  const merged: Record<string, unknown> = { ...childProps };

  for (const key in slotProps) {
    const slotValue = (slotProps as Record<string, unknown>)[key];
    const childValue = childProps[key];
    if (key === "className") {
      merged.className = [slotValue, childValue].filter(Boolean).join(" ");
    } else if (key === "style") {
      merged.style = { ...(slotValue as object), ...(childValue as object) };
    } else if (typeof slotValue === "function" && typeof childValue === "function") {
      merged[key] = (...args: unknown[]) => {
        slotValue(...args);
        childValue(...args);
      };
    } else {
      merged[key] = childValue ?? slotValue;
    }
  }

  return React.cloneElement(children as React.ReactElement<any>, {
    ...merged,
    ref: composeRefs(ref, (children as { ref?: React.Ref<unknown> }).ref),
  });
});
Slot.displayName = "Slot";

export { Slot };
