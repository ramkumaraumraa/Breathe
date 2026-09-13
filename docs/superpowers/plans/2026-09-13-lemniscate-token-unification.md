# Phase 4 — Leminiscate token unification (web React + React Native)

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development. Steps use `- [ ]`. Companion to `2026-09-11-breathe-native-leminiscate-atoms.md` (read its §0 first). Work on branch `feat/breathe-native` only — no new branches.

**Goal:** `tokens/src/lemniscate.json` becomes the single source for the Leminiscate brand. `pnpm tokens` generates both the web token CSS and `@aumraa/breathe-native/styles/lemniscate.css`. The web package and the docs Leminiscate tab render the repo's values in light and dark. Tests and CI fail if web and native drift apart, and every other product's generated output stays byte-identical.

**Standing rules added by this phase (copy into the main plan §0.4 in T1):**
- **R23 — Every change updates web React and React Native together.** A Leminiscate token or component change lands in the same commit for `packages/react` and `packages/react-native`. Tokens change only in `tokens/src/lemniscate.json` followed by `pnpm tokens`. Never hand-edit `tokens/dist/**` or `packages/react-native/styles/lemniscate.css` (both generated). If the other platform has no counterpart yet, add a tracker row in the same commit. Enforced by `src/test/lemniscate-tokens.test.ts`, `src/test/lemniscate-button-parity.test.ts` and the CI freshness step.
- **R24 — A change for one product leaves every other product byte-identical.** `pnpm tokens && git diff --exit-code -- tokens/dist ':(exclude)tokens/dist/web/<product>.css'` must pass. A shared web file may change only through a var slot whose fallback is today's value (e.g. `var(--breathe-radius-xl, calc(var(--radius) + 4px))`), or through a theme colour with no fallback that other products don't define.

**Findings behind this plan (verified 2026-09-13):**
1. Every product's web CSS includes all global tokens (`sd.config.js:99-107`), so any edit to `global.json` — even a comment — changes all 6 web outputs. Lemniscate's primitives live in `global.json` (`color.blue/sky/orange`, `radius.lg: 10 "Lemniscate default"`), and maligai/ulagellam/yakaizen reference them. ⇒ Leave `global.json` alone.
2. The repo's semantic colours are HSL, so they render one digit off the palette (primary `#1b60c0` vs scale `#1c60c1`). Keep both exactly as the repo renders them.
3. The docs Leminiscate tab gets its colours from 18 inline vars in `productMeta.lemniscate.vars` (`ProductThemeContext.tsx:24-48`); anything unlisted falls back to the docs site's Aumraa-based `theme.css`, and there is no dark mode.
4. The docs chrome (`src/styles/theme.css:96-102,170-171`) reads `--lmns-color-*` for **all** products.
5. `packages/react/styles/breathe.css` never defines `.bg-gradient-brand` (the gradient variant shows no gradient in consumer apps, pre-existing).
6. Breathe's web theme lacks `foreground-/background-secondary/tertiary` and `gradient-start/end` colours, so shared `badge.tsx:33` and `alert.tsx:108,124` compile to no CSS on web.
7. Web is Tailwind v4 (`rounded-xl` = radius+4 = 16px, heavier `shadow-sm`); the repo is v3.
8. Chrome is installed at `C:\Program Files\Google\Chrome\Application\chrome.exe` (headless screenshots possible).

**Run tests:** `corepack pnpm test` (web, vitest; fallback `./node_modules/.bin/vitest run` if `ERR_PNPM_IGNORED_BUILDS`) · `corepack pnpm --filter @aumraa/breathe-native test` · `corepack pnpm exec tsc --noEmit` (one pre-existing error: `MenuLayoutsPage.tsx` `tone="white"`) · `corepack pnpm build` (may print a Windows libuv assertion after "built in …" — harmless).

**Owner decisions (see tracker):** D7 = option (b) approved · D10 = apply for all products (approved) · D14 = Leminiscate only (approved) · D13 = Breathe colours win (Breathe's `tokens/src/lemniscate.json` colours are canonical for Leminiscate on web AND native; owner decided 2026-09-13: "breathe colors are correct, it should be followed here").

## Tracker

| Task | Unit | Status |
|---|---|---|
| T1 | Baseline, decisions, rules into main plan | ☑ |
| T2 | Docs chrome stops reading Lemniscate tokens | ☑ |
| T3 | Leminiscate tab renders the package stylesheet (light+dark), deep links | ☑ |
| T4 | One JSON → web tokens + native stylesheet | ☑ |
| T5 | Web theme slots (no-op for other products) | ☑ |
| T6 | Leminiscate Button web ↔ native (per D7) | ☑ |
| T7 | TabBar text colours | ☑ |
| T8 | Dialog mobile fit (D10 approved) | ☐ |
| T9 | CI freshness guard + docs | ☐ |
| T10 | Visual verification | ☐ |

---

### Task T1: Baseline, decisions, standing rules

**Files:** Modify `docs/superpowers/plans/2026-09-11-breathe-native-leminiscate-atoms.md` (§0.1, §0.4, §0.6, §0.7) and this file's tracker.

- [ ] **Step 1:** `git status` clean except the owner's own files; HEAD on `feat/breathe-native` includes merge `b5764e1`.
- [ ] **Step 2: Prove the token build is reproducible.** `corepack pnpm tokens && git status --porcelain -- tokens/dist` → no output. If any file changes, stop and report (committed dist has drifted; the byte-identical checks depend on a clean baseline). Ignore pure CRLF noise (`git diff --ignore-cr-at-eol --stat`).
- [ ] **Step 3: Test baseline.** Web and native suites pass; record counts.
- [ ] **Step 4: Baseline screenshots (Aumraa default).** Start `corepack pnpm dev --port 5173 --strictPort` in the background, then:
  ```bash
  CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"
  for p in atoms/button templates/tab-bar atoms/badge; do n=${p//\//-}
    "$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size=1280,2600 --virtual-time-budget=8000 \
      --screenshot="$TEMP/base-aumraa-$n.png" "http://localhost:5173/$p"; done
  ```
  Check the real route paths in `src/app/components/layout/navData.ts` first. Stop the dev server afterwards.
- [ ] **Step 5: Add decisions D7–D14 to main plan §0.1:**

| # | Decision |
|---|---|
| D7 | Web Button parity approach — see T6 (owner decides). |
| D8 | `--gradient-brand` on both platforms = 135°, `lmns.color.gradientStart` → `gradientEnd` (Breathe: blue-500 → sky-500). Native `BRAND_GRADIENT` is locked to those tokens by test. Supersedes D6's app-repo hex. |
| D9 | Resolved by D13: all Leminiscate values are Breathe's `global.json` scales; the app repo's HSL-rendered hex is not used (except the dark palette, which Breathe lacks). |
| D10 | Dialog mobile-fit classes: default leave shared Dialog unchanged (would change every product below 544px). T8 only if the owner approves. |
| D11 | Web Tailwind v4 vs repo v3 shadow differences: out of scope; follow-up "web v3-parity theme". |
| D12 | `global.json` is not edited (SD emits comments into all 6 web CSS files). |
| D13 | **Breathe's colours win** (owner, 2026-09-13). `lemniscate.json` keeps its refs into `global.json` and all existing `lmns.*` tokens; it is extended with the semantic/dark/palette tokens native needs. The app repo's light values are not adopted; the app will later update to match Breathe. |
| D14 | `.bg-gradient-brand`/`.shadow-brand` added to `packages/react/styles/lemniscate.css` only; adding them to `breathe.css` (all products) is a separate owner decision. |

- [ ] **Step 6:** Add R23 and R24 (text above) to main plan §0.4.
- [ ] **Step 7:** Main plan §0.6: mark `packages/react-native/styles/lemniscate.css` as "GENERATED by `pnpm tokens` from `tokens/src/lemniscate.json`"; §0.7: add a row "Phase 4 — token unification: see `2026-09-13-lemniscate-token-unification.md`".
- [ ] **Step 8:** Commit both plan files: `docs(plan): phase 4 token unification — decisions D7–D14, rules R23–R24`.

---

### Task T2: Stop the docs chrome reading Lemniscate tokens

**Files:** Modify `src/styles/theme.css`.

- [ ] **Step 1:** Replace each `--lmns-*` reference with the global it resolves to today (values from `tokens/dist/web/lemniscate.css`), so rendering doesn't change:

| Line | Before | After (same value) |
|---|---|---|
| 96 | `--sidebar: var(--lmns-color-background-secondary);` | `var(--color-neutral-50)` (#f9fafb) |
| 97, 101 | `var(--lmns-color-foreground)` | `var(--color-ink-500)` (#2e3033) |
| 100 | `var(--lmns-color-background-tertiary)` | `var(--color-neutral-100)` (#f3f4f6) |
| 102 | `var(--lmns-color-border)` | `var(--color-neutral-200)` (#e5e7eb) |
| 170 | `--input-background: var(--lmns-color-background-secondary);` | `var(--color-neutral-50)` |
| 171 | `--switch-background: var(--lmns-color-border-hover);` | `var(--color-neutral-400)` (#9ca3af) |

  Verify the line numbers first; match by content.
- [ ] **Step 2:** `grep -n -- "--lmns-" src/styles/theme.css` → nothing. Web tests + build pass.
- [ ] **Step 3:** Commit `fix(docs): docs chrome reads neutral globals, not Lemniscate tokens (no visual change)`.

---

### Task T3: Leminiscate tab renders the package stylesheet, light and dark

**Files:** Modify `src/app/context/ProductThemeContext.tsx`, `src/app/context/ThemeContext.tsx`. Create `src/test/product-theme.test.tsx`.

- [ ] **Step 1: Failing test** `src/test/product-theme.test.tsx`:
```tsx
import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ProductThemeProvider, ProductPreviewWrapper, productMeta } from '@/app/context/ProductThemeContext'

describe('Leminiscate preview theme', () => {
  it('maps every semantic var from the package stylesheet', () => {
    expect(productMeta.lemniscate.vars['--primary']).toBe('var(--lmns-color-primary)')
    expect(productMeta.lemniscate.vars['--card']).toBeDefined() // used to fall through to the Aumraa docs default
  })
  it('opens on ?product=', () => {
    window.history.replaceState(null, '', '/?product=lemniscate')
    const { container } = render(<ProductThemeProvider><ProductPreviewWrapper><span /></ProductPreviewWrapper></ProductThemeProvider>)
    expect((container.firstChild as HTMLElement).style.getPropertyValue('--primary')).toBe('var(--lmns-color-primary)')
    window.history.replaceState(null, '', '/')
  })
})
```
  Adjust imports/wrappers to how the providers actually nest (ThemeProvider may be required). Run → FAIL.
- [ ] **Step 2: Implement** in `ProductThemeContext.tsx`:
```ts
import lemniscateCss from '../../../packages/react/styles/lemniscate.css?raw'

/** Custom properties in the first `<selector> {…}` block of a stylesheet (comments stripped). */
function cssVars(css: string, selector: string): Record<string, string> {
  const s = css.replace(/\/\*[\s\S]*?\*\//g, '')
  const start = s.indexOf(`${selector} {`)
  if (start < 0) return {}
  const body = s.slice(s.indexOf('{', start) + 1, s.indexOf('}', start))
  return Object.fromEntries([...body.matchAll(/(--[\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]))
}
```
  - Add `darkVars?: Record<string, string>` to the productMeta value type.
  - lemniscate: `vars: cssVars(lemniscateCss, ':root'), darkVars: cssVars(lemniscateCss, '.dark')`; delete the 18-line inline object. (Until T4 lands, `packages/react/styles/lemniscate.css` has no `.dark` block → `darkVars` is `{}`; that's fine.)
  - Provider initial state reads `?product=`: `useState<ProductId>(() => { const p = new URLSearchParams(window.location.search).get('product'); return p && p in productMeta ? (p as ProductId) : 'aumraa' })`.
  - Wrapper: `const { isDark } = useTheme(); const meta = productMeta[activeProduct]; const vars = isDark && meta.darkVars ? { ...meta.vars, ...meta.darkVars } : meta.vars`. Check the real ThemeContext API name (`isDark`/`theme`).
  - `ThemeContext.tsx` initializer, before localStorage: `const q = new URLSearchParams(window.location.search).get('theme'); if (q === 'light' || q === 'dark') return q;`.
- [ ] **Step 3:** Run → PASS. If `vars` is `{}` under vitest (`?raw` blanked by `css: false`), fallback: keep a hand-written `LEMNISCATE_VARS` object and make test 1 compare it with `cssVars(readFileSync('packages/react/styles/lemniscate.css','utf8'), ':root')`.
- [ ] **Step 4:** Web tests + `tsc` + build. Only the Leminiscate tab changes (card, popover, input now use Lemniscate's mapping).
- [ ] **Step 5:** Commit `feat(docs): Leminiscate tab renders the package stylesheet (light+dark); ?product= and ?theme= deep links`.

---

### Task T4: One JSON → web tokens + native stylesheet (single commit, R23)

**Decision D13 (2026-09-13): Breathe's colours win.** `tokens/src/lemniscate.json` keeps its references into `global.json` (blue/sky/orange/neutral/ink/status). It is *extended*, not rewritten: it gains the semantic tokens the native theme needs (card, popover, muted, destructive, input, ring, sidebar-*, status light/dark), a dark palette (Breathe has none for Leminiscate → the app repo's `.dark` hex, literal), and `lmns.palette` — the app's foundation-scale *names* (`primary-500`, `neutral-white-25` …) aliased to Breathe's global scales, so the repo's Button class names keep working on both platforms while every value is Breathe's. Web `packages/react/styles/lemniscate.css` maps names 1:1 (no more hand-picked cross-mapping such as `--secondary: background-secondary`). Native `packages/react-native/styles/lemniscate.css` is generated from the same JSON. **The native app's colours change** (secondary → sky, accent → orange, foreground → ink-500, radius → 10px) — expected.

**Files:** Modify `tokens/src/lemniscate.json`, `tokens/sd.config.js`; create `tokens/formats/nativewind.js`, `tokens/formats/nativewind.template.css`; regenerate `tokens/dist/web/lemniscate.css` and `packages/react-native/styles/lemniscate.css`; modify `packages/react/styles/lemniscate.css`, `packages/react-native/src/lib/theme.ts`, `packages/react-native/src/atoms/gradient.tsx`, `packages/react-native/test/styles.test.ts`, `packages/react-native/test/lib/theme.test.ts`, `packages/react-native/test/atoms/gradient.test.tsx`, `packages/react-native/README.md`, `src/test/product-theme.test.tsx`; create `src/test/lemniscate-tokens.test.ts`.

**What goes where.** JSON = product values (all refs into `global.json` except the dark block and `shadow.brand`). Template = platform boilerplate (v3 px scale: palette families, text scale + ratio line-heights, `--spacing: 4px`, radius 2xl/3xl, v3 shadows, containers, breakpoints, `--font-sans: Inter` — RN needs one family name, not the global font stack —, `@source`, `.leading-N` rules). The native THEME mirror (`src/lib/theme.ts`) and `BRAND_GRADIENT` stay hand-written; their tests lock them to the generated CSS.

- [ ] **Step 1: Failing parity test** `src/test/lemniscate-tokens.test.ts`:
```ts
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { describe, it, expect } from 'vitest'

const read = (p: string) => readFileSync(resolve(process.cwd(), p), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '')
function block(src: string, marker: string) {
  const open = src.indexOf('{', src.indexOf(marker)); let d = 0
  for (let i = open; i < src.length; i++) { if (src[i] === '{') d++; if (src[i] === '}' && --d === 0) return src.slice(open + 1, i) }
  throw new Error(`no block: ${marker}`)
}
const vars = (t: string) => Object.fromEntries([...t.matchAll(/--([\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]))

const dist = vars(block(read('tokens/dist/web/lemniscate.css'), ':root'))
const native = read('packages/react-native/styles/lemniscate.css')
const nLight = vars(block(native, ':root')), nDark = vars(block(native, '@media (prefers-color-scheme: dark)'))
const nTheme = vars(block(native, '@theme inline'))
const web = read('packages/react/styles/lemniscate.css')
const wLight = vars(block(web, ':root')), wDark = vars(block(web, '.dark'))
const pick = (p: string) => Object.entries(dist).filter(([k]) => k.startsWith(p)).map(([k, v]) => [k.slice(p.length), v, k] as const)

describe('Leminiscate: web and native carry the same token values', () => {
  it('has the expected token counts', () => {
    expect(pick('lmns-color-')).toHaveLength(54)
    expect(pick('lmns-dark-color-')).toHaveLength(28)
    expect(pick('lmns-palette-')).toHaveLength(43)
  })
  it.each(pick('lmns-color-'))('light %s', (n, v, t) => { expect(nLight[n]).toBe(v); expect(wLight[n]).toBe(`var(--${t})`) })
  it.each(pick('lmns-dark-color-'))('dark %s', (n, v, t) => { expect(nDark[n]).toBe(v); expect(wDark[n]).toBe(`var(--${t})`) })
  it.each(pick('lmns-palette-'))('scale %s', (n, v, t) => { expect(nTheme[`color-${n}`]).toBe(v); expect(wLight[`color-${n}`]).toBe(`var(--${t})`) })
  it('native has no colour the tokens lack', () => {
    expect(Object.keys(nLight).sort()).toEqual(pick('lmns-color-').map(([n]) => n).sort())
    expect(Object.keys(nDark).sort()).toEqual(pick('lmns-dark-color-').map(([n]) => n).sort())
  })
  it('radius, shadow and gradient come from the tokens', () => {
    expect(nTheme['radius-sm']).toBe(dist['lmns-radius-sm'])
    expect(nTheme['radius-md']).toBe(dist['lmns-radius-md'])
    expect(nTheme['radius-lg']).toBe(dist['lmns-radius-default'])
    expect(nTheme['radius-xl']).toBe(dist['lmns-radius-lg'])
    expect(nTheme['shadow-card']).toBe(dist['lmns-shadow-card'])
    expect(nTheme['shadow-brand']).toBe(dist['lmns-shadow-brand'])
    expect(wLight['radius']).toBe('var(--lmns-radius-default)')
    expect(wLight['gradient-brand']).toBe('linear-gradient(135deg, var(--lmns-color-gradient-start) 0%, var(--lmns-color-gradient-end) 100%)')
  })
})
```
  Run → FAIL on the counts.

- [ ] **Step 2: Extend `tokens/src/lemniscate.json`.** Keep every existing key and value. Add (all `type: color` unless noted; refs in braces):
  - **`lmns.color`** additions (26): `card` `{lmns.color.background}`, `cardForeground` `{lmns.color.foreground}`, `popover` `{lmns.color.background}`, `popoverForeground` `{lmns.color.foreground}`, `muted` `{lmns.color.backgroundTertiary}`, `mutedForeground` `{lmns.color.foregroundSecondary}`, `destructive` `{lmns.color.negative}`, `destructiveForeground` `{lmns.color.negativeForeground}`, `input` `{lmns.color.border}`, `ring` `{lmns.color.primary}`, `successLight` `{color.status.successLight}`, `successDark` `{color.status.successDark}`, `warningLight`/`warningDark`/`dangerLight`/`dangerDark`/`infoLight`/`infoDark` likewise, `sidebarBackground` `{lmns.color.background}`, `sidebarForeground` `{lmns.color.foreground}`, `sidebarPrimary` `{lmns.color.primary}`, `sidebarPrimaryForeground` `{lmns.color.primaryForeground}`, `sidebarAccent` `{lmns.color.backgroundSecondary}`, `sidebarAccentForeground` `{lmns.color.foreground}`, `sidebarBorder` `{lmns.color.border}`, `sidebarRing` `{lmns.color.primary}`. Total 54. (These mirror today's `packages/react/styles/lemniscate.css` mapping, minus its `secondary`/`accent` cross-mapping — D13.)
  - **`lmns.dark.color`** (28, literal lowercase hex, comment "Breathe has no Leminiscate dark palette; from the app repo src/index.css .dark (ecf73f7)"): background `#121821`, backgroundSecondary `#171d26`, backgroundTertiary `#1c222c`, foreground `#f8fafc`, foregroundSecondary `#98a4b3`, foregroundTertiary `#738296`, card `#171d26`, cardForeground `#f8fafc`, popover `#171d26`, popoverForeground `#f8fafc`, primary `#3cb6d7`, primaryForeground `#121821`, secondary `#242c38`, secondaryForeground `#f8fafc`, muted `#242c38`, mutedForeground `#98a4b3`, accent `#2262ec`, accentForeground `#ffffff`, border `#2c3644`, input `#2c3644`, ring `#3cb6d7`, sidebarBackground `#121821`, sidebarForeground `#f8fafc`, sidebarPrimary `#3cb6d7`, sidebarPrimaryForeground `#121821`, sidebarAccent `#242c38`, sidebarAccentForeground `#f8fafc`, sidebarBorder `#2c3644`.
  - **`lmns.palette`** (43) — app scale names → Breathe scales, same step number: `primary.{25,50,500,600,700,975}` → `{color.blue.N}`; `secondary.{…}` → `{color.sky.N}`; `positive.{…}` → `{color.feedback.positive.N}`; `alert.{…}` → `{color.feedback.warning.N}`; `negative.{…}` → `{color.feedback.negative.N}`; `neutralWhite.{25,50,75,100,200,300,400,500}` → `{color.neutral.N}`; `neutralBlack.{25,500,700,900,975}` → `{color.ink.N}`. Comment on the group: "App repo foundation-scale names (used by the repo Button as `bg-[var(--color-primary-500)]`) aliased to Breathe's global scales — D13."
  - **`lmns.radius`**: add `md` `{radius.md}` (keep default/sm/lg/pill as they are).
  - **`lmns.shadow`**: add `brand` `"0 2px 8px rgba(28, 96, 193, 0.2)"` type shadow (primary blue at 20%; the app's used its own blue).
  - Nothing removed. `pnpm tokens` must still resolve every ref (SD errors on a bad ref).

- [ ] **Step 3: Template.** `git show HEAD:packages/react-native/styles/lemniscate.css > tokens/formats/nativewind.template.css`, then replace by content: the header with *"GENERATED by `pnpm tokens` from tokens/src/lemniscate.json (tokens/formats/nativewind.js). Do not edit."* (keep the import instructions and px note; drop the app-repo commit reference); the `:root` body → `{{light}}`; the dark media `:root` body → `{{dark}}`; the semantic `--color-*: var(--*)` lines → `{{semantic}}`; the foundation scale lines → `{{palette}}`; radius sm–xl lines → `{{radius}}` (comment: *"Radius from tokens; 2xl/3xl are v3 defaults"*); `--shadow-card`/`--shadow-brand` → `{{shadow}}`. Keep verbatim: `--font-sans: Inter;`, breakpoints, v3 palette families, text scale, spacing, v3 shadows, containers, `@source`, `.leading-N` rules.
- [ ] **Step 4: Format** `tokens/formats/nativewind.js`:
```js
import { readFileSync } from 'node:fs';

// NativeWind v5 (Tailwind v4) theme for @aumraa/breathe-native. Product values come from tokens;
// the template is the Tailwind v3 px scale that makes repo class names render at repo sizes (plan §0.3 facts 1, 2, 11).
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
```
- [ ] **Step 5: Wire** into `tokens/sd.config.js`: `import nativewindTheme from './formats/nativewind.js';` + `StyleDictionary.registerFormat(nativewindTheme);`; lemniscate platforms `['web', 'nativewind']`; add:
```js
  if (product.platforms.includes('nativewind')) {
    config.platforms.nativewind = {
      transformGroup: 'breathe/web', // px dimensions, css colours — same values as the web output
      buildPath: 'packages/react-native/styles/',
      files: [{ destination: `${product.name}.css`, format: 'breathe/nativewind-theme',
                filter: (token) => token.path[0] === product.prefix }],
    };
  }
```
- [ ] **Step 6: Generate; prove other products didn't move.** `corepack pnpm tokens && git diff --exit-code --stat -- tokens/dist ':(exclude)tokens/dist/web/lemniscate.css'` → no output (CRLF-only noise: confirm with `--ignore-cr-at-eol`).
- [ ] **Step 7: Check the generated native file's structure.** Diff against `git show HEAD:packages/react-native/styles/lemniscate.css`: `@theme inline` still has every `--text-*`, `--spacing`, `--radius-2xl/3xl`, v3 shadows, containers, breakpoints, `--font-sans: Inter`; the `.leading-N` rules and `@source` are unchanged; `:root` has 54 vars, the dark block 28, `--color-*` semantic lines 54, palette lines 43. No `{{`, no `undefined`. Colour values are expected to differ from HEAD (D13).
- [ ] **Step 8: Rewrite `packages/react/styles/lemniscate.css`.** Keep the two `@import` lines. `:root` maps every `lmns-color-*` 1:1 (`--background: var(--lmns-color-background);` … 54 lines; `--sidebar-background` also gets `--sidebar: var(--lmns-color-sidebar-background);`) and every `lmns-palette-*` to `--color-<name>` (43 lines); `.dark` maps every `lmns-dark-color-*` (28 lines + `--sidebar`). Generate the lines with a node one-liner over `tokens/dist/web/lemniscate.css`. Also in `:root`: `--radius: var(--lmns-radius-default);`, `--input-background: var(--lmns-color-background);`, `--switch-background: var(--lmns-color-background-tertiary);`, `--gradient-brand-start: var(--lmns-color-gradient-start);`, `--gradient-brand-end: var(--lmns-color-gradient-end);`, `--gradient-brand: linear-gradient(135deg, var(--lmns-color-gradient-start) 0%, var(--lmns-color-gradient-end) 100%);`, `--breathe-radius-xl: var(--lmns-radius-lg);`, `--breathe-shadow-brand: var(--lmns-shadow-brand);`. Append (D14): `@layer utilities { .bg-gradient-brand { background: var(--gradient-brand); } .shadow-brand { box-shadow: var(--lmns-shadow-brand); } }`. Header: "Semantic names map 1:1 to `--lmns-*` from `tokens/src/lemniscate.json`; guarded by `src/test/lemniscate-tokens.test.ts`". Note the behaviour change vs HEAD: `--secondary` was `background-secondary`, `--accent` was `tertiary` — now the tokens' own `secondary` (sky) and `accent` (orange) (D13).
- [ ] **Step 9: Native code + tests.**
  - `src/atoms/gradient.tsx`: `BRAND_GRADIENT = 'linear-gradient(135deg, #1c60c1 0%, #40aad4 100%)'` (gradient-start → gradient-end; copy the exact strings `pnpm tokens` emitted).
  - `src/lib/theme.ts` THEME: light `background`, `primary`, `secondary`, `mutedForeground`, `ring` = the generated `:root` values; dark = the generated dark values. Its existing test reads the CSS and will tell you the exact strings.
  - `test/styles.test.ts`: delete the `LIGHT`, `DARK`, `SCALES` tables and their three `it.each` blocks (they were a second copy of the truth; `src/test/lemniscate-tokens.test.ts` now proves native == tokens). Keep rem/line-height/leading/@source/semantic-ref tests; in "reproduces the repo Tailwind v3 scale" set radius expectations to `radius-sm` 8px, `radius-md` 8px, `radius-lg` 10px, `radius-xl` 16px.
  - `test/lib/theme.test.ts`: add `expect(BRAND_GRADIENT).toBe(\`linear-gradient(135deg, ${light['gradient-start']} 0%, ${light['gradient-end']} 100%)\`)` (import from `../../src/atoms/gradient`).
  - `test/atoms/gradient.test.tsx`: update the literal to the new gradient string.
  - Other atom tests that assert hex colours (grep `#1b60c0|#f2f2f3|#424448|#3cb6d7` in `packages/react-native/test`) → read from THEME or the CSS instead of literals.
- [ ] **Step 10:** Dark-mode test in `src/test/product-theme.test.tsx`: dark theme + `?product=lemniscate` → wrapper `--background` = `var(--lmns-dark-color-background)`.
- [ ] **Step 11:** `DesignTokensPage.tsx`: confirm the Lemniscate rows show Breathe's values (primary #1C60C1, secondary #40AAD4, tertiary #ED651C, radius 10) — fix any that don't. Native README: `styles/lemniscate.css` is generated; colours are Breathe's (D13).
- [ ] **Step 12:** All suites + both typechecks + build pass.
- [ ] **Step 13:** Commit (web + native together): `feat(tokens): lemniscate.json feeds web and native themes (D13 Breathe colours; dark palette; scale aliases)`.

---

### Task T5: Web theme slots (no-op for products that don't set them)

**Files:** `packages/react/styles/breathe.css`, `src/styles/tailwind.css`, `src/styles/theme.css`.

- [ ] **Step 1:** `grep -rn "foreground-secondary\|foreground-tertiary\|background-secondary\|background-tertiary\|gradient-start\|gradient-end" packages/react/src src/app --include=*.tsx`; for each hit confirm no other text/bg colour class sits on the same element (a no-fallback entry would compute to unset and override it). Known: `badge.tsx:33`, `alert.tsx:108,124` (single colour classes, fine).
- [ ] **Step 2:** In both `@theme inline` blocks (breathe.css and docs tailwind.css) add:
```css
  /* Repo semantic colours. No fallback on purpose: where a product doesn't define the runtime var the
     declaration is invalid at computed-value time → inherit/transparent, i.e. exactly as before (R24). */
  --color-background-secondary: var(--background-secondary);
  --color-background-tertiary: var(--background-tertiary);
  --color-foreground-secondary: var(--foreground-secondary);
  --color-foreground-tertiary: var(--foreground-tertiary);
  --color-gradient-start: var(--gradient-start);
  --color-gradient-end: var(--gradient-end);
```
  and change `--radius-xl` to `var(--breathe-radius-xl, calc(var(--radius) + 4px))`.
- [ ] **Step 3:** `theme.css` `.shadow-brand` → `box-shadow: var(--breathe-shadow-brand, 0 2px 8px color-mix(in srgb, var(--gradient-brand-start) 28%, transparent));` (keep today's fallback value — check the current rule first).
- [ ] **Step 4:** Tests + build. Re-take the T1 Aumraa screenshots and compare (Read both PNGs): no visible change. On `?product=lemniscate`: badge secondary text `#424448`, Button xl radius 12px.
- [ ] **Step 5:** Commit `feat(web): repo semantic colour slots + product radius-xl/shadow-brand slots (other products unchanged)`.

---

### Task T6: Leminiscate Button web ↔ native (approach per D7)

**Evidence.** The shared web Button differs from the repo in base (`font-semibold` vs `font-medium`, `gap-2` vs per-size gap, `transition-all duration-200` vs a 150ms property list, `disabled:opacity-50` vs per-variant disabled colours), variants (10 vs 13: no danger/info/neutral), sizes (7 vs 9: no xxl/icon-xs; xs `h-6` vs `h-7`; default `px-6 py-2.5` vs `px-4`; lg `px-8 text-base` vs `px-5 text-sm`; xl `px-10 text-lg` vs `px-6 text-base`), outline `border-2` vs `border`, hover alpha vs next scale step, and no `loading`/`leftIcon`/`rightIcon`. Aumraa, Technocracy, Maligai and Ilakh use the shared Button, and `src/test/button.test.tsx` locks its classes.

**Options:**
- **(a) Component tokens now** — per-product `--color-btn-*`/radius/height tokens consumed by one shared Button on web and native. Most "token-pure"; requires tokenising the shared Button's current look for every other product (≈9 sizes × 4 props + 13 variants × 5 states each) and migrating Kaayo's different API. Large; risk of drift in products nobody reviews.
- **(b) Leminiscate web Button** — `packages/react/src/lemniscate/button.tsx`, the repo's Button verbatim (colours still from `lemniscate.json` via the scale vars), exported as `@aumraa/breathe-react/lemniscate`, locked to the native Button by a parity test. Zero risk to other products; component tokens later.
- **(c) Change the shared Button to the repo's** and re-express other products' current look through their tokens. Similar cost to (a).

**Steps for (b)** (if the owner picks (a), stop and write a separate component-token plan first):
- [ ] **Step 1:** Copy the repo's `src/design-system/ui/button.test.tsx` to `src/test/lemniscate-button.test.tsx` with `import { Button, buttonVariants } from '@aumraa/breathe-react/lemniscate'`.
- [ ] **Step 2: Parity test** `src/test/lemniscate-button-parity.test.ts`:
```ts
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { describe, it, expect } from 'vitest'

const src = (p: string) => readFileSync(resolve(process.cwd(), p), 'utf8')
const web = src('packages/react/src/lemniscate/button.tsx')
const nat = src('packages/react-native/src/atoms/button.tsx')
const natText = nat.slice(nat.indexOf('buttonTextVariants = cva'))

/** { key: classes } of the first `<marker>` object literal (cva variant/size maps). */
function entries(text: string, marker: string): Record<string, string> {
  const open = text.indexOf('{', text.indexOf(marker)); let d = 0, end = open
  for (let i = open; i < text.length; i++) { if (text[i] === '{') d++; if (text[i] === '}' && --d === 0) { end = i; break } }
  const body = text.slice(open + 1, end)
  return Object.fromEntries([...body.matchAll(/["']?([\w-]+)["']?:\s*["']([^"']*)["']/g)].map((m) => [m[1], m[2]]))
}
// Web → native class form (§0.4 R2): drop hover/focus/disabled, bg-[var(--color-x)] → bg-x.
const norm = (c: string) => c.split(/\s+/).filter((x) => x && !/^(hover|focus-visible|disabled):/.test(x))
  .map((x) => x.replace(/-\[(?:color:)?var\(--color-([\w-]+)\)\]/, '-$1'))
const colours = (l: string[]) => l.filter((x) => /^(active:)?(bg|border|text)-/.test(x)).sort()
// §0.5: gradient is painted via style on native; link's pressed colour is a compound variant on native.
const WEB_ONLY: Record<string, string[]> = { gradient: ['bg-gradient-brand'], link: ['active:text-primary-700'] }

const wV = entries(web, 'variant: {'), nV = entries(nat, 'variant: {'), nTV = entries(natText, 'variant: {')
const wS = entries(web, 'size: {'), nS = entries(nat, 'size: {'), nTS = entries(natText, 'size: {')

describe('Leminiscate Button: web ↔ native', () => {
  it('exposes the same variants and sizes', () => {
    expect(Object.keys(nV)).toEqual(Object.keys(wV))
    expect(Object.keys(nS)).toEqual(Object.keys(wS))
  })
  it.each(Object.keys(wV))('variant %s uses the same colour classes', (v) => {
    const webC = colours(norm(wV[v])).filter((c) => !WEB_ONLY[v]?.includes(c))
    expect(colours([...norm(nV[v]), ...norm(nTV[v])])).toEqual(webC)
  })
  it.each(Object.keys(wS))('size %s has the same box and label size', (s) => {
    const w = norm(wS[s]).filter((c) => !c.startsWith('[&_svg]'))
    expect(norm(nS[s]).sort()).toEqual(w.filter((c) => !c.startsWith('text-')).sort())
    const wText = w.filter((c) => c.startsWith('text-'))
    if (wText.length) expect(norm(nTS[s])).toEqual(wText)
  })
})
```
  Native deviations already approved in the atoms plan (overflow-hidden only on gradient, pressed via `active:`, hover dropped) may need the normaliser adjusted; document every adjustment in the test. Run → FAIL (module missing).
- [ ] **Step 3:** Copy the repo's `button.tsx` to `packages/react/src/lemniscate/button.tsx` verbatim (only `import { cn } from "../lib/utils";`). `index.ts`: `// Leminiscate-specific components. Import via '@aumraa/breathe-react/lemniscate'.` + `export * from './button';`. `packages/react/package.json` exports `"./lemniscate": { "types": "./dist/lemniscate/index.d.ts", "import": "./dist/lemniscate/index.js" }`. Aliases in `vite.config.ts` and `vitest.config.ts`: `'@aumraa/breathe-react/lemniscate'` → `./packages/react/src/lemniscate` (before `'@'`).
- [ ] **Step 4:** `ButtonPage.tsx`: `import { Button as LemniscateButton } from '@aumraa/breathe-react/lemniscate'`; `const Btn: typeof Button = activeProduct === 'lemniscate' ? LemniscateButton : Button`; use `<Btn` in the non-Kaayo previews; add one `products: ['lemniscate']` section showing danger/info/neutral, xxl/icon-xs, `loading`, `leftIcon`/`rightIcon`. Lemniscate code tabs show `import { Button } from '@aumraa/breathe-react/lemniscate'` and `import { Button } from '@aumraa/breathe-native'`.
- [ ] **Step 5:** All suites + typechecks + build + `corepack pnpm --filter @aumraa/breathe-react build`.
- [ ] **Step 6:** Commit `feat(react): Leminiscate web Button mirrors the repo and native Button; parity test`.

---

### Task T7: TabBar text colours

**Files:** `packages/react/src/templates/TabBar.tsx`; delete `src/app/components/custom/lemniscate/TabBar.tsx` if unused (`grep -rn "custom/lemniscate" src` → nothing).

- [ ] **Step 1:** Replace `'text-muted-foreground hover:text-foreground'` with `'text-[color:var(--foreground-tertiary,var(--muted-foreground))] hover:text-[color:var(--foreground-secondary,var(--foreground))]'` (repo tokens where defined; today's colours elsewhere, R24). `// ponytail:` comment naming the upgrade path (a `--tabbar-*` component token).
- [ ] **Step 2:** Tests + build; screenshots of `templates/tab-bar` for `?product=lemniscate` and `?product=aumraa` (Aumraa unchanged vs T1 baseline).
- [ ] **Step 3:** Commit `feat(react): TabBar uses repo text tokens with today's colours as fallback; drop unused docs copy`; tracker row "native TabBar (organism) — backlog".

### Task T8: Dialog mobile fit (only if the owner approves D10)

- [ ] **Step 1:** `packages/react/src/organisms/dialog.tsx` `DialogContent`: replace `w-full` with `max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] overflow-y-auto` (repo string).
- [ ] **Step 2:** Tests + build.
- [ ] **Step 3:** Commit `fix(react): dialog fits small screens (repo parity; all products)`; tracker row for the native Dialog.

### Task T9: CI freshness guard and docs

- [ ] **Step 1:** `.github/workflows/ci.yml`, before `Test`:
```yaml
      - name: Tokens — generated files match tokens/src
        run: pnpm tokens && git diff --exit-code -- tokens/dist packages/react-native/styles
```
- [ ] **Step 2:** `CLAUDE.md` Token Pipeline: "lemniscate also generates `packages/react-native/styles/lemniscate.css` (template `tokens/formats/nativewind.template.css`). Never hand-edit generated files; see R23/R24."
- [ ] **Step 3:** Commit `ci: fail when generated token files are stale`.

### Task T10: Visual verification

- [ ] **Step 1:** Screenshots (gstack `/browse` if available, else headless Chrome as in T1): `?product=lemniscate&theme=light` and `&theme=dark` on `atoms/button`, `atoms/badge`, `templates/tab-bar`, `foundations/design-tokens`; `?product=aumraa`, `?product=technocracy`, `?product=kaayo` on `atoms/button`. Save to `$TEMP`, open with Read.
- [ ] **Step 2:** Leminiscate: primary `#1b60c0`; outline/brandOutline borders from the neutral-white scale; gradient sky → blue (`#3cb6d7` → `#2262ec`); radius 12px; dark background `#121821`, primary `#3cb6d7`; all 13 variants and 9 sizes (if T6 (b)).
- [ ] **Step 3:** Aumraa, Technocracy, Kaayo identical to the T1 baseline.
- [ ] **Step 4:** Native emulator re-check optional (values identical by T4 Step 7).
- [ ] **Step 5:** Tracker: mark T1–T10 ☑.

**Risks:** `?raw` CSS under vitest (T3 fallback); a colour class next to a no-fallback theme colour (T5 Step 1); Windows CRLF noise in byte-identical diffs (`--ignore-cr-at-eol`); external consumers of removed `--lmns-*` tokens (D13); web v3/v4 shadow gap remains (D11).
