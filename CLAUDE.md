# Breathe Design System

Design system documentation site for the Aumraa product family (Lemniscate, Technocracy, Yakaizen, Maligai, Ulagellam, Ilakh).

## Stack

- **Vite 6 + React 18 + TypeScript** — frontend framework
- **Tailwind CSS v4** — utility styling, wired to CSS custom properties
- **Radix UI** — accessible component primitives
- **Style Dictionary** — token compilation (run `pnpm tokens`)
- **pnpm** — package manager

## Token Pipeline

Source: `tokens/src/*.json`
Output: `tokens/dist/{web,ios,android,react-native,watchos,widgets}/`

To regenerate dist files after editing source tokens:
```bash
pnpm tokens
```

lemniscate also generates `packages/react-native/styles/lemniscate.css` (format `tokens/formats/nativewind.js`, template `tokens/formats/nativewind.template.css`); never hand-edit generated files.

CSS vars are organized in layers:
1. **Primitive tokens** — `aumraa.css` loaded globally (color-neutral-*, color-status-*)
2. **Product tokens** — `lemniscate.css`, `technocracy.css`, etc. loaded globally
3. **Semantic theme** — `theme.css` maps primitives → Tailwind's `:root` vars (--primary, --background, etc.)
4. **Dynamic overrides** — `ProductThemeContext` injects product-specific vars at runtime

## Logos

**Read `docs/LOGO_RULES.md` before touching any logo** — in Figma or in `public/assets/logos/`.
It is the source of truth; the Figma components and the SVGs are outputs of it.

The rule in one line: **a logo is a bounding box, not a bare shape — clear space is 1/8 of the
box's shorter side on all four sides, both box dimensions on the 8pt grid, mark contained and
centred, never scaled up to fill.**

```bash
pnpm logos:check   # report which assets violate the rule
pnpm logos:fix     # re-box in place (idempotent)
```

- Never hand-edit a logo SVG's `viewBox`/`width`/`height` — run the tool
- Never distort a mark to make its own dimensions round; only the box is round
- `src/test/logo-bounding-box.test.ts` enforces this per file and must stay green

## Testing

Framework: **vitest** + @testing-library/react
```bash
pnpm test        # single run
pnpm test:watch  # watch mode
```
See TESTING.md for conventions.

- Write a test for every new function, reducer, and component behavior
- Write regression tests when fixing bugs
- Test BOTH paths of every conditional
- Never commit code that breaks existing tests

## Skill routing

When the user's request matches an available skill, ALWAYS invoke it using the Skill
tool as your FIRST action. Do NOT answer directly, do NOT use other tools first.

Key routing rules:
- Bugs, errors, "why is this broken" → invoke investigate
- Ship, deploy, push, create PR → invoke ship
- QA, test the site, find bugs → invoke qa
- Code review, check my diff → invoke review
- Design system, brand → invoke design-consultation
- Visual audit, design polish → invoke design-review

Logo work (clear space, safe area, bounding box, sizing, re-export, adding a product's logo)
is not a skill — read `docs/LOGO_RULES.md` and follow it. Do not re-derive the rule.
