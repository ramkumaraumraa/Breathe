import { act, render, screen } from '@testing-library/react-native';
import { Spinner } from '../../src/atoms/spinner';

afterEach(() => jest.useRealTimers());

describe('Spinner', () => {
  it('renders Loader2 inside a progressbar with a busy state', async () => {
    await render(<Spinner />);
    const spinner = screen.getByRole('progressbar');
    expect(spinner.props.accessibilityState).toEqual({ busy: true });
    expect(screen.getByTestId('icon-Loader2')).toBeOnTheScreen();
  });

  it('forwards className and size to the icon', async () => {
    await render(<Spinner className="text-white" size={20} />);
    const icon = screen.getByTestId('icon-Loader2');
    expect(icon.props.className).toContain('text-white');
    expect(icon.props.size).toBe(20);
  });

  it('spins one turn per second', async () => {
    jest.useFakeTimers();
    await render(<Spinner />);
    const v = screen.getByRole('progressbar');
    expect(v).toHaveAnimatedStyle({ transform: [{ rotate: '0deg' }] });
    await act(async () => {
      jest.advanceTimersByTime(500);
    });
    expect(v).toHaveAnimatedStyle({ transform: [{ rotate: '180deg' }] });
    await act(async () => {
      jest.advanceTimersByTime(600);
    });
    expect(v).toHaveAnimatedStyle({ transform: [{ rotate: '36deg' }] });
  });

  it('passes accessible and testID through to the progressbar view', async () => {
    await render(<Spinner accessible={false} testID="spinner" />);
    const v = screen.getByTestId('spinner');
    expect(v.props.accessible).toBe(false);
  });
});
