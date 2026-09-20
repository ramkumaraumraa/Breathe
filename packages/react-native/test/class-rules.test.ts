import { readdirSync, readFileSync } from 'fs';
import path from 'path';

const SRC_DIR = path.join(__dirname, '../src');

// R3: rem inside arbitrary values (min-w-[8rem], text-[0.8rem]) — NativeWind v5 inlines rem as 14px.
const REM = /\d(\.\d+)?rem\b/;
// R4: bare `rounded` — Tailwind v4 compiles it to 0.25rem = 3.5px on native, not the repo's 12px.
// `rounded-lg`, `rounded-[3px]` and `rounded-full` must NOT match (all followed by `-`).
const BARE_ROUNDED = /(?<![\w-])rounded(?![\w-[])/;
// R19: only families the theme defines (slate, gray, red, orange, amber, green, emerald, cyan,
// blue, purple) may be used; every other Tailwind default-palette family compiles to OKLCH.
const FORBIDDEN_PALETTE_FAMILY =
  /-(yellow|lime|teal|sky|indigo|violet|fuchsia|pink|rose|zinc|stone)-\d/;
// `neutral` used to be forbidden here: the foundation scale was split into `neutral-white-*` /
// `neutral-black-*`, so a bare `neutral-<digit>` could only be Tailwind's default family, which is
// unregistered in the theme and compiles to OKLCH. The scales are now merged into one `neutral`
// ramp that the generated theme registers (`--color-neutral-25..975` inside `@theme inline` in
// styles/lemniscate.css), covering every Tailwind default stop 50–950. A bare `neutral-<digit>`
// therefore resolves to the repo's own hex, exactly like `slate` / `gray`, and is no longer
// forbidden. Guarded below by asserting the theme registers the family.
const THEME_CSS = readFileSync(path.join(__dirname, '../styles/lemniscate.css'), 'utf8');
// R21: react-native-css 3.0.7 drops static line-heights and multiplies var()/calc() ones by the
// element font size — an arbitrary length leading (`leading-[20px]`) silently breaks; unitless
// `leading-[1.25]` is fine.
const ARBITRARY_LEADING = /leading-\[[^\]]*\d(px|rem|em)\]/;
// R21: a font-size utility with a slash line-height (`text-sm/6`, `text-[11px]/4`) gets no
// line-height at all under react-native-css 3.0.7. Colour opacity like `text-white/80` must not
// match — only a recognised size token or arbitrary-length size before the slash counts.
const TEXT_SLASH_LEADING = /(?<![\w-])text-(2xs|xs|sm|base|lg|xl|[2-9]xl|\[[^\]]+\])\/[\w.[\]]+/;

interface Violation {
  file: string;
  match: string;
}

function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    if (/\.tsx?$/.test(entry.name)) return [full];
    return [];
  });
}

const SRC_FILES = walk(SRC_DIR);

/** Scans every src file for `pattern`, returning one violation per match (file + matched text). */
function scan(pattern: RegExp): Violation[] {
  const global = new RegExp(pattern.source, 'g');
  const violations: Violation[] = [];
  for (const file of SRC_FILES) {
    const content = readFileSync(file, 'utf8');
    for (const match of content.matchAll(global)) {
      violations.push({ file: path.relative(SRC_DIR, file), match: match[0] });
    }
  }
  return violations;
}

describe('class-rules (guards packages/react-native/src against forbidden class patterns)', () => {
  it('never uses rem in a class string (R3)', () => {
    expect(scan(REM)).toEqual([]);
  });

  it('never uses bare `rounded` (R4 — v4 compiles it to 0.25rem = 3.5px on native)', () => {
    expect(scan(BARE_ROUNDED)).toEqual([]);
  });

  it('never uses a Tailwind palette family the theme does not define (R19)', () => {
    expect(scan(FORBIDDEN_PALETTE_FAMILY)).toEqual([]);
  });

  it('registers the whole neutral ramp in the theme, so bare `neutral-N` is not OKLCH (R19)', () => {
    // Every Tailwind default neutral stop must be redefined by the generated theme, otherwise a
    // bare `neutral-<digit>` falls through to v4's OKLCH default and breaks on native.
    const missing = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].filter(
      (stop) => !new RegExp(`--color-neutral-${stop}:`).test(THEME_CSS),
    );
    expect(missing).toEqual([]);
  });

  it('never uses an arbitrary-length leading (R21 — react-native-css 3.0.7 drops/mis-scales it)', () => {
    expect(scan(ARBITRARY_LEADING)).toEqual([]);
  });

  it('never uses a text size with a slash line-height (R21 — gets no line-height at all)', () => {
    expect(scan(TEXT_SLASH_LEADING)).toEqual([]);
  });

  // Proves the regexes themselves are correct, independent of what src/ currently contains.
  it('regex self-check: matches the intended cases, rejects the exempted ones', () => {
    expect(REM.test('min-w-[8rem]')).toBe(true);
    expect(REM.test('text-[0.8rem]')).toBe(true);
    expect(REM.test('min-w-[128px]')).toBe(false);
    expect(REM.test('text-[12.8px]')).toBe(false);

    expect(BARE_ROUNDED.test('rounded')).toBe(true);
    expect(BARE_ROUNDED.test("'rounded'")).toBe(true);
    expect(BARE_ROUNDED.test('rounded-lg')).toBe(false);
    expect(BARE_ROUNDED.test('rounded-[3px]')).toBe(false);
    expect(BARE_ROUNDED.test('rounded-full')).toBe(false);

    expect(FORBIDDEN_PALETTE_FAMILY.test('bg-rose-500')).toBe(true);
    expect(FORBIDDEN_PALETTE_FAMILY.test('text-sky-400')).toBe(true);
    expect(FORBIDDEN_PALETTE_FAMILY.test('bg-neutral-25')).toBe(false);
    expect(FORBIDDEN_PALETTE_FAMILY.test('bg-slate-500')).toBe(false);

    expect(ARBITRARY_LEADING.test('leading-[20px]')).toBe(true);
    expect(ARBITRARY_LEADING.test('leading-[1.5rem]')).toBe(true);
    expect(ARBITRARY_LEADING.test('leading-[1.25]')).toBe(false);
    expect(ARBITRARY_LEADING.test('leading-5')).toBe(false);

    expect(TEXT_SLASH_LEADING.test('text-sm/6')).toBe(true);
    expect(TEXT_SLASH_LEADING.test('text-[11px]/4')).toBe(true);
    expect(TEXT_SLASH_LEADING.test('text-white/80')).toBe(false);
    expect(TEXT_SLASH_LEADING.test('text-xs')).toBe(false);
  });
});
