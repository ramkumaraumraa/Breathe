import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistInput } from '@/app/components/custom/kaayo/KayoBrutalistInput'

export function TextInputPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  return (
    <ComponentPageLayout
      title="Text Input"
      description="Text entry field for forms and search. Always pair with a Label for accessibility."
      level="Atom"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Default',
          preview: isKaayo ? (
            <div className="max-w-xs">
              <KayoBrutalistInput label="Email address" placeholder="you@example.com" type="email" />
            </div>
          ) : (
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
            reactNative: `import { Input } from '@kaayo/components/atoms/Input'

<Input
  label="Email address"
  placeholder="you@example.com"
  keyboardType="email-address"
  autoCapitalize="none"
  onChangeText={setEmail}
  value={email}
/>

// Token reference (lib/theme.ts + lib/tokens.ts):
// Border default: theme.border.strong (#3b3d3f)
// Border focused: theme.border.focus = theme.brand.primary (#970103)
// Background: theme.surface.card (#ffffff)
// minHeight: 48, paddingHorizontal: kayoSpace[3] (12)
// borderWidth: kayoBorder.width (2), borderRadius: kayoRadius.md (8)`,
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
          description: 'Focused (click to see crimson border), disabled, and read-only variants.',
          preview: isKaayo ? (
            <div className="space-y-3 max-w-xs">
              <KayoBrutalistInput label="Focused" placeholder="Click to see crimson border" />
              <KayoBrutalistInput label="Disabled" placeholder="Not editable" disabled />
              <KayoBrutalistInput label="Read only" readOnly defaultValue="Fixed value" />
            </div>
          ) : (
            <div className="space-y-3 max-w-xs">
              <Input placeholder="Disabled" disabled />
              <Input placeholder="Read only" readOnly defaultValue="Read-only value" />
            </div>
          ),
          code: {
            react: `<Input placeholder="Disabled" disabled />
<Input readOnly defaultValue="Read-only value" />`,
            reactNative: `import { Input } from '@kaayo/components/atoms/Input'

// Focused — border changes to theme.border.focus automatically on onFocus
<Input label="Name" placeholder="Enter name" onChangeText={setName} value={name} />

// Disabled — pass editable={false} via TextInput spread props
<Input label="Disabled" placeholder="Not editable" editable={false} />

// Read-only
<Input label="Read only" value="Fixed value" editable={false} />`,
            ios: `// Disabled and Read-Only in SwiftUI
TextField("Disabled", text: .constant("")).disabled(true).opacity(0.5)
TextField("Read only", text: .constant("Read-only value")).disabled(true)`,
            android: `// Disabled and Read-Only in Compose
OutlinedTextField(value = "", onValueChange = {}, enabled = false, placeholder = { Text("Disabled") })
OutlinedTextField(value = "Read-only value", onValueChange = {}, readOnly = true)`,
            tailwind: `<input placeholder="Disabled" disabled class="w-full opacity-50 cursor-not-allowed bg-slate-50 dark:bg-slate-800" />
<input readonly value="Read-only value" class="w-full bg-slate-50 dark:bg-slate-800" />`,
          },
        },
        {
          title: 'Helper & Error Text',
          description: 'Contextual guidance below the field. Error text also turns the border crimson-red.',
          preview: (
            <div className="space-y-4 max-w-xs">
              <KayoBrutalistInput
                label="Phone number"
                placeholder="+91 98765 43210"
                helperText="Used for SMS session reminders."
              />
              <KayoBrutalistInput
                label="Phone number"
                placeholder="+91 98765 43210"
                errorText="Please enter a valid 10-digit number."
              />
            </div>
          ),
          code: {
            react: `<Input helperText="Used for SMS session reminders." />
<Input errorText="Please enter a valid 10-digit number." />`,
            reactNative: `import { Input } from '@kaayo/components/atoms/Input'

// Helper text — renders below in theme.text.secondary
<Input
  label="Phone number"
  placeholder="+91 98765 43210"
  helperText="Used for SMS session reminders."
  onChangeText={setPhone}
/>

// Error text — border turns theme.status.overdue.border, text turns theme.status.overdue.fg
<Input
  label="Phone number"
  placeholder="+91 98765 43210"
  errorText="Please enter a valid 10-digit number."
  onChangeText={setPhone}
/>`,
          },
        },
        {
          title: 'Password',
          description: 'Secure text entry with Eye / EyeOff visibility toggle.',
          preview: (
            <div className="max-w-xs">
              <KayoBrutalistInput label="Password" placeholder="Enter password" isPassword />
            </div>
          ),
          code: {
            react: `<Input type="password" placeholder="Enter password" />`,
            reactNative: `import { Input } from '@kaayo/components/atoms/Input'

// isPassword adds Eye/EyeOff toggle — internally toggles secureTextEntry
<Input
  label="Password"
  placeholder="Enter password"
  isPassword
  onChangeText={setPassword}
/>

// Token reference:
// Eye/EyeOff: lucide-react-native, size 20, color theme.text.secondary (#6c6d70)
// Toggle is a Pressable with hitSlop={8} so it's easy to tap on mobile`,
          },
        },
      ]}
    />
  )
}
