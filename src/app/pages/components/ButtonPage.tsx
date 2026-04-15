import { Loader2, ArrowRight, Download, Trash2, Heart, Plus } from 'lucide-react';
import { PageHeader } from '../../components/shared/PageHeader';
import { ComponentPreview } from '../../components/shared/ComponentPreview';
import { PropsTable } from '../../components/shared/PropsTable';
import { CodeBlock } from '../../components/shared/CodeBlock';
import { PageNavigation } from '../../components/shared/PageNavigation';

type BtnVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link';
type BtnSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const variantStyles: Record<BtnVariant, string> = {
  primary: 'text-white border-transparent hover:opacity-90 hover:shadow-lg active:opacity-80',
  secondary: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700',
  outline: 'bg-transparent text-teal-700 dark:text-teal-400 border-teal-400 dark:border-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30',
  ghost: 'bg-transparent text-slate-600 dark:text-slate-400 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800',
  danger: 'text-white border-transparent hover:opacity-90 active:opacity-80',
  link: 'bg-transparent text-teal-600 dark:text-teal-400 border-transparent underline-offset-4 hover:underline p-0',
};

const sizeStyles: Record<BtnSize, string> = {
  xs: 'px-2.5 py-1 text-xs rounded-lg gap-1',
  sm: 'px-3.5 py-1.5 text-sm rounded-lg gap-1.5',
  md: 'px-4 py-2 text-sm rounded-xl gap-2',
  lg: 'px-5 py-2.5 text-base rounded-xl gap-2',
  xl: 'px-6 py-3 text-base rounded-2xl gap-2.5',
};

interface BtnProps {
  variant?: BtnVariant;
  size?: BtnSize;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
}

function Btn({ variant = 'primary', size = 'md', disabled, loading, leftIcon, rightIcon, children, onClick, fullWidth }: BtnProps) {
  const isPrimary = variant === 'primary';
  const isDanger = variant === 'danger';
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center border font-medium transition-all duration-150 cursor-pointer select-none shrink-0 disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''}`}
      style={{
        fontFamily: 'var(--font-sans)',
        background: isPrimary ? 'linear-gradient(135deg, #0D9488, #0F766E)' : isDanger ? 'linear-gradient(135deg, #E11D48, #BE123C)' : undefined,
        boxShadow: isPrimary ? '0 1px 2px rgba(13,148,136,0.25)' : isDanger ? '0 1px 2px rgba(225,29,72,0.25)' : undefined,
      }}
    >
      {loading && <Loader2 size={size === 'xs' ? 12 : size === 'sm' ? 14 : 16} className="animate-spin" />}
      {!loading && leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}

const buttonProps = [
  { name: 'variant', type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link'", default: "'primary'", description: 'Visual style of the button.' },
  { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Size of the button.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the button and prevents interaction.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Shows a spinner and disables the button.' },
  { name: 'leftIcon', type: 'ReactNode', description: 'Icon displayed before the label.' },
  { name: 'rightIcon', type: 'ReactNode', description: 'Icon displayed after the label.' },
  { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Makes the button span full width of container.' },
  { name: 'onClick', type: '() => void', description: 'Click handler function.' },
];

export function ButtonPage() {
  return (
    <div className="max-w-3xl px-6 lg:px-10 py-10">
      <PageHeader
        title="Button"
        description="Buttons trigger actions or navigate users to new destinations. Choose the right variant to communicate the importance and nature of each action."
        section="Components"
        badge="Stable"
      />

      {/* Variants */}
      <ComponentPreview
        title="Variants"
        description="Six variants for different levels of emphasis."
        code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
<Button variant="link">Link</Button>`}
        reactNativeCode={`import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

function Button({ variant = 'primary', onPress, children }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.base, styles[variant]]}>
      <Text style={[styles.text, styles[\`\${variant}Text\`]]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, alignItems: 'center' },
  primary: { backgroundColor: '#0D9488' },
  secondary: { backgroundColor: '#F1F5F9' },
  outline: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: '#0D9488' },
  ghost: { backgroundColor: 'transparent' },
  danger: { backgroundColor: '#E11D48' },
  text: { fontSize: 14, fontWeight: '600' },
  primaryText: { color: '#ffffff' },
  secondaryText: { color: '#334155' },
  outlineText: { color: '#0D9488' },
  ghostText: { color: '#475569' },
  dangerText: { color: '#ffffff' },
});

// Usage
<View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="danger">Danger</Button>
</View>`}
        androidCode={`<!-- res/layout/fragment_buttons.xml -->
<LinearLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="horizontal"
    android:gap="8dp"
    android:padding="16dp">

    <com.google.android.material.button.MaterialButton
        android:id="@+id/btnPrimary"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Primary"
        app:backgroundTint="@color/teal_700"
        app:cornerRadius="12dp" />

    <com.google.android.material.button.MaterialButton
        style="@style/Widget.MaterialComponents.Button.OutlinedButton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Outline"
        app:strokeColor="@color/teal_700"
        app:cornerRadius="12dp" />

    <com.google.android.material.button.MaterialButton
        android:id="@+id/btnDanger"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Danger"
        app:backgroundTint="@color/red_600"
        app:cornerRadius="12dp" />
</LinearLayout>

// FragmentButtons.kt
val btnPrimary = view.findViewById<MaterialButton>(R.id.btnPrimary)
btnPrimary.setOnClickListener { /* handle click */ }

val btnDanger = view.findViewById<MaterialButton>(R.id.btnDanger)
btnDanger.setOnClickListener { /* handle click */ }`}
        iosCode={`import SwiftUI

struct ButtonVariantsView: View {
    var body: some View {
        HStack(spacing: 12) {
            Button("Primary") { }
                .buttonStyle(.borderedProminent)
                .tint(.teal)

            Button("Secondary") { }
                .buttonStyle(.bordered)
                .tint(.secondary)

            Button("Outline") { }
                .buttonStyle(.bordered)
                .tint(.teal)

            Button("Danger") { }
                .buttonStyle(.borderedProminent)
                .tint(.red)
        }
        .padding()
    }
}

struct ButtonVariantsView_Previews: PreviewProvider {
    static var previews: some View {
        ButtonVariantsView()
    }
}`}
        className="mb-5"
      >
        <Btn variant="primary">Primary</Btn>
        <Btn variant="secondary">Secondary</Btn>
        <Btn variant="outline">Outline</Btn>
        <Btn variant="ghost">Ghost</Btn>
        <Btn variant="danger">Danger</Btn>
        <Btn variant="link">Link</Btn>
      </ComponentPreview>

      {/* Sizes */}
      <ComponentPreview
        title="Sizes"
        description="Five sizes from XS to XL."
        code={`<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>`}
        reactNativeCode={`import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const sizeStyles = {
  xs: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  sm: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 10 },
  md: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12 },
  lg: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12 },
  xl: { paddingHorizontal: 24, paddingVertical: 14, borderRadius: 16 },
};
const fontSizes = { xs: 11, sm: 13, md: 14, lg: 16, xl: 16 };

function Button({ size = 'md', children, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{ backgroundColor: '#0D9488', alignItems: 'center' }, sizeStyles[size]]}
    >
      <Text style={{ color: '#fff', fontWeight: '600', fontSize: fontSizes[size] }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

<View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 8, flexWrap: 'wrap' }}>
  <Button size="xs">XS</Button>
  <Button size="sm">Small</Button>
  <Button size="md">Medium</Button>
  <Button size="lg">Large</Button>
  <Button size="xl">XL</Button>
</View>`}
        androidCode={`<!-- Sizes via padding and textSize -->
<LinearLayout
    android:orientation="horizontal"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:gravity="center_vertical"
    android:gap="8dp">

    <com.google.android.material.button.MaterialButton
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="XS"
        android:textSize="11sp"
        android:paddingStart="10dp"
        android:paddingEnd="10dp"
        android:paddingTop="4dp"
        android:paddingBottom="4dp"
        app:backgroundTint="@color/teal_700"
        app:cornerRadius="8dp" />

    <com.google.android.material.button.MaterialButton
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Medium"
        android:textSize="14sp"
        app:backgroundTint="@color/teal_700"
        app:cornerRadius="12dp" />

    <com.google.android.material.button.MaterialButton
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Large"
        android:textSize="16sp"
        android:paddingStart="20dp"
        android:paddingEnd="20dp"
        app:backgroundTint="@color/teal_700"
        app:cornerRadius="12dp" />
</LinearLayout>`}
        iosCode={`import SwiftUI

struct ButtonSizesView: View {
    var body: some View {
        HStack(spacing: 12) {
            Button("XS") { }
                .buttonStyle(.borderedProminent)
                .controlSize(.mini)
                .tint(.teal)

            Button("Small") { }
                .buttonStyle(.borderedProminent)
                .controlSize(.small)
                .tint(.teal)

            Button("Medium") { }
                .buttonStyle(.borderedProminent)
                .controlSize(.regular)
                .tint(.teal)

            Button("Large") { }
                .buttonStyle(.borderedProminent)
                .controlSize(.large)
                .tint(.teal)
        }
        .padding()
    }
}`}
        className="mb-5"
        previewClassName="items-end"
      >
        <Btn size="xs">Extra Small</Btn>
        <Btn size="sm">Small</Btn>
        <Btn size="md">Medium</Btn>
        <Btn size="lg">Large</Btn>
        <Btn size="xl">Extra Large</Btn>
      </ComponentPreview>

      {/* Icons */}
      <ComponentPreview
        title="With Icons"
        description="Left and right icons for additional context."
        code={`<Button leftIcon={<Plus size={16} />}>New Project</Button>
<Button rightIcon={<ArrowRight size={16} />}>Continue</Button>
<Button variant="outline" leftIcon={<Download size={16} />}>Export</Button>
<Button variant="danger" leftIcon={<Trash2 size={16} />}>Delete</Button>`}
        reactNativeCode={`import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Plus, ArrowRight, Download, Trash2 } from 'lucide-react-native';

function IconButton({ leftIcon, rightIcon, variant = 'primary', children, onPress }) {
  const bg = variant === 'danger' ? '#E11D48' : '#0D9488';
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ backgroundColor: bg, flexDirection: 'row', alignItems: 'center',
               gap: 8, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12 }}
    >
      {leftIcon}
      <Text style={{ color: '#fff', fontWeight: '600', fontSize: 14 }}>{children}</Text>
      {rightIcon}
    </TouchableOpacity>
  );
}

<View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <IconButton leftIcon={<Plus size={16} color="#fff" />}>New Project</IconButton>
  <IconButton rightIcon={<ArrowRight size={16} color="#fff" />}>Continue</IconButton>
  <IconButton variant="danger" leftIcon={<Trash2 size={16} color="#fff" />}>Delete</IconButton>
</View>`}
        androidCode={`<!-- Button with icon using MaterialButton -->
<com.google.android.material.button.MaterialButton
    android:id="@+id/btnNew"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="New Project"
    app:icon="@drawable/ic_add"
    app:iconGravity="textStart"
    app:backgroundTint="@color/teal_700"
    app:cornerRadius="12dp" />

<com.google.android.material.button.MaterialButton
    android:id="@+id/btnDelete"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Delete"
    app:icon="@drawable/ic_delete"
    app:iconGravity="textStart"
    app:backgroundTint="@color/red_600"
    app:cornerRadius="12dp" />

<com.google.android.material.button.MaterialButton
    android:id="@+id/btnExport"
    style="@style/Widget.MaterialComponents.Button.OutlinedButton"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Export"
    app:icon="@drawable/ic_download"
    app:strokeColor="@color/teal_700"
    app:cornerRadius="12dp" />`}
        iosCode={`import SwiftUI

struct IconButtonsView: View {
    var body: some View {
        VStack(spacing: 12) {
            Button { } label: {
                Label("New Project", systemImage: "plus")
            }
            .buttonStyle(.borderedProminent)
            .tint(.teal)

            Button { } label: {
                Label("Continue", systemImage: "arrow.right")
            }
            .buttonStyle(.borderedProminent)
            .tint(.teal)

            Button { } label: {
                Label("Export", systemImage: "square.and.arrow.down")
            }
            .buttonStyle(.bordered)
            .tint(.teal)

            Button { } label: {
                Label("Delete", systemImage: "trash")
            }
            .buttonStyle(.borderedProminent)
            .tint(.red)
        }
        .padding()
    }
}`}
        className="mb-5"
      >
        <Btn leftIcon={<Plus size={16} />}>New Project</Btn>
        <Btn rightIcon={<ArrowRight size={16} />}>Continue</Btn>
        <Btn variant="outline" leftIcon={<Download size={16} />}>Export</Btn>
        <Btn variant="danger" leftIcon={<Trash2 size={16} />}>Delete</Btn>
      </ComponentPreview>

      {/* States */}
      <ComponentPreview
        title="States"
        description="Loading and disabled states."
        code={`<Button loading>Saving...</Button>
<Button disabled>Disabled</Button>
<Button variant="outline" loading>Loading</Button>`}
        reactNativeCode={`import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';

function Button({ loading, disabled, children, onPress }) {
  const isDisabled = loading || disabled;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={{
        backgroundColor: '#0D9488',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        opacity: isDisabled ? 0.5 : 1,
      }}
    >
      {loading && <ActivityIndicator size="small" color="#ffffff" />}
      <Text style={{ color: '#fff', fontWeight: '600', fontSize: 14 }}>{children}</Text>
    </TouchableOpacity>
  );
}

<View style={{ flexDirection: 'row', gap: 8 }}>
  <Button loading>Saving...</Button>
  <Button disabled>Disabled</Button>
</View>`}
        androidCode={`// Show loading state with CircularProgressIndicator
<com.google.android.material.button.MaterialButton
    android:id="@+id/btnSave"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Saving..."
    android:enabled="false"
    app:backgroundTint="@color/teal_700"
    app:cornerRadius="12dp" />

// In Kotlin — toggle loading:
fun setLoading(isLoading: Boolean) {
    btnSave.isEnabled = !isLoading
    if (isLoading) {
        btnSave.text = ""
        btnSave.icon = CircularProgressDrawable(context).apply {
            setStyle(CircularProgressDrawable.DEFAULT)
            start()
        }
    } else {
        btnSave.text = "Save"
        btnSave.icon = null
    }
}`}
        iosCode={`import SwiftUI

struct ButtonStatesView: View {
    @State private var isLoading = false

    var body: some View {
        VStack(spacing: 12) {
            Button {
                isLoading = true
            } label: {
                if isLoading {
                    HStack(spacing: 8) {
                        ProgressView().tint(.white)
                        Text("Saving...")
                    }
                } else {
                    Text("Save")
                }
            }
            .buttonStyle(.borderedProminent)
            .tint(.teal)
            .disabled(isLoading)

            Button("Disabled") { }
                .buttonStyle(.borderedProminent)
                .tint(.teal)
                .disabled(true)
        }
        .padding()
    }
}`}
        className="mb-5"
      >
        <Btn loading>Saving...</Btn>
        <Btn disabled>Disabled</Btn>
        <Btn variant="outline" loading>Loading</Btn>
        <Btn variant="secondary" disabled>Disabled</Btn>
      </ComponentPreview>

      {/* Icon only */}
      <ComponentPreview
        title="Icon Only"
        description="Square icon buttons for toolbars and compact UI."
        code={`<Button size="sm"><Heart size={16} /></Button>
<Button variant="outline" size="sm"><Plus size={16} /></Button>`}
        reactNativeCode={`import { TouchableOpacity } from 'react-native';
import { Heart, Plus, Trash2 } from 'lucide-react-native';

function IconBtn({ variant = 'primary', children, onPress }) {
  const bg = variant === 'outline'
    ? 'transparent'
    : variant === 'danger' ? '#E11D48' : '#0D9488';
  const borderColor = variant === 'outline' ? '#0D9488' : 'transparent';
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: bg,
        borderWidth: 1.5,
        borderColor,
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </TouchableOpacity>
  );
}

<View style={{ flexDirection: 'row', gap: 8 }}>
  <IconBtn><Heart size={16} color="#fff" /></IconBtn>
  <IconBtn variant="outline"><Plus size={16} color="#0D9488" /></IconBtn>
  <IconBtn variant="danger"><Trash2 size={16} color="#fff" /></IconBtn>
</View>`}
        androidCode={`<!-- Icon-only buttons using MaterialButton -->
<LinearLayout
    android:orientation="horizontal"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:gap="8dp">

    <com.google.android.material.button.MaterialButton
        style="@style/Widget.MaterialComponents.Button.Icon"
        android:layout_width="40dp"
        android:layout_height="40dp"
        app:icon="@drawable/ic_favorite"
        app:iconGravity="textStart"
        app:iconPadding="0dp"
        app:backgroundTint="@color/teal_700"
        app:cornerRadius="10dp" />

    <com.google.android.material.button.MaterialButton
        style="@style/Widget.MaterialComponents.Button.OutlinedButton.Icon"
        android:layout_width="40dp"
        android:layout_height="40dp"
        app:icon="@drawable/ic_add"
        app:iconGravity="textStart"
        app:iconPadding="0dp"
        app:strokeColor="@color/teal_700"
        app:cornerRadius="10dp" />
</LinearLayout>`}
        iosCode={`import SwiftUI

struct IconButtonsView: View {
    var body: some View {
        HStack(spacing: 12) {
            Button { } label: {
                Image(systemName: "heart.fill")
            }
            .buttonStyle(.borderedProminent)
            .tint(.teal)

            Button { } label: {
                Image(systemName: "plus")
            }
            .buttonStyle(.bordered)
            .tint(.teal)

            Button { } label: {
                Image(systemName: "trash.fill")
            }
            .buttonStyle(.borderedProminent)
            .tint(.red)
        }
        .padding()
    }
}`}
        className="mb-8"
      >
        <Btn size="sm"><Heart size={16} /></Btn>
        <Btn variant="secondary" size="sm"><Plus size={16} /></Btn>
        <Btn variant="outline" size="sm"><Trash2 size={16} /></Btn>
        <Btn variant="ghost" size="sm"><Heart size={16} /></Btn>
        <Btn variant="danger" size="sm"><Trash2 size={16} /></Btn>
      </ComponentPreview>

      {/* Installation */}
      <div className="mb-8">
        <h2 className="text-slate-900 dark:text-white mb-4 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
          Import
        </h2>
        <CodeBlock code={`import { Button } from '@breathe-ui/core';`} language="tsx" />
      </div>

      <PropsTable props={buttonProps} />

      <PageNavigation />
    </div>
  );
}
