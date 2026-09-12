import { render, screen } from '@testing-library/react-native';
import { clampProgress, Progress } from '../../src/atoms/progress';

describe('clampProgress', () => {
  it.each([
    [undefined, 0],
    [null, 0],
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
});
