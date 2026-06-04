import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Checkbox } from '@/app/components/ui/checkbox'
import { Label } from '@/app/components/ui/label'

export function CheckboxPage() {
  return (
    <ComponentPageLayout
      title="Checkbox"
      description="Boolean selection control. Use for independent options that don't affect each other."
      level="Atom"
      status="Stable"
      sections={[
        {
          title: 'Default',
          preview: (
            <div className="flex items-center gap-2">
              <Checkbox id="cb1" defaultChecked />
              <Label htmlFor="cb1">Accept terms and conditions</Label>
            </div>
          ),
          code: {
            react: `import { Checkbox } from '@breathe/ui'
import { Label } from '@breathe/ui'

<Checkbox id="terms" defaultChecked />
<Label htmlFor="terms">Accept terms and conditions</Label>`,
            reactNative: `import { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

function Checkbox({ checked, onChange, label }) {
  return (
    <TouchableOpacity
      onPress={() => onChange(!checked)}
      style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
      activeOpacity={0.7}
    >
      <View style={{
        width: 20, height: 20, borderRadius: 4, borderWidth: 2,
        borderColor: checked ? '#0D9488' : '#CBD5E1',
        backgroundColor: checked ? '#0D9488' : 'transparent',
        alignItems: 'center', justifyContent: 'center',
      }}>
        {checked && <MaterialIcons name="check" size={14} color="#fff" />}
      </View>
      <Text style={{ fontSize: 14, color: '#334155' }}>{label}</Text>
    </TouchableOpacity>
  )
}`,
            ios: `import SwiftUI

struct CheckboxView: View {
    @State private var isChecked = true

    var body: some View {
        Toggle(isOn: $isChecked) {
            Text("Accept terms and conditions")
        }
        .toggleStyle(CheckboxToggleStyle())
    }
}

struct CheckboxToggleStyle: ToggleStyle {
    func makeBody(configuration: Configuration) -> some View {
        Button {
            configuration.isOn.toggle()
        } label: {
            HStack(spacing: 8) {
                Image(systemName: configuration.isOn ? "checkmark.square.fill" : "square")
                    .foregroundColor(configuration.isOn ? .teal : .secondary)
                configuration.label
            }
        }
        .buttonStyle(.plain)
    }
}`,
            android: `// Jetpack Compose Checkbox
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun CheckboxDemo() {
    var checked by remember { mutableStateOf(true) }
    Row(verticalAlignment = Alignment.CenterVertically) {
        Checkbox(
            checked = checked,
            onCheckedChange = { checked = it }
        )
        Spacer(modifier = Modifier.width(8.dp))
        Text("Accept terms and conditions")
    }
}`,
            tailwind: `<!-- Checkbox and Label -->
<div class="flex items-center gap-2">
  <input type="checkbox" id="terms" class="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500" checked />
  <label htmlFor="terms" class="text-sm font-medium text-slate-700 dark:text-slate-300">Accept terms and conditions</label>
</div>`,
          },
        },
        {
          title: 'States',
          preview: (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Checkbox id="cb-checked" defaultChecked />
                <Label htmlFor="cb-checked">Checked</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="cb-unchecked" />
                <Label htmlFor="cb-unchecked">Unchecked</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="cb-disabled" disabled />
                <Label htmlFor="cb-disabled" className="text-muted-foreground">Disabled</Label>
              </div>
            </div>
          ),
          code: {
            react: `<Checkbox defaultChecked />   {/* checked */}
<Checkbox />               {/* unchecked */}
<Checkbox disabled />       {/* disabled */}`,
            reactNative: `// Disabled, checked, and unchecked examples in React Native
<View style={{ gap: 12 }}>
  <Checkbox checked={true} label="Checked" />
  <Checkbox checked={false} label="Unchecked" />
  <View style={{ opacity: 0.5 }}>
    <Checkbox checked={false} label="Disabled" />
  </View>
</View>`,
            ios: `// States in SwiftUI Toggle
VStack(alignment: .leading, spacing: 12) {
    Toggle("Checked", isOn: .constant(true)).toggleStyle(CheckboxToggleStyle())
    Toggle("Unchecked", isOn: .constant(false)).toggleStyle(CheckboxToggleStyle())
    Toggle("Disabled", isOn: .constant(false)).toggleStyle(CheckboxToggleStyle()).disabled(true)
}`,
            android: `// Checkbox states in Compose
Column {
    Checkbox(checked = true, onCheckedChange = {})
    Checkbox(checked = false, onCheckedChange = {})
    Checkbox(checked = true, onCheckedChange = {}, enabled = false)
}`,
            tailwind: `<!-- Checkbox States -->
<input type="checkbox" checked class="..." />
<input type="checkbox" class="..." />
<input type="checkbox" disabled class="... opacity-50 cursor-not-allowed" />`,
          },
        },
      ]}
    />
  )
}
