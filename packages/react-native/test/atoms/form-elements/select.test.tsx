import { PortalHost } from '@rn-primitives/portal';
import { fireEvent, render, screen } from '@testing-library/react-native';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../../src/atoms/form-elements/select';

jest.mock('react-native-screens', () => {
  const mockReact = require('react');
  return { FullWindowOverlay: ({ children }: { children: unknown }) => mockReact.createElement(mockReact.Fragment, null, children) };
});

function Frequency({ onValueChange }: { onValueChange: jest.Mock }) {
  return (
    <>
      <Select onValueChange={onValueChange}>
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
});
