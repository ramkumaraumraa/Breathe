import * as React from "react";

import { cn } from "../lib/utils";

const ringSizes = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-[3px]",
  lg: "h-9 w-9 border-4",
} as const;

export type LoaderSize = keyof typeof ringSizes;

export interface LoaderProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: LoaderSize;
  /** Caption shown under the loader; also used as the accessible name. */
  label?: string;
}

/** Brand-blind loader: a ring in the active product's --primary. */
function Loader({ size = "md", label, className, ...props }: LoaderProps) {
  return (
    <span
      role="status"
      aria-label={label ?? "Loading"}
      className={cn("inline-flex flex-col items-center gap-2", className)}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn("animate-spin rounded-full border-border border-t-primary", ringSizes[size])}
      />
      {label && <span className="text-xs font-semibold text-muted-foreground">{label}</span>}
    </span>
  );
}

export { Loader };
