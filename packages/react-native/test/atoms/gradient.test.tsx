import { render, screen } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import { BRAND_GRADIENT, Gradient } from '../../src/atoms/gradient';

describe('Gradient', () => {
  it('matches the web .bg-gradient-brand utility', () => {
    expect(BRAND_GRADIENT).toBe('linear-gradient(135deg, #3cb6d7 0%, #2262ec 100%)');
  });

  it('fills its parent by default and ignores touches', async () => {
    await render(<Gradient testID="g" />);
    const g = screen.getByTestId('g');
    expect(g.props.className).toBe('absolute inset-0');
    expect(g.props.pointerEvents).toBe('none');
    expect(StyleSheet.flatten(g.props.style)).toEqual({ experimental_backgroundImage: BRAND_GRADIENT });
  });

  it('merges a custom style with the gradient style', async () => {
    await render(<Gradient testID="g" style={{ opacity: 0.5 }} />);
    expect(StyleSheet.flatten(screen.getByTestId('g').props.style)).toEqual({
      experimental_backgroundImage: BRAND_GRADIENT,
      opacity: 0.5,
    });
  });

  it('accepts a custom gradient', async () => {
    await render(<Gradient testID="g" gradient="linear-gradient(90deg, red, blue)" />);
    expect(screen.getByTestId('g').props.style[0].experimental_backgroundImage).toBe(
      'linear-gradient(90deg, red, blue)',
    );
  });
});
