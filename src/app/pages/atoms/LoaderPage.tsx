import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { useProductTheme, type ProductId } from '@/app/context/ProductThemeContext'
import { Loader } from '@/app/components/atoms/loader'
import { Loader as LemniscateLoader } from '@aumraa/breathe-react/lemniscate'

const ALL_PRODUCTS: ProductId[] = ['aumraa', 'technocracy', 'lemniscate', 'maligai', 'kaayo', 'ilakh', 'ulagellam', 'yakaizen']

export function LoaderPage() {
  const { activeProduct } = useProductTheme()
  const isLemniscate = activeProduct === 'lemniscate'
  // Leminiscate tab renders its brand loader; every other product gets the default ring. Same props on both.
  const L = (isLemniscate ? LemniscateLoader : Loader) as typeof Loader
  const from = isLemniscate ? '@aumraa/breathe-react/lemniscate' : '@aumraa/breathe-react'

  return (
    <ComponentPageLayout
      title="Loader"
      description="Loading indicator for full pages and sections, such as route changes and session checks. Every product uses the default ring; Leminiscate uses its brand symbol, with a dash tracing the infinity loop."
      level="Atom"
      status="Beta"
      implemented={ALL_PRODUCTS}
      sections={[
        {
          title: 'Default',
          description: isLemniscate
            ? 'A gradient dash laps the loop over a faint track while the roof gently breathes in step, both without pausing. The loop itself never scales. With prefers-reduced-motion both stop and the full symbol shows.'
            : 'A ring in the product primary colour, at medium size.',
          preview: <L />,
          code: {
            react: `import { Loader } from '${from}'

<Loader />`,
          },
        },
        {
          title: 'Sizes',
          description: isLemniscate ? 'Three widths: sm (40px), md (72px), lg (120px).' : 'Three sizes: sm (16px), md (24px), lg (36px).',
          preview: (
            <div className="flex items-end gap-8">
              <L size="sm" />
              <L size="md" />
              <L size="lg" />
            </div>
          ),
          code: {
            react: `<Loader size="sm" />
<Loader size="md" />
<Loader size="lg" />`,
          },
        },
        {
          title: 'With label',
          description: 'A short caption under the loader. It doubles as the accessible name.',
          preview: (
            <div className="flex items-end gap-10">
              <L label="Loading dashboard…" />
              <L label="Signing you in…" />
            </div>
          ),
          code: {
            react: `<Loader label="Loading dashboard…" />`,
          },
        },
        {
          title: 'Full page',
          description: 'Centred on the page background while a route or the session loads, for example as the Suspense fallback.',
          preview: (
            <div className="flex h-64 w-full items-center justify-center rounded-lg border border-border bg-background">
              <L size="lg" />
            </div>
          ),
          code: {
            react: `import { Suspense } from 'react'
import { Loader } from '${from}'

function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Loader size="lg" />
    </div>
  )
}

<Suspense fallback={<PageLoader />}>
  <Routes>{/* … */}</Routes>
</Suspense>`,
          },
        },
        {
          title: 'Symbol only',
          products: ['lemniscate'],
          description: 'Drop the roof where space is tight, such as inside a card or a table body.',
          preview: (
            <div className="flex items-end gap-8">
              <LemniscateLoader showRoof={false} size="sm" />
              <LemniscateLoader showRoof={false} size="md" />
              <LemniscateLoader showRoof={false} size="lg" />
            </div>
          ),
          code: {
            react: `import { Loader } from '@aumraa/breathe-react/lemniscate'

<Loader showRoof={false} />`,
          },
        },
      ]}
    />
  )
}
