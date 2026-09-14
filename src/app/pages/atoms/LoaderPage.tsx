import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { useProductTheme, type ProductId } from '@/app/context/ProductThemeContext'
import { Loader } from '@/app/components/atoms/loader'
import { Loader as LemniscateLoader } from '@aumraa/breathe-react/lemniscate'
import { Loader as KaayoLoader } from '@aumraa/breathe-react/kaayo'

const ALL_PRODUCTS: ProductId[] = ['aumraa', 'technocracy', 'lemniscate', 'maligai', 'kaayo', 'ilakh', 'ulagellam', 'yakaizen']

export function LoaderPage() {
  const { activeProduct } = useProductTheme()
  const isLemniscate = activeProduct === 'lemniscate'
  const isKaayo = activeProduct === 'kaayo'

  // Leminiscate and Kaayo render brand loaders; other products get the default ring.
  const L = (isLemniscate ? LemniscateLoader : isKaayo ? KaayoLoader : Loader) as typeof Loader
  const from = isLemniscate
    ? '@aumraa/breathe-react/lemniscate'
    : isKaayo
    ? '@aumraa/breathe-react/kaayo'
    : '@aumraa/breathe-react'

  // @aumraa/breathe-native ships Leminiscate and Kaayo brand loaders.
  const native = (snippet: string) => {
    if (isLemniscate) return `import { Loader } from '@aumraa/breathe-native'\n\n${snippet}`
    if (isKaayo) return `import { KaayoLoader } from '@aumraa/breathe-native'\n\n${snippet.replace(/<Loader/g, '<KaayoLoader')}`
    return undefined
  }

  return (
    <ComponentPageLayout
      title="Loader"
      description="Loading indicator for full pages and sections, such as route changes and session checks. Products can use brand-specific animated marks (such as Kaayo's galloping stallion and Leminiscate's infinity loop) or the universal ring loader."
      level="Atom"
      status="Beta"
      implemented={ALL_PRODUCTS}
      sections={[
        {
          title: 'Default',
          description: isLemniscate
            ? 'A gradient dash laps the loop over a faint track while the roof gently breathes in step, both without pausing. The loop itself never scales. With prefers-reduced-motion both stop and the full symbol shows.'
            : isKaayo
            ? "Kaayo's iconic stallion symbol galloping in horizontal rhythm with a responsive ground stride shadow in lighter primary crimson (#E14144) fading and revealing in lockstep with the horse stride."
            : 'A ring in the product primary colour, at medium size.',
          preview: <L />,
          code: {
            react: `import { Loader } from '${from}'

<Loader />`,
            reactNative: native('<Loader />'),
          },
        },
        {
          title: 'Sizes',
          description: isLemniscate || isKaayo
            ? 'Three widths: sm (40px), md (72px), lg (120px).'
            : 'Three sizes: sm (16px), md (24px), lg (36px).',
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
            reactNative: native(`<Loader size="sm" />
<Loader size="md" />
<Loader size="lg" />`),
          },
        },
        {
          title: 'With label',
          description: 'A short caption under the loader. It doubles as the accessible name.',
          preview: (
            <div className="flex items-end gap-10">
              <L label={isKaayo ? "Scheduling tutor…" : "Loading dashboard…"} />
              <L label={isKaayo ? "Preparing classroom…" : "Signing you in…"} />
            </div>
          ),
          code: {
            react: `<Loader label="${isKaayo ? "Scheduling tutor…" : "Loading dashboard…"}" />`,
            reactNative: native(`<Loader label="${isKaayo ? "Scheduling tutor…" : "Loading dashboard…"}" />`),
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
            reactNative: native(`import { View } from 'react-native'

<View className="flex-1 items-center justify-center bg-background">
  <Loader size="lg" />
</View>`),
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
            reactNative: `import { Loader } from '@aumraa/breathe-native'

<Loader showRoof={false} />`,
          },
        },
        {
          title: 'Stallion only (no shadow)',
          products: ['kaayo'],
          description: 'Hide the ground stride shadow for compact cards, buttons, or standalone hero displays.',
          preview: (
            <div className="flex items-end gap-8">
              <KaayoLoader showShadow={false} size="sm" />
              <KaayoLoader showShadow={false} size="md" />
              <KaayoLoader showShadow={false} size="lg" />
            </div>
          ),
          code: {
            react: `import { Loader } from '@aumraa/breathe-react/kaayo'

<Loader showShadow={false} />`,
            reactNative: native('<Loader showShadow={false} />'),
          },
        },
      ]}
    />
  )
}
