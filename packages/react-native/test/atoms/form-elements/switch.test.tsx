import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { Switch } from '../../../src/atoms/form-elements/switch';

afterEach(() => jest.useRealTimers());

describe('Switch', () => {
  it('uses the input colour when off and primary when on', async () => {
    const { rerender } = await render(<Switch testID="sw" checked={false} onCheckedChange={jest.fn()} />);
    expect(screen.getByTestId('sw').props.className).toContain('bg-input');
    await rerender(<Switch testID="sw" checked onCheckedChange={jest.fn()} />);
    expect(screen.getByTestId('sw').props.className).toContain('bg-primary');
  });

  it('has the web track and thumb geometry', async () => {
    await render(<Switch testID="sw" checked={false} onCheckedChange={jest.fn()} />);
    expect(screen.getByTestId('sw').props.className).toContain('h-6 w-11 shrink-0 flex-row items-center rounded-full border-2 border-transparent');
    expect(screen.getByTestId('switch-thumb').props.className).toBe('h-5 w-5 rounded-full bg-background shadow-lg');
  });

  it('toggles on press and is inert when disabled', async () => {
    const onCheckedChange = jest.fn();
    const { rerender } = await render(<Switch testID="sw" checked={false} onCheckedChange={onCheckedChange} />);
    await fireEvent.press(screen.getByTestId('sw'));
    expect(onCheckedChange).toHaveBeenCalledWith(true);

    onCheckedChange.mockClear();
    await rerender(<Switch testID="sw" disabled checked={false} onCheckedChange={onCheckedChange} />);
    await fireEvent.press(screen.getByTestId('sw'));
    expect(onCheckedChange).not.toHaveBeenCalled();
    expect(screen.getByTestId('sw').props.className).toContain('opacity-50');
  });

  it('slides the thumb 20px (web translate-x-5) when checked', async () => {
    jest.useFakeTimers();
    const { rerender } = await render(<Switch testID="sw" checked={false} onCheckedChange={jest.fn()} />);
    const thumb = screen.getByTestId('switch-thumb');
    expect(thumb).toHaveAnimatedStyle({ transform: [{ translateX: 0 }] });

    await rerender(<Switch testID="sw" checked onCheckedChange={jest.fn()} />);
    await act(async () => {
      jest.advanceTimersByTime(200);
    });
    expect(thumb).toHaveAnimatedStyle({ transform: [{ translateX: 20 }] });
  });
});
