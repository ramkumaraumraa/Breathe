import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistHeader } from '@/app/components/custom/kaayo/KayoBrutalistHeader'
import { AndroidFrame } from '@/app/components/shared/AndroidFrame'

const DEMO_USER = { name: 'Ram Kumar', role: 'Master · Owner', initials: 'RK' }

const DEMO_NAV = [
  { label: 'Dashboard', href: '#', active: false },
  { label: 'Students',  href: '#', active: false },
  { label: 'Attendance',href: '#', active: false },
  { label: 'Payments',  href: '#', active: false },
]

const placeholder = (
  <div style={{ color: '#6b7280', padding: 16 }}>Switch to Kaayo theme to preview</div>
)

export function HeaderPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  const wrapFrame = (child: React.ReactNode, variant: 'mobile' | 'tablet' = 'mobile') => {
    if (variant === 'tablet') {
      return (
        <AndroidFrame width={480} height={120} screenBg="#ffffff">
          {child}
          <div style={{ flex: 1 }} />
        </AndroidFrame>
      )
    }
    return (
      <AndroidFrame width={320} height={120} screenBg="#ffffff">
        {child}
        <div style={{ flex: 1 }} />
      </AndroidFrame>
    )
  }

  return (
    <ComponentPageLayout
      title="Header"
      description="App top bar with logo, bell notification badge, and user chip. Supports mobile, tablet, and desktop layouts."
      level="Molecule"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Mobile layout',
          description: 'Compact header for phones — logo on the left, bell + avatar icon on the right. No nav links.',
          preview: isKaayo ? wrapFrame(
            <KayoBrutalistHeader
              variant="mobile"
              user={DEMO_USER}
            />
          ) : placeholder,
          code: {
            react: `import { KayoBrutalistHeader } from '@breathe/kaayo'

<KayoBrutalistHeader
  variant="mobile"
  user={{ name: 'Ram Kumar', role: 'Master · Owner', initials: 'RK' }}
/>`,
          },
        },
        {
          title: 'Tablet layout',
          description: 'Tablet header — logo on the left, bell + full user chip (avatar + name + role badge) on the right.',
          preview: isKaayo ? wrapFrame(
            <KayoBrutalistHeader
              variant="tablet"
              user={DEMO_USER}
            />,
            'tablet'
          ) : placeholder,
          code: {
            react: `<KayoBrutalistHeader
  variant="tablet"
  user={{ name: 'Ram Kumar', role: 'Master · Owner', initials: 'RK' }}
/>`,
          },
        },
        {
          title: 'Desktop layout',
          description: 'Full desktop header — logo + nav links on the left, bell + user chip on the right.',
          preview: isKaayo ? (
            <KayoBrutalistHeader
              variant="desktop"
              navItems={DEMO_NAV}
              user={DEMO_USER}
            />
          ) : placeholder,
          code: {
            react: `const NAV = [
  { label: 'Dashboard', href: '#' },
  { label: 'Students',  href: '#' },
  { label: 'Attendance',href: '#' },
  { label: 'Payments',  href: '#' },
]

<KayoBrutalistHeader
  variant="desktop"
  navItems={NAV}
  user={{ name: 'Ram Kumar', role: 'Master · Owner', initials: 'RK' }}
/>`,
          },
        },
        {
          title: 'Active nav item',
          description: 'The third nav item (Attendance) is marked `active` — underlined in crimson with bold weight.',
          preview: isKaayo ? (
            <KayoBrutalistHeader
              variant="desktop"
              navItems={[
                { label: 'Dashboard', href: '#', active: false },
                { label: 'Students',  href: '#', active: false },
                { label: 'Attendance',href: '#', active: true },
                { label: 'Payments',  href: '#', active: false },
              ]}
              user={DEMO_USER}
            />
          ) : placeholder,
          code: {
            react: `<KayoBrutalistHeader
  variant="desktop"
  navItems={[
    { label: 'Dashboard', href: '#' },
    { label: 'Students',  href: '#' },
    { label: 'Attendance',href: '#', active: true },
    { label: 'Payments',  href: '#' },
  ]}
  user={{ name: 'Ram Kumar', role: 'Master · Owner', initials: 'RK' }}
/>`,
          },
        },
        {
          title: 'With page title',
          description: '`pageTitle` renders a centred title — useful when nav links are hidden but a section name is needed.',
          preview: isKaayo ? wrapFrame(
            <KayoBrutalistHeader
              variant="mobile"
              pageTitle="Dashboard"
              user={DEMO_USER}
            />
          ) : placeholder,
          code: {
            react: `<KayoBrutalistHeader
  variant="mobile"
  pageTitle="Dashboard"
  user={{ name: 'Ram Kumar', role: 'Master · Owner', initials: 'RK' }}
/>`,
          },
        },
        {
          title: 'Bell with unread count',
          description: '`bellCount={3}` renders a crimson badge on the bell icon showing the count.',
          preview: isKaayo ? wrapFrame(
            <KayoBrutalistHeader
              variant="mobile"
              bellCount={3}
              user={DEMO_USER}
            />
          ) : placeholder,
          code: {
            react: `<KayoBrutalistHeader
  variant="mobile"
  bellCount={3}
  user={{ name: 'Ram Kumar', role: 'Master · Owner', initials: 'RK' }}
/>`,
          },
        },
        {
          title: 'High unread count',
          description: 'When `bellCount` exceeds 9, the badge collapses to "9+" to prevent overflow.',
          preview: isKaayo ? wrapFrame(
            <KayoBrutalistHeader
              variant="mobile"
              bellCount={12}
              user={DEMO_USER}
            />
          ) : placeholder,
          code: {
            react: `<KayoBrutalistHeader
  variant="mobile"
  bellCount={12}
  user={{ name: 'Ram Kumar', role: 'Master · Owner', initials: 'RK' }}
/>`,
          },
        },
        {
          title: 'Sticky header demo',
          description: '`sticky={true}` pins the header to the top when scrolling. Scroll inside the box below to see the shadow appear.',
          preview: isKaayo ? (
            <div style={{ height: 200, overflowY: 'auto', border: '2px solid #3b3d3f' }}>
              <KayoBrutalistHeader
                variant="desktop"
                sticky={true}
                user={DEMO_USER}
              />
              <div style={{
                padding: '16px 24px',
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 14,
                color: '#6b7280',
                lineHeight: 1.8,
              }}>
                <p>Scroll down to see the header stick to the top of this container.</p>
                <p style={{ marginTop: 12 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p style={{ marginTop: 12 }}>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
            </div>
          ) : placeholder,
          code: {
            react: `<KayoBrutalistHeader
  variant="desktop"
  sticky={true}
  user={{ name: 'Ram Kumar', role: 'Master · Owner', initials: 'RK' }}
/>`,
          },
        },
        {
          title: 'No user (guest)',
          description: 'Omitting the `user` prop renders the header in guest mode — bell is still visible, user chip is absent.',
          preview: isKaayo ? wrapFrame(
            <KayoBrutalistHeader
              variant="mobile"
            />
          ) : placeholder,
          code: {
            react: `<KayoBrutalistHeader variant="mobile" />`,
          },
        },
        {
          title: 'Custom logo slot',
          description: 'The `logo` prop accepts any ReactNode — pass a styled wordmark, SVG, or image in place of the default.',
          preview: isKaayo ? wrapFrame(
            <KayoBrutalistHeader
              variant="mobile"
              logo={
                <span style={{
                  fontWeight: 700,
                  fontSize: 20,
                  color: '#970103',
                  letterSpacing: '-0.02em',
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                }}>
                  KAAYO
                </span>
              }
              user={DEMO_USER}
            />
          ) : placeholder,
          code: {
            react: `<KayoBrutalistHeader
  variant="mobile"
  logo={
    <span style={{ fontWeight: 700, fontSize: 20, color: '#970103', letterSpacing: '-0.02em' }}>
      KAAYO
    </span>
  }
  user={{ name: 'Ram Kumar', role: 'Master · Owner', initials: 'RK' }}
/>`,
          },
        },
      ]}
    />
  )
}
