import { render, screen } from '@testing-library/react-native';
import { Slider } from '../../../src/atoms/form-elements/slider';
import { THEME } from '../../../src/lib/theme';

jest.mock('@react-native-community/slider', () => {
  const mockReact = require('react');
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: (props: object) => mockReact.createElement(View, { testID: 'native-slider', ...props }),
  };
});

describe('Slider', () => {
  it('maps the web array API and theme colours onto the native slider', async () => {
    await render(<Slider value={[40]} min={0} max={200} step={5} />);
    const native = screen.getByTestId('native-slider');
    expect(native.props).toMatchObject({
      value: 40,
      minimumValue: 0,
      maximumValue: 200,
      step: 5,
      minimumTrackTintColor: THEME.light.primary,
      maximumTrackTintColor: THEME.light.secondary,
    });
  });

  it('reports values as an array, like Radix', async () => {
    const onValueChange = jest.fn();
    await render(<Slider value={[40]} onValueChange={onValueChange} />);
    screen.getByTestId('native-slider').props.onValueChange(55);
    expect(onValueChange).toHaveBeenCalledWith([55]);
  });

  it('dims and disables', async () => {
    await render(<Slider value={[10]} disabled />);
    const native = screen.getByTestId('native-slider');
    expect(native.props.disabled).toBe(true);
    expect(native.props.className).toContain('opacity-50');
  });
});
