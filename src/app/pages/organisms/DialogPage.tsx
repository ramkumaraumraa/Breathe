import { useState } from 'react'
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistDialog } from '@/app/components/custom/kaayo/KayoBrutalistDialog'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/ui/dialog'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'

const triggerBtn = (label: string, onClick: () => void) => (
  <button
    onClick={onClick}
    style={{
      padding: '8px 16px',
      border: '2px solid #3b3d3f',
      borderRadius: '6px',
      backgroundColor: '#ffffff',
      fontFamily: "'DM Sans', system-ui, sans-serif",
      fontSize: '14px',
      fontWeight: 600,
      cursor: 'pointer',
      boxShadow: '2px 2px 0 #191b1f',
    }}
  >
    {label}
  </button>
)

const makeFooter = (onClose: () => void) => (
  <div style={{ display: 'flex', gap: 8 }}>
    <button
      onClick={onClose}
      style={{
        padding: '8px 16px',
        border: '2px solid #3b3d3f',
        borderRadius: 6,
        cursor: 'pointer',
        background: '#fff',
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      Cancel
    </button>
    <button
      style={{
        padding: '8px 16px',
        border: '2px solid #970103',
        borderRadius: 6,
        cursor: 'pointer',
        background: '#970103',
        color: '#fff',
        fontWeight: 600,
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      Confirm
    </button>
  </div>
)

const sharedCode = {
  react: `import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@breathe/ui'
import { Button } from '@breathe/ui'

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>Make changes here.</DialogDescription>
    </DialogHeader>
    {/* content */}
    <DialogFooter>
      <Button>Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
  reactNative: `import { useState } from 'react'
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet } from 'react-native'

function BottomSheetModal({ visible, onClose, title, children, footer }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
      <View style={styles.sheet}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.body}>{children}</View>
        {footer && <View style={styles.footer}>{footer}</View>}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  backdrop: { position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)' },
  sheet:    { marginTop: 'auto', backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: 32 },
  header:   { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  title:    { fontSize: 16, fontWeight: '600', color: '#0F172A' },
  body:     { paddingHorizontal: 24, paddingVertical: 20 },
  footer:   { paddingHorizontal: 24, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#E2E8F0' },
})`,
  ios: `import SwiftUI

struct EditProfileSheet: View {
    @State private var showSheet = false

    var body: some View {
        Button("Open Modal") { showSheet = true }
            .sheet(isPresented: $showSheet) {
                NavigationView {
                    Form {
                        Section("Profile") {
                            Text("Form content goes here")
                        }
                    }
                    .navigationTitle("Edit Profile")
                }
            }
    }
}`,
  android: `// Using MaterialAlertDialogBuilder for a standard dialog:
MaterialAlertDialogBuilder(context)
    .setTitle("Edit Profile")
    .setView(R.layout.dialog_edit_profile)
    .setPositiveButton("Save Changes") { _, _ -> /* handle save */ }
    .setNegativeButton("Cancel") { dialog, _ -> dialog.dismiss() }
    .show()`,
  tailwind: `<!-- Dialog / Modal Backdrop and Box -->
<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
  <div class="relative w-full max-w-md bg-white rounded-xl shadow-lg border border-slate-200 p-6 dark:bg-slate-900 dark:border-slate-800">
    <h3 class="text-lg font-semibold">Edit profile</h3>
    <p class="text-sm text-slate-500 mt-1 dark:text-slate-400">Make changes here.</p>
    <div class="py-4">
      <!-- Content -->
    </div>
    <div class="flex justify-end gap-2">
      <button class="px-4 py-2 border rounded-lg hover:bg-slate-50">Cancel</button>
      <button class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">Save changes</button>
    </div>
  </div>
</div>`,
}

export function DialogPage() {
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
  const [open11, setOpen11] = useState(false)
  const [open12, setOpen12] = useState(false)

  return (
    <ComponentPageLayout
      title="Dialog"
      description="Modal overlay that requires user interaction before returning to the main flow."
      level="Organism"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        // ─── Section 1: Default confirmation ───────────────────────────────
        {
          title: 'Default confirmation',
          preview: isKaayo ? (
            <>
              {triggerBtn('Open Dialog', () => setOpen1(true))}
              <KayoBrutalistDialog
                open={open1}
                onClose={() => setOpen1(false)}
                title="Confirm action"
                description="Are you sure you want to proceed? This will apply your changes immediately."
                variant="default"
                size="md"
                footer={makeFooter(() => setOpen1(false))}
              />
            </>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button>Open Dialog</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="Ram Kumar" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ),
          code: sharedCode,
        },

        // ─── Section 2: Destructive action ─────────────────────────────────
        {
          title: 'Destructive action',
          preview: isKaayo ? (
            <>
              {triggerBtn('Open Dialog', () => setOpen2(true))}
              <KayoBrutalistDialog
                open={open2}
                onClose={() => setOpen2(false)}
                title="Delete account"
                description="This action is permanent and cannot be undone. All your data will be erased immediately."
                variant="destructive"
                size="md"
                footer={makeFooter(() => setOpen2(false))}
              />
            </>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">Delete account</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Delete account</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. All your data will be permanently deleted.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button variant="destructive">Delete</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ),
          code: sharedCode,
        },

        // ─── Section 3: Form dialog ─────────────────────────────────────────
        {
          title: 'Form dialog',
          preview: isKaayo ? (
            <>
              {triggerBtn('Open Dialog', () => setOpen3(true))}
              <KayoBrutalistDialog
                open={open3}
                onClose={() => setOpen3(false)}
                title="Create new contact"
                description="Fill in the details below to add a new contact."
                size="md"
                footer={
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => setOpen3(false)}
                      style={{
                        padding: '8px 16px',
                        border: '2px solid #3b3d3f',
                        borderRadius: 6,
                        cursor: 'pointer',
                        background: '#fff',
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      style={{
                        padding: '8px 16px',
                        border: '2px solid #970103',
                        borderRadius: 6,
                        cursor: 'pointer',
                        background: '#970103',
                        color: '#fff',
                        fontWeight: 600,
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                      }}
                    >
                      Save
                    </button>
                  </div>
                }
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <label
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                        color: '#191b1f',
                      }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Full name"
                      style={{
                        padding: '8px 12px',
                        border: '2px solid #3b3d3f',
                        borderRadius: 6,
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                        fontSize: 14,
                        outline: 'none',
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <label
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                        color: '#191b1f',
                      }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      style={{
                        padding: '8px 12px',
                        border: '2px solid #3b3d3f',
                        borderRadius: 6,
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                        fontSize: 14,
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>
              </KayoBrutalistDialog>
            </>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button>Open Dialog</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create new contact</DialogTitle>
                  <DialogDescription>Fill in the details below to add a new contact.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-1.5">
                    <Label htmlFor="form-name">Name</Label>
                    <Input id="form-name" placeholder="Full name" />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="form-email">Email</Label>
                    <Input id="form-email" type="email" placeholder="email@example.com" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ),
          code: sharedCode,
        },

        // ─── Section 4: Info / read-only ────────────────────────────────────
        {
          title: 'Info / read-only',
          preview: isKaayo ? (
            <>
              {triggerBtn('Open Dialog', () => setOpen4(true))}
              <KayoBrutalistDialog
                open={open4}
                onClose={() => setOpen4(false)}
                title="System information"
                description="Your subscription is active and renews on 15 July 2026. No action is required at this time."
                size="md"
                footer={
                  <button
                    onClick={() => setOpen4(false)}
                    style={{
                      padding: '8px 16px',
                      border: '2px solid #3b3d3f',
                      borderRadius: 6,
                      cursor: 'pointer',
                      background: '#fff',
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    Dismiss
                  </button>
                }
              />
            </>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">View info</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>System information</DialogTitle>
                  <DialogDescription>
                    Your subscription is active and renews on 15 July 2026. No action is required.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Dismiss</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ),
          code: sharedCode,
        },

        // ─── Section 5: No description ──────────────────────────────────────
        {
          title: 'No description',
          preview: isKaayo ? (
            <>
              {triggerBtn('Open Dialog', () => setOpen5(true))}
              <KayoBrutalistDialog
                open={open5}
                onClose={() => setOpen5(false)}
                title="Apply changes"
                size="md"
                footer={makeFooter(() => setOpen5(false))}
              />
            </>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button>Open Dialog</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Apply changes</DialogTitle>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ),
          code: sharedCode,
        },

        // ─── Section 6: Small size ───────────────────────────────────────────
        {
          title: 'Small size',
          preview: isKaayo ? (
            <>
              {triggerBtn('Open Dialog', () => setOpen6(true))}
              <KayoBrutalistDialog
                open={open6}
                onClose={() => setOpen6(false)}
                title="Delete item?"
                description="This item will be permanently removed."
                variant="destructive"
                size="sm"
                footer={makeFooter(() => setOpen6(false))}
              />
            </>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">Delete item</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[300px]">
                <DialogHeader>
                  <DialogTitle>Delete item?</DialogTitle>
                  <DialogDescription>This item will be permanently removed.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button variant="destructive">Delete</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ),
          code: sharedCode,
        },

        // ─── Section 7: Large size ───────────────────────────────────────────
        {
          title: 'Large size',
          preview: isKaayo ? (
            <>
              {triggerBtn('Open Dialog', () => setOpen7(true))}
              <KayoBrutalistDialog
                open={open7}
                onClose={() => setOpen7(false)}
                title="Terms and conditions"
                description="Please read the full terms before accepting."
                size="lg"
                footer={makeFooter(() => setOpen7(false))}
              >
                <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 14, color: '#3b3d3f', lineHeight: 1.6 }}>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                  <p style={{ marginTop: 12 }}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</p>
                  <p style={{ marginTop: 12 }}>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.</p>
                  <p style={{ marginTop: 12 }}>Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.</p>
                  <p style={{ marginTop: 12 }}>Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui.</p>
                </div>
              </KayoBrutalistDialog>
            </>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button>Open Dialog</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Terms and conditions</DialogTitle>
                  <DialogDescription>Please read the full terms before accepting.</DialogDescription>
                </DialogHeader>
                <div className="py-4 text-sm text-muted-foreground space-y-3">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                  <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
                  <p>Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.</p>
                  <p>Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi.</p>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Accept</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ),
          code: sharedCode,
        },

        // ─── Section 8: Fullscreen ───────────────────────────────────────────
        {
          title: 'Fullscreen',
          preview: isKaayo ? (
            <>
              {triggerBtn('Open Dialog', () => setOpen8(true))}
              <KayoBrutalistDialog
                open={open8}
                onClose={() => setOpen8(false)}
                title="Fullscreen view"
                description="This dialog occupies the entire viewport for immersive content."
                size="fullscreen"
                footer={makeFooter(() => setOpen8(false))}
              >
                <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 14, color: '#3b3d3f' }}>
                  Content that benefits from the full screen real estate appears here.
                </div>
              </KayoBrutalistDialog>
            </>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button>Open Dialog</Button>
              </DialogTrigger>
              <DialogContent className="w-screen h-screen max-w-none m-0 rounded-none">
                <DialogHeader>
                  <DialogTitle>Fullscreen view</DialogTitle>
                  <DialogDescription>This dialog occupies the entire viewport.</DialogDescription>
                </DialogHeader>
                <div className="flex-1 py-4 text-sm text-muted-foreground">
                  Content that benefits from the full screen real estate appears here.
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ),
          code: sharedCode,
        },

        // ─── Section 9: No close button ──────────────────────────────────────
        {
          title: 'No close button',
          preview: isKaayo ? (
            <>
              {triggerBtn('Open Dialog', () => setOpen9(true))}
              <KayoBrutalistDialog
                open={open9}
                onClose={() => setOpen9(false)}
                title="Action required"
                description="You must choose an option to continue. The close button is hidden."
                size="md"
                showClose={false}
                footer={
                  <button
                    onClick={() => setOpen9(false)}
                    style={{
                      padding: '8px 16px',
                      border: '2px solid #3b3d3f',
                      borderRadius: 6,
                      cursor: 'pointer',
                      background: '#fff',
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    Dismiss
                  </button>
                }
              />
            </>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button>Open Dialog</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]" hideCloseButton>
                <DialogHeader>
                  <DialogTitle>Action required</DialogTitle>
                  <DialogDescription>You must choose an option to continue. The close button is hidden.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Dismiss</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ),
          code: sharedCode,
        },

        // ─── Section 10: Backdrop locked ─────────────────────────────────────
        {
          title: 'Backdrop locked',
          preview: isKaayo ? (
            <>
              {triggerBtn('Open Dialog', () => setOpen10(true))}
              <KayoBrutalistDialog
                open={open10}
                onClose={() => setOpen10(false)}
                title="Backdrop locked"
                description="Clicking outside this dialog does nothing. Use the buttons below to close it."
                size="md"
                closeOnBackdrop={false}
                footer={
                  <button
                    onClick={() => setOpen10(false)}
                    style={{
                      padding: '8px 16px',
                      border: '2px solid #3b3d3f',
                      borderRadius: 6,
                      cursor: 'pointer',
                      background: '#fff',
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    Close
                  </button>
                }
              />
            </>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button>Open Dialog</Button>
              </DialogTrigger>
              <DialogContent
                className="sm:max-w-[425px]"
                onInteractOutside={(e) => e.preventDefault()}
              >
                <DialogHeader>
                  <DialogTitle>Backdrop locked</DialogTitle>
                  <DialogDescription>
                    Clicking outside this dialog does nothing. Use the button to close it.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Close</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ),
          code: sharedCode,
        },

        // ─── Section 11: Long title ───────────────────────────────────────────
        {
          title: 'Long title',
          preview: isKaayo ? (
            <>
              {triggerBtn('Open Dialog', () => setOpen11(true))}
              <KayoBrutalistDialog
                open={open11}
                onClose={() => setOpen11(false)}
                title="This is an exceptionally long dialog title that should wrap gracefully on smaller screens"
                description="Dialog titles can be lengthy. The layout accommodates wrapping without breaking."
                size="md"
                footer={makeFooter(() => setOpen11(false))}
              />
            </>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button>Open Dialog</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>This is an exceptionally long dialog title that should wrap gracefully on smaller screens</DialogTitle>
                  <DialogDescription>Dialog titles can be lengthy. The layout accommodates wrapping without breaking.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ),
          code: sharedCode,
        },

        // ─── Section 12: Nested / scrollable content ──────────────────────────
        {
          title: 'Nested content',
          preview: isKaayo ? (
            <>
              {triggerBtn('Open Dialog', () => setOpen12(true))}
              <KayoBrutalistDialog
                open={open12}
                onClose={() => setOpen12(false)}
                title="Select a country"
                description="Scroll through the list and choose one."
                size="lg"
                footer={makeFooter(() => setOpen12(false))}
              >
                <div
                  style={{
                    maxHeight: 240,
                    overflowY: 'auto',
                    border: '2px solid #e5e7eb',
                    borderRadius: 6,
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: 14,
                  }}
                >
                  {[
                    'India', 'United States', 'United Kingdom', 'Germany', 'France',
                    'Japan', 'Australia', 'Canada', 'Brazil', 'South Africa',
                    'Singapore', 'UAE', 'Netherlands', 'Sweden', 'Mexico',
                  ].map((country, i) => (
                    <div
                      key={country}
                      style={{
                        padding: '10px 16px',
                        borderBottom: i < 14 ? '1px solid #e5e7eb' : 'none',
                        cursor: 'pointer',
                        color: '#191b1f',
                      }}
                    >
                      {country}
                    </div>
                  ))}
                </div>
              </KayoBrutalistDialog>
            </>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button>Open Dialog</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Select a country</DialogTitle>
                  <DialogDescription>Scroll through the list and choose one.</DialogDescription>
                </DialogHeader>
                <div className="max-h-60 overflow-y-auto border rounded-md divide-y text-sm">
                  {[
                    'India', 'United States', 'United Kingdom', 'Germany', 'France',
                    'Japan', 'Australia', 'Canada', 'Brazil', 'South Africa',
                    'Singapore', 'UAE', 'Netherlands', 'Sweden', 'Mexico',
                  ].map((country) => (
                    <div key={country} className="px-4 py-2.5 hover:bg-muted cursor-pointer">
                      {country}
                    </div>
                  ))}
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ),
          code: sharedCode,
        },
      ]}
    />
  )
}
