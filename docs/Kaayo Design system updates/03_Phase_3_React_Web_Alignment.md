# Phase 3: React Web Package Alignment (`@aumraa/breathe-react`)

## Objective
Modernize Kaayo's web React components in `@aumraa/breathe-react` (`packages/react/src/kaayo/`) to reflect the "Neobrutalism × Skeuomorphism 2.0" visual language, adding web equivalents for Kaayo's new atoms and molecules (`ClayKnob`, `ClayGroove`, `ClayPill`, `ClayDial`, `StatusDot`, `Chip`, `EnrollmentTag`, `WarliVeil`, `NotificationBanner`, `KhataFolder`).

---

## 1. Context & Sources of Truth

- **Source Specifications**:
  - React Native implementation in `packages/react-native/src/kaayo/` (from Phase 2)
  - `docs/superpowers/plans/2026-10-15-skeuomorphism-2-design-system.md` in Kaayo frontend
  - `.claude/design-direction.md` in Kaayo frontend
- **Target Files in Breathe DS**:
  - `packages/react/src/kaayo/`
  - `packages/react/src/kaayo/index.ts`

---

## 2. Component Modernization Blueprint

### Task 3.1: Upgrade Existing Web Components
1. **`KayoBrutalistButton.tsx`**:
   - Add `tonal?: boolean` variant:
     - 1.5px border in the variant's 900 stop (`var(--kayo-color-primary-900)`)
     - Hard offset shadow in its 975 stop (`var(--kayo-color-primary-975)`)
   - Replace hardcoded `#191b1f` with `--kayo-color-neutral-950` (`#17191D`).
2. **`KayoBrutalistCard.tsx`**:
   - Add `variant="outlinedClay"` support:
     - Radius 24px
     - Border 2px solid `var(--kayo-color-secondary-975)`
     - Box shadow: `2px 2px 0px 0px var(--kayo-color-secondary-700), -2px -2px 0px 0px var(--kayo-color-secondary-200), 8px 10px 22px 0px var(--kayo-color-secondary-200)`
3. **`KayoBrutalistBadge.tsx`**:
   - Retain **UPPERCASE** and 5% letter-spacing (`utility_badge`).
   - Add tone variants (`positive`, `alert`, `negative`, `supportive`, `neutral`, `primary`, `secondary`).

---

### Task 3.2: Implement New Web Atoms & Molecules
Create web (HTML/CSS/SVG) implementations matching their React Native counterparts:

1. **`KayoStatusDot.tsx`**:
   - SVG 8px / 6px / 5px dot
   - States: `active` (positive.500), `live` (positive.500 + glow halo), `inactive` (negative.500), `pending` (alert.500), `upcoming` (hollow 1px neutral.400), `info` (supportive.500)
   - Optional `breathing` CSS keyframe animation (1 $\leftrightarrow$ 0.5 opacity, 2.4s).
2. **`KayoChip.tsx`**:
   - Soft inset clay chip: `boxShadow: inset 2px 2px 4px 0px var(--tone-100), inset -2px -2px 4px 0px #ffffff`
   - **Sentence case, 0 letter-spacing** (`utility_badge_sentence`).
   - Supports `tone`, `size` (`sm` | `md` | `count`), optional leading `dot` (`StatusDot`) or `icon`.
3. **`KayoClayKnob.tsx`**:
   - Round skeuomorphic knob in states: `open`, `complete`, `active`, `positiveLit`, `negativeLit`, `nav`, `success`.
   - CSS raised clay: `-2px -2px 4px 0px #ffffff, 2px 3px 6px 0px var(--tone-200)`.
4. **`KayoClayGroove.tsx`**:
   - Inset soft-clay groove (pill radius, Secondary/50 fill, inset shadow).
   - Three kinds:
     - `Track`: Progress bar (primary or positive).
     - `Split`: Roll-call present (green) + absent (red) + unmarked.
     - `Toggle`: RollItem check / cross.
5. **`KayoClayPill.tsx`**:
   - Inside-card pill button (`Remind all`, `Review and send`).
   - Secondary/500 fill, 1.5px Secondary/900 border, 2px hard Secondary/975 shadow.
6. **`KayoClayDial.tsx` & `KayoSegmentRing.tsx`**:
   - Circular clay dial (Inset 76px or Raised 92px) holding a multi-segment SVG ring and centered numeric value + uppercase caption.
7. **`KayoEnrollmentTag.tsx`**:
   - Rectangular tag with MapPin icon and hairline border (`tertiary` on student cards, `neutral` on summaries).
8. **`KayoWarliVeil.tsx`**:
   - Financial privacy masking component.
   - When hidden: renders `"₹"` + Warli diamond-with-dot SVG glyphs.
   - When revealed: shows the formatted monetary value with a subtle CSS entrance rise.
9. **`KayoKhataFolder.tsx`**:
   - Notched folder tab over a 2px ink ledger panel with hard shadow.
10. **`KayoNotificationBanner.tsx`**:
    - Web implementation of the v3 notification card:
    - Organic category-tinted SVG waves with drop-shadow and inner-light filters.
    - Category pill, sticker slot, and tonal brutalist CTA.
11. **`KayoPushedScreenHeader.tsx`**:
    - Chromeless back bar with `‹ Back label`, title, subtitle, and right action slot.

---

### Task 3.3: Export & Barrel Management
Update `packages/react/src/kaayo/index.ts` to export all new components cleanly.

---

## 3. Verification & Validation Steps

1. Run build and typecheck:
   ```bash
   pnpm --filter @aumraa/breathe-react build
   ```
2. Verify that existing components imported in the Breathe docs site continue to work with no breakages.

---

## 4. Next Chat Handoff Prompt

When Phase 3 is done, copy and paste this into Chat 4:

```markdown
Phase 3 (React Web Package Alignment) is COMPLETE.
Summary of Phase 3:
- Modernized existing web components (KayoBrutalistButton with tonal variant, KayoBrutalistCard with outlinedClay, KayoBrutalistBadge).
- Created web React versions of new atoms and molecules: KayoStatusDot, KayoChip, KayoClayKnob, KayoClayGroove, KayoClayPill, KayoClayDial, KayoSegmentRing, KayoEnrollmentTag, KayoWarliVeil, KayoKhataFolder, KayoNotificationBanner, and KayoPushedScreenHeader.
- 'pnpm --filter @aumraa/breathe-react build' passed with 0 errors.

We are now ready for Phase 4:
Please read and execute:
docs/Kaayo Design system updates/04_Phase_4_Docs_and_Showcase.md
```

