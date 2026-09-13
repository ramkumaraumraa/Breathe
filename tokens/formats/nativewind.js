import { readFileSync } from 'node:fs';

// NativeWind v5 (Tailwind v4) theme for @aumraa/breathe-native. Product values come from tokens;
// the template is the Tailwind v3 px scale that makes repo class names render at repo sizes (atoms plan §0.3 facts 1, 2, 11).
// ponytail: one template (Leminiscate). A second native product gets its own template or a {{product}} placeholder.
const template = readFileSync(new URL('./nativewind.template.css', import.meta.url), 'utf8');
const kebab = (s) => s.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
const lines = (list, indent) => list.map(([n, v]) => `${indent}--${n}: ${v};`).join('\n');
const RADIUS = { sm: 'sm', md: 'md', default: 'lg', lg: 'xl' }; // token key → Tailwind radius step

export default {
  name: 'breathe/nativewind-theme',
  format: ({ dictionary }) => {
    const o = { light: [], dark: [], semantic: [], palette: [], radius: [], shadow: [] };
    for (const { path, value } of dictionary.allTokens) {
      const [, group, ...rest] = path;
      const name = rest.map(kebab).join('-');
      if (group === 'color') {
        o.light.push([name, value]);
        o.semantic.push([`color-${name === 'sidebar-background' ? 'sidebar' : name}`, `var(--${name})`]);
      } else if (group === 'dark') o.dark.push([rest.slice(1).map(kebab).join('-'), value]);
      else if (group === 'palette') o.palette.push([`color-${name}`, value]);
      else if (group === 'radius' && RADIUS[rest[0]]) o.radius.push([`radius-${RADIUS[rest[0]]}`, value]);
      else if (group === 'shadow' && (rest[0] === 'card' || rest[0] === 'brand')) o.shadow.push([`shadow-${name}`, value]);
    }
    const css = template
      .replace('{{light}}', () => lines(o.light, '  '))
      .replace('{{dark}}', () => lines(o.dark, '    '))
      .replace('{{semantic}}', () => lines(o.semantic, '  '))
      .replace('{{palette}}', () => lines(o.palette, '  '))
      .replace('{{radius}}', () => lines(o.radius, '  '))
      .replace('{{shadow}}', () => lines(o.shadow, '  '));
    if (/\{\{\w+\}\}/.test(css)) throw new Error('nativewind-theme: unfilled template slot');
    return css;
  },
};
