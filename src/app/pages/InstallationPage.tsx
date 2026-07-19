import { PageHeader } from '../components/shared/PageHeader';
import { CodeBlock } from '../components/shared/CodeBlock';
import { PageNavigation } from '../components/shared/PageNavigation';
import { CheckCircle2, KeyRound, Terminal, Paintbrush, Puzzle, UploadCloud } from 'lucide-react';

const steps = [
  {
    icon: KeyRound,
    title: 'Authenticate with GitHub Packages',
    description:
      'Breathe is published to the Aumraa GitHub Packages registry. Add a .npmrc at your project root and a GitHub token (classic PAT with read:packages scope) in your environment.',
    code: `# .npmrc
@aumraa:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=\${GITHUB_TOKEN}`,
    language: 'bash',
  },
  {
    icon: Terminal,
    title: 'Install the package',
    description: 'One package for every Aumraa product. Your bundler only ships what you import.',
    code: `pnpm add @aumraa/breathe-react

# or: npm install @aumraa/breathe-react`,
    language: 'bash',
  },
  {
    icon: Paintbrush,
    title: 'Wire the styles (Tailwind v4)',
    description:
      'In your global CSS: import Tailwind, the Breathe theme mapping, and YOUR product theme only. The @source line lets Tailwind scan the packaged components for utility classes. Kaayo shown here — Lemniscate imports styles/lemniscate.css instead.',
    code: `/* src/index.css */
@import 'tailwindcss';
@import '@aumraa/breathe-react/styles/breathe.css';  /* Tailwind theme mapping */
@import '@aumraa/breathe-react/styles/kaayo.css';    /* your product tokens only */
@source '../node_modules/@aumraa/breathe-react/dist';`,
    language: 'css',
  },
  {
    icon: Puzzle,
    title: 'Use components',
    description:
      'Shared components come from the package root. Product-specific components live behind a subpath — Kaayo’s Neo-Brutalist set is under /kaayo, invisible to other products.',
    code: `import { Button, Card, CardContent, Badge } from '@aumraa/breathe-react'
import { KayoBrutalistHeader, KayoBrutalistBottomNav } from '@aumraa/breathe-react/kaayo'

function Home() {
  return (
    <>
      <KayoBrutalistHeader />
      <Card>
        <CardContent>
          <Badge>Active</Badge>
          <Button>Get started</Button>
        </CardContent>
      </Card>
      <KayoBrutalistBottomNav />
    </>
  )
}`,
    language: 'tsx',
  },
];

export function InstallationPage() {
  return (
    <div className="max-w-3xl px-6 lg:px-10 py-10">
      <PageHeader
        title="Installation"
        description="Install @aumraa/breathe-react in a product app. One shared package — your product's theme CSS decides the brand, and nothing from other products ships in your bundle."
        section="Overview"
        badge="v0.1"
      />

      {/* Requirements */}
      <div className="mb-10 p-5 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
        <h3 className="text-teal-800 dark:text-teal-300 mb-3 m-0" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9375rem' }}>
          Prerequisites
        </h3>
        <ul className="space-y-2">
          {['React 18 or later', 'Tailwind CSS v4', 'A GitHub token with read:packages (Aumraa org)', 'Node.js 18+ and pnpm'].map(req => (
            <li key={req} className="flex items-center gap-2 text-teal-700 dark:text-teal-400" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
              <CheckCircle2 size={15} className="shrink-0" />
              {req}
            </li>
          ))}
        </ul>
      </div>

      {/* Steps */}
      <div className="space-y-10">
        {steps.map((step, i) => (
          <div key={step.title}>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                <step.icon size={16} className="text-slate-600 dark:text-slate-400" />
              </div>
              <div className="flex items-center gap-2 pt-1">
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-white shrink-0"
                      style={{ background: 'linear-gradient(135deg, #0D9488, #6366F1)', fontSize: '0.65rem', fontWeight: 700 }}>
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-slate-900 dark:text-slate-100 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.0625rem' }}>
                    {step.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 mt-1 mb-0" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
            <CodeBlock code={step.code} language={step.language} />
          </div>
        ))}
      </div>

      {/* How theming stays product-scoped */}
      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-slate-900 dark:text-white mb-2 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
          Why other products never leak into your app
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-5" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', lineHeight: 1.7 }}>
          Components are brand-blind: they read semantic CSS variables like <code>--primary</code> and <code>--radius</code>.
          The product CSS file you import is the only thing that fills those variables. Files for other products exist in
          node_modules but are never imported, so they never enter your bundle. Unused components are tree-shaken the same way.
        </p>
        <CodeBlock
          code={`/* styles/kaayo.css (excerpt) — the whole "theme" is variable mapping */
:root {
  --primary: var(--kayo-color-primary);
  --radius:  var(--kayo-radius-default);
  --border:  var(--kayo-color-border);
  /* ... */
}`}
          language="css"
        />
      </div>

      {/* Publishing (maintainers) */}
      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 mb-2">
          <UploadCloud size={18} className="text-slate-500 dark:text-slate-400" />
          <h2 className="text-slate-900 dark:text-white m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
            Publishing a new version (maintainers)
          </h2>
        </div>
        <p className="text-slate-500 dark:text-slate-400 mb-5" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', lineHeight: 1.7 }}>
          The package lives in this repo at <code>packages/react</code>. Bump the version, build, and publish to GitHub Packages:
        </p>
        <CodeBlock
          code={`cd packages/react
pnpm version patch        # or minor / major
pnpm build                # copies token CSS + compiles TypeScript to dist/
pnpm publish              # publishes to npm.pkg.github.com (needs write:packages token)`}
          language="bash"
        />
      </div>

      <PageNavigation />
    </div>
  );
}
