import { act, render, screen } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';

const mockReduceMotion = jest.fn(() => false);
jest.mock('react-native-reanimated', () => ({
  __esModule: true,
  ...jest.requireActual('react-native-reanimated'),
  useReducedMotion: () => mockReduceMotion(),
}));

import { AumraaLoader } from '../../src/atoms/aumraa-loader';

afterEach(() => {
  jest.useRealTimers();
  mockReduceMotion.mockReturnValue(false);
});

describe('AumraaLoader (React Native)', () => {
  it('is a busy progressbar named "Loading" by default', async () => {
    await render(<AumraaLoader />);
    const v = screen.getByRole('progressbar');
    expect(v.props.accessibilityLabel).toBe('Loading');
    expect(v.props.accessibilityState).toEqual({ busy: true });
  });

  it('shows the label and uses it as the accessible name', async () => {
    await render(<AumraaLoader label="Generating design tokens…" />);
    expect(screen.getByText('Generating design tokens…')).toBeOnTheScreen();
    expect(screen.getByRole('progressbar').props.accessibilityLabel).toBe('Generating design tokens…');
  });

  it('sizes the mark by width keeping the 264x280 aspect ratio', async () => {
    await render(<AumraaLoader size="lg" />);
    expect(StyleSheet.flatten(screen.getByTestId('aumraa-loader-mark').props.style)).toMatchObject({
      width: 120,
      height: (120 * 280) / 264,
    });
  });

  it('shows resting guide track by default and hides with showTrack={false}', async () => {
    const { rerender } = await render(<AumraaLoader />);
    expect(screen.getByTestId('aumraa-loader-track')).toBeOnTheScreen();

    await rerender(<AumraaLoader showTrack={false} />);
    expect(screen.queryByTestId('aumraa-loader-track')).toBeNull();
  });

  it('renders all 4 leaf tiers and the spiral path', async () => {
    await render(<AumraaLoader />);
    expect(screen.getByTestId('aumraa-loader-spiral')).toBeOnTheScreen();
    expect(screen.getByTestId('aumraa-loader-leaf-base')).toBeOnTheScreen();
    expect(screen.getByTestId('aumraa-loader-leaf-lowermid')).toBeOnTheScreen();
    expect(screen.getByTestId('aumraa-loader-leaf-uppermid')).toBeOnTheScreen();
    expect(screen.getByTestId('aumraa-loader-leaf-apex')).toBeOnTheScreen();
  });

  it('holds still with reduce-motion on', async () => {
    mockReduceMotion.mockReturnValue(true);
    await render(<AumraaLoader />);
    expect(screen.getByTestId('aumraa-loader-mark')).toHaveAnimatedStyle({
      transform: [{ scale: 1 }],
    });
  });
});
