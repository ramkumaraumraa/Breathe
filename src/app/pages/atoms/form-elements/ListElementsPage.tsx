import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { ChevronRight, Settings, User, Shield, CreditCard, Check } from 'lucide-react'
import { useProductTheme } from '@/app/context/ProductThemeContext'

const ACTION_ITEMS = [
  { label: 'Profile Settings', sub: 'Update name and avatar', icon: User, badge: 'Active' },
  { label: 'Account Security', sub: 'Two-factor auth & passwords', icon: Shield },
  { label: 'Billing & Plans', sub: 'Invoices and payments', icon: CreditCard, badge: 'New' },
  { label: 'System Integration', sub: 'Manage API access tokens', icon: Settings },
]

const CHECKLIST = [
  'Clean visual layout with consistent spacing',
  'Support dark mode out of the box',
  'Fully keyboard navigable',
]

export function ListElementsPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  return (
    <ComponentPageLayout
      title="List Elements"
      description="Standard lists, hoverable action lists, and description layouts for structured data."
      level="Atom"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Action List',
          description: 'Interactive list items with leading icons and trailing chevrons, commonly used in menus and sidebars.',
          preview: isKaayo ? (
            <div style={{
              width: '100%',
              maxWidth: 360,
              border: '2px solid var(--kayo-color-border, #3b3d3f)',
              borderRadius: 8,
              boxShadow: '4px 4px 0 #191b1f',
              backgroundColor: '#ffffff',
              overflow: 'hidden',
              fontFamily: "'DM Sans', system-ui, sans-serif",
            }}>
              {ACTION_ITEMS.map((item, idx) => (
                <button
                  key={idx}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    borderBottom: idx < ACTION_ITEMS.length - 1 ? '1px solid #e5e7eb' : 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#f9fafb' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent' }}
                >
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: 6,
                    backgroundColor: 'rgba(151, 1, 3, 0.08)',
                    color: 'var(--kayo-color-primary, #970103)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: '1px solid rgba(151, 1, 3, 0.15)',
                  }}>
                    <item.icon size={16} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: '#3b3d3f' }}>
                      <span>{item.label}</span>
                      {item.badge && (
                        <span style={{
                          padding: '1px 6px',
                          borderRadius: 3,
                          fontSize: 10,
                          fontWeight: 700,
                          backgroundColor: 'var(--kayo-color-primary, #970103)',
                          color: '#ffffff',
                          border: '1px solid var(--kayo-color-primary, #970103)',
                        }}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 12, color: '#6c6d70', marginTop: 1 }}>{item.sub}</div>
                  </div>
                  <ChevronRight size={16} color="#9ca3af" />
                </button>
              ))}
            </div>
          ) : (
            <div className="w-full max-w-sm border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 shadow-sm">
              {ACTION_ITEMS.map((item, idx) => (
                <button
                  key={idx}
                  className="w-full px-5 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-lg bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 truncate">{item.sub}</div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-300 dark:text-slate-600 group-hover:translate-x-0.5 transition-transform" />
                </button>
              ))}
            </div>
          ),
          code: {
            react: `import { ChevronRight, User, Shield, CreditCard, Settings } from 'lucide-react'

const ITEMS = [
  { label: 'Profile Settings', sub: 'Update name and avatar', icon: User },
  ...
]

<div className="border rounded-2xl divide-y bg-white">
  {ITEMS.map((item, idx) => (
    <button key={idx} className="w-full px-5 py-4 flex items-center gap-4 hover:bg-slate-50 group">
      <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
        <item.icon className="h-4 w-4" />
      </div>
      <div className="flex-1 text-left">
        <div className="text-sm font-semibold text-slate-800">{item.label}</div>
        <div className="text-xs text-slate-400">{item.sub}</div>
      </div>
      <ChevronRight className="h-4 w-4 text-slate-300 group-hover:translate-x-0.5" />
    </button>
  ))}
</div>`,
            reactNative: `import { TouchableOpacity, View, Text } from 'react-native'
import { ChevronRight } from 'lucide-react-native'

// Kaayo action list container
<View style={{
  borderWidth: 2,
  borderColor: theme.border.strong,   // #3b3d3f
  borderRadius: 8,
  overflow: 'hidden',
  boxShadow: kayoShadow.md,           // '4px 4px 0 #191b1f'
}}>
  {ITEMS.map((item, idx) => (
    <TouchableOpacity
      key={idx}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 14,
        borderBottomWidth: idx < ITEMS.length - 1 ? 1 : 0,
        borderBottomColor: '#e5e7eb',
      }}
      onPress={() => {}}
    >
      <View style={{
        width: 36, height: 36,
        borderRadius: 6,
        backgroundColor: 'rgba(151, 1, 3, 0.08)',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <item.icon size={16} color={theme.brand.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: theme.text.primary }}>
          {item.label}
        </Text>
        <Text style={{ fontSize: 12, color: theme.text.secondary }}>
          {item.sub}
        </Text>
      </View>
      <ChevronRight size={16} color="#9ca3af" />
    </TouchableOpacity>
  ))}
</View>`,
          },
        },
        {
          title: 'Checklist Items',
          description: 'Sleek list elements for documentation and simple check tasks.',
          preview: isKaayo ? (
            <div style={{
              width: '100%',
              maxWidth: 360,
              border: '2px solid var(--kayo-color-border, #3b3d3f)',
              borderRadius: 8,
              boxShadow: '4px 4px 0 #191b1f',
              backgroundColor: '#ffffff',
              padding: 20,
              fontFamily: "'DM Sans', system-ui, sans-serif",
            }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {CHECKLIST.map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: '#3b3d3f' }}>
                    <span style={{
                      width: 20,
                      height: 20,
                      borderRadius: 4,
                      border: '2px solid var(--kayo-color-primary, #970103)',
                      backgroundColor: 'var(--kayo-color-primary, #970103)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: 1,
                    }}>
                      <Check size={11} color="#ffffff" strokeWidth={3} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="w-full max-w-sm space-y-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <ul className="space-y-3">
                {CHECKLIST.map((item, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-sm text-slate-600 dark:text-slate-400">
                    <span className="w-5 h-5 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3 w-3" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ),
          code: {
            react: `import { Check } from 'lucide-react'

<ul>
  <li className="flex gap-2.5 items-start text-sm">
    <span className="w-5 h-5 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mt-0.5">
      <Check className="h-3 w-3" />
    </span>
    <span>Clean visual layout with consistent spacing</span>
  </li>
</ul>`,
            reactNative: `import { Check } from 'lucide-react-native'
import { View, Text } from 'react-native'

{CHECKLIST.map((item, idx) => (
  <View key={idx} style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start' }}>
    <View style={{
      width: 20, height: 20,
      borderRadius: 4,
      backgroundColor: theme.brand.primary,   // #970103
      alignItems: 'center', justifyContent: 'center',
      marginTop: 1,
    }}>
      <Check size={11} color="#ffffff" strokeWidth={3} />
    </View>
    <Text style={{ flex: 1, fontSize: 14, color: theme.text.primary }}>
      {item}
    </Text>
  </View>
))}`,
          },
        },
      ]}
    />
  )
}
