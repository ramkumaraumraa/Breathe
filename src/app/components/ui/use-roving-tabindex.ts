import * as React from "react";

interface UseRovingTabIndexOptions {
  orientation?: "horizontal" | "vertical";
  loop?: boolean;
}

/** Arrow-key navigation across a group of focusable items marked with
 * data-roving-item — Home/End jump to the ends, Tab always lands on exactly
 * one of them. Shared by ToggleGroup and Tabs (WAI-ARIA roving tabindex). */
export function useRovingTabIndex(
  containerRef: React.RefObject<HTMLElement | null>,
  { orientation = "horizontal", loop = true }: UseRovingTabIndexOptions = {},
) {
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getItems = () =>
      Array.from(container.querySelectorAll<HTMLElement>("[data-roving-item]:not(:disabled)"));

    const setActive = (item: HTMLElement) => {
      getItems().forEach((el) => el.setAttribute("tabindex", el === item ? "0" : "-1"));
    };

    const items = getItems();
    if (items.length && !items.some((el) => el.getAttribute("tabindex") === "0")) {
      setActive(items[0]);
    }

    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target.hasAttribute("data-roving-item")) setActive(target);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const currentItems = getItems();
      const currentIndex = currentItems.indexOf(document.activeElement as HTMLElement);
      if (currentIndex === -1) return;

      const nextKey = orientation === "horizontal" ? "ArrowRight" : "ArrowDown";
      const prevKey = orientation === "horizontal" ? "ArrowLeft" : "ArrowUp";

      let nextIndex: number;
      if (e.key === nextKey) nextIndex = currentIndex + 1;
      else if (e.key === prevKey) nextIndex = currentIndex - 1;
      else if (e.key === "Home") nextIndex = 0;
      else if (e.key === "End") nextIndex = currentItems.length - 1;
      else return;

      e.preventDefault();
      nextIndex = loop
        ? (nextIndex + currentItems.length) % currentItems.length
        : Math.max(0, Math.min(currentItems.length - 1, nextIndex));
      currentItems[nextIndex]?.focus();
    };

    container.addEventListener("focusin", handleFocusIn);
    container.addEventListener("keydown", handleKeyDown);
    return () => {
      container.removeEventListener("focusin", handleFocusIn);
      container.removeEventListener("keydown", handleKeyDown);
    };
  }, [containerRef, orientation, loop]);
}
