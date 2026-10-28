/**
 * Pure colour mappings behind StatusDot and Chip (Figma "Chips & status": StatusDot 74705:28,
 * Chip 74705:117), kept apart from the components so they are unit-testable.
 */
import { kayoColors as c } from '../../foundations/tokens';

/** Meaning, not colour: active = done / paid, inactive = late / absent, pending = needs marking / due. */
export type DotStatus = 'active' | 'live' | 'inactive' | 'pending' | 'upcoming' | 'info';

/** Secondary = the warm default, Neutral = true grey (the notifier neutral ramp). */
export type ChipTone = 'secondary' | 'primary' | 'positive' | 'alert' | 'supportive' | 'negative' | 'neutral';

const DOT_FILL: Record<Exclude<DotStatus, 'upcoming'>, string> = {
  active: c.positive[500],
  live: c.positive[500],
  inactive: c.negative[500],
  pending: c.alert[500],
  info: c.supportive[500],
};

/**
 * `fill` = solid dot (null for the hollow Upcoming dot), `ring` = its 1px stroke, `glow` = the Live halo.
 * Inverse (on a selected Primary/500 day) paints the dot / ring Neutral/25.
 */
export function statusDotPaint(status: DotStatus, inverse = false) {
  if (status === 'upcoming') return { fill: null, ring: inverse ? c.neutral[25] : c.neutral[400], glow: null };
  return {
    fill: inverse ? c.neutral[25] : DOT_FILL[status],
    ring: null,
    glow: status === 'live' ? c.positive[200] : null,
  };
}

/** Fill = Tone/25, inset clay shade = Tone/100, ink = Tone/900 (Secondary: warm Secondary/200 shade, Neutral/800 ink). */
export function chipTone(tone: ChipTone): { fill: string; shade: string; ink: string } {
  if (tone === 'secondary') return { fill: c.secondary[25], shade: c.secondary[200], ink: c.neutral[800] };
  const ramp = c[tone];
  return { fill: ramp[25], shade: ramp[100], ink: ramp[900] };
}
