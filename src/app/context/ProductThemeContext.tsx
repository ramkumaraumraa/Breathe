import { createContext, useContext, useState, ReactNode } from 'react'

// ─── Product IDs ────────────────────────────────────────────────────────────
export type ProductId =
  | 'lemniscate'
  | 'aumraa'
  | 'technocracy'
  | 'maligai'
  | 'ulagellam'
  | 'ilakh'
  | 'kaayo'
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
      '--primary':                  'var(--lmns-color-primary)',
      '--primary-foreground':       'var(--lmns-color-primary-foreground)',
      '--secondary':                'var(--lmns-color-background-secondary)',
      '--secondary-foreground':     'var(--lmns-color-foreground)',
      '--accent':                   'var(--lmns-color-tertiary)',
      '--accent-foreground':        'var(--lmns-color-tertiary-foreground)',
      '--background':               'var(--lmns-color-background)',
      '--foreground':               'var(--lmns-color-foreground)',
      '--muted':                    'var(--lmns-color-background-tertiary)',
      '--muted-foreground':         'var(--lmns-color-foreground-secondary)',
      '--border':                   'var(--lmns-color-border)',
      '--ring':                     'var(--lmns-color-primary)',
      '--radius':                   'var(--lmns-radius-default)',
      '--destructive':              'var(--lmns-color-negative)',
      '--destructive-foreground':   'var(--lmns-color-negative-foreground)',
      '--gradient-brand-start':      'var(--lmns-color-gradient-start)',
      '--gradient-brand-end':        'var(--lmns-color-gradient-end)',
      '--gradient-brand':            'linear-gradient(135deg, var(--gradient-brand-start) 0%, var(--gradient-brand-end) 100%)',
    },
  },
  aumraa: {
    label: 'Aumraa',
    prefix: 'amra',
    description: 'Studio brand — green primary, Source Sans 3',
    vars: {
      '--primary':                  'var(--amra-color-primary)',
      '--primary-foreground':       'var(--amra-color-primary-foreground)',
      '--secondary':                'var(--amra-color-background-secondary)',
      '--secondary-foreground':     'var(--amra-color-foreground)',
      '--accent':                   'var(--amra-color-secondary)',
      '--accent-foreground':        'var(--amra-color-secondary-foreground)',
      '--background':               'var(--amra-color-background)',
      '--foreground':               'var(--amra-color-foreground)',
      '--muted':                    'var(--amra-color-background-secondary)',
      '--muted-foreground':         'var(--amra-color-foreground-secondary)',
      '--border':                   'var(--amra-color-border)',
      '--ring':                     'var(--amra-color-primary)',
      '--radius':                   'var(--amra-radius-default)',
      '--destructive':              'var(--amra-color-danger)',
      '--destructive-foreground':   'var(--color-neutral-white)',
      '--gradient-brand-start':      'var(--amra-color-gradient-start)',
      '--gradient-brand-end':        'var(--amra-color-gradient-end)',
      '--gradient-brand':            'linear-gradient(135deg, var(--gradient-brand-start) 0%, var(--gradient-brand-end) 100%)',
    },
  },
  technocracy: {
    label: 'Technocracy',
    prefix: 'thcy',
    description: 'Admin dashboard — dark surfaces',
    vars: {
      '--primary':                  'var(--thcy-color-primary)',
      '--primary-foreground':       'var(--thcy-color-primary-foreground)',
      '--secondary':                'var(--thcy-color-background-secondary)',
      '--secondary-foreground':     'var(--thcy-color-foreground)',
      '--accent':                   'var(--thcy-color-tertiary)',
      '--accent-foreground':        'var(--thcy-color-tertiary-foreground)',
      '--background':               'var(--thcy-color-background)',
      '--foreground':               'var(--thcy-color-foreground)',
      '--muted':                    'var(--thcy-color-background-tertiary)',
      '--muted-foreground':         'var(--thcy-color-foreground-secondary)',
      '--border':                   'var(--thcy-color-border)',
      '--ring':                     'var(--thcy-color-primary)',
      '--radius':                   'var(--thcy-radius-default)',
      '--destructive':              'var(--thcy-color-negative)',
      '--destructive-foreground':   'var(--thcy-color-negative-foreground)',
      '--gradient-brand-start':      'var(--thcy-color-primary)',
      '--gradient-brand-end':        'var(--thcy-color-secondary)',
      '--gradient-brand':            'linear-gradient(135deg, var(--gradient-brand-start) 0%, var(--gradient-brand-end) 100%)',
    },
  },
  maligai: {
    label: 'Maligai Manager',
    prefix: 'mlgm',
    description: 'Grocery & retail — mobile primary',
    vars: {
      '--primary':                  'var(--mlgm-color-primary)',
      '--primary-foreground':       'var(--mlgm-color-primary-foreground)',
      '--secondary':                'var(--mlgm-color-background-secondary)',
      '--secondary-foreground':     'var(--mlgm-color-foreground)',
      '--accent':                   'var(--mlgm-color-tertiary)',
      '--accent-foreground':        'var(--mlgm-color-tertiary-foreground)',
      '--background':               'var(--mlgm-color-background)',
      '--foreground':               'var(--mlgm-color-foreground)',
      '--muted':                    'var(--mlgm-color-background-tertiary)',
      '--muted-foreground':         'var(--mlgm-color-foreground-secondary)',
      '--border':                   'var(--mlgm-color-border)',
      '--ring':                     'var(--mlgm-color-primary)',
      '--radius':                   'var(--mlgm-radius-default)',
      '--destructive':              'var(--mlgm-color-negative)',
      '--destructive-foreground':   'var(--mlgm-color-negative-foreground)',
      '--gradient-brand-start':      'var(--mlgm-color-primary)',
      '--gradient-brand-end':        'var(--mlgm-color-secondary)',
      '--gradient-brand':            'linear-gradient(135deg, var(--gradient-brand-start) 0%, var(--gradient-brand-end) 100%)',
    },
  },
  ulagellam: {
    label: 'Ulagellam',
    prefix: 'ulge',
    description: 'Mobile-only app',
    // No token file generated yet — update when tokens/dist/web/ulagellam.css is added
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
      '--gradient-brand-start':      '#40AAD4',
      '--gradient-brand-end':        '#E07722',
      '--gradient-brand':            'linear-gradient(135deg, var(--gradient-brand-start) 0%, var(--gradient-brand-end) 100%)',
    },
  },
  ilakh: {
    label: 'Ilakh',
    prefix: 'ilkh',
    description: 'Web + mobile — mobile-first',
    vars: {
      '--primary':                  'var(--ilkh-color-primary)',
      '--primary-foreground':       'var(--ilkh-color-primary-foreground)',
      '--secondary':                'var(--ilkh-color-background-secondary)',
      '--secondary-foreground':     'var(--ilkh-color-foreground)',
      '--accent':                   'var(--ilkh-color-tertiary)',
      '--accent-foreground':        'var(--ilkh-color-tertiary-foreground)',
      '--background':               'var(--ilkh-color-background)',
      '--foreground':               'var(--ilkh-color-foreground)',
      '--muted':                    'var(--ilkh-color-background-tertiary)',
      '--muted-foreground':         'var(--ilkh-color-foreground-secondary)',
      '--border':                   'var(--ilkh-color-border)',
      '--ring':                     'var(--ilkh-color-primary)',
      '--radius':                   'var(--ilkh-radius-default)',
      '--destructive':              'var(--ilkh-color-negative)',
      '--destructive-foreground':   'var(--ilkh-color-negative-foreground)',
      '--gradient-brand-start':      'var(--ilkh-color-primary)',
      '--gradient-brand-end':        'var(--ilkh-color-secondary)',
      '--gradient-brand':            'linear-gradient(135deg, var(--gradient-brand-start) 0%, var(--gradient-brand-end) 100%)',
    },
  },
  kaayo: {
    label: 'Kaayo',
    prefix: 'kayo',
    description: 'Tutor & class operations — Mobile · Neo-Brutalist',
    vars: {
      '--primary':                'var(--kayo-color-primary)',
      '--primary-foreground':     'var(--kayo-color-primary-foreground)',
      '--secondary':              'var(--kayo-color-background-secondary)',
      '--secondary-foreground':   'var(--kayo-color-foreground)',
      '--accent':                 'var(--kayo-color-secondary)',
      '--accent-foreground':      'var(--kayo-color-secondary-foreground)',
      '--background':             'var(--kayo-color-background)',
      '--foreground':             'var(--kayo-color-foreground)',
      '--muted':                  'var(--kayo-color-background-secondary)',
      '--muted-foreground':       'var(--kayo-color-foreground-secondary)',
      '--border':                 'var(--kayo-color-border)',
      '--ring':                   'var(--kayo-color-primary)',
      '--radius':                 'var(--kayo-radius-default)',
      '--destructive':            'var(--kayo-color-negative)',
      '--destructive-foreground': 'var(--kayo-color-negative-foreground)',
      '--gradient-brand-start':   'var(--kayo-color-gradient-start)',
      '--gradient-brand-end':     'var(--kayo-color-gradient-end)',
      '--gradient-brand':         'linear-gradient(135deg, var(--gradient-brand-start) 0%, var(--gradient-brand-end) 100%)',
    },
  },
  yakaizen: {
    label: 'Yakaizen',
    prefix: 'ykzn',
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
  const [activeProduct, setActiveProduct] = useState<ProductId>('aumraa')
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
