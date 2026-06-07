import { useState } from 'react'
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistSideNav } from '@/app/components/custom/kaayo/KayoBrutalistSideNav'
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  CreditCard,
  Settings,
  FileText,
  Bell,
} from 'lucide-react'

// ── Icon factory functions (JSX cannot be at module level) ────────────────────

function makeSection1() {
  return [
    {
      label: 'Main',
      items: [
        { key: 'dashboard',  label: 'Dashboard',  icon: <LayoutDashboard size={18} /> },
        { key: 'students',   label: 'Students',   icon: <Users size={18} /> },
        { key: 'attendance', label: 'Attendance', icon: <ClipboardList size={18} /> },
        { key: 'payments',   label: 'Payments',   icon: <CreditCard size={18} /> },
      ],
    },
    {
      label: 'System',
      items: [
        { key: 'reports',  label: 'Reports',  icon: <FileText size={18} /> },
        { key: 'alerts',   label: 'Alerts',   icon: <Bell size={18} /> },
        { key: 'settings', label: 'Settings', icon: <Settings size={18} /> },
      ],
    },
  ]
}

function makeSection3() {
  return [
    {
      label: 'Main',
      items: [
        { key: 'dashboard',  label: 'Dashboard',  icon: <LayoutDashboard size={18} /> },
        { key: 'students',   label: 'Students',   icon: <Users size={18} /> },
        { key: 'attendance', label: 'Attendance', icon: <ClipboardList size={18} /> },
        { key: 'payments',   label: 'Payments',   icon: <CreditCard size={18} />, badge: 3 },
      ],
    },
    {
      label: 'System',
      items: [
        { key: 'reports',  label: 'Reports',  icon: <FileText size={18} /> },
        { key: 'alerts',   label: 'Alerts',   icon: <Bell size={18} />, badge: 12 },
        { key: 'settings', label: 'Settings', icon: <Settings size={18} /> },
      ],
    },
  ]
}

function makeSection6() {
  return [
    {
      label: 'Main',
      collapsible: true,
      items: [
        { key: 'dashboard',  label: 'Dashboard',  icon: <LayoutDashboard size={18} /> },
        { key: 'students',   label: 'Students',   icon: <Users size={18} /> },
        { key: 'attendance', label: 'Attendance', icon: <ClipboardList size={18} /> },
        { key: 'payments',   label: 'Payments',   icon: <CreditCard size={18} /> },
      ],
    },
    {
      label: 'System',
      collapsible: true,
      items: [
        { key: 'reports',  label: 'Reports',  icon: <FileText size={18} /> },
        { key: 'alerts',   label: 'Alerts',   icon: <Bell size={18} /> },
        { key: 'settings', label: 'Settings', icon: <Settings size={18} /> },
      ],
    },
  ]
}

function makeSection7() {
  return [
    {
      label: 'Main',
      collapsible: true,
      items: [
        { key: 'dashboard',  label: 'Dashboard',  icon: <LayoutDashboard size={18} /> },
        { key: 'students',   label: 'Students',   icon: <Users size={18} /> },
        { key: 'attendance', label: 'Attendance', icon: <ClipboardList size={18} /> },
        { key: 'payments',   label: 'Payments',   icon: <CreditCard size={18} /> },
      ],
    },
    {
      label: 'System',
      collapsible: true,
      defaultOpen: false,
      items: [
        { key: 'reports',  label: 'Reports',  icon: <FileText size={18} /> },
        { key: 'alerts',   label: 'Alerts',   icon: <Bell size={18} /> },
        { key: 'settings', label: 'Settings', icon: <Settings size={18} /> },
      ],
    },
  ]
}

function makeSection8() {
  return [
    {
      items: [
        { key: 'dashboard',  label: 'Dashboard',  icon: <LayoutDashboard size={18} /> },
        { key: 'students',   label: 'Students',   icon: <Users size={18} /> },
        { key: 'attendance', label: 'Attendance', icon: <ClipboardList size={18} /> },
        { key: 'payments',   label: 'Payments',   icon: <CreditCard size={18} /> },
        { key: 'reports',    label: 'Reports',    icon: <FileText size={18} /> },
        { key: 'alerts',     label: 'Alerts',     icon: <Bell size={18} /> },
        { key: 'settings',   label: 'Settings',   icon: <Settings size={18} /> },
      ],
    },
  ]
}

function makeSection9() {
  return [
    {
      label: 'Main',
      items: [
        { key: 'dashboard',  label: 'Dashboard',  icon: <LayoutDashboard size={18} /> },
        { key: 'students',   label: 'Students',   icon: <Users size={18} />, disabled: true },
        { key: 'attendance', label: 'Attendance', icon: <ClipboardList size={18} /> },
        { key: 'payments',   label: 'Payments',   icon: <CreditCard size={18} /> },
      ],
    },
    {
      label: 'System',
      items: [
        { key: 'reports',  label: 'Reports',  icon: <FileText size={18} /> },
        { key: 'alerts',   label: 'Alerts',   icon: <Bell size={18} /> },
        { key: 'settings', label: 'Settings', icon: <Settings size={18} />, disabled: true },
      ],
    },
  ]
}

// ── Preview wrapper ──────────────────────────────────────────────────────────

function PreviewShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        height: 480,
        display: 'flex',
        border: '2px solid #3b3d3f',
        borderRadius: 6,
        overflow: 'hidden',
      }}
    >
      {children}
      <div style={{ flex: 1, padding: 24, backgroundColor: '#f9fafb' }}>
        <div
          style={{
            fontSize: 14,
            color: '#6b7280',
            fontFamily: "'DM Sans', system-ui, sans-serif",
          }}
        >
          Page content area
        </div>
      </div>
    </div>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────

export function SidebarPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  const [collapsed5, setCollapsed5] = useState(false)
  const [activeKey, setActiveKey] = useState('dashboard')

  return (
    <ComponentPageLayout
      title="Sidebar"
      description="Primary navigation structure with collapsible sections, icon-only mode, and active accent bar."
      level="Organism"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        // ── Section 1: Default expanded ──────────────────────────────────────
        {
          title: 'Default expanded',
          description: '2 sections (Main + System), 4 + 3 items, active key on Dashboard.',
          preview: isKaayo ? (
            <PreviewShell>
              <KayoBrutalistSideNav
                sections={makeSection1()}
                activeKey="dashboard"
                onPress={setActiveKey}
                header={
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 16,
                      color: '#3b3d3f',
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                    }}
                  >
                    Kaayo Admin
                  </div>
                }
                footer={
                  <div
                    style={{
                      fontSize: 13,
                      color: '#6b7280',
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                    }}
                  >
                    Ram Kumar · Master
                  </div>
                }
              />
            </PreviewShell>
          ) : (
            <div className="rounded-lg border border-border bg-muted/30 p-6 text-center space-y-2">
              <p className="text-sm font-medium">Live example</p>
              <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                The left navigation of this documentation site is the Sidebar component using
                Lemniscate tokens. Switch the product pill above to Kaayo to see the Brutalist
                SideNav variants.
              </p>
            </div>
          ),
          code: {
            react: isKaayo
              ? `<KayoBrutalistSideNav
  sections={[
    {
      label: 'Main',
      items: [
        { key:'dashboard',  label:'Dashboard',  icon:<LayoutDashboard size={18}/> },
        { key:'students',   label:'Students',   icon:<Users size={18}/> },
        { key:'attendance', label:'Attendance', icon:<ClipboardList size={18}/> },
        { key:'payments',   label:'Payments',   icon:<CreditCard size={18}/> },
      ],
    },
    {
      label: 'System',
      items: [
        { key:'reports',  label:'Reports',  icon:<FileText size={18}/> },
        { key:'alerts',   label:'Alerts',   icon:<Bell size={18}/> },
        { key:'settings', label:'Settings', icon:<Settings size={18}/> },
      ],
    },
  ]}
  activeKey="dashboard"
  onPress={(key) => setActiveKey(key)}
  header={<div style={{ fontWeight:700, fontSize:16 }}>Kaayo Admin</div>}
  footer={<div style={{ fontSize:13, color:'#6b7280' }}>Ram Kumar · Master</div>}
/>`
              : `// Lemniscate / Aumraa — uses shadcn sidebar primitives
import { Sidebar, SidebarContent, SidebarGroup,
  SidebarGroupLabel, SidebarMenuItem, SidebarMenuButton
} from '@aumraa/breathe/components/ui/sidebar'

<Sidebar>
  <SidebarContent>
    <SidebarGroup>
      <SidebarGroupLabel>Foundations</SidebarGroupLabel>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <a href="/foundations/colors">Colors</a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarGroup>
  </SidebarContent>
</Sidebar>`,
          },
        },

        // ── Section 2: Active — mid-section item ─────────────────────────────
        {
          title: 'Active: mid-section item',
          description: 'Accent bar visible on Attendance — demonstrating active state on a non-first item.',
          preview: isKaayo ? (
            <PreviewShell>
              <KayoBrutalistSideNav
                sections={makeSection1()}
                activeKey="attendance"
                onPress={setActiveKey}
                header={
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 16,
                      color: '#3b3d3f',
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                    }}
                  >
                    Kaayo Admin
                  </div>
                }
              />
            </PreviewShell>
          ) : (
            <div className="rounded-lg border border-border bg-muted/30 p-4 text-center">
              <p className="text-xs text-muted-foreground">Switch to Kaayo to preview</p>
            </div>
          ),
          code: {
            react: `<KayoBrutalistSideNav
  sections={sections}
  activeKey="attendance"
  onPress={setActiveKey}
/>`,
          },
        },

        // ── Section 3: With badges ────────────────────────────────────────────
        {
          title: 'With badges',
          description: 'Payments has badge:3, Alerts has badge:12 (displayed as 9+).',
          preview: isKaayo ? (
            <PreviewShell>
              <KayoBrutalistSideNav
                sections={makeSection3()}
                activeKey="dashboard"
                onPress={setActiveKey}
                header={
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 16,
                      color: '#3b3d3f',
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                    }}
                  >
                    Kaayo Admin
                  </div>
                }
              />
            </PreviewShell>
          ) : (
            <div className="rounded-lg border border-border bg-muted/30 p-4 text-center">
              <p className="text-xs text-muted-foreground">Switch to Kaayo to preview</p>
            </div>
          ),
          code: {
            react: `{ key:'payments', label:'Payments', icon:<CreditCard size={18}/>, badge:3 },
{ key:'alerts',   label:'Alerts',   icon:<Bell size={18}/>,     badge:12 },`,
          },
        },

        // ── Section 4: Collapsed (icon-only) ─────────────────────────────────
        {
          title: 'Collapsed (icon-only)',
          description: 'collapsed={true} — 56 px wide, icons only. Hover title tooltip visible.',
          preview: isKaayo ? (
            <PreviewShell>
              <KayoBrutalistSideNav
                sections={makeSection1()}
                activeKey="dashboard"
                onPress={setActiveKey}
                collapsed={true}
              />
            </PreviewShell>
          ) : (
            <div className="rounded-lg border border-border bg-muted/30 p-4 text-center">
              <p className="text-xs text-muted-foreground">Switch to Kaayo to preview</p>
            </div>
          ),
          code: {
            react: `<KayoBrutalistSideNav
  sections={sections}
  activeKey="dashboard"
  collapsed={true}
/>`,
          },
        },

        // ── Section 5: Collapse toggle ────────────────────────────────────────
        {
          title: 'Collapse toggle',
          description: 'Interactive — click the ‹ / › button on the sidebar edge to collapse or expand.',
          preview: isKaayo ? (
            <PreviewShell>
              <KayoBrutalistSideNav
                sections={makeSection1()}
                activeKey={activeKey}
                onPress={setActiveKey}
                collapsed={collapsed5}
                onCollapsedChange={setCollapsed5}
                header={
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 16,
                      color: '#3b3d3f',
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                    }}
                  >
                    Kaayo Admin
                  </div>
                }
              />
            </PreviewShell>
          ) : (
            <div className="rounded-lg border border-border bg-muted/30 p-4 text-center">
              <p className="text-xs text-muted-foreground">Switch to Kaayo to preview</p>
            </div>
          ),
          code: {
            react: `const [collapsed, setCollapsed] = useState(false)

<KayoBrutalistSideNav
  sections={sections}
  activeKey={activeKey}
  onPress={setActiveKey}
  collapsed={collapsed}
  onCollapsedChange={setCollapsed}
/>`,
          },
        },

        // ── Section 6: Collapsible sections ──────────────────────────────────
        {
          title: 'Collapsible sections',
          description: 'Both sections have collapsible:true — click a section header to open or close it.',
          preview: isKaayo ? (
            <PreviewShell>
              <KayoBrutalistSideNav
                sections={makeSection6()}
                activeKey="dashboard"
                onPress={setActiveKey}
                header={
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 16,
                      color: '#3b3d3f',
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                    }}
                  >
                    Kaayo Admin
                  </div>
                }
              />
            </PreviewShell>
          ) : (
            <div className="rounded-lg border border-border bg-muted/30 p-4 text-center">
              <p className="text-xs text-muted-foreground">Switch to Kaayo to preview</p>
            </div>
          ),
          code: {
            react: `{
  label: 'Main',
  collapsible: true,
  items: [...],
},
{
  label: 'System',
  collapsible: true,
  items: [...],
}`,
          },
        },

        // ── Section 7: One section closed ─────────────────────────────────────
        {
          title: 'One section closed',
          description: 'Section 2 starts closed via defaultOpen:false. Click System to reveal items.',
          preview: isKaayo ? (
            <PreviewShell>
              <KayoBrutalistSideNav
                sections={makeSection7()}
                activeKey="dashboard"
                onPress={setActiveKey}
                header={
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 16,
                      color: '#3b3d3f',
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                    }}
                  >
                    Kaayo Admin
                  </div>
                }
              />
            </PreviewShell>
          ) : (
            <div className="rounded-lg border border-border bg-muted/30 p-4 text-center">
              <p className="text-xs text-muted-foreground">Switch to Kaayo to preview</p>
            </div>
          ),
          code: {
            react: `{
  label: 'System',
  collapsible: true,
  defaultOpen: false,
  items: [...],
}`,
          },
        },

        // ── Section 8: No section labels ──────────────────────────────────────
        {
          title: 'No section labels',
          description: 'All items live in a single unlabelled section — label is undefined.',
          preview: isKaayo ? (
            <PreviewShell>
              <KayoBrutalistSideNav
                sections={makeSection8()}
                activeKey="dashboard"
                onPress={setActiveKey}
              />
            </PreviewShell>
          ) : (
            <div className="rounded-lg border border-border bg-muted/30 p-4 text-center">
              <p className="text-xs text-muted-foreground">Switch to Kaayo to preview</p>
            </div>
          ),
          code: {
            react: `<KayoBrutalistSideNav
  sections={[
    {
      // no label
      items: [...allItems],
    },
  ]}
  activeKey="dashboard"
/>`,
          },
        },

        // ── Section 9: Disabled items ─────────────────────────────────────────
        {
          title: 'With disabled items',
          description: 'Students and Settings are disabled — muted, not-allowed cursor, click is suppressed.',
          preview: isKaayo ? (
            <PreviewShell>
              <KayoBrutalistSideNav
                sections={makeSection9()}
                activeKey="dashboard"
                onPress={setActiveKey}
                header={
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 16,
                      color: '#3b3d3f',
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                    }}
                  >
                    Kaayo Admin
                  </div>
                }
              />
            </PreviewShell>
          ) : (
            <div className="rounded-lg border border-border bg-muted/30 p-4 text-center">
              <p className="text-xs text-muted-foreground">Switch to Kaayo to preview</p>
            </div>
          ),
          code: {
            react: `{ key:'students', label:'Students', icon:<Users size={18}/>, disabled:true },
{ key:'settings', label:'Settings', icon:<Settings size={18}/>, disabled:true },`,
          },
        },

        // ── Section 10: No header / footer ────────────────────────────────────
        {
          title: 'No header / footer',
          description: 'Bare nav — no header or footer props passed. Content starts at the top edge.',
          preview: isKaayo ? (
            <PreviewShell>
              <KayoBrutalistSideNav
                sections={makeSection1()}
                activeKey="dashboard"
                onPress={setActiveKey}
              />
            </PreviewShell>
          ) : (
            <div className="rounded-lg border border-border bg-muted/30 p-4 text-center">
              <p className="text-xs text-muted-foreground">Switch to Kaayo to preview</p>
            </div>
          ),
          code: {
            react: `<KayoBrutalistSideNav
  sections={sections}
  activeKey="dashboard"
  onPress={setActiveKey}
  // no header or footer
/>`,
          },
        },

        // ── Section 11: Custom header (logo) ──────────────────────────────────
        {
          title: 'Custom header (logo)',
          description: 'header prop renders a branded wordmark in Kaayo red.',
          preview: isKaayo ? (
            <PreviewShell>
              <KayoBrutalistSideNav
                sections={makeSection1()}
                activeKey="dashboard"
                onPress={setActiveKey}
                header={
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 18,
                      color: '#970103',
                      letterSpacing: '-0.02em',
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                    }}
                  >
                    KAAYO
                  </div>
                }
              />
            </PreviewShell>
          ) : (
            <div className="rounded-lg border border-border bg-muted/30 p-4 text-center">
              <p className="text-xs text-muted-foreground">Switch to Kaayo to preview</p>
            </div>
          ),
          code: {
            react: `header={
  <div style={{
    fontWeight: 700,
    fontSize: 18,
    color: '#970103',
    letterSpacing: '-0.02em',
    fontFamily: "'DM Sans', system-ui, sans-serif",
  }}>
    KAAYO
  </div>
}`,
          },
        },

        // ── Section 12: Custom footer (user chip) ─────────────────────────────
        {
          title: 'Custom footer (user chip)',
          description: 'footer renders an avatar circle with name and role badge.',
          preview: isKaayo ? (
            <PreviewShell>
              <KayoBrutalistSideNav
                sections={makeSection1()}
                activeKey="dashboard"
                onPress={setActiveKey}
                header={
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 16,
                      color: '#3b3d3f',
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                    }}
                  >
                    Kaayo Admin
                  </div>
                }
                footer={
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        backgroundColor: '#970103',
                        border: '2px solid #3b3d3f',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: 12,
                      }}
                    >
                      RK
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#3b3d3f' }}>
                        Ram Kumar
                      </div>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          color: '#970103',
                          backgroundColor: '#fff0f0',
                          border: '1px solid #fca5a5',
                          borderRadius: 4,
                          padding: '1px 6px',
                        }}
                      >
                        Master
                      </span>
                    </div>
                  </div>
                }
              />
            </PreviewShell>
          ) : (
            <div className="rounded-lg border border-border bg-muted/30 p-4 text-center">
              <p className="text-xs text-muted-foreground">Switch to Kaayo to preview</p>
            </div>
          ),
          code: {
            react: `footer={
  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
    <div style={{
      width:32, height:32, borderRadius:'50%',
      backgroundColor:'#970103', border:'2px solid #3b3d3f',
      display:'flex', alignItems:'center', justifyContent:'center',
      color:'#fff', fontWeight:700, fontSize:12,
    }}>RK</div>
    <div>
      <div style={{ fontSize:13, fontWeight:600, color:'#3b3d3f' }}>Ram Kumar</div>
      <span style={{
        fontSize:10, fontWeight:600, color:'#970103',
        backgroundColor:'#fff0f0', border:'1px solid #fca5a5',
        borderRadius:4, padding:'1px 6px',
      }}>Master</span>
    </div>
  </div>
}`,
          },
        },
      ]}
    />
  )
}
