import { useState } from 'react';
import { Search, Mail, Eye, EyeOff, AlertCircle, CheckCircle2, User, Lock, DollarSign } from 'lucide-react';
import { PageHeader } from '../../components/shared/PageHeader';
import { ComponentPreview } from '../../components/shared/ComponentPreview';
import { PropsTable } from '../../components/shared/PropsTable';
import { CodeBlock } from '../../components/shared/CodeBlock';
import { PageNavigation } from '../../components/shared/PageNavigation';

type InputState = 'default' | 'success' | 'error';

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  state?: InputState;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
  disabled?: boolean;
  value?: string;
  onChange?: (v: string) => void;
  required?: boolean;
}

const stateStyles: Record<InputState, { border: string; ring: string }> = {
  default: { border: 'border-slate-200 dark:border-slate-700 focus-within:border-teal-400 dark:focus-within:border-teal-600', ring: '' },
  success: { border: 'border-emerald-400 dark:border-emerald-600', ring: '' },
  error: { border: 'border-rose-400 dark:border-rose-600', ring: '' },
};

function Input({ label, placeholder, type = 'text', state = 'default', hint, leftIcon, rightElement, disabled, value, onChange, required }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-slate-700 dark:text-slate-300 mb-1.5" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 500 }}>
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border bg-white dark:bg-slate-900 transition-colors ${stateStyles[state].border} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        {leftIcon && <span className="text-slate-400 shrink-0">{leftIcon}</span>}
        <input
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={e => onChange?.(e.target.value)}
          className="flex-1 bg-transparent outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 min-w-0"
          style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}
        />
        {rightElement && <span className="text-slate-400 shrink-0">{rightElement}</span>}
        {state === 'success' && <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />}
        {state === 'error' && <AlertCircle size={16} className="text-rose-500 shrink-0" />}
      </div>
      {hint && (
        <p className={`mt-1.5 ${state === 'error' ? 'text-rose-500' : state === 'success' ? 'text-emerald-600' : 'text-slate-400 dark:text-slate-500'}`}
           style={{ fontFamily: 'var(--font-sans)', fontSize: '0.775rem' }}>
          {hint}
        </p>
      )}
    </div>
  );
}

function PasswordInput() {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState('');
  return (
    <Input
      label="Password"
      type={show ? 'text' : 'password'}
      placeholder="Enter password"
      leftIcon={<Lock size={16} />}
      value={value}
      onChange={setValue}
      rightElement={
        <button onClick={() => setShow(s => !s)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      }
    />
  );
}

const inputProps = [
  { name: 'label', type: 'string', description: 'Label text displayed above the input.' },
  { name: 'placeholder', type: 'string', description: 'Placeholder text for empty state.' },
  { name: 'type', type: 'string', default: "'text'", description: 'HTML input type (text, email, password, number, etc.).' },
  { name: 'state', type: "'default' | 'success' | 'error'", default: "'default'", description: 'Validation state of the input.' },
  { name: 'hint', type: 'string', description: 'Helper text or error message shown below the input.' },
  { name: 'leftIcon', type: 'ReactNode', description: 'Icon displayed on the left side of the input.' },
  { name: 'rightElement', type: 'ReactNode', description: 'Element on the right (icon, button, suffix).' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input field.' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Marks the field as required with visual indicator.' },
  { name: 'value', type: 'string', description: 'Controlled value of the input.' },
  { name: 'onChange', type: '(value: string) => void', description: 'Callback fired when the value changes.' },
];

export function InputPage() {
  return (
    <div className="max-w-3xl px-6 lg:px-10 py-10">
      <PageHeader
        title="Input"
        description="Input fields allow users to enter text. They're used in forms, search bars, and anywhere a user needs to provide data."
        section="Components"
        badge="Stable"
      />

      <ComponentPreview
        title="Default"
        description="The base input with optional label and placeholder."
        code={`<Input label="Full Name" placeholder="Jane Doe" leftIcon={<User size={16} />} />`}
        reactNativeCode={`import { View, Text, TextInput, StyleSheet } from 'react-native';
import { User } from 'lucide-react-native';

function Input({ label, placeholder, leftIcon, onChangeText, value }) {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputWrapper}>
        {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#94a3b8"
          onChangeText={onChangeText}
          value={value}
          style={styles.input}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 6 },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    backgroundColor: '#fff',
  },
  icon: { color: '#94a3b8' },
  input: { flex: 1, fontSize: 14, color: '#0f172a' },
});

// Usage
<Input label="Full Name" placeholder="Jane Doe" leftIcon={<User size={16} color="#94a3b8" />} />`}
        androidCode={`<!-- res/layout/fragment_input.xml -->
<com.google.android.material.textfield.TextInputLayout
    android:id="@+id/nameLayout"
    style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:hint="Full Name"
    app:startIconDrawable="@drawable/ic_person"
    app:startIconTint="@color/slate_400"
    app:boxCornerRadiusTopStart="12dp"
    app:boxCornerRadiusTopEnd="12dp"
    app:boxCornerRadiusBottomStart="12dp"
    app:boxCornerRadiusBottomEnd="12dp"
    app:boxStrokeColor="@color/slate_200">

    <com.google.android.material.textfield.TextInputEditText
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:inputType="textPersonName" />

</com.google.android.material.textfield.TextInputLayout>

// MainActivity.kt
val nameInput = view.findViewById<TextInputEditText>(R.id.nameEdit)
nameInput.addTextChangedListener { text ->
    // handle text changes
}`}
        iosCode={`import SwiftUI

struct InputView: View {
    @State private var name: String = ""

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text("Full Name")
                .font(.subheadline)
                .fontWeight(.medium)
                .foregroundColor(.secondary)

            HStack {
                Image(systemName: "person")
                    .foregroundColor(.secondary)
                TextField("Jane Doe", text: $name)
                    .textFieldStyle(.plain)
            }
            .padding(12)
            .background(Color(.systemBackground))
            .overlay(
                RoundedRectangle(cornerRadius: 12)
                    .stroke(Color(.systemGray4), lineWidth: 1.5)
            )
        }
        .padding()
    }
}`}
        className="mb-5"
        previewClassName="flex-col items-stretch max-w-sm mx-auto w-full"
      >
        <div className="w-full max-w-sm">
          <Input label="Full Name" placeholder="Jane Doe" leftIcon={<User size={16} />} />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Types"
        description="Email, search, and password inputs."
        code={`<Input type="email" label="Email" placeholder="you@example.com" leftIcon={<Mail />} />
<Input type="search" placeholder="Search..." leftIcon={<Search />} />`}
        reactNativeCode={`import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Mail, Search, Eye, EyeOff, Lock } from 'lucide-react-native';
import { useState } from 'react';

function PasswordInput() {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState('');
  return (
    <View style={styles.wrapper}>
      <Lock size={16} color="#94a3b8" />
      <TextInput
        secureTextEntry={!show}
        placeholder="Enter password"
        placeholderTextColor="#94a3b8"
        value={value}
        onChangeText={setValue}
        style={styles.input}
      />
      <TouchableOpacity onPress={() => setShow(s => !s)}>
        {show ? <EyeOff size={16} color="#94a3b8" /> : <Eye size={16} color="#94a3b8" />}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingHorizontal: 12, paddingVertical: 10,
    borderRadius: 12, borderWidth: 1.5, borderColor: '#e2e8f0', backgroundColor: '#fff',
  },
  input: { flex: 1, fontSize: 14, color: '#0f172a' },
});`}
        androidCode={`<!-- Email input -->
<com.google.android.material.textfield.TextInputLayout
    style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:hint="Email"
    app:startIconDrawable="@drawable/ic_email"
    app:boxCornerRadiusTopStart="12dp"
    app:boxCornerRadiusTopEnd="12dp"
    app:boxCornerRadiusBottomStart="12dp"
    app:boxCornerRadiusBottomEnd="12dp">
    <com.google.android.material.textfield.TextInputEditText
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:inputType="textEmailAddress" />
</com.google.android.material.textfield.TextInputLayout>

<!-- Password input with toggle -->
<com.google.android.material.textfield.TextInputLayout
    style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:hint="Password"
    app:startIconDrawable="@drawable/ic_lock"
    app:endIconMode="password_toggle"
    app:boxCornerRadiusTopStart="12dp"
    app:boxCornerRadiusTopEnd="12dp"
    app:boxCornerRadiusBottomStart="12dp"
    app:boxCornerRadiusBottomEnd="12dp">
    <com.google.android.material.textfield.TextInputEditText
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:inputType="textPassword" />
</com.google.android.material.textfield.TextInputLayout>`}
        iosCode={`import SwiftUI

struct InputTypesView: View {
    @State private var email = ""
    @State private var search = ""
    @State private var password = ""

    var body: some View {
        VStack(spacing: 16) {
            // Email
            HStack {
                Image(systemName: "envelope").foregroundColor(.secondary)
                TextField("you@example.com", text: $email)
                    .keyboardType(.emailAddress)
                    .textContentType(.emailAddress)
                    .autocapitalization(.none)
            }
            .padding(12)
            .overlay(RoundedRectangle(cornerRadius: 12).stroke(Color(.systemGray4), lineWidth: 1.5))

            // Search
            HStack {
                Image(systemName: "magnifyingglass").foregroundColor(.secondary)
                TextField("Search...", text: $search)
            }
            .padding(12)
            .overlay(RoundedRectangle(cornerRadius: 12).stroke(Color(.systemGray4), lineWidth: 1.5))

            // Password
            HStack {
                Image(systemName: "lock").foregroundColor(.secondary)
                SecureField("Enter password", text: $password)
            }
            .padding(12)
            .overlay(RoundedRectangle(cornerRadius: 12).stroke(Color(.systemGray4), lineWidth: 1.5))
        }
        .padding()
    }
}`}
        className="mb-5"
        previewClassName="flex-col items-stretch gap-4 max-w-sm mx-auto w-full"
      >
        <div className="w-full max-w-sm space-y-4">
          <Input type="email" label="Email" placeholder="you@example.com" leftIcon={<Mail size={16} />} />
          <Input type="text" placeholder="Search..." leftIcon={<Search size={16} />} />
          <PasswordInput />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Validation States"
        description="Success, error, and default states with helper text."
        code={`<Input label="Username" state="success" hint="Username is available!" value="breathe_user" />
<Input label="Email" state="error" hint="Please enter a valid email address." value="not-an-email" />`}
        reactNativeCode={`import { View, Text, TextInput, StyleSheet } from 'react-native';
import { CheckCircle2, AlertCircle } from 'lucide-react-native';

function ValidatedInput({ label, value, state = 'default', hint }) {
  const borderColor = state === 'success' ? '#34d399' : state === 'error' ? '#f87171' : '#e2e8f0';
  const hintColor = state === 'success' ? '#059669' : state === 'error' ? '#ef4444' : '#94a3b8';
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.wrapper, { borderColor }]}>
        <TextInput value={value} style={styles.input} editable={false} />
        {state === 'success' && <CheckCircle2 size={16} color="#34d399" />}
        {state === 'error' && <AlertCircle size={16} color="#f87171" />}
      </View>
      {hint && <Text style={[styles.hint, { color: hintColor }]}>{hint}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 6 },
  wrapper: { flexDirection: 'row', alignItems: 'center', gap: 8,
             paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12, borderWidth: 1.5, backgroundColor: '#fff' },
  input: { flex: 1, fontSize: 14, color: '#0f172a' },
  hint: { marginTop: 4, fontSize: 12 },
});`}
        androidCode={`<!-- Success state -->
<com.google.android.material.textfield.TextInputLayout
    style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:hint="Username"
    app:helperText="Username is available!"
    app:helperTextTextColor="@color/green_600"
    app:endIconMode="custom"
    app:endIconDrawable="@drawable/ic_check_circle"
    app:endIconTint="@color/green_600"
    app:boxStrokeColor="@color/green_600">
    <com.google.android.material.textfield.TextInputEditText
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="breathe_user" />
</com.google.android.material.textfield.TextInputLayout>

<!-- Error state (built-in) -->
// In Kotlin:
nameLayout.error = "Please enter a valid email address."
// To clear: nameLayout.error = null`}
        iosCode={`import SwiftUI

struct ValidationStatesView: View {
    var body: some View {
        VStack(spacing: 16) {
            // Success
            VStack(alignment: .leading, spacing: 4) {
                Text("Username").font(.subheadline).fontWeight(.medium)
                HStack {
                    TextField("", text: .constant("breathe_user"))
                    Image(systemName: "checkmark.circle.fill").foregroundColor(.green)
                }
                .padding(12)
                .overlay(RoundedRectangle(cornerRadius: 12).stroke(Color.green, lineWidth: 1.5))
                Text("Username is available!")
                    .font(.caption).foregroundColor(.green)
            }

            // Error
            VStack(alignment: .leading, spacing: 4) {
                Text("Email").font(.subheadline).fontWeight(.medium)
                HStack {
                    TextField("", text: .constant("not-an-email"))
                    Image(systemName: "exclamationmark.circle.fill").foregroundColor(.red)
                }
                .padding(12)
                .overlay(RoundedRectangle(cornerRadius: 12).stroke(Color.red, lineWidth: 1.5))
                Text("Please enter a valid email address.")
                    .font(.caption).foregroundColor(.red)
            }
        }
        .padding()
    }
}`}
        className="mb-5"
        previewClassName="flex-col items-stretch gap-4 max-w-sm mx-auto w-full"
      >
        <div className="w-full max-w-sm space-y-4">
          <Input label="Username" state="success" hint="Username is available!" value="breathe_user" />
          <Input label="Email" state="error" hint="Please enter a valid email address." value="not-an-email" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Prefix/Suffix"
        description="Inputs with left icons and right elements."
        code={`<Input label="Amount" leftIcon={<DollarSign size={16} />} placeholder="0.00" type="number" />
<Input label="Website" leftIcon={<span>https://</span>} placeholder="example.com" />`}
        reactNativeCode={`import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { DollarSign } from 'lucide-react-native';

// Amount input with $ prefix
<View>
  <Text style={styles.label}>Amount</Text>
  <View style={styles.wrapper}>
    <DollarSign size={16} color="#94a3b8" />
    <TextInput placeholder="0.00" keyboardType="numeric" style={styles.input}
               placeholderTextColor="#94a3b8" />
  </View>
</View>

// Coupon with Apply button
<View>
  <Text style={styles.label}>Coupon</Text>
  <View style={styles.wrapper}>
    <TextInput placeholder="SUMMER24" style={[styles.input, { flex: 1 }]}
               placeholderTextColor="#94a3b8" />
    <TouchableOpacity>
      <Text style={{ color: '#0D9488', fontWeight: '600', fontSize: 12 }}>Apply</Text>
    </TouchableOpacity>
  </View>
</View>

const styles = StyleSheet.create({
  label: { fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 6 },
  wrapper: { flexDirection: 'row', alignItems: 'center', gap: 8,
             paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12,
             borderWidth: 1.5, borderColor: '#e2e8f0', backgroundColor: '#fff' },
  input: { fontSize: 14, color: '#0f172a' },
});`}
        androidCode={`<!-- Amount input with prefix icon -->
<com.google.android.material.textfield.TextInputLayout
    style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:hint="Amount"
    app:prefixText="$"
    app:boxCornerRadiusTopStart="12dp"
    app:boxCornerRadiusTopEnd="12dp"
    app:boxCornerRadiusBottomStart="12dp"
    app:boxCornerRadiusBottomEnd="12dp">
    <com.google.android.material.textfield.TextInputEditText
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:inputType="numberDecimal"
        android:hint="0.00" />
</com.google.android.material.textfield.TextInputLayout>

<!-- Coupon with Apply button (custom suffix) -->
<com.google.android.material.textfield.TextInputLayout
    style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:hint="Coupon"
    app:endIconMode="custom"
    app:endIconDrawable="@drawable/ic_check">
    <com.google.android.material.textfield.TextInputEditText
        android:layout_width="match_parent"
        android:layout_height="wrap_content" />
</com.google.android.material.textfield.TextInputLayout>`}
        iosCode={`import SwiftUI

struct PrefixSuffixInputView: View {
    @State private var amount = ""
    @State private var coupon = ""

    var body: some View {
        VStack(spacing: 16) {
            VStack(alignment: .leading, spacing: 6) {
                Text("Amount").font(.subheadline).fontWeight(.medium)
                HStack {
                    Image(systemName: "dollarsign").foregroundColor(.secondary)
                    TextField("0.00", text: $amount).keyboardType(.decimalPad)
                }
                .padding(12)
                .overlay(RoundedRectangle(cornerRadius: 12).stroke(Color(.systemGray4), lineWidth: 1.5))
            }

            VStack(alignment: .leading, spacing: 6) {
                Text("Coupon").font(.subheadline).fontWeight(.medium)
                HStack {
                    TextField("SUMMER24", text: $coupon)
                    Button("Apply") { }
                        .font(.caption).fontWeight(.semibold)
                        .foregroundColor(.teal)
                }
                .padding(12)
                .overlay(RoundedRectangle(cornerRadius: 12).stroke(Color(.systemGray4), lineWidth: 1.5))
            }
        }
        .padding()
    }
}`}
        className="mb-5"
        previewClassName="flex-col items-stretch gap-4 max-w-sm mx-auto w-full"
      >
        <div className="w-full max-w-sm space-y-4">
          <Input label="Amount" leftIcon={<DollarSign size={16} />} placeholder="0.00" type="number" />
          <Input label="Coupon" placeholder="SUMMER24" rightElement={
            <button className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 500 }}>Apply</button>
          } />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Disabled"
        description="Disabled inputs cannot be interacted with."
        code={`<Input label="Read Only" value="Cannot edit this" disabled />`}
        reactNativeCode={`import { View, Text, TextInput, StyleSheet } from 'react-native';

<View>
  <Text style={styles.label}>Read Only</Text>
  <TextInput
    value="Cannot edit this"
    editable={false}
    style={[styles.input, styles.disabled]}
  />
</View>

const styles = StyleSheet.create({
  label: { fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 6 },
  input: {
    paddingHorizontal: 12, paddingVertical: 10,
    borderRadius: 12, borderWidth: 1.5, borderColor: '#e2e8f0',
    backgroundColor: '#fff', fontSize: 14, color: '#0f172a',
  },
  disabled: { opacity: 0.5, backgroundColor: '#f8fafc' },
});`}
        androidCode={`<!-- Disabled TextInputLayout -->
<com.google.android.material.textfield.TextInputLayout
    style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:hint="Read Only"
    android:enabled="false"
    app:boxCornerRadiusTopStart="12dp"
    app:boxCornerRadiusTopEnd="12dp"
    app:boxCornerRadiusBottomStart="12dp"
    app:boxCornerRadiusBottomEnd="12dp">
    <com.google.android.material.textfield.TextInputEditText
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Cannot edit this"
        android:focusable="false"
        android:clickable="false" />
</com.google.android.material.textfield.TextInputLayout>`}
        iosCode={`import SwiftUI

struct DisabledInputView: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text("Read Only")
                .font(.subheadline)
                .fontWeight(.medium)
                .foregroundColor(.secondary)

            TextField("", text: .constant("Cannot edit this"))
                .disabled(true)
                .padding(12)
                .background(Color(.systemGray6))
                .overlay(
                    RoundedRectangle(cornerRadius: 12)
                        .stroke(Color(.systemGray4), lineWidth: 1.5)
                )
                .opacity(0.6)
        }
        .padding()
    }
}`}
        className="mb-8"
        previewClassName="flex-col items-stretch gap-4 max-w-sm mx-auto w-full"
      >
        <div className="w-full max-w-sm">
          <Input label="Read Only" value="Cannot edit this" disabled />
        </div>
      </ComponentPreview>

      <div className="mb-8">
        <h2 className="text-slate-900 dark:text-white mb-4 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>Import</h2>
        <CodeBlock code={`import { Input } from '@breathe-ui/core';`} language="tsx" />
      </div>

      <PropsTable props={inputProps} />

      <PageNavigation />
    </div>
  );
}
