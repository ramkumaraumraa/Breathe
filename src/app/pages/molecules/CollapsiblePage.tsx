import { useState } from 'react'
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/app/components/molecules/collapsible'
import { Avatar, AvatarFallback } from '@/app/components/atoms/avatar'
import { Button } from '@/app/components/atoms/button'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistCollapsible } from '@/app/components/custom/kaayo/KayoBrutalistCollapsible'
import { KayoBrutalistAvatar } from '@/app/components/custom/kaayo/KayoBrutalistAvatar'

function ProgrammaticDemo() {
  const [aOpen, setAOpen] = useState(false)
  const [bOpen, setBOpen] = useState(false)
  const allOpen = aOpen && bOpen

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 480 }}>
      <div>
        <button
          type="button"
          onClick={() => { const next = !allOpen; setAOpen(next); setBOpen(next) }}
          style={{
            padding: '6px 14px',
            fontSize: 13,
            fontWeight: 600,
            fontFamily: "'DM Sans', system-ui, sans-serif",
            border: '2px solid var(--kayo-color-border, #3b3d3f)',
            borderRadius: 6,
            background: '#ffffff',
            cursor: 'pointer',
            boxShadow: '2px 2px 0 #191b1f',
          }}
        >
          {allOpen ? 'Collapse all' : 'Expand all'}
        </button>
      </div>
      <KayoBrutalistCollapsible trigger="Payment Settings" open={aOpen} onOpenChange={setAOpen}>
        <p>Configure payment methods, late fee rules, and auto-reminders.</p>
      </KayoBrutalistCollapsible>
      <KayoBrutalistCollapsible trigger="Notification Preferences" open={bOpen} onOpenChange={setBOpen}>
        <p>Choose which alerts you receive via SMS, email, and push notifications.</p>
      </KayoBrutalistCollapsible>
    </div>
  )
}

export function CollapsiblePage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  return (
    <ComponentPageLayout
      title="Collapsible"
      description="A single expandable section. Use when you need one toggle without the Accordion's list structure."
      level="Molecule"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Default',
          description: 'Collapsed by default — click trigger to reveal content.',
          preview: isKaayo ? (
            <div style={{ width: '100%', maxWidth: 480 }}>
              <KayoBrutalistCollapsible trigger="Advanced filters">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ padding: '10px 12px', border: '2px solid var(--kayo-color-border, #3b3d3f)', borderRadius: 6, fontSize: 13, color: '#6b7280' }}>
                    Date range filter
                  </div>
                  <div style={{ padding: '10px 12px', border: '2px solid var(--kayo-color-border, #3b3d3f)', borderRadius: 6, fontSize: 13, color: '#6b7280' }}>
                    Category filter
                  </div>
                </div>
              </KayoBrutalistCollapsible>
            </div>
          ) : (
            <Collapsible className="w-full max-w-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Advanced filters</span>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">Toggle ▾</Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="space-y-2">
                <div className="rounded-md border px-4 py-3 text-sm text-muted-foreground">Date range filter</div>
                <div className="rounded-md border px-4 py-3 text-sm text-muted-foreground">Category filter</div>
              </CollapsibleContent>
            </Collapsible>
          ),
          code: {
            react: `import { KayoBrutalistCollapsible } from '@breathe/kaayo'

<KayoBrutalistCollapsible trigger="Advanced filters">
  <p>Hidden content revealed on click.</p>
</KayoBrutalistCollapsible>`,
          },
        },
        {
          title: 'Default Open',
          description: '`defaultOpen={true}` — starts expanded, shadow-md visible immediately.',
          preview: isKaayo ? (
            <div style={{ width: '100%', maxWidth: 480 }}>
              <KayoBrutalistCollapsible trigger="Notifications" defaultOpen>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {['Fee due reminder', 'Visitor entry alert', 'Society meeting notice'].map(n => (
                    <div key={n} style={{ fontSize: 13, color: '#3b3d3f', padding: '6px 0', borderBottom: '1px solid #f4f4f4' }}>
                      • {n}
                    </div>
                  ))}
                </div>
              </KayoBrutalistCollapsible>
            </div>
          ) : (
            <Collapsible defaultOpen className="w-full max-w-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Notifications</span>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">Toggle ▾</Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="space-y-1">
                {['Fee due reminder', 'Visitor entry alert', 'Society meeting notice'].map(n => (
                  <p key={n} className="text-sm text-muted-foreground">• {n}</p>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ),
          code: {
            react: `<KayoBrutalistCollapsible trigger="Notifications" defaultOpen>
  <p>• Fee due reminder</p>
  <p>• Visitor entry alert</p>
</KayoBrutalistCollapsible>`,
          },
        },
        {
          title: 'With Rich Content',
          description: 'Trigger: "Team members (3)". Content: mini-list of avatars + names.',
          preview: isKaayo ? (
            <div style={{ width: '100%', maxWidth: 480 }}>
              <KayoBrutalistCollapsible trigger="Team members (3)">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { fallback: 'RG', name: 'Ramkumar G',  role: 'Owner · A-101' },
                    { fallback: 'PS', name: 'Priya Sharma', role: 'Secretary' },
                    { fallback: 'KM', name: 'Kiran M',      role: 'Treasurer' },
                  ].map(m => (
                    <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <KayoBrutalistAvatar fallback={m.fallback} size="sm" />
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#3b3d3f' }}>{m.name}</div>
                        <div style={{ fontSize: 12, color: '#6b7280' }}>{m.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </KayoBrutalistCollapsible>
            </div>
          ) : (
            <Collapsible className="w-full max-w-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Team members (3)</span>
                <CollapsibleTrigger asChild><Button variant="ghost" size="sm">Toggle ▾</Button></CollapsibleTrigger>
              </div>
              <CollapsibleContent className="space-y-2">
                {['Ramkumar G', 'Priya Sharma', 'Kiran M'].map(n => (
                  <div key={n} className="flex items-center gap-2">
                    <Avatar><AvatarFallback>{n.split(' ').map((x: string) => x[0]).join('')}</AvatarFallback></Avatar>
                    <span className="text-sm">{n}</span>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ),
          code: {
            react: `<KayoBrutalistCollapsible trigger="Team members (3)">
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <KayoBrutalistAvatar fallback="RG" size="sm" />
    <span>Ramkumar G</span>
  </div>
</KayoBrutalistCollapsible>`,
          },
        },
        {
          title: 'Trigger Left Chevron',
          description: '`triggerSide="left"` — chevron precedes the label instead of trailing it.',
          preview: isKaayo ? (
            <div style={{ width: '100%', maxWidth: 480 }}>
              <KayoBrutalistCollapsible trigger="Show more options" triggerSide="left">
                <p>Additional options revealed here — filters, export, and bulk actions.</p>
              </KayoBrutalistCollapsible>
            </div>
          ) : (
            <Collapsible className="w-full max-w-sm space-y-2">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-2 px-0">
                  <span>▾</span>
                  <span>Show more options</span>
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <p className="text-sm text-muted-foreground">Additional options revealed here.</p>
              </CollapsibleContent>
            </Collapsible>
          ),
          code: {
            react: `<KayoBrutalistCollapsible trigger="Show more options" triggerSide="left">
  <p>Additional options revealed here.</p>
</KayoBrutalistCollapsible>`,
          },
        },
        {
          title: 'Programmatic Control',
          description: '`open` + `onOpenChange` props for external state — "Expand all / Collapse all" pattern.',
          preview: isKaayo ? (
            <ProgrammaticDemo />
          ) : (
            <div className="w-full max-w-sm space-y-3">
              <Button variant="outline" size="sm">Expand all / Collapse all</Button>
              <Collapsible className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Payment Settings</span>
                  <CollapsibleTrigger asChild><Button variant="ghost" size="sm">▾</Button></CollapsibleTrigger>
                </div>
                <CollapsibleContent><p className="text-sm text-muted-foreground">Configure payment methods and late fee rules.</p></CollapsibleContent>
              </Collapsible>
            </div>
          ),
          code: {
            react: `function Demo() {
  const [aOpen, setAOpen] = useState(false)
  const [bOpen, setBOpen] = useState(false)

  return (
    <>
      <button onClick={() => { setAOpen(true); setBOpen(true) }}>Expand all</button>
      <KayoBrutalistCollapsible open={aOpen} onOpenChange={setAOpen} trigger="Payment Settings">
        <p>Configure payment methods.</p>
      </KayoBrutalistCollapsible>
      <KayoBrutalistCollapsible open={bOpen} onOpenChange={setBOpen} trigger="Notifications">
        <p>Choose alert preferences.</p>
      </KayoBrutalistCollapsible>
    </>
  )
}`,
          },
        },
      ]}
    />
  )
}
