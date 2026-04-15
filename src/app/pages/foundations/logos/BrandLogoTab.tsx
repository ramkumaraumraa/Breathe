import { Download } from 'lucide-react';
import type { BrandLogoConfig } from './logoData';
import { LogoVariantCard } from './LogoVariantCard';
import { PlatformExportPanel } from './PlatformExportPanel';

interface BrandLogoTabProps {
  brand: BrandLogoConfig;
}

export function BrandLogoTab({ brand }: BrandLogoTabProps) {
  if (!brand.variants) {
    return null;
  }

  const handleDownloadFullSet = () => {
    console.log(`Download full set for ${brand.id}`);
  };

  return (
    <div className="space-y-8">
      {/* Brand identity bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-slate-900 dark:text-white m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem' }}>
              {brand.label}
            </h2>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-400" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
              {brand.platform}
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 m-0" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
            {brand.tagline}
          </p>
        </div>
        <button
          onClick={handleDownloadFullSet}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shrink-0"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.875rem' }}
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Download full set</span>
          <span className="sm:hidden">Download all</span>
        </button>
      </div>

      {/* Logo set grid - 8 variants */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {brand.variants.map((variant) => (
          <LogoVariantCard
            key={variant.id}
            variant={variant}
            brandId={brand.id}
          />
        ))}
      </div>

      {/* Platform export section */}
      <PlatformExportPanel brandId={brand.id} />
    </div>
  );
}
