import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Layers, Palette, Type, Zap, Shield, Package, Wind, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';
import { CodeBlock } from '../components/shared/CodeBlock';
import { PRODUCT_TABS, STAGE_MARKS, StageMark, type ProductStage } from '../components/shared/ProductTabs';
import { componentCount } from '../components/layout/navData';
import { ProductPreviewWrapper } from '../context/ProductThemeContext';
import { Button } from '@/app/components/atoms/button';
import { Badge } from '@/app/components/atoms/badge';
import { Avatar, AvatarFallback } from '@/app/components/atoms/avatar';
import { Input } from '@/app/components/atoms/form-elements/input';
import { Switch } from '@/app/components/atoms/form-elements/switch';
import { Card, CardContent } from '@/app/components/molecules/card';
import { Alert, AlertTitle } from '@/app/components/molecules/alert';
import { Tabs, TabsList, TabsTrigger } from '@/app/components/molecules/tabs';
import aumraaTokens from '../../../tokens/dist/web/aumraa.css?raw';

// Counted, not claimed. Both numbers were hand-typed before and both were wrong
// by more than half — the component count said "20+" against 57 real pages.
const tokensPerProduct = (aumraaTokens.match(/^\s*--[\w-]+:/gm) ?? []).length;

const stats = [
  { label: 'Components', value: `${componentCount}` },
  { label: 'Tokens per product', value: `${Math.floor(tokensPerProduct / 10) * 10}+` },
  { label: 'Products', value: `${PRODUCT_TABS.length}` },
  { label: 'Accessibility', value: 'WCAG AA' },
];

const features = [
  {
    icon: Palette,
    title: 'Thoughtful Colors',
    description: 'A hand-crafted color palette with semantic tokens for every use case.',
    color: 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400',
  },
  {
    icon: Type,
    title: 'Type System',
    description: 'A clear typographic scale with carefully chosen weights and line heights.',
    color: 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
  },
  {
    icon: Zap,
    title: 'Fluid Motion',
    description: 'Purposeful animations that guide attention without distraction.',
    color: 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
  },
  {
    icon: Shield,
    title: 'Accessible First',
    description: 'Every component is built with ARIA standards and keyboard navigation.',
    color: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
  },
  {
    icon: Layers,
    title: 'Composable',
    description: 'Mix and match components to build any UI pattern with ease.',
    color: 'bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400',
  },
  {
    icon: Package,
    title: 'Tree-shakeable',
    description: 'Import only what you need. Zero unused code in your bundle.',
    color: 'bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400',
  },
];

// Real components, not coloured squares — each renders through the active
// product's tokens, so this grid is itself the claim the section makes.
// Atomic paths, not the /components/* redirects these used to point at.
// Dialog is an overlay with nothing to show inline, so Toggle takes its slot.
const componentCards: { label: string; path: string; preview: ReactNode }[] = [
  {
    label: 'Button',
    path: '/atoms/button',
    preview: <Button size="sm">Button</Button>,
  },
  {
    label: 'Text Input',
    path: '/atoms/form-elements/text-input',
    preview: <Input placeholder="Email" className="h-8 w-28 text-xs" />,
  },
  {
    label: 'Card',
    path: '/molecules/card',
    preview: (
      <Card className="w-28">
        <CardContent className="p-2.5 space-y-1.5">
          <div className="h-1.5 w-2/3 rounded-full bg-primary" />
          <div className="h-1 w-full rounded-full bg-muted-foreground/25" />
          <div className="h-1 w-4/5 rounded-full bg-muted-foreground/25" />
        </CardContent>
      </Card>
    ),
  },
  {
    label: 'Badge',
    path: '/atoms/badge',
    preview: <Badge>New</Badge>,
  },
  {
    label: 'Alert',
    path: '/molecules/alert',
    preview: (
      <Alert variant="success" className="w-32 px-2.5 py-2">
        <AlertTitle className="m-0" style={{ fontSize: '0.6875rem' }}>Saved</AlertTitle>
      </Alert>
    ),
  },
  {
    label: 'Avatar',
    path: '/atoms/avatar',
    preview: (
      <Avatar className="h-9 w-9">
        <AvatarFallback style={{ fontSize: '0.75rem' }}>AK</AvatarFallback>
      </Avatar>
    ),
  },
  {
    label: 'Toggle',
    path: '/atoms/form-elements/toggle',
    preview: <Switch defaultChecked />,
  },
  {
    label: 'Tabs',
    path: '/molecules/tabs',
    preview: (
      <Tabs defaultValue="one">
        <TabsList className="h-7">
          <TabsTrigger value="one" className="h-5 px-2" style={{ fontSize: '0.625rem' }}>One</TabsTrigger>
          <TabsTrigger value="two" className="h-5 px-2" style={{ fontSize: '0.625rem' }}>Two</TabsTrigger>
        </TabsList>
      </Tabs>
    ),
  },
];

// One row per stage, products grouped under it. Read off STAGE_MARKS so this key
// and the icons on every product tab bar can never disagree.
const stageRows = (Object.keys(STAGE_MARKS) as ProductStage[]).map((stage) => ({
  stage,
  ...STAGE_MARKS[stage],
  products: PRODUCT_TABS.filter((p) => p.stage === stage),
}));

const themeSteps = [
  { n: '1', t: 'Tokens', d: 'JSON per product, compiled by Style Dictionary to CSS, Swift, XML and TS.' },
  { n: '2', t: 'Theme', d: 'One CSS file maps that product’s tokens onto the semantic variables.' },
  { n: '3', t: 'Components', d: 'Read the semantic variables. Same code, every brand.' },
];

export function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 lg:px-10 pt-16 pb-20">
        {/* Background gradient */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-10 dark:opacity-5"
               style={{ background: 'radial-gradient(circle, #14B8A6, transparent)' }} />
          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
               style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="relative max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-900/40 border border-teal-200 dark:border-teal-800 mb-6">
              <Wind size={13} className="text-teal-600 dark:text-teal-400" />
              <span className="text-teal-700 dark:text-teal-400"
                    style={{ fontSize: '0.75rem', fontWeight: 500, fontFamily: 'var(--font-sans)' }}>
                Breathe Design System v0.1
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-900 dark:text-white mb-6 m-0"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', lineHeight: 1.12, letterSpacing: '-0.02em' }}
          >
            Design with intention.{' '}
            <span style={{ background: 'linear-gradient(135deg, #0D9488, #6366F1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Breathe with ease.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-500 dark:text-slate-400 mb-8 max-w-xl"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '1.125rem', lineHeight: 1.75 }}
          >
            One component library and one token pipeline behind every Aumraa product — on web, mobile, watch and
            widgets. The components carry no brand of their own; the theme you import decides which product they are.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            <Link
              to="/installation"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white transition-all hover:opacity-90 hover:shadow-lg shadow-teal-500/25"
              style={{ background: 'linear-gradient(135deg, #0D9488, #0F766E)', fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.9375rem' }}
            >
              Install Breathe
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/atoms/button"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.9375rem' }}
            >
              View Components
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 lg:px-10 pb-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.05 }}
              className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800"
            >
              <p className="text-slate-900 dark:text-white mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem' }}>
                {stat.value}
              </p>
              <p className="text-slate-500 dark:text-slate-400" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem' }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works — brand-blind components */}
      <section className="px-6 lg:px-10 pb-16 border-t border-slate-200 dark:border-slate-800 pt-14">
        <div className="max-w-3xl">
          <p className="text-teal-600 dark:text-teal-400 mb-2 uppercase tracking-wider"
             style={{ fontSize: '0.72rem', fontWeight: 600, fontFamily: 'var(--font-sans)', letterSpacing: '0.1em' }}>
            How it works
          </p>
          <h2 className="text-slate-900 dark:text-white mb-3 m-0"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.75rem', lineHeight: 1.3 }}>
            Components are brand-blind
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-lg"
             style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', lineHeight: 1.7 }}>
            No component knows which product it belongs to. Each one reads semantic variables — <code>--primary</code>,{' '}
            <code>--background</code>, <code>--radius</code> — and the single theme file you import fills them. Swap
            that one import and the same button becomes a different product. Files for every other product sit unread
            in node_modules and never reach your bundle.
          </p>
          <div className="grid sm:grid-cols-3 gap-3 mb-6">
            {themeSteps.map((step) => (
              <div key={step.n} className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                <span className="inline-flex w-5 h-5 rounded-full items-center justify-center text-white mb-2.5"
                      style={{ background: 'linear-gradient(135deg, #0D9488, #6366F1)', fontSize: '0.65rem', fontWeight: 700 }}>
                  {step.n}
                </span>
                <h3 className="text-slate-900 dark:text-slate-100 mb-1 m-0"
                    style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9375rem' }}>
                  {step.t}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 m-0"
                   style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', lineHeight: 1.6 }}>
                  {step.d}
                </p>
              </div>
            ))}
          </div>
          <Link
            to="/foundations/design-tokens"
            className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 500 }}
          >
            See the token architecture <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* Product family + stage legend */}
      <section className="px-6 lg:px-10 pb-16 border-t border-slate-200 dark:border-slate-800 pt-14">
        <div className="max-w-3xl">
          <p className="text-teal-600 dark:text-teal-400 mb-2 uppercase tracking-wider"
             style={{ fontSize: '0.72rem', fontWeight: 600, fontFamily: 'var(--font-sans)', letterSpacing: '0.1em' }}>
            The family
          </p>
          <h2 className="text-slate-900 dark:text-white mb-3 m-0"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.75rem', lineHeight: 1.3 }}>
            {PRODUCT_TABS.length} products, one system
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-lg"
             style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', lineHeight: 1.7 }}>
            Every page with a product switcher lists these in this order, each marked with how far along it is. The
            mark is a shape first and a colour second, so it still reads under colourblindness.
          </p>

          <div className="space-y-5">
            {stageRows.map((row, i) => (
              <motion.div
                key={row.stage}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <div className="flex items-baseline gap-2 mb-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5">
                    <StageMark stage={row.stage} size={15} />
                    <span className="text-slate-900 dark:text-slate-100"
                          style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.875rem' }}>
                      {row.label}
                    </span>
                  </span>
                  <span className="text-slate-400 dark:text-slate-500"
                        style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem' }}>
                    — {row.meaning}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {row.products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-start gap-3 p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                    >
                      <span className="w-2.5 h-2.5 rounded-full shrink-0 mt-1.5" style={{ background: product.accentColor }} />
                      <div className="min-w-0">
                        <p className="text-slate-900 dark:text-slate-100 m-0"
                           style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.875rem' }}>
                          {product.label}
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 m-0 mt-0.5"
                           style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', lineHeight: 1.5 }}>
                          {product.tagline}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 lg:px-10 pb-16 border-t border-slate-200 dark:border-slate-800 pt-14">
        <div className="max-w-3xl">
          <p className="text-teal-600 dark:text-teal-400 mb-2 uppercase tracking-wider"
             style={{ fontSize: '0.72rem', fontWeight: 600, fontFamily: 'var(--font-sans)', letterSpacing: '0.1em' }}>
            Why Breathe
          </p>
          <h2 className="text-slate-900 dark:text-white mb-3 m-0"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.75rem', lineHeight: 1.3 }}>
            Everything you need to build great products
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-lg"
             style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', lineHeight: 1.7 }}>
            Breathe brings together design principles, reusable components, and best practices into a unified system.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all hover:shadow-sm"
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3.5 ${feature.color}`}>
                  <feature.icon size={18} />
                </div>
                <h3 className="text-slate-900 dark:text-slate-100 mb-1.5 m-0"
                    style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '1rem' }}>
                  {feature.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 m-0"
                   style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', lineHeight: 1.6 }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Component grid */}
      <section className="px-6 lg:px-10 pb-16 border-t border-slate-200 dark:border-slate-800 pt-14">
        <div className="max-w-3xl">
          <p className="text-teal-600 dark:text-teal-400 mb-2 uppercase tracking-wider"
             style={{ fontSize: '0.72rem', fontWeight: 600, fontFamily: 'var(--font-sans)', letterSpacing: '0.1em' }}>
            Components
          </p>
          <h2 className="text-slate-900 dark:text-white mb-3 m-0"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.75rem', lineHeight: 1.3 }}>
            {componentCount} documented components
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-lg"
             style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', lineHeight: 1.7 }}>
            Organised as atoms, molecules, organisms and templates — each with live examples, props, and a preview in
            every product's theme.
          </p>
          {/* One wrapper for the whole grid: the product's vars cascade into every
              preview below, so switching product on any page restyles these too. */}
          <ProductPreviewWrapper>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {componentCards.map((comp, i) => (
                <motion.div key={comp.label} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <Link
                    to={comp.path}
                    className="flex flex-col items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-teal-300 dark:hover:border-teal-700 hover:shadow-sm transition-all"
                  >
                    {/* Decorative: the Link is the only thing here that should take
                        focus or a click, so the live component never receives either. */}
                    <div
                      aria-hidden
                      className="pointer-events-none select-none w-full h-16 flex items-center justify-center overflow-hidden rounded-lg bg-background border border-border"
                    >
                      {comp.preview}
                    </div>
                    <span className="text-slate-700 dark:text-slate-300"
                          style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 500 }}>
                      {comp.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </ProductPreviewWrapper>
          <Link
            to="/atoms/button"
            className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 500 }}
          >
            View all components <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* Quick start */}
      <section className="px-6 lg:px-10 pb-16 border-t border-slate-200 dark:border-slate-800 pt-14">
        <div className="max-w-3xl">
          <p className="text-teal-600 dark:text-teal-400 mb-2 uppercase tracking-wider"
             style={{ fontSize: '0.72rem', fontWeight: 600, fontFamily: 'var(--font-sans)', letterSpacing: '0.1em' }}>
            Quick start
          </p>
          <h2 className="text-slate-900 dark:text-white mb-3 m-0"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.75rem', lineHeight: 1.3 }}>
            Two packages, web and native
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-lg"
             style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', lineHeight: 1.7 }}>
            Both are themed the same way: install, import your product's theme, build. Every other product differs by
            one import line.
          </p>

          <div className="flex items-center gap-2 mb-2.5">
            <Package size={15} className="text-slate-500 dark:text-slate-400" />
            <span className="text-slate-700 dark:text-slate-300"
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 600 }}>
              React — web
            </span>
          </div>
          <CodeBlock
            code={`pnpm add @aumraa/breathe-react`}
            language="bash"
          />
          <div className="h-3" />
          <CodeBlock
            code={`import '@aumraa/breathe-react/styles/kaayo.css'   // your product only
import { Button, Card } from '@aumraa/breathe-react'
import { KayoBrutalistHeader } from '@aumraa/breathe-react/kaayo'`}
            language="tsx"
          />

          <div className="flex items-center gap-2 mt-8 mb-2.5">
            <Smartphone size={15} className="text-slate-500 dark:text-slate-400" />
            <span className="text-slate-700 dark:text-slate-300"
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 600 }}>
              React Native — Expo + NativeWind
            </span>
          </div>
          <CodeBlock
            code={`pnpm add @aumraa/breathe-native`}
            language="bash"
          />
          <div className="h-3" />
          <CodeBlock
            code={`/* global.css */
@import '@aumraa/breathe-native/styles/lemniscate.css';`}
            language="css"
          />
          <div className="h-3" />
          <CodeBlock
            code={`import { Button, Text } from '@aumraa/breathe-native'`}
            language="tsx"
          />

          <Link
            to="/installation"
            className="mt-6 inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 500 }}
          >
            Full installation guide <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-10 pb-16">
        <div className="max-w-3xl">
          <div className="rounded-2xl overflow-hidden relative"
               style={{ background: 'linear-gradient(135deg, #0D9488 0%, #0F766E 60%, #115E59 100%)' }}>
            <div className="absolute inset-0 opacity-10"
                 style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white, transparent)', backgroundSize: '60% 60%', backgroundRepeat: 'no-repeat' }} />
            <div className="relative px-8 py-10">
              <h2 className="text-white mb-2 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem' }}>
                Ready to start building?
              </h2>
              <p className="text-teal-100 mb-6 max-w-md" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', lineHeight: 1.7 }}>
                Read the documentation, explore the components, and start shipping beautiful UIs today.
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link
                  to="/installation"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-teal-700 hover:bg-teal-50 transition-all"
                  style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.9rem' }}
                >
                  Installation <ArrowRight size={15} />
                </Link>
                <Link
                  to="/foundations/colors"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/20 text-white hover:bg-white/30 transition-all border border-white/20"
                  style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.9rem' }}
                >
                  Explore Foundations
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
