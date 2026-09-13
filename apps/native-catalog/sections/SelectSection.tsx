import { Select, SelectContent, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue, Text, type Option } from '@aumraa/breathe-native';
import { useState } from 'react';
import { Section } from '../components/Section';

export function SelectSection() {
  const [value, setValue] = useState<Option>();
  return (
    <Section title="Select">
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger>
          <SelectValue placeholder="Payment frequency" />
        </SelectTrigger>
        <SelectContent>
          <SelectLabel>Frequency</SelectLabel>
          <SelectItem value="monthly" label="Monthly" />
          <SelectItem value="quarterly" label="Quarterly" />
          <SelectSeparator />
          <SelectItem value="yearly" label="Yearly" />
          <SelectItem value="custom" label="Custom" disabled />
        </SelectContent>
      </Select>
      <Text className="text-sm">Chosen: {value?.label ?? '—'}</Text>
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Disabled" />
        </SelectTrigger>
      </Select>
    </Section>
  );
}
