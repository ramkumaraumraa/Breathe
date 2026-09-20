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

## Neutral ramp

One ramp. White/Grey/Ink were collapsed into `color.neutral.*` (15 stops) — do not
reintroduce a second neutral scale.

```
25  #FFFFFF   50  #F8F8F8   75  #F0F1F1   100 #E8E8E9   200 #D9DADB
300 #C3C4C5   400 #9FA0A2   500 #757678   600 #5F6163   700 #4C4E51
800 #3A3B3F   900 #2A2C30   925 #202225   950 #17191D   975 #0D1014
```

- Weighted to the light end; cool tint rises 0→7 in B−R so dark UI reads as designed.
- `975` is the near-black for type. Never `#000`. `neutral.black` is outside the ramp —
  shadows and scrims only.
- **Muted text is not one stop**: `500` clears AA on white (4.55) but not on `975` (4.19).
  Light mode uses `500`, dark mode uses `400`.

## Figma ↔ repo sync

Repo is the source of truth. Per product: read Figma's variables, diff, correct Figma.

- Read variables with `getLocalVariableCollectionsAsync()` + `getVariableByIdAsync()`.
  **Never** infer a collection from `get_variable_defs` on a node — that returns only what
  is bound to that node, and unbound swatch frames return `{}`.
- Path is `Colors` collection → `Brand/<Ramp>/<stop>`.
- Gray/Slate are external library variables — not deletable, only unbindable node by node.
- Figma MCP needs the desktop app; canvas-level queries need a live selection.

Remap principle when a ramp changes: **semantic** tokens map by nearest L* (preserves
appearance); **numbered palette** slices map 1:1 by stop (fixes ordering).

### Status
| Product | Figma | State |
|---|---|---|
| Lemniscate | ✅ | 105 vars aligned, 0 drift. Colors page swatch board is still hardcoded fills showing old neutrals (6 slots vs 15); Gray/Slate still bound across ~35 pages. |
| Kaayo | ⏳ | next — has a `Supportive` ramp and bespoke Positive/Alert that exist nowhere in the repo |
| Maligai Manager | ⏳ | recently touched, expect closest to correct |
| Aumraa | ⏳ | |
| Technocracy | ⏳ | no Figma link yet; tokens are raw hex, not references — won't diff the same way |

## Working rules

- **Never cap a survey grep.** Count with `| wc -l` first, then read. A `head -40` once hid
  the whole `packages/react-native/` tree and produced a wrong scope estimate.
- **Two rename maps sharing a target namespace → one regex alternation, one pass.** Running
  `ink.N → neutral.M` then `neutral.X → neutral.Y` over the same text double-shifts it.
- **Parse-validate JSON before writing, not after.**
- Don't `git stash` — other sessions may have uncommitted work here.
- Bash tool takes bash heredocs, not PowerShell here-strings.

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
