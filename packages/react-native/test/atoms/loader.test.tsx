import { act, render, screen } from '@testing-library/react-native';
import { readFileSync } from 'fs';
import { join } from 'path';
import { StyleSheet } from 'react-native';

const mockReduceMotion = jest.fn(() => false);
jest.mock('react-native-reanimated', () => ({
  __esModule: true, // keeps `import Animated from 'react-native-reanimated'` pointing at the real default export
  ...jest.requireActual('react-native-reanimated'),
  useReducedMotion: () => mockReduceMotion(),
}));

import { Loader } from '../../src/atoms/loader';

afterEach(() => {
  jest.useRealTimers();
  mockReduceMotion.mockReturnValue(false);
});

describe('Loader', () => {
  it('is a busy progressbar named "Loading" by default', async () => {
    await render(<Loader />);
    const v = screen.getByRole('progressbar');
    expect(v.props.accessibilityLabel).toBe('Loading');
    expect(v.props.accessibilityState).toEqual({ busy: true });
  });

  it('shows the label and uses it as the accessible name', async () => {
    await render(<Loader label="Verifying..." />);
    expect(screen.getByText('Verifying...')).toBeOnTheScreen();
    expect(screen.getByRole('progressbar').props.accessibilityLabel).toBe('Verifying...');
  });

  it('sizes the mark by width, keeping the artboard ratio', async () => {
    await render(<Loader size="lg" />);
    expect(StyleSheet.flatten(screen.getByTestId('loader-mark').props.style)).toEqual({ width: 120, height: 120 * (400 / 736) });
  });

  it('drops the roof and crops to the loop with showRoof={false}', async () => {
    await render(<Loader showRoof={false} size="sm" />);
    expect(screen.queryByTestId('loader-roof')).toBeNull();
    expect(StyleSheet.flatten(screen.getByTestId('loader-mark').props.style)).toEqual({ width: 40, height: 40 * (296 / 640) });
  });

  it('breathes only the roof, to 104% and back, once per 1.6s lap', async () => {
    jest.useFakeTimers();
    await render(<Loader />);
    const roof = screen.getByTestId('loader-roof');
    expect(roof).toHaveAnimatedStyle({ transform: [{ scale: 1 }] });
    await act(async () => {
      jest.advanceTimersByTime(800);
    });
    expect(roof).toHaveAnimatedStyle({ transform: [{ scale: 1.04 }] });
    await act(async () => {
      jest.advanceTimersByTime(800);
    });
    expect(roof).toHaveAnimatedStyle({ transform: [{ scale: 1 }] });
  });

  it('holds still with reduce-motion on', async () => {
    mockReduceMotion.mockReturnValue(true);
    jest.useFakeTimers();
    await render(<Loader />);
    await act(async () => {
      jest.advanceTimersByTime(800);
    });
    expect(screen.getByTestId('loader-roof')).toHaveAnimatedStyle({ transform: [{ scale: 1 }] });
  });

  it('uses the same symbol geometry as the web loader', () => {
    const constants = (file: string) =>
      Object.fromEntries(
        [...readFileSync(file, 'utf8').matchAll(/const (LOOP|ROOF|EAVE_LEFT|EAVE_RIGHT) =\s*["']([^"']+)["']/g)].map((m) => [m[1], m[2]]),
      );
    const native = constants(join(__dirname, '../../src/atoms/loader.tsx'));
    const web = constants(join(__dirname, '../../../react/src/lemniscate/loader.tsx'));
    expect(Object.keys(native).sort()).toEqual(['EAVE_LEFT', 'EAVE_RIGHT', 'LOOP', 'ROOF']);
    expect(native).toEqual(web);
  });
});
