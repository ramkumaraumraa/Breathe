import { Checkbox, Input, Label, RadioGroup, RadioGroupItem, Switch, Textarea } from '@aumraa/breathe-native';
import { useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import { Section } from '../components/Section';

export function InputSection() {
  const emailRef = useRef<TextInput>(null);
  const [agreed, setAgreed] = useState(false);
  const [plan, setPlan] = useState('monthly');
  const [notify, setNotify] = useState(false);
  return (
    <Section title="Input · Textarea · Checkbox · RadioGroup · Switch">
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
      <RadioGroup value={plan} onValueChange={setPlan}>
        <View className="flex-row items-center gap-2">
          <RadioGroupItem value="monthly" />
          <Label onPress={() => setPlan('monthly')}>Monthly</Label>
        </View>
        <View className="flex-row items-center gap-2">
          <RadioGroupItem value="yearly" />
          <Label onPress={() => setPlan('yearly')}>Yearly</Label>
        </View>
      </RadioGroup>
      <View className="flex-row items-center gap-2">
        <Switch checked={notify} onCheckedChange={setNotify} />
        <Label onPress={() => setNotify((v) => !v)}>Payment reminders</Label>
      </View>
      <View className="flex-row items-center gap-2">
        <Switch checked disabled onCheckedChange={() => {}} />
        <Label disabled>Disabled on</Label>
      </View>
    </Section>
  );
}
