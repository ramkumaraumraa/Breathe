# Phase 4: Documentation Site & Interactive Showcase

## Objective
Update the Breathe Design System documentation website (`src/app/`) to document the "Neobrutalism × Skeuomorphism 2.0" philosophy, showcase the Soft Clay elevation tokens, document new typography roles and notifier categories, add showcase pages for the new Kaayo components, and update the interactive Android phone mockup.

---

## 1. Context & Sources of Truth

- Web components from Phase 3 (`@aumraa/breathe-react/kaayo`)
- Native components from Phase 2 (`@aumraa/breathe-native/kaayo`)
- Documentation site structure:
  - `src/app/pages/foundations/`
  - `src/app/pages/atoms/`, `molecules/`, `organisms/`, `templates/`
  - `src/app/components/layout/navData.ts`
  - `src/app/routes.tsx`

---

## 2. Detailed Tasks & Specifications

### Task 4.1: Foundations Updates
1. **`ElevationPage.tsx`**:
   - Add a dedicated **"Kaayo: Soft Clay & Brutalist Depth"** section.
   - Interactive swatches for:
     - **Brutalist Hard Shadows**: `sm` (2px), `md` (4px), `lg` (6px), `xl` (8px), and `drop` (0/2px).
     - **Soft Clay Raised**: `sm`, `md`, `lg` (dual blurred shadows, top-left light source).
     - **Soft Clay Inset**: `sm`, `md`, `lg` (inner warm shade + inner white light).
     - **Outlined Clay Card**: 2px border + dual rims + warm lift.
     - Live interactive press states showing the mechanical shift (Brutalist: translateY 2px; Clay: raised $\rightarrow$ inset + scale 0.98).
2. **`TypographyPage.tsx`**:
   - Add Kaayo's DM Sans canonical scale.
   - Highlight the **Chip vs. Badge** typography rule:
     - `Badge`: `utility_badge` (UPPERCASE, 5% tracking)
     - `Chip`: `utility_badge_sentence` (Sentence case, 0 tracking)
3. **`ColorsPage.tsx` & `DesignTokensPage.tsx`**:
   - Update Kaayo tokens table to reflect the true 8 families $\times$ 15 stops.
   - Document the **Notifier Feedback Taxonomy** (`positive`, `negative`, `alert`, `supportive`, `neutral`).

---

### Task 4.2: New Component Showcase Pages
Add or update component pages in `src/app/pages/`:
1. **`Atoms`**:
   - **StatusDot**: Interactive preview with status selector (`active`, `live` with glow, `inactive`, `pending`, `upcoming`, `info`), sizes (8, 6, 5), and breathing toggle.
   - **Chip**: Interactive preview with tones (`secondary`, `primary`, `positive`, `alert`, `supportive`, `negative`, `neutral`), sizes (`sm`, `md`, `count`), and optional dot/icon.
   - **Clay Controls**: Showcase `ClayKnob` (states: open, complete, active, lit, nav, success), `ClayGroove` (Track, Split, Toggle), and `ClayPill`.
   - **Warli Veil**: Live toggle demonstrating financial privacy mode (amount disguised with Warli diamond glyphs vs revealed amount).
   - **EnrollmentTag**: Showcase branch/class tags with MapPin in `tertiary` and `neutral` tones.
2. **`Molecules`**:
   - **ClayDial & SegmentRing**: Interactive progress dial (Inset 76 vs Raised 92).
   - **KhataFolder**: Showcase the notched folder tab over a multi-cell ledger body.
   - **NotificationBanner**: Showcase the v3 carousel card with organic category waves, sticker, and tonal brutalist CTA.
   - **PushedScreenHeader**: Showcase the chromeless back bar with back label, title, subtitle, and action slot.
3. **`Organisms & Layouts`**:
   - **CanopyBand**: Preview the 4 animated Warli tab headers (Dashboard zigzags, Students waves, Attendance triangles, Payments sprouts).

---

### Task 4.3: Navigation & Routing
1. Update `src/app/components/layout/navData.ts`:
   - Add navigation entries with `badge: 'Kaayo'` for the new components.
2. Update `src/app/routes.tsx`:
   - Register routes for all newly created pages.

---

### Task 4.4: Android Phone Mockup (`MenuLayoutsPage.tsx`)
Update the interactive Kaayo mockup screens to reflect Kaayo v1.8.0:
- **Home Screen**: Red canopy with Warli zigzags, NotificationBanner v3 carousel, Next Class brutalist card with soft interior (clay dial + inset chips).
- **Students Screen**: Student cards with 2-column layout, `EnrollmentTag`, and `StatusDot`.
- **Payments Screen**: Red canopy with sprouts, KhataFolder overview card, and interactive `WarliVeil` privacy toggle.

---

## 3. Verification & Validation Steps

1. Run Vite development build:
   ```bash
   pnpm build
   ```
2. Ensure there are zero TypeScript errors and all Vite assets compile cleanly.
3. Visual check: Verify the docs site in browser to confirm interactive demos render properly.

---

## 4. Next Chat Handoff Prompt

When Phase 4 is done, copy and paste this into Chat 5:

```markdown
Phase 4 (Documentation Site & Interactive Showcase) is COMPLETE.
Summary of Phase 4:
- ElevationPage updated with interactive Soft Clay (raised, inset, outlined) & Brutalist shadow swatches.
- TypographyPage, ColorsPage, and DesignTokensPage updated with Kaayo v1.8.0 specs.
- Created dedicated documentation & showcase pages for new atoms and molecules (StatusDot, Chip, Clay Controls, WarliVeil, KhataFolder, NotificationBanner, PushedScreenHeader).
- Registered all routes in navData.ts and routes.tsx.
- Android mockup updated to show the blended Neobrutalism × Skeuomorphism 2.0 screens.
- 'pnpm build' passed with 0 errors.

We are now ready for Phase 5:
Please read and execute:
docs/Kaayo Design system updates/05_Phase_5_Integration_and_Verification.md
```

