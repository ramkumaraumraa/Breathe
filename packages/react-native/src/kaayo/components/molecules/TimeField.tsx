import React, { useMemo, useState } from 'react';
import { Platform, Pressable, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, isValid, parse } from 'date-fns';

import { Clock } from 'lucide-react-native';

import { Button } from '../atoms/Button';
import { Input, type InputProps } from '../atoms/Input';
import { theme } from '../../foundations/theme';
import { timeLabel } from '../../utils/date';

interface TimeFieldProps extends Omit<InputProps, 'value' | 'onChange' | 'onChangeText' | 'editable'> {
  value: string;
  onChange: (value: string) => void;
}

function parseTime(value: string): Date {
  const parsed = parse(value, 'HH:mm', new Date());
  return isValid(parsed) ? parsed : new Date();
}

function formatTime(value: Date): string {
  return format(value, 'HH:mm');
}

export function TimeField({ value, onChange, testID, placeholder = 'Pick a time', ...inputProps }: TimeFieldProps) {
  const [open, setOpen] = useState(false);
  const pickerValue = useMemo(() => parseTime(value), [value]);
  // "5:30 PM" for display; the stored value stays HH:mm.
  const display = timeLabel(value);

  return (
    <View>
      <Pressable
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={inputProps.label}
        accessibilityValue={{ text: display || 'Not set' }}
        testID={testID ? `${testID}-open` : undefined}
      >
        <View pointerEvents="none">
          <Input
            {...inputProps}
            testID={testID}
            placeholder={placeholder}
            value={display}
            editable={false}
            trailingIcon={<Clock size={20} color={theme.text.secondary} strokeWidth={2} />}
          />
        </View>
      </Pressable>
      {open ? (
        <>
          <DateTimePicker
            value={pickerValue}
            mode="time"
            is24Hour
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            // onValueChange fires only on a real pick (Android cancel goes to onDismiss, never writes);
            // the deprecated onChange passed "now" on cancel. iOS writes live as the spinner settles, Done closes.
            onValueChange={(_event, picked) => {
              if (Platform.OS !== 'ios') setOpen(false);
              onChange(formatTime(picked));
            }}
            onDismiss={() => setOpen(false)}
          />
          {/* The iOS spinner never closes itself. */}
          {Platform.OS === 'ios' ? <Button label="Done" variant="ghost" size="sm" onPress={() => setOpen(false)} testID={testID ? `${testID}-done` : undefined} /> : null}
        </>
      ) : null}
    </View>
  );
}
