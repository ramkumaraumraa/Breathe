import * as React from "react";

import { cn } from "@/app/components/ui/utils";

type AvatarStatus = "idle" | "loaded" | "error";

const AvatarLoadContext = React.createContext<{
  status: AvatarStatus;
  setStatus: (status: AvatarStatus) => void;
} | null>(null);

const Avatar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const [status, setStatus] = React.useState<AvatarStatus>("idle");
    return (
      <AvatarLoadContext.Provider value={{ status, setStatus }}>
        <div
          ref={ref}
          className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
          {...props}
        />
      </AvatarLoadContext.Provider>
    );
  },
);
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>(
  ({ className, onLoad, onError, ...props }, ref) => {
    const ctx = React.useContext(AvatarLoadContext);
    if (ctx?.status === "error") return null;
    return (
      <img
        ref={ref}
        className={cn("absolute inset-0 aspect-square h-full w-full", className)}
        onLoad={(e) => {
          ctx?.setStatus("loaded");
          onLoad?.(e);
        }}
        onError={(e) => {
          ctx?.setStatus("error");
          onError?.(e);
        }}
        {...props}
      />
    );
  },
);
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const ctx = React.useContext(AvatarLoadContext);
    if (ctx?.status === "loaded") return null;
    return (
      <div
        ref={ref}
        className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)}
        {...props}
      />
    );
  },
);
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
