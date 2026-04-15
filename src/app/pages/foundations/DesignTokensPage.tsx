import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { CodeBlock } from '../../components/shared/CodeBlock';
import { PageHeader } from '../../components/shared/PageHeader';
import { PageNavigation } from '../../components/shared/PageNavigation';

type TokenRow = {
  name: string;
  token: string;
  value: string;
  role?: string;
};

type Product = {
  id: string;
  label: string;
  prefix: string;
  description: string;
  surface: 'light' | 'dark';
  platforms: string[];
  colors: TokenRow[];
  typography: TokenRow[];
  radius: TokenRow[];
  icons: TokenRow[];
};

const products: Product[] = [
  {
    id: 'lemniscate',
    label: 'Lemniscate',
    prefix: 'lmns',
    description: 'Community finance SaaS with light surfaces and a sky-blue primary.',
    surface: 'light',
    platforms: ['Web CSS'],
    colors: [
      { name: 'Primary', token: '--lmns-color-primary', value: '#40AAD4', role: 'Buttons, links, selected states' },
      { name: 'Primary Dark', token: '--lmns-color-primary-dark', value: '#1C60C1', role: 'Hover states, gradients' },
      { name: 'Accent', token: '--lmns-color-accent', value: '#E07722', role: 'Highlights, CTAs, logo roof tip' },
      { name: 'Background', token: '--lmns-color-background', value: '#FFFFFF', role: 'Page surface' },
      { name: 'Background Secondary', token: '--lmns-color-background-secondary', value: '#F9FAFB', role: 'Cards, sidebars' },
      { name: 'Foreground', token: '--lmns-color-foreground', value: '#1F2937', role: 'Body text' },
      { name: 'Foreground Secondary', token: '--lmns-color-foreground-secondary', value: '#6B7280', role: 'Captions, metadata' },
      { name: 'Border', token: '--lmns-color-border', value: '#E5E7EB', role: 'Inputs, dividers' },
      { name: 'Success', token: '--lmns-color-success', value: '#16A34A', role: 'Positive states' },
      { name: 'Danger', token: '--lmns-color-danger', value: '#DC2626', role: 'Errors, destructive actions' },
    ],
    typography: [
      { name: 'Base size', token: '--lmns-font-size-base', value: '16px' },
      { name: 'Body weight', token: '--lmns-font-weight-body', value: '400' },
      { name: 'Heading weight', token: '--lmns-font-weight-heading', value: '500' },
    ],
    radius: [
      { name: 'Default', token: '--lmns-radius-default', value: '10px' },
      { name: 'Small', token: '--lmns-radius-sm', value: '8px' },
      { name: 'Large', token: '--lmns-radius-lg', value: '16px' },
      { name: 'Pill', token: '--lmns-radius-pill', value: '9999px' },
    ],
    icons: [
      { name: 'XS', token: '--lmns-icon-xs', value: '12px' },
      { name: 'SM', token: '--lmns-icon-sm', value: '16px' },
      { name: 'MD', token: '--lmns-icon-md', value: '20px' },
      { name: 'LG', token: '--lmns-icon-lg', value: '24px' },
    ],
  },
  {
    id: 'technocracy',
    label: 'Technocracy',
    prefix: 'tech',
    description: 'Dense admin dashboard with dark surfaces and the same shared base palette.',
    surface: 'dark',
    platforms: ['Web CSS'],
    colors: [
      { name: 'Primary', token: '--tech-color-primary', value: '#40AAD4', role: 'Interactive elements' },
      { name: 'Accent', token: '--tech-color-accent', value: '#E07722', role: 'Highlights and alerts' },
      { name: 'Background', token: '--tech-color-background', value: '#111827', role: 'App shell surface' },
      { name: 'Background Secondary', token: '--tech-color-background-secondary', value: '#1F2937', role: 'Panels and cards' },
      { name: 'Sidebar', token: '--tech-color-sidebar', value: '#111827', role: 'Navigation column' },
      { name: 'Foreground', token: '--tech-color-foreground', value: '#F9FAFB', role: 'Text on dark' },
      { name: 'Foreground Secondary', token: '--tech-color-foreground-secondary', value: '#9CA3AF', role: 'Metadata' },
      { name: 'Border', token: '--tech-color-border', value: '#374151', role: 'Dividers' },
    ],
    typography: [
      { name: 'Base size', token: '--tech-font-size-base', value: '14px' },
      { name: 'Body weight', token: '--tech-font-weight-body', value: '400' },
      { name: 'Heading weight', token: '--tech-font-weight-heading', value: '500' },
    ],
    radius: [
      { name: 'Default', token: '--tech-radius-default', value: '8px' },
      { name: 'Small', token: '--tech-radius-sm', value: '4px' },
      { name: 'Large', token: '--tech-radius-lg', value: '10px' },
    ],
    icons: [
      { name: 'SM', token: '--tech-icon-sm', value: '16px' },
      { name: 'MD', token: '--tech-icon-md', value: '20px' },
      { name: 'LG', token: '--tech-icon-lg', value: '24px' },
    ],
  },
  {
    id: 'aumraa',
    label: 'Aumraa',
    prefix: 'amra',
    description: 'Studio brand layer for the marketing site and outward-facing communications.',
    surface: 'light',
    platforms: ['Web CSS'],
    colors: [
      { name: 'Primary', token: '--amra-color-primary', value: '#1C60C1', role: 'Studio brand primary' },
      { name: 'Accent', token: '--amra-color-accent', value: '#E07722', role: 'Brand accent' },
      { name: 'Background', token: '--amra-color-background', value: '#FFFFFF', role: 'Page surface' },
      { name: 'Foreground', token: '--amra-color-foreground', value: '#111827', role: 'Body copy' },
      { name: 'Gradient Start', token: '--amra-color-gradient-start', value: '#40AAD4', role: 'Hero gradients' },
      { name: 'Gradient End', token: '--amra-color-gradient-end', value: '#1C60C1', role: 'Hero gradients' },
    ],
    typography: [
      { name: 'Base size', token: '--amra-font-size-base', value: '16px' },
      { name: 'Heading weight', token: '--amra-font-weight-heading', value: '600' },
    ],
    radius: [],
    icons: [{ name: 'MD', token: '--amra-icon-md', value: '20px' }],
  },
  {
    id: 'yakaizen',
    label: 'Yakaizen',
    prefix: 'ykai',
    description: 'Planned multi-platform product. The token schema is in place before the UI starts.',
    surface: 'light',
    platforms: ['Web CSS', 'React Native', 'iOS Swift', 'Android XML', 'watchOS-ready'],
    colors: [
      { name: 'Primary', token: '--ykai-color-primary', value: '#40AAD4', role: 'Placeholder until kickoff' },
      { name: 'Accent', token: '--ykai-color-accent', value: '#E07722', role: 'Placeholder accent' },
      { name: 'Background', token: '--ykai-color-background', value: '#FFFFFF', role: 'Placeholder surface' },
      { name: 'Foreground', token: '--ykai-color-foreground', value: '#111827', role: 'Placeholder text' },
    ],
    typography: [{ name: 'Base size', token: '--ykai-font-size-base', value: '14px' }],
    radius: [],
    icons: [
      { name: 'SM', token: '--ykai-icon-sm', value: '16px' },
      { name: 'MD', token: '--ykai-icon-md', value: '20px' },
    ],
  },
];

const platformMatrix = [
  { product: 'Lemniscate', web: true, rn: false, ios: false, android: false, watch: false },
  { product: 'Technocracy', web: true, rn: false, ios: false, android: false, watch: false },
  { product: 'Aumraa', web: true, rn: false, ios: false, android: false, watch: false },
  { product: 'Yakaizen', web: true, rn: true, ios: true, android: true, watch: true },
];

function TokenBadge({ token }: { token: string }) {
  return (
    <code
      className="inline-flex rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
      style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}
    >
      {token}
    </code>
  );
}

function Swatch({ color }: { color: string }) {
  return <div className="h-6 w-6 rounded-md border border-slate-200 dark:border-slate-700" style={{ backgroundColor: color }} />;
}

function StatusCell({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-2 py-1 ${active ? 'bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300' : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500'}`}
      style={{ minWidth: '2.75rem', fontSize: '0.72rem', fontWeight: 600 }}
    >
      {active ? 'Yes' : 'No'}
    </span>
  );
}

function TokenTable({
  rows,
  showSwatch = false,
  showRole = false,
}: {
  rows: TokenRow[];
  showSwatch?: boolean;
  showRole?: boolean;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-900/70">
            {showSwatch && (
              <th className="px-4 py-3 text-left text-slate-500 dark:text-slate-400" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                Sample
              </th>
            )}
            <th className="px-4 py-3 text-left text-slate-500 dark:text-slate-400" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
              Name
            </th>
            <th className="px-4 py-3 text-left text-slate-500 dark:text-slate-400" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
              Token
            </th>
            <th className="px-4 py-3 text-left text-slate-500 dark:text-slate-400" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
              Value
            </th>
            {showRole && (
              <th className="px-4 py-3 text-left text-slate-500 dark:text-slate-400" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                Role
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.token} className={index % 2 === 0 ? 'bg-white dark:bg-slate-950' : 'bg-slate-50/60 dark:bg-slate-900/40'}>
              {showSwatch && (
                <td className="border-t border-slate-100 px-4 py-3 dark:border-slate-800">
                  <Swatch color={row.value} />
                </td>
              )}
              <td className="border-t border-slate-100 px-4 py-3 text-slate-900 dark:text-slate-100 dark:border-slate-800" style={{ fontWeight: 600 }}>
                {row.name}
              </td>
              <td className="border-t border-slate-100 px-4 py-3 dark:border-slate-800">
                <TokenBadge token={row.token} />
              </td>
              <td className="border-t border-slate-100 px-4 py-3 text-slate-500 dark:text-slate-400 dark:border-slate-800" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
                {row.value}
              </td>
              {showRole && (
                <td className="border-t border-slate-100 px-4 py-3 text-slate-500 dark:text-slate-400 dark:border-slate-800" style={{ fontSize: '0.82rem' }}>
                  {row.role}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DesignTokensPage() {
  return (
    <div className="max-w-6xl px-6 py-10 lg:px-10">
      <PageHeader
        title="Design Tokens"
        description="Breathe stores every shared design decision in JSON, then distributes those tokens automatically to product-specific outputs for web, mobile, iOS, and Android."
        section="Foundations"
        badge="Style Dictionary"
        badgeColor="indigo"
      />

      <section className="mb-12">
        <div className="mb-6">
          <h2 className="m-0 mb-2 text-slate-900 dark:text-white" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
            How the architecture works
          </h2>
          <p className="m-0 max-w-3xl text-slate-500 dark:text-slate-400" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', lineHeight: 1.7 }}>
            The system is intentionally split into two layers. Global tokens describe what a value is. Product tokens describe what that value does in a specific product. Components only consume the stable shadcn bridge.
          </p>
        </div>

        <div className="grid gap-4 xl:grid-cols-4">
          {[
            {
              title: '1. Global Palette',
              subtitle: 'Raw values',
              body: 'Examples: --color-blue-400, --radius-lg, --font-size-base. These are reusable and product-agnostic.',
            },
            {
              title: '2. Product Aliases',
              subtitle: 'Semantic meaning',
              body: 'Examples: --lmns-color-primary, --tech-color-background. Products map the shared palette into business meaning.',
            },
            {
              title: '3. shadcn Bridge',
              subtitle: 'Stable interface',
              body: 'Examples: --primary, --background, --radius. Components read this layer so product swaps do not require component rewrites.',
            },
            {
              title: '4. Components',
              subtitle: 'Rendered UI',
              body: 'Buttons, cards, sidebars, and charts resolve the bridge variables at runtime and inherit the active product theme.',
            },
          ].map((step, index) => (
            <div key={step.title} className="relative rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
              <div className="mb-3 flex items-center justify-between">
                <Badge variant="outline">{step.subtitle}</Badge>
                {index < 3 && <span className="hidden text-slate-300 xl:block">→</span>}
              </div>
              <h3 className="m-0 mb-2 text-slate-900 dark:text-white" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', fontWeight: 700 }}>
                {step.title}
              </h3>
              <p className="m-0 text-slate-500 dark:text-slate-400" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.84rem', lineHeight: 1.6 }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900/60 dark:bg-amber-950/30">
          <p className="m-0 text-amber-900 dark:text-amber-200" style={{ fontWeight: 700 }}>
            Cardinal rule
          </p>
          <p className="m-0 mt-2 text-amber-800 dark:text-amber-300" style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>
            Never hard-code brand colors or spacing in product code. Add or change the token in
            <code className="mx-1 rounded bg-white/70 px-1 py-0.5 dark:bg-slate-900/60">tokens/src/</code>
            and rebuild the outputs instead.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <div className="mb-6">
          <h2 className="m-0 mb-2 text-slate-900 dark:text-white" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
            Product token reference
          </h2>
          <p className="m-0 text-slate-500 dark:text-slate-400" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem' }}>
            Each product ships a prefixed token surface. The underlying palette is shared, but the semantics and platform outputs vary by product.
          </p>
        </div>

        <Tabs defaultValue="lemniscate">
          <TabsList className="mb-6 h-auto flex-wrap justify-start gap-2 rounded-xl bg-slate-100 p-2 dark:bg-slate-900">
            {products.map((product) => (
              <TabsTrigger key={product.id} value={product.id} className="rounded-lg px-4 py-2">
                <span className="mr-2">{product.label}</span>
                {product.id === 'yakaizen' && <Badge variant="outline">Stub</Badge>}
              </TabsTrigger>
            ))}
          </TabsList>

          {products.map((product) => (
            <TabsContent key={product.id} value={product.id} className="mt-0 space-y-8">
              <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="m-0 text-slate-900 dark:text-slate-100" style={{ fontWeight: 700, fontSize: '1rem' }}>
                    {product.label}
                  </p>
                  <p className="m-0 mt-2 max-w-2xl text-slate-500 dark:text-slate-400" style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>
                    {product.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.platforms.map((platform) => (
                      <Badge key={platform} variant="secondary">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl bg-slate-50 px-4 py-3 text-slate-600 dark:bg-slate-900 dark:text-slate-300" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
                  prefix: {product.prefix}--
                  <div className="mt-1 text-slate-400 dark:text-slate-500">surface: {product.surface}</div>
                </div>
              </div>

              <div>
                <h3 className="m-0 mb-3 text-slate-900 dark:text-white" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1rem' }}>
                  Colors
                </h3>
                <TokenTable rows={product.colors} showSwatch showRole />
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <h3 className="m-0 mb-3 text-slate-900 dark:text-white" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1rem' }}>
                    Typography
                  </h3>
                  <TokenTable rows={product.typography} />
                </div>
                <div>
                  <h3 className="m-0 mb-3 text-slate-900 dark:text-white" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1rem' }}>
                    Icon Sizes
                  </h3>
                  <TokenTable rows={product.icons} />
                </div>
              </div>

              {product.radius.length > 0 && (
                <div>
                  <h3 className="m-0 mb-3 text-slate-900 dark:text-white" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1rem' }}>
                    Border Radius
                  </h3>
                  <TokenTable rows={product.radius} />
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <section className="mb-12">
        <div className="mb-6">
          <h2 className="m-0 mb-2 text-slate-900 dark:text-white" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
            Platform availability
          </h2>
          <p className="m-0 text-slate-500 dark:text-slate-400" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem' }}>
            One JSON source fans out to the right output format for each delivery surface. Web is live today. Yakaizen is scaffolded for future native work.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/70">
                {['Product', 'Web CSS', 'React Native', 'iOS Swift', 'Android XML', 'watchOS'].map((heading) => (
                  <th key={heading} className="px-4 py-3 text-left text-slate-500 dark:text-slate-400" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {platformMatrix.map((row, index) => (
                <tr key={row.product} className={index % 2 === 0 ? 'bg-white dark:bg-slate-950' : 'bg-slate-50/60 dark:bg-slate-900/40'}>
                  <td className="border-t border-slate-100 px-4 py-3 text-slate-900 dark:text-slate-100 dark:border-slate-800" style={{ fontWeight: 600 }}>
                    {row.product}
                  </td>
                  <td className="border-t border-slate-100 px-4 py-3 dark:border-slate-800"><StatusCell active={row.web} /></td>
                  <td className="border-t border-slate-100 px-4 py-3 dark:border-slate-800"><StatusCell active={row.rn} /></td>
                  <td className="border-t border-slate-100 px-4 py-3 dark:border-slate-800"><StatusCell active={row.ios} /></td>
                  <td className="border-t border-slate-100 px-4 py-3 dark:border-slate-800"><StatusCell active={row.android} /></td>
                  <td className="border-t border-slate-100 px-4 py-3 dark:border-slate-800"><StatusCell active={row.watch} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <div className="mb-6">
          <h2 className="m-0 mb-2 text-slate-900 dark:text-white" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
            Using tokens in product apps
          </h2>
          <p className="m-0 max-w-3xl text-slate-500 dark:text-slate-400" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', lineHeight: 1.7 }}>
            Apps import the generated CSS for their product, then bridge those product aliases into generic shadcn variables. Components should stay blissfully unaware of product prefixes.
          </p>
        </div>

        <div className="space-y-4">
          <CodeBlock
            language="css"
            filename="globals.css"
            code={`/* Step 1: import product tokens */
@import '@aumraa/breathe/tokens/dist/web/lemniscate.css';

/* Step 2: bridge product aliases to shadcn */
:root {
  --primary: var(--lmns-color-primary);
  --accent: var(--lmns-color-accent);
  --background: var(--lmns-color-background);
  --foreground: var(--lmns-color-foreground);
  --border: var(--lmns-color-border);
  --radius: var(--lmns-radius-default);
}`}
          />

          <CodeBlock
            language="bash"
            filename="token-workflow.sh"
            code={`# 1. Edit the JSON source of truth
tokens/src/lemniscate.json

# 2. Rebuild all outputs
pnpm tokens

# 3. Commit the generated dist files
git add tokens/src tokens/dist
git commit -m "tokens: update lemniscate theme"`}
          />
        </div>
      </section>

      <PageNavigation />
    </div>
  );
}
