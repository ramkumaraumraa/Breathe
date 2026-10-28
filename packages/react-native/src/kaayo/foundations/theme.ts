/**
 * Kaayo Semantic Theme Aliases
 * ============================
 * Component code consumes these tokens. NEVER raw color stops directly.
 * Mirrors Section 13.3 of Build Spec.
 */

import { kayoColors } from './tokens';

export const theme = {
  // Surfaces
  surface: {
    canvas: kayoColors.neutral[50], // app background
    card: kayoColors.neutral[25], // raised card
    raised: kayoColors.neutral[25],
    sunken: kayoColors.neutral[75],
    inverse: kayoColors.neutral[950],
  },

  // Text
  text: {
    primary: kayoColors.neutral[950],
    secondary: kayoColors.neutral[800],
    tertiary: kayoColors.neutral[500],
    disabled: kayoColors.neutral[400],
    inverse: kayoColors.neutral[25],
    link: kayoColors.supportive[500],
    onPrimary: kayoColors.neutral[25],
  },

  // Borders (Neo-Brutalist: always 2px solid via tokens.kayoBorder.width)
  border: {
    subtle: kayoColors.neutral[75],
    default: kayoColors.neutral[200],
    strong: kayoColors.neutral[950], // hard brutalist border
    focus: kayoColors.supportive[500],
  },

  // Overlay (modal/dialog backdrops)
  overlay: {
    scrim: 'rgba(23, 25, 29, 0.55)', // neutral[950] @ 55%
    /** Light dim behind the quick-actions FAB menu - the page stays readable. */
    scrimLight: 'rgba(23, 25, 29, 0.16)', // neutral[950] @ 16%
    /** PhotoViewer backdrop - the photo sits on near-black. */
    photo: 'rgba(23, 25, 29, 0.7)', // neutral[950] @ 70%
  },

  // Payment status (semantic)
  status: {
    paid: {
      bg: kayoColors.positive[50],
      fg: kayoColors.positive[700],
      border: kayoColors.positive[500],
    },
    partial: {
      bg: kayoColors.alert[50],
      fg: kayoColors.alert[700],
      border: kayoColors.alert[500],
    },
    unpaid: {
      bg: kayoColors.neutral[200],
      fg: kayoColors.neutral[800],
      border: kayoColors.neutral[800],
    },
    overdue: {
      bg: kayoColors.negative[50],
      fg: kayoColors.negative[700],
      border: kayoColors.negative[500],
    },
  },

  // Actions
  action: {
    primary: {
      bg: kayoColors.primary[500],
      bgHover: kayoColors.primary[600],
      bgPressed: kayoColors.primary[700],
      fg: kayoColors.neutral[25],
    },
    secondary: {
      bg: kayoColors.neutral[25],
      bgHover: kayoColors.neutral[50],
      bgPressed: kayoColors.neutral[75],
      fg: kayoColors.neutral[950],
    },
    destructive: {
      bg: kayoColors.negative[500],
      bgHover: kayoColors.negative[600],
      fg: kayoColors.neutral[25],
    },
  },

  // Brand accent (header / sidebar nav active)
  brand: {
    primary: kayoColors.primary[500],
    primaryDeep: kayoColors.primary[700],
    accent: kayoColors.secondary[400],
  },
} as const;

export type Theme = typeof theme;
