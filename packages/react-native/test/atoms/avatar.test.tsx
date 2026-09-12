import { render, screen } from '@testing-library/react-native';
import { Avatar, AvatarFallback } from '../../src/atoms/avatar';

describe('Avatar', () => {
  // Deviation from the plan: @rn-primitives/avatar's Root starts at status "error" (Fallback
  // shows), but AvatarImage's mount effect flips status to "loading" as soon as it sees a valid
  // `source` — hiding Fallback — and Jest never fires the Image's onLoad/onError to move it out of
  // "loading". So a test that renders AvatarImage alongside AvatarFallback can never observe the
  // fallback text. This test renders without AvatarImage so status stays "error" and Fallback shows,
  // which is the real-world case this component exists for (no photo on file).
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
});
