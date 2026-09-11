# Breathe Native — Leminiscate Foundations & Atoms Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `@aumraa/breathe-native` to Breathe — an installable React Native package containing Leminiscate's foundations (tokens/theme) and every atom, visually identical to the Leminiscate web repo — so the Leminiscate mobile app can `pnpm add` it and only consume.

**Architecture:** A new pnpm workspace package `packages/react-native` ships TypeScript source plus one theme stylesheet (`styles/lemniscate.css`). Styling is NativeWind v5 (Tailwind v4 CSS-first). Components are scaffolded from `react-native-reusables` (shadcn for RN, built on `@rn-primitives/*`), then their class strings are replaced with the Leminiscate repo's class strings. The theme reproduces the repo's Tailwind v3 scale in **px**, so repo class names can be pasted verbatim and render at identical sizes. An Expo app `apps/native-catalog` renders every atom on a device for visual parity checks against the web app.

**Tech Stack:** Expo SDK 56 (React Native 0.85.3, React 19.2.3, New Architecture), NativeWind `5.0.0-preview.4` + `react-native-css` 3.0.7 + Tailwind CSS 4.3.3, `@rn-primitives/*` 1.5.x, `class-variance-authority`, `tailwind-merge` 3, `lucide-react-native` 1.x, Reanimated 4.3.1, `date-fns` 3, Jest 29 + `jest-expo` 56 + React Native Testing Library 14.

**Project root:** `D:\Aumraa\APOS pitch\1_Product Factory\02_Breathe Design system`
**Visual reference (read-only):** `D:\Aumraa\APOS pitch\1_Product Factory\03_Lemniscate\Dev\April version` — `src/index.css`, `tailwind.config.ts`, `src/design-system/ui/*.tsx` at commit `ecf73f7`.

---

## 0. Read this first

### 0.1 Decisions (locked with product owner, 2026-09-11)

| # | Decision |
|---|---|
| D1 | The Leminiscate repo is the design reference. Recreate, don't redesign. Flat style, same tokens. |
| D2 | Breathe is built first; the mobile app only installs and consumes the package. **All** atoms are built (including ones the web app does not use today). |
| D3 | NativeWind v5 (preview) with Tailwind v4 CSS-first config. |
| D4 | `react-native-reusables` (rnr) is the scaffolding source (copy-in code, not a runtime dependency). Registry: `github.com/founded-labs/react-native-reusables/tree/main/packages/registry/src/nativewind`. |
| D5 | Calendar = custom month grid (matches web look), not the OS date picker. *(Default — confirm with product owner.)* |
| D6 | Brand gradient = exactly what renders on web today: `.bg-gradient-brand` utility = `linear-gradient(135deg, #3cb6d7 0%, #2262ec 100%)`. The unused `--gradient-brand` var (sky→brand-blue 138°) is **not** used. *(Default — confirm with product owner.)* |

### 0.2 Pinned versions (Expo SDK 56 `bundledNativeModules.json`)

| Package | Version | Package | Version |
|---|---|---|---|
| expo | ~56.0.21 | react / react-native | 19.2.3 / 0.85.3 |
| nativewind | 5.0.0-preview.4 | react-native-css | 3.0.7 |
| tailwindcss / @tailwindcss/postcss | 4.3.3 | lightningcss (override) | 1.30.1 |
| react-native-reanimated / worklets | 4.3.1 / 0.8.3 | react-native-svg | 15.15.4 |
| react-native-screens | ~4.26.0 | react-native-safe-area-context | ~5.7.0 |
| @react-native-community/slider | 5.2.0 | expo-font | ~56.0.7 |
| @rn-primitives/* | 1.5.2 (portal 1.5.3) | lucide-react-native | ^1.45.0 |
| jest / jest-expo | ^29.7.0 / ~56.0.5 | @testing-library/react-native | ^14.0.1 |
| test-renderer | ~1.2.0 | @react-native/jest-preset | 0.85.3 |
| babel-preset-expo | ~56.0.20 | typescript | ~6.0.3 |

**Node:** RNTL 14 requires Node `^22.13.0 || >=24`. CI moves from Node 20 to 22 (Task 1).

### 0.3 Known platform facts this plan is built around (researched 2026-09-11)

1. **rem is fixed at 14px in NativeWind v5** — `inlineRem: 16` is ignored (nativewind#1655, closed *wontfix*). The web uses 16px. ⇒ The theme defines every size in **px**; `styles/lemniscate.css` must never contain `rem` (enforced by test).
2. **Tailwind v4 renamed/re-valued utilities** (`shadow-sm`, `rounded-sm`, bare `rounded`/`shadow`, default palette in OKLCH, `border` defaults to `currentColor`). ⇒ The theme redefines radius, shadow, font-size, container, breakpoint and palette values with the repo's **Tailwind v3** values, so repo class names keep repo values.
3. **No `placeholder:` variant in v5** (nativewind#1755). ⇒ `placeholderTextColor` comes from `useThemeColors()`.
4. **Pseudo-classes on children inside a `Pressable` swallow presses** (react-native-css#262 / nativewind#1583). ⇒ Only the `Pressable` itself may use `active:`; children read pressed state via the render-prop.
5. **RN 0.85 draws CSS gradients natively**: `style={{ experimental_backgroundImage: 'linear-gradient(135deg, …)' }}` (typed in `StyleSheetTypes.d.ts`). Never put it on a Reanimated-animated view (reanimated#8297) — use an inner static layer.
6. **RN 0.85 has real outline props** (`outlineWidth/Color/Style/Offset`, New Arch) ⇒ web focus rings (`ring-2 ring-offset-2`) are reproduced exactly on text inputs.
7. **`filter: brightness()` works on iOS+Android**, but we use a 6% black overlay for the gradient pressed state (no reliance on react-native-css filter parsing).
8. **`@rn-primitives/slider` has no native gesture handling** ⇒ Slider uses `@react-native-community/slider`.
9. **RNTL 14**: `render`, `fireEvent`, `act` are **async** (`await`). Matchers auto-register on import. Uses `test-renderer`, not `react-test-renderer`.
10. **Expo font weights on Android**: `expo-font` config plugin `android.fonts[].fontDefinitions[{path, weight}]` makes `fontFamily: 'Inter'` + `fontWeight` work ⇒ `font-medium/semibold/bold` classes need no mapping. Requires a **development build** (not Expo Go).

### 0.4 Web → Native translation rules (apply to every atom)

| # | Web (repo) | Native (Breathe) |
|---|---|---|
| R1 | Any class | Paste verbatim; the theme guarantees identical values. |
| R2 | `bg-[var(--color-primary-500)]` etc. | `bg-primary-500` (scales registered as named colours with the same names). |
| R3 | `rem` inside arbitrary values (`min-w-[8rem]`, `text-[0.8rem]`) | px (`min-w-[128px]`, `text-[12.8px]`). |
| R4 | bare `rounded` / bare `shadow` | Forbidden (v4 meaning differs). Use explicit `rounded-[4px]` / `shadow-sm`. |
| R5 | `hover:x` when an `active:` style exists | Drop. |
| R6 | `hover:x` / `focus:x` highlight with no `active:` (menu items, toggles) | Becomes `active:x` (touch feedback). |
| R7 | `focus-visible:ring-*` on text inputs | `useFocusRing()` → `outlineWidth: 2, outlineOffset: 2, outlineColor: ring`. On non-text controls: drop (keyboard-only on web). |
| R8 | `disabled:x`, `data-[state=checked]:x`, `aria-selected:x` | Conditional classes from props (`disabled && 'x'`). |
| R9 | `[&_svg]:size-N` | `IconSizeContext` value (px). |
| R10 | Text classes (`text-sm`, `font-medium`, `text-white`) on a container | `TextClassContext` value; never on a `View`. |
| R11 | `border` with no colour (relied on web `* { border-color }`) | Add `border-border` explicitly (RN default is black). |
| R12 | `space-x-*` / `space-y-*` | `gap-*`. |
| R13 | Opacity modifier on a theme colour (`bg-accent/50`) | Avoid. Use element `opacity-*` or explicit `rgba()`. |
| R14 | `transition-*`, `duration-*` | Drop, unless motion is the component's point (Switch, Progress, Skeleton, Spinner) → Reanimated with the same duration/easing. |
| R15 | `animate-spin` / `animate-pulse` | `<Spinner/>` / `<Skeleton/>`. |
| R16 | `bg-gradient-brand` | `<Gradient/>` layer. |
| R17 | `ring-offset-*`, `outline-none`, `cursor-*`, `select-none`, `pointer-events-none`, `whitespace-nowrap`, `file:*`, `peer-*` | Drop (`whitespace-nowrap` → `numberOfLines={1}` where text can wrap). |
| R18 | `inline-flex` | `flex-row` (+ `self-start` when the web element was inline and must not stretch). |
| R19 | Default Tailwind palette (`bg-red-50`) | Only families defined in the theme with v3 hex (slate, gray, red, orange, amber, green, emerald, cyan, blue, purple). Add a family's v3 hex before using it. |
| R20 | `asChild` on Button for links | RN idiom is the reverse: `<Link href="…" asChild><Button/></Link>`. Button has no `asChild`. |

### 0.5 Accepted parity differences (the only places native ≠ web)

| Atom | Difference | Why |
|---|---|---|
| Button | `hover:*` gone; gradient press = 6% black overlay instead of `brightness(0.94)` | Touch has no hover; overlay is deterministic. |
| Input | `type="date"` not supported → use Calendar (inside a popover/sheet molecule) | No native date text field. |
| Label | `htmlFor` → pass `onPress={() => ref.current?.focus()}` | RN has no `for` association. |
| Select | `value`/`onValueChange` use `{ value, label }` objects (rn-primitives `Option`), not strings | Native closed Select must know the label without rendering items. |
| Select | Scroll up/down buttons not exported | Web-only in rnr; native list scrolls. |
| Select | `<SelectItem value="monthly" label="Monthly" />`, not `<SelectItem value="monthly">Monthly</SelectItem>` | rn-primitives renders the item text from `label`. |
| Select | No 4px gap between trigger and list (web `data-[side=bottom]:translate-y-1`) | rn-primitives positions the content; not verified to take an offset. |
| InputOTP | Caret is static | The repo's `animate-caret-blink` has no keyframes in `tailwind.config.ts`, so it doesn't blink on web either. Static is the faithful port. |
| Slider | Thumb is the OS thumb (tinted), not a 20px white disc with 2px primary border | Native control (Fact 8). |
| Calendar | Single-date mode only | Repo only uses `mode="single"`. |
| All | Focus rings only on text inputs | Keyboard focus rings are web-only. |

### 0.6 File structure (created by this plan)

```
pnpm-workspace.yaml                         (modify: add apps/*)
package.json                                (modify: lightningcss override)
vitest.config.ts                            (modify: exclude RN code)
.github/workflows/ci.yml                    (modify: Node 22 + RN job)
packages/react-native/
  package.json  tsconfig.json  babel.config.js  jest.config.js  jest.setup.ts  nativewind-env.d.ts  README.md
  styles/lemniscate.css                     theme: tokens, px scale, palette, dark mode, @source
  src/index.ts                              public exports
  src/lib/utils.ts                          cn()
  src/lib/theme.ts                          THEME + useThemeColors() (JS mirror for non-className props)
  src/lib/use-focus-ring.ts                 focus outline for text inputs
  src/lib/native-only-animated-view.tsx     (from rnr, used by Select)
  src/atoms/text.tsx  icon.tsx  gradient.tsx  spinner.tsx
  src/atoms/button.tsx  badge.tsx  label.tsx  separator.tsx  skeleton.tsx  progress.tsx  avatar.tsx
  src/atoms/form-elements/input.tsx  textarea.tsx  checkbox.tsx  radio-group.tsx  switch.tsx
  src/atoms/form-elements/toggle.tsx  toggle-group.tsx  slider.tsx  select.tsx  input-otp.tsx  calendar.tsx
  test/**/*.test.ts(x)                      one file per unit
apps/native-catalog/                        Expo app: one section per atom
  App.tsx  global.css  metro.config.js  postcss.config.mjs  nativewind-env.d.ts  app.json  package.json
  components/Section.tsx
  sections/index.ts  sections/<Atom>Section.tsx
```

The folder split `atoms/` vs `atoms/form-elements/` mirrors `packages/react/src` so web and native stay navigable side by side.

### 0.7 Tracker (update the Status column as tasks land)

| Task | Unit | Size | Status |
|---|---|---|---|
| 1 | Workspace + CI | S | ☐ |
| 2 | Package skeleton + `cn` | S | ☐ |
| 3 | Theme stylesheet | M | ☐ |
| 4 | THEME JS mirror | S | ☐ |
| 5 | Catalog app + device spike | M | ☐ |
| 6 | Text | S | ☐ |
| 7 | Icon | S | ☐ |
| 8 | Gradient | S | ☐ |
| 9 | Spinner | S | ☐ |
| 10 | Button | L | ☐ |
| 11 | Label | S | ☐ |
| 12 | Badge | S | ☐ |
| 13 | Separator | S | ☐ |
| 14 | Skeleton | S | ☐ |
| 15 | Progress | M | ☐ |
| 16 | Avatar | S | ☐ |
| 17 | Input + focus ring | M | ☐ |
| 18 | Textarea | S | ☐ |
| 19 | Checkbox | S | ☐ |
| 20 | RadioGroup | S | ☐ |
| 21 | Switch | M | ☐ |
| 22 | Toggle | S | ☐ |
| 23 | ToggleGroup | S | ☐ |
| 24 | Slider | S | ☐ |
| 25 | Select | L | ☐ |
| 26 | InputOTP | M | ☐ |
| 27 | Calendar | L | ☐ |
| 28 | Exports, README, pack | S | ☐ |

**Testing convention (all tasks):** Tests live in `packages/react-native/test/`, mirror `src/` paths, and assert (a) the variant functions return the repo's classes (parity), (b) behaviour (press, disabled, value changes). In Jest, NativeWind's import rewrite does not run, so `className` is a plain prop on host components — assert it with `el.props.className`. All RNTL calls are awaited.

**Run tests:** `pnpm --filter @aumraa/breathe-native test` (from project root).

---

## Phase 0 — Workspace, package, theme, catalog

### Task 1: Workspace and CI wiring

**Files:**
- Modify: `pnpm-workspace.yaml`
- Modify: `package.json` (root, `pnpm.overrides`)
- Modify: `vitest.config.ts`
- Modify: `.github/workflows/ci.yml`

- [ ] **Step 1: Branch.** The working tree has uncommitted Kaayo work (5 modified, 2 untracked files under `packages/react/src/kaayo/`). Ask its owner to commit or stash it — do not stash it yourself. Then:

```bash
git checkout -b feat/breathe-native
corepack enable && pnpm -v
```
Expected: pnpm `10.x`.

- [ ] **Step 2: Add `apps/*` to the workspace** — replace `pnpm-workspace.yaml` with:

```yaml
packages:
  - '.'
  - 'packages/*'
  - 'apps/*'
```

(pnpm's default isolated linker stays on — Expo SDK 54+ supports it, and the root docs site uses React 18 while the RN packages use React 19, so hoisting would collide.)

- [ ] **Step 3: Pin lightningcss** (required by NativeWind v5) — in root `package.json`, change the `pnpm` block to:

```json
  "pnpm": {
    "overrides": {
      "vite": "6.3.5",
      "lightningcss": "1.30.1"
    }
  }
```

- [ ] **Step 4: Keep vitest away from RN code** — replace `vitest.config.ts` with:

```ts
import { configDefaults, defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
    css: false,
    // packages/react-native and apps/* are tested with jest-expo, not vitest
    exclude: [...configDefaults.exclude, 'packages/react-native/**', 'apps/**'],
  },
  resolve: {
    alias: {
      '@/app/components/atoms': resolve(__dirname, './packages/react/src/atoms'),
      '@/app/components/molecules': resolve(__dirname, './packages/react/src/molecules'),
      '@/app/components/organisms': resolve(__dirname, './packages/react/src/organisms'),
      '@/app/components/templates': resolve(__dirname, './packages/react/src/templates'),
      '@/app/components/custom/kaayo': resolve(__dirname, './packages/react/src/kaayo'),
      '@': resolve(__dirname, './src'),
    },
  },
})
```

- [ ] **Step 5: CI** — in `.github/workflows/ci.yml` change `node-version: 20` to `node-version: 22` and append after the `Build` step:

```yaml
      - name: Native — type check
        run: pnpm --filter @aumraa/breathe-native typecheck

      - name: Native — test
        run: pnpm --filter @aumraa/breathe-native test
```

- [ ] **Step 6: Verify the web side is untouched**

Run: `pnpm install && pnpm test && pnpm build`
Expected: existing vitest suite PASS, docs build succeeds.

- [ ] **Step 7: Commit**

```bash
git add pnpm-workspace.yaml package.json pnpm-lock.yaml vitest.config.ts .github/workflows/ci.yml
git commit -m "chore(native): add apps workspace, lightningcss pin, Node 22 CI"
```

(The two `Native —` CI steps fail until Task 2 lands; land Tasks 1–2 in the same PR.)

---

### Task 2: Package skeleton and `cn()`

**Files:**
- Create: `packages/react-native/package.json`, `tsconfig.json`, `babel.config.js`, `jest.config.js`, `jest.setup.ts`, `nativewind-env.d.ts`, `.gitignore`
- Create: `packages/react-native/src/lib/utils.ts`, `packages/react-native/src/index.ts`
- Test: `packages/react-native/test/lib/utils.test.ts`

- [ ] **Step 1: `packages/react-native/package.json`**

```json
{
  "name": "@aumraa/breathe-native",
  "version": "0.1.0",
  "description": "Breathe design system — React Native components (NativeWind v5) for the Aumraa product family",
  "license": "UNLICENSED",
  "main": "src/index.ts",
  "types": "src/index.ts",
  "react-native": "src/index.ts",
  "exports": {
    ".": { "types": "./src/index.ts", "default": "./src/index.ts" },
    "./styles/*": "./styles/*",
    "./package.json": "./package.json"
  },
  "files": ["src", "styles", "README.md"],
  "sideEffects": ["**/*.css"],
  "scripts": {
    "test": "jest",
    "typecheck": "tsc --noEmit"
  },
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  },
  "peerDependencies": {
    "@react-native-community/slider": ">=5.2.0",
    "@rn-primitives/portal": "^1.5.3",
    "lucide-react-native": "^1.16.0",
    "nativewind": "5.0.0-preview.4",
    "react": ">=19.2.0",
    "react-native": ">=0.85.0",
    "react-native-reanimated": ">=4.3.1",
    "react-native-screens": ">=4.26.0",
    "react-native-svg": ">=15.15.4"
  },
  "dependencies": {
    "@rn-primitives/avatar": "1.5.2",
    "@rn-primitives/checkbox": "1.5.2",
    "@rn-primitives/label": "1.5.2",
    "@rn-primitives/progress": "1.5.2",
    "@rn-primitives/radio-group": "1.5.2",
    "@rn-primitives/select": "1.5.2",
    "@rn-primitives/separator": "1.5.2",
    "@rn-primitives/slot": "1.5.2",
    "@rn-primitives/switch": "1.5.2",
    "@rn-primitives/toggle": "1.5.2",
    "@rn-primitives/toggle-group": "1.5.2",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^3.6.0",
    "tailwind-merge": "^3.6.0"
  },
  "devDependencies": {
    "@react-native-community/slider": "5.2.0",
    "@react-native/jest-preset": "0.85.3",
    "@rn-primitives/portal": "1.5.3",
    "@testing-library/react-native": "^14.0.1",
    "@types/jest": "29.5.14",
    "@types/react": "~19.2.14",
    "babel-preset-expo": "~56.0.20",
    "expo": "~56.0.21",
    "jest": "^29.7.0",
    "jest-expo": "~56.0.5",
    "lucide-react-native": "^1.45.0",
    "nativewind": "5.0.0-preview.4",
    "react": "19.2.3",
    "react-native": "0.85.3",
    "react-native-css": "3.0.7",
    "react-native-reanimated": "4.3.1",
    "react-native-screens": "~4.26.0",
    "react-native-svg": "15.15.4",
    "react-native-worklets": "0.8.3",
    "test-renderer": "~1.2.0",
    "typescript": "~6.0.3"
  }
}
```

Why these are peers: `@rn-primitives/portal` must be the single instance the app renders `<PortalHost/>` from; the native modules must be installed by the app. Dev versions equal the catalog's versions exactly so pnpm links one copy of `react`/`react-native` (duplicates cause "Invalid hook call").

- [ ] **Step 2: Config files**

`packages/react-native/tsconfig.json`
```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "noEmit": true,
    "types": ["jest"]
  },
  "include": ["src", "test", "nativewind-env.d.ts", "jest.setup.ts"]
}
```

`packages/react-native/nativewind-env.d.ts`
```ts
/// <reference types="react-native-css/types" />
```

`packages/react-native/babel.config.js` (Jest only — consuming apps use their own)
```js
module.exports = { presets: ['babel-preset-expo'] };
```

`packages/react-native/jest.config.js`
```js
module.exports = {
  preset: 'jest-expo',
  resolver: 'react-native-reanimated/jest/resolver',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['<rootDir>/test/**/*.test.ts?(x)'],
  transformIgnorePatterns: [
    'node_modules/(?!(?:.pnpm/)?((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@rn-primitives/.*|lucide-react-native|nativewind|react-native-css))',
  ],
};
```

`packages/react-native/jest.setup.ts`
```ts
jest.mock('react-native-worklets', () => require('react-native-worklets/src/mock'));
require('react-native-reanimated').setUpTests();

// NativeWind v5 rewrites imports in Metro only. In Jest `className` is a plain prop,
// so `styled()` can be the identity.
jest.mock('nativewind', () => ({ styled: (Component: unknown) => Component }));

// Every lucide icon renders as a View tagged `icon-<Name>` so tests can find it.
jest.mock('lucide-react-native', () => {
  const mockReact = require('react');
  const { View: MockView } = require('react-native');
  return new Proxy(
    { __esModule: true },
    {
      get: (target: Record<string | symbol, unknown>, name: string | symbol) =>
        name in target
          ? target[name]
          : (props: object) =>
              mockReact.createElement(MockView, { testID: `icon-${String(name)}`, ...props }),
    },
  );
});
```

`packages/react-native/.gitignore`
```
node_modules/
```

- [ ] **Step 3: Write the failing test** — `packages/react-native/test/lib/utils.test.ts`

```ts
import { cn } from '../../src/lib/utils';

describe('cn', () => {
  it('keeps the last of two conflicting utilities', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });

  it('treats font size and text colour as different groups', () => {
    expect(cn('text-sm', 'text-white')).toBe('text-sm text-white');
  });

  it('recognises the custom 2xs font size', () => {
    expect(cn('text-2xs', 'text-xs')).toBe('text-xs');
  });

  it('drops falsy values', () => {
    expect(cn('a', false, undefined, null, 'b')).toBe('a b');
  });
});
```

- [ ] **Step 4: Install and run — expect FAIL**

Run: `pnpm install && pnpm --filter @aumraa/breathe-native test`
Expected: FAIL — `Cannot find module '../../src/lib/utils'`.

- [ ] **Step 5: Implement**

`packages/react-native/src/lib/utils.ts`
```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

`packages/react-native/src/index.ts`
```ts
export * from './lib/utils';
```

- [ ] **Step 6: Run — expect PASS**

Run: `pnpm --filter @aumraa/breathe-native test && pnpm --filter @aumraa/breathe-native typecheck`
Expected: 4 passed; tsc exits 0.

If Jest fails to transform a package with `SyntaxError: Cannot use import statement outside a module`, add that package's name to the `transformIgnorePatterns` alternation in `jest.config.js` and re-run.

- [ ] **Step 7: Commit**

```bash
git add packages/react-native pnpm-lock.yaml
git commit -m "feat(native): scaffold @aumraa/breathe-native with jest-expo and cn()"
```

---

### Task 3: Theme stylesheet (foundations)

**Files:**
- Create: `packages/react-native/styles/lemniscate.css`
- Test: `packages/react-native/test/styles.test.ts`

Values come from the repo's `src/index.css` (HSL converted to the hex the browser renders) and `tailwind.config.ts`; scales Tailwind v3 would have supplied are written out in px.

- [ ] **Step 1: Write the failing test** — `packages/react-native/test/styles.test.ts`

```ts
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
```

- [ ] **Step 2: Run — expect FAIL**

Run: `pnpm --filter @aumraa/breathe-native test test/styles.test.ts`
Expected: FAIL — `ENOENT … styles/lemniscate.css`.

- [ ] **Step 3: Create `packages/react-native/styles/lemniscate.css`**

```css
/* Breathe Native: Leminiscate theme (NativeWind v5 / Tailwind v4).
   Import once, after Tailwind and nativewind/theme, in the app's global.css:
     @import "@aumraa/breathe-native/styles/lemniscate.css";
   Source of truth: Leminiscate web repo src/index.css and tailwind.config.ts (commit ecf73f7).
   Every size is px: NativeWind v5 inlines rem as 14px, the web uses 16px. */

@source "../src";

:root {
  --background: #ffffff;
  --background-secondary: #f2f2f3;
  --background-tertiary: #e2e4e4;
  --foreground: #191b1f;
  --foreground-secondary: #424448;
  --foreground-tertiary: #5f6063;
  --card: #ffffff;
  --card-foreground: #1f2937;
  --popover: #ffffff;
  --popover-foreground: #1f2937;
  --primary: #1b60c0;
  --primary-foreground: #ffffff;
  --secondary: #f2f2f3;
  --secondary-foreground: #191b1f;
  --muted: #f2f2f3;
  --muted-foreground: #424448;
  --accent: #40aad4;
  --accent-foreground: #ffffff;
  --destructive: #dc2828;
  --destructive-foreground: #ffffff;
  --success: #16a249;
  --success-light: #e1f5e8;
  --success-dark: #18773c;
  --warning: #f59f0a;
  --warning-light: #fdf3e3;
  --warning-dark: #b07911;
  --danger: #dc2828;
  --danger-light: #fae5e5;
  --danger-dark: #9f2323;
  --info: #40aad4;
  --info-light: #ebf7f9;
  --info-dark: #347d98;
  --border: #d6d6d7;
  --input: #d6d6d7;
  --ring: #1b60c0;
  --sidebar-background: #ffffff;
  --sidebar-foreground: #1f2937;
  --sidebar-primary: #1b60c0;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #f2f2f3;
  --sidebar-accent-foreground: #191b1f;
  --sidebar-border: #d6d6d7;
  --sidebar-ring: #1b60c0;
  --gradient-start: #40aad4;
  --gradient-end: #1b60c0;
}

/* Web toggles a .dark class; native follows Appearance (system or Appearance.setColorScheme). */
@media (prefers-color-scheme: dark) {
  :root {
    --background: #121821;
    --background-secondary: #171d26;
    --background-tertiary: #1c222c;
    --foreground: #f8fafc;
    --foreground-secondary: #98a4b3;
    --foreground-tertiary: #738296;
    --card: #171d26;
    --card-foreground: #f8fafc;
    --popover: #171d26;
    --popover-foreground: #f8fafc;
    --primary: #3cb6d7;
    --primary-foreground: #121821;
    --secondary: #242c38;
    --secondary-foreground: #f8fafc;
    --muted: #242c38;
    --muted-foreground: #98a4b3;
    --accent: #2262ec;
    --accent-foreground: #ffffff;
    --border: #2c3644;
    --input: #2c3644;
    --ring: #3cb6d7;
    --sidebar-background: #121821;
    --sidebar-foreground: #f8fafc;
    --sidebar-primary: #3cb6d7;
    --sidebar-primary-foreground: #121821;
    --sidebar-accent: #242c38;
    --sidebar-accent-foreground: #f8fafc;
    --sidebar-border: #2c3644;
  }
}

@theme inline {
  /* Semantic colours (tailwind.config.ts extend.colors) */
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-background: var(--background);
  --color-background-secondary: var(--background-secondary);
  --color-background-tertiary: var(--background-tertiary);
  --color-foreground: var(--foreground);
  --color-foreground-secondary: var(--foreground-secondary);
  --color-foreground-tertiary: var(--foreground-tertiary);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-sidebar: var(--sidebar-background);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-success: var(--success);
  --color-success-light: var(--success-light);
  --color-success-dark: var(--success-dark);
  --color-warning: var(--warning);
  --color-warning-light: var(--warning-light);
  --color-warning-dark: var(--warning-dark);
  --color-danger: var(--danger);
  --color-danger-light: var(--danger-light);
  --color-danger-dark: var(--danger-dark);
  --color-info: var(--info);
  --color-info-light: var(--info-light);
  --color-info-dark: var(--info-dark);
  --color-gradient-start: var(--gradient-start);
  --color-gradient-end: var(--gradient-end);

  /* Foundation scales (repo index.css), same names as the repo CSS variables */
  --color-primary-25: #e4ecf8;
  --color-primary-50: #d2dff3;
  --color-primary-500: #1c60c1;
  --color-primary-600: #1c55a7;
  --color-primary-700: #1b3f73;
  --color-primary-975: #192332;
  --color-secondary-25: #e8f5fa;
  --color-secondary-50: #d9eef6;
  --color-secondary-500: #40aad4;
  --color-secondary-600: #3a93b7;
  --color-secondary-700: #347c9a;
  --color-secondary-975: #1e2c35;
  --color-positive-25: #e3f4e9;
  --color-positive-50: #d0eddc;
  --color-positive-500: #16a34a;
  --color-positive-600: #168d43;
  --color-positive-700: #17773c;
  --color-positive-975: #192b24;
  --color-alert-25: #fef3e2;
  --color-alert-50: #fdeccd;
  --color-alert-500: #f59e0b;
  --color-alert-600: #d2890e;
  --color-alert-700: #af7411;
  --color-alert-975: #332b1d;
  --color-negative-25: #fbe5e5;
  --color-negative-50: #f8d4d4;
  --color-negative-500: #dc2626;
  --color-negative-600: #bd2425;
  --color-negative-700: #9e2224;
  --color-negative-975: #301c20;
  --color-neutral-white-25: #ffffff;
  --color-neutral-white-50: #f1f1f2;
  --color-neutral-white-75: #e3e4e4;
  --color-neutral-white-100: #d6d6d7;
  --color-neutral-white-200: #c8c8c9;
  --color-neutral-white-300: #babbbc;
  --color-neutral-white-400: #acadae;
  --color-neutral-white-500: #9ea0a1;
  --color-neutral-black-25: #dadbdb;
  --color-neutral-black-500: #7a7b7d;
  --color-neutral-black-700: #5e5f62;
  --color-neutral-black-900: #424447;
  --color-neutral-black-975: #191b1f;

  /* Tailwind v3 default palette (hex) for the families the repo uses. Tailwind v4 ships OKLCH. */
  --color-slate-50: #f8fafc; --color-slate-100: #f1f5f9; --color-slate-200: #e2e8f0; --color-slate-300: #cbd5e1; --color-slate-400: #94a3b8; --color-slate-500: #64748b; --color-slate-600: #475569; --color-slate-700: #334155; --color-slate-800: #1e293b; --color-slate-900: #0f172a; --color-slate-950: #020617;
  --color-gray-50: #f9fafb; --color-gray-100: #f3f4f6; --color-gray-200: #e5e7eb; --color-gray-300: #d1d5db; --color-gray-400: #9ca3af; --color-gray-500: #6b7280; --color-gray-600: #4b5563; --color-gray-700: #374151; --color-gray-800: #1f2937; --color-gray-900: #111827; --color-gray-950: #030712;
  --color-red-50: #fef2f2; --color-red-100: #fee2e2; --color-red-200: #fecaca; --color-red-300: #fca5a5; --color-red-400: #f87171; --color-red-500: #ef4444; --color-red-600: #dc2626; --color-red-700: #b91c1c; --color-red-800: #991b1b; --color-red-900: #7f1d1d; --color-red-950: #450a0a;
  --color-orange-50: #fff7ed; --color-orange-100: #ffedd5; --color-orange-200: #fed7aa; --color-orange-300: #fdba74; --color-orange-400: #fb923c; --color-orange-500: #f97316; --color-orange-600: #ea580c; --color-orange-700: #c2410c; --color-orange-800: #9a3412; --color-orange-900: #7c2d12; --color-orange-950: #431407;
  --color-amber-50: #fffbeb; --color-amber-100: #fef3c7; --color-amber-200: #fde68a; --color-amber-300: #fcd34d; --color-amber-400: #fbbf24; --color-amber-500: #f59e0b; --color-amber-600: #d97706; --color-amber-700: #b45309; --color-amber-800: #92400e; --color-amber-900: #78350f; --color-amber-950: #451a03;
  --color-green-50: #f0fdf4; --color-green-100: #dcfce7; --color-green-200: #bbf7d0; --color-green-300: #86efac; --color-green-400: #4ade80; --color-green-500: #22c55e; --color-green-600: #16a34a; --color-green-700: #15803d; --color-green-800: #166534; --color-green-900: #14532d; --color-green-950: #052e16;
  --color-emerald-50: #ecfdf5; --color-emerald-100: #d1fae5; --color-emerald-200: #a7f3d0; --color-emerald-300: #6ee7b7; --color-emerald-400: #34d399; --color-emerald-500: #10b981; --color-emerald-600: #059669; --color-emerald-700: #047857; --color-emerald-800: #065f46; --color-emerald-900: #064e3b; --color-emerald-950: #022c22;
  --color-cyan-50: #ecfeff; --color-cyan-100: #cffafe; --color-cyan-200: #a5f3fc; --color-cyan-300: #67e8f9; --color-cyan-400: #22d3ee; --color-cyan-500: #06b6d4; --color-cyan-600: #0891b2; --color-cyan-700: #0e7490; --color-cyan-800: #155e75; --color-cyan-900: #164e63; --color-cyan-950: #083344;
  --color-blue-50: #eff6ff; --color-blue-100: #dbeafe; --color-blue-200: #bfdbfe; --color-blue-300: #93c5fd; --color-blue-400: #60a5fa; --color-blue-500: #3b82f6; --color-blue-600: #2563eb; --color-blue-700: #1d4ed8; --color-blue-800: #1e40af; --color-blue-900: #1e3a8a; --color-blue-950: #172554;
  --color-purple-50: #faf5ff; --color-purple-100: #f3e8ff; --color-purple-200: #e9d5ff; --color-purple-300: #d8b4fe; --color-purple-400: #c084fc; --color-purple-500: #a855f7; --color-purple-600: #9333ea; --color-purple-700: #7e22ce; --color-purple-800: #6b21a8; --color-purple-900: #581c87; --color-purple-950: #3b0764;

  /* Typography: Inter weights are registered by the app's expo-font plugin */
  --font-sans: Inter;
  --text-2xs: 10px;
  --text-xs: 12px;
  --text-xs--line-height: 16px;
  --text-sm: 14px;
  --text-sm--line-height: 20px;
  --text-base: 16px;
  --text-base--line-height: 24px;
  --text-lg: 18px;
  --text-lg--line-height: 28px;
  --text-xl: 20px;
  --text-xl--line-height: 28px;
  --text-2xl: 24px;
  --text-2xl--line-height: 32px;
  --text-3xl: 30px;
  --text-3xl--line-height: 36px;
  --text-4xl: 36px;
  --text-4xl--line-height: 40px;
  --text-5xl: 48px;
  --text-5xl--line-height: 48px;
  --text-6xl: 60px;
  --text-6xl--line-height: 60px;

  /* Spacing: Tailwind v3 4px step */
  --spacing: 4px;

  /* Radius: repo overrides sm/md/lg from --radius 12px; the rest are v3 defaults */
  --radius-sm: 8px;
  --radius-md: 10px;
  --radius-lg: 12px;
  --radius-xl: 12px;
  --radius-2xl: 16px;
  --radius-3xl: 24px;

  /* Shadows: Tailwind v3 values plus the repo's custom shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-brand: 0 2px 8px rgba(43, 123, 197, 0.2);

  /* Breakpoints (repo tailwind.config.ts screens) */
  --breakpoint-xs: 480px;
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1400px;

  /* max-w-* (Tailwind v3 values) */
  --container-xs: 320px;
  --container-sm: 384px;
  --container-md: 448px;
  --container-lg: 512px;
  --container-xl: 576px;
  --container-2xl: 672px;
  --container-3xl: 768px;
  --container-4xl: 896px;
  --container-5xl: 1024px;
  --container-6xl: 1152px;
  --container-7xl: 1280px;
}
```

- [ ] **Step 4: Run — expect PASS**

Run: `pnpm --filter @aumraa/breathe-native test test/styles.test.ts`
Expected: all cases pass (≈120 `it.each` rows).

- [ ] **Step 5: Commit**

```bash
git add packages/react-native/styles packages/react-native/test/styles.test.ts
git commit -m "feat(native): Leminiscate theme stylesheet with px scale and repo tokens"
```

---

### Task 4: THEME JS mirror

Some native props cannot take a `className` (`placeholderTextColor`, `outlineColor`, native Slider tints). They read colours from this mirror; a test keeps it equal to the stylesheet.

**Files:**
- Create: `packages/react-native/src/lib/theme.ts`
- Modify: `packages/react-native/src/index.ts`
- Test: `packages/react-native/test/lib/theme.test.ts`

- [ ] **Step 1: Write the failing test** — `packages/react-native/test/lib/theme.test.ts`

```ts
import { readFileSync } from 'fs';
import path from 'path';
import { THEME } from '../../src/lib/theme';
import { block, vars } from '../styles.test';

const css = readFileSync(path.join(__dirname, '../../styles/lemniscate.css'), 'utf8');
const kebab = (key: string) => key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

describe('THEME mirrors lemniscate.css', () => {
  const light = vars(block(css, ':root'));
  const dark = vars(block(css, '@media (prefers-color-scheme: dark)'));

  it.each(Object.entries(THEME.light))('light %s', (key, value) => {
    expect(value).toBe(light[kebab(key)]);
  });

  it.each(Object.entries(THEME.dark))('dark %s', (key, value) => {
    expect(value).toBe(dark[kebab(key)]);
  });
});
```

(Importing `block`/`vars` from `styles.test.ts` also re-runs that file's assertions inside this test file; that is intended and cheap.)

- [ ] **Step 2: Run — expect FAIL**

Run: `pnpm --filter @aumraa/breathe-native test test/lib/theme.test.ts`
Expected: FAIL — `Cannot find module '../../src/lib/theme'`.

- [ ] **Step 3: Implement** — `packages/react-native/src/lib/theme.ts`

```ts
import { useColorScheme } from 'react-native';

/**
 * JS mirror of the runtime colours in styles/lemniscate.css, for native props that
 * cannot take a className. Kept equal to the stylesheet by test/lib/theme.test.ts.
 */
export const THEME = {
  light: {
    background: '#ffffff',
    primary: '#1b60c0',
    secondary: '#f2f2f3',
    mutedForeground: '#424448',
    ring: '#1b60c0',
  },
  dark: {
    background: '#121821',
    primary: '#3cb6d7',
    secondary: '#242c38',
    mutedForeground: '#98a4b3',
    ring: '#3cb6d7',
  },
} as const;

export type ThemeColors = { [K in keyof (typeof THEME)['light']]: string };

export function useThemeColors(): ThemeColors {
  return THEME[useColorScheme() === 'dark' ? 'dark' : 'light'];
}
```

Append to `packages/react-native/src/index.ts`:
```ts
export * from './lib/theme';
```

- [ ] **Step 4: Run — expect PASS**

Run: `pnpm --filter @aumraa/breathe-native test test/lib/theme.test.ts`
Expected: 10 theme rows pass.

- [ ] **Step 5: Commit**

```bash
git add packages/react-native/src packages/react-native/test/lib/theme.test.ts
git commit -m "feat(native): THEME colour mirror for non-className props"
```

---

### Task 5: Catalog app and device spike

The catalog is where every atom is checked on a phone next to the web app. This task also proves the foundations on a device before any component is built.

**Files:**
- Create: `apps/native-catalog/` (Expo template), then modify/create the files below.

- [ ] **Step 1: Scaffold**

```bash
cd apps
pnpm create expo-app@4.0.0 native-catalog --template blank-typescript@sdk-56 --no-install
cd ..
```

- [ ] **Step 2: Dependencies** — in `apps/native-catalog/package.json`, set `"name": "native-catalog"`, `"private": true`, and merge into `dependencies`:

```json
    "@aumraa/breathe-native": "workspace:*",
    "@expo-google-fonts/inter": "^0.4.2",
    "@react-native-community/slider": "5.2.0",
    "@rn-primitives/portal": "1.5.3",
    "expo-font": "~56.0.7",
    "lucide-react-native": "^1.45.0",
    "nativewind": "5.0.0-preview.4",
    "react-native-css": "3.0.7",
    "react-native-reanimated": "4.3.1",
    "react-native-safe-area-context": "~5.7.0",
    "react-native-screens": "~4.26.0",
    "react-native-svg": "15.15.4",
    "react-native-worklets": "0.8.3"
```

and into `devDependencies`:

```json
    "@tailwindcss/postcss": "4.3.3",
    "postcss": "^8.5.6",
    "tailwindcss": "4.3.3"
```

Keep the template's `expo`, `react`, `react-native` versions (they must read `~56.0.21`, `19.2.3`, `0.85.3`; fix them if not). Run `pnpm install` at the project root.

- [ ] **Step 3: NativeWind wiring**

`apps/native-catalog/metro.config.js`
```js
const { getDefaultConfig } = require('expo/metro-config');
const { withNativewind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withNativewind(config);
```

`apps/native-catalog/postcss.config.mjs`
```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

`apps/native-catalog/global.css`
```css
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css";
@import "nativewind/theme";
@import "@aumraa/breathe-native/styles/lemniscate.css";
```

`apps/native-catalog/nativewind-env.d.ts`
```ts
/// <reference types="react-native-css/types" />
```

- [ ] **Step 4: Fonts and dark mode** — in `apps/native-catalog/app.json`, set `"userInterfaceStyle": "automatic"` (the template ships `"light"`, which blocks dark mode) and add to `expo.plugins`:

```json
      [
        "expo-font",
        {
          "android": {
            "fonts": [
              {
                "fontFamily": "Inter",
                "fontDefinitions": [
                  { "path": "./node_modules/@expo-google-fonts/inter/400Regular/Inter_400Regular.ttf", "weight": 400 },
                  { "path": "./node_modules/@expo-google-fonts/inter/500Medium/Inter_500Medium.ttf", "weight": 500 },
                  { "path": "./node_modules/@expo-google-fonts/inter/600SemiBold/Inter_600SemiBold.ttf", "weight": 600 },
                  { "path": "./node_modules/@expo-google-fonts/inter/700Bold/Inter_700Bold.ttf", "weight": 700 }
                ]
              }
            ]
          },
          "ios": {
            "fonts": [
              "./node_modules/@expo-google-fonts/inter/400Regular/Inter_400Regular.ttf",
              "./node_modules/@expo-google-fonts/inter/500Medium/Inter_500Medium.ttf",
              "./node_modules/@expo-google-fonts/inter/600SemiBold/Inter_600SemiBold.ttf",
              "./node_modules/@expo-google-fonts/inter/700Bold/Inter_700Bold.ttf"
            ]
          }
        }
      ]
```

The same block goes into the Leminiscate app's `app.json` (Task 28 README).

- [ ] **Step 5: Catalog shell**

`apps/native-catalog/components/Section.tsx`
```tsx
import type { ReactNode } from 'react';
import { Text, View } from 'react-native';

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View className="gap-3 border-b border-border px-4 py-6">
      <Text className="font-sans text-xs font-semibold uppercase text-foreground-tertiary">{title}</Text>
      {children}
    </View>
  );
}
```

`apps/native-catalog/sections/FoundationsSection.tsx`
```tsx
import { useState } from 'react';
import { Text, View } from 'react-native';
import { Section } from '../components/Section';

// Full class strings, so Tailwind can see them
const SWATCHES = [
  ['bg-background border border-border', 'background'],
  ['bg-background-secondary', 'background-secondary'],
  ['bg-foreground', 'foreground'],
  ['bg-primary', 'primary'],
  ['bg-primary-500', 'primary-500'],
  ['bg-accent', 'accent'],
  ['bg-success', 'success'],
  ['bg-warning', 'warning'],
  ['bg-danger', 'danger'],
  ['bg-neutral-white-100', 'neutral-white-100'],
  ['bg-neutral-black-975', 'neutral-black-975'],
  ['bg-red-50 border border-red-200', 'red-50 (v3)'],
] as const;

const TYPE = [
  ['text-2xs', '2xs 10'], ['text-xs', 'xs 12'], ['text-sm', 'sm 14'], ['text-base', 'base 16'],
  ['text-lg', 'lg 18'], ['text-2xl', '2xl 24'], ['text-4xl', '4xl 36'],
] as const;

const WEIGHTS = [
  ['font-normal', '400'], ['font-medium', '500'], ['font-semibold', '600'], ['font-bold', '700'],
] as const;

export function FoundationsSection() {
  const [probe, setProbe] = useState(0);
  return (
    <Section title="Foundations">
      <View className="flex-row items-center gap-3">
        <View className="h-11 w-11 rounded-lg bg-primary shadow-sm" onLayout={(e) => setProbe(e.nativeEvent.layout.height)} />
        <Text className="font-sans text-sm text-foreground">h-11 measured: {probe}px (expect 44)</Text>
      </View>
      <View className="flex-row flex-wrap gap-2">
        {SWATCHES.map(([cls, name]) => (
          <View key={name} className="items-center gap-1">
            <View className={`h-10 w-16 rounded-md ${cls}`} />
            <Text className="font-sans text-2xs text-foreground-secondary">{name}</Text>
          </View>
        ))}
      </View>
      {TYPE.map(([cls, label]) => (
        <Text key={label} className={`font-sans text-foreground ${cls}`}>Leminiscate {label}</Text>
      ))}
      {WEIGHTS.map(([cls, label]) => (
        <Text key={label} className={`font-sans text-base text-foreground ${cls}`}>Inter {label}</Text>
      ))}
    </Section>
  );
}
```

`apps/native-catalog/sections/index.ts`
```ts
import type { ComponentType } from 'react';
import { FoundationsSection } from './FoundationsSection';

export const sections: { key: string; Component: ComponentType }[] = [
  { key: 'foundations', Component: FoundationsSection },
];
```

`apps/native-catalog/App.tsx` (replace the template file)
```tsx
import './global.css';
import { PortalHost } from '@rn-primitives/portal';
import { StatusBar } from 'expo-status-bar';
import { Appearance, Pressable, ScrollView, Text, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { sections } from './sections';

export default function App() {
  const scheme = useColorScheme();
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-background">
        <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
        <Pressable
          className="m-4 self-start rounded-md border border-border px-3 py-2"
          onPress={() => Appearance.setColorScheme(scheme === 'dark' ? 'light' : 'dark')}>
          <Text className="font-sans text-sm text-foreground">Toggle {scheme === 'dark' ? 'light' : 'dark'}</Text>
        </Pressable>
        <ScrollView>
          {sections.map(({ key, Component }) => (
            <Component key={key} />
          ))}
        </ScrollView>
        <PortalHost />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
```

- [ ] **Step 6: Run on devices (development build — Expo Go does not apply font plugins)**

```bash
cd apps/native-catalog
pnpm expo run:android
pnpm expo run:ios        # macOS only
```

- [ ] **Step 7: Spike checklist** — record each result in the table below before starting Task 6.

| # | Check | Pass criterion | If it fails |
|---|---|---|---|
| S1 | Size probe | Reads **44** | A rem value leaked: search `nativewind/theme` output for the utility; add its v3 px value to `@theme inline`. |
| S2 | Swatches | Match the web app's colours (compare against a web screenshot) | If semantic colours are missing but scales render, `@theme inline` var references are not resolving: replace `@theme inline` for semantic colours with the NativeWind-documented pattern (declare each `--color-*` hex in a `@theme` block **and** in `:root`, dark overrides in the media query). |
| S3 | `red-50 (v3)` swatch | `#fef2f2` with `#fecaca` border | Palette override not applied: confirm `lemniscate.css` is imported **after** `tailwindcss/theme.css`. |
| S4 | Inter weights | 400/500/600/700 visibly differ on **Android** | Run `pnpm expo prebuild --clean` then `run:android` again (config plugins only apply at prebuild). |
| S5 | Dark toggle | Background and text flip | Check `userInterfaceStyle: "automatic"`. |

| # | Android | iOS | Notes |
|---|---|---|---|
| S1 | ☐ | ☐ | |
| S2 | ☐ | ☐ | |
| S3 | ☐ | ☐ | |
| S4 | ☐ | ☐ | |
| S5 | ☐ | ☐ | |

- [ ] **Step 8: Commit**

```bash
git add apps/native-catalog pnpm-lock.yaml
git commit -m "feat(native): Expo catalog app with foundations spike"
```

---

## Phase 1 — Foundation atoms (needed by every other atom)

### Task 6: Text

Web has no Text component (text inherits from `body`: Inter, 16px/24px, `text-foreground`). RN text does not inherit, so every string renders through `Text`, which applies those body defaults and merges the parent's `TextClassContext` (R10).

**Files:**
- Create: `packages/react-native/src/atoms/text.tsx`
- Modify: `packages/react-native/src/index.ts`
- Test: `packages/react-native/test/atoms/text.test.tsx`
- Create: `apps/native-catalog/sections/TextSection.tsx`; Modify: `apps/native-catalog/sections/index.ts`

- [ ] **Step 1: Write the failing test** — `packages/react-native/test/atoms/text.test.tsx`

```tsx
import { render, screen } from '@testing-library/react-native';
import { Text, TextClassContext } from '../../src/atoms/text';

describe('Text', () => {
  it('applies the web body defaults', async () => {
    await render(<Text>Hello</Text>);
    expect(screen.getByText('Hello').props.className).toBe('font-sans text-base text-foreground');
  });

  it('lets the parent context override the defaults', async () => {
    await render(
      <TextClassContext.Provider value="text-sm text-white">
        <Text>Label</Text>
      </TextClassContext.Provider>,
    );
    expect(screen.getByText('Label').props.className).toBe('font-sans text-sm text-white');
  });

  it('lets className override the context', async () => {
    await render(
      <TextClassContext.Provider value="text-white">
        <Text className="text-primary">Own</Text>
      </TextClassContext.Provider>,
    );
    expect(screen.getByText('Own').props.className).toContain('text-primary');
    expect(screen.getByText('Own').props.className).not.toContain('text-white');
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/text.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement** — `packages/react-native/src/atoms/text.tsx`

```tsx
import * as React from 'react';
import { Text as RNText } from 'react-native';
import { cn } from '../lib/utils';

/** Text classes a parent (Button, Badge, Toggle…) pushes down to its Text children. */
const TextClassContext = React.createContext<string | undefined>(undefined);

type TextProps = React.ComponentProps<typeof RNText>;

function Text({ className, ...props }: TextProps) {
  const textClass = React.useContext(TextClassContext);
  return <RNText className={cn('font-sans text-base text-foreground', textClass, className)} {...props} />;
}

export { Text, TextClassContext };
export type { TextProps };
```

Append to `packages/react-native/src/index.ts`:
```ts
export * from './atoms/text';
```

- [ ] **Step 4: Run — expect PASS**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/text.test.tsx`
Expected: 3 passed.

- [ ] **Step 5: Catalog section** — `apps/native-catalog/sections/TextSection.tsx`

```tsx
import { Text } from '@aumraa/breathe-native';
import { Section } from '../components/Section';

export function TextSection() {
  return (
    <Section title="Text">
      <Text>Body default (Inter 16/24, foreground)</Text>
      <Text className="text-sm text-foreground-secondary">Secondary 14</Text>
      <Text className="text-xs text-foreground-tertiary">Tertiary 12</Text>
    </Section>
  );
}
```

In `apps/native-catalog/sections/index.ts` add `import { TextSection } from './TextSection';` and the entry `{ key: 'text', Component: TextSection },` after `foundations`.

- [ ] **Step 6: Commit**

```bash
git add packages/react-native apps/native-catalog
git commit -m "feat(native): Text atom with TextClassContext"
```

---

### Task 7: Icon

Wraps any lucide icon so it takes `className` (colour via `text-*`, size via `size-*`) and inherits the parent's text colour and icon size (R9).

**Files:**
- Create: `packages/react-native/src/atoms/icon.tsx`
- Modify: `packages/react-native/src/index.ts`
- Test: `packages/react-native/test/atoms/icon.test.tsx`

- [ ] **Step 1: Write the failing test** — `packages/react-native/test/atoms/icon.test.tsx`

```tsx
import { render, screen } from '@testing-library/react-native';
import { Check } from 'lucide-react-native';
import { Icon, IconSizeContext } from '../../src/atoms/icon';
import { TextClassContext } from '../../src/atoms/text';

describe('Icon', () => {
  it('defaults to 16px and foreground colour', async () => {
    await render(<Icon as={Check} />);
    const icon = screen.getByTestId('icon-Check');
    expect(icon.props.size).toBe(16);
    expect(icon.props.className).toBe('text-foreground');
  });

  it('inherits size and colour from its parent', async () => {
    await render(
      <IconSizeContext.Provider value={20}>
        <TextClassContext.Provider value="text-sm text-white">
          <Icon as={Check} />
        </TextClassContext.Provider>
      </IconSizeContext.Provider>,
    );
    const icon = screen.getByTestId('icon-Check');
    expect(icon.props.size).toBe(20);
    expect(icon.props.className).toContain('text-white');
  });

  it('prefers an explicit size', async () => {
    await render(
      <IconSizeContext.Provider value={20}>
        <Icon as={Check} size={12} />
      </IconSizeContext.Provider>,
    );
    expect(screen.getByTestId('icon-Check').props.size).toBe(12);
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/icon.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement** — `packages/react-native/src/atoms/icon.tsx`

```tsx
import type { LucideProps } from 'lucide-react-native';
import { styled } from 'nativewind';
import * as React from 'react';
import { cn } from '../lib/utils';
import { TextClassContext } from './text';

type IconComponent = React.ComponentType<LucideProps>;

/** Icon size (px) a parent pushes down; replaces web `[&_svg]:size-N`. Web default svg size is 16. */
const IconSizeContext = React.createContext<number>(16);

type IconProps = LucideProps & { as: IconComponent; className?: string };

function IconImpl({ as: Component, ...props }: IconProps) {
  return <Component {...props} />;
}

// `size-4` / `h-4 w-4` classes feed lucide's numeric `size` prop.
const StyledIcon = styled(IconImpl, {
  className: {
    target: 'style',
    nativeStyleToProp: { height: 'size', width: 'size' },
  },
});

function Icon({ as, className, size, ...props }: IconProps) {
  const textClass = React.useContext(TextClassContext);
  const inheritedSize = React.useContext(IconSizeContext);
  return (
    <StyledIcon
      as={as}
      className={cn('text-foreground', textClass, className)}
      size={size ?? inheritedSize}
      {...props}
    />
  );
}

export { Icon, IconSizeContext };
export type { IconComponent, IconProps };
```

Note: `textClass` can contain font-size classes (`text-sm`); they have no effect on an svg and are harmless.

Append to `packages/react-native/src/index.ts`:
```ts
export * from './atoms/icon';
```

- [ ] **Step 4: Run — expect PASS**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/icon.test.tsx && pnpm --filter @aumraa/breathe-native typecheck`
Expected: 3 passed; tsc 0. If tsc rejects the `styled(...)` options object, check the `styled` signature in `node_modules/nativewind/dist/typescript/**/styled.d.ts` and match its option key names. The runtime shape (`className: { target, nativeStyleToProp }`) is the documented v5 API.

- [ ] **Step 5: Commit**

```bash
git add packages/react-native
git commit -m "feat(native): Icon atom with inherited size and colour"
```

---

### Task 8: Gradient

Reproduces the web `.bg-gradient-brand` utility exactly (D6), using RN's CSS gradient support (Fact 5).

**Files:**
- Create: `packages/react-native/src/atoms/gradient.tsx`
- Modify: `packages/react-native/src/index.ts`
- Test: `packages/react-native/test/atoms/gradient.test.tsx`

- [ ] **Step 1: Write the failing test** — `packages/react-native/test/atoms/gradient.test.tsx`

```tsx
import { render, screen } from '@testing-library/react-native';
import { BRAND_GRADIENT, Gradient } from '../../src/atoms/gradient';

describe('Gradient', () => {
  it('matches the web .bg-gradient-brand utility', () => {
    expect(BRAND_GRADIENT).toBe('linear-gradient(135deg, #3cb6d7 0%, #2262ec 100%)');
  });

  it('fills its parent by default and ignores touches', async () => {
    await render(<Gradient testID="g" />);
    const g = screen.getByTestId('g');
    expect(g.props.className).toBe('absolute inset-0');
    expect(g.props.pointerEvents).toBe('none');
    expect(g.props.style).toEqual([{ experimental_backgroundImage: BRAND_GRADIENT }, undefined]);
  });

  it('accepts a custom gradient', async () => {
    await render(<Gradient testID="g" gradient="linear-gradient(90deg, red, blue)" />);
    expect(screen.getByTestId('g').props.style[0].experimental_backgroundImage).toBe(
      'linear-gradient(90deg, red, blue)',
    );
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/gradient.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement** — `packages/react-native/src/atoms/gradient.tsx`

```tsx
import * as React from 'react';
import { View } from 'react-native';
import { cn } from '../lib/utils';

/** Web: .bg-gradient-brand in Leminiscate src/index.css, hsl(193 66% 54%) to hsl(221 84% 53%) at 135deg. */
const BRAND_GRADIENT = 'linear-gradient(135deg, #3cb6d7 0%, #2262ec 100%)';

type GradientProps = React.ComponentProps<typeof View> & { gradient?: string };

/**
 * Static gradient layer, by default absolutely filling its parent (give the parent `overflow-hidden`
 * and a radius). Never make this an Animated view (reanimated#8297). Animate a parent instead.
 */
function Gradient({ gradient = BRAND_GRADIENT, className, style, ...props }: GradientProps) {
  return (
    <View
      pointerEvents="none"
      className={cn('absolute inset-0', className)}
      style={[{ experimental_backgroundImage: gradient }, style]}
      {...props}
    />
  );
}

export { BRAND_GRADIENT, Gradient };
export type { GradientProps };
```

Append to `packages/react-native/src/index.ts`:
```ts
export * from './atoms/gradient';
```

- [ ] **Step 4: Run — expect PASS**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/gradient.test.tsx`
Expected: 3 passed.

- [ ] **Step 5: Commit**

```bash
git add packages/react-native
git commit -m "feat(native): Gradient atom reproducing bg-gradient-brand"
```

---

### Task 9: Spinner

Web loading state = lucide `Loader2` + `animate-spin` (1s linear infinite rotation).

**Files:**
- Create: `packages/react-native/src/atoms/spinner.tsx`
- Modify: `packages/react-native/src/index.ts`
- Test: `packages/react-native/test/atoms/spinner.test.tsx`

- [ ] **Step 1: Write the failing test** — `packages/react-native/test/atoms/spinner.test.tsx`

```tsx
import { render, screen } from '@testing-library/react-native';
import { Spinner } from '../../src/atoms/spinner';

describe('Spinner', () => {
  it('renders Loader2 inside a progressbar with a busy state', async () => {
    await render(<Spinner />);
    const spinner = screen.getByRole('progressbar');
    expect(spinner.props.accessibilityState).toEqual({ busy: true });
    expect(screen.getByTestId('icon-Loader2')).toBeOnTheScreen();
  });

  it('forwards className and size to the icon', async () => {
    await render(<Spinner className="text-white" size={20} />);
    const icon = screen.getByTestId('icon-Loader2');
    expect(icon.props.className).toContain('text-white');
    expect(icon.props.size).toBe(20);
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/spinner.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement** — `packages/react-native/src/atoms/spinner.tsx`

```tsx
import { Loader2 } from 'lucide-react-native';
import * as React from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Icon } from './icon';

type SpinnerProps = { className?: string; size?: number };

/** Web: <Loader2 className="animate-spin" />, one full turn per second, linear, forever. */
function Spinner({ className, size }: SpinnerProps) {
  const rotation = useSharedValue(0);

  React.useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 1000, easing: Easing.linear }), -1, false);
  }, [rotation]);

  const spin = useAnimatedStyle(() => ({ transform: [{ rotate: `${rotation.value}deg` }] }));

  return (
    <Animated.View role="progressbar" accessibilityState={{ busy: true }} style={spin}>
      <Icon as={Loader2} className={className} size={size} />
    </Animated.View>
  );
}

export { Spinner };
export type { SpinnerProps };
```

Append to `packages/react-native/src/index.ts`:
```ts
export * from './atoms/spinner';
```

- [ ] **Step 4: Run — expect PASS**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/spinner.test.tsx`
Expected: 2 passed.

- [ ] **Step 5: Catalog section** — `apps/native-catalog/sections/IconSection.tsx` (covers Icon, Gradient, Spinner)

```tsx
import { Gradient, Icon, Spinner, Text } from '@aumraa/breathe-native';
import { Bell, Check, Plus } from 'lucide-react-native';
import { View } from 'react-native';
import { Section } from '../components/Section';

export function IconSection() {
  return (
    <Section title="Icon · Gradient · Spinner">
      <View className="flex-row items-center gap-4">
        <Icon as={Plus} />
        <Icon as={Check} className="text-success" size={20} />
        <Icon as={Bell} className="size-6 text-primary" />
        <Spinner />
        <Spinner className="text-primary" size={20} />
      </View>
      <View className="h-11 overflow-hidden rounded-lg">
        <Gradient />
        <Text className="m-auto text-sm font-medium text-white">bg-gradient-brand</Text>
      </View>
    </Section>
  );
}
```

Register `{ key: 'icon', Component: IconSection }` in `sections/index.ts` (with its import). On device, compare the gradient bar side by side with a web `bg-gradient-brand` element: direction and colours must match.

- [ ] **Step 6: Commit**

```bash
git add packages/react-native apps/native-catalog
git commit -m "feat(native): Spinner atom and icon/gradient catalog"
```

---

## Phase 2 — Atoms

### Task 10: Button

Reference: repo `src/design-system/ui/button.tsx` (13 variants × 9 sizes, `loading`, `loadingText`, `leftIcon`, `rightIcon`). Structure from rnr `button.tsx`: the Pressable owns bg/border/`active:`, and text classes go down through `TextClassContext`.

Native changes (see §0.4/§0.5): `hover:*` dropped (R5); `bg-[var(--x)]` → named colours (R2); `disabled:*` → `disabled` cva variant (R8); `[&_svg]:size-*` → `IconSizeContext` (R9); gradient press `brightness(0.94)` → 6% black overlay; no `asChild` (R20); string children are wrapped in `Text` automatically (so `<Button>Save</Button>` works like web).

**Files:**
- Create: `packages/react-native/src/atoms/button.tsx`
- Modify: `packages/react-native/src/index.ts`
- Test: `packages/react-native/test/atoms/button.test.tsx`
- Create: `apps/native-catalog/sections/ButtonSection.tsx`

- [ ] **Step 1: Write the failing test** — `packages/react-native/test/atoms/button.test.tsx`

```tsx
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Plus } from 'lucide-react-native';
import { Button, buttonTextVariants, buttonVariants } from '../../src/atoms/button';
import { Icon } from '../../src/atoms/icon';

describe('buttonVariants (parity with web button.tsx)', () => {
  it.each([
    ['default', 'bg-primary-500', 'active:bg-primary-700'],
    ['destructive', 'bg-negative-500', 'active:bg-negative-700'],
    ['outline', 'border-primary-500', 'active:bg-primary-50'],
    ['brandOutline', 'border-neutral-white-300', 'active:bg-neutral-white-75'],
    ['secondary', 'bg-neutral-white-50', 'active:bg-neutral-white-100'],
    ['ghost', 'bg-transparent', 'active:bg-primary-50'],
    ['success', 'bg-positive-500', 'active:bg-positive-700'],
    ['warning', 'bg-alert-500', 'active:bg-alert-700'],
    ['danger', 'bg-negative-500', 'active:bg-negative-700'],
    ['info', 'bg-secondary-500', 'active:bg-secondary-700'],
    ['neutral', 'border-neutral-black-25', 'active:bg-neutral-white-75'],
  ] as const)('%s → %s, pressed %s', (variant, rest, pressed) => {
    const cls = buttonVariants({ variant });
    expect(cls).toContain(rest);
    expect(cls).toContain(pressed);
  });

  it.each([
    ['default', 'h-11 gap-2 rounded-lg px-4'],
    ['xs', 'h-7 gap-1.5 rounded-md px-2.5'],
    ['sm', 'h-9 gap-1.5 rounded-md px-3.5'],
    ['lg', 'h-12 gap-2 rounded-lg px-5'],
    ['xl', 'h-14 gap-2.5 rounded-xl px-6'],
    ['xxl', 'h-16 gap-3 rounded-xl px-7'],
    ['icon', 'h-11 w-11 rounded-lg p-0'],
    ['icon-sm', 'h-9 w-9 rounded-md p-0'],
    ['icon-xs', 'h-7 w-7 rounded-md p-0'],
  ] as const)('size %s → %s', (size, expected) => {
    expect(buttonVariants({ size })).toContain(expected);
  });

  it('uses the grey disabled fill and drops the shadow', () => {
    const cls = buttonVariants({ variant: 'default', disabled: true });
    expect(cls).toContain('bg-neutral-white-100');
    expect(cls).toContain('shadow-none');
    expect(cls).not.toContain('bg-primary-500');
  });

  it('keeps white text on filled variants and neutral-black-500 when disabled', () => {
    expect(buttonTextVariants({ variant: 'default' })).toContain('text-white');
    expect(buttonTextVariants({ variant: 'brandOutline' })).toContain('text-neutral-black-975');
    expect(buttonTextVariants({ variant: 'default', disabled: true })).toContain('text-neutral-black-500');
    expect(buttonTextVariants({ size: 'xs' })).toContain('text-[11px]');
    expect(buttonTextVariants({ size: 'sm' })).toContain('text-xs');
  });
});

describe('Button', () => {
  it('wraps string children in Text and fires onPress', async () => {
    const onPress = jest.fn();
    await render(<Button onPress={onPress}>Save</Button>);
    await fireEvent.press(screen.getByText('Save'));
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Save').props.className).toContain('font-medium');
  });

  it('does not fire when disabled and reports the state', async () => {
    const onPress = jest.fn();
    await render(<Button disabled onPress={onPress}>Save</Button>);
    await fireEvent.press(screen.getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
    expect(screen.getByRole('button').props.accessibilityState).toMatchObject({ disabled: true });
  });

  it('shows a spinner, swaps the label and blocks presses while loading', async () => {
    const onPress = jest.fn();
    await render(
      <Button loading loadingText="Saving…" onPress={onPress}>
        Save
      </Button>,
    );
    expect(screen.getByTestId('icon-Loader2')).toBeOnTheScreen();
    expect(screen.getByText('Saving…')).toBeOnTheScreen();
    expect(screen.queryByText('Save')).toBeNull();
    await fireEvent.press(screen.getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
    expect(screen.getByRole('button').props.accessibilityState).toMatchObject({ disabled: true, busy: true });
  });

  it('renders left and right icons around the label', async () => {
    await render(
      <Button leftIcon={<Icon as={Plus} />} rightIcon={<Icon as={Plus} />}>
        Add
      </Button>,
    );
    expect(screen.getAllByTestId('icon-Plus')).toHaveLength(2);
  });

  it('becomes square when it has only an icon', async () => {
    await render(<Button leftIcon={<Icon as={Plus} />} accessibilityLabel="Add" />);
    expect(screen.getByRole('button').props.className).toContain('w-11');
  });

  it('gives icons the size of the button size', async () => {
    await render(<Button size="xl" leftIcon={<Icon as={Plus} />}>Big</Button>);
    expect(screen.getByTestId('icon-Plus').props.size).toBe(20);
  });

  it('paints the brand gradient for the gradient variant', async () => {
    await render(<Button variant="gradient">Go</Button>);
    expect(screen.getByTestId('button-gradient')).toBeOnTheScreen();
  });

  it('hides the gradient when disabled', async () => {
    await render(<Button variant="gradient" disabled>Go</Button>);
    expect(screen.queryByTestId('button-gradient')).toBeNull();
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/button.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement** — `packages/react-native/src/atoms/button.tsx`

```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import { cn } from '../lib/utils';
import { Gradient } from './gradient';
import { IconSizeContext } from './icon';
import { Spinner } from './spinner';
import { Text, TextClassContext } from './text';

// Container: bg, border, radius, height, press state. Web hover:* dropped (touch).
const buttonVariants = cva('shrink-0 flex-row items-center justify-center overflow-hidden active:translate-y-px', {
  variants: {
    variant: {
      default: 'border border-transparent bg-primary-500 shadow-sm active:bg-primary-700',
      gradient: 'border border-transparent shadow-sm',
      destructive: 'border border-transparent bg-negative-500 shadow-sm active:bg-negative-700',
      outline: 'border border-primary-500 bg-neutral-white-25 active:bg-primary-50',
      brandOutline: 'border-[0.7px] border-neutral-white-300 bg-transparent active:bg-neutral-white-75',
      secondary: 'border border-transparent bg-neutral-white-50 active:bg-neutral-white-100',
      ghost: 'border border-transparent bg-transparent active:bg-primary-50',
      link: 'border border-transparent bg-transparent px-0',
      success: 'border border-transparent bg-positive-500 shadow-sm active:bg-positive-700',
      warning: 'border border-transparent bg-alert-500 shadow-sm active:bg-alert-700',
      danger: 'border border-transparent bg-negative-500 shadow-sm active:bg-negative-700',
      info: 'border border-transparent bg-secondary-500 shadow-sm active:bg-secondary-700',
      neutral: 'border border-neutral-black-25 bg-neutral-white-25 active:bg-neutral-white-75',
    },
    size: {
      default: 'h-11 gap-2 rounded-lg px-4',
      xs: 'h-7 gap-1.5 rounded-md px-2.5',
      sm: 'h-9 gap-1.5 rounded-md px-3.5',
      lg: 'h-12 gap-2 rounded-lg px-5',
      xl: 'h-14 gap-2.5 rounded-xl px-6',
      xxl: 'h-16 gap-3 rounded-xl px-7',
      icon: 'h-11 w-11 rounded-lg p-0',
      'icon-sm': 'h-9 w-9 rounded-md p-0',
      'icon-xs': 'h-7 w-7 rounded-md p-0',
    },
    disabled: { true: 'shadow-none', false: '' },
  },
  compoundVariants: [
    { variant: ['default', 'gradient', 'destructive', 'success', 'warning', 'danger', 'info'], disabled: true, className: 'bg-neutral-white-100' },
    { variant: ['outline', 'brandOutline', 'neutral'], disabled: true, className: 'border-neutral-white-200' },
    { variant: 'secondary', disabled: true, className: 'bg-neutral-white-50' },
  ],
  defaultVariants: { variant: 'default', size: 'default', disabled: false },
});

// Label: web puts these on <button>; RN needs them on Text (R10).
const buttonTextVariants = cva('font-medium', {
  variants: {
    variant: {
      default: 'text-white',
      gradient: 'text-white',
      destructive: 'text-white',
      outline: 'text-primary-500',
      brandOutline: 'text-neutral-black-975',
      secondary: 'text-neutral-black-975',
      ghost: 'text-primary-500',
      link: 'text-primary-500',
      success: 'text-white',
      warning: 'text-white',
      danger: 'text-white',
      info: 'text-white',
      neutral: 'text-neutral-black-975',
    },
    size: {
      default: 'text-sm',
      xs: 'text-[11px]',
      sm: 'text-xs',
      lg: 'text-sm',
      xl: 'text-base',
      xxl: 'text-base',
      icon: 'text-sm',
      'icon-sm': 'text-sm',
      'icon-xs': 'text-[11px]',
    },
    pressed: { true: '', false: '' },
    disabled: { true: 'text-neutral-black-500', false: '' },
  },
  compoundVariants: [{ variant: 'link', pressed: true, disabled: false, className: 'text-primary-700 underline' }],
  defaultVariants: { variant: 'default', size: 'default', pressed: false, disabled: false },
});

// Web [&_svg]:size-* per size
const ICON_SIZE: Record<NonNullable<ButtonSize>, number> = {
  default: 16, xs: 14, sm: 16, lg: 16, xl: 20, xxl: 20, icon: 16, 'icon-sm': 16, 'icon-xs': 14,
};

type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
type ButtonSize = VariantProps<typeof buttonVariants>['size'];

type ButtonProps = Omit<React.ComponentProps<typeof Pressable>, 'children' | 'disabled'> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  children?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
};

function Button({
  className,
  variant = 'default',
  size,
  disabled = false,
  children,
  leftIcon,
  rightIcon,
  loading = false,
  loadingText,
  accessibilityState,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const isIconOnly = !children && !!(leftIcon || rightIcon || loading);
  const resolvedSize: NonNullable<ButtonSize> = isIconOnly && (size == null || size === 'default') ? 'icon' : size ?? 'default';
  const label = loading && loadingText ? loadingText : children;
  const content = typeof label === 'string' || typeof label === 'number' ? <Text>{label}</Text> : label;

  return (
    <Pressable
      role="button"
      disabled={isDisabled}
      accessibilityState={{ ...accessibilityState, disabled: isDisabled, busy: loading }}
      className={cn(
        buttonVariants({ variant, size: resolvedSize, disabled: isDisabled }),
        variant === 'link' && !isIconOnly && 'h-auto',
        className,
      )}
      {...props}>
      {({ pressed }) => (
        <IconSizeContext.Provider value={ICON_SIZE[resolvedSize]}>
          <TextClassContext.Provider value={buttonTextVariants({ variant, size: resolvedSize, pressed, disabled: isDisabled })}>
            {variant === 'gradient' && !isDisabled && <Gradient testID="button-gradient" />}
            {variant === 'gradient' && pressed && !isDisabled && (
              <View pointerEvents="none" className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.06)' }} />
            )}
            {loading ? <Spinner /> : leftIcon}
            {content}
            {!loading && rightIcon}
          </TextClassContext.Provider>
        </IconSizeContext.Provider>
      )}
    </Pressable>
  );
}

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
```

Append to `packages/react-native/src/index.ts`:
```ts
export * from './atoms/button';
```

- [ ] **Step 4: Run — expect PASS**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/button.test.tsx && pnpm --filter @aumraa/breathe-native typecheck`
Expected: all Button tests pass; tsc 0.

- [ ] **Step 5: Catalog section** — `apps/native-catalog/sections/ButtonSection.tsx`

```tsx
import { Button, Icon } from '@aumraa/breathe-native';
import { ArrowRight, Plus, Trash2 } from 'lucide-react-native';
import { View } from 'react-native';
import { Section } from '../components/Section';

const VARIANTS = ['default', 'gradient', 'destructive', 'outline', 'brandOutline', 'secondary', 'ghost', 'link', 'success', 'warning', 'danger', 'info', 'neutral'] as const;
const SIZES = ['xs', 'sm', 'default', 'lg', 'xl', 'xxl'] as const;

export function ButtonSection() {
  return (
    <Section title="Button">
      <View className="flex-row flex-wrap gap-2">
        {VARIANTS.map((v) => (
          <Button key={v} variant={v}>{v}</Button>
        ))}
      </View>
      <View className="flex-row flex-wrap gap-2">
        {VARIANTS.map((v) => (
          <Button key={v} variant={v} disabled>{v}</Button>
        ))}
      </View>
      <View className="flex-row flex-wrap items-center gap-2">
        {SIZES.map((s) => (
          <Button key={s} size={s}>{s}</Button>
        ))}
      </View>
      <View className="flex-row flex-wrap items-center gap-2">
        <Button leftIcon={<Icon as={Plus} />}>Add resident</Button>
        <Button variant="outline" rightIcon={<Icon as={ArrowRight} />}>Next</Button>
        <Button loading>Save</Button>
        <Button loading loadingText="Saving…" variant="gradient">Save</Button>
        <Button size="icon" leftIcon={<Icon as={Plus} />} accessibilityLabel="Add" />
        <Button size="icon-sm" variant="ghost" leftIcon={<Icon as={Trash2} />} accessibilityLabel="Delete" />
        <Button size="icon-xs" variant="neutral" leftIcon={<Icon as={Plus} />} accessibilityLabel="Add" />
      </View>
    </Section>
  );
}
```

Register `{ key: 'button', Component: ButtonSection }` in `sections/index.ts`.

- [ ] **Step 6: Device checks** (add rows to the spike table in Task 5)

| # | Check | Pass | If it fails |
|---|---|---|---|
| S6 | Press any filled variant | Background darkens to its `-700` shade and the button nudges 1px down | If there's no colour change, `active:` isn't mapping: file an issue and switch the container to a `pressed` cva variant driven by the render-prop (as the link text already is). If there's no nudge, `translate` isn't mapped: remove `active:translate-y-px` (cosmetic). |
| S7 | Press `link` | Text turns `primary-700` and underlines | Check that `pressed` reaches `buttonTextVariants`. |
| S8 | `gradient` | Same colours and direction as the web; darker while pressed | See Task 8. |
| S9 | Button inside a `ScrollView` | Presses still register | nativewind#1583: make sure no child uses `active:`. |

- [ ] **Step 7: Commit**

```bash
git add packages/react-native apps/native-catalog
git commit -m "feat(native): Button atom with all 13 variants and 9 sizes from Leminiscate"
```

---

### Task 11: Label

Reference: repo `ui/label.tsx`: `text-sm font-medium leading-none peer-disabled:opacity-70`. Structure: rnr `label.tsx` (`@rn-primitives/label`). `htmlFor` becomes `onPress` focusing the input (§0.5).

**Files:**
- Create: `packages/react-native/src/atoms/label.tsx`
- Modify: `packages/react-native/src/index.ts`
- Test: `packages/react-native/test/atoms/label.test.tsx`
- Create: `apps/native-catalog/sections/LabelSection.tsx`

- [ ] **Step 1: Write the failing test** — `packages/react-native/test/atoms/label.test.tsx`

```tsx
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Label } from '../../src/atoms/label';

describe('Label', () => {
  it('uses the web label typography', async () => {
    await render(<Label>Email</Label>);
    expect(screen.getByText('Email').props.className).toBe(
      'font-sans text-sm font-medium leading-none text-foreground',
    );
  });

  it('forwards presses (used to focus the paired input)', async () => {
    const onPress = jest.fn();
    await render(<Label onPress={onPress}>Email</Label>);
    await fireEvent.press(screen.getByText('Email'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('ignores presses when disabled', async () => {
    const onPress = jest.fn();
    await render(<Label disabled onPress={onPress}>Email</Label>);
    await fireEvent.press(screen.getByText('Email'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/label.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement** — `packages/react-native/src/atoms/label.tsx`

```tsx
import * as LabelPrimitive from '@rn-primitives/label';
import * as React from 'react';
import { cn } from '../lib/utils';

type LabelProps = React.ComponentProps<typeof LabelPrimitive.Text>;

function Label({ className, onPress, onLongPress, onPressIn, onPressOut, disabled, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      className={cn('flex-row items-center', disabled && 'opacity-70')}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled}>
      <LabelPrimitive.Text
        className={cn('font-sans text-sm font-medium leading-none text-foreground', className)}
        {...props}
      />
    </LabelPrimitive.Root>
  );
}

export { Label };
export type { LabelProps };
```

Append to `packages/react-native/src/index.ts`:
```ts
export * from './atoms/label';
```

- [ ] **Step 4: Run — expect PASS**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/label.test.tsx`
Expected: 3 passed.

- [ ] **Step 5: Catalog** — `apps/native-catalog/sections/LabelSection.tsx`

```tsx
import { Label } from '@aumraa/breathe-native';
import { Section } from '../components/Section';

export function LabelSection() {
  return (
    <Section title="Label">
      <Label>Flat number</Label>
      <Label disabled>Disabled label</Label>
    </Section>
  );
}
```

Register `{ key: 'label', Component: LabelSection }`.

- [ ] **Step 6: Commit**

```bash
git add packages/react-native apps/native-catalog
git commit -m "feat(native): Label atom"
```

---

### Task 12: Badge

Reference: repo `ui/badge.tsx`, 12 variants including the role badges (`super-admin`, `admin`, `viewer`) and `gradient`. `inline-flex` → `flex-row self-start` (R18). Outline gets `border-border` (R11). `hover:*` and focus rings dropped.

**Files:**
- Create: `packages/react-native/src/atoms/badge.tsx`
- Modify: `packages/react-native/src/index.ts`
- Test: `packages/react-native/test/atoms/badge.test.tsx`
- Create: `apps/native-catalog/sections/BadgeSection.tsx`

- [ ] **Step 1: Write the failing test** — `packages/react-native/test/atoms/badge.test.tsx`

```tsx
import { render, screen } from '@testing-library/react-native';
import { Badge, badgeTextVariants, badgeVariants } from '../../src/atoms/badge';

describe('badge variants (parity with web badge.tsx)', () => {
  it.each([
    ['default', 'bg-primary', 'text-primary-foreground'],
    ['secondary', 'bg-secondary', 'text-secondary-foreground'],
    ['destructive', 'bg-destructive', 'text-destructive-foreground'],
    ['outline', 'border-border', 'text-foreground'],
    ['success', 'bg-success-light', 'text-success-dark'],
    ['warning', 'bg-warning-light', 'text-warning-dark'],
    ['danger', 'bg-danger-light', 'text-danger-dark'],
    ['info', 'bg-info-light', 'text-info-dark'],
    ['gradient', 'border-transparent', 'text-primary-foreground'],
    ['super-admin', 'bg-danger-light', 'text-danger-dark'],
    ['admin', 'bg-info-light', 'text-info-dark'],
    ['viewer', 'bg-secondary', 'text-foreground-secondary'],
  ] as const)('%s', (variant, container, text) => {
    expect(badgeVariants({ variant })).toContain(container);
    expect(badgeTextVariants({ variant })).toContain(text);
  });

  it('has the web pill geometry and type', () => {
    expect(badgeVariants({})).toContain('rounded-full border px-2.5 py-0.5');
    expect(badgeTextVariants({})).toContain('text-xs font-semibold');
  });
});

describe('Badge', () => {
  it('wraps string children in styled Text', async () => {
    await render(<Badge variant="success">Paid</Badge>);
    expect(screen.getByText('Paid').props.className).toContain('text-success-dark');
  });

  it('paints the gradient layer only for the gradient variant', async () => {
    const { rerender } = await render(<Badge variant="gradient">Pro</Badge>);
    expect(screen.getByTestId('badge-gradient')).toBeOnTheScreen();
    await rerender(<Badge>Pro</Badge>);
    expect(screen.queryByTestId('badge-gradient')).toBeNull();
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/badge.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement** — `packages/react-native/src/atoms/badge.tsx`

```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { View } from 'react-native';
import { cn } from '../lib/utils';
import { Gradient } from './gradient';
import { Text, TextClassContext } from './text';

const badgeVariants = cva('flex-row items-center self-start overflow-hidden rounded-full border px-2.5 py-0.5', {
  variants: {
    variant: {
      default: 'border-transparent bg-primary',
      secondary: 'border-transparent bg-secondary',
      destructive: 'border-transparent bg-destructive',
      outline: 'border-border',
      success: 'border-transparent bg-success-light',
      warning: 'border-transparent bg-warning-light',
      danger: 'border-transparent bg-danger-light',
      info: 'border-transparent bg-info-light',
      gradient: 'border-transparent',
      'super-admin': 'border-transparent bg-danger-light',
      admin: 'border-transparent bg-info-light',
      viewer: 'border-transparent bg-secondary',
    },
  },
  defaultVariants: { variant: 'default' },
});

const badgeTextVariants = cva('text-xs font-semibold', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      secondary: 'text-secondary-foreground',
      destructive: 'text-destructive-foreground',
      outline: 'text-foreground',
      success: 'text-success-dark',
      warning: 'text-warning-dark',
      danger: 'text-danger-dark',
      info: 'text-info-dark',
      gradient: 'text-primary-foreground',
      'super-admin': 'text-danger-dark',
      admin: 'text-info-dark',
      viewer: 'text-foreground-secondary',
    },
  },
  defaultVariants: { variant: 'default' },
});

type BadgeProps = React.ComponentProps<typeof View> & VariantProps<typeof badgeVariants>;

function Badge({ className, variant, children, ...props }: BadgeProps) {
  const content = typeof children === 'string' || typeof children === 'number' ? <Text>{children}</Text> : children;
  return (
    <TextClassContext.Provider value={badgeTextVariants({ variant })}>
      <View className={cn(badgeVariants({ variant }), className)} {...props}>
        {variant === 'gradient' && <Gradient testID="badge-gradient" />}
        {content}
      </View>
    </TextClassContext.Provider>
  );
}

export { Badge, badgeTextVariants, badgeVariants };
export type { BadgeProps };
```

Append to `packages/react-native/src/index.ts`:
```ts
export * from './atoms/badge';
```

- [ ] **Step 4: Run — expect PASS**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/badge.test.tsx`
Expected: all pass.

- [ ] **Step 5: Catalog** — `apps/native-catalog/sections/BadgeSection.tsx`

```tsx
import { Badge } from '@aumraa/breathe-native';
import { View } from 'react-native';
import { Section } from '../components/Section';

const VARIANTS = ['default', 'secondary', 'destructive', 'outline', 'success', 'warning', 'danger', 'info', 'gradient', 'super-admin', 'admin', 'viewer'] as const;

export function BadgeSection() {
  return (
    <Section title="Badge">
      <View className="flex-row flex-wrap gap-2">
        {VARIANTS.map((v) => (
          <Badge key={v} variant={v}>{v}</Badge>
        ))}
      </View>
    </Section>
  );
}
```

Register `{ key: 'badge', Component: BadgeSection }`.

- [ ] **Step 6: Commit**

```bash
git add packages/react-native apps/native-catalog
git commit -m "feat(native): Badge atom with all 12 variants"
```

---

### Task 13: Separator

Reference: repo `ui/separator.tsx`, identical classes to rnr: `shrink-0 bg-border`, 1px line.

**Files:**
- Create: `packages/react-native/src/atoms/separator.tsx`
- Modify: `packages/react-native/src/index.ts`
- Test: `packages/react-native/test/atoms/separator.test.tsx`

- [ ] **Step 1: Write the failing test** — `packages/react-native/test/atoms/separator.test.tsx`

```tsx
import { render, screen } from '@testing-library/react-native';
import { Separator } from '../../src/atoms/separator';

describe('Separator', () => {
  it('is a 1px horizontal border-coloured line by default', async () => {
    await render(<Separator testID="s" />);
    expect(screen.getByTestId('s').props.className).toBe('shrink-0 bg-border h-[1px] w-full');
  });

  it('supports vertical orientation', async () => {
    await render(<Separator testID="s" orientation="vertical" />);
    expect(screen.getByTestId('s').props.className).toBe('shrink-0 bg-border h-full w-[1px]');
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/separator.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement** — `packages/react-native/src/atoms/separator.tsx`

```tsx
import * as SeparatorPrimitive from '@rn-primitives/separator';
import * as React from 'react';
import { cn } from '../lib/utils';

type SeparatorProps = React.ComponentProps<typeof SeparatorPrimitive.Root>;

function Separator({ className, orientation = 'horizontal', decorative = true, ...props }: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      decorative={decorative}
      orientation={orientation}
      className={cn('shrink-0 bg-border', orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]', className)}
      {...props}
    />
  );
}

export { Separator };
export type { SeparatorProps };
```

Append to `packages/react-native/src/index.ts`:
```ts
export * from './atoms/separator';
```

- [ ] **Step 4: Run — expect PASS**, then **Step 5: Commit**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/separator.test.tsx` → 2 passed.

```bash
git add packages/react-native
git commit -m "feat(native): Separator atom"
```

(Shown in the catalog by Task 16's `DisplaySection`.)

---

### Task 14: Skeleton

Reference: repo `ui/skeleton.tsx`: `animate-pulse rounded-md bg-muted`. Tailwind `pulse` = opacity 1 → 0.5 → 1 over 2s, `cubic-bezier(0.4, 0, 0.6, 1)`, infinite.

**Files:**
- Create: `packages/react-native/src/atoms/skeleton.tsx`
- Modify: `packages/react-native/src/index.ts`
- Test: `packages/react-native/test/atoms/skeleton.test.tsx`

- [ ] **Step 1: Write the failing test** — `packages/react-native/test/atoms/skeleton.test.tsx`

```tsx
import { render, screen } from '@testing-library/react-native';
import { Skeleton } from '../../src/atoms/skeleton';

describe('Skeleton', () => {
  it('uses the web muted block and merges sizing classes', async () => {
    await render(<Skeleton testID="sk" className="h-4 w-24" />);
    expect(screen.getByTestId('sk').props.className).toBe('rounded-md bg-muted h-4 w-24');
  });

  it('is hidden from screen readers', async () => {
    await render(<Skeleton testID="sk" />);
    expect(screen.getByTestId('sk').props.accessibilityElementsHidden).toBe(true);
    expect(screen.getByTestId('sk').props.importantForAccessibility).toBe('no-hide-descendants');
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/skeleton.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement** — `packages/react-native/src/atoms/skeleton.tsx`

```tsx
import * as React from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { cn } from '../lib/utils';

const PULSE = { duration: 1000, easing: Easing.bezier(0.4, 0, 0.6, 1) };

type SkeletonProps = React.ComponentProps<typeof View>;

/** Web: animate-pulse, opacity 1 → 0.5 → 1 every 2s. */
function Skeleton({ className, ...props }: SkeletonProps) {
  const opacity = useSharedValue(1);

  React.useEffect(() => {
    opacity.value = withRepeat(withSequence(withTiming(0.5, PULSE), withTiming(1, PULSE)), -1);
  }, [opacity]);

  const pulse = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      className={cn('rounded-md bg-muted', className)}
      style={pulse}
      {...props}
    />
  );
}

export { Skeleton };
export type { SkeletonProps };
```

Append to `packages/react-native/src/index.ts`:
```ts
export * from './atoms/skeleton';
```

- [ ] **Step 4: Run — expect PASS**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/skeleton.test.tsx` → 2 passed.

- [ ] **Step 5: Device check S10** — in the catalog (Task 16), the skeleton shows a muted rounded block that pulses. If it pulses but the colour or radius is missing, NativeWind isn't styling `Animated.View`: wrap it as `<Animated.View style={pulse}><View className={cn('rounded-md bg-muted', className)} {...props} /></Animated.View>`.

- [ ] **Step 6: Commit**

```bash
git add packages/react-native
git commit -m "feat(native): Skeleton atom with Tailwind pulse timing"
```

---

### Task 15: Progress

Reference: repo `ui/progress.tsx`. Track `relative h-2 w-full overflow-hidden rounded-full bg-secondary`. The indicator is a **full-width** `bg-gradient-brand` bar translated left by `(100 - value)%` over 500ms `ease-out`. So the visible slice is the right-hand part of the gradient; we reproduce that exactly.

**Files:**
- Create: `packages/react-native/src/atoms/progress.tsx`
- Modify: `packages/react-native/src/index.ts`
- Test: `packages/react-native/test/atoms/progress.test.tsx`

- [ ] **Step 1: Write the failing test** — `packages/react-native/test/atoms/progress.test.tsx`

```tsx
import { render, screen } from '@testing-library/react-native';
import { clampProgress, Progress } from '../../src/atoms/progress';

describe('clampProgress', () => {
  it.each([
    [undefined, 0],
    [null, 0],
    [-5, 0],
    [42, 42],
    [140, 100],
  ])('%p → %p', (input, expected) => {
    expect(clampProgress(input)).toBe(expected);
  });
});

describe('Progress', () => {
  it('renders the web track with a gradient indicator', async () => {
    await render(<Progress testID="p" value={30} />);
    expect(screen.getByTestId('p').props.className).toBe(
      'relative h-2 w-full overflow-hidden rounded-full bg-secondary',
    );
    expect(screen.getByTestId('progress-gradient')).toBeOnTheScreen();
  });

  it('merges a custom track className', async () => {
    await render(<Progress testID="p" value={30} className="h-1" />);
    expect(screen.getByTestId('p').props.className).toContain('h-1');
    expect(screen.getByTestId('p').props.className).not.toContain('h-2');
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/progress.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement** — `packages/react-native/src/atoms/progress.tsx`

```tsx
import * as ProgressPrimitive from '@rn-primitives/progress';
import * as React from 'react';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { cn } from '../lib/utils';
import { Gradient } from './gradient';

// Tailwind ease-out = cubic-bezier(0, 0, 0.2, 1); web duration-500
const TIMING = { duration: 500, easing: Easing.bezier(0, 0, 0.2, 1) };

function clampProgress(value: number | null | undefined): number {
  return Math.min(100, Math.max(0, value ?? 0));
}

type ProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root> & { indicatorClassName?: string };

function Progress({ className, value, indicatorClassName, onLayout, ...props }: ProgressProps) {
  const trackWidth = useSharedValue(0);
  const progress = useSharedValue(clampProgress(value));

  React.useEffect(() => {
    progress.value = withTiming(clampProgress(value), TIMING);
  }, [progress, value]);

  // Web: transform: translateX(-(100 - value)%) on a full-width indicator
  const slide = useAnimatedStyle(() => ({
    transform: [{ translateX: -((100 - progress.value) / 100) * trackWidth.value }],
  }));

  return (
    <ProgressPrimitive.Root
      value={value}
      className={cn('relative h-2 w-full overflow-hidden rounded-full bg-secondary', className)}
      onLayout={(e) => {
        trackWidth.value = e.nativeEvent.layout.width;
        onLayout?.(e);
      }}
      {...props}>
      <ProgressPrimitive.Indicator asChild>
        <Animated.View className={cn('h-full w-full', indicatorClassName)} style={slide}>
          {/* static inner layer: gradients must not sit on an animated view (reanimated#8297) */}
          <Gradient testID="progress-gradient" />
        </Animated.View>
      </ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
  );
}

export { clampProgress, Progress };
export type { ProgressProps };
```

Append to `packages/react-native/src/index.ts`:
```ts
export * from './atoms/progress';
```

- [ ] **Step 4: Run — expect PASS**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/progress.test.tsx && pnpm --filter @aumraa/breathe-native typecheck` → all pass.

- [ ] **Step 5: Commit**

```bash
git add packages/react-native
git commit -m "feat(native): Progress atom with sliding brand gradient"
```

---

### Task 16: Avatar

Reference: repo `ui/avatar.tsx`. Root `relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full`; Image `aspect-square h-full w-full`; Fallback `flex h-full w-full items-center justify-center rounded-full bg-muted`. `@rn-primitives/avatar` requires an `alt` on Root.

**Files:**
- Create: `packages/react-native/src/atoms/avatar.tsx`
- Modify: `packages/react-native/src/index.ts`
- Test: `packages/react-native/test/atoms/avatar.test.tsx`
- Create: `apps/native-catalog/sections/DisplaySection.tsx`

- [ ] **Step 1: Write the failing test** — `packages/react-native/test/atoms/avatar.test.tsx`

```tsx
import { render, screen } from '@testing-library/react-native';
import { Avatar, AvatarFallback, AvatarImage } from '../../src/atoms/avatar';

describe('Avatar', () => {
  it('shows the fallback initials while the image has not loaded', async () => {
    await render(
      <Avatar alt="Ravi Kumar" testID="av">
        <AvatarImage source={{ uri: 'https://example.com/a.png' }} />
        <AvatarFallback>RK</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByText('RK')).toBeOnTheScreen();
    expect(screen.getByTestId('av').props.className).toBe(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
    );
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/avatar.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement** — `packages/react-native/src/atoms/avatar.tsx`

```tsx
import * as AvatarPrimitive from '@rn-primitives/avatar';
import * as React from 'react';
import { cn } from '../lib/utils';
import { Text } from './text';

function Avatar({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return <AvatarPrimitive.Image className={cn('aspect-square h-full w-full', className)} {...props} />;
}

function AvatarFallback({ className, children, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  const content = typeof children === 'string' ? <Text>{children}</Text> : children;
  return (
    <AvatarPrimitive.Fallback
      className={cn('flex h-full w-full items-center justify-center rounded-full bg-muted', className)}
      {...props}>
      {content}
    </AvatarPrimitive.Fallback>
  );
}

export { Avatar, AvatarFallback, AvatarImage };
```

Append to `packages/react-native/src/index.ts`:
```ts
export * from './atoms/avatar';
```

- [ ] **Step 4: Run — expect PASS**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/avatar.test.tsx` → 1 passed.

- [ ] **Step 5: Catalog** — `apps/native-catalog/sections/DisplaySection.tsx` (Separator, Skeleton, Progress, Avatar)

```tsx
import { Avatar, AvatarFallback, AvatarImage, Progress, Separator, Skeleton, Text } from '@aumraa/breathe-native';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Section } from '../components/Section';

export function DisplaySection() {
  const [value, setValue] = useState(20);
  useEffect(() => {
    const id = setInterval(() => setValue((v) => (v >= 100 ? 10 : v + 30)), 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <Section title="Separator · Skeleton · Progress · Avatar">
      <Text className="text-sm">Above</Text>
      <Separator />
      <View className="h-6 flex-row items-center gap-3">
        <Text className="text-sm">Left</Text>
        <Separator orientation="vertical" />
        <Text className="text-sm">Right</Text>
      </View>
      <View className="gap-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </View>
      <Progress value={value} />
      <Progress value={66} className="h-1" />
      <View className="flex-row gap-3">
        <Avatar alt="Ravi Kumar">
          <AvatarImage source={{ uri: 'https://i.pravatar.cc/80?img=12' }} />
          <AvatarFallback>RK</AvatarFallback>
        </Avatar>
        <Avatar alt="No photo">
          <AvatarFallback>SM</AvatarFallback>
        </Avatar>
      </View>
    </Section>
  );
}
```

Register `{ key: 'display', Component: DisplaySection }`.

- [ ] **Step 6: Commit**

```bash
git add packages/react-native apps/native-catalog
git commit -m "feat(native): Avatar atom and display catalog"
```

---

### Task 17: Input and the focus ring

Reference: repo `ui/input.tsx`: `flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm`, `placeholder:text-muted-foreground`, `focus-visible:ring-2 ring-ring ring-offset-2`, `disabled:opacity-50`.

Native: the web `type` prop is kept and mapped to keyboard/autofill props (the repo uses `email`, `number`, `tel`; `password`, `search`, `url` are included for the auth screens). `type="date"` is not supported (§0.5). `disabled` is accepted like the web attribute. `leading-5` is added because a 24px line height mis-centres single-line text in native inputs (the text looks the same).

**Files:**
- Create: `packages/react-native/src/lib/use-focus-ring.ts`
- Create: `packages/react-native/src/atoms/form-elements/input.tsx`
- Modify: `packages/react-native/src/index.ts`
- Test: `packages/react-native/test/atoms/form-elements/input.test.tsx`
- Create: `apps/native-catalog/sections/InputSection.tsx`

- [ ] **Step 1: Write the failing test** — `packages/react-native/test/atoms/form-elements/input.test.tsx`

```tsx
import { fireEvent, render, screen } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import { Input } from '../../../src/atoms/form-elements/input';

const flat = (el: { props: { style: unknown } }) => StyleSheet.flatten(el.props.style as never) ?? {};

describe('Input', () => {
  it('uses the web input box, muted placeholder and body text', async () => {
    await render(<Input placeholder="Flat no." />);
    const input = screen.getByPlaceholderText('Flat no.');
    expect(input.props.className).toContain('h-10 w-full rounded-md border border-input bg-background px-3 py-2');
    expect(input.props.className).toContain('text-foreground');
    expect(input.props.placeholderTextColor).toBe('#424448');
  });

  it.each([
    ['email', { keyboardType: 'email-address', autoCapitalize: 'none', autoComplete: 'email' }],
    ['password', { secureTextEntry: true, autoCapitalize: 'none' }],
    ['number', { keyboardType: 'decimal-pad' }],
    ['tel', { keyboardType: 'phone-pad', autoComplete: 'tel' }],
    ['url', { keyboardType: 'url' }],
  ] as const)('maps type="%s" to native input props', async (type, expected) => {
    await render(<Input type={type} placeholder="x" />);
    expect(screen.getByPlaceholderText('x').props).toMatchObject(expected);
  });

  it('lets explicit props win over the type mapping', async () => {
    await render(<Input type="number" keyboardType="number-pad" placeholder="x" />);
    expect(screen.getByPlaceholderText('x').props.keyboardType).toBe('number-pad');
  });

  it('is read-only and dimmed when disabled', async () => {
    await render(<Input disabled placeholder="x" />);
    const input = screen.getByPlaceholderText('x');
    expect(input.props.editable).toBe(false);
    expect(input.props.className).toContain('opacity-50');
  });

  it('draws the ring outline only while focused and still calls onFocus/onBlur', async () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    await render(<Input placeholder="x" onFocus={onFocus} onBlur={onBlur} />);
    const input = screen.getByPlaceholderText('x');
    expect(flat(input).outlineWidth).toBeUndefined();

    await fireEvent(input, 'focus');
    expect(flat(screen.getByPlaceholderText('x'))).toMatchObject({
      outlineWidth: 2,
      outlineOffset: 2,
      outlineStyle: 'solid',
      outlineColor: '#1b60c0',
    });
    expect(onFocus).toHaveBeenCalledTimes(1);

    await fireEvent(screen.getByPlaceholderText('x'), 'blur');
    expect(flat(screen.getByPlaceholderText('x')).outlineWidth).toBeUndefined();
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('reports typed text', async () => {
    const onChangeText = jest.fn();
    await render(<Input placeholder="x" onChangeText={onChangeText} />);
    await fireEvent.changeText(screen.getByPlaceholderText('x'), 'A-101');
    expect(onChangeText).toHaveBeenCalledWith('A-101');
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/form-elements/input.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the focus ring** — `packages/react-native/src/lib/use-focus-ring.ts`

```ts
import * as React from 'react';
import type { TextInput, ViewStyle } from 'react-native';
import { useThemeColors } from './theme';

type InputProps = React.ComponentProps<typeof TextInput>;

/** Web focus-visible:ring-2 ring-ring ring-offset-2 as RN outline props (New Architecture). */
export function useFocusRing(onFocus?: InputProps['onFocus'], onBlur?: InputProps['onBlur']) {
  const [focused, setFocused] = React.useState(false);
  const { ring } = useThemeColors();

  const handleFocus: NonNullable<InputProps['onFocus']> = (e) => {
    setFocused(true);
    onFocus?.(e);
  };
  const handleBlur: NonNullable<InputProps['onBlur']> = (e) => {
    setFocused(false);
    onBlur?.(e);
  };

  const ringStyle: ViewStyle | undefined = focused
    ? { outlineWidth: 2, outlineOffset: 2, outlineStyle: 'solid', outlineColor: ring }
    : undefined;

  return { onFocus: handleFocus, onBlur: handleBlur, ringStyle };
}
```

- [ ] **Step 4: Implement Input** — `packages/react-native/src/atoms/form-elements/input.tsx`

```tsx
import * as React from 'react';
import { TextInput } from 'react-native';
import { useFocusRing } from '../../lib/use-focus-ring';
import { useThemeColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

type TextInputProps = React.ComponentProps<typeof TextInput>;

/** Web <input type> → native keyboard/autofill props. "date" is intentionally absent (use Calendar). */
const TYPE_PROPS = {
  text: {},
  email: { keyboardType: 'email-address', autoCapitalize: 'none', autoComplete: 'email', autoCorrect: false },
  password: { secureTextEntry: true, autoCapitalize: 'none', autoComplete: 'password', autoCorrect: false },
  number: { keyboardType: 'decimal-pad' },
  tel: { keyboardType: 'phone-pad', autoComplete: 'tel' },
  search: { returnKeyType: 'search' },
  url: { keyboardType: 'url', autoCapitalize: 'none', autoCorrect: false },
} satisfies Record<string, Partial<TextInputProps>>;

type InputType = keyof typeof TYPE_PROPS;

type InputProps = TextInputProps & { type?: InputType; disabled?: boolean };

function Input({ className, type = 'text', disabled, editable, onFocus, onBlur, style, ...props }: InputProps) {
  const colors = useThemeColors();
  const ring = useFocusRing(onFocus, onBlur);
  const isEditable = !disabled && editable !== false;

  return (
    <TextInput
      className={cn(
        'h-10 w-full rounded-md border border-input bg-background px-3 py-2 font-sans text-base leading-5 text-foreground md:text-sm',
        !isEditable && 'opacity-50',
        className,
      )}
      editable={isEditable}
      placeholderTextColor={colors.mutedForeground}
      onFocus={ring.onFocus}
      onBlur={ring.onBlur}
      style={[ring.ringStyle, style]}
      {...TYPE_PROPS[type]}
      {...props}
    />
  );
}

export { Input };
export type { InputProps, InputType };
```

Append to `packages/react-native/src/index.ts`:
```ts
export * from './atoms/form-elements/input';
```

- [ ] **Step 5: Run — expect PASS**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/form-elements/input.test.tsx && pnpm --filter @aumraa/breathe-native typecheck`
Expected: all pass; tsc 0.

- [ ] **Step 6: Catalog** — `apps/native-catalog/sections/InputSection.tsx`

```tsx
import { Input, Label, Textarea } from '@aumraa/breathe-native';
import { useRef } from 'react';
import { TextInput, View } from 'react-native';
import { Section } from '../components/Section';

export function InputSection() {
  const emailRef = useRef<TextInput>(null);
  return (
    <Section title="Input · Textarea">
      <View className="gap-2">
        <Label onPress={() => emailRef.current?.focus()}>Email</Label>
        <Input ref={emailRef} type="email" placeholder="you@society.in" />
      </View>
      <Input type="number" placeholder="Amount" />
      <Input type="tel" placeholder="Phone" />
      <Input type="password" placeholder="Password" />
      <Input disabled placeholder="Disabled" />
      <Textarea placeholder="Notes for the committee" />
      <Textarea disabled placeholder="Disabled notes" />
    </Section>
  );
}
```

This file imports `Textarea` from Task 18, so register `{ key: 'input', Component: InputSection }` only after Task 18 lands.

- [ ] **Step 7: Commit**

```bash
git add packages/react-native apps/native-catalog
git commit -m "feat(native): Input atom with type mapping and web focus ring"
```

---

### Task 18: Textarea

Reference: repo `ui/textarea.tsx`: `flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm`, placeholder, focus ring and disabled rules the same as Input.

**Files:**
- Create: `packages/react-native/src/atoms/form-elements/textarea.tsx`
- Modify: `packages/react-native/src/index.ts`, `apps/native-catalog/sections/index.ts`
- Test: `packages/react-native/test/atoms/form-elements/textarea.test.tsx`

- [ ] **Step 1: Write the failing test** — `packages/react-native/test/atoms/form-elements/textarea.test.tsx`

```tsx
import { fireEvent, render, screen } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import { Textarea } from '../../../src/atoms/form-elements/textarea';

describe('Textarea', () => {
  it('is a multiline, top-aligned web textarea box', async () => {
    await render(<Textarea placeholder="Notes" />);
    const el = screen.getByPlaceholderText('Notes');
    expect(el.props.multiline).toBe(true);
    expect(el.props.textAlignVertical).toBe('top');
    expect(el.props.className).toContain('min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2');
    expect(el.props.className).toContain('text-sm');
    expect(el.props.placeholderTextColor).toBe('#424448');
  });

  it('is read-only and dimmed when disabled', async () => {
    await render(<Textarea disabled placeholder="Notes" />);
    const el = screen.getByPlaceholderText('Notes');
    expect(el.props.editable).toBe(false);
    expect(el.props.className).toContain('opacity-50');
  });

  it('shows the focus ring while focused', async () => {
    await render(<Textarea placeholder="Notes" />);
    await fireEvent(screen.getByPlaceholderText('Notes'), 'focus');
    expect(StyleSheet.flatten(screen.getByPlaceholderText('Notes').props.style)).toMatchObject({ outlineWidth: 2 });
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/form-elements/textarea.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement** — `packages/react-native/src/atoms/form-elements/textarea.tsx`

```tsx
import * as React from 'react';
import { TextInput } from 'react-native';
import { useFocusRing } from '../../lib/use-focus-ring';
import { useThemeColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

type TextareaProps = React.ComponentProps<typeof TextInput> & { disabled?: boolean };

function Textarea({ className, disabled, editable, onFocus, onBlur, style, ...props }: TextareaProps) {
  const colors = useThemeColors();
  const ring = useFocusRing(onFocus, onBlur);
  const isEditable = !disabled && editable !== false;

  return (
    <TextInput
      multiline
      textAlignVertical="top"
      className={cn(
        'min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 font-sans text-sm text-foreground',
        !isEditable && 'opacity-50',
        className,
      )}
      editable={isEditable}
      placeholderTextColor={colors.mutedForeground}
      onFocus={ring.onFocus}
      onBlur={ring.onBlur}
      style={[ring.ringStyle, style]}
      {...props}
    />
  );
}

export { Textarea };
export type { TextareaProps };
```

Append to `packages/react-native/src/index.ts`:
```ts
export * from './atoms/form-elements/textarea';
```

- [ ] **Step 4: Run — expect PASS**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/form-elements/textarea.test.tsx` → 3 passed.

- [ ] **Step 5: Register the Input catalog section** — add `import { InputSection } from './InputSection';` and `{ key: 'input', Component: InputSection }` to `apps/native-catalog/sections/index.ts`. On device, check S11: focusing an input draws a 2px ring colour outline 2px outside the border, matching the web. If there's no outline, confirm the New Architecture is on (the SDK 56 default).

- [ ] **Step 6: Commit**

```bash
git add packages/react-native apps/native-catalog
git commit -m "feat(native): Textarea atom"
```

---

### Task 19: Checkbox

Reference: repo `ui/checkbox.tsx`: `h-4 w-4 shrink-0 rounded-[3px] border border-primary`, checked → `bg-primary text-primary-foreground`, `disabled:opacity-50`, Check icon. Structure: rnr `checkbox.tsx` (`@rn-primitives/checkbox`, 24px hit slop for touch). The icon is 14px so it fits inside the 1px border; lucide's built-in padding keeps the visible tick the same size as on web.

**Files:**
- Create: `packages/react-native/src/atoms/form-elements/checkbox.tsx`
- Modify: `packages/react-native/src/index.ts`
- Test: `packages/react-native/test/atoms/form-elements/checkbox.test.tsx`

- [ ] **Step 1: Write the failing test** — `packages/react-native/test/atoms/form-elements/checkbox.test.tsx`

```tsx
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Checkbox } from '../../../src/atoms/form-elements/checkbox';

describe('Checkbox', () => {
  it('is an empty primary-bordered box when unchecked', async () => {
    await render(<Checkbox testID="cb" checked={false} onCheckedChange={jest.fn()} />);
    expect(screen.getByTestId('cb').props.className).toContain('h-4 w-4 shrink-0 overflow-hidden rounded-[3px] border border-primary');
    expect(screen.getByTestId('cb').props.className).not.toContain('bg-primary');
    expect(screen.queryByTestId('icon-Check')).toBeNull();
  });

  it('fills and shows the tick when checked', async () => {
    await render(<Checkbox testID="cb" checked onCheckedChange={jest.fn()} />);
    expect(screen.getByTestId('cb').props.className).toContain('bg-primary');
    expect(screen.getByTestId('icon-Check').props.className).toContain('text-primary-foreground');
  });

  it('toggles on press', async () => {
    const onCheckedChange = jest.fn();
    await render(<Checkbox testID="cb" checked={false} onCheckedChange={onCheckedChange} />);
    await fireEvent.press(screen.getByTestId('cb'));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('is dimmed and inert when disabled', async () => {
    const onCheckedChange = jest.fn();
    await render(<Checkbox testID="cb" disabled checked={false} onCheckedChange={onCheckedChange} />);
    expect(screen.getByTestId('cb').props.className).toContain('opacity-50');
    await fireEvent.press(screen.getByTestId('cb'));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/form-elements/checkbox.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement** — `packages/react-native/src/atoms/form-elements/checkbox.tsx`

```tsx
import * as CheckboxPrimitive from '@rn-primitives/checkbox';
import { Check } from 'lucide-react-native';
import * as React from 'react';
import { cn } from '../../lib/utils';
import { Icon } from '../icon';

type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root>;

function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      hitSlop={24}
      className={cn(
        'h-4 w-4 shrink-0 overflow-hidden rounded-[3px] border border-primary',
        props.checked && 'bg-primary',
        props.disabled && 'opacity-50',
        className,
      )}
      {...props}>
      <CheckboxPrimitive.Indicator className="h-full w-full items-center justify-center">
        <Icon as={Check} size={14} className="text-primary-foreground" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
export type { CheckboxProps };
```

Append to `packages/react-native/src/index.ts`:
```ts
export * from './atoms/form-elements/checkbox';
```

- [ ] **Step 4: Run — expect PASS**, then **Step 5: Commit**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/form-elements/checkbox.test.tsx` → 4 passed.

```bash
git add packages/react-native
git commit -m "feat(native): Checkbox atom"
```

---

### Task 20: RadioGroup

Reference: repo `ui/radio-group.tsx`. Root `grid gap-2` → `gap-2`; Item `aspect-square h-4 w-4 rounded-full border border-primary`, `disabled:opacity-50`; Indicator = filled circle `h-2.5 w-2.5` in primary.

**Files:**
- Create: `packages/react-native/src/atoms/form-elements/radio-group.tsx`
- Modify: `packages/react-native/src/index.ts`
- Test: `packages/react-native/test/atoms/form-elements/radio-group.test.tsx`

- [ ] **Step 1: Write the failing test** — `packages/react-native/test/atoms/form-elements/radio-group.test.tsx`

```tsx
import { fireEvent, render, screen } from '@testing-library/react-native';
import { RadioGroup, RadioGroupItem } from '../../../src/atoms/form-elements/radio-group';

function Plans(props: { value: string; onValueChange: (v: string) => void }) {
  return (
    <RadioGroup value={props.value} onValueChange={props.onValueChange}>
      <RadioGroupItem testID="monthly" value="monthly" aria-labelledby="monthly-label" />
      <RadioGroupItem testID="yearly" value="yearly" aria-labelledby="yearly-label" />
    </RadioGroup>
  );
}

describe('RadioGroup', () => {
  it('renders the web radio ring', async () => {
    await render(<Plans value="monthly" onValueChange={jest.fn()} />);
    expect(screen.getByTestId('yearly').props.className).toContain(
      'aspect-square h-4 w-4 shrink-0 items-center justify-center rounded-full border border-primary',
    );
  });

  it('shows exactly one indicator, on the selected item', async () => {
    await render(<Plans value="monthly" onValueChange={jest.fn()} />);
    expect(screen.getAllByTestId('radio-indicator')).toHaveLength(1);
  });

  it('selects an item on press', async () => {
    const onValueChange = jest.fn();
    await render(<Plans value="monthly" onValueChange={onValueChange} />);
    await fireEvent.press(screen.getByTestId('yearly'));
    expect(onValueChange).toHaveBeenCalledWith('yearly');
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/form-elements/radio-group.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement** — `packages/react-native/src/atoms/form-elements/radio-group.tsx`

```tsx
import * as RadioGroupPrimitive from '@rn-primitives/radio-group';
import * as React from 'react';
import { cn } from '../../lib/utils';

function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root className={cn('gap-2', className)} {...props} />;
}

function RadioGroupItem({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      hitSlop={24}
      className={cn(
        'aspect-square h-4 w-4 shrink-0 items-center justify-center rounded-full border border-primary',
        props.disabled && 'opacity-50',
        className,
      )}
      {...props}>
      <RadioGroupPrimitive.Indicator testID="radio-indicator" className="h-2.5 w-2.5 rounded-full bg-primary" />
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
```

Append to `packages/react-native/src/index.ts`:
```ts
export * from './atoms/form-elements/radio-group';
```

- [ ] **Step 4: Run — expect PASS**, then **Step 5: Commit**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/form-elements/radio-group.test.tsx` → 3 passed.

```bash
git add packages/react-native
git commit -m "feat(native): RadioGroup atom"
```

---

### Task 21: Switch

Reference: repo `ui/switch.tsx`. Track `h-6 w-11 rounded-full border-2 border-transparent`, `bg-primary` when checked and `bg-input` when not, `disabled:opacity-50`. Thumb `h-5 w-5 rounded-full bg-background shadow-lg`, slides 20px (`translate-x-5`) with Tailwind's default transition (150ms, `cubic-bezier(0.4, 0, 0.2, 1)`).

**Files:**
- Create: `packages/react-native/src/atoms/form-elements/switch.tsx`
- Modify: `packages/react-native/src/index.ts`
- Test: `packages/react-native/test/atoms/form-elements/switch.test.tsx`

- [ ] **Step 1: Write the failing test** — `packages/react-native/test/atoms/form-elements/switch.test.tsx`

```tsx
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Switch } from '../../../src/atoms/form-elements/switch';

describe('Switch', () => {
  it('uses the input colour when off and primary when on', async () => {
    const { rerender } = await render(<Switch testID="sw" checked={false} onCheckedChange={jest.fn()} />);
    expect(screen.getByTestId('sw').props.className).toContain('bg-input');
    await rerender(<Switch testID="sw" checked onCheckedChange={jest.fn()} />);
    expect(screen.getByTestId('sw').props.className).toContain('bg-primary');
  });

  it('has the web track and thumb geometry', async () => {
    await render(<Switch testID="sw" checked={false} onCheckedChange={jest.fn()} />);
    expect(screen.getByTestId('sw').props.className).toContain('h-6 w-11 shrink-0 flex-row items-center rounded-full border-2 border-transparent');
    expect(screen.getByTestId('switch-thumb').props.className).toBe('h-5 w-5 rounded-full bg-background shadow-lg');
  });

  it('toggles on press and is inert when disabled', async () => {
    const onCheckedChange = jest.fn();
    const { rerender } = await render(<Switch testID="sw" checked={false} onCheckedChange={onCheckedChange} />);
    await fireEvent.press(screen.getByTestId('sw'));
    expect(onCheckedChange).toHaveBeenCalledWith(true);

    onCheckedChange.mockClear();
    await rerender(<Switch testID="sw" disabled checked={false} onCheckedChange={onCheckedChange} />);
    await fireEvent.press(screen.getByTestId('sw'));
    expect(onCheckedChange).not.toHaveBeenCalled();
    expect(screen.getByTestId('sw').props.className).toContain('opacity-50');
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/form-elements/switch.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement** — `packages/react-native/src/atoms/form-elements/switch.tsx`

```tsx
import * as SwitchPrimitives from '@rn-primitives/switch';
import * as React from 'react';
import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { cn } from '../../lib/utils';

// Tailwind default transition: 150ms cubic-bezier(0.4, 0, 0.2, 1); web translate-x-5 = 20px
const SLIDE = { duration: 150, easing: Easing.bezier(0.4, 0, 0.2, 1) };

type SwitchProps = React.ComponentProps<typeof SwitchPrimitives.Root>;

function Switch({ className, ...props }: SwitchProps) {
  const thumb = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(props.checked ? 20 : 0, SLIDE) }],
  }));

  return (
    <SwitchPrimitives.Root
      className={cn(
        'h-6 w-11 shrink-0 flex-row items-center rounded-full border-2 border-transparent',
        props.checked ? 'bg-primary' : 'bg-input',
        props.disabled && 'opacity-50',
        className,
      )}
      {...props}>
      <Animated.View testID="switch-thumb" className="h-5 w-5 rounded-full bg-background shadow-lg" style={thumb} />
    </SwitchPrimitives.Root>
  );
}

export { Switch };
export type { SwitchProps };
```

Append to `packages/react-native/src/index.ts`:
```ts
export * from './atoms/form-elements/switch';
```

- [ ] **Step 4: Run — expect PASS**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/form-elements/switch.test.tsx` → 3 passed.

- [ ] **Step 5: Catalog** — `apps/native-catalog/sections/ChoiceSection.tsx` (Checkbox, RadioGroup, Switch)

```tsx
import { Checkbox, Label, RadioGroup, RadioGroupItem, Switch } from '@aumraa/breathe-native';
import { useState } from 'react';
import { View } from 'react-native';
import { Section } from '../components/Section';

export function ChoiceSection() {
  const [agree, setAgree] = useState(true);
  const [plan, setPlan] = useState('monthly');
  const [notify, setNotify] = useState(false);
  return (
    <Section title="Checkbox · RadioGroup · Switch">
      <View className="flex-row items-center gap-2">
        <Checkbox checked={agree} onCheckedChange={setAgree} />
        <Label onPress={() => setAgree(!agree)}>Accept terms</Label>
      </View>
      <View className="flex-row items-center gap-2">
        <Checkbox checked={false} disabled onCheckedChange={() => {}} />
        <Label disabled>Disabled</Label>
      </View>
      <RadioGroup value={plan} onValueChange={setPlan}>
        {['monthly', 'yearly'].map((v) => (
          <View key={v} className="flex-row items-center gap-2">
            <RadioGroupItem value={v} aria-labelledby={`plan-${v}`} />
            <Label nativeID={`plan-${v}`} onPress={() => setPlan(v)}>{v}</Label>
          </View>
        ))}
      </RadioGroup>
      <View className="flex-row items-center gap-2">
        <Switch checked={notify} onCheckedChange={setNotify} />
        <Label onPress={() => setNotify(!notify)}>Payment reminders</Label>
      </View>
    </Section>
  );
}
```

Register `{ key: 'choice', Component: ChoiceSection }`.

- [ ] **Step 6: Commit**

```bash
git add packages/react-native apps/native-catalog
git commit -m "feat(native): Switch atom with animated thumb and choice catalog"
```

---

### Task 22: Toggle

Reference: repo `ui/toggle.tsx`. Base `inline-flex items-center justify-center rounded-md text-sm font-medium`, `hover:bg-muted` (→ `active:bg-muted`, R6), on-state `bg-accent text-accent-foreground`, `disabled:opacity-50`. Variants: `default` = `bg-transparent`; `outline` = `border border-input bg-transparent` + `hover:bg-accent` (→ `active:bg-accent`). Sizes: `default` = `h-10 px-3`; `sm` = `h-9 px-2.5`; `lg` = `h-11 px-5`.

**Files:**
- Create: `packages/react-native/src/atoms/form-elements/toggle.tsx`
- Modify: `packages/react-native/src/index.ts`
- Test: `packages/react-native/test/atoms/form-elements/toggle.test.tsx`

- [ ] **Step 1: Write the failing test** — `packages/react-native/test/atoms/form-elements/toggle.test.tsx`

```tsx
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Toggle, toggleTextClass, toggleVariants } from '../../../src/atoms/form-elements/toggle';

describe('toggleVariants (parity with web toggle.tsx)', () => {
  it.each([
    [{}, 'h-10 px-3', 'bg-transparent'],
    [{ size: 'sm' as const }, 'h-9 px-2.5', 'bg-transparent'],
    [{ size: 'lg' as const }, 'h-11 px-5', 'bg-transparent'],
    [{ variant: 'outline' as const }, 'h-10 px-3', 'border border-input bg-transparent'],
  ])('%p', (args, size, variant) => {
    const cls = toggleVariants(args);
    expect(cls).toContain(size);
    expect(cls).toContain(variant);
    expect(cls).toContain('rounded-md');
  });

  it('switches text to accent-foreground when on', () => {
    expect(toggleTextClass(false)).toBe('text-sm font-medium text-foreground');
    expect(toggleTextClass(true)).toBe('text-sm font-medium text-accent-foreground');
  });
});

describe('Toggle', () => {
  it('fills with accent when pressed-on and reports changes', async () => {
    const onPressedChange = jest.fn();
    await render(
      <Toggle testID="t" pressed onPressedChange={onPressedChange} aria-label="Bold">
        B
      </Toggle>,
    );
    expect(screen.getByTestId('t').props.className).toContain('bg-accent');
    expect(screen.getByText('B').props.className).toContain('text-accent-foreground');
    await fireEvent.press(screen.getByTestId('t'));
    expect(onPressedChange).toHaveBeenCalledWith(false);
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/form-elements/toggle.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement** — `packages/react-native/src/atoms/form-elements/toggle.tsx`

```tsx
import * as TogglePrimitive from '@rn-primitives/toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../lib/utils';
import { Text, TextClassContext } from '../text';

const toggleVariants = cva('flex-row items-center justify-center gap-2 rounded-md active:bg-muted', {
  variants: {
    variant: {
      default: 'bg-transparent',
      outline: 'border border-input bg-transparent active:bg-accent',
    },
    size: {
      default: 'h-10 px-3',
      sm: 'h-9 px-2.5',
      lg: 'h-11 px-5',
    },
  },
  defaultVariants: { variant: 'default', size: 'default' },
});

function toggleTextClass(on: boolean) {
  return cn('text-sm font-medium text-foreground', on && 'text-accent-foreground');
}

type ToggleProps = React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>;

function Toggle({ className, variant, size, children, ...props }: ToggleProps) {
  const content = typeof children === 'string' ? <Text>{children}</Text> : children;
  return (
    <TextClassContext.Provider value={toggleTextClass(!!props.pressed)}>
      <TogglePrimitive.Root
        className={cn(
          toggleVariants({ variant, size }),
          props.pressed && 'bg-accent',
          props.disabled && 'opacity-50',
          className,
        )}
        {...props}>
        {content}
      </TogglePrimitive.Root>
    </TextClassContext.Provider>
  );
}

export { Toggle, toggleTextClass, toggleVariants };
export type { ToggleProps };
```

Append to `packages/react-native/src/index.ts`:
```ts
export * from './atoms/form-elements/toggle';
```

- [ ] **Step 4: Run — expect PASS**, then **Step 5: Commit**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/form-elements/toggle.test.tsx` → all pass.

```bash
git add packages/react-native
git commit -m "feat(native): Toggle atom"
```

---

### Task 23: ToggleGroup

Reference: repo `ui/toggle-group.tsx`. Root `flex items-center justify-center gap-1`. Items reuse `toggleVariants`, with the group's variant/size taking precedence (context defaults `{ variant: 'default', size: 'default' }`). Unlike rnr, the repo keeps items separate (each `rounded-md`, `gap-1`), not joined.

**Files:**
- Create: `packages/react-native/src/atoms/form-elements/toggle-group.tsx`
- Modify: `packages/react-native/src/index.ts`
- Test: `packages/react-native/test/atoms/form-elements/toggle-group.test.tsx`

- [ ] **Step 1: Write the failing test** — `packages/react-native/test/atoms/form-elements/toggle-group.test.tsx`

```tsx
import { fireEvent, render, screen } from '@testing-library/react-native';
import { ToggleGroup, ToggleGroupItem } from '../../../src/atoms/form-elements/toggle-group';

function Period({ value, onValueChange }: { value: string; onValueChange: (v: string | undefined) => void }) {
  return (
    <ToggleGroup testID="group" type="single" variant="outline" value={value} onValueChange={onValueChange}>
      <ToggleGroupItem testID="month" value="month" aria-label="Month">Month</ToggleGroupItem>
      <ToggleGroupItem testID="year" value="year" aria-label="Year">Year</ToggleGroupItem>
    </ToggleGroup>
  );
}

describe('ToggleGroup', () => {
  it('lays items out like the web group', async () => {
    await render(<Period value="month" onValueChange={jest.fn()} />);
    expect(screen.getByTestId('group').props.className).toBe('flex-row items-center justify-center gap-1');
  });

  it('passes the group variant to items and highlights the selected one', async () => {
    await render(<Period value="month" onValueChange={jest.fn()} />);
    expect(screen.getByTestId('year').props.className).toContain('border border-input');
    expect(screen.getByTestId('month').props.className).toContain('bg-accent');
    expect(screen.getByTestId('year').props.className).not.toContain('bg-accent');
    expect(screen.getByText('Month').props.className).toContain('text-accent-foreground');
  });

  it('selects on press', async () => {
    const onValueChange = jest.fn();
    await render(<Period value="month" onValueChange={onValueChange} />);
    await fireEvent.press(screen.getByTestId('year'));
    expect(onValueChange).toHaveBeenCalledWith('year');
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/form-elements/toggle-group.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement** — `packages/react-native/src/atoms/form-elements/toggle-group.tsx`

```tsx
import * as ToggleGroupPrimitive from '@rn-primitives/toggle-group';
import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../lib/utils';
import { Text, TextClassContext } from '../text';
import { toggleTextClass, toggleVariants } from './toggle';

type ToggleVariantProps = VariantProps<typeof toggleVariants>;

const ToggleGroupContext = React.createContext<ToggleVariantProps>({ size: 'default', variant: 'default' });

function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> & ToggleVariantProps) {
  return (
    <ToggleGroupPrimitive.Root className={cn('flex-row items-center justify-center gap-1', className)} {...props}>
      <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> & ToggleVariantProps) {
  const context = React.useContext(ToggleGroupContext);
  const { value } = ToggleGroupPrimitive.useRootContext();
  const selected = ToggleGroupPrimitive.utils.getIsSelected(value, props.value);
  const content = typeof children === 'string' ? <Text>{children}</Text> : children;

  return (
    <TextClassContext.Provider value={toggleTextClass(selected)}>
      <ToggleGroupPrimitive.Item
        className={cn(
          toggleVariants({ variant: context.variant || variant, size: context.size || size }),
          selected && 'bg-accent',
          props.disabled && 'opacity-50',
          className,
        )}
        {...props}>
        {content}
      </ToggleGroupPrimitive.Item>
    </TextClassContext.Provider>
  );
}

export { ToggleGroup, ToggleGroupItem };
```

Append to `packages/react-native/src/index.ts`:
```ts
export * from './atoms/form-elements/toggle-group';
```

- [ ] **Step 4: Run — expect PASS**, then **Step 5: Commit**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/form-elements/toggle-group.test.tsx` → 3 passed.

```bash
git add packages/react-native
git commit -m "feat(native): ToggleGroup atom"
```

---

### Task 24: Slider

Reference: repo `ui/slider.tsx` (Radix): track `h-2 rounded-full bg-secondary`, range `bg-primary`, 20px white thumb with a 2px primary border, `disabled:opacity-50`. Native uses `@react-native-community/slider` (Fact 8). The web API is kept (`value: number[]`, `onValueChange(number[])`, `min`, `max`, `step`) so screens port 1:1; only the first thumb is supported. Thumb look: iOS keeps its native white thumb (closest to web); Android is tinted primary (§0.5).

**Files:**
- Create: `packages/react-native/src/atoms/form-elements/slider.tsx`
- Modify: `packages/react-native/src/index.ts`
- Test: `packages/react-native/test/atoms/form-elements/slider.test.tsx`

- [ ] **Step 1: Write the failing test** — `packages/react-native/test/atoms/form-elements/slider.test.tsx`

```tsx
import { render, screen } from '@testing-library/react-native';
import { Slider } from '../../../src/atoms/form-elements/slider';

jest.mock('@react-native-community/slider', () => {
  const mockReact = require('react');
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: (props: object) => mockReact.createElement(View, { testID: 'native-slider', ...props }),
  };
});

describe('Slider', () => {
  it('maps the web array API and theme colours onto the native slider', async () => {
    await render(<Slider value={[40]} min={0} max={200} step={5} />);
    const native = screen.getByTestId('native-slider');
    expect(native.props).toMatchObject({
      value: 40,
      minimumValue: 0,
      maximumValue: 200,
      step: 5,
      minimumTrackTintColor: '#1b60c0',
      maximumTrackTintColor: '#f2f2f3',
    });
  });

  it('reports values as an array, like Radix', async () => {
    const onValueChange = jest.fn();
    await render(<Slider value={[40]} onValueChange={onValueChange} />);
    screen.getByTestId('native-slider').props.onValueChange(55);
    expect(onValueChange).toHaveBeenCalledWith([55]);
  });

  it('dims and disables', async () => {
    await render(<Slider value={[10]} disabled />);
    const native = screen.getByTestId('native-slider');
    expect(native.props.disabled).toBe(true);
    expect(native.props.className).toContain('opacity-50');
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/form-elements/slider.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement** — `packages/react-native/src/atoms/form-elements/slider.tsx`

```tsx
import NativeSlider from '@react-native-community/slider';
import * as React from 'react';
import { Platform } from 'react-native';
import { useThemeColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

type SliderProps = {
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  onValueCommit?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
  accessibilityLabel?: string;
};

/** Web Radix API (arrays), one thumb, backed by the native OS slider. */
function Slider({
  value,
  defaultValue,
  onValueChange,
  onValueCommit,
  min = 0,
  max = 100,
  step = 1,
  disabled,
  className,
  accessibilityLabel,
}: SliderProps) {
  const colors = useThemeColors();
  return (
    <NativeSlider
      className={cn('h-5 w-full', disabled && 'opacity-50', className)}
      value={(value ?? defaultValue)?.[0] ?? min}
      minimumValue={min}
      maximumValue={max}
      step={step}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel}
      minimumTrackTintColor={colors.primary}
      maximumTrackTintColor={colors.secondary}
      thumbTintColor={Platform.OS === 'android' ? colors.primary : undefined}
      onValueChange={(v) => onValueChange?.([v])}
      onSlidingComplete={(v) => onValueCommit?.([v])}
    />
  );
}

export { Slider };
export type { SliderProps };
```

Append to `packages/react-native/src/index.ts`:
```ts
export * from './atoms/form-elements/slider';
```

- [ ] **Step 4: Run — expect PASS**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/form-elements/slider.test.tsx && pnpm --filter @aumraa/breathe-native typecheck` → all pass.

- [ ] **Step 5: Catalog** — `apps/native-catalog/sections/ToggleSection.tsx` (Toggle, ToggleGroup, Slider)

```tsx
import { Icon, Slider, Text, Toggle, ToggleGroup, ToggleGroupItem } from '@aumraa/breathe-native';
import { Bold } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';
import { Section } from '../components/Section';

export function ToggleSection() {
  const [bold, setBold] = useState(false);
  const [period, setPeriod] = useState<string | undefined>('month');
  const [amount, setAmount] = useState([40]);
  return (
    <Section title="Toggle · ToggleGroup · Slider">
      <View className="flex-row gap-2">
        <Toggle pressed={bold} onPressedChange={setBold} aria-label="Bold">
          <Icon as={Bold} />
        </Toggle>
        <Toggle variant="outline" pressed={bold} onPressedChange={setBold}>Outline</Toggle>
        <Toggle size="sm" pressed={false} onPressedChange={() => {}}>sm</Toggle>
        <Toggle size="lg" pressed={false} disabled onPressedChange={() => {}}>lg</Toggle>
      </View>
      <ToggleGroup type="single" variant="outline" value={period} onValueChange={setPeriod}>
        <ToggleGroupItem value="week" aria-label="Week">Week</ToggleGroupItem>
        <ToggleGroupItem value="month" aria-label="Month">Month</ToggleGroupItem>
        <ToggleGroupItem value="year" aria-label="Year">Year</ToggleGroupItem>
      </ToggleGroup>
      <Slider value={amount} onValueChange={setAmount} />
      <Text className="text-sm">Value: {amount[0]}</Text>
      <Slider value={[70]} disabled />
    </Section>
  );
}
```

Register `{ key: 'toggle', Component: ToggleSection }`.

- [ ] **Step 6: Commit**

```bash
git add packages/react-native apps/native-catalog
git commit -m "feat(native): Slider atom and toggle catalog"
```

---

### Task 25: Select

Reference: repo `ui/select.tsx`. Trigger `flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm`, `disabled:opacity-50`, ChevronDown `h-4 w-4 opacity-50`. Content `relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md` with `p-1` viewport and fade/zoom animation. Label `py-1.5 pl-8 pr-2 text-sm font-semibold`. Item `relative w-full items-center rounded-sm py-1.5 pl-8 pr-2 text-sm`, `focus:bg-accent focus:text-accent-foreground` (→ `active:`, R6), check indicator on the **left** (`absolute left-2 h-3.5 w-3.5`). Separator `-mx-1 my-1 h-px bg-muted`.

Structure: rnr `select.tsx` (portal, iOS `FullWindowOverlay`, Reanimated fade). Web quirk kept: the trigger's `placeholder:text-muted-foreground` never reaches Radix's placeholder span, so the web placeholder renders in `foreground`, and so does ours. `min-w-[8rem]` → `min-w-[128px]` (R3). The app must render `<PortalHost />` once at the root (the catalog already does, Task 5).

**Files:**
- Create: `packages/react-native/src/lib/native-only-animated-view.tsx`
- Create: `packages/react-native/src/atoms/form-elements/select.tsx`
- Modify: `packages/react-native/src/index.ts`
- Test: `packages/react-native/test/atoms/form-elements/select.test.tsx`
- Create: `apps/native-catalog/sections/SelectSection.tsx`

- [ ] **Step 1: Write the failing test** — `packages/react-native/test/atoms/form-elements/select.test.tsx`

```tsx
import { PortalHost } from '@rn-primitives/portal';
import { fireEvent, render, screen } from '@testing-library/react-native';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../../src/atoms/form-elements/select';

jest.mock('react-native-screens', () => {
  const mockReact = require('react');
  return { FullWindowOverlay: ({ children }: { children: unknown }) => mockReact.createElement(mockReact.Fragment, null, children) };
});

function Frequency({ onValueChange }: { onValueChange: jest.Mock }) {
  return (
    <>
      <Select onValueChange={onValueChange}>
        <SelectTrigger testID="trigger">
          <SelectValue placeholder="Select frequency" />
        </SelectTrigger>
        <SelectContent>
          <SelectLabel>Billing</SelectLabel>
          <SelectItem value="monthly" label="Monthly" />
          <SelectItem value="yearly" label="Yearly" />
        </SelectContent>
      </Select>
      <PortalHost />
    </>
  );
}

describe('Select', () => {
  it('renders the web trigger with the placeholder', async () => {
    await render(<Frequency onValueChange={jest.fn()} />);
    expect(screen.getByTestId('trigger').props.className).toContain(
      'h-10 w-full flex-row items-center justify-between rounded-md border border-input bg-background px-3 py-2',
    );
    expect(screen.getByText('Select frequency')).toBeOnTheScreen();
    expect(screen.getByTestId('icon-ChevronDown').props.className).toContain('opacity-50');
  });

  it('opens on press and reports the chosen option', async () => {
    const onValueChange = jest.fn();
    await render(<Frequency onValueChange={onValueChange} />);
    await fireEvent.press(screen.getByTestId('trigger'));
    expect(screen.getByText('Billing')).toBeOnTheScreen();
    await fireEvent.press(screen.getByText('Yearly'));
    expect(onValueChange).toHaveBeenCalledWith({ value: 'yearly', label: 'Yearly' });
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/form-elements/select.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Copy rnr's helper** — `packages/react-native/src/lib/native-only-animated-view.tsx`

```tsx
import * as React from 'react';
import { Platform, Pressable } from 'react-native';
import Animated from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/** From react-native-reusables: animates on native, renders children as-is on web. */
function NativeOnlyAnimatedView(
  props:
    | (React.ComponentProps<typeof Animated.View> & { as?: 'View' })
    | (React.ComponentProps<typeof AnimatedPressable> & { as: 'Pressable' }),
) {
  if (Platform.OS === 'web') {
    return <>{props.children as React.ReactNode}</>;
  }
  if (props.as === 'Pressable') {
    return <AnimatedPressable {...props} />;
  }
  return <Animated.View {...props} />;
}

export { NativeOnlyAnimatedView };
```

- [ ] **Step 4: Implement** — `packages/react-native/src/atoms/form-elements/select.tsx`

```tsx
import * as SelectPrimitive from '@rn-primitives/select';
import { Check, ChevronDown } from 'lucide-react-native';
import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { FadeIn, FadeOut, ReduceMotion } from 'react-native-reanimated';
import { FullWindowOverlay as RNFullWindowOverlay } from 'react-native-screens';
import { NativeOnlyAnimatedView } from '../../lib/native-only-animated-view';
import { cn } from '../../lib/utils';
import { Icon } from '../icon';
import { TextClassContext } from '../text';

type Option = SelectPrimitive.Option;

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;

function SelectValue({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Value> & { className?: string }) {
  // Web renders the placeholder in foreground too (see task note).
  return <SelectPrimitive.Value className={cn('font-sans text-sm text-foreground', className)} numberOfLines={1} {...props} />;
}

function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & { children?: React.ReactNode }) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        'h-10 w-full flex-row items-center justify-between rounded-md border border-input bg-background px-3 py-2',
        props.disabled && 'opacity-50',
        className,
      )}
      {...props}>
      <>{children}</>
      <Icon as={ChevronDown} size={16} className="opacity-50" />
    </SelectPrimitive.Trigger>
  );
}

const FullWindowOverlay = Platform.OS === 'ios' ? RNFullWindowOverlay : React.Fragment;

function SelectContent({
  className,
  children,
  position = 'popper',
  portalHost,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content> & { className?: string; portalHost?: string }) {
  return (
    <SelectPrimitive.Portal hostName={portalHost}>
      <FullWindowOverlay>
        <SelectPrimitive.Overlay style={StyleSheet.absoluteFill} asChild>
          <NativeOnlyAnimatedView
            className="z-50"
            entering={FadeIn.reduceMotion(ReduceMotion.System)}
            exiting={FadeOut.reduceMotion(ReduceMotion.System)}
            as="Pressable">
            <TextClassContext.Provider value="text-popover-foreground">
              <SelectPrimitive.Content
                className={cn(
                  'relative z-50 max-h-96 min-w-[128px] overflow-hidden rounded-md border border-border bg-popover shadow-md',
                  className,
                )}
                position={position}
                {...props}>
                <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
              </SelectPrimitive.Content>
            </TextClassContext.Provider>
          </NativeOnlyAnimatedView>
        </SelectPrimitive.Overlay>
      </FullWindowOverlay>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      className={cn('py-1.5 pl-8 pr-2 font-sans text-sm font-semibold text-popover-foreground', className)}
      {...props}
    />
  );
}

function SelectItem({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={cn(
        'group relative w-full flex-row items-center rounded-sm py-1.5 pl-8 pr-2 active:bg-accent',
        props.disabled && 'opacity-50',
        className,
      )}
      {...props}>
      <View className="absolute left-2 h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Icon as={Check} size={16} />
        </SelectPrimitive.ItemIndicator>
      </View>
      <SelectPrimitive.ItemText className="font-sans text-sm text-popover-foreground group-active:text-accent-foreground" />
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return <SelectPrimitive.Separator className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />;
}

export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue };
export type { Option };
```

Append to `packages/react-native/src/index.ts`:
```ts
export * from './atoms/form-elements/select';
```

- [ ] **Step 5: Run — expect PASS**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/form-elements/select.test.tsx && pnpm --filter @aumraa/breathe-native typecheck`
Expected: 2 passed; tsc 0. If the open test cannot find `Billing`, confirm `<PortalHost />` is rendered **after** the `Select` in the tree.

- [ ] **Step 6: Catalog** — `apps/native-catalog/sections/SelectSection.tsx`

```tsx
import { Select, SelectContent, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue, Text, type Option } from '@aumraa/breathe-native';
import { useState } from 'react';
import { Section } from '../components/Section';

export function SelectSection() {
  const [value, setValue] = useState<Option>();
  return (
    <Section title="Select">
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger>
          <SelectValue placeholder="Payment frequency" />
        </SelectTrigger>
        <SelectContent>
          <SelectLabel>Frequency</SelectLabel>
          <SelectItem value="monthly" label="Monthly" />
          <SelectItem value="quarterly" label="Quarterly" />
          <SelectSeparator />
          <SelectItem value="yearly" label="Yearly" />
          <SelectItem value="custom" label="Custom" disabled />
        </SelectContent>
      </Select>
      <Text className="text-sm">Chosen: {value?.label ?? '—'}</Text>
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Disabled" />
        </SelectTrigger>
      </Select>
    </Section>
  );
}
```

Register `{ key: 'select', Component: SelectSection }`.

- [ ] **Step 7: Device check S12.** Open the select and tap an item: the row flashes accent, the text turns `accent-foreground`, the value is chosen and the list closes. If taps don't select, `group-active:` on `ItemText` is hitting nativewind#1583. Remove `group-active:text-accent-foreground` (the background still gives feedback) and record the change in §0.5.

- [ ] **Step 8: Commit**

```bash
git add packages/react-native apps/native-catalog
git commit -m "feat(native): Select atom on rn-primitives with Leminiscate styling"
```

---

### Task 26: InputOTP

Reference: repo `ui/input-otp.tsx` (the `input-otp` library, which doesn't run on native). Rebuilt with the same compound API: `InputOTP` (`maxLength`, `value`, `onChange`, `onComplete`, `disabled`, `containerClassName`), `InputOTPGroup`, `InputOTPSlot index`, `InputOTPSeparator`. One transparent `TextInput` covers the slots and receives the typing, and the slots draw the characters. Slot classes: `relative h-10 w-10 items-center justify-center border-y border-r border-input text-sm`, the first slot adds `rounded-l-md border-l`, the last adds `rounded-r-md`, the active slot adds `z-10 ring-2 ring-ring` (→ outline 2px, offset 0). The caret is static (§0.5). The separator is a 24px lucide `Dot`, as on web.

**Files:**
- Create: `packages/react-native/src/atoms/form-elements/input-otp.tsx`
- Modify: `packages/react-native/src/index.ts`
- Test: `packages/react-native/test/atoms/form-elements/input-otp.test.tsx`
- Create: `apps/native-catalog/sections/OtpSection.tsx`

- [ ] **Step 1: Write the failing test** — `packages/react-native/test/atoms/form-elements/input-otp.test.tsx`

```tsx
import { fireEvent, render, screen } from '@testing-library/react-native';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '../../../src/atoms/form-elements/input-otp';

function Code(props: { onComplete?: (v: string) => void; disabled?: boolean }) {
  const [value, setValue] = React.useState('');
  return (
    <InputOTP testID="otp" maxLength={4} value={value} onChange={setValue} {...props}>
      <InputOTPGroup>
        <InputOTPSlot testID="slot-0" index={0} />
        <InputOTPSlot testID="slot-1" index={1} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot testID="slot-2" index={2} />
        <InputOTPSlot testID="slot-3" index={3} />
      </InputOTPGroup>
    </InputOTP>
  );
}

describe('InputOTP', () => {
  it('uses a numeric one-time-code field limited to maxLength', async () => {
    await render(<Code />);
    const input = screen.getByTestId('otp');
    expect(input.props).toMatchObject({ maxLength: 4, keyboardType: 'number-pad', textContentType: 'oneTimeCode', autoComplete: 'sms-otp' });
  });

  it('shows typed characters in the slots', async () => {
    await render(<Code />);
    await fireEvent.changeText(screen.getByTestId('otp'), '42');
    expect(screen.getByText('4')).toBeOnTheScreen();
    expect(screen.getByText('2')).toBeOnTheScreen();
  });

  it('rounds the outer corners of each group, like :first-child / :last-child on web', async () => {
    await render(<Code />);
    expect(screen.getByTestId('slot-0').props.className).toContain('rounded-l-md border-l');
    expect(screen.getByTestId('slot-1').props.className).toContain('rounded-r-md');
    expect(screen.getByTestId('slot-1').props.className).not.toContain('border-l');
  });

  it('rings the next empty slot while focused', async () => {
    await render(<Code />);
    await fireEvent(screen.getByTestId('otp'), 'focus');
    await fireEvent.changeText(screen.getByTestId('otp'), '4');
    expect(StyleSheet.flatten(screen.getByTestId('slot-1').props.style)).toMatchObject({ outlineWidth: 2, outlineOffset: 0 });
    expect(StyleSheet.flatten(screen.getByTestId('slot-0').props.style)?.outlineWidth).toBeUndefined();
    expect(screen.getByTestId('otp-caret')).toBeOnTheScreen();
  });

  it('calls onComplete once all slots are filled', async () => {
    const onComplete = jest.fn();
    await render(<Code onComplete={onComplete} />);
    await fireEvent.changeText(screen.getByTestId('otp'), '4271');
    expect(onComplete).toHaveBeenCalledWith('4271');
  });

  it('is read-only and dimmed when disabled', async () => {
    await render(<Code disabled />);
    expect(screen.getByTestId('otp').props.editable).toBe(false);
    expect(screen.getByTestId('otp-container').props.className).toContain('opacity-50');
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/form-elements/input-otp.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement** — `packages/react-native/src/atoms/form-elements/input-otp.tsx`

```tsx
import { Dot } from 'lucide-react-native';
import * as React from 'react';
import { TextInput, View } from 'react-native';
import { useThemeColors } from '../../lib/theme';
import { cn } from '../../lib/utils';
import { Icon } from '../icon';
import { Text } from '../text';

type OTPContextValue = { value: string; maxLength: number; focused: boolean };
const OTPContext = React.createContext<OTPContextValue | null>(null);
const SlotPositionContext = React.createContext({ first: false, last: false });

function useOTPContext() {
  const context = React.useContext(OTPContext);
  if (!context) throw new Error('InputOTP parts must be rendered inside <InputOTP>');
  return context;
}

type InputOTPProps = Omit<React.ComponentProps<typeof TextInput>, 'value' | 'onChange' | 'maxLength'> & {
  maxLength: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  containerClassName?: string;
  children: React.ReactNode;
};

function InputOTP({
  maxLength,
  value,
  onChange,
  onComplete,
  disabled,
  containerClassName,
  className,
  children,
  onFocus,
  onBlur,
  ...props
}: InputOTPProps) {
  const [focused, setFocused] = React.useState(false);

  const handleChange = (text: string) => {
    const next = text.slice(0, maxLength);
    onChange(next);
    if (next.length === maxLength) onComplete?.(next);
  };

  return (
    <OTPContext.Provider value={{ value, maxLength, focused }}>
      <View testID="otp-container" className={cn('relative flex-row items-center gap-2', disabled && 'opacity-50', containerClassName)}>
        {children}
        {/* Transparent field over the slots: taps focus it, it receives the typing and SMS autofill. */}
        <TextInput
          className={cn('absolute inset-0 opacity-0', className)}
          value={value}
          onChangeText={handleChange}
          maxLength={maxLength}
          editable={!disabled}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoComplete="sms-otp"
          caretHidden
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          {...props}
        />
      </View>
    </OTPContext.Provider>
  );
}

function InputOTPGroup({ className, children, ...props }: React.ComponentProps<typeof View>) {
  const items = React.Children.toArray(children);
  return (
    <View className={cn('flex-row items-center', className)} {...props}>
      {items.map((child, i) => (
        <SlotPositionContext.Provider key={i} value={{ first: i === 0, last: i === items.length - 1 }}>
          {child}
        </SlotPositionContext.Provider>
      ))}
    </View>
  );
}

function InputOTPSlot({ index, className, style, ...props }: React.ComponentProps<typeof View> & { index: number }) {
  const { value, maxLength, focused } = useOTPContext();
  const { first, last } = React.useContext(SlotPositionContext);
  const { ring } = useThemeColors();
  const char = value[index];
  const isActive = focused && index === Math.min(value.length, maxLength - 1);

  return (
    <View
      className={cn(
        'relative h-10 w-10 items-center justify-center border-y border-r border-input',
        first && 'rounded-l-md border-l',
        last && 'rounded-r-md',
        isActive && 'z-10',
        className,
      )}
      style={[isActive ? { outlineWidth: 2, outlineOffset: 0, outlineStyle: 'solid', outlineColor: ring } : undefined, style]}
      {...props}>
      {char ? <Text className="text-sm">{char}</Text> : null}
      {isActive && !char ? <View testID="otp-caret" className="h-4 w-px bg-foreground" /> : null}
    </View>
  );
}

function InputOTPSeparator(props: React.ComponentProps<typeof View>) {
  return (
    <View role="separator" {...props}>
      <Icon as={Dot} size={24} />
    </View>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot };
export type { InputOTPProps };
```

Append to `packages/react-native/src/index.ts`:
```ts
export * from './atoms/form-elements/input-otp';
```

- [ ] **Step 4: Run — expect PASS**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/form-elements/input-otp.test.tsx && pnpm --filter @aumraa/breathe-native typecheck`
Expected: 6 passed; tsc 0.

- [ ] **Step 5: Catalog** — `apps/native-catalog/sections/OtpSection.tsx`

```tsx
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot, Text } from '@aumraa/breathe-native';
import { useState } from 'react';
import { Section } from '../components/Section';

export function OtpSection() {
  const [code, setCode] = useState('');
  const [done, setDone] = useState('');
  return (
    <Section title="InputOTP">
      <InputOTP maxLength={6} value={code} onChange={setCode} onComplete={setDone}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <Text className="text-sm">Completed: {done || '—'}</Text>
    </Section>
  );
}
```

Register `{ key: 'otp', Component: OtpSection }`. Device check S13: tapping a slot opens the number pad; on Android, an SMS code offers autofill.

- [ ] **Step 6: Commit**

```bash
git add packages/react-native apps/native-catalog
git commit -m "feat(native): InputOTP atom rebuilt for native"
```

---

### Task 27: Calendar

Reference: repo `ui/calendar.tsx` (`react-day-picker` v8, which doesn't run on native) as used by the app: `mode="single"`, `selected`, `onSelect` (`AddExpenseModal`, `RecordPaymentSheet`). Rebuilt as a month grid on `date-fns` (already a dependency). Classes carried over:

- Root `p-3`; month `space-y-4` → `gap-4` (R12).
- Caption `relative items-center justify-center pt-1` with label `text-sm font-medium`.
- Nav buttons: `buttonVariants({ variant: 'outline' })` + `h-7 w-7 bg-transparent p-0 opacity-50`, absolutely positioned `left-1` / `right-1`.
- Head cell `w-9 font-normal text-[0.8rem] text-muted-foreground` → `text-[12.8px]` (R3).
- Row `flex w-full mt-2`.
- Day: `buttonVariants({ variant: 'ghost' })` + `h-9 w-9 p-0 font-normal`. Ghost text is `primary-500`, so day numbers are blue, as on web.
- Selected `bg-primary text-primary-foreground`; today `bg-accent text-accent-foreground`; outside days `text-muted-foreground opacity-50`.

Behaviour copied from react-day-picker v8: weeks start Sunday; weekday labels `Su…Sa` (`cccccc`); caption `LLLL y`; the first month shown is the current month (`defaultMonth` overrides); tapping the selected day clears it (`onSelect(undefined)`); `today` can be injected (the same prop exists on web).

**Files:**
- Create: `packages/react-native/src/atoms/form-elements/calendar.tsx`
- Modify: `packages/react-native/src/index.ts`
- Test: `packages/react-native/test/atoms/form-elements/calendar.test.tsx`
- Create: `apps/native-catalog/sections/CalendarSection.tsx`

- [ ] **Step 1: Write the failing test** — `packages/react-native/test/atoms/form-elements/calendar.test.tsx`

```tsx
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Calendar } from '../../../src/atoms/form-elements/calendar';

const TODAY = new Date(2026, 8, 11); // Friday 11 Sep 2026
const SEP_15 = 'Tuesday, September 15th, 2026';

describe('Calendar', () => {
  it('shows the current month with Sunday-first weekday labels', async () => {
    await render(<Calendar today={TODAY} />);
    expect(screen.getByText('September 2026')).toBeOnTheScreen();
    expect(screen.getByText('Su')).toBeOnTheScreen();
    expect(screen.getByText('Sa')).toBeOnTheScreen();
  });

  it('selects a day', async () => {
    const onSelect = jest.fn();
    await render(<Calendar today={TODAY} onSelect={onSelect} />);
    await fireEvent.press(screen.getByLabelText(SEP_15));
    expect(onSelect).toHaveBeenCalledWith(new Date(2026, 8, 15));
  });

  it('clears the selection when the selected day is tapped again', async () => {
    const onSelect = jest.fn();
    await render(<Calendar today={TODAY} selected={new Date(2026, 8, 15)} onSelect={onSelect} />);
    await fireEvent.press(screen.getByLabelText(SEP_15));
    expect(onSelect).toHaveBeenCalledWith(undefined);
  });

  it('paints selected and today like the web day picker', async () => {
    await render(<Calendar today={TODAY} selected={new Date(2026, 8, 15)} />);
    expect(screen.getByLabelText(SEP_15).props.className).toContain('bg-primary');
    expect(screen.getByLabelText('Friday, September 11th, 2026').props.className).toContain('bg-accent');
  });

  it('moves between months', async () => {
    await render(<Calendar today={TODAY} />);
    await fireEvent.press(screen.getByLabelText('Go to next month'));
    expect(screen.getByText('October 2026')).toBeOnTheScreen();
    await fireEvent.press(screen.getByLabelText('Go to previous month'));
    await fireEvent.press(screen.getByLabelText('Go to previous month'));
    expect(screen.getByText('August 2026')).toBeOnTheScreen();
  });

  it('shows outside days by default and hides them on request', async () => {
    const { rerender } = await render(<Calendar today={TODAY} />);
    expect(screen.getAllByText('30')).toHaveLength(2); // 30 Aug + 30 Sep
    await rerender(<Calendar today={TODAY} showOutsideDays={false} />);
    expect(screen.getAllByText('30')).toHaveLength(1);
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/form-elements/calendar.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement** — `packages/react-native/src/atoms/form-elements/calendar.tsx`

```tsx
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import * as React from 'react';
import { View } from 'react-native';
import { cn } from '../../lib/utils';
import { Button } from '../button';
import { Icon } from '../icon';
import { Text } from '../text';

/** Weeks (Sunday-first) covering the month, as react-day-picker v8 renders without fixedWeeks. */
function getMonthGrid(month: Date): Date[][] {
  const days = eachDayOfInterval({ start: startOfWeek(startOfMonth(month)), end: endOfWeek(endOfMonth(month)) });
  const weeks: Date[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));
  return weeks;
}

const NAV = 'absolute h-7 w-7 bg-transparent p-0 opacity-50';

type CalendarProps = {
  /** Only single-date selection exists (the only mode Leminiscate uses). */
  mode?: 'single';
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  defaultMonth?: Date;
  today?: Date;
  showOutsideDays?: boolean;
  className?: string;
};

function Calendar({ selected, onSelect, defaultMonth, today = new Date(), showOutsideDays = true, className }: CalendarProps) {
  const [month, setMonth] = React.useState(() => startOfMonth(defaultMonth ?? today));
  const weeks = getMonthGrid(month);

  return (
    <View className={cn('gap-4 p-3', className)}>
      <View className="relative flex-row items-center justify-center pt-1">
        <Button
          variant="outline"
          className={cn(NAV, 'left-1')}
          leftIcon={<Icon as={ChevronLeft} />}
          accessibilityLabel="Go to previous month"
          onPress={() => setMonth(subMonths(month, 1))}
        />
        <Text role="heading" className="text-sm font-medium">
          {format(month, 'LLLL y')}
        </Text>
        <Button
          variant="outline"
          className={cn(NAV, 'right-1')}
          leftIcon={<Icon as={ChevronRight} />}
          accessibilityLabel="Go to next month"
          onPress={() => setMonth(addMonths(month, 1))}
        />
      </View>

      <View>
        <View className="flex-row">
          {weeks[0].map((day) => (
            <Text key={day.toISOString()} className="w-9 text-center text-[12.8px] font-normal text-muted-foreground">
              {format(day, 'cccccc')}
            </Text>
          ))}
        </View>

        {weeks.map((week) => (
          <View key={week[0].toISOString()} className="mt-2 w-full flex-row">
            {week.map((day) => {
              const key = day.toISOString();
              const outside = !isSameMonth(day, month);
              if (outside && !showOutsideDays) return <View key={key} className="h-9 w-9" />;
              const isSelected = !!selected && isSameDay(day, selected);
              const isToday = isSameDay(day, today);
              return (
                <Button
                  key={key}
                  variant="ghost"
                  accessibilityLabel={format(day, 'PPPP')}
                  accessibilityState={{ selected: isSelected }}
                  className={cn(
                    'h-9 w-9 p-0',
                    isSelected && 'bg-primary active:bg-primary',
                    !isSelected && isToday && 'bg-accent',
                    outside && 'opacity-50',
                  )}
                  onPress={() => onSelect?.(isSelected ? undefined : day)}>
                  <Text
                    className={cn(
                      'font-normal',
                      isSelected ? 'text-primary-foreground' : isToday ? 'text-accent-foreground' : outside && 'text-muted-foreground',
                    )}>
                    {format(day, 'd')}
                  </Text>
                </Button>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

export { Calendar };
export type { CalendarProps };
```

Append to `packages/react-native/src/index.ts`:
```ts
export * from './atoms/form-elements/calendar';
```

- [ ] **Step 4: Run — expect PASS**

Run: `pnpm --filter @aumraa/breathe-native test test/atoms/form-elements/calendar.test.tsx && pnpm --filter @aumraa/breathe-native typecheck`
Expected: 6 passed; tsc 0.

- [ ] **Step 5: Catalog** — `apps/native-catalog/sections/CalendarSection.tsx`

```tsx
import { Calendar, Text } from '@aumraa/breathe-native';
import { format } from 'date-fns';
import { useState } from 'react';
import { View } from 'react-native';
import { Section } from '../components/Section';

export function CalendarSection() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <Section title="Calendar">
      <View className="self-start rounded-md border border-border bg-popover">
        <Calendar mode="single" selected={date} onSelect={(d) => d && setDate(d)} />
      </View>
      <Text className="text-sm">{date ? format(date, 'PPP') : 'Pick a date'}</Text>
    </Section>
  );
}
```

Register `{ key: 'calendar', Component: CalendarSection }`. Device check S14: compare side by side with the web Add Expense date popover. Nav buttons, blue day numbers, the accent "today" and the primary selection must match.

- [ ] **Step 6: Commit**

```bash
git add packages/react-native apps/native-catalog
git commit -m "feat(native): Calendar atom as a date-fns month grid matching the web day picker"
```

---

## Phase 3 — Package

### Task 28: Exports audit, README, pack check

**Files:**
- Test: `packages/react-native/test/index.test.ts`
- Create: `packages/react-native/README.md`
- Modify: `README.md` (root products table)

- [ ] **Step 1: Write the exports test** — `packages/react-native/test/index.test.ts`

```ts
import * as pkg from '../src';

jest.mock('react-native-screens', () => ({ FullWindowOverlay: ({ children }: { children: unknown }) => children }));
jest.mock('@react-native-community/slider', () => ({ __esModule: true, default: () => null }));

const EXPECTED = [
  'cn', 'THEME', 'useThemeColors',
  'Text', 'TextClassContext', 'Icon', 'IconSizeContext', 'Gradient', 'BRAND_GRADIENT', 'Spinner',
  'Button', 'buttonVariants', 'buttonTextVariants',
  'Label', 'Badge', 'badgeVariants', 'badgeTextVariants', 'Separator', 'Skeleton',
  'Progress', 'clampProgress', 'Avatar', 'AvatarImage', 'AvatarFallback',
  'Input', 'Textarea', 'Checkbox', 'RadioGroup', 'RadioGroupItem', 'Switch',
  'Toggle', 'toggleVariants', 'toggleTextClass', 'ToggleGroup', 'ToggleGroupItem', 'Slider',
  'Select', 'SelectTrigger', 'SelectValue', 'SelectContent', 'SelectGroup', 'SelectItem', 'SelectLabel', 'SelectSeparator',
  'InputOTP', 'InputOTPGroup', 'InputOTPSlot', 'InputOTPSeparator',
  'Calendar',
];

describe('@aumraa/breathe-native public API', () => {
  it.each(EXPECTED)('exports %s', (name) => {
    expect((pkg as Record<string, unknown>)[name]).toBeDefined();
  });
});
```

- [ ] **Step 2: Run the whole suite**

Run: `pnpm --filter @aumraa/breathe-native test && pnpm --filter @aumraa/breathe-native typecheck`
Expected: every suite passes; tsc 0. A missing export means an `index.ts` append was skipped in its task; add it.

- [ ] **Step 3: Consumer README** — `packages/react-native/README.md`

````md
# @aumraa/breathe-native

Breathe design system for React Native (Expo SDK 56, NativeWind v5). Ships Leminiscate's theme and all atoms.

## Install

`.npmrc` in the app:

```
@aumraa:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

```bash
pnpm add @aumraa/breathe-native
npx expo install nativewind@5.0.0-preview.4 react-native-css@3.0.7 react-native-reanimated react-native-worklets \
  react-native-svg react-native-screens react-native-safe-area-context @react-native-community/slider \
  @rn-primitives/portal lucide-react-native expo-font @expo-google-fonts/inter
pnpm add -D tailwindcss@4.3.3 @tailwindcss/postcss@4.3.3 postcss
```

Pin `lightningcss` to `1.30.1` (`pnpm.overrides` or `overrides` in package.json).

## Configure

- `metro.config.js`: `module.exports = withNativewind(getDefaultConfig(__dirname));` (from `nativewind/metro`)
- `postcss.config.mjs`: `export default { plugins: { '@tailwindcss/postcss': {} } };`
- `global.css`:
  ```css
  @import "tailwindcss/theme.css" layer(theme);
  @import "tailwindcss/preflight.css" layer(base);
  @import "tailwindcss/utilities.css";
  @import "nativewind/theme";
  @import "@aumraa/breathe-native/styles/lemniscate.css";
  ```
- `nativewind-env.d.ts`: `/// <reference types="react-native-css/types" />`
- `app.json`: `"userInterfaceStyle": "automatic"` and the `expo-font` Inter block from Breathe's `apps/native-catalog/app.json`. Fonts need a development build (`expo run:*`), not Expo Go.
- Root layout: `import './global.css'` and render `<PortalHost />` (from `@rn-primitives/portal`) as the last child.

## Use

```tsx
import { Button, Icon, Input, Label } from '@aumraa/breathe-native';
import { Plus } from 'lucide-react-native';

<Label>Flat number</Label>
<Input placeholder="A-101" />
<Button variant="gradient" leftIcon={<Icon as={Plus} />}>Add resident</Button>
```

Class names are the Leminiscate web class names; sizes are identical to web.
Porting rules and the few intentional differences from web: `docs/superpowers/plans/2026-09-11-breathe-native-leminiscate-atoms.md` §0.4–0.5 in the Breathe repo.
Dark mode follows the system; switch with `Appearance.setColorScheme('dark' | 'light')`.
````

- [ ] **Step 4: Pack check** — confirm the tarball contains only what consumers need.

```bash
cd packages/react-native
pnpm pack
tar -tzf aumraa-breathe-native-0.1.0.tgz
rm aumraa-breathe-native-0.1.0.tgz
cd ../..
```

Expected: only `package/package.json`, `package/README.md`, `package/styles/lemniscate.css` and `package/src/**`. No `test/`, `jest.*`, `babel.config.js` or `tsconfig.json`.

- [ ] **Step 5: Root README products table** — in `README.md` replace

```
| Lemniscate | `lmns` | ✓ | — | — | — | — | — | Active |
```
with
```
| Lemniscate | `lmns` | ✓ | ✓ | — | — | — | — | Active |
```

- [ ] **Step 6: Commit and open the PR**

```bash
git add packages/react-native README.md
git commit -m "feat(native): public API audit, consumer README, Lemniscate RN in products table"
git push -u origin feat/breathe-native
```

Publishing (`pnpm --filter @aumraa/breathe-native publish --no-git-checks` with a GitHub token that has `write:packages`) is done by the package owner after merge to `main`.

---

## Self-review (done while writing)

- **Spec coverage:** Foundations are adapted as-is from the repo (Task 3 stylesheet with a parity test, Task 4 JS mirror). All 18 web atoms are built (Tasks 10–27), plus the 4 native building blocks (Text, Icon, Gradient, Spinner), so none of the web atoms are left out (D2). NativeWind v5 (D3); rnr scaffolding for Text, Icon, Button, Badge, Label, Separator, Checkbox, RadioGroup, Switch, Toggle, ToggleGroup, Progress, Avatar and Select (D4). Packaging and consumer setup: Task 28. Visual parity on a device: catalog plus spike checks S1–S14.
- **Placeholder scan:** Every code step has full code. Device checks list concrete fallbacks instead of "fix if broken".
- **Type consistency:** `TextClassContext`/`IconSizeContext` are defined in Tasks 6–7 and used by name afterwards; `useThemeColors().{background, primary, secondary, mutedForeground, ring}` covers every key used (Input, Textarea, Slider, focus ring, OTP); `toggleVariants` and `toggleTextClass` are exported in Task 22 and imported in Task 23; `buttonVariants` sizes match the `ICON_SIZE` keys.

## Follow-ups (separate plans, not in scope)

1. **Molecules → organisms → templates for native**, including the mobile-only HeaderBar and BottomNav. They build on these atoms.
2. **Close the web/token drift.** `tokens/src/lemniscate.json` and `packages/react/styles/lemniscate.css` still carry older Leminiscate values (neutral greys, accent orange vs. sky, radius 10px vs. 12px, gradient direction). Update them from `packages/react-native/styles/lemniscate.css` so web and native share one source.
3. **NativeWind v5 stable** (currently `5.0.0-preview.4`): bump the version, then re-run spike checks S1–S14.
4. **Expo SDK 57:** upgrade the catalog and peer ranges together.
5. **Confirm D5 (custom Calendar) and D6 (gradient as rendered today)** with the product owner. Changing D6 is a one-line change to `BRAND_GRADIENT`.
