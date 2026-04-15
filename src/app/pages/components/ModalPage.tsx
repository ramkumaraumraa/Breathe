import { useState } from 'react';
import { X, AlertTriangle, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PageHeader } from '../../components/shared/PageHeader';
import { ComponentPreview } from '../../components/shared/ComponentPreview';
import { PropsTable } from '../../components/shared/PropsTable';
import { CodeBlock } from '../../components/shared/CodeBlock';
import { PageNavigation } from '../../components/shared/PageNavigation';

function Modal({ isOpen, onClose, title, children, size = 'md', footer }: {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  footer?: React.ReactNode;
}) {
  const sizeMap = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-2xl' };
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className={`relative w-full ${sizeMap[size]} bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden`}
          >
            {title && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                <h3 className="text-slate-900 dark:text-slate-100 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1rem' }}>
                  {title}
                </h3>
                <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <X size={16} />
                </button>
              </div>
            )}
            <div className="px-6 py-5">{children}</div>
            {footer && (
              <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex gap-3 justify-end">{footer}</div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function Btn({ variant = 'primary', children, onClick, size = 'md' }: {
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
  onClick?: () => void;
  size?: 'sm' | 'md';
}) {
  const variants = {
    primary: 'text-white hover:opacity-90',
    secondary: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700',
    danger: 'text-white hover:opacity-90',
  };
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2 text-sm' };
  return (
    <button
      onClick={onClick}
      className={`rounded-xl transition-all ${variants[variant]} ${sizes[size]}`}
      style={{
        fontFamily: 'var(--font-sans)', fontWeight: 500, border: variant !== 'secondary' ? 'none' : undefined, cursor: 'pointer',
        background: variant === 'primary' ? 'linear-gradient(135deg, #0D9488, #0F766E)' : variant === 'danger' ? 'linear-gradient(135deg, #E11D48, #BE123C)' : undefined,
      }}
    >
      {children}
    </button>
  );
}

function BasicModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Btn onClick={() => setOpen(true)}>Open Modal</Btn>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Edit Profile"
        footer={<><Btn variant="secondary" onClick={() => setOpen(false)}>Cancel</Btn><Btn onClick={() => setOpen(false)}>Save Changes</Btn></>}>
        <div className="space-y-4">
          {[{ label: 'Display Name', val: 'Alice Kim' }, { label: 'Email', val: 'alice@breathe.io' }].map(f => (
            <div key={f.label}>
              <label className="block text-slate-700 dark:text-slate-300 mb-1.5" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 500 }}>{f.label}</label>
              <input defaultValue={f.val} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none focus:border-teal-400 dark:focus:border-teal-600 transition-colors"
                     style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }} />
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
}

function ConfirmModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Btn variant="danger" onClick={() => setOpen(true)}>Delete Project</Btn>
      <Modal isOpen={open} onClose={() => setOpen(false)} size="sm"
        footer={<><Btn variant="secondary" onClick={() => setOpen(false)}>Cancel</Btn><Btn variant="danger" onClick={() => setOpen(false)}>Delete</Btn></>}>
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mx-auto mb-4">
            <Trash2 size={22} className="text-rose-600 dark:text-rose-400" />
          </div>
          <h3 className="text-slate-900 dark:text-slate-100 mb-2 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.0625rem' }}>
            Delete "Breathe Design"?
          </h3>
          <p className="text-slate-500 dark:text-slate-400 m-0" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', lineHeight: 1.6 }}>
            This action cannot be undone. All data will be permanently removed.
          </p>
        </div>
      </Modal>
    </>
  );
}

const modalProps = [
  { name: 'isOpen', type: 'boolean', required: true, description: 'Controls whether the modal is visible.' },
  { name: 'onClose', type: '() => void', required: true, description: 'Called when the modal should close (backdrop click, Esc, X button).' },
  { name: 'title', type: 'string', description: 'Title shown in the modal header.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Maximum width of the modal.' },
  { name: 'footer', type: 'ReactNode', description: 'Content rendered in the footer (typically action buttons).' },
  { name: 'children', type: 'ReactNode', required: true, description: 'Body content of the modal.' },
];

export function ModalPage() {
  return (
    <div className="max-w-3xl px-6 lg:px-10 py-10">
      <PageHeader
        title="Modal"
        description="Modals focus user attention on a task or piece of information. They temporarily block the rest of the interface until dismissed."
        section="Components"
        badge="Stable"
      />

      <ComponentPreview
        title="Basic Modal"
        description="A modal with header, form, and footer actions."
        code={`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Modal</Button>

<Modal
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Edit Profile"
  footer={
    <>
      <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
      <Button onClick={() => setOpen(false)}>Save Changes</Button>
    </>
  }
>
  <Input label="Display Name" defaultValue="Alice Kim" />
  <Input label="Email" defaultValue="alice@breathe.io" />
</Modal>`}
        reactNativeCode={`import { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { X } from 'lucide-react-native';

function BottomSheetModal({ visible, onClose, title, children, footer }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      {/* Backdrop */}
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
      {/* Sheet */}
      <View style={styles.sheet}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <X size={16} color="#64748B" />
          </TouchableOpacity>
        </View>
        {/* Body */}
        <View style={styles.body}>{children}</View>
        {/* Footer */}
        {footer && <View style={styles.footer}>{footer}</View>}
      </View>
    </Modal>
  );
}

function EditProfileModal() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TouchableOpacity style={styles.openBtn} onPress={() => setOpen(true)}>
        <Text style={{ color: '#fff', fontWeight: '600' }}>Open Modal</Text>
      </TouchableOpacity>
      <BottomSheetModal visible={open} onClose={() => setOpen(false)} title="Edit Profile"
        footer={
          <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'flex-end' }}>
            <TouchableOpacity onPress={() => setOpen(false)} style={styles.cancelBtn}>
              <Text style={{ color: '#374151', fontWeight: '500' }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setOpen(false)} style={styles.saveBtn}>
              <Text style={{ color: '#fff', fontWeight: '500' }}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        }>
        <View style={{ gap: 16 }}>
          <View>
            <Text style={styles.label}>Display Name</Text>
            <TextInput defaultValue="Alice Kim" style={styles.input} />
          </View>
          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput defaultValue="alice@breathe.io" style={styles.input} />
          </View>
        </View>
      </BottomSheetModal>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: { position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)' },
  sheet:    { marginTop: 'auto', backgroundColor: '#fff', borderTopLeftRadius: 20,
              borderTopRightRadius: 20, paddingBottom: 32 },
  header:   { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
              paddingHorizontal: 24, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  title:    { fontSize: 16, fontWeight: '600', color: '#0F172A' },
  closeBtn: { padding: 6, borderRadius: 8, backgroundColor: '#F1F5F9' },
  body:     { paddingHorizontal: 24, paddingVertical: 20 },
  footer:   { paddingHorizontal: 24, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#E2E8F0' },
  label:    { fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 6 },
  input:    { borderWidth: 1.5, borderColor: '#E2E8F0', borderRadius: 12, padding: 12,
              fontSize: 14, color: '#0F172A' },
  openBtn:  { backgroundColor: '#0D9488', paddingHorizontal: 16, paddingVertical: 10,
              borderRadius: 12, alignSelf: 'flex-start' },
  cancelBtn:{ backgroundColor: '#F1F5F9', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10 },
  saveBtn:  { backgroundColor: '#0D9488', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10 },
});`}
        androidCode={`// Using MaterialAlertDialogBuilder for a standard dialog:
MaterialAlertDialogBuilder(context)
    .setTitle("Edit Profile")
    .setView(R.layout.dialog_edit_profile) // inflate your custom view
    .setPositiveButton("Save Changes") { _, _ ->
        // handle save
    }
    .setNegativeButton("Cancel") { dialog, _ ->
        dialog.dismiss()
    }
    .show()

// Or using a BottomSheetDialogFragment for a full-screen feel:
class EditProfileSheet : BottomSheetDialogFragment() {
    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.sheet_edit_profile, container, false)
    }
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val btnSave = view.findViewById<MaterialButton>(R.id.btnSave)
        btnSave.setOnClickListener { dismiss() }
    }
}

// Show it:
EditProfileSheet().show(supportFragmentManager, "EditProfile")`}
        iosCode={`import SwiftUI

struct EditProfileSheet: View {
    @State private var showSheet = false
    @State private var name = "Alice Kim"
    @State private var email = "alice@breathe.io"

    var body: some View {
        Button("Open Modal") { showSheet = true }
            .buttonStyle(.borderedProminent).tint(.teal)
            .sheet(isPresented: $showSheet) {
                NavigationView {
                    Form {
                        Section("Profile") {
                            HStack {
                                Text("Name").foregroundColor(.secondary)
                                Spacer()
                                TextField("Display Name", text: $name)
                                    .multilineTextAlignment(.trailing)
                            }
                            HStack {
                                Text("Email").foregroundColor(.secondary)
                                Spacer()
                                TextField("Email", text: $email)
                                    .multilineTextAlignment(.trailing)
                                    .keyboardType(.emailAddress)
                                    .autocapitalization(.none)
                            }
                        }
                    }
                    .navigationTitle("Edit Profile")
                    .navigationBarTitleDisplayMode(.inline)
                    .toolbar {
                        ToolbarItem(placement: .cancellationAction) {
                            Button("Cancel") { showSheet = false }
                        }
                        ToolbarItem(placement: .confirmationAction) {
                            Button("Save") { showSheet = false }
                                .fontWeight(.semibold)
                        }
                    }
                }
            }
    }
}`}
        className="mb-5"
      >
        <BasicModalDemo />
      </ComponentPreview>

      <ComponentPreview
        title="Confirmation Modal"
        description="Confirm destructive or irreversible actions."
        code={`<Modal
  isOpen={open}
  onClose={() => setOpen(false)}
  size="sm"
  footer={
    <>
      <Button variant="secondary">Cancel</Button>
      <Button variant="danger">Delete</Button>
    </>
  }
>
  <Icon />
  <h3>Delete "Breathe Design"?</h3>
  <p>This action cannot be undone.</p>
</Modal>`}
        reactNativeCode={`import { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { Trash2 } from 'lucide-react-native';

function ConfirmModal({ visible, onCancel, onConfirm, title, message }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.45)',
                     alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <View style={{ backgroundColor: '#fff', borderRadius: 20, padding: 24,
                       width: '100%', maxWidth: 340, alignItems: 'center' }}>
          <View style={{ width: 52, height: 52, borderRadius: 26,
                         backgroundColor: '#FFF1F2', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <Trash2 size={22} color="#E11D48" />
          </View>
          <Text style={{ fontSize: 17, fontWeight: '600', color: '#0F172A', marginBottom: 8 }}>{title}</Text>
          <Text style={{ fontSize: 14, color: '#64748B', textAlign: 'center', lineHeight: 22, marginBottom: 24 }}>{message}</Text>
          <View style={{ flexDirection: 'row', gap: 8, width: '100%' }}>
            <TouchableOpacity onPress={onCancel}
              style={{ flex: 1, paddingVertical: 10, borderRadius: 10, backgroundColor: '#F1F5F9', alignItems: 'center' }}>
              <Text style={{ fontWeight: '500', color: '#374151' }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm}
              style={{ flex: 1, paddingVertical: 10, borderRadius: 10, backgroundColor: '#E11D48', alignItems: 'center' }}>
              <Text style={{ fontWeight: '500', color: '#fff' }}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}`}
        androidCode={`// Confirmation dialog using MaterialAlertDialogBuilder
MaterialAlertDialogBuilder(context)
    .setIcon(R.drawable.ic_delete)
    .setTitle("Delete \\"Breathe Design\\"?")
    .setMessage("This action cannot be undone. All data will be permanently removed.")
    .setPositiveButton("Delete") { _, _ ->
        // perform delete
        viewModel.deleteProject()
    }
    .setNegativeButton("Cancel") { dialog, _ ->
        dialog.dismiss()
    }
    .show()

// Or set custom styles:
val dialog = MaterialAlertDialogBuilder(context, R.style.ConfirmDestructiveDialog)
    .setTitle("Delete Project?")
    .setMessage("This action cannot be undone.")
    .setPositiveButton("Delete") { _, _ -> /* delete */ }
    .setNegativeButton("Cancel", null)
    .create()
dialog.setOnShowListener {
    dialog.getButton(AlertDialog.BUTTON_POSITIVE)
          .setTextColor(ContextCompat.getColor(context, R.color.red_600))
}
dialog.show()`}
        iosCode={`import SwiftUI

struct DeleteConfirmView: View {
    @State private var showAlert = false

    var body: some View {
        Button("Delete Project") { showAlert = true }
            .buttonStyle(.borderedProminent)
            .tint(.red)
            .alert("Delete \\"Breathe Design\\"?", isPresented: $showAlert) {
                Button("Cancel", role: .cancel) { }
                Button("Delete", role: .destructive) {
                    // perform delete
                }
            } message: {
                Text("This action cannot be undone. All data will be permanently removed.")
            }
    }
}

// Or use a custom sheet for richer UI:
struct DeleteConfirmSheet: View {
    @State private var showSheet = false

    var body: some View {
        Button("Delete Project") { showSheet = true }
            .buttonStyle(.borderedProminent).tint(.red)
            .confirmationDialog("Delete \\"Breathe Design\\"?",
                                isPresented: $showSheet,
                                titleVisibility: .visible) {
                Button("Delete", role: .destructive) { }
                Button("Cancel", role: .cancel) { }
            } message: {
                Text("This action cannot be undone.")
            }
    }
}`}
        className="mb-8"
      >
        <ConfirmModalDemo />
      </ComponentPreview>

      <div className="mb-8">
        <h2 className="text-slate-900 dark:text-white mb-4 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>Import</h2>
        <CodeBlock code={`import { Modal } from '@breathe-ui/core';`} language="tsx" />
      </div>

      <PropsTable props={modalProps} />

      <PageNavigation />
    </div>
  );
}