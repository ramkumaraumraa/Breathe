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
    // A plain string is shown to every product (already product-agnostic).
    // A per-product map only shows its entry when that product's tab is
    // active — everyone else sees "Coming soon" instead of another
    // product's real package/component names.
    reactNative?: string | Partial<Record<ProductId, string>>
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

// Canonical brand list and accents for the switcher.
// `status` drives the small pill next to the tab label — omit it for
// products that don't carry a lifecycle badge (Aumraa is the company
// itself, not a product; Technocracy is a per-product dashboard variant
// and gets its own custom badge below instead of a single live/cooking
// state).
const TOP_LEVEL_TABS = [
  { id: 'aumraa', label: 'Aumraa', accentColor: '#2F9E44', description: 'Studio brand — green primary' },
  { id: 'technocracy', label: 'Technocracy', accentColor: '#8B5CF6', description: 'Admin dashboard for each product — live wherever its parent product is live' },
  { id: 'lemniscate', label: 'Leminiscate', accentColor: '#1C60C1', description: 'Community finance SaaS — light, blue primary', status: 'live' as const },
  { id: 'maligai', label: 'Maligai Manager', accentColor: '#D97706', description: 'Grocery & retail — mobile primary', status: 'cooking' as const },
  { id: 'ullagellam_group', label: 'Ullagellam', accentColor: '#7C3AED', description: 'Regional & mobile suite umbrella · Multi-product filters below' },
  { id: 'yakaizen', label: 'Yakaizen', accentColor: '#06B6D4', description: 'Mobile, watch, widgets' },
] as const

// Products live within Technocracy today — shown as its badge instead of a
// single live/cooking state, since Technocracy's status is per-product.
const TECHNOCRACY_LIVE_FOR = ['Kaayo', 'Lemniscate']

const STATUS_PILL: Record<'live' | 'cooking', string> = {
  live: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
  cooking: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800',
}
const STATUS_LABEL: Record<'live' | 'cooking', string> = { live: 'Live', cooking: 'Cooking' }

function StatusBadge({ status }: { status: 'live' | 'cooking' }) {
  return (
    <span
      className={`px-1.5 py-0.5 rounded-full border text-[10px] leading-none ${STATUS_PILL[status]}`}
      style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
    >
      {STATUS_LABEL[status]}
    </span>
  )
}

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
              {tab.id === 'technocracy' ? (
                <span
                  className="px-1.5 py-0.5 rounded-full border text-[10px] leading-none bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
                  style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
                  title={`Live for ${TECHNOCRACY_LIVE_FOR.join(' & ')} — new products get their own Technocracy dashboard at kickoff`}
                >
                  Live: {TECHNOCRACY_LIVE_FOR.join(', ')}
                </span>
              ) : 'status' in tab && tab.status ? (
                <StatusBadge status={tab.status} />
              ) : null}
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
          {[
            { id: 'kaayo', label: '🎓 Kaayo (Tutor Ops)', accent: '#970103', tagline: 'Tutor & class operations · Mobile · Tablet', status: 'live' as const },
            { id: 'ilakh', label: '📈 Ilakh (Finance)', accent: '#0369A1', tagline: 'Goal tracking & personal finance · Web · Mobile' },
            { id: 'ulagellam', label: '🗺️ Ulagellam (Explorer)', accent: '#7C3AED', tagline: 'Explore & discover around you · Mobile' }
          ].map(sub => {
            const isSubActive = activeProduct === sub.id
            const isSubImpl = implemented.includes(sub.id as ProductId)
            return (
              <button
                key={sub.id}
                onClick={() => setActiveProduct(sub.id as ProductId)}
                className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-semibold transition-all cursor-pointer whitespace-nowrap text-sm ${
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
                {sub.label}
                {'status' in sub && sub.status && <StatusBadge status={sub.status} />}
              </button>
            )
          })}
        </div>
      )}

      {/* Sections */}
      {sections.map((section, i) => {
        const rn = section.code?.reactNative
        const reactNativeCode = typeof rn === 'string' ? rn : rn?.[activeProduct]
        return (
        <ComponentPreview
          key={i}
          title={section.title}
          description={section.description}
          code={section.code?.react ?? ''}
          reactNativeCode={reactNativeCode}
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
        )
      })}
    </div>
  )
}
