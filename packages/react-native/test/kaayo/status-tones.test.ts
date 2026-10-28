import { chipTone, statusDotPaint } from '../../src/kaayo/components/atoms/status-tones';
import { kayoColors as c } from '../../src/kaayo/foundations/tokens';

// Pins the Figma StatusDot (74705:28) and Chip (74705:117) colour rules.
test('status dot colours', () => {
  expect(statusDotPaint('active')).toEqual({ fill: c.positive[500], ring: null, glow: null });
  expect(statusDotPaint('live')).toEqual({ fill: c.positive[500], ring: null, glow: c.positive[200] });
  expect(statusDotPaint('inactive').fill).toBe(c.negative[500]);
  expect(statusDotPaint('pending').fill).toBe(c.alert[500]);
  expect(statusDotPaint('info').fill).toBe(c.supportive[500]);
  expect(statusDotPaint('upcoming')).toEqual({ fill: null, ring: c.neutral[400], glow: null });
});

test('inverse dots turn white', () => {
  expect(statusDotPaint('pending', true).fill).toBe(c.neutral[25]);
  expect(statusDotPaint('upcoming', true).ring).toBe(c.neutral[25]);
});

test('chip tones: 25 fill, 100 shade, 900 ink; secondary warm, neutral grey', () => {
  expect(chipTone('primary')).toEqual({ fill: c.primary[25], shade: c.primary[100], ink: c.primary[900] });
  expect(chipTone('secondary')).toEqual({ fill: c.secondary[25], shade: c.secondary[200], ink: c.neutral[800] });
  expect(chipTone('neutral')).toEqual({ fill: c.neutral[25], shade: c.neutral[100], ink: c.neutral[900] });
});

