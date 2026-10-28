/**
 * Kaayo Typography
 * ================
 * Font family: DM Sans (loaded via @expo-google-fonts/dm-sans in app/_layout.tsx).
 *
 * 13.4 of Build Spec — canonical typography roles.
 *
 * Usage:
 *   <Text style={[typography.heading_h1, { color: theme.text.primary }]}>...</Text>
 */

import { TextStyle } from 'react-native';

// -----------------------------------------------------------------------------
// FONT FAMILY NAMES — must match the keys passed to useFonts() in _layout.tsx
// -----------------------------------------------------------------------------

export const kayoFontFamily = {
  regular: 'DMSans_400Regular',
  medium: 'DMSans_500Medium',
  semibold: 'DMSans_600SemiBold',
  bold: 'DMSans_700Bold',
} as const;

// -----------------------------------------------------------------------------
// WEIGHTS
// -----------------------------------------------------------------------------

export const kayoFontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

// -----------------------------------------------------------------------------
// SIZE / LINE-HEIGHT SCALE
// -----------------------------------------------------------------------------

export const kayoFontSize = {
  10: 10,
  12: 12,
  14: 14,
  16: 16,
  18: 18,
  20: 20,
  24: 24,
  28: 28,
  32: 32,
  36: 36,
  40: 40,
  48: 48,
} as const;

export const kayoLineHeight = {
  10: 14,
  12: 16,
  14: 20,
  16: 24,
  18: 26,
  20: 28,
  24: 32,
  28: 36,
  32: 40,
  36: 44,
  40: 48,
  48: 56,
} as const;

// -----------------------------------------------------------------------------
// CANONICAL ROLES — match Section 13.4 table
// -----------------------------------------------------------------------------

export const typography = {
  display_h1: {
    fontFamily: kayoFontFamily.bold,
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: 32 * 0.01, // tablet-only, light tracking
  } satisfies TextStyle,

  heading_h1: {
    fontFamily: kayoFontFamily.bold,
    fontSize: 28,
    lineHeight: 36,
  } satisfies TextStyle,

  heading_h2: {
    fontFamily: kayoFontFamily.semibold,
    fontSize: 24,
    lineHeight: 32,
  } satisfies TextStyle,

  heading_h3: {
    fontFamily: kayoFontFamily.semibold,
    fontSize: 20,
    lineHeight: 28,
  } satisfies TextStyle,

  heading_h4: {
    fontFamily: kayoFontFamily.semibold,
    fontSize: 18,
    lineHeight: 26,
  } satisfies TextStyle,

  body_lg: {
    fontFamily: kayoFontFamily.regular,
    fontSize: 18,
    lineHeight: 26,
  } satisfies TextStyle,

  body_base: {
    fontFamily: kayoFontFamily.regular,
    fontSize: 16,
    lineHeight: 24,
  } satisfies TextStyle,

  body_sm: {
    fontFamily: kayoFontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
  } satisfies TextStyle,

  label_lg: {
    fontFamily: kayoFontFamily.medium,
    fontSize: 16,
    lineHeight: 24,
  } satisfies TextStyle,

  label_sm: {
    fontFamily: kayoFontFamily.semibold,
    fontSize: 14,
    lineHeight: 20,
  } satisfies TextStyle,

  // Utility / badge — UPPERCASE + 5% tracking applied at component level
  utility_badge: {
    fontFamily: kayoFontFamily.semibold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 12 * 0.05,
    textTransform: 'uppercase',
  } satisfies TextStyle,

  utility_badge_tiny: {
    fontFamily: kayoFontFamily.semibold,
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 10 * 0.05,
    textTransform: 'uppercase',
  } satisfies TextStyle,

  // Sentence-case badge text for Chip (Figma `Utility/Badge · Sentence`, `Utility/Badge Tiny · Sentence`):
  // same size / weight as the badges above, no uppercase, no tracking.
  utility_badge_sentence: {
    fontFamily: kayoFontFamily.semibold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0,
  } satisfies TextStyle,

  utility_badge_tiny_sentence: {
    fontFamily: kayoFontFamily.semibold,
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0,
  } satisfies TextStyle,

  numeric_lg: {
    fontFamily: kayoFontFamily.semibold,
    fontSize: 24,
    lineHeight: 32,
  } satisfies TextStyle,

  numeric_md: {
    fontFamily: kayoFontFamily.semibold,
    fontSize: 20,
    lineHeight: 28,
  } satisfies TextStyle,

  table_header: {
    fontFamily: kayoFontFamily.semibold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 12 * 0.05,
    textTransform: 'uppercase',
  } satisfies TextStyle,

  table_cell: {
    fontFamily: kayoFontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
  } satisfies TextStyle,
} as const;

export type TypographyRole = keyof typeof typography;
