# Phase 5: Integration, Verification & Consumer Hand-off

## Objective
Perform full monorepo verification of Breathe Design System across all packages, ensure zero regressions for sibling products (Lemniscate, Technocracy, Maligai, Aumraa), and provide a concrete guide for the Kaayo product app to consume `@aumraa/breathe-native/kaayo`.

---

## 1. Full Monorepo Verification in Breathe Design System

Execute the complete verification matrix in `00_Breathe Design system`:

```bash
# 1. Regenerate tokens and check diffs
pnpm tokens

# 2. Typecheck all packages and documentation app
pnpm typecheck

# 3. Run all unit and guard tests
pnpm test

# 4. Production build of the documentation website
pnpm build
```

### Verification Checklist:
- [ ] `tokens/src/kaayo.json` compiles with 0 errors via Style Dictionary.
- [ ] `@aumraa/breathe-native` exports `./kaayo` cleanly and compiles with zero TypeScript errors.
- [ ] `@aumraa/breathe-native/test/kaayo/design-system-guard.test.ts` passes with 0 violations.
- [ ] `@aumraa/breathe-react` builds dist output including all new web components.
- [ ] The Vite docs app builds cleanly with zero broken imports or asset failures.
- [ ] Sibling product components (Lemniscate, Technocracy, Aumraa) show 0 regressions.

---

## 2. Kaayo Product Frontend Integration Guide

Once Breathe Design System has been published or linked locally, the Kaayo product app (`D:\Aumraa\APOS pitch\1_Product Factory\01_Kaayo\Product\Development\version 1\frontend`) can be updated to consume the upstream design system.

### Step 2.1: Package Installation / Linking
In `Kaayo/Product/Development/version 1/frontend`:

```bash
# Option A: Local link for development
pnpm link "D:\Aumraa\APOS pitch\1_Product Factory\00_Breathe Design system\packages\react-native"

# Option B: Via GitHub Packages
npm install @aumraa/breathe-native@latest
```

### Step 2.2: Re-pointing Imports
In Kaayo frontend `design-system/index.ts`, replace local relative re-exports with re-exports from `@aumraa/breathe-native/kaayo`:

```typescript
/**
 * Kaayo Design System — Re-exported from @aumraa/breathe-native
 */
export * from '@aumraa/breathe-native/kaayo';
```

This guarantees 100% backward compatibility with all feature modules (`features/home`, `features/attendance`, `features/students`, `features/payments`, etc.) that currently import from `@/design-system`.

### Step 2.3: Kaayo App Validation
Run Kaayo's comprehensive test suite:

```bash
cd "D:\Aumraa\APOS pitch\1_Product Factory\01_Kaayo\Product\Development\version 1\frontend"

# 1. TypeScript compilation check
npx tsc --noEmit -p .

# 2. Design system guard test
npx jest frontend/__tests__/design-system-guard.test.ts

# 3. Full test suite
npx jest
```

---

## 3. Project Sign-Off Checklist

- [ ] All 5 phases executed and documented.
- [ ] Kaayo's "Neobrutalism × Skeuomorphism 2.0" visual and code language fully preserved in Breathe.
- [ ] Breathe Design System is now the single source of truth for both Web and Native across the Aumraa product ecosystem.

