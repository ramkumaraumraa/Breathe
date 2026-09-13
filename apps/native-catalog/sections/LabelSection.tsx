import { Label } from '@aumraa/breathe-native';
import { Section } from '../components/Section';

export function LabelSection() {
  return (
    <Section title="Label">
      <Label>Flat number</Label>
      <Label disabled>Disabled label</Label>
    </Section>
  );
}
