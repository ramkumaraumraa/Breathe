import { cn } from '../../src/lib/utils';

describe('cn', () => {
  it('keeps the last of two conflicting utilities', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });

  it('treats font size and text colour as different groups', () => {
    expect(cn('text-sm', 'text-white')).toBe('text-sm text-white');
  });

  it('treats font size and a theme colour name as different groups', () => {
    expect(cn('text-sm', 'text-foreground')).toBe('text-sm text-foreground');
  });

  it('recognises the custom 2xs font size', () => {
    expect(cn('text-2xs', 'text-xs')).toBe('text-xs');
  });

  it('drops falsy values', () => {
    expect(cn('a', false, undefined, null, 'b')).toBe('a b');
  });
});
