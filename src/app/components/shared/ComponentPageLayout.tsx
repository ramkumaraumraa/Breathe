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

// ─── Product switcher ─────────────────────────────────────────────────────────

function ProductSwitcher({ implemented }: { implemented: ProductId[] }) {
  const { activeProduct, setActiveProduct } = useProductTheme()

  return (
    <div className="sticky top-16 z-20 bg-slate-50 dark:bg-slate-950 flex items-center overflow-x-auto border-b border-slate-200 dark:border-slate-700/60 -mx-6 lg:-mx-10 px-6 lg:px-10">
      {ALL_PRODUCTS.map((id) => {
        const meta = productMeta[id]
        const isImpl = implemented.includes(id)
        const isActive = activeProduct === id
        return (
          <button
            key={id}
            onClick={() => setActiveProduct(id)}
            title={!isImpl ? 'Placeholder — confirm at product design kickoff' : meta.description}
            className={[
              'flex items-center gap-1.5 px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap shrink-0',
              isActive
                ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300',
              !isImpl ? 'opacity-50' : '',
            ].join(' ')}
            style={{ fontSize: '0.8125rem', fontWeight: isActive ? 500 : 400 }}
          >
            {meta.label}
            {!isImpl && <span className="text-slate-400">·</span>}
          </button>
        )
      })}
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
    <div className="max-w-3xl px-6 lg:px-10 py-10 space-y-8">
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
