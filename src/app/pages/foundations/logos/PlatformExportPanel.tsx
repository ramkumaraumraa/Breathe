import { useState } from 'react';
import { ChevronDown, ChevronUp, Download } from 'lucide-react';

interface PlatformExportPanelProps {
  brandId: string;
}

const iosIconSizes = [
  { usage: 'App Store', size: '1024×1024', scale: '@1x' },
  { usage: 'iPhone home screen', size: '180×180', scale: '@3x' },
  { usage: 'iPhone home screen', size: '120×120', scale: '@2x' },
  { usage: 'iPad Pro home screen', size: '167×167', scale: '@2x' },
  { usage: 'iPad home screen', size: '152×152', scale: '@2x' },
  { usage: 'iPad home screen', size: '76×76', scale: '@1x' },
  { usage: 'iPhone Spotlight', size: '120×120', scale: '@3x' },
  { usage: 'iPhone Spotlight', size: '80×80', scale: '@2x' },
  { usage: 'iPad Spotlight', size: '80×80', scale: '@2x' },
  { usage: 'iPad Spotlight', size: '40×40', scale: '@1x' },
  { usage: 'iPhone Settings', size: '87×87', scale: '@3x' },
  { usage: 'iPhone Settings', size: '58×58', scale: '@2x' },
  { usage: 'iPad Settings', size: '58×58', scale: '@2x' },
  { usage: 'iPad Settings', size: '29×29', scale: '@1x' },
  { usage: 'iPhone Notification', size: '60×60', scale: '@3x' },
  { usage: 'iPhone Notification', size: '40×40', scale: '@2x' },
  { usage: 'iPad Notification', size: '40×40', scale: '@2x' },
  { usage: 'iPad Notification', size: '20×20', scale: '@1x' },
];

const androidIconSizes = [
  { usage: 'Play Store listing', size: '512×512', density: '—' },
  { usage: 'Launcher — xxxhdpi', size: '192×192', density: 'xxxhdpi' },
  { usage: 'Launcher — xxhdpi', size: '144×144', density: 'xxhdpi' },
  { usage: 'Launcher — xhdpi', size: '96×96', density: 'xhdpi' },
  { usage: 'Launcher — hdpi', size: '72×72', density: 'hdpi' },
  { usage: 'Launcher — mdpi', size: '48×48', density: 'mdpi' },
  { usage: 'Adaptive — foreground layer', size: '108×108', density: '@1x (safe zone: 72×72 centred)' },
  { usage: 'Adaptive — background layer', size: '108×108', density: '@1x (solid fill or pattern)' },
];

export function PlatformExportPanel({ brandId }: PlatformExportPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDownload = (platform: 'ios' | 'android') => {
    console.log(`Download ${platform} set for ${brandId}`);
  };

  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-lg mt-8">
      {/* Collapsible header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
      >
        <span className="text-slate-900 dark:text-white" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9375rem' }}>
          Platform Export Sets
        </span>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-slate-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400" />
        )}
      </button>

      {/* Expandable content */}
      {isExpanded && (
        <div className="border-t border-slate-200 dark:border-slate-800 p-4 sm:p-6">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            {/* iOS Icon Set */}
            <div>
              <h4 className="text-slate-900 dark:text-white mb-3 m-0" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9375rem' }}>
                iOS Icon Set
              </h4>

              <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden overflow-x-auto mb-4">
                <table className="w-full text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                      <th className="text-left px-3 py-2 text-slate-600 dark:text-slate-400">Usage</th>
                      <th className="text-left px-3 py-2 text-slate-600 dark:text-slate-400">Size</th>
                      <th className="text-left px-3 py-2 text-slate-600 dark:text-slate-400">Scale</th>
                    </tr>
                  </thead>
                  <tbody>
                    {iosIconSizes.map((icon, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-slate-200 dark:border-slate-800 last:border-0"
                      >
                        <td className="px-3 py-2 text-slate-700 dark:text-slate-300">{icon.usage}</td>
                        <td className="px-3 py-2 text-slate-600 dark:text-slate-400">{icon.size}</td>
                        <td className="px-3 py-2 text-slate-600 dark:text-slate-400">{icon.scale}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1 mb-4" style={{ fontFamily: 'var(--font-sans)' }}>
                <p className="m-0">• All iOS app icons must have a flat, opaque background. No transparency.</p>
                <p className="m-0">• Recommended: use primary.500 as background with the Icon/Mark only variant centred at 80% of the canvas.</p>
                <p className="m-0">• Corner rounding is applied by iOS automatically — do not pre-round the source asset.</p>
              </div>

              <button
                onClick={() => handleDownload('ios')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors text-sm w-full sm:w-auto"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
              >
                <Download className="w-4 h-4" />
                Download iOS set
              </button>
            </div>

            {/* Android Icon Set */}
            <div>
              <h4 className="text-slate-900 dark:text-white mb-3 m-0" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9375rem' }}>
                Android Icon Set
              </h4>

              <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden overflow-x-auto mb-4">
                <table className="w-full text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                      <th className="text-left px-3 py-2 text-slate-600 dark:text-slate-400">Usage</th>
                      <th className="text-left px-3 py-2 text-slate-600 dark:text-slate-400">Size</th>
                      <th className="text-left px-3 py-2 text-slate-600 dark:text-slate-400">Density</th>
                    </tr>
                  </thead>
                  <tbody>
                    {androidIconSizes.map((icon, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-slate-200 dark:border-slate-800 last:border-0"
                      >
                        <td className="px-3 py-2 text-slate-700 dark:text-slate-300">{icon.usage}</td>
                        <td className="px-3 py-2 text-slate-600 dark:text-slate-400">{icon.size}</td>
                        <td className="px-3 py-2 text-slate-600 dark:text-slate-400 text-xs">{icon.density}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1 mb-4" style={{ fontFamily: 'var(--font-sans)' }}>
                <p className="m-0">• Android adaptive icons require two separate assets: a foreground layer (mark only, on transparent) and a background layer (solid colour or pattern, no mark).</p>
                <p className="m-0">• The safe zone for the foreground is the inner 72×72px of the 108×108 canvas. Keep the mark within this zone to avoid clipping on any device.</p>
                <p className="m-0">• Recommended: background layer = primary.500 solid fill. Foreground = Icon/Mark only on transparent.</p>
              </div>

              <button
                onClick={() => handleDownload('android')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors text-sm w-full sm:w-auto"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
              >
                <Download className="w-4 h-4" />
                Download Android set
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
