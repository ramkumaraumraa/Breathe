import { render, screen } from '@testing-library/react-native';
import { Spinner } from '../../src/atoms/spinner';

describe('Spinner', () => {
  it('renders Loader2 inside a progressbar with a busy state', async () => {
    await render(<Spinner />);
    const spinner = screen.getByRole('progressbar');
    expect(spinner.props.accessibilityState).toEqual({ busy: true });
    expect(screen.getByTestId('icon-Loader2')).toBeOnTheScreen();
  });

  it('forwards className and size to the icon', async () => {
    await render(<Spinner className="text-white" size={20} />);
    const icon = screen.getByTestId('icon-Loader2');
    expect(icon.props.className).toContain('text-white');
    expect(icon.props.size).toBe(20);
  });
});
