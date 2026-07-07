import { useState } from 'react'
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistDrawer } from '@/app/components/custom/kaayo/KayoBrutalistDrawer'
import { Button } from '@/app/components/atoms/button'
import {
  Drawer, DrawerClose, DrawerContent, DrawerDescription,
  DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger,
} from '@/app/components/organisms/drawer'

const triggerBtn = (onClick: () => void, label = 'Open Drawer') => (
  <button
    onClick={onClick}
    style={{
      padding: '8px 16px',
      border: '2px solid #3b3d3f',
      borderRadius: 6,
      backgroundColor: '#ffffff',
      fontFamily: "'DM Sans', system-ui, sans-serif",
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      boxShadow: '2px 2px 0 #191b1f',
    }}
  >
    {label}
  </button>
)

const closeBtn = (onClose: () => void, label = 'Close') => (
  <button
    onClick={onClose}
    style={{
      padding: '8px 16px',
      border: '2px solid #3b3d3f',
      borderRadius: 6,
      cursor: 'pointer',
      background: '#fff',
      fontFamily: "'DM Sans', system-ui, sans-serif",
      fontSize: 14,
      fontWeight: 600,
    }}
  >
    {label}
  </button>
)

const confirmBtn = (onClose: () => void) => (
  <button
    onClick={onClose}
    style={{
      padding: '8px 16px',
      border: '2px solid #3b3d3f',
      borderRadius: 6,
      cursor: 'pointer',
      background: '#3b3d3f',
      color: '#fff',
      fontFamily: "'DM Sans', system-ui, sans-serif",
      fontSize: 14,
      fontWeight: 600,
    }}
  >
    Confirm
  </button>
)

const saveBtn = (onClose: () => void) => (
  <button
    onClick={onClose}
    style={{
      padding: '8px 16px',
      border: '2px solid #3b3d3f',
      borderRadius: 6,
      cursor: 'pointer',
      background: '#3b3d3f',
      color: '#fff',
      fontFamily: "'DM Sans', system-ui, sans-serif",
      fontSize: 14,
      fontWeight: 600,
    }}
  >
    Save
  </button>
)

export function DrawerPage() {
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
      title="Drawer"
      description="Bottom sheet overlay that slides up from the bottom edge. Snap heights control how much of the viewport it covers."
      level="Organism"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Default (md snap)',
          preview: isKaayo ? (
            <>
              {triggerBtn(() => setOpen1(true))}
              <KayoBrutalistDrawer
                open={open1}
                onClose={() => setOpen1(false)}
                snapHeight="md"
                title="Panel"
                description="60vh drawer."
                footer={closeBtn(() => setOpen1(false))}
              />
            </>
          ) : (
            <Drawer>
              <DrawerTrigger asChild>
                <Button>Open Drawer</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="text-left">
                  <DrawerTitle>Panel</DrawerTitle>
                  <DrawerDescription>60vh drawer.</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          ),
          code: {
            react: `<KayoBrutalistDrawer
  open={open}
  onClose={() => setOpen(false)}
  snapHeight="md"
  title="Panel"
  description="60vh drawer."
  footer={<button onClick={() => setOpen(false)}>Close</button>}
/>`,
          },
        },
        {
          title: 'Small snap (40vh)',
          preview: isKaayo ? (
            <>
              {triggerBtn(() => setOpen2(true))}
              <KayoBrutalistDrawer
                open={open2}
                onClose={() => setOpen2(false)}
                snapHeight="sm"
                title="Quick Actions"
                footer={closeBtn(() => setOpen2(false))}
              />
            </>
          ) : (
            <Drawer>
              <DrawerTrigger asChild>
                <Button>Open Drawer</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="text-left">
                  <DrawerTitle>Quick Actions</DrawerTitle>
                </DrawerHeader>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          ),
          code: {
            react: `<KayoBrutalistDrawer
  open={open}
  onClose={() => setOpen(false)}
  snapHeight="sm"
  title="Quick Actions"
  footer={<button onClick={() => setOpen(false)}>Close</button>}
/>`,
          },
        },
        {
          title: 'Large snap (80vh)',
          preview: isKaayo ? (
            <>
              {triggerBtn(() => setOpen3(true))}
              <KayoBrutalistDrawer
                open={open3}
                onClose={() => setOpen3(false)}
                snapHeight="lg"
                title="Details"
                footer={closeBtn(() => setOpen3(false))}
              >
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 14, color: '#3b3d3f', lineHeight: 1.7, marginBottom: 12 }}>
                  This drawer occupies 80% of the viewport height, providing ample space for rich content such as detail views, extended forms, or scrollable lists.
                </p>
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 14, color: '#3b3d3f', lineHeight: 1.7, marginBottom: 12 }}>
                  Use the large snap height when the content requires more breathing room but a full-screen takeover is not appropriate for the context.
                </p>
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 14, color: '#3b3d3f', lineHeight: 1.7 }}>
                  The handle bar at the top signals to users that the panel can be dismissed, reinforcing the gesture-driven mental model familiar from native mobile apps.
                </p>
              </KayoBrutalistDrawer>
            </>
          ) : (
            <Drawer>
              <DrawerTrigger asChild>
                <Button>Open Drawer</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="text-left">
                  <DrawerTitle>Details</DrawerTitle>
                </DrawerHeader>
                <div className="px-4 pb-2 space-y-2 text-sm text-muted-foreground">
                  <p>This drawer occupies 80% of the viewport height.</p>
                  <p>Use it when content requires more breathing room.</p>
                  <p>The handle bar signals it can be dismissed.</p>
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          ),
          code: {
            react: `<KayoBrutalistDrawer
  open={open}
  onClose={() => setOpen(false)}
  snapHeight="lg"
  title="Details"
  footer={<button onClick={() => setOpen(false)}>Close</button>}
>
  <p>Rich content here.</p>
</KayoBrutalistDrawer>`,
          },
        },
        {
          title: 'Full height',
          preview: isKaayo ? (
            <>
              {triggerBtn(() => setOpen4(true))}
              <KayoBrutalistDrawer
                open={open4}
                onClose={() => setOpen4(false)}
                snapHeight="full"
                title="Full Panel"
                footer={
                  <>
                    {closeBtn(() => setOpen4(false), 'Cancel')}
                    {confirmBtn(() => setOpen4(false))}
                  </>
                }
              />
            </>
          ) : (
            <Drawer>
              <DrawerTrigger asChild>
                <Button>Open Drawer</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="text-left">
                  <DrawerTitle>Full Panel</DrawerTitle>
                </DrawerHeader>
                <DrawerFooter>
                  <Button>Confirm</Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          ),
          code: {
            react: `<KayoBrutalistDrawer
  open={open}
  onClose={() => setOpen(false)}
  snapHeight="full"
  title="Full Panel"
  footer={
    <>
      <button onClick={() => setOpen(false)}>Cancel</button>
      <button onClick={() => setOpen(false)}>Confirm</button>
    </>
  }
/>`,
          },
        },
        {
          title: 'Action sheet',
          preview: isKaayo ? (
            <>
              {triggerBtn(() => setOpen5(true))}
              <KayoBrutalistDrawer
                open={open5}
                onClose={() => setOpen5(false)}
                snapHeight="sm"
              >
                {['Add Student', 'Edit Record', 'Send Message', 'Export Data', 'Delete Record'].map((label, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '14px 0',
                      borderBottom: '1px solid #e5e7eb',
                      cursor: 'pointer',
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: 15,
                      color: '#3b3d3f',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                    }}
                  >
                    <span style={{ fontSize: 18 }}>{['➕', '✏️', '💬', '📤', '🗑️'][i]}</span>
                    {label}
                  </div>
                ))}
              </KayoBrutalistDrawer>
            </>
          ) : (
            <Drawer>
              <DrawerTrigger asChild>
                <Button>Open Drawer</Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="px-4 py-2">
                  {['Add Student', 'Edit Record', 'Send Message', 'Export Data', 'Delete Record'].map((label, i) => (
                    <div key={i} className="py-3 border-b text-sm cursor-pointer flex items-center gap-3">
                      <span>{['➕', '✏️', '💬', '📤', '🗑️'][i]}</span>
                      {label}
                    </div>
                  ))}
                </div>
              </DrawerContent>
            </Drawer>
          ),
          code: {
            react: `<KayoBrutalistDrawer open={open} onClose={() => setOpen(false)} snapHeight="sm">
  {actions.map((label, i) => (
    <div key={i} style={{ padding:'14px 0', borderBottom:'1px solid #e5e7eb', cursor:'pointer', display:'flex', alignItems:'center', gap:12 }}>
      <span>{icons[i]}</span>
      {label}
    </div>
  ))}
</KayoBrutalistDrawer>`,
          },
        },
        {
          title: 'With form',
          preview: isKaayo ? (
            <>
              {triggerBtn(() => setOpen6(true))}
              <KayoBrutalistDrawer
                open={open6}
                onClose={() => setOpen6(false)}
                snapHeight="md"
                title="Add Record"
                footer={
                  <>
                    {closeBtn(() => setOpen6(false), 'Cancel')}
                    {saveBtn(() => setOpen6(false))}
                  </>
                }
              >
                <input
                  type="text"
                  placeholder="Name"
                  style={{
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
                  }}
                />
                <input
                  type="email"
                  placeholder="Email"
                  style={{
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
                  }}
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  style={{
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
                  }}
                />
              </KayoBrutalistDrawer>
            </>
          ) : (
            <Drawer>
              <DrawerTrigger asChild>
                <Button>Open Drawer</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="text-left">
                  <DrawerTitle>Add Record</DrawerTitle>
                </DrawerHeader>
                <div className="px-4 pb-2 space-y-2">
                  <input type="text" placeholder="Name" className="w-full border rounded px-3 py-2 text-sm" />
                  <input type="email" placeholder="Email" className="w-full border rounded px-3 py-2 text-sm" />
                  <input type="tel" placeholder="Phone" className="w-full border rounded px-3 py-2 text-sm" />
                </div>
                <DrawerFooter>
                  <Button>Save</Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          ),
          code: {
            react: `<KayoBrutalistDrawer
  open={open}
  onClose={() => setOpen(false)}
  snapHeight="md"
  title="Add Record"
  footer={<><button onClick={() => setOpen(false)}>Cancel</button><button onClick={() => setOpen(false)}>Save</button></>}
>
  <input type="text" placeholder="Name" style={{ display:'block', width:'100%', padding:'8px 12px', border:'2px solid #3b3d3f', borderRadius:6, marginBottom:12 }} />
  <input type="email" placeholder="Email" style={{ display:'block', width:'100%', padding:'8px 12px', border:'2px solid #3b3d3f', borderRadius:6, marginBottom:12 }} />
  <input type="tel" placeholder="Phone" style={{ display:'block', width:'100%', padding:'8px 12px', border:'2px solid #3b3d3f', borderRadius:6 }} />
</KayoBrutalistDrawer>`,
          },
        },
        {
          title: 'No handle bar',
          preview: isKaayo ? (
            <>
              {triggerBtn(() => setOpen7(true))}
              <KayoBrutalistDrawer
                open={open7}
                onClose={() => setOpen7(false)}
                snapHeight="md"
                title="No Handle"
                showHandle={false}
                footer={closeBtn(() => setOpen7(false))}
              />
            </>
          ) : (
            <Drawer>
              <DrawerTrigger asChild>
                <Button>Open Drawer</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="text-left">
                  <DrawerTitle>No Handle</DrawerTitle>
                </DrawerHeader>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          ),
          code: {
            react: `<KayoBrutalistDrawer
  open={open}
  onClose={() => setOpen(false)}
  snapHeight="md"
  title="No Handle"
  showHandle={false}
  footer={<button onClick={() => setOpen(false)}>Close</button>}
/>`,
          },
        },
        {
          title: 'With scrollable body',
          preview: isKaayo ? (
            <>
              {triggerBtn(() => setOpen8(true))}
              <KayoBrutalistDrawer
                open={open8}
                onClose={() => setOpen8(false)}
                snapHeight="lg"
                title="Long List"
                footer={closeBtn(() => setOpen8(false))}
              >
                {Array.from({ length: 25 }, (_, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '12px 0',
                      borderBottom: '1px solid #e5e7eb',
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: 14,
                      color: '#3b3d3f',
                    }}
                  >
                    List item {i + 1}
                  </div>
                ))}
              </KayoBrutalistDrawer>
            </>
          ) : (
            <Drawer>
              <DrawerTrigger asChild>
                <Button>Open Drawer</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="text-left">
                  <DrawerTitle>Long List</DrawerTitle>
                </DrawerHeader>
                <div className="px-4 pb-2 overflow-y-auto max-h-64">
                  {Array.from({ length: 25 }, (_, i) => (
                    <div key={i} className="py-2 border-b text-sm">List item {i + 1}</div>
                  ))}
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          ),
          code: {
            react: `<KayoBrutalistDrawer
  open={open}
  onClose={() => setOpen(false)}
  snapHeight="lg"
  title="Long List"
  footer={<button onClick={() => setOpen(false)}>Close</button>}
>
  {items.map((item, i) => (
    <div key={i} style={{ padding:'12px 0', borderBottom:'1px solid #e5e7eb' }}>{item}</div>
  ))}
</KayoBrutalistDrawer>`,
          },
        },
        {
          title: 'No title, no footer',
          preview: isKaayo ? (
            <>
              {triggerBtn(() => setOpen9(true))}
              <KayoBrutalistDrawer
                open={open9}
                onClose={() => setOpen9(false)}
                snapHeight="sm"
              >
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 14, color: '#3b3d3f', lineHeight: 1.7 }}>
                  This drawer has no title and no footer. The body content fills the available space within the small snap height. Tapping the backdrop or pressing Escape dismisses it.
                </p>
              </KayoBrutalistDrawer>
            </>
          ) : (
            <Drawer>
              <DrawerTrigger asChild>
                <Button>Open Drawer</Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="px-4 py-4 text-sm text-muted-foreground">
                  This drawer has no title and no footer. The body content fills the available space.
                </div>
              </DrawerContent>
            </Drawer>
          ),
          code: {
            react: `<KayoBrutalistDrawer
  open={open}
  onClose={() => setOpen(false)}
  snapHeight="sm"
>
  <p>Plain text content with no chrome.</p>
</KayoBrutalistDrawer>`,
          },
        },
        {
          title: 'Backdrop locked',
          preview: isKaayo ? (
            <>
              {triggerBtn(() => setOpen10(true))}
              <KayoBrutalistDrawer
                open={open10}
                onClose={() => setOpen10(false)}
                snapHeight="md"
                title="Locked Drawer"
                description="Clicking the backdrop will not close this drawer. Use the button below."
                closeOnBackdrop={false}
                footer={closeBtn(() => setOpen10(false))}
              />
            </>
          ) : (
            <Drawer>
              <DrawerTrigger asChild>
                <Button>Open Drawer</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="text-left">
                  <DrawerTitle>Locked Drawer</DrawerTitle>
                  <DrawerDescription>
                    Clicking the backdrop will not close this drawer. Use the button below.
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          ),
          code: {
            react: `<KayoBrutalistDrawer
  open={open}
  onClose={() => setOpen(false)}
  snapHeight="md"
  title="Locked Drawer"
  description="Clicking the backdrop will not close this drawer."
  closeOnBackdrop={false}
  footer={<button onClick={() => setOpen(false)}>Close</button>}
/>`,
          },
        },
      ]}
    />
  )
}
