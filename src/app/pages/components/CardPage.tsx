import { MoreHorizontal, Star, Heart, TrendingUp } from 'lucide-react';
import { PageHeader } from '../../components/shared/PageHeader';
import { ComponentPreview } from '../../components/shared/ComponentPreview';
import { PropsTable } from '../../components/shared/PropsTable';
import { CodeBlock } from '../../components/shared/CodeBlock';
import { PageNavigation } from '../../components/shared/PageNavigation';

function Card({ children, className = '', variant = 'default', hoverable = false }: {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'bordered' | 'ghost';
  hoverable?: boolean;
}) {
  const variants = {
    default: 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm',
    elevated: 'bg-white dark:bg-slate-900 shadow-lg border border-slate-100 dark:border-slate-800/50',
    bordered: 'bg-white dark:bg-slate-900 border-2 border-teal-200 dark:border-teal-800',
    ghost: 'bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800',
  };
  return (
    <div className={`rounded-2xl overflow-hidden transition-all duration-200 ${variants[variant]} ${hoverable ? 'hover:shadow-lg hover:-translate-y-0.5 cursor-pointer' : ''} ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`px-5 py-4 border-b border-slate-100 dark:border-slate-800 ${className}`}>{children}</div>;
}

function CardBody({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`px-5 py-4 ${className}`}>{children}</div>;
}

function CardFooter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`px-5 py-4 border-t border-slate-100 dark:border-slate-800 ${className}`}>{children}</div>;
}

const cardProps = [
  { name: 'variant', type: "'default' | 'elevated' | 'bordered' | 'ghost'", default: "'default'", description: 'Visual style of the card.' },
  { name: 'hoverable', type: 'boolean', default: 'false', description: 'Adds hover lift and shadow animation.' },
  { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  { name: 'children', type: 'ReactNode', required: true, description: 'Card content — use CardHeader, CardBody, CardFooter.' },
];

export function CardPage() {
  return (
    <div className="max-w-3xl px-6 lg:px-10 py-10">
      <PageHeader
        title="Card"
        description="Cards are surfaces that contain related information and actions. They group content into logical, scannable units."
        section="Components"
        badge="Stable"
      />

      {/* Basic */}
      <ComponentPreview
        title="Basic Card"
        description="A simple card with header, body, and footer sections."
        code={`<Card>
  <Card.Header>
    <h4>Project Settings</h4>
  </Card.Header>
  <Card.Body>
    <p>Manage your project configuration.</p>
  </Card.Body>
  <Card.Footer>
    <Button>Save Changes</Button>
  </Card.Footer>
</Card>`}
        reactNativeCode={`import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}
function CardHeader({ children }) {
  return <View style={styles.header}>{children}</View>;
}
function CardBody({ children }) {
  return <View style={styles.body}>{children}</View>;
}
function CardFooter({ children }) {
  return <View style={styles.footer}>{children}</View>;
}

// Usage
<Card>
  <CardHeader>
    <Text style={styles.title}>Project Settings</Text>
  </CardHeader>
  <CardBody>
    <Text style={styles.bodyText}>Configure your project settings and integrations.</Text>
  </CardBody>
  <CardFooter>
    <TouchableOpacity style={styles.btn}>
      <Text style={styles.btnText}>Save Changes</Text>
    </TouchableOpacity>
  </CardFooter>
</Card>

const styles = StyleSheet.create({
  card: { borderRadius: 16, backgroundColor: '#fff',
          borderWidth: 1, borderColor: '#E2E8F0',
          shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  header: { paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  body:   { paddingHorizontal: 20, paddingVertical: 16 },
  footer: { paddingHorizontal: 20, paddingVertical: 16, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  title:    { fontSize: 15, fontWeight: '600', color: '#0F172A' },
  bodyText: { fontSize: 14, color: '#64748B', lineHeight: 22 },
  btn: { backgroundColor: '#0D9488', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10, alignSelf: 'flex-start' },
  btnText: { color: '#fff', fontSize: 14, fontWeight: '600' },
});`}
        androidCode={`<!-- res/layout/card_project.xml -->
<com.google.android.material.card.MaterialCardView
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    app:cardCornerRadius="16dp"
    app:cardElevation="2dp"
    app:strokeColor="@color/slate_200"
    app:strokeWidth="1dp">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical">

        <!-- Header -->
        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Project Settings"
            android:textSize="15sp"
            android:textStyle="bold"
            android:padding="20dp"
            android:background="@drawable/bottom_divider" />

        <!-- Body -->
        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Configure your project settings and integrations."
            android:padding="20dp"
            android:textSize="14sp"
            android:textColor="@color/slate_500" />

        <!-- Footer -->
        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:padding="20dp"
            android:orientation="horizontal"
            android:background="@drawable/top_divider">
            <com.google.android.material.button.MaterialButton
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="Save Changes"
                app:backgroundTint="@color/teal_700"
                app:cornerRadius="10dp" />
        </LinearLayout>
    </LinearLayout>
</com.google.android.material.card.MaterialCardView>`}
        iosCode={`import SwiftUI

struct BasicCardView: View {
    var body: some View {
        VStack(spacing: 0) {
            // Header
            HStack {
                Text("Project Settings")
                    .font(.subheadline).fontWeight(.semibold)
                Spacer()
                Image(systemName: "ellipsis").foregroundColor(.secondary)
            }
            .padding()

            Divider()

            // Body
            Text("Configure your project settings, permissions, and integrations from this panel.")
                .font(.subheadline)
                .foregroundColor(.secondary)
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding()

            Divider()

            // Footer
            HStack(spacing: 8) {
                Button("Save Changes") { }
                    .buttonStyle(.borderedProminent).tint(.teal)
                Button("Cancel") { }
                    .buttonStyle(.bordered).tint(.secondary)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding()
        }
        .background(Color(.systemBackground))
        .cornerRadius(16)
        .overlay(RoundedRectangle(cornerRadius: 16).stroke(Color(.systemGray5), lineWidth: 1))
        .shadow(color: .black.opacity(0.05), radius: 4, y: 2)
        .padding()
    }
}`}
        className="mb-5"
        previewClassName="block p-6"
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h4 className="text-slate-900 dark:text-slate-100 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9375rem' }}>
                Project Settings
              </h4>
              <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                <MoreHorizontal size={18} />
              </button>
            </div>
          </CardHeader>
          <CardBody>
            <p className="text-slate-500 dark:text-slate-400 m-0" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', lineHeight: 1.6 }}>
              Configure your project settings, permissions, and integrations from this panel.
            </p>
          </CardBody>
          <CardFooter>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-xl text-white text-sm transition-all hover:opacity-90"
                      style={{ background: 'linear-gradient(135deg, #0D9488, #0F766E)', fontFamily: 'var(--font-sans)', fontWeight: 500, border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}>
                Save Changes
              </button>
              <button className="px-4 py-2 rounded-xl text-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                      style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}>
                Cancel
              </button>
            </div>
          </CardFooter>
        </Card>
      </ComponentPreview>

      {/* Variants */}
      <ComponentPreview
        title="Variants"
        description="Default, elevated, bordered, and ghost card styles."
        code={`<Card variant="default">Default</Card>
<Card variant="elevated">Elevated</Card>
<Card variant="bordered">Bordered</Card>
<Card variant="ghost">Ghost</Card>`}
        reactNativeCode={`import { View, Text, StyleSheet } from 'react-native';

const cardVariants = {
  default:  { backgroundColor: '#fff', borderWidth: 1, borderColor: '#E2E8F0', elevation: 2 },
  elevated: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#F1F5F9', elevation: 8,
              shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8 },
  bordered: { backgroundColor: '#fff', borderWidth: 2, borderColor: '#99F6E4', elevation: 0 },
  ghost:    { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#F1F5F9', elevation: 0 },
};

function Card({ variant = 'default', title, subtitle }) {
  return (
    <View style={[styles.base, cardVariants[variant]]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base:     { borderRadius: 16, padding: 16, flex: 1 },
  title:    { fontSize: 13, fontWeight: '600', color: '#0F172A', textTransform: 'capitalize', marginBottom: 2 },
  subtitle: { fontSize: 12, color: '#94A3B8' },
});

<View style={{ flexDirection: 'row', gap: 8 }}>
  {['default', 'elevated', 'bordered', 'ghost'].map(v => (
    <Card key={v} variant={v} title={v} subtitle="Card style" />
  ))}
</View>`}
        androidCode={`<!-- Default card -->
<com.google.android.material.card.MaterialCardView
    android:layout_width="0dp"
    android:layout_height="wrap_content"
    android:layout_weight="1"
    app:cardCornerRadius="16dp"
    app:cardElevation="2dp">
    <TextView android:padding="16dp" android:text="Default" />
</com.google.android.material.card.MaterialCardView>

<!-- Elevated card -->
<com.google.android.material.card.MaterialCardView
    android:layout_width="0dp"
    android:layout_height="wrap_content"
    android:layout_weight="1"
    app:cardCornerRadius="16dp"
    app:cardElevation="8dp">
    <TextView android:padding="16dp" android:text="Elevated" />
</com.google.android.material.card.MaterialCardView>

<!-- Outlined/Bordered card -->
<com.google.android.material.card.MaterialCardView
    android:layout_width="0dp"
    android:layout_height="wrap_content"
    android:layout_weight="1"
    app:cardCornerRadius="16dp"
    app:cardElevation="0dp"
    app:strokeColor="@color/teal_300"
    app:strokeWidth="2dp">
    <TextView android:padding="16dp" android:text="Bordered" />
</com.google.android.material.card.MaterialCardView>`}
        iosCode={`import SwiftUI

struct CardVariantsView: View {
    var body: some View {
        HStack(spacing: 8) {
            CardVariant(title: "Default",  bg: .white,   border: Color(.systemGray5), shadow: 0.05)
            CardVariant(title: "Elevated", bg: .white,   border: Color(.systemGray6), shadow: 0.12)
            CardVariant(title: "Bordered", bg: .white,   border: .teal,               shadow: 0)
            CardVariant(title: "Ghost",    bg: Color(.systemGray6), border: Color(.systemGray5), shadow: 0)
        }
        .padding()
    }
}

struct CardVariant: View {
    let title: String; let bg: Color; let border: Color; let shadow: Double
    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(title).font(.caption).fontWeight(.semibold)
            Text("Card style").font(.caption2).foregroundColor(.secondary)
        }
        .padding(12)
        .frame(maxWidth: .infinity)
        .background(bg)
        .overlay(RoundedRectangle(cornerRadius: 12).stroke(border, lineWidth: 1.5))
        .cornerRadius(12)
        .shadow(color: .black.opacity(shadow), radius: 4, y: 2)
    }
}`}
        className="mb-5"
        previewClassName="gap-3 items-stretch"
      >
        {(['default', 'elevated', 'bordered', 'ghost'] as const).map(v => (
          <Card key={v} variant={v} className="flex-1 min-w-32">
            <CardBody>
              <p className="text-slate-900 dark:text-slate-100 mb-1 m-0" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.8125rem', textTransform: 'capitalize' }}>{v}</p>
              <p className="text-slate-400 dark:text-slate-500 m-0" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem' }}>Card style</p>
            </CardBody>
          </Card>
        ))}
      </ComponentPreview>

      {/* Hoverable */}
      <ComponentPreview
        title="Interactive Cards"
        description="Hoverable cards for clickable surfaces like links or navigation."
        code={`<Card hoverable>
  <Card.Body>
    <Icon />
    <h4>Analytics</h4>
    <p>View your metrics</p>
  </Card.Body>
</Card>`}
        reactNativeCode={`import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { TrendingUp, Star, Heart } from 'lucide-react-native';

const cards = [
  { icon: TrendingUp, label: 'Analytics', sub: 'View your metrics', iconColor: '#0D9488', bg: '#F0FDFA' },
  { icon: Star,       label: 'Favorites', sub: 'Saved items',       iconColor: '#D97706', bg: '#FFFBEB' },
  { icon: Heart,      label: 'Liked',     sub: 'Your reactions',    iconColor: '#E11D48', bg: '#FFF1F2' },
];

function InteractiveCard({ icon: Icon, label, sub, iconColor, bg }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.card}
    >
      <View style={[styles.iconWrap, { backgroundColor: bg }]}>
        <Icon size={18} color={iconColor} />
      </View>
      <Text style={styles.title}>{label}</Text>
      <Text style={styles.sub}>{sub}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card:     { flex: 1, borderRadius: 16, padding: 16, backgroundColor: '#fff',
              borderWidth: 1, borderColor: '#E2E8F0', elevation: 2 },
  iconWrap: { width: 36, height: 36, borderRadius: 10, alignItems: 'center',
              justifyContent: 'center', marginBottom: 12 },
  title:    { fontSize: 14, fontWeight: '600', color: '#0F172A', marginBottom: 2 },
  sub:      { fontSize: 12, color: '#94A3B8' },
});`}
        androidCode={`<!-- Clickable card with ripple effect -->
<com.google.android.material.card.MaterialCardView
    android:id="@+id/cardAnalytics"
    android:layout_width="0dp"
    android:layout_height="wrap_content"
    android:layout_weight="1"
    android:clickable="true"
    android:focusable="true"
    app:cardCornerRadius="16dp"
    app:cardElevation="2dp"
    app:rippleColor="@color/teal_100">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:padding="16dp">

        <ImageView
            android:layout_width="36dp"
            android:layout_height="36dp"
            android:src="@drawable/ic_trending_up"
            android:background="@drawable/bg_teal_icon"
            android:padding="8dp" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Analytics"
            android:textSize="14sp"
            android:textStyle="bold"
            android:layout_marginTop="12dp" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="View your metrics"
            android:textSize="12sp"
            android:textColor="@color/slate_400" />
    </LinearLayout>
</com.google.android.material.card.MaterialCardView>`}
        iosCode={`import SwiftUI

struct InteractiveCardsView: View {
    let cards = [
        (icon: "chart.line.uptrend.xyaxis", label: "Analytics", sub: "View your metrics", color: Color.teal),
        (icon: "star.fill",                 label: "Favorites",  sub: "Saved items",       color: Color.orange),
        (icon: "heart.fill",                label: "Liked",      sub: "Your reactions",    color: Color.red),
    ]

    var body: some View {
        HStack(spacing: 12) {
            ForEach(cards, id: \\.label) { card in
                Button {  } label: {
                    VStack(alignment: .leading, spacing: 8) {
                        Image(systemName: card.icon)
                            .font(.subheadline)
                            .foregroundColor(card.color)
                            .padding(8)
                            .background(card.color.opacity(0.1))
                            .cornerRadius(8)
                        Text(card.label).font(.subheadline).fontWeight(.semibold).foregroundColor(.primary)
                        Text(card.sub).font(.caption).foregroundColor(.secondary)
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(16)
                }
                .buttonStyle(.plain)
                .background(Color(.systemBackground))
                .cornerRadius(16)
                .overlay(RoundedRectangle(cornerRadius: 16).stroke(Color(.systemGray5), lineWidth: 1))
                .shadow(color: .black.opacity(0.05), radius: 4, y: 2)
            }
        }
        .padding()
    }
}`}
        className="mb-5"
        previewClassName="gap-4 items-stretch"
      >
        {[
          { icon: TrendingUp, label: 'Analytics', sub: 'View your metrics', color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-50 dark:bg-teal-900/30' },
          { icon: Star, label: 'Favorites', sub: 'Saved items', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/30' },
          { icon: Heart, label: 'Liked', sub: 'Your reactions', color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-900/30' },
        ].map(item => (
          <Card key={item.label} hoverable className="flex-1 min-w-32">
            <CardBody>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${item.bg}`}>
                <item.icon size={18} className={item.color} />
              </div>
              <p className="text-slate-900 dark:text-slate-100 mb-0.5 m-0" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.875rem' }}>
                {item.label}
              </p>
              <p className="text-slate-400 dark:text-slate-500 m-0" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.775rem' }}>
                {item.sub}
              </p>
            </CardBody>
          </Card>
        ))}
      </ComponentPreview>

      {/* Stat card */}
      <ComponentPreview
        title="Stat Card"
        description="Data visualization cards for dashboards."
        code={`<Card>
  <Card.Body>
    <p>Total Revenue</p>
    <h2>$48,295</h2>
    <Badge variant="success">+12.5%</Badge>
  </Card.Body>
</Card>`}
        reactNativeCode={`import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp } from 'lucide-react-native';

function StatCard({ label, value, change, color }) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color }]}>{value}</Text>
      <View style={styles.badge}>
        <TrendingUp size={10} color="#065F46" />
        <Text style={styles.change}>{change}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card:   { flex: 1, borderRadius: 16, padding: 16, backgroundColor: '#fff',
            borderWidth: 1, borderColor: '#E2E8F0', elevation: 2 },
  label:  { fontSize: 12, color: '#64748B', marginBottom: 8 },
  value:  { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  badge:  { flexDirection: 'row', alignItems: 'center', gap: 4,
            paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999,
            backgroundColor: '#ECFDF5', alignSelf: 'flex-start' },
  change: { fontSize: 11, fontWeight: '600', color: '#065F46' },
});

<View style={{ flexDirection: 'row', gap: 12 }}>
  <StatCard label="Total Users" value="12,847" change="+8.2%" color="#14B8A6" />
  <StatCard label="Revenue"     value="$48,295" change="+12.5%" color="#6366F1" />
</View>`}
        androidCode={`<!-- Stat card layout -->
<com.google.android.material.card.MaterialCardView
    android:layout_width="0dp"
    android:layout_height="wrap_content"
    android:layout_weight="1"
    app:cardCornerRadius="16dp"
    app:cardElevation="2dp">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:padding="16dp">

        <TextView
            android:id="@+id/tvLabel"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Total Users"
            android:textSize="12sp"
            android:textColor="@color/slate_500" />

        <TextView
            android:id="@+id/tvValue"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="12,847"
            android:textSize="24sp"
            android:textStyle="bold"
            android:textColor="@color/teal_600"
            android:layout_marginTop="4dp" />

        <!-- Trend badge -->
        <LinearLayout
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:orientation="horizontal"
            android:background="@drawable/bg_badge_green"
            android:padding="4dp"
            android:layout_marginTop="8dp">
            <ImageView android:layout_width="10dp" android:layout_height="10dp"
                android:src="@drawable/ic_trending_up" />
            <TextView android:layout_width="wrap_content" android:layout_height="wrap_content"
                android:text="+8.2%" android:textSize="11sp" android:textColor="@color/green_800" />
        </LinearLayout>
    </LinearLayout>
</com.google.android.material.card.MaterialCardView>`}
        iosCode={`import SwiftUI

struct StatCardsView: View {
    let stats = [
        (label: "Total Users", value: "12,847", change: "+8.2%",  color: Color.teal),
        (label: "Revenue",     value: "$48,295", change: "+12.5%", color: Color.indigo),
        (label: "Bounce Rate", value: "24.3%",   change: "-3.1%",  color: Color.orange),
    ]

    var body: some View {
        HStack(spacing: 12) {
            ForEach(stats, id: \\.label) { stat in
                VStack(alignment: .leading, spacing: 8) {
                    Text(stat.label).font(.caption).foregroundColor(.secondary)
                    Text(stat.value)
                        .font(.title2).fontWeight(.bold)
                        .foregroundColor(stat.color)
                    HStack(spacing: 4) {
                        Image(systemName: "arrow.up.right")
                            .font(.system(size: 9, weight: .bold))
                        Text(stat.change).font(.system(size: 11, weight: .semibold))
                    }
                    .foregroundColor(.green)
                    .padding(.horizontal, 8).padding(.vertical, 3)
                    .background(Color.green.opacity(0.1))
                    .clipShape(Capsule())
                }
                .padding(16)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(Color(.systemBackground))
                .cornerRadius(16)
                .overlay(RoundedRectangle(cornerRadius: 16).stroke(Color(.systemGray5), lineWidth: 1))
            }
        }
        .padding()
    }
}`}
        className="mb-8"
        previewClassName="gap-4 items-stretch"
      >
        {[
          { label: 'Total Users', value: '12,847', change: '+8.2%', changePos: true, color: '#14B8A6' },
          { label: 'Revenue', value: '$48,295', change: '+12.5%', changePos: true, color: '#6366F1' },
          { label: 'Bounce Rate', value: '24.3%', change: '-3.1%', changePos: true, color: '#F59E0B' },
        ].map(stat => (
          <Card key={stat.label} className="flex-1 min-w-36">
            <CardBody>
              <p className="text-slate-500 dark:text-slate-400 mb-2 m-0" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem' }}>{stat.label}</p>
              <p className="text-slate-900 dark:text-slate-100 mb-2 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem' }}>{stat.value}</p>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 600 }}>
                <TrendingUp size={10} />{stat.change}
              </span>
            </CardBody>
          </Card>
        ))}
      </ComponentPreview>

      <div className="mb-8">
        <h2 className="text-slate-900 dark:text-white mb-4 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>Import</h2>
        <CodeBlock code={`import { Card, CardHeader, CardBody, CardFooter } from '@breathe-ui/core';`} language="tsx" />
      </div>

      <PropsTable props={cardProps} />

      <PageNavigation />
    </div>
  );
}
