import { fireEvent, render, screen } from '@testing-library/react-native';
import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Input } from '../../../src/atoms/form-elements/input';

const flat = (el: { props: Record<string, any> }) => StyleSheet.flatten(el.props.style) ?? {};

describe('Input', () => {
  it('uses the web input box, muted placeholder and body text', async () => {
    await render(<Input placeholder="Flat no." />);
    const input = screen.getByPlaceholderText('Flat no.');
    expect(input.props.className).toContain('h-10 w-full rounded-md border border-input bg-background px-3 py-2');
    expect(input.props.className).toContain('text-foreground');
    expect(input.props.placeholderTextColor).toBe('#424448');
  });

  it.each([
    ['email', { keyboardType: 'email-address', autoCapitalize: 'none', autoComplete: 'email' }],
    ['password', { secureTextEntry: true, autoCapitalize: 'none', autoComplete: 'password', autoCorrect: false }],
    ['number', { keyboardType: 'decimal-pad' }],
    ['tel', { keyboardType: 'phone-pad', autoComplete: 'tel' }],
    ['url', { keyboardType: 'url', autoComplete: 'url' }],
  ] as const)('maps type="%s" to native input props', async (type, expected) => {
    await render(<Input type={type} placeholder="x" />);
    expect(screen.getByPlaceholderText('x').props).toMatchObject(expected);
  });

  it('lets explicit props win over the type mapping', async () => {
    await render(<Input type="number" keyboardType="number-pad" placeholder="x" />);
    expect(screen.getByPlaceholderText('x').props.keyboardType).toBe('number-pad');
  });

  it('forwards ref to the TextInput', async () => {
    const ref = React.createRef<TextInput>();
    await render(<Input ref={ref} placeholder="x" />);
    expect(ref.current).toBeTruthy();
  });

  it('is read-only and dimmed when disabled', async () => {
    await render(<Input disabled placeholder="x" />);
    const input = screen.getByPlaceholderText('x');
    expect(input.props.editable).toBe(false);
    expect(input.props.className).toContain('opacity-50');
  });

  it('draws the ring outline only while focused and still calls onFocus/onBlur', async () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    await render(<Input placeholder="x" onFocus={onFocus} onBlur={onBlur} />);
    const input = screen.getByPlaceholderText('x');
    expect(flat(input).outlineWidth).toBeUndefined();

    await fireEvent(input, 'focus');
    expect(flat(screen.getByPlaceholderText('x'))).toMatchObject({
      outlineWidth: 2,
      outlineOffset: 2,
      outlineStyle: 'solid',
      outlineColor: '#1b60c0',
    });
    expect(onFocus).toHaveBeenCalledTimes(1);

    await fireEvent(screen.getByPlaceholderText('x'), 'blur');
    expect(flat(screen.getByPlaceholderText('x')).outlineWidth).toBeUndefined();
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('reports typed text', async () => {
    const onChangeText = jest.fn();
    await render(<Input placeholder="x" onChangeText={onChangeText} />);
    await fireEvent.changeText(screen.getByPlaceholderText('x'), 'A-101');
    expect(onChangeText).toHaveBeenCalledWith('A-101');
  });
});
