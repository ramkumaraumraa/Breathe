import { Crown, Briefcase, Rocket, Hourglass, Lightbulb, type LucideIcon } from 'lucide-react'
import type { ProductId } from '@/app/context/ProductThemeContext'

// ─── Canonical product tab bar ────────────────────────────────────────────────
// The single source of truth for the product switcher. Every page that offers a
// per-product view (Colors, Typography, Logos, Design Tokens, every component
// page) renders this list, in this order.
//
// `stage` shows as an icon, with the full wording on hover — eight text chips
// pushed the strip past the content width and forced a scrollbar on laptops.
//
// Each stage gets a distinct SHAPE, not just a colour: red/green dots alone are
// indistinguishable under deuteranopia. Colour is reinforcement here, never the
// only signal. STAGE_MARKS is the legend — keep it and the Get Started page's key
// in sync, they describe the same thing.

export type ProductStage = 'Base' | 'Internal' | 'Live' | 'Next' | 'YTS'

export const STAGE_MARKS: Record<ProductStage, { icon: LucideIcon; color: string; label: string; meaning: string }> = {
  Base:     { icon: Crown,     color: '#F59E0B', label: 'Base brand', meaning: 'The parent brand every product inherits from — not a product itself' },
  Internal: { icon: Briefcase, color: '#8B5CF6', label: 'Internal',   meaning: 'Admin tooling for the product family, used inside Aumraa only' },
  Live:     { icon: Rocket,    color: '#10B981', label: 'Live',       meaning: 'Shipped and running in production' },
  Next:     { icon: Hourglass, color: '#0EA5E9', label: 'Next',       meaning: 'Design kickoff is next in the queue' },
  YTS:      { icon: Lightbulb, color: '#94A3B8', label: 'Yet to start', meaning: 'Not started — tokens here are placeholders' },
}

/** Decorative: every caller states the stage in text alongside it. */
export function StageMark({ stage, size = 12 }: { stage: ProductStage; size?: number }) {
  const { icon: Icon, color } = STAGE_MARKS[stage]
  return <Icon size={size} color={color} className="shrink-0" aria-hidden />
}

export interface ProductTab {
  id: ProductId
  label: string
  accentColor: string
  tagline: string
  stage: ProductStage
}

export const PRODUCT_TABS: readonly ProductTab[] = [
  { id: 'aumraa',      label: 'Aumraa',               accentColor: '#2F9E44', tagline: 'Studio brand — green primary',                     stage: 'Base' },
  { id: 'technocracy', label: 'Technocracy',          accentColor: '#8B5CF6', tagline: 'Admin dashboard — dark surfaces',                  stage: 'Internal' },
  { id: 'lemniscate',  label: 'Leminiscate',          accentColor: '#1C60C1', tagline: 'Community finance SaaS — light, blue primary',     stage: 'Live' },
  { id: 'kaayo',       label: 'Kaayo',                accentColor: '#970103', tagline: 'Tutor & class operations · Mobile · Tablet',       stage: 'Live' },
  { id: 'maligai',     label: 'Maligai Manager',      accentColor: '#D97706', tagline: 'Grocery & retail — mobile primary',                stage: 'Next' },
  { id: 'ilakh',       label: 'Ilakh',                accentColor: '#0369A1', tagline: 'Goal tracking & personal finance · Web · Mobile',  stage: 'Next' },
  { id: 'yakaizen',    label: 'Yakaizen',             accentColor: '#06B6D4', tagline: 'Habit & continuous improvement · Mobile · Watch',  stage: 'YTS' },
  { id: 'smartlife',   label: 'Smart Life-Style App', accentColor: '#7C3AED', tagline: 'Yet to ideate',                                    stage: 'YTS' },
]

interface ProductTabsProps {
  active: string
  onChange: (id: ProductId) => void
  /** Products this page actually has content for. Omit to treat all as ready. */
  implemented?: readonly ProductId[]
  className?: string
}

export function ProductTabs({ active, onChange, implemented, className = '' }: ProductTabsProps) {
  return (
    // ponytail: scrollbar chrome hidden, not scrolling — the strip fits every desktop
    // width, and below `lg` a swipeable tab strip is the expected mobile pattern.
    <div className={`sticky top-16 z-20 bg-slate-50 dark:bg-slate-950 -mx-6 lg:-mx-10 px-6 lg:px-10 border-b border-slate-200 dark:border-slate-800 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}>
      <div className="flex gap-0 min-w-max" role="tablist">
        {PRODUCT_TABS.map(tab => {
          const isActive = active === tab.id
          const isImpl = !implemented || implemented.includes(tab.id)
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              role="tab"
              aria-selected={isActive}
              title={`${STAGE_MARKS[tab.stage].label} — ${STAGE_MARKS[tab.stage].meaning}\n${isImpl ? tab.tagline : 'Placeholder, confirm at product design kickoff'}`}
              className={[
                'relative inline-flex items-center gap-1.5 px-3 py-2.5 border-b-2 transition-colors whitespace-nowrap shrink-0',
                isActive
                  ? 'text-slate-900 dark:text-white'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600',
                isImpl ? '' : 'opacity-50',
              ].join(' ')}
              style={{
                borderBottomColor: isActive ? tab.accentColor : undefined,
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: '0.875rem',
              }}
            >
              {tab.label}
              <StageMark stage={tab.stage} />
            </button>
          )
        })}
      </div>
    </div>
  )
}
