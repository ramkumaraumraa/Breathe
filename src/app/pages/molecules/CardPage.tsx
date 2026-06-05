import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Pencil } from 'lucide-react'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import {
  KayoBrutalistCard,
  KayoBrutalistCardHeader,
  KayoBrutalistCardBody,
  KayoBrutalistCardFooter,
} from '@/app/components/custom/kaayo/KayoBrutalistCard'
import { KayoBrutalistButton } from '@/app/components/custom/kaayo/KayoBrutalistButton'
import { KayoBrutalistBadge } from '@/app/components/custom/kaayo/KayoBrutalistBadge'

export function CardPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  return (
    <ComponentPageLayout
      title="Card"
      description="Surface that groups related information and actions. Cards create visual hierarchy and make content scannable."
      level="Molecule"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Default',
          description: 'Full card — header, body, footer. Shadow-sm by default.',
          preview: isKaayo ? (
            <KayoBrutalistCard style={{ width: '288px' }}>
              <KayoBrutalistCardHeader title="Project Settings" description="Manage your project configuration." />
              <KayoBrutalistCardBody>
                Update your project name, members, and permissions here.
              </KayoBrutalistCardBody>
              <KayoBrutalistCardFooter>
                <KayoBrutalistButton label="Cancel" variant="secondary" size="sm" />
                <KayoBrutalistButton label="Save"   variant="primary"   size="sm" />
              </KayoBrutalistCardFooter>
            </KayoBrutalistCard>
          ) : (
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
  KayoBrutalistCard, KayoBrutalistCardHeader,
  KayoBrutalistCardBody, KayoBrutalistCardFooter,
} from '@breathe/kaayo'

<KayoBrutalistCard>
  <KayoBrutalistCardHeader title="Project Settings" description="Manage your project configuration." />
  <KayoBrutalistCardBody>Update your project name, members, and permissions here.</KayoBrutalistCardBody>
  <KayoBrutalistCardFooter>
    <KayoBrutalistButton label="Cancel" variant="secondary" size="sm" />
    <KayoBrutalistButton label="Save"   variant="primary"   size="sm" />
  </KayoBrutalistCardFooter>
</KayoBrutalistCard>`,
            reactNative: `import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

<View style={s.card}>
  <View style={s.header}>
    <Text style={s.title}>Project Settings</Text>
    <Text style={s.subtitle}>Manage your project configuration.</Text>
  </View>
  <View style={s.body}>
    <Text style={s.bodyText}>Update your project name, members, and permissions here.</Text>
  </View>
  <View style={s.footer}>
    <TouchableOpacity style={s.btnSec}><Text style={s.btnSecTxt}>Cancel</Text></TouchableOpacity>
    <TouchableOpacity style={s.btnPri}><Text style={s.btnPriTxt}>Save</Text></TouchableOpacity>
  </View>
</View>

const s = StyleSheet.create({
  card:      { borderWidth: 2, borderColor: '#3b3d3f', borderRadius: 6, backgroundColor: '#fff',
               shadowColor: '#191b1f', shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1, shadowRadius: 0, elevation: 3 },
  header:    { padding: 16, borderBottomWidth: 2, borderBottomColor: '#3b3d3f' },
  body:      { padding: 16 },
  footer:    { padding: 16, borderTopWidth: 2, borderTopColor: '#3b3d3f', flexDirection: 'row', justifyContent: 'flex-end', gap: 8 },
  title:     { fontSize: 15, fontWeight: '600', color: '#3b3d3f', fontFamily: 'DMSans-SemiBold' },
  subtitle:  { fontSize: 13, color: '#6b7280', marginTop: 4, fontFamily: 'DMSans-Regular' },
  bodyText:  { fontSize: 14, color: '#3b3d3f', lineHeight: 22, fontFamily: 'DMSans-Regular' },
  btnPri:    { backgroundColor: '#970103', borderWidth: 2, borderColor: '#3b3d3f', borderRadius: 6, paddingHorizontal: 14, paddingVertical: 8 },
  btnSec:    { backgroundColor: '#fff',    borderWidth: 2, borderColor: '#3b3d3f', borderRadius: 6, paddingHorizontal: 14, paddingVertical: 8 },
  btnPriTxt: { color: '#fff',    fontSize: 14, fontWeight: '500', fontFamily: 'DMSans-Medium' },
  btnSecTxt: { color: '#3b3d3f', fontSize: 14, fontWeight: '500', fontFamily: 'DMSans-Medium' },
})`,
          },
        },
        {
          title: 'Elevated',
          description: 'Shadow-md (4px offset) — use when the card floats above surrounding content.',
          preview: isKaayo ? (
            <KayoBrutalistCard variant="elevated" style={{ width: '288px' }}>
              <KayoBrutalistCardHeader title="Monthly Summary" description="Dues collected this month." />
              <KayoBrutalistCardBody>
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#970103', fontFamily: "'DM Sans', sans-serif" }}>₹1,24,000</div>
                <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>of ₹1,50,000 target</div>
              </KayoBrutalistCardBody>
            </KayoBrutalistCard>
          ) : (
            <Card className="w-72 shadow-md">
              <CardHeader><CardTitle>Monthly Summary</CardTitle><CardDescription>Dues collected this month.</CardDescription></CardHeader>
              <CardContent><p className="text-2xl font-bold">₹1,24,000</p></CardContent>
            </Card>
          ),
          code: {
            react: `<KayoBrutalistCard variant="elevated">
  <KayoBrutalistCardHeader title="Monthly Summary" description="Dues collected this month." />
  <KayoBrutalistCardBody>
    <div style={{ fontSize: '28px', fontWeight: 700, color: '#970103' }}>₹1,24,000</div>
  </KayoBrutalistCardBody>
</KayoBrutalistCard>`,
          },
        },
        {
          title: 'Flat',
          description: 'No shadow — for cards inside already-elevated containers.',
          preview: isKaayo ? (
            <KayoBrutalistCard variant="flat" style={{ width: '288px' }}>
              <KayoBrutalistCardHeader title="Batch Schedule" />
              <KayoBrutalistCardBody>Mon, Wed, Fri — 4:00 PM to 5:30 PM</KayoBrutalistCardBody>
            </KayoBrutalistCard>
          ) : (
            <Card className="w-72 shadow-none">
              <CardHeader><CardTitle>Batch Schedule</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">Mon, Wed, Fri — 4:00 PM to 5:30 PM</p></CardContent>
            </Card>
          ),
          code: {
            react: `<KayoBrutalistCard variant="flat">
  <KayoBrutalistCardHeader title="Batch Schedule" />
  <KayoBrutalistCardBody>Mon, Wed, Fri — 4:00 PM to 5:30 PM</KayoBrutalistCardBody>
</KayoBrutalistCard>`,
          },
        },
        {
          title: 'Header Only',
          description: 'Card with only a header section — for section labels or summary tiles.',
          preview: isKaayo ? (
            <KayoBrutalistCard style={{ width: '288px' }}>
              <KayoBrutalistCardHeader
                title="Kaayo Atoms"
                badge={<KayoBrutalistBadge variant="success">Stable</KayoBrutalistBadge>}
              />
            </KayoBrutalistCard>
          ) : (
            <Card className="w-72">
              <CardHeader><CardTitle>Kaayo Atoms</CardTitle></CardHeader>
            </Card>
          ),
          code: {
            react: `<KayoBrutalistCard>
  <KayoBrutalistCardHeader
    title="Kaayo Atoms"
    badge={<KayoBrutalistBadge variant="success">Stable</KayoBrutalistBadge>}
  />
</KayoBrutalistCard>`,
          },
        },
        {
          title: 'With Header Action',
          description: 'Action icon slot in the header — for edit, settings, or overflow triggers.',
          preview: isKaayo ? (
            <KayoBrutalistCard style={{ width: '288px' }}>
              <KayoBrutalistCardHeader
                title="Student Profile"
                description="Grade 8 · Batch A"
                action={
                  <button style={{
                    background: 'none', border: '2px solid #3b3d3f', borderRadius: '6px',
                    width: '32px', height: '32px', cursor: 'pointer', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', color: '#3b3d3f',
                  }}>
                    <Pencil size={14} />
                  </button>
                }
              />
              <KayoBrutalistCardBody>
                Arjun Krishnamurthy — Roll 14 · UPI auto-pay enabled
              </KayoBrutalistCardBody>
            </KayoBrutalistCard>
          ) : (
            <Card className="w-72">
              <CardHeader className="flex-row justify-between items-start">
                <div><CardTitle>Student Profile</CardTitle><CardDescription>Grade 8 · Batch A</CardDescription></div>
                <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
              </CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">Arjun Krishnamurthy — Roll 14</p></CardContent>
            </Card>
          ),
          code: {
            react: `<KayoBrutalistCard>
  <KayoBrutalistCardHeader
    title="Student Profile"
    description="Grade 8 · Batch A"
    action={
      <button style={{ border: '2px solid #3b3d3f', borderRadius: '6px', width: 32, height: 32 }}>
        <Pencil size={14} />
      </button>
    }
  />
  <KayoBrutalistCardBody>Arjun Krishnamurthy — Roll 14</KayoBrutalistCardBody>
</KayoBrutalistCard>`,
          },
        },
        {
          title: 'Interactive',
          description: 'Pass onClick to enable the press animation — translate(2px, 2px) + shadow collapse.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {['Batch A', 'Batch B', 'Batch C'].map(batch => (
                <KayoBrutalistCard key={batch} onClick={() => {}} style={{ width: '140px' }}>
                  <KayoBrutalistCardBody>
                    <div style={{ fontWeight: 600, fontSize: '14px' }}>{batch}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>12 students</div>
                  </KayoBrutalistCardBody>
                </KayoBrutalistCard>
              ))}
            </div>
          ) : (
            <div className="flex gap-3">
              {['Batch A', 'Batch B', 'Batch C'].map(b => (
                <Card key={b} className="w-36 cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="pt-4">
                    <p className="font-semibold">{b}</p>
                    <p className="text-xs text-muted-foreground">12 students</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ),
          code: {
            react: `<KayoBrutalistCard onClick={() => navigate(\`/batches/\${id}\`)}>
  <KayoBrutalistCardBody>
    <div style={{ fontWeight: 600 }}>Batch A</div>
    <div style={{ fontSize: 12, color: '#6b7280' }}>12 students</div>
  </KayoBrutalistCardBody>
</KayoBrutalistCard>`,
          },
        },
        {
          title: 'Footer Alignment',
          description: 'Three justify variants for the footer — start, end (default), between.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '360px' }}>
              {(['start', 'end', 'between'] as const).map(j => (
                <KayoBrutalistCard key={j}>
                  <KayoBrutalistCardHeader title={`justify="${j}"`} />
                  <KayoBrutalistCardFooter justify={j}>
                    <KayoBrutalistButton label="Cancel" variant="secondary" size="sm" />
                    <KayoBrutalistButton label="Save"   variant="primary"   size="sm" />
                  </KayoBrutalistCardFooter>
                </KayoBrutalistCard>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3 w-full max-w-sm">
              {(['start', 'end', 'between'] as const).map(j => (
                <Card key={j}>
                  <CardFooter className={`flex ${j === 'between' ? 'justify-between' : j === 'start' ? 'justify-start' : 'justify-end'} gap-2 pt-4`}>
                    <Button variant="outline" size="sm">Cancel</Button>
                    <Button size="sm">Save</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ),
          code: {
            react: `<KayoBrutalistCardFooter justify="between">
  <KayoBrutalistButton label="Cancel" variant="secondary" size="sm" />
  <KayoBrutalistButton label="Save"   variant="primary"   size="sm" />
</KayoBrutalistCardFooter>`,
          },
        },
      ]}
    />
  )
}
