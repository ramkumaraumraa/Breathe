# Breathe Design System — Logos Page PRD

**Foundation:** Logos  
**Version:** 1.0  
**Status:** Draft for Figma Make  
**Author:** Ramkumar Ganesh — AUMRAA Technologies  
**Date:** April 2026  

---

## 1. Overview

The Logos page is a new entry inside the Foundations section of the Breathe documentation site. It serves as the single source of truth for all brand logo assets across every AUMRAA product. For brands with confirmed logos, it displays the complete 8-variant logo set organised by brand tab. For brands whose logos are not yet ready, it shows a coming-soon placeholder state — calm, minimal, on-brand with the Breathe aesthetic.

This page is purely a viewer and download hub in this phase. No generation happens in the browser. Assets are pre-prepared and committed to the repository.

---

## 2. Navigation Change

### Left panel — Foundations section

Add **Logos** as the first item inside Foundations, directly above Colors. The updated Foundations order becomes:

```
Foundations
  └── Logos          ← NEW — insert here
  └── Colors
  └── Typography
  └── Spacing
  └── Grid
  └── Elevation
  └── Iconography
  └── Motion
```

### navData.ts update

In `src/app/components/layout/navData.ts`, add the following entry as the first item in the Foundations section items array:

```ts
{ label: 'Logos', path: '/foundations/logos', description: 'Brand logo sets and download assets' }
```

### routes.ts update

Add a new route for the Logos page:

```ts
{ path: 'foundations/logos', Component: LogosPage }
```

File location: `src/app/pages/foundations/LogosPage.tsx`

---

## 3. Page Structure

### 3.1 Page Header

Uses the existing `PageHeader` component with the following props:

| Prop | Value |
|---|---|
| `title` | `Logos` |
| `description` | `Official logo sets for every AUMRAA product. Each variant is built to a defined standard — use the correct variant for each surface and context. Download individual files or the full brand set as a ZIP.` |
| `section` | `Foundations` |
| `badge` | `Brand Assets` |
| `badgeColor` | `indigo` |

---

### 3.2 Brand Tabs

Directly below the page header, render a horizontal tab bar — one tab per product. Tab order:

1. Leminiscate
2. Aumraa
3. Maligai Manager
4. Ullagellam
5. Ilakh
6. Yakaizen

Each tab shows:
- Product name as the tab label
- Platform tag as a small badge next to the label (e.g. `Web · Mobile`)

Tab bar behaviour follows the same pattern as the existing Tabs component in the system. Active tab state uses the brand's primary color accent where available, falling back to the system primary.

---

### 3.3 Tab Content — Confirmed Brand (Logo available)

When a brand has logos uploaded, the tab content shows:

#### Brand identity bar

A single row at the top of the tab content area showing:
- Brand name (large, display font)
- Tagline in muted text
- Platform badge
- A "Download full set" button (right-aligned) — triggers ZIP download of all 8 variants

#### Logo set grid

An 8-cell grid (4 columns × 2 rows on desktop, 2 columns × 4 rows on mobile) showing one card per variant.

Each logo card contains:

**Top area — preview zone**
- Fixed height: `160px`
- Background adapts to variant context (see variant spec below)
- Logo rendered centred in the preview zone
- No border on preview area itself — the card border provides containment

**Bottom area — metadata strip**
- Variant name (e.g. `Standard`)
- Short usage note (1 line, muted text)
- File format badge — `SVG` `PNG`
- Download icon button (downloads that single variant)

#### Variant specifications

| # | Variant name | Preview background | Usage note | Files included |
|---|---|---|---|---|
| 1 | Standard | White `#FFFFFF` | Default use — light surfaces, documents, web | SVG, PNG @1x, @2x, @3x |
| 2 | Reversed | Brand primary dark (e.g. `primary.800`) | Dark backgrounds, hero sections, splash screens | SVG, PNG @1x, @2x, @3x |
| 3 | Mono — Black | White `#FFFFFF` | Single-colour print, B&W contexts, emboss/deboss | SVG, PNG @1x, @2x, @3x |
| 4 | Mono — White | Neutral grey `#E3E4E4` | Single-colour on dark, merchandise, cut vinyl | SVG, PNG @1x, @2x, @3x |
| 5 | Horizontal lockup | White `#FFFFFF` | Wide/landscape layouts — nav bars, headers, email footers | SVG, PNG @1x, @2x, @3x |
| 6 | Stacked / Vertical | White `#FFFFFF` | Square/portrait layouts — app stores, social profiles, print collateral | SVG, PNG @1x, @2x, @3x |
| 7 | Icon / Mark only | White `#FFFFFF` | Favicons, app icons, small-scale usage, watermarks | SVG, PNG @16, @32, @64, @128, @256, @512 |
| 8 | Alpha / Transparent | Checkerboard pattern (standard transparency indicator) | Overlays, video, any background where the surface colour is unknown | SVG, PNG @1x, @2x, @3x |

#### Platform export section

Below the 8-variant grid, a collapsible section labelled **Platform Export Sets**. Collapsed by default.

When expanded, shows two sub-sections side by side:

**iOS Icon Set**

Table listing every required iOS icon size:

| Usage | Size | Scale |
|---|---|---|
| App Store | 1024×1024 | @1x |
| iPhone home screen | 180×180 | @3x |
| iPhone home screen | 120×120 | @2x |
| iPad Pro home screen | 167×167 | @2x |
| iPad home screen | 152×152 | @2x |
| iPad home screen | 76×76 | @1x |
| iPhone Spotlight | 120×120 | @3x |
| iPhone Spotlight | 80×80 | @2x |
| iPad Spotlight | 80×80 | @2x |
| iPad Spotlight | 40×40 | @1x |
| iPhone Settings | 87×87 | @3x |
| iPhone Settings | 58×58 | @2x |
| iPad Settings | 58×58 | @2x |
| iPad Settings | 29×29 | @1x |
| iPhone Notification | 60×60 | @3x |
| iPhone Notification | 40×40 | @2x |
| iPad Notification | 40×40 | @2x |
| iPad Notification | 20×20 | @1x |

Notes:
- All iOS app icons must have a flat, opaque background. No transparency.
- Recommended: use `primary.500` as background with the Icon/Mark only variant centred at 80% of the canvas.
- Corner rounding is applied by iOS automatically — do not pre-round the source asset.

**Android Icon Set**

Table listing every required Android icon size:

| Usage | Size | Density |
|---|---|---|
| Play Store listing | 512×512 | — |
| Launcher — xxxhdpi | 192×192 | xxxhdpi |
| Launcher — xxhdpi | 144×144 | xxhdpi |
| Launcher — xhdpi | 96×96 | xhdpi |
| Launcher — hdpi | 72×72 | hdpi |
| Launcher — mdpi | 48×48 | mdpi |
| Adaptive — foreground layer | 108×108 | @1x (safe zone: 72×72 centred) |
| Adaptive — background layer | 108×108 | @1x (solid fill or pattern) |

Notes:
- Android adaptive icons require two separate assets: a foreground layer (mark only, on transparent) and a background layer (solid colour or pattern, no mark).
- The safe zone for the foreground is the inner 72×72px of the 108×108 canvas. Keep the mark within this zone to avoid clipping on any device.
- Recommended: background layer = `primary.500` solid fill. Foreground = Icon/Mark only on transparent.

A "Download iOS set" and "Download Android set" button at the bottom of each sub-section.

---

### 3.4 Tab Content — Pending Brand (No logo yet)

When a brand does not yet have logos, the tab content shows a placeholder state instead of the grid.

#### Placeholder layout

Centred in the content area, with generous vertical padding (`80px` top and bottom).

**Illustration area**
- A simple geometric SVG illustration — not a cartoon, not a clipart icon.
- Style: minimal, calm, grid-based. Consistent with the Breathe aesthetic.
- The illustration communicates "something is being built here" without being clichéd (no under-construction signs, no hammers).
- Suggested concept: an abstract arrangement of the 8 logo variant outlines as empty placeholder rectangles in a grid layout — like the logo set grid itself, but ghosted. This gives the user a preview of what will appear here.
- Size: `240px` wide, centred.

**Text block**

Below the illustration:

```
[Product Name]
Logos coming soon
```

- Product name: display font, medium weight, `text-slate-900 dark:text-white`
- "Logos coming soon": body font, muted color `text-slate-400 dark:text-slate-500`
- Platform badge below: same style as confirmed-brand tabs

**No action required** — no upload button, no link, no CTA. This is a read-only documentation state. When logos are ready, they are added to the repo and the page updates.

---

## 4. Logo File Naming Convention

All logo files committed to the repository follow this naming standard:

```
/assets/logos/[brand-id]/[brand-id]_[variant]_[color-mode].[ext]
```

**Brand IDs:**
- `leminiscate`
- `aumraa`
- `maligai-manager`
- `ullagellam`
- `ilakh`
- `yakaizen`

**Variant slugs:**
- `standard`
- `reversed`
- `mono-black`
- `mono-white`
- `horizontal`
- `stacked`
- `icon`
- `alpha`

**Color mode suffixes:**
- `light` — for use on light backgrounds
- `dark` — for use on dark backgrounds
- `(omit)` — for mono and alpha variants where mode is irrelevant

**Scale suffixes (PNG only):**
- `@1x`, `@2x`, `@3x` for standard variants
- `@16`, `@32`, `@64`, `@128`, `@256`, `@512` for icon variant

**Examples:**
```
leminiscate_standard_light.svg
leminiscate_standard_light@2x.png
leminiscate_reversed_dark.svg
leminiscate_mono-black.svg
leminiscate_icon@512.png
aumraa_horizontal_light.svg
aumraa_stacked_light@3x.png
```

---

## 5. ZIP Download Structure

When a user clicks "Download full set", the ZIP file is structured as:

```
[brand-id]-logos/
  ├── svg/
  │   ├── [brand-id]_standard_light.svg
  │   ├── [brand-id]_standard_dark.svg  (if applicable)
  │   ├── [brand-id]_reversed_dark.svg
  │   ├── [brand-id]_mono-black.svg
  │   ├── [brand-id]_mono-white.svg
  │   ├── [brand-id]_horizontal_light.svg
  │   ├── [brand-id]_stacked_light.svg
  │   ├── [brand-id]_icon.svg
  │   └── [brand-id]_alpha.svg
  ├── png/
  │   ├── 1x/
  │   ├── 2x/
  │   └── 3x/
  ├── ios/
  │   └── (all iOS sizes as PNG)
  └── android/
      ├── foreground/
      └── background/
```

---

## 6. Usage Guidelines Section

Below the brand tabs, a static section (not brand-specific) with two columns:

**Do**
- Use Standard on all light backgrounds
- Use Reversed on dark or brand-colored backgrounds
- Use Mono Black for single-colour print requirements
- Use Mono White on dark merchandise or cut-vinyl applications
- Use Icon only below 40px display size or in favicons
- Use Alpha when the background surface colour is unknown
- Maintain minimum clear space of 1× the icon height on all sides of the logo

**Don't**
- Stretch, distort, or rotate any logo variant
- Recreate any variant from memory — always use the files from this system
- Use the Standard variant on a dark background
- Apply drop shadows, glows, or effects to any logo
- Place the logo on a background that creates insufficient contrast
- Use the wordmark at sizes below 80px wide (use Icon only instead)
- Mix variants from different brands in the same layout

---

## 7. Component Architecture

```
src/app/pages/foundations/
  └── LogosPage.tsx          ← Main page component

src/app/pages/foundations/logos/
  └── LogoVariantCard.tsx    ← Single variant card (preview + metadata + download)
  └── BrandLogoTab.tsx       ← Full tab content for a confirmed brand
  └── LogoPlaceholder.tsx    ← Coming-soon placeholder for pending brands
  └── PlatformExportPanel.tsx ← Collapsible iOS + Android export section
  └── logoData.ts            ← Brand config: id, label, platform, status, asset paths
```

### logoData.ts structure

```ts
export type LogoStatus = 'confirmed' | 'pending';

export interface LogoVariant {
  id: string;           // e.g. 'standard'
  name: string;         // e.g. 'Standard'
  usageNote: string;
  previewBg: string;    // CSS color value or 'checkerboard'
  previewBgDark?: string;
  files: {
    svg?: string;       // path to SVG asset
    png1x?: string;
    png2x?: string;
    png3x?: string;
  };
}

export interface BrandLogoConfig {
  id: string;
  label: string;
  tagline: string;
  platform: string;
  status: LogoStatus;
  accentColor: string;  // primary.500 hex for tab accent
  variants?: LogoVariant[];  // only present when status = 'confirmed'
}

export const brands: BrandLogoConfig[] = [
  {
    id: 'leminiscate',
    label: 'Leminiscate',
    tagline: 'Real estate intelligence',
    platform: 'Web · Mobile',
    status: 'confirmed',
    accentColor: '#1C60C1',
    variants: [ /* 8 variant objects */ ],
  },
  {
    id: 'aumraa',
    label: 'Aumraa',
    tagline: 'Design studio & product brand',
    platform: 'Web · Marketing',
    status: 'confirmed',
    accentColor: '#2F9E44',
    variants: [ /* 8 variant objects */ ],
  },
  {
    id: 'maligai-manager',
    label: 'Maligai Manager',
    tagline: 'Grocery & inventory management',
    platform: 'Mobile',
    status: 'pending',
    accentColor: '#D97706',
  },
  {
    id: 'ullagellam',
    label: 'Ullagellam',
    tagline: 'Explore & discover around you',
    platform: 'Mobile',
    status: 'pending',
    accentColor: '#7C3AED',
  },
  {
    id: 'ilakh',
    label: 'Ilakh',
    tagline: 'Goal tracking & personal finance',
    platform: 'Web · Mobile',
    status: 'pending',
    accentColor: '#0369A1',
  },
  {
    id: 'yakaizen',
    label: 'Yakaizen',
    tagline: 'Habit & continuous improvement',
    platform: 'Mobile · Smartwatch',
    status: 'pending',
    accentColor: '#334155',
  },
];
```

---

## 8. States Summary

| Brand | Status | Tab shows |
|---|---|---|
| Leminiscate | Confirmed | Full 8-variant grid + platform export section |
| Aumraa | Confirmed | Full 8-variant grid + platform export section |
| Maligai Manager | Pending | Coming-soon placeholder |
| Ullagellam | Pending | Coming-soon placeholder |
| Ilakh | Pending | Coming-soon placeholder |
| Yakaizen | Pending | Coming-soon placeholder |

When a pending brand's logos are ready: update `status` to `'confirmed'`, add the `variants` array with asset paths, commit the files to `/assets/logos/[brand-id]/`. The placeholder automatically gives way to the full grid.

---

## 9. What is Out of Scope for This Phase

The following are intentional exclusions from this PRD. They are tracked as future phases.

| Feature | Phase |
|---|---|
| In-browser logo upload and live variant generation | Phase 2 |
| Automatic color extraction from uploaded SVG | Phase 2 |
| Automatic 15-stop palette generation from extracted colors | Phase 2 |
| iOS/Android icon auto-generation from source SVG | Phase 3 |
| Brand guideline PDF generation | Future |
| Logo usage approval workflow | Future |

---

## 10. Figma Make — What to Build

| Element | Instruction |
|---|---|
| Left nav | Add `Logos` as first item in Foundations section, above Colors |
| Route | Add `/foundations/logos` route pointing to `LogosPage.tsx` |
| Page header | Use existing `PageHeader` component — props in Section 3.1 |
| Tab bar | Brand tabs with platform badge — same Tabs component pattern already in system |
| Logo card grid | 4-col desktop / 2-col mobile grid, 8 cards per brand tab |
| Logo card | Preview zone (160px, context-appropriate bg) + metadata strip + download button |
| Platform export | Collapsible panel below the 8-card grid — collapsed by default |
| Placeholder state | Centred illustration + product name + "Logos coming soon" — calm, geometric illustration |
| Usage guidelines | Static two-column Do / Don't section below all brand tabs |
| `logoData.ts` | Brand config file as specified in Section 7 — drives everything |
| Asset folder | Create `/assets/logos/[brand-id]/` folders for Leminiscate and Aumraa, add logo files following naming convention in Section 4 |
| No new components | `LogoVariantCard`, `BrandLogoTab`, `LogoPlaceholder`, `PlatformExportPanel` are new sub-components — create inside `src/app/pages/foundations/logos/` |

---

*End of PRD — Breathe Logos Page v1.0*
