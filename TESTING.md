# Testing

100% test coverage is the goal. Tests let you move fast, trust your instincts, and ship with confidence.

## Framework

**vitest** v4.1.4 + **@testing-library/react** v16 + **jsdom**

Same config surface as Jest, native Vite integration, ~10x faster.

## Running Tests

```bash
pnpm test          # single run
pnpm test:watch    # watch mode
```

## Test Layers

| Layer | Where | When |
|-------|-------|------|
| Unit | `src/test/*.test.ts(x)` | Pure logic, hooks, reducers |
| Component | `src/test/*.test.tsx` | UI behavior, interactions |
| E2E | (future) Playwright | Full user flows |

## Conventions

- Files: `src/test/{component-or-module}.test.tsx`
- Globals: `describe`, `it`, `expect`, `vi` (no imports needed — vitest globals enabled)
- Setup: `src/test/setup.ts` imports `@testing-library/jest-dom` matchers
- Mocks: `vi.fn()` for callbacks, `vi.mock(...)` for modules
- Assertions: always test what the code DOES — avoid `toBeDefined()` alone

## Coverage Expectations

- New functions → write a corresponding test
- Bug fix → write a regression test
- New conditional (if/else) → test BOTH paths
- Never commit code that breaks existing tests
