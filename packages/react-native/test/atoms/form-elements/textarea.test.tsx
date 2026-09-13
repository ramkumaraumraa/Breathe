import { fireEvent, render, screen } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import { Textarea } from '../../../src/atoms/form-elements/textarea';
import { THEME } from '../../../src/lib/theme';

describe('Textarea', () => {
  it('is a multiline, top-aligned web textarea box', async () => {
    await render(<Textarea placeholder="Notes" />);
    const el = screen.getByPlaceholderText('Notes');
    expect(el.props.multiline).toBe(true);
    expect(el.props.textAlignVertical).toBe('top');
    expect(el.props.className).toContain('min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2');
    expect(el.props.className).toContain('text-sm');
    expect(el.props.placeholderTextColor).toBe(THEME.light.mutedForeground);
  });

  it('is read-only and dimmed when disabled', async () => {
    await render(<Textarea disabled placeholder="Notes" />);
    const el = screen.getByPlaceholderText('Notes');
    expect(el.props.editable).toBe(false);
    expect(el.props.className).toContain('opacity-50');
  });

  it('shows the focus ring while focused', async () => {
    await render(<Textarea placeholder="Notes" />);
    await fireEvent(screen.getByPlaceholderText('Notes'), 'focus');
    expect(StyleSheet.flatten(screen.getByPlaceholderText('Notes').props.style)).toMatchObject({ outlineWidth: 2 });
  });
});
