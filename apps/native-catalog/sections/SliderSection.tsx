import { Slider, Text } from '@aumraa/breathe-native';
import { useState } from 'react';
import { Section } from '../components/Section';

export function SliderSection() {
  const [amount, setAmount] = useState([40]);
  return (
    <Section title="Slider">
      <Slider value={amount} onValueChange={setAmount} accessibilityLabel="Amount" />
      <Text className="text-sm">Value: {amount[0]}</Text>
      <Slider value={[70]} disabled accessibilityLabel="Disabled amount" />
    </Section>
  );
}
