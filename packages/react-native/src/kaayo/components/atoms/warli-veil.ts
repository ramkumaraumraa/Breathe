import { formatRupees } from '../../utils/currency';

export type WarliVeilKind = 'amount' | 'count';

/** Fixed motif count per kind - the invariant that keeps a veiled value's width uninformative. */
export const VEIL_MOTIFS: Record<WarliVeilKind, number> = { amount: 4, count: 3 };

/** Text shown when revealed: amounts in Indian rupee format, counts as plain numbers, strings as-is. */
export function veilRevealText(value: number | string, kind: WarliVeilKind): string {
  if (typeof value === 'string') return value;
  return kind === 'amount' ? formatRupees(value) : String(value);
}
