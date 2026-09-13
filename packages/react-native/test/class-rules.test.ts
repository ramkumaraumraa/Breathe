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
// `neutral-white-25` / `neutral-black-975` (the repo's foundation scale) must NOT match — only a
// *bare* `neutral-<digit>` family (Tailwind's default, unregistered in the theme) is forbidden.
const FORBIDDEN_NEUTRAL_FAMILY = /-neutral-\d/;
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
    expect([...scan(FORBIDDEN_PALETTE_FAMILY), ...scan(FORBIDDEN_NEUTRAL_FAMILY)]).toEqual([]);
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
    expect(FORBIDDEN_PALETTE_FAMILY.test('bg-neutral-white-25')).toBe(false);
    expect(FORBIDDEN_PALETTE_FAMILY.test('bg-slate-500')).toBe(false);

    expect(FORBIDDEN_NEUTRAL_FAMILY.test('bg-neutral-500')).toBe(true);
    expect(FORBIDDEN_NEUTRAL_FAMILY.test('bg-neutral-white-25')).toBe(false);
    expect(FORBIDDEN_NEUTRAL_FAMILY.test('bg-neutral-black-975')).toBe(false);

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
