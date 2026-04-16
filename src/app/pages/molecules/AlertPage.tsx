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
import { Terminal } from 'lucide-react'

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
          },
        },
      ]}
    />
  )
}
