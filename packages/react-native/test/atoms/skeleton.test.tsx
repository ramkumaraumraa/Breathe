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

  it('pulses opacity 1 -> 0.75 -> 0.5 -> 1 over 2s', async () => {
    jest.useFakeTimers();
    await render(<Skeleton testID="sk" />);
    const el = screen.getByTestId('sk', { hidden: true });
    expect(el).toHaveAnimatedStyle({ opacity: 1 });
    await act(async () => {
      jest.advanceTimersByTime(500);
    });
    expect(el).toHaveAnimatedStyle({ opacity: 0.75 });
    await act(async () => {
      jest.advanceTimersByTime(500);
    });
    expect(el).toHaveAnimatedStyle({ opacity: 0.5 });
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(el).toHaveAnimatedStyle({ opacity: 1 });
  });

  it('merges consumer style with the pulse animation', async () => {
    jest.useFakeTimers();
    await render(<Skeleton testID="sk" style={{ marginTop: 4 }} />);
    const el = screen.getByTestId('sk', { hidden: true });
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(el).toHaveAnimatedStyle({ opacity: 0.5 });
    expect(el).toHaveStyle({ marginTop: 4 });
  });
});
