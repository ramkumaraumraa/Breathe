import { useState } from 'react';
import { Check, Minus } from 'lucide-react';
import { PageHeader } from '../../components/shared/PageHeader';
import { ComponentPreview } from '../../components/shared/ComponentPreview';
import { PropsTable } from '../../components/shared/PropsTable';
import { CodeBlock } from '../../components/shared/CodeBlock';
import { PageNavigation } from '../../components/shared/PageNavigation';

type CheckboxState = 'unchecked' | 'checked' | 'indeterminate';

function Checkbox({ checked, onChange, label, description, disabled, indeterminate }: {
  checked?: boolean;
  onChange?: (v: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  indeterminate?: boolean;
}) {
  const state: CheckboxState = indeterminate ? 'indeterminate' : checked ? 'checked' : 'unchecked';
  return (
    <label className={`inline-flex items-start gap-2.5 cursor-pointer group ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <button
        role="checkbox"
        aria-checked={indeterminate ? 'mixed' : checked}
        disabled={disabled}
        onClick={() => !disabled && onChange?.(!checked)}
        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all duration-150 ${
          state !== 'unchecked'
            ? 'border-teal-500 bg-teal-500'
            : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 group-hover:border-teal-400 dark:group-hover:border-teal-600'
        }`}
        style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
      >
        {state === 'checked' && <Check size={12} className="text-white" strokeWidth={3} />}
        {state === 'indeterminate' && <Minus size={12} className="text-white" strokeWidth={3} />}
      </button>
      {(label || description) && (
        <div>
          {label && (
            <span className="text-slate-700 dark:text-slate-300 block" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.5 }}>
              {label}
            </span>
          )}
          {description && (
            <span className="text-slate-400 dark:text-slate-500 block mt-0.5" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.775rem', lineHeight: 1.5 }}>
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  );
}

function CheckboxGroupDemo() {
  const items = ['Email notifications', 'Push notifications', 'SMS alerts', 'Weekly digest'];
  const [checked, setChecked] = useState<boolean[]>([true, false, true, false]);
  const allChecked = checked.every(Boolean);
  const someChecked = checked.some(Boolean);
  const toggleAll = () => { const next = !allChecked; setChecked(checked.map(() => next)); };
  const toggle = (i: number) => setChecked(prev => prev.map((v, idx) => idx === i ? !v : v));

  return (
    <div className="space-y-3">
      <Checkbox label="All notifications" checked={allChecked} indeterminate={someChecked && !allChecked} onChange={toggleAll} />
      <div className="pl-8 space-y-3 border-l-2 border-slate-100 dark:border-slate-800 ml-2.5">
        {items.map((item, i) => (
          <Checkbox key={item} label={item} checked={checked[i]} onChange={() => toggle(i)} />
        ))}
      </div>
    </div>
  );
}

const checkboxProps = [
  { name: 'checked', type: 'boolean', description: 'Controlled checked state.' },
  { name: 'onChange', type: '(checked: boolean) => void', description: 'Callback when check state changes.' },
  { name: 'label', type: 'string', description: 'Label text displayed next to the checkbox.' },
  { name: 'description', type: 'string', description: 'Secondary description text below the label.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the checkbox.' },
  { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Shows a dash instead of check mark — used for parent checkboxes.' },
];

export function CheckboxPage() {
  const [c1, setC1] = useState(false);
  const [c2, setC2] = useState(true);

  return (
    <div className="max-w-3xl px-6 lg:px-10 py-10">
      <PageHeader
        title="Checkbox"
        description="Checkboxes allow users to select one or more options from a list. They support three states: unchecked, checked, and indeterminate."
        section="Components"
        badge="Stable"
      />

      <ComponentPreview
        title="Basic"
        description="Uncontrolled and controlled checkbox examples."
        code={`const [checked, setChecked] = useState(false);

<Checkbox
  label="Accept terms and conditions"
  checked={checked}
  onChange={setChecked}
/>`}
        reactNativeCode={`import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Check } from 'lucide-react-native';

function Checkbox({ checked, onChange, label }) {
  return (
    <TouchableOpacity
      onPress={() => onChange(!checked)}
      style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
      activeOpacity={0.7}
    >
      <View style={{
        width: 20, height: 20, borderRadius: 6,
        borderWidth: 2,
        borderColor: checked ? '#0D9488' : '#CBD5E1',
        backgroundColor: checked ? '#0D9488' : '#fff',
        alignItems: 'center', justifyContent: 'center',
      }}>
        {checked && <Check size={12} color="#fff" strokeWidth={3} />}
      </View>
      <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151' }}>{label}</Text>
    </TouchableOpacity>
  );
}

function CheckboxDemo() {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      label="Accept terms and conditions"
      checked={checked}
      onChange={setChecked}
    />
  );
}`}
        androidCode={`<!-- Material CheckBox -->
<LinearLayout android:orientation="vertical" android:gap="16dp" android:padding="16dp">

    <com.google.android.material.checkbox.MaterialCheckBox
        android:id="@+id/checkboxTerms"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Accept terms and conditions"
        android:textSize="14sp"
        app:buttonTint="@color/teal_600" />

    <com.google.android.material.checkbox.MaterialCheckBox
        android:id="@+id/checkboxSelected"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Selected option"
        android:checked="true"
        android:textSize="14sp"
        app:buttonTint="@color/teal_600" />
</LinearLayout>

// In Kotlin:
val checkbox = view.findViewById<MaterialCheckBox>(R.id.checkboxTerms)
checkbox.setOnCheckedChangeListener { _, isChecked ->
    // handle state change
}`}
        iosCode={`import SwiftUI

struct CheckboxView: View {
    @State private var checked1 = false
    @State private var checked2 = true

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            CheckboxRow(label: "Unselected option", isChecked: $checked1)
            CheckboxRow(label: "Selected option",   isChecked: $checked2)
        }
        .padding()
    }
}

struct CheckboxRow: View {
    let label: String
    @Binding var isChecked: Bool

    var body: some View {
        Button {
            isChecked.toggle()
        } label: {
            HStack(spacing: 10) {
                Image(systemName: isChecked ? "checkmark.square.fill" : "square")
                    .font(.title3)
                    .foregroundColor(isChecked ? .teal : Color(.systemGray3))
                Text(label)
                    .font(.subheadline).fontWeight(.medium)
                    .foregroundColor(.primary)
            }
        }
        .buttonStyle(.plain)
    }
}`}
        className="mb-5"
        previewClassName="flex-col items-start gap-4 p-6"
      >
        <Checkbox label="Unselected option" checked={c1} onChange={setC1} />
        <Checkbox label="Selected option" checked={c2} onChange={setC2} />
      </ComponentPreview>

      <ComponentPreview
        title="With Description"
        description="Additional help text for more context."
        code={`<Checkbox
  label="Marketing emails"
  description="Receive tips, updates, and promotions from our team."
  checked={checked}
  onChange={setChecked}
/>`}
        reactNativeCode={`import { View, Text, TouchableOpacity } from 'react-native';
import { Check } from 'lucide-react-native';

function Checkbox({ checked, onChange, label, description }) {
  return (
    <TouchableOpacity
      onPress={() => onChange(!checked)}
      style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}
      activeOpacity={0.7}
    >
      <View style={{
        width: 20, height: 20, borderRadius: 6, marginTop: 2,
        borderWidth: 2,
        borderColor: checked ? '#0D9488' : '#CBD5E1',
        backgroundColor: checked ? '#0D9488' : '#fff',
        alignItems: 'center', justifyContent: 'center',
      }}>
        {checked && <Check size={12} color="#fff" strokeWidth={3} />}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151' }}>{label}</Text>
        {description && (
          <Text style={{ fontSize: 12, color: '#94A3B8', marginTop: 2, lineHeight: 18 }}>
            {description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

<View style={{ gap: 16 }}>
  <Checkbox label="Marketing emails"
    description="Receive tips, product updates, and promotions."
    checked={true} onChange={() => {}} />
  <Checkbox label="Analytics tracking"
    description="Allow us to track anonymized usage data."
    checked={false} onChange={() => {}} />
</View>`}
        androidCode={`<!-- Checkbox with description using LinearLayout -->
<LinearLayout android:orientation="horizontal" android:gap="10dp" android:padding="16dp">

    <com.google.android.material.checkbox.MaterialCheckBox
        android:id="@+id/checkboxMarketing"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="2dp"
        android:checked="true"
        app:buttonTint="@color/teal_600" />

    <LinearLayout android:orientation="vertical" android:layout_width="0dp"
        android:layout_height="wrap_content" android:layout_weight="1">
        <TextView
            android:text="Marketing emails"
            android:textSize="14sp"
            android:textStyle="bold"
            android:textColor="@color/slate_700" />
        <TextView
            android:text="Receive tips, product updates, and promotions."
            android:textSize="12sp"
            android:textColor="@color/slate_400"
            android:layout_marginTop="2dp" />
    </LinearLayout>
</LinearLayout>`}
        iosCode={`import SwiftUI

struct CheckboxWithDescView: View {
    @State private var marketing = true
    @State private var analytics = false

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            DescCheckboxRow(
                label: "Marketing emails",
                description: "Receive tips, product updates, and promotions.",
                isChecked: $marketing
            )
            DescCheckboxRow(
                label: "Analytics tracking",
                description: "Allow us to track anonymized usage data to improve the product.",
                isChecked: $analytics
            )
        }
        .padding()
    }
}

struct DescCheckboxRow: View {
    let label: String
    let description: String
    @Binding var isChecked: Bool

    var body: some View {
        Button { isChecked.toggle() } label: {
            HStack(alignment: .top, spacing: 10) {
                Image(systemName: isChecked ? "checkmark.square.fill" : "square")
                    .font(.title3).foregroundColor(isChecked ? .teal : Color(.systemGray3))
                    .padding(.top, 2)
                VStack(alignment: .leading, spacing: 2) {
                    Text(label).font(.subheadline).fontWeight(.medium).foregroundColor(.primary)
                    Text(description).font(.caption).foregroundColor(.secondary)
                }
            }
        }
        .buttonStyle(.plain)
    }
}`}
        className="mb-5"
        previewClassName="flex-col items-start gap-4 p-6"
      >
        <Checkbox label="Marketing emails" description="Receive tips, product updates, and promotions." checked onChange={() => {}} />
        <Checkbox label="Analytics tracking" description="Allow us to track anonymized usage data to improve the product." checked={false} onChange={() => {}} />
      </ComponentPreview>

      <ComponentPreview
        title="Indeterminate & Group"
        description="Parent checkbox with indeterminate state for managing groups."
        code={`// Parent checkbox with indeterminate state
<Checkbox
  label="All notifications"
  indeterminate={someChecked && !allChecked}
  checked={allChecked}
  onChange={toggleAll}
/>
// Children
{items.map(item => (
  <Checkbox key={item} label={item} checked={...} onChange={...} />
))}`}
        reactNativeCode={`import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Check, Minus } from 'lucide-react-native';

const items = ['Email notifications', 'Push notifications', 'SMS alerts', 'Weekly digest'];

function Checkbox({ checked, indeterminate, label, onChange }) {
  const state = indeterminate ? 'indeterminate' : checked ? 'checked' : 'unchecked';
  const active = state !== 'unchecked';
  return (
    <TouchableOpacity onPress={onChange} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      <View style={{ width: 20, height: 20, borderRadius: 6, borderWidth: 2,
                     borderColor: active ? '#0D9488' : '#CBD5E1',
                     backgroundColor: active ? '#0D9488' : '#fff',
                     alignItems: 'center', justifyContent: 'center' }}>
        {state === 'checked' && <Check size={12} color="#fff" strokeWidth={3} />}
        {state === 'indeterminate' && <Minus size={12} color="#fff" strokeWidth={3} />}
      </View>
      <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151' }}>{label}</Text>
    </TouchableOpacity>
  );
}

function CheckboxGroup() {
  const [checked, setChecked] = useState([true, false, true, false]);
  const allChecked = checked.every(Boolean);
  const someChecked = checked.some(Boolean);
  const toggleAll = () => setChecked(checked.map(() => !allChecked));
  const toggle = i => setChecked(prev => prev.map((v, idx) => idx === i ? !v : v));
  return (
    <View style={{ gap: 12 }}>
      <Checkbox label="All notifications" checked={allChecked}
        indeterminate={someChecked && !allChecked} onChange={toggleAll} />
      <View style={{ paddingLeft: 30, gap: 12 }}>
        {items.map((item, i) => (
          <Checkbox key={item} label={item} checked={checked[i]}
            indeterminate={false} onChange={() => toggle(i)} />
        ))}
      </View>
    </View>
  );
}`}
        androidCode={`<!-- Group checkboxes with indeterminate support -->
<LinearLayout android:orientation="vertical" android:gap="12dp" android:padding="16dp">

    <!-- Parent (indeterminate) -->
    <com.google.android.material.checkbox.MaterialCheckBox
        android:id="@+id/checkboxAll"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="All notifications"
        app:buttonTint="@color/teal_600" />

    <!-- Children -->
    <LinearLayout android:orientation="vertical" android:paddingStart="32dp" android:gap="12dp">

        <com.google.android.material.checkbox.MaterialCheckBox
            android:id="@+id/checkboxEmail"
            android:text="Email notifications"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            app:buttonTint="@color/teal_600" />

        <com.google.android.material.checkbox.MaterialCheckBox
            android:id="@+id/checkboxPush"
            android:text="Push notifications"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            app:buttonTint="@color/teal_600" />
    </LinearLayout>
</LinearLayout>

// Kotlin — set indeterminate:
checkboxAll.isChecked = false
checkboxAll.buttonDrawable?.let { CheckableUtils.setIndeterminate(it, true) }`}
        iosCode={`import SwiftUI

struct CheckboxGroupView: View {
    let items = ["Email notifications", "Push notifications", "SMS alerts", "Weekly digest"]
    @State private var checked = [true, false, true, false]

    var allChecked: Bool { checked.allSatisfy { $0 } }
    var someChecked: Bool { checked.contains(true) }

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Parent
            Button {
                let next = !allChecked
                checked = checked.map { _ in next }
            } label: {
                HStack(spacing: 10) {
                    Image(systemName: someChecked && !allChecked
                          ? "minus.square.fill"
                          : allChecked ? "checkmark.square.fill" : "square")
                        .font(.title3)
                        .foregroundColor(someChecked ? .teal : Color(.systemGray3))
                    Text("All notifications").font(.subheadline).fontWeight(.medium).foregroundColor(.primary)
                }
            }.buttonStyle(.plain)

            // Children
            VStack(alignment: .leading, spacing: 12) {
                ForEach(Array(items.enumerated()), id: \\.offset) { i, item in
                    Button { checked[i].toggle() } label: {
                        HStack(spacing: 10) {
                            Image(systemName: checked[i] ? "checkmark.square.fill" : "square")
                                .font(.title3)
                                .foregroundColor(checked[i] ? .teal : Color(.systemGray3))
                            Text(item).font(.subheadline).fontWeight(.medium).foregroundColor(.primary)
                        }
                    }.buttonStyle(.plain)
                }
            }
            .padding(.leading, 30)
        }
        .padding()
    }
}`}
        className="mb-5"
        previewClassName="block p-6"
      >
        <CheckboxGroupDemo />
      </ComponentPreview>

      <ComponentPreview
        title="Disabled"
        description="Disabled checkboxes cannot be interacted with."
        code={`<Checkbox label="Disabled unchecked" disabled />
<Checkbox label="Disabled checked" disabled checked />`}
        reactNativeCode={`import { View, Text } from 'react-native';
import { Check } from 'lucide-react-native';

function Checkbox({ checked, label, disabled }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, opacity: disabled ? 0.5 : 1 }}>
      <View style={{
        width: 20, height: 20, borderRadius: 6, borderWidth: 2,
        borderColor: checked ? '#0D9488' : '#CBD5E1',
        backgroundColor: checked ? '#0D9488' : '#fff',
        alignItems: 'center', justifyContent: 'center',
      }}>
        {checked && <Check size={12} color="#fff" strokeWidth={3} />}
      </View>
      <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151' }}>{label}</Text>
    </View>
  );
}

<View style={{ gap: 16 }}>
  <Checkbox label="Disabled unchecked" disabled checked={false} />
  <Checkbox label="Disabled checked"   disabled checked={true} />
</View>`}
        androidCode={`<com.google.android.material.checkbox.MaterialCheckBox
    android:id="@+id/checkboxDisabledUnchecked"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Disabled unchecked"
    android:enabled="false"
    app:buttonTint="@color/slate_300" />

<com.google.android.material.checkbox.MaterialCheckBox
    android:id="@+id/checkboxDisabledChecked"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Disabled checked"
    android:enabled="false"
    android:checked="true"
    app:buttonTint="@color/slate_300" />`}
        iosCode={`import SwiftUI

struct DisabledCheckboxView: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            HStack(spacing: 10) {
                Image(systemName: "square")
                    .font(.title3).foregroundColor(Color(.systemGray3))
                Text("Disabled unchecked")
                    .font(.subheadline).fontWeight(.medium).foregroundColor(.secondary)
            }
            HStack(spacing: 10) {
                Image(systemName: "checkmark.square.fill")
                    .font(.title3).foregroundColor(Color(.systemGray3))
                Text("Disabled checked")
                    .font(.subheadline).fontWeight(.medium).foregroundColor(.secondary)
            }
        }
        .padding()
        .opacity(0.5)
    }
}`}
        className="mb-8"
        previewClassName="flex-col items-start gap-4 p-6"
      >
        <Checkbox label="Disabled unchecked" disabled />
        <Checkbox label="Disabled checked" disabled checked />
      </ComponentPreview>

      <div className="mb-8">
        <h2 className="text-slate-900 dark:text-white mb-4 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>Import</h2>
        <CodeBlock code={`import { Checkbox } from '@breathe-ui/core';`} language="tsx" />
      </div>

      <PropsTable props={checkboxProps} />

      <PageNavigation />
    </div>
  );
}
