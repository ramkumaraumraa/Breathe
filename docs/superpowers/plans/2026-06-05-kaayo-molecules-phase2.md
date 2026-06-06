# Kaayo Molecules Phase 2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement five Phase 2 Kaayo Neo-Brutalist molecule components (Form, DropdownMenu, Tooltip, HoverCard, Collapsible) and update their corresponding Design System pages with full `isKaayo` branching and all permutation sections.

**Architecture:** Each component lives in `src/app/components/custom/kaayo/` as a pure inline-style React component (no Tailwind, no external deps). Pages branch on `isKaayo = activeProduct === 'kaayo'` — Kaayo variant shows the KayoBrutalist* component; non-Kaayo shows the existing shadcn primitive. Tooltip and HoverCard use `createPortal` from `react-dom` to escape overflow clipping. DropdownMenu injects hover CSS via a `STYLE_ID` guard. Collapsible uses the same `STYLE_ID` CSS injection for chevron rotation as the Phase 1 Accordion.

**Tech Stack:** React 18 (JSX transform, no `import React` needed), TypeScript, inline styles, `createPortal` from react-dom, lucide-react icons, existing Kaayo atoms (`KayoBrutalistInput`, `KayoBrutalistTextarea`, `KayoBrutalistSelect`, `KayoBrutalistCheckbox`, `KayoBrutalistRadioGroup`, `KayoBrutalistButton`, `KayoBrutalistAvatar`, `KayoBrutalistBadge`).

---

## Design Language Invariants (copy into every subagent prompt)

| Token | Value |
|---|---|
| Primary | `var(--kayo-color-primary, #970103)` |
| Foreground | `var(--kayo-color-foreground, #3b3d3f)` |
| Border | `var(--kayo-color-border, #3b3d3f)` |
| Background | `var(--kayo-color-background, #ffffff)` |
| Muted | `var(--kayo-color-muted, #f4f4f4)` |
| Negative | `var(--kayo-color-negative, #dc2626)` |
| Shadow sm | `2px 2px 0 #191b1f` |
| Shadow md | `4px 4px 0 #191b1f` |
| Font | `'DM Sans', system-ui, sans-serif` |
| Border width | `2px solid` |
| Border radius | `6px` (containers), `999px` (pills) |
| Press animation | `translate(2px, 2px)` + shadow → none on mousedown |
| Forbidden | blur, gradients, rounded-xl, box-shadow with blur radius |

---

## File Map

| File | Action |
|---|---|
| `src/app/components/custom/kaayo/KayoBrutalistForm.tsx` | **Create** |
| `src/app/pages/molecules/FormPage.tsx` | **Modify** |
| `src/app/components/custom/kaayo/KayoBrutalistDropdownMenu.tsx` | **Create** |
| `src/app/pages/molecules/DropdownMenuPage.tsx` | **Modify** |
| `src/app/components/custom/kaayo/KayoBrutalistTooltip.tsx` | **Create** |
| `src/app/pages/molecules/TooltipPage.tsx` | **Modify** |
| `src/app/components/custom/kaayo/KayoBrutalistHoverCard.tsx` | **Create** |
| `src/app/pages/molecules/HoverCardPage.tsx` | **Modify** |
| `src/app/components/custom/kaayo/KayoBrutalistCollapsible.tsx` | **Create** |
| `src/app/pages/molecules/CollapsiblePage.tsx` | **Modify** |

---

## Task 1: KayoBrutalistForm component

**Files:**
- Create: `src/app/components/custom/kaayo/KayoBrutalistForm.tsx`

- [ ] **Step 1: Create the file with complete implementation**

```tsx
import { FormEvent, ReactNode, CSSProperties } from 'react'

export type KayoFormLayout = 'vertical' | 'horizontal' | 'inline'

export interface KayoBrutalistFormProps {
  layout?: KayoFormLayout
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void
  children: ReactNode
  style?: CSSProperties
}

export interface KayoBrutalistFormFieldProps {
  label: string
  htmlFor?: string
  error?: string
  hint?: string
  required?: boolean
  children: ReactNode
  layout?: 'vertical' | 'horizontal'
}

export interface KayoBrutalistFormDividerProps {
  label?: string
}

export function KayoBrutalistFormField({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
  layout = 'vertical',
}: KayoBrutalistFormFieldProps) {
  const labelEl = (
    <label
      htmlFor={htmlFor}
      style={{
        fontSize: 12,
        fontWeight: 600,
        color: 'var(--kayo-color-foreground, #3b3d3f)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        lineHeight: '1.4',
        whiteSpace: 'nowrap',
      } as CSSProperties}
    >
      {label}
      {required && (
        <span style={{ color: 'var(--kayo-color-primary, #970103)', marginLeft: 3 }}>*</span>
      )}
    </label>
  )

  if (layout === 'horizontal') {
    return (
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        <div style={{ flexShrink: 0, width: 140, paddingTop: 14 }}>{labelEl}</div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {children}
          {error && <span style={{ fontSize: 12, color: 'var(--kayo-color-negative, #dc2626)' }}>{error}</span>}
          {!error && hint && <span style={{ fontSize: 12, color: '#166534' }}>{hint}</span>}
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {labelEl}
      {children}
      {error && <span style={{ fontSize: 12, color: 'var(--kayo-color-negative, #dc2626)' }}>{error}</span>}
      {!error && hint && <span style={{ fontSize: 12, color: '#166534' }}>{hint}</span>}
    </div>
  )
}

export function KayoBrutalistFormDivider({ label }: KayoBrutalistFormDividerProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '4px 0', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {label && (
        <span style={{
          fontSize: 12,
          fontWeight: 600,
          color: 'var(--kayo-color-foreground, #3b3d3f)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        } as CSSProperties}>
          {label}
        </span>
      )}
      <div style={{ flex: 1, height: 2, backgroundColor: 'var(--kayo-color-border, #3b3d3f)' }} />
    </div>
  )
}

export function KayoBrutalistForm({
  layout = 'vertical',
  onSubmit,
  children,
  style,
}: KayoBrutalistFormProps) {
  const containerStyle: CSSProperties =
    layout === 'inline'
      ? { display: 'flex', flexDirection: 'row', gap: 12, alignItems: 'flex-end' }
      : { display: 'flex', flexDirection: 'column', gap: 16 }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit?.(e) }}
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif", ...containerStyle, ...style }}
    >
      {children}
    </form>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/components/custom/kaayo/KayoBrutalistForm.tsx
git commit -m "feat(molecules): KayoBrutalistForm — layout wrapper + FormField + FormDivider"
```

---

## Task 2: FormPage update

**Files:**
- Modify: `src/app/pages/molecules/FormPage.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Label } from '@/app/components/ui/label'
import { Input } from '@/app/components/ui/input'
import { Textarea } from '@/app/components/ui/textarea'
import { Button } from '@/app/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import {
  KayoBrutalistForm,
  KayoBrutalistFormField,
  KayoBrutalistFormDivider,
} from '@/app/components/custom/kaayo/KayoBrutalistForm'
import { KayoBrutalistInput } from '@/app/components/custom/kaayo/KayoBrutalistInput'
import { KayoBrutalistTextarea } from '@/app/components/custom/kaayo/KayoBrutalistTextarea'
import { KayoBrutalistSelect } from '@/app/components/custom/kaayo/KayoBrutalistSelect'
import { KayoBrutalistCheckbox } from '@/app/components/custom/kaayo/KayoBrutalistCheckbox'
import { KayoBrutalistRadioGroup } from '@/app/components/custom/kaayo/KayoBrutalistRadioGroup'
import { KayoBrutalistButton } from '@/app/components/custom/kaayo/KayoBrutalistButton'

export function FormPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  return (
    <ComponentPageLayout
      title="Form"
      description="Structured layout pattern for collecting user input. Combines Label, Input, Select, and validation states."
      level="Molecule"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Login Form',
          description: 'Email + password + remember me checkbox + submit — the minimal auth pattern.',
          preview: isKaayo ? (
            <KayoBrutalistForm style={{ width: '100%', maxWidth: 360 }}>
              <KayoBrutalistFormField label="Email" required>
                <KayoBrutalistInput placeholder="name@example.com" type="email" />
              </KayoBrutalistFormField>
              <KayoBrutalistFormField label="Password" required>
                <KayoBrutalistInput placeholder="Enter password" isPassword />
              </KayoBrutalistFormField>
              <KayoBrutalistCheckbox label="Remember me on this device" />
              <KayoBrutalistButton label="Sign In" fullWidth />
            </KayoBrutalistForm>
          ) : (
            <div className="w-full max-w-sm space-y-5">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email <span className="text-destructive">*</span></Label>
                <Input id="login-email" type="email" placeholder="name@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-pw">Password <span className="text-destructive">*</span></Label>
                <Input id="login-pw" type="password" placeholder="Enter password" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="login-remember" className="h-4 w-4" />
                <label htmlFor="login-remember" className="text-sm">Remember me on this device</label>
              </div>
              <Button className="w-full">Sign In</Button>
            </div>
          ),
          code: {
            react: `import { KayoBrutalistForm, KayoBrutalistFormField } from '@breathe/kaayo'
import { KayoBrutalistInput } from '@breathe/kaayo'
import { KayoBrutalistCheckbox } from '@breathe/kaayo'
import { KayoBrutalistButton } from '@breathe/kaayo'

<KayoBrutalistForm>
  <KayoBrutalistFormField label="Email" required>
    <KayoBrutalistInput placeholder="name@example.com" type="email" />
  </KayoBrutalistFormField>
  <KayoBrutalistFormField label="Password" required>
    <KayoBrutalistInput placeholder="Enter password" isPassword />
  </KayoBrutalistFormField>
  <KayoBrutalistCheckbox label="Remember me" />
  <KayoBrutalistButton label="Sign In" fullWidth />
</KayoBrutalistForm>`,
          },
        },
        {
          title: 'Registration Form',
          description: 'Four fields with grouping — shows how fields stack in a vertical layout.',
          preview: isKaayo ? (
            <KayoBrutalistForm style={{ width: '100%', maxWidth: 360 }}>
              <KayoBrutalistFormField label="Full Name" required>
                <KayoBrutalistInput placeholder="Ramkumar G" />
              </KayoBrutalistFormField>
              <KayoBrutalistFormField label="Email" required>
                <KayoBrutalistInput placeholder="name@example.com" type="email" />
              </KayoBrutalistFormField>
              <KayoBrutalistFormField label="Password" required>
                <KayoBrutalistInput placeholder="Min 8 characters" isPassword />
              </KayoBrutalistFormField>
              <KayoBrutalistFormField label="Confirm Password" required>
                <KayoBrutalistInput placeholder="Repeat password" isPassword />
              </KayoBrutalistFormField>
              <KayoBrutalistButton label="Create Account" fullWidth />
            </KayoBrutalistForm>
          ) : (
            <div className="w-full max-w-sm space-y-5">
              <div className="space-y-2">
                <Label htmlFor="reg-name">Full Name <span className="text-destructive">*</span></Label>
                <Input id="reg-name" placeholder="Ramkumar G" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-email">Email <span className="text-destructive">*</span></Label>
                <Input id="reg-email" type="email" placeholder="name@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-pw">Password <span className="text-destructive">*</span></Label>
                <Input id="reg-pw" type="password" placeholder="Min 8 characters" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-pw2">Confirm Password <span className="text-destructive">*</span></Label>
                <Input id="reg-pw2" type="password" placeholder="Repeat password" />
              </div>
              <Button className="w-full">Create Account</Button>
            </div>
          ),
          code: {
            react: `<KayoBrutalistForm>
  <KayoBrutalistFormField label="Full Name" required>
    <KayoBrutalistInput placeholder="Ramkumar G" />
  </KayoBrutalistFormField>
  <KayoBrutalistFormField label="Email" required>
    <KayoBrutalistInput placeholder="name@example.com" type="email" />
  </KayoBrutalistFormField>
  <KayoBrutalistFormField label="Password" required>
    <KayoBrutalistInput isPassword placeholder="Min 8 characters" />
  </KayoBrutalistFormField>
  <KayoBrutalistButton label="Create Account" fullWidth />
</KayoBrutalistForm>`,
          },
        },
        {
          title: 'With Validation',
          description: 'Error state (red border + message) on email; success hint (green) on name.',
          preview: isKaayo ? (
            <KayoBrutalistForm style={{ width: '100%', maxWidth: 360 }}>
              <KayoBrutalistFormField label="Full Name" required hint="✓ Name looks good">
                <KayoBrutalistInput placeholder="Full name" defaultValue="Ramkumar G" />
              </KayoBrutalistFormField>
              <KayoBrutalistFormField label="Email" required>
                <KayoBrutalistInput
                  placeholder="name@example.com"
                  defaultValue="not-an-email"
                  errorText="Please enter a valid email address"
                />
              </KayoBrutalistFormField>
              <KayoBrutalistButton label="Continue" fullWidth />
            </KayoBrutalistForm>
          ) : (
            <div className="w-full max-w-sm space-y-5">
              <div className="space-y-2">
                <Label htmlFor="v-name">Full Name</Label>
                <Input id="v-name" defaultValue="Ramkumar G" />
                <p className="text-xs text-green-600">✓ Name looks good</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="v-email">Email</Label>
                <Input id="v-email" defaultValue="not-an-email" className="border-destructive focus-visible:ring-destructive" />
                <p className="text-xs text-destructive">Please enter a valid email address</p>
              </div>
              <Button className="w-full">Continue</Button>
            </div>
          ),
          code: {
            react: `<KayoBrutalistFormField label="Email" required>
  <KayoBrutalistInput
    defaultValue="not-an-email"
    errorText="Please enter a valid email address"
  />
</KayoBrutalistFormField>

<KayoBrutalistFormField label="Name" required hint="✓ Name looks good">
  <KayoBrutalistInput defaultValue="Ramkumar G" />
</KayoBrutalistFormField>`,
          },
        },
        {
          title: 'Horizontal Layout',
          description: 'Label fixed at 140px left, input fills the right — for settings and data-dense forms.',
          preview: isKaayo ? (
            <KayoBrutalistForm style={{ width: '100%', maxWidth: 480 }}>
              <KayoBrutalistFormField label="Flat Number" required layout="horizontal">
                <KayoBrutalistInput placeholder="A-101" />
              </KayoBrutalistFormField>
              <KayoBrutalistFormField label="Resident Type" layout="horizontal">
                <KayoBrutalistSelect
                  placeholder="Select type"
                  options={[
                    { value: 'owner', label: 'Owner' },
                    { value: 'tenant', label: 'Tenant' },
                    { value: 'caretaker', label: 'Caretaker' },
                  ]}
                />
              </KayoBrutalistFormField>
              <KayoBrutalistFormField label="Notes" layout="horizontal">
                <KayoBrutalistTextarea placeholder="Optional notes..." rows={3} />
              </KayoBrutalistFormField>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <KayoBrutalistButton label="Cancel" variant="secondary" />
                <KayoBrutalistButton label="Save" />
              </div>
            </KayoBrutalistForm>
          ) : (
            <div className="w-full max-w-md space-y-4">
              <div className="flex items-center gap-4">
                <Label className="w-36 shrink-0 text-xs uppercase tracking-widest" htmlFor="h-flat">Flat Number</Label>
                <Input id="h-flat" placeholder="A-101" className="flex-1" />
              </div>
              <div className="flex items-center gap-4">
                <Label className="w-36 shrink-0 text-xs uppercase tracking-widest" htmlFor="h-type">Resident Type</Label>
                <Select>
                  <SelectTrigger className="flex-1"><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="owner">Owner</SelectItem>
                    <SelectItem value="tenant">Tenant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-start gap-4">
                <Label className="w-36 shrink-0 pt-2 text-xs uppercase tracking-widest" htmlFor="h-notes">Notes</Label>
                <Textarea id="h-notes" placeholder="Optional notes..." rows={3} className="flex-1" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save</Button>
              </div>
            </div>
          ),
          code: {
            react: `<KayoBrutalistForm>
  <KayoBrutalistFormField label="Flat Number" required layout="horizontal">
    <KayoBrutalistInput placeholder="A-101" />
  </KayoBrutalistFormField>
  <KayoBrutalistFormField label="Notes" layout="horizontal">
    <KayoBrutalistTextarea placeholder="Optional notes..." rows={3} />
  </KayoBrutalistFormField>
</KayoBrutalistForm>`,
          },
        },
        {
          title: 'Inline / Search Form',
          description: 'Single input + button in a row — use for subscribe, search, or quick-add patterns.',
          preview: isKaayo ? (
            <KayoBrutalistForm layout="inline" style={{ width: '100%', maxWidth: 440 }}>
              <div style={{ flex: 1 }}>
                <KayoBrutalistInput placeholder="Enter your email to subscribe" type="email" />
              </div>
              <KayoBrutalistButton label="Subscribe" />
            </KayoBrutalistForm>
          ) : (
            <div className="flex w-full max-w-md gap-2">
              <Input placeholder="Enter your email to subscribe" type="email" className="flex-1" />
              <Button>Subscribe</Button>
            </div>
          ),
          code: {
            react: `<KayoBrutalistForm layout="inline">
  <div style={{ flex: 1 }}>
    <KayoBrutalistInput placeholder="Enter your email to subscribe" type="email" />
  </div>
  <KayoBrutalistButton label="Subscribe" />
</KayoBrutalistForm>`,
          },
        },
        {
          title: 'Full Field Set',
          description: 'Every atom composed in one form — Text, Email, Password, Select, Textarea, Checkbox, Radio, Submit.',
          preview: isKaayo ? (
            <KayoBrutalistForm style={{ width: '100%', maxWidth: 400 }}>
              <KayoBrutalistFormField label="Full Name" required>
                <KayoBrutalistInput placeholder="Ramkumar G" />
              </KayoBrutalistFormField>
              <KayoBrutalistFormField label="Email" required>
                <KayoBrutalistInput placeholder="name@example.com" type="email" />
              </KayoBrutalistFormField>
              <KayoBrutalistFormField label="Password" required>
                <KayoBrutalistInput placeholder="Min 8 characters" isPassword />
              </KayoBrutalistFormField>
              <KayoBrutalistFormField label="Resident Type" required>
                <KayoBrutalistSelect
                  placeholder="Select type"
                  options={[
                    { value: 'owner', label: 'Owner' },
                    { value: 'tenant', label: 'Tenant' },
                  ]}
                />
              </KayoBrutalistFormField>
              <KayoBrutalistFormField label="Preferred Contact">
                <KayoBrutalistRadioGroup
                  options={[
                    { value: 'email', label: 'Email' },
                    { value: 'sms', label: 'SMS' },
                    { value: 'whatsapp', label: 'WhatsApp' },
                  ]}
                  defaultValue="email"
                  horizontal
                />
              </KayoBrutalistFormField>
              <KayoBrutalistFormField label="Notes">
                <KayoBrutalistTextarea placeholder="Any additional notes..." rows={3} />
              </KayoBrutalistFormField>
              <KayoBrutalistCheckbox label="I agree to the terms and conditions" />
              <KayoBrutalistButton label="Submit Application" fullWidth />
            </KayoBrutalistForm>
          ) : (
            <div className="w-full max-w-sm space-y-4">
              <div className="space-y-2"><Label>Full Name</Label><Input placeholder="Ramkumar G" /></div>
              <div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="name@example.com" /></div>
              <div className="space-y-2"><Label>Password</Label><Input type="password" placeholder="Min 8 characters" /></div>
              <div className="space-y-2">
                <Label>Resident Type</Label>
                <Select><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent><SelectItem value="owner">Owner</SelectItem><SelectItem value="tenant">Tenant</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Notes</Label><Textarea placeholder="Any additional notes..." rows={3} /></div>
              <div className="flex items-center gap-2"><input type="checkbox" id="terms" /><label htmlFor="terms" className="text-sm">I agree to the terms</label></div>
              <Button className="w-full">Submit Application</Button>
            </div>
          ),
          code: {
            react: `<KayoBrutalistForm>
  <KayoBrutalistFormField label="Full Name" required>
    <KayoBrutalistInput placeholder="Ramkumar G" />
  </KayoBrutalistFormField>
  <KayoBrutalistFormField label="Preferred Contact">
    <KayoBrutalistRadioGroup
      options={[{ value: 'email', label: 'Email' }, { value: 'sms', label: 'SMS' }]}
      defaultValue="email"
      horizontal
    />
  </KayoBrutalistFormField>
  <KayoBrutalistCheckbox label="I agree to the terms and conditions" />
  <KayoBrutalistButton label="Submit Application" fullWidth />
</KayoBrutalistForm>`,
          },
        },
        {
          title: 'Sectioned Form',
          description: 'Two sections separated by a divider — "Account Details" and "Preferences".',
          preview: isKaayo ? (
            <KayoBrutalistForm style={{ width: '100%', maxWidth: 400 }}>
              <KayoBrutalistFormDivider label="Account Details" />
              <KayoBrutalistFormField label="Full Name" required>
                <KayoBrutalistInput placeholder="Ramkumar G" />
              </KayoBrutalistFormField>
              <KayoBrutalistFormField label="Email" required>
                <KayoBrutalistInput placeholder="name@example.com" type="email" />
              </KayoBrutalistFormField>
              <KayoBrutalistFormDivider label="Preferences" />
              <KayoBrutalistFormField label="Notifications">
                <KayoBrutalistSelect
                  placeholder="Select preference"
                  options={[
                    { value: 'all', label: 'All notifications' },
                    { value: 'important', label: 'Important only' },
                    { value: 'none', label: 'None' },
                  ]}
                />
              </KayoBrutalistFormField>
              <KayoBrutalistCheckbox label="Send monthly summary report" defaultChecked />
              <div style={{ display: 'flex', gap: 10 }}>
                <KayoBrutalistButton label="Save Changes" />
                <KayoBrutalistButton label="Cancel" variant="secondary" />
              </div>
            </KayoBrutalistForm>
          ) : (
            <div className="w-full max-w-sm space-y-4">
              <div className="flex items-center gap-3"><span className="text-xs font-semibold uppercase tracking-wider">Account Details</span><div className="h-px flex-1 bg-border" /></div>
              <div className="space-y-2"><Label>Full Name</Label><Input placeholder="Ramkumar G" /></div>
              <div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="name@example.com" /></div>
              <div className="flex items-center gap-3"><span className="text-xs font-semibold uppercase tracking-wider">Preferences</span><div className="h-px flex-1 bg-border" /></div>
              <div className="space-y-2">
                <Label>Notifications</Label>
                <Select><SelectTrigger><SelectValue placeholder="Select preference" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All notifications</SelectItem>
                    <SelectItem value="important">Important only</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2"><Button>Save Changes</Button><Button variant="outline">Cancel</Button></div>
            </div>
          ),
          code: {
            react: `<KayoBrutalistForm>
  <KayoBrutalistFormDivider label="Account Details" />
  <KayoBrutalistFormField label="Full Name" required>
    <KayoBrutalistInput placeholder="Ramkumar G" />
  </KayoBrutalistFormField>
  <KayoBrutalistFormDivider label="Preferences" />
  <KayoBrutalistCheckbox label="Send monthly summary report" defaultChecked />
  <KayoBrutalistButton label="Save Changes" />
</KayoBrutalistForm>`,
          },
        },
      ]}
    />
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/pages/molecules/FormPage.tsx
git commit -m "feat(molecules): FormPage — 7 sections with isKaayo branching (KayoBrutalistForm)"
```

---

## Task 3: KayoBrutalistDropdownMenu component

**Files:**
- Create: `src/app/components/custom/kaayo/KayoBrutalistDropdownMenu.tsx`

- [ ] **Step 1: Create the file**

```tsx
import { useState, useRef, useEffect, ReactNode, CSSProperties } from 'react'

const STYLE_ID = 'kayo-dropdown-styles'

export type DropdownItem =
  | {
      type: 'item'
      label: string
      icon?: ReactNode
      shortcut?: string
      destructive?: boolean
      disabled?: boolean
      onClick?: () => void
    }
  | { type: 'separator' }
  | { type: 'label'; text: string }

export interface KayoBrutalistDropdownMenuProps {
  trigger: ReactNode
  items: DropdownItem[]
  align?: 'start' | 'end'
}

export function KayoBrutalistDropdownMenu({
  trigger,
  items,
  align = 'start',
}: KayoBrutalistDropdownMenuProps) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return
    const s = document.createElement('style')
    s.id = STYLE_ID
    s.textContent = `
      .kayo-dd-item { background: transparent; transition: background 80ms; }
      .kayo-dd-item:not(.kayo-dd-disabled):hover { background: var(--kayo-color-muted, #f4f4f4); }
      .kayo-dd-item.kayo-dd-destructive:not(.kayo-dd-disabled):hover { background: #fff5f5; }
    `
    document.head.appendChild(s)
  }, [])

  useEffect(() => {
    if (!open) return
    const handleOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleOutside)
    document.addEventListener('keydown', handleEsc)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('keydown', handleEsc)
    }
  }, [open])

  return (
    <div ref={wrapperRef} style={{ position: 'relative', display: 'inline-block' }}>
      <div onClick={() => setOpen(o => !o)} style={{ display: 'inline-block' }}>
        {trigger}
      </div>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            ...(align === 'end' ? { right: 0 } : { left: 0 }),
            minWidth: 200,
            backgroundColor: '#ffffff',
            border: '2px solid var(--kayo-color-border, #3b3d3f)',
            borderRadius: 6,
            boxShadow: '4px 4px 0 #191b1f',
            zIndex: 100,
            overflow: 'hidden',
            fontFamily: "'DM Sans', system-ui, sans-serif",
          } as CSSProperties}
        >
          {items.map((item, i) => {
            if (item.type === 'separator') {
              return (
                <div
                  key={i}
                  style={{ height: 2, backgroundColor: 'var(--kayo-color-border, #3b3d3f)', margin: '2px 0' }}
                />
              )
            }
            if (item.type === 'label') {
              return (
                <div
                  key={i}
                  style={{
                    padding: '6px 14px 3px',
                    fontSize: 11,
                    fontWeight: 600,
                    color: '#a8a8aa',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  } as CSSProperties}
                >
                  {item.text}
                </div>
              )
            }
            const classNames = [
              'kayo-dd-item',
              item.destructive ? 'kayo-dd-destructive' : '',
              item.disabled ? 'kayo-dd-disabled' : '',
            ].filter(Boolean).join(' ')

            return (
              <div
                key={i}
                className={classNames}
                onClick={() => {
                  if (!item.disabled) {
                    item.onClick?.()
                    setOpen(false)
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 14px',
                  fontSize: 14,
                  color: item.disabled
                    ? '#a8a8aa'
                    : item.destructive
                    ? '#dc2626'
                    : 'var(--kayo-color-foreground, #3b3d3f)',
                  cursor: item.disabled ? 'not-allowed' : 'pointer',
                  opacity: item.disabled ? 0.5 : 1,
                } as CSSProperties}
              >
                {item.icon && (
                  <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0, width: 16, height: 16 }}>
                    {item.icon}
                  </span>
                )}
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.shortcut && (
                  <span style={{ fontSize: 11, color: '#a8a8aa', fontFamily: 'monospace', letterSpacing: '0.03em', flexShrink: 0 }}>
                    {item.shortcut}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/components/custom/kaayo/KayoBrutalistDropdownMenu.tsx
git commit -m "feat(molecules): KayoBrutalistDropdownMenu — positioned menu with separator/label/item types"
```

---

## Task 4: DropdownMenuPage update

**Files:**
- Modify: `src/app/pages/molecules/DropdownMenuPage.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Button } from '@/app/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu'
import {
  Eye, Edit, Trash2, Copy, Download, Share2, Settings,
  MoreHorizontal, Bell, User, FileText, LogOut, ShieldAlert,
} from 'lucide-react'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistDropdownMenu } from '@/app/components/custom/kaayo/KayoBrutalistDropdownMenu'
import { KayoBrutalistButton } from '@/app/components/custom/kaayo/KayoBrutalistButton'

export function DropdownMenuPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  return (
    <ComponentPageLayout
      title="Dropdown Menu"
      description="A contextual menu triggered by a button. Use for action lists, overflow menus, and context-sensitive options."
      level="Molecule"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Default',
          description: '5 plain text items, no icons — the minimal dropdown pattern.',
          preview: isKaayo ? (
            <KayoBrutalistDropdownMenu
              trigger={<KayoBrutalistButton label="Actions ▾" variant="secondary" />}
              items={[
                { type: 'item', label: 'View details', onClick: () => {} },
                { type: 'item', label: 'Edit resident', onClick: () => {} },
                { type: 'item', label: 'Send reminder', onClick: () => {} },
                { type: 'item', label: 'Download PDF', onClick: () => {} },
                { type: 'item', label: 'Remove resident', onClick: () => {} },
              ]}
            />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Actions ▾</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Flat A-101</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View details</DropdownMenuItem>
                <DropdownMenuItem>Edit resident</DropdownMenuItem>
                <DropdownMenuItem>Send reminder</DropdownMenuItem>
                <DropdownMenuItem>Download PDF</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Remove resident</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
          code: {
            react: `import { KayoBrutalistDropdownMenu } from '@breathe/kaayo'

<KayoBrutalistDropdownMenu
  trigger={<KayoBrutalistButton label="Actions ▾" variant="secondary" />}
  items={[
    { type: 'item', label: 'View details', onClick: () => {} },
    { type: 'item', label: 'Edit resident', onClick: () => {} },
    { type: 'item', label: 'Remove resident', onClick: () => {} },
  ]}
/>`,
          },
        },
        {
          title: 'With Icons',
          description: 'Each item has a Lucide icon left of the label.',
          preview: isKaayo ? (
            <KayoBrutalistDropdownMenu
              trigger={<KayoBrutalistButton label="Manage ▾" variant="secondary" />}
              items={[
                { type: 'item', label: 'View details',   icon: <Eye size={14} />,      onClick: () => {} },
                { type: 'item', label: 'Edit',           icon: <Edit size={14} />,     onClick: () => {} },
                { type: 'item', label: 'Copy link',      icon: <Copy size={14} />,     onClick: () => {} },
                { type: 'item', label: 'Download',       icon: <Download size={14} />, onClick: () => {} },
                { type: 'item', label: 'Delete',         icon: <Trash2 size={14} />,   destructive: true, onClick: () => {} },
              ]}
            />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild><Button variant="outline">Manage ▾</Button></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem><Eye className="mr-2 h-4 w-4" />View details</DropdownMenuItem>
                <DropdownMenuItem><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                <DropdownMenuItem><Copy className="mr-2 h-4 w-4" />Copy link</DropdownMenuItem>
                <DropdownMenuItem><Download className="mr-2 h-4 w-4" />Download</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
          code: {
            react: `import { Eye, Edit, Trash2 } from 'lucide-react'

<KayoBrutalistDropdownMenu
  trigger={<KayoBrutalistButton label="Manage ▾" variant="secondary" />}
  items={[
    { type: 'item', label: 'View details', icon: <Eye size={14} />, onClick: () => {} },
    { type: 'item', label: 'Delete', icon: <Trash2 size={14} />, destructive: true, onClick: () => {} },
  ]}
/>`,
          },
        },
        {
          title: 'With Shortcuts',
          description: 'Keyboard shortcuts right-aligned in monospace — for power-user menus.',
          preview: isKaayo ? (
            <KayoBrutalistDropdownMenu
              trigger={<KayoBrutalistButton label="File ▾" variant="secondary" />}
              items={[
                { type: 'item', label: 'New document',  shortcut: '⌘N',   onClick: () => {} },
                { type: 'item', label: 'Open',          shortcut: '⌘O',   onClick: () => {} },
                { type: 'item', label: 'Save',          shortcut: '⌘S',   onClick: () => {} },
                { type: 'item', label: 'Save as…',      shortcut: '⌘⇧S',  onClick: () => {} },
                { type: 'item', label: 'Print',         shortcut: '⌘P',   onClick: () => {} },
              ]}
            />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild><Button variant="outline">File ▾</Button></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="flex justify-between gap-8">New document <span className="text-xs text-muted-foreground font-mono">⌘N</span></DropdownMenuItem>
                <DropdownMenuItem className="flex justify-between gap-8">Open <span className="text-xs text-muted-foreground font-mono">⌘O</span></DropdownMenuItem>
                <DropdownMenuItem className="flex justify-between gap-8">Save <span className="text-xs text-muted-foreground font-mono">⌘S</span></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
          code: {
            react: `<KayoBrutalistDropdownMenu
  trigger={<KayoBrutalistButton label="File ▾" variant="secondary" />}
  items={[
    { type: 'item', label: 'Save', shortcut: '⌘S', onClick: () => {} },
    { type: 'item', label: 'Print', shortcut: '⌘P', onClick: () => {} },
  ]}
/>`,
          },
        },
        {
          title: 'With Separator + Labels',
          description: 'Grouped items with label headers and a separator between safe and danger zones.',
          preview: isKaayo ? (
            <KayoBrutalistDropdownMenu
              trigger={<KayoBrutalistButton label="Options ▾" variant="secondary" />}
              items={[
                { type: 'label', text: 'Actions' },
                { type: 'item', label: 'View profile', icon: <User size={14} />,     onClick: () => {} },
                { type: 'item', label: 'Notifications', icon: <Bell size={14} />,    onClick: () => {} },
                { type: 'item', label: 'Settings',     icon: <Settings size={14} />, onClick: () => {} },
                { type: 'separator' },
                { type: 'label', text: 'Danger Zone' },
                { type: 'item', label: 'Delete account', icon: <Trash2 size={14} />, destructive: true, onClick: () => {} },
              ]}
            />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild><Button variant="outline">Options ▾</Button></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem><User className="mr-2 h-4 w-4" />View profile</DropdownMenuItem>
                <DropdownMenuItem><Bell className="mr-2 h-4 w-4" />Notifications</DropdownMenuItem>
                <DropdownMenuItem><Settings className="mr-2 h-4 w-4" />Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Danger Zone</DropdownMenuLabel>
                <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" />Delete account</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
          code: {
            react: `<KayoBrutalistDropdownMenu
  trigger={<KayoBrutalistButton label="Options ▾" />}
  items={[
    { type: 'label', text: 'Actions' },
    { type: 'item', label: 'Settings', icon: <Settings size={14} />, onClick: () => {} },
    { type: 'separator' },
    { type: 'label', text: 'Danger Zone' },
    { type: 'item', label: 'Delete account', destructive: true, onClick: () => {} },
  ]}
/>`,
          },
        },
        {
          title: 'With Disabled Items',
          description: 'Disabled items are muted and non-interactive — use for permission-gated actions.',
          preview: isKaayo ? (
            <KayoBrutalistDropdownMenu
              trigger={<KayoBrutalistButton label="Manage ▾" variant="secondary" />}
              items={[
                { type: 'item', label: 'View details',  icon: <Eye size={14} />,       onClick: () => {} },
                { type: 'item', label: 'Edit',          icon: <Edit size={14} />,      onClick: () => {} },
                { type: 'item', label: 'Share',         icon: <Share2 size={14} />,    disabled: true },
                { type: 'item', label: 'Export report', icon: <FileText size={14} />,  onClick: () => {} },
                { type: 'item', label: 'Delete',        icon: <Trash2 size={14} />,    destructive: true, onClick: () => {} },
              ]}
            />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild><Button variant="outline">Manage ▾</Button></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem><Eye className="mr-2 h-4 w-4" />View details</DropdownMenuItem>
                <DropdownMenuItem><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                <DropdownMenuItem disabled><Share2 className="mr-2 h-4 w-4" />Share</DropdownMenuItem>
                <DropdownMenuItem><FileText className="mr-2 h-4 w-4" />Export report</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
          code: {
            react: `<KayoBrutalistDropdownMenu
  trigger={<KayoBrutalistButton label="Manage ▾" />}
  items={[
    { type: 'item', label: 'Edit', onClick: () => {} },
    { type: 'item', label: 'Share', disabled: true },
    { type: 'item', label: 'Delete', destructive: true, onClick: () => {} },
  ]}
/>`,
          },
        },
        {
          title: 'With Destructive Item',
          description: 'Destructive item in crimson red with hover background tint — for irreversible actions.',
          preview: isKaayo ? (
            <KayoBrutalistDropdownMenu
              trigger={<KayoBrutalistButton label="Account ▾" variant="secondary" />}
              items={[
                { type: 'item', label: 'Profile settings', icon: <User size={14} />,    onClick: () => {} },
                { type: 'item', label: 'Billing',          icon: <FileText size={14} />, onClick: () => {} },
                { type: 'separator' },
                { type: 'item', label: 'Sign out',         icon: <LogOut size={14} />,   onClick: () => {} },
                { type: 'separator' },
                { type: 'item', label: 'Delete account',   icon: <Trash2 size={14} />,   destructive: true, onClick: () => {} },
              ]}
            />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild><Button variant="outline">Account ▾</Button></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Profile settings</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign out</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">Delete account</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
          code: {
            react: `<KayoBrutalistDropdownMenu
  items={[
    { type: 'item', label: 'Sign out', onClick: () => {} },
    { type: 'separator' },
    { type: 'item', label: 'Delete account', destructive: true, onClick: () => {} },
  ]}
/>`,
          },
        },
        {
          title: 'Icon Button Trigger',
          description: 'Trigger is a ⋯ icon button — the overflow menu pattern.',
          preview: isKaayo ? (
            <KayoBrutalistDropdownMenu
              trigger={
                <button
                  type="button"
                  style={{
                    width: 36, height: 36,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '2px solid var(--kayo-color-border, #3b3d3f)',
                    borderRadius: 6,
                    background: '#ffffff',
                    cursor: 'pointer',
                    boxShadow: '2px 2px 0 #191b1f',
                  }}
                >
                  <MoreHorizontal size={18} />
                </button>
              }
              align="end"
              items={[
                { type: 'item', label: 'Edit',    icon: <Edit size={14} />,   onClick: () => {} },
                { type: 'item', label: 'Delete',  icon: <Trash2 size={14} />, destructive: true, onClick: () => {} },
              ]}
            />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
          code: {
            react: `<KayoBrutalistDropdownMenu
  trigger={<button style={{ /* icon button styles */ }}><MoreHorizontal size={18} /></button>}
  align="end"
  items={[
    { type: 'item', label: 'Edit', icon: <Edit size={14} />, onClick: () => {} },
    { type: 'item', label: 'Delete', destructive: true, onClick: () => {} },
  ]}
/>`,
          },
        },
      ]}
    />
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/pages/molecules/DropdownMenuPage.tsx
git commit -m "feat(molecules): DropdownMenuPage — 7 sections with isKaayo branching"
```

---

## Task 5: KayoBrutalistTooltip component

**Files:**
- Create: `src/app/components/custom/kaayo/KayoBrutalistTooltip.tsx`

- [ ] **Step 1: Create the file**

Note: uses `createPortal` from `react-dom`. Tooltip is `position: fixed` — no scrollY needed. The transform centres it relative to the trigger based on `side`.

```tsx
import { useState, useRef, useEffect, ReactNode, CSSProperties } from 'react'
import { createPortal } from 'react-dom'

export type KayoTooltipSide = 'top' | 'right' | 'bottom' | 'left'

export interface KayoBrutalistTooltipProps {
  content: string | ReactNode
  side?: KayoTooltipSide
  delay?: number
  children: ReactNode
}

const TRANSFORM: Record<KayoTooltipSide, string> = {
  top:    'translate(-50%, -100%)',
  bottom: 'translate(-50%, 0)',
  left:   'translate(-100%, -50%)',
  right:  'translate(0, -50%)',
}

const OFFSET = 6

export function KayoBrutalistTooltip({
  content,
  side = 'top',
  delay = 300,
  children,
}: KayoBrutalistTooltipProps) {
  const [visible, setVisible] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function computePos(): { top: number; left: number } | null {
    if (!triggerRef.current) return null
    const r = triggerRef.current.getBoundingClientRect()
    switch (side) {
      case 'top':    return { top: r.top - OFFSET,           left: r.left + r.width / 2 }
      case 'bottom': return { top: r.bottom + OFFSET,        left: r.left + r.width / 2 }
      case 'left':   return { top: r.top + r.height / 2,    left: r.left - OFFSET }
      case 'right':  return { top: r.top + r.height / 2,    left: r.right + OFFSET }
      default:       return { top: r.top - OFFSET,           left: r.left + r.width / 2 }
    }
  }

  function handleEnter() {
    timerRef.current = setTimeout(() => {
      const p = computePos()
      if (p) { setPos(p); setVisible(true) }
    }, delay)
  }

  function handleLeave() {
    if (timerRef.current) clearTimeout(timerRef.current)
    setVisible(false)
  }

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  const tooltipStyle: CSSProperties = {
    position: 'fixed',
    top: pos.top,
    left: pos.left,
    transform: TRANSFORM[side],
    backgroundColor: '#191b1f',
    color: '#ffffff',
    border: '2px solid var(--kayo-color-border, #3b3d3f)',
    borderRadius: 6,
    boxShadow: '2px 2px 0 #191b1f',
    padding: '4px 8px',
    fontSize: 12,
    fontFamily: "'DM Sans', system-ui, sans-serif",
    fontWeight: 400,
    lineHeight: '1.4',
    whiteSpace: 'pre-wrap',
    maxWidth: 240,
    zIndex: 9999,
    pointerEvents: 'none',
  }

  return (
    <>
      <div
        ref={triggerRef}
        style={{ display: 'inline-block' }}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onFocus={handleEnter}
        onBlur={handleLeave}
      >
        {children}
      </div>
      {visible && createPortal(<div style={tooltipStyle}>{content}</div>, document.body)}
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/components/custom/kaayo/KayoBrutalistTooltip.tsx
git commit -m "feat(molecules): KayoBrutalistTooltip — portal-rendered, 4 positions, delay prop"
```

---

## Task 6: TooltipPage update

**Files:**
- Modify: `src/app/pages/molecules/TooltipPage.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/app/components/ui/tooltip'
import { Button } from '@/app/components/ui/button'
import { HelpCircle, Info, ArrowUp, ArrowRight, ArrowDown, ArrowLeft } from 'lucide-react'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistTooltip } from '@/app/components/custom/kaayo/KayoBrutalistTooltip'
import { KayoBrutalistButton } from '@/app/components/custom/kaayo/KayoBrutalistButton'

export function TooltipPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  return (
    <ComponentPageLayout
      title="Tooltip"
      description="Contextual label that appears on hover or focus. Use for icon-only buttons and supplementary information — never for critical content."
      level="Molecule"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Positions',
          description: '4 icon buttons, each with a tooltip on a different side.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', gap: 24, alignItems: 'center', padding: '24px 0' }}>
              {(['top', 'right', 'bottom', 'left'] as const).map(side => {
                const IconMap = { top: ArrowUp, right: ArrowRight, bottom: ArrowDown, left: ArrowLeft }
                const Icon = IconMap[side]
                return (
                  <KayoBrutalistTooltip key={side} content={`Tooltip on ${side}`} side={side}>
                    <button
                      type="button"
                      style={{
                        width: 40, height: 40,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: '2px solid var(--kayo-color-border, #3b3d3f)',
                        borderRadius: 6,
                        background: '#ffffff',
                        cursor: 'pointer',
                        boxShadow: '2px 2px 0 #191b1f',
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                      }}
                    >
                      <Icon size={16} />
                    </button>
                  </KayoBrutalistTooltip>
                )
              })}
            </div>
          ) : (
            <div className="flex gap-6 items-center py-6">
              <TooltipProvider>
                {(['top', 'right', 'bottom', 'left'] as const).map(side => (
                  <Tooltip key={side}>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        {side === 'top' && <ArrowUp className="h-4 w-4" />}
                        {side === 'right' && <ArrowRight className="h-4 w-4" />}
                        {side === 'bottom' && <ArrowDown className="h-4 w-4" />}
                        {side === 'left' && <ArrowLeft className="h-4 w-4" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side={side}><p>Tooltip on {side}</p></TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
          ),
          code: {
            react: `import { KayoBrutalistTooltip } from '@breathe/kaayo'

<KayoBrutalistTooltip content="Tooltip on top" side="top">
  <button>↑</button>
</KayoBrutalistTooltip>

<KayoBrutalistTooltip content="Tooltip on right" side="right">
  <button>→</button>
</KayoBrutalistTooltip>`,
          },
        },
        {
          title: 'On Button',
          description: 'Tooltip wrapping a primary KayoBrutalistButton — "Save changes" label on hover.',
          preview: isKaayo ? (
            <KayoBrutalistTooltip content="Saves all pending changes" side="top">
              <KayoBrutalistButton label="Save changes" />
            </KayoBrutalistTooltip>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button>Save changes</Button>
                </TooltipTrigger>
                <TooltipContent><p>Saves all pending changes</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ),
          code: {
            react: `<KayoBrutalistTooltip content="Saves all pending changes" side="top">
  <KayoBrutalistButton label="Save changes" />
</KayoBrutalistTooltip>`,
          },
        },
        {
          title: 'On Icon',
          description: 'Help icon with a tooltip explaining a form field — a common pattern in settings forms.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 14, color: '#3b3d3f' }}>
              <span>Maintenance Fund</span>
              <KayoBrutalistTooltip content="Monthly contribution to the society maintenance reserve" side="right">
                <HelpCircle size={16} style={{ cursor: 'help', color: '#6b7280' }} />
              </KayoBrutalistTooltip>
            </div>
          ) : (
            <TooltipProvider>
              <div className="flex items-center gap-2 text-sm">
                <span>Maintenance Fund</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 cursor-help text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent side="right"><p>Monthly contribution to the society maintenance reserve</p></TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          ),
          code: {
            react: `<KayoBrutalistTooltip
  content="Monthly contribution to the society maintenance reserve"
  side="right"
>
  <HelpCircle size={16} style={{ cursor: 'help' }} />
</KayoBrutalistTooltip>`,
          },
        },
        {
          title: 'Long Content',
          description: 'Tooltip with a two-line description — max-width 240px, wraps naturally.',
          preview: isKaayo ? (
            <KayoBrutalistTooltip
              content={'Late fee is charged at 2% per month\nafter the 10th of each month.'}
              side="bottom"
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 14, color: '#3b3d3f', cursor: 'default' }}>
                <Info size={16} style={{ color: '#6b7280' }} />
                <span>Late fee policy</span>
              </div>
            </KayoBrutalistTooltip>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="inline-flex items-center gap-1.5 text-sm cursor-default">
                    <Info className="h-4 w-4 text-muted-foreground" />
                    <span>Late fee policy</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-[200px]">
                  <p>Late fee is charged at 2% per month after the 10th of each month.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ),
          code: {
            react: `<KayoBrutalistTooltip
  content={"Late fee at 2% per month\\nafter the 10th of each month."}
  side="bottom"
>
  <Info size={16} />
</KayoBrutalistTooltip>`,
          },
        },
        {
          title: 'On Disabled Element',
          description: 'A wrapper div over a disabled button allows tooltip to fire — disabled elements block mouse events.',
          preview: isKaayo ? (
            <KayoBrutalistTooltip content="Requires admin role to perform this action" side="top">
              <div style={{ display: 'inline-block', cursor: 'not-allowed' }}>
                <KayoBrutalistButton label="Delete all records" variant="destructive" disabled />
              </div>
            </KayoBrutalistTooltip>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-not-allowed">
                    <Button variant="destructive" disabled style={{ pointerEvents: 'none' }}>
                      Delete all records
                    </Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent><p>Requires admin role to perform this action</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ),
          code: {
            react: `{/* Wrap disabled button in a div — disabled elements swallow mouse events */}
<KayoBrutalistTooltip content="Requires admin role" side="top">
  <div style={{ display: 'inline-block', cursor: 'not-allowed' }}>
    <KayoBrutalistButton label="Delete all records" variant="destructive" disabled />
  </div>
</KayoBrutalistTooltip>`,
          },
        },
        {
          title: 'No Delay',
          description: '`delay={0}` — tooltip appears instantly on hover.',
          preview: isKaayo ? (
            <KayoBrutalistTooltip content="Instant tooltip — no delay" side="top" delay={0}>
              <KayoBrutalistButton label="Hover me" variant="secondary" />
            </KayoBrutalistTooltip>
          ) : (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent><p>Instant tooltip — no delay</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ),
          code: {
            react: `<KayoBrutalistTooltip content="Instant tooltip" delay={0}>
  <KayoBrutalistButton label="Hover me" variant="secondary" />
</KayoBrutalistTooltip>`,
          },
        },
      ]}
    />
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/pages/molecules/TooltipPage.tsx
git commit -m "feat(molecules): TooltipPage — 6 sections with isKaayo branching"
```

---

## Task 7: KayoBrutalistHoverCard component

**Files:**
- Create: `src/app/components/custom/kaayo/KayoBrutalistHoverCard.tsx`

- [ ] **Step 1: Create the file**

```tsx
import { useState, useRef, useEffect, ReactNode, CSSProperties } from 'react'
import { createPortal } from 'react-dom'

export type KayoHoverCardSide = 'top' | 'bottom'

export interface KayoBrutalistHoverCardProps {
  trigger: ReactNode
  children: ReactNode
  side?: KayoHoverCardSide
}

const OFFSET = 8

export function KayoBrutalistHoverCard({
  trigger,
  children,
  side = 'bottom',
}: KayoBrutalistHoverCardProps) {
  const [visible, setVisible] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function computePos(): { top: number; left: number } | null {
    if (!triggerRef.current) return null
    const r = triggerRef.current.getBoundingClientRect()
    return side === 'bottom'
      ? { top: r.bottom + OFFSET, left: r.left }
      : { top: r.top - OFFSET, left: r.left }
  }

  function openCard() {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    openTimerRef.current = setTimeout(() => {
      const p = computePos()
      if (p) { setPos(p); setVisible(true) }
    }, 300)
  }

  function closeCard() {
    if (openTimerRef.current) clearTimeout(openTimerRef.current)
    closeTimerRef.current = setTimeout(() => setVisible(false), 150)
  }

  function keepOpen() {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
  }

  useEffect(() => () => {
    if (openTimerRef.current) clearTimeout(openTimerRef.current)
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
  }, [])

  const cardStyle: CSSProperties = {
    position: 'fixed',
    top: pos.top,
    left: pos.left,
    transform: side === 'top' ? 'translateY(-100%)' : 'none',
    minWidth: 280,
    maxWidth: 360,
    backgroundColor: '#ffffff',
    border: '2px solid var(--kayo-color-border, #3b3d3f)',
    borderRadius: 6,
    boxShadow: '4px 4px 0 #191b1f',
    padding: 16,
    zIndex: 9999,
    fontFamily: "'DM Sans', system-ui, sans-serif",
  }

  return (
    <>
      <div
        ref={triggerRef}
        style={{ display: 'inline-block' }}
        onMouseEnter={openCard}
        onMouseLeave={closeCard}
      >
        {trigger}
      </div>
      {visible && createPortal(
        <div style={cardStyle} onMouseEnter={keepOpen} onMouseLeave={closeCard}>
          {children}
        </div>,
        document.body
      )}
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/components/custom/kaayo/KayoBrutalistHoverCard.tsx
git commit -m "feat(molecules): KayoBrutalistHoverCard — portal, hover delay, top/bottom side"
```

---

## Task 8: HoverCardPage update

**Files:**
- Modify: `src/app/pages/molecules/HoverCardPage.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/app/components/ui/hover-card'
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar'
import { Button } from '@/app/components/ui/button'
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
          description: 'Trigger: @username link. Card: avatar + display name + bio + joined date.',
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
  <div>
    <span>Society Rules &amp; Regulations</span>
    <KayoBrutalistBadge variant="secondary">kaayo.app</KayoBrutalistBadge>
  </div>
</KayoBrutalistHoverCard>`,
          },
        },
        {
          title: 'Stat Summary',
          description: 'Trigger: metric value. Card: label + value + delta badge.',
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
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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
  <div>
    <span>Monthly Maintenance</span>
    <span>₹4,200</span>
    <KayoBrutalistBadge variant="success">↑ 12%</KayoBrutalistBadge>
  </div>
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
  <div>
    <KayoBrutalistAvatar fallback="PS" size="md" />
    <div>Priya Sharma · Secretary</div>
    <div style={{ display: 'flex', gap: 8 }}>
      <KayoBrutalistButton label="Follow" size="sm" />
      <KayoBrutalistButton label="Message" size="sm" variant="secondary" />
    </div>
  </div>
</KayoBrutalistHoverCard>`,
          },
        },
      ]}
    />
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/pages/molecules/HoverCardPage.tsx
git commit -m "feat(molecules): HoverCardPage — 4 sections with isKaayo branching"
```

---

## Task 9: KayoBrutalistCollapsible component

**Files:**
- Create: `src/app/components/custom/kaayo/KayoBrutalistCollapsible.tsx`

- [ ] **Step 1: Create the file**

```tsx
import { useState, useEffect, ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

const STYLE_ID = 'kayo-collapsible-styles'

export interface KayoBrutalistCollapsibleProps {
  trigger: string | ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: ReactNode
  triggerSide?: 'left' | 'right'
}

export function KayoBrutalistCollapsible({
  trigger,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  children,
  triggerSide = 'right',
}: KayoBrutalistCollapsibleProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? controlledOpen! : internalOpen

  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return
    const s = document.createElement('style')
    s.id = STYLE_ID
    s.textContent = `
      .kayo-coll-chevron { display: flex; align-items: center; transition: transform 200ms; flex-shrink: 0; }
      .kayo-coll-chevron.open { transform: rotate(180deg); }
    `
    document.head.appendChild(s)
  }, [])

  function toggle() {
    const next = !isOpen
    if (!isControlled) setInternalOpen(next)
    onOpenChange?.(next)
  }

  const chevron = (
    <span className={`kayo-coll-chevron${isOpen ? ' open' : ''}`}>
      <ChevronDown size={18} strokeWidth={2} />
    </span>
  )

  return (
    <div
      style={{
        border: '2px solid var(--kayo-color-border, #3b3d3f)',
        borderRadius: 6,
        boxShadow: isOpen ? '4px 4px 0 #191b1f' : '2px 2px 0 #191b1f',
        backgroundColor: '#ffffff',
        fontFamily: "'DM Sans', system-ui, sans-serif",
        transition: 'box-shadow 200ms',
      }}
    >
      <button
        type="button"
        onClick={toggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: triggerSide === 'left' ? 'flex-start' : 'space-between',
          gap: 10,
          padding: '12px 16px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: 14,
          fontWeight: 600,
          fontFamily: 'inherit',
          color: 'var(--kayo-color-foreground, #3b3d3f)',
          textAlign: 'left',
          outline: 'none',
        }}
      >
        {triggerSide === 'left' && chevron}
        <span style={{ flex: 1 }}>{trigger}</span>
        {triggerSide === 'right' && chevron}
      </button>

      {isOpen && (
        <div
          style={{
            borderTop: '2px solid var(--kayo-color-border, #3b3d3f)',
            padding: '12px 16px',
            fontSize: 13,
            color: 'var(--kayo-color-foreground, #3b3d3f)',
            lineHeight: '1.6',
          }}
        >
          {children}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/components/custom/kaayo/KayoBrutalistCollapsible.tsx
git commit -m "feat(molecules): KayoBrutalistCollapsible — CSS chevron, controlled + uncontrolled, triggerSide"
```

---

## Task 10: CollapsiblePage update

**Files:**
- Modify: `src/app/pages/molecules/CollapsiblePage.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
import { useState } from 'react'
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/app/components/ui/collapsible'
import { Button } from '@/app/components/ui/button'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistCollapsible } from '@/app/components/custom/kaayo/KayoBrutalistCollapsible'
import { KayoBrutalistAvatar } from '@/app/components/custom/kaayo/KayoBrutalistAvatar'
import { KayoBrutalistButton } from '@/app/components/custom/kaayo/KayoBrutalistButton'

function ProgrammaticDemo() {
  const [aOpen, setAOpen] = useState(false)
  const [bOpen, setBOpen] = useState(false)
  const allOpen = aOpen && bOpen

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 480 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <KayoBrutalistButton
          label={allOpen ? 'Collapse all' : 'Expand all'}
          variant="secondary"
          size="sm"
          onClick={() => { const next = !allOpen; setAOpen(next); setBOpen(next) }}
        />
      </div>
      <KayoBrutalistCollapsible
        trigger="Payment Settings"
        open={aOpen}
        onOpenChange={setAOpen}
      >
        <p>Configure payment methods, late fee rules, and auto-reminders.</p>
      </KayoBrutalistCollapsible>
      <KayoBrutalistCollapsible
        trigger="Notification Preferences"
        open={bOpen}
        onOpenChange={setBOpen}
      >
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
                    { fallback: 'RG', name: 'Ramkumar G',     role: 'Owner · A-101' },
                    { fallback: 'PS', name: 'Priya Sharma',    role: 'Secretary' },
                    { fallback: 'KM', name: 'Kiran M',         role: 'Treasurer' },
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
```

Note: the `Avatar` import in the non-Kaayo Collapsible section needs to be added at the top. Add this import:
```tsx
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar'
```

- [ ] **Step 2: Commit**

```bash
git add src/app/pages/molecules/CollapsiblePage.tsx
git commit -m "feat(molecules): CollapsiblePage — 5 sections with isKaayo branching + programmatic control"
```

---

## Self-Review Checklist

**Spec coverage:**
- KayoBrutalistForm: ✅ layout (vertical/horizontal/inline), FormField, FormDivider, all 7 permutation sections
- KayoBrutalistDropdownMenu: ✅ item/separator/label types, destructive, disabled, align, all 7 sections
- KayoBrutalistTooltip: ✅ portal, 4 positions, delay, all 6 sections
- KayoBrutalistHoverCard: ✅ portal, hover delay (300ms open/150ms close), top/bottom, all 4 sections
- KayoBrutalistCollapsible: ✅ CSS chevron, controlled/uncontrolled, triggerSide, all 5 sections

**Token consistency check:**
- All shadows are `2px 2px 0 #191b1f` (sm) or `4px 4px 0 #191b1f` (md) — no blur radius ✅
- Border: `2px solid var(--kayo-color-border, #3b3d3f)` ✅
- Primary: `var(--kayo-color-primary, #970103)` ✅
- No Tailwind in component files ✅
- No `import React` (JSX transform active) ✅
- `fontFamily` on component root divs only, not on every nested element ✅

**Type consistency:**
- `DropdownItem` union type used consistently across Task 3 and Task 4 ✅
- `KayoBrutalistCollapsible` `open` prop is `boolean | undefined` — undefined check uses `controlledOpen !== undefined` ✅
- `ProgrammaticDemo` is a standalone function component defined above `CollapsiblePage` ✅
- `KayoBrutalistButton` receives `onClick` — but `KayoBrutalistButton` does not have an `onClick` prop in its current API. **Fix:** The `ProgrammaticDemo` uses `KayoBrutalistButton` with `onClick`. Since the current `KayoBrutalistButton` API doesn't include `onClick`, use a plain `<button>` styled element for the expand/collapse control in `ProgrammaticDemo` instead.

**Fix for ProgrammaticDemo** — replace `KayoBrutalistButton` with a styled `<button>`:

```tsx
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
```

This replaces the `KayoBrutalistButton` usage in `ProgrammaticDemo` in the `CollapsiblePage.tsx` written in Task 10. The `KayoBrutalistButton` import can still remain (it's used in the HoverCard `With Actions` section, not in CollapsiblePage). Remove `KayoBrutalistButton` import from `CollapsiblePage.tsx` — it is not needed there.

**`implemented` prop:** All 5 pages must have `implemented={['lemniscate', 'aumraa', 'kaayo']}` ✅

**Avatar import in CollapsiblePage:** The non-Kaayo `With Rich Content` section uses `Avatar` and `AvatarFallback`. These must be imported: `import { Avatar, AvatarFallback } from '@/app/components/ui/avatar'` — already listed above but the Task 10 file above is missing this import. Add it to the imports block at the top of the file.

---

## Execution Handoff

Plan complete and saved. Two execution options:

**1. Subagent-Driven (recommended)** — Fresh subagent per task, spec compliance + code quality review between tasks

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
