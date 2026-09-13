import { Input, Label, Textarea } from '@aumraa/breathe-native';
import { useRef } from 'react';
import { TextInput, View } from 'react-native';
import { Section } from '../components/Section';

export function InputSection() {
  const emailRef = useRef<TextInput>(null);
  return (
    <Section title="Input · Textarea">
      <View className="gap-2">
        <Label onPress={() => emailRef.current?.focus()}>Email</Label>
        <Input ref={emailRef} type="email" placeholder="you@society.in" />
      </View>
      <Input type="number" placeholder="Amount" />
      <Input type="tel" placeholder="Phone" />
      <Input type="password" placeholder="Password" />
      <Input disabled placeholder="Disabled" />
      <Textarea placeholder="Notes for the committee" />
      <Textarea disabled placeholder="Disabled notes" />
    </Section>
  );
}
