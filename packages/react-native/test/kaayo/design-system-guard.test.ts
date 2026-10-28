/**
 * Design-system guard: component code takes depth and colour from the tokens
 * (`kayoShadow*`, `kayoClay`, `kayoColors`, `theme`) and never imports retired
 * components. `src/kaayo/foundations` is not scanned: it defines the tokens.
 */
import fs from 'fs';
import path from 'path';

type Rule = 'boxShadow' | 'rnShadow' | 'hex' | 'rgb' | 'retired';

const ROOT = path.resolve(__dirname, '../..');
const SCAN_DIRS = ['src/kaayo/components'];

const RETIRED = ['LegacyNotificationBanner', 'ComingSoon', 'DashboardQuickActionsFab', 'PaymentsBiometricGate', 'DayDot'];

/** Genuine one-offs only. Each entry must still be needed (stale entries fail). */
const ALLOWLIST: Record<string, { rules: Rule[]; reason: string }> = {
  'src/kaayo/components/molecules/NotificationBanner.tsx': {
    rules: ['boxShadow'],
    reason: 'CTA knob soft drop + inner light tinted per category ramp, and the 1px white top rim: no token shape fits.',
  },
  'src/kaayo/components/molecules/WeekStrip.tsx': {
    rules: ['boxShadow'],
    reason: 'Container: 1px Primary/800 lip under the canopy + reversed (lit) inset, no token shape fits.',
  },
};

/** Blank out comments, keeping newlines so line numbers survive. */
function stripComments(src: string): string {
  const blank = (s: string) => s.replace(/[^\n]/g, ' ');
  return src
    .replace(/\/\*[\s\S]*?\*\//g, blank)
    .replace(/(^|[^:'"`\\])\/\/[^\n]*/g, (m, pre: string) => pre + blank(m.slice(pre.length)));
}

function lineOf(src: string, index: number): number {
  return src.slice(0, index).split('\n').length;
}

function scan(src: string): { rule: Rule; line: number; text: string }[] {
  const code = stripComments(src);
  const hits: { rule: Rule; line: number; text: string }[] = [];
  const add = (rule: Rule, index: number, text: string) =>
    hits.push({ rule, line: lineOf(code, index), text: text.replace(/\s+/g, ' ').slice(0, 80) });

  // boxShadow: '…px…' / `…px…` — token spreads and member access are fine.
  for (const m of code.matchAll(/boxShadow\s*:\s*(['"`])([\s\S]*?)\1/g)) {
    if (/\d+px/.test(m[2])) add('boxShadow', m.index!, m[0]);
  }
  // Old-style RN shadow props, and a non-zero elevation literal (tokens carry elevation: 0).
  for (const m of code.matchAll(/\bshadow(?:Offset|Color|Opacity|Radius)\s*:/g)) add('rnShadow', m.index!, m[0]);
  for (const m of code.matchAll(/\belevation\s*:\s*(\d*\.?\d+)/g)) {
    if (Number(m[1]) > 0) add('rnShadow', m.index!, m[0]);
  }
  // #rgb / #rgba / #rrggbb / #rrggbbaa after a quote, space, ( or , — skips URL fragments and ids.
  for (const m of code.matchAll(/(?<=['"`\s(,])#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b/g)) {
    add('hex', m.index!, m[0]);
  }
  for (const m of code.matchAll(/\brgba?\(/g)) add('rgb', m.index!, m[0]);
  for (const m of code.matchAll(/\bimport\s[^;]*?from\s*['"][^'"]+['"]|\brequire\(\s*['"][^'"]+['"]\s*\)/g)) {
    const name = RETIRED.find((r) => new RegExp(`\\b${r}\\b`).test(m[0]));
    if (name) add('retired', m.index!, `${name}: ${m[0]}`);
  }
  return hits;
}

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.tsx?$/.test(entry.name)) out.push(full);
  }
  return out;
}

const files = SCAN_DIRS.flatMap((d) => walk(path.join(ROOT, d))).map((f) => ({
  rel: path.relative(ROOT, f).split(path.sep).join('/'),
  src: fs.readFileSync(f, 'utf8'),
}));

describe('design-system guard', () => {
  it('scans a real tree', () => {
    expect(files.length).toBeGreaterThan(50);
  });

  it('component code has no literal shadows, hex, rgb(a) or retired imports', () => {
    const violations = files.flatMap(({ rel, src }) =>
      scan(src)
        .filter((h) => !ALLOWLIST[rel]?.rules.includes(h.rule))
        .map((h) => `  ${rel}:${h.line} [${h.rule}] ${h.text}`),
    );
    if (violations.length) {
      throw new Error(
        `Design-system violations — use kayoColors / theme / kayoShadow* / kayoClay, and drop retired components:\n${violations.join('\n')}`,
      );
    }
  });

  it('every allowlist entry is still needed', () => {
    const stale = Object.entries(ALLOWLIST).flatMap(([rel, { rules }]) => {
      const file = files.find((f) => f.rel === rel);
      if (!file) return [`  ${rel}: file no longer exists`];
      const found = new Set(scan(file.src).map((h) => h.rule));
      return rules.filter((r) => !found.has(r)).map((r) => `  ${rel}: no longer has [${r}]`);
    });
    if (stale.length) throw new Error(`Stale design-system allowlist entries — remove them:\n${stale.join('\n')}`);
  });

  it('the scanner catches each rule and ignores comments', () => {
    const rules = (src: string) => scan(src).map((h) => h.rule);
    expect(rules("const s = { boxShadow: '0px 2px 4px 0px red' };")).toEqual(['boxShadow']);
    expect(rules('const s = { boxShadow: `0px 2px ${x}` };')).toEqual(['boxShadow']);
    expect(rules('const s = { ...kayoClay.inset("sm"), boxShadow: kayoShadow.sm.boxShadow };')).toEqual([]);
    expect(rules("const c = '#FFF'; const b = '1px solid #a1b2c3';")).toEqual(['hex', 'hex']);
    expect(rules("const c = 'rgba(0,0,0,0.1)';")).toEqual(['rgb']);
    expect(rules('const s = { shadowColor: c, shadowOffset: { width: 4 }, elevation: 4 };')).toEqual([
      'rnShadow',
      'rnShadow',
      'rnShadow',
    ]);
    expect(rules('const s = { elevation: 0 }; const shadowOpacity = useSharedValue(1);')).toEqual([]);
    expect(rules("import { DayDot } from '../DayDot';")).toEqual(['retired']);
    expect(rules("// '#fff' rgba(0,0,0,1)\n/* boxShadow: '1px' */\nconst u = 'https://x.io/#abc';")).toEqual([]);
  });
});

