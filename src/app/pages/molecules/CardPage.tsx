import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'

export function CardPage() {
  return (
    <ComponentPageLayout
      title="Card"
      description="Surface that groups related information and actions. Cards create visual hierarchy and make content scannable."
      level="Molecule"
      status="Stable"
      sections={[
        {
          title: 'Default',
          preview: (
            <Card className="w-72">
              <CardHeader>
                <CardTitle>Project Settings</CardTitle>
                <CardDescription>Manage your project configuration.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Update your project name, members, and permissions here.</p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save</Button>
              </CardFooter>
            </Card>
          ),
          code: {
            react: `import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@breathe/ui'
import { Button } from '@breathe/ui'

<Card className="w-72">
  <CardHeader>
    <CardTitle>Project Settings</CardTitle>
    <CardDescription>Manage your project configuration.</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-muted-foreground">Update your project name, members, and permissions here.</p>
  </CardContent>
  <CardFooter className="flex justify-end gap-2">
    <Button variant="outline">Cancel</Button>
    <Button>Save</Button>
  </CardFooter>
</Card>`,
            reactNative: `import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

// Usage
<View style={styles.card}>
  <View style={styles.header}>
    <Text style={styles.title}>Project Settings</Text>
    <Text style={styles.subtitle}>Manage your project configuration.</Text>
  </View>
  <View style={styles.body}>
    <Text style={styles.bodyText}>Update your project name, members, and permissions here.</Text>
  </View>
  <View style={styles.footer}>
    <TouchableOpacity style={styles.btnSecondary}><Text style={styles.btnSecText}>Cancel</Text></TouchableOpacity>
    <TouchableOpacity style={styles.btnPrimary}><Text style={styles.btnPrimText}>Save</Text></TouchableOpacity>
  </View>
</View>

const styles = StyleSheet.create({
  card: { borderRadius: 12, backgroundColor: '#fff', borderWidth: 1, borderColor: '#E2E8F0', shadowOpacity: 0.05, shadowRadius: 4 },
  header: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  body:   { padding: 16 },
  footer: { padding: 16, borderTopWidth: 1, borderTopColor: '#F1F5F9', flexDirection: 'row', justifyContent: 'flex-end', gap: 8 },
  title:    { fontSize: 16, fontWeight: '600', color: '#0F172A' },
  subtitle: { fontSize: 13, color: '#64748B', marginTop: 2 },
  bodyText: { fontSize: 14, color: '#475569', lineHeight: 20 },
  btnPrimary: { backgroundColor: '#0D9488', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  btnSecondary: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#E2E8F0', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  btnPrimText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  btnSecText: { color: '#475569', fontSize: 14, fontWeight: '500' },
})`,
            ios: `import SwiftUI

struct CardView: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            VStack(alignment: .leading, spacing: 4) {
                Text("Project Settings").font(.headline).foregroundColor(.primary)
                Text("Manage your project configuration.").font(.subheadline).foregroundColor(.secondary)
            }
            .padding()
            
            Divider()
            
            Text("Update your project name, members, and permissions here.")
                .font(.body)
                .padding()
            
            Divider()
            
            HStack(spacing: 8) {
                Spacer()
                Button("Cancel") {}.buttonStyle(.bordered)
                Button("Save") {}.buttonStyle(.borderedProminent).tint(.teal)
            }
            .padding()
        }
        .background(Color(.systemBackground))
        .cornerRadius(12)
        .overlay(RoundedRectangle(cornerRadius: 12).stroke(Color(.systemGray5), lineWidth: 1))
    }
}`,
            android: `// Jetpack Compose Card
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun SettingsCard() {
    Card(
        modifier = Modifier.width(300.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text("Project Settings", style = MaterialTheme.typography.titleMedium)
            Text("Manage your project configuration.", style = MaterialTheme.typography.bodyMedium)
            Spacer(modifier = Modifier.height(8.dp))
            Text("Update your project name, members, and permissions here.")
            Spacer(modifier = Modifier.height(16.dp))
            Row(horizontalArrangement = Arrangement.End, modifier = Modifier.fillMaxWidth()) {
                TextButton(onClick = {}) { Text("Cancel") }
                Button(onClick = {}) { Text("Save") }
            }
        }
    }
}`,
            tailwind: `<!-- Tailwind Card Layout -->
<div class="w-72 rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
  <div class="border-b border-slate-100 p-6 dark:border-slate-800">
    <h3 class="font-semibold leading-none tracking-tight">Project Settings</h3>
    <p class="text-sm text-slate-500 mt-1.5 dark:text-slate-400">Manage your project configuration.</p>
  </div>
  <div class="p-6">
    <p class="text-sm text-slate-600 dark:text-slate-400">Update your project name, members, and permissions here.</p>
  </div>
  <div class="flex items-center justify-end gap-2 border-t border-slate-100 p-6 dark:border-slate-800">
    <button class="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800">Cancel</button>
    <button class="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700">Save</button>
  </div>
</div>`,
          },
        },
      ]}
    />
  )
}
