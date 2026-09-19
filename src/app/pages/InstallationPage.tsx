import { PageHeader } from '../components/shared/PageHeader';
import { CodeBlock } from '../components/shared/CodeBlock';
import { PageNavigation } from '../components/shared/PageNavigation';
import { CheckCircle2, KeyRound, Terminal, Paintbrush, Puzzle, UploadCloud, Package, Smartphone } from 'lucide-react';

// Which themes actually exist, read off the packages at build time. A hand-kept
// list here would claim themes we never shipped.
const themeNames = (pattern: Record<string, unknown>) =>
  Object.keys(pattern)
    .map((p) => p.split('/').pop()!.replace('.css', ''))
    .filter((n) => n !== 'breathe')
    .sort();

const webThemes = themeNames(import.meta.glob('../../../packages/react/styles/*.css'));
const nativeThemes = themeNames(import.meta.glob('../../../packages/react-native/styles/*.css'));

/** Product-specific components live behind a subpath, invisible to other products. */
const subpaths = [
  { path: '@aumraa/breathe-react/kaayo', what: 'Kaayo’s Neo-Brutalist set — header, bottom nav, sheets' },
  { path: '@aumraa/breathe-react/technocracy', what: 'Technocracy admin OS — glass cards, telemetry table, sidebar' },
  { path: '@aumraa/breathe-react/lemniscate', what: 'Leminiscate button and loader' },
  { path: '@aumraa/breathe-react/aumraa', what: 'The Aumraa brand loader' },
];

const webSteps = [
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
      'In your global CSS: import Tailwind, the Breathe theme mapping, and YOUR product theme only. The @source line lets Tailwind scan the packaged components for utility classes. Kaayo shown here — swap the one line for your product.',
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
      'Shared components come from the package root. Product-specific components live behind a subpath — nothing from another product can reach your bundle.',
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

function Step({
  step,
  index,
}: {
  step: (typeof webSteps)[number];
  index: number;
}) {
  return (
    <div>
      <div className="flex items-start gap-4 mb-4">
        <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
          <step.icon size={16} className="text-slate-600 dark:text-slate-400" />
        </div>
        <div className="flex items-center gap-2 pt-1">
          <span className="w-5 h-5 rounded-full flex items-center justify-center text-white shrink-0"
                style={{ background: 'linear-gradient(135deg, #0D9488, #6366F1)', fontSize: '0.65rem', fontWeight: 700 }}>
            {index + 1}
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
  );
}

function SectionHeading({ icon: Icon, title, blurb }: { icon: typeof Package; title: string; blurb: string }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-2">
        <Icon size={18} className="text-teal-600 dark:text-teal-400" />
        <h2 className="text-slate-900 dark:text-white m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.375rem' }}>
          {title}
        </h2>
      </div>
      <p className="text-slate-500 dark:text-slate-400 m-0" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', lineHeight: 1.7 }}>
        {blurb}
      </p>
    </div>
  );
}

export function InstallationPage() {
  return (
    <div className="max-w-3xl px-6 lg:px-10 py-10">
      <PageHeader
        title="Installation"
        description="Two packages — @aumraa/breathe-react for web, @aumraa/breathe-native for Expo. Your product's theme CSS decides the brand, and nothing from other products ships in your bundle."
        section="Overview"
        badge="v0.1"
      />

      {/* Which themes exist today */}
      <div className="mb-10 p-5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <h3 className="text-slate-900 dark:text-slate-100 mb-3 m-0" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9375rem' }}>
          Themes available today
        </h3>
        <dl className="space-y-2 m-0">
          <div className="flex gap-2 flex-wrap items-baseline">
            <dt className="text-slate-500 dark:text-slate-400 shrink-0" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem' }}>
              breathe-react
            </dt>
            <dd className="text-slate-700 dark:text-slate-300 m-0" style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.8125rem' }}>
              {webThemes.join(' · ')}
            </dd>
          </div>
          <div className="flex gap-2 flex-wrap items-baseline">
            <dt className="text-slate-500 dark:text-slate-400 shrink-0" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem' }}>
              breathe-native
            </dt>
            <dd className="text-slate-700 dark:text-slate-300 m-0" style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.8125rem' }}>
              {nativeThemes.join(' · ')}
            </dd>
          </div>
        </dl>
        <p className="text-slate-500 dark:text-slate-400 mt-3 mb-0" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', lineHeight: 1.6 }}>
          Yakaizen and Smart Life-Style App have no theme yet — their tokens are placeholders until design kickoff.
        </p>
      </div>

      {/* ── React (web) ───────────────────────────────────────────────── */}
      <SectionHeading
        icon={Package}
        title="React — web"
        blurb="Vite or Next, React 18+, Tailwind CSS v4. Components are compiled to dist/ and tree-shaken by your bundler."
      />

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

      <div className="space-y-10">
        {webSteps.map((step, i) => (
          <Step key={step.title} step={step} index={i} />
        ))}
      </div>

      {/* Product subpaths */}
      <div className="mt-10">
        <h3 className="text-slate-900 dark:text-slate-100 mb-3 m-0" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9375rem' }}>
          Product subpaths
        </h3>
        <div className="space-y-2">
          {subpaths.map(sub => (
            <div key={sub.path} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <code className="text-teal-700 dark:text-teal-400 shrink-0" style={{ fontSize: '0.8125rem' }}>{sub.path}</code>
              <span className="text-slate-500 dark:text-slate-400" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem' }}>
                {sub.what}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── React Native ──────────────────────────────────────────────── */}
      <div className="mt-14 pt-10 border-t border-slate-200 dark:border-slate-800">
        <SectionHeading
          icon={Smartphone}
          title="React Native — Expo"
          blurb="@aumraa/breathe-native ships TypeScript source, no build step — your app's Metro and tsc compile it. Same token values as the web theme, rendered through NativeWind."
        />

        <div className="mb-8 p-5 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
          <h3 className="text-teal-800 dark:text-teal-300 mb-3 m-0" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9375rem' }}>
            Prerequisites
          </h3>
          <ul className="space-y-2">
            {['Expo SDK 56, React Native 0.85+', 'NativeWind v5 preview + react-native-css 3.0.7 (pinned)', 'A GitHub token with read:packages (Aumraa org)', 'lightningcss pinned to 1.30.1'].map(req => (
              <li key={req} className="flex items-center gap-2 text-teal-700 dark:text-teal-400" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
                <CheckCircle2 size={15} className="shrink-0" />
                {req}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-slate-500 dark:text-slate-400 mb-4" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', lineHeight: 1.7 }}>
          The shape is the same as web — install, wire the theme, import components:
        </p>
        <CodeBlock
          code={`pnpm add @aumraa/breathe-native
npx expo install nativewind@5.0.0-preview.4 react-native-css@3.0.7 react-native-reanimated \\
  react-native-worklets react-native-svg react-native-screens react-native-safe-area-context`}
          language="bash"
        />
        <div className="h-3" />
        <CodeBlock
          code={`/* global.css */
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css";
@import "nativewind/theme";
@import "@aumraa/breathe-native/styles/lemniscate.css";`}
          language="css"
        />
        <div className="h-3" />
        <CodeBlock
          code={`// metro.config.js — withBreatheNative is withNativewind plus the worklets resolver fix
const { getDefaultConfig } = require('expo/metro-config');
const { withBreatheNative } = require('@aumraa/breathe-native/metro');

module.exports = withBreatheNative(getDefaultConfig(__dirname));`}
          language="js"
        />
        <p className="text-slate-500 dark:text-slate-400 mt-5 mb-0" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', lineHeight: 1.7 }}>
          The exact pinned versions, the <code>app.json</code> font block and the <code>nativewind-env.d.ts</code>{' '}
          references change with each Expo SDK, so they live next to the package rather than here:{' '}
          <code>packages/react-native/README.md</code>.
        </p>
      </div>

      {/* How theming stays product-scoped */}
      <div className="mt-14 pt-10 border-t border-slate-200 dark:border-slate-800">
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
          Both packages live in this repo — <code>packages/react</code> and <code>packages/react-native</code>. If token
          sources changed, run <code>pnpm tokens</code> at the repo root first; the build copies the generated CSS into
          the package.
        </p>
        <CodeBlock
          code={`cd packages/react
pnpm version patch        # or minor / major
pnpm build                # copies token CSS + compiles TypeScript to dist/
pnpm publish              # publishes to npm.pkg.github.com (needs write:packages token)

# react-native ships source, so there is no build step
cd ../react-native
pnpm version patch
pnpm test && pnpm typecheck
pnpm publish`}
          language="bash"
        />
      </div>

      <PageNavigation />
    </div>
  );
}
