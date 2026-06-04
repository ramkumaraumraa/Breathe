import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Badge } from '@/app/components/ui/badge'

export function BadgePage() {
  return (
    <ComponentPageLayout
      title="Badge"
      description="Small status descriptor for UI elements. Use sparingly — too many badges reduce their signal value."
      level="Atom"
      status="Stable"
      sections={[
        {
          title: 'Variants',
          preview: (
            <div className="flex flex-wrap gap-3">
              <Badge variant="default">Default</Badge>
              <Badge variant="gradient">Gradient</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          ),
          code: {
            react: `import { Badge } from '@breathe/ui'

<Badge variant="default">Default</Badge>
<Badge variant="gradient">Gradient</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="destructive">Destructive</Badge>`,
            reactNative: `import { View, Text, StyleSheet } from 'react-native'

function Badge({ variant = 'default', children }) {
  const colors = {
    default:  { bg: '#F1F5F9', text: '#475569', border: '#E2E8F0' },
    secondary: { bg: '#EEF2F6', text: '#3B82F6', border: '#DBEAFE' },
    success:  { bg: '#ECFDF5', text: '#065F46', border: '#6EE7B7' },
    warning:  { bg: '#FFFBEB', text: '#92400E', border: '#FCD34D' },
    danger:   { bg: '#FFF1F2', text: '#9F1239', border: '#FDA4AF' },
    info:     { bg: '#F0F9FF', text: '#0369A1', border: '#7DD3FC' },
  }
  const c = colors[variant] ?? colors.default
  return (
    <View style={[styles.badge, { backgroundColor: c.bg, borderColor: c.border }]}>
      <Text style={[styles.text, { color: c.text }]}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, borderWidth: 1 },
  text: { fontSize: 12, fontWeight: '500' },
})`,
            ios: `import SwiftUI

struct BadgeLabel: View {
    let text: String
    let color: Color

    init(_ text: String, color: Color) {
        self.text = text
        self.color = color
    }

    var body: some View {
        Text(text)
            .font(.caption)
            .fontWeight(.medium)
            .padding(.horizontal, 10)
            .padding(.vertical, 4)
            .background(color.opacity(0.1))
            .foregroundColor(color)
            .overlay(Capsule().stroke(color.opacity(0.3), lineWidth: 1))
            .clipShape(Capsule())
    }
}`,
            android: `<!-- Jetpack Compose Badge -->
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun Badge(text: String, isError: Boolean = false) {
    val bgColor = if (isError) MaterialTheme.colorScheme.errorContainer else MaterialTheme.colorScheme.secondaryContainer
    val textColor = if (isError) MaterialTheme.colorScheme.onErrorContainer else MaterialTheme.colorScheme.onSecondaryContainer

    Text(
        text = text,
        modifier = Modifier
            .background(bgColor, shape = CircleShape)
            .border(1.dp, textColor.copy(alpha = 0.2f), shape = CircleShape)
            .padding(horizontal = 8.dp, vertical = 4.dp),
        style = MaterialTheme.typography.labelSmall,
        color = textColor
    )
}`,
            tailwind: `<!-- Default Badge -->
<span class="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-semibold text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
  Default
</span>

<!-- Success Badge -->
<span class="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
  Success
</span>`,
          },
        },
      ]}
    />
  )
}
