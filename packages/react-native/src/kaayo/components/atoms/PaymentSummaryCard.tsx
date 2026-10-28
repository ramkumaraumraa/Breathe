import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp, TrendingDown, Wallet, Users, ChevronRight } from 'lucide-react-native';

import { Card } from './Card';
import { Button } from './Button';
import { AmountVisibilityToggle } from './AmountVisibilityToggle';
import { WarliVeil } from './WarliVeil';
import { theme } from '../../foundations/theme';
import { typography } from '../../foundations/typography';
import { kayoSpace, kayoBorder, kayoColors } from '../../foundations/tokens';
import { formatRupees } from '../../utils/currency';

function compactRupees(n: number): string {
  if (n >= 100_000) return `₹${(n / 100_000).toFixed(1)}L`;
  if (n >= 1_000) return `₹${Math.round(n / 1_000)}k`;
  return `₹${n}`;
}

interface MetricBlockProps {
  label: string;
  value: string;
  Icon: typeof Users;
  color: string;
  isVisible: boolean;
  compact: boolean;
}

function MetricBlock({ label, value, Icon, color, isVisible, compact }: MetricBlockProps) {
  return (
    <View style={s.metricBlock}>
      <View style={s.metricLabelRow}>
        <Icon size={compact ? 11 : 13} color={color} strokeWidth={2.25} />
        <Text style={[s.metricLabel, { color, fontSize: compact ? 10 : 11 }]}>{label}</Text>
      </View>
      <WarliVeil
        value={value}
        visible={isVisible}
        textStyle={[compact ? typography.heading_h3 : typography.heading_h2, { color: theme.text.primary }]}
      />
    </View>
  );
}

interface StudentStatProps {
  label: string;
  value: number;
  labelColor: string;
  valueColor: string;
  isVisible: boolean;
  compact: boolean;
}

function StudentStat({ label, value, labelColor, valueColor, isVisible, compact }: StudentStatProps) {
  return (
    <View style={s.studentStat}>
      <Text style={[s.studentStatLabel, { color: labelColor, fontSize: compact ? 10 : 11 }]} numberOfLines={2}>
        {label}
      </Text>
      <WarliVeil
        value={value}
        visible={isVisible}
        kind="count"
        textStyle={[compact ? typography.label_sm : typography.numeric_lg, { color: valueColor }]}
      />
    </View>
  );
}

function FinancialMetrics({ expected, collected, pending, fmt, isVisible, compact }: {
  expected: number; collected: number; pending: number;
  fmt: (n: number) => string; isVisible: boolean; compact: boolean;
}) {
  return (
    <View style={s.metricsStack}>
      <MetricBlock label="EXPECTED" value={fmt(expected)} Icon={TrendingUp} color={kayoColors.tertiary[500]} isVisible={isVisible} compact={compact} />
      <View style={s.divider} />
      <View style={s.metricsRow}>
        <MetricBlock label="COLLECTED" value={fmt(collected)} Icon={Wallet} color={kayoColors.positive[600]} isVisible={isVisible} compact={compact} />
        <View style={s.metricSep} />
        <MetricBlock label="PENDING" value={fmt(pending)} Icon={TrendingDown} color={kayoColors.alert[600]} isVisible={isVisible} compact={compact} />
      </View>
    </View>
  );
}

function StudentStats({ totalStudents, paidStudents, unpaidStudents, isVisible, compact }: {
  totalStudents: number; paidStudents: number; unpaidStudents: number;
  isVisible: boolean; compact: boolean;
}) {
  return (
    <View style={s.metricsStack}>
      <StudentStat label="Total Students" value={totalStudents} labelColor={theme.text.tertiary} valueColor={theme.text.primary} isVisible={isVisible} compact={compact} />
      <View style={s.divider} />
      <View style={s.studentRow}>
        <StudentStat label="Paid" value={paidStudents} labelColor={kayoColors.positive[600]} valueColor={theme.text.primary} isVisible={isVisible} compact={compact} />
        <View style={s.studentSep} />
        <StudentStat label="Unpaid" value={unpaidStudents} labelColor={kayoColors.alert[600]} valueColor={kayoColors.alert[600]} isVisible={isVisible} compact={compact} />
      </View>
    </View>
  );
}

export interface PaymentSummaryCardProps {
  title?: string;
  expected: number;
  collected: number;
  pending: number;
  totalStudents: number;
  paidStudents: number;
  unpaidStudents: number;
  isVisible?: boolean;
  onToggleVisibility?: () => void;
  compact?: boolean;
  /** Render financials and student stats as two same-style cards instead of one. */
  split?: boolean;
  /** Split mode only: shows a "View branch-wise details" CTA beneath the cards. */
  onViewDetails?: () => void;
  style?: object;
}

export function PaymentSummaryCard({
  title,
  expected,
  collected,
  pending,
  totalStudents,
  paidStudents,
  unpaidStudents,
  isVisible = true,
  onToggleVisibility,
  compact = false,
  split = false,
  onViewDetails,
  style,
}: PaymentSummaryCardProps) {
  const fmt = compact ? compactRupees : formatRupees;

  if (split) {
    return (
      <View style={[s.splitWrap, style]}>
        <Card padding="md">
          <View style={s.headerRow}>
            <Text style={[typography.heading_h3, { color: theme.text.primary }]}>Financial Overview</Text>
            {onToggleVisibility ? (
              <AmountVisibilityToggle
                visible={isVisible}
                onToggle={onToggleVisibility}
                testID="payments-amount-visibility-toggle"
              />
            ) : null}
          </View>
          <FinancialMetrics expected={expected} collected={collected} pending={pending} fmt={fmt} isVisible={isVisible} compact={compact} />
        </Card>
        <Card padding="md">
          <Text style={[typography.heading_h3, { color: theme.text.primary, marginBottom: kayoSpace[4] }]}>
            Student Statistics
          </Text>
          <StudentStats totalStudents={totalStudents} paidStudents={paidStudents} unpaidStudents={unpaidStudents} isVisible={isVisible} compact={compact} />
        </Card>
        {onViewDetails ? (
          <Button
            label="View branch-wise details"
            variant="primary"
            size="sm"
            onPress={onViewDetails}
            iconRight={<ChevronRight size={16} color={theme.action.primary.fg} strokeWidth={2.25} />}
            testID="view-branch-details-cta"
          />
        ) : null}
      </View>
    );
  }

  return (
    <Card padding="md" style={style}>
      {title || onToggleVisibility ? (
        <View style={s.headerRow}>
          {title ? (
            <Text style={[compact ? typography.heading_h4 : typography.heading_h3, { color: theme.text.primary }]}>
              {title}
            </Text>
          ) : <View />}
          {onToggleVisibility ? (
            <AmountVisibilityToggle
              visible={isVisible}
              onToggle={onToggleVisibility}
              testID="payments-amount-visibility-toggle"
            />
          ) : null}
        </View>
      ) : null}

      <FinancialMetrics expected={expected} collected={collected} pending={pending} fmt={fmt} isVisible={isVisible} compact={compact} />

      <View style={s.divider} />

      <StudentStats totalStudents={totalStudents} paidStudents={paidStudents} unpaidStudents={unpaidStudents} isVisible={isVisible} compact={compact} />
    </Card>
  );
}

const s = StyleSheet.create({
  splitWrap: {
    gap: kayoSpace[4],
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: kayoSpace[3],
    marginBottom: kayoSpace[4],
  },
  metricsStack: {
    gap: kayoSpace[4],
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: kayoSpace[3],
  },
  metricBlock: {
    flex: 1,
    gap: kayoSpace[2],
  },
  metricLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricLabel: {
    fontFamily: 'DMSans_600SemiBold',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  metricSep: {
    width: kayoBorder.width,
    alignSelf: 'stretch',
    backgroundColor: theme.border.subtle,
  },
  divider: {
    height: kayoBorder.width,
    backgroundColor: theme.border.subtle,
    marginVertical: kayoSpace[4],
  },
  studentRow: {
    flexDirection: 'row',
    gap: kayoSpace[3],
  },
  studentStat: {
    flex: 1,
    gap: kayoSpace[1],
  },
  studentStatLabel: {
    fontFamily: 'DMSans_400Regular',
  },
  studentSep: {
    width: kayoBorder.widthHairline,
    alignSelf: 'stretch',
    backgroundColor: theme.border.subtle,
  },
});
