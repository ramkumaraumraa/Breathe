import {
  Checkbox,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Switch,
  Textarea,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
} from '@aumraa/breathe-native';
import { useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import { Section } from '../components/Section';

export function InputSection() {
  const emailRef = useRef<TextInput>(null);
  const [agreed, setAgreed] = useState(false);
  const [plan, setPlan] = useState('monthly');
  const [notify, setNotify] = useState(false);
  const [bold, setBold] = useState(false);
  const [period, setPeriod] = useState<string | undefined>('month');
  return (
    <Section title="Input · Textarea · Checkbox · RadioGroup · Switch · Toggle · ToggleGroup">
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
          <RadioGroupItem value="monthly" aria-labelledby="plan-monthly" />
          <Label nativeID="plan-monthly" onPress={() => setPlan('monthly')}>Monthly</Label>
        </View>
        <View className="flex-row items-center gap-2">
          <RadioGroupItem value="yearly" aria-labelledby="plan-yearly" />
          <Label nativeID="plan-yearly" onPress={() => setPlan('yearly')}>Yearly</Label>
        </View>
      </RadioGroup>
      <View className="flex-row items-center gap-2">
        <Switch checked={notify} onCheckedChange={setNotify} aria-labelledby="notify-switch" />
        <Label nativeID="notify-switch" onPress={() => setNotify((v) => !v)}>Payment reminders</Label>
      </View>
      <View className="flex-row items-center gap-2">
        <Switch checked disabled onCheckedChange={() => {}} />
        <Label disabled>Disabled on</Label>
      </View>
      <View className="flex-row items-center gap-2">
        <Toggle pressed={bold} onPressedChange={setBold} aria-label="Bold">
          B
        </Toggle>
        <Label onPress={() => setBold((v) => !v)}>Bold</Label>
      </View>
      <ToggleGroup type="single" variant="outline" value={period} onValueChange={setPeriod}>
        <ToggleGroupItem value="month" aria-label="Month">Month</ToggleGroupItem>
        <ToggleGroupItem value="year" aria-label="Year">Year</ToggleGroupItem>
      </ToggleGroup>
    </Section>
  );
}
