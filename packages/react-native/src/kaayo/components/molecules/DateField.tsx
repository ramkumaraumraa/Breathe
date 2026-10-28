import React, { useMemo, useState } from 'react';
import { Platform, Pressable, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, isValid, parse } from 'date-fns';

import { Calendar } from 'lucide-react-native';

import { Button } from '../atoms/Button';
import { Input, type InputProps } from '../atoms/Input';
import { theme } from '../../foundations/theme';

interface DateFieldProps extends Omit<InputProps, 'value' | 'onChange' | 'onChangeText' | 'editable'> {
  value: string;
  onChange: (value: string) => void;
  minimumDate?: Date;
  maximumDate?: Date;
}

function parseDate(value: string): Date {
  const parsed = parse(value, 'yyyy-MM-dd', new Date());
  return isValid(parsed) ? parsed : new Date();
}

function formatDate(value: Date): string {
  return format(value, 'yyyy-MM-dd');
}

/** "Tue, 20 Oct 2026" for display; '' when unset or unparseable. The stored value stays yyyy-MM-dd. */
function displayDate(value: string): string {
  const parsed = parse(value, 'yyyy-MM-dd', new Date());
  return value && isValid(parsed) ? format(parsed, 'EEE, d MMM yyyy') : '';
}

export function DateField({ value, onChange, testID, placeholder = 'Pick a date', minimumDate, maximumDate, ...inputProps }: DateFieldProps) {
  const [open, setOpen] = useState(false);
  const pickerValue = useMemo(() => parseDate(value), [value]);
  const display = displayDate(value);

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
            trailingIcon={<Calendar size={20} color={theme.text.secondary} strokeWidth={2} />}
          />
        </View>
      </Pressable>
      {open ? (
        <>
          <DateTimePicker
            value={pickerValue}
            mode="date"
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            // onValueChange fires only on a real pick (Android cancel goes to onDismiss, never writes);
            // the deprecated onChange passed today on cancel. iOS writes live per tap, Done closes.
            onValueChange={(_event, picked) => {
              if (Platform.OS !== 'ios') setOpen(false);
              onChange(formatDate(picked));
            }}
            onDismiss={() => setOpen(false)}
          />
          {/* The iOS inline calendar never closes itself. */}
          {Platform.OS === 'ios' ? <Button label="Done" variant="ghost" size="sm" onPress={() => setOpen(false)} testID={testID ? `${testID}-done` : undefined} /> : null}
        </>
      ) : null}
    </View>
  );
}
