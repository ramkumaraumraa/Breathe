import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'

export function InputPage() {
  return (
    <ComponentPageLayout
      title="Input"
      description="Text entry field for forms and search. Always pair with a Label for accessibility."
      level="Atom"
      status="Stable"
      sections={[
        {
          title: 'Default',
          preview: (
            <div className="space-y-2 max-w-xs">
              <Label htmlFor="demo-input">Email address</Label>
              <Input id="demo-input" type="email" placeholder="you@example.com" />
            </div>
          ),
          code: {
            react: `import { Input } from '@breathe/ui'
import { Label } from '@breathe/ui'

<Label htmlFor="email">Email address</Label>
<Input id="email" type="email" placeholder="you@example.com" />`,
            reactNative: `import { View, Text, TextInput, StyleSheet } from 'react-native'

function Input({ label, placeholder, onChangeText, value }) {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#94a3b8"
          onChangeText={onChangeText}
          value={value}
          style={styles.input}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  label: { fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 6 },
  inputWrapper: {
    paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8,
    borderWidth: 1.5, borderColor: '#e2e8f0', backgroundColor: '#fff',
  },
  input: { flex: 1, fontSize: 14, color: '#0f172a' },
})`,
            ios: `import SwiftUI

struct InputView: View {
    @State private var email: String = ""

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text("Email address").font(.subheadline).foregroundColor(.secondary)
            TextField("you@example.com", text: $email)
                .padding(12)
                .background(Color(.systemBackground))
                .overlay(RoundedRectangle(cornerRadius: 8).stroke(Color(.systemGray4), lineWidth: 1))
        }
    }
}`,
            android: `// Jetpack Compose TextField
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun EmailInput() {
    var email by remember { mutableStateOf("") }
    OutlinedTextField(
        value = email,
        onValueChange = { email = it },
        label = { Text("Email address") },
        placeholder = { Text("you@example.com") }
    )
}`,
            tailwind: `<!-- Default Input -->
<div class="max-w-xs space-y-2">
  <label for="email" class="text-sm font-medium text-slate-700 dark:text-slate-300">Email address</label>
  <input type="email" id="email" placeholder="you@example.com" class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-900" />
</div>`,
          },
        },
        {
          title: 'States',
          description: 'Disabled and read-only variants.',
          preview: (
            <div className="space-y-3 max-w-xs">
              <Input placeholder="Disabled" disabled />
              <Input placeholder="Read only" readOnly value="Read-only value" />
            </div>
          ),
          code: {
            react: `<Input placeholder="Disabled" disabled />
<Input readOnly value="Read-only value" />`,
            reactNative: `// Disabled and Read Only inputs in React Native
<TextInput
  placeholder="Disabled"
  editable={false}
  style={[styles.input, { opacity: 0.5, backgroundColor: '#f8fafc' }]}
/>
<TextInput
  value="Read-only value"
  editable={false}
  style={styles.input}
/>`,
            ios: `// Disabled and Read-Only in SwiftUI
TextField("Disabled", text: .constant("")).disabled(true).opacity(0.5)
TextField("Read only", text: .constant("Read-only value")).disabled(true)`,
            android: `// Disabled and Read-Only in Compose
OutlinedTextField(value = "", onValueChange = {}, enabled = false, placeholder = { Text("Disabled") })
OutlinedTextField(value = "Read-only value", onValueChange = {}, readOnly = true)`,
            tailwind: `<!-- Input States -->
<input placeholder="Disabled" disabled class="w-full opacity-50 cursor-not-allowed bg-slate-50 dark:bg-slate-800" />
<input readonly value="Read-only value" class="w-full bg-slate-50 dark:bg-slate-800" />`,
          },
        },
      ]}
    />
  )
}
