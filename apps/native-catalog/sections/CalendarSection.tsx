import { Calendar, Text } from '@aumraa/breathe-native';
import { format } from 'date-fns/format';
import { useState } from 'react';
import { View } from 'react-native';
import { Section } from '../components/Section';

export function CalendarSection() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <Section title="Calendar">
      <View className="self-start rounded-md border border-border bg-popover">
        <Calendar mode="single" selected={date} onSelect={(d) => d && setDate(d)} />
      </View>
      <Text className="text-sm">{date ? format(date, 'PPP') : 'Pick a date'}</Text>
    </Section>
  );
}
