import { PageHeader } from '../../components/shared/PageHeader';
import { ComponentPreview } from '../../components/shared/ComponentPreview';
import { PropsTable } from '../../components/shared/PropsTable';
import { CodeBlock } from '../../components/shared/CodeBlock';
import { PageNavigation } from '../../components/shared/PageNavigation';
import { CheckCircle2, Clock, AlertCircle, XCircle, X } from 'lucide-react';

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
type BadgeSize = 'sm' | 'md' | 'lg';

const variantMap: Record<BadgeVariant, string> = {
  default: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700',
  primary: 'bg-teal-50 dark:bg-teal-900/40 text-teal-700 dark:text-teal-400 border-teal-200 dark:border-teal-800',
  secondary: 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800',
  success: 'bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
  warning: 'bg-amber-50 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800',
  danger: 'bg-rose-50 dark:bg-rose-900/40 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800',
  info: 'bg-sky-50 dark:bg-sky-900/40 text-sky-700 dark:text-sky-400 border-sky-200 dark:border-sky-800',
};

const sizeMap: Record<BadgeSize, string> = {
  sm: 'px-1.5 py-0.5 gap-0.5',
  md: 'px-2.5 py-1 gap-1',
  lg: 'px-3 py-1.5 gap-1.5',
};

const fontSizeMap: Record<BadgeSize, string> = {
  sm: '0.65rem',
  md: '0.75rem',
  lg: '0.8125rem',
};

function Badge({ variant = 'default', size = 'md', dot = false, icon, children, onRemove }: {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onRemove?: () => void;
}) {
  return (
    <span className={`inline-flex items-center border rounded-full font-medium ${variantMap[variant]} ${sizeMap[size]}`}
          style={{ fontFamily: 'var(--font-sans)', fontSize: fontSizeMap[size], fontWeight: 500 }}>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />}
      {icon && !dot && <span className="shrink-0">{icon}</span>}
      {children}
      {onRemove && (
        <button onClick={onRemove} className="opacity-60 hover:opacity-100 transition-opacity ml-0.5">
          <X size={10} />
        </button>
      )}
    </span>
  );
}

function CountBadge({ count, max = 99, variant = 'primary' }: { count: number; max?: number; variant?: BadgeVariant }) {
  const display = count > max ? `${max}+` : String(count);
  return (
    <span className={`inline-flex items-center justify-center rounded-full border ${variantMap[variant]}`}
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700, minWidth: '1.25rem', height: '1.25rem', padding: '0 4px' }}>
      {display}
    </span>
  );
}

const badgeProps = [
  { name: 'variant', type: "'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'", default: "'default'", description: 'Color variant of the badge.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size of the badge.' },
  { name: 'dot', type: 'boolean', default: 'false', description: 'Shows a colored dot instead of text.' },
  { name: 'icon', type: 'ReactNode', description: 'Icon displayed before the label.' },
  { name: 'onRemove', type: '() => void', description: 'If provided, shows a remove (×) button.' },
];

export function BadgePage() {
  return (
    <div className="max-w-3xl px-6 lg:px-10 py-10">
      <PageHeader
        title="Badge"
        description="Badges are small status indicators that highlight important metadata, states, or counts. They're compact and inline."
        section="Components"
        badge="Stable"
      />

      <ComponentPreview
        title="Variants"
        description="Seven semantic color variants."
        code={`<Badge>Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="info">Info</Badge>`}
        reactNativeCode={`import { View, Text, StyleSheet } from 'react-native';

function Badge({ variant = 'default', children }) {
  const colors = {
    default:  { bg: '#F1F5F9', text: '#475569', border: '#E2E8F0' },
    primary:  { bg: '#F0FDFA', text: '#0F766E', border: '#99F6E4' },
    success:  { bg: '#ECFDF5', text: '#065F46', border: '#6EE7B7' },
    warning:  { bg: '#FFFBEB', text: '#92400E', border: '#FCD34D' },
    danger:   { bg: '#FFF1F2', text: '#9F1239', border: '#FDA4AF' },
    info:     { bg: '#F0F9FF', text: '#0369A1', border: '#7DD3FC' },
  };
  const c = colors[variant] ?? colors.default;
  return (
    <View style={[styles.badge, { backgroundColor: c.bg, borderColor: c.border }]}>
      <Text style={[styles.text, { color: c.text }]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, borderWidth: 1 },
  text: { fontSize: 12, fontWeight: '500' },
});

// Usage
<View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <Badge>Default</Badge>
  <Badge variant="primary">Primary</Badge>
  <Badge variant="success">Success</Badge>
  <Badge variant="warning">Warning</Badge>
  <Badge variant="danger">Danger</Badge>
  <Badge variant="info">Info</Badge>
</View>`}
        androidCode={`<!-- Chip / Badge using MaterialChip -->
<com.google.android.material.chip.ChipGroup
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    app:singleLine="false">

    <com.google.android.material.chip.Chip
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Default"
        style="@style/Widget.MaterialComponents.Chip.Entry" />

    <com.google.android.material.chip.Chip
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Success"
        app:chipBackgroundColor="@color/green_50"
        app:chipStrokeColor="@color/green_300"
        android:textColor="@color/green_800" />

    <com.google.android.material.chip.Chip
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Warning"
        app:chipBackgroundColor="@color/amber_50"
        app:chipStrokeColor="@color/amber_300"
        android:textColor="@color/amber_800" />

    <com.google.android.material.chip.Chip
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Danger"
        app:chipBackgroundColor="@color/red_50"
        app:chipStrokeColor="@color/red_300"
        android:textColor="@color/red_800" />
</com.google.android.material.chip.ChipGroup>`}
        iosCode={`import SwiftUI

struct BadgeVariantsView: View {
    var body: some View {
        HStack(spacing: 8) {
            BadgeLabel("Default", color: .secondary)
            BadgeLabel("Primary", color: .teal)
            BadgeLabel("Success", color: .green)
            BadgeLabel("Warning", color: .orange)
            BadgeLabel("Danger", color: .red)
            BadgeLabel("Info", color: .blue)
        }
        .padding()
    }
}

struct BadgeLabel: View {
    let text: String
    let color: Color

    init(_ text: String, color: Color) {
        self.text = text
        self.color = color
    }

    var body: some View {
        Text(text)
            .font(.caption)
            .fontWeight(.medium)
            .padding(.horizontal, 10)
            .padding(.vertical, 4)
            .background(color.opacity(0.1))
            .foregroundColor(color)
            .overlay(Capsule().stroke(color.opacity(0.3), lineWidth: 1))
            .clipShape(Capsule())
    }
}`}
        className="mb-5"
      >
        <Badge>Default</Badge>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="danger">Danger</Badge>
        <Badge variant="info">Info</Badge>
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        description="Small, medium, and large badge sizes."
        code={`<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>`}
        reactNativeCode={`import { View, Text, StyleSheet } from 'react-native';

const sizes = {
  sm: { paddingHorizontal: 6, paddingVertical: 2, fontSize: 10 },
  md: { paddingHorizontal: 10, paddingVertical: 4, fontSize: 12 },
  lg: { paddingHorizontal: 12, paddingVertical: 6, fontSize: 13 },
};

function SizedBadge({ size = 'md', children }) {
  const s = sizes[size];
  return (
    <View style={{
      paddingHorizontal: s.paddingHorizontal, paddingVertical: s.paddingVertical,
      borderRadius: 999, backgroundColor: '#F0FDFA', borderWidth: 1, borderColor: '#99F6E4'
    }}>
      <Text style={{ fontSize: s.fontSize, fontWeight: '500', color: '#0F766E' }}>
        {children}
      </Text>
    </View>
  );
}

<View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 8 }}>
  <SizedBadge size="sm">Small</SizedBadge>
  <SizedBadge size="md">Medium</SizedBadge>
  <SizedBadge size="lg">Large</SizedBadge>
</View>`}
        androidCode={`<!-- Badge sizes via textSize and padding -->
<LinearLayout android:orientation="horizontal" android:gap="8dp"
    android:gravity="center_vertical">

    <com.google.android.material.chip.Chip
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Small"
        android:textSize="10sp"
        app:chipMinHeight="20dp"
        app:chipBackgroundColor="@color/teal_50"
        android:textColor="@color/teal_800" />

    <com.google.android.material.chip.Chip
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Medium"
        android:textSize="12sp"
        app:chipMinHeight="24dp"
        app:chipBackgroundColor="@color/teal_50"
        android:textColor="@color/teal_800" />

    <com.google.android.material.chip.Chip
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Large"
        android:textSize="13sp"
        app:chipMinHeight="28dp"
        app:chipBackgroundColor="@color/teal_50"
        android:textColor="@color/teal_800" />
</LinearLayout>`}
        iosCode={`import SwiftUI

struct BadgeSizesView: View {
    var body: some View {
        HStack(alignment: .bottom, spacing: 12) {
            Text("Small")
                .font(.system(size: 10, weight: .medium))
                .padding(.horizontal, 6).padding(.vertical, 2)
                .background(Color.teal.opacity(0.1))
                .foregroundColor(.teal)
                .clipShape(Capsule())

            Text("Medium")
                .font(.system(size: 12, weight: .medium))
                .padding(.horizontal, 10).padding(.vertical, 4)
                .background(Color.teal.opacity(0.1))
                .foregroundColor(.teal)
                .clipShape(Capsule())

            Text("Large")
                .font(.system(size: 14, weight: .medium))
                .padding(.horizontal, 12).padding(.vertical, 6)
                .background(Color.teal.opacity(0.1))
                .foregroundColor(.teal)
                .clipShape(Capsule())
        }
        .padding()
    }
}`}
        className="mb-5"
        previewClassName="items-end"
      >
        <Badge size="sm" variant="primary">Small</Badge>
        <Badge size="md" variant="primary">Medium</Badge>
        <Badge size="lg" variant="primary">Large</Badge>
      </ComponentPreview>

      <ComponentPreview
        title="With Icons"
        description="Badges with status icons for richer context."
        code={`<Badge variant="success" icon={<CheckCircle2 size={10} />}>Active</Badge>
<Badge variant="warning" icon={<Clock size={10} />}>Pending</Badge>
<Badge variant="danger" icon={<XCircle size={10} />}>Failed</Badge>`}
        reactNativeCode={`import { View, Text } from 'react-native';
import { CheckCircle2, Clock, XCircle, AlertCircle } from 'lucide-react-native';

function IconBadge({ variant, icon, children }) {
  const colors = {
    success: { bg: '#ECFDF5', text: '#065F46', border: '#6EE7B7' },
    warning: { bg: '#FFFBEB', text: '#92400E', border: '#FCD34D' },
    danger:  { bg: '#FFF1F2', text: '#9F1239', border: '#FDA4AF' },
    info:    { bg: '#F0F9FF', text: '#0369A1', border: '#7DD3FC' },
  };
  const c = colors[variant];
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4,
                   paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999,
                   backgroundColor: c.bg, borderWidth: 1, borderColor: c.border }}>
      {icon}
      <Text style={{ fontSize: 12, fontWeight: '500', color: c.text }}>{children}</Text>
    </View>
  );
}

<View style={{ flexDirection: 'row', gap: 8 }}>
  <IconBadge variant="success" icon={<CheckCircle2 size={11} color="#065F46" />}>Active</IconBadge>
  <IconBadge variant="warning" icon={<Clock size={11} color="#92400E" />}>Pending</IconBadge>
  <IconBadge variant="danger"  icon={<XCircle size={11} color="#9F1239" />}>Failed</IconBadge>
</View>`}
        androidCode={`<!-- Chip with icon drawable -->
<com.google.android.material.chip.Chip
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Active"
    app:chipIcon="@drawable/ic_check_circle"
    app:chipIconTint="@color/green_700"
    app:chipBackgroundColor="@color/green_50"
    android:textColor="@color/green_800" />

<com.google.android.material.chip.Chip
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Pending"
    app:chipIcon="@drawable/ic_clock"
    app:chipIconTint="@color/amber_700"
    app:chipBackgroundColor="@color/amber_50"
    android:textColor="@color/amber_800" />

<com.google.android.material.chip.Chip
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Failed"
    app:chipIcon="@drawable/ic_error"
    app:chipIconTint="@color/red_700"
    app:chipBackgroundColor="@color/red_50"
    android:textColor="@color/red_800" />`}
        iosCode={`import SwiftUI

struct IconBadgesView: View {
    var body: some View {
        HStack(spacing: 8) {
            Label("Active", systemImage: "checkmark.circle.fill")
                .font(.caption).fontWeight(.medium)
                .padding(.horizontal, 8).padding(.vertical, 4)
                .background(Color.green.opacity(0.1))
                .foregroundColor(.green)
                .clipShape(Capsule())

            Label("Pending", systemImage: "clock.fill")
                .font(.caption).fontWeight(.medium)
                .padding(.horizontal, 8).padding(.vertical, 4)
                .background(Color.orange.opacity(0.1))
                .foregroundColor(.orange)
                .clipShape(Capsule())

            Label("Failed", systemImage: "xmark.circle.fill")
                .font(.caption).fontWeight(.medium)
                .padding(.horizontal, 8).padding(.vertical, 4)
                .background(Color.red.opacity(0.1))
                .foregroundColor(.red)
                .clipShape(Capsule())
        }
        .padding()
    }
}`}
        className="mb-5"
      >
        <Badge variant="success" icon={<CheckCircle2 size={11} />}>Active</Badge>
        <Badge variant="warning" icon={<Clock size={11} />}>Pending</Badge>
        <Badge variant="danger" icon={<XCircle size={11} />}>Failed</Badge>
        <Badge variant="info" icon={<AlertCircle size={11} />}>Review</Badge>
        <Badge variant="default" icon={<Clock size={11} />}>Draft</Badge>
      </ComponentPreview>

      <ComponentPreview
        title="With Dot"
        description="Status dots for online/offline indicators."
        code={`<Badge variant="success" dot>Online</Badge>
<Badge variant="danger" dot>Offline</Badge>
<Badge variant="warning" dot>Away</Badge>`}
        reactNativeCode={`import { View, Text } from 'react-native';

function DotBadge({ variant, children }) {
  const colors = {
    success: { bg: '#ECFDF5', text: '#065F46', dot: '#34D399', border: '#6EE7B7' },
    danger:  { bg: '#FFF1F2', text: '#9F1239', dot: '#F87171', border: '#FDA4AF' },
    warning: { bg: '#FFFBEB', text: '#92400E', dot: '#FBBF24', border: '#FCD34D' },
    default: { bg: '#F1F5F9', text: '#475569', dot: '#94A3B8', border: '#E2E8F0' },
  };
  const c = colors[variant] ?? colors.default;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6,
                   paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999,
                   backgroundColor: c.bg, borderWidth: 1, borderColor: c.border }}>
      <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: c.dot }} />
      <Text style={{ fontSize: 12, fontWeight: '500', color: c.text }}>{children}</Text>
    </View>
  );
}

<View style={{ flexDirection: 'row', gap: 8 }}>
  <DotBadge variant="success">Online</DotBadge>
  <DotBadge variant="danger">Offline</DotBadge>
  <DotBadge variant="warning">Away</DotBadge>
</View>`}
        androidCode={`<!-- Dot badge using a compound drawable -->
<!-- Use a custom layout for dot + text -->
<LinearLayout
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:background="@drawable/bg_badge_success"
    android:orientation="horizontal"
    android:gravity="center_vertical"
    android:paddingStart="8dp"
    android:paddingEnd="8dp"
    android:paddingTop="4dp"
    android:paddingBottom="4dp"
    android:gap="6dp">

    <View
        android:layout_width="6dp"
        android:layout_height="6dp"
        android:background="@drawable/circle_green" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Online"
        android:textSize="12sp"
        android:textColor="@color/green_800" />
</LinearLayout>`}
        iosCode={`import SwiftUI

struct DotBadgeView: View {
    var body: some View {
        HStack(spacing: 8) {
            DotBadge("Online",  dotColor: .green,  bg: .green)
            DotBadge("Offline", dotColor: .red,    bg: .red)
            DotBadge("Away",    dotColor: .orange, bg: .orange)
            DotBadge("Idle",    dotColor: .gray,   bg: .gray)
        }
        .padding()
    }
}

struct DotBadge: View {
    let label: String
    let dotColor: Color
    let bg: Color

    init(_ label: String, dotColor: Color, bg: Color) {
        self.label = label; self.dotColor = dotColor; self.bg = bg
    }

    var body: some View {
        HStack(spacing: 5) {
            Circle().fill(dotColor).frame(width: 6, height: 6)
            Text(label).font(.caption).fontWeight(.medium).foregroundColor(bg)
        }
        .padding(.horizontal, 8).padding(.vertical, 4)
        .background(bg.opacity(0.1))
        .clipShape(Capsule())
    }
}`}
        className="mb-5"
      >
        <Badge variant="success" dot>Online</Badge>
        <Badge variant="danger" dot>Offline</Badge>
        <Badge variant="warning" dot>Away</Badge>
        <Badge dot>Idle</Badge>
      </ComponentPreview>

      <ComponentPreview
        title="Removable"
        description="Tags or filters with a remove button."
        code={`<Badge variant="primary" onRemove={() => {}}>Design</Badge>
<Badge variant="secondary" onRemove={() => {}}>React</Badge>`}
        reactNativeCode={`import { View, Text, TouchableOpacity } from 'react-native';
import { X } from 'lucide-react-native';

function RemovableBadge({ children, onRemove }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4,
                   paddingStart: 10, paddingEnd: 6, paddingVertical: 4,
                   borderRadius: 999, backgroundColor: '#F0FDFA',
                   borderWidth: 1, borderColor: '#99F6E4' }}>
      <Text style={{ fontSize: 12, fontWeight: '500', color: '#0F766E' }}>{children}</Text>
      <TouchableOpacity onPress={onRemove} hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}>
        <X size={10} color="#0F766E" strokeWidth={2.5} />
      </TouchableOpacity>
    </View>
  );
}

<View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  {['React', 'TypeScript', 'Design'].map(tag => (
    <RemovableBadge key={tag} onRemove={() => console.log('remove', tag)}>
      {tag}
    </RemovableBadge>
  ))}
</View>`}
        androidCode={`<!-- Closeable Chip -->
<com.google.android.material.chip.ChipGroup
    android:layout_width="wrap_content"
    android:layout_height="wrap_content">

    <com.google.android.material.chip.Chip
        android:id="@+id/chipReact"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="React"
        style="@style/Widget.MaterialComponents.Chip.Entry"
        app:chipBackgroundColor="@color/teal_50"
        android:textColor="@color/teal_800"
        app:closeIconTint="@color/teal_800" />

    <com.google.android.material.chip.Chip
        android:id="@+id/chipTS"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="TypeScript"
        style="@style/Widget.MaterialComponents.Chip.Entry"
        app:chipBackgroundColor="@color/indigo_50"
        android:textColor="@color/indigo_800" />
</com.google.android.material.chip.ChipGroup>

// Kotlin — handle close
chipReact.setOnCloseIconClickListener { chipReact.isVisible = false }`}
        iosCode={`import SwiftUI

struct RemovableTagsView: View {
    @State private var tags = ["React", "TypeScript", "Design", "Motion"]

    var body: some View {
        HStack(spacing: 8) {
            ForEach(tags, id: \\.self) { tag in
                HStack(spacing: 4) {
                    Text(tag)
                        .font(.caption)
                        .fontWeight(.medium)
                        .foregroundColor(.teal)

                    Button {
                        tags.removeAll { $0 == tag }
                    } label: {
                        Image(systemName: "xmark")
                            .font(.system(size: 9, weight: .bold))
                            .foregroundColor(.teal)
                    }
                }
                .padding(.leading, 10)
                .padding(.trailing, 6)
                .padding(.vertical, 4)
                .background(Color.teal.opacity(0.1))
                .clipShape(Capsule())
            }
        }
        .padding()
    }
}`}
        className="mb-5"
      >
        {(['React', 'TypeScript', 'Design', 'Motion', 'Tailwind'] as const).map((tag, i) => {
          const variants: BadgeVariant[] = ['primary', 'secondary', 'success', 'info', 'warning'];
          return <Badge key={tag} variant={variants[i % variants.length]} onRemove={() => {}}>{tag}</Badge>;
        })}
      </ComponentPreview>

      <ComponentPreview
        title="Count Badges"
        description="Numeric badges for notifications and counts."
        code={`<CountBadge count={5} />
<CountBadge count={142} max={99} variant="danger" />`}
        reactNativeCode={`import { View, Text } from 'react-native';

function CountBadge({ count, max = 99, variant = 'primary' }) {
  const display = count > max ? \`\${max}+\` : String(count);
  const colors = {
    primary: { bg: '#F0FDFA', text: '#0F766E', border: '#99F6E4' },
    danger:  { bg: '#FFF1F2', text: '#9F1239', border: '#FDA4AF' },
    warning: { bg: '#FFFBEB', text: '#92400E', border: '#FCD34D' },
  };
  const c = colors[variant] ?? colors.primary;
  return (
    <View style={{ minWidth: 20, height: 20, paddingHorizontal: 4,
                   borderRadius: 999, alignItems: 'center', justifyContent: 'center',
                   backgroundColor: c.bg, borderWidth: 1, borderColor: c.border }}>
      <Text style={{ fontSize: 10, fontWeight: '700', color: c.text }}>{display}</Text>
    </View>
  );
}

<View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
  <CountBadge count={1} />
  <CountBadge count={8} variant="primary" />
  <CountBadge count={24} variant="primary" />
  <CountBadge count={100} max={99} variant="danger" />
</View>`}
        androidCode={`<!-- Notification badge using BadgeDrawable (Material) -->
// In Kotlin:
val badge = BadgeDrawable.create(context)
badge.number = 5
BadgeUtils.attachBadgeDrawable(badge, toolbar, R.id.action_notifications)

// Or inline TextView styled as badge:
<TextView
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="99+"
    android:textSize="10sp"
    android:textColor="@color/red_800"
    android:background="@drawable/bg_badge_red"
    android:paddingStart="4dp"
    android:paddingEnd="4dp"
    android:paddingTop="2dp"
    android:paddingBottom="2dp" />

<!-- bg_badge_red.xml -->
<shape xmlns:android="..."
    android:shape="oval">
    <solid android:color="@color/red_100" />
    <stroke android:width="1dp" android:color="@color/red_300" />
</shape>`}
        iosCode={`import SwiftUI

struct CountBadgesView: View {
    var body: some View {
        HStack(spacing: 12) {
            ForEach([1, 8, 24, 100], id: \\.self) { count in
                let display = count > 99 ? "99+" : "\\(count)"
                Text(display)
                    .font(.system(size: 10, weight: .bold))
                    .foregroundColor(.teal)
                    .frame(minWidth: 20, minHeight: 20)
                    .padding(.horizontal, 4)
                    .background(Color.teal.opacity(0.1))
                    .overlay(Capsule().stroke(Color.teal.opacity(0.3), lineWidth: 1))
                    .clipShape(Capsule())
            }

            // Notification bell with badge overlay
            ZStack(alignment: .topTrailing) {
                Image(systemName: "bell.fill")
                    .font(.title2)
                    .foregroundColor(.secondary)
                Text("3")
                    .font(.system(size: 10, weight: .bold))
                    .foregroundColor(.white)
                    .frame(width: 16, height: 16)
                    .background(Color.red)
                    .clipShape(Circle())
                    .offset(x: 6, y: -6)
            }
        }
        .padding()
    }
}`}
        className="mb-8"
      >
        <div className="flex items-center gap-4">
          {[1, 8, 24, 100, 1024].map((n, i) => {
            const variants: BadgeVariant[] = ['primary', 'secondary', 'success', 'danger', 'warning'];
            return <CountBadge key={n} count={n} max={99} variant={variants[i]} />;
          })}
        </div>
      </ComponentPreview>

      <div className="mb-8">
        <h2 className="text-slate-900 dark:text-white mb-4 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>Import</h2>
        <CodeBlock code={`import { Badge } from '@breathe-ui/core';`} language="tsx" />
      </div>

      <PropsTable props={badgeProps} />

      <PageNavigation />
    </div>
  );
}
