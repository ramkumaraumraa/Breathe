import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/app/components/molecules/hover-card'
import { Avatar, AvatarFallback } from '@/app/components/atoms/avatar'
import { Button } from '@/app/components/atoms/button'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistHoverCard } from '@/app/components/custom/kaayo/KayoBrutalistHoverCard'
import { KayoBrutalistAvatar } from '@/app/components/custom/kaayo/KayoBrutalistAvatar'
import { KayoBrutalistBadge } from '@/app/components/custom/kaayo/KayoBrutalistBadge'
import { KayoBrutalistButton } from '@/app/components/custom/kaayo/KayoBrutalistButton'

export function HoverCardPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  return (
    <ComponentPageLayout
      title="Hover Card"
      description="Reveals supplementary information when hovering over a trigger element. Non-critical context, not actions."
      level="Molecule"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'User Profile',
          description: 'Trigger: @username link. Card: avatar + display name + role + status.',
          preview: isKaayo ? (
            <KayoBrutalistHoverCard
              trigger={
                <span style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: 14,
                  color: 'var(--kayo-color-primary, #970103)',
                  cursor: 'pointer',
                  fontWeight: 500,
                  textDecoration: 'underline',
                }}>
                  @ramkumar_g
                </span>
              }
            >
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <KayoBrutalistAvatar fallback="RG" size="md" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#3b3d3f' }}>Ramkumar G</span>
                  <span style={{ fontSize: 12, color: '#6b7280' }}>Owner · Flat A-101 · Block B</span>
                  <span style={{ fontSize: 12, color: '#6b7280' }}>Member since Jan 2024</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#22c55e' }} />
                    <span style={{ fontSize: 12, color: '#166534' }}>Dues cleared</span>
                  </div>
                </div>
              </div>
            </KayoBrutalistHoverCard>
          ) : (
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link" className="p-0 h-auto">@ramkumar_g</Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-72">
                <div className="flex items-start gap-3">
                  <Avatar><AvatarFallback>RG</AvatarFallback></Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Ramkumar G</p>
                    <p className="text-xs text-muted-foreground">Owner · Flat A-101</p>
                    <p className="text-xs text-muted-foreground">Member since Jan 2024</p>
                    <div className="flex items-center gap-1 pt-1">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-xs text-green-600">Dues cleared</span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ),
          code: {
            react: `import { KayoBrutalistHoverCard } from '@breathe/kaayo'
import { KayoBrutalistAvatar } from '@breathe/kaayo'

<KayoBrutalistHoverCard
  trigger={<span style={{ color: '#970103', textDecoration: 'underline' }}>@ramkumar_g</span>}
>
  <div style={{ display: 'flex', gap: 12 }}>
    <KayoBrutalistAvatar fallback="RG" size="md" />
    <div>
      <span>Ramkumar G</span>
      <span>Owner · Flat A-101</span>
    </div>
  </div>
</KayoBrutalistHoverCard>`,
          },
        },
        {
          title: 'Link Preview',
          description: 'Trigger: URL text. Card: page title + 2-line description + domain badge.',
          preview: isKaayo ? (
            <KayoBrutalistHoverCard
              trigger={
                <span style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: 14,
                  color: 'var(--kayo-color-primary, #970103)',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}>
                  kaayo.app/society/rules
                </span>
              }
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#3b3d3f', lineHeight: '1.4' }}>
                  Society Rules &amp; Regulations — Kaayo
                </span>
                <span style={{ fontSize: 12, color: '#6b7280', lineHeight: '1.5' }}>
                  Complete rulebook for Sunrise Residences including noise policy, parking allocation, and visitor guidelines.
                </span>
                <div>
                  <KayoBrutalistBadge variant="secondary">kaayo.app</KayoBrutalistBadge>
                </div>
              </div>
            </KayoBrutalistHoverCard>
          ) : (
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link" className="p-0 h-auto text-sm">kaayo.app/society/rules</Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Society Rules &amp; Regulations — Kaayo</p>
                  <p className="text-xs text-muted-foreground">Complete rulebook including noise policy, parking allocation, and visitor guidelines.</p>
                  <span className="rounded-full border px-2 py-0.5 text-xs">kaayo.app</span>
                </div>
              </HoverCardContent>
            </HoverCard>
          ),
          code: {
            react: `<KayoBrutalistHoverCard
  trigger={<span style={{ color: '#970103' }}>kaayo.app/society/rules</span>}
>
  <span>Society Rules &amp; Regulations</span>
  <KayoBrutalistBadge variant="secondary">kaayo.app</KayoBrutalistBadge>
</KayoBrutalistHoverCard>`,
          },
        },
        {
          title: 'Stat Summary',
          description: 'Trigger: metric value. Card: label + value + delta badge — use in dashboards.',
          preview: isKaayo ? (
            <KayoBrutalistHoverCard
              trigger={
                <span style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#3b3d3f',
                  cursor: 'default',
                  borderBottom: '2px dashed #3b3d3f',
                  paddingBottom: 2,
                }}>
                  ₹4,200
                </span>
              }
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#a8a8aa', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Monthly Maintenance
                </span>
                <span style={{ fontSize: 24, fontWeight: 700, color: '#3b3d3f' }}>₹4,200</span>
                <div>
                  <KayoBrutalistBadge variant="success">↑ 12% vs last month</KayoBrutalistBadge>
                </div>
                <span style={{ fontSize: 12, color: '#6b7280' }}>Based on 142 active units</span>
              </div>
            </KayoBrutalistHoverCard>
          ) : (
            <HoverCard>
              <HoverCardTrigger asChild>
                <span className="text-xl font-bold cursor-default border-b-2 border-dashed border-border pb-0.5">₹4,200</span>
              </HoverCardTrigger>
              <HoverCardContent className="w-56">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Monthly Maintenance</p>
                  <p className="text-2xl font-bold">₹4,200</p>
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">↑ 12% vs last month</span>
                  <p className="text-xs text-muted-foreground">Based on 142 active units</p>
                </div>
              </HoverCardContent>
            </HoverCard>
          ),
          code: {
            react: `<KayoBrutalistHoverCard
  trigger={<span style={{ fontSize: 20, fontWeight: 700 }}>₹4,200</span>}
>
  <span>Monthly Maintenance</span>
  <span>₹4,200</span>
  <KayoBrutalistBadge variant="success">↑ 12%</KayoBrutalistBadge>
</KayoBrutalistHoverCard>`,
          },
        },
        {
          title: 'With Actions',
          description: 'User profile card with Follow and Message buttons — shows action slots in a HoverCard.',
          preview: isKaayo ? (
            <KayoBrutalistHoverCard
              trigger={
                <span style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: 14,
                  color: 'var(--kayo-color-primary, #970103)',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}>
                  @priya.sharma
                </span>
              }
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <KayoBrutalistAvatar fallback="PS" size="md" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#3b3d3f' }}>Priya Sharma</span>
                    <span style={{ fontSize: 12, color: '#6b7280' }}>Secretary · Sunrise Residences</span>
                    <span style={{ fontSize: 12, color: '#6b7280' }}>Member since Mar 2022</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <KayoBrutalistButton label="Follow" size="sm" />
                  <KayoBrutalistButton label="Message" size="sm" variant="secondary" />
                </div>
              </div>
            </KayoBrutalistHoverCard>
          ) : (
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link" className="p-0 h-auto">@priya.sharma</Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-72">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Avatar><AvatarFallback>PS</AvatarFallback></Avatar>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Priya Sharma</p>
                      <p className="text-xs text-muted-foreground">Secretary · Sunrise Residences</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm">Follow</Button>
                    <Button size="sm" variant="outline">Message</Button>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ),
          code: {
            react: `<KayoBrutalistHoverCard
  trigger={<span style={{ color: '#970103' }}>@priya.sharma</span>}
>
  <KayoBrutalistAvatar fallback="PS" size="md" />
  <div>Priya Sharma · Secretary</div>
  <div style={{ display: 'flex', gap: 8 }}>
    <KayoBrutalistButton label="Follow" size="sm" />
    <KayoBrutalistButton label="Message" size="sm" variant="secondary" />
  </div>
</KayoBrutalistHoverCard>`,
          },
        },
      ]}
    />
  )
}
