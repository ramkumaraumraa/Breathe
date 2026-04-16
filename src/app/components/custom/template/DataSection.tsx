import { ReactNode } from 'react'
import { cn } from '@/app/components/ui/utils'

interface DataSectionProps {
  children: ReactNode
  className?: string
}

export function DataSection({ children, className }: DataSectionProps) {
  return (
    <div className={cn('rounded-lg border border-border bg-card p-4 md:p-6', className)}>
      {children}
    </div>
  )
}
