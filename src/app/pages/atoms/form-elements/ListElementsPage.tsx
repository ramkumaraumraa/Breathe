import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { ChevronRight, Settings, User, Shield, CreditCard, Check } from 'lucide-react'

export function ListElementsPage() {
  return (
    <ComponentPageLayout
      title="List Elements"
      description="Standard lists, hoverable action lists, and description layouts for structured data."
      level="Atom"
      status="Stable"
      implemented={['lemniscate', 'aumraa']}
      sections={[
        {
          title: 'Action List',
          description: 'Interactive list items with leading icons and trailing chevrons, commonly used in menus and sidebars.',
          preview: (
            <div className="w-full max-w-sm border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 shadow-sm">
              {[
                { label: 'Profile Settings', sub: 'Update name and avatar', icon: User, badge: 'Active' },
                { label: 'Account Security', sub: 'Two-factor auth & passwords', icon: Shield },
                { label: 'Billing & Plans', sub: 'Invoices and payments', icon: CreditCard, badge: 'New' },
                { label: 'System Integration', sub: 'Manage API access tokens', icon: Settings }
              ].map((item, idx) => (
                <button
                  key={idx}
                  className="w-full px-5 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-lg bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                    <item.icon className="h-4.5 w-4.5" />
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
                  <ChevronRight className="h-4.5 w-4.5 text-slate-300 dark:text-slate-600 group-hover:translate-x-0.5 transition-transform" />
                </button>
              ))}
            </div>
          ),
          code: {
            react: `import { ChevronRight, User, Shield, CreditCard, Settings } from 'lucide-react'

const MENU_ITEMS = [
  { label: 'Profile Settings', sub: 'Update name and avatar', icon: User },
  ...
]

<div className="border rounded-2xl divide-y bg-white">
  {MENU_ITEMS.map((item, idx) => (
    <button key={idx} className="w-full px-5 py-4 flex items-center gap-4 hover:bg-slate-50 group">
      <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
        <item.icon className="h-4.5 w-4.5" />
      </div>
      <div className="flex-1 text-left">
        <div className="text-sm font-semibold text-slate-800">{item.label}</div>
        <div className="text-xs text-slate-400">{item.sub}</div>
      </div>
      <ChevronRight className="h-4.5 w-4.5 text-slate-300 group-hover:translate-x-0.5 transition-transform" />
    </button>
  ))}
</div>`,
          },
        },
        {
          title: 'Bullet & Checklist Items',
          description: 'Sleek list elements for documentation and simple check tasks.',
          preview: (
            <div className="w-full max-w-sm space-y-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <ul className="space-y-3">
                {[
                  'Clean visual layout with consistent spacing',
                  'Support dark mode out of the box',
                  'Fully keyboard navigable'
                ].map((item, idx) => (
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
          },
        },
      ]}
    />
  )
}
