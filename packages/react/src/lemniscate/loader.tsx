import * as React from "react";

import { cn } from "../lib/utils";

// All paths live on the 736×400 artboard of Figma "Leminiscate / Logo / Symbol".
// LOOP is the centre-line of the logo's infinity band (the band is ~55 units thick),
// so a 55-wide round-capped stroke along it redraws the symbol.
const LOOP =
  "M368 259C421 214 471 146 541 146C603 146 653.5 197 653.5 259C653.5 321 603 372 541 372C471 372 421 304 368 259C315 214 265 146 195 146C133 146 83 197 83 259C83 321 133 372 195 372C265 372 315 304 368 259Z";
const ROOF =
  "M539.947 3.29509C531.671 -1.09836 521.764 -1.09836 513.474 3.29509L370.301 79.3678L227.128 3.29509C218.852 -1.09836 208.944 -1.09836 200.655 3.29509L0 109.894V174.143L213.891 60.5041L357.065 136.577C365.341 140.97 375.248 140.97 383.537 136.577L526.711 60.5041L736 171.698V107.448L539.947 3.29509Z";
const EAVE_LEFT = "M25.0819 96.5687L0 109.894V174.143L26.7364 159.938L25.0819 96.5687Z";
const EAVE_RIGHT = "M709.838 157.798L735.999 171.698V107.448L711.492 94.4291L709.838 157.798Z";

const BAND = 55;
const widths = { sm: 40, md: 72, lg: 120 } as const;

export type LoaderSize = keyof typeof widths;

const STYLE_ID = "lmns-loader-styles";
// Both run continuously in parallel on the same 1.6s beat, so they stay in step and never pause:
//   the dash laps the loop at a steady pace (pathLength=100, one 32-unit dash per lap)
//   the roof breathes once per lap, up to 104% and back; the loop itself never scales
const CSS = `
@keyframes lmns-loader-trace { to { stroke-dashoffset: -100; } }
@keyframes lmns-loader-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.04); } }
.lmns-loader-trace { stroke-dasharray: 32 68; animation: lmns-loader-trace 1.6s linear infinite; }
.lmns-loader-roof { transform-box: fill-box; transform-origin: center; animation: lmns-loader-pulse 1.6s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .lmns-loader-trace { animation: none; stroke-dasharray: none; }
  .lmns-loader-roof { animation: none; }
}
`;

function injectStyles() {
  if (typeof document === "undefined") return;
  let el = document.getElementById(STYLE_ID);
  if (!el) {
    el = document.createElement("style");
    el.id = STYLE_ID;
    document.head.appendChild(el);
  }
  // Rewrite when the CSS changes, so hot reloads never keep a stale animation.
  if (el.textContent !== CSS) el.textContent = CSS;
}

export interface LoaderProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: LoaderSize;
  /** Caption shown under the loader; also used as the accessible name. */
  label?: string;
  /** Keep the static roof above the animated loop. */
  showRoof?: boolean;
}

/** Leminiscate loader: a gradient dash laps the infinity loop while the roof gently breathes. */
function Loader({ size = "md", label, showRoof = true, className, ...props }: LoaderProps) {
  injectStyles();
  const id = React.useId().replace(/:/g, "");
  // Same stops as the Leminiscate brand gradient (secondary-500 → primary-500) in Breathe and the app.
  const brandStart = { stopColor: "var(--color-secondary-500, #40AAD4)" };
  const brandEnd = { stopColor: "var(--color-primary-500, #1C60C1)" };
  const stroke = {
    stroke: `url(#${id}-loop)`,
    strokeWidth: BAND,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <span
      role="status"
      aria-label={label ?? "Loading"}
      className={cn("inline-flex flex-col items-center gap-2", className)}
      {...props}
    >
      <svg
        aria-hidden="true"
        width={widths[size]}
        viewBox={showRoof ? "0 0 736 400" : "48 111 640 296"}
        fill="none"
        overflow="visible"
      >
        <defs>
          <linearGradient id={`${id}-loop`} x1="63" y1="0" x2="675" y2="0" gradientUnits="userSpaceOnUse">
            <stop style={brandStart} />
            <stop offset="1" style={brandEnd} />
          </linearGradient>
          {showRoof && (
            <>
              <linearGradient id={`${id}-roof`} x1="0" y1="175" x2="0" y2="0" gradientUnits="userSpaceOnUse">
                <stop style={brandStart} />
                <stop offset="1" style={brandEnd} />
              </linearGradient>
              <linearGradient id={`${id}-eave`} x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#ED811C" />
                <stop offset="1" stopColor="#A9601D" />
              </linearGradient>
            </>
          )}
        </defs>
        {showRoof && (
          <g data-part="roof" className="lmns-loader-roof">
            <path d={ROOF} fill={`url(#${id}-roof)`} />
            <path d={EAVE_LEFT} fill={`url(#${id}-eave)`} />
            <path d={EAVE_RIGHT} fill={`url(#${id}-eave)`} />
          </g>
        )}
        <path d={LOOP} {...stroke} strokeOpacity={0.15} data-part="track" />
        <path d={LOOP} {...stroke} pathLength={100} className="lmns-loader-trace" data-part="trace" />
      </svg>
      {label && <span className="text-xs font-semibold text-muted-foreground">{label}</span>}
    </span>
  );
}

export { Loader };
