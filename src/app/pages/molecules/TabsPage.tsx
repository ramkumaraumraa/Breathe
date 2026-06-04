import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs'

export function TabsPage() {
  return (
    <ComponentPageLayout
      title="Tabs"
      description="Organises content into switchable panels. All tabs are visible at once — use when the user needs to compare or switch between views."
      level="Molecule"
      status="Stable"
      sections={[
        {
          title: 'Default',
          preview: (
            <Tabs defaultValue="overview" className="w-full max-w-sm">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-3 text-sm text-muted-foreground">Overview content here.</TabsContent>
              <TabsContent value="analytics" className="mt-3 text-sm text-muted-foreground">Analytics content here.</TabsContent>
              <TabsContent value="settings" className="mt-3 text-sm text-muted-foreground">Settings content here.</TabsContent>
            </Tabs>
          ),
          code: {
            react: `import { Tabs, TabsContent, TabsList, TabsTrigger } from '@breathe/ui'

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content here.</TabsContent>
  <TabsContent value="analytics">Analytics content here.</TabsContent>
  <TabsContent value="settings">Settings content here.</TabsContent>
</Tabs>`,
            reactNative: `import { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const tabs = [
  { id: 'overview', label: 'Overview', content: 'Overview content here.' },
  { id: 'analytics', label: 'Analytics', content: 'Analytics content here.' },
  { id: 'settings', label: 'Settings', content: 'Settings content here.' },
]

function LineTabs() {
  const [active, setActive] = useState('overview')
  return (
    <View>
      <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' }}>
        {tabs.map(tab => {
          const isActive = tab.id === active
          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setActive(tab.id)}
              style={{ paddingHorizontal: 16, paddingVertical: 10, borderBottomWidth: 2, borderBottomColor: isActive ? '#0D9488' : 'transparent' }}
            >
              <Text style={{ fontSize: 14, fontWeight: isActive ? '500' : '400', color: isActive ? '#0D9488' : '#64748B' }}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
      <View style={{ paddingTop: 16 }}>
        <Text style={{ fontSize: 14, color: '#64748B' }}>
          {tabs.find(t => t.id === active)?.content}
        </Text>
      </View>
    </View>
  )
}`,
            ios: `import SwiftUI

struct LineTabsView: View {
    @State private var selected = "overview"
    let tabs = [("overview", "Overview"), ("analytics", "Analytics"), ("settings", "Settings")]
    let content = ["overview": "Overview content here.", "analytics": "Analytics content here.", "settings": "Settings content here."]

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            HStack(spacing: 0) {
                ForEach(tabs, id: \\.0) { id, label in
                    Button {
                        withAnimation(.easeOut(duration: 0.15)) { selected = id }
                    } label: {
                        VStack(spacing: 0) {
                            Text(label).font(.subheadline).foregroundColor(selected == id ? .teal : .secondary).padding(.vertical, 10)
                            Rectangle().fill(selected == id ? Color.teal : Color.clear).frame(height: 2)
                        }
                    }
                }
            }
            Divider()
            Text(content[selected] ?? "").padding(.top, 16)
        }
    }
}`,
            android: `// Jetpack Compose Tabs
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier

@Composable
fun TabDemo() {
    var state by remember { mutableStateOf(0) }
    val titles = listOf("Overview", "Analytics", "Settings")
    Column {
        TabRow(selectedTabIndex = state) {
            titles.forEachIndexed { index, title ->
                Tab(selected = state == index, onClick = { state = index }, text = { Text(title) })
            }
        }
        Text(text = "Content for: ${titles[state]}", modifier = Modifier.fillMaxSize())
    }
}`,
            tailwind: `<!-- Custom Underline Tabs -->
<div class="border-b border-slate-200 dark:border-slate-800">
  <nav class="flex space-x-8" aria-label="Tabs">
    <button class="border-teal-500 text-teal-600 dark:text-teal-400 border-b-2 py-4 px-1 text-sm font-medium">Overview</button>
    <button class="border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 border-b-2 py-4 px-1 text-sm font-medium">Analytics</button>
    <button class="border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 border-b-2 py-4 px-1 text-sm font-medium">Settings</button>
  </nav>
</div>`,
          },
        },
      ]}
    />
  )
}
