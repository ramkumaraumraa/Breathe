import { render, screen } from '@testing-library/react-native';
import { Check } from 'lucide-react-native';
import { StyleSheet } from 'react-native';
import { Badge, badgeTextVariants, badgeVariants } from '../../src/atoms/badge';
import { BRAND_GRADIENT } from '../../src/atoms/gradient';
import { Icon } from '../../src/atoms/icon';

describe('badge variants (parity with web badge.tsx)', () => {
  it.each([
    ['default', 'bg-primary', 'text-primary-foreground'],
    ['secondary', 'bg-secondary', 'text-secondary-foreground'],
    ['destructive', 'bg-destructive', 'text-destructive-foreground'],
    ['outline', 'border-border', 'text-foreground'],
    ['success', 'bg-success-light', 'text-success-dark'],
    ['warning', 'bg-warning-light', 'text-warning-dark'],
    ['danger', 'bg-danger-light', 'text-danger-dark'],
    ['info', 'bg-info-light', 'text-info-dark'],
    ['gradient', 'border-transparent', 'text-primary-foreground'],
    ['super-admin', 'bg-danger-light', 'text-danger-dark'],
    ['admin', 'bg-info-light', 'text-info-dark'],
    ['viewer', 'bg-secondary', 'text-foreground-secondary'],
  ] as const)('%s', (variant, container, text) => {
    // split+toContain-on-array: avoids a false match where one class name is a substring of another
    // (e.g. 'bg-secondary' inside a hypothetical 'bg-secondary-500').
    expect(badgeVariants({ variant }).split(' ')).toContain(container);
    expect(badgeTextVariants({ variant }).split(' ')).toContain(text);
  });

  it('has the web pill geometry and type', () => {
    expect(badgeVariants({})).toContain('rounded-full border px-2.5 py-0.5');
    expect(badgeTextVariants({})).toContain('text-xs font-semibold');
  });
});

describe('Badge', () => {
  it('wraps string children in styled Text', async () => {
    await render(<Badge variant="success">Paid</Badge>);
    expect(screen.getByText('Paid').props.className).toContain('text-success-dark');
  });

  it('wraps mixed number/string children without throwing', async () => {
    await render(<Badge>{3} pending</Badge>);
    expect(screen.getByText('3 pending')).toBeOnTheScreen();
  });

  it('wraps only the text run when children mix an icon and a string', async () => {
    await render(
      <Badge variant="success">
        <Icon as={Check} />
        Paid
      </Badge>,
    );
    expect(screen.getByTestId('icon-Check')).toBeOnTheScreen();
    expect(screen.getByText('Paid').props.className).toContain('text-success-dark');
  });

  it('lets a consumer restyle the text via textClassName', async () => {
    await render(<Badge textClassName="text-2xs">X</Badge>);
    const cls = screen.getByText('X').props.className.split(' ');
    expect(cls).toContain('text-2xs');
    expect(cls).not.toContain('text-xs');
  });

  it('merges a caller className, dropping the conflicting default padding', async () => {
    await render(
      <Badge testID="badge" className="px-3">
        X
      </Badge>,
    );
    const cls = screen.getByTestId('badge').props.className.split(' ');
    expect(cls).toContain('px-3');
    expect(cls).not.toContain('px-2.5');
  });

  // Deviation from plan (Task 8 review): gradient is painted on the Badge View itself (a
  // background image), not a `<Gradient/>` child — see badge.tsx for why.
  it('paints the gradient on the View for the gradient variant', async () => {
    await render(
      <Badge testID="badge" variant="gradient">
        Pro
      </Badge>,
    );
    expect(StyleSheet.flatten(screen.getByTestId('badge').props.style)).toMatchObject({
      experimental_backgroundImage: BRAND_GRADIENT,
    });
  });

  it('does not paint the gradient for the default variant', async () => {
    await render(<Badge testID="badge">Pro</Badge>);
    expect(StyleSheet.flatten(screen.getByTestId('badge').props.style)?.experimental_backgroundImage).toBeUndefined();
  });

  it('keeps a consumer style alongside the gradient', async () => {
    await render(
      <Badge testID="badge" variant="gradient" style={{ opacity: 0.5 }}>
        Pro
      </Badge>,
    );
    expect(StyleSheet.flatten(screen.getByTestId('badge').props.style)).toMatchObject({
      experimental_backgroundImage: BRAND_GRADIENT,
      opacity: 0.5,
    });
  });
});
