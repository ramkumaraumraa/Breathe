import * as React from "react";

type Side = "top" | "right" | "bottom" | "left";
type Align = "start" | "center" | "end";

interface UseFloatingPositionOptions {
  side?: Side;
  align?: Align;
  sideOffset?: number;
}

/** Positions a floating element relative to its trigger. No collision
 * detection/flipping — this is an internal design system with a small,
 * known set of placements, not a general-purpose positioning engine. */
export function useFloatingPosition(
  triggerRef: React.RefObject<HTMLElement | null>,
  contentRef: React.RefObject<HTMLElement | null>,
  open: boolean,
  { side = "bottom", align = "center", sideOffset = 4 }: UseFloatingPositionOptions,
) {
  const [style, setStyle] = React.useState<React.CSSProperties>({ position: "fixed", top: -9999, left: -9999 });

  React.useLayoutEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const content = contentRef.current;
    if (!trigger || !content) return;

    const update = () => {
      const t = trigger.getBoundingClientRect();
      const c = content.getBoundingClientRect();
      let top = 0;
      let left = 0;

      if (side === "top" || side === "bottom") {
        top = side === "top" ? t.top - c.height - sideOffset : t.bottom + sideOffset;
        left = align === "start" ? t.left : align === "end" ? t.right - c.width : t.left + t.width / 2 - c.width / 2;
      } else {
        left = side === "left" ? t.left - c.width - sideOffset : t.right + sideOffset;
        top = align === "start" ? t.top : align === "end" ? t.bottom - c.height : t.top + t.height / 2 - c.height / 2;
      }

      setStyle({ position: "fixed", top, left, margin: 0 });
    };

    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open, side, align, sideOffset, triggerRef, contentRef]);

  return style;
}

/** Open-on-hover-or-focus with a show delay, close immediately — the
 * interaction model for Tooltip/HoverCard. */
export function useHoverOpen(delay: number) {
  const [open, setOpen] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>(undefined);

  const show = React.useCallback(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setOpen(true), delay);
  }, [delay]);

  const hide = React.useCallback(() => {
    clearTimeout(timeoutRef.current);
    setOpen(false);
  }, []);

  React.useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return [open, show, hide] as const;
}

/** Closes when a click lands outside every given ref — light-dismiss for
 * click-triggered floating content (Popover, and later Bucket B menus). */
export function useClickOutside(refs: Array<React.RefObject<HTMLElement | null>>, onOutside: () => void, active: boolean) {
  React.useEffect(() => {
    if (!active) return;
    const handler = (e: MouseEvent) => {
      if (refs.every((ref) => ref.current && !ref.current.contains(e.target as Node))) onOutside();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [active, onOutside, refs]);
}

export function useEscapeKey(onEscape: () => void, active: boolean) {
  React.useEffect(() => {
    if (!active) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onEscape();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [active, onEscape]);
}
