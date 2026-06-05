# Kaayo Molecules Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement KayoBrutalistAlert, KayoBrutalistCard, KayoBrutalistTabs, and KayoBrutalistAccordion — create each component file and update the corresponding page to add isKaayo branching across all variant/permutation sections.

**Architecture:** Each component lives in `src/app/components/custom/kaayo/`. Pure inline styles + CSS injection (useEffect + STYLE_ID guard). Pages use `const { activeProduct } = useProductTheme(); const isKaayo = activeProduct === 'kaayo'` to branch. No Tailwind classes in Kaayo previews. All `var(--kayo-color-*)` tokens carry hex fallbacks.

**Tech Stack:** React 18 (no `import React` needed — JSX transform active), TypeScript, Lucide React icons, inline CSS with `var(--kayo-color-*)` tokens

**Project root:** `D:\Aumraa\APOS pitch\1_Product Factory\02_Breathe Design system`

---

## Task 1: KayoBrutalistAlert — component

**Files:**
- Create: `src/app/components/custom/kaayo/KayoBrutalistAlert.tsx`

- [ ] **Step 1: Create the component file**

```tsx
// src/app/components/custom/kaayo/KayoBrutalistAlert.tsx
import { ReactNode } from 'react'

export type KayoAlertVariant = 'info' | 'success' | 'warning' | 'error'

export interface KayoBrutalistAlertProps {
  variant?: KayoAlertVariant
  title?: string
  description?: string
  icon?: ReactNode
  dismissible?: boolean
  onDismiss?: () => void
}

const variantConfig: Record<KayoAlertVariant, {
  border: string; accent: string; bg: string; iconColor: string
}> = {
  info:    { border: '#3b3d3f', accent: '#3b3d3f', bg: '#f9f9f9', iconColor: '#3b3d3f' },
  success: { border: '#166534', accent: '#166534', bg: '#f0fdf4', iconColor: '#166534' },
  warning: { border: '#92400e', accent: '#d97706', bg: '#fffbeb', iconColor: '#d97706' },
  error:   { border: '#970103', accent: '#970103', bg: '#fff5f5', iconColor: '#970103' },
}

export function KayoBrutalistAlert({
  variant = 'info',
  title,
  description,
  icon,
  dismissible = false,
  onDismiss,
}: KayoBrutalistAlertProps) {
  const cfg = variantConfig[variant]

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      padding: '12px 16px 12px 20px',
      border: `2px solid ${cfg.border}`,
      borderRadius: '6px',
      background: cfg.bg,
      boxShadow: '2px 2px 0 #191b1f',
      fontFamily: "'DM Sans', system-ui, sans-serif",
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
    }}>
      {/* Left accent bar */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '4px',
        background: cfg.accent,
      }} />

      {/* Icon */}
      {icon && (
        <span style={{ color: cfg.iconColor, flexShrink: 0, marginTop: '1px', display: 'flex' }}>
          {icon}
        </span>
      )}

      {/* Content */}
      <div style={{ flex: 1 }}>
        {title && (
          <div style={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#191b1f',
            marginBottom: description ? '4px' : 0,
          }}>
            {title}
          </div>
        )}
        {description && (
          <div style={{ fontSize: '13px', color: '#3b3d3f', lineHeight: '1.5' }}>
            {description}
          </div>
        )}
      </div>

      {/* Dismiss button */}
      {dismissible && (
        <button
          onClick={onDismiss}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#3b3d3f',
            padding: '0',
            flexShrink: 0,
            fontSize: '18px',
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
          }}
          aria-label="Dismiss"
        >
          ×
        </button>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Type-check**

```powershell
cd "D:\Aumraa\APOS pitch\1_Product Factory\02_Breathe Design system"
npx tsc --noEmit
```

Expected: no errors (or only pre-existing errors unrelated to this file).

- [ ] **Step 3: Commit**

```bash
git add src/app/components/custom/kaayo/KayoBrutalistAlert.tsx
git commit -m "feat(kaayo): KayoBrutalistAlert — 4 variants with left accent bar + dismiss"
```

---

## Task 2: AlertPage.tsx — Kaayo branching

**Files:**
- Modify: `src/app/pages/molecules/AlertPage.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
// src/app/pages/molecules/AlertPage.tsx
import { useState } from 'react'
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Alert, AlertDescription, AlertTitle } from '@/app/components/ui/alert'
import { Terminal, AlertTriangle, Info, CheckCircle2, XCircle } from 'lucide-react'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistAlert } from '@/app/components/custom/kaayo/KayoBrutalistAlert'

export function AlertPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'
  const [dismissed, setDismissed] = useState(false)

  return (
    <ComponentPageLayout
      title="Alert"
      description="Communicates a status, warning, error, or informational message inline within the page. Does not require user action to dismiss."
      level="Molecule"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Variants',
          description: 'Four semantic variants — info, success, warning, and error — each with a left accent bar.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '480px' }}>
              <KayoBrutalistAlert variant="info"    title="Information"  description="Your account settings have been updated." icon={<Info size={18} />} />
              <KayoBrutalistAlert variant="success" title="Success"      description="Payment of ₹4,200 processed successfully." icon={<CheckCircle2 size={18} />} />
              <KayoBrutalistAlert variant="warning" title="Warning"      description="Your subscription expires in 3 days." icon={<AlertTriangle size={18} />} />
              <KayoBrutalistAlert variant="error"   title="Error"        description="Failed to connect. Please try again." icon={<XCircle size={18} />} />
            </div>
          ) : (
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
            react: `import { KayoBrutalistAlert } from '@breathe/kaayo'
import { Info, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'

<KayoBrutalistAlert variant="info"    title="Information"  description="..." icon={<Info size={18} />} />
<KayoBrutalistAlert variant="success" title="Success"      description="..." icon={<CheckCircle2 size={18} />} />
<KayoBrutalistAlert variant="warning" title="Warning"      description="..." icon={<AlertTriangle size={18} />} />
<KayoBrutalistAlert variant="error"   title="Error"        description="..." icon={<XCircle size={18} />} />`,
            reactNative: `import { View, Text } from 'react-native'

// variant colours: info=#3b3d3f success=#166534 warning=#d97706 error=#970103
function KayoAlert({ variant = 'info', title, description }) {
  const colors = {
    info:    { border: '#3b3d3f', accent: '#3b3d3f', bg: '#f9f9f9' },
    success: { border: '#166534', accent: '#166534', bg: '#f0fdf4' },
    warning: { border: '#92400e', accent: '#d97706', bg: '#fffbeb' },
    error:   { border: '#970103', accent: '#970103', bg: '#fff5f5' },
  }[variant]
  return (
    <View style={{ borderWidth: 2, borderColor: colors.border, borderRadius: 6, backgroundColor: colors.bg,
      flexDirection: 'row', overflow: 'hidden' }}>
      <View style={{ width: 4, backgroundColor: colors.accent }} />
      <View style={{ padding: 12, flex: 1 }}>
        {title && <Text style={{ fontSize: 14, fontWeight: '600', color: '#191b1f', fontFamily: 'DMSans-SemiBold' }}>{title}</Text>}
        {description && <Text style={{ fontSize: 13, color: '#3b3d3f', marginTop: 4, fontFamily: 'DMSans-Regular' }}>{description}</Text>}
      </View>
    </View>
  )
}`,
          },
        },
        {
          title: 'With Dismiss',
          description: 'Controlled dismiss — parent manages visibility via onDismiss callback.',
          preview: isKaayo ? (
            <div style={{ width: '100%', maxWidth: '480px' }}>
              {!dismissed ? (
                <KayoBrutalistAlert
                  variant="error"
                  title="Session expired"
                  description="Please log in again to continue."
                  icon={<XCircle size={18} />}
                  dismissible
                  onDismiss={() => setDismissed(true)}
                />
              ) : (
                <button
                  onClick={() => setDismissed(false)}
                  style={{
                    padding: '8px 16px', border: '2px solid #3b3d3f', borderRadius: '6px',
                    background: '#f4f4f4', cursor: 'pointer', fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: '13px', fontWeight: 500,
                  }}
                >
                  Reset demo
                </button>
              )}
            </div>
          ) : (
            <Alert variant="destructive" className="max-w-lg">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Something went wrong.</AlertDescription>
            </Alert>
          ),
          code: {
            react: `const [visible, setVisible] = useState(true)

{visible && (
  <KayoBrutalistAlert
    variant="error"
    title="Session expired"
    description="Please log in again to continue."
    icon={<XCircle size={18} />}
    dismissible
    onDismiss={() => setVisible(false)}
  />
)}`,
          },
        },
        {
          title: 'Title Only',
          description: 'Alert with no description — for short confirmations or status nudges.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '480px' }}>
              <KayoBrutalistAlert variant="info"    title="2 pending approvals" />
              <KayoBrutalistAlert variant="success" title="Changes saved successfully." />
            </div>
          ) : (
            <div className="space-y-3 w-full max-w-lg">
              <Alert><AlertTitle>2 pending approvals</AlertTitle></Alert>
            </div>
          ),
          code: {
            react: `<KayoBrutalistAlert variant="info" title="2 pending approvals" />
<KayoBrutalistAlert variant="success" title="Changes saved successfully." />`,
          },
        },
        {
          title: 'No Icon',
          description: 'Omit the icon prop when the text alone communicates the status.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '480px' }}>
              <KayoBrutalistAlert variant="warning" title="Maintenance window" description="The system will be unavailable on Sunday 2–4 AM." />
              <KayoBrutalistAlert variant="error"   title="Upload failed"     description="File size exceeds the 10 MB limit." />
            </div>
          ) : (
            <Alert className="max-w-lg">
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>No icon provided — text carries the message.</AlertDescription>
            </Alert>
          ),
          code: {
            react: `<KayoBrutalistAlert
  variant="warning"
  title="Maintenance window"
  description="The system will be unavailable on Sunday 2–4 AM."
/>`,
          },
        },
        {
          title: 'With Inline Action',
          description: 'Append a call-to-action link inside the description for contextual guidance.',
          preview: isKaayo ? (
            <div style={{ width: '100%', maxWidth: '480px' }}>
              <KayoBrutalistAlert
                variant="warning"
                title="Trial ending soon"
                icon={<AlertTriangle size={18} />}
                description={
                  <span>
                    Your trial expires in 3 days.{' '}
                    <a href="#" style={{ color: '#970103', fontWeight: 600, textDecoration: 'underline' }}>
                      Upgrade now →
                    </a>
                  </span>
                }
              />
            </div>
          ) : (
            <Alert className="max-w-lg">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Trial ending soon</AlertTitle>
              <AlertDescription>Your trial expires in 3 days. <a href="#" className="underline font-medium">Upgrade now →</a></AlertDescription>
            </Alert>
          ),
          code: {
            react: `<KayoBrutalistAlert
  variant="warning"
  title="Trial ending soon"
  icon={<AlertTriangle size={18} />}
  description={
    <span>
      Your trial expires in 3 days.{' '}
      <a href="/upgrade" style={{ color: '#970103', fontWeight: 600, textDecoration: 'underline' }}>
        Upgrade now →
      </a>
    </span>
  }
/>`,
          },
        },
      ]}
    />
  )
}
```

- [ ] **Step 2: Type-check**

```powershell
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Visual verification**

```powershell
npm run dev
```

Navigate to `/molecules/alert`. Switch brand selector to **Kaayo**. Verify:
- Variants section: 4 alerts stacked, each with left accent bar in its colour
- With Dismiss: X button visible, clicking it removes the alert and shows reset button
- Title Only: 2 alerts with no description line
- No Icon: 2 alerts, no icon space on left
- With Inline Action: crimson underlined link inside description

Switch back to Lemniscate/Aumraa — shadcn Alert renders correctly (regression check).

- [ ] **Step 4: Commit**

```bash
git add src/app/pages/molecules/AlertPage.tsx
git commit -m "feat(kaayo): AlertPage — isKaayo branching, 5 sections, all variants"
```

---

## Task 3: KayoBrutalistCard — component

**Files:**
- Create: `src/app/components/custom/kaayo/KayoBrutalistCard.tsx`

- [ ] **Step 1: Create the component file**

```tsx
// src/app/components/custom/kaayo/KayoBrutalistCard.tsx
import { useState, ReactNode } from 'react'

export type KayoCardVariant = 'default' | 'elevated' | 'flat'

export interface KayoBrutalistCardProps {
  variant?: KayoCardVariant
  onClick?: () => void
  fullWidth?: boolean
  children: ReactNode
}

const shadowMap: Record<KayoCardVariant, string> = {
  default:  '2px 2px 0 #191b1f',
  elevated: '4px 4px 0 #191b1f',
  flat:     'none',
}

export function KayoBrutalistCard({
  variant = 'default',
  onClick,
  fullWidth = false,
  children,
}: KayoBrutalistCardProps) {
  const [pressed, setPressed] = useState(false)
  const isInteractive = !!onClick
  const isPressed = pressed && isInteractive

  return (
    <div
      onClick={onClick}
      onMouseDown={() => isInteractive && setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        border: '2px solid var(--kayo-color-border, #3b3d3f)',
        borderRadius: '6px',
        background: 'var(--kayo-color-background, #ffffff)',
        boxShadow: isPressed ? 'none' : shadowMap[variant],
        transform: isPressed ? 'translate(2px, 2px)' : 'none',
        transition: 'transform 80ms, box-shadow 80ms',
        fontFamily: "'DM Sans', system-ui, sans-serif",
        cursor: isInteractive ? 'pointer' : 'default',
        width: fullWidth ? '100%' : undefined,
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  )
}

export function KayoBrutalistCardHeader({
  title,
  description,
  badge,
  action,
}: {
  title: string
  description?: string
  badge?: ReactNode
  action?: ReactNode
}) {
  return (
    <div style={{
      padding: '16px',
      borderBottom: '2px solid var(--kayo-color-border, #3b3d3f)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: '8px',
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{
            fontSize: '15px', fontWeight: 600,
            color: 'var(--kayo-color-foreground, #3b3d3f)',
          }}>
            {title}
          </span>
          {badge}
        </div>
        {description && (
          <p style={{ fontSize: '13px', color: '#6b7280', margin: '4px 0 0' }}>
            {description}
          </p>
        )}
      </div>
      {action && <div style={{ flexShrink: 0 }}>{action}</div>}
    </div>
  )
}

export function KayoBrutalistCardBody({ children }: { children: ReactNode }) {
  return (
    <div style={{
      padding: '16px',
      fontSize: '14px',
      color: 'var(--kayo-color-foreground, #3b3d3f)',
      lineHeight: '1.6',
    }}>
      {children}
    </div>
  )
}

export function KayoBrutalistCardFooter({
  justify = 'end',
  children,
}: {
  justify?: 'start' | 'end' | 'between'
  children: ReactNode
}) {
  const justifyMap = { start: 'flex-start', end: 'flex-end', between: 'space-between' }
  return (
    <div style={{
      padding: '16px',
      borderTop: '2px solid var(--kayo-color-border, #3b3d3f)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: justifyMap[justify],
      gap: '8px',
    }}>
      {children}
    </div>
  )
}
```

- [ ] **Step 2: Type-check**

```powershell
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/components/custom/kaayo/KayoBrutalistCard.tsx
git commit -m "feat(kaayo): KayoBrutalistCard — default/elevated/flat variants + Header/Body/Footer sub-components"
```

---

## Task 4: CardPage.tsx — Kaayo branching

**Files:**
- Modify: `src/app/pages/molecules/CardPage.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
// src/app/pages/molecules/CardPage.tsx
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
  card:      { borderWidth: 2, borderColor: '#3b3d3f', borderRadius: 6, backgroundColor: '#fff', shadowColor: '#191b1f', shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1, shadowRadius: 0, elevation: 3 },
  header:    { padding: 16, borderBottomWidth: 2, borderBottomColor: '#3b3d3f' },
  body:      { padding: 16 },
  footer:    { padding: 16, borderTopWidth: 2, borderTopColor: '#3b3d3f', flexDirection: 'row', justifyContent: 'flex-end', gap: 8 },
  title:     { fontSize: 15, fontWeight: '600', color: '#3b3d3f', fontFamily: 'DMSans-SemiBold' },
  subtitle:  { fontSize: 13, color: '#6b7280', marginTop: 4, fontFamily: 'DMSans-Regular' },
  bodyText:  { fontSize: 14, color: '#3b3d3f', lineHeight: 22, fontFamily: 'DMSans-Regular' },
  btnPri:    { backgroundColor: '#970103', borderWidth: 2, borderColor: '#3b3d3f', borderRadius: 6, paddingHorizontal: 14, paddingVertical: 8 },
  btnSec:    { backgroundColor: '#fff',    borderWidth: 2, borderColor: '#3b3d3f', borderRadius: 6, paddingHorizontal: 14, paddingVertical: 8 },
  btnPriTxt: { color: '#fff',     fontSize: 14, fontWeight: '500', fontFamily: 'DMSans-Medium' },
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
                  <button style={{ background: 'none', border: '2px solid #3b3d3f', borderRadius: '6px',
                    width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', color: '#3b3d3f' }}>
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
    action={<button style={{ border: '2px solid #3b3d3f', borderRadius: '6px', width: 32, height: 32 }}><Pencil size={14} /></button>}
  />
  <KayoBrutalistCardBody>Arjun Krishnamurthy — Roll 14</KayoBrutalistCardBody>
</KayoBrutalistCard>`,
          },
        },
        {
          title: 'Interactive (Clickable)',
          description: 'Pass onClick to enable the press animation — translate(2px, 2px) + shadow collapse.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {['Batch A', 'Batch B', 'Batch C'].map(batch => (
                <KayoBrutalistCard
                  key={batch}
                  onClick={() => {}}
                  style={{ width: '140px' }}
                >
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
                  <CardContent className="pt-4"><p className="font-semibold">{b}</p><p className="text-xs text-muted-foreground">12 students</p></CardContent>
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
              {['start', 'end', 'between'].map(j => (
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
```

**Note:** The `style` prop on `KayoBrutalistCard` needs to be wired through. Update the component to accept and spread an optional `style?: React.CSSProperties` prop:

In `KayoBrutalistCard.tsx`, update the interface and component:
```tsx
export interface KayoBrutalistCardProps {
  variant?: KayoCardVariant
  onClick?: () => void
  fullWidth?: boolean
  style?: React.CSSProperties   // ← add this
  children: ReactNode
}
```
And in the rendered `<div>`:
```tsx
style={{
  ...existingStyles,
  ...style,   // ← spread at end so caller can add width etc.
}}
```

- [ ] **Step 2: Add `style` prop to KayoBrutalistCard** (see note above — edit the component file)

- [ ] **Step 3: Type-check**

```powershell
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Visual verification**

```powershell
npm run dev
```

Navigate to `/molecules/card`. Switch to Kaayo. Verify:
- Default: full card with header/body/footer dividers, shadow-sm
- Elevated: deeper shadow-md
- Flat: no shadow
- Header Only: badge appears inline with title
- With Header Action: pencil button in top-right of header
- Interactive: press any batch card — translate + shadow collapse animation fires
- Footer Alignment: three cards showing start/end/between footer positions

Switch to Lemniscate — shadcn Card renders correctly.

- [ ] **Step 5: Commit**

```bash
git add src/app/components/custom/kaayo/KayoBrutalistCard.tsx src/app/pages/molecules/CardPage.tsx
git commit -m "feat(kaayo): CardPage — isKaayo branching, 7 sections, all variants + interactive"
```

---

## Task 5: KayoBrutalistTabs — component

**Files:**
- Create: `src/app/components/custom/kaayo/KayoBrutalistTabs.tsx`

- [ ] **Step 1: Create the component file**

```tsx
// src/app/components/custom/kaayo/KayoBrutalistTabs.tsx
import { useState, ReactNode } from 'react'

export type KayoTabSize = 'sm' | 'md' | 'lg'

export interface KayoTab {
  value: string
  label: string
  icon?: ReactNode
  badge?: string | number
  disabled?: boolean
  content: ReactNode
}

export interface KayoBrutalistTabsProps {
  tabs: KayoTab[]
  defaultValue?: string
  size?: KayoTabSize
  fullWidth?: boolean
}

const sizeTokens: Record<KayoTabSize, { fontSize: number; pH: number; pV: number; minH: number }> = {
  sm: { fontSize: 12, pH: 10, pV: 6,  minH: 32 },
  md: { fontSize: 14, pH: 14, pV: 8,  minH: 40 },
  lg: { fontSize: 15, pH: 18, pV: 10, minH: 48 },
}

export function KayoBrutalistTabs({
  tabs,
  defaultValue,
  size = 'md',
  fullWidth = false,
}: KayoBrutalistTabsProps) {
  const [active, setActive] = useState(defaultValue ?? tabs[0]?.value)
  const { fontSize, pH, pV, minH } = sizeTokens[size]

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", width: fullWidth ? '100%' : undefined }}>
      {/* Tab bar */}
      <div style={{
        display: 'flex',
        border: '2px solid var(--kayo-color-border, #3b3d3f)',
        borderRadius: '6px',
        boxShadow: '2px 2px 0 #191b1f',
        background: '#f4f4f4',
        overflow: 'hidden',
      }}>
        {tabs.map((tab, i) => {
          const isActive = tab.value === active
          const isDisabled = !!tab.disabled

          return (
            <button
              key={tab.value}
              disabled={isDisabled}
              onClick={() => !isDisabled && setActive(tab.value)}
              style={{
                flex: fullWidth ? 1 : undefined,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                paddingLeft: pH,
                paddingRight: pH,
                paddingTop: pV,
                paddingBottom: pV,
                minHeight: minH,
                fontSize,
                fontWeight: isActive ? 600 : 400,
                fontFamily: "'DM Sans', system-ui, sans-serif",
                background: isActive
                  ? 'var(--kayo-color-primary, #970103)'
                  : 'transparent',
                color: isActive
                  ? '#ffffff'
                  : isDisabled
                    ? '#a8a8aa'
                    : 'var(--kayo-color-foreground, #3b3d3f)',
                border: 'none',
                borderRight: i < tabs.length - 1
                  ? '2px solid var(--kayo-color-border, #3b3d3f)'
                  : 'none',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                outline: 'none',
                userSelect: 'none',
                whiteSpace: 'nowrap',
                transition: 'background 80ms',
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span style={{
                  fontSize: Math.max(fontSize - 2, 10),
                  background: isActive ? 'rgba(255,255,255,0.25)' : '#3b3d3f',
                  color: '#fff',
                  borderRadius: '999px',
                  padding: '1px 6px',
                  fontWeight: 600,
                  lineHeight: '1.4',
                  minWidth: '18px',
                  textAlign: 'center',
                }}>
                  {tab.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Tab content */}
      <div style={{
        paddingTop: '16px',
        fontSize: '14px',
        color: 'var(--kayo-color-foreground, #3b3d3f)',
        lineHeight: '1.6',
      }}>
        {tabs.find(t => t.value === active)?.content}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Type-check**

```powershell
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/components/custom/kaayo/KayoBrutalistTabs.tsx
git commit -m "feat(kaayo): KayoBrutalistTabs — block active tab, sm/md/lg sizes, badge + icon + disabled support"
```

---

## Task 6: TabsPage.tsx — Kaayo branching

**Files:**
- Modify: `src/app/pages/molecules/TabsPage.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
// src/app/pages/molecules/TabsPage.tsx
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs'
import { BarChart2, Settings, Eye, Bell, Users, FileText } from 'lucide-react'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistTabs } from '@/app/components/custom/kaayo/KayoBrutalistTabs'

export function TabsPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  return (
    <ComponentPageLayout
      title="Tabs"
      description="Organises content into switchable panels. All tabs are visible at once — use when the user needs to compare or switch between views."
      level="Molecule"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Default',
          description: '3 tabs, md size. Active tab fills with crimson; inactive is transparent.',
          preview: isKaayo ? (
            <KayoBrutalistTabs
              tabs={[
                { value: 'overview',   label: 'Overview',   content: <p>Overview content — student attendance and upcoming classes.</p> },
                { value: 'analytics',  label: 'Analytics',  content: <p>Analytics content — fee collection trends and batch performance.</p> },
                { value: 'settings',   label: 'Settings',   content: <p>Settings content — batch schedule, notifications, and permissions.</p> },
              ]}
              defaultValue="overview"
            />
          ) : (
            <Tabs defaultValue="overview" className="w-full max-w-sm">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="overview"  className="mt-3 text-sm text-muted-foreground">Overview content here.</TabsContent>
              <TabsContent value="analytics" className="mt-3 text-sm text-muted-foreground">Analytics content here.</TabsContent>
              <TabsContent value="settings"  className="mt-3 text-sm text-muted-foreground">Settings content here.</TabsContent>
            </Tabs>
          ),
          code: {
            react: `import { KayoBrutalistTabs } from '@breathe/kaayo'

<KayoBrutalistTabs
  tabs={[
    { value: 'overview',  label: 'Overview',  content: <p>Overview content.</p> },
    { value: 'analytics', label: 'Analytics', content: <p>Analytics content.</p> },
    { value: 'settings',  label: 'Settings',  content: <p>Settings content.</p> },
  ]}
  defaultValue="overview"
/>`,
            reactNative: `import { useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'

const tabs = [
  { id: 'overview',  label: 'Overview' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'settings',  label: 'Settings' },
]

function KayoTabs({ tabs, renderContent }) {
  const [active, setActive] = useState(tabs[0].id)
  return (
    <View>
      <View style={{ flexDirection: 'row', borderWidth: 2, borderColor: '#3b3d3f',
        borderRadius: 6, overflow: 'hidden', shadowColor: '#191b1f',
        shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1, shadowRadius: 0 }}>
        {tabs.map((tab, i) => {
          const isActive = tab.id === active
          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setActive(tab.id)}
              style={{ flex: 1, paddingVertical: 8, paddingHorizontal: 14, alignItems: 'center',
                backgroundColor: isActive ? '#970103' : 'transparent',
                borderRightWidth: i < tabs.length - 1 ? 2 : 0, borderRightColor: '#3b3d3f' }}
            >
              <Text style={{ fontSize: 14, fontWeight: isActive ? '600' : '400',
                color: isActive ? '#fff' : '#3b3d3f', fontFamily: 'DMSans-Medium' }}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
      <View style={{ paddingTop: 16 }}>{renderContent(active)}</View>
    </View>
  )
}`,
          },
        },
        {
          title: 'With Icons',
          description: 'Tab triggers include a Lucide icon before the label.',
          preview: isKaayo ? (
            <KayoBrutalistTabs
              tabs={[
                { value: 'overview',  label: 'Overview',  icon: <Eye size={15} />,      content: <p>Overview content.</p> },
                { value: 'analytics', label: 'Analytics', icon: <BarChart2 size={15} />, content: <p>Analytics content.</p> },
                { value: 'settings',  label: 'Settings',  icon: <Settings size={15} />,  content: <p>Settings content.</p> },
              ]}
            />
          ) : (
            <Tabs defaultValue="overview" className="w-full max-w-sm">
              <TabsList>
                <TabsTrigger value="overview" className="gap-1.5"><Eye className="h-3.5 w-3.5" />Overview</TabsTrigger>
                <TabsTrigger value="analytics" className="gap-1.5"><BarChart2 className="h-3.5 w-3.5" />Analytics</TabsTrigger>
                <TabsTrigger value="settings" className="gap-1.5"><Settings className="h-3.5 w-3.5" />Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="overview"  className="mt-3 text-sm text-muted-foreground">Overview.</TabsContent>
              <TabsContent value="analytics" className="mt-3 text-sm text-muted-foreground">Analytics.</TabsContent>
              <TabsContent value="settings"  className="mt-3 text-sm text-muted-foreground">Settings.</TabsContent>
            </Tabs>
          ),
          code: {
            react: `import { Eye, BarChart2, Settings } from 'lucide-react'

<KayoBrutalistTabs
  tabs={[
    { value: 'overview',  label: 'Overview',  icon: <Eye size={15} />,      content: <p>...</p> },
    { value: 'analytics', label: 'Analytics', icon: <BarChart2 size={15} />, content: <p>...</p> },
    { value: 'settings',  label: 'Settings',  icon: <Settings size={15} />,  content: <p>...</p> },
  ]}
/>`,
          },
        },
        {
          title: 'With Badge Count',
          description: 'Numeric badge on a tab — use for unread counts or pending actions.',
          preview: isKaayo ? (
            <KayoBrutalistTabs
              tabs={[
                { value: 'students',   label: 'Students',      content: <p>Student list.</p> },
                { value: 'alerts',     label: 'Alerts',   badge: 4, content: <p>4 unread alerts.</p> },
                { value: 'messages',   label: 'Messages', badge: 12, content: <p>12 unread messages.</p> },
              ]}
              defaultValue="students"
            />
          ) : (
            <Tabs defaultValue="students" className="w-full max-w-sm">
              <TabsList>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="alerts">Alerts <span className="ml-1 rounded-full bg-red-100 px-1.5 text-xs text-red-600">4</span></TabsTrigger>
                <TabsTrigger value="messages">Messages <span className="ml-1 rounded-full bg-slate-100 px-1.5 text-xs">12</span></TabsTrigger>
              </TabsList>
              <TabsContent value="students"  className="mt-3 text-sm text-muted-foreground">Student list.</TabsContent>
              <TabsContent value="alerts"    className="mt-3 text-sm text-muted-foreground">4 unread alerts.</TabsContent>
              <TabsContent value="messages"  className="mt-3 text-sm text-muted-foreground">12 unread messages.</TabsContent>
            </Tabs>
          ),
          code: {
            react: `<KayoBrutalistTabs
  tabs={[
    { value: 'students', label: 'Students',                 content: <p>...</p> },
    { value: 'alerts',   label: 'Alerts',   badge: 4,  content: <p>...</p> },
    { value: 'messages', label: 'Messages', badge: 12, content: <p>...</p> },
  ]}
/>`,
          },
        },
        {
          title: 'Sizes',
          description: 'sm / md / lg — controls font size and hit area.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {(['sm', 'md', 'lg'] as const).map(size => (
                <div key={size}>
                  <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '6px', fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>{size}</div>
                  <KayoBrutalistTabs
                    size={size}
                    tabs={[
                      { value: 'a', label: 'Overview',  content: <p>Overview.</p> },
                      { value: 'b', label: 'Analytics', content: <p>Analytics.</p> },
                    ]}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Tabs defaultValue="a"><TabsList><TabsTrigger value="a" className="text-xs">Overview</TabsTrigger><TabsTrigger value="b" className="text-xs">Analytics</TabsTrigger></TabsList></Tabs>
              <Tabs defaultValue="a"><TabsList><TabsTrigger value="a">Overview</TabsTrigger><TabsTrigger value="b">Analytics</TabsTrigger></TabsList></Tabs>
              <Tabs defaultValue="a"><TabsList><TabsTrigger value="a" className="text-base">Overview</TabsTrigger><TabsTrigger value="b" className="text-base">Analytics</TabsTrigger></TabsList></Tabs>
            </div>
          ),
          code: {
            react: `<KayoBrutalistTabs size="sm" tabs={[...]} />
<KayoBrutalistTabs size="md" tabs={[...]} />  {/* default */}
<KayoBrutalistTabs size="lg" tabs={[...]} />`,
          },
        },
        {
          title: 'Full Width',
          description: 'Tabs expand to fill container width equally.',
          preview: isKaayo ? (
            <div style={{ width: '100%', maxWidth: '480px' }}>
              <KayoBrutalistTabs
                fullWidth
                tabs={[
                  { value: 'students', label: 'Students', icon: <Users size={14} />,   content: <p>All students in this batch.</p> },
                  { value: 'sessions', label: 'Sessions', icon: <FileText size={14} />, content: <p>Past and upcoming sessions.</p> },
                  { value: 'alerts',   label: 'Alerts',   icon: <Bell size={14} />,     content: <p>Attendance and payment alerts.</p> },
                ]}
              />
            </div>
          ) : (
            <Tabs defaultValue="students" className="w-full max-w-lg">
              <TabsList className="w-full">
                <TabsTrigger value="students" className="flex-1">Students</TabsTrigger>
                <TabsTrigger value="sessions" className="flex-1">Sessions</TabsTrigger>
                <TabsTrigger value="alerts"   className="flex-1">Alerts</TabsTrigger>
              </TabsList>
              <TabsContent value="students"  className="mt-3 text-sm text-muted-foreground">All students.</TabsContent>
              <TabsContent value="sessions"  className="mt-3 text-sm text-muted-foreground">Sessions.</TabsContent>
              <TabsContent value="alerts"    className="mt-3 text-sm text-muted-foreground">Alerts.</TabsContent>
            </Tabs>
          ),
          code: {
            react: `<KayoBrutalistTabs fullWidth tabs={[...]} />`,
          },
        },
        {
          title: 'With Disabled Tab',
          description: 'Disabled tabs are visually muted and non-interactive.',
          preview: isKaayo ? (
            <KayoBrutalistTabs
              tabs={[
                { value: 'active',   label: 'Active',   content: <p>Active batch students.</p> },
                { value: 'archived', label: 'Archived', disabled: true, content: <p>Archived content.</p> },
                { value: 'reports',  label: 'Reports',  content: <p>Batch reports.</p> },
              ]}
              defaultValue="active"
            />
          ) : (
            <Tabs defaultValue="active" className="w-full max-w-sm">
              <TabsList>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="archived" disabled>Archived</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
              <TabsContent value="active"   className="mt-3 text-sm text-muted-foreground">Active batch students.</TabsContent>
              <TabsContent value="archived" className="mt-3 text-sm text-muted-foreground">Archived.</TabsContent>
              <TabsContent value="reports"  className="mt-3 text-sm text-muted-foreground">Reports.</TabsContent>
            </Tabs>
          ),
          code: {
            react: `<KayoBrutalistTabs
  tabs={[
    { value: 'active',   label: 'Active',   content: <p>...</p> },
    { value: 'archived', label: 'Archived', disabled: true, content: <p>...</p> },
    { value: 'reports',  label: 'Reports',  content: <p>...</p> },
  ]}
/>`,
          },
        },
      ]}
    />
  )
}
```

- [ ] **Step 2: Type-check**

```powershell
npx tsc --noEmit
```

- [ ] **Step 3: Visual verification**

Navigate to `/molecules/tabs`. Switch to Kaayo. Verify:
- Default: active tab fills crimson, separator lines between tabs visible, content switches instantly
- With Icons: icons appear before label text
- With Badge: count pill appears in tab trigger; white pill on active, charcoal pill on inactive
- Sizes: sm/md/lg tabs clearly differ in height
- Full Width: tabs stretch to fill container equally
- With Disabled: middle tab is muted, cursor not-allowed, cannot be clicked

- [ ] **Step 4: Commit**

```bash
git add src/app/pages/molecules/TabsPage.tsx
git commit -m "feat(kaayo): TabsPage — isKaayo branching, 6 sections, all permutations"
```

---

## Task 7: KayoBrutalistAccordion — component

**Files:**
- Create: `src/app/components/custom/kaayo/KayoBrutalistAccordion.tsx`

- [ ] **Step 1: Create the component file**

```tsx
// src/app/components/custom/kaayo/KayoBrutalistAccordion.tsx
import { useState, useEffect, ReactNode } from 'react'

const STYLE_ID = 'kayo-accordion-styles'

export interface KayoAccordionItem {
  value: string
  trigger: string
  content: ReactNode
  icon?: ReactNode
  badge?: string | number
  disabled?: boolean
}

export interface KayoBrutalistAccordionProps {
  items: KayoAccordionItem[]
  type?: 'single' | 'multiple'
  defaultOpen?: string | string[]
}

export function KayoBrutalistAccordion({
  items,
  type = 'single',
  defaultOpen,
}: KayoBrutalistAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(() => {
    if (!defaultOpen) return new Set()
    const arr = Array.isArray(defaultOpen) ? defaultOpen : [defaultOpen]
    return new Set(arr)
  })

  useEffect(() => {
    if (!document.getElementById(STYLE_ID)) {
      const s = document.createElement('style')
      s.id = STYLE_ID
      s.textContent = `
        .kayo-acc-chevron { transition: transform 200ms ease; display: flex; flex-shrink: 0; }
        .kayo-acc-chevron.open { transform: rotate(180deg); }
      `
      document.head.appendChild(s)
    }
  }, [])

  const toggle = (value: string) => {
    setOpenItems(prev => {
      const next = new Set(prev)
      if (next.has(value)) {
        next.delete(value)
      } else {
        if (type === 'single') next.clear()
        next.add(value)
      }
      return next
    })
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      fontFamily: "'DM Sans', system-ui, sans-serif",
      width: '100%',
    }}>
      {items.map(item => {
        const isOpen = openItems.has(item.value)
        const isDisabled = !!item.disabled

        return (
          <div
            key={item.value}
            style={{
              border: `2px solid ${isDisabled ? '#d1d5db' : 'var(--kayo-color-border, #3b3d3f)'}`,
              borderRadius: '6px',
              boxShadow: isOpen ? '4px 4px 0 #191b1f' : isDisabled ? 'none' : '2px 2px 0 #191b1f',
              overflow: 'hidden',
              transition: 'box-shadow 200ms',
              background: 'var(--kayo-color-background, #ffffff)',
            }}
          >
            {/* Trigger row */}
            <button
              disabled={isDisabled}
              onClick={() => toggle(item.value)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 16px',
                background: 'none',
                border: 'none',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                textAlign: 'left',
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: '14px',
                fontWeight: 600,
                color: isDisabled
                  ? '#a8a8aa'
                  : 'var(--kayo-color-foreground, #3b3d3f)',
                outline: 'none',
              }}
            >
              {/* Optional prefix icon */}
              {item.icon && (
                <span style={{ flexShrink: 0, display: 'flex', color: 'inherit' }}>
                  {item.icon}
                </span>
              )}

              {/* Label */}
              <span style={{ flex: 1 }}>{item.trigger}</span>

              {/* Optional badge */}
              {item.badge !== undefined && (
                <span style={{
                  fontSize: '11px',
                  background: 'var(--kayo-color-muted, #f4f4f4)',
                  border: '1px solid var(--kayo-color-border, #3b3d3f)',
                  borderRadius: '999px',
                  padding: '1px 7px',
                  fontWeight: 500,
                  color: 'var(--kayo-color-foreground, #3b3d3f)',
                  flexShrink: 0,
                }}>
                  {item.badge}
                </span>
              )}

              {/* Chevron */}
              <span className={`kayo-acc-chevron${isOpen ? ' open' : ''}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </button>

            {/* Expanded content */}
            {isOpen && (
              <div style={{
                borderTop: '2px solid var(--kayo-color-border, #3b3d3f)',
                padding: '12px 16px 16px',
                fontSize: '13px',
                color: 'var(--kayo-color-foreground, #3b3d3f)',
                lineHeight: '1.6',
              }}>
                {item.content}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 2: Type-check**

```powershell
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/components/custom/kaayo/KayoBrutalistAccordion.tsx
git commit -m "feat(kaayo): KayoBrutalistAccordion — single/multiple expand, chevron animation, icon/badge/disabled support"
```

---

## Task 8: AccordionPage.tsx — Kaayo branching

**Files:**
- Modify: `src/app/pages/molecules/AccordionPage.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
// src/app/pages/molecules/AccordionPage.tsx
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/app/components/ui/accordion'
import { FileText, Settings, Bell, CreditCard, Users } from 'lucide-react'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistAccordion } from '@/app/components/custom/kaayo/KayoBrutalistAccordion'
import { KayoBrutalistButton } from '@/app/components/custom/kaayo/KayoBrutalistButton'

export function AccordionPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  return (
    <ComponentPageLayout
      title="Accordion"
      description="Vertically stacked sections that expand to reveal content. Use for FAQs, settings groups, and collapsible details."
      level="Molecule"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Single Expand',
          description: 'Only one section open at a time — default type. Each item is its own shadow block.',
          preview: isKaayo ? (
            <div style={{ width: '100%', maxWidth: '480px' }}>
              <KayoBrutalistAccordion
                type="single"
                items={[
                  { value: 'dues',    trigger: 'How are dues calculated?',          content: 'Dues are calculated based on the maintenance amount set for your flat, billed on the 1st of each month.' },
                  { value: 'payment', trigger: 'What payment methods are accepted?', content: 'UPI, bank transfer, and cash payments are all recorded in Kaayo.' },
                  { value: 'receipt', trigger: 'Can I get a receipt?',               content: 'Yes — receipts are auto-generated and sent via email on payment confirmation.' },
                ]}
              />
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full max-w-sm">
              <AccordionItem value="dues">
                <AccordionTrigger>How are dues calculated?</AccordionTrigger>
                <AccordionContent>Dues are calculated based on the maintenance amount set for your flat, billed on the 1st of each month.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="payment">
                <AccordionTrigger>What payment methods are accepted?</AccordionTrigger>
                <AccordionContent>UPI, bank transfer, and cash payments are all recorded in Lemniscate.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="receipt">
                <AccordionTrigger>Can I get a receipt?</AccordionTrigger>
                <AccordionContent>Yes — receipts are auto-generated and sent via email on payment confirmation.</AccordionContent>
              </AccordionItem>
            </Accordion>
          ),
          code: {
            react: `import { KayoBrutalistAccordion } from '@breathe/kaayo'

<KayoBrutalistAccordion
  type="single"
  items={[
    { value: 'dues',    trigger: 'How are dues calculated?',          content: 'Dues are calculated...' },
    { value: 'payment', trigger: 'What payment methods are accepted?', content: 'UPI, bank transfer...' },
    { value: 'receipt', trigger: 'Can I get a receipt?',               content: 'Yes — receipts...' },
  ]}
/>`,
            reactNative: `import { useState } from 'react'
import { View, Text, TouchableOpacity, LayoutAnimation } from 'react-native'

function KayoAccordion({ items }) {
  const [open, setOpen] = useState(null)
  const toggle = (val) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setOpen(open === val ? null : val)
  }
  return (
    <View style={{ gap: 8 }}>
      {items.map(item => (
        <View key={item.value} style={{
          borderWidth: 2, borderColor: '#3b3d3f', borderRadius: 6,
          shadowColor: '#191b1f', shadowOffset: { width: open === item.value ? 4 : 2, height: open === item.value ? 4 : 2 },
          shadowOpacity: 1, shadowRadius: 0, backgroundColor: '#fff' }}>
          <TouchableOpacity onPress={() => toggle(item.value)}
            style={{ padding: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#3b3d3f', fontFamily: 'DMSans-SemiBold', flex: 1 }}>
              {item.trigger}
            </Text>
            <Text style={{ fontSize: 16, color: '#3b3d3f' }}>{open === item.value ? '∧' : '∨'}</Text>
          </TouchableOpacity>
          {open === item.value && (
            <View style={{ borderTopWidth: 2, borderTopColor: '#3b3d3f', padding: 12, paddingTop: 12 }}>
              <Text style={{ fontSize: 13, color: '#3b3d3f', lineHeight: 20, fontFamily: 'DMSans-Regular' }}>
                {item.content}
              </Text>
            </View>
          )}
        </View>
      ))}
    </View>
  )
}`,
          },
        },
        {
          title: 'Multiple Expand',
          description: 'Multiple sections can be open simultaneously — pass type="multiple".',
          preview: isKaayo ? (
            <div style={{ width: '100%', maxWidth: '480px' }}>
              <KayoBrutalistAccordion
                type="multiple"
                defaultOpen={['rules', 'amenity']}
                items={[
                  { value: 'rules',   trigger: 'Building Rules',    content: 'No loud music after 10 PM. Pets allowed in common areas on a leash.' },
                  { value: 'amenity', trigger: 'Amenity Booking',   content: 'Book the gym or pool via the Kaayo app. 2-hour slots, 1 booking per day per flat.' },
                  { value: 'parking', trigger: 'Parking Guidelines', content: 'Each flat is allocated one covered slot. Visitor parking available at Gate 2.' },
                ]}
              />
            </div>
          ) : (
            <Accordion type="multiple" className="w-full max-w-sm">
              <AccordionItem value="a"><AccordionTrigger>Building Rules</AccordionTrigger><AccordionContent>Community rules and regulations.</AccordionContent></AccordionItem>
              <AccordionItem value="b"><AccordionTrigger>Amenity Booking</AccordionTrigger><AccordionContent>How to book shared amenities.</AccordionContent></AccordionItem>
            </Accordion>
          ),
          code: {
            react: `<KayoBrutalistAccordion
  type="multiple"
  defaultOpen={['rules', 'amenity']}
  items={[...]}
/>`,
          },
        },
        {
          title: 'With Icons',
          description: 'Prefix icons in each trigger — use to categorise content visually.',
          preview: isKaayo ? (
            <div style={{ width: '100%', maxWidth: '480px' }}>
              <KayoBrutalistAccordion
                type="single"
                items={[
                  { value: 'fees',     trigger: 'Fee Structure',    icon: <CreditCard size={16} />, content: 'Monthly tuition: ₹3,000. Annual registration: ₹500. Late fee: ₹200 after the 10th.' },
                  { value: 'students', trigger: 'Student Policies', icon: <Users size={16} />,      content: 'Attendance of 75% is mandatory to appear for term exams.' },
                  { value: 'docs',     trigger: 'Documents',        icon: <FileText size={16} />,   content: 'Submit report cards, ID proof, and bank details during enrolment.' },
                ]}
              />
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full max-w-sm">
              <AccordionItem value="fees"><AccordionTrigger>Fee Structure</AccordionTrigger><AccordionContent>Monthly tuition: ₹3,000.</AccordionContent></AccordionItem>
              <AccordionItem value="students"><AccordionTrigger>Student Policies</AccordionTrigger><AccordionContent>Attendance of 75%.</AccordionContent></AccordionItem>
            </Accordion>
          ),
          code: {
            react: `import { CreditCard, Users, FileText } from 'lucide-react'

<KayoBrutalistAccordion
  items={[
    { value: 'fees', trigger: 'Fee Structure', icon: <CreditCard size={16} />, content: '...' },
    { value: 'students', trigger: 'Student Policies', icon: <Users size={16} />, content: '...' },
  ]}
/>`,
          },
        },
        {
          title: 'With Badge',
          description: 'Numeric badge next to the trigger label — shows count of nested items.',
          preview: isKaayo ? (
            <div style={{ width: '100%', maxWidth: '480px' }}>
              <KayoBrutalistAccordion
                type="single"
                items={[
                  { value: 'alerts',    trigger: 'Pending Alerts',    badge: 3,  content: 'Payment overdue: Flat 12A, 14B, 22C.' },
                  { value: 'approvals', trigger: 'Approvals',         badge: 7,  content: '7 leave applications pending review.' },
                  { value: 'settings',  trigger: 'Batch Settings',    icon: <Settings size={16} />, content: 'Configure schedule, holidays, and communication preferences.' },
                ]}
              />
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full max-w-sm">
              <AccordionItem value="a"><AccordionTrigger>Pending Alerts <span className="ml-2 text-xs bg-red-100 text-red-600 px-1.5 rounded-full">3</span></AccordionTrigger><AccordionContent>Payment overdue items.</AccordionContent></AccordionItem>
            </Accordion>
          ),
          code: {
            react: `<KayoBrutalistAccordion
  items={[
    { value: 'alerts', trigger: 'Pending Alerts', badge: 3, content: '...' },
  ]}
/>`,
          },
        },
        {
          title: 'With Disabled Item',
          description: 'Disabled items are visually muted — border lightens, shadow removed, click blocked.',
          preview: isKaayo ? (
            <div style={{ width: '100%', maxWidth: '480px' }}>
              <KayoBrutalistAccordion
                type="single"
                items={[
                  { value: 'schedule', trigger: 'Class Schedule',    content: 'Mon–Fri, 4 PM to 6 PM. Saturday optional sessions.' },
                  { value: 'exams',    trigger: 'Exam Access',       disabled: true, content: 'Accessible after enrolment confirmation.' },
                  { value: 'reports',  trigger: 'Progress Reports',  content: 'Monthly reports shared via email and in-app.' },
                ]}
              />
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full max-w-sm">
              <AccordionItem value="schedule"><AccordionTrigger>Class Schedule</AccordionTrigger><AccordionContent>Mon–Fri, 4 PM to 6 PM.</AccordionContent></AccordionItem>
              <AccordionItem value="exams" disabled><AccordionTrigger>Exam Access</AccordionTrigger><AccordionContent>Accessible after confirmation.</AccordionContent></AccordionItem>
              <AccordionItem value="reports"><AccordionTrigger>Progress Reports</AccordionTrigger><AccordionContent>Monthly reports.</AccordionContent></AccordionItem>
            </Accordion>
          ),
          code: {
            react: `<KayoBrutalistAccordion
  items={[
    { value: 'schedule', trigger: 'Class Schedule', content: '...' },
    { value: 'exams',    trigger: 'Exam Access',    disabled: true, content: '...' },
    { value: 'reports',  trigger: 'Progress Reports', content: '...' },
  ]}
/>`,
          },
        },
        {
          title: 'With Action in Content',
          description: 'Expanded content includes a KayoBrutalistButton — for contextual next actions.',
          preview: isKaayo ? (
            <div style={{ width: '100%', maxWidth: '480px' }}>
              <KayoBrutalistAccordion
                type="single"
                defaultOpen="notifications"
                items={[
                  {
                    value: 'notifications',
                    trigger: 'Notification Settings',
                    icon: <Bell size={16} />,
                    content: (
                      <div>
                        <p style={{ marginBottom: '12px' }}>SMS alerts for payments and attendance are enabled. Email digests sent weekly.</p>
                        <KayoBrutalistButton label="Manage Notifications" size="sm" variant="secondary" />
                      </div>
                    ),
                  },
                  {
                    value: 'documents',
                    trigger: 'Documents',
                    icon: <FileText size={16} />,
                    badge: 2,
                    content: (
                      <div>
                        <p style={{ marginBottom: '12px' }}>2 documents pending upload: ID proof and bank statement.</p>
                        <KayoBrutalistButton label="Upload Now" size="sm" variant="primary" />
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full max-w-sm">
              <AccordionItem value="notifications">
                <AccordionTrigger>Notification Settings</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-3 text-sm">SMS alerts for payments and attendance are enabled.</p>
                  <button className="text-sm underline">Manage Notifications →</button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ),
          code: {
            react: `<KayoBrutalistAccordion
  items={[
    {
      value: 'notifications',
      trigger: 'Notification Settings',
      icon: <Bell size={16} />,
      content: (
        <div>
          <p style={{ marginBottom: '12px' }}>SMS alerts for payments and attendance are enabled.</p>
          <KayoBrutalistButton label="Manage Notifications" size="sm" variant="secondary" />
        </div>
      ),
    },
  ]}
/>`,
          },
        },
      ]}
    />
  )
}
```

- [ ] **Step 2: Type-check**

```powershell
npx tsc --noEmit
```

- [ ] **Step 3: Visual verification**

Navigate to `/molecules/accordion`. Switch to Kaayo. Verify:
- Single Expand: click one item — it opens (shadow deepens to shadow-md), clicking another closes the first
- Multiple Expand: two items open by default, clicking a third keeps the existing two open
- With Icons: icons appear before trigger text, proper alignment
- With Badge: pill count badge right of label, inside trigger row
- With Disabled: middle item has lightened border, no shadow, cursor changes, cannot click
- With Action: expanded items show KayoBrutalistButton inside content area; chevron rotation animation works

Switch to Lemniscate — shadcn Accordion renders correctly.

- [ ] **Step 4: Commit**

```bash
git add src/app/pages/molecules/AccordionPage.tsx
git commit -m "feat(kaayo): AccordionPage — isKaayo branching, 6 sections, single/multiple/icons/badge/disabled/action"
```

---

## Self-Review Checklist (completed)

| Check | Status |
|---|---|
| All 4 spec permutation matrices covered in page sections | ✓ |
| All component prop APIs match spec exactly | ✓ |
| `KayoBrutalistCard` needs `style` prop — noted in Task 4 | ✓ |
| `implemented={['lemniscate', 'aumraa', 'kaayo']}` in all 4 pages | ✓ |
| No `import React` (React 18 JSX transform) | ✓ |
| All `var(--kayo-color-*)` tokens carry hex fallbacks | ✓ |
| CSS injection uses STYLE_ID guard (only Accordion needs it — for chevron CSS class) | ✓ |
| Non-Kaayo shadcn branches preserved in all sections | ✓ |
| Code blocks include react + reactNative for major sections | ✓ |
