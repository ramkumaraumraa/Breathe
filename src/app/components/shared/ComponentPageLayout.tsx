import { ReactNode } from 'react'
import {
  useProductTheme,
  productMeta,
  ProductId,
  ProductPreviewWrapper,
} from '@/app/context/ProductThemeContext'
import { PageHeader } from './PageHeader'
import { ComponentPreview } from './ComponentPreview'

// ─── Types ───────────────────────────────────────────────────────────────────

export type AtomicLevel = 'Atom' | 'Molecule' | 'Organism' | 'Template'
export type ComponentStatus = 'Stable' | 'Beta' | 'Deprecated' | 'Planned'

export interface ComponentSection {
  title: string
  description?: string
  preview: ReactNode
  previewClassName?: string
  code?: {
    react?: string
    reactNative?: string
    ios?: string
    android?: string
    css?: string       // vanilla CSS
    tailwind?: string  // Tailwind utility classes
  }
}

interface ComponentPageLayoutProps {
  title: string
  description: string
  level: AtomicLevel
  status?: ComponentStatus
  sections: ComponentSection[]
  implemented?: ProductId[]
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

// Canonical brand order — mirrors Logos, Colors, and Typography pages
const ALL_PRODUCTS: ProductId[] = [
  'aumraa',
  'technocracy',
  'lemniscate',
  'maligai',
  'ulagellam',
  'ilakh',
  'yakaizen',
]

const PRODUCT_ACCENT: Record<ProductId, string> = {
  aumraa:      '#2F9E44',
  technocracy: '#8B5CF6',
  lemniscate:  '#1C60C1',
  maligai:     '#D97706',
  ulagellam:   '#7C3AED',
  ilakh:       '#0369A1',
  yakaizen:    '#06B6D4',
}

// ─── Product switcher ─────────────────────────────────────────────────────────

function ProductSwitcher({ implemented }: { implemented: ProductId[] }) {
  const { activeProduct, setActiveProduct } = useProductTheme()

  return (
    <div className="sticky top-16 z-20 bg-slate-50 dark:bg-slate-950 overflow-x-auto border-b border-slate-200 dark:border-slate-800 -mx-6 lg:-mx-10 px-6 lg:px-10">
      <div className="flex gap-0 min-w-max" role="tablist">
        {ALL_PRODUCTS.map((id) => {
          const meta = productMeta[id]
          const isImpl = implemented.includes(id)
          const isActive = activeProduct === id
          return (
            <button
              key={id}
              onClick={() => setActiveProduct(id)}
              role="tab"
              aria-selected={isActive}
              title={!isImpl ? 'Placeholder — confirm at product design kickoff' : meta.description}
              className={[
                'relative flex items-center gap-1.5 px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap shrink-0',
                isActive
                  ? 'text-slate-900 dark:text-white'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600',
                !isImpl ? 'opacity-50' : '',
              ].join(' ')}
              style={{
                borderBottomColor: isActive ? PRODUCT_ACCENT[id] : undefined,
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: '0.875rem',
              }}
            >
              {meta.label}
              {!isImpl && <span className="text-slate-400">·</span>}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Main layout ──────────────────────────────────────────────────────────────

export function ComponentPageLayout({
  title,
  description,
  level,
  status = 'Stable',
  sections,
  implemented = ['lemniscate', 'aumraa'],
}: ComponentPageLayoutProps) {
  return (
    <div className="max-w-7xl px-6 lg:px-10 py-10 space-y-8">
      {/* Header */}
      <PageHeader
        title={title}
        description={description}
        badge={status}
        badgeColor="teal"
        section="COMPONENTS"
      />

      {/* Product switcher */}
      <ProductSwitcher implemented={implemented} />

      {/* Sections */}
      {sections.map((section, i) => (
        <ComponentPreview
          key={i}
          title={section.title}
          description={section.description}
          code={section.code?.react ?? ''}
          reactNativeCode={section.code?.reactNative}
          iosCode={section.code?.ios}
          androidCode={section.code?.android}
          cssCode={section.code?.css}
          tailwindCode={section.code?.tailwind}
          previewClassName={section.previewClassName}
        >
          <ProductPreviewWrapper>
            {section.preview}
          </ProductPreviewWrapper>
        </ComponentPreview>
      ))}
    </div>
  )
}
