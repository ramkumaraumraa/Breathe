import * as React from "react";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/components/ui/utils";

// ── Container ─────────────────────────────────────────────────────────────────

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3",
  {
    variants: {
      variant: {
        default:     "bg-background border-border text-foreground",
        info:        "bg-info/[0.07] border-info/30 text-foreground",
        success:     "bg-success/[0.07] border-success/30 text-foreground",
        warning:     "bg-warning/[0.07] border-warning/30 text-foreground",
        destructive: "bg-danger/[0.07] border-danger/30 text-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

// ── Top row: wraps Icon + Content + Close as a flex row ───────────────────────
// Optional — for simple title-only alerts just put AlertTitle directly in Alert.

const AlertBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-start gap-3", className)}
    {...props}
  />
));
AlertBody.displayName = "AlertBody";

// ── Icon slot — consumer passes the icon with its color class ─────────────────
// Icon color conventions:
//   default     → text-foreground-secondary
//   info        → text-info
//   success     → text-success
//   warning     → text-warning
//   destructive → text-danger

const AlertIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mt-0.5 h-4 w-4 shrink-0", className)}
    {...props}
  />
));
AlertIcon.displayName = "AlertIcon";

// ── Content column — title + description ─────────────────────────────────────

const AlertContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 min-w-0", className)}
    {...props}
  />
));
AlertContent.displayName = "AlertContent";

// ── Title ─────────────────────────────────────────────────────────────────────

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm font-semibold leading-snug text-foreground", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

// ── Description ───────────────────────────────────────────────────────────────

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-foreground-secondary mt-0.5 leading-snug", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

// ── Close button ──────────────────────────────────────────────────────────────

const AlertClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    aria-label="Dismiss"
    className={cn(
      "shrink-0 rounded p-0.5 text-foreground-tertiary transition-colors",
      "hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      className,
    )}
    {...props}
  >
    <X className="h-4 w-4" />
  </button>
));
AlertClose.displayName = "AlertClose";

// ── Actions row — 1 or 2 buttons, wraps on mobile ────────────────────────────

const AlertActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mt-3 flex flex-wrap gap-2", className)}
    {...props}
  />
));
AlertActions.displayName = "AlertActions";

export {
  Alert,
  AlertBody,
  AlertIcon,
  AlertContent,
  AlertTitle,
  AlertDescription,
  AlertClose,
  AlertActions,
};
