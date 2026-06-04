import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select'

export function SelectPage() {
  return (
    <ComponentPageLayout
      title="Select"
      description="Dropdown for choosing one option from a list. Use when there are 5+ options — for fewer, consider Radio Group."
      level="Molecule"
      status="Stable"
      sections={[
        {
          title: 'Default',
          preview: (
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="mango">Mango</SelectItem>
              </SelectContent>
            </Select>
          ),
          code: {
            react: `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@breathe/ui'

<Select>
  <SelectTrigger className="w-48">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="mango">Mango</SelectItem>
  </SelectContent>
</Select>`,
            reactNative: `import { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

function Select({ label, options, selected, onSelect }) {
  const [open, setOpen] = useState(false)
  return (
    <View>
      {label && <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 6 }}>{label}</Text>}
      <TouchableOpacity onPress={() => setOpen(!open)} style={{ padding: 12, borderWidth: 1.5, borderColor: '#e2e8f0', borderRadius: 8, backgroundColor: '#fff' }}>
        <Text style={{ color: selected ? '#0f172a' : '#94a3b8' }}>{selected ? options.find(o => o.value === selected)?.label : 'Select option'}</Text>
      </TouchableOpacity>
    </View>
  )
}`,
            ios: `import SwiftUI

struct SelectView: View {
    @State private var selected = "apple"
    var body: some View {
        Picker("Select a fruit", selection: $selected) {
            Text("Apple").tag("apple")
            Text("Banana").tag("banana")
            Text("Mango").tag("mango")
        }
        .pickerStyle(.menu)
    }
}`,
            android: `// Spinner control in Android Compose
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier

@Composable
fun DropdownDemo() {
    var expanded by remember { mutableStateOf(false) }
    var selectedText by remember { mutableStateOf("Select a fruit") }

    Box {
        Button(onClick = { expanded = true }) { Text(selectedText) }
        DropdownMenu(expanded = expanded, onDismissRequest = { expanded = false }) {
            DropdownMenuItem(text = { Text("Apple") }, onClick = { selectedText = "Apple"; expanded = false })
            DropdownMenuItem(text = { Text("Banana") }, onClick = { selectedText = "Banana"; expanded = false })
        }
    }
}`,
            tailwind: `<!-- Custom Tailwind Select Dropdown -->
<select class="w-48 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-900">
  <option value="" disabled selected>Select a fruit</option>
  <option value="apple">Apple</option>
  <option value="banana">Banana</option>
  <option value="mango">Mango</option>
</select>`,
          },
        },
        {
          title: 'Disabled',
          preview: (
            <Select disabled>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Not available" />
              </SelectTrigger>
            </Select>
          ),
          code: {
            react: `<Select disabled>
  <SelectTrigger className="w-48">
    <SelectValue placeholder="Not available" />
  </SelectTrigger>
</Select>`,
            reactNative: `// Disabled Select input in React Native
<TouchableOpacity disabled style={{ padding: 12, borderWidth: 1.5, borderColor: '#e2e8f0', borderRadius: 8, backgroundColor: '#f1f5f9', opacity: 0.6 }}>
  <Text style={{ color: '#94a3b8' }}>Not available</Text>
</TouchableOpacity>`,
            ios: `// Disabled picker in SwiftUI
Picker("Select a fruit", selection: .constant("apple")) {
    Text("Not available").tag("apple")
}
.disabled(true)`,
            android: `// Disabled text button for menu in Compose
Button(onClick = {}, enabled = false) {
    Text("Not available")
}`,
            tailwind: `<!-- Disabled Dropdown -->
<select disabled class="w-48 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm opacity-50 cursor-not-allowed">
  <option>Not available</option>
</select>`,
          },
        },
      ]}
    />
  )
}
