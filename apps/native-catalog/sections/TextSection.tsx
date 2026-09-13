import { Text } from '@aumraa/breathe-native';
import { Section } from '../components/Section';

export function TextSection() {
  return (
    <Section title="Text">
      <Text>Body default (Inter 16/24, foreground)</Text>
      <Text className="text-sm text-foreground-secondary">Secondary 14</Text>
      <Text className="text-xs text-foreground-tertiary">Tertiary 12</Text>
    </Section>
  );
}
