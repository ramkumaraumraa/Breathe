import { fireEvent, render, screen } from '@testing-library/react-native';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '../../../src/atoms/form-elements/input-otp';

function Code(props: { onComplete?: (v: string) => void; disabled?: boolean }) {
  const [value, setValue] = React.useState('');
  return (
    <InputOTP testID="otp" maxLength={4} value={value} onChange={setValue} {...props}>
      <InputOTPGroup>
        <InputOTPSlot testID="slot-0" index={0} />
        <InputOTPSlot testID="slot-1" index={1} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot testID="slot-2" index={2} />
        <InputOTPSlot testID="slot-3" index={3} />
      </InputOTPGroup>
    </InputOTP>
  );
}

describe('InputOTP', () => {
  it('uses a numeric one-time-code field limited to maxLength', async () => {
    await render(<Code />);
    const input = screen.getByTestId('otp');
    expect(input.props).toMatchObject({ maxLength: 4, keyboardType: 'number-pad', textContentType: 'oneTimeCode', autoComplete: 'sms-otp' });
  });

  it('shows typed characters in the slots', async () => {
    await render(<Code />);
    await fireEvent.changeText(screen.getByTestId('otp'), '42');
    expect(screen.getByText('4')).toBeOnTheScreen();
    expect(screen.getByText('2')).toBeOnTheScreen();
  });

  it('rounds the outer corners of each group, like :first-child / :last-child on web', async () => {
    await render(<Code />);
    expect(screen.getByTestId('slot-0').props.className).toContain('rounded-l-md border-l');
    expect(screen.getByTestId('slot-1').props.className).toContain('rounded-r-md');
    expect(screen.getByTestId('slot-1').props.className).not.toContain('border-l');
  });

  it('rings the next empty slot while focused', async () => {
    await render(<Code />);
    await fireEvent(screen.getByTestId('otp'), 'focus');
    await fireEvent.changeText(screen.getByTestId('otp'), '4');
    expect(StyleSheet.flatten(screen.getByTestId('slot-1').props.style)).toMatchObject({ outlineWidth: 2, outlineOffset: 0 });
    expect(StyleSheet.flatten(screen.getByTestId('slot-0').props.style)?.outlineWidth).toBeUndefined();
    expect(screen.getByTestId('otp-caret')).toBeOnTheScreen();
  });

  it('calls onComplete once all slots are filled', async () => {
    const onComplete = jest.fn();
    await render(<Code onComplete={onComplete} />);
    await fireEvent.changeText(screen.getByTestId('otp'), '4271');
    expect(onComplete).toHaveBeenCalledWith('4271');
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('is read-only and dimmed when disabled', async () => {
    await render(<Code disabled />);
    expect(screen.getByTestId('otp').props.editable).toBe(false);
    expect(screen.getByTestId('otp-container').props.className).toContain('opacity-50');
  });
});
