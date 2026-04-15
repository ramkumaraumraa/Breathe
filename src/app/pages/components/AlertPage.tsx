import { useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';
import { PageHeader } from '../../components/shared/PageHeader';
import { ComponentPreview } from '../../components/shared/ComponentPreview';
import { PropsTable } from '../../components/shared/PropsTable';
import { CodeBlock } from '../../components/shared/CodeBlock';
import { PageNavigation } from '../../components/shared/PageNavigation';

type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

const alertConfig: Record<AlertVariant, {
  icon: React.ElementType;
  bg: string;
  border: string;
  iconColor: string;
  titleColor: string;
  textColor: string;
}> = {
  info: {
    icon: Info,
    bg: 'bg-sky-50 dark:bg-sky-900/20',
    border: 'border-sky-200 dark:border-sky-800/60',
    iconColor: 'text-sky-500 dark:text-sky-400',
    titleColor: 'text-sky-800 dark:text-sky-300',
    textColor: 'text-sky-700 dark:text-sky-400',
  },
  success: {
    icon: CheckCircle2,
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    border: 'border-emerald-200 dark:border-emerald-800/60',
    iconColor: 'text-emerald-500 dark:text-emerald-400',
    titleColor: 'text-emerald-800 dark:text-emerald-300',
    textColor: 'text-emerald-700 dark:text-emerald-400',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-200 dark:border-amber-800/60',
    iconColor: 'text-amber-500 dark:text-amber-400',
    titleColor: 'text-amber-800 dark:text-amber-300',
    textColor: 'text-amber-700 dark:text-amber-400',
  },
  danger: {
    icon: XCircle,
    bg: 'bg-rose-50 dark:bg-rose-900/20',
    border: 'border-rose-200 dark:border-rose-800/60',
    iconColor: 'text-rose-500 dark:text-rose-400',
    titleColor: 'text-rose-800 dark:text-rose-300',
    textColor: 'text-rose-700 dark:text-rose-400',
  },
};

function Alert({ variant = 'info', title, children, dismissible = false, onDismiss, action }: {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  action?: { label: string; onClick: () => void };
}) {
  const config = alertConfig[variant];
  const Icon = config.icon;

  return (
    <div className={`flex gap-3 p-4 rounded-xl border ${config.bg} ${config.border}`}>
      <Icon size={18} className={`shrink-0 mt-0.5 ${config.iconColor}`} />
      <div className="flex-1 min-w-0">
        {title && (
          <p className={`mb-0.5 m-0 ${config.titleColor}`} style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.875rem' }}>
            {title}
          </p>
        )}
        <div className={config.textColor} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', lineHeight: 1.6 }}>
          {children}
        </div>
        {action && (
          <button
            onClick={action.onClick}
            className={`mt-2 ${config.titleColor} underline underline-offset-2 hover:opacity-80 transition-opacity`}
            style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 500, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            {action.label}
          </button>
        )}
      </div>
      {dismissible && (
        <button
          onClick={onDismiss}
          className={`shrink-0 ${config.iconColor} opacity-60 hover:opacity-100 transition-opacity`}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

function DismissibleAlert() {
  const [visible, setVisible] = useState(true);
  if (!visible) return (
    <button onClick={() => setVisible(true)}
            className="px-3 py-1.5 rounded-lg text-sm bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, border: 'none', cursor: 'pointer' }}>
      Show alert
    </button>
  );
  return (
    <Alert variant="info" title="New update available" dismissible onDismiss={() => setVisible(false)}>
      Version 2.4.0 includes bug fixes and performance improvements.
    </Alert>
  );
}

const alertProps = [
  { name: 'variant', type: "'info' | 'success' | 'warning' | 'danger'", default: "'info'", description: 'Semantic variant determining color and icon.' },
  { name: 'title', type: 'string', description: 'Bold title text at the top of the alert.' },
  { name: 'dismissible', type: 'boolean', default: 'false', description: 'Shows an X button to dismiss the alert.' },
  { name: 'onDismiss', type: '() => void', description: 'Callback fired when the dismiss button is clicked.' },
  { name: 'action', type: '{ label: string; onClick: () => void }', description: 'Optional action link at the bottom of the alert.' },
  { name: 'children', type: 'ReactNode', required: true, description: 'Alert message content.' },
];

export function AlertPage() {
  return (
    <div className="max-w-3xl px-6 lg:px-10 py-10">
      <PageHeader
        title="Alert"
        description="Alerts display important messages to users. They can be informational, confirmatory, cautionary, or critical — always with a clear visual indicator."
        section="Components"
        badge="Stable"
      />

      <ComponentPreview
        title="Variants"
        description="Four semantic variants: info, success, warning, and danger."
        code={`<Alert variant="info">New feature available.</Alert>
<Alert variant="success">Changes saved successfully!</Alert>
<Alert variant="warning">This action is irreversible.</Alert>
<Alert variant="danger">Failed to connect to server.</Alert>`}
        reactNativeCode={`import { View, Text, StyleSheet } from 'react-native';
import { Info, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react-native';

const alertConfig = {
  info:    { icon: Info,          bg: '#F0F9FF', border: '#BAE6FD', iconColor: '#0EA5E9', textColor: '#0369A1' },
  success: { icon: CheckCircle2, bg: '#ECFDF5', border: '#6EE7B7', iconColor: '#10B981', textColor: '#065F46' },
  warning: { icon: AlertTriangle, bg: '#FFFBEB', border: '#FCD34D', iconColor: '#F59E0B', textColor: '#92400E' },
  danger:  { icon: XCircle,       bg: '#FFF1F2', border: '#FDA4AF', iconColor: '#F43F5E', textColor: '#9F1239' },
};

function Alert({ variant = 'info', children }) {
  const config = alertConfig[variant];
  const Icon = config.icon;
  return (
    <View style={[styles.base, { backgroundColor: config.bg, borderColor: config.border }]}>
      <Icon size={16} color={config.iconColor} style={styles.icon} />
      <Text style={[styles.text, { color: config.textColor }]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: { flexDirection: 'row', gap: 10, padding: 14, borderRadius: 12, borderWidth: 1 },
  icon: { marginTop: 1, flexShrink: 0 },
  text: { flex: 1, fontSize: 13, lineHeight: 20 },
});

// Usage
<View style={{ gap: 10 }}>
  <Alert variant="info">This is an informational message.</Alert>
  <Alert variant="success">Your changes have been saved.</Alert>
  <Alert variant="warning">This action cannot be undone.</Alert>
  <Alert variant="danger">Failed to connect to server.</Alert>
</View>`}
        androidCode={`<!-- Using MaterialAlertDialogBuilder for banner-style alerts -->
<!-- Or custom layout: -->
<LinearLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="horizontal"
    android:background="@drawable/bg_alert_info"
    android:padding="14dp"
    android:gap="10dp">

    <ImageView
        android:layout_width="18dp"
        android:layout_height="18dp"
        android:src="@drawable/ic_info"
        android:tint="@color/sky_500"
        android:layout_marginTop="1dp" />

    <TextView
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_weight="1"
        android:text="This is an informational message."
        android:textSize="13sp"
        android:textColor="@color/sky_700" />
</LinearLayout>

// bg_alert_info.xml
<shape xmlns:android="..." android:shape="rectangle">
    <solid android:color="#F0F9FF" />
    <stroke android:width="1dp" android:color="#BAE6FD" />
    <corners android:radius="12dp" />
</shape>

// In Kotlin — use Snackbar for transient messages:
Snackbar.make(view, "Changes saved successfully!", Snackbar.LENGTH_SHORT)
    .setBackgroundTint(ContextCompat.getColor(context, R.color.emerald_500))
    .show()`}
        iosCode={`import SwiftUI

struct AlertVariantsView: View {
    var body: some View {
        VStack(spacing: 10) {
            AlertBanner(variant: .info,    message: "This is an informational message.")
            AlertBanner(variant: .success, message: "Your changes have been saved.")
            AlertBanner(variant: .warning, message: "This action cannot be undone.")
            AlertBanner(variant: .danger,  message: "Failed to connect to server.")
        }
        .padding()
    }
}

enum AlertVariant { case info, success, warning, danger }

struct AlertBanner: View {
    let variant: AlertVariant
    let message: String

    var config: (icon: String, color: Color) {
        switch variant {
        case .info:    return ("info.circle.fill",         .blue)
        case .success: return ("checkmark.circle.fill",    .green)
        case .warning: return ("exclamationmark.triangle.fill", .orange)
        case .danger:  return ("xmark.circle.fill",        .red)
        }
    }

    var body: some View {
        HStack(alignment: .top, spacing: 10) {
            Image(systemName: config.icon)
                .foregroundColor(config.color)
                .padding(.top, 1)
            Text(message)
                .font(.subheadline)
                .foregroundColor(config.color.opacity(0.85))
            Spacer()
        }
        .padding(14)
        .background(config.color.opacity(0.08))
        .overlay(RoundedRectangle(cornerRadius: 12).stroke(config.color.opacity(0.25), lineWidth: 1))
        .cornerRadius(12)
    }
}`}
        className="mb-5"
        previewClassName="flex-col items-stretch gap-3 p-6"
      >
        <Alert variant="info">This is an informational message. Learn more about this feature.</Alert>
        <Alert variant="success">Your changes have been saved successfully. The data is now live.</Alert>
        <Alert variant="warning">This action cannot be undone. Proceed with caution.</Alert>
        <Alert variant="danger">Failed to delete the item. Please try again later.</Alert>
      </ComponentPreview>

      <ComponentPreview
        title="With Title"
        description="Alerts with a bold title for added clarity."
        code={`<Alert variant="success" title="Payment successful">
  Your plan has been upgraded to Pro.
</Alert>`}
        reactNativeCode={`import { View, Text } from 'react-native';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react-native';

function Alert({ variant = 'info', title, children }) {
  const config = {
    success: { icon: CheckCircle2, bg: '#ECFDF5', border: '#6EE7B7', iconColor: '#10B981',
               titleColor: '#065F46', textColor: '#047857' },
    warning: { icon: AlertTriangle, bg: '#FFFBEB', border: '#FCD34D', iconColor: '#F59E0B',
               titleColor: '#78350F', textColor: '#92400E' },
    danger:  { icon: XCircle, bg: '#FFF1F2', border: '#FDA4AF', iconColor: '#F43F5E',
               titleColor: '#881337', textColor: '#9F1239' },
  }[variant];

  const Icon = config.icon;
  return (
    <View style={{ flexDirection: 'row', gap: 10, padding: 14, borderRadius: 12,
                   borderWidth: 1, backgroundColor: config.bg, borderColor: config.border }}>
      <Icon size={16} color={config.iconColor} style={{ marginTop: 2 }} />
      <View style={{ flex: 1 }}>
        {title && <Text style={{ fontWeight: '600', fontSize: 14, color: config.titleColor, marginBottom: 2 }}>{title}</Text>}
        <Text style={{ fontSize: 13, color: config.textColor, lineHeight: 20 }}>{children}</Text>
      </View>
    </View>
  );
}

<View style={{ gap: 10 }}>
  <Alert variant="success" title="Payment successful">Your plan has been upgraded to Pro.</Alert>
  <Alert variant="warning" title="Storage limit approaching">You've used 90% of your storage.</Alert>
</View>`}
        androidCode={`<!-- Alert with title using LinearLayout -->
<LinearLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="horizontal"
    android:background="@drawable/bg_alert_success"
    android:padding="14dp"
    android:gap="10dp">

    <ImageView
        android:layout_width="18dp"
        android:layout_height="18dp"
        android:src="@drawable/ic_check_circle"
        android:tint="@color/emerald_500"
        android:layout_marginTop="2dp" />

    <LinearLayout
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_weight="1"
        android:orientation="vertical">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Payment successful"
            android:textStyle="bold"
            android:textSize="14sp"
            android:textColor="@color/emerald_800" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Your plan has been upgraded to Pro."
            android:textSize="13sp"
            android:textColor="@color/emerald_700"
            android:layout_marginTop="2dp" />
    </LinearLayout>
</LinearLayout>`}
        iosCode={`import SwiftUI

struct TitledAlertView: View {
    var body: some View {
        VStack(spacing: 10) {
            TitledAlertBanner(
                variant: .success,
                title: "Payment successful",
                message: "Your plan has been upgraded to Pro."
            )
            TitledAlertBanner(
                variant: .warning,
                title: "Storage limit approaching",
                message: "You've used 90% of your 5GB storage."
            )
            TitledAlertBanner(
                variant: .danger,
                title: "Account suspended",
                message: "Your account has been temporarily suspended."
            )
        }
        .padding()
    }
}

struct TitledAlertBanner: View {
    let variant: AlertVariant
    let title: String
    let message: String

    var config: (icon: String, color: Color) {
        switch variant {
        case .success: return ("checkmark.circle.fill", .green)
        case .warning: return ("exclamationmark.triangle.fill", .orange)
        case .danger:  return ("xmark.circle.fill", .red)
        default:       return ("info.circle.fill", .blue)
        }
    }

    var body: some View {
        HStack(alignment: .top, spacing: 10) {
            Image(systemName: config.icon).foregroundColor(config.color).padding(.top, 2)
            VStack(alignment: .leading, spacing: 2) {
                Text(title).font(.subheadline).fontWeight(.semibold)
                    .foregroundColor(config.color)
                Text(message).font(.subheadline)
                    .foregroundColor(config.color.opacity(0.75))
            }
            Spacer()
        }
        .padding(14)
        .background(config.color.opacity(0.08))
        .overlay(RoundedRectangle(cornerRadius: 12).stroke(config.color.opacity(0.25), lineWidth: 1))
        .cornerRadius(12)
    }
}`}
        className="mb-5"
        previewClassName="flex-col items-stretch gap-3 p-6"
      >
        <Alert variant="success" title="Payment successful">
          Your plan has been upgraded to Pro. You now have access to all premium features.
        </Alert>
        <Alert variant="warning" title="Storage limit approaching">
          You've used 90% of your 5GB storage. Upgrade your plan to get more space.
        </Alert>
        <Alert variant="danger" title="Account suspended">
          Your account has been temporarily suspended due to unusual activity.
        </Alert>
      </ComponentPreview>

      <ComponentPreview
        title="Dismissible"
        description="Users can close dismissible alerts."
        code={`const [visible, setVisible] = useState(true);

{visible && (
  <Alert
    variant="info"
    title="New update available"
    dismissible
    onDismiss={() => setVisible(false)}
  >
    Version 2.4.0 is ready to install.
  </Alert>
)}`}
        reactNativeCode={`import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Info, X } from 'lucide-react-native';

function DismissibleAlert({ variant = 'info', title, children }) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <View style={{ flexDirection: 'row', gap: 10, padding: 14, borderRadius: 12,
                   backgroundColor: '#F0F9FF', borderWidth: 1, borderColor: '#BAE6FD' }}>
      <Info size={16} color="#0EA5E9" style={{ marginTop: 2 }} />
      <View style={{ flex: 1 }}>
        {title && <Text style={{ fontWeight: '600', fontSize: 14, color: '#0369A1', marginBottom: 2 }}>{title}</Text>}
        <Text style={{ fontSize: 13, color: '#0369A1', lineHeight: 20 }}>{children}</Text>
      </View>
      <TouchableOpacity onPress={() => setVisible(false)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
        <X size={16} color="#0EA5E9" />
      </TouchableOpacity>
    </View>
  );
}

<DismissibleAlert title="New update available">
  Version 2.4.0 includes bug fixes and performance improvements.
</DismissibleAlert>`}
        androidCode={`// Dismissible banner using Snackbar (built-in dismiss action):
Snackbar.make(view, "New update available", Snackbar.LENGTH_INDEFINITE)
    .setAction("Dismiss") { /* dismiss */ }
    .setActionTextColor(ContextCompat.getColor(context, R.color.sky_400))
    .show()

// Or custom dismissible view in Kotlin:
val alertView = layoutInflater.inflate(R.layout.view_alert_dismissible, container, false)
alertView.findViewById<ImageButton>(R.id.btnDismiss).setOnClickListener {
    alertView.animate().alpha(0f).setDuration(200).withEndAction {
        container.removeView(alertView)
    }.start()
}
container.addView(alertView)`}
        iosCode={`import SwiftUI

struct DismissibleAlertView: View {
    @State private var isVisible = true

    var body: some View {
        VStack {
            if isVisible {
                HStack(alignment: .top, spacing: 10) {
                    Image(systemName: "info.circle.fill").foregroundColor(.blue).padding(.top, 2)
                    VStack(alignment: .leading, spacing: 2) {
                        Text("New update available")
                            .font(.subheadline).fontWeight(.semibold).foregroundColor(.blue)
                        Text("Version 2.4.0 includes bug fixes and performance improvements.")
                            .font(.subheadline).foregroundColor(.blue.opacity(0.75))
                    }
                    Spacer()
                    Button {
                        withAnimation { isVisible = false }
                    } label: {
                        Image(systemName: "xmark")
                            .font(.caption).fontWeight(.semibold)
                            .foregroundColor(.blue.opacity(0.6))
                    }
                    .padding(.top, 2)
                }
                .padding(14)
                .background(Color.blue.opacity(0.08))
                .overlay(RoundedRectangle(cornerRadius: 12).stroke(Color.blue.opacity(0.25), lineWidth: 1))
                .cornerRadius(12)
                .transition(.opacity)
            } else {
                Button("Show alert") { withAnimation { isVisible = true } }
                    .buttonStyle(.bordered)
            }
        }
        .padding()
    }
}`}
        className="mb-5"
        previewClassName="flex-col items-stretch p-6"
      >
        <DismissibleAlert />
      </ComponentPreview>

      <ComponentPreview
        title="With Action"
        description="Alerts with a clickable action link."
        code={`<Alert
  variant="warning"
  title="API key expiring"
  action={{ label: "Renew now", onClick: handleRenew }}
>
  Your API key expires in 3 days.
</Alert>`}
        reactNativeCode={`import { View, Text, TouchableOpacity } from 'react-native';
import { AlertTriangle, Info } from 'lucide-react-native';

function ActionAlert({ variant, title, action, children }) {
  const configs = {
    warning: { icon: AlertTriangle, bg: '#FFFBEB', border: '#FCD34D',
               iconColor: '#F59E0B', titleColor: '#78350F', textColor: '#92400E' },
    info:    { icon: Info, bg: '#F0F9FF', border: '#BAE6FD',
               iconColor: '#0EA5E9', titleColor: '#0C4A6E', textColor: '#0369A1' },
  }[variant];

  const Icon = configs.icon;
  return (
    <View style={{ flexDirection: 'row', gap: 10, padding: 14, borderRadius: 12,
                   borderWidth: 1, backgroundColor: configs.bg, borderColor: configs.border }}>
      <Icon size={16} color={configs.iconColor} style={{ marginTop: 2 }} />
      <View style={{ flex: 1 }}>
        {title && <Text style={{ fontWeight: '600', fontSize: 14, color: configs.titleColor, marginBottom: 2 }}>{title}</Text>}
        <Text style={{ fontSize: 13, color: configs.textColor, lineHeight: 20 }}>{children}</Text>
        {action && (
          <TouchableOpacity onPress={action.onClick} style={{ marginTop: 8 }}>
            <Text style={{ fontSize: 13, fontWeight: '500', color: configs.titleColor,
                           textDecorationLine: 'underline' }}>{action.label}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

<ActionAlert variant="warning" title="API key expiring soon"
  action={{ label: 'Renew now →', onClick: () => {} }}>
  Your API key expires in 3 days.
</ActionAlert>`}
        androidCode={`// Alert with action using Snackbar (recommended for transient messages):
Snackbar.make(view, "API key expires in 3 days.", Snackbar.LENGTH_LONG)
    .setAction("Renew Now") { /* navigate to renewal */ }
    .setBackgroundTint(ContextCompat.getColor(context, R.color.amber_100))
    .setTextColor(ContextCompat.getColor(context, R.color.amber_900))
    .setActionTextColor(ContextCompat.getColor(context, R.color.amber_700))
    .show()

// Or use MaterialAlertDialogBuilder for persistent alerts with actions:
MaterialAlertDialogBuilder(context)
    .setTitle("API key expiring soon")
    .setMessage("Your API key expires in 3 days. Renew it to avoid interruption.")
    .setPositiveButton("Renew Now") { _, _ -> /* handle */ }
    .setNegativeButton("Dismiss") { dialog, _ -> dialog.dismiss() }
    .show()`}
        iosCode={`import SwiftUI

struct ActionAlertView: View {
    var body: some View {
        VStack(spacing: 10) {
            HStack(alignment: .top, spacing: 10) {
                Image(systemName: "exclamationmark.triangle.fill").foregroundColor(.orange).padding(.top, 2)
                VStack(alignment: .leading, spacing: 4) {
                    Text("API key expiring soon")
                        .font(.subheadline).fontWeight(.semibold).foregroundColor(.orange)
                    Text("Your API key expires in 3 days. Renew it to avoid service interruption.")
                        .font(.subheadline).foregroundColor(.orange.opacity(0.8))
                    Button("Renew now →") { }
                        .font(.subheadline).fontWeight(.medium)
                        .foregroundColor(.orange)
                }
                Spacer()
            }
            .padding(14)
            .background(Color.orange.opacity(0.08))
            .overlay(RoundedRectangle(cornerRadius: 12).stroke(Color.orange.opacity(0.25), lineWidth: 1))
            .cornerRadius(12)
        }
        .padding()
    }
}`}
        className="mb-8"
        previewClassName="flex-col items-stretch gap-3 p-6"
      >
        <Alert variant="warning" title="API key expiring soon" action={{ label: 'Renew now →', onClick: () => {} }}>
          Your API key expires in 3 days. Renew it to avoid service interruption.
        </Alert>
        <Alert variant="info" title="Scheduled maintenance" action={{ label: 'View details →', onClick: () => {} }}>
          Planned maintenance on Feb 28 from 2–4 AM UTC.
        </Alert>
      </ComponentPreview>

      <div className="mb-8">
        <h2 className="text-slate-900 dark:text-white mb-4 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>Import</h2>
        <CodeBlock code={`import { Alert } from '@breathe-ui/core';`} language="tsx" />
      </div>

      <PropsTable props={alertProps} />

      <PageNavigation />
    </div>
  );
}
