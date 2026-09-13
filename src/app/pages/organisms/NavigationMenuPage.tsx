import { useState, CSSProperties } from 'react'
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { KayoBrutalistNavigationMenu } from '@/app/components/custom/kaayo/KayoBrutalistNavigationMenu'
import { BookOpen, Code, Users, LayoutDashboard, Search } from 'lucide-react'

// ─── Item factories ────────────────────────────────────────────────────────────

function makeSimpleItems() {
  return [
    { label: 'Home',       href: '/'           },
    { label: 'Students',   href: '/students'   },
    { label: 'Attendance', href: '/attendance' },
    { label: 'Payments',   href: '/payments'   },
    { label: 'Settings',   href: '/settings'   },
  ]
}

function makeDropdownItems() {
  return [
    {
      label: 'Docs',
      children: [
        { label: 'Getting Started', href: '/docs/start',    description: 'Set up in 5 minutes' },
        { label: 'API Reference',   href: '/docs/api',      description: 'Full API docs' },
        { label: 'Examples',        href: '/docs/examples', description: 'Code samples' },
      ],
    },
    { label: 'Products', href: '/products' },
    {
      label: 'Resources',
      children: [
        { label: 'Blog',    href: '/blog',    description: 'Latest articles' },
        { label: 'Support', href: '/support', description: 'Get help' },
        { label: 'Status',  href: '/status',  description: 'Service health' },
      ],
    },
  ]
}

function makeIconItems() {
  return [
    {
      label: 'Explore',
      children: [
        { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={14} />, description: 'Your overview' },
        { label: 'Students',  href: '/students',  icon: <Users size={14} />,           description: 'Manage enrollments' },
        { label: 'Docs',      href: '/docs',      icon: <BookOpen size={14} />,        description: 'Documentation' },
        { label: 'API',       href: '/api',       icon: <Code size={14} />,            description: 'Developer tools' },
      ],
    },
    { label: 'Settings', href: '/settings' },
  ]
}

function makeManyItems() {
  return [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Students',  href: '/students'  },
    { label: 'Attendance', href: '/attendance' },
    {
      label: 'Reports',
      children: [
        { label: 'Monthly',  href: '/reports/monthly',  description: 'Monthly summary' },
        { label: 'Payments', href: '/reports/payments', description: 'Payment history' },
        { label: 'Exports',  href: '/reports/exports',  description: 'Data exports' },
      ],
    },
    { label: 'Payments',  href: '/payments'  },
    { label: 'Calendar',  href: '/calendar'  },
    {
      label: 'Settings',
      children: [
        { label: 'Account', href: '/settings/account', description: 'Profile and security' },
        { label: 'Org',     href: '/settings/org',     description: 'Organisation defaults' },
      ],
    },
  ]
}

// ─── Right-slot component ──────────────────────────────────────────────────────

const searchBtnStyle: CSSProperties = {
  padding: '6px 12px', border: '2px solid #3b3d3f', borderRadius: 6,
  cursor: 'pointer', background: '#fff', display: 'flex', alignItems: 'center',
  gap: 6, fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 13,
}
const signInBtnStyle: CSSProperties = {
  padding: '6px 14px', border: '2px solid #970103', borderRadius: 6,
  cursor: 'pointer', background: '#970103', color: '#fff',
  fontWeight: 600, fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 13,
}

function SearchAndCTA() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <button style={searchBtnStyle}>
        <Search size={14} /> Search
      </button>
      <button style={signInBtnStyle}>
        Sign In
      </button>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function NavigationMenuPage() {
  const [navLog, setNavLog] = useState('—')
  const simpleItems = makeSimpleItems()

  return (
    <ComponentPageLayout
      title="Navigation Menu"
      description="Horizontal navigation bar with direct links and dropdown panels. Use for top-level app navigation."
      level="Organism"
      status="Stable"
      implemented={['kaayo']}
      sections={[
        // ── Section 1: Simple links only ──────────────────────────────────────
        {
          title: 'Simple links only',
          description: '5 direct links with no active item — the simplest navigation configuration.',
          products: ['kaayo'],
          preview: (
            <KayoBrutalistNavigationMenu
              items={makeSimpleItems()}
            />
          ),
          code: {
            react: `<KayoBrutalistNavigationMenu
  items={[
    { label: 'Home',       href: '/'           },
    { label: 'Students',   href: '/students'   },
    { label: 'Attendance', href: '/attendance' },
    { label: 'Payments',   href: '/payments'   },
    { label: 'Settings',   href: '/settings'   },
  ]}
/>`,
          },
        },

        // ── Section 2: With dropdowns ─────────────────────────────────────────
        {
          title: 'With dropdowns',
          description: '2 trigger items open dropdown panels; 1 direct link.',
          products: ['kaayo'],
          preview: (
            <KayoBrutalistNavigationMenu
              items={makeDropdownItems()}
            />
          ),
          code: {
            react: `<KayoBrutalistNavigationMenu
  items={[
    { label: 'Docs', children: [
      { label: 'Getting Started', href: '/docs/start' },
      { label: 'API Reference',   href: '/docs/api' },
      { label: 'Examples',        href: '/docs/examples' },
    ]},
    { label: 'Products',   href: '/products' },
    { label: 'Resources', children: [
      { label: 'Blog',    href: '/blog' },
      { label: 'Support', href: '/support' },
      { label: 'Status',  href: '/status' },
    ]},
  ]}
/>`,
          },
        },

        // ── Section 3: With descriptions ──────────────────────────────────────
        {
          title: 'With descriptions',
          description: 'Dropdown children include a secondary description line below the label — same items as section 2.',
          products: ['kaayo'],
          preview: (
            <KayoBrutalistNavigationMenu
              items={makeDropdownItems()}
            />
          ),
          code: {
            react: `// Each child has an optional description field
{ label: 'Getting Started', href: '/docs/start', description: 'Set up in 5 minutes' }`,
          },
        },

        // ── Section 4: Active link ────────────────────────────────────────────
        {
          title: 'Active link',
          description: 'Pass activeHref to highlight the matching link without modifying item data.',
          products: ['kaayo'],
          preview: (
            <KayoBrutalistNavigationMenu
              items={makeSimpleItems()}
              activeHref="/attendance"
            />
          ),
          code: {
            react: `<KayoBrutalistNavigationMenu
  items={items}
  activeHref="/attendance"
/>`,
          },
        },

        // ── Section 5: With right slot ────────────────────────────────────────
        {
          title: 'With right slot',
          description: 'rightSlot pushes content to the far right — use for search, CTAs, or avatar.',
          products: ['kaayo'],
          preview: (
            <KayoBrutalistNavigationMenu
              items={makeSimpleItems().slice(0, 3)}
              rightSlot={<SearchAndCTA />}
            />
          ),
          code: {
            react: `function SearchAndCTA() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <button><Search size={14} /> Search</button>
      <button>Sign In</button>
    </div>
  )
}

<KayoBrutalistNavigationMenu
  items={items.slice(0, 3)}
  rightSlot={<SearchAndCTA />}
/>`,
          },
        },

        // ── Section 6: Mixed ───────────────────────────────────────────────────
        {
          title: 'Mixed — links, dropdowns, and right slot',
          description: '2 direct links, 2 dropdown items, and a right slot combined.',
          products: ['kaayo'],
          preview: (
            <KayoBrutalistNavigationMenu
              items={[simpleItems[0], simpleItems[1], ...makeDropdownItems()]}
              rightSlot={<SearchAndCTA />}
            />
          ),
          code: {
            react: `<KayoBrutalistNavigationMenu
  items={[
    { label: 'Home',     href: '/' },
    { label: 'Students', href: '/students' },
    { label: 'Docs',     children: [...] },
    { label: 'Products', href: '/products' },
    { label: 'Resources', children: [...] },
  ]}
  rightSlot={<SearchAndCTA />}
/>`,
          },
        },

        // ── Section 7: Single dropdown ────────────────────────────────────────
        {
          title: 'Single dropdown',
          description: 'One root item with 6 children — verify dropdown panel width and scroll.',
          products: ['kaayo'],
          preview: (
            <KayoBrutalistNavigationMenu
              items={[{
                label: 'All Features',
                children: [
                  { label: 'Dashboard',  href: '/dashboard',  description: 'Overview and stats' },
                  { label: 'Students',   href: '/students',   description: 'Student management' },
                  { label: 'Attendance', href: '/attendance', description: 'Track sessions' },
                  { label: 'Payments',   href: '/payments',   description: 'Fee collection' },
                  { label: 'Reports',    href: '/reports',    description: 'Analytics' },
                  { label: 'Settings',   href: '/settings',   description: 'Configuration' },
                ],
              }]}
            />
          ),
          code: {
            react: `<KayoBrutalistNavigationMenu
  items={[
    { label: 'All Features', children: [
      { label: 'Dashboard',  href: '/dashboard',  description: 'Overview and stats' },
      { label: 'Students',   href: '/students',   description: 'Student management' },
      { label: 'Attendance', href: '/attendance', description: 'Track sessions' },
      { label: 'Payments',   href: '/payments',   description: 'Fee collection' },
      { label: 'Reports',    href: '/reports',    description: 'Analytics' },
      { label: 'Settings',   href: '/settings',   description: 'Configuration' },
    ]},
  ]}
/>`,
          },
        },

        // ── Section 8: Many items ──────────────────────────────────────────────
        {
          title: 'Many items',
          description: '7 root items (5 direct + 2 with dropdowns) — tests horizontal layout at wider widths.',
          products: ['kaayo'],
          preview: (
            <KayoBrutalistNavigationMenu
              items={makeManyItems()}
            />
          ),
          code: {
            react: `// 7 root items: 5 direct links + 2 with dropdowns
<KayoBrutalistNavigationMenu items={makeManyItems()} />`,
          },
        },

        // ── Section 9: With icons in dropdown ─────────────────────────────────
        {
          title: 'With icons in dropdown',
          description: 'Dropdown children render an icon beside the label.',
          products: ['kaayo'],
          preview: (
            <KayoBrutalistNavigationMenu
              items={makeIconItems()}
            />
          ),
          code: {
            react: `// icon is on KayoNavMenuChild (not on the root item)
{ label: 'Explore', children: [
  { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={14} />, description: 'Your overview' },
  { label: 'Students',  href: '/students',  icon: <Users size={14} />,           description: 'Manage enrollments' },
]}`,
          },
        },

        // ── Section 10: Sticky ────────────────────────────────────────────────
        {
          title: 'Sticky',
          description: 'sticky={true} keeps the nav pinned at the top while content scrolls beneath it.',
          products: ['kaayo'],
          preview: (
            <div style={{ height: 300, overflowY: 'auto', border: '2px solid #3b3d3f', borderRadius: 6 }}>
              <KayoBrutalistNavigationMenu
                items={makeSimpleItems()}
                sticky
              />
              <div style={{ padding: 24, height: 600 }}>
                <p style={{ color: '#6b7280', fontSize: 14, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
                  Scroll down — the nav stays fixed at the top.
                </p>
              </div>
            </div>
          ),
          code: {
            react: `<div style={{ height: 300, overflowY: 'auto' }}>
  <KayoBrutalistNavigationMenu
    items={items}
    sticky={true}
  />
  <div style={{ height: 600 }}>
    {/* scroll content */}
  </div>
</div>`,
          },
        },

        // ── Section 11: No active item ────────────────────────────────────────
        {
          title: 'No active item',
          description: 'All links inactive — no active flags and no activeHref is passed.',
          products: ['kaayo'],
          preview: (
            <KayoBrutalistNavigationMenu
              items={makeSimpleItems()}
            />
          ),
          code: {
            react: `// Pass items with no active flags and no activeHref
<KayoBrutalistNavigationMenu
  items={[
    { label: 'Home',       href: '/' },
    { label: 'Students',   href: '/students' },
    { label: 'Attendance', href: '/attendance' },
    { label: 'Payments',   href: '/payments' },
    { label: 'Settings',   href: '/settings' },
  ]}
/>`,
          },
        },

        // ── Section 12: onNavigate callback ───────────────────────────────────
        {
          title: 'onNavigate callback',
          description: 'Intercept clicks to handle routing in SPAs — fires for both direct links and dropdown children.',
          products: ['kaayo'],
          preview: (
            <div>
              <KayoBrutalistNavigationMenu
                items={makeDropdownItems()}
                onNavigate={(href) => setNavLog(href)}
              />
              <div style={{ marginTop: 12, fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 13, color: '#6b7280', paddingLeft: 4 }}>
                Last navigated to: <code>{navLog}</code>
              </div>
            </div>
          ),
          code: {
            react: `const [navLog, setNavLog] = useState('')

<KayoBrutalistNavigationMenu
  items={items}
  onNavigate={(href) => setNavLog(href)}
/>
<div>Last navigated to: <code>{navLog || '—'}</code></div>`,
          },
        },
      ]}
    />
  )
}
