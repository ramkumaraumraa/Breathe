import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { kayoRadius, kayoBorder, kayoColors, kayoSpace } from '../../foundations/tokens';
import { theme } from '../../foundations/theme';
import { typography } from '../../foundations/typography';

export type BadgeVariant =
  | 'paid' | 'partial' | 'unpaid' | 'overdue'
  | 'success' | 'warning' | 'error'
  | 'info' | 'neutral' | 'brand';

export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  testID?: string;
}

const VARIANT_COLORS: Record<BadgeVariant, { bg: string; fg: string; border: string }> = {
  paid:    theme.status.paid,
  partial: theme.status.partial,
  unpaid:  theme.status.unpaid,
  overdue: theme.status.overdue,
  success: theme.status.paid,
  warning: theme.status.partial,
  error:   theme.status.overdue,
  info:    { bg: kayoColors.supportive[50], fg: kayoColors.supportive[700], border: kayoColors.supportive[500] },
  neutral: { bg: theme.surface.sunken, fg: theme.text.secondary, border: theme.border.subtle },
  brand:   { bg: theme.brand.primary, fg: theme.text.onPrimary, border: theme.brand.primary },
};

// Pre-compute variant styles at module level to avoid per-render object creation
const VARIANT_STYLES: Record<BadgeVariant, { container: { backgroundColor: string; borderColor: string }; text: { color: string } }> = {
  paid:    { container: { backgroundColor: VARIANT_COLORS.paid.bg, borderColor: VARIANT_COLORS.paid.border }, text: { color: VARIANT_COLORS.paid.fg } },
  partial: { container: { backgroundColor: VARIANT_COLORS.partial.bg, borderColor: VARIANT_COLORS.partial.border }, text: { color: VARIANT_COLORS.partial.fg } },
  unpaid:  { container: { backgroundColor: VARIANT_COLORS.unpaid.bg, borderColor: VARIANT_COLORS.unpaid.border }, text: { color: VARIANT_COLORS.unpaid.fg } },
  overdue: { container: { backgroundColor: VARIANT_COLORS.overdue.bg, borderColor: VARIANT_COLORS.overdue.border }, text: { color: VARIANT_COLORS.overdue.fg } },
  success: { container: { backgroundColor: VARIANT_COLORS.success.bg, borderColor: VARIANT_COLORS.success.border }, text: { color: VARIANT_COLORS.success.fg } },
  warning: { container: { backgroundColor: VARIANT_COLORS.warning.bg, borderColor: VARIANT_COLORS.warning.border }, text: { color: VARIANT_COLORS.warning.fg } },
  error:   { container: { backgroundColor: VARIANT_COLORS.error.bg, borderColor: VARIANT_COLORS.error.border }, text: { color: VARIANT_COLORS.error.fg } },
  info:    { container: { backgroundColor: VARIANT_COLORS.info.bg, borderColor: VARIANT_COLORS.info.border }, text: { color: VARIANT_COLORS.info.fg } },
  neutral: { container: { backgroundColor: VARIANT_COLORS.neutral.bg, borderColor: VARIANT_COLORS.neutral.border }, text: { color: VARIANT_COLORS.neutral.fg } },
  brand:   { container: { backgroundColor: VARIANT_COLORS.brand.bg, borderColor: VARIANT_COLORS.brand.border }, text: { color: VARIANT_COLORS.brand.fg } },
};

export function Badge({ label, variant = 'neutral', size = 'sm', testID }: BadgeProps) {
  const containerStyle = size === 'sm' ? styles.containerSm : styles.containerMd;
  const textStyle = size === 'sm' ? typography.utility_badge_tiny : typography.utility_badge;
  const variantStyle = VARIANT_STYLES[variant];

  return (
    <View
      testID={testID}
      style={[
        styles.base,
        containerStyle,
        variantStyle.container,
      ]}
    >
      <Text style={[textStyle, variantStyle.text]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    borderRadius: kayoRadius.pill,
    borderWidth: kayoBorder.widthHairline,
  },
  containerSm: {
    paddingHorizontal: kayoSpace[2],
    paddingVertical: 2, // sub-grid: below kayoSpace[1] (4px), needed for the tightest pill size
  },
  containerMd: {
    paddingHorizontal: 10, // sub-grid: between kayoSpace[2] (8) and kayoSpace[3] (12)
    paddingVertical: kayoSpace[1],
  },
});
