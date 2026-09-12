import * as React from 'react';
import { TextInput } from 'react-native';
import { useFocusRing } from '../../lib/use-focus-ring';
import { useThemeColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

type TextInputProps = React.ComponentProps<typeof TextInput>;

/** Web <input type> → native keyboard/autofill props. "date" is intentionally absent (use Calendar). */
const TYPE_PROPS = {
  text: {},
  email: { keyboardType: 'email-address', autoCapitalize: 'none', autoComplete: 'email', autoCorrect: false },
  password: { secureTextEntry: true, autoCapitalize: 'none', autoComplete: 'password', autoCorrect: false },
  number: { keyboardType: 'decimal-pad' },
  tel: { keyboardType: 'phone-pad', autoComplete: 'tel' },
  search: { returnKeyType: 'search' },
  url: { keyboardType: 'url', autoCapitalize: 'none', autoCorrect: false },
} satisfies Record<string, Partial<TextInputProps>>;

type InputType = keyof typeof TYPE_PROPS;

type InputProps = TextInputProps & React.RefAttributes<TextInput> & { type?: InputType; disabled?: boolean };

function Input({ className, type = 'text', disabled, editable, onFocus, onBlur, style, ...props }: InputProps) {
  const colors = useThemeColors();
  const ring = useFocusRing(onFocus, onBlur);
  const isEditable = !disabled && editable !== false;

  return (
    <TextInput
      className={cn(
        'h-10 w-full rounded-md border border-input bg-background px-3 py-2 font-sans text-base leading-5 text-foreground md:text-sm',
        !isEditable && 'opacity-50',
        className,
      )}
      editable={isEditable}
      placeholderTextColor={colors.mutedForeground}
      onFocus={ring.onFocus}
      onBlur={ring.onBlur}
      style={[ring.ringStyle, style]}
      {...TYPE_PROPS[type]}
      {...props}
    />
  );
}

export { Input };
export type { InputProps, InputType };
