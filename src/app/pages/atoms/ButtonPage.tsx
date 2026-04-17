import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Button } from '@/app/components/ui/button'
import { ArrowRight, Download, Trash2 } from 'lucide-react'

export function ButtonPage() {
  return (
    <ComponentPageLayout
      title="Button"
      description="Triggers an action or navigates the user. Choose the variant that matches the importance and nature of the action."
      level="Atom"
      status="Stable"
      sections={[
        {
          title: 'Variants',
          description: 'Six variants for different levels of emphasis.',
          preview: (
            <div className="flex flex-wrap gap-3">
              <Button variant="default">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Danger</Button>
              <Button variant="link">Link</Button>
            </div>
          ),
          code: {
            react: `import { Button } from '@breathe/ui'

<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Danger</Button>
<Button variant="link">Link</Button>`,

            tailwind: `<!-- Primary -->
<button class="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold
               bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 transition-all">
  Primary
</button>

<!-- Secondary -->
<button class="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold
               bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all">
  Secondary
</button>

<!-- Outline -->
<button class="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold
               border-2 border-primary bg-background text-primary hover:bg-primary/5 transition-all">
  Outline
</button>

<!-- Ghost -->
<button class="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold
               text-primary hover:bg-primary/10 transition-all">
  Ghost
</button>

<!-- Danger -->
<button class="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold
               bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-all">
  Danger
</button>`,

            css: `/* Primary */
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  padding: 0.625rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: var(--color-primary);
  color: var(--color-primary-foreground);
  box-shadow: 0 1px 2px rgba(0,0,0,.05);
  transition: background-color 150ms, box-shadow 150ms;
}
.btn-primary:hover { background-color: color-mix(in srgb, var(--color-primary) 90%, transparent); }

/* Secondary */
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  padding: 0.625rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: var(--color-secondary);
  color: var(--color-secondary-foreground);
  transition: background-color 150ms;
}
.btn-secondary:hover { background-color: color-mix(in srgb, var(--color-secondary) 80%, transparent); }

/* Outline */
.btn-outline {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  padding: 0.625rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  border: 2px solid var(--color-primary);
  background: transparent;
  color: var(--color-primary);
  transition: background-color 150ms;
}
.btn-outline:hover { background-color: color-mix(in srgb, var(--color-primary) 5%, transparent); }`,

            reactNative: `import { TouchableOpacity, Text, StyleSheet } from 'react-native'
// Tokens from: @breathe/tokens/react-native/lemniscate
import { tokens } from '@breathe/tokens/react-native/lemniscate'

// Primary
<TouchableOpacity style={[styles.btn, { backgroundColor: tokens.lmnsColorPrimary }]}>
  <Text style={[styles.label, { color: tokens.lmnsColorPrimaryForeground }]}>Primary</Text>
</TouchableOpacity>

// Secondary
<TouchableOpacity style={[styles.btn, { backgroundColor: tokens.lmnsColorBackgroundSecondary }]}>
  <Text style={[styles.label, { color: tokens.lmnsColorForeground }]}>Secondary</Text>
</TouchableOpacity>

// Outline
<TouchableOpacity style={[styles.btn, styles.outline, { borderColor: tokens.lmnsColorPrimary }]}>
  <Text style={[styles.label, { color: tokens.lmnsColorPrimary }]}>Outline</Text>
</TouchableOpacity>

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: tokens.lmnsRadiusDefault,
    paddingHorizontal: 24,
    paddingVertical: 10,
    gap: 8,
  },
  outline: {
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
})`,

            ios: `import SwiftUI

struct ButtonVariants: View {
    var body: some View {
        VStack(spacing: 12) {
            // Primary
            Button("Primary") {}
                .buttonStyle(BreathePrimaryButtonStyle())

            // Secondary
            Button("Secondary") {}
                .buttonStyle(BreatheSecondaryButtonStyle())

            // Outline
            Button("Outline") {}
                .buttonStyle(BreatheOutlineButtonStyle())

            // Destructive
            Button("Danger") {}
                .buttonStyle(.borderedProminent)
                .tint(.red)
        }
    }
}

struct BreathePrimaryButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.system(size: 14, weight: .semibold))
            .padding(.horizontal, 24)
            .padding(.vertical, 10)
            .background(Color("Primary"))
            .foregroundColor(.white)
            .cornerRadius(8)
            .opacity(configuration.isPressed ? 0.9 : 1)
    }
}`,

            android: `// Jetpack Compose
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun ButtonVariants() {
    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        // Primary
        Button(onClick = {}) {
            Text("Primary")
        }

        // Secondary
        OutlinedButton(
            onClick = {},
            colors = ButtonDefaults.outlinedButtonColors(
                containerColor = MaterialTheme.colorScheme.secondaryContainer,
            )
        ) {
            Text("Secondary")
        }

        // Outline
        OutlinedButton(onClick = {}) {
            Text("Outline")
        }

        // Danger / Destructive
        Button(
            onClick = {},
            colors = ButtonDefaults.buttonColors(
                containerColor = MaterialTheme.colorScheme.error,
            )
        ) {
            Text("Danger")
        }
    }
}`,
          },
        },
        {
          title: 'Sizes',
          description: 'Five sizes from sm to xl.',
          preview: (
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          ),
          code: {
            react: `<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>`,

            tailwind: `<button class="h-9 rounded-md px-4 text-xs font-semibold bg-primary text-primary-foreground">Small</button>
<button class="h-11 rounded-lg px-6 py-2.5 text-sm font-semibold bg-primary text-primary-foreground">Default</button>
<button class="h-12 rounded-lg px-8 text-base font-semibold bg-primary text-primary-foreground">Large</button>`,

            css: `/* Sizes are set via height + padding. Apply alongside the base .btn class. */
.btn-sm  { height: 2.25rem; padding: 0 1rem;   font-size: 0.75rem;  border-radius: 0.375rem; }
.btn-md  { height: 2.75rem; padding: 0 1.5rem; font-size: 0.875rem; border-radius: 0.5rem; }
.btn-lg  { height: 3rem;    padding: 0 2rem;   font-size: 1rem;     border-radius: 0.5rem; }
.btn-xl  { height: 3.5rem;  padding: 0 2.5rem; font-size: 1.125rem; border-radius: 0.5rem; }`,

            reactNative: `import { tokens } from '@breathe/tokens/react-native/lemniscate'

const sizes = {
  sm:  { paddingHorizontal: 16, paddingVertical: 6,  fontSize: 12 },
  md:  { paddingHorizontal: 24, paddingVertical: 10, fontSize: 14 },
  lg:  { paddingHorizontal: 32, paddingVertical: 12, fontSize: 16 },
}

<TouchableOpacity style={[styles.btn, sizes.sm]}>
  <Text style={{ fontSize: sizes.sm.fontSize, fontWeight: '600' }}>Small</Text>
</TouchableOpacity>`,
          },
        },
        {
          title: 'With icons',
          description: 'Left icon, right icon, or icon-only.',
          preview: (
            <div className="flex flex-wrap items-center gap-3">
              <Button><Download className="mr-2 h-4 w-4" />Download</Button>
              <Button variant="outline">Continue <ArrowRight className="ml-2 h-4 w-4" /></Button>
              <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button>
            </div>
          ),
          code: {
            react: `import { Download, ArrowRight, Trash2 } from 'lucide-react'

<Button><Download className="mr-2 h-4 w-4" />Download</Button>
<Button variant="outline">Continue <ArrowRight className="ml-2 h-4 w-4" /></Button>
<Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button>`,

            tailwind: `<!-- Left icon -->
<button class="inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold bg-primary text-primary-foreground">
  <svg class="h-4 w-4" .../>
  Download
</button>

<!-- Right icon -->
<button class="inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold border-2 border-primary text-primary">
  Continue
  <svg class="h-4 w-4" .../>
</button>

<!-- Icon only -->
<button class="h-11 w-11 inline-flex items-center justify-center rounded-lg bg-destructive text-destructive-foreground">
  <svg class="h-4 w-4" .../>
</button>`,

            reactNative: `import { MaterialIcons } from '@expo/vector-icons'

// Left icon
<TouchableOpacity style={styles.btn}>
  <MaterialIcons name="file-download" size={16} color="#fff" />
  <Text style={styles.label}>Download</Text>
</TouchableOpacity>

// Icon only
<TouchableOpacity style={styles.iconBtn}>
  <MaterialIcons name="delete" size={16} color="#fff" />
</TouchableOpacity>`,
          },
        },
        {
          title: 'States',
          description: 'Disabled state.',
          preview: (
            <div className="flex flex-wrap items-center gap-3">
              <Button disabled>Disabled</Button>
              <Button variant="outline" disabled>Disabled Outline</Button>
            </div>
          ),
          code: {
            react: `<Button disabled>Disabled</Button>
<Button variant="outline" disabled>Disabled Outline</Button>`,

            tailwind: `<button disabled class="... opacity-50 pointer-events-none">Disabled</button>
<button disabled class="... border-2 border-primary text-primary opacity-50 pointer-events-none">Disabled Outline</button>`,

            css: `.btn:disabled {
  opacity: 0.5;
  pointer-events: none;
  cursor: not-allowed;
}`,

            reactNative: `<TouchableOpacity style={[styles.btn, { opacity: 0.5 }]} disabled>
  <Text style={styles.label}>Disabled</Text>
</TouchableOpacity>`,

            ios: `Button("Disabled") {}
    .buttonStyle(BreathePrimaryButtonStyle())
    .disabled(true)
    .opacity(0.5)`,

            android: `Button(
    onClick = {},
    enabled = false,
) {
    Text("Disabled")
}`,
          },
        },
      ]}
    />
  )
}
