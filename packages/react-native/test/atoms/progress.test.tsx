import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { clampProgress, Progress } from '../../src/atoms/progress';

afterEach(() => jest.useRealTimers());

describe('clampProgress', () => {
  it.each([
    [undefined, 0],
    [null, 0],
    [NaN, 0],
    [-5, 0],
    [42, 42],
    [140, 100],
  ])('%p → %p', (input, expected) => {
    expect(clampProgress(input)).toBe(expected);
  });
});

describe('Progress', () => {
  it('renders the web track with a gradient indicator', async () => {
    await render(<Progress testID="p" value={30} />);
    expect(screen.getByTestId('p').props.className).toBe(
      'relative h-2 w-full overflow-hidden rounded-full bg-secondary',
    );
    expect(screen.getByTestId('progress-gradient')).toBeOnTheScreen();
  });

  it('merges a custom track className', async () => {
    await render(<Progress testID="p" value={30} className="h-1" />);
    expect(screen.getByTestId('p').props.className).toContain('h-1');
    expect(screen.getByTestId('p').props.className).not.toContain('h-2');
  });

  it('slides to the measured width and hides the indicator until measured', async () => {
    jest.useFakeTimers();
    const { rerender } = await render(<Progress testID="p" value={30} />);
    const indicator = screen.getByTestId('progress-indicator');
    expect(indicator).toHaveAnimatedStyle({ opacity: 0 });

    await fireEvent(screen.getByTestId('p'), 'layout', { nativeEvent: { layout: { width: 200 } } });
    await act(async () => {
      jest.advanceTimersByTime(600);
    });
    expect(indicator).toHaveAnimatedStyle({ transform: [{ translateX: -140 }], opacity: 1 });

    await rerender(<Progress testID="p" value={80} />);
    await act(async () => {
      jest.advanceTimersByTime(550);
    });
    expect(indicator).toHaveAnimatedStyle({ transform: [{ translateX: -40 }], opacity: 1 });
  });
});
