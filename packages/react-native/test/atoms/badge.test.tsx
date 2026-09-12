import { render, screen } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import { Badge, badgeTextVariants, badgeVariants } from '../../src/atoms/badge';
import { BRAND_GRADIENT } from '../../src/atoms/gradient';

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
    expect(badgeVariants({ variant })).toContain(container);
    expect(badgeTextVariants({ variant })).toContain(text);
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
});
