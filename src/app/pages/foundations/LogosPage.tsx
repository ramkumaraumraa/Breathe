import { useState } from 'react';
import { PageHeader } from '../../components/shared/PageHeader';
import { PageNavigation } from '../../components/shared/PageNavigation';
import { brands, BRAND_ORDER } from './logos/logoData';
import { BrandLogoTab } from './logos/BrandLogoTab';
import { LogoPlaceholder } from './logos/LogoPlaceholder';
import { motion } from 'motion/react';

const sortedBrands = [...brands].sort((a, b) => {
  const ai = (BRAND_ORDER as readonly string[]).indexOf(a.id);
  const bi = (BRAND_ORDER as readonly string[]).indexOf(b.id);
  return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
});

const topLevelBrands = sortedBrands.filter(b => b.id !== 'kaayo' && b.id !== 'ilakh');

const ULAGELLAM_SUBS = [
  { id: 'kaayo', label: '🎓 Kaayo (Tutor Ops)', accent: '#970103', tagline: 'Tutor & class operations · Mobile · Tablet' },
  { id: 'ilakh', label: '📈 Ilakh (Finance)', accent: '#0369A1', tagline: 'Goal tracking & personal finance · Web · Mobile' },
  { id: 'ullagellam', label: '🗺️ Ulagellam (Explorer)', accent: '#7C3AED', tagline: 'Explore & discover around you · Mobile' },
];

export function LogosPage() {
  const [activeBrand, setActiveBrand] = useState('aumraa');
  const [ulagellamSubTab, setUlagellamSubTab] = useState('kaayo');

  const currentBrand = activeBrand === 'ullagellam'
    ? (brands.find(b => b.id === ulagellamSubTab) || brands.find(b => b.id === 'ullagellam')!)
    : (brands.find(b => b.id === activeBrand) || brands[0]);

  return (
    <div className="max-w-7xl px-6 lg:px-10 py-10">
      {/* Page Header */}
      <PageHeader
        title="Logos"
        description="Official logo sets for every AUMRAA product. Each variant is built to a defined standard — use the correct variant for each surface and context. Download individual files or the full brand set as a ZIP."
        section="Foundations"
        badge="Brand Assets"
        badgeColor="indigo"
      />

      {/* Brand Tabs — sticky below TopBar (h-16 = 64px) */}
      <div className="sticky top-16 z-20 bg-slate-50 dark:bg-slate-950 -mx-6 lg:-mx-10 px-6 lg:px-10 mb-8 border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
        <div className="flex gap-0 min-w-max" role="tablist">
          {topLevelBrands.map((brand) => {
            const isActive = brand.id === activeBrand;
            return (
              <button
                key={brand.id}
                onClick={() => setActiveBrand(brand.id)}
                role="tab"
                aria-selected={isActive}
                className={`relative px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-slate-900 dark:text-white'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
                style={{
                  borderBottomColor: isActive ? brand.accentColor : undefined,
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                }}
              >
                {brand.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Ulagellam Sub-tabs Segment Selector */}
      {activeBrand === 'ullagellam' && (
        <div className="mb-8 p-1.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl inline-flex flex-wrap gap-1.5 max-w-full shadow-sm">
          {ULAGELLAM_SUBS.map((sub) => {
            const isSubActive = ulagellamSubTab === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => setUlagellamSubTab(sub.id)}
                className={`px-5 py-2.5 rounded-xl font-semibold transition-all cursor-pointer whitespace-nowrap text-sm ${
                  isSubActive
                    ? 'bg-white dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 border border-transparent'
                }`}
                style={{
                  borderBottomColor: isSubActive ? sub.accent : undefined,
                  borderBottomWidth: isSubActive ? '2px' : undefined,
                  fontFamily: 'var(--font-sans)',
                }}
                title={sub.tagline}
              >
                {sub.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Tab Content */}
      <div>
        <motion.div
          key={currentBrand.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {currentBrand.status === 'confirmed' ? (
            <BrandLogoTab brand={currentBrand} />
          ) : (
            <LogoPlaceholder
              brandName={currentBrand.label}
              platform={currentBrand.platform}
            />
          )}
        </motion.div>

        {/* Usage Guidelines Section */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-slate-900 dark:text-white mb-6 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
            Usage Guidelines
          </h2>

          <div className="grid sm:grid-cols-2 gap-8">
            {/* Do column */}
            <div>
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-4">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h4 className="text-slate-900 dark:text-white mb-3 m-0" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9375rem' }}>
                Do
              </h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400" style={{ fontFamily: 'var(--font-sans)' }}>
                <li>• Use Standard on all light backgrounds</li>
                <li>• Use Reversed on dark or brand-colored backgrounds</li>
                <li>• Use Mono Black for single-colour print requirements</li>
                <li>• Use Mono White on dark merchandise or cut-vinyl applications</li>
                <li>• Use Icon only below 40px display size or in favicons</li>
                <li>• Use Alpha when the background surface colour is unknown</li>
                <li>• Maintain minimum clear space of 1× the icon height on all sides of the logo</li>
              </ul>
            </div>

            {/* Don't column */}
            <div>
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-4">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h4 className="text-slate-900 dark:text-white mb-3 m-0" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9375rem' }}>
                Don't
              </h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400" style={{ fontFamily: 'var(--font-sans)' }}>
                <li>• Stretch, distort, or rotate any logo variant</li>
                <li>• Recreate any variant from memory — always use the files from this system</li>
                <li>• Use the Standard variant on a dark background</li>
                <li>• Apply drop shadows, glows, or effects to any logo</li>
                <li>• Place the logo on a background that creates insufficient contrast</li>
                <li>• Use the wordmark at sizes below 80px wide (use Icon only instead)</li>
                <li>• Mix variants from different brands in the same layout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <PageNavigation />
    </div>
  );
}
