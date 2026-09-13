import { PortalHost } from '@rn-primitives/portal';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { View } from 'react-native';
// react-native-screens is mocked once in jest.setup.ts.
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../../src/atoms/form-elements/select';

beforeAll(() => {
  // RN's Jest View mock stubs measure(); rn-primitives' Portal renders nothing until the trigger reports a position.
  jest.spyOn(View.prototype as any, 'measure').mockImplementation((cb: any) => cb(0, 0, 100, 40, 0, 0));
});

function Frequency({ onValueChange, disabled }: { onValueChange: jest.Mock; disabled?: boolean }) {
  return (
    <>
      <Select onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger testID="trigger">
          <SelectValue placeholder="Select frequency" />
        </SelectTrigger>
        <SelectContent>
          <SelectLabel>Billing</SelectLabel>
          <SelectItem value="monthly" label="Monthly" />
          <SelectItem value="yearly" label="Yearly" />
        </SelectContent>
      </Select>
      <PortalHost />
    </>
  );
}

describe('Select', () => {
  it('renders the web trigger with the placeholder', async () => {
    await render(<Frequency onValueChange={jest.fn()} />);
    expect(screen.getByTestId('trigger').props.className).toContain(
      'h-10 w-full flex-row items-center justify-between rounded-md border border-input bg-background px-3 py-2',
    );
    expect(screen.getByText('Select frequency')).toBeOnTheScreen();
    expect(screen.getByTestId('icon-ChevronDown').props.className).toContain('opacity-50');
  });

  it('opens on press and reports the chosen option', async () => {
    const onValueChange = jest.fn();
    await render(<Frequency onValueChange={onValueChange} />);
    await fireEvent.press(screen.getByTestId('trigger'));
    expect(screen.getByText('Billing')).toBeOnTheScreen();
    await fireEvent.press(screen.getByText('Yearly'));
    expect(onValueChange).toHaveBeenCalledWith({ value: 'yearly', label: 'Yearly' });
  });

  it('dims the trigger when the root Select is disabled', async () => {
    await render(<Frequency onValueChange={jest.fn()} disabled />);
    expect(screen.getByTestId('trigger').props.className).toContain('opacity-50');
  });
});
