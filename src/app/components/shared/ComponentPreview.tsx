import { useState, type ReactNode } from 'react';
import { CodeBlock } from './CodeBlock';
import { Eye, Code2, FileCode2, Smartphone, Apple, Bot } from 'lucide-react';

type TabId = 'preview' | 'react' | 'css' | 'rn' | 'ios' | 'android';
type CssVariant = 'tailwind' | 'vanilla';

interface ComponentPreviewProps {
  children: ReactNode;
  code: string;
  cssCode?: string;
  tailwindCode?: string;
  reactNativeCode?: string;
  androidCode?: string;
  iosCode?: string;
  title?: string;
  description?: string;
  className?: string;
  previewClassName?: string;
}

const platformTabs: { id: TabId; label: string; icon: React.ElementType; color: string }[] = [
  { id: 'preview', label: 'Preview', icon: Eye,        color: '' },
  { id: 'react',   label: 'React',   icon: Code2,      color: 'text-teal-500' },
  { id: 'rn',      label: 'React Native', icon: Smartphone, color: 'text-sky-500' },
  { id: 'ios',     label: 'iOS',     icon: Apple,      color: 'text-slate-400' },
  { id: 'android', label: 'Android', icon: Bot,        color: 'text-green-500' },
  { id: 'css',     label: 'CSS',     icon: FileCode2,  color: 'text-blue-500' },
];

const COMING_SOON: Record<TabId, string> = {
  preview: '',
  react:   '// React code coming soon',
  rn:      '// React Native code coming soon',
  ios:     '// iOS (Swift) code coming soon',
  android: '// Android (Kotlin/Compose) code coming soon',
  css:     '/* CSS coming soon */',
};

export function ComponentPreview({
  children,
  code,
  cssCode,
  tailwindCode,
  reactNativeCode,
  androidCode,
  iosCode,
  title,
  description,
  className = '',
  previewClassName = '',
}: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = useState<TabId>('preview');
  const [cssVariant, setCssVariant] = useState<CssVariant>('tailwind');

  const codeMap: Partial<Record<TabId, string>> = {
    react:   code,
    css:     cssVariant === 'tailwind' ? (tailwindCode ?? cssCode) : (cssCode ?? tailwindCode),
    rn:      reactNativeCode,
    android: androidCode,
    ios:     iosCode,
  };

  const langMap: Record<TabId, string> = {
    preview: '',
    react:   'tsx',
    rn:      'tsx',
    ios:     'swift',
    android: 'kotlin',
    css:     'css',
  };

  const activeCode = codeMap[activeTab] ?? COMING_SOON[activeTab];
  const isPlaceholder = !codeMap[activeTab];

  return (
    <div className={`rounded-xl border border-slate-200 dark:border-slate-700/60 ${className}`}>
      {/* Header */}
      {(title || description) && (
        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-900">
          {title && (
            <h4 className="text-slate-900 dark:text-slate-100" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 500 }}>
              {title}
            </h4>
          )}
          {description && (
            <p className="text-slate-500 dark:text-slate-400 mt-0.5" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem' }}>
              {description}
            </p>
          )}
        </div>
      )}

      {/* Tab bar */}
      <div className="flex items-center border-b border-slate-200 dark:border-slate-700/60 bg-slate-50 dark:bg-slate-900/60 overflow-x-auto">
        {platformTabs.map(({ id, label, icon: Icon, color }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={[
              'flex items-center gap-1.5 px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap shrink-0',
              activeTab === id
                ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300',
            ].join(' ')}
            style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: activeTab === id ? 500 : 400 }}
          >
            <Icon size={13} className={activeTab === id ? '' : color} />
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'preview' ? (
        <div className={`bg-white dark:bg-slate-900 p-6 flex flex-wrap gap-4 items-center justify-center min-h-32 ${previewClassName}`}>
          {children}
        </div>
      ) : (
        <div className="rounded-none border-0">
          {/* CSS variant toggle */}
          {activeTab === 'css' && (
            <div className="flex items-center gap-1 px-4 py-2 border-b border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-900">
              <span className="text-slate-400 dark:text-slate-500 mr-2" style={{ fontSize: '0.75rem', fontFamily: 'var(--font-sans)' }}>Format:</span>
              {(['tailwind', 'vanilla'] as CssVariant[]).map((v) => (
                <button
                  key={v}
                  onClick={() => setCssVariant(v)}
                  className={[
                    'px-3 py-1 rounded-full text-xs transition-colors',
                    cssVariant === v
                      ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 font-medium'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300',
                  ].join(' ')}
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {v === 'tailwind' ? 'Tailwind' : 'Vanilla CSS'}
                </button>
              ))}
            </div>
          )}

          {isPlaceholder ? (
            <div className="flex items-center justify-center py-10 bg-slate-50 dark:bg-slate-900/60">
              <p className="text-slate-400 dark:text-slate-500 italic" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem' }}>
                Coming soon
              </p>
            </div>
          ) : (
            <CodeBlock
              code={activeCode}
              language={langMap[activeTab]}
            />
          )}
        </div>
      )}
    </div>
  );
}
