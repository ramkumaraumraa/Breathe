import { useState } from 'react';
import { PageHeader } from '../../components/shared/PageHeader';
import { ComponentPreview } from '../../components/shared/ComponentPreview';
import { PropsTable } from '../../components/shared/PropsTable';
import { CodeBlock } from '../../components/shared/CodeBlock';
import { PageNavigation } from '../../components/shared/PageNavigation';
import { Bell, Moon, Globe, Shield } from 'lucide-react';
import { motion } from 'motion/react';

function Switch({ checked, onChange, label, description, disabled, size = 'md' }: {
  checked?: boolean;
  onChange?: (v: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizes = {
    sm: { track: 'w-8 h-4', thumb: 'w-3 h-3', translate: 'translate-x-4', start: 'translate-x-0.5' },
    md: { track: 'w-11 h-6', thumb: 'w-5 h-5', translate: 'translate-x-5', start: 'translate-x-0.5' },
    lg: { track: 'w-14 h-7', thumb: 'w-6 h-6', translate: 'translate-x-7', start: 'translate-x-0.5' },
  };
  const s = sizes[size];

  return (
    <div className={`flex items-center gap-3 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
         onClick={() => !disabled && onChange?.(!checked)}>
      <div className={`relative ${s.track} rounded-full transition-colors duration-200 ${checked ? 'bg-teal-500' : 'bg-slate-200 dark:bg-slate-700'} shrink-0`}>
        <motion.div
          className={`absolute top-0.5 ${s.thumb} rounded-full bg-white shadow-sm`}
          animate={{ x: checked ? parseInt(s.translate.replace('translate-x-', '')) * 4 - 2 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        />
      </div>
      {(label || description) && (
        <div>
          {label && (
            <span className="text-slate-700 dark:text-slate-300 block" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 500 }}>
              {label}
            </span>
          )}
          {description && (
            <span className="text-slate-400 dark:text-slate-500 block" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.775rem' }}>
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function SettingsDemo() {
  const [settings, setSettings] = useState({ notifications: true, darkMode: false, analytics: true, security: false });
  const toggle = (key: keyof typeof settings) => setSettings(s => ({ ...s, [key]: !s[key] }));

  const items = [
    { key: 'notifications' as const, icon: Bell, label: 'Push notifications', description: 'Receive real-time alerts for important events.' },
    { key: 'darkMode' as const, icon: Moon, label: 'Dark mode', description: 'Use a dark color scheme to reduce eye strain.' },
    { key: 'analytics' as const, icon: Globe, label: 'Usage analytics', description: 'Share anonymous usage data to help improve the product.' },
    { key: 'security' as const, icon: Shield, label: 'Two-factor auth', description: 'Add an extra layer of security to your account.' },
  ];

  return (
    <div className="w-full space-y-4">
      {items.map(item => (
        <div key={item.key} className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <item.icon size={17} className="text-slate-500 dark:text-slate-400" />
            </div>
            <div>
              <p className="text-slate-900 dark:text-slate-100 m-0" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 500 }}>
                {item.label}
              </p>
              <p className="text-slate-400 dark:text-slate-500 m-0" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.775rem' }}>
                {item.description}
              </p>
            </div>
          </div>
          <Switch checked={settings[item.key]} onChange={() => toggle(item.key)} />
        </div>
      ))}
    </div>
  );
}

const switchProps = [
  { name: 'checked', type: 'boolean', description: 'Controlled on/off state.' },
  { name: 'onChange', type: '(checked: boolean) => void', description: 'Callback when the switch is toggled.' },
  { name: 'label', type: 'string', description: 'Label displayed next to the switch.' },
  { name: 'description', type: 'string', description: 'Helper text below the label.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the switch.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size of the switch track and thumb.' },
];

export function SwitchPage() {
  const [on, setOn] = useState(false);
  const [on2, setOn2] = useState(true);

  return (
    <div className="max-w-3xl px-6 lg:px-10 py-10">
      <PageHeader
        title="Switch"
        description="Switches are boolean toggles — they instantly apply a setting when flipped. Use them for settings that take immediate effect without a submit button."
        section="Components"
        badge="Stable"
      />

      <ComponentPreview
        title="Basic Switch"
        description="On and off states with spring animation."
        code={`const [enabled, setEnabled] = useState(false);
<Switch checked={enabled} onChange={setEnabled} />`}
        reactNativeCode={`import { useState } from 'react';
import { View, Text, Switch } from 'react-native';

function SwitchDemo() {
  const [enabled, setEnabled] = useState(false);
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <Switch
        value={enabled}
        onValueChange={setEnabled}
        trackColor={{ false: '#CBD5E1', true: '#0D9488' }}
        thumbColor="#ffffff"
        ios_backgroundColor="#CBD5E1"
      />
      <Text style={{ fontSize: 14, color: '#64748B' }}>
        {enabled ? 'On' : 'Off'}
      </Text>
    </View>
  );
}

// Note: React Native has a built-in Switch component.
// For Android, use thumbColor and trackColor props.
// For iOS, use ios_backgroundColor.`}
        androidCode={`<!-- Material Switch (SwitchMaterial) -->
<com.google.android.material.switchmaterial.SwitchMaterial
    android:id="@+id/switchBasic"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Enable feature"
    app:thumbTint="@color/white"
    app:trackTint="@color/switch_track_selector" />

<!-- res/color/switch_track_selector.xml -->
<selector xmlns:android="...">
    <item android:color="@color/teal_500" android:state_checked="true" />
    <item android:color="@color/slate_300" />
</selector>

// In Kotlin:
val switchBasic = view.findViewById<SwitchMaterial>(R.id.switchBasic)
switchBasic.setOnCheckedChangeListener { _, isChecked ->
    // handle toggle
}`}
        iosCode={`import SwiftUI

struct BasicSwitchView: View {
    @State private var enabled = false
    @State private var enabled2 = true

    var body: some View {
        HStack(spacing: 20) {
            Toggle("", isOn: $enabled)
                .labelsHidden()
                .tint(.teal)

            Toggle("", isOn: $enabled2)
                .labelsHidden()
                .tint(.teal)

            Text(enabled ? "On" : "Off")
                .font(.subheadline)
                .foregroundColor(.secondary)
        }
        .padding()
    }
}`}
        className="mb-5"
      >
        <Switch checked={on} onChange={setOn} />
        <Switch checked={on2} onChange={setOn2} />
        <span className="text-slate-500 dark:text-slate-400" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
          {on ? 'On' : 'Off'}
        </span>
      </ComponentPreview>

      <ComponentPreview
        title="With Label & Description"
        description="Switches with contextual labels."
        code={`<Switch
  checked={enabled}
  onChange={setEnabled}
  label="Email notifications"
  description="Receive weekly digests and alerts."
/>`}
        reactNativeCode={`import { View, Text, Switch } from 'react-native';

function LabeledSwitch({ label, description, value, onValueChange }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#CBD5E1', true: '#0D9488' }}
        thumbColor="#ffffff"
        ios_backgroundColor="#CBD5E1"
      />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151' }}>{label}</Text>
        {description && (
          <Text style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>{description}</Text>
        )}
      </View>
    </View>
  );
}

<View style={{ gap: 16 }}>
  <LabeledSwitch
    label="Email notifications"
    description="Receive weekly digests and product alerts."
    value={true}
    onValueChange={() => {}}
  />
  <LabeledSwitch
    label="Auto-save"
    description="Automatically save changes every 30 seconds."
    value={false}
    onValueChange={() => {}}
  />
</View>`}
        androidCode={`<!-- SwitchMaterial with custom label layout -->
<LinearLayout
    android:orientation="horizontal"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:gravity="center_vertical"
    android:padding="16dp"
    android:gap="12dp">

    <LinearLayout
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_weight="1"
        android:orientation="vertical">

        <TextView
            android:text="Email notifications"
            android:textSize="14sp"
            android:textStyle="bold"
            android:textColor="@color/slate_700" />

        <TextView
            android:text="Receive weekly digests and product alerts."
            android:textSize="12sp"
            android:textColor="@color/slate_400"
            android:layout_marginTop="2dp" />
    </LinearLayout>

    <com.google.android.material.switchmaterial.SwitchMaterial
        android:id="@+id/switchEmail"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:checked="true"
        app:trackTint="@color/switch_track_selector" />
</LinearLayout>`}
        iosCode={`import SwiftUI

struct LabeledSwitchView: View {
    @State private var emailNotifs = true
    @State private var autoSave = false

    var body: some View {
        VStack(spacing: 20) {
            HStack {
                VStack(alignment: .leading, spacing: 2) {
                    Text("Email notifications")
                        .font(.subheadline).fontWeight(.medium)
                    Text("Receive weekly digests and product alerts.")
                        .font(.caption).foregroundColor(.secondary)
                }
                Spacer()
                Toggle("", isOn: $emailNotifs).labelsHidden().tint(.teal)
            }

            HStack {
                VStack(alignment: .leading, spacing: 2) {
                    Text("Auto-save")
                        .font(.subheadline).fontWeight(.medium)
                    Text("Automatically save changes every 30 seconds.")
                        .font(.caption).foregroundColor(.secondary)
                }
                Spacer()
                Toggle("", isOn: $autoSave).labelsHidden().tint(.teal)
            }
        }
        .padding()
    }
}`}
        className="mb-5"
        previewClassName="flex-col items-start gap-4 p-6"
      >
        <Switch label="Email notifications" description="Receive weekly digests and product alerts." checked onChange={() => {}} />
        <Switch label="Auto-save" description="Automatically save changes every 30 seconds." checked={false} onChange={() => {}} />
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        description="Small, medium, and large switch sizes."
        code={`<Switch size="sm" checked />
<Switch size="md" checked />
<Switch size="lg" checked />`}
        reactNativeCode={`import { View, Text, Switch, StyleSheet } from 'react-native';

// React Native's Switch doesn't natively support sizing,
// but you can use transform to scale it:

function SizedSwitch({ size = 'md', value, onValueChange }) {
  const scales = { sm: 0.7, md: 1.0, lg: 1.3 };
  return (
    <View style={{ transform: [{ scaleX: scales[size] }, { scaleY: scales[size] }] }}>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#CBD5E1', true: '#0D9488' }}
        thumbColor="#ffffff"
        ios_backgroundColor="#CBD5E1"
      />
    </View>
  );
}

<View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
  {['sm', 'md', 'lg'].map(size => (
    <View key={size} style={{ alignItems: 'center', gap: 8 }}>
      <SizedSwitch size={size} value={true} onValueChange={() => {}} />
      <Text style={{ fontSize: 10, color: '#94A3B8' }}>{size}</Text>
    </View>
  ))}
</View>`}
        androidCode={`<!-- Switch sizes in Android via scaleX/scaleY -->
<LinearLayout android:orientation="horizontal" android:gravity="center_vertical" android:gap="24dp">

    <!-- Small -->
    <com.google.android.material.switchmaterial.SwitchMaterial
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:scaleX="0.75"
        android:scaleY="0.75"
        android:checked="true"
        app:trackTint="@color/teal_500" />

    <!-- Medium (default) -->
    <com.google.android.material.switchmaterial.SwitchMaterial
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:checked="true"
        app:trackTint="@color/teal_500" />

    <!-- Large -->
    <com.google.android.material.switchmaterial.SwitchMaterial
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:scaleX="1.3"
        android:scaleY="1.3"
        android:checked="true"
        app:trackTint="@color/teal_500" />
</LinearLayout>`}
        iosCode={`import SwiftUI

struct SwitchSizesView: View {
    // iOS Toggle doesn't have built-in size variants
    // Use scaleEffect or custom views for sizing
    @State private var on = true

    var body: some View {
        HStack(spacing: 24) {
            VStack(spacing: 8) {
                Toggle("", isOn: $on).labelsHidden().tint(.teal)
                    .scaleEffect(0.75)
                Text("sm").font(.system(size: 10)).foregroundColor(.secondary)
            }
            VStack(spacing: 8) {
                Toggle("", isOn: $on).labelsHidden().tint(.teal)
                Text("md").font(.system(size: 10)).foregroundColor(.secondary)
            }
            VStack(spacing: 8) {
                Toggle("", isOn: $on).labelsHidden().tint(.teal)
                    .scaleEffect(1.25)
                Text("lg").font(.system(size: 10)).foregroundColor(.secondary)
            }
        }
        .padding()
    }
}`}
        className="mb-5"
        previewClassName="items-center gap-6"
      >
        {(['sm', 'md', 'lg'] as const).map(size => (
          <div key={size} className="flex flex-col items-center gap-2">
            <Switch size={size} checked onChange={() => {}} />
            <span className="text-slate-400 dark:text-slate-600" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem' }}>{size}</span>
          </div>
        ))}
      </ComponentPreview>

      <ComponentPreview
        title="Settings Panel"
        description="Real-world usage in a settings interface."
        code={`const [settings, setSettings] = useState({...});

{items.map(item => (
  <div key={item.key} className="flex items-center justify-between">
    <label>{item.label}</label>
    <Switch checked={settings[item.key]} onChange={() => toggle(item.key)} />
  </div>
))}`}
        reactNativeCode={`import { useState } from 'react';
import { View, Text, Switch, ScrollView } from 'react-native';
import { Bell, Moon, Globe, Shield } from 'lucide-react-native';

const items = [
  { key: 'notifications', icon: Bell,   label: 'Push notifications', desc: 'Receive real-time alerts.' },
  { key: 'darkMode',      icon: Moon,   label: 'Dark mode',           desc: 'Use a dark color scheme.' },
  { key: 'analytics',     icon: Globe,  label: 'Usage analytics',     desc: 'Share anonymous usage data.' },
  { key: 'security',      icon: Shield, label: 'Two-factor auth',     desc: 'Extra account security.' },
];

function SettingsPanel() {
  const [settings, setSettings] = useState({
    notifications: true, darkMode: false, analytics: true, security: false
  });
  const toggle = key => setSettings(s => ({ ...s, [key]: !s[key] }));

  return (
    <View style={{ gap: 12 }}>
      {items.map(item => (
        <View key={item.key} style={{
          flexDirection: 'row', alignItems: 'center', padding: 16,
          backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0',
        }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: '#F1F5F9',
                           alignItems: 'center', justifyContent: 'center' }}>
              <item.icon size={17} color="#64748B" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, fontWeight: '500', color: '#0F172A' }}>{item.label}</Text>
              <Text style={{ fontSize: 12, color: '#94A3B8', marginTop: 1 }}>{item.desc}</Text>
            </View>
          </View>
          <Switch value={settings[item.key]} onValueChange={() => toggle(item.key)}
            trackColor={{ false: '#CBD5E1', true: '#0D9488' }} thumbColor="#fff" />
        </View>
      ))}
    </View>
  );
}`}
        androidCode={`<!-- Settings list with SwitchMaterial -->
<LinearLayout android:orientation="vertical" android:gap="12dp">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="@drawable/card_background"
        android:padding="16dp"
        android:gravity="center_vertical"
        android:orientation="horizontal">

        <ImageView
            android:layout_width="36dp"
            android:layout_height="36dp"
            android:src="@drawable/ic_notifications"
            android:background="@drawable/bg_icon_gray"
            android:tint="@color/slate_500"
            android:padding="9dp" />

        <LinearLayout android:layout_width="0dp" android:layout_height="wrap_content"
            android:layout_weight="1" android:orientation="vertical" android:layout_marginStart="12dp">
            <TextView android:text="Push notifications"
                android:textSize="14sp" android:textStyle="bold" android:textColor="@color/slate_900" />
            <TextView android:text="Receive real-time alerts for important events."
                android:textSize="12sp" android:textColor="@color/slate_400" />
        </LinearLayout>

        <com.google.android.material.switchmaterial.SwitchMaterial
            android:id="@+id/switchNotifications"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:checked="true"
            app:trackTint="@color/switch_track_selector" />
    </LinearLayout>
</LinearLayout>`}
        iosCode={`import SwiftUI

struct SettingsPanelView: View {
    @State private var settings = [
        "notifications": true, "darkMode": false,
        "analytics": true, "security": false
    ]

    let items = [
        ("notifications", "bell.fill",         "Push notifications", "Receive real-time alerts."),
        ("darkMode",      "moon.fill",          "Dark mode",          "Use a dark color scheme."),
        ("analytics",     "globe",              "Usage analytics",    "Share anonymous usage data."),
        ("security",      "lock.shield.fill",   "Two-factor auth",    "Extra account security."),
    ]

    var body: some View {
        VStack(spacing: 12) {
            ForEach(items, id: \\.0) { key, icon, label, desc in
                HStack(spacing: 12) {
                    Image(systemName: icon)
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                        .frame(width: 36, height: 36)
                        .background(Color(.systemGray6))
                        .cornerRadius(8)

                    VStack(alignment: .leading, spacing: 2) {
                        Text(label).font(.subheadline).fontWeight(.medium)
                        Text(desc).font(.caption).foregroundColor(.secondary)
                    }
                    Spacer()
                    Toggle("", isOn: Binding(
                        get: { settings[key] ?? false },
                        set: { settings[key] = $0 }
                    ))
                    .labelsHidden().tint(.teal)
                }
                .padding(16)
                .background(Color(.systemBackground))
                .cornerRadius(12)
                .overlay(RoundedRectangle(cornerRadius: 12).stroke(Color(.systemGray5), lineWidth: 1))
            }
        }
        .padding()
    }
}`}
        className="mb-5"
        previewClassName="block p-4"
      >
        <SettingsDemo />
      </ComponentPreview>

      <ComponentPreview
        title="Disabled"
        description="Disabled switches cannot be toggled."
        code={`<Switch label="Read only on" disabled checked />
<Switch label="Read only off" disabled />`}
        reactNativeCode={`import { View, Switch } from 'react-native';

// Disabled switch — use pointerEvents="none" wrapper
<View pointerEvents="none" style={{ opacity: 0.5 }}>
  <Switch
    value={true}
    trackColor={{ false: '#CBD5E1', true: '#0D9488' }}
    thumbColor="#ffffff"
  />
</View>

<View pointerEvents="none" style={{ opacity: 0.5 }}>
  <Switch
    value={false}
    trackColor={{ false: '#CBD5E1', true: '#0D9488' }}
    thumbColor="#ffffff"
  />
</View>`}
        androidCode={`<com.google.android.material.switchmaterial.SwitchMaterial
    android:id="@+id/switchDisabledOn"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Disabled — on"
    android:enabled="false"
    android:checked="true"
    app:trackTint="@color/teal_300" />

<com.google.android.material.switchmaterial.SwitchMaterial
    android:id="@+id/switchDisabledOff"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Disabled — off"
    android:enabled="false"
    android:checked="false"
    app:trackTint="@color/slate_200" />`}
        iosCode={`import SwiftUI

struct DisabledSwitchView: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            HStack {
                Toggle("Disabled — on", isOn: .constant(true))
                    .tint(.teal)
                    .disabled(true)
            }
            HStack {
                Toggle("Disabled — off", isOn: .constant(false))
                    .tint(.teal)
                    .disabled(true)
            }
        }
        .padding()
        .opacity(0.5)
    }
}`}
        className="mb-8"
        previewClassName="flex-col items-start gap-4 p-6"
      >
        <Switch label="Disabled — on" disabled checked />
        <Switch label="Disabled — off" disabled checked={false} />
      </ComponentPreview>

      <div className="mb-8">
        <h2 className="text-slate-900 dark:text-white mb-4 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>Import</h2>
        <CodeBlock code={`import { Switch } from '@breathe-ui/core';`} language="tsx" />
      </div>

      <PropsTable props={switchProps} />

      <PageNavigation />
    </div>
  );
}
