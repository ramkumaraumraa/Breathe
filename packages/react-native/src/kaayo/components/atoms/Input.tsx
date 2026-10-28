/**
 * Input — Neo-Brutalist atom.
 * 2px solid border, no rounded > 12, focus state thickens the border.
 */

import React, { forwardRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  Pressable,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

import { kayoSpace, kayoRadius, kayoBorder } from '../../foundations/tokens';
import { theme } from '../../foundations/theme';
import { typography } from '../../foundations/typography';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  helperText?: string;
  errorText?: string;
  isPassword?: boolean;
  /** Fixed text before the value inside the box, e.g. "+91" or "₹". */
  prefix?: string;
  /** Decorative icon at the end of the box, e.g. the calendar on a date picker field. */
  trailingIcon?: React.ReactNode;
  testID?: string;
}

export const Input = forwardRef<TextInput, InputProps>(function Input(
  { label, helperText, errorText, isPassword, prefix, trailingIcon, testID, ...rest },
  ref
) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(Boolean(isPassword));
  const showError = Boolean(errorText);

  return (
    <View style={styles.field}>
      {label ? (
        <Text style={[typography.label_lg, styles.label]} testID={testID ? `${testID}-label` : undefined}>
          {label}
        </Text>
      ) : null}

      <View
        style={[
          styles.inputBox,
          focused && styles.inputBoxFocused,
          showError && styles.inputBoxError,
        ]}
      >
        {prefix ? <Text style={[typography.body_base, styles.prefix]}>{prefix}</Text> : null}
        <TextInput
          ref={ref}
          {...rest}
          testID={testID}
          style={[typography.body_base, styles.input]}
          placeholderTextColor={theme.text.tertiary}
          onFocus={(e) => {
            setFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            rest.onBlur?.(e);
          }}
          secureTextEntry={isPassword ? hidden : rest.secureTextEntry}
        />
        {isPassword ? (
          <Pressable
            onPress={() => setHidden((h) => !h)}
            hitSlop={8}
            style={styles.adornment}
            testID={testID ? `${testID}-toggle` : undefined}
          >
            {hidden ? (
              <Eye size={20} color={theme.text.secondary} strokeWidth={2} />
            ) : (
              <EyeOff size={20} color={theme.text.secondary} strokeWidth={2} />
            )}
          </Pressable>
        ) : trailingIcon ? (
          <View style={styles.adornment}>{trailingIcon}</View>
        ) : null}
      </View>

      {showError ? (
        <Text style={[typography.body_sm, styles.error]}>{errorText}</Text>
      ) : helperText ? (
        <Text style={[typography.body_sm, styles.helper]}>{helperText}</Text>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  field: { gap: kayoSpace[1] },
  label: { color: theme.text.primary },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: kayoBorder.width,
    borderColor: theme.border.strong,
    borderRadius: kayoRadius.md,
    backgroundColor: theme.surface.card,
    paddingHorizontal: kayoSpace[3],
    minHeight: 48,
  },
  inputBoxFocused: {
    borderColor: theme.border.focus,
  },
  inputBoxError: {
    borderColor: theme.status.overdue.border,
  },
  input: {
    flex: 1,
    paddingVertical: kayoSpace[2],
    color: theme.text.primary,
  },
  prefix: { color: theme.text.primary, paddingRight: kayoSpace[2] },
  adornment: {
    paddingLeft: kayoSpace[2],
    paddingVertical: kayoSpace[1],
  },
  helper: { color: theme.text.secondary },
  error: { color: theme.status.overdue.fg },
});
