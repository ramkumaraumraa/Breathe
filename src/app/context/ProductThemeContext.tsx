import { createContext, useContext, useState, ReactNode } from 'react'

// ─── Product IDs ────────────────────────────────────────────────────────────
export type ProductId =
  | 'lemniscate'
  | 'aumraa'
  | 'technocracy'
  | 'maligai'
  | 'ulagellam'
  | 'ilakh'
  | 'yakaizen'

// ─── Product metadata + CSS variable overrides ──────────────────────────────
// vars override shadcn generic vars (--primary, --background etc.)
// inside ProductPreviewWrapper. Components read those vars automatically.

export const productMeta: Record<ProductId, {
  label: string
  prefix: string
  description: string
  vars: Record<string, string>
}> = {
  lemniscate: {
    label: 'Lemniscate',
    prefix: 'lmns',
    description: 'Community finance SaaS — light, blue primary',
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
      '--radius':                   '0.625rem',
      '--destructive':              '#DC2626',
      '--destructive-foreground':   '#ffffff',
    },
  },
  aumraa: {
    label: 'Aumraa',
    prefix: 'amra',
    description: 'Studio brand — green primary, Source Sans 3',
    vars: {
      '--primary':                  '#2F9E44',
      '--primary-foreground':       '#ffffff',
      '--secondary':                '#F0FDF4',
      '--secondary-foreground':     '#002100',
      '--accent':                   '#CFCF2A',
      '--accent-foreground':        '#002100',
      '--background':               '#ffffff',
      '--foreground':               '#002100',
      '--muted':                    '#F0FDF4',
      '--muted-foreground':         '#6B7280',
      '--border':                   '#E5E7EB',
      '--ring':                     '#2F9E44',
      '--radius':                   '0.5rem',
      '--destructive':              '#E11D2A',
      '--destructive-foreground':   '#ffffff',
    },
  },
  technocracy: {
    label: 'Technocracy',
    prefix: 'thcy',
    description: 'Admin dashboard — dark surfaces',
    vars: {
      '--primary':                  '#40AAD4',
      '--primary-foreground':       '#ffffff',
      '--secondary':                '#1F2937',
      '--secondary-foreground':     '#F9FAFB',
      '--accent':                   '#E07722',
      '--accent-foreground':        '#ffffff',
      '--background':               '#111827',
      '--foreground':               '#F9FAFB',
      '--muted':                    '#1F2937',
      '--muted-foreground':         '#9CA3AF',
      '--border':                   '#374151',
      '--ring':                     '#40AAD4',
      '--radius':                   '0.5rem',
      '--destructive':              '#DC2626',
      '--destructive-foreground':   '#ffffff',
    },
  },
  maligai: {
    label: 'Maligai Manager',
    prefix: 'mlgm',
    description: 'Grocery & retail — mobile primary',
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
      '--destructive':              '#DC2626',
      '--destructive-foreground':   '#ffffff',
    },
  },
  ulagellam: {
    label: 'Ulagellam',
    prefix: 'ulge',
    description: 'Mobile-only app',
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
      '--destructive':              '#DC2626',
      '--destructive-foreground':   '#ffffff',
    },
  },
  ilakh: {
    label: 'Ilakh',
    prefix: 'ilkh',
    description: 'Web + mobile — mobile-first',
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
      '--radius':                   '0.625rem',
      '--destructive':              '#DC2626',
      '--destructive-foreground':   '#ffffff',
    },
  },
  yakaizen: {
    label: 'Yakaizen',
    prefix: 'ykzn',
    description: 'Mobile, watch, widgets',
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
      '--destructive':              '#DC2626',
      '--destructive-foreground':   '#ffffff',
    },
  },
}

// ─── Context ─────────────────────────────────────────────────────────────────

interface ProductThemeContextValue {
  activeProduct: ProductId
  setActiveProduct: (id: ProductId) => void
}

const ProductThemeContext = createContext<ProductThemeContextValue>({
  activeProduct: 'lemniscate',
  setActiveProduct: () => {},
})

export function ProductThemeProvider({ children }: { children: ReactNode }) {
  const [activeProduct, setActiveProduct] = useState<ProductId>('lemniscate')
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
  const vars = productMeta[activeProduct].vars

  return (
    <div
      style={vars as React.CSSProperties}
      className={`rounded-lg ${className}`}
    >
      {children}
    </div>
  )
}
