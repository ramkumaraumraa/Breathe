import { render, screen } from '@testing-library/react-native';
import { Text, TextClassContext } from '../../src/atoms/text';

describe('Text', () => {
  it('applies the web body defaults', async () => {
    await render(<Text>Hello</Text>);
    expect(screen.getByText('Hello').props.className).toBe('font-sans text-base text-foreground');
  });

  it('lets the parent context override the defaults', async () => {
    await render(
      <TextClassContext.Provider value="text-sm text-white">
        <Text>Label</Text>
      </TextClassContext.Provider>,
    );
    expect(screen.getByText('Label').props.className).toBe('font-sans text-sm text-white');
  });

  it('lets className override the context', async () => {
    await render(
      <TextClassContext.Provider value="text-white">
        <Text className="text-primary">Own</Text>
      </TextClassContext.Provider>,
    );
    expect(screen.getByText('Own').props.className).toContain('text-primary');
    expect(screen.getByText('Own').props.className).not.toContain('text-white');
  });
});
