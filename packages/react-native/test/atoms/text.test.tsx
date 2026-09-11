import * as React from 'react';
import type { Text as RNText } from 'react-native';
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
    expect(screen.getByText('Own').props.className).toBe('font-sans text-base text-primary');
  });

  it.each([
    [
      'font-medium text-[11px] text-neutral-black-975',
      undefined,
      'font-sans font-medium text-[11px] text-neutral-black-975',
    ],
    ['text-primary-500 text-sm font-medium', 'font-normal', 'font-sans text-primary-500 text-sm font-normal'],
  ])('context %s + className %s', async (ctx, cls, expected) => {
    await render(
      <TextClassContext.Provider value={ctx}>
        <Text className={cls}>X</Text>
      </TextClassContext.Provider>,
    );
    expect(screen.getByText('X').props.className).toBe(expected);
  });

  it('lets a nested Text inherit its parent instead of re-applying body defaults', async () => {
    await render(
      <Text className="text-sm text-primary">
        Hello{' '}
        <Text className="font-bold" testID="inner">
          world
        </Text>
      </Text>,
    );
    expect(screen.getByTestId('inner').props.className).toBe('font-bold');
  });

  it('accepts a ref', async () => {
    const ref = React.createRef<RNText>();
    await render(<Text ref={ref}>R</Text>);
    expect(ref.current).toBeTruthy();
  });
});
