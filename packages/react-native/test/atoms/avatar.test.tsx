import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { Avatar, AvatarFallback, AvatarImage } from '../../src/atoms/avatar';

describe('Avatar', () => {
  // Jest never fires onLoad/onError, so the initial-render test omits AvatarImage; the error path
  // is covered below.
  it('shows the fallback initials when there is no image', async () => {
    await render(
      <Avatar alt="Ravi Kumar" testID="av">
        <AvatarFallback>RK</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByText('RK')).toBeOnTheScreen();
    expect(screen.getByTestId('av').props.className).toBe(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
    );
  });

  it('falls back to initials when the image errors', async () => {
    await render(
      <Avatar alt="Ravi Kumar">
        <AvatarImage testID="img" source={{ uri: 'https://example.com/a.png' }} />
        <AvatarFallback>RK</AvatarFallback>
      </Avatar>,
    );
    expect(screen.queryByText('RK')).toBeNull();
    expect(screen.getByTestId('img').props.alt).toBe('Ravi Kumar');
    await act(async () => { fireEvent(screen.getByTestId('img'), 'error', { nativeEvent: {} }); });
    expect(screen.getByText('RK')).toBeOnTheScreen();
  });
});
