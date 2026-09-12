import { Input, Label } from '@aumraa/breathe-native';
import { useRef } from 'react';
import { TextInput, View } from 'react-native';
import { Section } from '../components/Section';

export function InputSection() {
  const emailRef = useRef<TextInput>(null);
  return (
    <Section title="Input">
      <View className="gap-2">
        <Label onPress={() => emailRef.current?.focus()}>Email</Label>
        <Input ref={emailRef} type="email" placeholder="you@society.in" />
      </View>
      <Input type="number" placeholder="Amount" />
      <Input type="tel" placeholder="Phone" />
      <Input type="password" placeholder="Password" />
      <Input disabled placeholder="Disabled" />
    </Section>
  );
}
