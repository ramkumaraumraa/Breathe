import { ReactNode } from 'react'
import { cn } from '@/app/components/ui/utils'

export interface TabBarItem {
  value: string
  label: string
  icon?: ReactNode
  badge?: number | string
}

interface TabBarProps {
  tabs: readonly TabBarItem[]
  value: string
  onChange: (value: string) => void
  className?: string
}

export function TabBar({ tabs, value, onChange, className }: TabBarProps) {
  return (
    <div className={cn('flex items-center rounded-lg bg-muted p-1 gap-0.5', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onChange(tab.value)}
          className={cn(
            'flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-medium transition-all duration-150',
            value === tab.value
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {tab.icon}
          {tab.label}
          {tab.badge !== undefined && (
            <span className="ml-0.5 rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
