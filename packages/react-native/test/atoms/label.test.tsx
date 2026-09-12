import { fireEvent, render, screen } from '@testing-library/react-native';
import { Label } from '../../src/atoms/label';

describe('Label', () => {
  it('uses the web label typography', async () => {
    await render(<Label>Email</Label>);
    expect(screen.getByText('Email').props.className).toBe(
      'font-sans text-sm font-medium leading-none text-foreground',
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
});
