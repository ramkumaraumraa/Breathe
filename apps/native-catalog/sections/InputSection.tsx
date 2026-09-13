import { Checkbox, Input, Label, Textarea } from '@aumraa/breathe-native';
import { useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import { Section } from '../components/Section';

export function InputSection() {
  const emailRef = useRef<TextInput>(null);
  const [agreed, setAgreed] = useState(false);
  return (
    <Section title="Input · Textarea · Checkbox">
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
      <View className="flex-row items-center gap-2">
        <Checkbox checked={agreed} onCheckedChange={setAgreed} />
        <Label onPress={() => setAgreed((v) => !v)}>I agree to the society bylaws</Label>
      </View>
      <View className="flex-row items-center gap-2">
        <Checkbox checked disabled onCheckedChange={() => {}} />
        <Label disabled>Disabled checked</Label>
      </View>
    </Section>
  );
}
