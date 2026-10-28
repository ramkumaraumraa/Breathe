/**
 * Kaayo Design Tokens
 * ===================
 * Brand prefix: `kayo` (for migration to ULAGELLAM, find-replace `kayo` -> `uglm`).
 *
 * This module is the single source of truth for all colors, spacing, radii,
 * shadows, and brutalist style primitives. Component code must consume tokens
 * from this file (or from `theme.ts` semantic aliases) — NEVER hardcoded values.
 *
 * Mirrors the `--kayo-*` CSS variable spec in Build Spec Section 13.
 *
 * COLOR VALUES ARE OWNED BY FIGMA. `kayoColors` mirrors the `Kaayo/Colors`
 * variable collection in the Kaayo Figma file stop-for-stop; if a stop changes
 * there, change it here — never the other way round. Which stop a semantic role
 * points at is owned by `theme.ts` (the neutral ramp is weighted light, so the
 * text/border roles map onto the 800–950 stops to hold WCAG AA contrast).
 */

// -----------------------------------------------------------------------------
// 13.2 — RAW COLOR FAMILIES (8 families × 15 stops)
// -----------------------------------------------------------------------------

export const kayoColors = {
  // PRIMARY — Tutor Crimson (canonical: Breathe DS crimson family)
  primary: {
    25: '#FBF5F5',
    50: '#EACCCD',
    75: '#E2B8B8',
    100: '#DAA4A4',
    200: '#C97B7C',
    300: '#B85254',
    400: '#A82A2B',
    500: '#970103',
    600: '#830507',
    700: '#6F090C',
    800: '#5B0D10',
    900: '#461215',
    925: '#3C1417',
    950: '#321619',
    975: '#28181C',
  },
  // SECONDARY — Warm Peach (canonical: Breathe DS peach family)
  secondary: {
    25: '#FFF4F0',
    50: '#FFEDE6',
    75: '#FEE6DC',
    100: '#FEDFD2',
    200: '#FED0BD',
    300: '#FEC2A9',
    400: '#FDB395',
    500: '#FDA581',
    600: '#D98F71',
    700: '#B47962',
    800: '#906352',
    900: '#6B4D42',
    925: '#59423A',
    950: '#473733',
    975: '#342C2B',
  },
  // TERTIARY — Deep Navy (canonical: Breathe DS navy family)
  tertiary: {
    25: '#E7E8EB',
    50: '#D7D9DE',
    75: '#C7CAD1',
    100: '#B7BBC4',
    200: '#979CAA',
    300: '#777E90',
    400: '#575F76',
    500: '#37415C',
    600: '#323B52',
    700: '#2D3548',
    800: '#292F3F',
    900: '#242935',
    925: '#212630',
    950: '#1F232B',
    975: '#1D2026',
  },
  // POSITIVE — Paid / success
  positive: {
    25: '#E1F3E4',
    50: '#CCEAD1',
    75: '#B8E2BF',
    100: '#A4DAAD',
    200: '#7BC988',
    300: '#52B863',
    400: '#2AA83F',
    500: '#01971A',
    600: '#05831B',
    700: '#096F1C',
    800: '#0D5B1C',
    900: '#10481D',
    925: '#123E1E',
    950: '#14341E',
    975: '#162A1E',
  },
  // ALERT — Partial / pending / warning
  alert: {
    25: '#FEEBE2',
    50: '#FDDECE',
    75: '#FCD1BB',
    100: '#FBC3A7',
    200: '#FAA980',
    300: '#F88E59',
    400: '#F77432',
    500: '#F5590B',
    600: '#D24F0E',
    700: '#AF4511',
    800: '#8B3B15',
    900: '#683118',
    925: '#572C19',
    950: '#45271B',
    975: '#33221D',
  },
  // NEGATIVE — Overdue / destructive
  negative: {
    25: '#FBE5E5',
    50: '#F8D4D4',
    75: '#F5C2C2',
    100: '#F2B1B1',
    200: '#ED8E8E',
    300: '#E76B6B',
    400: '#E24949',
    500: '#DC2626',
    600: '#BD2425',
    700: '#9E2224',
    800: '#7E2123',
    900: '#5F1F22',
    925: '#501E21',
    950: '#401D20',
    975: '#301C20',
  },
  // SUPPORTIVE — Information / links
  supportive: {
    25: '#E5EEFB',
    50: '#D4E2F8',
    75: '#C2D7F5',
    100: '#B1CBF2',
    200: '#8EB4ED',
    300: '#6B9DE7',
    400: '#4986E2',
    500: '#266FDC',
    600: '#2461BE',
    700: '#2254A0',
    800: '#204781',
    900: '#1E3963',
    925: '#1D3254',
    950: '#1C2C45',
    975: '#1B2536',
  },
  // NEUTRAL — one ramp for surfaces, borders, text and icons (Breathe DS `color.neutral`;
  // the old neutralWhite/neutralBlack pair was collapsed into this in Figma). 975 is the
  // darkest stop, never #000.
  neutral: {
    25: '#FFFFFF',
    50: '#F8F8F8',
    75: '#F0F1F1',
    100: '#E8E8E9',
    200: '#D9DADB',
    300: '#C3C4C5',
    400: '#9FA0A2',
    500: '#757678',
    600: '#5F6163',
    700: '#4C4E51',
    800: '#3A3B3F',
    900: '#2A2C30',
    925: '#202225',
    950: '#17191D',
    975: '#0D1014',
  },
} as const;

// -----------------------------------------------------------------------------
// 13.5 — SPACING SCALE (4px base)
// -----------------------------------------------------------------------------

export const kayoSpace = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
} as const;

// -----------------------------------------------------------------------------
// 13.6 — RADIUS SCALE
// Neo-Brutalist constraint: NO radius above 12 except pill.
// -----------------------------------------------------------------------------

export const kayoRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  pill: 999,
} as const;

// -----------------------------------------------------------------------------
// 13.7 / 13.12 — ELEVATION
// Brutalist hard offset shadows (NOT blurred). Uses the unified boxShadow API
// (React Native 0.76+) which renders natively on iOS, Android, and web.
// elevation: 0 prevents Android from adding a material-design shadow on top.
// -----------------------------------------------------------------------------

const _sh = kayoColors.neutral[950];

export const kayoShadow = {
  none: { boxShadow: 'none', elevation: 0 },
  sm:   { boxShadow: `2px 2px 0 ${_sh}`, elevation: 0 },
  md:   { boxShadow: `4px 4px 0 ${_sh}`, elevation: 0 },
  lg:   { boxShadow: `6px 6px 0 ${_sh}`, elevation: 0 },
  xl:   { boxShadow: `8px 8px 0 ${_sh}`, elevation: 0 },
} as const;

const _shadowOffsetPx: Record<'sm' | 'md' | 'lg' | 'xl', number> = { sm: 2, md: 4, lg: 6, xl: 8 };

/**
 * Colored-surface shadow — kayoShadow's neutral[950] reads as a generic dark
 * halo on a colored (non-canvas) surface. Pass a dark stop from the surface's own
 * color family (e.g. kayoColors.primary[900]) to keep the hard-offset shadow on-brand.
 */
export function kayoShadowTinted(color: string, size: 'sm' | 'md' | 'lg' | 'xl' = 'sm') {
  const px = _shadowOffsetPx[size];
  return { boxShadow: `${px}px ${px}px 0 ${color}`, elevation: 0 } as const;
}

/** Straight-down hard shadow (0/2) - clay tracks and cards that sit on the canopy edge. */
export function kayoShadowDrop(color: string) {
  return { boxShadow: `0px 2px 0px 0px ${color}`, elevation: 0 } as const;
}

// -----------------------------------------------------------------------------
// SOFT CLAY (Skeuomorphism 2.0) — blurred dual shadows, light source top-left.
// Shade = warm Secondary/200, light = Neutral/25 by default; pass ramp stops to
// tint (e.g. positive[200], primary[100]). Opaque brand tints only, never rgba.
// Pressed clay = raised -> inset of the same size + scale 0.98 (120 ms).
// Figma effect styles: Kaayo/Clay/Raised SM|MD|LG, Inset SM|MD|LG, Outlined card.
// -----------------------------------------------------------------------------

type ClaySize = 'sm' | 'md' | 'lg';

// [shade x, shade y, shade blur, light offset, light blur]
const _clayRaised: Record<ClaySize, readonly [number, number, number, number, number]> = {
  sm: [2, 3, 6, 2, 4],
  md: [5, 6, 14, 4, 10],
  lg: [8, 10, 22, 6, 14],
};
// [shade offset, shade blur, light offset, light blur]
const _clayInset: Record<ClaySize, readonly [number, number, number, number]> = {
  sm: [2, 4, 2, 4],
  md: [3, 6, 3, 6],
  lg: [4, 10, 4, 8],
};

export const kayoClay = {
  raised(size: ClaySize = 'sm', shade: string = kayoColors.secondary[200], light: string = kayoColors.neutral[25]) {
    const [sx, sy, sb, lo, lb] = _clayRaised[size];
    return { boxShadow: `-${lo}px -${lo}px ${lb}px 0px ${light}, ${sx}px ${sy}px ${sb}px 0px ${shade}`, elevation: 0 } as const;
  },
  inset(size: ClaySize = 'sm', shade: string = kayoColors.secondary[200], light: string = kayoColors.neutral[25]) {
    const [so, sb, lo, lb] = _clayInset[size];
    return { boxShadow: `inset ${so}px ${so}px ${sb}px 0px ${shade}, inset -${lo}px -${lo}px ${lb}px 0px ${light}`, elevation: 0 } as const;
  },
  /** Outlined clay card: hard rims (dark bottom-right, light top-left) + warm lift. Pair with a 2px Secondary/975 border, radius 24. */
  outlined: {
    boxShadow: `2px 2px 0px 0px ${kayoColors.secondary[700]}, -2px -2px 0px 0px ${kayoColors.secondary[200]}, 8px 10px 22px 0px ${kayoColors.secondary[200]}`,
    elevation: 0,
  },
} as const;

// -----------------------------------------------------------------------------
// BRUTALIST BORDER — 2px solid, always.
// -----------------------------------------------------------------------------

export const kayoBorder = {
  width: 2,
  widthHairline: 1,
} as const;

// -----------------------------------------------------------------------------
// MOTION
// -----------------------------------------------------------------------------

/**
 * Durations for micro-interactions, in ms. Deliberately short — the visual language is
 * neo-brutalist (hard shadows, 2px translate on press), so motion should feel snappy and
 * mechanical rather than soft and bouncy.
 */
export const kayoMotion = {
  /** Icon swaps, toggles. */
  fast: 140,
  /** Menus, sheets, entrances. */
  base: 200,
} as const;

// -----------------------------------------------------------------------------
// LAYOUT BREAKPOINT
// -----------------------------------------------------------------------------

export const kayoBreakpoint = {
  mobileLarge: 640,
  tablet: 768, // >= 768px -> tablet layout (sidebar, 8-col grid)
  tabletLarge: 1024,
  desktop: 1280,
  desktopLarge: 1536,
} as const;

// -----------------------------------------------------------------------------
// GRID
// -----------------------------------------------------------------------------

export const kayoGrid = {
  mobile: { columns: 4, gutter: kayoSpace[4], margin: kayoSpace[4] },
  mobileLarge: { columns: 8, gutter: kayoSpace[4], margin: kayoSpace[6] },
  tablet: { columns: 8, gutter: kayoSpace[6], margin: kayoSpace[8] },
  tabletLarge: { columns: 12, gutter: kayoSpace[6], margin: kayoSpace[12] },
  desktop: { columns: 12, gutter: kayoSpace[8], margin: kayoSpace[16] },
  desktopLarge: { columns: 12, gutter: kayoSpace[8], margin: kayoSpace[20] },
} as const;

export type KayoGridSpec = (typeof kayoGrid)[keyof typeof kayoGrid];

export function getKayoGridSpec(width: number): KayoGridSpec {
  if (width >= kayoBreakpoint.desktopLarge) return kayoGrid.desktopLarge;
  if (width >= kayoBreakpoint.desktop) return kayoGrid.desktop;
  if (width >= kayoBreakpoint.tabletLarge) return kayoGrid.tabletLarge;
  if (width >= kayoBreakpoint.tablet) return kayoGrid.tablet;
  if (width >= kayoBreakpoint.mobileLarge) return kayoGrid.mobileLarge;
  return kayoGrid.mobile;
}

// -----------------------------------------------------------------------------
// Type helpers
// -----------------------------------------------------------------------------

export type KayoColorFamily = keyof typeof kayoColors;
export type KayoColorStop = keyof (typeof kayoColors)['primary'];
