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

CSS vars are organized in layers:
1. **Primitive tokens** — `aumraa.css` loaded globally (color-neutral-*, color-status-*)
2. **Product tokens** — `lemniscate.css`, `technocracy.css`, etc. loaded globally
3. **Semantic theme** — `theme.css` maps primitives → Tailwind's `:root` vars (--primary, --background, etc.)
4. **Dynamic overrides** — `ProductThemeContext` injects product-specific vars at runtime

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
