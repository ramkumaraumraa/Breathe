import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs'
import { BarChart2, Settings, Eye, Bell, Users, FileText } from 'lucide-react'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistTabs } from '@/app/components/custom/kaayo/KayoBrutalistTabs'

export function TabsPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  return (
    <ComponentPageLayout
      title="Tabs"
      description="Organises content into switchable panels. All tabs are visible at once — use when the user needs to compare or switch between views."
      level="Molecule"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Default',
          description: '3 tabs, md size. Active tab fills with crimson; inactive is transparent.',
          preview: isKaayo ? (
            <KayoBrutalistTabs
              tabs={[
                { value: 'overview',  label: 'Overview',  content: <p>Overview content — student attendance and upcoming classes.</p> },
                { value: 'analytics', label: 'Analytics', content: <p>Analytics content — fee collection trends and batch performance.</p> },
                { value: 'settings',  label: 'Settings',  content: <p>Settings content — batch schedule, notifications, and permissions.</p> },
              ]}
              defaultValue="overview"
            />
          ) : (
            <Tabs defaultValue="overview" className="w-full max-w-sm">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="overview"  className="mt-3 text-sm text-muted-foreground">Overview content here.</TabsContent>
              <TabsContent value="analytics" className="mt-3 text-sm text-muted-foreground">Analytics content here.</TabsContent>
              <TabsContent value="settings"  className="mt-3 text-sm text-muted-foreground">Settings content here.</TabsContent>
            </Tabs>
          ),
          code: {
            react: `import { KayoBrutalistTabs } from '@breathe/kaayo'

<KayoBrutalistTabs
  tabs={[
    { value: 'overview',  label: 'Overview',  content: <p>Overview content.</p> },
    { value: 'analytics', label: 'Analytics', content: <p>Analytics content.</p> },
    { value: 'settings',  label: 'Settings',  content: <p>Settings content.</p> },
  ]}
  defaultValue="overview"
/>`,
            reactNative: `import { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

function KayoTabs({ tabs, renderContent }) {
  const [active, setActive] = useState(tabs[0].id)
  return (
    <View>
      <View style={{ flexDirection: 'row', borderWidth: 2, borderColor: '#3b3d3f',
        borderRadius: 6, overflow: 'hidden', shadowColor: '#191b1f',
        shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1, shadowRadius: 0 }}>
        {tabs.map((tab, i) => {
          const isActive = tab.id === active
          return (
            <TouchableOpacity key={tab.id} onPress={() => setActive(tab.id)}
              style={{ flex: 1, paddingVertical: 8, paddingHorizontal: 14, alignItems: 'center',
                backgroundColor: isActive ? '#970103' : 'transparent',
                borderRightWidth: i < tabs.length - 1 ? 2 : 0, borderRightColor: '#3b3d3f' }}>
              <Text style={{ fontSize: 14, fontWeight: isActive ? '600' : '400',
                color: isActive ? '#fff' : '#3b3d3f', fontFamily: 'DMSans-Medium' }}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
      <View style={{ paddingTop: 16 }}>{renderContent(active)}</View>
    </View>
  )
}`,
          },
        },
        {
          title: 'With Icons',
          description: 'Tab triggers include a Lucide icon before the label.',
          preview: isKaayo ? (
            <KayoBrutalistTabs
              tabs={[
                { value: 'overview',  label: 'Overview',  icon: <Eye size={15} />,      content: <p>Overview content.</p> },
                { value: 'analytics', label: 'Analytics', icon: <BarChart2 size={15} />, content: <p>Analytics content.</p> },
                { value: 'settings',  label: 'Settings',  icon: <Settings size={15} />,  content: <p>Settings content.</p> },
              ]}
            />
          ) : (
            <Tabs defaultValue="overview" className="w-full max-w-sm">
              <TabsList>
                <TabsTrigger value="overview"  className="gap-1.5"><Eye className="h-3.5 w-3.5" />Overview</TabsTrigger>
                <TabsTrigger value="analytics" className="gap-1.5"><BarChart2 className="h-3.5 w-3.5" />Analytics</TabsTrigger>
                <TabsTrigger value="settings"  className="gap-1.5"><Settings className="h-3.5 w-3.5" />Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="overview"  className="mt-3 text-sm text-muted-foreground">Overview.</TabsContent>
              <TabsContent value="analytics" className="mt-3 text-sm text-muted-foreground">Analytics.</TabsContent>
              <TabsContent value="settings"  className="mt-3 text-sm text-muted-foreground">Settings.</TabsContent>
            </Tabs>
          ),
          code: {
            react: `import { Eye, BarChart2, Settings } from 'lucide-react'

<KayoBrutalistTabs
  tabs={[
    { value: 'overview',  label: 'Overview',  icon: <Eye size={15} />,      content: <p>...</p> },
    { value: 'analytics', label: 'Analytics', icon: <BarChart2 size={15} />, content: <p>...</p> },
    { value: 'settings',  label: 'Settings',  icon: <Settings size={15} />,  content: <p>...</p> },
  ]}
/>`,
          },
        },
        {
          title: 'With Badge Count',
          description: 'Numeric badge on a tab — use for unread counts or pending actions.',
          preview: isKaayo ? (
            <KayoBrutalistTabs
              tabs={[
                { value: 'students', label: 'Students',             content: <p>Student list.</p> },
                { value: 'alerts',   label: 'Alerts',   badge: 4,  content: <p>4 unread alerts.</p> },
                { value: 'messages', label: 'Messages', badge: 12, content: <p>12 unread messages.</p> },
              ]}
              defaultValue="students"
            />
          ) : (
            <Tabs defaultValue="students" className="w-full max-w-sm">
              <TabsList>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="alerts">Alerts <span className="ml-1 rounded-full bg-red-100 px-1.5 text-xs text-red-600">4</span></TabsTrigger>
                <TabsTrigger value="messages">Messages <span className="ml-1 rounded-full bg-slate-100 px-1.5 text-xs">12</span></TabsTrigger>
              </TabsList>
              <TabsContent value="students"  className="mt-3 text-sm text-muted-foreground">Student list.</TabsContent>
              <TabsContent value="alerts"    className="mt-3 text-sm text-muted-foreground">4 unread alerts.</TabsContent>
              <TabsContent value="messages"  className="mt-3 text-sm text-muted-foreground">12 unread messages.</TabsContent>
            </Tabs>
          ),
          code: {
            react: `<KayoBrutalistTabs
  tabs={[
    { value: 'students', label: 'Students',                 content: <p>...</p> },
    { value: 'alerts',   label: 'Alerts',   badge: 4,  content: <p>...</p> },
    { value: 'messages', label: 'Messages', badge: 12, content: <p>...</p> },
  ]}
/>`,
          },
        },
        {
          title: 'Sizes',
          description: 'sm / md / lg — controls font size and hit area.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {(['sm', 'md', 'lg'] as const).map(size => (
                <div key={size}>
                  <div style={{
                    fontSize: '11px', color: '#6b7280', marginBottom: '6px',
                    fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em',
                  }}>
                    {size}
                  </div>
                  <KayoBrutalistTabs
                    size={size}
                    tabs={[
                      { value: 'a', label: 'Overview',  content: <p>Overview.</p> },
                      { value: 'b', label: 'Analytics', content: <p>Analytics.</p> },
                    ]}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Tabs defaultValue="a"><TabsList><TabsTrigger value="a" className="text-xs">Overview</TabsTrigger><TabsTrigger value="b" className="text-xs">Analytics</TabsTrigger></TabsList></Tabs>
              <Tabs defaultValue="a"><TabsList><TabsTrigger value="a">Overview</TabsTrigger><TabsTrigger value="b">Analytics</TabsTrigger></TabsList></Tabs>
              <Tabs defaultValue="a"><TabsList><TabsTrigger value="a" className="text-base">Overview</TabsTrigger><TabsTrigger value="b" className="text-base">Analytics</TabsTrigger></TabsList></Tabs>
            </div>
          ),
          code: {
            react: `<KayoBrutalistTabs size="sm" tabs={[...]} />
<KayoBrutalistTabs size="md" tabs={[...]} />  {/* default */}
<KayoBrutalistTabs size="lg" tabs={[...]} />`,
          },
        },
        {
          title: 'Full Width',
          description: 'Tabs expand to fill container width equally.',
          preview: isKaayo ? (
            <div style={{ width: '100%', maxWidth: '480px' }}>
              <KayoBrutalistTabs
                fullWidth
                tabs={[
                  { value: 'students', label: 'Students', icon: <Users size={14} />,    content: <p>All students in this batch.</p> },
                  { value: 'sessions', label: 'Sessions', icon: <FileText size={14} />, content: <p>Past and upcoming sessions.</p> },
                  { value: 'alerts',   label: 'Alerts',   icon: <Bell size={14} />,     content: <p>Attendance and payment alerts.</p> },
                ]}
              />
            </div>
          ) : (
            <Tabs defaultValue="students" className="w-full max-w-lg">
              <TabsList className="w-full">
                <TabsTrigger value="students" className="flex-1">Students</TabsTrigger>
                <TabsTrigger value="sessions" className="flex-1">Sessions</TabsTrigger>
                <TabsTrigger value="alerts"   className="flex-1">Alerts</TabsTrigger>
              </TabsList>
              <TabsContent value="students"  className="mt-3 text-sm text-muted-foreground">All students.</TabsContent>
              <TabsContent value="sessions"  className="mt-3 text-sm text-muted-foreground">Sessions.</TabsContent>
              <TabsContent value="alerts"    className="mt-3 text-sm text-muted-foreground">Alerts.</TabsContent>
            </Tabs>
          ),
          code: {
            react: `<KayoBrutalistTabs fullWidth tabs={[...]} />`,
          },
        },
        {
          title: 'With Disabled Tab',
          description: 'Disabled tabs are visually muted and non-interactive.',
          preview: isKaayo ? (
            <KayoBrutalistTabs
              tabs={[
                { value: 'active',   label: 'Active',   content: <p>Active batch students.</p> },
                { value: 'archived', label: 'Archived', disabled: true, content: <p>Archived content.</p> },
                { value: 'reports',  label: 'Reports',  content: <p>Batch reports.</p> },
              ]}
              defaultValue="active"
            />
          ) : (
            <Tabs defaultValue="active" className="w-full max-w-sm">
              <TabsList>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="archived" disabled>Archived</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
              <TabsContent value="active"   className="mt-3 text-sm text-muted-foreground">Active batch students.</TabsContent>
              <TabsContent value="archived" className="mt-3 text-sm text-muted-foreground">Archived.</TabsContent>
              <TabsContent value="reports"  className="mt-3 text-sm text-muted-foreground">Reports.</TabsContent>
            </Tabs>
          ),
          code: {
            react: `<KayoBrutalistTabs
  tabs={[
    { value: 'active',   label: 'Active',   content: <p>...</p> },
    { value: 'archived', label: 'Archived', disabled: true, content: <p>...</p> },
    { value: 'reports',  label: 'Reports',  content: <p>...</p> },
  ]}
/>`,
          },
        },
      ]}
    />
  )
}
