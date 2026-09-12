import { fireEvent, render, screen } from '@testing-library/react-native';
import { Plus } from 'lucide-react-native';
import { StyleSheet } from 'react-native';
import { Button, buttonTextVariants, buttonVariants } from '../../src/atoms/button';
import { BRAND_GRADIENT } from '../../src/atoms/gradient';
import { Icon } from '../../src/atoms/icon';
import { Text } from '../../src/atoms/text';

describe('buttonVariants (parity with web button.tsx)', () => {
  it.each([
    ['default', 'bg-primary-500', 'active:bg-primary-700'],
    ['destructive', 'bg-negative-500', 'active:bg-negative-700'],
    ['outline', 'border-primary-500', 'active:bg-primary-50'],
    ['brandOutline', 'border-neutral-white-300', 'active:bg-neutral-white-75'],
    ['secondary', 'bg-neutral-white-50', 'active:bg-neutral-white-100'],
    ['ghost', 'bg-transparent', 'active:bg-primary-50'],
    ['success', 'bg-positive-500', 'active:bg-positive-700'],
    ['warning', 'bg-alert-500', 'active:bg-alert-700'],
    ['danger', 'bg-negative-500', 'active:bg-negative-700'],
    ['info', 'bg-secondary-500', 'active:bg-secondary-700'],
    ['neutral', 'border-neutral-black-25', 'active:bg-neutral-white-75'],
  ] as const)('%s → %s, pressed %s', (variant, rest, pressed) => {
    const cls = buttonVariants({ variant });
    expect(cls).toContain(rest);
    expect(cls).toContain(pressed);
  });

  it.each([
    ['default', 'h-11 gap-2 rounded-lg px-4'],
    ['xs', 'h-7 gap-1.5 rounded-md px-2.5'],
    ['sm', 'h-9 gap-1.5 rounded-md px-3.5'],
    ['lg', 'h-12 gap-2 rounded-lg px-5'],
    ['xl', 'h-14 gap-2.5 rounded-xl px-6'],
    ['xxl', 'h-16 gap-3 rounded-xl px-7'],
    ['icon', 'h-11 w-11 rounded-lg p-0'],
    ['icon-sm', 'h-9 w-9 rounded-md p-0'],
    ['icon-xs', 'h-7 w-7 rounded-md p-0'],
  ] as const)('size %s → %s', (size, expected) => {
    expect(buttonVariants({ size })).toContain(expected);
  });

  it('uses the grey disabled fill and drops the shadow', () => {
    const cls = buttonVariants({ variant: 'default', disabled: true });
    expect(cls).toContain('bg-neutral-white-100');
    expect(cls).toContain('shadow-none');
    expect(cls).not.toContain('bg-primary-500');
  });

  it('keeps white text on filled variants and neutral-black-500 when disabled', () => {
    expect(buttonTextVariants({ variant: 'default' })).toContain('text-white');
    expect(buttonTextVariants({ variant: 'brandOutline' })).toContain('text-neutral-black-975');
    expect(buttonTextVariants({ variant: 'default', disabled: true })).toContain('text-neutral-black-500');
    expect(buttonTextVariants({ size: 'xs' })).toContain('text-[11px]');
    expect(buttonTextVariants({ size: 'sm' })).toContain('text-xs');
  });
});

describe('Button', () => {
  it('wraps string children in Text and fires onPress', async () => {
    const onPress = jest.fn();
    await render(<Button onPress={onPress}>Save</Button>);
    await fireEvent.press(screen.getByText('Save'));
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Save').props.className).toContain('font-medium');
  });

  it('pushes label classes to the outer Text only; nested Texts inherit', async () => {
    await render(
      <Button>
        <Text testID="outer">
          Save <Text testID="inner" className="font-bold">now</Text>
        </Text>
      </Button>,
    );
    expect(screen.getByTestId('outer').props.className).toContain('text-white');
    expect(screen.getByTestId('outer').props.className).toContain('font-medium');
    expect(screen.getByTestId('inner').props.className).toBe('font-bold');
  });

  it('does not fire when disabled and reports the state', async () => {
    const onPress = jest.fn();
    await render(<Button disabled onPress={onPress}>Save</Button>);
    await fireEvent.press(screen.getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
    expect(screen.getByRole('button').props.accessibilityState).toMatchObject({ disabled: true });
  });

  it('shows a spinner, swaps the label and blocks presses while loading', async () => {
    const onPress = jest.fn();
    await render(
      <Button loading loadingText="Saving…" onPress={onPress}>
        Save
      </Button>,
    );
    expect(screen.getByTestId('icon-Loader2')).toBeOnTheScreen();
    expect(screen.getByText('Saving…')).toBeOnTheScreen();
    expect(screen.queryByText('Save')).toBeNull();
    await fireEvent.press(screen.getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
    expect(screen.getByRole('button').props.accessibilityState).toMatchObject({ disabled: true, busy: true });
  });

  it('renders left and right icons around the label', async () => {
    await render(
      <Button leftIcon={<Icon as={Plus} />} rightIcon={<Icon as={Plus} />}>
        Add
      </Button>,
    );
    expect(screen.getAllByTestId('icon-Plus')).toHaveLength(2);
  });

  it('becomes square when it has only an icon', async () => {
    await render(<Button leftIcon={<Icon as={Plus} />} accessibilityLabel="Add" />);
    expect(screen.getByRole('button').props.className).toContain('w-11');
  });

  it('gives icons the size of the button size', async () => {
    await render(<Button size="xl" leftIcon={<Icon as={Plus} />}>Big</Button>);
    expect(screen.getByTestId('icon-Plus').props.size).toBe(20);
  });

  it('paints the brand gradient on the Pressable for the gradient variant', async () => {
    await render(<Button variant="gradient">Go</Button>);
    expect(StyleSheet.flatten(screen.getByRole('button').props.style)).toMatchObject({
      experimental_backgroundImage: BRAND_GRADIENT,
    });
  });

  it('drops the gradient when disabled', async () => {
    await render(<Button variant="gradient" disabled>Go</Button>);
    expect(StyleSheet.flatten(screen.getByRole('button').props.style)?.experimental_backgroundImage).toBeUndefined();
  });

  it('turns the link label primary-700 and underlined while pressed', async () => {
    await render(
      <Button variant="link" testOnly_pressed>
        Go
      </Button>,
    );
    expect(screen.getByText('Go').props.className).toContain('text-primary-700');
    expect(screen.getByText('Go').props.className).toContain('underline');
  });

  it('shows the gradient pressed overlay only while pressed', async () => {
    await render(
      <Button variant="gradient" testOnly_pressed>
        Go
      </Button>,
    );
    expect(screen.getByTestId('button-pressed-overlay')).toBeOnTheScreen();

    await render(<Button variant="gradient">Go</Button>);
    expect(screen.queryByTestId('button-pressed-overlay')).toBeNull();
  });

  it('keeps the neutral disabled border on outline and drops the variant border', async () => {
    await render(
      <Button variant="outline" disabled>
        X
      </Button>,
    );
    const cls = screen.getByRole('button').props.className;
    expect(cls).toContain('border-neutral-white-200');
    expect(cls).not.toContain('border-primary-500');
  });

  it('sizes icon-xs icons at 14', async () => {
    await render(<Button size="icon-xs" leftIcon={<Icon as={Plus} />} accessibilityLabel="Add" />);
    expect(screen.getByTestId('icon-Plus').props.size).toBe(14);
  });

  it('lets a caller override size/variant classes (e.g. the Calendar day button)', async () => {
    await render(
      <Button variant="ghost" className="h-9 w-9 p-0 bg-primary active:bg-primary">
        5
      </Button>,
    );
    const cls = screen.getByRole('button').props.className;
    expect(cls).toContain('h-9');
    expect(cls).toContain('w-9');
    expect(cls).toContain('p-0');
    expect(cls).toContain('bg-primary');
    expect(cls).not.toContain('h-11');
    expect(cls).not.toContain('px-4');
    expect(cls).not.toContain('bg-transparent');
    expect(cls).not.toContain('active:bg-primary-50');
  });

  it('warns once for an icon-only button without an accessible name, and not when one is given', async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    await render(<Button leftIcon={<Icon as={Plus} />} />);
    expect(warn).toHaveBeenCalledTimes(1);
    warn.mockClear();
    await render(<Button leftIcon={<Icon as={Plus} />} accessibilityLabel="Add" />);
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('caps the label to a single line', async () => {
    await render(<Button>Save</Button>);
    expect(screen.getByText('Save').props.numberOfLines).toBe(1);
  });
});
