import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Button } from '@/app/components/atoms/button'
import { ArrowRight, Download, Send, Sparkles, Trash2 } from 'lucide-react'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistButton } from '@/app/components/custom/kaayo/KayoBrutalistButton'

export function ButtonPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  return (
    <ComponentPageLayout
      title="Button"
      description="Triggers an action or navigates the user. Choose the variant that matches the importance and nature of the action."
      level="Atom"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Variants',
          description: 'Action styles for primary, brand, secondary, destructive, and low-emphasis commands.',
          preview: isKaayo ? (
            <div className="flex flex-wrap gap-4">
              <KayoBrutalistButton variant="primary" label="Primary" />
              <KayoBrutalistButton variant="secondary" label="Secondary" />
              <KayoBrutalistButton variant="destructive" label="Destructive" />
              <KayoBrutalistButton variant="ghost" label="Ghost" />
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              <Button variant="gradient"><Sparkles className="h-4 w-4" />Gradient</Button>
              <Button variant="default">Default Primary</Button>
              <Button variant="brandOutline">Brand Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Danger</Button>
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="link">Link</Button>
            </div>
          ),
          code: {
            react: `import { Button } from '@breathe/ui'

<Button variant="gradient">Gradient</Button>
<Button variant="default">Primary</Button>
<Button variant="brandOutline">Brand Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Danger</Button>
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>
<Button variant="link">Link</Button>`,

            tailwind: `<!-- Primary -->
<button class="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold
               bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 transition-all">
  Primary
</button>

<!-- Gradient -->
<button class="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold
               bg-gradient-brand text-primary-foreground shadow-sm hover:shadow-md transition-all">
  Gradient
</button>

<!-- Brand outline -->
<button class="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-normal
               border border-primary/40 text-primary hover:bg-primary/5 transition-all">
  Brand Outline
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

/* Gradient */
.btn-gradient {
  background: var(--gradient-brand);
  color: var(--color-primary-foreground);
  box-shadow: 0 1px 2px rgba(0,0,0,.05);
}

/* Brand outline */
.btn-brand-outline {
  border: 1px solid color-mix(in srgb, var(--color-primary) 40%, transparent);
  background: transparent;
  color: var(--color-primary);
  font-weight: 400;
}

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

            reactNative: `import { Button } from '@kaayo/components/atoms/Button'

// 4 variants — all share the 2px hard border + 8px radius
<Button variant="primary"     label="Primary"     onPress={() => {}} />
<Button variant="secondary"   label="Secondary"   onPress={() => {}} />
<Button variant="destructive" label="Destructive" onPress={() => {}} />
<Button variant="ghost"       label="Ghost"       onPress={() => {}} />

// Token reference (lib/theme.ts + lib/tokens.ts):
// primary   → theme.action.primary   { bg: #970103, fg: #ffffff }
// secondary → theme.action.secondary { bg: #ffffff, fg: #3b3d3f }
// destructive → theme.action.destructive { bg: #dc2626, fg: #ffffff }
// ghost     → { bg: 'transparent', fg: theme.text.primary }
// All variants: borderWidth: kayoBorder.width (2), borderColor: theme.border.strong (#191B1F)
// Non-ghost:   boxShadow: kayoShadow.sm  →  '2px 2px 0 #191B1F'`,

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
          description: 'Seven supported sizes including compact and icon-only controls.',
          preview: isKaayo ? (
            <div className="flex flex-wrap items-center gap-4">
              <KayoBrutalistButton size="sm" label="Small" />
              <KayoBrutalistButton size="md" label="Medium" />
              <KayoBrutalistButton size="lg" label="Large" />
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <Button size="xs">Extra Small</Button>
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">Extra Large</Button>
              <Button size="icon-sm" aria-label="Send"><Send className="h-4 w-4" /></Button>
              <Button size="icon" aria-label="Download"><Download className="h-4 w-4" /></Button>
            </div>
          ),
          code: {
            react: `<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
<Button size="icon-sm" aria-label="Send"><Send /></Button>
<Button size="icon" aria-label="Download"><Download /></Button>`,

            tailwind: `<button class="h-6 rounded px-2 text-[10px] font-semibold bg-primary text-primary-foreground">Extra Small</button>
<button class="h-9 rounded-md px-4 text-xs font-semibold bg-primary text-primary-foreground">Small</button>
<button class="h-11 rounded-lg px-6 py-2.5 text-sm font-semibold bg-primary text-primary-foreground">Default</button>
<button class="h-12 rounded-lg px-8 text-base font-semibold bg-primary text-primary-foreground">Large</button>
<button class="h-14 rounded-xl px-10 text-lg font-semibold bg-primary text-primary-foreground">Extra Large</button>
<button class="h-9 w-9 inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground">Icon small</button>
<button class="h-11 w-11 inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground">Icon</button>`,

            css: `/* Sizes are set via height + padding. Apply alongside the base .btn class. */
.btn-sm  { height: 2.25rem; padding: 0 1rem;   font-size: 0.75rem;  border-radius: 0.375rem; }
.btn-md  { height: 2.75rem; padding: 0 1.5rem; font-size: 0.875rem; border-radius: 0.5rem; }
.btn-lg  { height: 3rem;    padding: 0 2rem;   font-size: 1rem;     border-radius: 0.5rem; }
.btn-xl  { height: 3.5rem;  padding: 0 2.5rem; font-size: 1.125rem; border-radius: 0.5rem; }`,

            reactNative: `import { Button } from '@kaayo/components/atoms/Button'
import { kayoSpace } from '@kaayo/lib/tokens'
import { typography } from '@kaayo/lib/typography'

<Button size="sm" label="Small"  onPress={() => {}} />
<Button size="md" label="Medium" onPress={() => {}} />   // default
<Button size="lg" label="Large"  onPress={() => {}} />

// Size specs:
// sm: paddingHorizontal: kayoSpace[3] (12), paddingVertical: kayoSpace[2] (8),  minHeight: 36, font: typography.label_sm
// md: paddingHorizontal: kayoSpace[4] (16), paddingVertical: kayoSpace[3] (12), minHeight: 44, font: typography.label_lg
// lg: paddingHorizontal: kayoSpace[5] (20), paddingVertical: kayoSpace[4] (16), minHeight: 52, font: typography.label_lg`,
          },
        },
        {
          title: 'With icons',
          description: 'Left icon, right icon, or icon-only. Note: Kaayo Button requires a label — pure icon-only is not supported; use an icon wrapped in Pressable directly.',
          preview: isKaayo ? (
            <div className="flex flex-wrap items-center gap-4">
              <KayoBrutalistButton variant="primary" label="Download" iconLeft={<Download size={16} color="#fff" strokeWidth={2.5} />} />
              <KayoBrutalistButton variant="secondary" label="Continue" iconRight={<ArrowRight size={16} color="#3b3d3f" strokeWidth={2.5} />} />
              <KayoBrutalistButton variant="destructive" label="Delete" iconLeft={<Trash2 size={16} color="#fff" strokeWidth={2.5} />} />
            </div>
          ) : (
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

            reactNative: `import { Button } from '@kaayo/components/atoms/Button'
import { Download, ArrowRight, Trash2 } from 'lucide-react-native'
import { theme } from '@kaayo/lib/theme'

// Icon left
<Button
  variant="primary"
  label="Download"
  iconLeft={<Download size={16} color={theme.text.onPrimary} strokeWidth={2.5} />}
  onPress={() => {}}
/>

// Icon right
<Button
  variant="secondary"
  label="Continue"
  iconRight={<ArrowRight size={16} color={theme.text.primary} strokeWidth={2.5} />}
  onPress={() => {}}
/>

// Note: Kaayo Button requires a label — pure icon-only is not supported.
// For icon-only actions, use an icon wrapped in Pressable directly.`,
          },
        },
        {
          title: 'States',
          description: 'Disabled and loading states.',
          preview: isKaayo ? (
            <div className="flex flex-wrap items-center gap-4">
              <KayoBrutalistButton variant="primary" label="Disabled" disabled />
              <KayoBrutalistButton variant="secondary" label="Disabled" disabled />
              <KayoBrutalistButton variant="primary" label="Loading…" loading />
              <KayoBrutalistButton variant="secondary" label="Loading…" loading />
            </div>
          ) : (
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

            reactNative: `import { Button } from '@kaayo/components/atoms/Button'

// Disabled — bg: neutralWhite[200] (#e5e7eb), text: text.disabled, no shadow
<Button variant="primary" label="Disabled" disabled onPress={() => {}} />

// Loading — ActivityIndicator replaces label, button is non-interactive
<Button variant="primary" label="Saving…" loading onPress={() => {}} />

// Both disabled and loading block onPress internally.
// disabled: opacity via neutralWhite[200] bg + text.disabled color
// loading:  ActivityIndicator color matches palette.fg for the active variant`,

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
        {
          title: 'Press / Touch',
          description: 'Neo-Brutalist signature: the button physically falls into the page on press. Shadow drops and the element translates 2 × 2 px in the direction of the shadow offset.',
          preview: (
            <div className="flex flex-col gap-3">
              <p className="text-sm text-slate-500">Press and hold any button to see the brutalist press effect.</p>
              <div className="flex flex-wrap gap-4">
                <KayoBrutalistButton variant="primary"     label="Hold me" />
                <KayoBrutalistButton variant="secondary"   label="Hold me" />
                <KayoBrutalistButton variant="destructive" label="Hold me" />
                <KayoBrutalistButton variant="ghost"       label="Hold me" />
              </div>
            </div>
          ),
          code: {
            react: `// KayoBrutalistButton handles the press effect automatically.
// Press and hold any variant in the preview to see it.`,

            reactNative: `import { Pressable, Text, StyleSheet } from 'react-native'
import { kayoBorder, kayoRadius, kayoShadow, kayoSpace } from '@kaayo/lib/tokens'
import { theme } from '@kaayo/lib/theme'
import { typography } from '@kaayo/lib/typography'

// The Button atom handles this automatically.
// Internally it uses Pressable's pressed state:

<Pressable
  style={({ pressed }) => [
    styles.base,
    {
      backgroundColor: theme.action.primary.bg,
      borderColor: theme.border.strong,
    },
    pressed ? styles.pressed : kayoShadow.sm,
  ]}
>
  <Text style={[typography.label_lg, { color: theme.text.onPrimary }]}>
    Primary
  </Text>
</Pressable>

const styles = StyleSheet.create({
  base: {
    borderWidth: kayoBorder.width,           // 2
    borderRadius: kayoRadius.md,             // 8
    paddingHorizontal: kayoSpace[4],         // 16
    paddingVertical: kayoSpace[3],           // 12
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    transform: [{ translateX: 2 }, { translateY: 2 }],
    ...kayoShadow.none,   // { boxShadow: 'none', elevation: 0 }
  },
})

// Ghost variant: skip kayoShadow.sm entirely (no shadow on any state)`,
          },
        },
        {
          title: 'Full Width',
          description: 'Stretches to fill its container. Use for primary actions in mobile forms and bottom CTAs.',
          preview: (
            <div className="flex flex-col gap-3 w-full max-w-sm">
              <KayoBrutalistButton variant="primary"   label="Save student" fullWidth />
              <KayoBrutalistButton variant="secondary" label="Cancel"       fullWidth />
            </div>
          ),
          code: {
            react: `// Pass fullWidth to stretch the button to its container
<KayoBrutalistButton variant="primary"   label="Save student" fullWidth />
<KayoBrutalistButton variant="secondary" label="Cancel"       fullWidth />`,

            reactNative: `import { Button } from '@kaayo/components/atoms/Button'

// fullWidth adds alignSelf: 'stretch' to the Pressable
<Button variant="primary"   label="Save student" fullWidth onPress={() => {}} />
<Button variant="secondary" label="Cancel"       fullWidth onPress={() => {}} />

// Typical usage — action row at form bottom:
<View style={{ flexDirection: 'row', gap: 12 }}>
  <Button variant="secondary" label="Cancel"  onPress={handleCancel} />
  <Button variant="primary"   label="Submit"  onPress={handleSubmit} loading={isSubmitting} />
</View>`,
          },
        },
      ]}
    />
  )
}
