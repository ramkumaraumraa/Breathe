import { fireEvent, render, screen } from '@testing-library/react-native';
import { Label } from '../../src/atoms/label';
import { Text } from '../../src/atoms/text';

describe('Label', () => {
  it('uses the web label typography', async () => {
    await render(<Label>Email</Label>);
    expect(screen.getByText('Email').props.className).toBe(
      'font-sans text-foreground text-sm font-medium leading-none',
    );
  });

  it('forwards presses (used to focus the paired input)', async () => {
    const onPress = jest.fn();
    await render(<Label onPress={onPress}>Email</Label>);
    await fireEvent.press(screen.getByText('Email'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('ignores presses when disabled', async () => {
    const onPress = jest.fn();
    await render(<Label disabled onPress={onPress}>Email</Label>);
    await fireEvent.press(screen.getByText('Email'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('forwards nativeID to the text', async () => {
    await render(<Label nativeID="x">Email</Label>);
    expect(screen.getByText('Email').props.nativeID).toBe('x');
  });

  it('applies opacity-70 when disabled', async () => {
    await render(<Label disabled>Email</Label>);
    expect(screen.getByText('Email').props.className).toContain('opacity-70');
  });

  it('is not a focus stop or responder without a handler', async () => {
    await render(<Label>Email</Label>);
    // Walk every ancestor: a plain Label must not be wrapped in a Pressable, so nothing above the
    // text should claim the responder or force focusability. fireEvent.press on a parent would pass
    // even with the bug (RNTL walks up to the nearest onPress), so this checks host node props instead.
    let node = screen.getByText('Email').parent;
    while (node) {
      expect(node.props.focusable).not.toBe(true);
      expect(node.props.onClick).toBeUndefined();
      expect(node.props.onResponderGrant).toBeUndefined();
      node = node.parent;
    }
  });

  it('lets a nested Text inherit the label typography context', async () => {
    await render(
      <Label>
        Name <Text testID="star" className="text-danger">*</Text>
      </Label>,
    );
    expect(screen.getByTestId('star').props.className).toBe('text-danger');
  });
});
