import { ReactNode } from 'react'
import { cn } from '@/app/components/shared/utils'

interface DataSectionProps {
  children: ReactNode
  className?: string
}

/**
 * Bordered card container for tables, lists, and data-dense content.
 * Padding is tighter on mobile (p-4) and relaxed on md+ (p-6).
 */
export function DataSection({ children, className }: DataSectionProps) {
  return (
    <div className={cn('rounded-lg border border-border bg-card p-4 md:p-6', className)}>
      {children}
    </div>
  )
}
