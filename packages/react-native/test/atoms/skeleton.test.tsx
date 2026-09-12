import { act, render, screen } from '@testing-library/react-native';
import { Skeleton } from '../../src/atoms/skeleton';

afterEach(() => jest.useRealTimers());

describe('Skeleton', () => {
  it('uses the web muted block and merges sizing classes', async () => {
    await render(<Skeleton testID="sk" className="h-4 w-24" />);
    expect(screen.getByTestId('sk', { hidden: true }).props.className).toBe('rounded-md bg-muted h-4 w-24');
  });

  it('is hidden from screen readers', async () => {
    await render(<Skeleton testID="sk" />);
    expect(screen.getByTestId('sk', { hidden: true }).props.accessibilityElementsHidden).toBe(true);
    expect(screen.getByTestId('sk', { hidden: true }).props.importantForAccessibility).toBe('no-hide-descendants');
  });

  it('pulses opacity 1 -> 0.5 over 1s', async () => {
    jest.useFakeTimers();
    await render(<Skeleton testID="sk" />);
    const el = screen.getByTestId('sk', { hidden: true });
    expect(el).toHaveAnimatedStyle({ opacity: 1 });
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(el).toHaveAnimatedStyle({ opacity: 0.5 });
  });
});
