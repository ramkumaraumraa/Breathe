import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PageHeader } from '../../components/shared/PageHeader';
import { ComponentPreview } from '../../components/shared/ComponentPreview';
import { PropsTable } from '../../components/shared/PropsTable';
import { CodeBlock } from '../../components/shared/CodeBlock';
import { PageNavigation } from '../../components/shared/PageNavigation';

interface Option { value: string; label: string; description?: string; disabled?: boolean }

function Select({ options, placeholder = 'Select option', label, disabled, searchable = false }: {
  options: Option[];
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  searchable?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);
  const [query, setQuery] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) { setOpen(false); setQuery(''); } };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const filtered = searchable && query
    ? options.filter(o => o.label.toLowerCase().includes(query.toLowerCase()))
    : options;

  return (
    <div className="w-full relative" ref={ref}>
      {label && (
        <label className="block text-slate-700 dark:text-slate-300 mb-1.5" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 500 }}>
          {label}
        </label>
      )}
      <button
        onClick={() => !disabled && setOpen(o => !o)}
        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border bg-white dark:bg-slate-900 transition-colors text-left ${open ? 'border-teal-400 dark:border-teal-600' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <span className={selected ? 'text-slate-900 dark:text-slate-100' : 'text-slate-400 dark:text-slate-600'}
              style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown size={16} className={`text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.12 }}
            className="absolute z-20 mt-1.5 w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden"
            style={{ minWidth: '200px' }}
          >
            {searchable && (
              <div className="flex items-center gap-2 px-3 py-2.5 border-b border-slate-100 dark:border-slate-800">
                <Search size={14} className="text-slate-400 shrink-0" />
                <input
                  autoFocus
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="flex-1 bg-transparent outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400"
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}
                />
              </div>
            )}
            <div className="py-1 max-h-52 overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="px-3 py-4 text-center text-slate-400" style={{ fontSize: '0.8rem' }}>No options found</div>
              ) : (
                filtered.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => { if (!opt.disabled) { setSelected(opt); setOpen(false); setQuery(''); } }}
                    disabled={opt.disabled}
                    className={`flex items-center justify-between w-full px-3 py-2.5 text-left transition-colors ${opt.disabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-teal-50 dark:hover:bg-teal-900/20 cursor-pointer'} ${selected?.value === opt.value ? 'bg-teal-50 dark:bg-teal-900/30' : ''}`}
                  >
                    <div>
                      <p className={`m-0 ${selected?.value === opt.value ? 'text-teal-700 dark:text-teal-400' : 'text-slate-700 dark:text-slate-300'}`}
                         style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: selected?.value === opt.value ? 500 : 400 }}>
                        {opt.label}
                      </p>
                      {opt.description && (
                        <p className="text-slate-400 dark:text-slate-600 m-0 mt-0.5" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem' }}>
                          {opt.description}
                        </p>
                      )}
                    </div>
                    {selected?.value === opt.value && <Check size={14} className="text-teal-500 shrink-0" />}
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const frameworks = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'angular', label: 'Angular', disabled: true },
  { value: 'solid', label: 'SolidJS' },
];

const timezones = [
  { value: 'utc', label: 'UTC (UTC+0)', description: 'Coordinated Universal Time' },
  { value: 'est', label: 'EST (UTC-5)', description: 'Eastern Standard Time' },
  { value: 'pst', label: 'PST (UTC-8)', description: 'Pacific Standard Time' },
  { value: 'ist', label: 'IST (UTC+5:30)', description: 'India Standard Time' },
  { value: 'jst', label: 'JST (UTC+9)', description: 'Japan Standard Time' },
];

const selectProps = [
  { name: 'options', type: 'Option[]', required: true, description: 'Array of options: { value, label, description?, disabled? }.' },
  { name: 'placeholder', type: 'string', default: "'Select option'", description: 'Text shown when no option is selected.' },
  { name: 'label', type: 'string', description: 'Label shown above the select.' },
  { name: 'searchable', type: 'boolean', default: 'false', description: 'Adds a search input to filter options.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the select.' },
  { name: 'onChange', type: '(value: string) => void', description: 'Callback when selection changes.' },
];

export function SelectPage() {
  return (
    <div className="max-w-3xl px-6 lg:px-10 py-10">
      <PageHeader
        title="Select"
        description="Select lets users choose one option from a dropdown list. Use it when there are five or more choices, or when screen space is limited."
        section="Components"
        badge="Stable"
      />

      <ComponentPreview
        title="Basic Select"
        description="A simple dropdown with a list of options."
        code={`<Select
  label="Framework"
  options={[
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'svelte', label: 'Svelte' },
  ]}
/>`}
        reactNativeCode={`import { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { ChevronDown, Check } from 'lucide-react-native';

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'SolidJS' },
];

function Select({ label, options, placeholder = 'Select option' }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity style={styles.trigger} onPress={() => setOpen(true)}>
        <Text style={[styles.value, !selected && styles.placeholder]}>
          {selected?.label ?? placeholder}
        </Text>
        <ChevronDown size={16} color="#94A3B8" />
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="slide">
        <View style={styles.backdrop}>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>{label ?? 'Select'}</Text>
            <FlatList
              data={options}
              keyExtractor={item => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => { setSelected(item); setOpen(false); }}
                >
                  <Text style={[styles.optLabel, selected?.value === item.value && styles.optSelected]}>
                    {item.label}
                  </Text>
                  {selected?.value === item.value && <Check size={14} color="#0D9488" />}
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setOpen(false)}>
              <Text style={{ color: '#64748B', fontWeight: '500' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  label:       { fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 6 },
  trigger:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                 paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12,
                 borderWidth: 1.5, borderColor: '#E2E8F0', backgroundColor: '#fff' },
  value:       { fontSize: 14, color: '#0F172A' },
  placeholder: { color: '#94A3B8' },
  backdrop:    { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  sheet:       { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 },
  sheetTitle:  { fontSize: 16, fontWeight: '600', color: '#0F172A', marginBottom: 12 },
  option:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                 paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  optLabel:    { fontSize: 14, color: '#374151' },
  optSelected: { color: '#0D9488', fontWeight: '500' },
  cancelBtn:   { marginTop: 12, paddingVertical: 14, alignItems: 'center' },
});`}
        androidCode={`<!-- Using AutoCompleteTextView (Exposed Dropdown) -->
<com.google.android.material.textfield.TextInputLayout
    android:id="@+id/frameworkLayout"
    style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox.ExposedDropdownMenu"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:hint="Framework"
    app:boxCornerRadiusTopStart="12dp"
    app:boxCornerRadiusTopEnd="12dp"
    app:boxCornerRadiusBottomStart="12dp"
    app:boxCornerRadiusBottomEnd="12dp">

    <AutoCompleteTextView
        android:id="@+id/frameworkDropdown"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:inputType="none"
        android:text="Select framework" />
</com.google.android.material.textfield.TextInputLayout>

// In Kotlin:
val frameworks = listOf("React", "Vue", "Svelte", "SolidJS")
val adapter = ArrayAdapter(context, R.layout.dropdown_item, frameworks)
val dropdown = view.findViewById<AutoCompleteTextView>(R.id.frameworkDropdown)
dropdown.setAdapter(adapter)
dropdown.setOnItemClickListener { _, _, position, _ ->
    val selected = frameworks[position]
    // handle selection
}`}
        iosCode={`import SwiftUI

struct BasicSelectView: View {
    @State private var selected = ""

    let options = ["React", "Vue", "Svelte", "SolidJS"]

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text("Framework")
                .font(.subheadline).fontWeight(.medium).foregroundColor(.secondary)

            // iOS native Picker in menu style (iOS 14+)
            Menu {
                ForEach(options, id: \\.self) { option in
                    Button {
                        selected = option
                    } label: {
                        HStack {
                            Text(option)
                            if selected == option {
                                Image(systemName: "checkmark").foregroundColor(.teal)
                            }
                        }
                    }
                }
            } label: {
                HStack {
                    Text(selected.isEmpty ? "Select framework" : selected)
                        .foregroundColor(selected.isEmpty ? .secondary : .primary)
                    Spacer()
                    Image(systemName: "chevron.up.chevron.down")
                        .font(.caption).foregroundColor(.secondary)
                }
                .padding(12)
                .background(Color(.systemBackground))
                .overlay(RoundedRectangle(cornerRadius: 12).stroke(Color(.systemGray4), lineWidth: 1.5))
            }
        }
        .padding()
    }
}`}
        className="mb-5"
        previewClassName="block p-6"
      >
        <div className="relative w-full max-w-xs">
          <Select label="Framework" options={frameworks} placeholder="Select framework" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Descriptions"
        description="Options can include additional descriptive text."
        code={`<Select
  label="Timezone"
  options={[
    { value: 'utc', label: 'UTC (UTC+0)', description: 'Coordinated Universal Time' },
    ...
  ]}
/>`}
        reactNativeCode={`import { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { ChevronDown, Check } from 'lucide-react-native';

const timezones = [
  { value: 'utc', label: 'UTC (UTC+0)',    description: 'Coordinated Universal Time' },
  { value: 'est', label: 'EST (UTC-5)',    description: 'Eastern Standard Time' },
  { value: 'pst', label: 'PST (UTC-8)',    description: 'Pacific Standard Time' },
  { value: 'ist', label: 'IST (UTC+5:30)', description: 'India Standard Time' },
];

function DescSelect({ label, options }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  return (
    <View>
      {label && <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 6 }}>{label}</Text>}
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                 paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12,
                 borderWidth: 1.5, borderColor: '#E2E8F0', backgroundColor: '#fff' }}
        onPress={() => setOpen(true)}>
        <Text style={{ fontSize: 14, color: selected ? '#0F172A' : '#94A3B8' }}>
          {selected?.label ?? 'Select timezone'}
        </Text>
        <ChevronDown size={16} color="#94A3B8" />
      </TouchableOpacity>
      <Modal visible={open} transparent animationType="slide">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 }}>
            <FlatList data={options} keyExtractor={i => i.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F1F5F9',
                           flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                  onPress={() => { setSelected(item); setOpen(false); }}>
                  <View>
                    <Text style={{ fontSize: 14, color: '#374151' }}>{item.label}</Text>
                    <Text style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>{item.description}</Text>
                  </View>
                  {selected?.value === item.value && <Check size={14} color="#0D9488" />}
                </TouchableOpacity>
              )} />
          </View>
        </View>
      </Modal>
    </View>
  );
}`}
        androidCode={`<!-- Custom dropdown with description using ListPopupWindow -->
// Kotlin — custom adapter with title + subtitle:
class TimezoneAdapter(
    context: Context,
    private val items: List<Timezone>
) : BaseAdapter() {
    data class Timezone(val value: String, val label: String, val description: String)

    override fun getCount() = items.size
    override fun getItem(pos: Int) = items[pos]
    override fun getItemId(pos: Int) = pos.toLong()

    override fun getView(pos: Int, view: View?, parent: ViewGroup): View {
        val v = view ?: LayoutInflater.from(parent.context)
            .inflate(R.layout.dropdown_item_desc, parent, false)
        val item = items[pos]
        v.findViewById<TextView>(R.id.tvLabel).text = item.label
        v.findViewById<TextView>(R.id.tvDesc).text = item.description
        return v
    }
}

// Use with ListPopupWindow or AutoCompleteTextView`}
        iosCode={`import SwiftUI

struct DescSelectView: View {
    @State private var selected = ""

    let timezones = [
        ("utc", "UTC (UTC+0)",     "Coordinated Universal Time"),
        ("est", "EST (UTC-5)",     "Eastern Standard Time"),
        ("pst", "PST (UTC-8)",     "Pacific Standard Time"),
        ("ist", "IST (UTC+5:30)", "India Standard Time"),
    ]

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text("Timezone").font(.subheadline).fontWeight(.medium).foregroundColor(.secondary)

            Menu {
                ForEach(timezones, id: \\.0) { value, label, desc in
                    Button {
                        selected = value
                    } label: {
                        VStack(alignment: .leading) {
                            Text(label)
                            Text(desc).font(.caption)
                        }
                    }
                }
            } label: {
                HStack {
                    Text(timezones.first { $0.0 == selected }?.1 ?? "Select timezone")
                        .foregroundColor(selected.isEmpty ? .secondary : .primary)
                    Spacer()
                    Image(systemName: "chevron.up.chevron.down").font(.caption).foregroundColor(.secondary)
                }
                .padding(12)
                .background(Color(.systemBackground))
                .overlay(RoundedRectangle(cornerRadius: 12).stroke(Color(.systemGray4), lineWidth: 1.5))
            }
        }
        .padding()
    }
}`}
        className="mb-5"
        previewClassName="block p-6"
      >
        <div className="relative w-full max-w-xs">
          <Select label="Timezone" options={timezones} placeholder="Select timezone" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Searchable"
        description="Adds a search input for filtering large option lists."
        code={`<Select label="Country" options={countries} searchable />`}
        reactNativeCode={`import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Search, Check } from 'lucide-react-native';

function SearchableSelect({ label, options, placeholder }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState('');

  const filtered = query
    ? options.filter(o => o.label.toLowerCase().includes(query.toLowerCase()))
    : options;

  return (
    <View>
      {label && <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 6 }}>{label}</Text>}
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                 padding: 12, borderRadius: 12, borderWidth: 1.5, borderColor: '#E2E8F0', backgroundColor: '#fff' }}
        onPress={() => setOpen(true)}>
        <Text style={{ fontSize: 14, color: selected ? '#0F172A' : '#94A3B8' }}>
          {selected?.label ?? placeholder}
        </Text>
      </TouchableOpacity>
      <Modal visible={open} transparent animationType="slide">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '70%' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16,
                           borderBottomWidth: 1, borderBottomColor: '#F1F5F9' }}>
              <Search size={14} color="#94A3B8" />
              <TextInput
                value={query} onChangeText={setQuery}
                placeholder="Search..." autoFocus
                style={{ flex: 1, marginLeft: 8, fontSize: 14, color: '#0F172A' }} />
            </View>
            <FlatList data={filtered} keyExtractor={i => i.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                           paddingHorizontal: 16, paddingVertical: 14,
                           borderBottomWidth: 1, borderBottomColor: '#F8FAFC' }}
                  onPress={() => { setSelected(item); setOpen(false); setQuery(''); }}>
                  <Text style={{ fontSize: 14, color: '#374151' }}>{item.label}</Text>
                  {selected?.value === item.value && <Check size={14} color="#0D9488" />}
                </TouchableOpacity>
              )} />
          </View>
        </View>
      </Modal>
    </View>
  );
}`}
        androidCode={`<!-- Searchable AutoCompleteTextView (acts like a searchable select) -->
<com.google.android.material.textfield.TextInputLayout
    style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox.ExposedDropdownMenu"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:hint="Search timezone..."
    app:startIconDrawable="@drawable/ic_search"
    app:boxCornerRadiusTopStart="12dp"
    app:boxCornerRadiusTopEnd="12dp"
    app:boxCornerRadiusBottomStart="12dp"
    app:boxCornerRadiusBottomEnd="12dp">

    <AutoCompleteTextView
        android:id="@+id/searchableDropdown"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:threshold="1" />
</com.google.android.material.textfield.TextInputLayout>

// Kotlin — filter on text change:
val timezones = listOf("UTC (UTC+0)", "EST (UTC-5)", "PST (UTC-8)", "IST (UTC+5:30)")
val adapter = ArrayAdapter(context, R.layout.dropdown_item, timezones)
searchableDropdown.setAdapter(adapter)
// The AutoCompleteTextView filters automatically based on threshold`}
        iosCode={`import SwiftUI

struct SearchableSelectView: View {
    @State private var selected = ""
    @State private var search = ""
    @State private var showSheet = false

    let timezones = ["UTC (UTC+0)", "EST (UTC-5)", "PST (UTC-8)", "IST (UTC+5:30)", "JST (UTC+9)"]

    var filtered: [String] {
        search.isEmpty ? timezones : timezones.filter { $0.localizedCaseInsensitiveContains(search) }
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text("Timezone").font(.subheadline).fontWeight(.medium).foregroundColor(.secondary)
            Button { showSheet = true } label: {
                HStack {
                    Text(selected.isEmpty ? "Search timezones..." : selected)
                        .foregroundColor(selected.isEmpty ? .secondary : .primary)
                    Spacer()
                    Image(systemName: "magnifyingglass").font(.caption).foregroundColor(.secondary)
                }
                .padding(12)
                .background(Color(.systemBackground))
                .overlay(RoundedRectangle(cornerRadius: 12).stroke(Color(.systemGray4), lineWidth: 1.5))
            }
            .sheet(isPresented: $showSheet) {
                NavigationView {
                    List(filtered, id: \\.self) { tz in
                        Button {
                            selected = tz
                            showSheet = false
                        } label: {
                            HStack {
                                Text(tz).foregroundColor(.primary)
                                Spacer()
                                if selected == tz { Image(systemName: "checkmark").foregroundColor(.teal) }
                            }
                        }
                    }
                    .searchable(text: $search, prompt: "Search timezones...")
                    .navigationTitle("Select Timezone")
                    .navigationBarTitleDisplayMode(.inline)
                }
            }
        }
        .padding()
    }
}`}
        className="mb-5"
        previewClassName="block p-6"
      >
        <div className="relative w-full max-w-xs">
          <Select label="Timezone" options={timezones} placeholder="Search timezones..." searchable />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Disabled"
        description="A disabled select that prevents interaction."
        code={`<Select label="Plan" options={plans} disabled />`}
        reactNativeCode={`import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronDown } from 'lucide-react-native';

function DisabledSelect({ label, placeholder }) {
  return (
    <View style={{ opacity: 0.5 }}>
      {label && <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 6 }}>{label}</Text>}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                     paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12,
                     borderWidth: 1.5, borderColor: '#E2E8F0', backgroundColor: '#F8FAFC' }}>
        <Text style={{ fontSize: 14, color: '#94A3B8' }}>{placeholder}</Text>
        <ChevronDown size={16} color="#CBD5E1" />
      </View>
    </View>
  );
}

<DisabledSelect label="Plan" placeholder="Enterprise only" />`}
        androidCode={`<!-- Disabled ExposedDropdownMenu -->
<com.google.android.material.textfield.TextInputLayout
    style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox.ExposedDropdownMenu"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:hint="Plan"
    android:enabled="false"
    app:boxCornerRadiusTopStart="12dp"
    app:boxCornerRadiusTopEnd="12dp"
    app:boxCornerRadiusBottomStart="12dp"
    app:boxCornerRadiusBottomEnd="12dp">

    <AutoCompleteTextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Enterprise only"
        android:inputType="none"
        android:focusable="false"
        android:clickable="false"
        android:enabled="false" />
</com.google.android.material.textfield.TextInputLayout>`}
        iosCode={`import SwiftUI

struct DisabledSelectView: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text("Plan").font(.subheadline).fontWeight(.medium).foregroundColor(.secondary)
            HStack {
                Text("Enterprise only").foregroundColor(.secondary)
                Spacer()
                Image(systemName: "chevron.up.chevron.down").font(.caption).foregroundColor(.secondary)
            }
            .padding(12)
            .background(Color(.systemGray6))
            .overlay(RoundedRectangle(cornerRadius: 12).stroke(Color(.systemGray4), lineWidth: 1.5))
            .opacity(0.6)
        }
        .padding()
        .disabled(true)
    }
}`}
        className="mb-8"
        previewClassName="block p-6"
      >
        <div className="relative w-full max-w-xs">
          <Select label="Plan" options={frameworks} placeholder="Enterprise only" disabled />
        </div>
      </ComponentPreview>

      <div className="mb-8">
        <h2 className="text-slate-900 dark:text-white mb-4 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>Import</h2>
        <CodeBlock code={`import { Select } from '@breathe-ui/core';`} language="tsx" />
      </div>

      <PropsTable props={selectProps} />

      <PageNavigation />
    </div>
  );
}