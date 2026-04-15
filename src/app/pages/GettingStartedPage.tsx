import { PageHeader } from '../components/shared/PageHeader';
import { CodeBlock } from '../components/shared/CodeBlock';
import { PageNavigation } from '../components/shared/PageNavigation';
import { CheckCircle2, Terminal, Package, Puzzle } from 'lucide-react';

const steps = [
  {
    icon: Terminal,
    title: 'Install the package',
    description: 'Add Breathe to your project using your preferred package manager.',
    code: `# npm
npm install @breathe-ui/core

# yarn
yarn add @breathe-ui/core

# pnpm
pnpm add @breathe-ui/core`,
    language: 'bash',
  },
  {
    icon: Package,
    title: 'Add the provider',
    description: 'Wrap your application with the BreatheProvider to enable theming and global styles.',
    code: `import { BreatheProvider } from '@breathe-ui/core';
import '@breathe-ui/core/styles.css';

function App() {
  return (
    <BreatheProvider theme="light">
      <YourApp />
    </BreatheProvider>
  );
}`,
    language: 'tsx',
  },
  {
    icon: Puzzle,
    title: 'Use components',
    description: 'Import any component and start building your interface.',
    code: `import { Button, Card, Badge } from '@breathe-ui/core';

function Dashboard() {
  return (
    <Card>
      <Card.Header>
        <Badge variant="success">Active</Badge>
        <h2>Welcome back!</h2>
      </Card.Header>
      <Card.Body>
        <Button variant="primary">Get Started</Button>
      </Card.Body>
    </Card>
  );
}`,
    language: 'tsx',
  },
];

export function GettingStartedPage() {
  return (
    <div className="max-w-3xl px-6 lg:px-10 py-10">
      <PageHeader
        title="Getting Started"
        description="Everything you need to set up Breathe in your project. From installation to your first component in minutes."
        section="Overview"
        badge="v1.0"
      />

      {/* Requirements */}
      <div className="mb-10 p-5 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
        <h3 className="text-teal-800 dark:text-teal-300 mb-3 m-0" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9375rem' }}>
          Prerequisites
        </h3>
        <ul className="space-y-2">
          {['React 18 or later', 'TypeScript 4.9+ (recommended)', 'Tailwind CSS v3 or v4', 'Node.js 18+'].map(req => (
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

      {/* Design tokens */}
      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-slate-900 dark:text-white mb-2 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
          Using Design Tokens
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-5" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', lineHeight: 1.7 }}>
          Access colors, spacing, and typography tokens directly in your styles:
        </p>
        <CodeBlock
          code={`/* CSS Variables */
.my-element {
  color: var(--breathe-color-primary-600);
  padding: var(--breathe-spacing-4);
  font-family: var(--breathe-font-sans);
}

/* Tailwind tokens */
<div className="text-breathe-primary-600 p-breathe-4 font-breathe-sans">
  Hello, Breathe!
</div>`}
          language="css"
        />
      </div>

      <PageNavigation />
    </div>
  );
}