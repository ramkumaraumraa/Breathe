import { ReactNode } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/app/components/ui/tabs'
import { Badge } from '@/app/components/ui/badge'
import {
  useProductTheme,
  productMeta,
  ProductId,
  ProductPreviewWrapper,
} from '@/app/context/ProductThemeContext'

// ─── Types ───────────────────────────────────────────────────────────────────

export type AtomicLevel = 'Atom' | 'Molecule' | 'Organism' | 'Template'
export type ComponentStatus = 'Stable' | 'Beta' | 'Deprecated' | 'Planned'

export interface ComponentSection {
  title: string
  description?: string
  preview: ReactNode
  code?: {
    react?: string
    reactNative?: string
    ios?: string
    android?: string
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

const statusVariant = (s: ComponentStatus): 'default' | 'secondary' | 'destructive' | 'outline' => {
  if (s === 'Stable')     return 'default'
  if (s === 'Beta')       return 'secondary'
  if (s === 'Deprecated') return 'destructive'
  return 'outline'
}

const levelColour: Record<AtomicLevel, string> = {
  Atom:      'bg-blue-50 text-blue-700 border-blue-200',
  Molecule:  'bg-purple-50 text-purple-700 border-purple-200',
  Organism:  'bg-amber-50 text-amber-700 border-amber-200',
  Template:  'bg-green-50 text-green-700 border-green-200',
}

const ALL_PRODUCTS = Object.keys(productMeta) as ProductId[]

// ─── Product switcher ─────────────────────────────────────────────────────────

function ProductSwitcher({ implemented }: { implemented: ProductId[] }) {
  const { activeProduct, setActiveProduct } = useProductTheme()

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs text-muted-foreground font-medium mr-1">Product:</span>
      {ALL_PRODUCTS.map((id) => {
        const meta = productMeta[id]
        const isImpl = implemented.includes(id)
        const isActive = activeProduct === id
        return (
          <button
            key={id}
            onClick={() => setActiveProduct(id)}
            className={[
              'px-3 py-1 rounded-full text-xs font-medium border transition-all',
              isActive
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-background text-muted-foreground hover:border-primary/50',
              !isImpl ? 'opacity-60' : '',
            ].join(' ')}
            title={!isImpl ? 'Placeholder — confirm at product design kickoff' : meta.description}
          >
            {meta.label}
            {!isImpl && <span className="ml-1 opacity-70">·</span>}
          </button>
        )
      })}
    </div>
  )
}

// ─── Code tabs ───────────────────────────────────────────────────────────────

function CodeTabs({ code }: { code: NonNullable<ComponentSection['code']> }) {
  const tabs = [
    { id: 'react',   label: 'React',         content: code.react },
    { id: 'rn',      label: 'React Native',  content: code.reactNative },
    { id: 'ios',     label: 'iOS (Swift)',    content: code.ios },
    { id: 'android', label: 'Android (XML)', content: code.android },
  ].filter(t => t.content)

  if (tabs.length === 0) return null

  return (
    <Tabs defaultValue={tabs[0].id}>
      <TabsList className="h-8">
        {tabs.map(t => (
          <TabsTrigger key={t.id} value={t.id} className="text-xs px-3 h-7">
            {t.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map(t => (
        <TabsContent key={t.id} value={t.id}>
          <pre className="rounded-lg bg-muted p-4 text-xs font-mono overflow-x-auto text-foreground whitespace-pre-wrap">
            <code>{t.content}</code>
          </pre>
        </TabsContent>
      ))}
    </Tabs>
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
    <div className="max-w-3xl px-6 lg:px-10 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-semibold">{title}</h1>
          <Badge variant={statusVariant(status)}>{status}</Badge>
          <span className={`text-xs px-2 py-0.5 rounded border font-medium ${levelColour[level]}`}>
            {level}
          </span>
        </div>
        <p className="text-muted-foreground max-w-2xl">{description}</p>
        <div className="pt-2 pb-4 border-b border-border space-y-2">
          <ProductSwitcher implemented={implemented} />
          <p className="text-xs text-muted-foreground">
            Previews render with the selected product's token set.
            Dots (·) indicate placeholder implementations confirmed at each product's design kickoff.
          </p>
        </div>
      </div>

      {/* Sections */}
      {sections.map((section, i) => (
        <div key={i} className="space-y-4">
          <div>
            <h2 className="text-lg font-medium">{section.title}</h2>
            {section.description && (
              <p className="text-sm text-muted-foreground mt-0.5">{section.description}</p>
            )}
          </div>

          <Tabs defaultValue="preview">
            <TabsList className="h-8">
              <TabsTrigger value="preview" className="text-xs px-3 h-7">Preview</TabsTrigger>
              {section.code && (
                <TabsTrigger value="code" className="text-xs px-3 h-7">Code</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="preview">
              <ProductPreviewWrapper className="p-8 border border-border bg-[var(--background)]">
                {section.preview}
              </ProductPreviewWrapper>
            </TabsContent>

            {section.code && (
              <TabsContent value="code">
                <CodeTabs code={section.code} />
              </TabsContent>
            )}
          </Tabs>
        </div>
      ))}
    </div>
  )
}
