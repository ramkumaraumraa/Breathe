import { readFileSync } from 'fs';
import path from 'path';
import { THEME } from '../../src/lib/theme';
import { block, vars } from '../styles.test';

const css = readFileSync(path.join(__dirname, '../../styles/lemniscate.css'), 'utf8');
const kebab = (key: string) => key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

// Strip comments first, same as styles.test.ts, so a comment can never shift the parsed blocks.
const uncommented = css.replace(/\/\*[\s\S]*?\*\//g, '');

describe('THEME mirrors lemniscate.css', () => {
  const light = vars(block(uncommented, ':root'));
  const dark = vars(block(uncommented, '@media (prefers-color-scheme: dark)'));

  it.each(Object.entries(THEME.light))('light %s', (key, value) => {
    expect(value).toBe(light[kebab(key)]);
  });

  it.each(Object.entries(THEME.dark))('dark %s', (key, value) => {
    expect(value).toBe(dark[kebab(key)]);
  });
});
