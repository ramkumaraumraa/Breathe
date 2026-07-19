import { useState } from 'react'
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/molecules/card'
import { Button } from '@/app/components/atoms/button'
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
import { KayoBrutalistPaymentSummaryCard } from '@aumraa/breathe-react/kaayo'

export function CardPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'
  const [isVisible, setIsVisible] = useState(true)

  return (
    <ComponentPageLayout
      title="Card"
      description="Surface that groups related information and actions. Cards create visual hierarchy and make content scannable, with specialized financial card variations."
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
          },
        },
        {
          title: 'Payment Summary Card (Kaayo Sub-Component)',
          description: 'Specialized dashboard card for tuition fee metric breakdowns (Expected, Collected, Pending) and student payment status counts.',
          preview: (
            <div className="w-full max-w-xl">
              <KayoBrutalistPaymentSummaryCard
                title="March 2026 Collection"
                expected={150000}
                collected={110000}
                pending={40000}
                totalStudents={45}
                paidStudents={33}
                unpaidStudents={12}
                isVisible={isVisible}
                onToggleVisibility={() => setIsVisible(!isVisible)}
              />
            </div>
          ),
          code: {
            react: `import { KayoBrutalistPaymentSummaryCard } from '@aumraa/breathe-react/kaayo'

<KayoBrutalistPaymentSummaryCard
  title="March 2026 Collection"
  expected={150000}
  collected={110000}
  pending={40000}
  totalStudents={45}
  paidStudents={33}
  unpaidStudents={12}
  isVisible={isVisible}
  onToggleVisibility={() => setIsVisible(!isVisible)}
/>`,
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
      ]}
    />
  )
}
