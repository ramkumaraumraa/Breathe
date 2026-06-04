import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
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

export function DialogPage() {
  return (
    <ComponentPageLayout
      title="Dialog"
      description="Modal overlay that requires user interaction before returning to the main flow. Use for confirmations, forms, and focused tasks."
      level="Organism"
      status="Stable"
      sections={[
        {
          title: 'Default',
          preview: (
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
          code: {
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
    .setView(R.layout.dialog_edit_profile) // inflate your custom view
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
          },
        },
      ]}
    />
  )
}
