import { useState } from 'react'
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistBottomNav } from '@/app/components/custom/kaayo/KayoBrutalistBottomNav'
import { LayoutDashboard, Users, ClipboardList, CreditCard, Settings } from 'lucide-react'

const placeholder = (
  <div style={{ color: '#6b7280', padding: 16 }}>Switch to Kaayo theme to preview</div>
)

export function BottomNavPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'
  const [active, setActive] = useState('dashboard')

  const ITEMS_5 = [
    { key: 'dashboard',  label: 'Dashboard',  icon: <LayoutDashboard size={22} /> },
    { key: 'students',   label: 'Students',   icon: <Users size={22} /> },
    { key: 'attendance', label: 'Attendance', icon: <ClipboardList size={22} /> },
    { key: 'payments',   label: 'Payments',   icon: <CreditCard size={22} /> },
    { key: 'settings',   label: 'Settings',   icon: <Settings size={22} /> },
  ]

  const ITEMS_3 = [
    { key: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={22} /> },
    { key: 'students',  label: 'Students',  icon: <Users size={22} /> },
    { key: 'settings',  label: 'Settings',  icon: <Settings size={22} /> },
  ]

  return (
    <ComponentPageLayout
      title="Bottom Nav"
      description="Fixed 5-tab navigation bar for mobile and tablet layouts. Uses crimson active indicator with badge support."
      level="Organism"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Mobile — 5 items',
          description: 'Standard 5-tab bottom nav in mobile variant. Active indicator is a crimson top border on the tab.',
          preview: isKaayo ? (
            <KayoBrutalistBottomNav
              variant="mobile"
              activeKey="dashboard"
              items={ITEMS_5}
            />
          ) : placeholder,
          code: {
            react: `import { KayoBrutalistBottomNav } from '@breathe/kaayo'
import { LayoutDashboard, Users, ClipboardList, CreditCard, Settings } from 'lucide-react'

const ITEMS = [
  { key: 'dashboard',  label: 'Dashboard',  icon: <LayoutDashboard size={22} /> },
  { key: 'students',   label: 'Students',   icon: <Users size={22} /> },
  { key: 'attendance', label: 'Attendance', icon: <ClipboardList size={22} /> },
  { key: 'payments',   label: 'Payments',   icon: <CreditCard size={22} /> },
  { key: 'settings',   label: 'Settings',   icon: <Settings size={22} /> },
]

<KayoBrutalistBottomNav
  variant="mobile"
  activeKey="dashboard"
  items={ITEMS}
/>`,
          },
        },
        {
          title: 'Tablet — 5 items',
          description: 'Tablet variant adds more vertical padding and larger label text to suit wider screens.',
          preview: isKaayo ? (
            <KayoBrutalistBottomNav
              variant="tablet"
              activeKey="dashboard"
              items={ITEMS_5}
            />
          ) : placeholder,
          code: {
            react: `<KayoBrutalistBottomNav
  variant="tablet"
  activeKey="dashboard"
  items={ITEMS}
/>`,
          },
        },
        {
          title: 'Active: Students',
          description: 'Second tab (Students) is active — crimson top border and crimson icon/label.',
          preview: isKaayo ? (
            <KayoBrutalistBottomNav
              variant="mobile"
              activeKey="students"
              items={ITEMS_5}
            />
          ) : placeholder,
          code: {
            react: `<KayoBrutalistBottomNav
  variant="mobile"
  activeKey="students"
  items={ITEMS}
/>`,
          },
        },
        {
          title: 'Active: Attendance',
          description: 'Third tab (Attendance) is active.',
          preview: isKaayo ? (
            <KayoBrutalistBottomNav
              variant="mobile"
              activeKey="attendance"
              items={ITEMS_5}
            />
          ) : placeholder,
          code: {
            react: `<KayoBrutalistBottomNav
  variant="mobile"
  activeKey="attendance"
  items={ITEMS}
/>`,
          },
        },
        {
          title: 'Active: Payments',
          description: 'Fourth tab (Payments) is active.',
          preview: isKaayo ? (
            <KayoBrutalistBottomNav
              variant="mobile"
              activeKey="payments"
              items={ITEMS_5}
            />
          ) : placeholder,
          code: {
            react: `<KayoBrutalistBottomNav
  variant="mobile"
  activeKey="payments"
  items={ITEMS}
/>`,
          },
        },
        {
          title: 'Active: Settings',
          description: 'Fifth tab (Settings) is active.',
          preview: isKaayo ? (
            <KayoBrutalistBottomNav
              variant="mobile"
              activeKey="settings"
              items={ITEMS_5}
            />
          ) : placeholder,
          code: {
            react: `<KayoBrutalistBottomNav
  variant="mobile"
  activeKey="settings"
  items={ITEMS}
/>`,
          },
        },
        {
          title: 'None active',
          description: 'No `activeKey` provided — all tabs render in muted grey with no active indicator.',
          preview: isKaayo ? (
            <KayoBrutalistBottomNav
              variant="mobile"
              items={ITEMS_5}
            />
          ) : placeholder,
          code: {
            react: `<KayoBrutalistBottomNav
  variant="mobile"
  items={ITEMS}
/>`,
          },
        },
        {
          title: 'With badge — single',
          description: '`badge: 3` on Payments renders a crimson pill above the icon.',
          preview: isKaayo ? (
            <KayoBrutalistBottomNav
              variant="mobile"
              activeKey="dashboard"
              items={ITEMS_5.map(i => i.key === 'payments' ? { ...i, badge: 3 } : i)}
            />
          ) : placeholder,
          code: {
            react: `<KayoBrutalistBottomNav
  variant="mobile"
  activeKey="dashboard"
  items={ITEMS.map(i => i.key === 'payments' ? { ...i, badge: 3 } : i)}
/>`,
          },
        },
        {
          title: 'With badge — multiple',
          description: 'Multiple tabs can carry badges simultaneously — Payments (3) and Attendance (1).',
          preview: isKaayo ? (
            <KayoBrutalistBottomNav
              variant="mobile"
              items={ITEMS_5.map(i =>
                i.key === 'payments' ? { ...i, badge: 3 }
                : i.key === 'attendance' ? { ...i, badge: 1 }
                : i
              )}
            />
          ) : placeholder,
          code: {
            react: `<KayoBrutalistBottomNav
  variant="mobile"
  items={ITEMS.map(i =>
    i.key === 'payments'   ? { ...i, badge: 3 }
    : i.key === 'attendance' ? { ...i, badge: 1 }
    : i
  )}
/>`,
          },
        },
        {
          title: 'With badge — overflow',
          description: 'When `badge` exceeds 9 the pill displays "9+" to prevent overflow.',
          preview: isKaayo ? (
            <KayoBrutalistBottomNav
              variant="mobile"
              items={ITEMS_5.map(i => i.key === 'payments' ? { ...i, badge: 99 } : i)}
            />
          ) : placeholder,
          code: {
            react: `<KayoBrutalistBottomNav
  variant="mobile"
  items={ITEMS.map(i => i.key === 'payments' ? { ...i, badge: 99 } : i)}
/>`,
          },
        },
        {
          title: '3-item minimal',
          description: 'Bottom nav scales down gracefully with fewer tabs — tabs stretch to fill the full width.',
          preview: isKaayo ? (
            <KayoBrutalistBottomNav
              variant="mobile"
              activeKey="dashboard"
              items={ITEMS_3}
            />
          ) : placeholder,
          code: {
            react: `const ITEMS_3 = [
  { key: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={22} /> },
  { key: 'students',  label: 'Students',  icon: <Users size={22} /> },
  { key: 'settings',  label: 'Settings',  icon: <Settings size={22} /> },
]

<KayoBrutalistBottomNav
  variant="mobile"
  activeKey="dashboard"
  items={ITEMS_3}
/>`,
          },
        },
        {
          title: 'Interactive demo',
          description: 'Click any tab to update the active state. The label below tracks the current selection.',
          preview: isKaayo ? (
            <div>
              <KayoBrutalistBottomNav
                variant="mobile"
                activeKey={active}
                onPress={setActive}
                items={ITEMS_5}
              />
              <div style={{
                marginTop: 12,
                fontSize: 13,
                color: '#6b7280',
                fontFamily: "'DM Sans', system-ui, sans-serif",
                textAlign: 'center',
              }}>
                Active: <strong style={{ color: '#970103' }}>{active}</strong>
              </div>
            </div>
          ) : placeholder,
          code: {
            react: `const [active, setActive] = useState('dashboard')

<KayoBrutalistBottomNav
  variant="mobile"
  activeKey={active}
  onPress={setActive}
  items={ITEMS}
/>
<p>Active: {active}</p>`,
          },
        },
      ]}
    />
  )
}
