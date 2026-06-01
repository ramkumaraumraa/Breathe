import { CodeBlock } from './CodeBlock';

interface FoundationCodeCardProps {
  title: string;
  description?: string;
  code: string;
  language?: string;
}

export function FoundationCodeCard({ title, description, code, language = 'css' }: FoundationCodeCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700/60 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-900">
        <h3
          className="text-slate-900 dark:text-slate-100 m-0"
          style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 600 }}
        >
          {title}
        </h3>
        {description && (
          <p
            className="text-slate-500 dark:text-slate-400 mt-0.5 m-0"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem' }}
          >
            {description}
          </p>
        )}
      </div>
      <CodeBlock code={code} language={language} />
    </div>
  );
}
