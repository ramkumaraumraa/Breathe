import { ReactNode } from 'react'
import {
  useProductTheme,
  productMeta,
  ProductId,
  ProductPreviewWrapper,
} from '@/app/context/ProductThemeContext'
import { PageHeader } from './PageHeader'
import { ComponentPreview } from './ComponentPreview'
import { ProductTabs } from './ProductTabs'

// ─── Types ───────────────────────────────────────────────────────────────────

export type AtomicLevel = 'Atom' | 'Molecule' | 'Organism' | 'Template'
export type ComponentStatus = 'Stable' | 'Beta' | 'Deprecated' | 'Planned'

export interface ComponentSection {
  title: string
  description?: string
  preview: ReactNode
  previewClassName?: string
  /** Products this section belongs to. Omit to show on every product tab. */
  products?: ProductId[]
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

// ─── Main layout ──────────────────────────────────────────────────────────────

// ponytail: regex heuristic until each page has real non-Kaayo snippets; replace per page when written
const KAAYO_CODE = /Kayo|Kaayo|@kaayo|breathe\/kaayo/

export function ComponentPageLayout({
  title,
  description,
  level,
  status = 'Stable',
  sections,
  implemented = ['lemniscate', 'aumraa'],
}: ComponentPageLayoutProps) {
  const { activeProduct, setActiveProduct } = useProductTheme()
  const visibleSections = sections.filter((s) => !s.products || s.products.includes(activeProduct))
  // Off Kaayo, drop Kaayo-only snippets so ComponentPreview shows its "Coming soon" code placeholder.
  const code = (s?: string) => (activeProduct !== 'kaayo' && s && KAAYO_CODE.test(s) ? undefined : s)

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
      <ProductTabs active={activeProduct} onChange={setActiveProduct} implemented={implemented} />

      {/* Sections — only those tagged for the active product (untagged = all products) */}
      {visibleSections.length === 0 && (
        <div className="rounded-xl border border-slate-200 dark:border-slate-700/60 flex items-center justify-center py-10 bg-slate-50 dark:bg-slate-900/60">
          <p className="text-slate-400 dark:text-slate-500 italic" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem' }}>
            {`Not available for ${productMeta[activeProduct].label} yet`}
          </p>
        </div>
      )}
      {visibleSections.map((section) => (
        <ComponentPreview
          key={section.title}
          title={section.title}
          description={section.description}
          code={code(section.code?.react) ?? ''}
          reactNativeCode={code(section.code?.reactNative)}
          iosCode={code(section.code?.ios)}
          androidCode={code(section.code?.android)}
          cssCode={code(section.code?.css)}
          tailwindCode={code(section.code?.tailwind)}
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
