# Phase 2: React Native DS Upstreaming (`@aumraa/breathe-native`)

## Objective
Upstream Kaayo's complete, tested 89-component React Native design system from `frontend/design-system/` into `@aumraa/breathe-native` under `packages/react-native/src/kaayo/`. Ensure that `@aumraa/breathe-native` properly exports Kaayo so any mobile app in Aumraa can consume it natively.

---

## 1. Context & Sources of Truth

- **Source Code**:
  - `D:\Aumraa\APOS pitch\1_Product Factory\01_Kaayo\Product\Development\version 1\frontend\design-system/` (entire directory)
  - `D:\Aumraa\APOS pitch\1_Product Factory\01_Kaayo\Product\Development\version 1\frontend\__tests__\design-system-guard.test.ts`
- **Target Location in Breathe DS**:
  - `packages/react-native/src/kaayo/`
  - `packages/react-native/package.json` (add `"./kaayo"` exports)
  - `packages/react-native/test/kaayo/` (guard tests)

---

## 2. Directory Architecture for `packages/react-native/src/kaayo/`

```
packages/react-native/src/kaayo/
├── index.ts                     # Public barrel export
├── foundations/
│   ├── tokens.ts                # kayoColors, kayoSpace, kayoRadius, kayoShadow, kayoClay, kayoMotion, kayoGrid
│   ├── theme.ts                 # Semantic aliases (surface, text, border, overlay, status, action, brand)
│   ├── typography.ts            # DM Sans scale & canonical roles (utility_badge_sentence, etc.)
│   └── notifier.ts              # Unified notifier taxonomy & styles (positive, alert, negative, etc.)
├── components/
│   ├── atoms/
│   │   ├── AddSlot.tsx
│   │   ├── Alert.tsx
│   │   ├── AmountVisibilityToggle.tsx
│   │   ├── Avatar.tsx
│   │   ├── Badge.tsx
│   │   ├── BranchTabs.tsx
│   │   ├── Button.tsx           # Supports tonal?: boolean
│   │   ├── Card.tsx             # Supports variant="default" | "outlinedClay"
│   │   ├── Checkbox.tsx
│   │   ├── Chip.tsx             # Soft inset clay chip with sentence case
│   │   ├── ChoiceChip.tsx
│   │   ├── ClayGroove.tsx       # Track, Split, Toggle
│   │   ├── ClayKnob.tsx         # Open, complete, active, lit states, nav, success
│   │   ├── ClayPill.tsx         # Pill action inside cards
│   │   ├── DataTable.tsx
│   │   ├── Dialog.tsx
│   │   ├── EmptyState.tsx
│   │   ├── EnrollmentTag.tsx    # MapPin outlined branch/class tag
│   │   ├── Input.tsx
│   │   ├── KaayoLoader.tsx
│   │   ├── KaayoLogo.tsx
│   │   ├── MonthStamp.tsx
│   │   ├── PaymentSummaryCard.tsx
│   │   ├── PhotoViewer.tsx
│   │   ├── PhotoWell.tsx
│   │   ├── Progress.tsx
│   │   ├── RadioGroup.tsx
│   │   ├── SegmentRing.tsx
│   │   ├── Select.tsx
│   │   ├── Separator.tsx
│   │   ├── Skeleton.tsx
│   │   ├── status-tones.ts
│   │   ├── StatusDot.tsx        # SVG 8/6/5px + live glow + breathing
│   │   ├── StudentAvatar.tsx
│   │   ├── Switch.tsx
│   │   ├── TabFilter.tsx
│   │   ├── Toast.tsx
│   │   ├── warli-veil.ts
│   │   └── WarliVeil.tsx        # Amount privacy masking with Warli diamond glyphs
│   ├── molecules/
│   │   ├── ChipMultiSelect.tsx
│   │   ├── ClayDial.tsx         # Inset 76 / Raised 92 dial with SegmentRing
│   │   ├── DateField.tsx        # Native picker trigger (no typed dates)
│   │   ├── TimeField.tsx        # Native time picker trigger (no typed times)
│   │   ├── MonthField.tsx       # Native month picker trigger (no typed months)
│   │   ├── MonthPicker.tsx
│   │   ├── MonthCalendarSheet.tsx
│   │   ├── DeleteGuardSheet.tsx
│   │   ├── GroupMessageSheet.tsx
│   │   ├── InsetSearchField.tsx
│   │   ├── KhataFolder.tsx      # Notched tab + ledger panel
│   │   ├── NotificationBanner.tsx # v3 soft clay carousel card with SVG waves
│   │   ├── PushedScreenHeader.tsx # Canonical chromeless back bar
│   │   ├── ScreenFooterButton.tsx
│   │   ├── SecondaryTabs.tsx
│   │   ├── stepper-progress.ts
│   │   ├── Stepper.tsx
│   │   ├── Tabs.tsx
│   │   ├── WeekStrip.tsx        # Weekly date strip with day dots
│   │   ├── WhatsAppPrefPicker.tsx
│   │   └── WhatsAppSendModal.tsx
│   ├── organisms/
│   │   ├── BrandedScreenBackdrop.contract.ts
│   │   ├── BrandedScreenBackdrop.tsx
│   │   ├── CanopyBand.tsx       # Animated Warli tab motifs
│   │   ├── KaayoTabBar.tsx      # 5-tab brutalist/clay bottom bar
│   │   └── QuickActionsFab.tsx  # Presentational FAB + menu
│   └── templates/
│       ├── AppErrorBoundary.tsx
│       ├── AppShell.tsx
│       ├── AuthShell.tsx
│       ├── biometricGate.ts
│       ├── BiometricShield.tsx  # App lock & PaymentsLock
│       └── SetupShell.tsx
```

---

## 3. Package Configuration Updates

Update `packages/react-native/package.json` exports:
```json
"exports": {
  ".": { "types": "./src/index.ts", "default": "./src/index.ts" },
  "./kaayo": { "types": "./src/kaayo/index.ts", "default": "./src/kaayo/index.ts" },
  "./metro": "./metro.js",
  "./styles/*": "./styles/*",
  "./package.json": "./package.json"
}
```

Verify peer dependencies in `packages/react-native/package.json`:
- `react-native-reanimated` $\ge 4.3.1$
- `react-native-svg` $\ge 15.15.4$
- `lucide-react-native` $\ge 1.16.0$
- `@expo-google-fonts/dm-sans`
- `expo-haptics`, `expo-local-authentication` (optional peer dependencies for templates)

---

## 4. Guard Test Implementation

Create `packages/react-native/test/kaayo/design-system-guard.test.ts` (ported from Kaayo):
- Scans `src/kaayo/components/`
- Fails if any component uses:
  - Literal `boxShadow:` string/template with `px`
  - Old RN shadow props (`shadowOffset`, `shadowColor`, `elevation > 0`)
  - Hardcoded `#hex` or `rgba(` (outside the strict 2-item allowlist: `warli-scenes.ts` and `TarpaMedallion.tsx`)
  - Retired component names (`LegacyNotificationBanner`, `ComingSoon`, etc.)

---

## 5. Verification & Validation Steps

1. Run TypeScript check:
   ```bash
   pnpm --filter @aumraa/breathe-native typecheck
   ```
2. Run Jest unit & guard tests:
   ```bash
   pnpm --filter @aumraa/breathe-native test
   ```
3. Verify that Lemniscate components in `packages/react-native/src/atoms/` continue to compile cleanly.

---

## 6. Next Chat Handoff Prompt

When Phase 2 is done, copy and paste this into Chat 3:

```markdown
Phase 2 (React Native DS Upstreaming) is COMPLETE.
Summary of Phase 2:
- Ported all foundations, 41 atoms, molecules, organisms, and templates into packages/react-native/src/kaayo/.
- Configured package.json with './kaayo' exports.
- Ported design-system-guard.test.ts into packages/react-native/test/kaayo/.
- 'pnpm --filter @aumraa/breathe-native typecheck' and tests pass with 0 errors.

We are now ready for Phase 3:
Please read and execute:
docs/Kaayo Design system updates/03_Phase_3_React_Web_Alignment.md
```

