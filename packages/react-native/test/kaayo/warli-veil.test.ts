import { VEIL_MOTIFS, veilRevealText } from '../../src/kaayo/components/atoms/warli-veil';

describe('WarliVeil', () => {
  it('uses a fixed motif count per kind, so a veiled value never hints at its size', () => {
    expect(VEIL_MOTIFS).toEqual({ amount: 4, count: 3 });
  });

  it('reveals amounts in Indian rupee format, counts as plain numbers, strings as-is', () => {
    expect(veilRevealText(184500, 'amount')).toBe('₹1,84,500');
    expect(veilRevealText(34, 'count')).toBe('34');
    expect(veilRevealText('₹1.6L', 'amount')).toBe('₹1.6L');
  });
});

