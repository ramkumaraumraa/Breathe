import { render, screen } from '@testing-library/react-native';
import { Separator } from '../../src/atoms/separator';

describe('Separator', () => {
  // `decorative` defaults to true, so the primitive sets `aria-hidden`, which RNTL's
  // queries exclude by default (helpers/accessibility.ts `isHiddenFromAccessibility`).
  // `{ hidden: true }` opts back in to querying it.
  it('is a 1px horizontal border-coloured line by default', async () => {
    await render(<Separator testID="s" />);
    const el = screen.getByTestId('s', { hidden: true });
    expect(el.props.className).toBe('shrink-0 bg-border h-[1px] w-full');
    expect(el.props['aria-hidden']).toBe(true);
  });

  it('supports vertical orientation', async () => {
    await render(<Separator testID="s" orientation="vertical" />);
    expect(screen.getByTestId('s', { hidden: true }).props.className).toBe('shrink-0 bg-border h-full w-[1px]');
  });

  it('is not hidden and has role="separator" when decorative is false', async () => {
    await render(<Separator testID="s" decorative={false} />);
    expect(screen.getByTestId('s').props.role).toBe('separator');
  });
});
