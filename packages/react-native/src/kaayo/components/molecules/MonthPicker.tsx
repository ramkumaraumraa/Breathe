/**
 * MonthPicker — year + month grid in a dialog (the Payments month pill). Hand-rolled since no
 * native "pick a month" picker exists.
 */

import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

import { Dialog } from '../atoms/Dialog';
import { theme } from '../../foundations/theme';
import { typography } from '../../foundations/typography';
import { kayoBorder, kayoRadius, kayoSpace } from '../../foundations/tokens';

const MONTH_ABBR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function MonthPicker({
  value,
  onChange,
  visible,
  onClose,
}: {
  value: string;
  onChange: (value: string) => void;
  visible: boolean;
  onClose: () => void;
}) {
  const [viewYear, setViewYear] = useState(() => Number(value.slice(0, 4)));
  const selectedYear = Number(value.slice(0, 4));
  const selectedMonthIndex = Number(value.slice(5, 7)) - 1;
  const now = new Date();

  return (
    <Dialog visible={visible} onClose={onClose} title="Pick a month" size="sm" testID="month-picker-dialog">
      <View style={styles.yearNav}>
        <Pressable onPress={() => setViewYear((y) => y - 1)} style={styles.navBtn} hitSlop={8} testID="month-picker-prev-year">
          <ChevronLeft size={20} color={theme.text.primary} strokeWidth={2.25} />
        </Pressable>
        <Text style={[typography.heading_h3, { color: theme.text.primary }]}>{viewYear}</Text>
        <Pressable onPress={() => setViewYear((y) => y + 1)} style={styles.navBtn} hitSlop={8} testID="month-picker-next-year">
          <ChevronRight size={20} color={theme.text.primary} strokeWidth={2.25} />
        </Pressable>
      </View>
      <View style={styles.monthGrid}>
        {MONTH_ABBR.map((abbr, index) => {
          const isSelected = viewYear === selectedYear && index === selectedMonthIndex;
          const isCurrent = viewYear === now.getFullYear() && index === now.getMonth();
          return (
            <Pressable
              key={abbr}
              onPress={() => {
                onChange(`${viewYear}-${String(index + 1).padStart(2, '0')}`);
                onClose();
              }}
              style={[styles.monthCell, isSelected && styles.monthCellSelected]}
              testID={`month-picker-cell-${index}`}
            >
              <Text
                style={[
                  typography.label_lg,
                  { color: isSelected ? theme.text.onPrimary : theme.text.primary },
                ]}
              >
                {abbr}
              </Text>
              {isCurrent && !isSelected ? <View style={styles.todayDot} /> : null}
            </Pressable>
          );
        })}
      </View>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  navBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: kayoBorder.width,
    borderColor: theme.border.strong,
    borderRadius: kayoRadius.sm,
    backgroundColor: theme.surface.canvas,
  },
  yearNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: kayoSpace[4],
  },
  monthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: kayoSpace[2],
  },
  monthCell: {
    width: '30%',
    alignItems: 'center',
    paddingVertical: kayoSpace[3],
    borderWidth: kayoBorder.width,
    borderColor: theme.border.strong,
    borderRadius: kayoRadius.sm,
    backgroundColor: theme.surface.canvas,
  },
  monthCellSelected: {
    backgroundColor: theme.brand.primary,
    borderColor: theme.brand.primary,
  },
  todayDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.brand.primary,
    marginTop: 3,
  },
});
