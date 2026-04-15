import { Download } from 'lucide-react';
import type { LogoVariant } from './logoData';

interface LogoVariantCardProps {
  variant: LogoVariant;
  brandId: string;
}

export function LogoVariantCard({ variant, brandId }: LogoVariantCardProps) {
  const getPreviewBackground = () => {
    if (variant.previewBg === 'checkerboard') {
      return 'repeating-conic-gradient(#E5E7EB 0% 25%, #F9FAFB 0% 50%) 50% / 16px 16px';
    }
    return variant.previewBg;
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    // In a real implementation, this would trigger a file download
    console.log(`Download ${brandId}_${variant.id}`);
  };

  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-white dark:bg-slate-900">
      {/* Preview zone */}
      <div
        className="h-32 sm:h-40 flex items-center justify-center relative p-4 sm:p-6"
        style={{ background: getPreviewBackground() }}
      >
        {/* Logo image */}
        {variant.files.svg && (
          <img
            src={variant.files.svg}
            alt={variant.name}
            className="max-w-full max-h-full object-contain"
          />
        )}
      </div>

      {/* Metadata strip */}
      <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-start justify-between gap-2 sm:gap-3 mb-2">
          <div className="flex-1 min-w-0">
            <h4 className="text-xs sm:text-sm text-slate-900 dark:text-white mb-1" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
              {variant.name}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug" style={{ fontFamily: 'var(--font-sans)' }}>
              {variant.usageNote}
            </p>
          </div>
          <button
            onClick={handleDownload}
            className="flex-shrink-0 p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
            aria-label={`Download ${variant.name}`}
          >
            <Download className="w-4 h-4" />
          </button>
        </div>

        {/* File format badges */}
        <div className="flex items-center gap-1.5">
          {variant.files.svg && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 600 }}>
              SVG
            </span>
          )}
          {(variant.files.png1x || variant.files.png2x || variant.files.png3x) && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 600 }}>
              PNG
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
