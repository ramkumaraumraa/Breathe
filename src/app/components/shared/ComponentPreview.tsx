import { useState, type ReactNode } from 'react';
import { CodeBlock } from './CodeBlock';
import { Eye, Code2, FileCode2, Smartphone, Bot, Monitor } from 'lucide-react';

type TabId = 'preview' | 'web' | 'css' | 'rn' | 'android' | 'ios';

interface ComponentPreviewProps {
  children: ReactNode;
  code: string;
  cssCode?: string;
  reactNativeCode?: string;
  androidCode?: string;
  iosCode?: string;
  title?: string;
  description?: string;
  className?: string;
  previewClassName?: string;
}

const platformTabs: { id: TabId; label: string; icon: React.ElementType; lang: string; color: string }[] = [
  { id: 'preview', label: 'Preview', icon: Eye, lang: '', color: '' },
  { id: 'web', label: 'React', icon: Code2, lang: 'tsx', color: 'text-teal-500' },
  { id: 'css', label: 'CSS', icon: FileCode2, lang: 'css', color: 'text-blue-500' },
  { id: 'rn', label: 'React Native', icon: Smartphone, lang: 'tsx', color: 'text-sky-500' },
  { id: 'android', label: 'Android', icon: Bot, lang: 'kotlin', color: 'text-green-500' },
  { id: 'ios', label: 'iOS', icon: Monitor, lang: 'swift', color: 'text-slate-400' },
];

export function ComponentPreview({
  children,
  code,
  cssCode,
  reactNativeCode,
  androidCode,
  iosCode,
  title,
  description,
  className = '',
  previewClassName = '',
}: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = useState<TabId>('preview');

  const codeMap: Partial<Record<TabId, string>> = {
    web: code,
    css: cssCode,
    rn: reactNativeCode,
    android: androidCode,
    ios: iosCode,
  };

  const visibleTabs = platformTabs.filter(tab => {
    if (tab.id === 'preview') return true;
    return !!codeMap[tab.id];
  });

  const activeTabMeta = platformTabs.find(t => t.id === activeTab)!;

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
        {visibleTabs.map(({ id, label, icon: Icon, color }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap shrink-0 ${
              activeTab === id
                ? `border-teal-500 text-teal-600 dark:text-teal-400`
                : `border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300`
            }`}
            style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: activeTab === id ? 500 : 400 }}
          >
            <Icon
              size={13}
              className={activeTab === id ? '' : color}
            />
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
          <CodeBlock
            code={codeMap[activeTab] ?? ''}
            language={activeTabMeta.lang}
          />
        </div>
      )}
    </div>
  );
}