import { useState } from 'react'
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import {
  KayoBrutalistHeader,
  BrandedHeaderBar,
  BrandedHeaderTitle,
  type KayoHeaderVariant,
} from '@/app/components/custom/kaayo/KayoBrutalistHeader'
import { KayoBrutalistAmountVisibilityToggle } from '@aumraa/breathe-react/kaayo'
import { AndroidFrame } from '@/app/components/shared/AndroidFrame'

const DEMO_USER = { name: 'Ram Kumar', role: 'Master · Owner', initials: 'RK' }

const DEMO_NAV = [
  { label: 'Dashboard', href: '#', active: false },
  { label: 'Students',  href: '#', active: false },
  { label: 'Attendance',href: '#', active: false },
  { label: 'Payments',  href: '#', active: false },
]

export function HeaderPage() {
  const [variant, setVariant] = useState<KayoHeaderVariant>('branded')
  const [bellCount, setBellCount] = useState<number>(3)
  const [withTitle, setWithTitle] = useState(true)
  const [withAction, setWithAction] = useState(true)
  const [veilVisible, setVeilVisible] = useState(false)

  const wrapFrame = (child: React.ReactNode, mode: 'mobile' | 'tablet' = 'mobile', bg = '#ffffff') => {
    if (mode === 'tablet') {
      return (
        <AndroidFrame width={480} height={140} screenBg={bg}>
          {child}
          <div style={{ flex: 1, backgroundColor: bg }} />
        </AndroidFrame>
      )
    }
    return (
      <AndroidFrame width={320} height={140} screenBg={bg}>
        {child}
        <div style={{ flex: 1, backgroundColor: bg }} />
      </AndroidFrame>
    )
  }

  return (
    <ComponentPageLayout
      title="Header"
      description="App top bar matching Kaayo v1.8.0. Supports the pinned crimson BrandedHeaderBar (Figma 74513:27), unbranded light mobile top bar, tablet, and desktop layouts."
      level="Molecule"
      status="Stable"
      implemented={['kaayo']}
      sections={[
        {
          title: 'Interactive Playground',
          products: ['kaayo'],
          description: 'Explore Kaayo header variants: Branded (crimson canopy top bar), Mobile, Tablet, and Desktop.',
          preview: (
            <div className="flex flex-col gap-6">
              <div className="flex justify-center p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                {wrapFrame(
                  <KayoBrutalistHeader
                    variant={variant}
                    title={withTitle ? (variant === 'branded' ? 'Welcome back, Ram' : 'Students') : undefined}
                    bellCount={bellCount}
                    user={DEMO_USER}
                    actions={
                      withAction && variant === 'branded' ? (
                        <KayoBrutalistAmountVisibilityToggle
                          visible={veilVisible}
                          onToggle={() => setVeilVisible(!veilVisible)}
                        />
                      ) : undefined
                    }
                  />,
                  variant === 'tablet' || variant === 'desktop' ? 'tablet' : 'mobile',
                  variant === 'branded' ? '#970103' : '#ffffff'
                )}
              </div>

              {/* Controls */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Variant</label>
                  <select
                    value={variant}
                    onChange={(e) => setVariant(e.target.value as KayoHeaderVariant)}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                  >
                    <option value="branded">branded (Crimson Top Bar)</option>
                    <option value="mobile">mobile (Light Phone)</option>
                    <option value="tablet">tablet (With User Chip)</option>
                    <option value="desktop">desktop (Full Nav)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Bell Count</label>
                  <div className="flex gap-2">
                    {[0, 3, 12].map((cnt) => (
                      <button
                        key={cnt}
                        type="button"
                        onClick={() => setBellCount(cnt)}
                        className={`flex-1 py-1 text-xs font-bold rounded-lg border transition-all ${
                          bellCount === cnt
                            ? 'bg-[#970103] text-white border-[#970103]'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        {cnt === 0 ? '0 (None)' : cnt === 12 ? '12 (9+)' : cnt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Title Slot</label>
                  <button
                    type="button"
                    onClick={() => setWithTitle(!withTitle)}
                    className={`w-full py-1.5 text-xs font-bold rounded-lg border transition-all ${
                      withTitle
                        ? 'bg-rose-100 text-rose-900 border-rose-400'
                        : 'bg-white dark:bg-slate-800 text-slate-600 border-slate-300'
                    }`}
                  >
                    {withTitle ? 'Title Included' : 'No Title'}
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Actions Slot</label>
                  <button
                    type="button"
                    onClick={() => setWithAction(!withAction)}
                    className={`w-full py-1.5 text-xs font-bold rounded-lg border transition-all ${
                      withAction
                        ? 'bg-rose-100 text-rose-900 border-rose-400'
                        : 'bg-white dark:bg-slate-800 text-slate-600 border-slate-300'
                    }`}
                  >
                    {withAction ? 'Actions (Veil Eye)' : 'None'}
                  </button>
                </div>
              </div>
            </div>
          ),
          code: {
            react: `import { KayoBrutalistHeader } from '@aumraa/breathe-react/kaayo'

<KayoBrutalistHeader
  variant="${variant}"
  ${withTitle ? 'title="Welcome back, Ram"' : ''}
  bellCount={${bellCount}}
/>`,
            reactNative: `import { BrandedHeaderBar, BrandedHeaderTitle } from '@aumraa/breathe-native/kaayo'

<BrandedHeaderBar
  title={<BrandedHeaderTitle title="Welcome back, Ram" />}
/>`,
          },
        },
        {
          title: 'Branded Header Bar (Figma 74513:27)',
          description: 'The fixed top row of every branded tab, pinned above the page by AppShell so it never scrolls away with the canopy beneath it.',
          products: ['kaayo'],
          preview: (
            <div className="flex flex-col gap-4">
              <div className="max-w-md w-full">
                {wrapFrame(
                  <BrandedHeaderBar
                    title={<BrandedHeaderTitle value="76" title="students" />}
                    bellCount={3}
                  />,
                  'mobile',
                  '#970103'
                )}
              </div>
              <div className="max-w-md w-full">
                {wrapFrame(
                  <BrandedHeaderBar
                    title={<BrandedHeaderTitle title="Payments" />}
                    actions={
                      <KayoBrutalistAmountVisibilityToggle
                        visible={veilVisible}
                        onToggle={() => setVeilVisible(!veilVisible)}
                      />
                    }
                    bellCount={0}
                  />,
                  'mobile',
                  '#970103'
                )}
              </div>
            </div>
          ),
          code: {
            react: `import { BrandedHeaderBar, BrandedHeaderTitle } from '@aumraa/breathe-react/kaayo'

<BrandedHeaderBar
  title={<BrandedHeaderTitle value="76" title="students" />}
  bellCount={3}
/>`,
          },
        },
        {
          title: 'Light Mobile Top Bar',
          description: 'Compact header for secondary screens — brand red symbol logo on the left, centered page title, and brutalist notification bell button on the right.',
          products: ['kaayo'],
          preview: wrapFrame(
            <KayoBrutalistHeader
              variant="mobile"
              pageTitle="Attendance"
              bellCount={2}
              user={DEMO_USER}
            />
          ),
          code: {
            react: `<KayoBrutalistHeader
  variant="mobile"
  pageTitle="Attendance"
  bellCount={2}
/>`,
          },
        },
        {
          title: 'Tablet & Desktop Layouts',
          description: 'Desktop header — logo + nav links on the left with active state indicator, bell + full user chip (avatar + name + role badge) on the right.',
          products: ['kaayo'],
          preview: (
            <div className="w-full border-2 border-[#17191D] rounded-xl overflow-hidden shadow-[3px_3px_0_#17191D]">
              <KayoBrutalistHeader
                variant="desktop"
                navItems={[
                  { label: 'Dashboard', href: '#', active: false },
                  { label: 'Students',  href: '#', active: true },
                  { label: 'Attendance',href: '#', active: false },
                  { label: 'Payments',  href: '#', active: false },
                ]}
                user={DEMO_USER}
                bellCount={4}
              />
            </div>
          ),
          code: {
            react: `const NAV = [
  { label: 'Dashboard', href: '#' },
  { label: 'Students',  href: '#', active: true },
  { label: 'Attendance',href: '#' },
  { label: 'Payments',  href: '#' },
]

<KayoBrutalistHeader
  variant="desktop"
  navItems={NAV}
  user={{ name: 'Ram Kumar', role: 'Master · Owner', initials: 'RK' }}
  bellCount={4}
/>`,
          },
        },
      ]}
    />
  )
}

export default HeaderPage
