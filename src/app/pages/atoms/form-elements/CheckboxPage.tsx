import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Checkbox } from '@/app/components/ui/checkbox'
import { Label } from '@/app/components/ui/label'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistCheckbox } from '@/app/components/custom/kaayo/KayoBrutalistCheckbox'

export function CheckboxPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  return (
    <ComponentPageLayout
      title="Checkbox"
      description="Boolean selection control. Use for independent options that don't affect each other."
      level="Atom"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Default',
          preview: isKaayo ? (
            <KayoBrutalistCheckbox defaultChecked label="Accept terms and conditions" />
          ) : (
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
            reactNative: {
              kaayo: `import { Checkbox } from '@kaayo/components/atoms/Checkbox'

<Checkbox
  checked={accepted}
  onChange={setAccepted}
  label="Accept terms and conditions"
/>

// Token reference:
// Unchecked: bg = theme.surface.card (#fff), border = theme.border.strong (#3b3d3f)
// Checked:   bg = theme.brand.primary (#970103), border = theme.brand.primary
// Box:       20×20, borderRadius: kayoRadius.sm (4)
// Check icon: lucide Check size 12, strokeWidth 3, color theme.text.onPrimary (#fff)`,
              lemniscate: `import { Checkbox } from '@lemniscate/components/atoms/Checkbox'

<Checkbox checked={accepted} onChange={setAccepted} label="Accept terms and conditions" />`,
            },
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
            tailwind: `<div class="flex items-center gap-2">
  <input type="checkbox" id="terms" class="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500" checked />
  <label htmlFor="terms" class="text-sm font-medium text-slate-700 dark:text-slate-300">Accept terms and conditions</label>
</div>`,
          },
        },
        {
          title: 'States',
          preview: isKaayo ? (
            <div className="space-y-3">
              <KayoBrutalistCheckbox defaultChecked label="Checked" />
              <KayoBrutalistCheckbox label="Unchecked" />
              <KayoBrutalistCheckbox label="Disabled" disabled />
            </div>
          ) : (
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
            reactNative: {
              kaayo: `import { Checkbox } from '@kaayo/components/atoms/Checkbox'

<Checkbox checked={true}  onChange={() => {}} label="Checked"   />
<Checkbox checked={false} onChange={() => {}} label="Unchecked" />
<Checkbox checked={false} onChange={() => {}} label="Disabled"  disabled />

// disabled: applies opacity 0.5, blocks onPress internally`,
              lemniscate: `import { Checkbox } from '@lemniscate/components/atoms/Checkbox'

<Checkbox checked={true} onChange={() => {}} label="Checked" />
<Checkbox checked={false} onChange={() => {}} label="Unchecked" />
<Checkbox checked={false} onChange={() => {}} label="Disabled" disabled />`,
            },
            ios: `VStack(alignment: .leading, spacing: 12) {
    Toggle("Checked", isOn: .constant(true)).toggleStyle(CheckboxToggleStyle())
    Toggle("Unchecked", isOn: .constant(false)).toggleStyle(CheckboxToggleStyle())
    Toggle("Disabled", isOn: .constant(false)).toggleStyle(CheckboxToggleStyle()).disabled(true)
}`,
            android: `Column {
    Checkbox(checked = true, onCheckedChange = {})
    Checkbox(checked = false, onCheckedChange = {})
    Checkbox(checked = true, onCheckedChange = {}, enabled = false)
}`,
            tailwind: `<input type="checkbox" checked class="..." />
<input type="checkbox" class="..." />
<input type="checkbox" disabled class="... opacity-50 cursor-not-allowed" />`,
          },
        },
      ]}
    />
  )
}
