import { fireEvent, render, screen } from '@testing-library/react-native';
import { Toggle, toggleTextClass, toggleVariants } from '../../../src/atoms/form-elements/toggle';

describe('toggleVariants (parity with web toggle.tsx)', () => {
  it.each([
    [{}, 'h-10 px-3', 'bg-transparent'],
    [{ size: 'sm' as const }, 'h-9 px-2.5', 'bg-transparent'],
    [{ size: 'lg' as const }, 'h-11 px-5', 'bg-transparent'],
    [{ variant: 'outline' as const }, 'h-10 px-3', 'border border-input bg-transparent'],
  ])('%p', (args, size, variant) => {
    const cls = toggleVariants(args);
    expect(cls).toContain(size);
    expect(cls).toContain(variant);
    expect(cls).toContain('rounded-md');
  });

  it('switches text to accent-foreground when on', () => {
    expect(toggleTextClass(false)).toBe('text-sm font-medium text-foreground');
    expect(toggleTextClass(true)).toBe('text-sm font-medium text-accent-foreground');
  });
});

describe('Toggle', () => {
  it('fills with accent when pressed-on and reports changes', async () => {
    const onPressedChange = jest.fn();
    await render(
      <Toggle testID="t" pressed onPressedChange={onPressedChange} aria-label="Bold">
        B
      </Toggle>,
    );
    expect(screen.getByTestId('t').props.className).toContain('bg-accent');
    expect(screen.getByText('B').props.className).toContain('text-accent-foreground');
    await fireEvent.press(screen.getByTestId('t'));
    expect(onPressedChange).toHaveBeenCalledWith(false);
  });
});
