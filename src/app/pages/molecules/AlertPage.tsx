import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Alert, AlertDescription, AlertTitle } from '@/app/components/ui/alert'
import { Terminal, AlertTriangle } from 'lucide-react'

export function AlertPage() {
  return (
    <ComponentPageLayout
      title="Alert"
      description="Communicates a status, warning, error, or informational message inline within the page. Does not require user action to dismiss."
      level="Molecule"
      status="Stable"
      sections={[
        {
          title: 'Variants',
          preview: (
            <div className="space-y-3 w-full max-w-lg">
              <Alert>
                <Terminal className="h-4 w-4" />
                <AlertTitle>Default</AlertTitle>
                <AlertDescription>A neutral informational message.</AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Something went wrong. Please try again.</AlertDescription>
              </Alert>
            </div>
          ),
          code: {
            react: `import { Alert, AlertDescription, AlertTitle } from '@breathe/ui'
import { Terminal, AlertTriangle } from 'lucide-react'

<Alert>
  <Terminal className="h-4 w-4" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>You can change this in settings.</AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertTriangle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong.</AlertDescription>
</Alert>`,
            reactNative: `// React Native — inline banner pattern
import { View, Text } from 'react-native'
import { tokens } from '@breathe/tokens/react-native/lemniscate'

<View style={{ backgroundColor: tokens.lmnsColorDangerLight, borderRadius: 8, padding: 12, borderLeftWidth: 4, borderLeftColor: tokens.lmnsColorDanger }}>
  <Text style={{ color: tokens.lmnsColorDanger, fontWeight: '600' }}>Error</Text>
  <Text style={{ color: tokens.lmnsColorForeground, marginTop: 2 }}>Something went wrong.</Text>
</View>`,
            ios: `import SwiftUI

struct AlertVariantsView: View {
    var body: some View {
        VStack(spacing: 10) {
            AlertBanner(variant: .info,    message: "This is an informational message.")
            AlertBanner(variant: .danger,  message: "Failed to connect to server.")
        }
        .padding()
    }
}

enum AlertVariant { case info, success, warning, danger }

struct AlertBanner: View {
    let variant: AlertVariant
    let message: String

    var config: (icon: String, color: Color) {
        switch variant {
        case .info:    return ("info.circle.fill",         .blue)
        case .danger:  return ("xmark.circle.fill",        .red)
        default:       return ("info.circle.fill",         .blue)
        }
    }

    var body: some View {
        HStack(alignment: .top, spacing: 10) {
            Image(systemName: config.icon)
                .foregroundColor(config.color)
                .padding(.top, 1)
            Text(message)
                .font(.subheadline)
                .foregroundColor(config.color.opacity(0.85))
            Spacer()
        }
        .padding(14)
        .background(config.color.opacity(0.08))
        .overlay(RoundedRectangle(cornerRadius: 12).stroke(config.color.opacity(0.25), lineWidth: 1))
        .cornerRadius(12)
    }
}`,
            android: `// Jetpack Compose
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun AlertBanner(title: String, message: String, isError: Boolean = false) {
    val bgColor = if (isError) MaterialTheme.colorScheme.errorContainer else MaterialTheme.colorScheme.infoContainer
    val borderColor = if (isError) MaterialTheme.colorScheme.error else MaterialTheme.colorScheme.primary

    Row(
        modifier = Modifier
            .fillMaxWidth()
            .background(bgColor, shape = RoundedCornerShape(8.dp))
            .border(1.dp, borderColor, shape = RoundedCornerShape(8.dp))
            .padding(16.dp)
    ) {
        Column {
            Text(text = title, style = MaterialTheme.typography.titleMedium)
            Text(text = message, style = MaterialTheme.typography.bodyMedium)
        }
    }
}`,
            tailwind: `<!-- Default Alert -->
<div class="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
  <svg class="h-5 w-5 text-slate-500" ...></svg>
  <div>
    <h5 class="font-semibold text-sm">Heads up!</h5>
    <p class="text-xs mt-1 text-slate-600 dark:text-slate-400">You can change this in settings.</p>
  </div>
</div>

<!-- Destructive Alert -->
<div class="flex items-start gap-3 rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-destructive dark:border-destructive/30 dark:bg-destructive/10">
  <svg class="h-5 w-5 text-destructive" ...></svg>
  <div>
    <h5 class="font-semibold text-sm">Error</h5>
    <p class="text-xs mt-1 opacity-90">Something went wrong.</p>
  </div>
</div>`,
          },
        },
      ]}
    />
  )
}
