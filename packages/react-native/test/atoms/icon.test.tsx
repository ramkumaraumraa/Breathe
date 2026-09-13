import { render, screen } from '@testing-library/react-native';
import { Check } from 'lucide-react-native';
import { styled } from 'nativewind';
import { Icon, IconSizeContext } from '../../src/atoms/icon';
import { TextClassContext } from '../../src/atoms/text';

describe('Icon', () => {
  it('defaults to 16px and foreground colour', async () => {
    await render(<Icon as={Check} />);
    const icon = screen.getByTestId('icon-Check');
    expect(icon.props.size).toBe(16);
    expect(icon.props.className).toBe('text-foreground');
  });

  it('inherits size and colour from its parent', async () => {
    await render(
      <IconSizeContext.Provider value={20}>
        <TextClassContext.Provider value="text-sm text-white">
          <Icon as={Check} />
        </TextClassContext.Provider>
      </IconSizeContext.Provider>,
    );
    const icon = screen.getByTestId('icon-Check');
    expect(icon.props.size).toBe(20);
    expect(icon.props.className).toBe('text-sm text-white');
  });

  it('prefers an explicit size', async () => {
    await render(
      <IconSizeContext.Provider value={20}>
        <Icon as={Check} size={12} />
      </IconSizeContext.Provider>,
    );
    expect(screen.getByTestId('icon-Check').props.size).toBe(12);
  });

  it('maps className size classes to lucide width/height so they beat the size prop', () => {
    expect(styled).toHaveBeenCalledWith(expect.anything(), {
      className: { target: 'style', nativeStyleMapping: { height: 'height', width: 'width' } },
    });
  });
});
