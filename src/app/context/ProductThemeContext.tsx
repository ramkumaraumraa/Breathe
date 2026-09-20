import { createContext, useContext, useState, ReactNode } from 'react'
import { useTheme } from './ThemeContext'
import lemniscateCss from '../../../packages/react/styles/lemniscate.css?raw'
import aumraaCss from '../../../packages/react/styles/aumraa.css?raw'
import technocracyCss from '../../../packages/react/styles/technocracy.css?raw'
import maligaiCss from '../../../packages/react/styles/maligai.css?raw'
import ilakhCss from '../../../packages/react/styles/ilakh.css?raw'
import kaayoCss from '../../../packages/react/styles/kaayo.css?raw'

/** Custom properties in the first `<selector> {…}` block of a stylesheet (comments stripped). */
function cssVars(css: string, selector: string): Record<string, string> {
  const s = css.replace(/\/\*[\s\S]*?\*\//g, '')
  const start = s.indexOf(`${selector} {`)
  if (start < 0) return {}
  const body = s.slice(s.indexOf('{', start) + 1, s.indexOf('}', start))
  return Object.fromEntries([...body.matchAll(/(--[\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]))
}

// ─── Product IDs ────────────────────────────────────────────────────────────
export type ProductId =
  | 'lemniscate'
  | 'aumraa'
  | 'technocracy'
  | 'maligai'
  | 'ilakh'
  | 'kaayo'
  | 'yakaizen'
  | 'smartlife'

// ─── Product metadata + CSS variable overrides ──────────────────────────────
// vars override shadcn generic vars (--primary, --background etc.)
// inside ProductPreviewWrapper. Components read those vars automatically.

export const productMeta: Record<ProductId, {
  label: string
  prefix: string
  description: string
  vars: Record<string, string>
  /** Overrides applied on top of `vars` when the docs site is in dark mode. */
  darkVars?: Record<string, string>
  /** Permanent-dark surface: the docs site pins to dark and disables the toggle. */
  darkOnly?: boolean
}> = {
  lemniscate: {
    label: 'Lemniscate',
    prefix: 'lmns',
    description: 'Community finance SaaS — light, blue primary',
    // Parsed from the package stylesheet so the preview never drifts from what consumers get.
    vars: cssVars(lemniscateCss, ':root'),
    darkVars: cssVars(lemniscateCss, '.dark'),
  },
  aumraa: {
    label: 'Aumraa',
    prefix: 'amra',
    description: 'Studio brand — green primary, Source Sans 3',
    vars: cssVars(aumraaCss, ':root'),
    darkVars: cssVars(aumraaCss, '.dark'),
  },
  technocracy: {
    label: 'Technocracy',
    prefix: 'thcy',
    description: 'Admin dashboard — permanent dark, telemetry surfaces',
    darkOnly: true,
    // No darkVars: technocracy.css has no `.dark` block because its `:root`
    // already is the dark set. Parsing for one only ever returned {}.
    vars: cssVars(technocracyCss, ':root'),
  },
  maligai: {
    label: 'Maligai Manager',
    prefix: 'mlgm',
    description: 'Grocery & retail — mobile primary',
    vars: cssVars(maligaiCss, ':root'),
    darkVars: cssVars(maligaiCss, '.dark'),
  },
  smartlife: {
    label: 'Smart Life-Style App',
    prefix: 'slsa',
    description: 'Yet to ideate',
    // No token file generated yet — update when tokens/dist/web/smartlife.css is added
    vars: {
      '--primary':                  '#40AAD4',
      '--primary-foreground':       '#ffffff',
      '--secondary':                '#F3F4F6',
      '--secondary-foreground':     '#1F2937',
      '--accent':                   '#E07722',
      '--accent-foreground':        '#ffffff',
      '--background':               '#ffffff',
      '--foreground':               '#1F2937',
      '--muted':                    '#F3F4F6',
      '--muted-foreground':         '#6B7280',
      '--border':                   '#E5E7EB',
      '--ring':                     '#40AAD4',
      '--radius':                   '1rem',
      '--destructive':              '#E11D2A',
      '--destructive-foreground':   '#ffffff',
      '--card':                     '#ffffff',
      '--card-foreground':          '#1F2937',
      '--popover':                  '#ffffff',
      '--popover-foreground':       '#1F2937',
      '--input':                    '#E5E7EB',
      '--input-background':         '#ffffff',
      '--switch-background':        '#F3F4F6',
      '--gradient-brand-start':      '#40AAD4',
      '--gradient-brand-end':        '#E07722',
      '--gradient-brand':            'linear-gradient(135deg, var(--gradient-brand-start) 0%, var(--gradient-brand-end) 100%)',
    },
  },
  ilakh: {
    label: 'Ilakh',
    prefix: 'ilkh',
    description: 'Web + mobile — mobile-first',
    vars: cssVars(ilakhCss, ':root'),
    darkVars: cssVars(ilakhCss, '.dark'),
  },
  kaayo: {
    label: 'Kaayo',
    prefix: 'kayo',
    description: 'Tutor & class operations — Mobile · Neo-Brutalist',
    vars: cssVars(kaayoCss, ':root'),
    darkVars: cssVars(kaayoCss, '.dark'),
  },
  yakaizen: {
    label: 'Yakaizen',
    prefix: 'ykai',
    description: 'Mobile, watch, widgets',
    // No token file generated yet — update when tokens/dist/web/yakaizen.css is added
    vars: {
      '--primary':                  '#40AAD4',
      '--primary-foreground':       '#ffffff',
      '--secondary':                '#F3F4F6',
      '--secondary-foreground':     '#1F2937',
      '--accent':                   '#E07722',
      '--accent-foreground':        '#ffffff',
      '--background':               '#ffffff',
      '--foreground':               '#1F2937',
      '--muted':                    '#F3F4F6',
      '--muted-foreground':         '#6B7280',
      '--border':                   '#E5E7EB',
      '--ring':                     '#40AAD4',
      '--radius':                   '1rem',
      '--destructive':              '#E11D2A',
      '--destructive-foreground':   '#ffffff',
      '--card':                     '#ffffff',
      '--card-foreground':          '#1F2937',
      '--popover':                  '#ffffff',
      '--popover-foreground':       '#1F2937',
      '--input':                    '#E5E7EB',
      '--input-background':         '#ffffff',
      '--switch-background':        '#F3F4F6',
      '--gradient-brand-start':      '#334155',
      '--gradient-brand-end':        '#06B6D4',
      '--gradient-brand':            'linear-gradient(135deg, var(--gradient-brand-start) 0%, var(--gradient-brand-end) 100%)',
    },
  },
}

// ─── Context ─────────────────────────────────────────────────────────────────

interface ProductThemeContextValue {
  activeProduct: ProductId
  setActiveProduct: (id: ProductId) => void
}

const ProductThemeContext = createContext<ProductThemeContextValue>({
  activeProduct: 'aumraa',
  setActiveProduct: () => {},
})

export function ProductThemeProvider({ children }: { children: ReactNode }) {
  const [activeProduct, setActiveProduct] = useState<ProductId>(() => {
    const p = new URLSearchParams(window.location.search).get('product')
    return p && p in productMeta ? (p as ProductId) : 'aumraa'
  })
  return (
    <ProductThemeContext.Provider value={{ activeProduct, setActiveProduct }}>
      {children}
    </ProductThemeContext.Provider>
  )
}

export function useProductTheme() {
  return useContext(ProductThemeContext)
}

// ─── Preview wrapper ──────────────────────────────────────────────────────────
// Wrap any component preview in this to apply the active product's tokens.
// The div injects CSS vars as inline styles; shadcn components inside read
// --primary, --background etc. and render in the active product's brand.

export function ProductPreviewWrapper({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const { activeProduct } = useProductTheme()
  const { isDark } = useTheme()
  const meta = productMeta[activeProduct]
  const vars = isDark && meta.darkVars ? { ...meta.vars, ...meta.darkVars } : meta.vars

  return (
    <div
      style={vars as React.CSSProperties}
      className={`rounded-lg ${className}`}
    >
      {children}
    </div>
  )
}
