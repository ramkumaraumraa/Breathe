/**
 * MonthField — a read-only `Input` showing "October 2026" that opens `MonthPicker` on tap
 * (decision 4: months are never typed). Value is `YYYY-MM`.
 */
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Calendar } from 'lucide-react-native';

import { Input } from '../atoms/Input';
import { MonthPicker } from './MonthPicker';
import { theme } from '../../foundations/theme';
import { currentMonthString, monthLabel } from '../../utils/date';

export interface MonthFieldProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  errorText?: string;
  helperText?: string;
  testID?: string;
}

const MONTH_RE = /^\d{4}-(0[1-9]|1[0-2])$/;

export function MonthField({ value, onChange, label, errorText, helperText, testID }: MonthFieldProps) {
  const [open, setOpen] = useState(false);
  // Anything but YYYY-MM reads as "not set": monthLabel throws on an unparseable month.
  const valid = MONTH_RE.test(value);
  const display = valid ? monthLabel(value) : '';
  const pickerValue = valid ? value : currentMonthString();
  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityValue={{ text: display || 'Not set' }}
        testID={testID ? `${testID}-open` : undefined}
      >
        <View pointerEvents="none">
          <Input
            label={label}
            value={display}
            placeholder="Pick a month"
            editable={false}
            trailingIcon={<Calendar size={20} color={theme.text.secondary} strokeWidth={2} />}
            errorText={errorText}
            helperText={helperText}
            testID={testID}
          />
        </View>
      </Pressable>
      <MonthPicker value={pickerValue} onChange={onChange} visible={open} onClose={() => setOpen(false)} />
    </>
  );
}
