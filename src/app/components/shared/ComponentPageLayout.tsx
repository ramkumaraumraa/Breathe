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

// Canonical brand list and accents for the switcher
// stage: release status shown as a badge. Aumraa has none (core company brand).
export type ProductStage = 'Live' | 'Internal' | 'Next' | 'YTS'

const STAGE_STYLES: Record<ProductStage, string> = {
  Live:     'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400',
  Internal: 'bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-400',
  Next:     'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
  YTS:      'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
}

function StageBadge({ stage }: { stage?: ProductStage }) {
  if (!stage) return null
  return (
    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide leading-none ${STAGE_STYLES[stage]}`}>
      {stage}
    </span>
  )
}

const TOP_LEVEL_TABS: readonly {
  id: string
  label: string
  accentColor: string
  description: string
  stage?: ProductStage
}[] = [
  { id: 'aumraa', label: 'Aumraa', accentColor: '#2F9E44', description: 'Studio brand — green primary' },
  { id: 'technocracy', label: 'Technocracy', accentColor: '#8B5CF6', description: 'Admin dashboard — dark surfaces', stage: 'Internal' },
  { id: 'lemniscate', label: 'Leminiscate', accentColor: '#1C60C1', description: 'Community finance SaaS — light, blue primary', stage: 'Live' },
  { id: 'maligai', label: 'Maligai Manager', accentColor: '#D97706', description: 'Grocery & retail — mobile primary', stage: 'Next' },
  { id: 'ullagellam_group', label: 'Ullagellam', accentColor: '#7C3AED', description: 'Regional & mobile suite umbrella · Multi-product filters below' },
  { id: 'yakaizen', label: 'Yakaizen', accentColor: '#06B6D4', description: 'Mobile, watch, widgets', stage: 'YTS' },
]

// ─── Product switcher ─────────────────────────────────────────────────────────

function ProductSwitcher({ implemented }: { implemented: ProductId[] }) {
  const { activeProduct, setActiveProduct } = useProductTheme()
  const activeTopTab = activeProduct === 'kaayo' || activeProduct === 'ilakh' || activeProduct === 'ulagellam'
    ? 'ullagellam_group'
    : activeProduct

  return (
    <div className="sticky top-16 z-20 bg-slate-50 dark:bg-slate-950 overflow-x-auto border-b border-slate-200 dark:border-slate-800 -mx-6 lg:-mx-10 px-6 lg:px-10">
      <div className="flex gap-0 min-w-max" role="tablist">
        {TOP_LEVEL_TABS.map((tab) => {
          const isActive = activeTopTab === tab.id
          const isImpl = tab.id === 'ullagellam_group'
            ? (implemented.includes('kaayo') || implemented.includes('ilakh') || implemented.includes('ulagellam'))
            : implemented.includes(tab.id as ProductId)

          const handleClick = () => {
            if (tab.id === 'ullagellam_group') {
              if (activeProduct !== 'kaayo' && activeProduct !== 'ilakh' && activeProduct !== 'ulagellam') {
                setActiveProduct('kaayo')
              }
            } else {
              setActiveProduct(tab.id as ProductId)
            }
          }

          return (
            <button
              key={tab.id}
              onClick={handleClick}
              role="tab"
              aria-selected={isActive}
              title={!isImpl ? 'Placeholder — confirm at product design kickoff' : tab.description}
              className={[
                'relative flex items-center gap-1.5 px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap shrink-0',
                isActive
                  ? 'text-slate-900 dark:text-white'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600',
                !isImpl ? 'opacity-50' : '',
              ].join(' ')}
              style={{
                borderBottomColor: isActive ? tab.accentColor : undefined,
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: '0.875rem',
              }}
            >
              {tab.label}
              <StageBadge stage={tab.stage} />
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
  const { activeProduct, setActiveProduct } = useProductTheme()
  const isUllagellamGroup = activeProduct === 'kaayo' || activeProduct === 'ilakh' || activeProduct === 'ulagellam'

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

      {/* Ulagellam Sub-tabs Segment Selector */}
      {isUllagellamGroup && (
        <div className="p-1.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl inline-flex flex-wrap gap-1.5 max-w-full shadow-sm">
          {([
            { id: 'kaayo', label: '🎓 Kaayo (Tutor Ops)', accent: '#970103', tagline: 'Tutor & class operations · Mobile · Tablet', stage: 'Live' },
            { id: 'ilakh', label: '📈 Ilakh (Finance)', accent: '#0369A1', tagline: 'Goal tracking & personal finance · Web · Mobile', stage: 'YTS' },
            { id: 'ulagellam', label: '🗺️ Ulagellam (Explorer)', accent: '#7C3AED', tagline: 'Explore & discover around you · Mobile', stage: 'YTS' }
          ] as { id: string; label: string; accent: string; tagline: string; stage: ProductStage }[]).map(sub => {
            const isSubActive = activeProduct === sub.id
            const isSubImpl = implemented.includes(sub.id as ProductId)
            return (
              <button
                key={sub.id}
                onClick={() => setActiveProduct(sub.id as ProductId)}
                className={`px-5 py-2.5 rounded-xl font-semibold transition-all cursor-pointer whitespace-nowrap text-sm ${
                  isSubActive
                    ? 'bg-white dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 border border-transparent'
                } ${!isSubImpl ? 'opacity-50' : ''}`}
                style={{
                  borderBottomColor: isSubActive ? sub.accent : undefined,
                  borderBottomWidth: isSubActive ? '2px' : undefined
                }}
                title={!isSubImpl ? 'Placeholder — confirm at product design kickoff' : sub.tagline}
              >
                <span className="inline-flex items-center gap-1.5">
                  {sub.label}
                  <StageBadge stage={sub.stage} />
                </span>
              </button>
            )
          })}
        </div>
      )}

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
