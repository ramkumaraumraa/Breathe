/**
 * Attendance week strip (Figma 74424:7140, day cell 74424:7139). Seven days with today second from
 * the right; swipe right for earlier weeks (up to WEEKS_BACK_MAX), tap the month label for the
 * month sheet. Owns its window: a selected date outside it moves the window to show it. Status
 * dots come in through `statuses` (all branches) - fetch them for the window `onWindowChange` reports.
 */
import React, { useEffect, useEffectEvent, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeInLeft, FadeInRight, useReducedMotion } from 'react-native-reanimated';
import { Calendar, ChevronDown } from 'lucide-react-native';
import { format, parse } from 'date-fns';

import { kayoClay, kayoColors, kayoMotion, kayoRadius, kayoShadow, kayoShadowTinted } from '../../foundations/tokens';
import { typography } from '../../foundations/typography';
import { StatusDot, type DotStatus } from '../atoms/StatusDot';
import { monthLabel, swipeWeek, weekDates, weekOffsetFor } from '../../utils/date';

const c = kayoColors;

export type DayStatus = 'done' | 'pending' | 'upcoming' | 'none';

const STATUS_WORDS: Record<DayStatus, string> = {
  done: 'all marked',
  pending: 'needs marking',
  upcoming: 'upcoming',
  none: 'no sessions',
};

/** "Thu 18 Jun, all marked" - the day cell's accessibility label (strip and month sheet); no status words while loading. */
export function dayCellLabel(date: string, status: DayStatus | undefined): string {
  const day = format(parse(date, 'yyyy-MM-dd', new Date()), 'EEE d MMM');
  return status ? `${day}, ${STATUS_WORDS[status]}` : day;
}

/** Day status -> StatusDot; 'none' has no dot. */
const DAY_DOT: Record<DayStatus, DotStatus | null> = { done: 'active', pending: 'pending', upcoming: 'upcoming', none: null };

/** The day cell's StatusDot; `inverse` = on the red selected cell. 'none' and loading (undefined) keep the space with no dot. */
export function dayDot(status: DayStatus | undefined, size: 6 | 5, inverse: boolean) {
  const dot = status ? DAY_DOT[status] : null;
  return dot ? <StatusDot status={dot} size={size} inverse={inverse} /> : <View style={{ width: size, height: size }} />;
}

/** Today outline and Selected fill, shared with MonthCalendarSheet's day cells. */
export const dayCellStates = StyleSheet.create({
  today: { borderWidth: 1.5, borderColor: c.primary[500], ...kayoShadow.none },
  selected: {
    backgroundColor: c.primary[500],
    borderWidth: 2,
    borderColor: c.primary[700],
    ...kayoShadowTinted(c.primary[900]),
  },
});

/** Date number colour: muted for upcoming and no-session days, white when selected; neutral while loading. */
export function dayNumberColor(status: DayStatus | undefined, selected: boolean): string {
  if (selected) return c.neutral[25];
  return status === 'upcoming' || status === 'none' ? c.neutral[500] : c.neutral[950];
}

export interface WeekStripProps {
  selected: string;
  today: string;
  /** Keyed by YYYY-MM-DD; a missing date (still loading) shows no dot and a neutral number. */
  statuses: Partial<Record<string, DayStatus>>;
  onSelect: (date: string) => void;
  /** Month label tapped; gets the YYYY-MM the strip is showing. */
  onOpenMonth: (month: string) => void;
  /** The visible window's first and last date, on mount and whenever it moves - feed useDayStatuses. */
  onWindowChange: (from: string, to: string) => void;
  testID?: string;
}

const SWIPE_DISTANCE = 40;
const SWIPE_VELOCITY = 400;

export function WeekStrip({ selected, today, statuses, onSelect, onOpenMonth, onWindowChange, testID = 'week-strip' }: WeekStripProps) {
  const reduceMotion = useReducedMotion();
  // `anchor` = the selection this page was set for. A new selection outside the page moves it (and
  // re-anchors, so a later pick of an old anchor still moves it); swiping away from an unchanged
  // selection doesn't snap back. `dir` = last swipe, for the slide; `jumped` = moved by a selection.
  const [page, setPage] = useState({ offset: weekOffsetFor(selected, today), anchor: selected, dir: 0, jumped: false });
  if (page.anchor !== selected) {
    const keeps = weekDates(today, page.offset).includes(selected);
    setPage({ offset: keeps ? page.offset : weekOffsetFor(selected, today), anchor: selected, dir: 0, jumped: !keeps });
  }
  const offset = page.offset;
  const days = weekDates(today, offset);
  const from = days[0];
  const to = days[6];

  const reportWindow = useEffectEvent(() => onWindowChange(from, to));
  useEffect(() => {
    reportWindow();
  }, [from, to]);

  function swipe(delta: 1 | -1) {
    const next = swipeWeek(offset, delta);
    if (next !== offset) setPage({ offset: next, anchor: selected, dir: delta, jumped: false });
  }

  const pan = Gesture.Pan()
    .runOnJS(true)
    .activeOffsetX([-16, 16])
    .failOffsetY([-12, 12])
    .onEnd((e) => {
      if (Math.abs(e.translationX) < SWIPE_DISTANCE && Math.abs(e.velocityX) < SWIPE_VELOCITY) return;
      swipe(e.translationX > 0 ? -1 : 1); // finger moving right = earlier week
    });

  // Slide in from the side swiped from; fade on a jump; nothing on first paint or with reduce motion.
  const enterFrom = page.jumped ? FadeIn : page.dir < 0 ? FadeInLeft : page.dir > 0 ? FadeInRight : null;
  const entering = reduceMotion || !enterFrom ? undefined : enterFrom.duration(kayoMotion.base);
  const shownMonth = (days.includes(selected) ? selected : to).slice(0, 7);

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.monthRow}>
        <Pressable
          onPress={() => onOpenMonth(shownMonth)}
          style={styles.monthBtn}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={`${monthLabel(shownMonth)}, open month calendar`}
          testID={`${testID}-month`}
        >
          <Calendar size={16} color={c.neutral[950]} strokeWidth={2} />
          <Text style={[typography.label_sm, { color: c.neutral[950] }]}>{monthLabel(shownMonth)}</Text>
          <ChevronDown size={14} color={c.neutral[950]} strokeWidth={2.25} />
        </Pressable>
        {/* The pill is the way back to today - also when today is selected but the strip was swiped back. */}
        {selected === today && offset === 0 ? (
          <Text style={[typography.body_sm, { color: c.neutral[600] }]}>Swipe for earlier</Text>
        ) : (
          <Pressable
            onPress={() => {
              setPage({ offset: 0, anchor: today, dir: 0, jumped: false });
              onSelect(today);
            }}
            style={styles.todayPill}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Go to today"
            testID={`${testID}-today`}
          >
            <Text style={[typography.label_sm, { color: c.neutral[25] }]}>Today</Text>
          </Pressable>
        )}
      </View>

      {/* ponytail: local root - the app root has no GestureHandlerRootView; drop this if one is added there. */}
      <GestureHandlerRootView style={styles.gestureRoot}>
        <GestureDetector gesture={pan}>
          <View>
            <Animated.View key={from} entering={entering} style={styles.daysRow}>
              {days.map((date) => {
                const status = statuses[date];
                const isSelected = date === selected;
                return (
                  <Pressable
                    key={date}
                    onPress={() => onSelect(date)}
                    style={[styles.cell, date === today && dayCellStates.today, isSelected && dayCellStates.selected]}
                    accessibilityRole="button"
                    accessibilityLabel={dayCellLabel(date, status)}
                    accessibilityState={{ selected: isSelected }}
                    testID={`${testID}-day-${date}`}
                  >
                    <Text style={[typography.utility_badge_tiny, { color: isSelected ? c.primary[50] : c.neutral[600] }]}>
                      {format(parse(date, 'yyyy-MM-dd', new Date()), 'EEE')}
                    </Text>
                    <Text style={[typography.label_lg, { color: dayNumberColor(status, isSelected) }]}>
                      {Number(date.slice(8))}
                    </Text>
                    {dayDot(status, 6, isSelected)}
                  </Pressable>
                );
              })}
            </Animated.View>
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Sized by its content - the default flex: 1 inside an auto-height column relied on Yoga quirks.
  gestureRoot: { flex: 0 },
  container: {
    gap: 8,
    paddingTop: 10,
    paddingHorizontal: 8,
    paddingBottom: 8,
    borderRadius: 20, // clay surface radius (design-direction.md), above the ≤12 brutalist token scale
    backgroundColor: c.neutral[25],
    // One-off (kept local): 1px Primary/800 lip under the canopy + a reversed (lit) inset - no token.
    boxShadow: `0px 1px 0px 0px ${c.primary[800]}, inset 2px 2px 3px 0px ${c.neutral[25]}, inset -2px -2px 4px 0px ${c.secondary[200]}`,
  },
  monthRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 6, paddingRight: 4 },
  monthBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  todayPill: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: kayoRadius.pill,
    borderWidth: 1,
    borderColor: c.primary[700],
    backgroundColor: c.primary[500],
    ...kayoShadowTinted(c.primary[900]),
  },
  // gap is the floor: on 360dp phones the cells shrink to ~40dp and keep 4dp between them.
  daysRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 4, padding: 4 },
  cell: {
    width: 44,
    flexShrink: 1, // 7 × 44 + gaps overflows 360dp phones
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: c.secondary[25],
    ...kayoClay.raised('sm'),
  },
});
