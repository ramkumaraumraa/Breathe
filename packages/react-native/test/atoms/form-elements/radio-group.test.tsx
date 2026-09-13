import { fireEvent, render, screen } from '@testing-library/react-native';
import { RadioGroup, RadioGroupItem } from '../../../src/atoms/form-elements/radio-group';

function Plans(props: { value: string; onValueChange: (v: string) => void }) {
  return (
    <RadioGroup value={props.value} onValueChange={props.onValueChange}>
      <RadioGroupItem testID="monthly" value="monthly" aria-labelledby="monthly-label" />
      <RadioGroupItem testID="yearly" value="yearly" aria-labelledby="yearly-label" />
    </RadioGroup>
  );
}

describe('RadioGroup', () => {
  it('renders the web radio ring', async () => {
    await render(<Plans value="monthly" onValueChange={jest.fn()} />);
    expect(screen.getByTestId('yearly').props.className).toContain(
      'aspect-square h-4 w-4 shrink-0 items-center justify-center rounded-full border border-primary',
    );
  });

  it('shows exactly one indicator, on the selected item', async () => {
    await render(<Plans value="monthly" onValueChange={jest.fn()} />);
    expect(screen.getAllByTestId('radio-indicator')).toHaveLength(1);
  });

  it('selects an item on press', async () => {
    const onValueChange = jest.fn();
    await render(<Plans value="monthly" onValueChange={onValueChange} />);
    await fireEvent.press(screen.getByTestId('yearly'));
    expect(onValueChange).toHaveBeenCalledWith('yearly');
  });
});
