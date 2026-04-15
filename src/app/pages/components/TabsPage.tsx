import { useState } from 'react';
import { PageHeader } from '../../components/shared/PageHeader';
import { ComponentPreview } from '../../components/shared/ComponentPreview';
import { PropsTable } from '../../components/shared/PropsTable';
import { CodeBlock } from '../../components/shared/CodeBlock';
import { PageNavigation } from '../../components/shared/PageNavigation';
import { BarChart2, Users, Settings, CreditCard } from 'lucide-react';
import { motion } from 'motion/react';

type TabsVariant = 'line' | 'pill' | 'card';

interface Tab { id: string; label: string; icon?: React.ReactNode; content?: React.ReactNode; badge?: string; }

function Tabs({ tabs, variant = 'line', defaultTab }: { tabs: Tab[]; variant?: TabsVariant; defaultTab?: string }) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);

  return (
    <div className="w-full">
      {/* Tab list */}
      <div className={`flex ${variant === 'line' ? 'border-b border-slate-200 dark:border-slate-800 gap-0' : 'gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/60'}`}
           role="tablist">
        {tabs.map(tab => {
          const isActive = tab.id === active;
          if (variant === 'line') {
            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                role="tab"
                aria-selected={isActive}
                className={`relative flex items-center gap-1.5 px-4 py-2.5 border-b-2 transition-colors ${isActive ? 'border-teal-500 text-teal-600 dark:text-teal-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'}`}
                style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: isActive ? 500 : 400, background: 'none', border: 'none', borderBottom: undefined, cursor: 'pointer' }}
              >
                <span className={`flex items-center gap-1.5 pb-2 border-b-2 transition-colors ${isActive ? 'border-teal-500' : 'border-transparent'}`}>
                  {tab.icon}
                  {tab.label}
                  {tab.badge && (
                    <span className="ml-1 px-1.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-400"
                          style={{ fontSize: '0.65rem', fontWeight: 600 }}>
                      {tab.badge}
                    </span>
                  )}
                </span>
              </button>
            );
          }
          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              role="tab"
              aria-selected={isActive}
              className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-lg flex-1 justify-center transition-all ${isActive ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
              style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: isActive ? 500 : 400, background: undefined, border: 'none', cursor: 'pointer' }}
            >
              {isActive && (
                <motion.div layoutId={`tab-bg-${variant}`} className="absolute inset-0 rounded-lg bg-white dark:bg-slate-700 shadow-sm" style={{ zIndex: -1 }} />
              )}
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      {tabs.find(t => t.id === active)?.content && (
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18 }}
          className="mt-4"
          role="tabpanel"
        >
          {tabs.find(t => t.id === active)?.content}
        </motion.div>
      )}
    </div>
  );
}

const basicTabs: Tab[] = [
  { id: 'overview', label: 'Overview', content: <p className="text-slate-500 dark:text-slate-400 m-0" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', lineHeight: 1.7 }}>This is the overview tab content. It gives a high-level summary of all metrics and recent activity.</p> },
  { id: 'analytics', label: 'Analytics', content: <p className="text-slate-500 dark:text-slate-400 m-0" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', lineHeight: 1.7 }}>Analytics data and charts would be displayed here, showing trends and performance over time.</p> },
  { id: 'settings', label: 'Settings', content: <p className="text-slate-500 dark:text-slate-400 m-0" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', lineHeight: 1.7 }}>Configure your preferences and account settings from this panel.</p> },
];

const iconTabs: Tab[] = [
  { id: 'metrics', label: 'Metrics', icon: <BarChart2 size={15} />, badge: '3', content: <p className="text-slate-500 dark:text-slate-400 m-0" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>Key metrics and KPIs overview.</p> },
  { id: 'team', label: 'Team', icon: <Users size={15} />, content: <p className="text-slate-500 dark:text-slate-400 m-0" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>Team members and roles management.</p> },
  { id: 'billing', label: 'Billing', icon: <CreditCard size={15} />, content: <p className="text-slate-500 dark:text-slate-400 m-0" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>Subscription and payment information.</p> },
  { id: 'config', label: 'Config', icon: <Settings size={15} />, content: <p className="text-slate-500 dark:text-slate-400 m-0" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>Advanced configuration options.</p> },
];

const tabsProps = [
  { name: 'tabs', type: 'Tab[]', required: true, description: 'Array of tab objects with id, label, and optional content.' },
  { name: 'variant', type: "'line' | 'pill'", default: "'line'", description: 'Visual style of the tab list.' },
  { name: 'defaultTab', type: 'string', description: 'ID of the tab selected by default.' },
  { name: 'onChange', type: '(id: string) => void', description: 'Callback when the active tab changes.' },
];

export function TabsPage() {
  return (
    <div className="max-w-3xl px-6 lg:px-10 py-10">
      <PageHeader
        title="Tabs"
        description="Tabs organize content into multiple sections on a single page. Users navigate between sections without leaving the page context."
        section="Components"
        badge="Stable"
      />

      <ComponentPreview
        title="Line Tabs"
        description="Default underline style — clean and minimal."
        code={`<Tabs tabs={[
  { id: 'overview', label: 'Overview', content: <p>Overview content</p> },
  { id: 'analytics', label: 'Analytics', content: <p>Analytics content</p> },
  { id: 'settings', label: 'Settings', content: <p>Settings content</p> },
]} />`}
        reactNativeCode={`import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const tabs = [
  { id: 'overview', label: 'Overview', content: 'High-level summary of metrics and activity.' },
  { id: 'analytics', label: 'Analytics', content: 'Analytics data and charts, showing trends.' },
  { id: 'settings', label: 'Settings', content: 'Configure your preferences and settings.' },
];

function LineTabs() {
  const [active, setActive] = useState('overview');
  return (
    <View>
      {/* Tab bar */}
      <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' }}>
        {tabs.map(tab => {
          const isActive = tab.id === active;
          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setActive(tab.id)}
              style={{
                paddingHorizontal: 16, paddingVertical: 10,
                borderBottomWidth: 2,
                borderBottomColor: isActive ? '#0D9488' : 'transparent',
              }}
            >
              <Text style={{
                fontSize: 14,
                fontWeight: isActive ? '500' : '400',
                color: isActive ? '#0D9488' : '#64748B',
              }}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {/* Content */}
      <View style={{ paddingTop: 16 }}>
        <Text style={{ fontSize: 14, color: '#64748B', lineHeight: 22 }}>
          {tabs.find(t => t.id === active)?.content}
        </Text>
      </View>
    </View>
  );
}`}
        androidCode={`<!-- TabLayout with ViewPager2 -->
<com.google.android.material.tabs.TabLayout
    android:id="@+id/tabLayout"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    app:tabIndicatorColor="@color/teal_600"
    app:tabSelectedTextColor="@color/teal_600"
    app:tabTextColor="@color/slate_500"
    app:tabIndicatorHeight="2dp"
    app:tabMode="fixed" />

<androidx.viewpager2.widget.ViewPager2
    android:id="@+id/viewPager"
    android:layout_width="match_parent"
    android:layout_height="0dp"
    android:layout_weight="1" />

// In Kotlin:
val tabLayout = view.findViewById<TabLayout>(R.id.tabLayout)
val viewPager = view.findViewById<ViewPager2>(R.id.viewPager)

viewPager.adapter = object : FragmentStateAdapter(this) {
    override fun getItemCount() = 3
    override fun createFragment(position: Int) = when (position) {
        0 -> OverviewFragment()
        1 -> AnalyticsFragment()
        else -> SettingsFragment()
    }
}

TabLayoutMediator(tabLayout, viewPager) { tab, position ->
    tab.text = listOf("Overview", "Analytics", "Settings")[position]
}.attach()`}
        iosCode={`import SwiftUI

struct LineTabsView: View {
    @State private var selected = "overview"

    let tabs = [("overview", "Overview"), ("analytics", "Analytics"), ("settings", "Settings")]
    let content = [
        "overview": "High-level summary of metrics and recent activity.",
        "analytics": "Analytics data and charts showing trends over time.",
        "settings": "Configure your preferences and account settings.",
    ]

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            // Tab bar
            HStack(spacing: 0) {
                ForEach(tabs, id: \\.0) { id, label in
                    Button {
                        withAnimation(.easeOut(duration: 0.15)) { selected = id }
                    } label: {
                        VStack(spacing: 0) {
                            Text(label)
                                .font(.subheadline)
                                .fontWeight(selected == id ? .medium : .regular)
                                .foregroundColor(selected == id ? .teal : .secondary)
                                .padding(.horizontal, 16)
                                .padding(.vertical, 10)
                            Rectangle()
                                .fill(selected == id ? Color.teal : Color.clear)
                                .frame(height: 2)
                        }
                    }
                    .buttonStyle(.plain)
                }
                Spacer()
            }
            Divider()

            // Content
            Text(content[selected] ?? "")
                .font(.subheadline).foregroundColor(.secondary)
                .padding(.top, 16)
        }
        .padding()
    }
}`}
        className="mb-5"
        previewClassName="block p-6"
      >
        <Tabs tabs={basicTabs} />
      </ComponentPreview>

      <ComponentPreview
        title="Pill Tabs"
        description="Segmented control style for compact tab groups."
        code={`<Tabs variant="pill" tabs={[...]} />`}
        reactNativeCode={`import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const tabs = [
  { id: 'overview', label: 'Overview', content: 'Overview content here.' },
  { id: 'analytics', label: 'Analytics', content: 'Analytics content here.' },
  { id: 'settings', label: 'Settings', content: 'Settings content here.' },
];

function PillTabs() {
  const [active, setActive] = useState('overview');
  return (
    <View>
      {/* Pill bar */}
      <View style={{ flexDirection: 'row', backgroundColor: '#F1F5F9',
                     borderRadius: 12, padding: 4 }}>
        {tabs.map(tab => {
          const isActive = tab.id === active;
          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setActive(tab.id)}
              style={{
                flex: 1, paddingVertical: 8, borderRadius: 10,
                backgroundColor: isActive ? '#fff' : 'transparent',
                alignItems: 'center',
                shadowColor: isActive ? '#000' : 'transparent',
                shadowOpacity: 0.05, shadowRadius: 2, elevation: isActive ? 2 : 0,
              }}
            >
              <Text style={{
                fontSize: 13, fontWeight: isActive ? '500' : '400',
                color: isActive ? '#0F172A' : '#64748B',
              }}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {/* Content */}
      <View style={{ paddingTop: 16 }}>
        <Text style={{ fontSize: 14, color: '#64748B' }}>
          {tabs.find(t => t.id === active)?.content}
        </Text>
      </View>
    </View>
  );
}

// Note: React Native has a built-in SegmentedControl on iOS
// import SegmentedControl from '@react-native-segmented-control/segmented-control';`}
        androidCode={`<!-- Use a ChipGroup as a segmented/pill tab control -->
<com.google.android.material.chip.ChipGroup
    android:id="@+id/chipGroup"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    app:singleSelection="true"
    app:selectionRequired="true">

    <com.google.android.material.chip.Chip
        android:id="@+id/chipOverview"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Overview"
        android:checkable="true"
        android:checked="true"
        style="@style/Widget.MaterialComponents.Chip.Choice" />

    <com.google.android.material.chip.Chip
        android:id="@+id/chipAnalytics"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Analytics"
        android:checkable="true"
        style="@style/Widget.MaterialComponents.Chip.Choice" />

    <com.google.android.material.chip.Chip
        android:id="@+id/chipSettings"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Settings"
        android:checkable="true"
        style="@style/Widget.MaterialComponents.Chip.Choice" />
</com.google.android.material.chip.ChipGroup>

// Kotlin — listen to selection:
chipGroup.setOnCheckedStateChangeListener { group, checkedIds ->
    when (checkedIds.firstOrNull()) {
        R.id.chipOverview  -> showOverview()
        R.id.chipAnalytics -> showAnalytics()
        R.id.chipSettings  -> showSettings()
    }
}`}
        iosCode={`import SwiftUI

struct PillTabsView: View {
    @State private var selected = "overview"

    let tabs = [("overview", "Overview"), ("analytics", "Analytics"), ("settings", "Settings")]

    var body: some View {
        VStack(spacing: 16) {
            // iOS-native Picker as segmented control
            Picker("", selection: $selected) {
                ForEach(tabs, id: \\.0) { id, label in
                    Text(label).tag(id)
                }
            }
            .pickerStyle(.segmented)

            // Content
            Text(tabContent(for: selected))
                .font(.subheadline).foregroundColor(.secondary)
                .frame(maxWidth: .infinity, alignment: .leading)
        }
        .padding()
    }

    func tabContent(for id: String) -> String {
        switch id {
        case "overview":  return "High-level summary of metrics and recent activity."
        case "analytics": return "Analytics data and charts showing trends over time."
        default:          return "Configure your preferences and account settings."
        }
    }
}`}
        className="mb-5"
        previewClassName="block p-6"
      >
        <Tabs tabs={basicTabs.map(t => ({ ...t, content: t.content }))} variant="pill" />
      </ComponentPreview>

      <ComponentPreview
        title="Tabs with Icons & Badges"
        description="Icons and notification counts for richer tab labels."
        code={`<Tabs tabs={[
  { id: 'metrics', label: 'Metrics', icon: <BarChart2 size={15} />, badge: '3' },
  { id: 'team', label: 'Team', icon: <Users size={15} /> },
  { id: 'billing', label: 'Billing', icon: <CreditCard size={15} /> },
]} />`}
        reactNativeCode={`import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BarChart2, Users, CreditCard, Settings } from 'lucide-react-native';

const tabs = [
  { id: 'metrics', label: 'Metrics', icon: BarChart2, badge: '3' },
  { id: 'team',    label: 'Team',    icon: Users },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'config',  label: 'Config',  icon: Settings },
];

function IconTabs() {
  const [active, setActive] = useState('metrics');
  return (
    <View style={{ borderBottomWidth: 1, borderBottomColor: '#E2E8F0' }}>
      <View style={{ flexDirection: 'row' }}>
        {tabs.map(tab => {
          const isActive = tab.id === active;
          const Icon = tab.icon;
          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setActive(tab.id)}
              style={{ paddingHorizontal: 14, paddingVertical: 10,
                       borderBottomWidth: 2, borderBottomColor: isActive ? '#0D9488' : 'transparent',
                       flexDirection: 'row', alignItems: 'center', gap: 6 }}
            >
              <Icon size={14} color={isActive ? '#0D9488' : '#64748B'} />
              <Text style={{ fontSize: 13, fontWeight: isActive ? '500' : '400',
                             color: isActive ? '#0D9488' : '#64748B' }}>
                {tab.label}
              </Text>
              {tab.badge && (
                <View style={{ backgroundColor: '#F0FDFA', borderRadius: 999, paddingHorizontal: 5, paddingVertical: 1 }}>
                  <Text style={{ fontSize: 10, fontWeight: '700', color: '#0D9488' }}>{tab.badge}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}`}
        androidCode={`<!-- TabLayout with icons -->
<com.google.android.material.tabs.TabLayout
    android:id="@+id/tabLayout"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    app:tabIndicatorColor="@color/teal_600"
    app:tabSelectedTextColor="@color/teal_600"
    app:tabTextColor="@color/slate_500"
    app:tabIconTint="@color/tab_icon_selector" />

// Kotlin — add icons and badges programmatically:
val icons = listOf(R.drawable.ic_chart, R.drawable.ic_people, R.drawable.ic_credit, R.drawable.ic_settings)
val labels = listOf("Metrics", "Team", "Billing", "Config")

labels.forEachIndexed { i, label ->
    tabLayout.addTab(
        tabLayout.newTab()
            .setText(label)
            .setIcon(icons[i])
    )
}

// Add badge to first tab:
val badge = tabLayout.getTabAt(0)?.orCreateBadge
badge?.number = 3
badge?.backgroundColor = ContextCompat.getColor(context, R.color.teal_500)`}
        iosCode={`import SwiftUI

struct IconTabsView: View {
    @State private var selected = "metrics"

    let tabs: [(String, String, String, String?)] = [
        ("metrics", "chart.bar.fill",   "Metrics", "3"),
        ("team",    "person.3.fill",    "Team",    nil),
        ("billing", "creditcard.fill",  "Billing", nil),
        ("config",  "gearshape.fill",   "Config",  nil),
    ]

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            HStack(spacing: 0) {
                ForEach(tabs, id: \\.0) { id, icon, label, badge in
                    Button {
                        withAnimation(.easeOut(duration: 0.15)) { selected = id }
                    } label: {
                        VStack(spacing: 0) {
                            HStack(spacing: 5) {
                                Image(systemName: icon)
                                    .font(.system(size: 12))
                                    .foregroundColor(selected == id ? .teal : .secondary)
                                Text(label)
                                    .font(.system(size: 13))
                                    .fontWeight(selected == id ? .medium : .regular)
                                    .foregroundColor(selected == id ? .teal : .secondary)
                                if let b = badge {
                                    Text(b)
                                        .font(.system(size: 9, weight: .bold))
                                        .foregroundColor(.teal)
                                        .padding(.horizontal, 5).padding(.vertical, 1)
                                        .background(Color.teal.opacity(0.1))
                                        .clipShape(Capsule())
                                }
                            }
                            .padding(.horizontal, 12).padding(.vertical, 10)
                            Rectangle()
                                .fill(selected == id ? Color.teal : Color.clear)
                                .frame(height: 2)
                        }
                    }
                    .buttonStyle(.plain)
                }
                Spacer()
            }
            Divider()
        }
        .padding()
    }
}`}
        className="mb-8"
        previewClassName="block p-6"
      >
        <Tabs tabs={iconTabs} />
      </ComponentPreview>

      <div className="mb-8">
        <h2 className="text-slate-900 dark:text-white mb-4 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>Import</h2>
        <CodeBlock code={`import { Tabs } from '@breathe-ui/core';`} language="tsx" />
      </div>

      <PropsTable props={tabsProps} />

      <PageNavigation />
    </div>
  );
}