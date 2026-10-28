import { kayoClay, kayoColors, kayoShadowDrop } from '../../src/kaayo/foundations/tokens';

const shade = kayoColors.secondary[200];
const light = kayoColors.neutral[25];

// Pins the recipes the Figma Kaayo/Clay/* effect styles mirror - change both together.
test('raised clay sizes', () => {
  expect(kayoClay.raised().boxShadow).toBe(`-2px -2px 4px 0px ${light}, 2px 3px 6px 0px ${shade}`);
  expect(kayoClay.raised('md').boxShadow).toBe(`-4px -4px 10px 0px ${light}, 5px 6px 14px 0px ${shade}`);
  expect(kayoClay.raised('lg').boxShadow).toBe(`-6px -6px 14px 0px ${light}, 8px 10px 22px 0px ${shade}`);
});

test('inset clay sizes', () => {
  expect(kayoClay.inset().boxShadow).toBe(`inset 2px 2px 4px 0px ${shade}, inset -2px -2px 4px 0px ${light}`);
  expect(kayoClay.inset('md').boxShadow).toBe(`inset 3px 3px 6px 0px ${shade}, inset -3px -3px 6px 0px ${light}`);
  expect(kayoClay.inset('lg').boxShadow).toBe(`inset 4px 4px 10px 0px ${shade}, inset -4px -4px 8px 0px ${light}`);
});

test('tints override shade and light', () => {
  const p = kayoColors.positive[100];
  expect(kayoClay.inset('sm', p).boxShadow).toBe(`inset 2px 2px 4px 0px ${p}, inset -2px -2px 4px 0px ${light}`);
  expect(kayoShadowDrop(p)).toEqual({ boxShadow: `0px 2px 0px 0px ${p}`, elevation: 0 });
});

