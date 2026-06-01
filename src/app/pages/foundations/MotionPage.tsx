import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageHeader } from '../../components/shared/PageHeader';
import { FoundationCodeCard } from '../../components/shared/FoundationCodeCard';
import { PageNavigation } from '../../components/shared/PageNavigation';
import { Play, RefreshCw } from 'lucide-react';

const durations = [
  { name: 'Instant', token: '--breathe-duration-instant', value: '50ms', usage: 'Icon swaps, checkbox checks' },
  { name: 'Fast', token: '--breathe-duration-fast', value: '100ms', usage: 'Hover color changes, focus rings' },
  { name: 'Normal', token: '--breathe-duration-normal', value: '150ms', usage: 'Transitions, reveals' },
  { name: 'Gentle', token: '--breathe-duration-gentle', value: '250ms', usage: 'Dropdowns, tooltips' },
  { name: 'Slow', token: '--breathe-duration-slow', value: '350ms', usage: 'Modals, page transitions' },
  { name: 'Breathe', token: '--breathe-duration-breathe', value: '600ms', usage: 'Hero animations, onboarding' },
];

const easings = [
  { name: 'ease-in', value: 'cubic-bezier(0.4, 0, 1, 1)', usage: 'Elements leaving the screen' },
  { name: 'ease-out', value: 'cubic-bezier(0, 0, 0.2, 1)', usage: 'Elements entering the screen' },
  { name: 'ease-in-out', value: 'cubic-bezier(0.4, 0, 0.2, 1)', usage: 'Continuous, back-and-forth motion' },
  { name: 'spring', value: 'spring(1, 80, 20, 0)', usage: 'Natural, bouncy interactions' },
];

function AnimationDemo({ title, description, code, children }: {
  title: string;
  description: string;
  code: string;
  children: (key: number) => React.ReactNode;
}) {
  const [key, setKey] = useState(0);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div>
          <p className="text-slate-900 dark:text-slate-100 m-0" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.875rem' }}>
            {title}
          </p>
          <p className="text-slate-500 dark:text-slate-400 m-0 mt-0.5" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.775rem' }}>
            {description}
          </p>
        </div>
        <button
          onClick={() => setKey(k => k + 1)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors"
          style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 500 }}
        >
          <RefreshCw size={12} />
          Replay
        </button>
      </div>
      <div className="p-8 flex items-center justify-center min-h-24 bg-slate-50/50 dark:bg-slate-800/20">
        {children(key)}
      </div>
      <div className="px-4 py-3 bg-slate-950 dark:bg-slate-900/60 border-t border-slate-800">
        <pre style={{ fontFamily: 'var(--font-mono)', fontSize: '0.775rem', color: '#94a3b8', margin: 0 }}>
          {code}
        </pre>
      </div>
    </div>
  );
}

export function MotionPage() {
  return (
    <div className="max-w-7xl px-6 lg:px-10 py-10">
      <PageHeader
        title="Motion"
        description="Breathe's motion system brings interfaces to life with purposeful, calm animations. Movement should guide attention, not distract from it."
        section="Foundations"
        badge="motion/react"
        badgeColor="indigo"
      />

      {/* Duration tokens */}
      <section className="mb-12">
        <h2 className="text-slate-900 dark:text-white mb-2 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
          Duration Tokens
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6 mt-1" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
          Use duration tokens to maintain consistent timing across the interface.
        </p>
        <div className="space-y-3">
          {durations.map(d => (
            <div key={d.name} className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="w-20 shrink-0">
                <p className="text-slate-900 dark:text-slate-200 m-0" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.8rem' }}>{d.name}</p>
                <code className="text-teal-600 dark:text-teal-400" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>{d.value}</code>
              </div>
              <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #0D9488, #6366F1)' }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(parseInt(d.value) / 600) * 100}%` }}
                  viewport={{ once: false }}
                  transition={{ duration: parseInt(d.value) / 1000, ease: 'easeOut' }}
                />
              </div>
              <span className="text-slate-400 dark:text-slate-500 text-right shrink-0 hidden sm:block"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', minWidth: '160px' }}>
                {d.usage}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Easing */}
      <section className="mb-12">
        <h2 className="text-slate-900 dark:text-white mb-2 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
          Easing Curves
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6 mt-1" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
          Choose the right easing curve based on what the element is doing.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {easings.map(e => (
            <div key={e.name} className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <p className="text-slate-900 dark:text-slate-200 mb-1 m-0" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.875rem' }}>
                {e.name}
              </p>
              <code className="text-teal-600 dark:text-teal-400 block mb-2" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>
                {e.value}
              </code>
              <p className="text-slate-500 dark:text-slate-400 m-0" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.775rem' }}>
                {e.usage}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Live demos */}
      <section className="mb-12">
        <h2 className="text-slate-900 dark:text-white mb-2 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
          Animation Patterns
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6 mt-1" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
          Common animation patterns used across Breathe components.
        </p>
        <div className="space-y-4">
          <AnimationDemo
            title="Fade In Up"
            description="Content appears from below. Used for page load and modals."
            code={`initial={{ opacity: 0, y: 20 }}\nanimate={{ opacity: 1, y: 0 }}\ntransition={{ duration: 0.35, ease: 'easeOut' }}`}
          >
            {(key) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="px-6 py-3 rounded-xl text-white"
                style={{ background: 'linear-gradient(135deg, #0D9488, #6366F1)', fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.875rem' }}
              >
                Hello, Breathe!
              </motion.div>
            )}
          </AnimationDemo>

          <AnimationDemo
            title="Scale Spring"
            description="Bouncy scale. Used for buttons on press and notifications."
            code={`whileTap={{ scale: 0.95 }}\nwhileHover={{ scale: 1.03 }}\ntransition={{ type: 'spring', stiffness: 300, damping: 20 }}`}
          >
            {(key) => (
              <motion.button
                key={key}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="px-6 py-3 rounded-xl text-white"
                style={{ background: 'linear-gradient(135deg, #0D9488, #6366F1)', fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.875rem', border: 'none', cursor: 'pointer' }}
              >
                Hover & Press Me
              </motion.button>
            )}
          </AnimationDemo>

          <AnimationDemo
            title="Stagger Children"
            description="List items appear in sequence. Used for menus and card grids."
            code={`parent: staggerChildren: 0.07\nchild: initial={{ opacity: 0, x: -10 }}\n       animate={{ opacity: 1, x: 0 }}`}
          >
            {(key) => (
              <motion.div
                key={key}
                className="flex gap-2"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              >
                {['Design', 'Build', 'Ship', 'Breathe'].map(word => (
                  <motion.div
                    key={word}
                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="px-3 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-400"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 500 }}
                  >
                    {word}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimationDemo>
        </div>
      </section>

      <section>
        <FoundationCodeCard
          title="Using Motion in Breathe"
          description="Motion uses motion/react (Framer Motion). Keep durations within the token scale — never exceed 400ms for UI transitions."
          code={`import { motion, AnimatePresence } from 'motion/react';

// Fade in on mount
<motion.div
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.25, ease: 'easeOut' }}
>
  Content
</motion.div>

// Animate presence (exit animations)
<AnimatePresence>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.15 }}
    >
      Modal or Tooltip
    </motion.div>
  )}
</AnimatePresence>`}
          language="tsx"
        />
      </section>

      <PageNavigation />
    </div>
  );
}