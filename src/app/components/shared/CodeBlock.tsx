import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Highlight, type PrismTheme } from 'prism-react-renderer';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

// Custom "Breathe" dark theme
const breatheTheme: PrismTheme = {
  plain: {
    color: '#94a3b8',
    backgroundColor: '#020617',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: { color: '#475569', fontStyle: 'italic' },
    },
    {
      types: ['namespace'],
      style: { opacity: 0.7 },
    },
    {
      types: ['string', 'attr-value', 'template-string'],
      style: { color: '#34d399' },
    },
    {
      types: ['punctuation', 'operator'],
      style: { color: '#64748b' },
    },
    {
      types: ['number', 'boolean', 'variable', 'constant', 'inserted'],
      style: { color: '#fbbf24' },
    },
    {
      types: ['atrule', 'keyword'],
      style: { color: '#818cf8' },
    },
    {
      types: ['attr-name', 'selector'],
      style: { color: '#7dd3fc' },
    },
    {
      types: ['function', 'function-variable'],
      style: { color: '#38bdf8' },
    },
    {
      types: ['tag'],
      style: { color: '#818cf8' },
    },
    {
      types: ['class-name', 'maybe-class-name'],
      style: { color: '#2dd4bf' },
    },
    {
      types: ['property'],
      style: { color: '#e2e8f0' },
    },
    {
      types: ['regex', 'deleted'],
      style: { color: '#f87171' },
    },
    {
      types: ['important', 'bold'],
      style: { fontWeight: 'bold' },
    },
    {
      types: ['italic'],
      style: { fontStyle: 'italic' },
    },
    {
      types: ['entity'],
      style: { cursor: 'help' },
    },
  ],
};

// Map language aliases to prism language names
const languageMap: Record<string, string> = {
  tsx: 'tsx',
  jsx: 'jsx',
  ts: 'typescript',
  typescript: 'typescript',
  js: 'javascript',
  javascript: 'javascript',
  css: 'css',
  bash: 'bash',
  sh: 'bash',
  shell: 'bash',
  json: 'json',
  html: 'markup',
  xml: 'markup',
  kotlin: 'kotlin',
  swift: 'swift',
  java: 'java',
};

export function CodeBlock({ code, language = 'tsx', filename, showLineNumbers = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const prismLanguage = languageMap[language] ?? 'tsx';

  return (
    <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700/60">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800 bg-slate-900">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <span className="text-slate-500 ml-1" style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
            {filename ?? language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all text-xs ${
            copied
              ? 'bg-teal-500/20 text-teal-400'
              : 'bg-slate-700/60 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
          }`}
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Highlighted Code */}
      <Highlight theme={breatheTheme} code={code.trimEnd()} language={prismLanguage as any}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <div className="overflow-x-auto bg-slate-950">
            <pre className="px-5 py-4" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', lineHeight: 1.65, margin: 0, background: 'transparent' }}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })} style={{ display: 'flex' }}>
                  {showLineNumbers && (
                    <span
                      className="select-none text-right shrink-0 pr-4"
                      style={{ color: '#334155', fontSize: '0.75rem', minWidth: '2rem', userSelect: 'none' }}
                    >
                      {i + 1}
                    </span>
                  )}
                  <span>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              ))}
            </pre>
          </div>
        )}
      </Highlight>
    </div>
  );
}