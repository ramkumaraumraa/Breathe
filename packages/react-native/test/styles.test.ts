import { readFileSync } from 'fs';
import path from 'path';

const css = readFileSync(path.join(__dirname, '../styles/lemniscate.css'), 'utf8');

/** Returns the text inside the first `{…}` block that follows `marker`. */
export function block(source: string, marker: string): string {
  const start = source.indexOf(marker);
  if (start < 0) throw new Error(`marker not found: ${marker}`);
  const open = source.indexOf('{', start);
  let depth = 0;
  for (let i = open; i < source.length; i++) {
    if (source[i] === '{') depth++;
    if (source[i] === '}' && --depth === 0) return source.slice(open + 1, i);
  }
  throw new Error(`unclosed block: ${marker}`);
}

export function vars(text: string): Record<string, string> {
  return Object.fromEntries(
    [...text.matchAll(/--([\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]),
  );
}

const light = vars(block(css, ':root'));
const dark = vars(block(css, '@media (prefers-color-scheme: dark)'));
const theme = vars(block(css, '@theme inline'));

// Leminiscate repo src/index.css :root (commit ecf73f7), HSL → rendered hex
const LIGHT: Record<string, string> = {
  background: '#ffffff', 'background-secondary': '#f2f2f3', 'background-tertiary': '#e2e4e4',
  foreground: '#191b1f', 'foreground-secondary': '#424448', 'foreground-tertiary': '#5f6063',
  card: '#ffffff', 'card-foreground': '#1f2937', popover: '#ffffff', 'popover-foreground': '#1f2937',
  primary: '#1b60c0', 'primary-foreground': '#ffffff',
  secondary: '#f2f2f3', 'secondary-foreground': '#191b1f',
  muted: '#f2f2f3', 'muted-foreground': '#424448',
  accent: '#40aad4', 'accent-foreground': '#ffffff',
  destructive: '#dc2828', 'destructive-foreground': '#ffffff',
  success: '#16a249', 'success-light': '#e1f5e8', 'success-dark': '#18773c',
  warning: '#f59f0a', 'warning-light': '#fdf3e3', 'warning-dark': '#b07911',
  danger: '#dc2828', 'danger-light': '#fae5e5', 'danger-dark': '#9f2323',
  info: '#40aad4', 'info-light': '#ebf7f9', 'info-dark': '#347d98',
  border: '#d6d6d7', input: '#d6d6d7', ring: '#1b60c0',
  'sidebar-background': '#ffffff', 'sidebar-foreground': '#1f2937',
  'sidebar-primary': '#1b60c0', 'sidebar-primary-foreground': '#ffffff',
  'sidebar-accent': '#f2f2f3', 'sidebar-accent-foreground': '#191b1f',
  'sidebar-border': '#d6d6d7', 'sidebar-ring': '#1b60c0',
  'gradient-start': '#40aad4', 'gradient-end': '#1b60c0',
};

// Leminiscate repo src/index.css .dark
const DARK: Record<string, string> = {
  background: '#121821', 'background-secondary': '#171d26', 'background-tertiary': '#1c222c',
  foreground: '#f8fafc', 'foreground-secondary': '#98a4b3', 'foreground-tertiary': '#738296',
  card: '#171d26', 'card-foreground': '#f8fafc', popover: '#171d26', 'popover-foreground': '#f8fafc',
  primary: '#3cb6d7', 'primary-foreground': '#121821',
  secondary: '#242c38', 'secondary-foreground': '#f8fafc',
  muted: '#242c38', 'muted-foreground': '#98a4b3',
  accent: '#2262ec', 'accent-foreground': '#ffffff',
  border: '#2c3644', input: '#2c3644', ring: '#3cb6d7',
  'sidebar-background': '#121821', 'sidebar-foreground': '#f8fafc',
  'sidebar-primary': '#3cb6d7', 'sidebar-primary-foreground': '#121821',
  'sidebar-accent': '#242c38', 'sidebar-accent-foreground': '#f8fafc', 'sidebar-border': '#2c3644',
};

// Repo "Figma foundation scales" (used via bg-[var(--color-*)] in button.tsx)
const SCALES: Record<string, string> = {
  'color-primary-25': '#e4ecf8', 'color-primary-50': '#d2dff3', 'color-primary-500': '#1c60c1',
  'color-primary-600': '#1c55a7', 'color-primary-700': '#1b3f73', 'color-primary-975': '#192332',
  'color-secondary-25': '#e8f5fa', 'color-secondary-50': '#d9eef6', 'color-secondary-500': '#40aad4',
  'color-secondary-600': '#3a93b7', 'color-secondary-700': '#347c9a', 'color-secondary-975': '#1e2c35',
  'color-positive-25': '#e3f4e9', 'color-positive-50': '#d0eddc', 'color-positive-500': '#16a34a',
  'color-positive-600': '#168d43', 'color-positive-700': '#17773c', 'color-positive-975': '#192b24',
  'color-alert-25': '#fef3e2', 'color-alert-50': '#fdeccd', 'color-alert-500': '#f59e0b',
  'color-alert-600': '#d2890e', 'color-alert-700': '#af7411', 'color-alert-975': '#332b1d',
  'color-negative-25': '#fbe5e5', 'color-negative-50': '#f8d4d4', 'color-negative-500': '#dc2626',
  'color-negative-600': '#bd2425', 'color-negative-700': '#9e2224', 'color-negative-975': '#301c20',
  'color-neutral-white-25': '#ffffff', 'color-neutral-white-50': '#f1f1f2',
  'color-neutral-white-75': '#e3e4e4', 'color-neutral-white-100': '#d6d6d7',
  'color-neutral-white-200': '#c8c8c9', 'color-neutral-white-300': '#babbbc',
  'color-neutral-white-400': '#acadae', 'color-neutral-white-500': '#9ea0a1',
  'color-neutral-black-25': '#dadbdb', 'color-neutral-black-500': '#7a7b7d',
  'color-neutral-black-700': '#5e5f62', 'color-neutral-black-900': '#424447',
  'color-neutral-black-975': '#191b1f',
};

describe('lemniscate.css', () => {
  it('never uses rem (NativeWind v5 inlines rem as 14px)', () => {
    expect(css).not.toMatch(/\d(\.\d+)?rem\b/);
  });

  it('registers the package source for class scanning', () => {
    expect(css).toContain('@source "../src";');
  });

  it.each(Object.entries(LIGHT))('light --%s = %s', (name, value) => {
    expect(light[name]).toBe(value);
  });

  it.each(Object.entries(DARK))('dark --%s = %s', (name, value) => {
    expect(dark[name]).toBe(value);
  });

  it.each(Object.entries(SCALES))('scale --%s = %s', (name, value) => {
    expect(theme[name]).toBe(value);
  });

  it('points every semantic colour at a defined runtime variable', () => {
    const refs = Object.values(theme)
      .map((v) => v.match(/^var\(--([\w-]+)\)$/)?.[1])
      .filter((v): v is string => !!v);
    expect(refs.length).toBeGreaterThan(40);
    refs.forEach((ref) => expect(light[ref]).toBeDefined());
  });

  it('reproduces the repo Tailwind v3 scale in px', () => {
    expect(theme.spacing).toBe('4px');
    expect(theme['radius-sm']).toBe('8px');
    expect(theme['radius-md']).toBe('10px');
    expect(theme['radius-lg']).toBe('12px');
    expect(theme['radius-xl']).toBe('12px');
    expect(theme['text-sm']).toBe('14px');
    expect(theme['text-sm--line-height']).toBe('20px');
    expect(theme['text-2xs']).toBe('10px');
    expect(theme['shadow-sm']).toBe('0 1px 2px 0 rgb(0 0 0 / 0.05)');
    expect(theme['font-sans']).toBe('Inter');
    expect(theme['breakpoint-xs']).toBe('480px');
  });
});
