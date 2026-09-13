import { fireEvent, render, screen } from '@testing-library/react-native';
import { Calendar } from '../../../src/atoms/form-elements/calendar';

const TODAY = new Date(2026, 8, 11); // Friday 11 Sep 2026
const SEP_15 = 'Tuesday, September 15th, 2026';

describe('Calendar', () => {
  it('shows the current month with Sunday-first weekday labels', async () => {
    await render(<Calendar today={TODAY} />);
    expect(screen.getByText('September 2026')).toBeOnTheScreen();
    expect(screen.getByText('Su')).toBeOnTheScreen();
    expect(screen.getByText('Sa')).toBeOnTheScreen();
  });

  it('selects a day', async () => {
    const onSelect = jest.fn();
    await render(<Calendar today={TODAY} onSelect={onSelect} />);
    await fireEvent.press(screen.getByLabelText(SEP_15));
    expect(onSelect).toHaveBeenCalledWith(new Date(2026, 8, 15));
  });

  it('clears the selection when the selected day is tapped again', async () => {
    const onSelect = jest.fn();
    await render(<Calendar today={TODAY} selected={new Date(2026, 8, 15)} onSelect={onSelect} />);
    await fireEvent.press(screen.getByLabelText(SEP_15));
    expect(onSelect).toHaveBeenCalledWith(undefined);
  });

  it('paints selected and today like the web day picker', async () => {
    await render(<Calendar today={TODAY} selected={new Date(2026, 8, 15)} />);
    expect(screen.getByLabelText(SEP_15).props.className).toContain('bg-primary');
    expect(screen.getByLabelText('Friday, September 11th, 2026').props.className).toContain('bg-accent');
  });

  it('moves between months', async () => {
    await render(<Calendar today={TODAY} />);
    await fireEvent.press(screen.getByLabelText('Go to next month'));
    expect(screen.getByText('October 2026')).toBeOnTheScreen();
    await fireEvent.press(screen.getByLabelText('Go to previous month'));
    await fireEvent.press(screen.getByLabelText('Go to previous month'));
    expect(screen.getByText('August 2026')).toBeOnTheScreen();
  });

  it('shows outside days by default and hides them on request', async () => {
    const { rerender } = await render(<Calendar today={TODAY} />);
    expect(screen.getAllByText('30')).toHaveLength(2); // 30 Aug + 30 Sep
    await rerender(<Calendar today={TODAY} showOutsideDays={false} />);
    expect(screen.getAllByText('30')).toHaveLength(1);
  });
});
