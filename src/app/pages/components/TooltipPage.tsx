import { useState, useRef, useEffect } from 'react';
import { PageHeader } from '../../components/shared/PageHeader';
import { ComponentPreview } from '../../components/shared/ComponentPreview';
import { PropsTable } from '../../components/shared/PropsTable';
import { CodeBlock } from '../../components/shared/CodeBlock';
import { PageNavigation } from '../../components/shared/PageNavigation';
import { Info, Heart, Settings, Copy, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

function Tooltip({ children, content, placement = 'top', delay = 300 }: {
  children: React.ReactNode;
  content: React.ReactNode;
  placement?: TooltipPlacement;
  delay?: number;
}) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => { timerRef.current = setTimeout(() => setVisible(true), delay); };
  const hide = () => { if (timerRef.current) clearTimeout(timerRef.current); setVisible(false); };

  const placementStyles: Record<TooltipPlacement, { tooltip: string; arrow: string }> = {
    top: { tooltip: 'bottom-full left-1/2 -translate-x-1/2 mb-2', arrow: 'top-full left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-slate-800 dark:border-t-slate-700' },
    bottom: { tooltip: 'top-full left-1/2 -translate-x-1/2 mt-2', arrow: 'bottom-full left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-slate-800 dark:border-b-slate-700' },
    left: { tooltip: 'right-full top-1/2 -translate-y-1/2 mr-2', arrow: 'left-full top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-slate-800 dark:border-l-slate-700' },
    right: { tooltip: 'left-full top-1/2 -translate-y-1/2 ml-2', arrow: 'right-full top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-slate-800 dark:border-r-slate-700' },
  };

  return (
    <div className="relative inline-flex" onMouseEnter={show} onMouseLeave={hide}>
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.1 }}
            className={`absolute z-50 pointer-events-none ${placementStyles[placement].tooltip}`}
          >
            <div className="bg-slate-800 dark:bg-slate-700 text-white px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap"
                 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.775rem', fontWeight: 500 }}>
              {content}
            </div>
            <div className={`absolute w-0 h-0 ${placementStyles[placement].arrow}`} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function IconBtn({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <Tooltip content={label}>
      <button className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={18} />
      </button>
    </Tooltip>
  );
}

const tooltipProps = [
  { name: 'content', type: 'ReactNode', required: true, description: 'Content displayed inside the tooltip.' },
  { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Where the tooltip appears relative to the trigger.' },
  { name: 'delay', type: 'number', default: '300', description: 'Milliseconds to wait before showing the tooltip.' },
  { name: 'children', type: 'ReactNode', required: true, description: 'The trigger element.' },
];

export function TooltipPage() {
  return (
    <div className="max-w-3xl px-6 lg:px-10 py-10">
      <PageHeader
        title="Tooltip"
        description="Tooltips reveal helpful information when users hover over an element. They should be concise and used sparingly — only when extra context is genuinely needed."
        section="Components"
        badge="Stable"
      />

      <ComponentPreview
        title="Placements"
        description="Tooltips can appear on any side of the trigger element."
        code={`<Tooltip content="Top tooltip" placement="top">
  <Button>Top</Button>
</Tooltip>
<Tooltip content="Bottom tooltip" placement="bottom">
  <Button>Bottom</Button>
</Tooltip>`}
        reactNativeCode={`import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// React Native doesn't have a built-in tooltip.
// Use a popover library or implement a custom overlay:
function Tooltip({ content, children, placement = 'top' }) {
  const [visible, setVisible] = useState(false);
  return (
    <View style={{ position: 'relative' }}>
      <TouchableOpacity
        onPressIn={() => setVisible(true)}
        onPressOut={() => setVisible(false)}
      >
        {children}
      </TouchableOpacity>
      {visible && (
        <View style={{
          position: 'absolute',
          bottom: placement === 'top' ? '110%' : undefined,
          top: placement === 'bottom' ? '110%' : undefined,
          left: '50%',
          transform: [{ translateX: -60 }],
          backgroundColor: '#1E293B',
          paddingHorizontal: 12, paddingVertical: 6,
          borderRadius: 8, zIndex: 100,
          minWidth: 120, alignItems: 'center',
        }}>
          <Text style={{ color: '#fff', fontSize: 12, fontWeight: '500' }}>{content}</Text>
        </View>
      )}
    </View>
  );
}

// Popular alternatives: react-native-tooltip, @rneui/base Tooltip
// Usage:
<View style={{ flexDirection: 'row', gap: 12 }}>
  <Tooltip content="Top tooltip" placement="top">
    <TouchableOpacity style={{ padding: 10, borderRadius: 8, backgroundColor: '#F1F5F9' }}>
      <Text>Top</Text>
    </TouchableOpacity>
  </Tooltip>
  <Tooltip content="Bottom tooltip" placement="bottom">
    <TouchableOpacity style={{ padding: 10, borderRadius: 8, backgroundColor: '#F1F5F9' }}>
      <Text>Bottom</Text>
    </TouchableOpacity>
  </Tooltip>
</View>`}
        androidCode={`// Android Tooltip using PopupWindow or TooltipCompat:
// Option 1 — TooltipCompat (simple, shows on long-press):
TooltipCompat.setTooltipText(btnTop, "Top tooltip")
TooltipCompat.setTooltipText(btnBottom, "Bottom tooltip")

// Option 2 — PopupWindow for custom positioning:
fun showTooltip(anchor: View, text: String, gravity: Int = Gravity.TOP) {
    val inflater = LayoutInflater.from(context)
    val tooltipView = inflater.inflate(R.layout.tooltip_layout, null)
    tooltipView.findViewById<TextView>(R.id.tvTooltip).text = text

    val popup = PopupWindow(
        tooltipView,
        ViewGroup.LayoutParams.WRAP_CONTENT,
        ViewGroup.LayoutParams.WRAP_CONTENT
    ).apply {
        isOutsideTouchable = true
        isFocusable = false
        elevation = 8f
    }
    popup.showAsDropDown(anchor, 0, -anchor.height - 16, gravity)
    Handler(Looper.getMainLooper()).postDelayed({ popup.dismiss() }, 2000)
}

// Layout: res/layout/tooltip_layout.xml
<TextView
    android:id="@+id/tvTooltip"
    android:background="@drawable/bg_tooltip"
    android:textColor="#ffffff"
    android:textSize="12sp"
    android:padding="8dp" />`}
        iosCode={`import SwiftUI

// iOS 16+ has native popover for tooltips
struct TooltipPlacementsView: View {
    @State private var showTop = false
    @State private var showBottom = false
    @State private var showLeft = false
    @State private var showRight = false

    var body: some View {
        HStack(spacing: 12) {
            // Top tooltip
            Button("Top") { showTop.toggle() }
                .buttonStyle(.bordered)
                .popover(isPresented: $showTop, attachmentAnchor: .point(.top),
                         arrowEdge: .bottom) {
                    Text("Top tooltip").font(.caption).padding(10)
                        .presentationCompactAdaptation(.popover)
                }

            // Bottom tooltip
            Button("Bottom") { showBottom.toggle() }
                .buttonStyle(.bordered)
                .popover(isPresented: $showBottom, attachmentAnchor: .point(.bottom),
                         arrowEdge: .top) {
                    Text("Bottom tooltip").font(.caption).padding(10)
                        .presentationCompactAdaptation(.popover)
                }

            // Right tooltip
            Button("Right") { showRight.toggle() }
                .buttonStyle(.bordered)
                .popover(isPresented: $showRight, attachmentAnchor: .point(.trailing),
                         arrowEdge: .leading) {
                    Text("Right tooltip").font(.caption).padding(10)
                        .presentationCompactAdaptation(.popover)
                }
        }
        .padding()
    }
}`}
        className="mb-5"
      >
        {(['top', 'bottom', 'left', 'right'] as const).map(placement => (
          <Tooltip key={placement} content={`${placement.charAt(0).toUpperCase() + placement.slice(1)} tooltip`} placement={placement} delay={0}>
            <button className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 capitalize"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 500, cursor: 'default' }}>
              {placement}
            </button>
          </Tooltip>
        ))}
      </ComponentPreview>

      <ComponentPreview
        title="With Icons"
        description="Tooltips on icon-only buttons for accessible labeling."
        code={`<Tooltip content="Like">
  <IconButton><Heart /></IconButton>
</Tooltip>
<Tooltip content="Settings">
  <IconButton><Settings /></IconButton>
</Tooltip>`}
        reactNativeCode={`import { View, TouchableOpacity } from 'react-native';
import { Heart, Settings, Copy, Trash2 } from 'lucide-react-native';

// Using accessible accessibilityLabel as a tooltip equivalent:
function IconBtn({ icon: Icon, label, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityLabel={label}
      accessibilityHint={\`Tap to \${label.toLowerCase()}\`}
      style={{
        padding: 10, borderRadius: 10,
        backgroundColor: '#fff', borderWidth: 1, borderColor: '#E2E8F0',
        alignItems: 'center', justifyContent: 'center',
      }}
    >
      <Icon size={18} color="#64748B" />
    </TouchableOpacity>
  );
}

<View style={{ flexDirection: 'row', gap: 8 }}>
  <IconBtn icon={Heart}    label="Like"              onPress={() => {}} />
  <IconBtn icon={Settings} label="Settings"          onPress={() => {}} />
  <IconBtn icon={Copy}     label="Copy to clipboard" onPress={() => {}} />
  <IconBtn icon={Trash2}   label="Delete permanently" onPress={() => {}} />
</View>`}
        androidCode={`<!-- Icon buttons with content descriptions (screen reader + tooltip) -->
<LinearLayout android:orientation="horizontal" android:gap="8dp">

    <ImageButton
        android:id="@+id/btnLike"
        android:layout_width="44dp"
        android:layout_height="44dp"
        android:src="@drawable/ic_favorite"
        android:contentDescription="Like"
        android:tooltipText="Like"
        android:background="@drawable/btn_icon_bg" />

    <ImageButton
        android:id="@+id/btnSettings"
        android:layout_width="44dp"
        android:layout_height="44dp"
        android:src="@drawable/ic_settings"
        android:contentDescription="Settings"
        android:tooltipText="Settings"
        android:background="@drawable/btn_icon_bg" />

    <ImageButton
        android:id="@+id/btnCopy"
        android:layout_width="44dp"
        android:layout_height="44dp"
        android:src="@drawable/ic_copy"
        android:contentDescription="Copy to clipboard"
        android:tooltipText="Copy to clipboard"
        android:background="@drawable/btn_icon_bg" />
</LinearLayout>

// Note: android:tooltipText shows on long-press (API 26+)`}
        iosCode={`import SwiftUI

struct IconTooltipButtonsView: View {
    @State private var likeTooltip = false
    @State private var settingsTooltip = false

    var body: some View {
        HStack(spacing: 12) {
            // In iOS, accessibility labels serve as tooltip equivalents
            Button { } label: {
                Image(systemName: "heart.fill")
                    .font(.title3).foregroundColor(.secondary)
            }
            .padding(10)
            .background(Color(.systemBackground))
            .cornerRadius(10)
            .overlay(RoundedRectangle(cornerRadius: 10).stroke(Color(.systemGray5), lineWidth: 1))
            .accessibilityLabel("Like")
            .help("Like") // Shows tooltip on macOS/iPadOS hover

            Button { } label: {
                Image(systemName: "gearshape.fill")
                    .font(.title3).foregroundColor(.secondary)
            }
            .padding(10)
            .background(Color(.systemBackground))
            .cornerRadius(10)
            .overlay(RoundedRectangle(cornerRadius: 10).stroke(Color(.systemGray5), lineWidth: 1))
            .accessibilityLabel("Settings")
            .help("Settings")
        }
        .padding()
    }
}`}
        className="mb-5"
      >
        <IconBtn icon={Heart} label="Like" />
        <IconBtn icon={Settings} label="Settings" />
        <IconBtn icon={Copy} label="Copy to clipboard" />
        <IconBtn icon={Trash2} label="Delete permanently" />
      </ComponentPreview>

      <ComponentPreview
        title="Information Tooltip"
        description="Contextual help for labels and form fields."
        code={`<div>
  <label>API Rate Limit</label>
  <Tooltip content="Maximum requests per minute">
    <Info size={14} />
  </Tooltip>
</div>`}
        reactNativeCode={`import { View, Text, TouchableOpacity } from 'react-native';
import { Info } from 'lucide-react-native';

// Show tooltip using a small overlay on press:
function InfoTooltip({ content }) {
  const [show, setShow] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => setShow(s => !s)}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <Info size={15} color="#94A3B8" />
      {show && (
        <View style={{
          position: 'absolute', bottom: '120%', left: -60,
          backgroundColor: '#1E293B', borderRadius: 8,
          paddingHorizontal: 12, paddingVertical: 6, width: 180, zIndex: 100,
        }}>
          <Text style={{ color: '#fff', fontSize: 12 }}>{content}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

<View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
  <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151' }}>API Rate Limit</Text>
  <InfoTooltip content="Maximum number of API requests allowed per minute." />
</View>`}
        androidCode={`<!-- Info icon with tooltip text -->
<LinearLayout android:orientation="horizontal" android:gravity="center_vertical" android:gap="6dp">

    <TextView
        android:text="API Rate Limit"
        android:textSize="14sp"
        android:textStyle="bold"
        android:textColor="@color/slate_700"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content" />

    <ImageView
        android:id="@+id/ivInfo"
        android:layout_width="16dp"
        android:layout_height="16dp"
        android:src="@drawable/ic_info"
        android:tint="@color/slate_400"
        android:tooltipText="Maximum number of API requests allowed per minute."
        android:contentDescription="Help" />
</LinearLayout>

// Kotlin — show custom tooltip on click:
ivInfo.setOnClickListener { view ->
    val popup = PopupWindow(context)
    // ... configure and show
    TooltipCompat.setTooltipText(view, "Maximum requests per minute")
}`}
        iosCode={`import SwiftUI

struct InfoTooltipView: View {
    var body: some View {
        VStack(spacing: 16) {
            HStack(spacing: 6) {
                Text("API Rate Limit")
                    .font(.subheadline).fontWeight(.medium)
                Image(systemName: "info.circle")
                    .font(.caption).foregroundColor(.secondary)
                    .help("Maximum number of API requests allowed per minute.")
            }

            HStack(spacing: 6) {
                Text("Token Expiry")
                    .font(.subheadline).fontWeight(.medium)
                Image(systemName: "info.circle")
                    .font(.caption).foregroundColor(.secondary)
                    .help("Tokens expire after 30 days of inactivity.")
            }
        }
        .padding()
        // Note: .help() modifier shows a tooltip on macOS and iPadOS hover.
        // On iOS, use accessibilityHint for screen readers instead.
    }
}`}
        className="mb-8"
      >
        <div className="flex items-center gap-2">
          <span className="text-slate-700 dark:text-slate-300" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 500 }}>
            API Rate Limit
          </span>
          <Tooltip content="Maximum number of API requests allowed per minute." delay={0}>
            <Info size={15} className="text-slate-400 cursor-help" />
          </Tooltip>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-700 dark:text-slate-300" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 500 }}>
            Token Expiry
          </span>
          <Tooltip content="Tokens expire after 30 days of inactivity." placement="right" delay={0}>
            <Info size={15} className="text-slate-400 cursor-help" />
          </Tooltip>
        </div>
      </ComponentPreview>

      <div className="mb-8">
        <h2 className="text-slate-900 dark:text-white mb-4 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>Import</h2>
        <CodeBlock code={`import { Tooltip } from '@breathe-ui/core';`} language="tsx" />
      </div>

      <PropsTable props={tooltipProps} />

      <PageNavigation />
    </div>
  );
}