import { fireEvent, render, screen } from '@testing-library/react-native';
import { Checkbox } from '../../../src/atoms/form-elements/checkbox';

describe('Checkbox', () => {
  it('is an empty primary-bordered box when unchecked', async () => {
    await render(<Checkbox testID="cb" checked={false} onCheckedChange={jest.fn()} />);
    expect(screen.getByTestId('cb').props.className).toContain('h-4 w-4 shrink-0 overflow-hidden rounded-[3px] border border-primary');
    expect(screen.getByTestId('cb').props.className).not.toContain('bg-primary');
    expect(screen.queryByTestId('icon-Check')).toBeNull();
  });

  it('fills and shows the tick when checked', async () => {
    await render(<Checkbox testID="cb" checked onCheckedChange={jest.fn()} />);
    expect(screen.getByTestId('cb').props.className).toContain('bg-primary');
    expect(screen.getByTestId('icon-Check').props.className).toContain('text-primary-foreground');
  });

  it('toggles on press', async () => {
    const onCheckedChange = jest.fn();
    await render(<Checkbox testID="cb" checked={false} onCheckedChange={onCheckedChange} />);
    await fireEvent.press(screen.getByTestId('cb'));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('is dimmed and inert when disabled', async () => {
    const onCheckedChange = jest.fn();
    await render(<Checkbox testID="cb" disabled checked={false} onCheckedChange={onCheckedChange} />);
    expect(screen.getByTestId('cb').props.className).toContain('opacity-50');
    await fireEvent.press(screen.getByTestId('cb'));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });
});
