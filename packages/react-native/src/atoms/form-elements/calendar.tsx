// Deep imports: date-fns's barrel index re-exports its ~200 functions from one file, and Expo's
// Metro doesn't tree-shake (same reasoning as R22 for lucide-react-native), so `{ format } from
// 'date-fns'` pulls the whole library into the bundle.
import { addMonths } from 'date-fns/addMonths';
import { eachDayOfInterval } from 'date-fns/eachDayOfInterval';
import { endOfMonth } from 'date-fns/endOfMonth';
import { endOfWeek } from 'date-fns/endOfWeek';
import { format } from 'date-fns/format';
import { isSameDay } from 'date-fns/isSameDay';
import { isSameMonth } from 'date-fns/isSameMonth';
import { startOfMonth } from 'date-fns/startOfMonth';
import { startOfWeek } from 'date-fns/startOfWeek';
import { subMonths } from 'date-fns/subMonths';
import ChevronLeft from 'lucide-react-native/icons/chevron-left';
import ChevronRight from 'lucide-react-native/icons/chevron-right';
import * as React from 'react';
import { View } from 'react-native';
import { cn } from '../../lib/utils';
import { Button } from '../button';
import { Icon } from '../icon';
import { Text } from '../text';

/** Weeks (Sunday-first) covering the month, as react-day-picker v8 renders without fixedWeeks. */
function getMonthGrid(month: Date): Date[][] {
  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month), { weekStartsOn: 0 }),
    end: endOfWeek(endOfMonth(month), { weekStartsOn: 0 }),
  });
  const weeks: Date[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));
  return weeks;
}

const NAV = 'absolute h-7 w-7 bg-transparent p-0 opacity-50';

type CalendarProps = {
  /** Only single-date selection exists (the only mode Leminiscate uses). */
  mode?: 'single';
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  defaultMonth?: Date;
  today?: Date;
  showOutsideDays?: boolean;
  className?: string;
};

function Calendar({ selected, onSelect, defaultMonth, today = new Date(), showOutsideDays = true, className }: CalendarProps) {
  const [month, setMonth] = React.useState(() => startOfMonth(defaultMonth ?? today));
  const weeks = getMonthGrid(month);

  return (
    <View className={cn('gap-4 p-3', className)}>
      <View className="relative flex-row items-center justify-center pt-1">
        <Button
          variant="outline"
          className={cn(NAV, 'left-1')}
          leftIcon={<Icon as={ChevronLeft} />}
          accessibilityLabel="Go to previous month"
          onPress={() => setMonth(subMonths(month, 1))}
        />
        <Text role="heading" accessibilityLiveRegion="polite" className="text-sm font-medium">
          {format(month, 'LLLL y')}
        </Text>
        <Button
          variant="outline"
          className={cn(NAV, 'right-1')}
          leftIcon={<Icon as={ChevronRight} />}
          accessibilityLabel="Go to next month"
          onPress={() => setMonth(addMonths(month, 1))}
        />
      </View>

      <View>
        <View className="flex-row">
          {weeks[0].map((day) => (
            <Text key={day.toISOString()} className="w-9 text-center text-[12.8px] font-normal text-muted-foreground">
              {format(day, 'cccccc')}
            </Text>
          ))}
        </View>

        {weeks.map((week) => (
          <View key={week[0].toISOString()} className="mt-2 w-full flex-row">
            {week.map((day) => {
              const key = day.toISOString();
              const outside = !isSameMonth(day, month);
              if (outside && !showOutsideDays) return <View key={key} className="h-9 w-9" />;
              const isSelected = !!selected && isSameDay(day, selected);
              const isToday = isSameDay(day, today);
              return (
                <Button
                  key={key}
                  variant="ghost"
                  accessibilityLabel={format(day, 'PPPP')}
                  accessibilityState={{ selected: isSelected }}
                  className={cn(
                    'h-9 w-9 p-0',
                    isSelected && 'bg-primary active:bg-primary',
                    !isSelected && isToday && 'bg-accent',
                    outside && 'opacity-50',
                  )}
                  onPress={() => onSelect?.(isSelected ? undefined : day)}>
                  <Text
                    className={cn(
                      'font-normal',
                      isSelected ? 'text-primary-foreground' : isToday ? 'text-accent-foreground' : outside && 'text-muted-foreground',
                    )}>
                    {format(day, 'd')}
                  </Text>
                </Button>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

export { Calendar };
export type { CalendarProps };
