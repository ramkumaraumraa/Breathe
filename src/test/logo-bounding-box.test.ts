import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
// @ts-expect-error — plain .mjs tool, no type declarations
import { plan, GRID, PAD_DIVISOR } from '../../tools/logo-bounding-box.mjs';

const LOGOS = path.resolve(__dirname, '../../public/assets/logos');

function svgFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) return svgFiles(f);
    return e.name.endsWith('.svg') ? [f] : [];
  });
}

const files = svgFiles(LOGOS);

describe('logo bounding boxes', () => {
  it('finds logo assets to check', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files.map((f) => [path.relative(LOGOS, f).split(path.sep).join('/'), f]))(
    '%s sits on the 8pt grid with 1/8 clear space',
    (_name, file) => {
      const p = plan(fs.readFileSync(file, 'utf8'));
      expect(p).not.toBeNull();

      // The box is on the 8pt grid...
      expect(p.boxW % GRID).toBe(0);
      expect(p.boxH % GRID).toBe(0);

      // ...and matches what the file actually declares, so no asset has
      // drifted away from the rule since it was last re-boxed.
      expect([p.vw, p.vh]).toEqual([p.boxW, p.boxH]);

      // The mark keeps at least 1/8 of the short side clear on every side.
      // Half a pixel of slack absorbs the 8pt rounding of the box.
      const required = Math.min(p.boxW, p.boxH) / PAD_DIVISOR;
      expect(p.clear).toBeGreaterThanOrEqual(required - 0.5);

      // And it is centred in that box.
      expect(p.drift).toBeLessThanOrEqual(0.5);
    }
  );
});
