import { useState } from 'react'
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistSheet } from '@/app/components/custom/kaayo/KayoBrutalistSheet'
import { Button } from '@/app/components/atoms/button'
import {
  Sheet, SheetContent, SheetDescription,
  SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose,
} from '@/app/components/organisms/sheet'
import { Input } from '@/app/components/atoms/form-elements/input'
import { Label } from '@/app/components/atoms/label'

const triggerBtn: React.CSSProperties = {
  padding: '8px 16px',
  border: '2px solid #3b3d3f',
  borderRadius: 6,
  backgroundColor: '#ffffff',
  fontFamily: "'DM Sans', system-ui, sans-serif",
  fontSize: 14,
  fontWeight: 600,
  cursor: 'pointer',
  boxShadow: '2px 2px 0 #191b1f',
}

const inputStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  padding: '8px 12px',
  border: '2px solid #3b3d3f',
  borderRadius: 6,
  fontFamily: "'DM Sans', system-ui, sans-serif",
  fontSize: 14,
  marginBottom: 12,
  outline: 'none',
  boxSizing: 'border-box',
}

const footerBtnBase: React.CSSProperties = {
  padding: '8px 16px',
  border: '2px solid #3b3d3f',
  borderRadius: 6,
  fontFamily: "'DM Sans', system-ui, sans-serif",
  fontSize: 14,
  fontWeight: 600,
  cursor: 'pointer',
  boxShadow: '2px 2px 0 #191b1f',
}

export function SheetPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)
  const [open4, setOpen4] = useState(false)
  const [open5, setOpen5] = useState(false)
  const [open6, setOpen6] = useState(false)
  const [open7, setOpen7] = useState(false)
  const [open8, setOpen8] = useState(false)
  const [open9, setOpen9] = useState(false)
  const [open10, setOpen10] = useState(false)

  return (
    <ComponentPageLayout
      title="Sheet"
      description="Side panel overlay that slides in from the left or right edge. Use for filters, settings panels, and detail views."
      level="Organism"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        // ── Section 1: Right sheet — default ──────────────────────────────────
        {
          title: 'Right sheet — default',
          preview: isKaayo ? (
            <>
              <button style={triggerBtn} onClick={() => setOpen1(true)}>Open Sheet</button>
              <KayoBrutalistSheet
                open={open1}
                onClose={() => setOpen1(false)}
                side="right"
                title="Panel"
                description="Side panel content."
              >
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 14, color: '#3b3d3f', lineHeight: 1.6 }}>
                  This sheet slides in from the right. It has a title, description, and a close button in the header. Clicking the backdrop or pressing Escape also closes it.
                </p>
              </KayoBrutalistSheet>
            </>
          ) : (
            <Sheet>
              <SheetTrigger asChild>
                <Button>Open Sheet</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Panel</SheetTitle>
                  <SheetDescription>Side panel content.</SheetDescription>
                </SheetHeader>
                <p className="text-sm text-muted-foreground pt-4">
                  This sheet slides in from the right.
                </p>
              </SheetContent>
            </Sheet>
          ),
          code: {
            react: `<KayoBrutalistSheet
  open={open}
  onClose={() => setOpen(false)}
  side="right"
  title="Panel"
  description="Side panel content."
>
  <p>Content goes here.</p>
</KayoBrutalistSheet>`,
          },
        },

        // ── Section 2: Left sheet ─────────────────────────────────────────────
        {
          title: 'Left sheet',
          preview: isKaayo ? (
            <>
              <button style={triggerBtn} onClick={() => setOpen2(true)}>Open Sheet</button>
              <KayoBrutalistSheet
                open={open2}
                onClose={() => setOpen2(false)}
                side="left"
                title="Left Panel"
              >
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 14, color: '#3b3d3f', lineHeight: 1.6 }}>
                  This panel slides in from the left edge. Useful for navigation drawers and sidebar menus.
                </p>
              </KayoBrutalistSheet>
            </>
          ) : (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Open Left Sheet</Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Left Panel</SheetTitle>
                </SheetHeader>
                <p className="text-sm text-muted-foreground pt-4">
                  Slides in from the left.
                </p>
              </SheetContent>
            </Sheet>
          ),
          code: {
            react: `<KayoBrutalistSheet
  open={open}
  onClose={() => setOpen(false)}
  side="left"
  title="Left Panel"
>
  <p>Left panel content.</p>
</KayoBrutalistSheet>`,
          },
        },

        // ── Section 3: With form ──────────────────────────────────────────────
        {
          title: 'With form',
          preview: isKaayo ? (
            <>
              <button style={triggerBtn} onClick={() => setOpen3(true)}>Open Sheet</button>
              <KayoBrutalistSheet
                open={open3}
                onClose={() => setOpen3(false)}
                title="Edit Profile"
                footer={
                  <>
                    <button
                      style={{ ...footerBtnBase, backgroundColor: '#ffffff', color: '#3b3d3f' }}
                      onClick={() => setOpen3(false)}
                    >
                      Cancel
                    </button>
                    <button
                      style={{ ...footerBtnBase, backgroundColor: '#191b1f', color: '#ffffff' }}
                      onClick={() => setOpen3(false)}
                    >
                      Save
                    </button>
                  </>
                }
              >
                <div>
                  <label style={{ display: 'block', fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 13, fontWeight: 600, color: '#3b3d3f', marginBottom: 6 }}>Name</label>
                  <input type="text" placeholder="Name" style={inputStyle} />
                  <label style={{ display: 'block', fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 13, fontWeight: 600, color: '#3b3d3f', marginBottom: 6 }}>Email</label>
                  <input type="text" placeholder="Email" style={inputStyle} />
                  <label style={{ display: 'block', fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 13, fontWeight: 600, color: '#3b3d3f', marginBottom: 6 }}>Role</label>
                  <input type="text" placeholder="Role" style={inputStyle} />
                </div>
              </KayoBrutalistSheet>
            </>
          ) : (
            <Sheet>
              <SheetTrigger asChild>
                <Button>Edit Profile</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Edit Profile</SheetTitle>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" placeholder="Role" />
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </SheetClose>
                  <Button>Save</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          ),
          code: {
            react: `<KayoBrutalistSheet
  open={open}
  onClose={() => setOpen(false)}
  title="Edit Profile"
  footer={
    <>
      <button onClick={() => setOpen(false)}>Cancel</button>
      <button onClick={() => setOpen(false)}>Save</button>
    </>
  }
>
  <input type="text" placeholder="Name" />
  <input type="text" placeholder="Email" />
  <input type="text" placeholder="Role" />
</KayoBrutalistSheet>`,
          },
        },

        // ── Section 4: With scrollable list ──────────────────────────────────
        {
          title: 'With scrollable list',
          preview: isKaayo ? (
            <>
              <button style={triggerBtn} onClick={() => setOpen4(true)}>Open Sheet</button>
              <KayoBrutalistSheet
                open={open4}
                onClose={() => setOpen4(false)}
                title="Student List"
                footer={
                  <button
                    style={{ ...footerBtnBase, backgroundColor: '#191b1f', color: '#ffffff' }}
                    onClick={() => setOpen4(false)}
                  >
                    Close
                  </button>
                }
              >
                {Array.from({ length: 20 }, (_, i) => (
                  <p
                    key={i}
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: 14,
                      color: '#3b3d3f',
                      padding: '10px 0',
                      borderBottom: '1px solid #e5e7eb',
                      margin: 0,
                    }}
                  >
                    {i + 1}. Student Name {i + 1}
                  </p>
                ))}
              </KayoBrutalistSheet>
            </>
          ) : (
            <Sheet>
              <SheetTrigger asChild>
                <Button>Student List</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Student List</SheetTitle>
                </SheetHeader>
                <div className="py-4 space-y-2 overflow-auto max-h-[60vh]">
                  {Array.from({ length: 20 }, (_, i) => (
                    <p key={i} className="text-sm border-b pb-2">{i + 1}. Student Name {i + 1}</p>
                  ))}
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button>Close</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          ),
          code: {
            react: `<KayoBrutalistSheet
  open={open}
  onClose={() => setOpen(false)}
  title="Student List"
  footer={<button onClick={() => setOpen(false)}>Close</button>}
>
  {items.map((item, i) => <p key={i}>{item}</p>)}
</KayoBrutalistSheet>`,
          },
        },

        // ── Section 5: Narrow (280px) ─────────────────────────────────────────
        {
          title: 'Narrow (280px)',
          preview: isKaayo ? (
            <>
              <button style={triggerBtn} onClick={() => setOpen5(true)}>Open Sheet</button>
              <KayoBrutalistSheet
                open={open5}
                onClose={() => setOpen5(false)}
                title="Filters"
                width={280}
              >
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>
                  A compact 280px panel. Great for filter sidebars where space is precious.
                </p>
                <div style={{ marginTop: 16 }}>
                  {['In Progress', 'Completed', 'Overdue'].map((f) => (
                    <label key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 14, color: '#3b3d3f', cursor: 'pointer' }}>
                      <input type="checkbox" style={{ width: 16, height: 16, accentColor: '#3b3d3f' }} />
                      {f}
                    </label>
                  ))}
                </div>
              </KayoBrutalistSheet>
            </>
          ) : (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Filters</Button>
              </SheetTrigger>
              <SheetContent className="w-[280px] sm:w-[280px]">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <p className="text-sm text-muted-foreground pt-4">Compact 280px filter panel.</p>
              </SheetContent>
            </Sheet>
          ),
          code: {
            react: `<KayoBrutalistSheet
  open={open}
  onClose={() => setOpen(false)}
  title="Filters"
  width={280}
>
  {/* filter controls */}
</KayoBrutalistSheet>`,
          },
        },

        // ── Section 6: Wide (520px) ────────────────────────────────────────────
        {
          title: 'Wide (520px)',
          preview: isKaayo ? (
            <>
              <button style={triggerBtn} onClick={() => setOpen6(true)}>Open Sheet</button>
              <KayoBrutalistSheet
                open={open6}
                onClose={() => setOpen6(false)}
                title="Edit Details"
                width={520}
                footer={
                  <button
                    style={{ ...footerBtnBase, backgroundColor: '#191b1f', color: '#ffffff' }}
                    onClick={() => setOpen6(false)}
                  >
                    Save Changes
                  </button>
                }
              >
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 14, color: '#6b7280', lineHeight: 1.6, marginBottom: 16 }}>
                  A wide 520px panel for detailed editing. Provides extra horizontal space for complex forms or multi-column layouts.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {['First Name', 'Last Name', 'Phone', 'Department'].map((f) => (
                    <div key={f}>
                      <label style={{ display: 'block', fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 13, fontWeight: 600, color: '#3b3d3f', marginBottom: 6 }}>{f}</label>
                      <input type="text" placeholder={f} style={{ ...inputStyle, marginBottom: 0 }} />
                    </div>
                  ))}
                </div>
              </KayoBrutalistSheet>
            </>
          ) : (
            <Sheet>
              <SheetTrigger asChild>
                <Button>Edit Details</Button>
              </SheetTrigger>
              <SheetContent className="w-[520px] sm:w-[520px]">
                <SheetHeader>
                  <SheetTitle>Edit Details</SheetTitle>
                </SheetHeader>
                <p className="text-sm text-muted-foreground pt-4">Wide 520px panel for detailed editing.</p>
              </SheetContent>
            </Sheet>
          ),
          code: {
            react: `<KayoBrutalistSheet
  open={open}
  onClose={() => setOpen(false)}
  title="Edit Details"
  width={520}
>
  {/* wide content */}
</KayoBrutalistSheet>`,
          },
        },

        // ── Section 7: No title ───────────────────────────────────────────────
        {
          title: 'No title',
          preview: isKaayo ? (
            <>
              <button style={triggerBtn} onClick={() => setOpen7(true)}>Open Sheet</button>
              <KayoBrutalistSheet
                open={open7}
                onClose={() => setOpen7(false)}
              >
                <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
                  <p style={{ fontSize: 16, fontWeight: 700, color: '#3b3d3f', marginBottom: 8, marginTop: 0 }}>Body-only panel</p>
                  <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6, marginTop: 0 }}>
                    When no title prop is passed the header section is not rendered, giving the body full control of the panel layout from top to bottom. The close button is absent — dismiss via backdrop or Escape.
                  </p>
                  <button
                    style={{ ...footerBtnBase, marginTop: 20, backgroundColor: '#191b1f', color: '#ffffff' }}
                    onClick={() => setOpen7(false)}
                  >
                    Dismiss
                  </button>
                </div>
              </KayoBrutalistSheet>
            </>
          ) : (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Open (no title)</Button>
              </SheetTrigger>
              <SheetContent>
                <p className="text-sm pt-6">Body-only panel — no header rendered.</p>
              </SheetContent>
            </Sheet>
          ),
          code: {
            react: `<KayoBrutalistSheet
  open={open}
  onClose={() => setOpen(false)}
>
  <p>Body-only panel — no header.</p>
</KayoBrutalistSheet>`,
          },
        },

        // ── Section 8: No footer ──────────────────────────────────────────────
        {
          title: 'No footer',
          preview: isKaayo ? (
            <>
              <button style={triggerBtn} onClick={() => setOpen8(true)}>Open Sheet</button>
              <KayoBrutalistSheet
                open={open8}
                onClose={() => setOpen8(false)}
                title="Info"
              >
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 14, color: '#3b3d3f', lineHeight: 1.6, marginTop: 0 }}>
                  This panel has a title and header close button but no footer actions bar. Use this pattern for read-only detail views and informational panels where no explicit action is required.
                </p>
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>
                  The footer slot is omitted — only the header and body are rendered.
                </p>
              </KayoBrutalistSheet>
            </>
          ) : (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Info Panel</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Info</SheetTitle>
                </SheetHeader>
                <p className="text-sm text-muted-foreground pt-4">No footer actions — read-only info panel.</p>
              </SheetContent>
            </Sheet>
          ),
          code: {
            react: `<KayoBrutalistSheet
  open={open}
  onClose={() => setOpen(false)}
  title="Info"
>
  <p>Read-only content. No footer prop passed.</p>
</KayoBrutalistSheet>`,
          },
        },

        // ── Section 9: Backdrop locked ────────────────────────────────────────
        {
          title: 'Backdrop locked',
          preview: isKaayo ? (
            <>
              <button style={triggerBtn} onClick={() => setOpen9(true)}>Open Sheet</button>
              <KayoBrutalistSheet
                open={open9}
                onClose={() => setOpen9(false)}
                title="Locked"
                closeOnBackdrop={false}
                footer={
                  <button
                    style={{ ...footerBtnBase, backgroundColor: '#191b1f', color: '#ffffff' }}
                    onClick={() => setOpen9(false)}
                  >
                    Close
                  </button>
                }
              >
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 14, color: '#3b3d3f', lineHeight: 1.6, marginTop: 0 }}>
                  <strong>closeOnBackdrop={'{false}'}</strong> — clicking the dark backdrop will not close this panel. Only the ✕ button in the header, the Close button in the footer, or the Escape key will dismiss it.
                </p>
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>
                  Use this for critical flows where accidental dismissal would lose unsaved work.
                </p>
              </KayoBrutalistSheet>
            </>
          ) : (
            <Sheet>
              <SheetTrigger asChild>
                <Button>Locked Sheet</Button>
              </SheetTrigger>
              <SheetContent onInteractOutside={(e) => e.preventDefault()}>
                <SheetHeader>
                  <SheetTitle>Locked</SheetTitle>
                  <SheetDescription>Clicking outside does not close this sheet.</SheetDescription>
                </SheetHeader>
                <p className="text-sm text-muted-foreground pt-4">Only the close button dismisses.</p>
              </SheetContent>
            </Sheet>
          ),
          code: {
            react: `<KayoBrutalistSheet
  open={open}
  onClose={() => setOpen(false)}
  title="Locked"
  closeOnBackdrop={false}
>
  <p>Backdrop click is disabled.</p>
</KayoBrutalistSheet>`,
          },
        },

        // ── Section 10: Stacked content ───────────────────────────────────────
        {
          title: 'Stacked content',
          preview: isKaayo ? (
            <>
              <button style={triggerBtn} onClick={() => setOpen10(true)}>Open Sheet</button>
              <KayoBrutalistSheet
                open={open10}
                onClose={() => setOpen10(false)}
                title="Dashboard"
              >
                {[
                  { label: 'Revenue', value: '₹1,24,500', sub: 'This month' },
                  { label: 'Active Students', value: '342', sub: '12 new this week' },
                  { label: 'Pending Tasks', value: '8', sub: '3 due today' },
                ].map((card) => (
                  <div
                    key={card.label}
                    style={{
                      border: '2px solid #3b3d3f',
                      borderRadius: 8,
                      padding: '16px 20px',
                      marginBottom: 12,
                      backgroundColor: '#fafafa',
                      boxShadow: '2px 2px 0 #191b1f',
                    }}
                  >
                    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 13, color: '#6b7280', fontWeight: 500, marginBottom: 4 }}>
                      {card.label}
                    </div>
                    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 24, fontWeight: 700, color: '#3b3d3f', lineHeight: 1.2 }}>
                      {card.value}
                    </div>
                    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 12, color: '#9ca3af', marginTop: 4 }}>
                      {card.sub}
                    </div>
                  </div>
                ))}
              </KayoBrutalistSheet>
            </>
          ) : (
            <Sheet>
              <SheetTrigger asChild>
                <Button>Dashboard</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Dashboard</SheetTitle>
                </SheetHeader>
                <div className="py-4 space-y-3">
                  {['Revenue', 'Active Students', 'Pending Tasks'].map((card) => (
                    <div key={card} className="border rounded-md p-4">
                      <p className="text-sm font-medium">{card}</p>
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          ),
          code: {
            react: `<KayoBrutalistSheet
  open={open}
  onClose={() => setOpen(false)}
  title="Dashboard"
>
  {cards.map(card => (
    <div key={card.label} style={{ border: '2px solid #3b3d3f', borderRadius: 8, padding: '16px 20px', marginBottom: 12 }}>
      <div>{card.label}</div>
      <div>{card.value}</div>
    </div>
  ))}
</KayoBrutalistSheet>`,
          },
        },
      ]}
    />
  )
}
