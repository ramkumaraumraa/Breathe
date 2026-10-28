/**
 * Month calendar bottom sheet (Figma "Calendar sheet" 74428:7481), opened from the WeekStrip's month
 * label. Monday-first grid with the same day-status dots; ‹ › step the month; tapping a day selects
 * it and closes. The caller owns `month` so it can fetch `statuses` for exactly that month.
 */
import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useReducedMotion } from 'react-native-reanimated';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

import { kayoClay, kayoColors, kayoRadius } from '../../foundations/tokens';
import { theme } from '../../foundations/theme';
import { typography } from '../../foundations/typography';
import { monthGrid, monthLabel, shiftMonth } from '../../utils/date';
import { ClayKnob } from '../atoms/ClayKnob';
import { StatusDot, type DotStatus } from '../atoms/StatusDot';
import { dayCellLabel, dayCellStates, dayDot, dayNumberColor, type DayStatus } from './WeekStrip';

const c = kayoColors;
const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const LEGEND: { status: DotStatus; label: string }[] = [
  { status: 'active', label: 'All marked' },
  { status: 'pending', label: 'Needs marking' },
  { status: 'upcoming', label: 'Upcoming' },
];

export interface MonthCalendarSheetProps {
  visible: boolean;
  /** YYYY-MM on show. */
  month: string;
  onMonthChange: (month: string) => void;
  selected: string;
  today: string;
  /** Keyed by YYYY-MM-DD for `month`; a missing date shows no dot. */
  statuses: Partial<Record<string, DayStatus>>;
  /** A day was tapped; the sheet also calls onClose. */
  onSelect: (date: string) => void;
  onClose: () => void;
  testID?: string;
}

export function MonthCalendarSheet({
  visible,
  month,
  onMonthChange,
  selected,
  today,
  statuses,
  onSelect,
  onClose,
  testID = 'month-calendar-sheet',
}: MonthCalendarSheetProps) {
  const reduceMotion = useReducedMotion();
  return (
    <Modal visible={visible} transparent animationType={reduceMotion ? 'none' : 'slide'} onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} testID={`${testID}-scrim`}>
        <Pressable style={styles.sheet} onPress={() => {}} accessible={false} testID={testID}>
          <View style={styles.grabber} />
          {visible && month ? (
            <>
              <View style={styles.nav}>
                <Knob label="Previous month" onPress={() => onMonthChange(shiftMonth(month, -1))} testID={`${testID}-prev`}>
                  <ChevronLeft size={20} color={c.neutral[950]} strokeWidth={2.25} />
                </Knob>
                <Text style={[typography.heading_h3, { color: c.neutral[950] }]} accessibilityRole="header">
                  {monthLabel(month)}
                </Text>
                <Knob label="Next month" onPress={() => onMonthChange(shiftMonth(month, 1))} testID={`${testID}-next`}>
                  <ChevronRight size={20} color={c.neutral[950]} strokeWidth={2.25} />
                </Knob>
              </View>

              <View style={styles.grid}>
                <View style={styles.row}>
                  {WEEKDAYS.map((d, i) => (
                    <Text key={i} style={[typography.utility_badge, styles.cell, styles.weekday]}>{d}</Text>
                  ))}
                </View>
                {monthGrid(month).map((week, w) => (
                  <View key={w} style={styles.row}>
                    {week.map((date, i) => {
                      if (!date) return <View key={i} style={styles.cell} />;
                      const status = statuses[date];
                      const isSelected = date === selected;
                      return (
                        <Pressable
                          key={date}
                          onPress={() => {
                            onSelect(date);
                            onClose();
                          }}
                          style={[styles.cell, styles.day, date === today && dayCellStates.today, isSelected && dayCellStates.selected]}
                          accessibilityRole="button"
                          accessibilityLabel={dayCellLabel(date, status)}
                          accessibilityState={{ selected: isSelected }}
                          testID={`${testID}-day-${date}`}
                        >
                          <Text style={[typography.label_lg, { color: dayNumberColor(status, isSelected) }]}>
                            {Number(date.slice(8))}
                          </Text>
                          {dayDot(status, 5, isSelected)}
                        </Pressable>
                      );
                    })}
                  </View>
                ))}
              </View>

              <View style={styles.legend}>
                {LEGEND.map((l) => (
                  <View key={l.status} style={styles.legendItem}>
                    <StatusDot status={l.status} />
                    <Text style={[typography.body_sm, { color: c.neutral[800] }]}>{l.label}</Text>
                  </View>
                ))}
              </View>
            </>
          ) : null}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function Knob({ label, onPress, testID, children }: { label: string; onPress: () => void; testID: string; children: React.ReactNode }) {
  return (
    <Pressable onPress={onPress} hitSlop={6} accessibilityRole="button" accessibilityLabel={label} testID={testID}>
      <ClayKnob state="nav">{children}</ClayKnob>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: theme.overlay.scrim, justifyContent: 'flex-end' },
  sheet: {
    gap: 14,
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 28,
    backgroundColor: c.secondary[25],
    borderTopWidth: 2,
    borderColor: c.secondary[975],
    borderTopLeftRadius: 24, // clay surface radius (design-direction.md)
    borderTopRightRadius: 24,
  },
  grabber: { alignSelf: 'center', width: 40, height: 4, borderRadius: kayoRadius.pill, backgroundColor: c.secondary[300] },
  nav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  grid: {
    gap: 4,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 20,
    backgroundColor: c.neutral[25],
    ...kayoClay.inset('sm'),
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  cell: { width: 44, flexShrink: 1 }, // 7 × 44 shrinks a little on 360dp phones
  weekday: { color: c.neutral[600], textAlign: 'center' },
  day: { height: 44, alignItems: 'center', justifyContent: 'center', gap: 2, borderRadius: 12 },
  legend: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 16 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
});
