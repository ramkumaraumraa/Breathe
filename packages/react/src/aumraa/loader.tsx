import * as React from "react";

import { cn } from "../lib/utils";

// Official Aumraa Logo geometry from public/assets/logos/aumraa/aumraa_icon.svg (viewBox: 0 0 264 280).
// The spiral band is ~25 units thick and ends at (120.32, 195.81) directly at the leaf base seam.
const SPIRAL_BAND =
  "M120.31 40V65.12C158.08 67.75 191.04 89.29 197.14 129.26C208.51 203.79 112.44 246.65 73.78 187.01C49.66 149.8 76.27 103.44 121.23 108.66C161.4 113.32 165.09 168.86 123.25 170.9V195.81C192.39 195 198.82 98.77 130.84 85.38C48.82 69.22 8.11003 167.48 69.87 219.59C127.02 267.8 216.78 224.62 223.48 152.65C229.51 87.96 181.7 42.8 120.31 40Z";

// Centerline of the spiral band, starting at the top tail and winding clockwise directly to the leaf terminus.
const SPIRAL_CENTERLINE =
  "M120.31 52.56 C170 54 213 96 213 141 C213 216 150 248 71.8 203.3 C18 168 55 88 126 97 C178 100 182 178 121.8 183.35";

// The 4 internal leaf tiers (from base to apex):
// 1. Base anchor facet (#2F9E44 - Forest Green) - meets spiral inner end at Y=195.81
const LEAF_BASE =
  "M85.44 156.32L120.32 191.31V195.81C100.87 195.35 85.27 179.39 85.27 159.78C85.27 158.62 85.32 157.46 85.44 156.32Z";

// 2. Lower mid facet (#81C341 - Fresh Green)
const LEAF_LOWER_MID =
  "M92.33 138.301L120.32 166.381V188.751L85.73 154.051C86.65 148.221 88.96 142.851 92.33 138.311V138.301Z";

// 3. Upper mid facet (#ACD037 - Bright Leaf Lime)
const LEAF_UPPER_MID =
  "M120.32 141.67V163.82L93.47 136.88C96.8 132.77 101.04 129.43 105.86 127.16L120.32 141.67Z";

// 4. Apex tip facet (#D9E026 - Energized Yellow-Green)
const LEAF_APEX =
  "M120.32 139.101L107.64 126.351C111.57 124.731 115.84 123.811 120.32 123.711V139.091V139.101Z";

const widths = { sm: 40, md: 72, lg: 120 } as const;

export type AumraaLoaderSize = keyof typeof widths;
export type LoaderSize = AumraaLoaderSize;

const STYLE_ID = "aumraa-loader-styles";

// Loop timeline: 2.5s continuous natural cycle
// 00% - 46%: Spiral grows clockwise along the Fibonacci path, arriving right at the leaf base.
// 44% - 72%: While the spiral finishes, the 4 leaf tiers sprout sequentially one-by-one.
// 72% - 88%: Both spiral and leaf are 100% INTACT in full authentic brand colors, holding with a subtle breath.
// 88% - 100%: Smooth dissolve / reset into the next growth wave.
const CSS = `
@keyframes aumraa-spiral-grow {
  0% {
    stroke-dashoffset: 100;
    opacity: 1;
  }
  46% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
  86% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
  96%, 100% {
    stroke-dashoffset: 0;
    opacity: 0;
  }
}

@keyframes aumraa-leaf-base-sprout {
  0%, 42% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1.08);
  }
  54%, 86% {
    opacity: 1;
    transform: scale(1);
  }
  96%, 100% {
    opacity: 0;
    transform: scale(0.6);
  }
}

@keyframes aumraa-leaf-lowermid-sprout {
  0%, 48% {
    opacity: 0;
    transform: scale(0);
  }
  56% {
    opacity: 1;
    transform: scale(1.08);
  }
  60%, 86% {
    opacity: 1;
    transform: scale(1);
  }
  96%, 100% {
    opacity: 0;
    transform: scale(0.6);
  }
}

@keyframes aumraa-leaf-uppermid-sprout {
  0%, 54% {
    opacity: 0;
    transform: scale(0);
  }
  62% {
    opacity: 1;
    transform: scale(1.08);
  }
  66%, 86% {
    opacity: 1;
    transform: scale(1);
  }
  96%, 100% {
    opacity: 0;
    transform: scale(0.6);
  }
}

@keyframes aumraa-leaf-apex-sprout {
  0%, 60% {
    opacity: 0;
    transform: scale(0);
  }
  68% {
    opacity: 1;
    transform: scale(1.12);
  }
  72%, 86% {
    opacity: 1;
    transform: scale(1);
  }
  96%, 100% {
    opacity: 0;
    transform: scale(0.6);
  }
}

@keyframes aumraa-intact-resonance {
  0%, 68% {
    transform: scale(1);
  }
  78% {
    transform: scale(1.025);
  }
  86%, 100% {
    transform: scale(1);
  }
}

.aumraa-spiral-stroke {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: aumraa-spiral-grow 2.5s cubic-bezier(0.35, 0, 0.25, 1) infinite;
}

.aumraa-intact-mark {
  transform-origin: 120px 145px;
  animation: aumraa-intact-resonance 2.5s ease-in-out infinite;
}

.aumraa-leaf-facet {
  transform-box: fill-box;
  transform-origin: 50% 90%;
}

.aumraa-leaf-base-sprout {
  animation: aumraa-leaf-base-sprout 2.5s cubic-bezier(0.34, 1.4, 0.64, 1) infinite;
}

.aumraa-leaf-lowermid-sprout {
  animation: aumraa-leaf-lowermid-sprout 2.5s cubic-bezier(0.34, 1.4, 0.64, 1) infinite;
}

.aumraa-leaf-uppermid-sprout {
  animation: aumraa-leaf-uppermid-sprout 2.5s cubic-bezier(0.34, 1.4, 0.64, 1) infinite;
}

.aumraa-leaf-apex-sprout {
  animation: aumraa-leaf-apex-sprout 2.5s cubic-bezier(0.34, 1.4, 0.64, 1) infinite;
}

@media (prefers-reduced-motion: reduce) {
  .aumraa-spiral-stroke,
  .aumraa-intact-mark,
  .aumraa-leaf-base-sprout,
  .aumraa-leaf-lowermid-sprout,
  .aumraa-leaf-uppermid-sprout,
  .aumraa-leaf-apex-sprout {
    animation: none !important;
    stroke-dashoffset: 0 !important;
    opacity: 1 !important;
    transform: none !important;
  }
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
  if (el.textContent !== CSS) el.textContent = CSS;
}

export interface AumraaLoaderProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: AumraaLoaderSize;
  /** Caption shown under the loader; also used as the accessible name. */
  label?: string;
  /** Show subtle resting track underneath the growing spiral. Default true. */
  showTrack?: boolean;
}

export type LoaderProps = AumraaLoaderProps;

/**
 * Aumraa brand animated loader:
 * The spiral grows clockwise along the Fibonacci path with its authentic
 * green gradient (#56A545 to #CFCF2A). As the spiral finishes right at the leaf base,
 * the 4 leaf shades sprout sequentially one-by-one, uniting both into
 * the complete, intact Aumraa mark.
 */
export function AumraaLoader({
  size = "md",
  label,
  showTrack = true,
  className,
  ...props
}: AumraaLoaderProps) {
  injectStyles();
  const id = React.useId().replace(/:/g, "");

  const pixelWidth = widths[size];

  return (
    <span
      role="status"
      aria-label={label ?? "Loading"}
      className={cn("inline-flex flex-col items-center gap-2", className)}
      {...props}
    >
      <svg
        aria-hidden="true"
        width={pixelWidth}
        viewBox="0 0 264 280"
        fill="none"
        overflow="visible"
        style={{ aspectRatio: "264 / 280", height: "auto" }}
      >
        <defs>
          {/* Authentic Aumraa Logo linearGradient: exactly from public/assets/logos/aumraa/aumraa_icon.svg */}
          <linearGradient
            id={`${id}-spiral-brand-grad`}
            x1="109"
            y1="181.51"
            x2="185.43"
            y2="88.65"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#56A545" />
            <stop offset="1" stopColor="#CFCF2A" />
          </linearGradient>

          {/* Clip path matching the exact boundary of the Aumraa spiral band */}
          <clipPath id={`${id}-spiral-clip`}>
            <path d={SPIRAL_BAND} />
          </clipPath>
        </defs>

        <g className="aumraa-intact-mark" data-part="intact-mark">
          {/* 1. Subtle Resting Guide Track (faint authentic gradient) */}
          {showTrack && (
            <path
              d={SPIRAL_BAND}
              fill={`url(#${id}-spiral-brand-grad)`}
              opacity={0.12}
              data-part="spiral-track"
            />
          )}

          {/* 2. Clockwise Growing Spiral (Authentic brand gradient #56A545 to #CFCF2A) */}
          <g clipPath={`url(#${id}-spiral-clip)`} data-part="spiral-grow-group">
            <path
              d={SPIRAL_CENTERLINE}
              stroke={`url(#${id}-spiral-brand-grad)`}
              strokeWidth={42}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              pathLength={100}
              className="aumraa-spiral-stroke"
              data-part="spiral-stroke"
            />
          </g>

          {/* 3. Central Leaf Tiers: 4 shades sprouting sequentially as spiral finishes */}
          <g data-part="leaf-group">
            {/* Tier 1: Base - Forest Green #2F9E44 */}
            <path
              d={LEAF_BASE}
              fill="#2F9E44"
              className="aumraa-leaf-facet aumraa-leaf-base-sprout"
              data-part="leaf-base"
            />

            {/* Tier 2: Lower Mid - Fresh Green #81C341 */}
            <path
              d={LEAF_LOWER_MID}
              fill="#81C341"
              className="aumraa-leaf-facet aumraa-leaf-lowermid-sprout"
              data-part="leaf-lowermid"
            />

            {/* Tier 3: Upper Mid - Bright Leaf Lime #ACD037 */}
            <path
              d={LEAF_UPPER_MID}
              fill="#ACD037"
              className="aumraa-leaf-facet aumraa-leaf-uppermid-sprout"
              data-part="leaf-uppermid"
            />

            {/* Tier 4: Apex Tip - Energized Yellow-Green #D9E026 */}
            <path
              d={LEAF_APEX}
              fill="#D9E026"
              className="aumraa-leaf-facet aumraa-leaf-apex-sprout"
              data-part="leaf-apex"
            />
          </g>
        </g>
      </svg>

      {label && <span className="text-xs font-semibold text-muted-foreground">{label}</span>}
    </span>
  );
}

export { AumraaLoader as Loader };
