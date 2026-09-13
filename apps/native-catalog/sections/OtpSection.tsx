import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot, Text } from '@aumraa/breathe-native';
import { useState } from 'react';
import { Section } from '../components/Section';

export function OtpSection() {
  const [code, setCode] = useState('');
  const [done, setDone] = useState('');
  return (
    <Section title="InputOTP">
      <InputOTP maxLength={6} value={code} onChange={setCode} onComplete={setDone}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <Text className="text-sm">Completed: {done || '—'}</Text>
    </Section>
  );
}
