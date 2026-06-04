import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Switch } from '@/app/components/ui/switch'
import { Label } from '@/app/components/ui/label'

export function SwitchPage() {
  return (
    <ComponentPageLayout
      title="Switch"
      description="Toggle control for binary settings that take immediate effect. Prefer Switch over Checkbox for settings that apply without a submit action."
      level="Atom"
      status="Stable"
      sections={[
        {
          title: 'Default',
          preview: (
            <div className="flex items-center gap-3">
              <Switch id="sw1" defaultChecked />
              <Label htmlFor="sw1">Enable notifications</Label>
            </div>
          ),
          code: {
            react: `import { Switch } from '@breathe/ui'
import { Label } from '@breathe/ui'

<Switch id="notifications" defaultChecked />
<Label htmlFor="notifications">Enable notifications</Label>`,
            reactNative: `import { useState } from 'react'
import { View, Text, Switch } from 'react-native'

function SwitchDemo() {
  const [enabled, setEnabled] = useState(true)
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <Switch
        value={enabled}
        onValueChange={setEnabled}
        trackColor={{ false: '#CBD5E1', true: '#0D9488' }}
        thumbColor="#ffffff"
        ios_backgroundColor="#CBD5E1"
      />
      <Text style={{ fontSize: 14, color: '#64748B' }}>Enable notifications</Text>
    </View>
  )
}`,
            ios: `import SwiftUI

struct BasicSwitchView: View {
    @State private var enabled = true

    var body: some View {
        Toggle("Enable notifications", isOn: $enabled)
            .tint(.teal)
    }
}`,
            android: `// Jetpack Compose Switch
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun SwitchDemo() {
    var checked by remember { mutableStateOf(true) }
    Row(verticalAlignment = Alignment.CenterVertically) {
        Switch(
            checked = checked,
            onCheckedChange = { checked = it }
        )
        Spacer(modifier = Modifier.width(8.dp))
        Text("Enable notifications")
    }
}`,
            tailwind: `<!-- Switch -->
<div class="flex items-center gap-3">
  <button type="button" class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-teal-600 transition-colors duration-200 ease-in-out focus:outline-none" role="switch" aria-checked="true">
    <span class="pointer-events-none inline-block h-5 w-5 translate-x-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
  </button>
  <label class="text-sm font-medium text-slate-700 dark:text-slate-300">Enable notifications</label>
</div>`,
          },
        },
        {
          title: 'States',
          preview: (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Switch defaultChecked />
                <span className="text-sm">On</span>
              </div>
              <div className="flex items-center gap-3">
                <Switch />
                <span className="text-sm">Off</span>
              </div>
              <div className="flex items-center gap-3">
                <Switch disabled />
                <span className="text-sm text-muted-foreground">Disabled</span>
              </div>
            </div>
          ),
          code: {
            react: `<Switch defaultChecked />  {/* on */}
<Switch />               {/* off */}
<Switch disabled />       {/* disabled */}`,
            reactNative: `// Switch States in React Native
<Switch value={true} trackColor={{ false: '#CBD5E1', true: '#0D9488' }} />
<Switch value={false} trackColor={{ false: '#CBD5E1', true: '#0D9488' }} />
<View pointerEvents="none" style={{ opacity: 0.5 }}>
  <Switch value={false} />
</View>`,
            ios: `// Switch States in SwiftUI Toggle
VStack(alignment: .leading, spacing: 12) {
    Toggle("On", isOn: .constant(true)).tint(.teal)
    Toggle("Off", isOn: .constant(false)).tint(.teal)
    Toggle("Disabled", isOn: .constant(false)).disabled(true)
}`,
            android: `// Switch States in Compose
Column {
    Switch(checked = true, onCheckedChange = {})
    Switch(checked = false, onCheckedChange = {})
    Switch(checked = false, onCheckedChange = {}, enabled = false)
}`,
            tailwind: `<!-- Switch States -->
<!-- On -->
<button class="bg-teal-600 ..."><span class="translate-x-5 ..."></span></button>
<!-- Off -->
<button class="bg-slate-200 ..."><span class="translate-x-0 ..."></span></button>
<!-- Disabled -->
<button disabled class="opacity-50 cursor-not-allowed bg-slate-200 ..."></button>`,
          },
        },
      ]}
    />
  )
}
