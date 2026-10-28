/**
 * Chip (Figma 74705:117): soft inset information chip, never tappable. Fill Tone/25, Kaayo/Clay/Inset SM
 * shaded in Tone/100, label in Tone/900, sentence case (pass already-uppercase copy where Figma uses it,
 * e.g. the next-class "TODAY" / "STARTS IN 25M"). SM 8/3 on cards, MD 10/5 on canopy pills and the
 * notification date pill, Count 10/4 with Label/SM Neutral/950 for roll-call / day-progress counts.
 * Not a Badge (outlined status), ChoiceChip (selectable), EnrollmentTag or ClayPill (action).
 */
import React from 'react';
import { StyleSheet, Text, View, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';

import { kayoClay, kayoColors, kayoRadius } from '../../foundations/tokens';
import { typography } from '../../foundations/typography';
import { StatusDot } from './StatusDot';
import { chipTone, type ChipTone, type DotStatus } from './status-tones';

export type { ChipTone } from './status-tones';

export interface ChipProps {
  label: string;
  tone?: ChipTone;
  size?: 'sm' | 'md' | 'count';
  /** A StatusDot (size 8) before the label. */
  dot?: DotStatus;
  /** A lucide icon (drawn 12, or 14 trailing on MD, in the label colour) or a ready element. */
  icon?: LucideIcon | React.ReactElement;
  iconPosition?: 'leading' | 'trailing';
  /** Overrides the icon colour, e.g. the growth pill's Positive/600 TrendingUp. */
  iconColor?: string;
  /** Label override, e.g. `typography.utility_badge_sentence` on the Students growth pill. */
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityLabel?: string;
}

const PAD = { sm: [8, 3], md: [10, 5], count: [10, 4] } as const;

export function Chip({
  label,
  tone = 'secondary',
  size = 'sm',
  dot,
  icon,
  iconPosition = 'leading',
  iconColor,
  textStyle,
  style,
  testID,
  accessibilityLabel,
}: ChipProps) {
  const t = chipTone(tone);
  const ink = size === 'count' ? kayoColors.neutral[950] : t.ink;
  const iconSize = iconPosition === 'trailing' && size === 'md' ? 14 : 12;
  const Icon = icon && !React.isValidElement(icon) ? (icon as LucideIcon) : null;
  const iconNode = icon ? (Icon ? <Icon size={iconSize} color={iconColor ?? ink} strokeWidth={2.5} /> : (icon as React.ReactElement)) : null;
  const [px, py] = PAD[size];

  return (
    <View
      style={[
        styles.chip,
        { paddingHorizontal: px, paddingVertical: py, backgroundColor: t.fill },
        kayoClay.inset('sm', t.shade),
        style,
      ]}
      accessible={accessibilityLabel ? true : undefined}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
    >
      {dot ? <StatusDot status={dot} /> : null}
      {iconPosition === 'leading' ? iconNode : null}
      <Text
        style={[size === 'count' ? typography.label_sm : typography.utility_badge_tiny_sentence, styles.label, { color: ink }, textStyle]}
        numberOfLines={1}
      >
        {label}
      </Text>
      {iconPosition === 'trailing' ? iconNode : null}
    </View>
  );
}

const styles = StyleSheet.create({
  chip: { flexDirection: 'row', alignItems: 'center', gap: 6, flexShrink: 1, borderRadius: kayoRadius.pill },
  label: { flexShrink: 1 },
});
