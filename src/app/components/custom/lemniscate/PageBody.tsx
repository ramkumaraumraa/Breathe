import { ReactNode } from 'react'
import { cn } from '@/app/components/shared/utils'

interface PageBodyProps {
  children: ReactNode
  className?: string
}

/**
 * Consistent content inset for all app screens.
 * Handles padding across mobile / tablet / desktop in one place.
 */
export function PageBody({ children, className }: PageBodyProps) {
  return (
    <div className={cn('pt-2 px-4 pb-4 md:px-6 md:pb-6 lg:px-8 lg:pb-8', className)}>
      {children}
    </div>
  )
}
