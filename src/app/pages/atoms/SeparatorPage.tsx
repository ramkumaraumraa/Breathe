import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Separator } from '@/app/components/atoms/separator'
import { useProductTheme } from '@/app/context/ProductThemeContext'

export function SeparatorPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  const kayoLine: React.CSSProperties = {
    height: 2,
    backgroundColor: 'var(--kayo-color-border, #3b3d3f)',
    border: 'none',
    margin: 0,
  }

  const kayoLineV: React.CSSProperties = {
    width: 2,
    height: '100%',
    backgroundColor: 'var(--kayo-color-border, #3b3d3f)',
    display: 'inline-block',
    flexShrink: 0,
  }

  return (
    <ComponentPageLayout
      title="Separator"
      description="Visually or semantically separates content. Use to create clear section boundaries."
      level="Atom"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Horizontal',
          preview: (
            <div className="w-full max-w-sm space-y-4" style={{ fontFamily: isKaayo ? "'DM Sans', system-ui, sans-serif" : undefined }}>
              <div>
                <p className="text-sm font-medium">Maintenance Collection</p>
                <p className="text-xs text-muted-foreground">Due: 1st every month</p>
              </div>
              {isKaayo ? <hr style={kayoLine} /> : <Separator />}
              <div>
                <p className="text-sm font-medium">Expense Tracking</p>
                <p className="text-xs text-muted-foreground">Monthly budget overview</p>
              </div>
            </div>
          ),
          code: {
            react: `import { Separator } from '@aumraa/breathe/components/ui/separator'

<div>Section A content</div>
<Separator />
<div>Section B content</div>`,
            reactNative: `import { View } from 'react-native'

// Horizontal separator
<View style={{
  height: 2,
  backgroundColor: theme.border.strong,  // #3b3d3f
  marginVertical: 16,
}} />

// Token reference:
// height: 2 (Neo-Brutalist uses 2px vs 1px standard)
// color: theme.border.strong (#3b3d3f)`,
          },
        },
        {
          title: 'Vertical',
          description: 'Used inside flex rows to separate inline items.',
          preview: (
            <div className="flex items-center gap-4 h-8">
              <span className="text-sm">Dashboard</span>
              {isKaayo ? <span style={kayoLineV} /> : <Separator orientation="vertical" />}
              <span className="text-sm">Reports</span>
              {isKaayo ? <span style={kayoLineV} /> : <Separator orientation="vertical" />}
              <span className="text-sm">Settings</span>
            </div>
          ),
          code: {
            react: `<div className="flex items-center gap-4 h-8">
  <span>Dashboard</span>
  <Separator orientation="vertical" />
  <span>Reports</span>
</div>`,
            reactNative: `import { View } from 'react-native'

// Vertical separator inside a row
<View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
  <Text>Dashboard</Text>
  <View style={{
    width: 2,
    height: '100%',
    backgroundColor: theme.border.strong,  // #3b3d3f
  }} />
  <Text>Reports</Text>
</View>`,
          },
        },
      ]}
    />
  )
}
