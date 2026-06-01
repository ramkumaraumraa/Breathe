# Step 2 — Merge Lemniscate Design System into Breathe + Build Token Architecture

> **Agent instructions:** Read this entire file before running any command.
> This step has four phases. Complete them in order. Do not skip ahead.
> Breathe is already running locally at localhost:5173.
> breathe-extract/ is the staged snapshot of Lemniscate's design system from Step 1.

---

## ⚠️ Path Reference — Read Before Running Any Command

These two repos are NOT siblings. They live in different parent folders.
Always use the full paths below — never assume relative paths between them.

| Reference | Full path |
|---|---|
| **Breathe repo** (you are working here) | `~/Breathe Design system/` |
| **breathe-extract folder** | `~/Lemniscate/Dev/breathe-extract/` |
| **Lemniscate app repo** | `~/Lemniscate/Dev/lemniscate/` |

Wherever this file says `breathe/` it means `~/Breathe Design system/`.
Wherever this file says `breathe-extract/` it means `~/Lemniscate/Dev/breathe-extract/`.
All terminal commands must use these absolute paths explicitly.

---

## Context

Breathe is Aumraa Technologies' standalone design system — the single source of truth for
all products. We are building a two-layer token architecture:

- **Layer 1 — Global tokens** (`tokens/global.css`): raw values, no product meaning
- **Layer 2 — Product aliases** (`tokens/{product}.css`): semantic meaning per product

Products and their token prefixes:
| Product | Prefix | Notes |
|---|---|---|
| Lemniscate | `lmns` | Community finance app — light surfaces |
| Technocracy | `tech` | Admin dashboard — dark surfaces |
| Aumraa (studio) | `amra` | Studio-level brand — used in marketing |

shadcn components always read generic vars (`--primary`, `--accent` etc.).
Each app's `globals.css` bridges product tokens → shadcn vars.
Components never reference product prefixes directly.

---

## Pre-flight checks

Run these before starting. Confirm both folders are accessible:

```bash
ls ~/Breathe\ Design\ system/src/styles/          # should show theme.css, index.css, fonts.css, tailwind.css
ls ~/Lemniscate/Dev/breathe-extract/styles/      # should show globals.css, index.css
ls ~/Lemniscate/Dev/breathe-extract/components/ui/
ls ~/Lemniscate/Dev/breathe-extract/components/custom/template/
ls ~/Breathe\ Design\ system/public/assets/logos/ # should show aumraa/ and leminiscate/ folders
```

---

## Phase 1 — Build the Token Layer

Create a new folder `tokens/` inside `~/Breathe Design system/src/styles/`:

```bash
mkdir -p ~/Breathe\ Design\ system/src/styles/tokens
```

### 1A — Create `global.css` (raw palette — no product meaning)

Create `~/Breathe Design system/src/styles/tokens/global.css` with this exact content:

```css
/* ============================================================
   BREATHE — Global Design Tokens
   Raw values only. No semantic meaning. No product references.
   All product alias files import from here.
   ============================================================ */

:root {

  /* --- Color palette --- */

  /* Blue family — Aumraa brand primary */
  --color-blue-300: #6EC6E6;
  --color-blue-400: #40AAD4;   /* sky blue — Lemniscate light primary */
  --color-blue-500: #2B7BC5;   /* mid blue — Lemniscate dark primary */
  --color-blue-700: #1C60C1;   /* dark blue — secondary / gradients */
  --color-blue-900: #0F3A7A;   /* deep navy */

  /* Orange family — Aumraa accent */
  --color-orange-300: #F0A05A;
  --color-orange-500: #E07722; /* brand orange — roof tip accent */
  --color-orange-700: #B55A10;

  /* Neutral family */
  --color-white:     #ffffff;
  --color-gray-50:   #F9FAFB;
  --color-gray-100:  #F3F4F6;
  --color-gray-200:  #E5E7EB;
  --color-gray-300:  #D1D5DB;
  --color-gray-400:  #9CA3AF;
  --color-gray-500:  #6B7280;
  --color-gray-600:  #4B5563;
  --color-gray-700:  #374151;
  --color-gray-800:  #1F2937;
  --color-gray-900:  #111827;
  --color-black:     #000000;

  /* Semantic status colors */
  --color-success:       #16A34A;
  --color-success-light: #DCFCE7;
  --color-success-dark:  #14532D;

  --color-warning:       #D97706;
  --color-warning-light: #FEF3C7;
  --color-warning-dark:  #92400E;

  --color-danger:        #DC2626;
  --color-danger-light:  #FEE2E2;
  --color-danger-dark:   #7F1D1D;

  --color-info:          #0284C7;
  --color-info-light:    #E0F2FE;
  --color-info-dark:     #0C4A6E;

  /* --- Typography --- */
  --font-sans:   'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono:   'JetBrains Mono', 'Fira Code', 'Courier New', monospace;

  --text-2xs:  0.625rem;   /* 10px */
  --text-xs:   0.75rem;    /* 12px */
  --text-sm:   0.875rem;   /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg:   1.125rem;   /* 18px */
  --text-xl:   1.25rem;    /* 20px */
  --text-2xl:  1.5rem;     /* 24px */
  --text-3xl:  1.875rem;   /* 30px */
  --text-4xl:  2.25rem;    /* 36px */

  --font-weight-normal:   400;
  --font-weight-medium:   500;
  --font-weight-semibold: 600;
  --font-weight-bold:     700;

  --leading-tight:  1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;

  /* --- Spacing scale --- */
  --space-0:   0;
  --space-1:   0.25rem;   /* 4px */
  --space-2:   0.5rem;    /* 8px */
  --space-3:   0.75rem;   /* 12px */
  --space-4:   1rem;      /* 16px */
  --space-5:   1.25rem;   /* 20px */
  --space-6:   1.5rem;    /* 24px */
  --space-8:   2rem;      /* 32px */
  --space-10:  2.5rem;    /* 40px */
  --space-12:  3rem;      /* 48px */
  --space-16:  4rem;      /* 64px */

  /* --- Border radius --- */
  --radius-none: 0;
  --radius-sm:   0.25rem;    /* 4px */
  --radius-md:   0.5rem;     /* 8px */
  --radius-lg:   0.625rem;   /* 10px — Lemniscate default */
  --radius-xl:   1rem;       /* 16px */
  --radius-full: 9999px;

  /* --- Elevation / Shadow --- */
  --shadow-xs:  0 1px 2px rgba(0,0,0,0.05);
  --shadow-sm:  0 1px 3px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.06);
  --shadow-md:  0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06);
  --shadow-lg:  0 10px 15px rgba(0,0,0,0.10), 0 4px 6px rgba(0,0,0,0.05);
  --shadow-xl:  0 20px 25px rgba(0,0,0,0.10), 0 10px 10px rgba(0,0,0,0.04);

  /* --- Icon sizes --- */
  --icon-xs:  12px;
  --icon-sm:  16px;
  --icon-md:  20px;
  --icon-lg:  24px;
  --icon-xl:  32px;

  /* --- Motion --- */
  --duration-fast:   100ms;
  --duration-normal: 200ms;
  --duration-slow:   300ms;
  --ease-default:    cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in:         cubic-bezier(0.4, 0, 1, 1);
  --ease-out:        cubic-bezier(0, 0, 0.2, 1);

}
```

---

### 1B — Create `lemniscate.css` (lmns-- product aliases)

Create `~/Breathe Design system/src/styles/tokens/lemniscate.css`:

```css
/* ============================================================
   BREATHE — Lemniscate Product Tokens
   Prefix: lmns--
   Product: Lemniscate (Community Finance SaaS)
   Surface: Light — white backgrounds, blue primary
   All values reference global tokens. Never raw hex here.
   ============================================================ */

@import './global.css';

:root {

  /* --- Colors --- */
  --lmns-primary:              var(--color-blue-400);
  --lmns-primary-dark:         var(--color-blue-700);
  --lmns-primary-foreground:   var(--color-white);

  --lmns-secondary:            var(--color-blue-700);
  --lmns-secondary-foreground: var(--color-white);

  --lmns-accent:               var(--color-orange-500);
  --lmns-accent-foreground:    var(--color-white);

  --lmns-background:           var(--color-white);
  --lmns-background-secondary: var(--color-gray-50);
  --lmns-background-tertiary:  var(--color-gray-100);

  --lmns-foreground:           var(--color-gray-800);
  --lmns-foreground-secondary: var(--color-gray-500);
  --lmns-foreground-tertiary:  var(--color-gray-400);

  --lmns-border:               var(--color-gray-200);
  --lmns-border-hover:         var(--color-gray-300);

  --lmns-success:              var(--color-success);
  --lmns-warning:              var(--color-warning);
  --lmns-danger:               var(--color-danger);
  --lmns-info:                 var(--color-info);

  /* Gradient — sky blue → dark blue (brand gradient) */
  --lmns-gradient-start:       var(--color-blue-400);
  --lmns-gradient-end:         var(--color-blue-700);

  /* --- Typography --- */
  --lmns-font-body:            var(--font-sans);
  --lmns-font-mono:            var(--font-mono);
  --lmns-font-size-base:       var(--text-base);     /* 16px */
  --lmns-font-weight-body:     var(--font-weight-normal);
  --lmns-font-weight-heading:  var(--font-weight-medium);
  --lmns-line-height:          var(--leading-normal);

  /* --- Spacing --- */
  --lmns-spacing-unit:         var(--space-4);       /* 16px base unit */
  --lmns-page-padding:         var(--space-6);
  --lmns-card-padding:         var(--space-6);
  --lmns-section-gap:          var(--space-8);

  /* --- Radius --- */
  --lmns-radius:               var(--radius-lg);     /* 10px — default */
  --lmns-radius-sm:            var(--radius-md);
  --lmns-radius-lg:            var(--radius-xl);
  --lmns-radius-pill:          var(--radius-full);

  /* --- Elevation --- */
  --lmns-shadow-card:          var(--shadow-sm);
  --lmns-shadow-modal:         var(--shadow-lg);
  --lmns-shadow-dropdown:      var(--shadow-md);

  /* --- Icons --- */
  --lmns-icon-xs:              var(--icon-xs);
  --lmns-icon-sm:              var(--icon-sm);
  --lmns-icon-md:              var(--icon-md);       /* 20px — default */
  --lmns-icon-lg:              var(--icon-lg);

  /* --- Logos --- */
  --lmns-logo-primary:         '/assets/logos/leminiscate/leminiscate_standard_light.svg';
  --lmns-logo-icon:            '/assets/logos/leminiscate/leminiscate_icon.svg';
  --lmns-logo-horizontal:      '/assets/logos/leminiscate/leminiscate_horizontal_light.svg';
  --lmns-logo-reversed:        '/assets/logos/leminiscate/leminiscate_reversed_dark.svg';
  --lmns-logo-mono-light:      '/assets/logos/leminiscate/leminiscate_mono-white.svg';
  --lmns-logo-mono-dark:       '/assets/logos/leminiscate/leminiscate_mono-black.svg';

}

/* --- Dark mode overrides --- */
.dark {
  --lmns-primary:              var(--color-blue-300);
  --lmns-primary-foreground:   var(--color-gray-900);

  --lmns-background:           var(--color-gray-900);
  --lmns-background-secondary: var(--color-gray-800);
  --lmns-background-tertiary:  var(--color-gray-700);

  --lmns-foreground:           var(--color-gray-50);
  --lmns-foreground-secondary: var(--color-gray-400);
  --lmns-foreground-tertiary:  var(--color-gray-500);

  --lmns-border:               var(--color-gray-700);
  --lmns-border-hover:         var(--color-gray-600);

  --lmns-logo-primary:         '/assets/logos/leminiscate/leminiscate_reversed_dark.svg';
}
```

---

### 1C — Create `technocracy.css` (tech-- product aliases)

Create `~/Breathe Design system/src/styles/tokens/technocracy.css`:

```css
/* ============================================================
   BREATHE — Technocracy Product Tokens
   Prefix: tech--
   Product: Technocracy (Aumraa Admin Dashboard)
   Surface: Dark — dark sidebar, neutral surfaces
   All values reference global tokens. Never raw hex here.
   ============================================================ */

@import './global.css';

:root {

  /* --- Colors --- */
  --tech-primary:              var(--color-blue-400);
  --tech-primary-foreground:   var(--color-white);

  --tech-accent:               var(--color-orange-500);
  --tech-accent-foreground:    var(--color-white);

  /* Dark surface theme */
  --tech-background:           var(--color-gray-900);
  --tech-background-secondary: var(--color-gray-800);
  --tech-background-tertiary:  var(--color-gray-700);

  --tech-sidebar:              #111827;
  --tech-sidebar-foreground:   var(--color-gray-100);
  --tech-sidebar-accent:       var(--color-gray-800);

  --tech-foreground:           var(--color-gray-50);
  --tech-foreground-secondary: var(--color-gray-400);
  --tech-foreground-tertiary:  var(--color-gray-500);

  --tech-border:               var(--color-gray-700);
  --tech-border-hover:         var(--color-gray-600);

  --tech-success:              var(--color-success);
  --tech-warning:              var(--color-warning);
  --tech-danger:               var(--color-danger);
  --tech-info:                 var(--color-info);

  /* --- Typography --- */
  --tech-font-body:            var(--font-sans);
  --tech-font-mono:            var(--font-mono);
  --tech-font-size-base:       var(--text-sm);       /* 14px — denser admin UI */
  --tech-font-weight-body:     var(--font-weight-normal);
  --tech-font-weight-heading:  var(--font-weight-medium);

  /* --- Spacing --- */
  --tech-spacing-unit:         var(--space-4);
  --tech-page-padding:         var(--space-6);
  --tech-card-padding:         var(--space-4);       /* tighter than Lemniscate */
  --tech-section-gap:          var(--space-6);

  /* --- Radius --- */
  --tech-radius:               var(--radius-md);     /* 8px — slightly tighter */
  --tech-radius-sm:            var(--radius-sm);
  --tech-radius-lg:            var(--radius-lg);

  /* --- Elevation --- */
  --tech-shadow-card:          var(--shadow-xs);
  --tech-shadow-modal:         var(--shadow-xl);
  --tech-shadow-dropdown:      var(--shadow-lg);

  /* --- Icons --- */
  --tech-icon-xs:              var(--icon-xs);
  --tech-icon-sm:              var(--icon-sm);       /* 16px — default for dense UI */
  --tech-icon-md:              var(--icon-md);
  --tech-icon-lg:              var(--icon-lg);

  /* --- Logos --- */
  --tech-logo-primary:         '/assets/logos/aumraa/aumraa_standard_light.svg';
  --tech-logo-icon:            '/assets/logos/aumraa/aumraa_icon.svg';
  --tech-logo-horizontal:      '/assets/logos/aumraa/aumraa_horizontal_light.svg';
  --tech-logo-reversed:        '/assets/logos/aumraa/aumraa_reversed_dark.svg';
  --tech-logo-mono-light:      '/assets/logos/aumraa/aumraa_mono-white.svg';
  --tech-logo-mono-dark:       '/assets/logos/aumraa/aumraa_mono-black.svg';

}
```

---

### 1D — Create `aumraa.css` (amra-- studio brand aliases)

Create `~/Breathe Design system/src/styles/tokens/aumraa.css`:

```css
/* ============================================================
   BREATHE — Aumraa Studio Brand Tokens
   Prefix: amra--
   Usage: Marketing site, studio-level brand communications
   ============================================================ */

@import './global.css';

:root {

  --amra-primary:              var(--color-blue-700);
  --amra-primary-foreground:   var(--color-white);

  --amra-accent:               var(--color-orange-500);
  --amra-accent-foreground:    var(--color-white);

  --amra-background:           var(--color-white);
  --amra-foreground:           var(--color-gray-900);

  --amra-gradient-start:       var(--color-blue-400);
  --amra-gradient-end:         var(--color-blue-700);

  /* --- Typography --- */
  --amra-font-body:            var(--font-sans);
  --amra-font-size-base:       var(--text-base);
  --amra-font-weight-heading:  var(--font-weight-semibold);

  /* --- Icons --- */
  --amra-icon-md:              var(--icon-md);

  /* --- Logos --- */
  --amra-logo-primary:         '/assets/logos/aumraa/aumraa_standard_light.svg';
  --amra-logo-icon:            '/assets/logos/aumraa/aumraa_icon.svg';
  --amra-logo-stacked:         '/assets/logos/aumraa/aumraa_stacked_light.svg';
  --amra-logo-reversed:        '/assets/logos/aumraa/aumraa_reversed_dark.svg';
  --amra-logo-mono-light:      '/assets/logos/aumraa/aumraa_mono-white.svg';
  --amra-logo-mono-dark:       '/assets/logos/aumraa/aumraa_mono-black.svg';

}
```

---

### 1E — Create the token barrel file `index.css`

Create `~/Breathe Design system/src/styles/tokens/index.css`:

```css
/* ============================================================
   BREATHE — Token Index
   Import this single file in Breathe's main entry.
   Apps import only their specific product token file.
   ============================================================ */

@import './global.css';
@import './lemniscate.css';
@import './technocracy.css';
@import './aumraa.css';
```

---

## Phase 2 — Update Breathe's `theme.css` to Consume Lemniscate Tokens

> Breathe's preview site defaults to Lemniscate as the active product theme.
> Open `~/Breathe Design system/src/styles/theme.css` and REPLACE the entire `:root` block with:

```css
/* Breathe preview defaults to Lemniscate theme */
/* shadcn bridge — maps lmns product tokens → shadcn vars */

:root {
  --background:           var(--lmns-background);
  --foreground:           var(--lmns-foreground);

  --card:                 var(--lmns-background);
  --card-foreground:      var(--lmns-foreground);

  --popover:              var(--lmns-background);
  --popover-foreground:   var(--lmns-foreground);

  --primary:              var(--lmns-primary);
  --primary-foreground:   var(--lmns-primary-foreground);

  --secondary:            var(--lmns-background-secondary);
  --secondary-foreground: var(--lmns-foreground);

  --muted:                var(--lmns-background-tertiary);
  --muted-foreground:     var(--lmns-foreground-secondary);

  --accent:               var(--lmns-accent);
  --accent-foreground:    var(--lmns-accent-foreground);

  --destructive:          var(--color-danger);
  --destructive-foreground: var(--color-white);

  --border:               var(--lmns-border);
  --input:                var(--lmns-background-secondary);
  --ring:                 var(--lmns-primary);

  --radius:               var(--lmns-radius);

  --sidebar:              var(--lmns-background-secondary);
  --sidebar-foreground:   var(--lmns-foreground);
  --sidebar-primary:      var(--lmns-primary);
  --sidebar-primary-foreground: var(--lmns-primary-foreground);
  --sidebar-accent:       var(--lmns-background-tertiary);
  --sidebar-accent-foreground: var(--lmns-foreground);
  --sidebar-border:       var(--lmns-border);
  --sidebar-ring:         var(--lmns-primary);
}

.dark {
  --background:           var(--lmns-background);
  --foreground:           var(--lmns-foreground);
  --primary:              var(--lmns-primary);
  --border:               var(--lmns-border);
  --muted:                var(--lmns-background-secondary);
  --muted-foreground:     var(--lmns-foreground-secondary);
}
```

---

## Phase 3 — Copy Components from breathe-extract

### 3A — Replace shadcn UI components

```bash
# From the parent folder containing both repos
cp -r ~/Lemniscate/Dev/breathe-extract/components/ui/. ~/Breathe Design system/src/app/components/ui/
```

### 3B — Copy custom Lemniscate layout components

```bash
mkdir -p ~/Breathe Design system/src/app/components/custom/lemniscate
cp -r ~/Lemniscate/Dev/breathe-extract/components/custom/template/. ~/Breathe Design system/src/app/components/custom/lemniscate/
```

### 3C — Fix the import path alias

The extracted components use `@/shared/lib/utils` (Lemniscate's path).
Breathe uses `@/` pointing to `src/`. We need to align these.

**Search for all occurrences in the copied components:**

```bash
grep -rl "@/shared/lib/utils" ~/Breathe\ Design\ system/src/app/components/ui/
grep -rl "@/shared/lib/utils" ~/Breathe\ Design\ system/src/app/components/custom/
```

**Replace all occurrences:**

```bash
# macOS
find ~/Breathe\ Design\ system/src/app/components/ui/ -name "*.tsx" -exec \
  sed -i '' 's|@/shared/lib/utils|@/app/components/ui/utils|g' {} +

find ~/Breathe\ Design\ system/src/app/components/custom/ -name "*.tsx" -exec \
  sed -i '' 's|@/shared/lib/utils|@/app/components/ui/utils|g' {} +
```

> Note: Breathe already has a `utils.ts` at `src/app/components/ui/utils.ts`.
> Confirm this file exists after the copy. If not, create it:

```ts
// ~/Breathe Design system/src/app/components/ui/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { tailwind-merge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## Phase 4 — Wire Token Import into Breathe Entry Point

Open `~/Breathe Design system/src/styles/tailwind.css` (Breathe's main CSS entry) and add the token
import at the top, before the existing `@import` statements:

```css
@import './tokens/index.css';
/* existing imports follow below — do not remove them */
```

Then open `~/Breathe Design system/src/main.tsx` and confirm the styles import order is:

```tsx
import './styles/tailwind.css'   // tokens load via this
import './styles/theme.css'      // shadcn bridge
import './styles/index.css'      // base directives
import './styles/fonts.css'      // font faces
```

If the order differs, reorder to match the above. Do not change any other content
in `main.tsx`.

---

## Verify — Run Breathe and confirm it works

```bash
cd ~/Breathe Design system
pnpm dev
```

Open `localhost:5173`. You should see:
- Breathe documentation site loading with Aumraa blue as the primary colour
- No console errors about missing CSS variables
- Button component showing the correct brand blue (not generic shadcn dark)

If you see the correct blue (`#40AAD4` family) in buttons and interactive elements,
Phase 1–4 are complete.

---

## Post-run checklist

Run these grep checks and confirm no raw hex values snuck into product token files:

```bash
# Should return ZERO results — no raw hex in product alias files
grep -n "#[0-9A-Fa-f]\{3,6\}" ~/Breathe Design system/src/styles/tokens/lemniscate.css
grep -n "#[0-9A-Fa-f]\{3,6\}" ~/Breathe Design system/src/styles/tokens/technocracy.css
grep -n "#[0-9A-Fa-f]\{3,6\}" ~/Breathe Design system/src/styles/tokens/aumraa.css

# global.css WILL have hex values — that is correct
# Should return results
grep -n "#[0-9A-Fa-f]\{3,6\}" ~/Breathe Design system/src/styles/tokens/global.css
```

Also confirm all logo SVGs are in place:

```bash
ls ~/Breathe\ Design\ system/public/assets/logos/leminiscate/
ls ~/Breathe\ Design\ system/public/assets/logos/aumraa/
```

Both folders should have 8 files each (standard, icon, horizontal, reversed, mono-black,
mono-white, stacked, alpha variants).

---

## What this step does NOT do

- Does not push to GitHub (Step 3)
- Does not rewire Lemniscate imports (Step 3)
- Does not build component documentation pages for the new custom components (post Step 3)
- Does not install Breathe as a package in any app (post Step 3)

---

## Output of this step

On completion, Breathe will have:

```
~/Breathe Design system/src/styles/
├── tokens/
│   ├── global.css         ← raw palette
│   ├── lemniscate.css     ← lmns-- aliases
│   ├── technocracy.css    ← tech-- aliases
│   ├── aumraa.css         ← amra-- aliases
│   └── index.css          ← barrel file
├── theme.css              ← updated shadcn bridge (lmns tokens)
├── tailwind.css           ← updated to import tokens/index.css
├── index.css
└── fonts.css

~/Breathe Design system/src/app/components/
├── ui/                    ← Lemniscate-customised shadcn components
└── custom/
    └── lemniscate/        ← StatGrid, PageToolbar, DataSection etc.
```

This is the complete Breathe foundation. Step 3 pushes to GitHub and rewires Lemniscate.

---

*Step 2 of 3 — Extract ✅ → Merge + Token Architecture → GitHub + rewire*
