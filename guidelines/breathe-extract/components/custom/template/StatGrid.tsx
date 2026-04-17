import { ReactNode } from 'react'
import { cn } from '@/app/components/ui/utils'

/**
 * Responsive grid layouts used across stat card sections.
 *
 * '2col'      — single col on mobile, 2 equal cols on md+
 * '2-1'       — single col on mobile, 2/3 + 1/3 on lg+
 * '1-2'       — single col on mobile, 1/3 + 2/3 on lg+
 * '1-sidebar' — single col on mobile, main + fixed 280px sidebar on lg+
 */
export type StatGridVariant = '2col' | '2-1' | '1-2' | '1-sidebar'

const variantClasses: Record<StatGridVariant, string> = {
  '2col':      'grid gap-4 md:grid-cols-2',
  '2-1':       'grid gap-4 lg:grid-cols-[2fr_1fr]',
  '1-2':       'grid gap-4 lg:grid-cols-[1fr_2fr]',
  '1-sidebar': 'grid gap-4 lg:grid-cols-[1fr_280px]',
}

interface StatGridProps {
  children: ReactNode
  variant?: StatGridVariant
  className?: string
}

export function StatGrid({ children, variant = '2col', className }: StatGridProps) {
  return (
    <div className={cn(variantClasses[variant], className)}>
      {children}
    </div>
  )
}
