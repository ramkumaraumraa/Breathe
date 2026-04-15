import { useState } from 'react';
import { Search, Copy, Check } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { PageHeader } from '../../components/shared/PageHeader';
import { CodeBlock } from '../../components/shared/CodeBlock';
import { PageNavigation } from '../../components/shared/PageNavigation';

type LucideIcon = React.ComponentType<{ size?: number; className?: string; color?: string }>;

const featuredIcons = [
  'Wind', 'Leaf', 'Heart', 'Star', 'Sun', 'Moon', 'Cloud', 'Droplets',
  'Waves', 'Mountain', 'Flower', 'Feather', 'Zap', 'Sparkles', 'ArrowRight', 'ArrowLeft',
  'ChevronDown', 'ChevronUp', 'ChevronRight', 'ChevronLeft', 'Check', 'X', 'Plus', 'Minus',
  'Search', 'Settings', 'Bell', 'User', 'Users', 'Mail', 'Phone', 'Lock',
  'Home', 'Grid', 'List', 'Menu', 'MoreHorizontal', 'MoreVertical', 'Edit', 'Trash2',
  'Copy', 'Share', 'Download', 'Upload', 'Link', 'ExternalLink', 'Bookmark', 'Flag',
  'AlertCircle', 'AlertTriangle', 'CheckCircle', 'XCircle', 'Info', 'HelpCircle', 'Eye', 'EyeOff',
  'Calendar', 'Clock', 'Timer', 'Map', 'Globe', 'MapPin', 'Navigation', 'Compass',
  'File', 'FileText', 'Folder', 'FolderOpen', 'Image', 'Video', 'Music', 'Mic',
  'Camera', 'Code', 'Terminal', 'Database', 'Server', 'Cpu', 'Monitor', 'Smartphone',
  'Package', 'Box', 'Layers', 'Layout', 'Sidebar', 'Columns', 'Rows', 'Grid2x2',
  'BarChart', 'LineChart', 'PieChart', 'TrendingUp', 'TrendingDown', 'Activity', 'Gauge', 'Target',
];

export function IconsPage() {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [size, setSize] = useState(20);

  const filtered = featuredIcons.filter(name =>
    name.toLowerCase().includes(query.toLowerCase())
  );

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(`<${name} size={${size}} />`);
    setCopied(name);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="max-w-4xl px-6 lg:px-10 py-10">
      <PageHeader
        title="Iconography"
        description="Breathe uses Lucide React as its icon library — a clean, consistent set of open-source icons that follow a minimal stroke style."
        section="Foundations"
        badge="Lucide React"
        badgeColor="indigo"
      />

      {/* Installation */}
      <section className="mb-10">
        <CodeBlock
          code={`npm install lucide-react

import { Wind, Heart, ArrowRight } from 'lucide-react';

// Usage
<Wind size={20} className="text-teal-600" />
<Heart size={24} color="#E11D48" strokeWidth={1.5} />`}
          language="bash"
          filename="installation"
        />
      </section>

      {/* Size selector + search */}
      <section className="mb-8">
        <div className="flex items-center gap-4 flex-wrap mb-6">
          <div className="flex-1 relative min-w-48">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search icons..."
              className="w-full pl-8 pr-4 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-teal-400 dark:focus:border-teal-600 transition-colors"
              style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500 dark:text-slate-400" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem' }}>Size:</span>
            {[16, 20, 24, 32].map(s => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-2.5 py-1 rounded-lg transition-colors ${size === s ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Icon grid */}
        <div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-10 gap-2">
          {filtered.map(name => {
            const Icon = (LucideIcons as Record<string, LucideIcon>)[name];
            if (!Icon) return null;
            const isCopied = copied === name;
            return (
              <button
                key={name}
                onClick={() => handleCopy(name)}
                className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl transition-all group ${isCopied ? 'bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-800' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-300 dark:hover:border-teal-700 hover:bg-teal-50/50 dark:hover:bg-teal-900/20'}`}
                title={name}
              >
                {isCopied ? (
                  <Check size={size} className="text-teal-600 dark:text-teal-400" />
                ) : (
                  <Icon size={size} className="text-slate-600 dark:text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors" />
                )}
                <span className={`text-center leading-tight hidden sm:block ${isCopied ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400 dark:text-slate-600'}`}
                      style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%' }}>
                  {name}
                </span>
              </button>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
            No icons found for "{query}"
          </div>
        )}
        <p className="text-slate-400 dark:text-slate-600 mt-4" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem' }}>
          Showing {filtered.length} of {featuredIcons.length} featured icons. Click to copy JSX. Browse all 1500+ icons at{' '}
          <a href="https://lucide.dev" target="_blank" rel="noopener noreferrer" className="text-teal-600 dark:text-teal-400 underline">
            lucide.dev
          </a>
        </p>
      </section>

      {/* Props */}
      <section>
        <h2 className="text-slate-900 dark:text-white mb-4 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
          Icon Props
        </h2>
        <CodeBlock
          code={`import { Heart } from 'lucide-react';

// Size (number or string)
<Heart size={24} />

// Color
<Heart color="#E11D48" />
<Heart className="text-rose-500" />

// Stroke width (default: 2)
<Heart strokeWidth={1.5} />

// All props
<Heart size={24} strokeWidth={1.5} color="#E11D48" className="my-icon" />`}
          language="tsx"
        />
      </section>

      <PageNavigation />
    </div>
  );
}