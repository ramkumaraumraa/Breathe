import { act, render, screen } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';

const mockReduceMotion = jest.fn(() => false);
jest.mock('react-native-reanimated', () => ({
  __esModule: true,
  ...jest.requireActual('react-native-reanimated'),
  useReducedMotion: () => mockReduceMotion(),
}));

import { KaayoLoader } from '../../src/atoms/kaayo-loader';

afterEach(() => {
  jest.useRealTimers();
  mockReduceMotion.mockReturnValue(false);
});

describe('KaayoLoader (React Native)', () => {
  it('is a busy progressbar named "Loading" by default', async () => {
    await render(<KaayoLoader />);
    const v = screen.getByRole('progressbar');
    expect(v.props.accessibilityLabel).toBe('Loading');
    expect(v.props.accessibilityState).toEqual({ busy: true });
  });

  it('shows the label and uses it as the accessible name', async () => {
    await render(<KaayoLoader label="Connecting to tutor..." />);
    expect(screen.getByText('Connecting to tutor...')).toBeOnTheScreen();
    expect(screen.getByRole('progressbar').props.accessibilityLabel).toBe('Connecting to tutor...');
  });

  it('sizes the mark by width', async () => {
    await render(<KaayoLoader size="lg" />);
    expect(StyleSheet.flatten(screen.getByTestId('kaayo-loader-mark').props.style)).toEqual({ width: 120, height: 120 });
  });

  it('shows ground shadow by default and hides with showShadow={false}', async () => {
    const { rerender } = await render(<KaayoLoader />);
    expect(screen.getByTestId('kaayo-loader-shadow')).toBeOnTheScreen();

    await rerender(<KaayoLoader showShadow={false} />);
    expect(screen.queryByTestId('kaayo-loader-shadow')).toBeNull();
  });

  it('fades the shadow in lockstep with the horse cycle', async () => {
    jest.useFakeTimers();
    await render(<KaayoLoader />);
    const shadow = screen.getByTestId('kaayo-loader-shadow');
    expect(shadow).toHaveAnimatedStyle({ opacity: 0.55 });
    await act(async () => {
      jest.advanceTimersByTime(675);
    });
    expect(shadow).toHaveAnimatedStyle({ opacity: 0.18 });
    await act(async () => {
      jest.advanceTimersByTime(675);
    });
    expect(shadow).toHaveAnimatedStyle({ opacity: 0.55 });
  });

  it('holds still with reduce-motion on', async () => {
    mockReduceMotion.mockReturnValue(true);
    await render(<KaayoLoader />);
    expect(screen.getByTestId('kaayo-loader-shadow')).toHaveAnimatedStyle({ opacity: 0.55 });
    expect(screen.getByTestId('kaayo-loader-horse')).toHaveAnimatedStyle({
      transform: [{ translateY: 0 }, { rotate: '0deg' }],
    });
  });
});
