import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/atoms/form-elements/select'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistSelect } from '@/app/components/custom/kaayo/KayoBrutalistSelect'

export function DropdownPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  return (
    <ComponentPageLayout
      title="Dropdown"
      description="Dropdown for choosing one option from a list. Use when there are 5+ options — for fewer, consider Radio."
      level="Atom"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Default',
          preview: isKaayo ? (
            <div className="w-56">
              <KayoBrutalistSelect
                label="Subject"
                placeholder="Select a subject"
                options={[
                  { value: 'math', label: 'Mathematics' },
                  { value: 'science', label: 'Science' },
                  { value: 'english', label: 'English' },
                ]}
              />
            </div>
          ) : (
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
            reactNative: `import { Select } from '@kaayo/components/atoms/Select'

<Select
  label="Subject"
  placeholder="Select a subject"
  value={selected}
  onChange={setSelected}
  options={[
    { value: 'math',    label: 'Mathematics' },
    { value: 'science', label: 'Science' },
    { value: 'english', label: 'English' },
  ]}
/>

// Token reference:
// Trigger: minHeight 48, borderWidth kayoBorder.width (2), borderRadius kayoRadius.md (8)
// Border default: theme.border.strong (#3b3d3f)
// Border open/focused: theme.border.focus = theme.brand.primary (#970103)
// Dropdown shadow: kayoShadow.md → '4px 4px 0 #191b1f'`,
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
            tailwind: `<select class="w-48 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-900">
  <option value="" disabled selected>Select a fruit</option>
  <option value="apple">Apple</option>
  <option value="banana">Banana</option>
  <option value="mango">Mango</option>
</select>`,
          },
        },
        {
          title: 'Disabled',
          preview: isKaayo ? (
            <div className="w-56">
              <KayoBrutalistSelect
                label="Subject"
                placeholder="Not available"
                options={[]}
                disabled
              />
            </div>
          ) : (
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
            reactNative: `import { Select } from '@kaayo/components/atoms/Select'

<Select
  label="Subject"
  placeholder="Not available"
  value={null}
  onChange={() => {}}
  options={[]}
  disabled
/>

// disabled: backgroundColor = theme.surface.sunken (#f9fafb), opacity 0.6
// onPress is blocked internally`,
            ios: `Picker("Select a fruit", selection: .constant("apple")) {
    Text("Not available").tag("apple")
}
.disabled(true)`,
            android: `Button(onClick = {}, enabled = false) {
    Text("Not available")
}`,
            tailwind: `<select disabled class="w-48 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm opacity-50 cursor-not-allowed">
  <option>Not available</option>
</select>`,
          },
        },
        {
          title: 'Multi-select',
          description: 'Select multiple values from the list. Shows checkboxes per item and a Done button to confirm.',
          preview: (
            <div className="w-64">
              <KayoBrutalistSelect
                label="Filter by status"
                placeholder="Select statuses…"
                mode="multi"
                options={[
                  { value: 'paid',    label: 'Paid',    hint: 'Completed payments' },
                  { value: 'pending', label: 'Pending', hint: 'Awaiting payment' },
                  { value: 'overdue', label: 'Overdue', hint: 'Past due date' },
                ]}
              />
            </div>
          ),
          code: {
            react: `// Multi-select via Kaayo Select atom — no generic web equivalent`,
            reactNative: `import { Select } from '@kaayo/components/atoms/Select'

<Select
  label="Filter by status"
  placeholder="Select statuses…"
  value={selectedStatuses}
  onChange={setSelectedStatuses}
  options={[
    { value: 'paid',    label: 'Paid',    hint: 'Completed payments' },
    { value: 'pending', label: 'Pending', hint: 'Awaiting payment' },
    { value: 'overdue', label: 'Overdue', hint: 'Past due date' },
  ]}
  mode="multi"
/>

// mode="multi": value is string[], checkboxes per item, Done button at bottom
// mode="single" (default): value is string, radio dot per item, closes on select`,
          },
        },
      ]}
    />
  )
}
