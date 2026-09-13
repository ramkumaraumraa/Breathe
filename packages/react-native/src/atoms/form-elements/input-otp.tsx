import Dot from 'lucide-react-native/icons/dot';
import * as React from 'react';
import { TextInput, View } from 'react-native';
import { useThemeColors } from '../../lib/theme';
import { cn } from '../../lib/utils';
import { Icon } from '../icon';
import { Text } from '../text';

type OTPContextValue = { value: string; maxLength: number; focused: boolean };
const OTPContext = React.createContext<OTPContextValue | null>(null);
const SlotPositionContext = React.createContext({ first: false, last: false });

function useOTPContext() {
  const context = React.useContext(OTPContext);
  if (!context) throw new Error('InputOTP parts must be rendered inside <InputOTP>');
  return context;
}

type InputOTPProps = Omit<React.ComponentProps<typeof TextInput>, 'value' | 'onChange' | 'maxLength'> & {
  maxLength: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  containerClassName?: string;
  children: React.ReactNode;
};

function InputOTP({
  maxLength,
  value,
  onChange,
  onComplete,
  disabled,
  containerClassName,
  className,
  children,
  onFocus,
  onBlur,
  ...props
}: InputOTPProps) {
  const [focused, setFocused] = React.useState(false);

  const handleChange = (text: string) => {
    const next = text.slice(0, maxLength);
    onChange(next);
    if (next.length === maxLength) onComplete?.(next);
  };

  return (
    <OTPContext.Provider value={{ value, maxLength, focused }}>
      <View testID="otp-container" className={cn('relative flex-row items-center gap-2', disabled && 'opacity-50', containerClassName)}>
        {children}
        {/* Transparent field over the slots: taps focus it, it receives the typing and SMS autofill. */}
        <TextInput
          className={cn('absolute inset-0 opacity-0', className)}
          value={value}
          onChangeText={handleChange}
          maxLength={maxLength}
          editable={!disabled}
          accessibilityState={{ disabled: !!disabled }}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoComplete="sms-otp"
          caretHidden
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          {...props}
        />
      </View>
    </OTPContext.Provider>
  );
}

function InputOTPGroup({ className, children, ...props }: React.ComponentProps<typeof View>) {
  const items = React.Children.toArray(children);
  return (
    <View className={cn('flex-row items-center', className)} {...props}>
      {items.map((child, i) => (
        <SlotPositionContext.Provider key={i} value={{ first: i === 0, last: i === items.length - 1 }}>
          {child}
        </SlotPositionContext.Provider>
      ))}
    </View>
  );
}

function InputOTPSlot({ index, className, style, ...props }: React.ComponentProps<typeof View> & { index: number }) {
  const { value, maxLength, focused } = useOTPContext();
  const { first, last } = React.useContext(SlotPositionContext);
  const { ring } = useThemeColors();
  const char = value[index];
  const isActive = focused && index === Math.min(value.length, maxLength - 1);

  return (
    <View
      className={cn(
        'relative h-10 w-10 items-center justify-center border-y border-r border-input',
        first && 'rounded-l-md border-l',
        last && 'rounded-r-md',
        isActive && 'z-10',
        className,
      )}
      style={[isActive ? { outlineWidth: 2, outlineOffset: 0, outlineStyle: 'solid', outlineColor: ring } : undefined, style]}
      {...props}>
      {char ? <Text className="text-sm">{char}</Text> : null}
      {isActive && !char ? <View testID="otp-caret" className="h-4 w-px bg-foreground" /> : null}
    </View>
  );
}

function InputOTPSeparator(props: React.ComponentProps<typeof View>) {
  return (
    <View role="separator" {...props}>
      <Icon as={Dot} size={24} />
    </View>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot };
export type { InputOTPProps };
