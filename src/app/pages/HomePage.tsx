import { Link } from 'react-router';
import { ArrowRight, Layers, Palette, Type, Zap, Shield, Package, Wind } from 'lucide-react';
import { motion } from 'motion/react';

const stats = [
  { label: 'Components', value: '20+' },
  { label: 'Design Tokens', value: '200+' },
  { label: 'Accessibility', value: 'WCAG AA' },
  { label: 'Bundle size', value: '< 12kb' },
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

const componentCards = [
  { label: 'Button', path: '/components/button', color: 'bg-teal-500' },
  { label: 'Input', path: '/components/input', color: 'bg-indigo-500' },
  { label: 'Card', path: '/components/card', color: 'bg-violet-500' },
  { label: 'Badge', path: '/components/badge', color: 'bg-amber-500' },
  { label: 'Alert', path: '/components/alert', color: 'bg-rose-500' },
  { label: 'Avatar', path: '/components/avatar', color: 'bg-sky-500' },
  { label: 'Modal', path: '/components/modal', color: 'bg-emerald-500' },
  { label: 'Tabs', path: '/components/tabs', color: 'bg-pink-500' },
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
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-10 dark:opacity-5"
               style={{ background: 'radial-gradient(circle, #6366F1, transparent)' }} />
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
                Breathe Design System v1.0
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
            A comprehensive design system for building beautiful, accessible, and consistent interfaces. Every component, token, and pattern — in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            <Link
              to="/getting-started"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white transition-all hover:opacity-90 hover:shadow-lg shadow-teal-500/25"
              style={{ background: 'linear-gradient(135deg, #0D9488, #0F766E)', fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.9375rem' }}
            >
              Get Started
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/components/button"
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
            20+ production-ready components
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-lg"
             style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', lineHeight: 1.7 }}>
            Explore our full component library, each with comprehensive documentation and live examples.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {componentCards.map((comp, i) => (
              <motion.div key={comp.label} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Link
                  to={comp.path}
                  className="flex flex-col items-center gap-3 p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-teal-300 dark:hover:border-teal-700 hover:shadow-sm transition-all group"
                >
                  <div className={`w-10 h-10 rounded-xl ${comp.color} opacity-85 group-hover:opacity-100 transition-opacity`} />
                  <span className="text-slate-700 dark:text-slate-300"
                        style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 500 }}>
                    {comp.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
          <Link
            to="/components/button"
            className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 500 }}
          >
            View all components <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-10 pb-16">
        <div className="max-w-3xl">
          <div className="rounded-2xl overflow-hidden relative"
               style={{ background: 'linear-gradient(135deg, #0F766E 0%, #4338CA 100%)' }}>
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
                  to="/getting-started"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-teal-700 hover:bg-teal-50 transition-all"
                  style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.9rem' }}
                >
                  Get Started <ArrowRight size={15} />
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
