import * as React from "react";
import { Search } from "lucide-react";

import { cn } from "@/app/components/ui/utils";
import { Dialog, DialogContent } from "@/app/components/ui/dialog";

// ponytail: filtering is a plain case-insensitive substring match, not
// cmdk's fuzzy scoring — every consumer here has short, literal item labels
// where substring match is indistinguishable from fuzzy match. Swap in a
// scoring function if item lists grow long enough that fuzzy match starts
// to matter.

interface CommandContextValue {
  search: string;
  setSearch: (search: string) => void;
  activeValue: string | null;
  setActiveValue: (value: string | null) => void;
  rootRef: React.RefObject<HTMLDivElement | null>;
}
const CommandContext = React.createContext<CommandContextValue | null>(null);

function getVisibleItems(root: HTMLElement | null): HTMLElement[] {
  if (!root) return [];
  return Array.from(root.querySelectorAll<HTMLElement>("[data-command-item]:not([hidden])"));
}

const Command = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, forwardedRef) => {
    const rootRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(forwardedRef, () => rootRef.current as HTMLDivElement);
    const [search, setSearch] = React.useState("");
    const [activeValue, setActiveValue] = React.useState<string | null>(null);

    return (
      <CommandContext.Provider value={{ search, setSearch, activeValue, setActiveValue, rootRef }}>
        <div
          ref={rootRef}
          className={cn("flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground", className)}
          {...props}
        />
      </CommandContext.Provider>
    );
  },
);
Command.displayName = "Command";

interface CommandDialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => (
  <Dialog {...props}>
    <DialogContent className="overflow-hidden p-0 shadow-lg">
      <Command className="[&_[data-command-group-heading]]:px-2 [&_[data-command-group-heading]]:font-medium [&_[data-command-group-heading]]:text-muted-foreground [&_[data-command-input-wrapper]_svg]:h-5 [&_[data-command-input-wrapper]_svg]:w-5 [&_[data-command-input]]:h-12 [&_[data-command-item]]:px-2 [&_[data-command-item]]:py-3">
        {children}
      </Command>
    </DialogContent>
  </Dialog>
);

const CommandInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, onChange, onKeyDown, ...props }, ref) => {
    const ctx = React.useContext(CommandContext);

    return (
      <div className="flex items-center border-b px-3" data-command-input-wrapper="">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <input
          ref={ref}
          role="combobox"
          aria-expanded="true"
          aria-autocomplete="list"
          aria-activedescendant={ctx?.activeValue ? `command-item-${ctx.activeValue}` : undefined}
          data-command-input
          value={ctx?.search}
          onChange={(e) => {
            onChange?.(e);
            ctx?.setSearch(e.target.value);
          }}
          onKeyDown={(e) => {
            onKeyDown?.(e);
            const items = getVisibleItems(ctx?.rootRef.current ?? null);
            if (!items.length) return;
            const currentIndex = items.findIndex((el) => el.dataset.value === ctx?.activeValue);

            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
              e.preventDefault();
              const delta = e.key === "ArrowDown" ? 1 : -1;
              const nextIndex = currentIndex === -1 ? 0 : (currentIndex + delta + items.length) % items.length;
              ctx?.setActiveValue(items[nextIndex].dataset.value ?? null);
            } else if (e.key === "Enter" && currentIndex !== -1) {
              e.preventDefault();
              items[currentIndex].click();
            }
          }}
          className={cn(
            "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);
CommandInput.displayName = "CommandInput";

const CommandList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="listbox" className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)} {...props} />
  ),
);
CommandList.displayName = "CommandList";

const CommandEmpty = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  const ctx = React.useContext(CommandContext);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    setVisible(getVisibleItems(ctx?.rootRef.current ?? null).length === 0);
  });

  if (!visible) return null;
  return <div ref={ref} className={cn("py-6 text-center text-sm", className)} {...props} />;
});
CommandEmpty.displayName = "CommandEmpty";

interface CommandGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: React.ReactNode;
}

const CommandGroup = React.forwardRef<HTMLDivElement, CommandGroupProps>(({ className, heading, children, ...props }, forwardedRef) => {
  const ctx = React.useContext(CommandContext);
  const groupRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(forwardedRef, () => groupRef.current as HTMLDivElement);
  const [hasVisible, setHasVisible] = React.useState(true);

  React.useEffect(() => {
    setHasVisible(getVisibleItems(groupRef.current).length > 0);
  }, [ctx?.search]);

  return (
    <div
      ref={groupRef}
      role="group"
      hidden={!hasVisible}
      className={cn("overflow-hidden p-1 text-foreground", className)}
      {...props}
    >
      {heading && (
        <div data-command-group-heading className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
          {heading}
        </div>
      )}
      {children}
    </div>
  );
});
CommandGroup.displayName = "CommandGroup";

const CommandSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} role="separator" className={cn("-mx-1 h-px bg-border", className)} {...props} />,
);
CommandSeparator.displayName = "CommandSeparator";

interface CommandItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  value?: string;
  disabled?: boolean;
  onSelect?: (value: string) => void;
}

const CommandItem = React.forwardRef<HTMLDivElement, CommandItemProps>(
  ({ className, value, disabled, onSelect, onClick, onMouseEnter, children, ...props }, ref) => {
    const ctx = React.useContext(CommandContext);
    const itemValue = value ?? (typeof children === "string" ? children : "");
    const matches = !ctx?.search || itemValue.toLowerCase().includes(ctx.search.toLowerCase());
    const selected = ctx?.activeValue === itemValue;

    return (
      <div
        ref={ref}
        id={`command-item-${itemValue}`}
        role="option"
        data-command-item
        data-value={itemValue}
        hidden={!matches}
        aria-selected={selected}
        aria-disabled={disabled}
        onMouseEnter={(e) => {
          onMouseEnter?.(e);
          ctx?.setActiveValue(itemValue);
        }}
        onClick={(e) => {
          if (disabled) return;
          onClick?.(e);
          onSelect?.(itemValue);
        }}
        className={cn(
          "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground",
          disabled && "pointer-events-none opacity-50",
          className,
        )}
        data-selected={selected}
        {...props}
      >
        {children}
      </div>
    );
  },
);
CommandItem.displayName = "CommandItem";

const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />
);
CommandShortcut.displayName = "CommandShortcut";

export { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator };
