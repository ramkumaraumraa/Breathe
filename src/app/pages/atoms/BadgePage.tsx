import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Badge } from '@/app/components/ui/badge'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistBadge } from '@/app/components/custom/kaayo/KayoBrutalistBadge'

export function BadgePage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  return (
    <ComponentPageLayout
      title="Badge"
      description="Small status descriptor for UI elements. Use sparingly — too many badges reduce their signal value."
      level="Atom"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Variants',
          preview: isKaayo ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <KayoBrutalistBadge variant="default">Default</KayoBrutalistBadge>
              <KayoBrutalistBadge variant="secondary">Secondary</KayoBrutalistBadge>
              <KayoBrutalistBadge variant="outline">Outline</KayoBrutalistBadge>
              <KayoBrutalistBadge variant="success">Success</KayoBrutalistBadge>
              <KayoBrutalistBadge variant="warning">Warning</KayoBrutalistBadge>
              <KayoBrutalistBadge variant="danger">Danger</KayoBrutalistBadge>
              <KayoBrutalistBadge variant="info">Info</KayoBrutalistBadge>
              <KayoBrutalistBadge variant="destructive">Destructive</KayoBrutalistBadge>
            </div>
          ) : (
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
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="destructive">Destructive</Badge>`,
            reactNative: {
              kaayo: `import { Badge } from '@kaayo/components/atoms/Badge'

<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="info">Info</Badge>

// Token reference (Neo-Brutalist badges):
// Shape:    borderRadius 4 (not pill — rect with slight radius)
// Border:   2px solid (border always present)
// default:  bg = theme.brand.primary (#970103), text = #fff
// outline:  bg transparent, border + text = theme.border.strong (#3b3d3f)
// Padding:  paddingHorizontal 10, paddingVertical 3`,
              lemniscate: `import { Badge } from '@lemniscate/components/atoms/Badge'

<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="info">Info</Badge>`,
            },
            ios: `import SwiftUI

struct KayoBadge: View {
    let text: String
    let color: Color

    var body: some View {
        Text(text)
            .font(.caption).fontWeight(.bold)
            .padding(.horizontal, 10).padding(.vertical, 3)
            .foregroundColor(.white)
            .background(color)
            .cornerRadius(4)
            .overlay(RoundedRectangle(cornerRadius: 4).stroke(color, lineWidth: 2))
    }
}`,
            android: `@Composable
fun KayoBadge(text: String, backgroundColor: Color, textColor: Color, borderColor: Color) {
    Text(
        text = text,
        modifier = Modifier
            .background(backgroundColor, shape = RoundedCornerShape(4.dp))
            .border(2.dp, borderColor, shape = RoundedCornerShape(4.dp))
            .padding(horizontal = 10.dp, vertical = 3.dp),
        style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold),
        color = textColor,
    )
}`,
            tailwind: `<!-- Default (crimson) -->
<span class="inline-flex items-center rounded border-2 border-[#970103] bg-[#970103] px-2.5 py-0.5 text-xs font-bold text-white">
  Default
</span>

<!-- Outline -->
<span class="inline-flex items-center rounded border-2 border-[#3b3d3f] bg-transparent px-2.5 py-0.5 text-xs font-bold text-[#3b3d3f]">
  Outline
</span>`,
          },
        },
        {
          title: 'In context',
          description: 'Badges alongside labels and list items.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
              {[
                { label: 'Maintenance Fee', badge: 'Due', variant: 'danger' as const },
                { label: 'Term Exam Results', badge: 'New', variant: 'default' as const },
                { label: 'Library Books', badge: 'Overdue', variant: 'warning' as const },
                { label: 'Attendance Report', badge: 'Complete', variant: 'success' as const },
              ].map(({ label, badge, variant }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 14, color: '#3b3d3f', fontWeight: 500 }}>{label}</span>
                  <KayoBrutalistBadge variant={variant}>{badge}</KayoBrutalistBadge>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3 w-full max-w-sm">
              {[
                { label: 'Maintenance Fee', badge: 'Due', v: 'danger' as const },
                { label: 'Term Exam Results', badge: 'New', v: 'default' as const },
                { label: 'Library Books', badge: 'Overdue', v: 'warning' as const },
                { label: 'Attendance Report', badge: 'Complete', v: 'success' as const },
              ].map(({ label, badge, v }) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-sm font-medium">{label}</span>
                  <Badge variant={v}>{badge}</Badge>
                </div>
              ))}
            </div>
          ),
          code: {
            react: `<div className="flex justify-between items-center">
  <span className="text-sm font-medium">Maintenance Fee</span>
  <Badge variant="danger">Due</Badge>
</div>`,
            reactNative: `<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
  <Text style={{ fontSize: 14, fontWeight: '500', color: theme.text.primary }}>
    Maintenance Fee
  </Text>
  <Badge variant="danger">Due</Badge>
</View>`,
          },
        },
      ]}
    />
  )
}
