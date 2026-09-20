# Logo Rules

Binding rules for every Aumraa product logo — in Figma and in code. Applies to Lemniscate,
Technocracy, Yakaizen, Maligai, Ulagellam, Ilakh, Kaayo and Aumraa itself.

> If you are changing, exporting or adding a logo, read this first. It is the source of
> truth, not the Figma file and not the SVGs — those are outputs of these rules.

---

## 1. The rule

**A logo is a bounding box, not a bare shape.**

1. **Clear space = 1/8 of the bounding box's shorter side**, on all four sides.
2. **Both box dimensions land on the 8pt grid.**
3. The mark is **contained** inside the inner area and **optically centred**.
4. Clear space is a **minimum, never a target**. A box that already has more room keeps it —
   the mark is never scaled up to fill the inner area.
5. The artwork geometry is **never edited**. Re-boxing is a translate + scale of untouched paths.

```
┌─────────────────────────────┐  ← bounding box, both sides on the 8pt grid
│         ↕ S/8               │
│   ┌───────────────────┐     │  S = the box's SHORTER side
│   │                   │     │  clear space = S/8 on every side
│ ↔ │       mark        │ ↔   │  inner area  = 75% of S on the short axis
│S/8│                   │ S/8 │
│   └───────────────────┘     │
│         ↕ S/8               │
└─────────────────────────────┘
```

### Why

Without a boundary there is no unit to size against. A tight-cropped mark has no relationship
to the 8pt grid, cannot be placed consistently, and collides with whatever sits next to it.
The box is what layout targets; the mark just lives inside it.

### The numbers this produces

| Box (short side) | Clear space | Inner area |
|---|---|---|
| 16 | 2 | 12 |
| 24 | 3 | 18 |
| 32 | 4 | 24 |
| 48 | 6 | 36 |
| 64 | 8 | 48 |
| 96 | 12 | 72 |
| 128 | 16 | 96 |
| 200 | 25 | 150 |
| 256 | 32 | 192 |

---

## 2. Decimals

The **box** is always a round 8pt number. The **mark inside it** is usually not — a mark whose
natural aspect is 1.0225:1 cannot be both undistorted and land on round numbers in both axes.

That is correct and intentional. Interior geometry is allowed decimals; what you lay out
against is always round. **Never distort a mark to make its own dimensions round.**

---

## 3. Approved boxes — Maligai Manager

Figma: [Reusable logo components](https://www.figma.com/design/QyvuegdHxbt0SO36u5hX0L/Maligai-Manager?node-id=69326-2)

| Component | Box | Clear space | Mark |
|---|---|---|---|
| `Logo/Horizontal` | 272 × 128 | 16 | 237.7 × 96 |
| `Logo/Vertical` | 192 × 240 | 24 | 144 × 191 |
| `Logo/Symbol` | 200 × 200 | 25 | 150 × 146.7 |
| `Logo/App Icon` | 48 / 32 / 24 / 16 | 6 / 4 / 3 / 2 | 75% of box |
| `Logo/Monochrome` | same four boxes | same | same |

**8pt step ladders** (also recorded in each component's Figma description):

- Horizontal — 136×64 · 272×128 · 544×256
- Vertical — 96×120 · 192×240 · 384×480
- Symbol — 96 · 128 · 160 · 200 · 256
- App Icon — 16 · 24 · 32 · 48

### How the Figma components are built

- Each master component is the **bounding box**. Its single child is a frame named `Artwork`
  holding the untouched paths.
- `Artwork` and every path inside it use **SCALE** constraints, so resizing an instance scales
  the mark and its clear space together.
- App Icon variants nest an **instance of `Logo/Symbol`** filling the square. Clear space is
  therefore inherited from one master — change `Logo/Symbol` and every icon size follows.
- `clipsContent = false` on masters, so a mark can never be cropped by its own box.

---

## 4. SVG assets

Location: `public/assets/logos/<product>/`

Every asset is kept compliant by `tools/logo-bounding-box.mjs`:

```bash
pnpm logos:check   # report only — what would change
pnpm logos:fix     # re-box in place
```

The tool measures each file's real ink bounds (flattening beziers, ignoring `<defs>` clip
geometry), snaps the box to the 8pt grid, and wraps the untouched artwork in a single
`<g transform="translate(…) scale(…)">`. It is **idempotent** — running it twice changes
nothing the second time, and it unwraps its own group before re-measuring rather than nesting.

A full-bleed coloured `<rect>` is treated as a **plate**, not a mark: it stays flush to the
box while the mark is inset within it. That is how the `_Filled` variants work.

`src/test/logo-bounding-box.test.ts` asserts the rule per file — 8pt grid, clear space,
centring. It fails the build if any logo drifts.

### Current state

| Brand | Status |
|---|---|
| maligai-manager | re-boxed — all plain variants at 75%, `_Filled` plates full-bleed with the mark inset |
| aumraa | grid-snapped (`480×139` → `480×136`); icon and stacked already had clear space |
| kaayo | horizontal lockups already compliant; symbol and vertical tightened to 1/8 |
| leminiscate | horizontal and vertical already compliant; symbol grid-snapped (`1036×700` → `1040×704`) |

---

## 5. Never

- **Never** hand-edit a logo SVG's `viewBox`, `width` or `height`. Run the tool.
- **Never** nest a second `<g transform>` around already-boxed artwork.
- **Never** crop into the clear space, or place type or UI inside it.
- **Never** detach a logo instance in Figma to resize or recolour it.
- **Never** distort a mark to force round interior numbers.
- **Never** scale a mark up to fill the inner area — clear space is a floor, not a target.
- **Never** hand-edit generated files (`tokens/dist/**`, `packages/react-native/styles/*.css`).

---

## 6. Adding or re-exporting a logo

1. Build the master in Figma as a **bounding box** with an `Artwork` child, per §3.
2. Export SVGs into `public/assets/logos/<product>/`.
3. Run `pnpm logos:check`, then `pnpm logos:fix`.
4. Run `pnpm test` — the logo test must pass.
5. Add the product's row to §4 *Current state*.
6. If the logo introduces brand colours, they belong in the token pipeline
   (`tokens/src/<product>.json` aliasing ramps in `tokens/src/global.json`) **and** in the
   matching Figma variable collection. Logo colours are not one-off hex values.

---

## 7. Maligai Manager brand colours

Taken from the approved logo. These are the only colours the mark uses:

| Role | Hex | Ramp step | Where it appears |
|---|---|---|---|
| Primary (teal) | `#183C38` | `primaryGreen/500` | the M, the wordmark |
| Secondary (gold) | `#BB893A` | `gold/500` | the crown |
| Tertiary (earth) | `#845E41` | `earth/500` | the two dots |
| Plate dark | `#132F2C` | `primaryGreen/700` | `_Filled` backgrounds |
| Surface | `#F7F5F0` | `neutral/50` | warm page background |

Blue is **not** a Maligai brand colour. It exists only as `info` inside the feedback set.

### Colour token structure

Three layers, matching `tokens/src/global.json` → `tokens/src/<product>.json`:

```
color/feedback/<positive|warning|negative|info>/<25…975>   primitive ramp, 15 steps
  → color/status/<success|warning|danger|info>{,Light,Dark}   global semantic
    → mlgm/color/<positive|negative|warning|info>              product semantic
```

Every ramp — `primaryGreen`, `gold`, `earth`, `neutral`, and all four feedback ramps — is
**15 steps**: `25 50 75 100 200 300 400 500 600 700 800 900 925 950 975`. No ramp has extra
or missing steps, and there are **no standalone `white` / `black` tokens**: `neutral/25` is
`#FFFFFF` and `neutral/975` is `#000000`, so the ends of the ramp carry those roles.

Brand ramps are anchored at `500` by the approved logo. Primitives carry empty `scopes` so
they stay out of Figma's pickers — bind the semantic layer, never a primitive.
