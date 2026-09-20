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
- **Watch for orphaned variables.** A variable can report a `variableCollectionId` and
  still be absent from that collection's `variableIds` — deleted but still bound by nodes,
  so it resolves on canvas yet never appears in the picker. Maligai had five
  (`neutral/white`, `neutral/black`, `accent`, `success`, `danger`). Creating a replacement
  does **not** rebind them: check `liveIds.has(boundVar.id)`, not the variable name, then
  rebind and re-verify.
- Gray/Slate are external library variables — not deletable, only unbindable node by node.
- Figma MCP needs the desktop app; canvas-level queries need a live selection.

Where a new ramp goes: **hue-named** ramps (crimson, peach, navy, pine, gold, earth)
live in `global.json` under `color.<hue>`, mirroring Figma's primitives. **Role-named**
product-specific ramps (Kaayo's positive/alert/negative/supportive) live in the product
file under `<prefix>.palette.*`, because they would collide in a hue namespace.

Remap principle when a ramp changes: **semantic** tokens map by nearest L* (preserves
appearance); **numbered palette** slices map 1:1 by stop (fixes ordering).

Kaayo is the exception to "repo is source of truth": its Figma ramps were verified
against the shipped product, so the repo follows it. Kaayo-only ramps live in
`kaayo.json` under `kayo.palette.*`; `crimson`/`peach`/`navy` stay in `global.json`
(nothing else references them — moving them would touch dist, RN and tests for no gain).
Its ramps interpolate toward a shared light tint and the logo navy #181A2F at the dark
end rather than driving to near-black; do not "fix" that.

### Status
| Product | Figma | State |
|---|---|---|
| Lemniscate | ✅ | 105 vars aligned, 0 drift. Colors page swatch board is still hardcoded fills showing old neutrals (6 slots vs 15); Gray/Slate still bound across ~35 pages. |
| Kaayo | ✅ | [File](https://www.figma.com/design/doxyZziGKSHcBHKH1lzEH8/Kaayo) · Figma wins (team cross-checked against the product). 120 vars = 8 ramps × 15, repo matches all 105 brand stops. `NeutralWhite`/`NeutralBlack` collapsed into one `Neutral` ramp: 8,543 nodes rebound across 36 pages, both old ramps deleted. Colors page rebuilt from the variables. |
| Maligai Manager | ✅ | [File](https://www.figma.com/design/QyvuegdHxbt0SO36u5hX0L/Maligai-Manager) · Two-tier `Breathe / Color Primitives` (134) + `Maligai / Semantic Colors` (33). Repo was a **placeholder** and now follows it; `pine`/`gold`/`earth` verified against the logo SVGs. Neutral forced to the Breathe cool ramp, info kept on `sky`. Board fully verified: 35 vars = 35 cards, 115 bound swatches, 0 unbound, 0 orphans, 0 drift. **Remaining:** the Colors page still holds three legacy "Green" groups from an old palette (#8FAC72, #1E631B, #193C36) that contradict the brand. |
| Aumraa | ✅ | [File](https://www.figma.com/design/22esrYWg3z1D95FRpGpemU/Aumraa-Design-System) · Was the least developed — 26 vars, no Colors page, no semantic layer. Rebuilt to the Maligai shape: `Breathe / Color Primitives` (135) + `Aumraa / Semantic Colors` (22), matching `aumraa.json` 22/22. Legacy `Gray/*` (Tailwind) deleted after rebinding 180 nodes across 26 pages; `Product/*` repurposed into `color/green/*`. **Remaining:** the file still has no Colors foundations page — Maligai's `796:1439` is the template. |
| Technocracy | n/a | **No Figma, by design** — dark-only internal tool, maintained directly in code. Tokens now follow the Breathe pattern (`color.signal.*` + `thcy.palette.*`) with every `thcy.color.*` a reference. Components consume tokens, 0 literals. Consumed by [Technocracy-Kaayo](https://github.com/AUMRAA/Technocracy-Kaayo) (current) and Technocracy-Leminiscate (stale, separate vocabulary — needs migrating). |

## Colour roles

**`tertiary` means a real third brand colour.** It is not a slot for a blue.
Kaayo (earth), Maligai (earth), Lemniscate (orange) and Technocracy (slate) have one.
Aumraa, Ilakh, Vazhai and Yakaizen do not, and carry no `tertiary` token until one
is designed — they previously aliased `color.status.info`, a feedback colour wearing
a brand name.

**`supportive` is feedback, not brand.** `color.feedback.supportive` (#266FDC at 500)
sits alongside positive, warning and negative, with `status.supportive/Light/Dark`
aliases. It covers informational surfaces, links and secondary guidance. One ramp for
the whole family — do not give a product a private copy.


## Technocracy

Aumraa's internal admin/telemetry layer — one dashboard shell **instantiated per
product**, each its own repo observing one product read-only. Permanent dark; there is
no light variant and the docs site pins the theme via `productMeta.technocracy.darkOnly`.

- Branding is **Aumraa**, but foundations deliberately diverge: dark-vibrant green
  (`color.signal.green` #00dc82), monospace, obsidian glass. It serves a different
  audience, so it evolves separately — that divergence is the point, not drift.
- `thcy.color.brand` is a **slot**, not a colour. It carries the *observed* product's
  brand, dark-adapted, for logo moments only — never a data colour. Each deployment
  overrides it. The committed default is Kaayo red adapted.
- Technocracy has **no brand tertiary**. `thcy.color.tertiary` survives only because the
  generated var is public API.
- The four signals map onto the feedback family: green/amber/red/blue are the dark twins
  of positive/warning/negative/supportive.

**Do not rename a `--thcy-*` variable without checking the consuming repos.** Eleven are
load-bearing — the dashboards' own `globals.css` pins them by name, so a rename breaks a
shipped product silently. `src/test/technocracy-tokens.test.ts` guards the list.


## Working rules

- **Swatch captions are not always a bare hex.** Maligai combines stop and value in one
  text node (`"50  #D0EDDB"`), so an audit anchored on `/^#[0-9a-f]{6}$/` reports zero
  drift while the board shows stale values. Match `/#[0-9a-f]{6}/` anywhere in the string
  and rewrite in place. Always screenshot the board — the picture caught what the
  audit missed.

- **Never run a replace across a whole shared file.** ColorsPage holds every product;
  a global `.split(hex).join(hex)` meant for one section silently rewrote Lemniscate's
  Secondary ramp and relabelled seven products' gradients. Slice the section first
  (`id: '<product>'` to the next `id:`), edit the slice, splice it back — then diff
  against the previous commit and confirm only the intended hunks moved.

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
